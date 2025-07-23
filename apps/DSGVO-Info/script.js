/*
 * DSGVO Interaktives Web-Tool
 * Vollständig funktionsfähige Version mit PDF.js Integration
 */

// Global State Management
const AppState = {
    pdfDoc: null,
    currentPage: 1,
    totalPages: 0,
    scale: 1.2,
    rotation: 0,
    currentView: 'pdf-viewer',
    searchMatches: [],
    currentMatch: 0,
    essentialsData: [],
    linksData: [],
    chaptersData: [],
    isLoading: false
};

// PDF.js Worker Configuration
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs';
}

// DOM Elements Cache
const Elements = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    views: document.querySelectorAll('.view'),

    // PDF Controls
    prevPageBtn: document.getElementById('prev-page'),
    nextPageBtn: document.getElementById('next-page'),
    currentPageSpan: document.getElementById('current-page'),
    totalPagesSpan: document.getElementById('total-pages'),
    zoomInBtn: document.getElementById('zoom-in'),
    zoomOutBtn: document.getElementById('zoom-out'),
    zoomLevelSpan: document.getElementById('zoom-level'),

    // PDF Viewer
    pdfCanvas: document.getElementById('pdf-canvas'),
    textLayer: document.getElementById('text-layer'),
    pdfLoading: document.getElementById('pdf-loading'),

    // Search
    globalSearch: document.getElementById('global-search'),
    searchBtn: document.getElementById('search-btn'),
    searchPrevBtn: document.getElementById('search-prev'),
    searchNextBtn: document.getElementById('search-next'),
    advancedSearchInput: document.getElementById('advanced-search-input'),
    advancedSearchBtn: document.getElementById('advanced-search-btn'),
    searchResults: document.getElementById('search-results'),
    caseSensitive: document.getElementById('case-sensitive'),
    wholeWord: document.getElementById('whole-word'),

    // Content containers
    outlineList: document.getElementById('outline-list'),
    chapterNavList: document.getElementById('chapter-nav-list'),
    chaptersContainer: document.getElementById('chapters-container'),
    essentialsContainer: document.getElementById('essentials-container'),
    categoryFilter: document.getElementById('category-filter'),
    linksContainer: document.getElementById('links-container'),

    // Loading and notifications
    appLoading: document.getElementById('app-loading'),
    loadingStatus: document.getElementById('loading-status'),
    notificationToast: document.getElementById('notification-toast'),
    toastMessage: document.getElementById('toast-message'),
    toastClose: document.getElementById('toast-close')
};

// Initialize Application
async function initializeApp() {
    try {
        showAppLoading('Lade PDF.js...');

        // Load PDF document
        await loadPDF();

        showAppLoading('Lade Zusatzdaten...');

        // Load additional data
        await Promise.all([
            loadEssentialsData(),
            loadLinksData(),
            loadChaptersData()
        ]);

        showAppLoading('Initialisiere Benutzeroberfläche...');

        // Setup UI
        setupUI();
        setupEventListeners();

        hideAppLoading();
        showNotification('DSGVO Tool erfolgreich geladen!', 'success');

        console.log('✅ DSGVO Tool erfolgreich initialisiert!');

    } catch (error) {
        console.error('❌ Fehler beim Initialisieren:', error);
        hideAppLoading();
        showNotification('Fehler beim Laden der Anwendung', 'error');
    }
}

// PDF Loading and Rendering
async function loadPDF() {
    const pdfUrl = 'DSGVO DSB1.pdf';

    try {
        Elements.pdfLoading.classList.remove('hidden');

        const loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            cMapUrl: 'https://mozilla.github.io/pdf.js/cmaps/',
            cMapPacked: true
        });

        AppState.pdfDoc = await loadingTask.promise;
        AppState.totalPages = AppState.pdfDoc.numPages;

        console.log(`📄 PDF geladen: ${AppState.totalPages} Seiten`);

        // Load PDF outline
        await loadPDFOutline();

        // Render first page
        await renderPage(1);

        Elements.pdfLoading.classList.add('hidden');

    } catch (error) {
        console.error('Fehler beim Laden des PDFs:', error);
        Elements.pdfLoading.innerHTML = `
            <div class="error-message">
                <h3>❌ PDF konnte nicht geladen werden</h3>
                <p>Bitte überprüfen Sie, ob die Datei existiert:<br>
                <code>${pdfUrl}</code></p>
            </div>
        `;
        throw error;
    }
}

async function renderPage(pageNum) {
    if (!AppState.pdfDoc || pageNum < 1 || pageNum > AppState.totalPages) {
        return;
    }

    AppState.isLoading = true;
    AppState.currentPage = pageNum;

    try {
        const page = await AppState.pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({
            scale: AppState.scale,
            rotation: AppState.rotation
        });

        // Setup canvas
        const canvas = Elements.pdfCanvas;
        const context = canvas.getContext('2d');

        // Support for high DPI displays
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        // Render page
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
            transform: transform
        };

        await page.render(renderContext).promise;

        // Update UI
        updatePageInfo();
        updateNavigationButtons();

        console.log(`📖 Seite ${pageNum} gerendert`);

    } catch (error) {
        console.error(`Fehler beim Rendern von Seite ${pageNum}:`, error);
    }

    AppState.isLoading = false;
}

async function loadPDFOutline() {
    try {
        const outline = await AppState.pdfDoc.getOutline();

        if (outline && outline.length > 0) {
            renderPDFOutline(outline);
        } else {
            Elements.outlineList.innerHTML = '<p class="no-outline">Kein Inhaltsverzeichnis verfügbar</p>';
        }

    } catch (error) {
        console.error('Fehler beim Laden des PDF-Inhaltsverzeichnisses:', error);
        Elements.outlineList.innerHTML = '<p class="outline-error">Fehler beim Laden</p>';
    }
}

function renderPDFOutline(outline, level = 0) {
    const container = level === 0 ? Elements.outlineList : document.createElement('div');

    outline.forEach(item => {
        const outlineItem = document.createElement('div');
        outlineItem.className = `outline-item level-${level}`;
        outlineItem.style.paddingLeft = `${level * 1}rem`;
        outlineItem.textContent = item.title;

        outlineItem.addEventListener('click', async () => {
            if (item.dest) {
                try {
                    const pageIndex = await getPageIndexFromDestination(item.dest);
                    if (pageIndex !== null) {
                        await renderPage(pageIndex + 1);
                        showView('pdf-viewer');
                    }
                } catch (error) {
                    console.error('Fehler beim Navigieren zu Gliederungspunkt:', error);
                }
            }
        });

        container.appendChild(outlineItem);

        // Recursive rendering for nested items
        if (item.items && item.items.length > 0) {
            const subContainer = document.createElement('div');
            subContainer.className = 'outline-sub-items';
            renderPDFOutline(item.items, level + 1);
            container.appendChild(subContainer);
        }
    });

    if (level === 0 && container.children.length === 0) {
        container.innerHTML = '<p class="no-outline">Kein Inhaltsverzeichnis verfügbar</p>';
    }
}

async function getPageIndexFromDestination(dest) {
    try {
        if (Array.isArray(dest)) {
            const pageRef = dest[0];
            return await AppState.pdfDoc.getPageIndex(pageRef);
        } else if (typeof dest === 'string') {
            const destination = await AppState.pdfDoc.getDestination(dest);
            if (destination) {
                const pageRef = destination[0];
                return await AppState.pdfDoc.getPageIndex(pageRef);
            }
        }
    } catch (error) {
        console.error('Fehler beim Ermitteln der Seitenzahl:', error);
    }
    return null;
}

// Data Loading Functions
async function loadEssentialsData() {
    try {
        const response = await fetch('dsgvo_essentials.csv');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const csvText = await response.text();
        AppState.essentialsData = parseCSV(csvText);

        console.log(`📋 ${AppState.essentialsData.length} Essentials geladen`);

    } catch (error) {
        console.error('Fehler beim Laden der Essentials:', error);
        AppState.essentialsData = [];
    }
}

async function loadLinksData() {
    try {
        const response = await fetch('dsgvo_links.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        AppState.linksData = await response.json();

        console.log(`🔗 Links geladen`);

    } catch (error) {
        console.error('Fehler beim Laden der Links:', error);
        AppState.linksData = [];
    }
}

async function loadChaptersData() {
    try {
        const response = await fetch('dsgvo_presentation_data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        AppState.chaptersData = data.chapters || [];

        console.log(`📚 ${AppState.chaptersData.length} Kapitel geladen`);

    } catch (error) {
        console.error('Fehler beim Laden der Kapitel:', error);
        AppState.chaptersData = [];
    }
}

// CSV Parser
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

    return lines.slice(1).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    }).filter(item => Object.values(item).some(value => value.length > 0));
}

// UI Setup Functions
function setupUI() {
    updatePageInfo();
    updateZoomLevel();
    renderChapterNavigation();
    renderChaptersOverview();
    renderEssentials();
    renderLinks();
    setupCategoryFilter();
}

function updatePageInfo() {
    if (Elements.currentPageSpan) {
        Elements.currentPageSpan.textContent = AppState.currentPage;
    }
    if (Elements.totalPagesSpan) {
        Elements.totalPagesSpan.textContent = AppState.totalPages;
    }
}

function updateZoomLevel() {
    if (Elements.zoomLevelSpan) {
        Elements.zoomLevelSpan.textContent = Math.round(AppState.scale * 100) + '%';
    }
}

function updateNavigationButtons() {
    if (Elements.prevPageBtn) {
        Elements.prevPageBtn.disabled = AppState.currentPage <= 1;
    }
    if (Elements.nextPageBtn) {
        Elements.nextPageBtn.disabled = AppState.currentPage >= AppState.totalPages;
    }
}

function renderChapterNavigation() {
    if (!Elements.chapterNavList || AppState.chaptersData.length === 0) return;

    const navHtml = AppState.chaptersData.map(chapter =>
        `<li><a href="#" onclick="navigateToChapter('${chapter.name}')">${chapter.name}</a></li>`
    ).join('');

    Elements.chapterNavList.innerHTML = navHtml;
}

function renderChaptersOverview() {
    if (!Elements.chaptersContainer || AppState.chaptersData.length === 0) return;

    const chaptersHtml = AppState.chaptersData.map(chapter => `
        <div class="chapter-card" onclick="navigateToChapter('${chapter.name}')">
            <h3>${chapter.name}</h3>
            <p>${chapter.description || 'Keine Beschreibung verfügbar'}</p>
            <span class="slide-count">${chapter.slide_count || 'N/A'} Folien</span>
        </div>
    `).join('');

    Elements.chaptersContainer.innerHTML = chaptersHtml;
}

function renderEssentials() {
    if (!Elements.essentialsContainer || AppState.essentialsData.length === 0) {
        if (Elements.essentialsContainer) {
            Elements.essentialsContainer.innerHTML = '<p class="no-data">Keine Essentials-Daten verfügbar</p>';
        }
        return;
    }

    const essentialsHtml = AppState.essentialsData.map(essential => `
        <div class="essential-card" data-category="${essential.Kategorie || ''}">
            <h4>${essential['Key Point'] || essential.Punkt || 'Unbenannt'}</h4>
            <span class="article-ref">${essential['DSGVO Artikel'] || 'N/A'}</span>
            <p>${essential.Beschreibung || essential.Description || 'Keine Beschreibung verfügbar'}</p>
            <div class="implementation">
                <strong>Praktische Umsetzung:</strong><br>
                ${essential['Praktische Umsetzung'] || essential.Implementation || 'Keine Informationen verfügbar'}
            </div>
        </div>
    `).join('');

    Elements.essentialsContainer.innerHTML = essentialsHtml;
}

function renderLinks() {
    if (!Elements.linksContainer) return;

    if (AppState.linksData.length === 0) {
        // Fallback links if no data loaded
        AppState.linksData = [
            {
                kategorie: "Gesetzestexte",
                links: [
                    { titel: "EU-DSGVO Volltext", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679" },
                    { titel: "BDSG 2018", url: "https://www.gesetze-im-internet.de/bdsg_2018/" }
                ]
            },
            {
                kategorie: "Aufsichtsbehörden",
                links: [
                    { titel: "Bundesbeauftragter für Datenschutz (BfDI)", url: "https://www.bfdi.bund.de/" },
                    { titel: "LDA Bayern", url: "https://www.lda.bayern.de/" }
                ]
            }
        ];
    }

    const linksHtml = AppState.linksData.map(category => `
        <div class="link-category">
            <h3>${category.kategorie || category.category || 'Unbekannte Kategorie'}</h3>
            <ul>
                ${(category.links || []).map(link => `
                    <li><a href="${link.url}" target="_blank">${link.titel || link.title}</a></li>
                `).join('')}
            </ul>
        </div>
    `).join('');

    Elements.linksContainer.innerHTML = linksHtml;
}

function setupCategoryFilter() {
    if (!Elements.categoryFilter || AppState.essentialsData.length === 0) return;

    const categories = [...new Set(AppState.essentialsData.map(item => item.Kategorie || item.Category).filter(Boolean))];
    const optionsHtml = categories.map(cat =>
        `<option value="${cat}">${cat}</option>`
    ).join('');

    Elements.categoryFilter.innerHTML = '<option value="">Alle Kategorien</option>' + optionsHtml;
}

// Navigation Functions
async function navigateToPage(pageNum) {
    if (pageNum < 1 || pageNum > AppState.totalPages || AppState.isLoading) return;

    await renderPage(pageNum);
    showView('pdf-viewer');
}

function navigateToChapter(chapterName) {
    // This would need mapping between chapters and PDF pages
    // For now, just show the PDF viewer
    showView('pdf-viewer');
    showNotification(`Navigation zu Kapitel: ${chapterName}`, 'info');
}

function showView(viewName) {
    // Update navigation
    Elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.view === viewName);
    });

    // Update views
    Elements.views.forEach(view => {
        view.classList.toggle('active', view.id === `${viewName}-view`);
    });

    AppState.currentView = viewName;
}

// PDF Search Functions
async function performPDFSearch(query, options = {}) {
    if (!AppState.pdfDoc || !query || query.length < 2) {
        showNotification('Bitte mindestens 2 Zeichen eingeben', 'warning');
        return;
    }

    AppState.searchMatches = [];
    const searchRegex = createSearchRegex(query, options);

    try {
        showNotification('Suche läuft...', 'info');

        for (let pageNum = 1; pageNum <= AppState.totalPages; pageNum++) {
            const page = await AppState.pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent();

            textContent.items.forEach((item, index) => {
                const matches = item.str.match(searchRegex);
                if (matches) {
                    matches.forEach(match => {
                        AppState.searchMatches.push({
                            page: pageNum,
                            text: item.str,
                            match: match,
                            context: getSearchContext(textContent.items, index)
                        });
                    });
                }
            });
        }

        displaySearchResults(query);
        updateSearchNavigation();

    } catch (error) {
        console.error('Fehler bei der PDF-Suche:', error);
        showNotification('Fehler bei der Suche', 'error');
    }
}

function createSearchRegex(query, options) {
    let flags = 'g';
    if (!options.caseSensitive) flags += 'i';

    let pattern = query;
    if (options.wholeWord) {
        pattern = `\\b${pattern}\\b`;
    }

    // Escape special regex characters
    pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return new RegExp(pattern, flags);
}

function getSearchContext(items, currentIndex) {
    const start = Math.max(0, currentIndex - 2);
    const end = Math.min(items.length, currentIndex + 3);

    return items.slice(start, end).map(item => item.str).join(' ');
}

function displaySearchResults(query) {
    if (!Elements.searchResults) return;

    if (AppState.searchMatches.length === 0) {
        Elements.searchResults.innerHTML = `
            <div class="search-no-results">
                <h3>Keine Ergebnisse für "${query}"</h3>
                <p>Versuchen Sie andere Suchbegriffe oder passen Sie die Suchoptionen an.</p>
            </div>
        `;
        return;
    }

    const resultsHtml = `
        <h3>${AppState.searchMatches.length} Ergebnisse für "${query}"</h3>
        <div class="search-results-list">
            ${AppState.searchMatches.map((result, index) => `
                <div class="search-result-item" onclick="navigateToSearchResult(${index})">
                    <h4>Seite ${result.page}</h4>
                    <p class="result-page">Treffer ${index + 1}</p>
                    <p class="result-excerpt">${highlightSearchTerm(result.context, result.match)}</p>
                </div>
            `).join('')}
        </div>
    `;

    Elements.searchResults.innerHTML = resultsHtml;
    showView('search');
    showNotification(`${AppState.searchMatches.length} Treffer gefunden`, 'success');
}

function highlightSearchTerm(text, term) {
    if (!text || !term) return text;

    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

async function navigateToSearchResult(index) {
    if (index >= 0 && index < AppState.searchMatches.length) {
        AppState.currentMatch = index;
        const result = AppState.searchMatches[index];
        await navigateToPage(result.page);
        updateSearchNavigation();
    }
}

function updateSearchNavigation() {
    if (Elements.searchPrevBtn) {
        Elements.searchPrevBtn.disabled = AppState.currentMatch <= 0;
    }
    if (Elements.searchNextBtn) {
        Elements.searchNextBtn.disabled = AppState.currentMatch >= AppState.searchMatches.length - 1;
    }
}

// Filter Functions
function filterEssentialsByCategory(category) {
    const cards = document.querySelectorAll('.essential-card');
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const shouldShow = !category || cardCategory === category;
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    Elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showView(link.dataset.view);
        });
    });

    // PDF Controls
    if (Elements.prevPageBtn) {
        Elements.prevPageBtn.addEventListener('click', () => {
            navigateToPage(AppState.currentPage - 1);
        });
    }

    if (Elements.nextPageBtn) {
        Elements.nextPageBtn.addEventListener('click', () => {
            navigateToPage(AppState.currentPage + 1);
        });
    }

    if (Elements.zoomInBtn) {
        Elements.zoomInBtn.addEventListener('click', () => {
            AppState.scale = Math.min(AppState.scale * 1.2, 3.0);
            updateZoomLevel();
            renderPage(AppState.currentPage);
        });
    }

    if (Elements.zoomOutBtn) {
        Elements.zoomOutBtn.addEventListener('click', () => {
            AppState.scale = Math.max(AppState.scale / 1.2, 0.5);
            updateZoomLevel();
            renderPage(AppState.currentPage);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (AppState.currentView === 'pdf-viewer' && !e.ctrlKey && !e.altKey) {
            switch (e.key) {
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    navigateToPage(AppState.currentPage - 1);
                    break;
                case 'ArrowRight':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    navigateToPage(AppState.currentPage + 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    navigateToPage(1);
                    break;
                case 'End':
                    e.preventDefault();
                    navigateToPage(AppState.totalPages);
                    break;
            }
        }
    });

    // Search
    if (Elements.searchBtn) {
        Elements.searchBtn.addEventListener('click', () => {
            const query = Elements.globalSearch.value.trim();
            if (query) {
                performPDFSearch(query);
            }
        });
    }

    if (Elements.globalSearch) {
        Elements.globalSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = Elements.globalSearch.value.trim();
                if (query) {
                    performPDFSearch(query);
                }
            }
        });
    }

    if (Elements.advancedSearchBtn) {
        Elements.advancedSearchBtn.addEventListener('click', () => {
            const query = Elements.advancedSearchInput.value.trim();
            if (query) {
                const options = {
                    caseSensitive: Elements.caseSensitive?.checked || false,
                    wholeWord: Elements.wholeWord?.checked || false
                };
                performPDFSearch(query, options);
            }
        });
    }

    // Search navigation
    if (Elements.searchPrevBtn) {
        Elements.searchPrevBtn.addEventListener('click', () => {
            if (AppState.currentMatch > 0) {
                navigateToSearchResult(AppState.currentMatch - 1);
            }
        });
    }

    if (Elements.searchNextBtn) {
        Elements.searchNextBtn.addEventListener('click', () => {
            if (AppState.currentMatch < AppState.searchMatches.length - 1) {
                navigateToSearchResult(AppState.currentMatch + 1);
            }
        });
    }

    // Category filter
    if (Elements.categoryFilter) {
        Elements.categoryFilter.addEventListener('change', (e) => {
            filterEssentialsByCategory(e.target.value);
        });
    }

    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileMenuBtn && sidebarToggle) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebarToggle.checked = !sidebarToggle.checked;
        });
    }

    // Toast close
    if (Elements.toastClose) {
        Elements.toastClose.addEventListener('click', hideNotification);
    }

    // Window resize
    window.addEventListener('resize', () => {
        if (AppState.pdfDoc && AppState.currentPage) {
            // Re-render current page on resize
            setTimeout(() => renderPage(AppState.currentPage), 100);
        }
    });
}

// Utility Functions
function showAppLoading(message = 'Lädt...') {
    if (Elements.appLoading) {
        Elements.appLoading.classList.remove('hidden');
        if (Elements.loadingStatus) {
            Elements.loadingStatus.textContent = message;
        }
    }
}

function hideAppLoading() {
    if (Elements.appLoading) {
        Elements.appLoading.classList.add('hidden');
    }
}

function showNotification(message, type = 'info') {
    if (!Elements.notificationToast || !Elements.toastMessage) return;

    Elements.toastMessage.textContent = message;
    Elements.notificationToast.className = `notification-toast ${type} show`;

    // Auto-hide after 3 seconds
    setTimeout(hideNotification, 3000);
}

function hideNotification() {
    if (Elements.notificationToast) {
        Elements.notificationToast.classList.remove('show');
    }
}

// Export functions for global access
window.navigateToPage = navigateToPage;
window.navigateToChapter = navigateToChapter;
window.navigateToSearchResult = navigateToSearchResult;
window.showView = showView;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Debug functions (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.AppState = AppState;
    window.Elements = Elements;

    console.log('🔧 Debug-Modus aktiviert');
    console.log('Verfügbare Debug-Objekte: AppState, Elements');
}
