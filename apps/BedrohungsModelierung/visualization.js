// BSI Threat Modeling Tool - Visualization and Analysis Module
class ThreatVisualization {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.chartContainer = null;
        this.networkGraph = null;
        this.riskMatrix = null;
        this.init();
    }
    
    init() {
        this.setupVisualizationContainer();
        this.setupEventListeners();
    }
    
    setupVisualizationContainer() {
        // Create visualization container if it doesn't exist
        if (!document.getElementById('visualizationContainer')) {
            const container = document.createElement('div');
            container.id = 'visualizationContainer';
            container.className = 'visualization-container hidden';
            container.innerHTML = `
                <div class="visualization-header">
                    <h3>Grafische Darstellung</h3>
                    <div class="visualization-controls">
                        <button class="viz-btn" id="networkViewBtn">
                            <i class="fas fa-project-diagram"></i>
                            Netzwerk-Ansicht
                        </button>
                        <button class="viz-btn" id="riskMatrixBtn">
                            <i class="fas fa-th"></i>
                            Risiko-Matrix
                        </button>
                        <button class="viz-btn" id="threatTreeBtn">
                            <i class="fas fa-sitemap"></i>
                            Bedrohungsbaum
                        </button>
                        <button class="viz-btn" id="reportViewBtn">
                            <i class="fas fa-chart-bar"></i>
                            Bericht
                        </button>
                        <button class="close-btn" id="closeVisualizationBtn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="visualization-content" id="visualizationContent">
                    <div class="visualization-placeholder">
                        <i class="fas fa-chart-line"></i>
                        <p>Wählen Sie eine Visualisierungsart aus dem Menü oben.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(container);
        }
    }
    
    setupEventListeners() {
        document.getElementById('networkViewBtn')?.addEventListener('click', () => this.showNetworkView());
        document.getElementById('riskMatrixBtn')?.addEventListener('click', () => this.showRiskMatrix());
        document.getElementById('threatTreeBtn')?.addEventListener('click', () => this.showThreatTree());
        document.getElementById('reportViewBtn')?.addEventListener('click', () => this.showReportView());
        document.getElementById('closeVisualizationBtn')?.addEventListener('click', () => this.hideVisualization());
        
        // Add visualization button to main interface
        const analysisBtn = document.getElementById('runAnalysisBtn');
        if (analysisBtn) {
            const vizBtn = document.createElement('button');
            vizBtn.className = 'analysis-btn';
            vizBtn.id = 'showVisualizationBtn';
            vizBtn.innerHTML = '<i class="fas fa-chart-line"></i> Visualisierung';
            vizBtn.addEventListener('click', () => this.showVisualization());
            analysisBtn.parentNode.insertBefore(vizBtn, analysisBtn.nextSibling);
        }
    }
    
    showVisualization() {
        const container = document.getElementById('visualizationContainer');
        container.classList.remove('hidden');
        container.classList.add('open');
        this.showNetworkView(); // Default view
    }
    
    hideVisualization() {
        const container = document.getElementById('visualizationContainer');
        container.classList.add('hidden');
        container.classList.remove('open');
    }
    
    showNetworkView() {
        const content = document.getElementById('visualizationContent');
        content.innerHTML = `
            <div class="network-view">
                <div class="network-controls">
                    <label>
                        <input type="checkbox" id="showThreats" checked> Bedrohungen anzeigen
                    </label>
                    <label>
                        <input type="checkbox" id="showMitigations" checked> Schutzmaßnahmen anzeigen
                    </label>
                    <label>
                        <input type="checkbox" id="showConnections" checked> Verbindungen anzeigen
                    </label>
                </div>
                <svg id="networkSvg" class="network-svg"></svg>
            </div>
        `;
        
        this.renderNetworkGraph();
        this.setupNetworkControls();
    }
    
    renderNetworkGraph() {
        const svg = document.getElementById('networkSvg');
        const rect = svg.getBoundingClientRect();
        svg.setAttribute('width', rect.width || 800);
        svg.setAttribute('height', rect.height || 600);
        
        // Clear existing content
        svg.innerHTML = '';
        
        const components = this.threatTool.currentProject.components;
        const connections = this.threatTool.currentProject.connections;
        
        // Create force simulation layout
        const nodes = components.map(comp => ({
            id: comp.id,
            name: comp.name,
            type: comp.type,
            x: comp.x || Math.random() * 600 + 100,
            y: comp.y || Math.random() * 400 + 100,
            radius: this.getNodeRadius(comp.type)
        }));
        
        const links = connections.map(conn => ({
            source: conn.sourceComponentId,
            target: conn.targetComponentId,
            type: conn.type
        }));
        
        // Render nodes
        const nodeGroups = svg.selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', d => `node node-${d.type}`)
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
        
        // Add circles for nodes
        nodeGroups.append('circle')
            .attr('r', d => d.radius)
            .attr('fill', d => this.getNodeColor(d.type))
            .attr('stroke', '#333')
            .attr('stroke-width', 2);
        
        // Add labels
        nodeGroups.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('font-size', '10px')
            .attr('fill', '#333')
            .text(d => this.truncateText(d.name, 12));
        
        // Render links
        const linkElements = svg.selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class', d => `link link-${d.type}`)
            .attr('stroke', d => this.getLinkColor(d.type))
            .attr('stroke-width', 2)
            .attr('x1', d => this.findNodeById(nodes, d.source).x)
            .attr('y1', d => this.findNodeById(nodes, d.source).y)
            .attr('x2', d => this.findNodeById(nodes, d.target).x)
            .attr('y2', d => this.findNodeById(nodes, d.target).y);
    }
    
    setupNetworkControls() {
        document.getElementById('showThreats').addEventListener('change', (e) => {
            this.toggleNodeVisibility('threat', e.target.checked);
        });
        
        document.getElementById('showMitigations').addEventListener('change', (e) => {
            this.toggleNodeVisibility('mitigation', e.target.checked);
        });
        
        document.getElementById('showConnections').addEventListener('change', (e) => {
            this.toggleConnectionVisibility(e.target.checked);
        });
    }
    
    showRiskMatrix() {
        const content = document.getElementById('visualizationContent');
        content.innerHTML = `
            <div class="risk-matrix-view">
                <h4>Risiko-Matrix</h4>
                <div class="risk-matrix-container">
                    <div class="risk-matrix" id="riskMatrix"></div>
                    <div class="risk-legend">
                        <h5>Legende</h5>
                        <div class="legend-item">
                            <span class="legend-color risk-low"></span>
                            <span>Niedriges Risiko (1-2)</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color risk-medium"></span>
                            <span>Mittleres Risiko (3-4)</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color risk-high"></span>
                            <span>Hohes Risiko (6-9)</span>
                        </div>
                    </div>
                </div>
                <div class="risk-details" id="riskDetails">
                    <h5>Risiko-Details</h5>
                    <p>Klicken Sie auf eine Zelle in der Matrix, um Details zu sehen.</p>
                </div>
            </div>
        `;
        
        this.renderRiskMatrix();
    }
    
    renderRiskMatrix() {
        const matrix = document.getElementById('riskMatrix');
        const threats = this.threatTool.currentProject.components.filter(c => 
            c.type === 'threat' || c.type === 'bsi-threat'
        );
        
        // Create 3x3 risk matrix
        const impactLevels = ['Niedrig', 'Mittel', 'Hoch'];
        const likelihoodLevels = ['Niedrig', 'Mittel', 'Hoch'];
        
        let matrixHTML = '<table class="risk-matrix-table">';
        
        // Header row
        matrixHTML += '<tr><th></th>';
        impactLevels.forEach(impact => {
            matrixHTML += `<th>Auswirkung: ${impact}</th>`;
        });
        matrixHTML += '</tr>';
        
        // Data rows
        likelihoodLevels.reverse().forEach((likelihood, rowIndex) => {
            matrixHTML += `<tr><th>Wahrscheinlichkeit: ${likelihood}</th>`;
            
            impactLevels.forEach((impact, colIndex) => {
                const riskScore = (3 - rowIndex) * (colIndex + 1);
                const riskLevel = this.getRiskLevel(riskScore);
                const threatsInCell = this.getThreatsForRisk(threats, impact, likelihood);
                
                matrixHTML += `
                    <td class="risk-cell risk-${riskLevel.toLowerCase()}" 
                        data-impact="${impact}" 
                        data-likelihood="${likelihood}"
                        data-score="${riskScore}">
                        <div class="risk-score">${riskScore}</div>
                        <div class="threat-count">${threatsInCell.length} Bedrohungen</div>
                    </td>
                `;
            });
            
            matrixHTML += '</tr>';
        });
        
        matrixHTML += '</table>';
        matrix.innerHTML = matrixHTML;
        
        // Add click handlers for cells
        matrix.querySelectorAll('.risk-cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.showRiskDetails(e.target));
        });
    }
    
    showThreatTree() {
        const content = document.getElementById('visualizationContent');
        content.innerHTML = `
            <div class="threat-tree-view">
                <h4>Bedrohungsbaum</h4>
                <div class="tree-controls">
                    <select id="rootThreatSelect">
                        <option value="">Wurzel-Bedrohung wählen...</option>
                    </select>
                    <button id="generateTreeBtn" class="btn-primary">Baum generieren</button>
                </div>
                <div class="threat-tree-container">
                    <svg id="threatTreeSvg" class="threat-tree-svg"></svg>
                </div>
            </div>
        `;
        
        this.populateThreatSelect();
        this.setupThreatTreeControls();
    }
    
    showReportView() {
        const content = document.getElementById('visualizationContent');
        const report = this.generateDetailedReport();
        
        content.innerHTML = `
            <div class="report-view">
                <div class="report-header">
                    <h4>Bedrohungsmodellierungs-Bericht</h4>
                    <button class="btn-primary" id="exportReportBtn">
                        <i class="fas fa-download"></i>
                        Bericht exportieren
                    </button>
                </div>
                <div class="report-content">
                    ${report}
                </div>
            </div>
        `;
        
        document.getElementById('exportReportBtn').addEventListener('click', () => {
            this.exportReport();
        });
    }
    
    generateDetailedReport() {
        const project = this.threatTool.currentProject;
        const threats = project.components.filter(c => c.type === 'threat' || c.type === 'bsi-threat');
        const systems = project.components.filter(c => c.type === 'system');
        const mitigations = project.components.filter(c => c.type === 'mitigation');
        
        let report = `
            <div class="report-section">
                <h5>Projekt-Übersicht</h5>
                <div class="report-stats">
                    <div class="stat-card">
                        <div class="stat-number">${systems.length}</div>
                        <div class="stat-label">Systeme</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${threats.length}</div>
                        <div class="stat-label">Bedrohungen</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${mitigations.length}</div>
                        <div class="stat-label">Schutzmaßnahmen</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${project.connections.length}</div>
                        <div class="stat-label">Verbindungen</div>
                    </div>
                </div>
            </div>
        `;
        
        // Threat analysis
        if (threats.length > 0) {
            report += `
                <div class="report-section">
                    <h5>Bedrohungsanalyse</h5>
                    <div class="threat-breakdown">
            `;
            
            const threatsByCategory = this.groupThreatsByCategory(threats);
            Object.entries(threatsByCategory).forEach(([category, categoryThreats]) => {
                report += `
                    <div class="category-breakdown">
                        <h6>${category} (${categoryThreats.length})</h6>
                        <ul>
                `;
                
                categoryThreats.forEach(threat => {
                    report += `<li>${threat.name}</li>`;
                });
                
                report += `
                        </ul>
                    </div>
                `;
            });
            
            report += `
                    </div>
                </div>
            `;
        }
        
        // Risk assessment
        report += `
            <div class="report-section">
                <h5>Risikobewertung</h5>
                <div class="risk-assessment">
                    ${this.generateRiskAssessment(threats, mitigations)}
                </div>
            </div>
        `;
        
        // Recommendations
        report += `
            <div class="report-section">
                <h5>Empfehlungen</h5>
                <div class="recommendations">
                    ${this.generateRecommendations(threats, systems, mitigations)}
                </div>
            </div>
        `;
        
        return report;
    }
    
    // Helper methods
    getNodeRadius(type) {
        const radii = {
            'system': 25,
            'threat': 20,
            'bsi-threat': 20,
            'mitigation': 22
        };
        return radii[type] || 20;
    }
    
    getNodeColor(type) {
        const colors = {
            'system': '#3b82f6',
            'threat': '#f59e0b',
            'bsi-threat': '#ef4444',
            'mitigation': '#10b981'
        };
        return colors[type] || '#6b7280';
    }
    
    getLinkColor(type) {
        const colors = {
            'dataFlow': '#6b7280',
            'threatAppliesTo': '#f59e0b',
            'mitigates': '#10b981'
        };
        return colors[type] || '#6b7280';
    }
    
    findNodeById(nodes, id) {
        return nodes.find(node => node.id === id) || { x: 0, y: 0 };
    }
    
    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    getRiskLevel(score) {
        if (score >= 6) return 'Hoch';
        if (score >= 3) return 'Mittel';
        return 'Niedrig';
    }
    
    getThreatsForRisk(threats, impact, likelihood) {
        // This would normally use actual threat data with impact/likelihood ratings
        // For now, distribute threats randomly across the matrix
        return threats.filter(() => Math.random() > 0.7);
    }
    
    groupThreatsByCategory(threats) {
        const groups = {};
        threats.forEach(threat => {
            const category = threat.properties?.strideCategory || 
                           threat.properties?.bsiThreat?.substring(0, 5) || 
                           'Sonstige';
            if (!groups[category]) groups[category] = [];
            groups[category].push(threat);
        });
        return groups;
    }
    
    generateRiskAssessment(threats, mitigations) {
        const riskRatio = threats.length / Math.max(mitigations.length, 1);
        let assessment = '';
        
        if (riskRatio > 2) {
            assessment = `
                <div class="risk-high">
                    <strong>Hohes Risiko:</strong> Es wurden ${threats.length} Bedrohungen identifiziert, 
                    aber nur ${mitigations.length} Schutzmaßnahmen. Dringende Maßnahmen erforderlich.
                </div>
            `;
        } else if (riskRatio > 1) {
            assessment = `
                <div class="risk-medium">
                    <strong>Mittleres Risiko:</strong> Ausgewogenes Verhältnis zwischen Bedrohungen 
                    und Schutzmaßnahmen, aber weitere Verbesserungen möglich.
                </div>
            `;
        } else {
            assessment = `
                <div class="risk-low">
                    <strong>Niedriges Risiko:</strong> Gute Abdeckung der identifizierten Bedrohungen 
                    durch implementierte Schutzmaßnahmen.
                </div>
            `;
        }
        
        return assessment;
    }
    
    generateRecommendations(threats, systems, mitigations) {
        const recommendations = [];
        
        if (mitigations.length < threats.length) {
            recommendations.push('Implementierung zusätzlicher Schutzmaßnahmen zur besseren Abdeckung der Bedrohungen');
        }
        
        if (systems.length > 5 && mitigations.length < 3) {
            recommendations.push('Bei komplexen Systemlandschaften sollten mindestens grundlegende Schutzmaßnahmen implementiert werden');
        }
        
        recommendations.push('Regelmäßige Überprüfung und Aktualisierung des Bedrohungsmodells');
        recommendations.push('Schulung der Mitarbeiter zu identifizierten Sicherheitsrisiken');
        recommendations.push('Implementierung eines Incident Response Plans');
        
        return recommendations.map(rec => `<li>${rec}</li>`).join('');
    }
    
    exportReport() {
        const reportContent = document.querySelector('.report-content').innerHTML;
        const fullReport = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Bedrohungsmodellierungs-Bericht</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .report-section { margin-bottom: 30px; }
                    .stat-card { display: inline-block; margin: 10px; padding: 15px; border: 1px solid #ddd; }
                    .risk-high { color: #dc2626; }
                    .risk-medium { color: #f59e0b; }
                    .risk-low { color: #10b981; }
                </style>
            </head>
            <body>
                <h1>Bedrohungsmodellierungs-Bericht</h1>
                <p>Generiert am: ${new Date().toLocaleDateString('de-DE')}</p>
                ${reportContent}
            </body>
            </html>
        `;
        
        const blob = new Blob([fullReport], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `threat-model-report-${Date.now()}.html`;
        link.click();
    }
}

// Add CSS for visualization components
const visualizationStyles = `
<style>
.visualization-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.visualization-container.open {
    transform: translateY(0);
}

.visualization-header {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.visualization-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.viz-btn {
    background: white;
    border: 1px solid #d1d5db;
    color: #6b7280;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.viz-btn:hover, .viz-btn.active {
    border-color: #3b82f6;
    color: #3b82f6;
    background: #f8fafc;
}

.visualization-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
}

.network-view {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.network-controls {
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
}

.network-svg {
    flex: 1;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
}

.risk-matrix-view {
    height: 100%;
}

.risk-matrix-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    margin: 1rem 0;
}

.risk-matrix-table {
    border-collapse: collapse;
    width: 100%;
}

.risk-matrix-table th,
.risk-matrix-table td {
    border: 1px solid #d1d5db;
    padding: 1rem;
    text-align: center;
}

.risk-matrix-table th {
    background: #f8fafc;
    font-weight: 600;
}

.risk-cell {
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 80px;
    vertical-align: middle;
}

.risk-cell:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.risk-cell.risk-niedrig {
    background: #dcfce7;
    color: #166534;
}

.risk-cell.risk-mittel {
    background: #fef3c7;
    color: #92400e;
}

.risk-cell.risk-hoch {
    background: #fecaca;
    color: #991b1b;
}

.risk-score {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.threat-count {
    font-size: 0.75rem;
    opacity: 0.8;
}

.risk-legend {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 0.25rem;
}

.legend-color.risk-low {
    background: #dcfce7;
}

.legend-color.risk-medium {
    background: #fef3c7;
}

.legend-color.risk-high {
    background: #fecaca;
}

.report-view {
    height: 100%;
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.report-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #3b82f6;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: #6b7280;
    font-size: 0.875rem;
}

.report-section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.report-section:last-child {
    border-bottom: none;
}

.threat-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.category-breakdown {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
}

.category-breakdown h6 {
    color: #374151;
    margin-bottom: 0.5rem;
}

.category-breakdown ul {
    margin: 0;
    padding-left: 1.5rem;
}

.risk-assessment {
    padding: 1rem;
    border-radius: 0.375rem;
    margin: 1rem 0;
}

.risk-high {
    background: #fef2f2;
    border-left: 4px solid #dc2626;
    color: #991b1b;
}

.risk-medium {
    background: #fffbeb;
    border-left: 4px solid #f59e0b;
    color: #92400e;
}

.risk-low {
    background: #f0fdf4;
    border-left: 4px solid #10b981;
    color: #166534;
}

.recommendations ul {
    padding-left: 1.5rem;
}

.recommendations li {
    margin-bottom: 0.5rem;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', visualizationStyles);

