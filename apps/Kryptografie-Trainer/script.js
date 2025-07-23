/* style.css - SteamPunk Kryptografie-Trainer */

/* ========== Basis Styles ========== */
:root {
    --brass: #b68f40;
    --copper: #d4af37;
    --aged-paper: #2a231d;
    --rivet: #6b5b45;
    --steam-dark: #1a120b;
    --steam-light: #3a2f28;
}

body {
    background: linear-gradient(45deg, var(--steam-light) 0%, var(--steam-dark) 100%),
    url('old-paper-texture.jpg');
    font-family: 'Quintessential', cursive;
    min-height: 100vh;
    color: var(--copper);
    overflow-x: hidden;
}

/* ========== Zahnrad-Animationen ========== */
@keyframes clockwise {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes counter-clockwise {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
}

.gear-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: -1;
}

.gear {
    position: absolute;
    background-image: url('gear-texture.png');
    background-size: cover;
    opacity: 0.15;
}

.large-gear {
    width: 200px;
    height: 200px;
    animation: clockwise 25s linear infinite;
    top: 15%;
    left: 5%;
}

.medium-gear {
    width: 150px;
    height: 150px;
    animation: counter-clockwise 20s linear infinite;
    top: 65%;
    right: 10%;
}

.small-gear {
    width: 100px;
    height: 100px;
    animation: clockwise 15s linear infinite;
    top: 30%;
    right: 20%;
}

/* ========== Haupt-Container ========== */
.enigma-panel {
    background: rgba(42, 35, 29, 0.9);
    border: 3px solid var(--brass);
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(182, 143, 64, 0.3);
    padding: 2rem;
    position: relative;
    backdrop-filter: blur(5px);
}

.riveted-border::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px dotted var(--rivet);
    border-radius: 15px;
}

/* ========== Rotoren-Anzeige ========== */
.rotor-display {
    text-align: center;
    margin: 2rem 0;
}

.rotor-wheel {
    display: inline-block;
    width: 80px;
    height: 80px;
    border: 4px solid var(--brass);
    border-radius: 50%;
    background: var(--steam-dark);
    line-height: 80px;
    font-size: 2rem;
    margin: 0 1.5rem;
    box-shadow: 0 0 15px rgba(182, 143, 64, 0.5);
    transition: transform 0.3s ease;
}

.rotor-wheel:hover {
    transform: scale(1.05);
}

/* ========== Steckerbrett ========== */
.plugboard-panel {
    background: rgba(26, 18, 11, 0.8);
    padding: 1.5rem;
    margin-top: 2rem;
}

.plugboard-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
}

.plug-connection {
    padding: 0.5rem;
    border: 2px solid var(--rivet);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.plug-connection.active {
    background: var(--brass);
    color: var(--steam-dark);
    box-shadow: 0 0 10px var(--brass);
}

/* ========== Eingabe-Elemente ========== */
.steampunk-input {
    background: var(--steam-dark) !important;
    border: 2px solid var(--rivet) !important;
    color: var(--copper) !important;
    font-family: 'Courier New', monospace;
    transition: all 0.3s ease;
}

.steampunk-input:focus {
    border-color: var(--brass) !important;
    box-shadow: 0 0 15px var(--brass) !important;
}

/* ========== Knöpfe ========== */
.brass-btn {
    background: linear-gradient(145deg, var(--brass), #9c7a36);
    border: 2px solid var(--rivet);
    color: var(--steam-dark);
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease;
}

.brass-btn:hover {
    background: linear-gradient(145deg, #9c7a36, var(--brass));
    box-shadow: 0 0 15px var(--brass);
}

.copper-btn {
    background: linear-gradient(145deg, var(--copper), #b99330);
    border: 2px solid var(--rivet);
    color: var(--steam-dark);
}

/* ========== Fortschrittsbalken ========== */
.steam-progress {
    height: 12px;
    background: var(--steam-dark);
    border: 2px solid var(--rivet);
    border-radius: 6px;
    overflow: hidden;
}

.steam-progress .progress-bar {
    background: linear-gradient(90deg, var(--brass), var(--copper));
    transition: width 0.5s ease;
}

/* ========== Responsive Design ========== */
@media (max-width: 768px) {
.rotor-wheel {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 1.5rem;
    }

.plugboard-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* ========== Spezial-Effekte ========== */
@keyframes steam-pulse {
    0% { opacity: 0.3; }
    50% { opacity: 0.7; }
    100% { opacity: 0.3; }
}

.enigma-panel::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(182,143,64,0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: steam-pulse 3s ease infinite;
}
