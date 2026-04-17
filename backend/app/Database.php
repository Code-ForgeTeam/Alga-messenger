<?php
declare(strict_types=1);

namespace App;

use PDO;
use PDOException;

final class Database
{
    private static ?PDO $pdo = null;

    public static function connection(): PDO
    {
        if (self::$pdo) {
            return self::$pdo;
        }

        $host = Config::get('DB_HOST', '127.0.0.1');
        $port = Config::get('DB_PORT', '3306');
        $db   = Config::get('DB_NAME', 'q99916rz_moon');
        $user = Config::get('DB_USER', 'root');
        $pass = Config::get('DB_PASS', '');

        try {
            self::$pdo = new PDO(
                "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4",
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Database connection failed', 'details' => $e->getMessage()]);
            exit;
        }

        return self::$pdo;
    }
}
