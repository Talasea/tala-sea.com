// SQL Cheat Sheet Daten
const sqlData = {
    "categories": [
        {
            "title": "Datenbank & Tabelle (DDL)",
            "entries": [
                {"command": "CREATE DATABASE mydb;", "description": "Erstellt eine neue Datenbank"},
                {"command": "DROP DATABASE mydb;", "description": "Löscht eine Datenbank dauerhaft"},
                {"command": "CREATE TABLE person (id INT PRIMARY KEY, name VARCHAR(50));", "description": "Erstellt eine neue Tabelle"},
                {"command": "ALTER TABLE person ADD COLUMN age INT;", "description": "Ändert Tabellenschema"},
                {"command": "DROP TABLE person;", "description": "Löscht Tabelle"}
            ]
        },
        {
            "title": "Daten bearbeiten (DML)",
            "entries": [
                {"command": "INSERT INTO person (name,age) VALUES ('Max',30);", "description": "Fügt Datensätze ein"},
                {"command": "UPDATE person SET age=31 WHERE id=1;", "description": "Aktualisiert Datensätze"},
                {"command": "DELETE FROM person WHERE id=1;", "description": "Löscht Datensätze"}
            ]
        },
        {
            "title": "Daten abfragen (DQL)",
            "entries": [
                {"command": "SELECT * FROM person;", "description": "Liest alle Spalten"},
                {"command": "SELECT name FROM person WHERE age > 30;", "description": "Gefilterte Abfrage"},
                {"command": "SELECT * FROM person ORDER BY age DESC LIMIT 5;", "description": "Sortierung & Begrenzung"}
            ]
        },
        {
            "title": "Joins",
            "entries": [
                {"command": "INNER JOIN", "description": "Zeigt übereinstimmende Zeilen beider Tabellen"},
                {"command": "LEFT JOIN", "description": "Alle Zeilen links + passende rechts"},
                {"command": "RIGHT JOIN", "description": "Alle Zeilen rechts + passende links"},
                {"command": "FULL JOIN", "description": "Alle Zeilen aus beiden Tabellen"}
            ]
        },
        {
            "title": "Aggregation & Gruppierung",
            "entries": [
                {"command": "COUNT(*)", "description": "Zählt Zeilen"},
                {"command": "SUM(price)", "description": "Summiert Werte"},
                {"command": "GROUP BY status", "description": "Gruppiert Zeilen"},
                {"command": "HAVING SUM(price)>100", "description": "Filtert Gruppen"}
            ]
        },
        {
            "title": "Transaktionen (TCL)",
            "entries": [
                {"command": "BEGIN TRANSACTION;", "description": "Startet Transaktion"},
                {"command": "COMMIT;", "description": "Bestätigt Änderungen"},
                {"command": "ROLLBACK;", "description": "Macht Änderungen rückgängig"}
            ]
        },
        {
            "title": "Benutzer & Rechte (DCL)",
            "entries": [
                {"command": "GRANT SELECT ON person TO app_user;", "description": "Verleiht Rechte"},
                {"command": "REVOKE SELECT ON person FROM app_user;", "description": "Entzieht Rechte"}
            ]
        },
        {
            "title": "Indizes & Performance",
            "entries": [
                {"command": "CREATE INDEX idx_age ON person(age);", "description": "Erstellt Index"},
                {"command": "EXPLAIN SELECT * FROM person;", "description": "Zeigt Ausführungsplan"}
            ]
        }
    ]
};

// Globale Variablen
let currentTheme = 'light';
let searchTerm = '';

// DOM-Elemente
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const accordionContainer = document.getElementById('sqlAccordion');
const toast = document.getElementById('toast');

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    renderAccordion();
    initializeEventListeners();
    initializeTheme();
});

// Accordion rendern
function renderAccordion() {
    accordionContainer.innerHTML = '';
    
    sqlData.categories.forEach((category, categoryIndex) => {
        const categoryElement = createCategoryElement(category, categoryIndex);
        accordionContainer.appendChild(categoryElement);
    });
}

// Kategorie-Element erstellen
function createCategoryElement(category, categoryIndex) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'accordion-category';
    categoryDiv.setAttribute('data-category-index', categoryIndex);
    
    // Header
    const headerButton = document.createElement('button');
    headerButton.className = 'accordion-header';
    headerButton.setAttribute('aria-expanded', 'false');
    headerButton.setAttribute('aria-controls', `accordion-content-${categoryIndex}`);
    headerButton.innerHTML = `
        <span>${category.title}</span>
        <span class="accordion-icon">▼</span>
    `;
    
    // Content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'accordion-content';
    contentDiv.id = `accordion-content-${categoryIndex}`;
    
    const table = document.createElement('table');
    table.className = 'command-table';
    
    // Tabellen-Header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Befehl</th>
            <th>Beschreibung</th>
            <th>Aktion</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // Tabellen-Body
    const tbody = document.createElement('tbody');
    category.entries.forEach((entry, entryIndex) => {
        const row = createCommandRow(entry, categoryIndex, entryIndex);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    contentDiv.appendChild(table);
    
    // Event-Listener für Header
    headerButton.addEventListener('click', () => {
        toggleAccordion(categoryDiv, headerButton);
    });
    
    categoryDiv.appendChild(headerButton);
    categoryDiv.appendChild(contentDiv);
    
    return categoryDiv;
}

// Befehl-Zeile erstellen
function createCommandRow(entry, categoryIndex, entryIndex) {
    const row = document.createElement('tr');
    row.className = 'command-row';
    row.setAttribute('data-category-index', categoryIndex);
    row.setAttribute('data-entry-index', entryIndex);
    
    row.innerHTML = `
        <td>
            <code class="command-cell">${escapeHtml(entry.command)}</code>
        </td>
        <td>${escapeHtml(entry.description)}</td>
        <td>
            <button class="copy-button" onclick="copyToClipboard('${escapeHtml(entry.command)}', this)" aria-label="Befehl kopieren">
                Kopieren
            </button>
        </td>
    `;
    
    return row;
}

// Accordion umschalten
function toggleAccordion(categoryDiv, headerButton) {
    const isActive = categoryDiv.classList.contains('active');
    
    if (isActive) {
        categoryDiv.classList.remove('active');
        headerButton.setAttribute('aria-expanded', 'false');
    } else {
        categoryDiv.classList.add('active');
        headerButton.setAttribute('aria-expanded', 'true');
    }
}

// Event-Listener initialisieren
function initializeEventListeners() {
    // Theme-Toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Suche
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', handleSearch);
    
    // Tastatur-Navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Theme wechseln
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', currentTheme === 'dark');
    themeToggle.setAttribute('aria-pressed', currentTheme === 'dark');
    
    // Theme in einer Variablen speichern (keine localStorage)
    updateThemeIcon();
}

// Theme-Icon aktualisieren
function updateThemeIcon() {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// Theme initialisieren
function initializeTheme() {
    // Prüfe System-Präferenz
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
        document.body.classList.add('dark');
        themeToggle.setAttribute('aria-pressed', 'true');
    }
    updateThemeIcon();
}

// Suche behandeln
function handleSearch(event) {
    searchTerm = event.target.value.toLowerCase().trim();
    filterCommands();
}

// Befehle filtern
function filterCommands() {
    const categories = document.querySelectorAll('.accordion-category');
    
    categories.forEach(category => {
        const categoryIndex = parseInt(category.getAttribute('data-category-index'));
        const rows = category.querySelectorAll('.command-row');
        let hasVisibleRows = false;
        
        rows.forEach(row => {
            const entryIndex = parseInt(row.getAttribute('data-entry-index'));
            const entry = sqlData.categories[categoryIndex].entries[entryIndex];
            
            const matchesSearch = !searchTerm || 
                entry.command.toLowerCase().includes(searchTerm) ||
                entry.description.toLowerCase().includes(searchTerm);
            
            if (matchesSearch) {
                row.classList.remove('hidden');
                hasVisibleRows = true;
            } else {
                row.classList.add('hidden');
            }
        });
        
        // Kategorie ausblenden wenn keine Treffer
        if (!hasVisibleRows && searchTerm) {
            category.classList.add('hidden');
        } else {
            category.classList.remove('hidden');
            
            // Kategorie automatisch öffnen bei Suche
            if (searchTerm && hasVisibleRows) {
                category.classList.add('active');
                const header = category.querySelector('.accordion-header');
                header.setAttribute('aria-expanded', 'true');
            }
        }
    });
}

// In Zwischenablage kopieren
async function copyToClipboard(text, button) {
    try {
        // Versuche moderne Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback für ältere Browser
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }
        
        showToast('Kopiert!');
        
        // Visuelles Feedback für Button
        const originalText = button.textContent;
        button.textContent = 'Kopiert!';
        button.style.backgroundColor = 'var(--color-success)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1000);
        
    } catch (err) {
        console.error('Kopieren fehlgeschlagen:', err);
        showToast('Fehler beim Kopieren');
    }
}

// Toast-Nachricht anzeigen
function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Tastatur-Navigation
function handleKeyboardNavigation(event) {
    // ESC zum Schließen der Suche
    if (event.key === 'Escape' && searchInput === document.activeElement) {
        searchInput.blur();
        searchInput.value = '';
        searchTerm = '';
        filterCommands();
    }
    
    // Strg+K zum Fokussieren der Suche
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInput.focus();
    }
}

// HTML escapen
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Accessibility: Fokus-Management
function manageFocus() {
    // Fokus auf ersten sichtbaren Befehl nach Suche
    const firstVisibleRow = document.querySelector('.command-row:not(.hidden)');
    if (firstVisibleRow && searchTerm) {
        const copyButton = firstVisibleRow.querySelector('.copy-button');
        if (copyButton) {
            copyButton.focus();
        }
    }
}

// Responsive: Fenster-Größe ändern
window.addEventListener('resize', debounce(() => {
    // Hier könnten responsive Anpassungen gemacht werden
    console.log('Fenster-Größe geändert');
}, 250));

// Debounce-Funktion
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportiere für globale Verwendung
window.copyToClipboard = copyToClipboard;