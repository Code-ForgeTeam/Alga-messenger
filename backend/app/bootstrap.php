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

$envPath = __DIR__ . '/../.env';
if (is_file($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ((isset($trimmed[0]) && $trimmed[0] === '#') || strpos($line, '=') === false) {
            continue;
        }
        [$name, $value] = array_map('trim', explode('=', $line, 2));
        if ($name !== '') {
            $_ENV[$name] = $value;
            putenv("{$name}={$value}");
        }
    }
}
