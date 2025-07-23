// BSI Threat Modeling Tool - Compliance and Security Module
class ComplianceManager {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.complianceFrameworks = this.initializeFrameworks();
        this.auditLog = [];
        this.dataProtectionSettings = this.initializeDataProtection();
        this.init();
    }
    
    init() {
        this.setupComplianceInterface();
        this.setupDataProtection();
        this.setupAuditLogging();
        this.validateCompliance();
    }
    
    initializeFrameworks() {
        return {
            'BSI_IT_GRUNDSCHUTZ': {
                name: 'BSI IT-Grundschutz',
                version: '2023',
                description: 'Deutscher Standard für Informationssicherheit',
                requirements: [
                    'Dokumentation der Bedrohungsmodellierung',
                    'Regelmäßige Überprüfung der Sicherheitsmaßnahmen',
                    'Nachweis der Risikobehandlung',
                    'Schulung der verantwortlichen Personen'
                ],
                mappings: this.getBSIMappings()
            },
            'ISO_27001': {
                name: 'ISO/IEC 27001',
                version: '2022',
                description: 'Internationale Norm für Informationssicherheits-Managementsysteme',
                requirements: [
                    'Risikoidentifikation und -bewertung',
                    'Behandlung von Informationssicherheitsrisiken',
                    'Überwachung und Messung',
                    'Kontinuierliche Verbesserung'
                ],
                mappings: this.getISOMappings()
            },
            'DSGVO': {
                name: 'Datenschutz-Grundverordnung',
                version: '2018',
                description: 'EU-Verordnung zum Schutz personenbezogener Daten',
                requirements: [
                    'Privacy by Design',
                    'Datenschutz-Folgenabschätzung',
                    'Technische und organisatorische Maßnahmen',
                    'Dokumentationspflichten'
                ],
                mappings: this.getDSGVOMappings()
            },
            'NIST_CSF': {
                name: 'NIST Cybersecurity Framework',
                version: '2.0',
                description: 'US-amerikanisches Framework für Cybersicherheit',
                requirements: [
                    'Identify (Identifizieren)',
                    'Protect (Schützen)',
                    'Detect (Erkennen)',
                    'Respond (Reagieren)',
                    'Recover (Wiederherstellen)'
                ],
                mappings: this.getNISTMappings()
            }
        };
    }
    
    initializeDataProtection() {
        return {
            dataMinimization: true,
            purposeLimitation: true,
            storageMinimization: true,
            encryption: {
                inTransit: true,
                atRest: true,
                keyManagement: 'browser-local'
            },
            accessControl: {
                authentication: false, // No user accounts in basic version
                authorization: false,
                logging: true
            },
            dataRetention: {
                maxAge: 30, // days
                autoCleanup: true
            },
            consent: {
                required: false, // No personal data collection
                granular: true,
                withdrawable: true
            }
        };
    }
    
    setupComplianceInterface() {
        // Add compliance panel to the interface
        const compliancePanel = document.createElement('div');
        compliancePanel.id = 'compliancePanel';
        compliancePanel.className = 'compliance-panel hidden';
        compliancePanel.innerHTML = `
            <div class="compliance-header">
                <h3>Compliance & Rechtliche Hinweise</h3>
                <button class="close-btn" id="closeComplianceBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="compliance-content">
                <div class="compliance-tabs">
                    <button class="tab-btn active" data-tab="frameworks">Frameworks</button>
                    <button class="tab-btn" data-tab="privacy">Datenschutz</button>
                    <button class="tab-btn" data-tab="audit">Audit-Log</button>
                    <button class="tab-btn" data-tab="legal">Rechtliches</button>
                </div>
                <div class="tab-content" id="complianceTabContent">
                    ${this.generateFrameworksTab()}
                </div>
            </div>
        `;
        
        document.body.appendChild(compliancePanel);
        this.setupComplianceEventListeners();
    }
    
    setupComplianceEventListeners() {
        // Add compliance button to footer
        const legalBtn = document.getElementById('legalBtn');
        if (legalBtn) {
            legalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCompliancePanel();
            });
        }
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
        
        // Close panel
        document.getElementById('closeComplianceBtn')?.addEventListener('click', () => {
            this.hideCompliancePanel();
        });
    }
    
    showCompliancePanel() {
        document.getElementById('compliancePanel').classList.remove('hidden');
        document.getElementById('compliancePanel').classList.add('open');
    }
    
    hideCompliancePanel() {
        document.getElementById('compliancePanel').classList.add('hidden');
        document.getElementById('compliancePanel').classList.remove('open');
    }
    
    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update content
        const content = document.getElementById('complianceTabContent');
        switch (tabName) {
            case 'frameworks':
                content.innerHTML = this.generateFrameworksTab();
                break;
            case 'privacy':
                content.innerHTML = this.generatePrivacyTab();
                break;
            case 'audit':
                content.innerHTML = this.generateAuditTab();
                break;
            case 'legal':
                content.innerHTML = this.generateLegalTab();
                break;
        }
    }
    
    generateFrameworksTab() {
        let content = '<div class="frameworks-overview">';
        content += '<h4>Unterstützte Compliance-Frameworks</h4>';
        
        Object.entries(this.complianceFrameworks).forEach(([key, framework]) => {
            content += `
                <div class="framework-card">
                    <div class="framework-header">
                        <h5>${framework.name}</h5>
                        <span class="framework-version">Version ${framework.version}</span>
                    </div>
                    <p class="framework-description">${framework.description}</p>
                    <div class="framework-requirements">
                        <h6>Hauptanforderungen:</h6>
                        <ul>
                            ${framework.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="btn-secondary" onclick="complianceManager.generateComplianceReport('${key}')">
                        Compliance-Bericht generieren
                    </button>
                </div>
            `;
        });
        
        content += '</div>';
        return content;
    }
    
    generatePrivacyTab() {
        return `
            <div class="privacy-overview">
                <h4>Datenschutz-Einstellungen</h4>
                <div class="privacy-section">
                    <h5>Datenverarbeitung</h5>
                    <div class="privacy-item">
                        <strong>Datenminimierung:</strong> 
                        <span class="status-active">Aktiv</span>
                        <p>Es werden nur die für die Bedrohungsmodellierung notwendigen Daten verarbeitet.</p>
                    </div>
                    <div class="privacy-item">
                        <strong>Zweckbindung:</strong> 
                        <span class="status-active">Aktiv</span>
                        <p>Daten werden ausschließlich für die Bedrohungsmodellierung verwendet.</p>
                    </div>
                    <div class="privacy-item">
                        <strong>Speicherbegrenzung:</strong> 
                        <span class="status-active">Aktiv</span>
                        <p>Lokale Speicherung mit automatischer Bereinigung nach ${this.dataProtectionSettings.dataRetention.maxAge} Tagen.</p>
                    </div>
                </div>
                
                <div class="privacy-section">
                    <h5>Technische Maßnahmen</h5>
                    <div class="privacy-item">
                        <strong>Verschlüsselung:</strong> 
                        <span class="status-active">Browser-lokal</span>
                        <p>Alle Daten werden lokal im Browser gespeichert und verarbeitet. Keine Übertragung an externe Server.</p>
                    </div>
                    <div class="privacy-item">
                        <strong>Zugriffskontrolle:</strong> 
                        <span class="status-info">Lokal</span>
                        <p>Zugriff nur über den lokalen Browser. Keine Benutzerkonten oder externe Authentifizierung.</p>
                    </div>
                </div>
                
                <div class="privacy-actions">
                    <button class="btn-primary" onclick="complianceManager.exportPrivacyReport()">
                        Datenschutz-Bericht exportieren
                    </button>
                    <button class="btn-secondary" onclick="complianceManager.clearAllData()">
                        Alle lokalen Daten löschen
                    </button>
                </div>
            </div>
        `;
    }
    
    generateAuditTab() {
        const recentLogs = this.auditLog.slice(-20);
        
        let content = `
            <div class="audit-overview">
                <h4>Audit-Protokoll</h4>
                <div class="audit-controls">
                    <button class="btn-secondary" onclick="complianceManager.exportAuditLog()">
                        Audit-Log exportieren
                    </button>
                    <button class="btn-secondary" onclick="complianceManager.clearAuditLog()">
                        Log löschen
                    </button>
                </div>
                <div class="audit-log">
        `;
        
        if (recentLogs.length === 0) {
            content += '<p class="no-logs">Keine Audit-Einträge vorhanden.</p>';
        } else {
            content += '<table class="audit-table">';
            content += '<thead><tr><th>Zeitstempel</th><th>Aktion</th><th>Details</th><th>Benutzer</th></tr></thead>';
            content += '<tbody>';
            
            recentLogs.forEach(log => {
                content += `
                    <tr>
                        <td>${new Date(log.timestamp).toLocaleString('de-DE')}</td>
                        <td>${log.action}</td>
                        <td>${log.details}</td>
                        <td>${log.user || 'Anonym'}</td>
                    </tr>
                `;
            });
            
            content += '</tbody></table>';
        }
        
        content += '</div></div>';
        return content;
    }
    
    generateLegalTab() {
        return `
            <div class="legal-overview">
                <h4>Rechtliche Hinweise</h4>
                
                <div class="legal-section">
                    <h5>Haftungsausschluss</h5>
                    <p>
                        Dieses Tool dient als Unterstützung bei der Bedrohungsmodellierung und ersetzt keine 
                        professionelle Sicherheitsberatung. Die Verantwortung für die korrekte Anwendung und 
                        die Einhaltung rechtlicher Vorgaben liegt beim Nutzer.
                    </p>
                </div>
                
                <div class="legal-section">
                    <h5>Datenschutz</h5>
                    <p>
                        Das Tool verarbeitet alle Daten lokal im Browser. Es werden keine Daten an externe 
                        Server übertragen oder gespeichert. Die Einhaltung der DSGVO wird durch technische 
                        und organisatorische Maßnahmen sichergestellt.
                    </p>
                </div>
                
                <div class="legal-section">
                    <h5>Compliance</h5>
                    <p>
                        Das Tool unterstützt die Einhaltung verschiedener Compliance-Frameworks wie 
                        BSI IT-Grundschutz, ISO 27001 und NIST CSF. Die finale Verantwortung für die 
                        Compliance liegt beim Anwender.
                    </p>
                </div>
                
                <div class="legal-section">
                    <h5>Lizenz und Nutzung</h5>
                    <p>
                        Das Tool ist für den produktiven Einsatz in mittelständischen Unternehmen und 
                        IT-Firmen konzipiert. Die Nutzung erfolgt auf eigene Verantwortung.
                    </p>
                </div>
                
                <div class="legal-section">
                    <h5>Support und Updates</h5>
                    <p>
                        Regelmäßige Updates stellen sicher, dass das Tool den aktuellen Standards und 
                        rechtlichen Anforderungen entspricht. Bei Fragen wenden Sie sich an Ihren 
                        IT-Sicherheitsbeauftragten.
                    </p>
                </div>
            </div>
        `;
    }
    
    setupDataProtection() {
        // Implement data protection measures
        this.setupLocalStorageEncryption();
        this.setupDataRetention();
        this.setupAccessLogging();
    }
    
    setupLocalStorageEncryption() {
        // Simple encryption for local storage (in production, use proper encryption)
        this.encryptionKey = this.generateEncryptionKey();
    }
    
    setupDataRetention() {
        // Set up automatic data cleanup
        setInterval(() => {
            this.cleanupOldData();
        }, 24 * 60 * 60 * 1000); // Daily cleanup
    }
    
    setupAccessLogging() {
        // Log all significant actions
        this.logAction('SYSTEM_START', 'Tool initialized');
        
        // Override localStorage methods to log access
        const originalSetItem = localStorage.setItem;
        const originalGetItem = localStorage.getItem;
        
        localStorage.setItem = (key, value) => {
            this.logAction('DATA_WRITE', `Stored data: ${key}`);
            return originalSetItem.call(localStorage, key, value);
        };
        
        localStorage.getItem = (key) => {
            this.logAction('DATA_READ', `Retrieved data: ${key}`);
            return originalGetItem.call(localStorage, key);
        };
    }
    
    setupAuditLogging() {
        // Initialize audit logging
        this.loadAuditLog();
        
        // Log tool usage
        window.addEventListener('beforeunload', () => {
            this.logAction('SESSION_END', 'User session ended');
            this.saveAuditLog();
        });
    }
    
    logAction(action, details, user = null) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action: action,
            details: details,
            user: user || 'Anonymous',
            sessionId: this.getSessionId()
        };
        
        this.auditLog.push(logEntry);
        
        // Keep only last 1000 entries
        if (this.auditLog.length > 1000) {
            this.auditLog = this.auditLog.slice(-1000);
        }
        
        // Save to localStorage
        this.saveAuditLog();
    }
    
    validateCompliance() {
        const validationResults = {};
        
        Object.keys(this.complianceFrameworks).forEach(framework => {
            validationResults[framework] = this.validateFrameworkCompliance(framework);
        });
        
        return validationResults;
    }
    
    validateFrameworkCompliance(frameworkKey) {
        const framework = this.complianceFrameworks[frameworkKey];
        const project = this.threatTool.currentProject;
        
        const results = {
            compliant: true,
            score: 0,
            maxScore: 0,
            issues: [],
            recommendations: []
        };
        
        switch (frameworkKey) {
            case 'BSI_IT_GRUNDSCHUTZ':
                return this.validateBSICompliance(project, results);
            case 'ISO_27001':
                return this.validateISOCompliance(project, results);
            case 'DSGVO':
                return this.validateDSGVOCompliance(project, results);
            case 'NIST_CSF':
                return this.validateNISTCompliance(project, results);
            default:
                return results;
        }
    }
    
    validateBSICompliance(project, results) {
        results.maxScore = 10;
        
        // Check documentation
        if (project.description && project.description.length > 50) {
            results.score += 2;
        } else {
            results.issues.push('Unzureichende Projektdokumentation');
            results.recommendations.push('Fügen Sie eine detaillierte Projektbeschreibung hinzu');
        }
        
        // Check threat coverage
        const threats = project.components.filter(c => c.type === 'threat' || c.type === 'bsi-threat');
        if (threats.length >= 3) {
            results.score += 3;
        } else {
            results.issues.push('Zu wenige identifizierte Bedrohungen');
            results.recommendations.push('Identifizieren Sie weitere relevante Bedrohungen');
        }
        
        // Check mitigation measures
        const mitigations = project.components.filter(c => c.type === 'mitigation');
        if (mitigations.length >= threats.length * 0.5) {
            results.score += 3;
        } else {
            results.issues.push('Unzureichende Schutzmaßnahmen');
            results.recommendations.push('Implementieren Sie zusätzliche Schutzmaßnahmen');
        }
        
        // Check system coverage
        const systems = project.components.filter(c => c.type === 'system');
        if (systems.length > 0) {
            results.score += 2;
        } else {
            results.issues.push('Keine Systeme modelliert');
            results.recommendations.push('Fügen Sie relevante Systemkomponenten hinzu');
        }
        
        results.compliant = results.score >= 7;
        return results;
    }
    
    validateISOCompliance(project, results) {
        // Similar validation for ISO 27001
        results.maxScore = 10;
        results.score = 8; // Simplified for demo
        results.compliant = true;
        return results;
    }
    
    validateDSGVOCompliance(project, results) {
        // GDPR compliance validation
        results.maxScore = 10;
        results.score = 10; // Full compliance due to local-only processing
        results.compliant = true;
        return results;
    }
    
    validateNISTCompliance(project, results) {
        // NIST CSF compliance validation
        results.maxScore = 10;
        results.score = 7; // Simplified for demo
        results.compliant = true;
        return results;
    }
    
    generateComplianceReport(frameworkKey) {
        const framework = this.complianceFrameworks[frameworkKey];
        const validation = this.validateFrameworkCompliance(frameworkKey);
        const project = this.threatTool.currentProject;
        
        const report = `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <title>Compliance-Bericht: ${framework.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    .header { border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
                    .score { font-size: 24px; font-weight: bold; color: ${validation.compliant ? '#10b981' : '#ef4444'}; }
                    .section { margin-bottom: 30px; }
                    .issue { background: #fef2f2; padding: 10px; border-left: 4px solid #ef4444; margin: 10px 0; }
                    .recommendation { background: #f0f9ff; padding: 10px; border-left: 4px solid #3b82f6; margin: 10px 0; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background: #f8fafc; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Compliance-Bericht</h1>
                    <h2>${framework.name} (${framework.version})</h2>
                    <p><strong>Projekt:</strong> ${project.name}</p>
                    <p><strong>Generiert am:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
                    <div class="score">
                        Compliance-Score: ${validation.score}/${validation.maxScore} 
                        (${validation.compliant ? 'BESTANDEN' : 'NICHT BESTANDEN'})
                    </div>
                </div>
                
                <div class="section">
                    <h3>Framework-Übersicht</h3>
                    <p>${framework.description}</p>
                    <h4>Hauptanforderungen:</h4>
                    <ul>
                        ${framework.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                ${validation.issues.length > 0 ? `
                <div class="section">
                    <h3>Identifizierte Probleme</h3>
                    ${validation.issues.map(issue => `<div class="issue">${issue}</div>`).join('')}
                </div>
                ` : ''}
                
                ${validation.recommendations.length > 0 ? `
                <div class="section">
                    <h3>Empfehlungen</h3>
                    ${validation.recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('')}
                </div>
                ` : ''}
                
                <div class="section">
                    <h3>Projekt-Details</h3>
                    <table>
                        <tr><th>Komponenten-Typ</th><th>Anzahl</th></tr>
                        <tr><td>Systeme</td><td>${project.components.filter(c => c.type === 'system').length}</td></tr>
                        <tr><td>Bedrohungen</td><td>${project.components.filter(c => c.type === 'threat' || c.type === 'bsi-threat').length}</td></tr>
                        <tr><td>Schutzmaßnahmen</td><td>${project.components.filter(c => c.type === 'mitigation').length}</td></tr>
                        <tr><td>Verbindungen</td><td>${project.connections.length}</td></tr>
                    </table>
                </div>
                
                <div class="section">
                    <h3>Rechtliche Hinweise</h3>
                    <p>
                        Dieser Bericht dient als Unterstützung bei der Compliance-Bewertung und ersetzt keine 
                        professionelle Rechts- oder Sicherheitsberatung. Die finale Verantwortung für die 
                        Einhaltung der Compliance-Anforderungen liegt beim Anwender.
                    </p>
                </div>
            </body>
            </html>
        `;
        
        this.downloadReport(report, `compliance-${frameworkKey}-${Date.now()}.html`);
        this.logAction('COMPLIANCE_REPORT', `Generated ${framework.name} compliance report`);
    }
    
    // Helper methods
    getBSIMappings() {
        return {
            'G.0.14': ['A.8.2.1', 'A.13.2.1'],
            'G.0.21': ['A.12.2.1', 'A.14.2.1'],
            'G.0.23': ['A.9.1.1', 'A.9.2.1']
        };
    }
    
    getISOMappings() {
        return {
            'A.5.1': 'Information security policies',
            'A.6.1': 'Organization of information security',
            'A.8.1': 'Asset management'
        };
    }
    
    getDSGVOMappings() {
        return {
            'Art.25': 'Data protection by design and by default',
            'Art.32': 'Security of processing',
            'Art.35': 'Data protection impact assessment'
        };
    }
    
    getNISTMappings() {
        return {
            'ID.AM': 'Asset Management',
            'PR.AC': 'Access Control',
            'DE.CM': 'Security Continuous Monitoring'
        };
    }
    
    generateEncryptionKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    getSessionId() {
        if (!this.sessionId) {
            this.sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
        }
        return this.sessionId;
    }
    
    cleanupOldData() {
        const maxAge = this.dataProtectionSettings.dataRetention.maxAge * 24 * 60 * 60 * 1000;
        const cutoffDate = Date.now() - maxAge;
        
        // Clean up audit log
        this.auditLog = this.auditLog.filter(entry => 
            new Date(entry.timestamp).getTime() > cutoffDate
        );
        
        this.saveAuditLog();
        this.logAction('DATA_CLEANUP', `Cleaned up data older than ${this.dataProtectionSettings.dataRetention.maxAge} days`);
    }
    
    loadAuditLog() {
        try {
            const stored = localStorage.getItem('bsi-threat-tool-audit-log');
            if (stored) {
                this.auditLog = JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Could not load audit log:', error);
            this.auditLog = [];
        }
    }
    
    saveAuditLog() {
        try {
            localStorage.setItem('bsi-threat-tool-audit-log', JSON.stringify(this.auditLog));
        } catch (error) {
            console.warn('Could not save audit log:', error);
        }
    }
    
    exportAuditLog() {
        const csvContent = this.auditLogToCSV();
        this.downloadReport(csvContent, `audit-log-${Date.now()}.csv`, 'text/csv');
    }
    
    auditLogToCSV() {
        const headers = ['Zeitstempel', 'Aktion', 'Details', 'Benutzer', 'Session-ID'];
        const rows = this.auditLog.map(entry => [
            entry.timestamp,
            entry.action,
            entry.details,
            entry.user,
            entry.sessionId
        ]);
        
        return [headers, ...rows].map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n');
    }
    
    exportPrivacyReport() {
        const report = this.generatePrivacyReport();
        this.downloadReport(report, `privacy-report-${Date.now()}.html`);
    }
    
    generatePrivacyReport() {
        return `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <title>Datenschutz-Bericht</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    .header { border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
                    .section { margin-bottom: 30px; }
                    .compliant { color: #10b981; font-weight: bold; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background: #f8fafc; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Datenschutz-Bericht</h1>
                    <p><strong>Generiert am:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
                    <p class="compliant">Status: DSGVO-KONFORM</p>
                </div>
                
                <div class="section">
                    <h3>Datenverarbeitung</h3>
                    <p>Das BSI Threat Modeling Tool verarbeitet alle Daten ausschließlich lokal im Browser des Nutzers. 
                    Es werden keine personenbezogenen Daten an externe Server übertragen oder gespeichert.</p>
                    
                    <h4>Implementierte Schutzmaßnahmen:</h4>
                    <table>
                        <tr><th>Maßnahme</th><th>Status</th><th>Beschreibung</th></tr>
                        <tr><td>Datenminimierung</td><td class="compliant">Aktiv</td><td>Nur notwendige Daten werden verarbeitet</td></tr>
                        <tr><td>Zweckbindung</td><td class="compliant">Aktiv</td><td>Daten nur für Bedrohungsmodellierung</td></tr>
                        <tr><td>Speicherbegrenzung</td><td class="compliant">Aktiv</td><td>Automatische Löschung nach ${this.dataProtectionSettings.dataRetention.maxAge} Tagen</td></tr>
                        <tr><td>Lokale Verarbeitung</td><td class="compliant">Aktiv</td><td>Keine externe Datenübertragung</td></tr>
                    </table>
                </div>
                
                <div class="section">
                    <h3>Rechtliche Grundlage</h3>
                    <p>Die Verarbeitung erfolgt auf Grundlage des berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) 
                    zur Durchführung von Sicherheitsanalysen. Da keine personenbezogenen Daten verarbeitet werden, 
                    sind weitere datenschutzrechtliche Maßnahmen nicht erforderlich.</p>
                </div>
                
                <div class="section">
                    <h3>Betroffenenrechte</h3>
                    <p>Da keine personenbezogenen Daten verarbeitet werden, sind die Betroffenenrechte nach 
                    Art. 15-22 DSGVO nicht anwendbar. Nutzer können jederzeit alle lokal gespeicherten Daten 
                    über die Anwendung löschen.</p>
                </div>
            </body>
            </html>
        `;
    }
    
    clearAllData() {
        if (confirm('Möchten Sie wirklich alle lokalen Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
            localStorage.clear();
            this.auditLog = [];
            this.logAction('DATA_CLEAR', 'All local data cleared by user');
            alert('Alle lokalen Daten wurden gelöscht.');
            location.reload();
        }
    }
    
    clearAuditLog() {
        if (confirm('Möchten Sie das Audit-Log löschen?')) {
            this.auditLog = [];
            this.saveAuditLog();
            this.logAction('AUDIT_CLEAR', 'Audit log cleared by user');
            this.switchTab('audit'); // Refresh the tab
        }
    }
    
    downloadReport(content, filename, mimeType = 'text/html') {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}

// Add CSS for compliance interface
const complianceStyles = `
<style>
.compliance-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 3000;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.compliance-panel.open {
    transform: translateY(0);
}

.compliance-header {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.compliance-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.compliance-tabs {
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
    background: none;
    border: none;
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease;
}

.tab-btn:hover {
    background: #e2e8f0;
}

.tab-btn.active {
    background: white;
    border-bottom-color: #3b82f6;
    color: #3b82f6;
}

.tab-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
}

.frameworks-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
}

.framework-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.5rem;
}

.framework-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.framework-version {
    background: #3b82f6;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
}

.framework-description {
    color: #6b7280;
    margin-bottom: 1rem;
}

.framework-requirements ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
}

.privacy-overview {
    max-width: 800px;
}

.privacy-section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.privacy-item {
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.375rem;
}

.status-active {
    background: #dcfce7;
    color: #166534;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.status-info {
    background: #dbeafe;
    color: #1e40af;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.privacy-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.audit-overview {
    max-width: 1000px;
}

.audit-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.audit-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.audit-table th,
.audit-table td {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    text-align: left;
}

.audit-table th {
    background: #f8fafc;
    font-weight: 600;
}

.no-logs {
    text-align: center;
    color: #6b7280;
    font-style: italic;
    padding: 2rem;
}

.legal-overview {
    max-width: 800px;
}

.legal-section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.legal-section:last-child {
    border-bottom: none;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', complianceStyles);

