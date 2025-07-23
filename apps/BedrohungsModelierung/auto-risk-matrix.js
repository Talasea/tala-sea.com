// BSI Threat Modeling Tool - Advanced Risk Matrix Engine
class AutoRiskMatrixEngine {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.riskMatrix = null;
        this.riskCalculationRules = this.initializeRiskRules();
        this.matrixConfig = this.initializeMatrixConfig();
        this.init();
    }
    
    init() {
        this.setupRiskMatrixInterface();
        this.setupEventListeners();
    }
    
    initializeRiskRules() {
        return {
            // BSI-basierte Risikobewertung
            bsiThreatRisks: {
                'G.0.1': { impact: 'Hoch', likelihood: 'Niedrig', category: 'Elementar' },
                'G.0.2': { impact: 'Mittel', likelihood: 'Mittel', category: 'Elementar' },
                'G.0.8': { impact: 'Hoch', likelihood: 'Mittel', category: 'Elementar' },
                'G.0.14': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.15': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.16': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.19': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.21': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.22': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.23': { impact: 'Hoch', likelihood: 'Hoch', category: 'Vorsätzlich' },
                'G.0.25': { impact: 'Hoch', likelihood: 'Mittel', category: 'Technisch' },
                'G.0.28': { impact: 'Hoch', likelihood: 'Hoch', category: 'Technisch' },
                'G.0.30': { impact: 'Mittel', likelihood: 'Mittel', category: 'Menschlich' },
                'G.0.31': { impact: 'Mittel', likelihood: 'Hoch', category: 'Menschlich' },
                'G.0.39': { impact: 'Hoch', likelihood: 'Hoch', category: 'Vorsätzlich' },
                'G.0.40': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.42': { impact: 'Hoch', likelihood: 'Mittel', category: 'Vorsätzlich' },
                'G.0.45': { impact: 'Hoch', likelihood: 'Mittel', category: 'Technisch' },
                'G.0.46': { impact: 'Hoch', likelihood: 'Mittel', category: 'Technisch' }
            },
            
            // Kontextuelle Risikofaktoren
            contextFactors: {
                systemCriticality: {
                    'critical': 1.5,
                    'high': 1.2,
                    'medium': 1.0,
                    'low': 0.8
                },
                networkExposure: {
                    'internet': 1.4,
                    'dmz': 1.2,
                    'internal': 1.0,
                    'isolated': 0.6
                },
                dataClassification: {
                    'confidential': 1.5,
                    'internal': 1.2,
                    'public': 0.8
                }
            },
            
            // Schutzmaßnahmen-Effektivität
            mitigationEffectiveness: {
                'encryption': 0.7,
                'authentication': 0.8,
                'access-control': 0.75,
                'logging': 0.6,
                'backup': 0.8,
                'training': 0.65,
                'incident-response': 0.7,
                'physical-security': 0.85
            }
        };
    }
    
    initializeMatrixConfig() {
        return {
            dimensions: {
                impact: ['Niedrig', 'Mittel', 'Hoch'],
                likelihood: ['Niedrig', 'Mittel', 'Hoch']
            },
            riskLevels: {
                1: { level: 'Niedrig', color: '#10b981', priority: 3 },
                2: { level: 'Niedrig', color: '#10b981', priority: 3 },
                3: { level: 'Mittel', color: '#f59e0b', priority: 2 },
                4: { level: 'Mittel', color: '#f59e0b', priority: 2 },
                6: { level: 'Hoch', color: '#ef4444', priority: 1 },
                9: { level: 'Hoch', color: '#ef4444', priority: 1 }
            },
            updateTriggers: [
                'componentAdded',
                'componentRemoved',
                'connectionCreated',
                'mitigationApplied'
            ]
        };
    }
    
    setupRiskMatrixInterface() {
        // Create auto-updating risk matrix container
        const matrixContainer = document.createElement('div');
        matrixContainer.id = 'autoRiskMatrixContainer';
        matrixContainer.className = 'auto-risk-matrix-container';
        matrixContainer.innerHTML = `
            <div class="risk-matrix-header">
                <h3><i class="fas fa-chart-area"></i> Automatische Risikomatrix</h3>
                <div class="matrix-controls">
                    <button class="btn-secondary" id="refreshMatrixBtn">
                        <i class="fas fa-sync-alt"></i> Aktualisieren
                    </button>
                    <button class="btn-secondary" id="exportMatrixBtn">
                        <i class="fas fa-download"></i> Exportieren
                    </button>
                    <div class="matrix-settings">
                        <label>
                            <input type="checkbox" id="autoUpdateMatrix" checked>
                            Auto-Update
                        </label>
                    </div>
                </div>
            </div>
            <div class="risk-matrix-content">
                <div class="matrix-summary" id="matrixSummary">
                    <div class="summary-placeholder">
                        <i class="fas fa-chart-pie"></i>
                        <p>Risikomatrix wird automatisch generiert, sobald Bedrohungen identifiziert wurden.</p>
                    </div>
                </div>
                <div class="matrix-visualization" id="matrixVisualization">
                    <!-- Matrix wird hier gerendert -->
                </div>
                <div class="risk-details" id="riskDetails">
                    <!-- Detaillierte Risikoanalyse -->
                </div>
            </div>
        `;
        
        // Insert into main layout
        const analysisPanel = document.getElementById('analysisPanel');
        if (analysisPanel) {
            analysisPanel.appendChild(matrixContainer);
        } else {
            // Create analysis panel if it doesn't exist
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.appendChild(matrixContainer);
            }
        }
    }
    
    setupEventListeners() {
        // Matrix controls
        document.getElementById('refreshMatrixBtn')?.addEventListener('click', () => {
            this.generateRiskMatrix();
        });
        
        document.getElementById('exportMatrixBtn')?.addEventListener('click', () => {
            this.exportRiskMatrix();
        });
        
        document.getElementById('autoUpdateMatrix')?.addEventListener('change', (e) => {
            this.autoUpdate = e.target.checked;
        });
        
        // Listen for project changes
        this.matrixConfig.updateTriggers.forEach(trigger => {
            this.threatTool.canvas?.addEventListener(trigger, () => {
                if (this.autoUpdate) {
                    this.generateRiskMatrix();
                }
            });
        });
    }
    
    generateRiskMatrix() {
        const threats = this.threatTool.currentProject.components.filter(c => 
            c.type === 'threat' || c.type === 'bsi-threat'
        );
        
        const systems = this.threatTool.currentProject.components.filter(c => 
            c.type === 'system' || c.type === 'application'
        );
        
        const mitigations = this.threatTool.currentProject.components.filter(c => 
            c.type === 'mitigation'
        );
        
        if (threats.length === 0) {
            this.renderEmptyMatrix();
            return;
        }
        
        // Calculate risks for each threat
        const riskAssessments = threats.map(threat => {
            return this.assessThreatRisk(threat, systems, mitigations);
        });
        
        // Generate matrix data
        this.riskMatrix = {
            assessments: riskAssessments,
            summary: this.calculateRiskSummary(riskAssessments),
            matrix: this.buildMatrixGrid(riskAssessments),
            recommendations: this.generateRiskRecommendations(riskAssessments),
            timestamp: new Date().toISOString()
        };
        
        // Render the matrix
        this.renderRiskMatrix();
        
        // Update project risk status
        this.updateProjectRiskStatus();
    }
    
    assessThreatRisk(threat, systems, mitigations) {
        const threatId = threat.properties?.bsiThreat || threat.id;
        const baseRisk = this.riskCalculationRules.bsiThreatRisks[threatId] || {
            impact: 'Mittel',
            likelihood: 'Mittel',
            category: 'Unbekannt'
        };
        
        // Calculate contextual adjustments
        const contextAdjustments = this.calculateContextualRisk(threat, systems);
        
        // Calculate mitigation effects
        const mitigationEffects = this.calculateMitigationEffects(threat, mitigations);
        
        // Final risk calculation
        const adjustedImpact = this.adjustRiskLevel(baseRisk.impact, contextAdjustments.impact);
        const adjustedLikelihood = this.adjustRiskLevel(baseRisk.likelihood, 
            contextAdjustments.likelihood * mitigationEffects.likelihoodReduction);
        
        const riskScore = this.calculateRiskScore(adjustedImpact, adjustedLikelihood);
        const riskLevel = this.getRiskLevel(riskScore);
        
        return {
            threatId: threat.id,
            threatName: threat.name,
            threatCategory: baseRisk.category,
            baseImpact: baseRisk.impact,
            baseLikelihood: baseRisk.likelihood,
            adjustedImpact: adjustedImpact,
            adjustedLikelihood: adjustedLikelihood,
            riskScore: riskScore,
            riskLevel: riskLevel,
            contextFactors: contextAdjustments.factors,
            mitigations: mitigationEffects.appliedMitigations,
            residualRisk: riskScore * mitigationEffects.overallEffectiveness,
            recommendations: this.getThreatSpecificRecommendations(threat, riskLevel)
        };
    }
    
    calculateContextualRisk(threat, systems) {
        let impactMultiplier = 1.0;
        let likelihoodMultiplier = 1.0;
        const factors = [];
        
        // Find connected systems
        const connections = this.threatTool.currentProject.connections.filter(conn => 
            conn.sourceComponentId === threat.id || conn.targetComponentId === threat.id
        );
        
        connections.forEach(conn => {
            const systemId = conn.sourceComponentId === threat.id ? 
                conn.targetComponentId : conn.sourceComponentId;
            const system = systems.find(s => s.id === systemId);
            
            if (system) {
                // System criticality
                const criticality = system.properties?.criticality || 'medium';
                impactMultiplier *= this.riskCalculationRules.contextFactors.systemCriticality[criticality];
                factors.push(`System-Kritikalität: ${criticality}`);
                
                // Network exposure
                const exposure = system.properties?.networkExposure || 'internal';
                likelihoodMultiplier *= this.riskCalculationRules.contextFactors.networkExposure[exposure];
                factors.push(`Netzwerk-Exposition: ${exposure}`);
                
                // Data classification
                const dataClass = system.properties?.dataClassification || 'internal';
                impactMultiplier *= this.riskCalculationRules.contextFactors.dataClassification[dataClass];
                factors.push(`Datenklassifikation: ${dataClass}`);
            }
        });
        
        return {
            impact: impactMultiplier,
            likelihood: likelihoodMultiplier,
            factors: factors
        };
    }
    
    calculateMitigationEffects(threat, mitigations) {
        let overallEffectiveness = 1.0;
        let likelihoodReduction = 1.0;
        const appliedMitigations = [];
        
        // Find mitigations that address this threat
        const relevantMitigations = mitigations.filter(mitigation => {
            const connections = this.threatTool.currentProject.connections.filter(conn => 
                (conn.sourceComponentId === mitigation.id && conn.targetComponentId === threat.id) ||
                (conn.targetComponentId === mitigation.id && conn.sourceComponentId === threat.id)
            );
            return connections.length > 0;
        });
        
        relevantMitigations.forEach(mitigation => {
            const mitigationId = mitigation.properties?.mitigationId || mitigation.id;
            const effectiveness = this.riskCalculationRules.mitigationEffectiveness[mitigationId] || 0.5;
            
            // Compound effectiveness (not additive to avoid over-mitigation)
            overallEffectiveness *= (1 - effectiveness);
            likelihoodReduction *= (1 - effectiveness * 0.7); // Mitigations primarily reduce likelihood
            
            appliedMitigations.push({
                name: mitigation.name,
                effectiveness: effectiveness,
                type: mitigation.properties?.category || 'Unbekannt'
            });
        });
        
        // Convert back to reduction factor
        overallEffectiveness = 1 - overallEffectiveness;
        likelihoodReduction = 1 - likelihoodReduction;
        
        return {
            overallEffectiveness: Math.max(0.1, overallEffectiveness), // Minimum 10% residual risk
            likelihoodReduction: Math.max(0.1, likelihoodReduction),
            appliedMitigations: appliedMitigations
        };
    }
    
    adjustRiskLevel(baseLevel, multiplier) {
        const levels = ['Niedrig', 'Mittel', 'Hoch'];
        const currentIndex = levels.indexOf(baseLevel);
        
        if (multiplier > 1.3) {
            return levels[Math.min(2, currentIndex + 1)];
        } else if (multiplier < 0.7) {
            return levels[Math.max(0, currentIndex - 1)];
        }
        
        return baseLevel;
    }
    
    calculateRiskScore(impact, likelihood) {
        const impactValues = { 'Niedrig': 1, 'Mittel': 2, 'Hoch': 3 };
        const likelihoodValues = { 'Niedrig': 1, 'Mittel': 2, 'Hoch': 3 };
        
        return impactValues[impact] * likelihoodValues[likelihood];
    }
    
    getRiskLevel(score) {
        return this.matrixConfig.riskLevels[score] || 
               { level: 'Unbekannt', color: '#6b7280', priority: 4 };
    }
    
    calculateRiskSummary(assessments) {
        const summary = {
            total: assessments.length,
            high: 0,
            medium: 0,
            low: 0,
            averageScore: 0,
            highestRisk: null,
            mostCommonCategory: null
        };
        
        let totalScore = 0;
        const categories = {};
        
        assessments.forEach(assessment => {
            totalScore += assessment.riskScore;
            
            // Count by risk level
            if (assessment.riskLevel.level === 'Hoch') summary.high++;
            else if (assessment.riskLevel.level === 'Mittel') summary.medium++;
            else summary.low++;
            
            // Track highest risk
            if (!summary.highestRisk || assessment.riskScore > summary.highestRisk.riskScore) {
                summary.highestRisk = assessment;
            }
            
            // Count categories
            categories[assessment.threatCategory] = (categories[assessment.threatCategory] || 0) + 1;
        });
        
        summary.averageScore = assessments.length > 0 ? totalScore / assessments.length : 0;
        summary.mostCommonCategory = Object.keys(categories).reduce((a, b) => 
            categories[a] > categories[b] ? a : b, Object.keys(categories)[0]);
        
        return summary;
    }
    
    buildMatrixGrid(assessments) {
        const grid = {};
        
        this.matrixConfig.dimensions.impact.forEach(impact => {
            grid[impact] = {};
            this.matrixConfig.dimensions.likelihood.forEach(likelihood => {
                grid[impact][likelihood] = {
                    threats: assessments.filter(a => 
                        a.adjustedImpact === impact && a.adjustedLikelihood === likelihood
                    ),
                    count: 0,
                    riskScore: this.calculateRiskScore(impact, likelihood)
                };
                grid[impact][likelihood].count = grid[impact][likelihood].threats.length;
            });
        });
        
        return grid;
    }
    
    generateRiskRecommendations(assessments) {
        const recommendations = [];
        
        // High-risk threats
        const highRiskThreats = assessments.filter(a => a.riskLevel.level === 'Hoch');
        if (highRiskThreats.length > 0) {
            recommendations.push({
                priority: 'Hoch',
                category: 'Sofortmaßnahmen',
                description: `${highRiskThreats.length} Bedrohungen mit hohem Risiko identifiziert. Sofortige Maßnahmen erforderlich.`,
                actions: [
                    'Incident Response Plan aktivieren',
                    'Zusätzliche Schutzmaßnahmen implementieren',
                    'Management informieren',
                    'Regelmäßige Überwachung einrichten'
                ]
            });
        }
        
        // Unmitigated threats
        const unmitigatedThreats = assessments.filter(a => a.mitigations.length === 0);
        if (unmitigatedThreats.length > 0) {
            recommendations.push({
                priority: 'Mittel',
                category: 'Schutzmaßnahmen',
                description: `${unmitigatedThreats.length} Bedrohungen ohne Schutzmaßnahmen identifiziert.`,
                actions: [
                    'Geeignete Schutzmaßnahmen auswählen',
                    'Implementierungsplan erstellen',
                    'Budget für Sicherheitsmaßnahmen bereitstellen'
                ]
            });
        }
        
        // Category-specific recommendations
        const categoryRecommendations = this.getCategorySpecificRecommendations(assessments);
        recommendations.push(...categoryRecommendations);
        
        return recommendations.sort((a, b) => {
            const priorityOrder = { 'Hoch': 1, 'Mittel': 2, 'Niedrig': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
    
    getCategorySpecificRecommendations(assessments) {
        const recommendations = [];
        const categoryGroups = {};
        
        // Group by category
        assessments.forEach(assessment => {
            const category = assessment.threatCategory;
            if (!categoryGroups[category]) {
                categoryGroups[category] = [];
            }
            categoryGroups[category].push(assessment);
        });
        
        // Generate category-specific recommendations
        Object.entries(categoryGroups).forEach(([category, threats]) => {
            const avgRisk = threats.reduce((sum, t) => sum + t.riskScore, 0) / threats.length;
            
            if (category === 'Vorsätzlich' && avgRisk > 4) {
                recommendations.push({
                    priority: 'Hoch',
                    category: 'Cybersicherheit',
                    description: 'Erhöhtes Risiko durch vorsätzliche Angriffe',
                    actions: [
                        'Security Awareness Training verstärken',
                        'Intrusion Detection System implementieren',
                        'Penetration Testing durchführen'
                    ]
                });
            }
            
            if (category === 'Technisch' && avgRisk > 3) {
                recommendations.push({
                    priority: 'Mittel',
                    category: 'Technische Sicherheit',
                    description: 'Technische Schwachstellen identifiziert',
                    actions: [
                        'Regelmäßige Updates und Patches',
                        'Vulnerability Scanning implementieren',
                        'Redundante Systeme einrichten'
                    ]
                });
            }
        });
        
        return recommendations;
    }
    
    getThreatSpecificRecommendations(threat, riskLevel) {
        const recommendations = [];
        const threatId = threat.properties?.bsiThreat;
        
        // BSI-spezifische Empfehlungen
        const bsiRecommendations = {
            'G.0.23': ['Multi-Faktor-Authentifizierung', 'Network Segmentation', 'Intrusion Detection'],
            'G.0.28': ['Patch Management', 'Vulnerability Scanning', 'Code Review'],
            'G.0.39': ['Antivirus/Anti-Malware', 'Email Security', 'User Training'],
            'G.0.40': ['DDoS Protection', 'Load Balancing', 'Incident Response']
        };
        
        if (threatId && bsiRecommendations[threatId]) {
            recommendations.push(...bsiRecommendations[threatId]);
        }
        
        // Risiko-basierte Empfehlungen
        if (riskLevel.level === 'Hoch') {
            recommendations.push('Sofortige Maßnahmen erforderlich', 'Management-Eskalation');
        }
        
        return recommendations;
    }
    
    renderRiskMatrix() {
        this.renderMatrixSummary();
        this.renderMatrixVisualization();
        this.renderRiskDetails();
    }
    
    renderMatrixSummary() {
        const container = document.getElementById('matrixSummary');
        if (!container || !this.riskMatrix) return;
        
        const summary = this.riskMatrix.summary;
        
        container.innerHTML = `
            <div class="risk-overview">
                <div class="risk-stats">
                    <div class="risk-stat high">
                        <div class="stat-number">${summary.high}</div>
                        <div class="stat-label">Hoch</div>
                    </div>
                    <div class="risk-stat medium">
                        <div class="stat-number">${summary.medium}</div>
                        <div class="stat-label">Mittel</div>
                    </div>
                    <div class="risk-stat low">
                        <div class="stat-number">${summary.low}</div>
                        <div class="stat-label">Niedrig</div>
                    </div>
                    <div class="risk-stat total">
                        <div class="stat-number">${summary.total}</div>
                        <div class="stat-label">Gesamt</div>
                    </div>
                </div>
                <div class="risk-insights">
                    <div class="insight">
                        <strong>Durchschnittliches Risiko:</strong> 
                        ${summary.averageScore.toFixed(1)}/9
                    </div>
                    <div class="insight">
                        <strong>Häufigste Kategorie:</strong> 
                        ${summary.mostCommonCategory || 'N/A'}
                    </div>
                    ${summary.highestRisk ? `
                    <div class="insight">
                        <strong>Höchstes Risiko:</strong> 
                        ${summary.highestRisk.threatName} (${summary.highestRisk.riskScore}/9)
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    renderMatrixVisualization() {
        const container = document.getElementById('matrixVisualization');
        if (!container || !this.riskMatrix) return;
        
        const matrix = this.riskMatrix.matrix;
        
        let html = `
            <div class="matrix-grid-container">
                <table class="risk-matrix-table">
                    <thead>
                        <tr>
                            <th></th>
                            ${this.matrixConfig.dimensions.likelihood.map(l => 
                                `<th>Wahrscheinlichkeit<br>${l}</th>`
                            ).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Reverse impact order for proper matrix display (High at top)
        const reversedImpact = [...this.matrixConfig.dimensions.impact].reverse();
        
        reversedImpact.forEach(impact => {
            html += `<tr><th>Auswirkung<br>${impact}</th>`;
            
            this.matrixConfig.dimensions.likelihood.forEach(likelihood => {
                const cell = matrix[impact][likelihood];
                const riskLevel = this.getRiskLevel(cell.riskScore);
                
                html += `
                    <td class="matrix-cell" 
                        style="background-color: ${riskLevel.color}20; border-color: ${riskLevel.color}"
                        data-impact="${impact}" 
                        data-likelihood="${likelihood}"
                        onclick="autoRiskMatrix.showCellDetails('${impact}', '${likelihood}')">
                        <div class="cell-score">${cell.riskScore}</div>
                        <div class="cell-count">${cell.count} Bedrohungen</div>
                        <div class="cell-level">${riskLevel.level}</div>
                    </td>
                `;
            });
            
            html += '</tr>';
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    renderRiskDetails() {
        const container = document.getElementById('riskDetails');
        if (!container || !this.riskMatrix) return;
        
        const recommendations = this.riskMatrix.recommendations;
        
        let html = `
            <div class="risk-recommendations">
                <h4>Empfehlungen</h4>
                <div class="recommendations-list">
        `;
        
        recommendations.forEach(rec => {
            html += `
                <div class="recommendation priority-${rec.priority.toLowerCase()}">
                    <div class="rec-header">
                        <span class="rec-priority">${rec.priority}</span>
                        <span class="rec-category">${rec.category}</span>
                    </div>
                    <div class="rec-description">${rec.description}</div>
                    <div class="rec-actions">
                        <strong>Maßnahmen:</strong>
                        <ul>
                            ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    renderEmptyMatrix() {
        const summaryContainer = document.getElementById('matrixSummary');
        const visualizationContainer = document.getElementById('matrixVisualization');
        const detailsContainer = document.getElementById('riskDetails');
        
        const emptyMessage = `
            <div class="empty-matrix">
                <i class="fas fa-chart-area"></i>
                <p>Keine Bedrohungen identifiziert. Fügen Sie Bausteine hinzu, um eine Risikomatrix zu generieren.</p>
            </div>
        `;
        
        if (summaryContainer) summaryContainer.innerHTML = emptyMessage;
        if (visualizationContainer) visualizationContainer.innerHTML = '';
        if (detailsContainer) detailsContainer.innerHTML = '';
    }
    
    showCellDetails(impact, likelihood) {
        if (!this.riskMatrix) return;
        
        const cell = this.riskMatrix.matrix[impact][likelihood];
        const threats = cell.threats;
        
        if (threats.length === 0) {
            alert('Keine Bedrohungen in dieser Risikokategorie.');
            return;
        }
        
        // Create modal or detailed view
        const modal = document.createElement('div');
        modal.className = 'risk-cell-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Risikozelle: ${impact} Auswirkung, ${likelihood} Wahrscheinlichkeit</h3>
                    <button class="close-modal" onclick="this.closest('.risk-cell-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="cell-summary">
                        <p><strong>Risiko-Score:</strong> ${cell.riskScore}/9</p>
                        <p><strong>Anzahl Bedrohungen:</strong> ${threats.length}</p>
                    </div>
                    <div class="threats-list">
                        <h4>Bedrohungen in dieser Kategorie:</h4>
                        ${threats.map(threat => `
                            <div class="threat-detail">
                                <div class="threat-name">${threat.threatName}</div>
                                <div class="threat-info">
                                    Kategorie: ${threat.threatCategory} | 
                                    Residualrisiko: ${threat.residualRisk.toFixed(1)}
                                </div>
                                <div class="threat-mitigations">
                                    ${threat.mitigations.length > 0 ? 
                                        `Schutzmaßnahmen: ${threat.mitigations.map(m => m.name).join(', ')}` :
                                        'Keine Schutzmaßnahmen implementiert'
                                    }
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    exportRiskMatrix() {
        if (!this.riskMatrix) {
            alert('Keine Risikomatrix zum Exportieren verfügbar.');
            return;
        }
        
        const exportData = {
            timestamp: this.riskMatrix.timestamp,
            project: this.threatTool.currentProject.name,
            summary: this.riskMatrix.summary,
            assessments: this.riskMatrix.assessments,
            recommendations: this.riskMatrix.recommendations
        };
        
        // Export as JSON
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: 'application/json' 
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `risk-matrix-${Date.now()}.json`;
        link.click();
    }
    
    updateProjectRiskStatus() {
        if (!this.riskMatrix) return;
        
        const summary = this.riskMatrix.summary;
        let riskStatus = 'Niedrig';
        let statusColor = '#10b981';
        
        if (summary.high > 0) {
            riskStatus = 'Hoch';
            statusColor = '#ef4444';
        } else if (summary.medium > 2) {
            riskStatus = 'Mittel';
            statusColor = '#f59e0b';
        }
        
        // Update project status display
        const statusElement = document.querySelector('.project-risk-status');
        if (statusElement) {
            statusElement.innerHTML = `
                <span style="color: ${statusColor}">
                    <i class="fas fa-exclamation-triangle"></i>
                    Risiko: ${riskStatus}
                </span>
            `;
        }
    }
}

// Add CSS for risk matrix interface
const riskMatrixStyles = `
<style>
.auto-risk-matrix-container {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    margin: 1rem 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.risk-matrix-header {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 0.5rem 0.5rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.risk-matrix-header h3 {
    margin: 0;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.matrix-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.matrix-settings label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
}

.risk-matrix-content {
    padding: 1.5rem;
}

.risk-overview {
    margin-bottom: 2rem;
}

.risk-stats {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
}

.risk-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 0.375rem;
    min-width: 80px;
    border: 2px solid;
}

.risk-stat.high {
    background: #fef2f2;
    border-color: #ef4444;
    color: #991b1b;
}

.risk-stat.medium {
    background: #fffbeb;
    border-color: #f59e0b;
    color: #92400e;
}

.risk-stat.low {
    background: #f0fdf4;
    border-color: #10b981;
    color: #166534;
}

.risk-stat.total {
    background: #f8fafc;
    border-color: #6b7280;
    color: #374151;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: bold;
}

.stat-label {
    font-size: 0.875rem;
}

.risk-insights {
    display: grid;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
}

.insight {
    color: #374151;
    font-size: 0.875rem;
}

.matrix-grid-container {
    margin: 2rem 0;
    overflow-x: auto;
}

.risk-matrix-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    max-width: 600px;
}

.risk-matrix-table th,
.risk-matrix-table td {
    border: 2px solid #e2e8f0;
    padding: 1rem;
    text-align: center;
    vertical-align: middle;
}

.risk-matrix-table th {
    background: #f8fafc;
    font-weight: 600;
    font-size: 0.875rem;
    color: #374151;
}

.matrix-cell {
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 80px;
    position: relative;
}

.matrix-cell:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.cell-score {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.cell-count {
    font-size: 0.75rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
}

.cell-level {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.empty-matrix {
    text-align: center;
    color: #6b7280;
    padding: 3rem;
}

.empty-matrix i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.risk-recommendations {
    margin-top: 2rem;
}

.risk-recommendations h4 {
    color: #374151;
    margin-bottom: 1rem;
}

.recommendations-list {
    display: grid;
    gap: 1rem;
}

.recommendation {
    border-left: 4px solid;
    padding: 1rem;
    border-radius: 0.375rem;
}

.recommendation.priority-hoch {
    background: #fef2f2;
    border-left-color: #ef4444;
}

.recommendation.priority-mittel {
    background: #fffbeb;
    border-left-color: #f59e0b;
}

.recommendation.priority-niedrig {
    background: #f0fdf4;
    border-left-color: #10b981;
}

.rec-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.rec-priority {
    background: #374151;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.rec-category {
    color: #6b7280;
    font-weight: 500;
}

.rec-description {
    margin-bottom: 0.5rem;
    color: #374151;
}

.rec-actions {
    font-size: 0.875rem;
}

.rec-actions ul {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
}

.rec-actions li {
    margin-bottom: 0.25rem;
}

.risk-cell-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    border-radius: 0.5rem;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 0.5rem 0.5rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: #374151;
}

.close-modal {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.5rem;
}

.close-modal:hover {
    color: #374151;
}

.modal-body {
    padding: 1.5rem;
}

.cell-summary {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
}

.threats-list h4 {
    color: #374151;
    margin-bottom: 1rem;
}

.threat-detail {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 0.5rem;
    border-left: 3px solid #3b82f6;
}

.threat-name {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
}

.threat-info {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
}

.threat-mitigations {
    font-size: 0.875rem;
    color: #10b981;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', riskMatrixStyles);

