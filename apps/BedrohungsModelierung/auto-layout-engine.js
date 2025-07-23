// BSI Threat Modeling Tool - Auto-Layout and Auto-Completion Module
class AutoLayoutEngine {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.layoutAlgorithms = {
            'hierarchical': this.hierarchicalLayout.bind(this),
            'force-directed': this.forceDirectedLayout.bind(this),
            'circular': this.circularLayout.bind(this),
            'grid': this.gridLayout.bind(this)
        };
        this.autoCompletionRules = this.initializeAutoCompletionRules();
        this.layoutHistory = [];
        this.isAutoLayoutEnabled = true;
        this.isAutoCompletionEnabled = true;
        
        this.init();
    }
    
    init() {
        this.setupAutoLayoutInterface();
        this.setupEventListeners();
        this.loadLayoutPreferences();
    }
    
    setupAutoLayoutInterface() {
        // Add auto-layout controls to the toolbar
        const toolbar = document.querySelector('.toolbar');
        if (toolbar) {
            const autoLayoutSection = document.createElement('div');
            autoLayoutSection.className = 'toolbar-section auto-layout-section';
            autoLayoutSection.innerHTML = `
                <h4><i class="fas fa-magic"></i> Automatisches Layout</h4>
                <div class="auto-layout-controls">
                    <div class="control-group">
                        <label class="toggle-label">
                            <input type="checkbox" id="autoLayoutToggle" ${this.isAutoLayoutEnabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            Auto-Anordnung
                        </label>
                    </div>
                    <div class="control-group">
                        <label class="toggle-label">
                            <input type="checkbox" id="autoCompletionToggle" ${this.isAutoCompletionEnabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            Auto-Ergänzung
                        </label>
                    </div>
                    <div class="control-group">
                        <label>Layout-Algorithmus:</label>
                        <select id="layoutAlgorithmSelect">
                            <option value="hierarchical">Hierarchisch</option>
                            <option value="force-directed">Kraftbasiert</option>
                            <option value="circular">Kreisförmig</option>
                            <option value="grid">Raster</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <button class="btn-secondary" id="applyLayoutBtn">
                            <i class="fas fa-sitemap"></i> Layout anwenden
                        </button>
                        <button class="btn-secondary" id="undoLayoutBtn">
                            <i class="fas fa-undo"></i> Rückgängig
                        </button>
                    </div>
                </div>
            `;
            toolbar.appendChild(autoLayoutSection);
        }
    }
    
    setupEventListeners() {
        // Auto-layout toggle
        document.getElementById('autoLayoutToggle')?.addEventListener('change', (e) => {
            this.isAutoLayoutEnabled = e.target.checked;
            this.saveLayoutPreferences();
        });
        
        // Auto-completion toggle
        document.getElementById('autoCompletionToggle')?.addEventListener('change', (e) => {
            this.isAutoCompletionEnabled = e.target.checked;
            this.saveLayoutPreferences();
        });
        
        // Apply layout button
        document.getElementById('applyLayoutBtn')?.addEventListener('click', () => {
            const algorithm = document.getElementById('layoutAlgorithmSelect')?.value || 'hierarchical';
            this.applyLayout(algorithm);
        });
        
        // Undo layout button
        document.getElementById('undoLayoutBtn')?.addEventListener('click', () => {
            this.undoLastLayout();
        });
        
        // Listen for component additions
        document.addEventListener('componentAdded', (e) => {
            if (this.isAutoCompletionEnabled) {
                this.handleAutoCompletion(e.detail.component);
            }
            if (this.isAutoLayoutEnabled) {
                this.handleAutoLayout();
            }
        });
    }
    
    initializeAutoCompletionRules() {
        return {
            'webserver': {
                requiredComponents: [
                    { type: 'firewall', position: 'before', reason: 'Schutz vor externen Angriffen' },
                    { type: 'database', position: 'after', reason: 'Datenspeicherung für Webanwendung' },
                    { type: 'loadbalancer', position: 'before', reason: 'Lastverteilung und Hochverfügbarkeit' }
                ],
                suggestedThreats: [
                    'G.0.23 - Unbefugtes Eindringen in IT-Systeme',
                    'G.0.40 - Verhinderung von Diensten (Denial of Service)',
                    'G.0.43 - Einspielen von Nachrichten'
                ],
                suggestedMitigations: [
                    'M.2.1 - Festlegung von Verantwortlichkeiten',
                    'M.4.3 - Einsatz von Verschlüsselungsverfahren',
                    'M.5.8 - Regelmäßige Sicherheitsupdates'
                ]
            },
            'database': {
                requiredComponents: [
                    { type: 'backup-system', position: 'connected', reason: 'Datensicherung und Recovery' },
                    { type: 'monitoring', position: 'connected', reason: 'Überwachung der Datenbankperformance' }
                ],
                suggestedThreats: [
                    'G.0.14 - Ausspähen von Informationen',
                    'G.0.21 - Manipulation von Hard- oder Software',
                    'G.0.45 - Datenverlust'
                ],
                suggestedMitigations: [
                    'M.2.11 - Regelungen für den Einsatz von Fremdpersonal',
                    'M.4.1 - Passwort-Management',
                    'M.6.2 - Datensicherungskonzept'
                ]
            },
            'firewall': {
                requiredComponents: [
                    { type: 'ids-ips', position: 'after', reason: 'Intrusion Detection und Prevention' },
                    { type: 'log-server', position: 'connected', reason: 'Zentrale Protokollierung' }
                ],
                suggestedThreats: [
                    'G.0.23 - Unbefugtes Eindringen in IT-Systeme',
                    'G.0.9 - Ausfall oder Störung von Kommunikationsverbindungen'
                ],
                suggestedMitigations: [
                    'M.5.7 - Protokollierung',
                    'M.5.13 - Restriktive Attributvergabe bei Dateizugriffen'
                ]
            },
            'client-workstation': {
                requiredComponents: [
                    { type: 'antivirus', position: 'integrated', reason: 'Malware-Schutz' },
                    { type: 'patch-management', position: 'connected', reason: 'Automatische Updates' }
                ],
                suggestedThreats: [
                    'G.0.39 - Schadprogramme',
                    'G.0.28 - Software-Schwachstellen oder -Fehler',
                    'G.0.30 - Unberechtigte Nutzung oder Administration von Geräten und Systemen'
                ],
                suggestedMitigations: [
                    'M.3.1 - Sensibilisierung und Schulung zur Informationssicherheit',
                    'M.4.1 - Passwort-Management',
                    'M.5.8 - Regelmäßige Sicherheitsupdates'
                ]
            },
            'mobile-device': {
                requiredComponents: [
                    { type: 'mdm-system', position: 'connected', reason: 'Mobile Device Management' },
                    { type: 'vpn-gateway', position: 'before', reason: 'Sichere Verbindung zum Unternehmensnetz' }
                ],
                suggestedThreats: [
                    'G.0.16 - Diebstahl von Geräten, Datenträgern oder Dokumenten',
                    'G.0.19 - Offenlegung schützenswerter Informationen',
                    'G.0.39 - Schadprogramme'
                ],
                suggestedMitigations: [
                    'M.2.9 - Nutzungsverbot nicht freigegebener Hard- und Software',
                    'M.4.3 - Einsatz von Verschlüsselungsverfahren',
                    'M.5.6 - Entwicklung eines Datensicherungskonzepts'
                ]
            }
        };
    }
    
    handleAutoCompletion(newComponent) {
        const rules = this.autoCompletionRules[newComponent.type];
        if (!rules) return;
        
        // Store current state for undo
        this.saveLayoutState();
        
        const addedComponents = [];
        const addedConnections = [];
        
        // Add required components
        rules.requiredComponents.forEach(requirement => {
            // Check if component type already exists
            const existingComponent = this.threatTool.currentProject.components.find(c => 
                c.type === requirement.type
            );
            
            if (!existingComponent) {
                const newRequiredComponent = this.createRequiredComponent(
                    requirement, 
                    newComponent
                );
                
                if (newRequiredComponent) {
                    addedComponents.push(newRequiredComponent);
                    
                    // Create connection between components
                    const connection = this.createConnection(
                        newComponent, 
                        newRequiredComponent, 
                        requirement
                    );
                    
                    if (connection) {
                        addedConnections.push(connection);
                    }
                }
            }
        });
        
        // Add suggested threats
        rules.suggestedThreats.forEach(threatId => {
            this.addSuggestedThreat(newComponent, threatId);
        });
        
        // Add suggested mitigations
        rules.suggestedMitigations.forEach(mitigationId => {
            this.addSuggestedMitigation(newComponent, mitigationId);
        });
        
        // Show completion summary
        this.showCompletionSummary(newComponent, addedComponents, rules);
        
        // Trigger re-render
        this.threatTool.renderCanvas();
        
        // Update analysis
        if (this.threatTool.advancedAnalysis) {
            this.threatTool.advancedAnalysis.performFullAnalysis();
        }
    }
    
    createRequiredComponent(requirement, sourceComponent) {
        const componentConfig = this.getComponentConfig(requirement.type);
        if (!componentConfig) return null;
        
        const position = this.calculateRequiredComponentPosition(
            sourceComponent, 
            requirement.position
        );
        
        const newComponent = {
            id: this.threatTool.generateId(),
            type: requirement.type,
            name: componentConfig.name,
            x: position.x,
            y: position.y,
            properties: {
                description: componentConfig.description,
                autoAdded: true,
                autoAddedReason: requirement.reason,
                sourceComponent: sourceComponent.id
            }
        };
        
        // Add to project
        this.threatTool.currentProject.components.push(newComponent);
        
        return newComponent;
    }
    
    getComponentConfig(type) {
        const configs = {
            'firewall': {
                name: 'Firewall',
                description: 'Netzwerk-Firewall zum Schutz vor unbefugten Zugriffen',
                icon: 'fas fa-shield-alt',
                color: '#ef4444'
            },
            'database': {
                name: 'Datenbank',
                description: 'Datenbanksystem zur persistenten Datenspeicherung',
                icon: 'fas fa-database',
                color: '#3b82f6'
            },
            'loadbalancer': {
                name: 'Load Balancer',
                description: 'Lastverteilungssystem für Hochverfügbarkeit',
                icon: 'fas fa-balance-scale',
                color: '#10b981'
            },
            'backup-system': {
                name: 'Backup-System',
                description: 'System zur automatischen Datensicherung',
                icon: 'fas fa-hdd',
                color: '#f59e0b'
            },
            'monitoring': {
                name: 'Monitoring-System',
                description: 'Überwachungssystem für Performance und Sicherheit',
                icon: 'fas fa-chart-line',
                color: '#8b5cf6'
            },
            'ids-ips': {
                name: 'IDS/IPS',
                description: 'Intrusion Detection und Prevention System',
                icon: 'fas fa-search',
                color: '#ef4444'
            },
            'log-server': {
                name: 'Log-Server',
                description: 'Zentraler Server für Protokollierung und Audit',
                icon: 'fas fa-file-alt',
                color: '#6b7280'
            },
            'antivirus': {
                name: 'Antivirus-System',
                description: 'Malware-Schutz und Virenabwehr',
                icon: 'fas fa-bug',
                color: '#ef4444'
            },
            'patch-management': {
                name: 'Patch-Management',
                description: 'System für automatische Updates und Patches',
                icon: 'fas fa-download',
                color: '#10b981'
            },
            'mdm-system': {
                name: 'MDM-System',
                description: 'Mobile Device Management System',
                icon: 'fas fa-mobile-alt',
                color: '#3b82f6'
            },
            'vpn-gateway': {
                name: 'VPN-Gateway',
                description: 'Virtual Private Network Gateway',
                icon: 'fas fa-lock',
                color: '#8b5cf6'
            }
        };
        
        return configs[type];
    }
    
    calculateRequiredComponentPosition(sourceComponent, positionType) {
        const canvas = document.getElementById('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        const spacing = 150;
        
        switch (positionType) {
            case 'before':
                return {
                    x: Math.max(50, sourceComponent.x - spacing),
                    y: sourceComponent.y
                };
            case 'after':
                return {
                    x: Math.min(canvasRect.width - 100, sourceComponent.x + spacing),
                    y: sourceComponent.y
                };
            case 'above':
                return {
                    x: sourceComponent.x,
                    y: Math.max(50, sourceComponent.y - spacing)
                };
            case 'below':
                return {
                    x: sourceComponent.x,
                    y: Math.min(canvasRect.height - 100, sourceComponent.y + spacing)
                };
            case 'connected':
            default:
                // Find optimal position around the source component
                return this.findOptimalPosition(sourceComponent, spacing);
        }
    }
    
    findOptimalPosition(sourceComponent, spacing) {
        const canvas = document.getElementById('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        const existingComponents = this.threatTool.currentProject.components;
        
        // Try positions in order of preference
        const candidatePositions = [
            { x: sourceComponent.x + spacing, y: sourceComponent.y }, // Right
            { x: sourceComponent.x - spacing, y: sourceComponent.y }, // Left
            { x: sourceComponent.x, y: sourceComponent.y + spacing }, // Below
            { x: sourceComponent.x, y: sourceComponent.y - spacing }, // Above
            { x: sourceComponent.x + spacing * 0.7, y: sourceComponent.y + spacing * 0.7 }, // Bottom-right
            { x: sourceComponent.x - spacing * 0.7, y: sourceComponent.y + spacing * 0.7 }, // Bottom-left
            { x: sourceComponent.x + spacing * 0.7, y: sourceComponent.y - spacing * 0.7 }, // Top-right
            { x: sourceComponent.x - spacing * 0.7, y: sourceComponent.y - spacing * 0.7 }  // Top-left
        ];
        
        for (const position of candidatePositions) {
            // Check if position is within canvas bounds
            if (position.x < 50 || position.x > canvasRect.width - 100 ||
                position.y < 50 || position.y > canvasRect.height - 100) {
                continue;
            }
            
            // Check if position conflicts with existing components
            const hasConflict = existingComponents.some(component => {
                const distance = Math.sqrt(
                    Math.pow(component.x - position.x, 2) + 
                    Math.pow(component.y - position.y, 2)
                );
                return distance < 100; // Minimum distance between components
            });
            
            if (!hasConflict) {
                return position;
            }
        }
        
        // If no optimal position found, use default offset
        return {
            x: sourceComponent.x + spacing,
            y: sourceComponent.y + spacing
        };
    }
    
    createConnection(sourceComponent, targetComponent, requirement) {
        const connection = {
            id: this.threatTool.generateId(),
            sourceId: sourceComponent.id,
            targetId: targetComponent.id,
            type: 'data-flow',
            properties: {
                name: `${sourceComponent.name} → ${targetComponent.name}`,
                description: requirement.reason,
                autoAdded: true,
                dataTypes: ['Konfigurationsdaten', 'Statusdaten'],
                encryption: requirement.type === 'vpn-gateway' || requirement.type === 'firewall'
            }
        };
        
        this.threatTool.currentProject.connections.push(connection);
        return connection;
    }
    
    addSuggestedThreat(component, threatId) {
        if (!component.threats) {
            component.threats = [];
        }
        
        // Check if threat already exists
        const existingThreat = component.threats.find(t => t.id === threatId);
        if (existingThreat) return;
        
        const threat = this.createThreatFromId(threatId);
        if (threat) {
            component.threats.push(threat);
        }
    }
    
    addSuggestedMitigation(component, mitigationId) {
        if (!component.mitigations) {
            component.mitigations = [];
        }
        
        // Check if mitigation already exists
        const existingMitigation = component.mitigations.find(m => m.id === mitigationId);
        if (existingMitigation) return;
        
        const mitigation = this.createMitigationFromId(mitigationId);
        if (mitigation) {
            component.mitigations.push(mitigation);
        }
    }
    
    createThreatFromId(threatId) {
        const threatDatabase = {
            'G.0.23 - Unbefugtes Eindringen in IT-Systeme': {
                name: 'Unbefugtes Eindringen in IT-Systeme',
                description: 'Angreifer können sich unbefugt Zugang zu IT-Systemen verschaffen',
                severity: 'Hoch',
                likelihood: 'Mittel',
                impact: 'Hoch',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.40 - Verhinderung von Diensten (Denial of Service)': {
                name: 'Verhinderung von Diensten (Denial of Service)',
                description: 'Dienste können durch Überlastung oder gezielte Angriffe ausfallen',
                severity: 'Mittel',
                likelihood: 'Mittel',
                impact: 'Hoch',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.43 - Einspielen von Nachrichten': {
                name: 'Einspielen von Nachrichten',
                description: 'Manipulation von Datenübertragungen durch eingeschleuste Nachrichten',
                severity: 'Mittel',
                likelihood: 'Niedrig',
                impact: 'Mittel',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.14 - Ausspähen von Informationen': {
                name: 'Ausspähen von Informationen',
                description: 'Unbefugter Zugriff auf vertrauliche Informationen',
                severity: 'Hoch',
                likelihood: 'Mittel',
                impact: 'Hoch',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.21 - Manipulation von Hard- oder Software': {
                name: 'Manipulation von Hard- oder Software',
                description: 'Unbefugte Veränderung von System- oder Anwendungssoftware',
                severity: 'Hoch',
                likelihood: 'Niedrig',
                impact: 'Hoch',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.45 - Datenverlust': {
                name: 'Datenverlust',
                description: 'Verlust von wichtigen Daten durch technische Defekte oder menschliche Fehler',
                severity: 'Hoch',
                likelihood: 'Mittel',
                impact: 'Hoch',
                category: 'Technisches Versagen'
            },
            'G.0.9 - Ausfall oder Störung von Kommunikationsverbindungen': {
                name: 'Ausfall oder Störung von Kommunikationsverbindungen',
                description: 'Unterbrechung der Netzwerkverbindungen',
                severity: 'Mittel',
                likelihood: 'Mittel',
                impact: 'Mittel',
                category: 'Technisches Versagen'
            },
            'G.0.39 - Schadprogramme': {
                name: 'Schadprogramme',
                description: 'Infektion mit Viren, Würmern oder anderer Malware',
                severity: 'Hoch',
                likelihood: 'Hoch',
                impact: 'Hoch',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.28 - Software-Schwachstellen oder -Fehler': {
                name: 'Software-Schwachstellen oder -Fehler',
                description: 'Ausnutzung von Schwachstellen in der Software',
                severity: 'Hoch',
                likelihood: 'Hoch',
                impact: 'Mittel',
                category: 'Technisches Versagen'
            },
            'G.0.30 - Unberechtigte Nutzung oder Administration von Geräten und Systemen': {
                name: 'Unberechtigte Nutzung oder Administration',
                description: 'Missbrauch von Administratorrechten oder unbefugte Systemnutzung',
                severity: 'Hoch',
                likelihood: 'Mittel',
                impact: 'Hoch',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.16 - Diebstahl von Geräten, Datenträgern oder Dokumenten': {
                name: 'Diebstahl von Geräten, Datenträgern oder Dokumenten',
                description: 'Physischer Diebstahl von IT-Geräten oder Datenträgern',
                severity: 'Mittel',
                likelihood: 'Mittel',
                impact: 'Mittel',
                category: 'Vorsätzliche Handlungen'
            },
            'G.0.19 - Offenlegung schützenswerter Informationen': {
                name: 'Offenlegung schützenswerter Informationen',
                description: 'Unbeabsichtigte oder vorsätzliche Preisgabe vertraulicher Daten',
                severity: 'Hoch',
                likelihood: 'Mittel',
                impact: 'Hoch',
                category: 'Menschliche Fehlhandlungen'
            }
        };
        
        const threatData = threatDatabase[threatId];
        if (!threatData) return null;
        
        return {
            id: this.threatTool.generateId(),
            bsiId: threatId,
            name: threatData.name,
            description: threatData.description,
            severity: threatData.severity,
            likelihood: threatData.likelihood,
            impact: threatData.impact,
            category: threatData.category,
            autoAdded: true
        };
    }
    
    createMitigationFromId(mitigationId) {
        const mitigationDatabase = {
            'M.2.1 - Festlegung von Verantwortlichkeiten': {
                name: 'Festlegung von Verantwortlichkeiten',
                description: 'Klare Definition und Dokumentation von Verantwortlichkeiten',
                effectiveness: 'Mittel',
                implementationEffort: 'Niedrig',
                category: 'Organisation und Personal'
            },
            'M.4.3 - Einsatz von Verschlüsselungsverfahren': {
                name: 'Einsatz von Verschlüsselungsverfahren',
                description: 'Verwendung kryptographischer Verfahren zum Schutz von Daten',
                effectiveness: 'Hoch',
                implementationEffort: 'Mittel',
                category: 'Kryptographie'
            },
            'M.5.8 - Regelmäßige Sicherheitsupdates': {
                name: 'Regelmäßige Sicherheitsupdates',
                description: 'Zeitnahe Installation von Sicherheitspatches',
                effectiveness: 'Hoch',
                implementationEffort: 'Niedrig',
                category: 'IT-Systeme'
            },
            'M.2.11 - Regelungen für den Einsatz von Fremdpersonal': {
                name: 'Regelungen für den Einsatz von Fremdpersonal',
                description: 'Sicherheitsrichtlinien für externe Mitarbeiter',
                effectiveness: 'Mittel',
                implementationEffort: 'Niedrig',
                category: 'Organisation und Personal'
            },
            'M.4.1 - Passwort-Management': {
                name: 'Passwort-Management',
                description: 'Richtlinien und Systeme für sichere Passwörter',
                effectiveness: 'Hoch',
                implementationEffort: 'Niedrig',
                category: 'Identitäts- und Berechtigungsmanagement'
            },
            'M.6.2 - Datensicherungskonzept': {
                name: 'Datensicherungskonzept',
                description: 'Systematische Sicherung und Wiederherstellung von Daten',
                effectiveness: 'Hoch',
                implementationEffort: 'Mittel',
                category: 'Notfallvorsorge'
            },
            'M.5.7 - Protokollierung': {
                name: 'Protokollierung',
                description: 'Umfassende Aufzeichnung sicherheitsrelevanter Ereignisse',
                effectiveness: 'Mittel',
                implementationEffort: 'Niedrig',
                category: 'IT-Systeme'
            },
            'M.5.13 - Restriktive Attributvergabe bei Dateizugriffen': {
                name: 'Restriktive Attributvergabe bei Dateizugriffen',
                description: 'Minimale Berechtigungen nach dem Need-to-know-Prinzip',
                effectiveness: 'Hoch',
                implementationEffort: 'Niedrig',
                category: 'IT-Systeme'
            },
            'M.3.1 - Sensibilisierung und Schulung zur Informationssicherheit': {
                name: 'Sensibilisierung und Schulung zur Informationssicherheit',
                description: 'Regelmäßige Schulungen für alle Mitarbeiter',
                effectiveness: 'Mittel',
                implementationEffort: 'Mittel',
                category: 'Organisation und Personal'
            },
            'M.2.9 - Nutzungsverbot nicht freigegebener Hard- und Software': {
                name: 'Nutzungsverbot nicht freigegebener Hard- und Software',
                description: 'Kontrolle und Beschränkung der verwendeten IT-Systeme',
                effectiveness: 'Mittel',
                implementationEffort: 'Niedrig',
                category: 'Organisation und Personal'
            },
            'M.5.6 - Entwicklung eines Datensicherungskonzepts': {
                name: 'Entwicklung eines Datensicherungskonzepts',
                description: 'Planung und Umsetzung von Backup-Strategien',
                effectiveness: 'Hoch',
                implementationEffort: 'Mittel',
                category: 'IT-Systeme'
            }
        };
        
        const mitigationData = mitigationDatabase[mitigationId];
        if (!mitigationData) return null;
        
        return {
            id: this.threatTool.generateId(),
            bsiId: mitigationId,
            name: mitigationData.name,
            description: mitigationData.description,
            effectiveness: mitigationData.effectiveness,
            implementationEffort: mitigationData.implementationEffort,
            category: mitigationData.category,
            autoAdded: true
        };
    }
    
    showCompletionSummary(sourceComponent, addedComponents, rules) {
        // Create completion summary modal
        const modal = document.createElement('div');
        modal.className = 'completion-summary-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-magic"></i> Auto-Ergänzung abgeschlossen</h3>
                    <button class="close-btn" onclick="this.closest('.completion-summary-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Für <strong>${sourceComponent.name}</strong> wurden automatisch folgende Komponenten hinzugefügt:</p>
                    <div class="added-components">
                        ${addedComponents.map(comp => `
                            <div class="added-component">
                                <i class="${this.getComponentConfig(comp.type)?.icon || 'fas fa-cube'}"></i>
                                <div class="component-info">
                                    <strong>${comp.name}</strong>
                                    <p>${comp.properties.autoAddedReason}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="threat-mitigation-summary">
                        <div class="summary-section">
                            <h4><i class="fas fa-exclamation-triangle"></i> Hinzugefügte Bedrohungen</h4>
                            <p>${rules.suggestedThreats.length} BSI-Gefährdungen wurden identifiziert</p>
                        </div>
                        <div class="summary-section">
                            <h4><i class="fas fa-shield-alt"></i> Empfohlene Maßnahmen</h4>
                            <p>${rules.suggestedMitigations.length} Schutzmaßnahmen wurden vorgeschlagen</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="this.closest('.completion-summary-modal').remove()">
                        Verstanden
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 10000);
    }
    
    handleAutoLayout() {
        // Apply intelligent layout after component addition
        setTimeout(() => {
            const algorithm = document.getElementById('layoutAlgorithmSelect')?.value || 'hierarchical';
            this.applyLayout(algorithm, true); // Silent application
        }, 500);
    }
    
    applyLayout(algorithm, silent = false) {
        if (!this.layoutAlgorithms[algorithm]) {
            console.warn(`Unknown layout algorithm: ${algorithm}`);
            return;
        }
        
        // Save current state for undo
        if (!silent) {
            this.saveLayoutState();
        }
        
        // Apply the selected layout algorithm
        this.layoutAlgorithms[algorithm]();
        
        // Re-render canvas
        this.threatTool.renderCanvas();
        
        if (!silent) {
            // Show success message
            this.showLayoutAppliedMessage(algorithm);
        }
    }
    
    hierarchicalLayout() {
        const components = this.threatTool.currentProject.components;
        if (components.length === 0) return;
        
        // Group components by type
        const groups = {
            'external': components.filter(c => c.type.includes('external') || c.type.includes('user')),
            'security': components.filter(c => c.type.includes('firewall') || c.type.includes('ids') || c.type.includes('antivirus')),
            'application': components.filter(c => c.type.includes('webserver') || c.type.includes('application')),
            'data': components.filter(c => c.type.includes('database') || c.type.includes('storage')),
            'infrastructure': components.filter(c => c.type.includes('server') || c.type.includes('network')),
            'other': []
        };
        
        // Assign ungrouped components to 'other'
        components.forEach(comp => {
            const isGrouped = Object.values(groups).some(group => 
                group !== groups.other && group.includes(comp)
            );
            if (!isGrouped) {
                groups.other.push(comp);
            }
        });
        
        // Layout groups in layers
        const canvas = document.getElementById('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        const layerHeight = canvasRect.height / Object.keys(groups).length;
        const margin = 100;
        
        let layerIndex = 0;
        Object.entries(groups).forEach(([groupName, groupComponents]) => {
            if (groupComponents.length === 0) return;
            
            const y = margin + layerIndex * layerHeight;
            const spacing = Math.max(150, (canvasRect.width - 2 * margin) / groupComponents.length);
            
            groupComponents.forEach((component, index) => {
                component.x = margin + index * spacing;
                component.y = y;
            });
            
            layerIndex++;
        });
    }
    
    forceDirectedLayout() {
        const components = this.threatTool.currentProject.components;
        const connections = this.threatTool.currentProject.connections;
        
        if (components.length === 0) return;
        
        // Initialize positions if not set
        const canvas = document.getElementById('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        
        components.forEach(comp => {
            if (!comp.x || !comp.y) {
                comp.x = Math.random() * (canvasRect.width - 200) + 100;
                comp.y = Math.random() * (canvasRect.height - 200) + 100;
            }
        });
        
        // Force-directed algorithm parameters
        const iterations = 100;
        const repulsionStrength = 5000;
        const attractionStrength = 0.1;
        const damping = 0.9;
        
        for (let iter = 0; iter < iterations; iter++) {
            const forces = new Map();
            
            // Initialize forces
            components.forEach(comp => {
                forces.set(comp.id, { x: 0, y: 0 });
            });
            
            // Repulsion forces (all components repel each other)
            for (let i = 0; i < components.length; i++) {
                for (let j = i + 1; j < components.length; j++) {
                    const comp1 = components[i];
                    const comp2 = components[j];
                    
                    const dx = comp1.x - comp2.x;
                    const dy = comp1.y - comp2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    
                    const force = repulsionStrength / (distance * distance);
                    const fx = (dx / distance) * force;
                    const fy = (dy / distance) * force;
                    
                    const force1 = forces.get(comp1.id);
                    const force2 = forces.get(comp2.id);
                    
                    force1.x += fx;
                    force1.y += fy;
                    force2.x -= fx;
                    force2.y -= fy;
                }
            }
            
            // Attraction forces (connected components attract each other)
            connections.forEach(conn => {
                const source = components.find(c => c.id === conn.sourceId);
                const target = components.find(c => c.id === conn.targetId);
                
                if (!source || !target) return;
                
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                
                const force = attractionStrength * distance;
                const fx = (dx / distance) * force;
                const fy = (dy / distance) * force;
                
                const sourceForce = forces.get(source.id);
                const targetForce = forces.get(target.id);
                
                sourceForce.x += fx;
                sourceForce.y += fy;
                targetForce.x -= fx;
                targetForce.y -= fy;
            });
            
            // Apply forces
            components.forEach(comp => {
                const force = forces.get(comp.id);
                comp.x += force.x * damping;
                comp.y += force.y * damping;
                
                // Keep within canvas bounds
                comp.x = Math.max(50, Math.min(canvasRect.width - 50, comp.x));
                comp.y = Math.max(50, Math.min(canvasRect.height - 50, comp.y));
            });
        }
    }
    
    circularLayout() {
        const components = this.threatTool.currentProject.components;
        if (components.length === 0) return;
        
        const canvas = document.getElementById('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        
        const centerX = canvasRect.width / 2;
        const centerY = canvasRect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        
        components.forEach((component, index) => {
            const angle = (2 * Math.PI * index) / components.length;
            component.x = centerX + radius * Math.cos(angle);
            component.y = centerY + radius * Math.sin(angle);
        });
    }
    
    gridLayout() {
        const components = this.threatTool.currentProject.components;
        if (components.length === 0) return;
        
        const canvas = document.getElementById('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        
        const cols = Math.ceil(Math.sqrt(components.length));
        const rows = Math.ceil(components.length / cols);
        
        const cellWidth = (canvasRect.width - 200) / cols;
        const cellHeight = (canvasRect.height - 200) / rows;
        
        components.forEach((component, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            component.x = 100 + col * cellWidth + cellWidth / 2;
            component.y = 100 + row * cellHeight + cellHeight / 2;
        });
    }
    
    saveLayoutState() {
        const state = {
            timestamp: Date.now(),
            components: this.threatTool.currentProject.components.map(comp => ({
                id: comp.id,
                x: comp.x,
                y: comp.y
            }))
        };
        
        this.layoutHistory.push(state);
        
        // Keep only last 10 states
        if (this.layoutHistory.length > 10) {
            this.layoutHistory.shift();
        }
    }
    
    undoLastLayout() {
        if (this.layoutHistory.length === 0) {
            alert('Keine Layout-Änderungen zum Rückgängigmachen verfügbar.');
            return;
        }
        
        const lastState = this.layoutHistory.pop();
        
        // Restore positions
        lastState.components.forEach(savedComp => {
            const component = this.threatTool.currentProject.components.find(c => c.id === savedComp.id);
            if (component) {
                component.x = savedComp.x;
                component.y = savedComp.y;
            }
        });
        
        // Re-render canvas
        this.threatTool.renderCanvas();
        
        this.showMessage('Layout wurde rückgängig gemacht.', 'success');
    }
    
    showLayoutAppliedMessage(algorithm) {
        const algorithmNames = {
            'hierarchical': 'Hierarchisches Layout',
            'force-directed': 'Kraftbasiertes Layout',
            'circular': 'Kreisförmiges Layout',
            'grid': 'Raster-Layout'
        };
        
        this.showMessage(`${algorithmNames[algorithm]} wurde angewendet.`, 'success');
    }
    
    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `auto-layout-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
            <span>${text}</span>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 3000);
    }
    
    saveLayoutPreferences() {
        const preferences = {
            autoLayoutEnabled: this.isAutoLayoutEnabled,
            autoCompletionEnabled: this.isAutoCompletionEnabled,
            defaultAlgorithm: document.getElementById('layoutAlgorithmSelect')?.value || 'hierarchical'
        };
        
        localStorage.setItem('autoLayoutPreferences', JSON.stringify(preferences));
    }
    
    loadLayoutPreferences() {
        try {
            const preferences = JSON.parse(localStorage.getItem('autoLayoutPreferences') || '{}');
            
            this.isAutoLayoutEnabled = preferences.autoLayoutEnabled !== false;
            this.isAutoCompletionEnabled = preferences.autoCompletionEnabled !== false;
            
            // Update UI
            const autoLayoutToggle = document.getElementById('autoLayoutToggle');
            const autoCompletionToggle = document.getElementById('autoCompletionToggle');
            const algorithmSelect = document.getElementById('layoutAlgorithmSelect');
            
            if (autoLayoutToggle) autoLayoutToggle.checked = this.isAutoLayoutEnabled;
            if (autoCompletionToggle) autoCompletionToggle.checked = this.isAutoCompletionEnabled;
            if (algorithmSelect && preferences.defaultAlgorithm) {
                algorithmSelect.value = preferences.defaultAlgorithm;
            }
        } catch (error) {
            console.warn('Failed to load layout preferences:', error);
        }
    }
}

// Add CSS for auto-layout features
const autoLayoutStyles = `
<style>
.auto-layout-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
    margin-top: 1rem;
}

.auto-layout-controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.control-group label {
    font-size: 0.875rem;
    color: #374151;
    font-weight: 500;
}

.control-group select {
    padding: 0.375rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background: white;
}

.toggle-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #374151;
}

.toggle-label input[type="checkbox"] {
    display: none;
}

.toggle-slider {
    width: 40px;
    height: 20px;
    background: #d1d5db;
    border-radius: 10px;
    position: relative;
    transition: background 0.3s ease;
}

.toggle-slider::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
}

.toggle-label input[type="checkbox"]:checked + .toggle-slider {
    background: #3b82f6;
}

.toggle-label input[type="checkbox"]:checked + .toggle-slider::before {
    transform: translateX(20px);
}

.completion-summary-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.completion-summary-modal .modal-content {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.completion-summary-modal .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.completion-summary-modal .modal-header h3 {
    margin: 0;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.completion-summary-modal .close-btn {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
}

.completion-summary-modal .close-btn:hover {
    background: #f3f4f6;
    color: #374151;
}

.completion-summary-modal .modal-body {
    padding: 1.5rem;
}

.added-components {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
}

.added-component {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
}

.added-component i {
    font-size: 1.5rem;
    color: #3b82f6;
    width: 24px;
    text-align: center;
}

.component-info strong {
    display: block;
    color: #374151;
    margin-bottom: 0.25rem;
}

.component-info p {
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
}

.threat-mitigation-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
}

.summary-section {
    padding: 1rem;
    background: #f9fafb;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
}

.summary-section h4 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.summary-section p {
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
}

.completion-summary-modal .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
}

.auto-layout-message {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease;
}

.auto-layout-message.success {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
}

.auto-layout-message.info {
    background: #dbeafe;
    color: #1e40af;
    border: 1px solid #93c5fd;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', autoLayoutStyles);

