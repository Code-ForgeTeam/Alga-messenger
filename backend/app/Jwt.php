<?php
declare(strict_types=1);

namespace App;

final class Jwt
{
    public static function issue(array $payload): string
    {
        $secret = Config::get('JWT_SECRET', 'change_me');
        $exp = time() + (int)Config::get('JWT_EXPIRES', '2592000');
        $body = array_merge($payload, ['exp' => $exp]);

        $header64 = self::b64(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload64 = self::b64(json_encode($body));
        $signature = self::b64(hash_hmac('sha256', "{$header64}.{$payload64}", $secret, true));

        return "{$header64}.{$payload64}.{$signature}";
    }

    public static function verify(string $token): ?array
    {
        $secret = Config::get('JWT_SECRET', 'change_me');
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;

        [$h, $p, $s] = $parts;
        $expected = self::b64(hash_hmac('sha256', "{$h}.{$p}", $secret, true));
        if (!hash_equals($expected, $s)) return null;

        $payload = json_decode(base64_decode(strtr($p, '-_', '+/')), true);
        if (!is_array($payload)) return null;
        if (($payload['exp'] ?? 0) < time()) return null;
        return $payload;
    }

    private static function b64(string $raw): string
    {
        return rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
    }
}
