<?php
// Sicherstellen, dass wir JSON zurückgeben
header('Content-Type: application/json');

// Pfad zur Speicherdatei - kann relativ zum PHP-Skript sein
$dataFile = __DIR__ . '/wishes.json'; // __DIR__ stellt sicher, dass der Pfad relativ zum Skript ist

// --- Funktion zum Laden der Wünsche ---
function getWishes($filePath) {
    if (!file_exists($filePath)) {
        return [];
    }
    $jsonContent = @file_get_contents($filePath); // @ unterdrückt Fehler, falls nicht lesbar
    if ($jsonContent === false) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Konnte Wunschdatei nicht lesen. Berechtigungen prüfen!']);
        exit;
    }
    $wishes = json_decode($jsonContent, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        // Wenn JSON korrupt ist, leeres Array zurückgeben, statt alles zu blockieren
        // Logge den Fehler serverseitig, wenn möglich
        error_log("JSON Decode Error in $filePath: " . json_last_error_msg());
        return [];
        // Alternativ: Fehler melden
        // http_response_code(500);
        // echo json_encode(['status' => 'error', 'message' => 'Wunschdatei ist korrupt: ' . json_last_error_msg()]);
        // exit;
    }
    return is_array($wishes) ? $wishes : [];
}

// --- Funktion zum Speichern der Wünsche mit File Locking ---
function saveWishes($filePath, $wishes) {
    $fileHandle = fopen($filePath, 'c');
    if ($fileHandle === false) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Konnte Wunschdatei nicht öffnen. Berechtigungen prüfen!']);
        exit;
    }

    if (flock($fileHandle, LOCK_EX)) { // Exklusiven Lock holen
        ftruncate($fileHandle, 0); // Datei leeren
        rewind($fileHandle); // Pointer an Anfang setzen
        $jsonOutput = json_encode($wishes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if (fwrite($fileHandle, $jsonOutput) === false) {
             http_response_code(500);
             echo json_encode(['status' => 'error', 'message' => 'Fehler beim Schreiben in die Wunschdatei.']);
             flock($fileHandle, LOCK_UN); // Lock freigeben
             fclose($fileHandle);
             exit;
        }
        fflush($fileHandle);
        flock($fileHandle, LOCK_UN); // Lock freigeben
    } else {
        fclose($fileHandle);
        http_response_code(503);
        echo json_encode(['status' => 'error', 'message' => 'Server überlastet, konnte Wunschdatei nicht sperren.']);
        exit;
    }
    fclose($fileHandle);
    return true;
}


// --- Anfragen-Router ---
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $wishes = getWishes($dataFile);
    echo json_encode($wishes);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['wish']) || trim($input['wish']) === '') {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Ungültige Eingabe oder fehlender Wunschtext.']);
        exit;
    }

    // Sanitize input VERY IMPORTANT!
    $sanitizedWish = htmlspecialchars(trim($input['wish']), ENT_QUOTES, 'UTF-8');
    $maxLen = 500; // Maximale Länge
    if (mb_strlen($sanitizedWish, 'UTF-8') > $maxLen) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => "Wunsch ist zu lang (max. $maxLen Zeichen)."]);
        exit;
    }
    // Optional: Weitere Filterung (z.B. Schimpfwörter - komplexer)

    $wishes = getWishes($dataFile);

    $newWish = [
        'id' => uniqid('wish_', true),
        'text' => $sanitizedWish,
        'timestamp' => time()
    ];

    array_unshift($wishes, $newWish); // Neuen Wunsch vorne einfügen

    $maxWishes = 100; // Maximal 100 Wünsche speichern
    $wishes = array_slice($wishes, 0, $maxWishes);

    if (saveWishes($dataFile, $wishes)) {
        http_response_code(201);
        echo json_encode(['status' => 'success', 'message' => 'Wunsch hinzugefügt.', 'newWish' => $newWish]);
    }
    // Fehler werden von saveWishes() behandelt
    exit;
}

// Fallback für andere Methoden
http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Methode nicht erlaubt.']);
exit;

?>
