// BSI Threat Modeling Tool - Simplified DFD Visualization Module
class DFDVisualization {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.dfdElements = [];
        this.dfdConnections = [];
        this.currentLevel = 0;
        this.selectedElement = null;
        
        this.init();
    }
    
    init() {
        this.setupDFDInterface();
        this.setupEventListeners();
    }
    
    setupDFDInterface() {
        // Create DFD visualization container
        const dfdContainer = document.createElement('div');
        dfdContainer.id = 'dfdVisualizationContainer';
        dfdContainer.className = 'dfd-visualization-container';
        dfdContainer.innerHTML = `
            <div class="dfd-header">
                <h3><i class="fas fa-project-diagram"></i> Datenflussdiagramm (DFD)</h3>
                <div class="dfd-controls">
                    <button class="btn-secondary" id="generateDFDBtn">
                        <i class="fas fa-magic"></i> Auto-Generieren
                    </button>
                    <button class="btn-secondary" id="exportDFDBtn">
                        <i class="fas fa-download"></i> Exportieren
                    </button>
                </div>
            </div>
            <div class="dfd-content">
                <div class="dfd-canvas-area">
                    <canvas id="dfdCanvas" width="800" height="600"></canvas>
                </div>
                <div class="dfd-sidebar">
                    <h4>DFD-Elemente</h4>
                    <div class="dfd-element-list">
                        <div class="dfd-element-item" data-type="external-entity">
                            <i class="fas fa-user"></i> Externe Entität
                        </div>
                        <div class="dfd-element-item" data-type="process">
                            <i class="fas fa-cog"></i> Prozess
                        </div>
                        <div class="dfd-element-item" data-type="data-store">
                            <i class="fas fa-database"></i> Datenspeicher
                        </div>
                    </div>
                    <div id="dfdAnalysis">
                        <h4>DFD-Analyse</h4>
                        <div id="dfdAnalysisResults">
                            <p>Erstellen Sie ein DFD, um Analysen zu erhalten.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert into main layout
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.appendChild(dfdContainer);
        }
    }
    
    setupEventListeners() {
        // Generate DFD button
        const generateBtn = document.getElementById('generateDFDBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateAutomaticDFD());
        }
        
        // Export DFD button
        const exportBtn = document.getElementById('exportDFDBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportDFD());
        }
        
        // Canvas setup
        this.setupCanvas();
    }
    
    setupCanvas() {
        const canvas = document.getElementById('dfdCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;
        
        // Set canvas style
        canvas.style.border = '1px solid #e2e8f0';
        canvas.style.background = '#fafafa';
        canvas.style.borderRadius = '0.5rem';
        
        // Initial draw
        this.drawDFD();
    }
    
    generateAutomaticDFD() {
        // Clear existing DFD
        this.dfdElements = [];
        this.dfdConnections = [];
        
        // Generate based on threat model components
        const systems = this.threatTool.currentProject.components.filter(c => 
            c.type === 'system' || c.type === 'application'
        );
        
        if (systems.length === 0) {
            alert('Keine Systemkomponenten gefunden. Fügen Sie zuerst Systeme zum Bedrohungsmodell hinzu.');
            return;
        }
        
        // Create context diagram
        this.createContextDiagram(systems);
        
        // Redraw canvas
        this.drawDFD();
        
        // Update analysis
        this.updateAnalysis();
    }
    
    createContextDiagram(systems) {
        const centerX = 400;
        const centerY = 300;
        
        // Add main system
        this.dfdElements.push({
            id: 'main-system',
            type: 'process',
            name: 'Hauptsystem',
            x: centerX,
            y: centerY,
            threats: []
        });
        
        // Add external entities
        const entities = [
            { name: 'Benutzer', x: centerX - 200, y: centerY - 100 },
            { name: 'Administrator', x: centerX + 200, y: centerY - 100 },
            { name: 'Externe Systeme', x: centerX - 200, y: centerY + 100 },
            { name: 'Überwachung', x: centerX + 200, y: centerY + 100 }
        ];
        
        entities.forEach((entity, index) => {
            const id = `entity-${index}`;
            this.dfdElements.push({
                id: id,
                type: 'external-entity',
                name: entity.name,
                x: entity.x,
                y: entity.y,
                threats: []
            });
            
            // Create data flows
            this.dfdConnections.push({
                id: `flow-${id}-to-main`,
                from: id,
                to: 'main-system',
                label: 'Anfrage',
                classification: 'internal'
            });
            
            this.dfdConnections.push({
                id: `flow-main-to-${id}`,
                from: 'main-system',
                to: id,
                label: 'Antwort',
                classification: 'internal'
            });
        });
        
        // Add data stores
        const stores = [
            { name: 'Benutzerdaten', x: centerX - 100, y: centerY + 150 },
            { name: 'Konfiguration', x: centerX + 100, y: centerY + 150 }
        ];
        
        stores.forEach((store, index) => {
            const id = `store-${index}`;
            this.dfdElements.push({
                id: id,
                type: 'data-store',
                name: store.name,
                x: store.x,
                y: store.y,
                threats: []
            });
            
            // Connect to main system
            this.dfdConnections.push({
                id: `flow-main-to-${id}`,
                from: 'main-system',
                to: id,
                label: 'Schreiben',
                classification: 'confidential'
            });
            
            this.dfdConnections.push({
                id: `flow-${id}-to-main`,
                from: id,
                to: 'main-system',
                label: 'Lesen',
                classification: 'confidential'
            });
        });
    }
    
    drawDFD() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first (behind elements)
        this.dfdConnections.forEach(connection => {
            this.drawConnection(connection);
        });
        
        // Draw elements
        this.dfdElements.forEach(element => {
            this.drawElement(element);
        });
    }
    
    drawElement(element) {
        const ctx = this.ctx;
        const x = element.x;
        const y = element.y;
        
        // Set styles based on element type
        if (element.type === 'external-entity') {
            // Rectangle for external entity
            ctx.fillStyle = '#3b82f620';
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.fillRect(x - 40, y - 20, 80, 40);
            ctx.strokeRect(x - 40, y - 20, 80, 40);
        } else if (element.type === 'process') {
            // Circle for process
            ctx.fillStyle = '#10b98120';
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        } else if (element.type === 'data-store') {
            // Open rectangle for data store
            ctx.fillStyle = '#f59e0b20';
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.fillRect(x - 40, y - 15, 75, 30);
            ctx.strokeRect(x - 40, y - 15, 75, 30);
            // Right line
            ctx.beginPath();
            ctx.moveTo(x + 35, y - 15);
            ctx.lineTo(x + 35, y + 15);
            ctx.stroke();
        }
        
        // Draw label
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(element.name, x, y + 5);
    }
    
    drawConnection(connection) {
        const fromElement = this.dfdElements.find(e => e.id === connection.from);
        const toElement = this.dfdElements.find(e => e.id === connection.to);
        
        if (!fromElement || !toElement) return;
        
        const ctx = this.ctx;
        
        // Set color based on classification
        const colors = {
            'public': '#10b981',
            'internal': '#3b82f6',
            'confidential': '#f59e0b',
            'restricted': '#ef4444'
        };
        
        ctx.strokeStyle = colors[connection.classification] || '#6b7280';
        ctx.lineWidth = 2;
        
        // Draw arrow
        ctx.beginPath();
        ctx.moveTo(fromElement.x, fromElement.y);
        ctx.lineTo(toElement.x, toElement.y);
        ctx.stroke();
        
        // Draw arrowhead
        const angle = Math.atan2(toElement.y - fromElement.y, toElement.x - fromElement.x);
        const headLength = 10;
        
        ctx.beginPath();
        ctx.moveTo(toElement.x, toElement.y);
        ctx.lineTo(
            toElement.x - headLength * Math.cos(angle - Math.PI / 6),
            toElement.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(toElement.x, toElement.y);
        ctx.lineTo(
            toElement.x - headLength * Math.cos(angle + Math.PI / 6),
            toElement.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
        
        // Draw label
        const midX = (fromElement.x + toElement.x) / 2;
        const midY = (fromElement.y + toElement.y) / 2;
        
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(connection.label, midX, midY - 5);
    }
    
    updateAnalysis() {
        const analysisDiv = document.getElementById('dfdAnalysisResults');
        if (!analysisDiv) return;
        
        const elementCount = this.dfdElements.length;
        const connectionCount = this.dfdConnections.length;
        const confidentialFlows = this.dfdConnections.filter(c => 
            c.classification === 'confidential' || c.classification === 'restricted'
        ).length;
        
        // Identify threats
        const threats = this.identifyThreats();
        
        analysisDiv.innerHTML = `
            <div class="dfd-stats">
                <div class="stat-item">
                    <span class="stat-number">${elementCount}</span>
                    <span class="stat-label">Elemente</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${connectionCount}</span>
                    <span class="stat-label">Datenflüsse</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${confidentialFlows}</span>
                    <span class="stat-label">Vertraulich</span>
                </div>
            </div>
            <div class="dfd-threats">
                <h5>Identifizierte Bedrohungen:</h5>
                ${threats.length > 0 ? threats.map(threat => `
                    <div class="threat-item">
                        <strong>${threat.name}</strong>
                        <p>${threat.description}</p>
                        <span class="threat-severity ${threat.severity.toLowerCase()}">${threat.severity}</span>
                    </div>
                `).join('') : '<p>Keine spezifischen Bedrohungen identifiziert.</p>'}
            </div>
        `;
    }
    
    identifyThreats() {
        const threats = [];
        
        // Analyze data flows
        this.dfdConnections.forEach(connection => {
            if (connection.classification === 'confidential' || connection.classification === 'restricted') {
                threats.push({
                    name: 'Datenleckage',
                    description: `Vertrauliche Daten im Fluss "${connection.label}" könnten preisgegeben werden`,
                    severity: 'Hoch',
                    element: connection.id
                });
            }
            
            const fromElement = this.dfdElements.find(e => e.id === connection.from);
            const toElement = this.dfdElements.find(e => e.id === connection.to);
            
            if (fromElement?.type === 'external-entity' || toElement?.type === 'external-entity') {
                threats.push({
                    name: 'Externe Schnittstelle',
                    description: 'Externe Schnittstellen erfordern besondere Sicherheitsmaßnahmen',
                    severity: 'Mittel',
                    element: connection.id
                });
            }
        });
        
        // Analyze elements
        this.dfdElements.forEach(element => {
            if (element.type === 'data-store') {
                threats.push({
                    name: 'Unbefugter Datenzugriff',
                    description: `Datenspeicher "${element.name}" könnte unbefugt zugegriffen werden`,
                    severity: 'Hoch',
                    element: element.id
                });
            }
            
            if (element.type === 'process') {
                threats.push({
                    name: 'Prozess-Manipulation',
                    description: `Prozess "${element.name}" könnte manipuliert werden`,
                    severity: 'Mittel',
                    element: element.id
                });
            }
        });
        
        return threats;
    }
    
    exportDFD() {
        const exportData = {
            timestamp: new Date().toISOString(),
            project: this.threatTool.currentProject.name,
            elements: this.dfdElements,
            connections: this.dfdConnections,
            analysis: this.identifyThreats()
        };
        
        // Export as JSON
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: 'application/json' 
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `dfd-${this.threatTool.currentProject.name}-${Date.now()}.json`;
        link.click();
    }
}

// Add CSS for DFD visualization
const dfdStyles = `
<style>
.dfd-visualization-container {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    margin: 1rem 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dfd-header {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 0.5rem 0.5rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dfd-header h3 {
    margin: 0;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dfd-controls {
    display: flex;
    gap: 0.5rem;
}

.dfd-content {
    display: flex;
    height: 600px;
}

.dfd-canvas-area {
    flex: 1;
    padding: 1rem;
    border-right: 1px solid #e2e8f0;
}

.dfd-sidebar {
    width: 300px;
    padding: 1rem;
    background: #f9fafb;
    overflow-y: auto;
}

.dfd-sidebar h4 {
    margin: 0 0 1rem 0;
    color: #374151;
    font-size: 1rem;
}

.dfd-element-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.dfd-element-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.dfd-element-item:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dfd-element-item i {
    color: #6b7280;
}

.dfd-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    min-width: 60px;
}

.stat-number {
    font-size: 1.25rem;
    font-weight: bold;
    color: #374151;
}

.stat-label {
    font-size: 0.75rem;
    color: #6b7280;
}

.dfd-threats h5 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 600;
}

.threat-item {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    margin-bottom: 0.5rem;
}

.threat-item strong {
    color: #374151;
    display: block;
    margin-bottom: 0.25rem;
}

.threat-item p {
    margin: 0 0 0.5rem 0;
    color: #6b7280;
    font-size: 0.875rem;
}

.threat-severity {
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-weight: 500;
}

.threat-severity.hoch {
    background: #fef2f2;
    color: #991b1b;
}

.threat-severity.mittel {
    background: #fffbeb;
    color: #92400e;
}

.threat-severity.niedrig {
    background: #f0fdf4;
    color: #166534;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', dfdStyles);

