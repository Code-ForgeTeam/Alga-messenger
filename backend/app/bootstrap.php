<?php
declare(strict_types=1);

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    if (substr($class, 0, strlen($prefix)) === $prefix) {
        $relative = substr($class, strlen($prefix));
        $file = __DIR__ . '/' . str_replace('\\', '/', $relative) . '.php';
        if (is_file($file)) {
            require_once $file;
        }
    }
});

$loadEnvFile = static function (string $envPath): void {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    foreach ($lines as $line) {
        $trimmed = trim((string)$line);
        $trimmed = preg_replace('/^\xEF\xBB\xBF/', '', $trimmed) ?? $trimmed;
        if ($trimmed === '' || (isset($trimmed[0]) && $trimmed[0] === '#')) {
            continue;
        }
        if (strpos($trimmed, '=') === false) {
            continue;
        }

        [$name, $value] = explode('=', $trimmed, 2);
        $name = trim((string)$name);
        $value = trim((string)$value);
        if ($name === '') {
            continue;
        }

        $isQuoted = (
            (strlen($value) >= 2 && $value[0] === '"' && $value[strlen($value) - 1] === '"')
            || (strlen($value) >= 2 && $value[0] === "'" && $value[strlen($value) - 1] === "'")
        );
        if ($isQuoted) {
            $value = substr($value, 1, -1);
        } else {
            $hashPos = strpos($value, ' #');
            if ($hashPos !== false) {
                $value = trim(substr($value, 0, $hashPos));
            }
        }

        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
        putenv("{$name}={$value}");
    }
};

$envCandidates = array_values(array_unique([
    __DIR__ . '/../.env',
    dirname(__DIR__, 2) . '/.env',
    getcwd() . '/.env',
]));

foreach ($envCandidates as $envPath) {
    if (!is_file($envPath)) {
        continue;
    }
    $loadEnvFile($envPath);
    break;
}
