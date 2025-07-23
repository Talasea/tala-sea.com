// BSI Threat Modeling Tool - Production Deployment Module
class ProductionDeployment {
    constructor() {
        this.deploymentConfig = {
            version: '2.0.0',
            buildDate: new Date().toISOString(),
            features: [
                'Automatische Bedrohungszuordnung',
                'Automatische Risikomatrix',
                'BSI-Konformität',
                'DSGVO-Compliance',
                'Erweiterte Visualisierung'
            ],
            requirements: {
                browser: 'Chrome 90+, Firefox 88+, Safari 14+, Edge 90+',
                memory: '4GB RAM minimum, 8GB empfohlen',
                storage: '100MB für lokale Daten',
                network: 'Optional für Updates und Dokumentation'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupProductionOptimizations();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
        this.setupSecurityFeatures();
        this.setupAccessibilityFeatures();
    }
    
    setupProductionOptimizations() {
        // Lazy loading für große Datensets
        this.implementLazyLoading();
        
        // Caching für bessere Performance
        this.setupCaching();
        
        // Komprimierung für Datenübertragung
        this.setupCompression();
        
        // Service Worker für Offline-Funktionalität
        this.setupServiceWorker();
    }
    
    implementLazyLoading() {
        // Lazy loading für BSI-Komponenten
        window.BSI_COMPONENTS_LOADER = {
            loaded: false,
            loading: false,
            
            async load() {
                if (this.loaded || this.loading) return;
                
                this.loading = true;
                try {
                    // Simuliere asynchrones Laden großer Datensets
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    // BSI-Komponenten sind bereits geladen, markiere als verfügbar
                    this.loaded = true;
                    this.loading = false;
                    
                    // Dispatch event für andere Module
                    window.dispatchEvent(new CustomEvent('bsiComponentsLoaded'));
                } catch (error) {
                    console.error('Fehler beim Laden der BSI-Komponenten:', error);
                    this.loading = false;
                }
            }
        };
        
        // Auto-load beim ersten Zugriff
        Object.defineProperty(window, 'BSI_COMPONENTS', {
            get() {
                if (!window.BSI_COMPONENTS_LOADER.loaded) {
                    window.BSI_COMPONENTS_LOADER.load();
                }
                return window._BSI_COMPONENTS;
            },
            set(value) {
                window._BSI_COMPONENTS = value;
            }
        });
    }
    
    setupCaching() {
        // LocalStorage Cache Manager
        window.CacheManager = {
            prefix: 'bsi_threat_tool_',
            maxAge: 24 * 60 * 60 * 1000, // 24 Stunden
            
            set(key, data, customMaxAge = null) {
                const item = {
                    data: data,
                    timestamp: Date.now(),
                    maxAge: customMaxAge || this.maxAge
                };
                
                try {
                    localStorage.setItem(this.prefix + key, JSON.stringify(item));
                } catch (error) {
                    console.warn('Cache-Speicherung fehlgeschlagen:', error);
                    this.cleanup();
                }
            },
            
            get(key) {
                try {
                    const item = JSON.parse(localStorage.getItem(this.prefix + key));
                    if (!item) return null;
                    
                    if (Date.now() - item.timestamp > item.maxAge) {
                        this.remove(key);
                        return null;
                    }
                    
                    return item.data;
                } catch (error) {
                    console.warn('Cache-Abruf fehlgeschlagen:', error);
                    return null;
                }
            },
            
            remove(key) {
                localStorage.removeItem(this.prefix + key);
            },
            
            cleanup() {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(this.prefix)) {
                        const item = this.get(key.replace(this.prefix, ''));
                        if (!item) {
                            localStorage.removeItem(key);
                        }
                    }
                });
            }
        };
        
        // Auto-cleanup beim Start
        window.CacheManager.cleanup();
    }
    
    setupCompression() {
        // Daten-Komprimierung für Export/Import
        window.DataCompression = {
            compress(data) {
                try {
                    // Einfache JSON-Komprimierung durch Entfernung von Whitespace
                    const jsonString = JSON.stringify(data);
                    
                    // Base64-Kodierung für sichere Übertragung
                    return btoa(unescape(encodeURIComponent(jsonString)));
                } catch (error) {
                    console.error('Komprimierung fehlgeschlagen:', error);
                    return JSON.stringify(data);
                }
            },
            
            decompress(compressedData) {
                try {
                    // Base64-Dekodierung
                    const jsonString = decodeURIComponent(escape(atob(compressedData)));
                    return JSON.parse(jsonString);
                } catch (error) {
                    console.error('Dekomprimierung fehlgeschlagen:', error);
                    // Fallback: Versuche direktes JSON-Parsing
                    try {
                        return JSON.parse(compressedData);
                    } catch (fallbackError) {
                        console.error('Fallback-Parsing fehlgeschlagen:', fallbackError);
                        return null;
                    }
                }
            }
        };
    }
    
    setupServiceWorker() {
        // Service Worker für Offline-Funktionalität
        if ('serviceWorker' in navigator) {
            const swCode = `
                const CACHE_NAME = 'bsi-threat-tool-v2.0.0';
                const urlsToCache = [
                    '/',
                    '/index.html',
                    '/style.css',
                    '/script.js',
                    '/bsi-components.js',
                    '/visualization.js',
                    '/compliance.js',
                    '/advanced-analysis.js',
                    '/auto-risk-matrix.js'
                ];
                
                self.addEventListener('install', event => {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then(cache => cache.addAll(urlsToCache))
                    );
                });
                
                self.addEventListener('fetch', event => {
                    event.respondWith(
                        caches.match(event.request)
                            .then(response => {
                                if (response) {
                                    return response;
                                }
                                return fetch(event.request);
                            })
                    );
                });
            `;
            
            // Erstelle Service Worker Blob
            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);
            
            navigator.serviceWorker.register(swUrl)
                .then(registration => {
                    console.log('Service Worker registriert:', registration);
                })
                .catch(error => {
                    console.log('Service Worker Registrierung fehlgeschlagen:', error);
                });
        }
    }
    
    setupErrorHandling() {
        // Globale Fehlerbehandlung
        window.ErrorHandler = {
            errors: [],
            maxErrors: 100,
            
            init() {
                // Unbehandelte JavaScript-Fehler
                window.addEventListener('error', (event) => {
                    this.logError({
                        type: 'JavaScript Error',
                        message: event.message,
                        filename: event.filename,
                        lineno: event.lineno,
                        colno: event.colno,
                        stack: event.error?.stack,
                        timestamp: new Date().toISOString()
                    });
                });
                
                // Unbehandelte Promise-Rejections
                window.addEventListener('unhandledrejection', (event) => {
                    this.logError({
                        type: 'Unhandled Promise Rejection',
                        message: event.reason?.message || event.reason,
                        stack: event.reason?.stack,
                        timestamp: new Date().toISOString()
                    });
                });
                
                // Console-Fehler abfangen
                const originalConsoleError = console.error;
                console.error = (...args) => {
                    this.logError({
                        type: 'Console Error',
                        message: args.join(' '),
                        timestamp: new Date().toISOString()
                    });
                    originalConsoleError.apply(console, args);
                };
            },
            
            logError(error) {
                this.errors.push(error);
                
                // Begrenze die Anzahl gespeicherter Fehler
                if (this.errors.length > this.maxErrors) {
                    this.errors.shift();
                }
                
                // Speichere kritische Fehler im LocalStorage
                if (this.isCriticalError(error)) {
                    this.saveCriticalError(error);
                }
                
                // Zeige Benutzer-freundliche Fehlermeldung
                this.showUserFriendlyError(error);
            },
            
            isCriticalError(error) {
                const criticalKeywords = [
                    'Cannot read property',
                    'is not defined',
                    'Network Error',
                    'Failed to fetch'
                ];
                
                return criticalKeywords.some(keyword => 
                    error.message?.includes(keyword)
                );
            },
            
            saveCriticalError(error) {
                try {
                    const criticalErrors = JSON.parse(
                        localStorage.getItem('bsi_critical_errors') || '[]'
                    );
                    
                    criticalErrors.push(error);
                    
                    // Behalte nur die letzten 10 kritischen Fehler
                    if (criticalErrors.length > 10) {
                        criticalErrors.shift();
                    }
                    
                    localStorage.setItem('bsi_critical_errors', 
                        JSON.stringify(criticalErrors));
                } catch (storageError) {
                    console.warn('Fehler beim Speichern kritischer Fehler:', storageError);
                }
            },
            
            showUserFriendlyError(error) {
                // Zeige nur bei kritischen Fehlern eine Benutzerbenachrichtigung
                if (!this.isCriticalError(error)) return;
                
                const notification = document.createElement('div');
                notification.className = 'error-notification';
                notification.innerHTML = `
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div class="error-message">
                            <strong>Ein Fehler ist aufgetreten</strong>
                            <p>Das Tool funktioniert möglicherweise nicht korrekt. Bitte laden Sie die Seite neu.</p>
                        </div>
                        <button class="error-close" onclick="this.parentElement.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Automatisches Entfernen nach 10 Sekunden
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 10000);
            },
            
            getErrorReport() {
                return {
                    errors: this.errors,
                    criticalErrors: JSON.parse(
                        localStorage.getItem('bsi_critical_errors') || '[]'
                    ),
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                };
            }
        };
        
        // Initialisiere Fehlerbehandlung
        window.ErrorHandler.init();
    }
    
    setupPerformanceMonitoring() {
        // Performance-Monitoring
        window.PerformanceMonitor = {
            metrics: {},
            
            init() {
                // Navigation Timing API
                if (window.performance && window.performance.timing) {
                    window.addEventListener('load', () => {
                        this.recordNavigationMetrics();
                    });
                }
                
                // Resource Timing API
                if (window.performance && window.performance.getEntriesByType) {
                    this.monitorResourceLoading();
                }
                
                // Memory Usage (falls verfügbar)
                if (window.performance && window.performance.memory) {
                    this.monitorMemoryUsage();
                }
            },
            
            recordNavigationMetrics() {
                const timing = window.performance.timing;
                
                this.metrics.navigation = {
                    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                    loadComplete: timing.loadEventEnd - timing.navigationStart,
                    domInteractive: timing.domInteractive - timing.navigationStart,
                    firstPaint: this.getFirstPaintTime()
                };
                
                console.log('Navigation Metrics:', this.metrics.navigation);
            },
            
            getFirstPaintTime() {
                if (window.performance && window.performance.getEntriesByType) {
                    const paintEntries = window.performance.getEntriesByType('paint');
                    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
                    return firstPaint ? firstPaint.startTime : null;
                }
                return null;
            },
            
            monitorResourceLoading() {
                const resources = window.performance.getEntriesByType('resource');
                
                this.metrics.resources = {
                    totalResources: resources.length,
                    slowResources: resources.filter(r => r.duration > 1000),
                    largeResources: resources.filter(r => r.transferSize > 100000)
                };
            },
            
            monitorMemoryUsage() {
                setInterval(() => {
                    const memory = window.performance.memory;
                    
                    this.metrics.memory = {
                        used: memory.usedJSHeapSize,
                        total: memory.totalJSHeapSize,
                        limit: memory.jsHeapSizeLimit,
                        timestamp: Date.now()
                    };
                    
                    // Warnung bei hoher Speichernutzung
                    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
                        console.warn('Hohe Speichernutzung erkannt:', this.metrics.memory);
                    }
                }, 30000); // Alle 30 Sekunden
            },
            
            getPerformanceReport() {
                return {
                    metrics: this.metrics,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                };
            }
        };
        
        // Initialisiere Performance-Monitoring
        window.PerformanceMonitor.init();
    }
    
    setupSecurityFeatures() {
        // Content Security Policy (CSP) Enforcement
        window.SecurityManager = {
            init() {
                this.setupCSP();
                this.setupXSSProtection();
                this.setupDataValidation();
                this.setupSecureStorage();
            },
            
            setupCSP() {
                // CSP-Header simulieren (normalerweise server-seitig)
                const meta = document.createElement('meta');
                meta.httpEquiv = 'Content-Security-Policy';
                meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;";
                document.head.appendChild(meta);
            },
            
            setupXSSProtection() {
                // Input-Sanitization
                window.sanitizeInput = function(input) {
                    if (typeof input !== 'string') return input;
                    
                    return input
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#x27;')
                        .replace(/\//g, '&#x2F;');
                };
                
                // HTML-Sanitization für dynamische Inhalte
                window.sanitizeHTML = function(html) {
                    const div = document.createElement('div');
                    div.textContent = html;
                    return div.innerHTML;
                };
            },
            
            setupDataValidation() {
                // Datenvalidierung für Projektdaten
                window.validateProjectData = function(data) {
                    if (!data || typeof data !== 'object') {
                        throw new Error('Ungültige Projektdaten');
                    }
                    
                    // Erforderliche Felder prüfen
                    const requiredFields = ['name', 'components', 'connections'];
                    for (const field of requiredFields) {
                        if (!(field in data)) {
                            throw new Error(`Erforderliches Feld fehlt: ${field}`);
                        }
                    }
                    
                    // Datentypen prüfen
                    if (!Array.isArray(data.components)) {
                        throw new Error('Komponenten müssen ein Array sein');
                    }
                    
                    if (!Array.isArray(data.connections)) {
                        throw new Error('Verbindungen müssen ein Array sein');
                    }
                    
                    return true;
                };
            },
            
            setupSecureStorage() {
                // Verschlüsselung für sensible Daten
                window.SecureStorage = {
                    key: null,
                    
                    generateKey() {
                        // Einfache Schlüsselgenerierung (in Produktion sollte WebCrypto API verwendet werden)
                        this.key = btoa(Math.random().toString(36).substring(2, 15) + 
                                       Math.random().toString(36).substring(2, 15));
                    },
                    
                    encrypt(data) {
                        if (!this.key) this.generateKey();
                        
                        try {
                            const jsonString = JSON.stringify(data);
                            // Einfache XOR-Verschlüsselung (nur für Demo)
                            let encrypted = '';
                            for (let i = 0; i < jsonString.length; i++) {
                                encrypted += String.fromCharCode(
                                    jsonString.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length)
                                );
                            }
                            return btoa(encrypted);
                        } catch (error) {
                            console.error('Verschlüsselung fehlgeschlagen:', error);
                            return JSON.stringify(data);
                        }
                    },
                    
                    decrypt(encryptedData) {
                        if (!this.key) return null;
                        
                        try {
                            const encrypted = atob(encryptedData);
                            let decrypted = '';
                            for (let i = 0; i < encrypted.length; i++) {
                                decrypted += String.fromCharCode(
                                    encrypted.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length)
                                );
                            }
                            return JSON.parse(decrypted);
                        } catch (error) {
                            console.error('Entschlüsselung fehlgeschlagen:', error);
                            // Fallback: Versuche direktes JSON-Parsing
                            try {
                                return JSON.parse(encryptedData);
                            } catch (fallbackError) {
                                return null;
                            }
                        }
                    }
                };
            }
        };
        
        // Initialisiere Sicherheitsfeatures
        window.SecurityManager.init();
    }
    
    setupAccessibilityFeatures() {
        // Barrierefreiheit-Features
        window.AccessibilityManager = {
            init() {
                this.setupKeyboardNavigation();
                this.setupScreenReaderSupport();
                this.setupHighContrastMode();
                this.setupFocusManagement();
            },
            
            setupKeyboardNavigation() {
                // Tastaturnavigation für Canvas-Elemente
                document.addEventListener('keydown', (event) => {
                    if (event.target.classList.contains('canvas-component')) {
                        this.handleComponentKeyNavigation(event);
                    }
                });
                
                // Tab-Navigation für Panels
                this.setupTabNavigation();
            },
            
            handleComponentKeyNavigation(event) {
                const component = event.target;
                const components = Array.from(document.querySelectorAll('.canvas-component'));
                const currentIndex = components.indexOf(component);
                
                switch (event.key) {
                    case 'ArrowUp':
                        event.preventDefault();
                        this.focusComponent(components, currentIndex, -1, 'vertical');
                        break;
                    case 'ArrowDown':
                        event.preventDefault();
                        this.focusComponent(components, currentIndex, 1, 'vertical');
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        this.focusComponent(components, currentIndex, -1, 'horizontal');
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        this.focusComponent(components, currentIndex, 1, 'horizontal');
                        break;
                    case 'Enter':
                    case ' ':
                        event.preventDefault();
                        component.click();
                        break;
                }
            },
            
            focusComponent(components, currentIndex, direction, orientation) {
                // Vereinfachte Navigation (in Produktion sollte räumliche Navigation implementiert werden)
                let nextIndex = currentIndex + direction;
                
                if (nextIndex < 0) nextIndex = components.length - 1;
                if (nextIndex >= components.length) nextIndex = 0;
                
                if (components[nextIndex]) {
                    components[nextIndex].focus();
                }
            },
            
            setupTabNavigation() {
                // Logische Tab-Reihenfolge
                const focusableElements = [
                    'button',
                    'input',
                    'select',
                    'textarea',
                    '[tabindex]:not([tabindex="-1"])',
                    '.canvas-component'
                ];
                
                const selector = focusableElements.join(', ');
                const elements = document.querySelectorAll(selector);
                
                elements.forEach((element, index) => {
                    if (!element.hasAttribute('tabindex')) {
                        element.setAttribute('tabindex', '0');
                    }
                });
            },
            
            setupScreenReaderSupport() {
                // ARIA-Labels für dynamische Inhalte
                this.addAriaLabels();
                
                // Live-Regionen für Statusupdates
                this.setupLiveRegions();
                
                // Beschreibungen für komplexe Elemente
                this.addDescriptions();
            },
            
            addAriaLabels() {
                // Canvas-Komponenten
                document.querySelectorAll('.canvas-component').forEach(component => {
                    if (!component.hasAttribute('aria-label')) {
                        const type = component.classList.contains('system-component') ? 'System' :
                                   component.classList.contains('threat-component') ? 'Bedrohung' :
                                   component.classList.contains('mitigation-component') ? 'Schutzmaßnahme' : 'Komponente';
                        
                        const name = component.querySelector('.component-title')?.textContent || 'Unbenannt';
                        component.setAttribute('aria-label', `${type}: ${name}`);
                    }
                });
                
                // Buttons ohne Labels
                document.querySelectorAll('button:not([aria-label])').forEach(button => {
                    const icon = button.querySelector('i');
                    if (icon && !button.textContent.trim()) {
                        const iconClass = icon.className;
                        let label = 'Button';
                        
                        if (iconClass.includes('fa-save')) label = 'Speichern';
                        else if (iconClass.includes('fa-download')) label = 'Herunterladen';
                        else if (iconClass.includes('fa-upload')) label = 'Hochladen';
                        else if (iconClass.includes('fa-play')) label = 'Starten';
                        else if (iconClass.includes('fa-sync')) label = 'Aktualisieren';
                        
                        button.setAttribute('aria-label', label);
                    }
                });
            },
            
            setupLiveRegions() {
                // Live-Region für Statusmeldungen
                const liveRegion = document.createElement('div');
                liveRegion.id = 'aria-live-region';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.style.position = 'absolute';
                liveRegion.style.left = '-10000px';
                liveRegion.style.width = '1px';
                liveRegion.style.height = '1px';
                liveRegion.style.overflow = 'hidden';
                
                document.body.appendChild(liveRegion);
                
                // Funktion zum Ankündigen von Statusänderungen
                window.announceToScreenReader = function(message) {
                    const region = document.getElementById('aria-live-region');
                    if (region) {
                        region.textContent = message;
                        
                        // Nach kurzer Zeit leeren, um wiederholte Ankündigungen zu ermöglichen
                        setTimeout(() => {
                            region.textContent = '';
                        }, 1000);
                    }
                };
            },
            
            addDescriptions() {
                // Beschreibungen für komplexe Visualisierungen
                const riskMatrix = document.querySelector('.risk-matrix-table');
                if (riskMatrix && !riskMatrix.hasAttribute('aria-describedby')) {
                    const description = document.createElement('div');
                    description.id = 'risk-matrix-description';
                    description.style.display = 'none';
                    description.textContent = 'Risikomatrix mit Auswirkungen auf der Y-Achse und Wahrscheinlichkeiten auf der X-Achse. Jede Zelle zeigt die Anzahl der Bedrohungen in dieser Risikokategorie.';
                    
                    riskMatrix.parentElement.appendChild(description);
                    riskMatrix.setAttribute('aria-describedby', 'risk-matrix-description');
                }
            },
            
            setupHighContrastMode() {
                // High-Contrast-Modus
                const toggleHighContrast = () => {
                    document.body.classList.toggle('high-contrast');
                    
                    const isHighContrast = document.body.classList.contains('high-contrast');
                    localStorage.setItem('high-contrast-mode', isHighContrast);
                    
                    window.announceToScreenReader(
                        isHighContrast ? 'Hoher Kontrast aktiviert' : 'Hoher Kontrast deaktiviert'
                    );
                };
                
                // Lade gespeicherte Einstellung
                if (localStorage.getItem('high-contrast-mode') === 'true') {
                    document.body.classList.add('high-contrast');
                }
                
                // Tastenkombination für High-Contrast (Ctrl+Alt+H)
                document.addEventListener('keydown', (event) => {
                    if (event.ctrlKey && event.altKey && event.key === 'h') {
                        event.preventDefault();
                        toggleHighContrast();
                    }
                });
            },
            
            setupFocusManagement() {
                // Focus-Management für Modals und Dialoge
                this.setupModalFocusTrap();
                
                // Sichtbare Focus-Indikatoren
                this.enhanceFocusIndicators();
            },
            
            setupModalFocusTrap() {
                document.addEventListener('keydown', (event) => {
                    const modal = document.querySelector('.risk-cell-modal');
                    if (modal && event.key === 'Tab') {
                        this.trapFocusInModal(event, modal);
                    }
                });
            },
            
            trapFocusInModal(event, modal) {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            },
            
            enhanceFocusIndicators() {
                // CSS für bessere Focus-Indikatoren wird über Stylesheet hinzugefügt
                const style = document.createElement('style');
                style.textContent = `
                    .high-contrast *:focus {
                        outline: 3px solid #ffff00 !important;
                        outline-offset: 2px !important;
                    }
                    
                    .high-contrast {
                        filter: contrast(150%) brightness(150%);
                    }
                    
                    .high-contrast .canvas-component {
                        border: 2px solid #000000 !important;
                    }
                    
                    .high-contrast .risk-matrix-table td {
                        border: 2px solid #000000 !important;
                    }
                `;
                document.head.appendChild(style);
            }
        };
        
        // Initialisiere Barrierefreiheit
        window.AccessibilityManager.init();
    }
    
    getDeploymentInfo() {
        return {
            config: this.deploymentConfig,
            performance: window.PerformanceMonitor?.getPerformanceReport(),
            errors: window.ErrorHandler?.getErrorReport(),
            timestamp: new Date().toISOString()
        };
    }
}

// Initialisiere Production Deployment
window.addEventListener('DOMContentLoaded', () => {
    window.productionDeployment = new ProductionDeployment();
    console.log('BSI Threat Modeling Tool - Production Ready');
    console.log('Version:', window.productionDeployment.deploymentConfig.version);
});

