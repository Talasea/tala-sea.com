// BSI Threat Modeling Tool - Production Readiness and Performance Optimization
class ProductionOptimizer {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.performanceMetrics = {};
        this.errorLog = [];
        this.optimizationSettings = {
            enableLazyLoading: true,
            enableCaching: true,
            enableCompression: true,
            enableServiceWorker: true,
            maxCacheSize: 50 * 1024 * 1024, // 50MB
            performanceMonitoring: true
        };
        
        this.init();
    }
    
    init() {
        this.setupPerformanceMonitoring();
        this.setupErrorHandling();
        this.setupCaching();
        this.setupServiceWorker();
        this.setupLazyLoading();
        this.setupDataValidation();
        this.setupSecurityHeaders();
        this.setupAccessibility();
    }
    
    setupPerformanceMonitoring() {
        if (!this.optimizationSettings.performanceMonitoring) return;
        
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.performanceMetrics.pageLoad = {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            };
            
            this.logPerformanceMetric('Page Load', this.performanceMetrics.pageLoad);
        });
        
        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                this.performanceMetrics.memory = {
                    used: memInfo.usedJSHeapSize,
                    total: memInfo.totalJSHeapSize,
                    limit: memInfo.jsHeapSizeLimit
                };
                
                // Warn if memory usage is high
                if (memInfo.usedJSHeapSize > memInfo.jsHeapSizeLimit * 0.8) {
                    console.warn('High memory usage detected:', memInfo);
                    this.optimizeMemoryUsage();
                }
            }, 30000); // Check every 30 seconds
        }
        
        // Monitor render performance
        this.setupRenderPerformanceMonitoring();
    }
    
    setupRenderPerformanceMonitoring() {
        let renderStartTime;
        
        // Override canvas rendering to monitor performance
        const originalRenderCanvas = this.threatTool.renderCanvas;
        this.threatTool.renderCanvas = (...args) => {
            renderStartTime = performance.now();
            const result = originalRenderCanvas.apply(this.threatTool, args);
            const renderTime = performance.now() - renderStartTime;
            
            this.performanceMetrics.lastRenderTime = renderTime;
            
            if (renderTime > 100) { // Warn if render takes more than 100ms
                console.warn(`Slow render detected: ${renderTime.toFixed(2)}ms`);
                this.optimizeRendering();
            }
            
            return result;
        };
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });
        
        // Promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise
            });
        });
        
        // Custom error boundary for modules
        this.setupModuleErrorHandling();
    }
    
    setupModuleErrorHandling() {
        const modules = [
            'advancedAnalysis',
            'autoRiskMatrix',
            'dfdVisualization',
            'autoLayoutEngine',
            'reportGenerator',
            'complianceManager'
        ];
        
        modules.forEach(moduleName => {
            if (this.threatTool[moduleName]) {
                this.wrapModuleWithErrorHandling(this.threatTool[moduleName], moduleName);
            }
        });
    }
    
    wrapModuleWithErrorHandling(module, moduleName) {
        const originalMethods = {};
        
        Object.getOwnPropertyNames(Object.getPrototypeOf(module)).forEach(methodName => {
            if (typeof module[methodName] === 'function' && methodName !== 'constructor') {
                originalMethods[methodName] = module[methodName];
                
                module[methodName] = (...args) => {
                    try {
                        return originalMethods[methodName].apply(module, args);
                    } catch (error) {
                        this.logError(`${moduleName}.${methodName}`, {
                            error: error.message,
                            stack: error.stack,
                            args: args
                        });
                        
                        // Show user-friendly error message
                        this.showUserFriendlyError(moduleName, methodName, error);
                        
                        // Return safe fallback
                        return this.getSafeFallback(moduleName, methodName);
                    }
                };
            }
        });
    }
    
    setupCaching() {
        if (!this.optimizationSettings.enableCaching) return;
        
        this.cache = new Map();
        this.cacheStats = {
            hits: 0,
            misses: 0,
            size: 0
        };
        
        // Cache component analysis results
        this.setupComponentAnalysisCache();
        
        // Cache DFD calculations
        this.setupDFDCache();
        
        // Cache compliance checks
        this.setupComplianceCache();
    }
    
    setupComponentAnalysisCache() {
        if (!this.threatTool.advancedAnalysis) return;
        
        const originalAnalyze = this.threatTool.advancedAnalysis.analyzeComponent;
        this.threatTool.advancedAnalysis.analyzeComponent = (component) => {
            const cacheKey = `analysis_${component.id}_${JSON.stringify(component).slice(0, 100)}`;
            
            if (this.cache.has(cacheKey)) {
                this.cacheStats.hits++;
                return this.cache.get(cacheKey);
            }
            
            const result = originalAnalyze.call(this.threatTool.advancedAnalysis, component);
            this.setCacheItem(cacheKey, result);
            this.cacheStats.misses++;
            
            return result;
        };
    }
    
    setupDFDCache() {
        if (!this.threatTool.dfdVisualization) return;
        
        const originalIdentifyThreats = this.threatTool.dfdVisualization.identifyThreats;
        this.threatTool.dfdVisualization.identifyThreats = () => {
            const cacheKey = `dfd_threats_${this.threatTool.dfdVisualization.dfdElements.length}_${this.threatTool.dfdVisualization.dfdConnections.length}`;
            
            if (this.cache.has(cacheKey)) {
                this.cacheStats.hits++;
                return this.cache.get(cacheKey);
            }
            
            const result = originalIdentifyThreats.call(this.threatTool.dfdVisualization);
            this.setCacheItem(cacheKey, result);
            this.cacheStats.misses++;
            
            return result;
        };
    }
    
    setupComplianceCache() {
        if (!this.threatTool.complianceManager) return;
        
        const originalCheckCompliance = this.threatTool.complianceManager.checkCompliance;
        this.threatTool.complianceManager.checkCompliance = (framework) => {
            const cacheKey = `compliance_${framework}_${this.threatTool.currentProject.components.length}`;
            
            if (this.cache.has(cacheKey)) {
                this.cacheStats.hits++;
                return this.cache.get(cacheKey);
            }
            
            const result = originalCheckCompliance.call(this.threatTool.complianceManager, framework);
            this.setCacheItem(cacheKey, result);
            this.cacheStats.misses++;
            
            return result;
        };
    }
    
    setCacheItem(key, value) {
        const serializedValue = JSON.stringify(value);
        const size = new Blob([serializedValue]).size;
        
        // Check cache size limit
        if (this.cacheStats.size + size > this.optimizationSettings.maxCacheSize) {
            this.evictOldestCacheItems();
        }
        
        this.cache.set(key, {
            value: value,
            timestamp: Date.now(),
            size: size
        });
        
        this.cacheStats.size += size;
    }
    
    evictOldestCacheItems() {
        const entries = Array.from(this.cache.entries());
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        
        // Remove oldest 25% of cache
        const itemsToRemove = Math.floor(entries.length * 0.25);
        
        for (let i = 0; i < itemsToRemove; i++) {
            const [key, item] = entries[i];
            this.cache.delete(key);
            this.cacheStats.size -= item.size;
        }
    }
    
    setupServiceWorker() {
        if (!this.optimizationSettings.enableServiceWorker || !('serviceWorker' in navigator)) return;
        
        const swCode = `
            const CACHE_NAME = 'bsi-threat-tool-v1';
            const urlsToCache = [
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/bsi-components.js',
                '/visualization.js',
                '/compliance.js',
                '/advanced-analysis.js',
                '/auto-risk-matrix.js',
                '/dfd-visualization-simple.js',
                '/auto-layout-engine.js',
                '/comprehensive-report-generator.js',
                '/production-deployment.js'
            ];
            
            self.addEventListener('install', (event) => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then((cache) => cache.addAll(urlsToCache))
                );
            });
            
            self.addEventListener('fetch', (event) => {
                event.respondWith(
                    caches.match(event.request)
                        .then((response) => {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        })
                );
            });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.warn('Service Worker registration failed:', error);
            });
    }
    
    setupLazyLoading() {
        if (!this.optimizationSettings.enableLazyLoading) return;
        
        // Lazy load heavy components
        this.setupLazyComponentLoading();
        
        // Lazy load images
        this.setupLazyImageLoading();
        
        // Lazy load analysis results
        this.setupLazyAnalysisLoading();
    }
    
    setupLazyComponentLoading() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.dataset.lazyLoad) {
                        this.loadLazyComponent(element);
                        observer.unobserve(element);
                    }
                }
            });
        });
        
        // Observe elements marked for lazy loading
        document.querySelectorAll('[data-lazy-load]').forEach((el) => {
            observer.observe(el);
        });
    }
    
    setupLazyImageLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach((img) => {
            imageObserver.observe(img);
        });
    }
    
    setupDataValidation() {
        // Input validation for security
        this.setupInputValidation();
        
        // Data sanitization
        this.setupDataSanitization();
        
        // XSS protection
        this.setupXSSProtection();
    }
    
    setupInputValidation() {
        const validateInput = (input, type) => {
            switch (type) {
                case 'component-name':
                    return /^[a-zA-Z0-9\s\-_äöüÄÖÜß]{1,100}$/.test(input);
                case 'description':
                    return input.length <= 1000 && !/[<>]/.test(input);
                case 'email':
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
                case 'url':
                    try {
                        new URL(input);
                        return true;
                    } catch {
                        return false;
                    }
                default:
                    return true;
            }
        };
        
        // Add validation to form inputs
        document.addEventListener('input', (event) => {
            const input = event.target;
            if (input.dataset.validate) {
                const isValid = validateInput(input.value, input.dataset.validate);
                input.classList.toggle('invalid', !isValid);
                
                if (!isValid) {
                    this.showValidationError(input);
                }
            }
        });
    }
    
    setupDataSanitization() {
        this.sanitizeHTML = (html) => {
            const div = document.createElement('div');
            div.textContent = html;
            return div.innerHTML;
        };
        
        this.sanitizeJSON = (obj) => {
            return JSON.parse(JSON.stringify(obj, (key, value) => {
                if (typeof value === 'string') {
                    return this.sanitizeHTML(value);
                }
                return value;
            }));
        };
    }
    
    setupXSSProtection() {
        // Override innerHTML to prevent XSS
        const originalInnerHTML = Element.prototype.__lookupSetter__('innerHTML');
        
        Object.defineProperty(Element.prototype, 'innerHTML', {
            set: function(value) {
                if (typeof value === 'string' && /<script/i.test(value)) {
                    console.warn('Potential XSS attempt blocked:', value);
                    return;
                }
                originalInnerHTML.call(this, value);
            }
        });
    }
    
    setupSecurityHeaders() {
        // Content Security Policy
        const csp = document.createElement('meta');
        csp.httpEquiv = 'Content-Security-Policy';
        csp.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; img-src 'self' data:;";
        document.head.appendChild(csp);
        
        // X-Frame-Options
        const frameOptions = document.createElement('meta');
        frameOptions.httpEquiv = 'X-Frame-Options';
        frameOptions.content = 'DENY';
        document.head.appendChild(frameOptions);
        
        // X-Content-Type-Options
        const contentType = document.createElement('meta');
        contentType.httpEquiv = 'X-Content-Type-Options';
        contentType.content = 'nosniff';
        document.head.appendChild(contentType);
    }
    
    setupAccessibility() {
        // ARIA labels for dynamic content
        this.setupARIALabels();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Screen reader support
        this.setupScreenReaderSupport();
        
        // High contrast mode detection
        this.setupHighContrastMode();
    }
    
    setupARIALabels() {
        // Add ARIA labels to canvas elements
        const canvas = document.getElementById('canvas');
        if (canvas) {
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', 'Bedrohungsmodellierungs-Diagramm');
        }
        
        // Add ARIA labels to interactive elements
        document.querySelectorAll('button, input, select').forEach((element) => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const label = element.textContent || element.placeholder || element.title;
                if (label) {
                    element.setAttribute('aria-label', label);
                }
            }
        });
    }
    
    setupKeyboardNavigation() {
        // Tab order management
        let focusableElements = [];
        
        const updateFocusableElements = () => {
            focusableElements = Array.from(document.querySelectorAll(
                'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
            ));
        };
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                updateFocusableElements();
            }
            
            // Escape key to close modals
            if (event.key === 'Escape') {
                const modal = document.querySelector('.modal:not([style*="display: none"])');
                if (modal) {
                    modal.style.display = 'none';
                }
            }
        });
        
        // Focus management for dynamic content
        this.manageFocus();
    }
    
    setupScreenReaderSupport() {
        // Live regions for dynamic updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
        
        this.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
        };
        
        // Announce important events
        document.addEventListener('componentAdded', (event) => {
            this.announceToScreenReader(`Komponente ${event.detail.component.name} wurde hinzugefügt`);
        });
    }
    
    setupHighContrastMode() {
        // Detect high contrast mode
        const detectHighContrast = () => {
            const testElement = document.createElement('div');
            testElement.style.borderColor = 'rgb(31, 31, 31)';
            testElement.style.borderStyle = 'solid';
            testElement.style.borderWidth = '1px';
            testElement.style.position = 'absolute';
            testElement.style.left = '-999px';
            document.body.appendChild(testElement);
            
            const computedStyle = window.getComputedStyle(testElement);
            const isHighContrast = computedStyle.borderColor !== 'rgb(31, 31, 31)';
            
            document.body.removeChild(testElement);
            
            if (isHighContrast) {
                document.body.classList.add('high-contrast');
            }
            
            return isHighContrast;
        };
        
        detectHighContrast();
    }
    
    optimizeMemoryUsage() {
        // Clear old cache entries
        this.evictOldestCacheItems();
        
        // Clear old error logs
        if (this.errorLog.length > 100) {
            this.errorLog = this.errorLog.slice(-50);
        }
        
        // Clear old performance metrics
        if (Object.keys(this.performanceMetrics).length > 50) {
            const keys = Object.keys(this.performanceMetrics);
            keys.slice(0, -25).forEach(key => {
                delete this.performanceMetrics[key];
            });
        }
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }
    
    optimizeRendering() {
        // Implement render optimization strategies
        if (this.threatTool.currentProject.components.length > 50) {
            // Use viewport culling for large projects
            this.enableViewportCulling();
        }
        
        // Reduce render frequency for complex scenes
        this.throttleRendering();
    }
    
    enableViewportCulling() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        
        // Only render components within viewport
        this.threatTool.currentProject.components.forEach(component => {
            const isVisible = (
                component.x >= -100 &&
                component.x <= canvasRect.width + 100 &&
                component.y >= -100 &&
                component.y <= canvasRect.height + 100
            );
            
            component._visible = isVisible;
        });
    }
    
    throttleRendering() {
        let renderTimeout;
        
        const originalRenderCanvas = this.threatTool.renderCanvas;
        this.threatTool.renderCanvas = (...args) => {
            clearTimeout(renderTimeout);
            renderTimeout = setTimeout(() => {
                originalRenderCanvas.apply(this.threatTool, args);
            }, 16); // ~60fps
        };
    }
    
    logError(source, details) {
        const errorEntry = {
            timestamp: new Date().toISOString(),
            source: source,
            details: details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.errorLog.push(errorEntry);
        
        // Send to monitoring service in production
        if (window.location.hostname !== 'localhost') {
            this.sendErrorToMonitoring(errorEntry);
        }
        
        console.error('Production Error:', errorEntry);
    }
    
    logPerformanceMetric(name, data) {
        this.performanceMetrics[name] = {
            timestamp: new Date().toISOString(),
            data: data
        };
        
        // Send to monitoring service in production
        if (window.location.hostname !== 'localhost') {
            this.sendMetricToMonitoring(name, data);
        }
    }
    
    sendErrorToMonitoring(errorEntry) {
        // Placeholder for production error monitoring
        // In production, this would send to services like Sentry, LogRocket, etc.
        console.log('Would send error to monitoring:', errorEntry);
    }
    
    sendMetricToMonitoring(name, data) {
        // Placeholder for production performance monitoring
        // In production, this would send to services like New Relic, DataDog, etc.
        console.log('Would send metric to monitoring:', name, data);
    }
    
    showUserFriendlyError(moduleName, methodName, error) {
        const userFriendlyMessages = {
            'advancedAnalysis': 'Fehler bei der Bedrohungsanalyse. Bitte versuchen Sie es erneut.',
            'autoRiskMatrix': 'Fehler bei der Risikomatrix-Generierung. Bitte überprüfen Sie Ihre Daten.',
            'dfdVisualization': 'Fehler bei der DFD-Visualisierung. Bitte laden Sie die Seite neu.',
            'autoLayoutEngine': 'Fehler beim automatischen Layout. Bitte ordnen Sie die Elemente manuell an.',
            'reportGenerator': 'Fehler bei der Berichtsgenerierung. Bitte versuchen Sie es später erneut.',
            'complianceManager': 'Fehler bei der Compliance-Prüfung. Bitte kontaktieren Sie den Support.'
        };
        
        const message = userFriendlyMessages[moduleName] || 'Ein unerwarteter Fehler ist aufgetreten.';
        
        this.showNotification(message, 'error');
    }
    
    getSafeFallback(moduleName, methodName) {
        const fallbacks = {
            'advancedAnalysis': { threats: [], recommendations: [] },
            'autoRiskMatrix': { matrix: [], risks: [] },
            'dfdVisualization': { elements: [], connections: [] },
            'autoLayoutEngine': { success: false },
            'reportGenerator': { report: 'Bericht konnte nicht generiert werden.' },
            'complianceManager': { status: 'unknown', score: 0 }
        };
        
        return fallbacks[moduleName] || null;
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `production-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="close-notification" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    showValidationError(input) {
        const existingError = input.parentElement.querySelector('.validation-error');
        if (existingError) return;
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'validation-error';
        errorMessage.textContent = this.getValidationMessage(input.dataset.validate);
        
        input.parentElement.appendChild(errorMessage);
        
        // Remove error when input becomes valid
        const removeError = () => {
            if (errorMessage.parentElement) {
                errorMessage.remove();
            }
            input.removeEventListener('input', removeError);
        };
        
        input.addEventListener('input', removeError);
    }
    
    getValidationMessage(type) {
        const messages = {
            'component-name': 'Name darf nur Buchstaben, Zahlen und Bindestriche enthalten (max. 100 Zeichen)',
            'description': 'Beschreibung darf keine HTML-Tags enthalten (max. 1000 Zeichen)',
            'email': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
            'url': 'Bitte geben Sie eine gültige URL ein'
        };
        
        return messages[type] || 'Ungültige Eingabe';
    }
    
    getPerformanceReport() {
        return {
            metrics: this.performanceMetrics,
            cache: {
                stats: this.cacheStats,
                hitRate: this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses) * 100
            },
            errors: this.errorLog.slice(-10), // Last 10 errors
            timestamp: new Date().toISOString()
        };
    }
}

// Add CSS for production features
const productionStyles = `
<style>
.production-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 400px;
    z-index: 1000;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideInRight 0.3s ease;
}

.production-notification.error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
}

.production-notification.info {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1e40af;
}

.production-notification.success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
}

.notification-content i {
    flex-shrink: 0;
}

.close-notification {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    margin-left: auto;
}

.close-notification:hover {
    background: rgba(0, 0, 0, 0.1);
}

.validation-error {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.invalid {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 1px #dc2626 !important;
}

.high-contrast {
    filter: contrast(150%);
}

.high-contrast .btn-primary {
    background: #000 !important;
    color: #fff !important;
    border: 2px solid #fff !important;
}

.high-contrast .btn-secondary {
    background: #fff !important;
    color: #000 !important;
    border: 2px solid #000 !important;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    .production-notification {
        animation: none;
    }
}

/* Focus indicators for accessibility */
button:focus,
input:focus,
select:focus,
textarea:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* Skip link for screen readers */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
}

.skip-link:focus {
    top: 6px;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', productionStyles);

// Add skip link for accessibility
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = 'Zum Hauptinhalt springen';
document.body.insertBefore(skipLink, document.body.firstChild);

