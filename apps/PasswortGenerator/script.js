document.addEventListener('DOMContentLoaded', () => {
    // --- Matrix Regen Effekt ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let cols = Math.floor(w / 20) + 1;
    let ypos = Array(cols).fill(0);

    ctx.fillStyle = '#000'; // Start mit schwarzem Hintergrund
    ctx.fillRect(0, 0, w, h);

    function matrix() {
        // Langsam verblassenden Hintergrund zeichnen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, w, h);

        // Textfarbe und Font
        ctx.fillStyle = '#00FF41'; // Matrix Grün
        ctx.font = '15pt monospace';

        // Für jede Spalte
        ypos.forEach((y, ind) => {
            // Zufälliges Zeichen auswählen (Katakana oder 0/1)
            // const text = String.fromCharCode(Math.random() * 128); // ASCII
            const text = Math.random() < 0.5 ? '0' : '1'; // Einfacher 0/1 Effekt
            // const text = String.fromCharCode(0x30A0 + Math.random() * 96); // Katakana

            // Zeichenposition berechnen
            const x = ind * 20;
            // Zeichen zeichnen
            ctx.fillText(text, x, y);

            // Wenn das Zeichen den unteren Rand erreicht hat
            if (y > 100 + Math.random() * 10000) {
                // Zufällig zurücksetzen
                ypos[ind] = 0;
            } else {
                // Nach unten bewegen
                ypos[ind] = y + 20;
            }
        });
    }

    // Matrix-Animation starten
    const matrixInterval = setInterval(matrix, 50); // Geschwindigkeit anpassen

    // Fenstergröße anpassen
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        cols = Math.floor(w / 20) + 1;
        ypos = Array(cols).fill(0);
        // Canvas neu zeichnen nach Resize, um Artefakte zu vermeiden
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
    });

    // --- Passwort Generator Logik ---
    const passwordDisplay = document.getElementById('password-display');
    const lengthSlider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Länge initial anzeigen und bei Änderung aktualisieren
    lengthValue.textContent = lengthSlider.value;
    lengthSlider.addEventListener('input', (event) => {
        lengthValue.textContent = event.target.value;
    });

    // Funktion zum Generieren des Passworts
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        let allowedChars = '';
        let password = '';
        let guaranteedChars = ''; // Um sicherzustellen, dass jeder Typ enthalten ist

        if (!includeUppercase.checked && !includeLowercase.checked && !includeNumbers.checked && !includeSymbols.checked) {
            alert("Bitte mindestens einen Zeichensatz auswählen!");
            // Standardmäßig Kleinbuchstaben aktivieren, wenn nichts ausgewählt ist
            includeLowercase.checked = true;
        }

        if (includeUppercase.checked) {
            allowedChars += uppercaseChars;
            guaranteedChars += getRandomChar(uppercaseChars);
        }
        if (includeLowercase.checked) {
            allowedChars += lowercaseChars;
            guaranteedChars += getRandomChar(lowercaseChars);
        }
        if (includeNumbers.checked) {
            allowedChars += numberChars;
            guaranteedChars += getRandomChar(numberChars);
        }
        if (includeSymbols.checked) {
            allowedChars += symbolChars;
            guaranteedChars += getRandomChar(symbolChars);
        }

        // Wenn keine Zeichen erlaubt sind (sollte nicht passieren wegen Check oben, aber sicher ist sicher)
        if (allowedChars === '') {
            passwordDisplay.value = 'Keine Zeichen gewählt!';
            return;
        }

        // Fülle den Rest des Passworts mit zufälligen Zeichen aus den erlaubten
        const remainingLength = length - guaranteedChars.length;
        for (let i = 0; i < remainingLength; i++) {
            password += getRandomChar(allowedChars);
        }

        // Füge die garantierten Zeichen hinzu und mische das Passwort
        password += guaranteedChars;
        password = shuffleString(password);

        passwordDisplay.value = password;
    }

    // Hilfsfunktion: Zufälliges Zeichen aus einem String holen
    function getRandomChar(str) {
        const randomIndex = Math.floor(Math.random() * str.length);
        return str[randomIndex];
    }

    // Hilfsfunktion: String mischen (Fisher-Yates Shuffle)
    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Tausche Elemente
        }
        return arr.join('');
    }


    // Event Listener für den Generate-Button
    generateBtn.addEventListener('click', generatePassword);

    // Event Listener für den Kopieren-Button
    copyBtn.addEventListener('click', () => {
        if (!passwordDisplay.value) return; // Nichts zu kopieren

        passwordDisplay.select(); // Text im Inputfeld auswählen
        // Für mobile Geräte
        passwordDisplay.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(passwordDisplay.value)
            .then(() => {
                // Visuelles Feedback (optional)
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`; // Checkmark Icon
                copyBtn.title = "Kopiert!";
                setTimeout(() => {
                    copyBtn.innerHTML = originalContent; // Zurück zum ursprünglichen Icon
                    copyBtn.title = "Passwort kopieren";
                }, 1500); // Nach 1.5 Sekunden zurücksetzen
            })
            .catch(err => {
                console.error('Fehler beim Kopieren: ', err);
                alert('Kopieren fehlgeschlagen. Bitte manuell kopieren.');
            });
    });

    // Initial ein Passwort generieren beim Laden der Seite
    generatePassword();
});