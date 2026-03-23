<?php
declare(strict_types=1);

namespace App;

use PDO;

final class Api
{
    private ?PDO $db = null;
    private ?array $chatParticipantColumns = null;
    private ?array $userColumns = null;
    private ?bool $messageReactionTableReady = null;
    private ?bool $chatReadStateTableReady = null;
    private ?bool $pushTokensTableReady = null;

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

        if ($path === '/api/auth/register' && $method === 'POST') { $this->register($body); }
        if ($path === '/api/auth/login' && $method === 'POST') { $this->login($body); }
        if ($path === '/api/auth/verify' && $method === 'GET') { $this->verify(); }
        if ($path === '/api/admin/overview' && $method === 'GET') { $this->adminOverview(); }
        if ($path === '/api/admin/clear-chats' && $method === 'POST') { $this->adminClearChats(); }
        if ($path === '/api/admin/clear-messages' && $method === 'POST') { $this->adminClearMessages(); }
        if ($path === '/api/admin/reset-users' && $method === 'POST') { $this->adminResetUsers(); }

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
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') { $this->chatById($m[1]); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'DELETE') { $this->deleteChat($m[1], $body); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/messages$#', $path, $m) && $method === 'DELETE') { $this->clearChatMessages($m[1]); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/archive$#', $path, $m) && $method === 'POST') { $this->setChatArchive($m[1], true); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/archive$#', $path, $m) && $method === 'DELETE') { $this->setChatArchive($m[1], false); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/mute$#', $path, $m) && $method === 'POST') { $this->toggleChatMute($m[1]); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/pin$#', $path, $m) && $method === 'POST') { $this->toggleChatPin($m[1]); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/block$#', $path, $m) && $method === 'POST') { $this->blockInChat($m[1], $body); }
        if (preg_match('#^/api/chats/([a-zA-Z0-9\-]+)/block$#', $path, $m) && $method === 'DELETE') { $this->unblockInChat($m[1]); }
        if ($path === '/api/saved/chat' && $method === 'GET') { $this->savedChat(); }
        if ($path === '/api/messages' && $method === 'POST') { $this->sendMessage($body); }
        if ($path === '/api/messages/read' && $method === 'POST') { $this->markMessagesRead($body); }
        if ($path === '/api/push/token' && $method === 'POST') { $this->registerPushToken($body); }
        if ($path === '/api/push/token' && $method === 'DELETE') { $this->removePushToken($body); }
        if ($path === '/api/ai/chat' && $method === 'GET') { $this->aiChat(); }
        if ($path === '/api/ai/message' && $method === 'POST') { $this->aiMessage($body); }
        if ($path === '/api/upload/avatar' && $method === 'POST') { $this->uploadAvatar(); }
        if ($path === '/api/admin/users/delete' && $method === 'POST') { $this->adminDeleteUser($body); }

        if (preg_match('#^/api/messages/chat/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') { $this->chatMessages($m[1]); }
        if (preg_match('#^/api/messages/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'DELETE') { $this->deleteMessage($m[1], $body); }
        if (preg_match('#^/api/messages/([a-zA-Z0-9\-]+)/reaction$#', $path, $m) && $method === 'POST') { $this->setMessageReaction($m[1], $body); }
        if (preg_match('#^/api/messages/([a-zA-Z0-9\-]+)/reaction$#', $path, $m) && $method === 'DELETE') { $this->removeMessageReaction($m[1]); }

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
        } catch (\PDOException $e) {
            if ((string)$e->getCode() === '23000') {
                $this->json(['error' => 'Username already exists'], 409);
            }
            $this->json(['error' => 'Registration failed'], 500);
        } catch (\Throwable) {
            $this->json(['error' => 'Registration failed'], 500);
        }

        $this->touchUserPresence($id);
        $token = Jwt::issue(['userId' => $id]);
        $this->json([
            'token' => $token,
            'user' => [
                'id' => $id,
                'username' => $u,
                'fullName' => $n,
                'avatar' => null,
                'isCreator' => $this->isCreatorMatch($id),
            ],
        ]);
    }

    private function login(array $body): void
    {
        $u = trim((string)($body['username'] ?? ''));
        $p = (string)($body['password'] ?? '');

        try {
            $select = 'SELECT id, username, full_name, avatar, password_hash';
            if ($this->hasUserColumn('is_banned')) {
                $select .= ', is_banned';
            }
            if ($this->hasUserColumn('ban_reason')) {
                $select .= ', ban_reason';
            }
            $select .= ' FROM users WHERE username = ? LIMIT 1';
            $stmt = $this->db()->prepare($select);
            $stmt->execute([$u]);
            $user = $stmt->fetch();
        } catch (\Throwable) {
            $this->json(['error' => 'Login failed'], 500);
        }

        if (!$user || !password_verify($p, $user['password_hash'])) {
            $this->json(['error' => 'invalid_credentials', 'message' => 'Неправильный логин или пароль'], 401);
        }
        if ($this->hasUserColumn('is_banned') && !empty($user['is_banned'])) {
            $this->json([
                'error' => 'banned',
                'reason' => $this->hasUserColumn('ban_reason') ? (string)($user['ban_reason'] ?? '') : '',
                'message' => 'Данный пользователь заблокирован',
            ], 403);
        }

        $this->touchUserPresence((string)$user['id']);
        $token = Jwt::issue(['userId' => $user['id']]);
        $this->json([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'fullName' => $user['full_name'],
                'avatar' => $user['avatar'] ?? null,
                'isCreator' => $this->isCreatorMatch((string)$user['id']),
            ],
        ]);
    }

    private function verify(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name, avatar, status, last_seen FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$userId]);
        $u = $stmt->fetch();
        if (!$u) $this->json(['error' => 'Unauthorized'], 401);

        $presence = $this->normalizePresence((string)($u['status'] ?? 'offline'), $u['last_seen'] ?? null);

        $this->json(['user' => [
            'id' => $u['id'],
            'username' => $u['username'],
            'fullName' => $u['full_name'],
            'avatar' => $u['avatar'] ?? null,
            'status' => $presence['status'],
            'lastSeen' => $presence['lastSeen'],
            'isCreator' => $this->isCreatorMatch((string)$u['id']),
        ]]);
    }

    private function chats(): void
    {
        $userId = $this->authUserId();
        $metaSelect = $this->chatParticipantMetaSelectSql();
        $orderBy = $this->chatParticipantOrderBySql();

        $stmt = $this->db()->prepare(
            "SELECT c.id, c.name, c.type, c.avatar, c.updated_at,
"
            . "                    {$metaSelect}
"
            . "             FROM chats c
"
            . "             JOIN chat_participants cp ON cp.chat_id = c.id
"
            . "             WHERE cp.user_id = ?
"
            . "             ORDER BY {$orderBy}"
        );
        $stmt->execute([$userId]);
        $rows = $stmt->fetchAll();

        $payload = array_map(fn ($row) => $this->buildChatPayload($row, $userId), $rows ?: []);
        $this->json($payload);
    }

    private function adminOverview(): void
    {
        $userId = $this->authUserId();
        $this->assertCreator($userId);

        $users = (int)$this->db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
        $chats = (int)$this->db()->query('SELECT COUNT(*) FROM chats')->fetchColumn();
        $messages = (int)$this->db()->query('SELECT COUNT(*) FROM messages')->fetchColumn();

        $this->json([
            'ok' => true,
            'users' => $users,
            'chats' => $chats,
            'messages' => $messages,
            'creatorUserId' => $this->creatorUserId(),
        ]);
    }

    private function adminClearChats(): void
    {
        $userId = $this->authUserId();
        $this->assertCreator($userId);

        $this->db()->exec('DELETE FROM chats');
        $this->json(['ok' => true]);
    }

    private function adminClearMessages(): void
    {
        $userId = $this->authUserId();
        $this->assertCreator($userId);

        $this->db()->exec('DELETE FROM messages');

        if ($this->hasChatParticipantColumn('unread_count')) {
            $this->db()->exec('UPDATE chat_participants SET unread_count = 0');
        }

        $this->db()->exec('UPDATE chats SET updated_at = CURRENT_TIMESTAMP');
        $this->json(['ok' => true]);
    }

    private function adminResetUsers(): void
    {
        $userId = $this->authUserId();
        $this->assertCreator($userId);

        $creatorId = $this->creatorUserId();
        if ($creatorId === '') {
            $this->json(['error' => 'Creator user is not configured'], 500);
        }

        $db = $this->db();
        try {
            $db->beginTransaction();

            $deleteUsers = $db->prepare('DELETE FROM users WHERE id <> ?');
            $deleteUsers->execute([$creatorId]);

            $db->exec('DELETE c FROM chats c LEFT JOIN chat_participants cp ON cp.chat_id = c.id WHERE cp.chat_id IS NULL');

            if ($this->hasChatParticipantColumn('unread_count')) {
                $resetUnread = $db->prepare('UPDATE chat_participants SET unread_count = 0 WHERE user_id = ?');
                $resetUnread->execute([$creatorId]);
            }

            $db->commit();
        } catch (\Throwable) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            $this->json(['error' => 'Failed to reset users'], 500);
        }

        $this->json(['ok' => true, 'creatorUserId' => $creatorId]);
    }

    private function adminDeleteUser(array $body): void
    {
        $actorId = $this->authUserId();
        $this->assertCreator($actorId);

        $username = trim((string)($body['username'] ?? ''));
        if ($username === '') {
            $this->json(['error' => 'username is required'], 400);
        }

        $find = $this->db()->prepare('SELECT id, username FROM users WHERE username = ? LIMIT 1');
        $find->execute([$username]);
        $target = $find->fetch();
        if (!$target) {
            $this->json(['error' => 'User not found'], 404);
        }

        $creatorId = $this->creatorUserId();
        if ($creatorId !== '' && (string)$target['id'] === $creatorId) {
            $this->json(['error' => 'Нельзя удалить владельца приложения'], 400);
        }

        $db = $this->db();
        try {
            $db->beginTransaction();
            $delete = $db->prepare('DELETE FROM users WHERE id = ? LIMIT 1');
            $delete->execute([(string)$target['id']]);
            $db->exec('DELETE c FROM chats c LEFT JOIN chat_participants cp ON cp.chat_id = c.id WHERE cp.chat_id IS NULL');
            $db->commit();
        } catch (\Throwable) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            $this->json(['error' => 'Не удалось удалить пользователя'], 500);
        }

        $this->json([
            'ok' => true,
            'username' => $target['username'],
            'deleted' => true,
        ]);
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
            $this->touchChatReadState($chatId, (string)$uid);
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

    private function chatById(string $chatId): void
    {
        $userId = $this->authUserId();
        $chat = $this->chatByIdForUser($chatId, $userId);
        if (!$chat) {
            $this->json(['error' => 'Not found'], 404);
        }

        $this->json($chat);
    }

    private function clearChatMessages(string $chatId): void
    {
        $userId = $this->authUserId();
        $this->assertChatParticipant($chatId, $userId);

        $stmt = $this->db()->prepare('DELETE FROM messages WHERE chat_id = ?');
        $stmt->execute([$chatId]);

        $touch = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $touch->execute([$chatId]);

        $this->json(['ok' => true]);
    }

    private function deleteChat(string $chatId, array $body): void
    {
        $userId = $this->authUserId();
        $deleteForAll = (bool)($body['deleteForAll'] ?? false);

        $this->assertChatParticipant($chatId, $userId);

        if ($deleteForAll) {
            $stmt = $this->db()->prepare('DELETE FROM chats WHERE id = ?');
            $stmt->execute([$chatId]);
            $this->json(['ok' => true, 'deletedForAll' => true]);
        }

        $removeMe = $this->db()->prepare('DELETE FROM chat_participants WHERE chat_id = ? AND user_id = ?');
        $removeMe->execute([$chatId, $userId]);

        $countStmt = $this->db()->prepare('SELECT COUNT(*) FROM chat_participants WHERE chat_id = ?');
        $countStmt->execute([$chatId]);
        $participantsCount = (int)$countStmt->fetchColumn();

        if ($participantsCount <= 0) {
            $cleanup = $this->db()->prepare('DELETE FROM chats WHERE id = ?');
            $cleanup->execute([$chatId]);
        } else {
            $touch = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
            $touch->execute([$chatId]);
        }

        $this->json(['ok' => true, 'deletedForAll' => false]);
    }

    private function setChatArchive(string $chatId, bool $archived): void
    {
        $userId = $this->authUserId();
        $this->updateParticipantFlag($chatId, $userId, 'archived', $archived ? 1 : 0);
        $this->json(['ok' => true, 'archived' => $archived]);
    }

    private function toggleChatMute(string $chatId): void
    {
        $userId = $this->authUserId();
        $this->assertChatParticipant($chatId, $userId);

        if (!$this->hasChatParticipantColumn('muted')) {
            $this->json(['ok' => true, 'muted' => false]);
        }

        $stmt = $this->db()->prepare('SELECT muted FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1');
        $stmt->execute([$chatId, $userId]);
        $current = (int)$stmt->fetchColumn();
        $next = $current ? 0 : 1;

        $this->updateParticipantFlag($chatId, $userId, 'muted', $next);
        $this->json(['ok' => true, 'muted' => (bool)$next]);
    }

    private function toggleChatPin(string $chatId): void
    {
        $userId = $this->authUserId();
        $this->assertChatParticipant($chatId, $userId);

        if (!$this->hasChatParticipantColumn('pinned')) {
            $this->json(['ok' => true, 'pinned' => false]);
        }

        $stmt = $this->db()->prepare('SELECT pinned FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1');
        $stmt->execute([$chatId, $userId]);
        $current = (int)$stmt->fetchColumn();
        $next = $current ? 0 : 1;

        $this->updateParticipantFlag($chatId, $userId, 'pinned', $next);
        $this->json(['ok' => true, 'pinned' => (bool)$next]);
    }

    private function blockInChat(string $chatId, array $body): void
    {
        $userId = $this->authUserId();
        $targetUserId = trim((string)($body['userId'] ?? ''));
        if ($targetUserId === '') {
            $this->json(['error' => 'userId is required'], 400);
        }

        $this->updateParticipantFlag($chatId, $userId, 'blocked', 1);
        $this->json(['ok' => true, 'blocked' => true, 'userId' => $targetUserId]);
    }

    private function unblockInChat(string $chatId): void
    {
        $userId = $this->authUserId();
        $this->updateParticipantFlag($chatId, $userId, 'blocked', 0);
        $this->json(['ok' => true, 'blocked' => false]);
    }

    private function updateParticipantFlag(string $chatId, string $userId, string $field, int $value): void
    {
        if (!in_array($field, ['archived', 'pinned', 'muted', 'blocked'], true)) {
            $this->json(['error' => 'Invalid field'], 400);
        }

        $this->assertChatParticipant($chatId, $userId);

        if (!$this->hasChatParticipantColumn($field)) {
            return;
        }

        $stmt = $this->db()->prepare("UPDATE chat_participants SET {$field} = ? WHERE chat_id = ? AND user_id = ?");
        $stmt->execute([$value, $chatId, $userId]);

        $touch = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $touch->execute([$chatId]);
    }

    private function assertChatParticipant(string $chatId, string $userId): void
    {
        $stmt = $this->db()->prepare('SELECT 1 FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1');
        $stmt->execute([$chatId, $userId]);
        if (!$stmt->fetchColumn()) {
            $this->json(['error' => 'Forbidden'], 403);
        }
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
            $insertChat->execute([$chatId, 'Saved']);

            if ($this->hasChatParticipantColumn('pinned')) {
                $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id, pinned) VALUES (?, ?, 1)');
                $insertParticipant->execute([$chatId, $userId]);
            } else {
                $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id) VALUES (?, ?)');
                $insertParticipant->execute([$chatId, $userId]);
            }
            $this->touchChatReadState($chatId, $userId);
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

        if ($this->hasChatParticipantColumn('unread_count')) {
            $incUnread = $this->db()->prepare(
                'UPDATE chat_participants SET unread_count = unread_count + 1 WHERE chat_id = ? AND user_id <> ?'
            );
            $incUnread->execute([$chatId, $userId]);
        }
        $this->touchChatReadState($chatId, $userId);

        $updateChat = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $updateChat->execute([$chatId]);
        $this->sendPushForMessage($chatId, $userId, $text);

        $message = [
            'id' => $messageId,
            'chatId' => $chatId,
            'userId' => $userId,
            'text' => $text,
            'createdAt' => date('c'),
            'edited' => 0,
            'status' => 'delivered',
            'isAi' => false,
            'reactions' => ['mine' => null, 'counts' => new \stdClass()],
        ];

        $this->json(['message' => $message], 201);
    }

    private function markMessagesRead(array $body): void
    {
        $userId = $this->authUserId();
        $chatId = trim((string)($body['chatId'] ?? ''));
        if ($chatId === '') {
            $this->json(['error' => 'chatId is required'], 400);
        }

        $this->assertChatParticipant($chatId, $userId);

        if ($this->hasChatParticipantColumn('unread_count')) {
            $update = $this->db()->prepare(
                'UPDATE chat_participants SET unread_count = 0 WHERE chat_id = ? AND user_id = ?'
            );
            $update->execute([$chatId, $userId]);
        }
        $this->touchChatReadState($chatId, $userId);

        $this->json(['ok' => true]);
    }

    private function registerPushToken(array $body): void
    {
        $userId = $this->authUserId();
        $token = trim((string)($body['token'] ?? ''));
        $platform = trim((string)($body['platform'] ?? 'unknown'));
        if ($token === '') {
            $this->json(['error' => 'token is required'], 400);
        }

        if (!$this->ensurePushTokensTable()) {
            $this->json(['error' => 'Push token storage is unavailable'], 500);
        }

        $stmt = $this->db()->prepare(
            'INSERT INTO push_tokens (id, user_id, token, platform, last_seen_at)
             VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
             ON DUPLICATE KEY UPDATE
                user_id = VALUES(user_id),
                platform = VALUES(platform),
                last_seen_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP'
        );
        $stmt->execute([$this->uuid(), $userId, $token, $platform]);

        $this->json(['ok' => true]);
    }

    private function removePushToken(array $body): void
    {
        $userId = $this->authUserId();
        $token = trim((string)($body['token'] ?? ''));
        if (!$this->ensurePushTokensTable()) {
            $this->json(['ok' => true]);
        }

        if ($token !== '') {
            $stmt = $this->db()->prepare('DELETE FROM push_tokens WHERE user_id = ? AND token = ?');
            $stmt->execute([$userId, $token]);
        } else {
            $stmt = $this->db()->prepare('DELETE FROM push_tokens WHERE user_id = ?');
            $stmt->execute([$userId]);
        }

        $this->json(['ok' => true]);
    }

    private function setMessageReaction(string $messageId, array $body): void
    {
        $userId = $this->authUserId();
        $reaction = trim((string)($body['reaction'] ?? ''));
        if ($reaction === '') {
            $this->json(['error' => 'reaction is required'], 400);
        }

        $message = $this->findMessageForParticipant($messageId, $userId);
        if (!$message) {
            $this->json(['error' => 'Not found'], 404);
        }

        if (!$this->ensureMessageReactionsTable()) {
            $this->json(['ok' => true, 'reactions' => ['mine' => $reaction, 'counts' => [$reaction => 1]]]);
        }

        $stmt = $this->db()->prepare(
            'INSERT INTO message_reactions (message_id, user_id, reaction) VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE reaction = VALUES(reaction), created_at = CURRENT_TIMESTAMP'
        );
        $stmt->execute([$messageId, $userId, $reaction]);

        $this->json([
            'ok' => true,
            'messageId' => $messageId,
            'reactions' => $this->messageReactionSummary($messageId, $userId),
        ]);
    }

    private function removeMessageReaction(string $messageId): void
    {
        $userId = $this->authUserId();
        $message = $this->findMessageForParticipant($messageId, $userId);
        if (!$message) {
            $this->json(['error' => 'Not found'], 404);
        }

        if ($this->ensureMessageReactionsTable()) {
            $del = $this->db()->prepare('DELETE FROM message_reactions WHERE message_id = ? AND user_id = ?');
            $del->execute([$messageId, $userId]);
        }

        $this->json([
            'ok' => true,
            'messageId' => $messageId,
            'reactions' => $this->messageReactionSummary($messageId, $userId),
        ]);
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

            if ($this->hasChatParticipantColumn('pinned')) {
                $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id, pinned) VALUES (?, ?, 1)');
                $insertParticipant->execute([$chatId, $userId]);
            } else {
                $insertParticipant = $this->db()->prepare('INSERT INTO chat_participants (chat_id, user_id) VALUES (?, ?)');
                $insertParticipant->execute([$chatId, $userId]);
            }
            $this->touchChatReadState($chatId, $userId);
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

        $contextStmt = $this->db()->prepare(
            'SELECT text FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 16'
        );
        $contextStmt->execute([$chatId]);
        $historyRows = array_reverse($contextStmt->fetchAll() ?: []);
        $history = array_map(fn ($row) => (string)($row['text'] ?? ''), $historyRows);

        $rawReply = $this->fetchAiReply($text, $history) ?: $this->composeAiReplyClean($text);
        $replyText = 'AI: ' . trim($rawReply);
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
                'isAi' => false,
                'reactions' => ['mine' => null, 'counts' => new \stdClass()],
            ],
            'aiMessage' => [
                'id' => $replyId,
                'chatId' => $chatId,
                'userId' => $userId,
                'text' => $replyText,
                'createdAt' => date('c'),
                'edited' => 0,
                'isAi' => true,
                'reactions' => ['mine' => null, 'counts' => new \stdClass()],
            ],
            'message' => $replyText,
        ], 201);
    }

    private function composeAiReply(string $text): string
    {
        if (preg_match('/\\b(hello|hi|РїСЂРёРІРµС‚)\\b/ui', $text)) {
            return 'РџСЂРёРІРµС‚! Р§РµРј РјРѕРіСѓ РїРѕРјРѕС‡СЊ?';
        }
        if (preg_match('/\\b(help|РїРѕРјРѕРіРё|С‡С‚Рѕ СѓРјРµРµС€СЊ)\\b/ui', $text)) {
            return 'РЇ Alga AI. РњРѕРіСѓ РїРѕРґСЃРєР°Р·Р°С‚СЊ, РѕР±СЉСЏСЃРЅРёС‚СЊ Рё РїРѕРјРѕС‡СЊ СЃ РёРґРµСЏРјРё.';
        }

        return 'РЇ РїРѕР»СѓС‡РёР» СЃРѕРѕР±С‰РµРЅРёРµ. Р Р°СЃСЃРєР°Р¶Рё РїРѕРґСЂРѕР±РЅРµРµ, Рё СЏ РїРѕСЃС‚Р°СЂР°СЋСЃСЊ РїРѕРјРѕС‡СЊ.';
    }

    private function composeAiReplyClean(string $text): string
    {
        if (preg_match('/\b(hello|hi|привет|здравствуй)\b/ui', $text)) {
            return 'Привет! Я AI-помощник Alga. Чем могу помочь?';
        }
        if (preg_match('/\b(help|помоги|что умеешь)\b/ui', $text)) {
            return 'Я могу отвечать на вопросы, помогать с идеями и объяснять сложные вещи простыми словами.';
        }
        return 'Я получил сообщение. Уточни запрос, и я постараюсь помочь максимально точно.';
    }

    private function fetchAiReply(string $prompt, array $history): ?string
    {
        $endpoint = trim((string)Config::get('AI_SERVICE_URL', ''));
        if ($endpoint === '') {
            return null;
        }
        if (!function_exists('curl_init')) {
            return null;
        }

        $payload = json_encode(
            [
                'prompt' => $prompt,
                'history' => $history,
                'model' => (string)Config::get('AI_MODEL', 'gpt-4o-mini'),
            ],
            JSON_UNESCAPED_UNICODE
        );
        if ($payload === false) {
            return null;
        }

        $ch = curl_init($endpoint);
        if ($ch === false) {
            return null;
        }

        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 45,
            CURLOPT_POSTFIELDS => $payload,
        ]);
        $response = curl_exec($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($response === false || $httpCode < 200 || $httpCode >= 300) {
            return null;
        }

        $data = json_decode((string)$response, true);
        if (!is_array($data)) {
            return null;
        }

        $text = trim((string)($data['answer'] ?? $data['text'] ?? $data['message'] ?? ''));
        return $text !== '' ? $text : null;
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

        // Delete message and refresh chat activity timestamp.
        $del = $this->db()->prepare('DELETE FROM messages WHERE id = ?');
        $del->execute([$messageId]);

        $updateChat = $this->db()->prepare('UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $updateChat->execute([$message['chat_id']]);

        $this->json(['ok' => true]);
    }

    private function me(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar, status, last_seen FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$userId]);
        $u = $stmt->fetch();
        if (!$u) {
            $this->json(['error' => 'Not found'], 404);
        }

        $presence = $this->normalizePresence((string)($u['status'] ?? 'offline'), $u['last_seen'] ?? null);

        $this->json([
            'id' => $u['id'],
            'username' => $u['username'],
            'fullName' => $u['full_name'],
            'bio' => $u['bio'] ?? null,
            'avatar' => $u['avatar'] ?? null,
            'status' => $presence['status'],
            'lastSeen' => $presence['lastSeen'],
            'isCreator' => $this->isCreatorMatch((string)$u['id']),
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
        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar, status, last_seen FROM users WHERE username LIKE ? OR full_name LIKE ? ORDER BY updated_at DESC LIMIT 30');
        $stmt->execute([$like, $like]);
        $rows = $stmt->fetchAll();
        $result = array_map(function ($u) {
            $presence = $this->normalizePresence((string)($u['status'] ?? 'offline'), $u['last_seen'] ?? null);

            return [
                'id' => $u['id'],
                'username' => $u['username'],
                'fullName' => $u['full_name'],
                'bio' => $u['bio'] ?? null,
                'avatar' => $u['avatar'] ?? null,
                'status' => $presence['status'],
                'lastSeen' => $presence['lastSeen'],
            ];
        }, $rows ?: []);

        $this->json($result);
    }

    private function userByUsername(string $username): void
    {
        $this->authUserId();
        $u = trim($username);
        if ($u === '') {
            $this->json(['error' => 'Not found'], 404);
        }

        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar, status, last_seen FROM users WHERE username = ? LIMIT 1');
        $stmt->execute([$u]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->json(['error' => 'Not found'], 404);
        }

        $presence = $this->normalizePresence((string)($row['status'] ?? 'offline'), $row['last_seen'] ?? null);

        $this->json([
            'id' => $row['id'],
            'username' => $row['username'],
            'fullName' => $row['full_name'],
            'bio' => $row['bio'] ?? null,
            'avatar' => $row['avatar'] ?? null,
            'status' => $presence['status'],
            'lastSeen' => $presence['lastSeen'],
            'isCreator' => $this->isCreatorMatch((string)$row['id']),
        ]);
    }

    private function userById(string $id): void
    {
        $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name, bio, avatar, status, last_seen FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->json(['error' => 'Not found'], 404);
        }

        $presence = $this->normalizePresence((string)($row['status'] ?? 'offline'), $row['last_seen'] ?? null);

        $this->json([
            'id' => $row['id'],
            'username' => $row['username'],
            'fullName' => $row['full_name'],
            'bio' => $row['bio'] ?? null,
            'avatar' => $row['avatar'] ?? null,
            'status' => $presence['status'],
            'lastSeen' => $presence['lastSeen'],
            'isCreator' => $this->isCreatorMatch((string)$row['id']),
        ]);
    }

    private function chatMessages(string $chatId): void
    {
        $userId = $this->authUserId();
        $this->assertChatParticipant($chatId, $userId);

        $stmt = $this->db()->prepare('SELECT id, chat_id as chatId, user_id as userId, text, created_at as createdAt, edited FROM messages WHERE chat_id = ? ORDER BY created_at ASC LIMIT 200');
        $stmt->execute([$chatId]);
        $rows = $stmt->fetchAll() ?: [];
        $payload = array_map(function ($row) use ($userId) {
            $text = (string)($row['text'] ?? '');
            $isAi = $this->isAiMessageText($text);
            return [
                'id' => $row['id'],
                'chatId' => $row['chatId'],
                'userId' => $row['userId'],
                'text' => $text,
                'createdAt' => isset($row['createdAt']) ? date('c', strtotime((string)$row['createdAt'])) : date('c'),
                'edited' => (bool)($row['edited'] ?? false),
                'isAi' => $isAi,
                'reactions' => $this->messageReactionSummary((string)$row['id'], $userId),
            ];
        }, $rows);

        $this->json($payload);
    }

    private function chatByIdForUser(string $chatId, string $userId): ?array
    {
        $metaSelect = $this->chatParticipantMetaSelectSql();

        $stmt = $this->db()->prepare(
            "SELECT c.id, c.name, c.type, c.avatar, c.updated_at,
"
            . "                    {$metaSelect}
"
            . "             FROM chats c
"
            . "             JOIN chat_participants cp ON cp.chat_id = c.id
"
            . "             WHERE c.id = ? AND cp.user_id = ?
"
            . "             LIMIT 1"
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
        $last = $this->chatLastMessage((string)$row['id'], $viewerId);

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
            'unreadCount' => $this->resolveUnreadCount((string)$row['id'], $viewerId, $row),
            'lastMessage' => $last,
            'lastMessageText' => $last['text'] ?? '',
            'lastMessageTime' => $last['createdAt'] ?? null,
            'lastMessageUserId' => $last['userId'] ?? null,
            'lastMessageStatus' => $last['status'] ?? null,
            'updatedAt' => isset($row['updated_at']) ? date('c', strtotime((string)$row['updated_at'])) : null,
        ];
    }

    private function resolveUnreadCount(string $chatId, string $viewerId, array $row): int
    {
        if ($this->hasChatParticipantColumn('unread_count') && array_key_exists('unread_count', $row)) {
            return max(0, (int)$row['unread_count']);
        }

        return $this->unreadCountFromReadState($chatId, $viewerId);
    }

    private function unreadCountFromReadState(string $chatId, string $userId): int
    {
        if (!$this->ensureChatReadStateTable()) {
            return 0;
        }

        try {
            $stateStmt = $this->db()->prepare(
                'SELECT last_read_at FROM chat_read_state WHERE chat_id = ? AND user_id = ? LIMIT 1'
            );
            $stateStmt->execute([$chatId, $userId]);
            $lastReadAt = $stateStmt->fetchColumn();
            if (!$lastReadAt) {
                $this->touchChatReadState($chatId, $userId);
                return 0;
            }

            $countStmt = $this->db()->prepare(
                'SELECT COUNT(*) FROM messages WHERE chat_id = ? AND user_id <> ? AND created_at > ?'
            );
            $countStmt->execute([$chatId, $userId, (string)$lastReadAt]);
            return max(0, (int)$countStmt->fetchColumn());
        } catch (\Throwable) {
            return 0;
        }
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
        return array_map(function ($u) {
            $presence = $this->normalizePresence((string)($u['status'] ?? 'offline'), $u['last_seen'] ?? null);

            return [
                'id' => $u['id'],
                'username' => $u['username'],
                'fullName' => $u['full_name'],
                'avatar' => $u['avatar'] ?? null,
                'bio' => $u['bio'] ?? null,
                'status' => $presence['status'],
                'lastSeen' => $presence['lastSeen'],
                'badge' => $u['badge'] ?? null,
            ];
        }, $rows ?: []);
    }

    private function chatLastMessage(string $chatId, string $viewerId): ?array
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

        $status = 'sent';
        $authorId = (string)$m['user_id'];
        if ($authorId === $viewerId) {
            $status = 'delivered';
            if ($this->hasChatParticipantColumn('unread_count')) {
                $unread = $this->db()->prepare(
                    'SELECT 1 FROM chat_participants WHERE chat_id = ? AND user_id <> ? AND unread_count > 0 LIMIT 1'
                );
                $unread->execute([$chatId, $viewerId]);
                $status = $unread->fetchColumn() ? 'delivered' : 'read';
            } else {
                $status = $this->hasUnreadForPeersByReadState($chatId, $viewerId)
                    ? 'delivered'
                    : 'read';
            }
        }

        return [
            'id' => $m['id'],
            'chatId' => $m['chat_id'],
            'userId' => $m['user_id'],
            'text' => $m['text'],
            'createdAt' => date('c', strtotime((string)$m['created_at'])),
            'edited' => (bool)$m['edited'],
            'status' => $status,
            'isAi' => $this->isAiMessageText((string)($m['text'] ?? '')),
            'reactions' => $this->messageReactionSummary((string)$m['id'], $viewerId),
        ];
    }

    private function findMessageForParticipant(string $messageId, string $userId): ?array
    {
        $stmt = $this->db()->prepare(
            'SELECT m.id, m.chat_id
             FROM messages m
             JOIN chat_participants cp ON cp.chat_id = m.chat_id
             WHERE m.id = ? AND cp.user_id = ?
             LIMIT 1'
        );
        $stmt->execute([$messageId, $userId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    private function hasUnreadForPeersByReadState(string $chatId, string $authorId): bool
    {
        if (!$this->ensureChatReadStateTable()) {
            return false;
        }

        try {
            $stmt = $this->db()->prepare(
                'SELECT 1
                 FROM chat_participants cp
                 WHERE cp.chat_id = ? AND cp.user_id <> ?
                   AND EXISTS (
                     SELECT 1
                     FROM messages m
                     WHERE m.chat_id = cp.chat_id
                       AND m.user_id = ?
                       AND m.created_at > COALESCE(
                         (SELECT rs.last_read_at
                          FROM chat_read_state rs
                          WHERE rs.chat_id = cp.chat_id AND rs.user_id = cp.user_id
                          LIMIT 1),
                         "1970-01-01 00:00:00"
                       )
                   )
                 LIMIT 1'
            );
            $stmt->execute([$chatId, $authorId, $authorId]);
            return (bool)$stmt->fetchColumn();
        } catch (\Throwable) {
            return false;
        }
    }

    private function touchChatReadState(string $chatId, string $userId): void
    {
        if (!$this->ensureChatReadStateTable()) {
            return;
        }

        try {
            $stmt = $this->db()->prepare(
                'INSERT INTO chat_read_state (chat_id, user_id, last_read_at)
                 VALUES (?, ?, CURRENT_TIMESTAMP)
                 ON DUPLICATE KEY UPDATE
                   last_read_at = CURRENT_TIMESTAMP,
                   updated_at = CURRENT_TIMESTAMP'
            );
            $stmt->execute([$chatId, $userId]);
        } catch (\Throwable) {
            // ignore read state write errors
        }
    }

    private function ensureChatReadStateTable(): bool
    {
        if ($this->chatReadStateTableReady !== null) {
            return $this->chatReadStateTableReady;
        }

        try {
            $this->db()->exec(
                'CREATE TABLE IF NOT EXISTS chat_read_state (
                    chat_id CHAR(36) NOT NULL,
                    user_id CHAR(36) NOT NULL,
                    last_read_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (chat_id, user_id),
                    KEY idx_chat_read_state_user (user_id),
                    CONSTRAINT fk_read_state_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
                    CONSTRAINT fk_read_state_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
            );
            $this->chatReadStateTableReady = true;
        } catch (\Throwable) {
            $this->chatReadStateTableReady = false;
        }

        return $this->chatReadStateTableReady;
    }

    private function ensureMessageReactionsTable(): bool
    {
        if ($this->messageReactionTableReady !== null) {
            return $this->messageReactionTableReady;
        }

        try {
            $this->db()->exec(
                'CREATE TABLE IF NOT EXISTS message_reactions (
                    message_id CHAR(36) NOT NULL,
                    user_id CHAR(36) NOT NULL,
                    reaction VARCHAR(32) NOT NULL,
                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (message_id, user_id),
                    KEY idx_message_reactions_message (message_id),
                    CONSTRAINT fk_reaction_message FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
                    CONSTRAINT fk_reaction_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
            );
            $this->messageReactionTableReady = true;
        } catch (\Throwable) {
            $this->messageReactionTableReady = false;
        }

        return $this->messageReactionTableReady;
    }

    private function messageReactionSummary(string $messageId, string $viewerId): array
    {
        if (!$this->ensureMessageReactionsTable()) {
            return ['mine' => null, 'counts' => new \stdClass()];
        }

        $mineStmt = $this->db()->prepare(
            'SELECT reaction FROM message_reactions WHERE message_id = ? AND user_id = ? LIMIT 1'
        );
        $mineStmt->execute([$messageId, $viewerId]);
        $mine = $mineStmt->fetchColumn();

        $countsStmt = $this->db()->prepare(
            'SELECT reaction, COUNT(*) as total
             FROM message_reactions
             WHERE message_id = ?
             GROUP BY reaction'
        );
        $countsStmt->execute([$messageId]);
        $rows = $countsStmt->fetchAll() ?: [];
        $counts = [];
        foreach ($rows as $row) {
            $key = (string)($row['reaction'] ?? '');
            if ($key === '') continue;
            $counts[$key] = (int)($row['total'] ?? 0);
        }

        return [
            'mine' => $mine !== false ? (string)$mine : null,
            'counts' => $counts ?: new \stdClass(),
        ];
    }

    private function isAiMessageText(string $text): bool
    {
        return stripos(trim($text), 'AI:') === 0;
    }

    private function sendPushForMessage(string $chatId, string $senderId, string $messageText): void
    {
        $serverKey = trim((string)Config::get('FCM_SERVER_KEY', ''));
        if ($serverKey === '' || !function_exists('curl_init')) {
            return;
        }
        if (!$this->ensurePushTokensTable()) {
            return;
        }

        try {
            $chatStmt = $this->db()->prepare('SELECT type, name FROM chats WHERE id = ? LIMIT 1');
            $chatStmt->execute([$chatId]);
            $chat = $chatStmt->fetch();
            if (!$chat) {
                return;
            }

            $chatType = (string)($chat['type'] ?? '');
            if ($chatType === 'saved' || $chatType === 'ai') {
                return;
            }

            $recipientsStmt = $this->db()->prepare(
                'SELECT user_id FROM chat_participants WHERE chat_id = ? AND user_id <> ?'
            );
            $recipientsStmt->execute([$chatId, $senderId]);
            $recipientRows = $recipientsStmt->fetchAll() ?: [];
            $recipientIds = array_values(array_filter(array_map(
                fn ($row) => (string)($row['user_id'] ?? ''),
                $recipientRows
            )));
            if (!$recipientIds) {
                return;
            }

            $placeholders = implode(',', array_fill(0, count($recipientIds), '?'));
            $tokenStmt = $this->db()->prepare("SELECT token FROM push_tokens WHERE user_id IN ({$placeholders})");
            $tokenStmt->execute($recipientIds);
            $tokenRows = $tokenStmt->fetchAll() ?: [];
            $tokens = array_values(array_unique(array_filter(array_map(
                fn ($row) => trim((string)($row['token'] ?? '')),
                $tokenRows
            ))));
            if (!$tokens) {
                return;
            }

            $senderStmt = $this->db()->prepare('SELECT full_name, username FROM users WHERE id = ? LIMIT 1');
            $senderStmt->execute([$senderId]);
            $sender = $senderStmt->fetch() ?: [];

            $senderName = trim((string)($sender['full_name'] ?? ''));
            if ($senderName === '') {
                $senderUsername = trim((string)($sender['username'] ?? ''));
                $senderName = $senderUsername !== '' ? '@' . $senderUsername : 'Alga';
            }

            $normalizedBody = trim(preg_replace('/\s+/u', ' ', $messageText) ?? '');
            if ($normalizedBody === '') {
                $normalizedBody = 'Новое сообщение';
            }
            if (function_exists('mb_strlen') && function_exists('mb_substr')) {
                if (mb_strlen($normalizedBody) > 140) {
                    $normalizedBody = mb_substr($normalizedBody, 0, 137) . '...';
                }
            } elseif (strlen($normalizedBody) > 140) {
                $normalizedBody = substr($normalizedBody, 0, 137) . '...';
            }

            foreach (array_chunk($tokens, 500) as $chunk) {
                $payload = [
                    'registration_ids' => $chunk,
                    'priority' => 'high',
                    'notification' => [
                        'title' => $senderName,
                        'body' => $normalizedBody,
                        'sound' => 'default',
                    ],
                    'data' => [
                        'type' => 'message',
                        'chatId' => $chatId,
                        'senderId' => $senderId,
                    ],
                    'content_available' => true,
                    'mutable_content' => true,
                ];

                $this->sendFcmPayload($serverKey, $payload);
            }
        } catch (\Throwable) {
            // ignore push failures
        }
    }

    private function sendFcmPayload(string $serverKey, array $payload): void
    {
        $json = json_encode($payload, JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            return;
        }

        $ch = curl_init('https://fcm.googleapis.com/fcm/send');
        if ($ch === false) {
            return;
        }

        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: key=' . $serverKey,
                'Content-Type: application/json',
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => $json,
        ]);
        curl_exec($ch);
        curl_close($ch);
    }

    private function ensurePushTokensTable(): bool
    {
        if ($this->pushTokensTableReady !== null) {
            return $this->pushTokensTableReady;
        }

        try {
            $this->db()->exec(
                'CREATE TABLE IF NOT EXISTS push_tokens (
                    id CHAR(36) PRIMARY KEY,
                    user_id CHAR(36) NOT NULL,
                    token VARCHAR(512) NOT NULL,
                    platform VARCHAR(32) NOT NULL DEFAULT "unknown",
                    last_seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    UNIQUE KEY uq_push_token (token),
                    KEY idx_push_user (user_id),
                    CONSTRAINT fk_push_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
            );
            $this->pushTokensTableReady = true;
        } catch (\Throwable) {
            $this->pushTokensTableReady = false;
        }

        return $this->pushTokensTableReady;
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

    private function creatorUserId(): string
    {
        $configured = trim((string)Config::get('CREATOR_USER_ID', ''));
        if ($configured !== '') {
            return $configured;
        }

        try {
            if ($this->hasUserColumn('created_at')) {
                $stmt = $this->db()->query('SELECT id FROM users ORDER BY created_at ASC, id ASC LIMIT 1');
                $first = $stmt->fetchColumn();
                if ($first) {
                    return (string)$first;
                }
            }

            $stmt = $this->db()->query('SELECT id FROM users ORDER BY id ASC LIMIT 1');
            $first = $stmt->fetchColumn();
            return $first ? (string)$first : '';
        } catch (\Throwable) {
            try {
                $stmt = $this->db()->query('SELECT id FROM users LIMIT 1');
                $first = $stmt->fetchColumn();
                return $first ? (string)$first : '';
            } catch (\Throwable) {
                return '';
            }
        }
    }

    private function isCreatorMatch(string $userId): bool
    {
        $creatorId = trim($this->creatorUserId());
        $candidate = trim($userId);
        if ($creatorId === '' || $candidate === '') {
            return false;
        }

        return strtolower($creatorId) === strtolower($candidate);
    }

    private function assertCreator(string $userId): void
    {
        if (!$this->isCreatorMatch($userId)) {
            $this->json(['error' => 'Forbidden'], 403);
        }
    }

    private function authUserId(): string
    {
        $auth = $this->getAuthorizationHeader();
        if ($auth === '' || stripos($auth, 'Bearer ') !== 0) {
            $this->json(['error' => 'Unauthorized'], 401);
        }

        $payload = Jwt::verify(trim(substr($auth, 7)));
        if (!$payload || empty($payload['userId'])) $this->json(['error' => 'Unauthorized'], 401);

        $userId = (string)$payload['userId'];
        try {
            if ($this->hasUserColumn('is_banned')) {
                $select = 'SELECT is_banned';
                if ($this->hasUserColumn('ban_reason')) {
                    $select .= ', ban_reason';
                }
                $select .= ' FROM users WHERE id = ? LIMIT 1';
                $stmt = $this->db()->prepare($select);
                $stmt->execute([$userId]);
                $row = $stmt->fetch();
                if (!$row) {
                    $this->json(['error' => 'Unauthorized'], 401);
                }
                if (!empty($row['is_banned'])) {
                    $this->json([
                        'error' => 'banned',
                        'reason' => $this->hasUserColumn('ban_reason') ? (string)($row['ban_reason'] ?? '') : '',
                        'message' => 'Данный пользователь заблокирован',
                    ], 403);
                }
            } else {
                $stmt = $this->db()->prepare('SELECT id FROM users WHERE id = ? LIMIT 1');
                $stmt->execute([$userId]);
                if (!$stmt->fetchColumn()) {
                    $this->json(['error' => 'Unauthorized'], 401);
                }
            }
        } catch (\Throwable) {
            $this->json(['error' => 'Unauthorized'], 401);
        }
        $this->touchUserPresence($userId);

        return $userId;
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



    private function normalizePresence(string $status, $lastSeen): array
    {
        $normalizedStatus = $status !== '' ? $status : 'offline';
        $lastSeenIso = null;

        if ($lastSeen) {
            $lastSeenTs = strtotime((string)$lastSeen);
            if ($lastSeenTs !== false) {
                $lastSeenIso = date('c', $lastSeenTs);
                if ($normalizedStatus === 'online' && $lastSeenTs < (time() - 300)) {
                    $normalizedStatus = 'offline';
                }
            }
        }

        return [
            'status' => $normalizedStatus,
            'lastSeen' => $lastSeenIso,
        ];
    }

    private function touchUserPresence(string $userId): void
    {
        try {
            $stmt = $this->db()->prepare('UPDATE users SET status = "online", last_seen = CURRENT_TIMESTAMP WHERE id = ?');
            $stmt->execute([$userId]);
        } catch (\Throwable) {
            // ignore presence update failures
        }
    }

    private function chatParticipantMetaSelectSql(): string
    {
        $parts = [];
        $parts[] = $this->hasChatParticipantColumn('archived') ? 'cp.archived AS archived' : '0 AS archived';
        $parts[] = $this->hasChatParticipantColumn('pinned') ? 'cp.pinned AS pinned' : '0 AS pinned';
        $parts[] = $this->hasChatParticipantColumn('muted') ? 'cp.muted AS muted' : '0 AS muted';
        $parts[] = $this->hasChatParticipantColumn('blocked') ? 'cp.blocked AS blocked' : '0 AS blocked';
        $parts[] = $this->hasChatParticipantColumn('unread_count') ? 'cp.unread_count AS unread_count' : '0 AS unread_count';

        return implode(', ', $parts);
    }

    private function chatParticipantOrderBySql(): string
    {
        return $this->hasChatParticipantColumn('pinned')
            ? 'cp.pinned DESC, c.updated_at DESC'
            : 'c.updated_at DESC';
    }

    private function hasChatParticipantColumn(string $column): bool
    {
        $columns = $this->chatParticipantColumns();
        return isset($columns[strtolower($column)]);
    }

    private function hasUserColumn(string $column): bool
    {
        $columns = $this->userColumns();
        return isset($columns[strtolower($column)]);
    }

    private function ensureUserBanColumns(): bool
    {
        $hasBanned = $this->hasUserColumn('is_banned');
        $hasReason = $this->hasUserColumn('ban_reason');
        if ($hasBanned && $hasReason) {
            return true;
        }

        try {
            if (!$hasBanned) {
                $this->db()->exec('ALTER TABLE users ADD COLUMN is_banned TINYINT(1) NOT NULL DEFAULT 0');
            }
            if (!$hasReason) {
                $this->db()->exec('ALTER TABLE users ADD COLUMN ban_reason VARCHAR(1024) NULL');
            }
            $this->userColumns = null;
        } catch (\Throwable) {
            return false;
        }

        return $this->hasUserColumn('is_banned') && $this->hasUserColumn('ban_reason');
    }

    private function chatParticipantColumns(): array
    {
        if ($this->chatParticipantColumns !== null) {
            return $this->chatParticipantColumns;
        }

        $columns = [];
        try {
            $stmt = $this->db()->query('SHOW COLUMNS FROM chat_participants');
            foreach ($stmt->fetchAll() as $row) {
                $name = strtolower((string)($row['Field'] ?? ''));
                if ($name !== '') {
                    $columns[$name] = true;
                }
            }

            $optional = [
                'archived' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'pinned' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'muted' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'blocked' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'unread_count' => 'INT NOT NULL DEFAULT 0',
            ];
            foreach ($optional as $name => $definition) {
                if (isset($columns[$name])) {
                    continue;
                }
                try {
                    $this->db()->exec("ALTER TABLE chat_participants ADD COLUMN {$name} {$definition}");
                    $columns[$name] = true;
                } catch (\Throwable) {
                    // keep graceful fallback for shared hosting with no ALTER privileges
                }
            }
        } catch (\Throwable) {
            // If SHOW COLUMNS is restricted, keep only guaranteed core fields.
            $columns = [
                'chat_id' => true,
                'user_id' => true,
            ];
        }

        $this->chatParticipantColumns = $columns;
        return $columns;
    }

    private function userColumns(): array
    {
        if ($this->userColumns !== null) {
            return $this->userColumns;
        }

        $columns = [];
        try {
            $stmt = $this->db()->query('SHOW COLUMNS FROM users');
            foreach ($stmt->fetchAll() as $row) {
                $name = strtolower((string)($row['Field'] ?? ''));
                if ($name !== '') {
                    $columns[$name] = true;
                }
            }
        } catch (\Throwable) {
            $columns = ['id' => true];
        }

        $this->userColumns = $columns;
        return $columns;
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



