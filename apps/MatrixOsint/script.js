// =====================
// Matrix Code Rain
// =====================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 18;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// =====================
// Tabs
// =====================
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// =====================
// Suchmaschinen-URLs
// =====================
const SEARCH_ENGINES = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q='
};

// =====================
// E-Mail Suche
// =====================
function searchEmails() {
    const target = document.getElementById('email-target').value.trim();
    const engine = document.getElementById('email-engine').value;
    const searchTypes = Array.from(document.querySelectorAll('.search-type:checked')).map(cb => cb.value);

    if (!target) {
        alert('Bitte geben Sie eine Domain oder Organisation ein.');
        return;
    }

    const queries = generateEmailQueries(target, searchTypes);
    displayResults('E-Mail Suche', queries, engine);
}

function generateEmailQueries(target, types) {
    const queries = [];
    const domain = target.includes('.') ? target : `${target}.com`;
    queries.push(`"@${domain}"`);
    queries.push(`site:${domain} "@${domain}"`);
    if (types.includes('pdf')) {
        queries.push(`"${domain}" filetype:pdf "@${domain}"`);
        queries.push(`intext:"email: *@${domain}" filetype:pdf`);
    }
    if (types.includes('xlsx')) {
        queries.push(`"${domain}" filetype:xlsx OR filetype:xls "@${domain}"`);
    }
    if (types.includes('docx')) {
        queries.push(`"${domain}" filetype:docx OR filetype:doc "@${domain}"`);
    }
    if (types.includes('contact')) {
        queries.push(`site:${domain} intext:"contact" OR intext:"kontakt" "@${domain}"`);
        queries.push(`intitle:"contact" OR intitle:"kontakt" "${domain}"`);
    }
    queries.push(`"${domain}" intext:"email" OR intext:"e-mail" OR intext:"mail"`);
    queries.push(`site:${domain} filetype:pdf OR filetype:docx OR filetype:xlsx OR filetype:txt`);
    return queries;
}

// =====================
// Personen Suche
// =====================
function searchPerson() {
    const personName = document.getElementById('person-name').value.trim();
    const engine = document.getElementById('person-engine').value;
    const searchTypes = Array.from(document.querySelectorAll('.person-type:checked')).map(cb => cb.value);

    if (!personName) {
        alert('Bitte geben Sie einen Namen ein.');
        return;
    }

    const queries = generatePersonQueries(personName, searchTypes);
    displayResults('Personen Suche', queries, engine);
}

function generatePersonQueries(name, types) {
    const queries = [];
    const quotedName = `"${name}"`;
    queries.push(quotedName);
    queries.push(`allintitle:${quotedName}`);
    queries.push(`allintext:${quotedName}`);
    if (types.includes('linkedin')) {
        queries.push(`site:linkedin.com ${quotedName}`);
        queries.push(`site:linkedin.com/in ${quotedName}`);
    }
    if (types.includes('xing')) {
        queries.push(`site:xing.com ${quotedName}`);
    }
    if (types.includes('resume')) {
        queries.push(`${quotedName} filetype:pdf "curriculum vitae" OR "lebenslauf" OR "resume"`);
        queries.push(`${quotedName} intitle:"cv" OR intitle:"resume" OR intitle:"lebenslauf"`);
    }
    if (types.includes('news')) {
        queries.push(`${quotedName} site:news.google.com`);
        queries.push(`${quotedName} inurl:news OR inurl:nachrichten`);
    }
    queries.push(`${quotedName} intext:"telefon" OR intext:"phone" OR intext:"email"`);
    queries.push(`${quotedName} filetype:pdf OR filetype:docx OR filetype:txt`);
    return queries;
}

// =====================
// Dokumente Suche
// =====================
function searchDocuments() {
    const query = document.getElementById('doc-query').value.trim();
    const engine = document.getElementById('doc-engine').value;
    const docTypes = Array.from(document.querySelectorAll('.doc-type:checked')).map(cb => cb.value);

    if (!query) {
        alert('Bitte geben Sie einen Suchbegriff oder Domain ein.');
        return;
    }

    const queries = generateDocumentQueries(query, docTypes);
    displayResults('Dokumente Suche', queries, engine);
}

function generateDocumentQueries(query, types) {
    const queries = [];
    if (types.length === 0) {
        types = ['pdf', 'docx', 'xlsx', 'pptx', 'txt'];
    }
    types.forEach(type => {
        if (query.includes('.')) {
            queries.push(`site:${query} filetype:${type}`);
        } else {
            queries.push(`"${query}" filetype:${type}`);
        }
    });
    const fileTypes = types.join(' OR filetype:');
    queries.push(`"${query}" filetype:${fileTypes}`);
    queries.push(`"${query}" "confidential" OR "vertraulich" filetype:pdf`);
    queries.push(`"${query}" "internal" OR "intern" filetype:pdf OR filetype:docx`);
    return queries;
}

// =====================
// Social Media Suche
// =====================
function searchSocial() {
    const query = document.getElementById('social-query').value.trim();
    const engine = document.getElementById('social-engine').value;
    const socialTypes = Array.from(document.querySelectorAll('.social-type:checked')).map(cb => cb.value);

    if (!query) {
        alert('Bitte geben Sie einen Namen oder Suchbegriff ein.');
        return;
    }

    const queries = generateSocialQueries(query, socialTypes);
    displayResults('Social Media Suche', queries, engine);
}

function generateSocialQueries(query, types) {
    const queries = [];
    const quotedQuery = `"${query}"`;

    const platforms = {
        linkedin: 'linkedin.com',
        facebook: 'facebook.com',
        twitter: 'twitter.com',
        instagram: 'instagram.com',
        xing: 'xing.com'
    };

    if (types.length === 0) {
        types = Object.keys(platforms);
    }

    types.forEach(type => {
        if (platforms[type]) {
            queries.push(`site:${platforms[type]} ${quotedQuery}`);
            if (type === 'linkedin') {
                queries.push(`site:linkedin.com/in ${quotedQuery}`);
                queries.push(`site:linkedin.com/pub ${quotedQuery}`);
            }
        }
    });

    const sites = types.map(type => `site:${platforms[type]}`).join(' OR ');
    if (sites) {
        queries.push(`(${sites}) ${quotedQuery}`);
    }
    return queries;
}

// =====================
// Custom Dorks
// =====================
function searchCustom() {
    const customDork = document.getElementById('custom-dork').value.trim();
    const engine = document.getElementById('custom-engine').value;

    if (!customDork) {
        alert('Bitte geben Sie einen Custom Dork ein.');
        return;
    }

    displayResults('Custom Dork Suche', [customDork], engine);
}

function setDork(dork) {
    document.getElementById('custom-dork').value = dork;
}

// =====================
// Ergebnisse anzeigen
// =====================
function displayResults(searchType, queries, engine) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading"></div>
            <p style="margin-top: 15px; color: #aaffaa;">Generiere Suchanfragen...</p>
        </div>
    `;
    setTimeout(() => {
        let html = `<h4 style="color: #0f0; margin-bottom: 20px;">${searchType} – ${queries.length} Suchanfragen generiert</h4>`;
        queries.forEach((query, index) => {
            const encodedQuery = encodeURIComponent(query);
            const searchUrl = SEARCH_ENGINES[engine] + encodedQuery;
            html += `
                <div class="result-item">
                    <div class="result-query">${index + 1}. ${query}</div>
                    <a href="${searchUrl}" target="_blank" class="result-link">
                        <i class="fas fa-external-link-alt"></i> In ${engine.charAt(0).toUpperCase() + engine.slice(1)} öffnen
                    </a>
                </div>
            `;
        });
        html += `
            <div style="margin-top: 20px; padding: 15px; background: #003300; border-radius: 8px; border-left: 4px solid #0f0;">
                <strong><i class="fas fa-info-circle"></i> Hinweis:</strong> 
                Klicken Sie auf die Links, um die Suchanfragen in ${engine.charAt(0).toUpperCase() + engine.slice(1)} auszuführen. 
                Jede Suchanfrage öffnet sich in einem neuen Tab.
            </div>
        `;
        resultsContainer.innerHTML = html;
    }, 1000);
}

// =====================
// Erweiterte OSINT-Funktionen
// =====================

// Erweiterte Domain-Analyse
function runAdvancedSearch() {
    const domain = document.getElementById('domain-input').value.trim();
    if (!domain) return alert('Domain eingeben!');
    const queries = [
        `site:${domain} filetype:pdf | filetype:docx | filetype:xlsx`,
        `inurl:${domain} intitle:"index of"`,
        `site:archive.org inurl:${domain}`,
        `site:linkedin.com employees ${domain}`,
        `"${domain}" "password" | "login" | "credentials" filetype:log`
    ];
    displayResults('Vollscan', queries, 'google');
}

// Buttons für vordefinierte erweiterte Suchen
function setDomainDorks() {
    const domain = document.getElementById('domain-input').value.trim();
    if (!domain) return alert('Domain eingeben!');
    const queries = [
        `site:${domain} (intitle:"index of" | "parent directory")`,
        `site:${domain} filetype:pdf | filetype:docx | filetype:xlsx`,
        `site:${domain} intext:"confidential" | intext:"vertraulich"`,
    ];
    displayResults('Domain-Analyse', queries, 'google');
}

function setLeakSearch() {
    const domain = document.getElementById('domain-input').value.trim();
    if (!domain) return alert('Domain eingeben!');
    const queries = [
        `"${domain}" (password | passwd | pwd) filetype:env | filetype:log`,
        `"${domain}" filetype:sql intext:password`,
        `"${domain}" filetype:db intext:password`
    ];
    displayResults('Datenleck-Suche', queries, 'google');
}

function setArchiveSearch() {
    const domain = document.getElementById('domain-input').value.trim();
    if (!domain) return alert('Domain eingeben!');
    const queries = [
        `site:archive.org/*/${domain}`,
        `site:web.archive.org "${domain}"`
    ];
    displayResults('Wayback Machine', queries, 'google');
}

// =====================
// OSINT-Links (ohne API/Anmeldung)
// =====================
function openOsintLinks() {
    const value = document.getElementById('osint-query').value.trim();
    if (!value) return alert('Bitte E-Mail oder Domain eingeben!');
    const links = [];
    // E-Mail-Check
    if (value.includes('@')) {
        links.push({
            name: 'Have I Been Pwned',
            url: `https://haveibeenpwned.com/unifiedsearch/${encodeURIComponent(value)}`
        });
        links.push({
            name: 'Hunter.io (Suche)',
            url: `https://hunter.io/search/${encodeURIComponent(value)}`
        });
    }
    // Domain-Check
    if (value.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        links.push({
            name: 'crt.sh (Zertifikate)',
            url: `https://crt.sh/?q=${encodeURIComponent(value)}`
        });
        links.push({
            name: 'PublicWWW',
            url: `https://publicwww.com/websites/${encodeURIComponent(value)}/`
        });
        links.push({
            name: 'Wayback Machine',
            url: `https://web.archive.org/web/*/${encodeURIComponent(value)}`
        });
        links.push({
            name: 'Shodan (Websuche)',
            url: `https://www.shodan.io/search?query=${encodeURIComponent(value)}`
        });
    }
    // Ergebnisse anzeigen
    const ul = document.getElementById('osint-results');
    ul.innerHTML = '';
    links.forEach(l => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${l.url}" target="_blank" rel="noopener">${l.name}</a>`;
        ul.appendChild(li);
    });
}

// =====================
// Komfort: STRG+Enter für Suche
// =====================
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        const activeTab = document.querySelector('.tab-content.active');
        const searchBtn = activeTab.querySelector('.search-btn');
        if (searchBtn) searchBtn.click();
    }
});

// =====================
// Initialisierung (optional für Logging)
// =====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix OSINT Tool geladen');
});
