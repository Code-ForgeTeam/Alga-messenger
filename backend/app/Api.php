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

        if ($path === '/api/auth/register' && $method === 'POST') { $this->register($body); }
        if ($path === '/api/auth/login' && $method === 'POST') { $this->login($body); }
        if ($path === '/api/auth/verify' && $method === 'GET') { $this->verify(); }

        if ($path === '/api/chats' && $method === 'GET') { $this->chats(); }
        if ($path === '/api/messages/read' && $method === 'POST') { $this->json(['ok' => true]); }

        if (preg_match('#^/api/messages/chat/([a-zA-Z0-9\-]+)$#', $path, $m) && $method === 'GET') { $this->chatMessages($m[1]); }

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
        $this->json(['token' => $token, 'user' => ['id' => $id, 'username' => $u, 'fullName' => $n]]);
    }

    private function login(array $body): void
    {
        $u = trim((string)($body['username'] ?? ''));
        $p = (string)($body['password'] ?? '');
        $stmt = $this->db()->prepare('SELECT id, username, full_name, password_hash FROM users WHERE username = ? LIMIT 1');
        $stmt->execute([$u]);
        $user = $stmt->fetch();
        if (!$user || !password_verify($p, $user['password_hash'])) $this->json(['error' => 'Invalid credentials'], 401);

        $token = Jwt::issue(['userId' => $user['id']]);
        $this->json(['token' => $token, 'user' => ['id' => $user['id'], 'username' => $user['username'], 'fullName' => $user['full_name']]]);
    }

    private function verify(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, username, full_name FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$userId]);
        $u = $stmt->fetch();
        if (!$u) $this->json(['error' => 'Unauthorized'], 401);
        $this->json(['user' => ['id' => $u['id'], 'username' => $u['username'], 'fullName' => $u['full_name']]]);
    }

    private function chats(): void
    {
        $userId = $this->authUserId();
        $stmt = $this->db()->prepare('SELECT c.id, c.name, c.type, c.updated_at FROM chats c JOIN chat_participants cp ON cp.chat_id = c.id WHERE cp.user_id = ? ORDER BY c.updated_at DESC');
        $stmt->execute([$userId]);
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['participants'] = [];
            $r['lastMessageText'] = '';
            $r['unreadCount'] = 0;
        }
        $this->json($rows);
    }

    private function chatMessages(string $chatId): void
    {
        $this->authUserId();
        $stmt = $this->db()->prepare('SELECT id, chat_id as chatId, user_id as userId, text, created_at as createdAt, edited FROM messages WHERE chat_id = ? ORDER BY created_at ASC LIMIT 200');
        $stmt->execute([$chatId]);
        $this->json($stmt->fetchAll());
    }

    private function authUserId(): string
    {
        $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!$this->startsWith($auth, 'Bearer ')) $this->json(['error' => 'Unauthorized'], 401);
        $payload = Jwt::verify(substr($auth, 7));
        if (!$payload || empty($payload['userId'])) $this->json(['error' => 'Unauthorized'], 401);
        return (string)$payload['userId'];
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
        $origin = Config::get('CORS_ORIGIN', '*');
        header('Access-Control-Allow-Origin: ' . $origin);
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
