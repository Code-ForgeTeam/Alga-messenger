<?php
declare(strict_types=1);

namespace App;

use PDO;

final class Api
{
    private ?PDO $db = null;

    public function __construct()
    {
    }

    public function handle(): void
    {
        $this->cors();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            return;
        }

        $rawPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        $path = $this->normalizePath($rawPath);
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $body = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];

        if ($path === '/health') { $this->json(['ok' => true]); }
        if ($path === '/api') { $this->json(['ok' => true, 'message' => 'API root']); }
        if ($path === '/api/app/update' && $method === 'GET') { $this->appUpdate(); }

        if ($path === '/api/auth/register' && $method === 'POST') { $this->register($body); }
        if ($path === '/api/auth/login' && $method === 'POST') { $this->login($body); }
        if ($path === '/api/auth/verify' && $method === 'GET') { $this->verify(); }

        if ($path === '/api/users/me' && $method === 'GET') { $this->me(); }
        if ($path === '/api/users/me' && $method === 'PUT') { $this->updateMe($body); }
        if ($path === '/api/users/search' && $method === 'GET') { $this->searchUsers(); }

        if (preg_match('#^/api/users/by-username/([^/]+)$#', $path, $m) && $method === 'GET') {
            $this->userByUsername(urldecode($m[1]));
        }

        if (preg_match('#^/api/users/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') {
            $this->userById($m[1]);
        }

        if ($path === '/api/chats' && $method === 'GET') { $this->chats(); }
        if ($path === '/api/chats' && $method === 'POST') { $this->createChat($body); }
        if ($path === '/api/saved/chat' && $method === 'GET') { $this->savedChat(); }
        if ($path === '/api/messages' && $method === 'POST') { $this->sendMessage($body); }
        if ($path === '/api/messages/read' && $method === 'POST') { $this->json(['ok' => true]); }
        if ($path === '/api/ai/chat' && $method === 'GET') { $this->aiChat(); }
        if ($path === '/api/ai/message' && $method === 'POST') { $this->aiMessage($body); }
        if ($path === '/api/upload/avatar' && $method === 'POST') { $this->uploadAvatar(); }

        if (preg_match('#^/api/messages/chat/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') { $this->chatMessages($m[1]); }
        if (preg_match('#^/api/messages/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'DELETE') { $this->deleteMessage($m[1], $body); }

        $this->json(['error' => 'Not found', 'path' => $path], 404);
    }

    private function register(array $body): void
    {
        $u = trim((string)($body['username'] ?? ''));
        $n = trim((string)($body['fullName'] ?? ''));
        $p = (string)($body['password'] ?? '');
        if ($u === '' || $n === '' || strlen($p) < 6) $this->json(['error' => 'Invalid payload'], 400);

        $id = $this->uuid();
        $hash = password_hash($p, PASSWORD_BCRYPT);
        $stmt = $this->db()->prepare('INSERT INTO users (id, username, full_name, password_hash) VALUES (?, ?, ?, ?)');
        try {
            $stmt->execute([$id, $u, $n, $hash]);
        } catch (\Throwable) {
            $this->json(['error' => 'Username already exists'], 409);
        }

        $token = Jwt::issue(['userId' => $id]);
        $this->json(['token' => $token, 'user' => ['id' => $id, 'username' => $u, 'fullName' => $n, 'avatar' => null]]);
    }

    private function login(array $body): void
    {
        $u = trim((string)($body['username'] ?? ''));
        $p = (string)($body['password'] ?? '');
        $stmt = $this->db()->prepare('SELECT id, username, full_name, avatar, password_hash FROM users WHERE username = ? LIMIT 1');
        $stmt->execute([$u]);
        $user = $stmt->fetch();
        if (!$user || !password_verify($p, $user['password_hash'])) $this->json(['error' => 'Invalid credentials'], 401);

        $token = Jwt::issue(['userId' => $user['id']]);
        $this->json(['token' => $token, 'user' => ['id' => $user['id'], 'username' => $user['username'], 'fullName' => $user['full_name'], 'avatar' => $user['avatar'] ?? null]]);
    }

    private function verify(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name, avatar FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$userId]);
        $u = $stmt->fetch();
        if (!$u) $this->json(['error' => 'Unauthorized'], 401);
        $this->json(['user' => ['id' => $u['id'], 'username' => $u['username'], 'fullName' => $u['full_name'], 'avatar' => $u['avatar'] ?? null]]);
    }

    private function chats(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare(
            'SELECT c.id, c.name, c.type, c.avatar, c.updated_at,
                    cp.archived, cp.pinned, cp.muted, cp.blocked, cp.unread_count
             FROM chats c
             JOIN chat_participants cp ON cp.chat_id = c.id
             WHERE cp.user_id = ?
             ORDER BY cp.pinned DESC, c.updated_at DESC'
        );
        $stmt->execute([$userId]);
        $rows = $stmt->fetchAll();

        $payload = array_map(fn ($row) => $this->buildChatPayload($row, $userId), $rows ?: []);
        $this->json($payload);
    }

    private function createChat(array $body): void
    {
        $ownerId = $this->authUserId();
        $type = (string)($body['type'] ?? 'private');
        $name = trim((string)($body['name'] ?? ''));
        $participantIds = $body['participantIds'] ?? [];
        if (!is_array($participantIds)) {
            $participantIds = [];
        }

        $allParticipants = array_values(array_unique(array_filter(array_merge([$ownerId], $participantIds), fn ($v) => is_string($v) && $v !== '')));

        if ($type === 'private' && count($allParticipants) === 2) {
            sort($allParticipants);
            $stmt = $this->db()->prepare(
                'SELECT cp1.chat_id FROM chat_participants cp1
                 JOIN chat_participants cp2 ON cp2.chat_id = cp1.chat_id
                 JOIN chats c ON c.id = cp1.chat_id
                 WHERE c.type = "private" AND cp1.user_id = ? AND cp2.user_id = ? LIMIT 1'
            );
            $stmt->execute([$allParticipants[0], $allParticipants[1]]);
            $existing = $stmt->fetchColumn();
            if ($existing) {
                $chat = $this->chatByIdForUser((string)$existing, $ownerId);
                if ($chat) {
                    $this->json($chat);
                }
            }
        }

        $chatId = $this->uuid();
        $stmt = $this->db()->prepare('INSERT INTO chats (id, name, type) VALUES (?, ?, ?)');
        $stmt->execute([$chatId, $name === '' ? null : $name, $type]);

        $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id) VALUES (?, ?)');
        foreach ($allParticipants as $uid) {
            $insertParticipant->execute([$chatId, $uid]);
        }

        $chat = $this->chatByIdForUser($chatId, $ownerId);
        $this->json($chat ?: [
            'id' => $chatId,
            'name' => $name,
            'type' => $type,
            'participants' => [],
            'updatedAt' => date('c'),
        ], 201);
    }

    private function savedChat(): void
    {
        $userId = $this->authUserId();

        $stmt = $this->db()->prepare(
            'SELECT c.id
             FROM chats c
             JOIN chat_participants cp ON cp.chat_id = c.id
             WHERE c.type = "saved" AND cp.user_id = ?
             LIMIT 1'
        );
        $stmt->execute([$userId]);
        $existing = $stmt->fetchColumn();

        if (!$existing) {
            $chatId = $this->uuid();
            $insertChat = $this->db()->prepare('INSERT INTO chats (id, name, type) VALUES (?, ?, "saved")');
            $insertChat->execute([$chatId, 'Избранное']);

            $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id, pinned) VALUES (?, ?, 1)');
            $insertParticipant->execute([$chatId, $userId]);
            $existing = $chatId;
        }

        $chat = $this->chatByIdForUser((string)$existing, $userId);
        if (!$chat) {
            $this->json(['error' => 'Not found'], 404);
        }

        $this->json($chat);
    }

    private function sendMessage(array $body): void
    {
        $userId = $this->authUserId();
        $chatId = (string)($body['chatId'] ?? '');
        $text = trim((string)($body['text'] ?? ''));
        if ($chatId === '' || $text === '') {
            $this->json(['error' => 'Invalid payload'], 400);
        }

        $check = $this->db()->prepare('SELECT 1 FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1');
        $check->execute([$chatId, $userId]);
        if (!$check->fetchColumn()) {
            $this->json(['error' => 'Forbidden'], 403);
        }

        $messageId = $this->uuid();
        $insert = $this->db()->prepare('INSERT INTO messages (id, chat_id, user_id, text) VALUES (?, ?, ?, ?)');
        $insert->execute([$messageId, $chatId, $userId, $text]);

        $updateChat = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $updateChat->execute([$chatId]);

        $message = [
            'id' => $messageId,
            'chatId' => $chatId,
            'userId' => $userId,
            'text' => $text,
            'createdAt' => date('c'),
            'edited' => 0,
        ];

        $this->json(['message' => $message], 201);
    }


    private function aiChat(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare(
            'SELECT c.id
             FROM chats c
             JOIN chat_participants cp ON cp.chat_id = c.id
             WHERE c.type = "ai" AND cp.user_id = ?
             LIMIT 1'
        );
        $stmt->execute([$userId]);
        $existing = $stmt->fetchColumn();

        if (!$existing) {
            $chatId = $this->uuid();
            $insertChat = $this->db()->prepare('INSERT INTO chats (id, name, type) VALUES (?, ?, "ai")');
            $insertChat->execute([$chatId, 'AI']);

            $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id, pinned) VALUES (?, ?, 1)');
            $insertParticipant->execute([$chatId, $userId]);
            $existing = $chatId;
        }

        $chat = $this->chatByIdForUser((string)$existing, $userId);
        if (!$chat) {
            $this->json(['error' => 'Not found'], 404);
        }

        $this->json($chat);
    }

    private function aiMessage(array $body): void
    {
        $userId = $this->authUserId();
        $chatId = (string)($body['chatId'] ?? '');
        $text = trim((string)($body['text'] ?? ''));

        if ($chatId === '' || $text === '') {
            $this->json(['error' => 'Invalid payload'], 400);
        }

        $check = $this->db()->prepare('SELECT c.id FROM chats c JOIN chat_participants cp ON cp.chat_id = c.id WHERE c.id = ? AND c.type = "ai" AND cp.user_id = ? LIMIT 1');
        $check->execute([$chatId, $userId]);
        if (!$check->fetchColumn()) {
            $this->json(['error' => 'Forbidden'], 403);
        }

        $messageId = $this->uuid();
        $insert = $this->db()->prepare('INSERT INTO messages (id, chat_id, user_id, text) VALUES (?, ?, ?, ?)');
        $insert->execute([$messageId, $chatId, $userId, $text]);

        $replyText = 'AI: ' . $this->composeAiReply($text);
        $replyId = $this->uuid();
        $insert->execute([$replyId, $chatId, $userId, $replyText]);

        $updateChat = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $updateChat->execute([$chatId]);

        $this->json([
            'userMessage' => [
                'id' => $messageId,
                'chatId' => $chatId,
                'userId' => $userId,
                'text' => $text,
                'createdAt' => date('c'),
                'edited' => 0,
            ],
            'aiMessage' => [
                'id' => $replyId,
                'chatId' => $chatId,
                'userId' => $userId,
                'text' => $replyText,
                'createdAt' => date('c'),
                'edited' => 0,
            ],
            'message' => $replyText,
        ], 201);
    }

    private function composeAiReply(string $text): string
    {
        if (preg_match('/(hello|привет|здрав)/iu', $text)) {
            return 'Привет! Чем могу помочь?';
        }
        if (preg_match('/(ошибка|error|bug)/iu', $text)) {
            return 'Понял. Опиши шаги воспроизведения и текст ошибки — помогу точечно.';
        }

        return 'Получил: ' . substr($text, 0, 300);
    }

    private function deleteMessage(string $messageId, array $body): void
    {
        $userId = $this->authUserId();
        $deleteForAll = (bool)($body['deleteForAll'] ?? false);

        $stmt = $this->db()->prepare('SELECT id, chat_id, user_id FROM messages WHERE id = ? LIMIT 1');
        $stmt->execute([$messageId]);
        $message = $stmt->fetch();
        if (!$message) {
            $this->json(['error' => 'Not found'], 404);
        }

        $part = $this->db()->prepare('SELECT 1 FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1');
        $part->execute([$message['chat_id'], $userId]);
        if (!$part->fetchColumn()) {
            $this->json(['error' => 'Forbidden'], 403);
        }

        if ($deleteForAll && $message['user_id'] !== $userId) {
            $this->json(['error' => 'Delete for all is allowed only for own messages'], 403);
        }

        // Пока без таблицы персональных удалений: удаляем физически.
        $del = $this->db()->prepare('DELETE FROM messages WHERE id = ?');
        $del->execute([$messageId]);

        $updateChat = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $updateChat->execute([$message['chat_id']]);

        $this->json(['ok' => true]);
    }

    private function me(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$userId]);
        $u = $stmt->fetch();
        if (!$u) {
            $this->json(['error' => 'Not found'], 404);
        }

        $this->json([
            'id' => $u['id'],
            'username' => $u['username'],
            'fullName' => $u['full_name'],
            'bio' => $u['bio'] ?? null,
            'avatar' => $u['avatar'] ?? null,
        ]);
    }

    private function updateMe(array $body): void
    {
        $userId = $this->authUserId();
        $fullName = trim((string)($body['fullName'] ?? ''));
        $bio = trim((string)($body['bio'] ?? ''));
        $avatar = trim((string)($body['avatar'] ?? ''));

        if ($fullName === '') {
            $stmt = $this->db()->prepare('SELECT full_name FROM users WHERE id = ? LIMIT 1');
            $stmt->execute([$userId]);
            $row = $stmt->fetch();
            $fullName = (string)($row['full_name'] ?? '');
        }

        $stmt = $this->db()->prepare('UPDATE users SET full_name = ?, bio = ?, avatar = ? WHERE id = ?');
        $stmt->execute([$fullName, $bio === '' ? null : $bio, $avatar === '' ? null : $avatar, $userId]);
        $this->me();
    }

    private function searchUsers(): void
    {
        $this->authUserId();
        $q = trim((string)($_GET['q'] ?? ''));
        if ($q === '' || strlen($q) < 2) {
            $this->json([]);
        }

        $like = '%' . $q . '%';
        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar FROM users WHERE username LIKE ? OR full_name LIKE ? ORDER BY updated_at DESC LIMIT 30');
        $stmt->execute([$like, $like]);
        $rows = $stmt->fetchAll();
        $result = array_map(fn ($u) => [
            'id' => $u['id'],
            'username' => $u['username'],
            'fullName' => $u['full_name'],
            'bio' => $u['bio'] ?? null,
            'avatar' => $u['avatar'] ?? null,
        ], $rows ?: []);

        $this->json($result);
    }

    private function userByUsername(string $username): void
    {
        $this->authUserId();
        $u = trim($username);
        if ($u === '') {
            $this->json(['error' => 'Not found'], 404);
        }

        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar FROM users WHERE username = ? LIMIT 1');
        $stmt->execute([$u]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->json(['error' => 'Not found'], 404);
        }

        $this->json([
            'id' => $row['id'],
            'username' => $row['username'],
            'fullName' => $row['full_name'],
            'bio' => $row['bio'] ?? null,
            'avatar' => $row['avatar'] ?? null,
        ]);
    }

    private function userById(string $id): void
    {
        $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->json(['error' => 'Not found'], 404);
        }

        $this->json([
            'id' => $row['id'],
            'username' => $row['username'],
            'fullName' => $row['full_name'],
            'bio' => $row['bio'] ?? null,
            'avatar' => $row['avatar'] ?? null,
        ]);
    }

    private function chatMessages(string $chatId): void
    {
        $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, chat_id as chatId, user_id as userId, text, created_at as createdAt, edited FROM messages WHERE chat_id = ? ORDER BY created_at ASC LIMIT 200');
        $stmt->execute([$chatId]);
        $this->json($stmt->fetchAll());
    }

    private function chatByIdForUser(string $chatId, string $userId): ?array
    {
        $stmt = $this->db()->prepare(
            'SELECT c.id, c.name, c.type, c.avatar, c.updated_at,
                    cp.archived, cp.pinned, cp.muted, cp.blocked, cp.unread_count
             FROM chats c
             JOIN chat_participants cp ON cp.chat_id = c.id
             WHERE c.id = ? AND cp.user_id = ?
             LIMIT 1'
        );
        $stmt->execute([$chatId, $userId]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }

        return $this->buildChatPayload($row, $userId);
    }

    private function buildChatPayload(array $row, string $viewerId): array
    {
        $participants = $this->chatParticipants((string)$row['id'], $viewerId, (string)$row['type']);
        $last = $this->chatLastMessage((string)$row['id']);

        return [
            'id' => $row['id'],
            'name' => $row['name'],
            'type' => $row['type'],
            'avatar' => $row['avatar'],
            'participants' => $participants,
            'archived' => (bool)$row['archived'],
            'pinned' => (bool)$row['pinned'],
            'muted' => (bool)$row['muted'],
            'blocked' => (bool)$row['blocked'],
            'unreadCount' => (int)$row['unread_count'],
            'lastMessageText' => $last['text'] ?? '',
            'lastMessageTime' => $last['createdAt'] ?? null,
            'updatedAt' => isset($row['updated_at']) ? date('c', strtotime((string)$row['updated_at'])) : null,
        ];
    }

    private function chatParticipants(string $chatId, string $viewerId, string $chatType): array
    {
        if ($chatType === 'saved') {
            return [];
        }

        $stmt = $this->db()->prepare(
            'SELECT u.id, u.username, u.full_name, u.avatar, u.bio, u.status, u.last_seen, u.badge
             FROM chat_participants cp
             JOIN users u ON u.id = cp.user_id
             WHERE cp.chat_id = ? AND cp.user_id <> ?'
        );
        $stmt->execute([$chatId, $viewerId]);

        $rows = $stmt->fetchAll();
        return array_map(static fn ($u) => [
            'id' => $u['id'],
            'username' => $u['username'],
            'fullName' => $u['full_name'],
            'avatar' => $u['avatar'] ?? null,
            'bio' => $u['bio'] ?? null,
            'status' => $u['status'] ?? 'offline',
            'lastSeen' => $u['last_seen'] ? date('c', strtotime((string)$u['last_seen'])) : null,
            'badge' => $u['badge'] ?? null,
        ], $rows ?: []);
    }

    private function chatLastMessage(string $chatId): ?array
    {
        $stmt = $this->db()->prepare(
            'SELECT id, chat_id, user_id, text, created_at, edited
             FROM messages
             WHERE chat_id = ?
             ORDER BY created_at DESC
             LIMIT 1'
        );
        $stmt->execute([$chatId]);
        $m = $stmt->fetch();
        if (!$m) {
            return null;
        }

        return [
            'id' => $m['id'],
            'chatId' => $m['chat_id'],
            'userId' => $m['user_id'],
            'text' => $m['text'],
            'createdAt' => date('c', strtotime((string)$m['created_at'])),
            'edited' => (bool)$m['edited'],
        ];
    }

    private function uploadAvatar(): void
    {
        $this->authUserId();

        if (!isset($_FILES['avatar']) || !is_array($_FILES['avatar'])) {
            $this->json(['error' => 'Avatar file is required'], 400);
        }

        $file = $_FILES['avatar'];
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            $this->json(['error' => 'Upload failed'], 400);
        }

        $tmp = (string)($file['tmp_name'] ?? '');
        if ($tmp === '' || !is_uploaded_file($tmp)) {
            $this->json(['error' => 'Invalid upload'], 400);
        }

        $maxSize = 5 * 1024 * 1024;
        if (($file['size'] ?? 0) > $maxSize) {
            $this->json(['error' => 'File too large'], 400);
        }

        $mime = mime_content_type($tmp) ?: '';
        $allowed = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
        ];

        if (!isset($allowed[$mime])) {
            $this->json(['error' => 'Unsupported image format'], 400);
        }

        $ext = $allowed[$mime];
        $fileName = $this->uuid() . '.' . $ext;
        $uploadDir = dirname(__DIR__) . '/public/uploads/avatars';
        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
            $this->json(['error' => 'Cannot create upload directory'], 500);
        }

        $dest = $uploadDir . '/' . $fileName;
        if (!move_uploaded_file($tmp, $dest)) {
            $this->json(['error' => 'Cannot save file'], 500);
        }

        $base = rtrim((string)Config::get('APP_URL', ''), '/');
        $relative = '/uploads/avatars/' . $fileName;
        $url = $base !== '' ? ($base . $relative) : $relative;

        $this->json(['url' => $url], 201);
    }

    private function appUpdate(): void
    {
        $versionCode = isset($_GET['vc']) ? (int)$_GET['vc'] : 0;
        $platform = strtolower(trim((string)($_GET['platform'] ?? 'android')));

        if ($platform !== 'android') {
            $this->json([
                'hasUpdate' => false,
                'platform' => $platform,
                'reason' => 'unsupported_platform',
            ]);
        }

        $updateDirs = [
            dirname(__DIR__) . '/update',
            dirname(__DIR__) . '/public/update',
        ];
        $metaPath = dirname(__DIR__) . '/update/update.json';
        $meta = [];
        if (is_file($metaPath)) {
            $decoded = json_decode((string)file_get_contents($metaPath), true);
            if (is_array($decoded)) {
                $meta = $decoded;
            }
        }

        $apkName = trim((string)($meta['apkFileName'] ?? 'update.apk'));
        if ($apkName === '') {
            $apkName = 'update.apk';
        }

        $apkPath = null;
        foreach ($updateDirs as $dir) {
            $candidate = $dir . '/' . $apkName;
            if (is_file($candidate)) {
                $apkPath = $candidate;
                break;
            }
        }

        $hasFile = $apkPath !== null;
        if (!$hasFile) {
            $this->json([
                'hasUpdate' => false,
                'platform' => 'android',
            ]);
        }

        $latestVersionCode = isset($meta['latestVersionCode']) ? (int)$meta['latestVersionCode'] : null;
        $minSupportedVersionCode = isset($meta['minSupportedVersionCode']) ? (int)$meta['minSupportedVersionCode'] : null;
        $forceUpdate = (bool)($meta['forceUpdate'] ?? false);

        $hasUpdate = $latestVersionCode === null ? true : $latestVersionCode > $versionCode;
        $isMandatory = $forceUpdate || ($minSupportedVersionCode !== null && $versionCode > 0 && $versionCode < $minSupportedVersionCode);

        $downloadPath = $this->buildUpdateDownloadPath($apkName);
        $downloadUrl = $this->absoluteUrl($downloadPath);

        $this->json([
            'hasUpdate' => $hasUpdate,
            'mandatory' => $isMandatory,
            'platform' => 'android',
            'latestVersionCode' => $latestVersionCode,
            'latestVersionName' => isset($meta['latestVersionName']) ? (string)$meta['latestVersionName'] : null,
            'minSupportedVersionCode' => $minSupportedVersionCode,
            'downloadUrl' => $downloadUrl,
            'fileName' => $apkName,
            'fileSize' => $apkPath !== null ? (filesize($apkPath) ?: null) : null,
            'changelog' => isset($meta['changelog']) && is_array($meta['changelog']) ? $meta['changelog'] : [],
            'publishedAt' => isset($meta['publishedAt']) ? (string)$meta['publishedAt'] : null,
        ]);
    }

    private function buildUpdateDownloadPath(string $apkName): string
    {
        $scriptName = (string)($_SERVER['SCRIPT_NAME'] ?? '');
        $basePath = '';

        if ($scriptName !== '' && substr($scriptName, -16) === '/public/index.php') {
            $basePath = substr($scriptName, 0, -16);
        } elseif ($scriptName !== '' && substr($scriptName, -10) === '/index.php') {
            $basePath = substr($scriptName, 0, -10);
        }

        $basePath = rtrim($basePath, '/');
        return ($basePath !== '' ? $basePath : '') . '/update/' . rawurlencode($apkName);
    }

    private function absoluteUrl(string $path): string
    {
        $scheme = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
        $host = trim((string)($_SERVER['HTTP_HOST'] ?? ''));
        return $host !== '' ? ($scheme . '://' . $host . $path) : $path;
    }

    private function authUserId(): string
    {
        $auth = $this->getAuthorizationHeader();
        if ($auth === '' || stripos($auth, 'Bearer ') !== 0) {
            $this->json(['error' => 'Unauthorized'], 401);
        }

        $payload = Jwt::verify(trim(substr($auth, 7)));
        if (!$payload || empty($payload['userId'])) $this->json(['error' => 'Unauthorized'], 401);
        return (string)$payload['userId'];
    }

    private function getAuthorizationHeader(): string
    {
        $candidates = [
            $_SERVER['HTTP_AUTHORIZATION'] ?? null,
            $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null,
            $_SERVER['Authorization'] ?? null,
        ];

        foreach ($candidates as $value) {
            if (is_string($value) && trim($value) !== '') {
                return trim($value);
            }
        }

        if (function_exists('getallheaders')) {
            $headers = getallheaders();
            if (is_array($headers)) {
                foreach ($headers as $key => $value) {
                    if (strcasecmp((string)$key, 'Authorization') === 0 && is_string($value) && trim($value) !== '') {
                        return trim($value);
                    }
                }
            }
        }

        return '';
    }



    private function db(): PDO
    {
        if ($this->db === null) {
            $this->db = Database::connection();
        }
        return $this->db;
    }

    private function normalizePath(string $rawPath): string
    {
        if (strpos($rawPath, '/index.php/') !== false) {
            $parts = explode('/index.php/', $rawPath, 2);
            return '/' . ltrim($parts[1], '/');
        }

        if (substr($rawPath, -10) === '/index.php') {
            return '/';
        }

        return $rawPath;
    }

    private function startsWith(string $haystack, string $needle): bool
    {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }

    private function cors(): void
    {
        $originConfig = (string)Config::get('CORS_ORIGIN', '*');
        $requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if ($originConfig === '*') {
            header('Access-Control-Allow-Origin: *');
        } else {
            $allowed = array_map('trim', explode(',', $originConfig));
            if ($requestOrigin !== '' && in_array($requestOrigin, $allowed, true)) {
                header('Access-Control-Allow-Origin: ' . $requestOrigin);
            } else {
                header('Access-Control-Allow-Origin: ' . $allowed[0]);
            }
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Content-Type: application/json');
    }

    private function json(array $payload, int $status = 200): void
    {
        http_response_code($status);
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
        exit;
    }

    private function uuid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
        $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
