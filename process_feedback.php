<?php
header('Content-Type: application/json');

// Recibe el mensaje JSON desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'] ?? '';

// Respuestas personalizadas
$response = 'Lo siento, no entiendo tu mensaje.';

if (strpos(strtolower($message), 'hola') !== false) {
    $response = '¡Hola! ¿En qué puedo ayudarte hoy?';
} elseif (strpos(strtolower($message), 'gracias') !== false) {
    $response = '¡De nada! ¿Hay algo más en lo que pueda asistirte?';
} elseif (strpos(strtolower($message), 'ayuda') !== false) {
    $response = 'Claro, ¿qué tipo de ayuda necesitas?';
}

echo json_encode(['reply' => $response]);
