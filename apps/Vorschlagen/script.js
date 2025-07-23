// --- Matrix Regen Effekt ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
const matrixInterval = setInterval(drawMatrix, 35); // Startet den Effekt

// --- Wunsch-Pinwand Funktionalität (PHP Backend) ---
const wishInput = document.getElementById('wish-input');
const submitButton = document.getElementById('submit-wish');
const feedbackMessage = document.getElementById('feedback-message');
const pinwall = document.getElementById('pinwall');

// URL zu deinem PHP-Skript
// WICHTIG: Passe dies an den tatsächlichen Pfad auf deinem Server an!
const API_URL = 'pinwand_api.php';

// Funktion zum Anzeigen einer Feedback-Nachricht
function showFeedback(message, isError = false) {
    feedbackMessage.textContent = message;
    feedbackMessage.style.color = isError ? '#FF4136' : '#00FF41'; // Rot für Fehler
    feedbackMessage.classList.add('visible');
    setTimeout(() => {
        feedbackMessage.classList.remove('visible');
    }, isError ? 5000 : 4000);
}

// Funktion zum Laden der Wünsche von der PHP API
async function loadWishes() {
    console.log("> Lade Wünsche von", API_URL);
    pinwall.innerHTML = '<p class="loading-message">> Lade Wünsche aus der Matrix...</p>';

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Fehler ${response.status}: ${response.statusText}`);
        }

        const wishes = await response.json();
        console.log("> Wünsche empfangen:", wishes);

        pinwall.innerHTML = ''; // Pinwand leeren

        if (!Array.isArray(wishes) || wishes.length === 0) {
            pinwall.innerHTML = '<p class="empty-message">> Noch keine Wünsche in der Matrix. Sei der Erste!</p>';
            return;
        }

        wishes.forEach(wishData => {
            const wishElement = document.createElement('div');
            wishElement.classList.add('wish-item');

            const textNode = document.createTextNode(wishData.text); // Sicherer Weg, Text einzufügen
            wishElement.appendChild(textNode);

            if (wishData.timestamp) {
                const date = new Date(wishData.timestamp * 1000);
                const formattedTime = date.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short'});
                const timeElement = document.createElement('span');
                timeElement.style.fontSize = '0.8em';
                timeElement.style.opacity = '0.6';
                timeElement.style.display = 'block';
                timeElement.style.marginTop = '5px';
                timeElement.textContent = `_gesendet: ${formattedTime}`;
                wishElement.appendChild(timeElement);
            }
            pinwall.appendChild(wishElement);
        });

    } catch (error) {
        console.error("Fehler beim Laden der Pinwand:", error);
        pinwall.innerHTML = `<p class="empty-message" style="color: #FF4136;">> FEHLER: Verbindung zur Wunsch-Matrix fehlgeschlagen! (${error.message})</p>`;
        showFeedback('> FEHLER beim Laden der Wünsche!', true);
    }
}

// Event Listener für den Senden-Button
submitButton.addEventListener('click', async () => {
    const wishText = wishInput.value.trim();

    if (wishText === '') {
        showFeedback('> FEHLER: Leerer Wunsch nicht möglich_', true);
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = '> Sende...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wish: wishText }) // Wunsch als JSON senden
        });

        const result = await response.json(); // Antwort vom PHP-Skript lesen

        if (!response.ok || result.status !== 'success') {
            // Wenn Server Fehler meldet oder PHP 'status: error' sendet
            throw new Error(result.message || `HTTP Fehler ${response.status}`);
        }

        showFeedback('> Wunsch erfolgreich an die Pinwand gesendet!');
        wishInput.value = '';
        loadWishes(); // Pinwand neu laden, um den neuen Wunsch anzuzeigen

    } catch (error) {
        console.error("Fehler beim Senden des Wunsches:", error);
        showFeedback(`> FEHLER beim Senden: ${error.message}`, true);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '> Wunsch an Pinwand senden_';
    }
});

// --- Initiales Laden ---
document.addEventListener('DOMContentLoaded', loadWishes); // Wünsche beim Start laden

// --- Fenster-Resize für Matrix-Effekt ---
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Neuberechnung der Spalten etc. hier nicht unbedingt nötig
});