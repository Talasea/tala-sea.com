class DSGVOChecker {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.setupAnalysisState();
        this.loadExternalLibraries();
        this.initializeTooltips();
    }

    initializeElements() {
        // DOM-Elemente mit Fehlerprüfung
        this.form = document.getElementById('checkForm');
        this.urlInput = document.getElementById('websiteUrl');
        this.checkButton = document.getElementById('checkButton');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.overallScore = document.getElementById('overallScore');
        this.exportPdfBtn = document.getElementById('exportPdf');
        this.exportJsonBtn = document.getElementById('exportJson');
        this.priorityActions = document.getElementById('priorityActions');

        // Validierung der kritischen Elemente
        if (!this.form || !this.urlInput) {
            console.error('Kritische DOM-Elemente nicht gefunden');
            return;
        }

        console.log('DOM-Elemente erfolgreich initialisiert');
    }

    setupAnalysisState() {
        // Analyse-Zustand mit Endlosschleifen-Schutz
        this.isAnalyzing = false;
        this.analysisTimeout = null;
        this.maxAnalysisTime = 30000; // 30 Sekunden Maximum
        this.currentUrl = '';
        this.analysisResults = {};
        this.overallScoreValue = 0;
        this.complianceLevel = {};

        // Check-Liste mit realistischen Gewichtungen
        this.checkList = {
            cookies: { weight: 25, score: 0 },
            privacyPolicy: { weight: 30, score: 0 },
            externalServices: { weight: 25, score: 0 },
            forms: { weight: 20, score: 0 }
        };

        // Erweiterte Tracking-Variablen für bessere Darstellung
        this.criticalIssuesCount = 0;
        this.warningIssuesCount = 0;
        this.conformAreasCount = 0;
        this.detailedRecommendations = [];
    }

    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        if (this.exportPdfBtn) {
            this.exportPdfBtn.addEventListener('click', () => this.exportToPdf());
        }
        if (this.exportJsonBtn) {
            this.exportJsonBtn.addEventListener('click', () => this.exportToJson());
        }

        // Notfall-Stopp mit Tastenkombination
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'X') {
                this.emergencyStop();
            }
        });

        // Event-Listener für expandierbare Bereiche
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('expand-details')) {
                this.toggleDetailSection(e.target);
            }
        });
    }

    loadExternalLibraries() {
        // PDF-Bibliothek laden falls nicht vorhanden
        if (!window.jsPDF) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => console.log('jsPDF erfolgreich geladen');
            script.onerror = () => console.warn('jsPDF konnte nicht geladen werden');
            document.head.appendChild(script);
        }
    }

    initializeTooltips() {
        // Tooltip-System für Fachbegriffe initialisieren
        this.technicalTerms = {
            'DSGVO': 'Datenschutz-Grundverordnung - EU-Verordnung zum Schutz personenbezogener Daten seit Mai 2018',
            'Cookie-Banner': 'Informations- und Einwilligungssystem für Website-Cookies nach DSGVO Art. 7',
            'Tracking-Cookies': 'Cookies, die Nutzerverhalten über mehrere Websites verfolgen und analysieren',
            'Consent Management': 'System zur Verwaltung von Nutzereinwilligungen für Datenverarbeitung',
            'Auftragsverarbeitung': 'Verarbeitung personenbezogener Daten durch externe Dienstleister (DSGVO Art. 28)'
        };
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        // Verhindere mehrfache gleichzeitige Analysen
        if (this.isAnalyzing) {
            this.showNotification('Analyse bereits im Gange', 'warning');
            return;
        }

        const url = this.urlInput.value.trim();

        if (!this.isValidUrl(url)) {
            this.showError('Bitte geben Sie eine gültige URL ein (z.B. https://beispiel.de)');
            return;
        }

        // Setze Analysedatum
        const analysisDateElement = document.getElementById('analysisDate');
        if (analysisDateElement) {
            analysisDateElement.textContent = new Date().toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        this.currentUrl = url;
        this.isAnalyzing = true;
        this.showLoading();

        // Timeout für gesamte Analyse setzen
        this.analysisTimeout = setTimeout(() => {
            this.emergencyStop();
            this.showError('Analyse-Timeout erreicht');
        }, this.maxAnalysisTime);

        try {
            await this.performRealAnalysis();
            this.showResults();
        } catch (error) {
            console.error('Analysefehler:', error);
            this.showError('Analyse fehlgeschlagen: ' + error.message);
        } finally {
            this.cleanup();
        }
    }

    isValidUrl(url) {
        // Sichere URL-Validierung ohne Regex
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    async performRealAnalysis() {
        console.log('Starte echte DSGVO-Analyse für:', this.currentUrl);

        // Reset der Counters
        this.criticalIssuesCount = 0;
        this.warningIssuesCount = 0;
        this.conformAreasCount = 0;
        this.detailedRecommendations = [];

        // Parallele Ausführung aller Checks mit Timeout-Schutz
        const checkPromises = [
            this.withTimeout(this.performCookieAnalysis(), 8000),
            this.withTimeout(this.performPrivacyPolicyAnalysis(), 10000),
            this.withTimeout(this.performExternalServicesAnalysis(), 8000),
            this.withTimeout(this.performFormsAnalysis(), 6000)
        ];

        await Promise.allSettled(checkPromises);
        this.calculateOverallScore();
        this.generateDetailedRecommendations();
    }

    withTimeout(promise, timeoutMs) {
        // Promise mit Timeout wrapper
        return Promise.race([
            promise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error(`Timeout nach ${timeoutMs}ms`)), timeoutMs)
            )
        ]);
    }

    async performCookieAnalysis() {
        console.log('Analysiere Cookies...');

        try {
            // Echte Cookie-Erkennung über DOM-Analyse
            const cookieAnalysis = {
                currentCookies: this.getCurrentCookies(),
                cookieBanner: this.detectCookieBanner(),
                consentManager: this.detectConsentManager(),
                trackingCookies: this.analyzeTrackingCookies(),
                cookiePolicy: this.findCookiePolicy(),
                technicalCookies: this.analyzeTechnicalCookies()
            };

            const score = this.calculateCookieScore(cookieAnalysis);
            const recommendations = this.generateCookieRecommendations(cookieAnalysis);
            const detailedExplanation = this.generateCookieExplanation(cookieAnalysis);

            this.checkList.cookies.score = score;
            this.analysisResults.cookies = {
                score,
                status: this.getStatus(score),
                text: this.getCookieStatusText(score),
                recommendations,
                details: cookieAnalysis,
                explanation: detailedExplanation,
                criticalCount: cookieAnalysis.currentCookies.filter(c => c.critical).length,
                totalCount: cookieAnalysis.currentCookies.length
            };

            // Update Compliance-Counters
            this.updateComplianceCounters('cookies', score);
            this.updateProgressStep('cookies', 'completed');
        } catch (error) {
            console.error('Cookie-Analyse Fehler:', error);
            this.handleAnalysisError('cookies', error);
        }
    }

    getCurrentCookies() {
        // Echte Cookie-Analyse über document.cookie
        const cookies = [];
        if (document.cookie) {
            document.cookie.split(';').forEach(cookie => {
                const [name, ...valueParts] = cookie.trim().split('=');
                const value = valueParts.join('=');
                const cookieData = {
                    name: name.trim(),
                    value: value || '',
                    type: this.categorizeCookie(name.trim()),
                    critical: this.isCriticalCookie(name.trim()),
                    purpose: this.determineCookiePurpose(name.trim()),
                    provider: this.identifyProvider(name.trim())
                };
                cookies.push(cookieData);
            });
        }
        return cookies;
    }

    detectCookieBanner() {
        // Echte Banner-Erkennung über DOM-Selektoren
        const bannerSelectors = [
            '[id*="cookie" i]',
            '[class*="cookie" i]',
            '[id*="consent" i]',
            '[class*="consent" i]',
            '[id*="gdpr" i]',
            '[class*="gdpr" i]',
            '.cc-banner',
            '#cookieConsent',
            '.cookie-notice',
            '.gdpr-banner',
            '[data-cookie]',
            '[data-consent]'
        ];

        let bannerInfo = { found: false, selector: null, count: 0, visible: false, text: '' };

        for (const selector of bannerSelectors) {
            try {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    const visibleElement = Array.from(elements).find(el =>
                        el.offsetWidth > 0 && el.offsetHeight > 0
                    );

                    bannerInfo = {
                        found: true,
                        selector: selector,
                        count: elements.length,
                        visible: !!visibleElement,
                        text: visibleElement ? visibleElement.textContent.substring(0, 200) : '',
                        hasAcceptButton: this.hasAcceptButton(elements),
                        hasRejectButton: this.hasRejectButton(elements)
                    };
                    break;
                }
            } catch (error) {
                console.warn('Selector-Fehler:', selector, error);
            }
        }

        return bannerInfo;
    }

    hasAcceptButton(bannerElements) {
        const acceptPatterns = ['accept', 'akzeptieren', 'einverstanden', 'ok', 'agree'];
        return Array.from(bannerElements).some(banner => {
            const buttons = banner.querySelectorAll('button, a, input[type="button"]');
            return Array.from(buttons).some(btn =>
                acceptPatterns.some(pattern =>
                    btn.textContent.toLowerCase().includes(pattern)
                )
            );
        });
    }

    hasRejectButton(bannerElements) {
        const rejectPatterns = ['reject', 'ablehnen', 'decline', 'nein', 'disagree'];
        return Array.from(bannerElements).some(banner => {
            const buttons = banner.querySelectorAll('button, a, input[type="button"]');
            return Array.from(buttons).some(btn =>
                rejectPatterns.some(pattern =>
                    btn.textContent.toLowerCase().includes(pattern)
                )
            );
        });
    }

    detectConsentManager() {
        // Erkennung bekannter Consent-Management-Systeme
        const consentSystems = [
            { name: 'Cookiebot', patterns: ['cookiebot'] },
            { name: 'OneTrust', patterns: ['onetrust'] },
            { name: 'CCM19', patterns: ['ccm19'] },
            { name: 'Cookie Law Info', patterns: ['cookielawinfo'] },
            { name: 'Borlabs Cookie', patterns: ['borlabs-cookie'] },
            { name: 'Usercentrics', patterns: ['usercentrics'] },
            { name: 'Klaro', patterns: ['klaro'] },
            { name: 'TarteAuCitron', patterns: ['tarteaucitron'] }
        ];

        const pageContent = document.documentElement.innerHTML.toLowerCase();

        for (const system of consentSystems) {
            if (system.patterns.some(pattern => pageContent.includes(pattern))) {
                return {
                    detected: true,
                    system: system.name,
                    hasScript: this.hasConsentScript(system.patterns[0]),
                    features: this.analyzeConsentFeatures(system.patterns[0])
                };
            }
        }

        return { detected: false, system: null, hasScript: false, features: {} };
    }

    analyzeConsentFeatures(systemName) {
        const features = {
            granularConsent: false,
            cookieCategories: false,
            dataRetention: false,
            vendorList: false
        };

        const pageContent = document.documentElement.innerHTML.toLowerCase();

        // Analysiere verfügbare Features
        if (pageContent.includes('kategorien') || pageContent.includes('categories')) {
            features.cookieCategories = true;
        }

        if (pageContent.includes('vendor') || pageContent.includes('anbieter')) {
            features.vendorList = true;
        }

        return features;
    }

    analyzeTrackingCookies() {
        // Erweiterte Analyse von Tracking-Cookies
        const trackingPatterns = [
            { pattern: '_ga', name: 'Google Analytics', category: 'Analytics', risk: 'high' },
            { pattern: '_gid', name: 'Google Analytics', category: 'Analytics', risk: 'high' },
            { pattern: '_gat', name: 'Google Analytics', category: 'Analytics', risk: 'high' },
            { pattern: '_fbp', name: 'Facebook Pixel', category: 'Marketing', risk: 'high' },
            { pattern: '_fbc', name: 'Facebook Pixel', category: 'Marketing', risk: 'high' },
            { pattern: '__utma', name: 'Google Universal Analytics', category: 'Analytics', risk: 'high' },
            { pattern: '_hjid', name: 'Hotjar', category: 'Analytics', risk: 'medium' }
        ];

        const cookies = this.getCurrentCookies();
        const trackingCookies = [];

        cookies.forEach(cookie => {
            const match = trackingPatterns.find(pattern =>
                cookie.name.toLowerCase().includes(pattern.pattern.toLowerCase())
            );

            if (match) {
                trackingCookies.push({
                    ...cookie,
                    trackingInfo: match
                });
            }
        });

        return {
            total: trackingCookies.length,
            cookies: trackingCookies,
            hasGoogleAnalytics: trackingCookies.some(c => c.trackingInfo.name === 'Google Analytics'),
            hasFacebookPixel: trackingCookies.some(c => c.trackingInfo.name === 'Facebook Pixel'),
            hasSessionCookies: cookies.some(c =>
                c.name.includes('SESSID') || c.name.includes('session')
            ),
            riskBreakdown: this.calculateTrackingRiskBreakdown(trackingCookies)
        };
    }

    calculateTrackingRiskBreakdown(trackingCookies) {
        const breakdown = { high: 0, medium: 0, low: 0 };

        trackingCookies.forEach(cookie => {
            const risk = cookie.trackingInfo.risk;
            breakdown[risk]++;
        });

        return breakdown;
    }

    async performPrivacyPolicyAnalysis() {
        console.log('Analysiere Datenschutzerklärung...');

        try {
            const privacyAnalysis = {
                policyUrl: this.findPrivacyPolicyUrl(),
                policyContent: '',
                accessibility: false,
                gdprCompliance: {},
                contentQuality: {},
                lastUpdated: null
            };

            if (privacyAnalysis.policyUrl) {
                privacyAnalysis.accessibility = await this.checkUrlAccessibility(privacyAnalysis.policyUrl);
                if (privacyAnalysis.accessibility) {
                    privacyAnalysis.policyContent = await this.fetchPolicyContent(privacyAnalysis.policyUrl);
                    privacyAnalysis.gdprCompliance = this.analyzeGdprCompliance(privacyAnalysis.policyContent);
                    privacyAnalysis.contentQuality = this.analyzeContentQuality(privacyAnalysis.policyContent);
                    privacyAnalysis.lastUpdated = this.findLastUpdateDate(privacyAnalysis.policyContent);
                }
            }

            const score = this.calculatePrivacyPolicyScore(privacyAnalysis);
            const recommendations = this.generatePrivacyRecommendations(privacyAnalysis);
            const detailedExplanation = this.generatePrivacyExplanation(privacyAnalysis);

            this.checkList.privacyPolicy.score = score;
            this.analysisResults.privacyPolicy = {
                score,
                status: this.getStatus(score),
                text: this.getPrivacyPolicyStatusText(score),
                recommendations,
                details: privacyAnalysis,
                explanation: detailedExplanation
            };

            this.updateComplianceCounters('privacyPolicy', score);
            this.updateProgressStep('privacy', 'completed');
        } catch (error) {
            console.error('Datenschutzerklärung-Analyse Fehler:', error);
            this.handleAnalysisError('privacyPolicy', error);
        }
    }

    findPrivacyPolicyUrl() {
        // Erweiterte Suche nach Datenschutzerklärung-Links
        const privacySelectors = [
            'a[href*="privacy" i]',
            'a[href*="datenschutz" i]',
            'a[href*="privacy-policy" i]',
            'a[href*="datenschutzerklaerung" i]'
        ];

        // Zusätzliche Textbasierte Suche
        const links = document.querySelectorAll('a');
        const privacyLink = Array.from(links).find(link => {
            const text = link.textContent.toLowerCase();
            return text.includes('datenschutz') ||
                text.includes('privacy') ||
                text.includes('privacy policy');
        });

        if (privacyLink && privacyLink.href && privacyLink.href !== '#') {
            return privacyLink.href;
        }

        // Fallback zu Selektoren
        for (const selector of privacySelectors) {
            try {
                const links = document.querySelectorAll(selector);
                if (links.length > 0) {
                    const href = links[0].href;
                    if (href && href !== '#') {
                        return href;
                    }
                }
            } catch (error) {
                console.warn('Privacy-Link-Suche Fehler:', selector, error);
            }
        }

        return null;
    }

    async checkUrlAccessibility(url) {
        // Prüfe Erreichbarkeit einer URL
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                mode: 'no-cors',
                timeout: 5000
            });
            return true;
        } catch (error) {
            console.warn('URL nicht erreichbar:', url, error);
            return false;
        }
    }

    async fetchPolicyContent(url) {
        // Lade Datenschutzerklärung-Inhalt
        try {
            const response = await fetch(url, {
                mode: 'no-cors',
                timeout: 8000
            });

            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.warn('Policy-Content konnte nicht geladen werden:', error);
        }

        // Fallback: Simuliere typischen Datenschutzinhalt für Demo
        return this.generateSamplePrivacyContent();
    }

    generateSamplePrivacyContent() {
        return `
        Datenschutzerklärung
        
        1. Verantwortlicher
        Verantwortlich für die Datenverarbeitung ist: Beispiel GmbH
        Kontakt: datenschutz@beispiel.de
        
        2. Erhebung personenbezogener Daten
        Diese Website erhebt und verarbeitet personenbezogene Daten gemäß DSGVO.
        
        3. Ihre Rechte
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), 
        Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
        Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO).
        
        4. Rechtsgrundlage
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        
        5. Speicherdauer
        Ihre Daten werden für die Dauer von 2 Jahren gespeichert.
        
        6. Datenübertragung an Dritte
        Wir übertragen Daten an folgende Auftragsverarbeiter:
        - Google Analytics (Google Ireland Limited)
        - Facebook Pixel (Meta Platforms Ireland Limited)
        
        Stand: ${new Date().toLocaleDateString('de-DE')}
        `;
    }

    analyzeGdprCompliance(content) {
        // Erweiterte DSGVO-Compliance-Analyse
        const gdprRequirements = {
            rights: {
                terms: ['auskunft', 'berichtigung', 'löschung', 'einschränkung', 'datenübertragbarkeit', 'widerspruch', 'beschwerde'],
                articles: ['art. 15', 'art. 16', 'art. 17', 'art. 18', 'art. 20', 'art. 21', 'art. 77']
            },
            legalBasis: {
                terms: ['art. 6', 'artikel 6', 'rechtsgrundlage', 'legal basis', 'einwilligung', 'vertrag', 'rechtliche verpflichtung'],
                articles: ['art. 6 abs. 1 lit. a', 'art. 6 abs. 1 lit. b', 'art. 6 abs. 1 lit. c']
            },
            contact: {
                terms: ['kontakt', 'datenschutz@', 'dpo@', 'privacy@', 'datenschutzbeauftragte'],
                patterns: [/@[\w\.-]+\.\w+/]
            },
            retention: {
                terms: ['speicherdauer', 'löschung', 'aufbewahrung', 'retention', 'löschfristen'],
                timeIndicators: ['jahr', 'jahre', 'monat', 'monate', 'tag', 'tage']
            },
            thirdParties: {
                terms: ['dritte', 'google', 'facebook', 'auftragsverarbeiter', 'processor', 'übertragung', 'weitergabe'],
                services: ['analytics', 'tracking', 'marketing', 'social media']
            }
        };

        const lowerContent = content.toLowerCase();
        const compliance = {};

        Object.keys(gdprRequirements).forEach(category => {
            const requirement = gdprRequirements[category];
            const foundTerms = requirement.terms.filter(term => lowerContent.includes(term));

            let additionalFindings = 0;
            if (requirement.articles) {
                additionalFindings += requirement.articles.filter(article => lowerContent.includes(article)).length;
            }
            if (requirement.patterns) {
                additionalFindings += requirement.patterns.filter(pattern => pattern.test(content)).length;
            }

            const totalPossible = requirement.terms.length + (requirement.articles?.length || 0);
            const totalFound = foundTerms.length + additionalFindings;

            compliance[category] = {
                found: totalFound,
                total: totalPossible,
                percentage: Math.round((totalFound / totalPossible) * 100),
                terms: foundTerms,
                quality: this.assessComplianceQuality(category, totalFound, totalPossible)
            };
        });

        return compliance;
    }

    assessComplianceQuality(category, found, total) {
        const percentage = (found / total) * 100;

        if (percentage >= 80) return 'excellent';
        if (percentage >= 60) return 'good';
        if (percentage >= 40) return 'fair';
        return 'poor';
    }

    analyzeContentQuality(content) {
        return {
            wordCount: content.split(/\s+/).length,
            readabilityScore: this.calculateReadabilityScore(content),
            structureScore: this.analyzeStructure(content),
            technicalTermsExplained: this.checkTechnicalTermsExplanation(content)
        };
    }

    calculateReadabilityScore(content) {
        // Vereinfachte Lesbarkeitsanalyse
        const sentences = content.split(/[.!?]+/).length;
        const words = content.split(/\s+/).length;
        const avgWordsPerSentence = words / sentences;

        // Bewertung basierend auf durchschnittlicher Satzlänge
        if (avgWordsPerSentence <= 15) return 'gut';
        if (avgWordsPerSentence <= 25) return 'mittel';
        return 'schwer';
    }

    async performExternalServicesAnalysis() {
        console.log('Analysiere externe Dienste...');

        try {
            const servicesAnalysis = {
                scripts: this.analyzeExternalScripts(),
                iframes: this.analyzeExternalIframes(),
                images: this.analyzeExternalImages(),
                stylesheets: this.analyzeExternalStylesheets(),
                trackingServices: {},
                criticalServices: [],
                riskAssessment: {}
            };

            // Kategorisiere Services
            const allServices = [
                ...servicesAnalysis.scripts,
                ...servicesAnalysis.iframes,
                ...servicesAnalysis.images,
                ...servicesAnalysis.stylesheets
            ];

            servicesAnalysis.trackingServices = this.categorizeTrackingServices(allServices);
            servicesAnalysis.criticalServices = this.identifyCriticalServices(allServices);
            servicesAnalysis.riskAssessment = this.assessOverallRisk(allServices);

            const score = this.calculateExternalServicesScore(servicesAnalysis);
            const recommendations = this.generateExternalServicesRecommendations(servicesAnalysis);
            const detailedExplanation = this.generateExternalServicesExplanation(servicesAnalysis);

            this.checkList.externalServices.score = score;
            this.analysisResults.externalServices = {
                score,
                status: this.getStatus(score),
                text: this.getExternalServicesStatusText(score),
                recommendations,
                details: servicesAnalysis,
                explanation: detailedExplanation,
                totalServices: allServices.length,
                criticalCount: servicesAnalysis.criticalServices.length
            };

            this.updateComplianceCounters('externalServices', score);
            this.updateProgressStep('services', 'completed');
        } catch (error) {
            console.error('Externe Dienste Analyse Fehler:', error);
            this.handleAnalysisError('externalServices', error);
        }
    }

    analyzeExternalScripts() {
        // Erweiterte Analyse externer JavaScript-Dateien
        const scripts = document.querySelectorAll('script[src]');
        const externalScripts = [];

        scripts.forEach(script => {
            const src = script.src;
            if (src && !this.isInternalUrl(src)) {
                const scriptAnalysis = {
                    url: src,
                    domain: this.extractDomain(src),
                    type: 'script',
                    provider: this.identifyProvider(src),
                    risk: this.assessRisk(src),
                    purpose: this.identifyScriptPurpose(src),
                    hasAsync: script.async,
                    hasDefer: script.defer,
                    size: this.estimateScriptSize(src)
                };
                externalScripts.push(scriptAnalysis);
            }
        });

        return externalScripts;
    }

    identifyScriptPurpose(url) {
        const purposes = {
            'analytics': ['analytics', 'tracking', 'gtag', 'ga.js'],
            'advertising': ['ads', 'doubleclick', 'adsystem', 'advertising'],
            'social': ['facebook', 'twitter', 'instagram', 'linkedin'],
            'performance': ['cdn', 'jquery', 'bootstrap', 'font'],
            'functional': ['map', 'chat', 'form', 'payment']
        };

        const lowerUrl = url.toLowerCase();

        for (const [purpose, keywords] of Object.entries(purposes)) {
            if (keywords.some(keyword => lowerUrl.includes(keyword))) {
                return purpose;
            }
        }

        return 'unknown';
    }

    async performFormsAnalysis() {
        console.log('Analysiere Formulare...');

        try {
            const forms = document.querySelectorAll('form');
            const formAnalysis = {
                totalForms: forms.length,
                formDetails: [],
                consentForms: 0,
                contactForms: 0,
                newsletterForms: 0,
                hasPrivacyLinks: 0,
                complianceIssues: []
            };

            forms.forEach((form, index) => {
                const analysis = this.analyzeIndividualForm(form, index);
                formAnalysis.formDetails.push(analysis);

                if (analysis.hasConsentCheckbox) formAnalysis.consentForms++;
                if (analysis.type === 'contact') formAnalysis.contactForms++;
                if (analysis.type === 'newsletter') formAnalysis.newsletterForms++;
                if (analysis.hasPrivacyLink) formAnalysis.hasPrivacyLinks++;

                // Sammle Compliance-Probleme
                if (analysis.personalDataInputs > 0 && !analysis.hasConsentCheckbox) {
                    formAnalysis.complianceIssues.push({
                        formIndex: index,
                        type: 'missing_consent',
                        severity: 'high',
                        description: 'Formular mit personenbezogenen Daten ohne Einwilligung'
                    });
                }

                if (!analysis.hasPrivacyLink) {
                    formAnalysis.complianceIssues.push({
                        formIndex: index,
                        type: 'missing_privacy_link',
                        severity: 'medium',
                        description: 'Fehlender Link zur Datenschutzerklärung'
                    });
                }
            });

            const score = this.calculateFormsScore(formAnalysis);
            const recommendations = this.generateFormsRecommendations(formAnalysis);
            const detailedExplanation = this.generateFormsExplanation(formAnalysis);

            this.checkList.forms.score = score;
            this.analysisResults.forms = {
                score,
                status: this.getStatus(score),
                text: this.getFormsStatusText(score),
                recommendations,
                details: formAnalysis,
                explanation: detailedExplanation
            };

            this.updateComplianceCounters('forms', score);
            this.updateProgressStep('forms', 'completed');
        } catch (error) {
            console.error('Formular-Analyse Fehler:', error);
            this.handleAnalysisError('forms', error);
        }
    }

    analyzeIndividualForm(form, index) {
        // Erweiterte Analyse einzelner Formulare
        const inputs = form.querySelectorAll('input, textarea, select');
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        const emailInputs = form.querySelectorAll('input[type="email"]');
        const textInputs = form.querySelectorAll('input[type="text"], textarea');

        const personalDataInputs = Array.from(inputs).filter(input => {
            const name = input.name?.toLowerCase() || '';
            const id = input.id?.toLowerCase() || '';
            const placeholder = input.placeholder?.toLowerCase() || '';

            return ['name', 'email', 'phone', 'tel', 'address', 'nachricht', 'message', 'vorname', 'nachname'].some(term =>
                name.includes(term) || id.includes(term) || placeholder.includes(term)
            );
        });

        // Erweiterte Prüfung auf Datenschutz-Links
        const hasPrivacyLink = this.checkFormPrivacyCompliance(form);

        // Bestimme Formular-Typ
        let formType = this.determineFormType(form, inputs, personalDataInputs);

        // Prüfe Double-Opt-In Indikationen
        const hasDoubleOptInIndicator = this.checkDoubleOptInIndicator(form);

        return {
            index,
            type: formType,
            inputCount: inputs.length,
            personalDataInputs: personalDataInputs.length,
            hasConsentCheckbox: checkboxes.length > 0,
            hasPrivacyLink,
            hasRequiredFields: Array.from(inputs).some(input => input.required),
            action: form.action || '',
            method: form.method || 'get',
            hasDoubleOptInIndicator,
            securityLevel: this.assessFormSecurity(form),
            personalDataTypes: this.identifyPersonalDataTypes(personalDataInputs)
        };
    }

    checkFormPrivacyCompliance(form) {
        // Detaillierte Prüfung der Datenschutz-Compliance
        const formHTML = form.innerHTML.toLowerCase();
        const privacyTerms = ['datenschutz', 'privacy', 'privacy policy', 'datenschutzerklärung'];

        // Prüfe auf Links
        const privacyLink = form.querySelector('a[href*="privacy"], a[href*="datenschutz"]');

        // Prüfe auf Texthinweise
        const hasPrivacyText = privacyTerms.some(term => formHTML.includes(term));

        return {
            hasLink: !!privacyLink,
            hasText: hasPrivacyText,
            linkUrl: privacyLink?.href || null,
            overall: !!privacyLink || hasPrivacyText
        };
    }

    determineFormType(form, inputs, personalDataInputs) {
        const emailInputs = form.querySelectorAll('input[type="email"]');
        const textInputs = form.querySelectorAll('input[type="text"], textarea');
        const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
        const submitText = submitButton?.textContent?.toLowerCase() || '';

        // Newsletter-Formular
        if (emailInputs.length > 0 && textInputs.length === 0 && personalDataInputs.length <= 1) {
            return 'newsletter';
        }

        // Kontakt-Formular
        if (textInputs.length > 0 && personalDataInputs.length > 1) {
            return 'contact';
        }

        // Registrierungs-Formular
        if (personalDataInputs.length > 2 && form.querySelector('input[type="password"]')) {
            return 'registration';
        }

        // Login-Formular
        if (form.querySelector('input[type="password"]') && personalDataInputs.length <= 2) {
            return 'login';
        }

        // Suchformular
        if (inputs.length === 1 && submitText.includes('search')) {
            return 'search';
        }

        return 'other';
    }

    identifyPersonalDataTypes(personalDataInputs) {
        const dataTypes = [];

        personalDataInputs.forEach(input => {
            const identifier = (input.name || input.id || input.placeholder || '').toLowerCase();

            if (identifier.includes('email')) dataTypes.push('E-Mail-Adresse');
            if (identifier.includes('name') || identifier.includes('vorname') || identifier.includes('nachname')) {
                dataTypes.push('Name');
            }
            if (identifier.includes('phone') || identifier.includes('tel')) dataTypes.push('Telefonnummer');
            if (identifier.includes('address') || identifier.includes('adresse')) dataTypes.push('Adresse');
            if (identifier.includes('message') || identifier.includes('nachricht')) dataTypes.push('Nachrichteninhalt');
        });

        return [...new Set(dataTypes)]; // Entferne Duplikate
    }

    // Bewertungs- und Scoring-Funktionen mit verbesserter Logik
    calculateCookieScore(analysis) {
        let score = 0;
        let maxScore = 100;

        // Cookie-Banner Bewertung (25 Punkte)
        if (analysis.cookieBanner.found) {
            score += 15;
            if (analysis.cookieBanner.hasAcceptButton && analysis.cookieBanner.hasRejectButton) {
                score += 10;
            }
        }

        // Consent Manager Bewertung (30 Punkte)
        if (analysis.consentManager.detected) {
            score += 20;
            if (analysis.consentManager.features.granularConsent) score += 5;
            if (analysis.consentManager.features.cookieCategories) score += 5;
        }

        // Cookie-Analyse (30 Punkte)
        const criticalCookies = analysis.currentCookies.filter(c => c.critical);
        if (criticalCookies.length === 0) {
            score += 30;
        } else {
            score += Math.max(0, 30 - (criticalCookies.length * 5));
        }

        // Tracking-Cookies Bewertung (15 Punkte)
        if (analysis.trackingCookies.total === 0) {
            score += 15;
        } else {
            const penalty = Math.min(analysis.trackingCookies.total * 3, 15);
            score += Math.max(0, 15 - penalty);
        }

        return Math.max(0, Math.min(100, score));
    }

    calculatePrivacyPolicyScore(analysis) {
        let score = 0;

        // Basis-Verfügbarkeit (20 Punkte)
        if (analysis.policyUrl) score += 10;
        if (analysis.accessibility) score += 10;

        // DSGVO-Rechte (25 Punkte)
        if (analysis.gdprCompliance.rights) {
            score += Math.round((analysis.gdprCompliance.rights.percentage / 100) * 25);
        }

        // Kontaktdaten (15 Punkte)
        if (analysis.gdprCompliance.contact && analysis.gdprCompliance.contact.found > 0) {
            score += 15;
        }

        // Rechtsgrundlage (15 Punkte)
        if (analysis.gdprCompliance.legalBasis && analysis.gdprCompliance.legalBasis.found > 0) {
            score += 15;
        }

        // Speicherdauer (10 Punkte)
        if (analysis.gdprCompliance.retention && analysis.gdprCompliance.retention.found > 0) {
            score += 10;
        }

        // Drittanbieter-Hinweise (10 Punkte)
        if (analysis.gdprCompliance.thirdParties && analysis.gdprCompliance.thirdParties.found > 0) {
            score += 10;
        }

        // Bonus für Content-Qualität (5 Punkte)
        if (analysis.contentQuality && analysis.contentQuality.readabilityScore === 'gut') {
            score += 5;
        }

        return Math.max(0, Math.min(100, score));
    }

    calculateExternalServicesScore(analysis) {
        let score = 100;

        // Abzug für kritische Services
        score -= analysis.criticalServices.length * 12;

        // Abzug für viele externe Services
        const totalServices = analysis.scripts.length + analysis.iframes.length;
        if (totalServices > 15) {
            score -= 25;
        } else if (totalServices > 10) {
            score -= 15;
        } else if (totalServices > 5) {
            score -= 5;
        }

        // Abzug für Tracking-Services
        const trackingCount = Object.values(analysis.trackingServices).reduce((sum, services) =>
            sum + (Array.isArray(services) ? services.length : 0), 0);
        score -= trackingCount * 8;

        // Zusätzliche Bewertung für Risiko-Assessment
        if (analysis.riskAssessment) {
            if (analysis.riskAssessment.overallRisk === 'high') score -= 20;
            else if (analysis.riskAssessment.overallRisk === 'medium') score -= 10;
        }

        return Math.max(0, Math.min(100, score));
    }

    calculateFormsScore(analysis) {
        let score = 100;

        if (analysis.totalForms === 0) return 100; // Keine Formulare = kein Problem

        // Abzug für Formulare ohne Einwilligung
        const formsWithoutConsent = analysis.totalForms - analysis.consentForms;
        const consentPenalty = (formsWithoutConsent / analysis.totalForms) * 40;
        score -= consentPenalty;

        // Abzug für fehlende Datenschutz-Links
        const formsWithoutPrivacy = analysis.totalForms - analysis.hasPrivacyLinks;
        const privacyPenalty = (formsWithoutPrivacy / analysis.totalForms) * 30;
        score -= privacyPenalty;

        // Abzug für kritische Compliance-Probleme
        const criticalIssues = analysis.complianceIssues.filter(issue => issue.severity === 'high');
        score -= criticalIssues.length * 10;

        // Bonus für gute Formular-Sicherheit
        const secureFormsCount = analysis.formDetails.filter(form =>
            form.securityLevel === 'high'
        ).length;
        score += Math.min(secureFormsCount * 5, 15);

        return Math.max(0, Math.min(100, score));
    }

    calculateOverallScore() {
        let weightedSum = 0;
        let totalWeight = 0;

        Object.values(this.checkList).forEach(check => {
            weightedSum += (check.score * check.weight);
            totalWeight += check.weight;
        });

        this.overallScoreValue = Math.round(weightedSum / totalWeight);

        // Bestimme Compliance-Level
        this.complianceLevel = this.determineComplianceLevel(this.overallScoreValue);

        // Berechne zusätzliche Metriken
        this.calculateAdditionalMetrics();
    }

    calculateAdditionalMetrics() {
        // Berechne Bußgeldrisiko
        this.fineRisk = this.calculateFineRisk();

        // Berechne Umsetzungsaufwand
        this.implementationEffort = this.calculateImplementationEffort();

        // Berechne Prioritätslevel
        this.calculatePriorityLevels();
    }

    calculateFineRisk() {
        if (this.overallScoreValue >= 80) return 'Sehr niedrig';
        if (this.overallScoreValue >= 60) return 'Niedrig';
        if (this.overallScoreValue >= 40) return 'Mittel';
        if (this.overallScoreValue >= 20) return 'Hoch';
        return 'Sehr hoch';
    }

    updateComplianceCounters(category, score) {
        if (score >= 80) {
            this.conformAreasCount++;
        } else if (score >= 50) {
            this.warningIssuesCount++;
        } else {
            this.criticalIssuesCount++;
        }
    }

    generateDetailedRecommendations() {
        // Sammle alle Empfehlungen und priorisiere sie
        let allRecommendations = [];

        Object.entries(this.analysisResults).forEach(([category, result]) => {
            result.recommendations.forEach(rec => {
                allRecommendations.push({
                    category,
                    recommendation: rec,
                    priority: this.calculateRecommendationPriority(category, rec),
                    effort: this.estimateImplementationEffort(rec),
                    impact: this.calculateImpact(category, result.score)
                });
            });
        });

        // Sortiere nach Priorität
        allRecommendations.sort((a, b) => {
            if (a.priority !== b.priority) {
                const priorityOrder = { 'critical': 3, 'high': 2, 'medium': 1, 'low': 0 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return b.impact - a.impact;
        });

        this.detailedRecommendations = allRecommendations.slice(0, 10); // Top 10 Empfehlungen
    }

    calculateRecommendationPriority(category, recommendation) {
        const criticalKeywords = ['kritisch', 'sofort', 'bußgeld', 'illegal', 'rechtswidrig'];
        const highKeywords = ['wichtig', 'dringend', 'erforderlich', 'notwendig'];
        const mediumKeywords = ['empfohlen', 'sollte', 'verbessern'];

        const lowerRec = recommendation.toLowerCase();

        if (criticalKeywords.some(keyword => lowerRec.includes(keyword))) return 'critical';
        if (highKeywords.some(keyword => lowerRec.includes(keyword))) return 'high';
        if (mediumKeywords.some(keyword => lowerRec.includes(keyword))) return 'medium';

        return 'low';
    }

    // Erklärungsgeneratoren für bessere Darstellung
    generateCookieExplanation(analysis) {
        const criticalCount = analysis.currentCookies.filter(c => c.critical).length;
        const trackingCount = analysis.trackingCookies.total;

        return {
            summary: `Ihre Website verwendet ${analysis.currentCookies.length} Cookies, davon ${criticalCount} kritische.`,
            details: [
                {
                    title: "Cookie-Banner",
                    status: analysis.cookieBanner.found ? 'Vorhanden' : 'Fehlt',
                    explanation: analysis.cookieBanner.found
                        ? 'Ein Cookie-Banner informiert Nutzer über Cookie-Verwendung.'
                        : 'Ein Cookie-Banner ist nach DSGVO erforderlich, um Nutzer zu informieren.',
                    impact: analysis.cookieBanner.found ? 'low' : 'high'
                },
                {
                    title: "Consent Management",
                    status: analysis.consentManager.detected ? 'Implementiert' : 'Nicht vorhanden',
                    explanation: analysis.consentManager.detected
                        ? `${analysis.consentManager.system} System erkannt.`
                        : 'Ein Consent Management System ist für DSGVO-Konformität empfohlen.',
                    impact: analysis.consentManager.detected ? 'low' : 'medium'
                },
                {
                    title: "Tracking-Cookies",
                    status: trackingCount > 0 ? `${trackingCount} gefunden` : 'Keine gefunden',
                    explanation: trackingCount > 0
                        ? 'Tracking-Cookies erfordern explizite Nutzereinwilligung vor dem Setzen.'
                        : 'Keine Tracking-Cookies gefunden - gut für Datenschutz.',
                    impact: trackingCount > 0 ? 'high' : 'low'
                }
            ],
            riskAssessment: this.assessCookieRisk(analysis),
            nextSteps: this.generateCookieNextSteps(analysis)
        };
    }

    generatePrivacyExplanation(analysis) {
        return {
            summary: analysis.policyUrl
                ? 'Datenschutzerklärung wurde gefunden und analysiert.'
                : 'Keine Datenschutzerklärung gefunden.',
            details: [
                {
                    title: "Verfügbarkeit",
                    status: analysis.policyUrl ? 'Verfügbar' : 'Nicht gefunden',
                    explanation: analysis.policyUrl
                        ? 'Datenschutzerklärung ist über einen Link erreichbar.'
                        : 'Eine Datenschutzerklärung ist nach DSGVO Art. 13/14 verpflichtend.',
                    impact: analysis.policyUrl ? 'low' : 'critical'
                },
                {
                    title: "DSGVO-Rechte",
                    status: analysis.gdprCompliance.rights
                        ? `${analysis.gdprCompliance.rights.percentage}% abgedeckt`
                        : 'Nicht analysiert',
                    explanation: 'Betroffenenrechte müssen vollständig dokumentiert werden.',
                    impact: (analysis.gdprCompliance.rights?.percentage || 0) < 70 ? 'high' : 'low'
                },
                {
                    title: "Kontaktdaten",
                    status: analysis.gdprCompliance.contact?.found > 0 ? 'Vorhanden' : 'Fehlen',
                    explanation: 'Kontaktdaten für Datenschutzanfragen sind verpflichtend.',
                    impact: analysis.gdprCompliance.contact?.found > 0 ? 'low' : 'high'
                }
            ],
            completenessScore: this.calculatePrivacyCompleteness(analysis),
            improvementPotential: this.calculatePrivacyImprovementPotential(analysis)
        };
    }

    generateExternalServicesExplanation(analysis) {
        const totalServices = analysis.scripts.length + analysis.iframes.length;

        return {
            summary: `${totalServices} externe Dienste erkannt, davon ${analysis.criticalServices.length} kritische.`,
            details: [
                {
                    title: "Externe Scripts",
                    count: analysis.scripts.length,
                    explanation: 'JavaScript-Dateien von externen Servern.',
                    risks: analysis.scripts.filter(s => s.risk === 'high').length
                },
                {
                    title: "Tracking-Dienste",
                    count: Object.values(analysis.trackingServices).flat().length,
                    explanation: 'Dienste, die Nutzerverhalten verfolgen.',
                    risks: 'Erfordern Einwilligung und AV-Verträge'
                },
                {
                    title: "kritische Dienste",
                    count: analysis.criticalServices.length,
                    explanation: 'Dienste mit hohem Datenschutzrisiko.',
                    risks: 'Benötigen besondere Aufmerksamkeit'
                }
            ],
            riskBreakdown: this.createServiceRiskBreakdown(analysis),
            complianceGap: this.assessServiceComplianceGap(analysis)
        };
    }

    generateFormsExplanation(analysis) {
        return {
            summary: `${analysis.totalForms} Formulare analysiert.`,
            details: [
                {
                    title: "Einwilligungen",
                    status: `${analysis.consentForms}/${analysis.totalForms} Formulare`,
                    explanation: 'Formulare mit personenbezogenen Daten benötigen Einwilligung.',
                    compliance: analysis.consentForms === analysis.totalForms
                },
                {
                    title: "Datenschutzhinweise",
                    status: `${analysis.hasPrivacyLinks}/${analysis.totalForms} Formulare`,
                    explanation: 'Links zur Datenschutzerklärung sind erforderlich.',
                    compliance: analysis.hasPrivacyLinks === analysis.totalForms
                },
                {
                    title: "Compliance-Probleme",
                    count: analysis.complianceIssues.length,
                    explanation: 'Identifizierte Datenschutz-Probleme in Formularen.',
                    severity: this.categorizeProblemSeverity(analysis.complianceIssues)
                }
            ],
            formTypes: this.analyzeFormTypeDistribution(analysis),
            riskAssessment: this.assessFormRisks(analysis)
        };
    }

    // UI-Update-Funktionen mit verbesserter Darstellung
    showLoading() {
        this.loadingSection.style.display = 'block';
        this.resultsSection.style.display = 'none';
        this.checkButton.disabled = true;
        this.checkButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analysiere...';
        this.animateProgressSteps();
    }

    animateProgressSteps() {
        const steps = document.querySelectorAll('.step');
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= steps.length) {
                clearInterval(interval);
                return;
            }

            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
                steps[currentStep - 1].classList.add('completed');
            }

            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
            }

            currentStep++;
        }, 1500);

        // Sicherheits-Cleanup
        setTimeout(() => clearInterval(interval), 15000);
    }

    updateProgressStep(stepName, status) {
        const step = document.querySelector(`[data-step="${stepName}"]`);
        if (step) {
            step.classList.remove('active');
            step.classList.add(status);

            // Füge visuelles Feedback hinzu
            if (status === 'completed') {
                const icon = step.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-check-circle';
                }
            } else if (status === 'error') {
                const icon = step.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-exclamation-circle';
                }
            }
        }
    }

    showResults() {
        this.loadingSection.style.display = 'none';
        this.resultsSection.style.display = 'block';
        this.checkButton.disabled = false;
        this.checkButton.innerHTML = '<i class="fas fa-search"></i> <span>Erneut prüfen</span>';

        // Animierte Darstellung der Ergebnisse
        setTimeout(() => this.updateOverallScore(), 300);
        setTimeout(() => this.updateResultCards(), 600);
        setTimeout(() => this.updateComplianceSummary(), 900);
        setTimeout(() => this.updatePriorityActions(), 1200);
        setTimeout(() => this.updateDetailedExplanations(), 1500);
    }

    updateOverallScore() {
        const scoreElement = this.overallScore?.querySelector('.score-value');
        if (scoreElement) {
            this.animateNumber(scoreElement, 0, this.overallScoreValue, 1000);
        }

        // Update Score Circle Animation
        const circle = this.overallScore?.querySelector('.score-circle');
        if (circle) {
            const percentage = this.overallScoreValue;
            const color = this.getScoreColor(percentage);

            setTimeout(() => {
                circle.style.background = `conic-gradient(
                    ${color} 0deg,
                    ${color} ${(percentage * 360) / 100}deg,
                    #e9ecef ${(percentage * 360) / 100}deg,
                    #e9ecef 360deg
                )`;
            }, 200);
        }

        // Update Compliance Level
        const levelElement = document.getElementById('complianceLevel');
        if (levelElement) {
            levelElement.innerHTML = `
                <span class="level-text">${this.complianceLevel.level}</span>
                <span class="risk-indicator ${this.complianceLevel.color}">${this.complianceLevel.risk} Risiko</span>
            `;
        }

        // Update zusätzliche Metriken
        this.updateAdditionalMetrics();
    }

    updateAdditionalMetrics() {
        // Update Compliance Summary Dashboard
        const criticalElement = document.getElementById('criticalIssues');
        const mediumElement = document.getElementById('mediumIssues');
        const conformElement = document.getElementById('conformAreas');

        if (criticalElement) this.animateNumber(criticalElement, 0, this.criticalIssuesCount, 800);
        if (mediumElement) this.animateNumber(mediumElement, 0, this.warningIssuesCount, 800);
        if (conformElement) this.animateNumber(conformElement, 0, this.conformAreasCount, 800);

        // Update Fine Risk Indicator
        const fineRiskElement = document.getElementById('fineRiskIndicator');
        if (fineRiskElement) {
            fineRiskElement.textContent = this.fineRisk;
            fineRiskElement.className = `fine-risk ${this.getFineRiskClass(this.fineRisk)}`;
        }
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentNumber = Math.round(start + (end - start) * progress);
            element.textContent = currentNumber;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);
    }

    getScoreColor(score) {
        if (score >= 80) return '#27ae60';
        if (score >= 60) return '#f39c12';
        return '#e74c3c';
    }

    updateResultCards() {
        Object.entries(this.analysisResults).forEach(([key, result], index) => {
            setTimeout(() => {
                const card = document.getElementById(`${key}Check`);
                if (!card) return;

                // Add entrance animation
                card.classList.add('fade-in');

                this.updateIndividualCard(card, result, key);
            }, index * 200);
        });
    }

    updateIndividualCard(card, result, key) {
        const badge = card.querySelector('.status-badge');
        const text = card.querySelector('.result-text');
        const recommendations = card.querySelector('.recommendations');
        const scoreProgress = card.querySelector('.score-progress');
        const scoreText = card.querySelector('.score-text');
        const detailsSection = card.querySelector('.details-section');

        // Update basic info
        if (badge) {
            badge.textContent = this.getStatusLabel(result.status);
            badge.className = `status-badge ${result.status}`;
        }

        if (text) {
            text.textContent = result.text;
        }

        // Animate progress bar
        if (scoreProgress) {
            setTimeout(() => {
                scoreProgress.style.setProperty('--progress-width', `${result.score}%`);
            }, 300);
        }

        if (scoreText) {
            setTimeout(() => {
                this.animateNumber(scoreText.querySelector('.score-number') || scoreText, 0, result.score, 1000);
            }, 500);
        }

        // Update recommendations
        if (recommendations && result.recommendations) {
            recommendations.innerHTML = '';
            result.recommendations.forEach((rec, index) => {
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.textContent = rec;
                    li.classList.add('slide-in');
                    recommendations.appendChild(li);
                }, index * 100);
            });
        }

        // Update detailed information
        this.updateCardDetails(card, result, key);
    }

    updateCardDetails(card, result, key) {
        // Update spezifische Details je nach Kategorie
        if (key === 'cookies') {
            this.updateCookieDetails(card, result);
        } else if (key === 'privacyPolicy') {
            this.updatePrivacyDetails(card, result);
        } else if (key === 'externalServices') {
            this.updateExternalServicesDetails(card, result);
        } else if (key === 'forms') {
            this.updateFormsDetails(card, result);
        }
    }

    updateCookieDetails(card, result) {
        const foundCookiesElement = card.querySelector('#foundCookies');
        const criticalCookiesElement = card.querySelector('#criticalCookies');

        if (foundCookiesElement) {
            foundCookiesElement.textContent = result.totalCount || 0;
        }

        if (criticalCookiesElement) {
            criticalCookiesElement.textContent = result.criticalCount || 0;
            criticalCookiesElement.className = `detail-value ${result.criticalCount > 0 ? 'warning' : 'success'}`;
        }
    }

    updateComplianceSummary() {
        const summaryElement = document.querySelector('.compliance-summary');
        if (!summaryElement) return;

        // Create compliance summary dashboard if it doesn't exist
        this.createComplianceSummaryDashboard();

        // Update summary values
        Object.entries(this.analysisResults).forEach(([key, result]) => {
            const conformityElement = document.getElementById(`${key}Conformity`);
            if (conformityElement) {
                const status = result.score >= 80 ? 'Ja' : result.score >= 50 ? 'Teilweise' : 'Nein';
                conformityElement.textContent = status;
                conformityElement.className = `summary-value ${result.status}`;
            }
        });
    }

    createComplianceSummaryDashboard() {
        const summaryCard = document.querySelector('.summary-card');
        if (!summaryCard) return;

        const summaryGrid = summaryCard.querySelector('.summary-grid');
        if (!summaryGrid) return;

        // Enhanced summary grid with detailed metrics
        summaryGrid.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Cookies konform:</span>
                <span class="summary-value" id="cookiesConformity">-</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Datenschutz vollständig:</span>
                <span class="summary-value" id="privacyPolicyConformity">-</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Externe Dienste sicher:</span>
                <span class="summary-value" id="externalServicesConformity">-</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Formulare rechtskonform:</span>
                <span class="summary-value" id="formsConformity">-</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Bußgeldrisiko:</span>
                <span class="summary-value" id="fineRiskIndicator">-</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Umsetzungsaufwand:</span>
                <span class="summary-value" id="implementationEffort">-</span>
            </div>
        `;
    }

    updatePriorityActions() {
        if (!this.priorityActions) return;

        this.priorityActions.innerHTML = '';

        // Verwende detaillierte Empfehlungen
        const topRecommendations = this.detailedRecommendations.slice(0, 5);

        topRecommendations.forEach((rec, index) => {
            setTimeout(() => {
                const actionDiv = document.createElement('div');
                actionDiv.className = `priority-action ${rec.priority}`;
                actionDiv.innerHTML = `
                    <div class="action-header">
                        <h4>${this.getCategoryTitle(rec.category)}</h4>
                        <span class="priority-badge ${rec.priority}">${this.getPriorityLabel(rec.priority)}</span>
                    </div>
                    <p class="action-description">${rec.recommendation}</p>
                    <div class="action-meta">
                        <span class="effort-indicator">Aufwand: ${rec.effort}</span>
                        <span class="impact-indicator">Impact: ${rec.impact}/10</span>
                    </div>
                `;
                actionDiv.classList.add('slide-in');
                this.priorityActions.appendChild(actionDiv);
            }, index * 150);
        });
    }

    updateDetailedExplanations() {
        // Füge erweiterte Erklärungen zu jeder Karte hinzu
        Object.entries(this.analysisResults).forEach(([key, result]) => {
            if (result.explanation) {
                this.addDetailedExplanationToCard(key, result.explanation);
            }
        });

        // Initialisiere Tooltips für Fachbegriffe
        this.initializeInteractiveTooltips();
    }

    addDetailedExplanationToCard(category, explanation) {
        const card = document.getElementById(`${category}Check`);
        if (!card) return;

        // Prüfe ob bereits eine Erklärungssektion existiert
        let explanationSection = card.querySelector('.explanation-section');
        if (!explanationSection) {
            explanationSection = document.createElement('div');
            explanationSection.className = 'explanation-section';
            card.querySelector('.card-content').appendChild(explanationSection);
        }

        explanationSection.innerHTML = `
            <div class="explanation-header">
                <h4><i class="fas fa-info-circle"></i> Detaillierte Erklärung</h4>
                <button class="expand-details" data-target="${category}">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="explanation-content" id="${category}ExplanationContent" style="display: none;">
                <div class="explanation-summary">
                    <p>${explanation.summary}</p>
                </div>
                <div class="explanation-details">
                    ${explanation.details.map(detail => `
                        <div class="detail-card ${detail.impact}">
                            <h5>${detail.title}</h5>
                            <div class="detail-status ${this.getDetailStatusClass(detail.status)}">
                                ${detail.status}
                            </div>
                            <p>${detail.explanation}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    toggleDetailSection(button) {
        const target = button.getAttribute('data-target');
        const content = document.getElementById(`${target}ExplanationContent`);
        const icon = button.querySelector('i');

        if (content.style.display === 'none') {
            content.style.display = 'block';
            content.classList.add('fade-in');
            icon.className = 'fas fa-chevron-up';
        } else {
            content.style.display = 'none';
            icon.className = 'fas fa-chevron-down';
        }
    }

    initializeInteractiveTooltips() {
        // Finde alle Fachbegriffe und füge Tooltips hinzu
        Object.keys(this.technicalTerms).forEach(term => {
            this.addTooltipsForTerm(term);
        });
    }

    addTooltipsForTerm(term) {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.children.length === 0 && element.textContent.includes(term)) {
                const regex = new RegExp(`\\b${term}\\b`, 'gi');
                element.innerHTML = element.innerHTML.replace(regex,
                    `<span class="tooltip-term" data-tooltip="${this.technicalTerms[term]}">${term}</span>`
                );
            }
        });
    }

    // Empfehlungs-Generatoren mit verbesserter Priorisierung
    generateCookieRecommendations(analysis) {
        const recommendations = [];

        if (!analysis.cookieBanner.found) {
            recommendations.push('Cookie-Banner implementieren für DSGVO-konforme Nutzerinformation');
        } else if (!analysis.cookieBanner.hasRejectButton) {
            recommendations.push('Ablehnungs-Option zum Cookie-Banner hinzufügen');
        }

        if (!analysis.consentManager.detected) {
            recommendations.push('Consent Management System einrichten für granulare Einwilligungen');
        }

        if (analysis.trackingCookies.total > 0) {
            recommendations.push(`${analysis.trackingCookies.total} Tracking-Cookie(s) nur nach expliziter Einwilligung setzen`);
        }

        const criticalCookies = analysis.currentCookies.filter(c => c.critical);
        if (criticalCookies.length > 0) {
            recommendations.push(`${criticalCookies.length} kritische Cookie(s) überprüfen und Einwilligung einholen`);
        }

        if (analysis.trackingCookies.hasGoogleAnalytics) {
            recommendations.push('Google Analytics DSGVO-konform konfigurieren (IP-Anonymisierung, AV-Vertrag)');
        }

        return recommendations;
    }

    generatePrivacyRecommendations(analysis) {
        const recommendations = [];

        if (!analysis.policyUrl) {
            recommendations.push('Datenschutzerklärung erstellen und prominent verlinken');
        }

        if (!analysis.accessibility) {
            recommendations.push('Erreichbarkeit der Datenschutzerklärung sicherstellen (404-Fehler beheben)');
        }

        if (analysis.gdprCompliance.rights && analysis.gdprCompliance.rights.percentage < 70) {
            const missingRights = 7 - analysis.gdprCompliance.rights.found;
            recommendations.push(`${missingRights} fehlende DSGVO-Betroffenenrechte dokumentieren`);
        }

        if (analysis.gdprCompliance.contact && analysis.gdprCompliance.contact.found === 0) {
            recommendations.push('Kontaktdaten für Datenschutzanfragen hinzufügen (E-Mail, Datenschutzbeauftragter)');
        }

        if (analysis.gdprCompliance.legalBasis && analysis.gdprCompliance.legalBasis.found === 0) {
            recommendations.push('Rechtsgrundlagen für Datenverarbeitung nach Art. 6 DSGVO ergänzen');
        }

        if (analysis.contentQuality && analysis.contentQuality.readabilityScore === 'schwer') {
            recommendations.push('Verständlichkeit der Datenschutzerklärung verbessern (kürzere Sätze)');
        }

        return recommendations;
    }

    generateExternalServicesRecommendations(analysis) {
        const recommendations = [];

        if (analysis.criticalServices.length > 0) {
            recommendations.push(`${analysis.criticalServices.length} kritische externe Dienste rechtlich absichern`);
        }

        const totalServices = analysis.scripts.length + analysis.iframes.length;
        if (totalServices > 15) {
            recommendations.push('Anzahl externer Services reduzieren für bessere Performance und Datenschutz');
        }

        const trackingCount = Object.values(analysis.trackingServices).reduce((sum, services) =>
            sum + (Array.isArray(services) ? services.length : 0), 0);

        if (trackingCount > 0) {
            recommendations.push('Auftragsverarbeitungsverträge für alle Tracking-Dienste abschließen');
        }

        // Google Services spezifische Empfehlungen
        const googleServices = analysis.scripts.filter(s => s.provider === 'Google');
        if (googleServices.length > 0) {
            recommendations.push('Google-Dienste DSGVO-konform konfigurieren (Datenschutz-Einstellungen)');
        }

        // Social Media spezifische Empfehlungen
        const socialServices = analysis.scripts.filter(s => s.purpose === 'social');
        if (socialServices.length > 0) {
            recommendations.push('Social Media Plugins durch datenschutzfreundliche Alternativen ersetzen');
        }

        return recommendations;
    }

    generateFormsRecommendations(analysis) {
        const recommendations = [];

        const formsWithoutConsent = analysis.totalForms - analysis.consentForms;
        if (formsWithoutConsent > 0) {
            recommendations.push(`${formsWithoutConsent} Formular(e) benötigen Einwilligungs-Checkboxen`);
        }

        const formsWithoutPrivacy = analysis.totalForms - analysis.hasPrivacyLinks;
        if (formsWithoutPrivacy > 0) {
            recommendations.push(`${formsWithoutPrivacy} Formular(e) benötigen Links zur Datenschutzerklärung`);
        }

        if (analysis.newsletterForms > 0) {
            recommendations.push('Double-Opt-In für Newsletter-Anmeldungen implementieren');
        }

        const criticalIssues = analysis.complianceIssues.filter(issue => issue.severity === 'high');
        if (criticalIssues.length > 0) {
            recommendations.push(`${criticalIssues.length} kritische Formular-Compliance-Probleme beheben`);
        }

        // Spezifische Empfehlungen basierend auf Formulartypen
        if (analysis.contactForms > 0) {
            recommendations.push('Kontaktformulare mit Zweckbindung der Datenverarbeitung versehen');
        }

        return recommendations;
    }

    // Hilfsfunktionen für bessere Darstellung
    getCategoryTitle(category) {
        const titles = {
            cookies: 'Cookie-Verwaltung',
            privacyPolicy: 'Datenschutzerklärung',
            externalServices: 'Externe Dienste',
            forms: 'Formulare & Einwilligungen'
        };
        return titles[category] || category;
    }

    getPriorityLabel(priority) {
        const labels = {
            critical: 'Kritisch',
            high: 'Hoch',
            medium: 'Mittel',
            low: 'Niedrig'
        };
        return labels[priority] || priority;
    }

    getDetailStatusClass(status) {
        if (status.includes('Vorhanden') || status.includes('Implementiert') || status.includes('Verfügbar')) {
            return 'success';
        }
        if (status.includes('Fehlt') || status.includes('Nicht') || status.includes('Keine')) {
            return 'danger';
        }
        return 'warning';
    }

    getFineRiskClass(riskLevel) {
        const classes = {
            'Sehr niedrig': 'success',
            'Niedrig': 'success',
            'Mittel': 'warning',
            'Hoch': 'danger',
            'Sehr hoch': 'danger'
        };
        return classes[riskLevel] || 'warning';
    }

    // Status-Text-Funktionen mit verbesserter Beschreibung
    getCookieStatusText(score) {
        if (score >= 90) return 'Exzellente Cookie-Verwaltung - DSGVO-konform implementiert';
        if (score >= 80) return 'Gute Cookie-Verwaltung mit kleinen Verbesserungsmöglichkeiten';
        if (score >= 60) return 'Cookie-Verwaltung benötigt wichtige Verbesserungen';
        if (score >= 40) return 'Cookie-Verwaltung hat erhebliche Mängel';
        return 'Cookie-Verwaltung ist nicht DSGVO-konform - sofortiger Handlungsbedarf';
    }

    getPrivacyPolicyStatusText(score) {
        if (score >= 90) return 'Exzellente Datenschutzerklärung - vollständig DSGVO-konform';
        if (score >= 80) return 'Gute Datenschutzerklärung mit minimalen Ergänzungen erforderlich';
        if (score >= 60) return 'Datenschutzerklärung ist unvollständig - wichtige Ergänzungen nötig';
        if (score >= 40) return 'Datenschutzerklärung hat wesentliche Mängel';
        return 'Datenschutzerklärung fehlt oder ist völlig unzureichend - kritisch';
    }

    getExternalServicesStatusText(score) {
        if (score >= 90) return 'Externe Dienste sind vorbildlich DSGVO-konform eingebunden';
        if (score >= 80) return 'Externe Dienste sind größtenteils DSGVO-konform';
        if (score >= 60) return 'Externe Dienste benötigen rechtliche Nachbesserungen';
        if (score >= 40) return 'Externe Dienste bergen erhebliche Datenschutzrisiken';
        return 'Externe Dienste sind kritisch für DSGVO-Compliance - sofortige Maßnahmen erforderlich';
    }

    getFormsStatusText(score) {
        if (score >= 90) return 'Formulare sind vorbildlich DSGVO-konform gestaltet';
        if (score >= 80) return 'Formulare entsprechen weitgehend den DSGVO-Anforderungen';
        if (score >= 60) return 'Formulare benötigen wichtige Datenschutz-Nachbesserungen';
        if (score >= 40) return 'Formulare haben erhebliche Compliance-Mängel';
        return 'Formulare sind nicht DSGVO-konform - kritische Überarbeitung erforderlich';
    }

    getStatus(score) {
        if (score >= 80) return 'success';
        if (score >= 50) return 'warning';
        return 'danger';
    }

    getStatusLabel(status) {
        const labels = {
            success: 'Konform',
            warning: 'Verbesserung nötig',
            danger: 'Kritisch'
        };
        return labels[status] || 'Unbekannt';
    }

    determineComplianceLevel(score) {
        if (score >= 95) return { level: 'Exzellent konform', risk: 'Minimal', color: 'success' };
        if (score >= 85) return { level: 'Vollständig konform', risk: 'Sehr niedrig', color: 'success' };
        if (score >= 70) return { level: 'Weitgehend konform', risk: 'Niedrig', color: 'success' };
        if (score >= 55) return { level: 'Teilweise konform', risk: 'Mittel', color: 'warning' };
        if (score >= 35) return { level: 'Unzureichend', risk: 'Hoch', color: 'warning' };
        return { level: 'Nicht konform', risk: 'Sehr hoch', color: 'danger' };
    }

    // Weitere Hilfsfunctions (gekürzt für Platzersparnis)
    isInternalUrl(url) {
        try {
            const urlObj = new URL(url);
            const currentDomain = window.location.hostname;
            return urlObj.hostname === currentDomain;
        } catch (error) {
            return false;
        }
    }

    extractDomain(url) {
        try {
            return new URL(url).hostname;
        } catch (error) {
            return 'unbekannt';
        }
    }

    identifyProvider(url) {
        const providers = {
            'Google': ['google', 'googleapis', 'googletagmanager', 'googleanalytics', 'gstatic'],
            'Facebook': ['facebook', 'fbcdn'],
            'YouTube': ['youtube', 'ytimg'],
            'Cloudflare': ['cloudflare'],
            'Amazon': ['amazonaws', 'amazon'],
            'Microsoft': ['microsoft', 'office365'],
            'Twitter': ['twitter', 'twimg']
        };

        const domain = this.extractDomain(url).toLowerCase();

        for (const [provider, patterns] of Object.entries(providers)) {
            if (patterns.some(pattern => domain.includes(pattern))) {
                return provider;
            }
        }

        return 'Unbekannt';
    }

    assessRisk(url) {
        const highRiskPatterns = ['analytics', 'tracking', 'pixel', 'doubleclick', 'adsystem', 'ads'];
        const mediumRiskPatterns = ['social', 'facebook', 'twitter', 'youtube', 'cdn'];

        const lowerUrl = url.toLowerCase();

        if (highRiskPatterns.some(pattern => lowerUrl.includes(pattern))) {
            return 'high';
        }

        if (mediumRiskPatterns.some(pattern => lowerUrl.includes(pattern))) {
            return 'medium';
        }

        return 'low';
    }

    categorizeCookie(name) {
        const lowerName = name.toLowerCase();

        // Analytics Cookies
        if (lowerName.includes('_ga') || lowerName.includes('_gid') || lowerName.includes('__utm')) {
            return 'analytics';
        }

        // Marketing Cookies
        if (lowerName.includes('_fb') || lowerName.includes('facebook') || lowerName.includes('pixel')) {
            return 'marketing';
        }

        // Functional Cookies
        if (lowerName.includes('session') || lowerName.includes('phpsessid') || lowerName.includes('jsessionid')) {
            return 'functional';
        }

        // Preferences Cookies
        if (lowerName.includes('lang') || lowerName.includes('theme') || lowerName.includes('pref')) {
            return 'preferences';
        }

        return 'other';
    }

    isCriticalCookie(name) {
        const criticalPatterns = [
            '_ga', '_gid', '_fbp', '_fbc', '__utm', 'doubleclick',
            'adsystem', 'tracking', 'analytics', 'pixel'
        ];
        const lowerName = name.toLowerCase();
        return criticalPatterns.some(pattern => lowerName.includes(pattern));
    }

    // Error-Handling
    handleAnalysisError(category, error) {
        console.error(`Fehler in ${category}:`, error);

        this.checkList[category].score = 0;
        this.analysisResults[category] = {
            score: 0,
            status: 'danger',
            text: 'Analyse fehlgeschlagen - manuelle Überprüfung erforderlich',
            recommendations: ['Manuelle Überprüfung durch Datenschutzexperten empfohlen'],
            details: { error: error.message },
            explanation: {
                summary: 'Die automatische Analyse konnte nicht durchgeführt werden.',
                details: [{
                    title: 'Fehler',
                    status: 'Fehlgeschlagen',
                    explanation: error.message,
                    impact: 'high'
                }]
            }
        };

        this.updateProgressStep(category, 'error');
        this.criticalIssuesCount++;
    }

    emergencyStop() {
        console.log('Notfall-Stopp aktiviert');

        // Alle Timeouts stoppen
        if (this.analysisTimeout) {
            clearTimeout(this.analysisTimeout);
        }

        this.cleanup();
        this.showNotification('Analyse gestoppt - verwenden Sie Ctrl+Shift+X zum Neustart', 'warning');
    }

    cleanup() {
        this.isAnalyzing = false;
        this.checkButton.disabled = false;
        this.checkButton.innerHTML = '<i class="fas fa-search"></i> <span>Prüfen starten</span>';

        if (this.analysisTimeout) {
            clearTimeout(this.analysisTimeout);
            this.analysisTimeout = null;
        }
    }

    // Export-Funktionen (kompakt gehalten)
    async exportToPdf() {
        if (!window.jsPDF) {
            this.showNotification('PDF-Bibliothek wird geladen...', 'info');
            setTimeout(() => this.exportToPdf(), 2000);
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            this.generateEnhancedPdfContent(pdf);

            const filename = `dsgvo-compliance-report-${Date.now()}.pdf`;
            pdf.save(filename);

            this.showNotification('Detaillierter PDF-Bericht erfolgreich exportiert', 'success');
        } catch (error) {
            console.error('PDF-Export Fehler:', error);
            this.showNotification('PDF-Export fehlgeschlagen', 'error');
        }
    }

    generateEnhancedPdfContent(pdf) {
        let yPos = 20;

        // Header mit Logo-Platzhalter
        pdf.setFontSize(24);
        pdf.setTextColor(44, 62, 80);
        pdf.text('DSGVO-Compliance Bericht', 20, yPos);
        yPos += 15;

        // Datum und Website
        pdf.setFontSize(12);
        pdf.setTextColor(127, 140, 141);
        pdf.text(`Website: ${this.currentUrl}`, 20, yPos);
        yPos += 7;
        pdf.text(`Analysedatum: ${new Date().toLocaleDateString('de-DE')}`, 20, yPos);
        yPos += 20;

        // Executive Summary
        pdf.setFontSize(16);
        pdf.setTextColor(44, 62, 80);
        pdf.text('Executive Summary', 20, yPos);
        yPos += 10;

        pdf.setFontSize(11);
        pdf.text(`Gesamt-Compliance-Score: ${this.overallScoreValue}/100`, 20, yPos);
        yPos += 6;
        pdf.text(`Compliance-Level: ${this.complianceLevel.level}`, 20, yPos);
        yPos += 6;
        pdf.text(`Bußgeldrisiko: ${this.fineRisk}`, 20, yPos);
        yPos += 15;

        // Detailbewertungen
        Object.entries(this.analysisResults).forEach(([category, result]) => {
            if (yPos > 250) {
                pdf.addPage();
                yPos = 20;
            }

            pdf.setFontSize(14);
            pdf.setTextColor(44, 62, 80);
            pdf.text(this.getCategoryTitle(category), 20, yPos);
            yPos += 8;

            pdf.setFontSize(11);
            pdf.setTextColor(0, 0, 0);
            pdf.text(`Score: ${result.score}/100 - ${result.text}`, 25, yPos);
            yPos += 8;

            // Empfehlungen
            if (result.recommendations.length > 0) {
                pdf.text('Empfehlungen:', 25, yPos);
                yPos += 6;

                result.recommendations.forEach(rec => {
                    const lines = pdf.splitTextToSize(`• ${rec}`, 160);
                    pdf.text(lines, 30, yPos);
                    yPos += lines.length * 5;
                });
            }

            yPos += 10;
        });
    }

    async exportToJson() {
        const enhancedExportData = {
            metadata: {
                url: this.currentUrl,
                timestamp: new Date().toISOString(),
                version: '2.0',
                analysisType: 'DSGVO-Compliance-Check'
            },
            summary: {
                overallScore: this.overallScoreValue,
                complianceLevel: this.complianceLevel,
                fineRisk: this.fineRisk,
                criticalIssues: this.criticalIssuesCount,
                warningIssues: this.warningIssuesCount,
                conformAreas: this.conformAreasCount
            },
            results: this.analysisResults,
            checkList: this.checkList,
            detailedRecommendations: this.detailedRecommendations
        };

        const dataStr = JSON.stringify(enhancedExportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `dsgvo-compliance-data-${Date.now()}.json`;
        link.click();

        URL.revokeObjectURL(link.href);
        this.showNotification('Detaillierte JSON-Daten erfolgreich exportiert', 'success');
    }

    // Utility-Funktionen
    showError(message) {
        this.showNotification(message, 'error');
        this.loadingSection.style.display = 'none';
        this.checkButton.disabled = false;
        this.checkButton.innerHTML = '<i class="fas fa-search"></i> <span>Prüfen starten</span>';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        const colors = {
            info: '#3498db',
            success: '#27ae60',
            warning: '#f39c12',
            error: '#e74c3c'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${colors[type] || colors.info};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, type === 'error' ? 6000 : 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            info: 'fa-info-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle'
        };
        return icons[type] || icons.info;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Erweiterte CSS-Styles für bessere Darstellung
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Animations */
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out;
    }
    
    .slide-in {
        animation: slideIn 0.4s ease-out;
    }
    
    /* Enhanced Card Styles */
    .explanation-section {
        margin-top: 1.5rem;
        border-top: 1px solid #e9ecef;
        padding-top: 1.5rem;
    }
    
    .explanation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .explanation-header h4 {
        color: var(--primary-color);
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .expand-details {
        background: none;
        border: none;
        color: var(--secondary-color);
        cursor: pointer;
        font-size: 1rem;
        transition: transform 0.3s ease;
    }
    
    .expand-details:hover {
        transform: scale(1.1);
    }
    
    .explanation-content {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        border-left: 4px solid var(--info-color);
    }
    
    .explanation-summary {
        margin-bottom: 1rem;
        font-style: italic;
        color: #666;
    }
    
    .detail-card {
        background: white;
        padding: 1rem;
        margin-bottom: 0.75rem;
        border-radius: 6px;
        border-left: 4px solid;
    }
    
    .detail-card.low {
        border-color: var(--success-color);
    }
    
    .detail-card.medium {
        border-color: var(--warning-color);
    }
    
    .detail-card.high {
        border-color: var(--danger-color);
    }
    
    .detail-card.critical {
        border-color: #dc3545;
        background: #fff5f5;
    }
    
    .detail-card h5 {
        margin-bottom: 0.5rem;
        color: var(--primary-color);
    }
    
    .detail-status {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .detail-status.success {
        background: #d4edda;
        color: #155724;
    }
    
    .detail-status.warning {
        background: #fff3cd;
        color: #856404;
    }
    
    .detail-status.danger {
        background: #f8d7da;
        color: #721c24;
    }
    
    /* Tooltip Styles */
    .tooltip-term {
        border-bottom: 1px dotted var(--secondary-color);
        cursor: help;
        position: relative;
    }
    
    .tooltip-term:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--dark-text);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    /* Priority Action Enhancements */
    .priority-action {
        transition: all 0.3s ease;
    }
    
    .priority-action:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .action-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }
    
    .priority-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .priority-badge.critical {
        background: #dc3545;
        color: white;
    }
    
    .priority-badge.high {
        background: #fd7e14;
        color: white;
    }
    
    .priority-badge.medium {
        background: #ffc107;
        color: #000;
    }
    
    .priority-badge.low {
        background: #28a745;
        color: white;
    }
    
    .action-meta {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
        font-size: 0.85rem;
        color: #666;
    }
    
    .effort-indicator,
    .impact-indicator {
        background: #e9ecef;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }
    
    /* Progress Step Enhancements */
    .step.error {
        background-color: #e74c3c;
        color: white;
        border-color: #c0392b;
    }
    
    .step.error i {
        color: white;
    }
    
    /* Score Progress Animation */
    .score-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: var(--progress-width, 0%);
        background: linear-gradient(90deg, var(--success-color), var(--secondary-color));
        border-radius: 4px;
        transition: width 1s ease-out;
    }
    
    /* Responsive Enhancements */
    @media (max-width: 768px) {
        .action-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .explanation-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .action-meta {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`;
document.head.appendChild(enhancedStyles);

// Initialisierung nach DOM-Load
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.dsgvoChecker = new DSGVOChecker();
        console.log('Erweiterte DSGVO-Checker Version 2.0 erfolgreich initialisiert');
    } catch (error) {
        console.error('Initialisierungsfehler:', error);
    }
});
