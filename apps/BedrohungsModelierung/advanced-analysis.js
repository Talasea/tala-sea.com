// BSI Threat Modeling Tool - Advanced Analysis Module
class AdvancedAnalysisEngine {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.autoMappingEnabled = true;
        this.riskMatrix = null;
        this.analysisResults = {
            threats: [],
            mitigations: [],
            risks: [],
            recommendations: []
        };
        this.init();
    }
    
    init() {
        this.setupAnalysisInterface();
        this.setupEventListeners();
        this.initializeRiskCalculation();
    }
    
    setupAnalysisInterface() {
        // Add analysis panel to the main interface
        const analysisPanel = document.createElement('div');
        analysisPanel.id = 'analysisPanel';
        analysisPanel.className = 'analysis-panel';
        analysisPanel.innerHTML = `
            <div class="analysis-header">
                <h3><i class="fas fa-chart-line"></i> Automatische Analyse</h3>
                <div class="analysis-controls">
                    <label class="toggle-switch">
                        <input type="checkbox" id="autoMappingToggle" checked>
                        <span class="slider"></span>
                        <span class="label">Auto-Zuordnung</span>
                    </label>
                    <button class="btn-primary" id="runFullAnalysisBtn">
                        <i class="fas fa-play"></i> Vollanalyse starten
                    </button>
                </div>
            </div>
            <div class="analysis-content">
                <div class="analysis-section">
                    <h4>Automatische Bedrohungszuordnung</h4>
                    <div id="threatMappingResults" class="mapping-results">
                        <p class="placeholder">Ziehen Sie Bausteine auf die Canvas, um automatische Zuordnungen zu sehen.</p>
                    </div>
                </div>
                <div class="analysis-section">
                    <h4>Risikomatrix</h4>
                    <div id="autoRiskMatrix" class="auto-risk-matrix">
                        <div class="risk-matrix-placeholder">
                            <i class="fas fa-chart-area"></i>
                            <p>Risikomatrix wird automatisch generiert, sobald Bedrohungen identifiziert wurden.</p>
                        </div>
                    </div>
                </div>
                <div class="analysis-section">
                    <h4>Empfohlene Schutzmaßnahmen</h4>
                    <div id="recommendedMitigations" class="recommended-mitigations">
                        <p class="placeholder">Empfehlungen werden basierend auf identifizierten Bedrohungen generiert.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Insert analysis panel into the main layout
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.appendChild(analysisPanel);
        }
    }
    
    setupEventListeners() {
        // Auto-mapping toggle
        document.getElementById('autoMappingToggle')?.addEventListener('change', (e) => {
            this.autoMappingEnabled = e.target.checked;
            if (this.autoMappingEnabled) {
                this.performAutoMapping();
            }
        });
        
        // Full analysis button
        document.getElementById('runFullAnalysisBtn')?.addEventListener('click', () => {
            this.runFullAnalysis();
        });
        
        // Listen for component additions to trigger auto-mapping
        this.threatTool.canvas.addEventListener('componentAdded', (event) => {
            if (this.autoMappingEnabled) {
                this.handleComponentAdded(event.detail.component);
            }
        });
    }
    
    handleComponentAdded(component) {
        console.log('Component added:', component);
        
        // Perform automatic threat mapping
        this.mapThreatsToComponent(component);
        
        // Update risk matrix
        this.updateRiskMatrix();
        
        // Generate mitigation recommendations
        this.generateMitigationRecommendations();
        
        // Update UI
        this.updateAnalysisDisplay();
    }
    
    mapThreatsToComponent(component) {
        const componentType = component.type;
        const componentData = component.properties;
        
        let relevantThreats = [];
        
        // Map based on component type and BSI data
        if (componentType === 'system') {
            relevantThreats = this.getThreatsForSystemComponent(component);
        } else if (componentType === 'application') {
            relevantThreats = this.getThreatsForApplication(component);
        } else if (componentType === 'network') {
            relevantThreats = this.getThreatsForNetworkComponent(component);
        }
        
        // Add threats to the project automatically
        relevantThreats.forEach(threat => {
            this.addThreatToProject(threat, component);
        });
        
        // Create automatic connections
        this.createThreatConnections(component, relevantThreats);
        
        return relevantThreats;
    }
    
    getThreatsForSystemComponent(component) {
        const threats = [];
        const componentName = component.name.toLowerCase();
        
        // Use BSI_COMPONENTS data for mapping
        if (typeof BSI_COMPONENTS !== 'undefined') {
            // Check system components
            Object.values(BSI_COMPONENTS.systems).forEach(bsiComponent => {
                if (componentName.includes(bsiComponent.name.toLowerCase().split(' ')[0])) {
                    bsiComponent.threats.forEach(threatId => {
                        if (BSI_THREATS[threatId]) {
                            threats.push({
                                ...BSI_THREATS[threatId],
                                source: 'BSI_AUTO_MAPPING',
                                confidence: 0.8,
                                applicableComponent: component.id
                            });
                        }
                    });
                }
            });
        }
        
        // Add common system threats
        threats.push(
            {
                id: 'G.0.25',
                name: 'Ausfall von Geräten oder Systemen',
                category: 'Technisches Versagen',
                impact: 'Hoch',
                likelihood: 'Mittel',
                source: 'AUTO_MAPPING',
                confidence: 0.9,
                applicableComponent: component.id
            },
            {
                id: 'G.0.28',
                name: 'Software-Schwachstellen',
                category: 'Technisches Versagen',
                impact: 'Hoch',
                likelihood: 'Hoch',
                source: 'AUTO_MAPPING',
                confidence: 0.85,
                applicableComponent: component.id
            }
        );
        
        return threats;
    }
    
    getThreatsForApplication(component) {
        const threats = [];
        
        // Web application specific threats
        if (component.name.toLowerCase().includes('web')) {
            threats.push(
                {
                    id: 'G.0.23',
                    name: 'Unbefugtes Eindringen in IT-Systeme',
                    category: 'Vorsätzliche Handlungen',
                    impact: 'Hoch',
                    likelihood: 'Hoch',
                    source: 'AUTO_MAPPING',
                    confidence: 0.9,
                    applicableComponent: component.id
                },
                {
                    id: 'G.0.40',
                    name: 'Denial of Service',
                    category: 'Vorsätzliche Handlungen',
                    impact: 'Hoch',
                    likelihood: 'Mittel',
                    source: 'AUTO_MAPPING',
                    confidence: 0.8,
                    applicableComponent: component.id
                }
            );
        }
        
        // Database specific threats
        if (component.name.toLowerCase().includes('datenbank')) {
            threats.push(
                {
                    id: 'G.0.14',
                    name: 'Ausspähen von Informationen',
                    category: 'Vorsätzliche Handlungen',
                    impact: 'Hoch',
                    likelihood: 'Mittel',
                    source: 'AUTO_MAPPING',
                    confidence: 0.85,
                    applicableComponent: component.id
                },
                {
                    id: 'G.0.22',
                    name: 'Manipulation von Informationen',
                    category: 'Vorsätzliche Handlungen',
                    impact: 'Hoch',
                    likelihood: 'Mittel',
                    source: 'AUTO_MAPPING',
                    confidence: 0.8,
                    applicableComponent: component.id
                }
            );
        }
        
        return threats;
    }
    
    getThreatsForNetworkComponent(component) {
        const threats = [];
        
        // Network specific threats
        threats.push(
            {
                id: 'G.0.15',
                name: 'Abhören',
                category: 'Vorsätzliche Handlungen',
                impact: 'Hoch',
                likelihood: 'Mittel',
                source: 'AUTO_MAPPING',
                confidence: 0.8,
                applicableComponent: component.id
            },
            {
                id: 'G.0.21',
                name: 'Manipulation von Hard- oder Software',
                category: 'Vorsätzliche Handlungen',
                impact: 'Hoch',
                likelihood: 'Mittel',
                source: 'AUTO_MAPPING',
                confidence: 0.75,
                applicableComponent: component.id
            }
        );
        
        return threats;
    }
    
    addThreatToProject(threat, sourceComponent) {
        // Create threat component
        const threatComponent = {
            id: this.threatTool.generateId(),
            type: 'bsi-threat',
            name: threat.name,
            x: sourceComponent.x + 150,
            y: sourceComponent.y + Math.random() * 100 - 50,
            properties: {
                bsiThreat: threat.id,
                category: threat.category,
                impact: threat.impact,
                likelihood: threat.likelihood,
                confidence: threat.confidence,
                autoMapped: true,
                sourceComponent: sourceComponent.id
            }
        };
        
        // Add to project
        this.threatTool.currentProject.components.push(threatComponent);
        
        // Render on canvas
        this.threatTool.renderComponent(threatComponent);
        
        return threatComponent;
    }
    
    createThreatConnections(component, threats) {
        threats.forEach(threat => {
            const connection = {
                id: this.threatTool.generateId(),
                type: 'threatAppliesTo',
                sourceComponentId: threat.applicableComponent,
                targetComponentId: component.id,
                properties: {
                    confidence: threat.confidence,
                    autoGenerated: true
                }
            };
            
            this.threatTool.currentProject.connections.push(connection);
        });
    }
    
    updateRiskMatrix() {
        const threats = this.threatTool.currentProject.components.filter(c => 
            c.type === 'threat' || c.type === 'bsi-threat'
        );
        
        if (threats.length === 0) {
            return;
        }
        
        this.riskMatrix = this.generateRiskMatrix(threats);
        this.renderRiskMatrix();
    }
    
    generateRiskMatrix(threats) {
        const matrix = {
            risks: [],
            summary: {
                high: 0,
                medium: 0,
                low: 0,
                total: threats.length
            }
        };
        
        threats.forEach(threat => {
            const impact = threat.properties?.impact || 'Mittel';
            const likelihood = threat.properties?.likelihood || 'Mittel';
            
            const riskScore = this.calculateRiskScore(impact, likelihood);
            const riskLevel = this.getRiskLevel(riskScore);
            
            const risk = {
                threatId: threat.id,
                threatName: threat.name,
                impact: impact,
                likelihood: likelihood,
                score: riskScore,
                level: riskLevel,
                component: threat.properties?.sourceComponent
            };
            
            matrix.risks.push(risk);
            
            // Update summary
            if (riskLevel === 'Hoch') matrix.summary.high++;
            else if (riskLevel === 'Mittel') matrix.summary.medium++;
            else matrix.summary.low++;
        });
        
        // Sort by risk score (highest first)
        matrix.risks.sort((a, b) => b.score - a.score);
        
        return matrix;
    }
    
    calculateRiskScore(impact, likelihood) {
        const impactValues = { 'Niedrig': 1, 'Mittel': 2, 'Hoch': 3 };
        const likelihoodValues = { 'Niedrig': 1, 'Mittel': 2, 'Hoch': 3 };
        
        return impactValues[impact] * likelihoodValues[likelihood];
    }
    
    getRiskLevel(score) {
        if (score >= 6) return 'Hoch';
        if (score >= 3) return 'Mittel';
        return 'Niedrig';
    }
    
    renderRiskMatrix() {
        const container = document.getElementById('autoRiskMatrix');
        if (!container || !this.riskMatrix) return;
        
        const matrixHTML = `
            <div class="risk-matrix-header">
                <div class="risk-summary">
                    <div class="risk-stat risk-high">
                        <span class="count">${this.riskMatrix.summary.high}</span>
                        <span class="label">Hoch</span>
                    </div>
                    <div class="risk-stat risk-medium">
                        <span class="count">${this.riskMatrix.summary.medium}</span>
                        <span class="label">Mittel</span>
                    </div>
                    <div class="risk-stat risk-low">
                        <span class="count">${this.riskMatrix.summary.low}</span>
                        <span class="label">Niedrig</span>
                    </div>
                </div>
            </div>
            <div class="risk-matrix-grid">
                ${this.generateRiskMatrixGrid()}
            </div>
            <div class="risk-list">
                <h5>Identifizierte Risiken (nach Priorität)</h5>
                ${this.generateRiskList()}
            </div>
        `;
        
        container.innerHTML = matrixHTML;
    }
    
    generateRiskMatrixGrid() {
        const impactLevels = ['Hoch', 'Mittel', 'Niedrig'];
        const likelihoodLevels = ['Niedrig', 'Mittel', 'Hoch'];
        
        let gridHTML = '<table class="matrix-grid">';
        
        // Header
        gridHTML += '<tr><th></th>';
        likelihoodLevels.forEach(likelihood => {
            gridHTML += `<th>Wahrscheinlichkeit: ${likelihood}</th>`;
        });
        gridHTML += '</tr>';
        
        // Rows
        impactLevels.forEach(impact => {
            gridHTML += `<tr><th>Auswirkung: ${impact}</th>`;
            
            likelihoodLevels.forEach(likelihood => {
                const score = this.calculateRiskScore(impact, likelihood);
                const level = this.getRiskLevel(score);
                const risksInCell = this.riskMatrix.risks.filter(r => 
                    r.impact === impact && r.likelihood === likelihood
                );
                
                gridHTML += `
                    <td class="matrix-cell risk-${level.toLowerCase()}" 
                        title="${risksInCell.length} Risiken">
                        <div class="cell-score">${score}</div>
                        <div class="cell-count">${risksInCell.length}</div>
                    </td>
                `;
            });
            
            gridHTML += '</tr>';
        });
        
        gridHTML += '</table>';
        return gridHTML;
    }
    
    generateRiskList() {
        if (!this.riskMatrix.risks.length) {
            return '<p class="no-risks">Keine Risiken identifiziert.</p>';
        }
        
        let listHTML = '<div class="risk-items">';
        
        this.riskMatrix.risks.slice(0, 10).forEach(risk => {
            listHTML += `
                <div class="risk-item risk-${risk.level.toLowerCase()}">
                    <div class="risk-info">
                        <div class="risk-name">${risk.threatName}</div>
                        <div class="risk-details">
                            Auswirkung: ${risk.impact} | Wahrscheinlichkeit: ${risk.likelihood}
                        </div>
                    </div>
                    <div class="risk-score-badge">${risk.score}</div>
                </div>
            `;
        });
        
        if (this.riskMatrix.risks.length > 10) {
            listHTML += `<div class="more-risks">... und ${this.riskMatrix.risks.length - 10} weitere Risiken</div>`;
        }
        
        listHTML += '</div>';
        return listHTML;
    }
    
    generateMitigationRecommendations() {
        const threats = this.threatTool.currentProject.components.filter(c => 
            c.type === 'threat' || c.type === 'bsi-threat'
        );
        
        const recommendations = [];
        
        threats.forEach(threat => {
            const threatId = threat.properties?.bsiThreat;
            if (threatId && typeof MITIGATION_STRATEGIES !== 'undefined') {
                Object.values(MITIGATION_STRATEGIES).forEach(mitigation => {
                    if (mitigation.addressedThreats.includes(threatId)) {
                        recommendations.push({
                            mitigation: mitigation,
                            threat: threat,
                            priority: this.calculateMitigationPriority(threat, mitigation)
                        });
                    }
                });
            }
        });
        
        // Sort by priority
        recommendations.sort((a, b) => b.priority - a.priority);
        
        this.renderMitigationRecommendations(recommendations);
    }
    
    calculateMitigationPriority(threat, mitigation) {
        const riskScore = this.calculateRiskScore(
            threat.properties?.impact || 'Mittel',
            threat.properties?.likelihood || 'Mittel'
        );
        
        // Higher risk threats get higher priority
        // More effective mitigations get higher priority
        return riskScore * (mitigation.effectiveness || 0.7);
    }
    
    renderMitigationRecommendations(recommendations) {
        const container = document.getElementById('recommendedMitigations');
        if (!container) return;
        
        if (recommendations.length === 0) {
            container.innerHTML = '<p class="no-recommendations">Keine Empfehlungen verfügbar.</p>';
            return;
        }
        
        let html = '<div class="mitigation-recommendations">';
        
        recommendations.slice(0, 8).forEach(rec => {
            html += `
                <div class="mitigation-recommendation">
                    <div class="mitigation-header">
                        <i class="${rec.mitigation.icon}"></i>
                        <span class="mitigation-name">${rec.mitigation.name}</span>
                        <button class="btn-small btn-primary" onclick="advancedAnalysis.addMitigationToProject('${rec.mitigation.id}', '${rec.threat.id}')">
                            Hinzufügen
                        </button>
                    </div>
                    <div class="mitigation-description">${rec.mitigation.description}</div>
                    <div class="mitigation-threat">Adressiert: ${rec.threat.name}</div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    addMitigationToProject(mitigationId, threatId) {
        if (typeof MITIGATION_STRATEGIES === 'undefined') return;
        
        const mitigation = MITIGATION_STRATEGIES[mitigationId];
        const threat = this.threatTool.currentProject.components.find(c => c.id === threatId);
        
        if (!mitigation || !threat) return;
        
        // Create mitigation component
        const mitigationComponent = {
            id: this.threatTool.generateId(),
            type: 'mitigation',
            name: mitigation.name,
            x: threat.x + 200,
            y: threat.y,
            properties: {
                mitigationId: mitigationId,
                category: mitigation.category,
                description: mitigation.description,
                autoRecommended: true,
                targetThreat: threatId
            }
        };
        
        // Add to project
        this.threatTool.currentProject.components.push(mitigationComponent);
        
        // Create connection
        const connection = {
            id: this.threatTool.generateId(),
            type: 'mitigates',
            sourceComponentId: mitigationComponent.id,
            targetComponentId: threatId,
            properties: {
                autoGenerated: true
            }
        };
        
        this.threatTool.currentProject.connections.push(connection);
        
        // Render
        this.threatTool.renderComponent(mitigationComponent);
        this.threatTool.renderConnection(connection);
        
        // Update analysis
        this.updateAnalysisDisplay();
    }
    
    runFullAnalysis() {
        // Show loading indicator
        this.showAnalysisLoading();
        
        // Perform comprehensive analysis
        setTimeout(() => {
            this.performAutoMapping();
            this.updateRiskMatrix();
            this.generateMitigationRecommendations();
            this.updateAnalysisDisplay();
            this.hideAnalysisLoading();
            
            // Show completion notification
            this.showAnalysisComplete();
        }, 1000);
    }
    
    performAutoMapping() {
        const components = this.threatTool.currentProject.components.filter(c => 
            c.type === 'system' || c.type === 'application' || c.type === 'network'
        );
        
        components.forEach(component => {
            this.mapThreatsToComponent(component);
        });
    }
    
    updateAnalysisDisplay() {
        // Update threat mapping results
        const mappingContainer = document.getElementById('threatMappingResults');
        if (mappingContainer) {
            const autoMappedThreats = this.threatTool.currentProject.components.filter(c => 
                (c.type === 'threat' || c.type === 'bsi-threat') && c.properties?.autoMapped
            );
            
            if (autoMappedThreats.length > 0) {
                mappingContainer.innerHTML = `
                    <div class="mapping-summary">
                        <i class="fas fa-check-circle text-success"></i>
                        <span>${autoMappedThreats.length} Bedrohungen automatisch zugeordnet</span>
                    </div>
                    <div class="mapped-threats">
                        ${autoMappedThreats.slice(0, 5).map(threat => `
                            <div class="mapped-threat">
                                <span class="threat-name">${threat.name}</span>
                                <span class="confidence">Konfidenz: ${Math.round((threat.properties?.confidence || 0.8) * 100)}%</span>
                            </div>
                        `).join('')}
                        ${autoMappedThreats.length > 5 ? `<div class="more-threats">... und ${autoMappedThreats.length - 5} weitere</div>` : ''}
                    </div>
                `;
            }
        }
        
        // Update project status
        this.threatTool.updateProjectStatus();
    }
    
    showAnalysisLoading() {
        const btn = document.getElementById('runFullAnalysisBtn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analysiere...';
            btn.disabled = true;
        }
    }
    
    hideAnalysisLoading() {
        const btn = document.getElementById('runFullAnalysisBtn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-play"></i> Vollanalyse starten';
            btn.disabled = false;
        }
    }
    
    showAnalysisComplete() {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'analysis-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Analyse abgeschlossen!</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    initializeRiskCalculation() {
        // Set up risk calculation parameters
        this.riskParameters = {
            impactWeights: {
                'Vertraulichkeit': 0.3,
                'Integrität': 0.3,
                'Verfügbarkeit': 0.4
            },
            likelihoodFactors: {
                'Technisches Versagen': 1.2,
                'Menschliche Fehlhandlungen': 1.0,
                'Vorsätzliche Handlungen': 0.8,
                'Elementare Gefährdungen': 0.6
            }
        };
    }
}

// Add CSS for analysis interface
const analysisStyles = `
<style>
.analysis-panel {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    margin: 1rem 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.analysis-header {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 0.5rem 0.5rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.analysis-header h3 {
    margin: 0;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.analysis-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.toggle-switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.toggle-switch input[type="checkbox"] {
    display: none;
}

.slider {
    width: 40px;
    height: 20px;
    background: #cbd5e1;
    border-radius: 20px;
    position: relative;
    transition: background 0.3s ease;
}

.slider::before {
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

.toggle-switch input:checked + .slider {
    background: #3b82f6;
}

.toggle-switch input:checked + .slider::before {
    transform: translateX(20px);
}

.analysis-content {
    padding: 1.5rem;
}

.analysis-section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;
}

.analysis-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.analysis-section h4 {
    color: #374151;
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.mapping-results .placeholder,
.risk-matrix-placeholder,
.recommended-mitigations .placeholder {
    text-align: center;
    color: #6b7280;
    font-style: italic;
    padding: 2rem;
}

.risk-matrix-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.risk-matrix-placeholder i {
    font-size: 3rem;
    color: #d1d5db;
}

.mapping-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: #f0fdf4;
    border-radius: 0.375rem;
    border-left: 4px solid #10b981;
}

.text-success {
    color: #10b981;
}

.mapped-threats {
    display: grid;
    gap: 0.5rem;
}

.mapped-threat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: #f8fafc;
    border-radius: 0.25rem;
    border-left: 3px solid #3b82f6;
}

.threat-name {
    font-weight: 500;
    color: #374151;
}

.confidence {
    font-size: 0.875rem;
    color: #6b7280;
}

.more-threats {
    text-align: center;
    color: #6b7280;
    font-style: italic;
    padding: 0.5rem;
}

.risk-matrix-header {
    margin-bottom: 1rem;
}

.risk-summary {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.risk-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 0.375rem;
    min-width: 80px;
}

.risk-stat.risk-high {
    background: #fef2f2;
    color: #991b1b;
}

.risk-stat.risk-medium {
    background: #fffbeb;
    color: #92400e;
}

.risk-stat.risk-low {
    background: #f0fdf4;
    color: #166534;
}

.risk-stat .count {
    font-size: 1.5rem;
    font-weight: bold;
}

.risk-stat .label {
    font-size: 0.875rem;
}

.matrix-grid {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.matrix-grid th,
.matrix-grid td {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    text-align: center;
}

.matrix-grid th {
    background: #f8fafc;
    font-weight: 600;
    font-size: 0.875rem;
}

.matrix-cell {
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 60px;
    vertical-align: middle;
}

.matrix-cell:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.matrix-cell.risk-hoch {
    background: #fecaca;
    color: #991b1b;
}

.matrix-cell.risk-mittel {
    background: #fef3c7;
    color: #92400e;
}

.matrix-cell.risk-niedrig {
    background: #dcfce7;
    color: #166534;
}

.cell-score {
    font-size: 1.25rem;
    font-weight: bold;
}

.cell-count {
    font-size: 0.75rem;
    opacity: 0.8;
}

.risk-list h5 {
    color: #374151;
    margin-bottom: 1rem;
}

.risk-items {
    display: grid;
    gap: 0.75rem;
}

.risk-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 0.375rem;
    border-left: 4px solid;
}

.risk-item.risk-hoch {
    background: #fef2f2;
    border-left-color: #dc2626;
}

.risk-item.risk-mittel {
    background: #fffbeb;
    border-left-color: #f59e0b;
}

.risk-item.risk-niedrig {
    background: #f0fdf4;
    border-left-color: #10b981;
}

.risk-info {
    flex: 1;
}

.risk-name {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
}

.risk-details {
    font-size: 0.875rem;
    color: #6b7280;
}

.risk-score-badge {
    background: #374151;
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
}

.mitigation-recommendations {
    display: grid;
    gap: 1rem;
}

.mitigation-recommendation {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 1rem;
}

.mitigation-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.mitigation-name {
    font-weight: 600;
    color: #374151;
    flex: 1;
}

.mitigation-description {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.mitigation-threat {
    color: #3b82f6;
    font-size: 0.875rem;
    font-weight: 500;
}

.btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
}

.analysis-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 1000;
    animation: slideIn 0.3s ease;
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

.no-risks,
.no-recommendations {
    text-align: center;
    color: #6b7280;
    font-style: italic;
    padding: 1rem;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', analysisStyles);

