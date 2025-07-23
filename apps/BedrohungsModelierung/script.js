// BSI Threat Modeling Tool - Main JavaScript
class ThreatModelingTool {
    constructor() {
        this.currentProject = {
            id: this.generateId(),
            name: 'Neues Bedrohungsmodell',
            description: '',
            components: [],
            connections: [],
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        
        this.selectedComponent = null;
        this.draggedComponent = null;
        this.isConnecting = false;
        this.connectionStart = null;
        this.zoomLevel = 1;
        this.panOffset = { x: 0, y: 0 };
        this.customComponents = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupCanvas();
        this.loadCustomComponents();
        this.updateProjectStatus();
        
        // Initialize visualization module
        this.visualization = new ThreatVisualization(this);
        
        // Initialize compliance module
        this.complianceManager = new ComplianceManager(this);
        
        // Initialize advanced analysis module
        this.advancedAnalysis = new AdvancedAnalysisEngine(this);
        
        // Initialize automatic risk matrix
        this.autoRiskMatrix = new AutoRiskMatrixEngine(this);
        
        // Initialize DFD visualization
        if (window.DFDVisualization) {
            this.dfdVisualization = new DFDVisualization(this);
        }
        
        // Initialize auto-layout engine
        if (window.AutoLayoutEngine) {
            this.autoLayoutEngine = new AutoLayoutEngine(this);
        }
        
        // Initialize comprehensive report generator
        if (window.ComprehensiveReportGenerator) {
            this.reportGenerator = new ComprehensiveReportGenerator(this);
        }
        
        // Initialize production optimizer
        if (window.ProductionOptimizer) {
            this.productionOptimizer = new ProductionOptimizer(this);
        }
        
        // Make modules globally available
        window.complianceManager = this.complianceManager;
        window.advancedAnalysis = this.advancedAnalysis;
        window.autoRiskMatrix = this.autoRiskMatrix;
        window.dfdVisualization = this.dfdVisualization;
        window.autoLayoutEngine = this.autoLayoutEngine;
        window.reportGenerator = this.reportGenerator;
        window.productionOptimizer = this.productionOptimizer;
    }
    
    generateId() {
        return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('newProjectBtn').addEventListener('click', () => this.newProject());
        document.getElementById('saveProjectBtn').addEventListener('click', () => this.saveProject());
        document.getElementById('loadProjectBtn').addEventListener('click', () => this.loadProject());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportProject());
        
        // Canvas controls
        document.getElementById('zoomInBtn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOutBtn').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetZoomBtn').addEventListener('click', () => this.resetZoom());
        document.getElementById('clearCanvasBtn').addEventListener('click', () => this.clearCanvas());
        
        // Properties panel
        document.getElementById('closePropertiesBtn').addEventListener('click', () => this.closePropertiesPanel());
        
        // Analysis panel
        document.getElementById('runAnalysisBtn').addEventListener('click', () => this.runAnalysis());
        document.getElementById('closeAnalysisBtn').addEventListener('click', () => this.closeAnalysisPanel());
        
        // Custom component modal
        document.getElementById('addCustomComponentBtn').addEventListener('click', () => this.openCustomComponentModal());
        document.getElementById('closeCustomModalBtn').addEventListener('click', () => this.closeCustomComponentModal());
        document.getElementById('cancelCustomBtn').addEventListener('click', () => this.closeCustomComponentModal());
        document.getElementById('customComponentForm').addEventListener('submit', (e) => this.addCustomComponent(e));
        
        // Category toggles
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', () => this.toggleCategory(header.parentElement));
        });
        
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => this.searchComponents(e.target.value));
        
        // Canvas events
        const canvas = document.getElementById('canvas');
        canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        canvas.addEventListener('contextmenu', (e) => this.handleCanvasRightClick(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupDragAndDrop() {
        // Make component items draggable
        document.querySelectorAll('.component-item').forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
        });
        
        // Setup canvas as drop zone
        const canvasContainer = document.querySelector('.canvas-container');
        canvasContainer.addEventListener('dragover', (e) => this.handleDragOver(e));
        canvasContainer.addEventListener('drop', (e) => this.handleDrop(e));
        canvasContainer.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        canvasContainer.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    }
    
    setupCanvas() {
        const canvas = document.getElementById('canvas');
        
        // Add arrow marker for connections
        const defs = canvas.querySelector('defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#6b7280');
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
        
        this.updateCanvasSize();
    }
    
    updateCanvasSize() {
        const container = document.querySelector('.canvas-container');
        const canvas = document.getElementById('canvas');
        
        const rect = container.getBoundingClientRect();
        canvas.setAttribute('width', rect.width);
        canvas.setAttribute('height', rect.height);
    }
    
    handleDragStart(e) {
        this.draggedComponent = {
            type: e.target.dataset.type,
            bsiId: e.target.dataset.bsiId,
            strideCategory: e.target.dataset.stride,
            bsiThreat: e.target.dataset.bsiThreat,
            name: e.target.querySelector('span').textContent,
            icon: e.target.querySelector('i').className
        };
        
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'copy';
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        if (!this.draggedComponent) return;
        
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.addComponentToCanvas(this.draggedComponent, x, y);
        
        // Clean up
        document.querySelectorAll('.component-item').forEach(item => {
            item.classList.remove('dragging');
        });
        this.draggedComponent = null;
    }
    
    addComponentToCanvas(componentData, x, y) {
        const component = {
            id: this.generateId(),
            type: componentData.type,
            name: componentData.name,
            description: this.getComponentDescription(componentData),
            x: x,
            y: y,
            properties: this.getComponentProperties(componentData),
            custom: false
        };
        
        this.currentProject.components.push(component);
        this.renderComponent(component);
        this.updateProjectStatus();
        
        // Dispatch component added event for automatic analysis
        const event = new CustomEvent('componentAdded', {
            detail: { component: component }
        });
        this.canvas.dispatchEvent(event);
    }
    
    getComponentDescription(componentData) {
        const descriptions = {
            'SYS.1.1': 'Allgemeiner Server - Grundlegende Sicherheitsanforderungen für Server-Systeme',
            'SYS.1.2': 'Windows Server - Spezifische Anforderungen für Microsoft Windows Server',
            'SYS.1.3': 'Linux/Unix Server - Sicherheitsanforderungen für Linux und Unix Server',
            'APP.3.2': 'Webserver - Sicherheitsaspekte für Webserver-Anwendungen',
            'APP.4.3': 'Relationale Datenbank - Schutz von Datenbanksystemen',
            'NET.3.2': 'Firewall - Netzwerk-Sicherheitskomponente',
            'spoofing': 'Identitätsfälschung - Vortäuschen einer falschen Identität',
            'tampering': 'Datenmanipulation - Unbefugte Änderung von Daten',
            'repudiation': 'Nichtabstreitbarkeit - Abstreiten durchgeführter Aktionen',
            'information-disclosure': 'Informationsoffenlegung - Unbefugte Preisgabe von Daten',
            'denial-of-service': 'Dienstverweigerung - Verhinderung der Verfügbarkeit',
            'elevation-of-privilege': 'Rechteausweitung - Erlangung höherer Berechtigungen'
        };
        
        return descriptions[componentData.bsiId] || 
               descriptions[componentData.strideCategory] || 
               'Benutzerdefinierte Komponente';
    }
    
    getComponentProperties(componentData) {
        const properties = {};
        
        if (componentData.bsiId) {
            properties.bsiId = componentData.bsiId;
            properties.bsiCategory = this.getBsiCategory(componentData.bsiId);
        }
        
        if (componentData.strideCategory) {
            properties.strideCategory = componentData.strideCategory;
            properties.relatedBsiThreats = this.getRelatedBsiThreats(componentData.strideCategory);
        }
        
        if (componentData.bsiThreat) {
            properties.bsiThreat = componentData.bsiThreat;
        }
        
        return properties;
    }
    
    getBsiCategory(bsiId) {
        const categories = {
            'SYS.1': 'Server',
            'APP.3': 'Netzbasierte Dienste',
            'APP.4': 'Business-Anwendungen',
            'NET.3': 'Netzkomponenten'
        };
        
        const prefix = bsiId.substring(0, 5);
        return categories[prefix] || 'Unbekannt';
    }
    
    getRelatedBsiThreats(strideCategory) {
        const mapping = {
            'spoofing': ['G 0.36', 'G 0.42'],
            'tampering': ['G 0.21', 'G 0.22'],
            'repudiation': ['G 0.37'],
            'information-disclosure': ['G 0.14', 'G 0.19'],
            'denial-of-service': ['G 0.40', 'G 0.25'],
            'elevation-of-privilege': ['G 0.30', 'G 0.32']
        };
        
        return mapping[strideCategory] || [];
    }
    
    renderComponent(component) {
        const canvas = document.getElementById('components');
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', `canvas-component ${component.type}`);
        group.setAttribute('data-id', component.id);
        group.setAttribute('transform', `translate(${component.x}, ${component.y})`);
        
        // Component rectangle
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '120');
        rect.setAttribute('height', '60');
        rect.setAttribute('x', '-60');
        rect.setAttribute('y', '-30');
        
        // Component text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '0');
        text.setAttribute('y', '0');
        text.textContent = this.truncateText(component.name, 15);
        
        group.appendChild(rect);
        group.appendChild(text);
        
        // Add event listeners
        group.addEventListener('click', (e) => this.selectComponent(component.id, e));
        group.addEventListener('mousedown', (e) => this.startDragComponent(component.id, e));
        group.addEventListener('contextmenu', (e) => this.showComponentContextMenu(component.id, e));
        
        canvas.appendChild(group);
    }
    
    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    selectComponent(componentId, event) {
        event.stopPropagation();
        
        // Remove previous selection
        document.querySelectorAll('.canvas-component').forEach(comp => {
            comp.classList.remove('selected');
        });
        
        // Select new component
        const componentElement = document.querySelector(`[data-id="${componentId}"]`);
        componentElement.classList.add('selected');
        
        this.selectedComponent = this.currentProject.components.find(c => c.id === componentId);
        this.showPropertiesPanel();
    }
    
    showPropertiesPanel() {
        const panel = document.getElementById('propertiesPanel');
        const content = document.getElementById('propertiesContent');
        
        if (!this.selectedComponent) {
            content.innerHTML = '<p class="no-selection">Wählen Sie einen Baustein aus, um dessen Eigenschaften zu bearbeiten.</p>';
            panel.classList.remove('open');
            return;
        }
        
        content.innerHTML = this.generatePropertiesForm();
        panel.classList.add('open');
        
        // Add event listeners to form elements
        this.setupPropertiesFormListeners();
    }
    
    generatePropertiesForm() {
        const comp = this.selectedComponent;
        
        return `
            <div class="property-group">
                <label for="propName">Name:</label>
                <input type="text" id="propName" value="${comp.name}">
            </div>
            <div class="property-group">
                <label for="propDescription">Beschreibung:</label>
                <textarea id="propDescription" rows="3">${comp.description}</textarea>
            </div>
            <div class="property-group">
                <label for="propType">Typ:</label>
                <select id="propType">
                    <option value="system" ${comp.type === 'system' ? 'selected' : ''}>System</option>
                    <option value="threat" ${comp.type === 'threat' ? 'selected' : ''}>Bedrohung</option>
                    <option value="mitigation" ${comp.type === 'mitigation' ? 'selected' : ''}>Schutzmaßnahme</option>
                </select>
            </div>
            ${comp.properties.bsiId ? `
                <div class="property-group">
                    <label>BSI-ID:</label>
                    <input type="text" value="${comp.properties.bsiId}" readonly>
                </div>
            ` : ''}
            ${comp.properties.strideCategory ? `
                <div class="property-group">
                    <label>STRIDE-Kategorie:</label>
                    <input type="text" value="${comp.properties.strideCategory}" readonly>
                </div>
            ` : ''}
            <div class="property-group">
                <button type="button" class="btn-primary" onclick="threatTool.deleteComponent('${comp.id}')">
                    <i class="fas fa-trash"></i> Löschen
                </button>
            </div>
        `;
    }
    
    setupPropertiesFormListeners() {
        const nameInput = document.getElementById('propName');
        const descInput = document.getElementById('propDescription');
        const typeSelect = document.getElementById('propType');
        
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.selectedComponent.name = e.target.value;
                this.updateComponentDisplay(this.selectedComponent.id);
                this.updateProjectStatus();
            });
        }
        
        if (descInput) {
            descInput.addEventListener('input', (e) => {
                this.selectedComponent.description = e.target.value;
                this.updateProjectStatus();
            });
        }
        
        if (typeSelect) {
            typeSelect.addEventListener('change', (e) => {
                this.selectedComponent.type = e.target.value;
                this.updateComponentDisplay(this.selectedComponent.id);
                this.updateProjectStatus();
            });
        }
    }
    
    updateComponentDisplay(componentId) {
        const component = this.currentProject.components.find(c => c.id === componentId);
        const element = document.querySelector(`[data-id="${componentId}"]`);
        
        if (element && component) {
            // Update class
            element.className = `canvas-component ${component.type}`;
            if (this.selectedComponent && this.selectedComponent.id === componentId) {
                element.classList.add('selected');
            }
            
            // Update text
            const text = element.querySelector('text');
            text.textContent = this.truncateText(component.name, 15);
        }
    }
    
    deleteComponent(componentId) {
        // Remove from project
        this.currentProject.components = this.currentProject.components.filter(c => c.id !== componentId);
        
        // Remove connections
        this.currentProject.connections = this.currentProject.connections.filter(
            conn => conn.sourceComponentId !== componentId && conn.targetComponentId !== componentId
        );
        
        // Remove from canvas
        const element = document.querySelector(`[data-id="${componentId}"]`);
        if (element) {
            element.remove();
        }
        
        // Clear selection if this component was selected
        if (this.selectedComponent && this.selectedComponent.id === componentId) {
            this.selectedComponent = null;
            this.closePropertiesPanel();
        }
        
        this.updateProjectStatus();
        this.renderConnections();
    }
    
    closePropertiesPanel() {
        document.getElementById('propertiesPanel').classList.remove('open');
        document.querySelectorAll('.canvas-component').forEach(comp => {
            comp.classList.remove('selected');
        });
        this.selectedComponent = null;
    }
    
    handleCanvasClick(e) {
        if (e.target.id === 'canvas' || e.target.tagName === 'rect' && e.target.getAttribute('fill') === 'url(#grid)') {
            this.closePropertiesPanel();
        }
    }
    
    toggleCategory(categoryElement) {
        categoryElement.classList.toggle('collapsed');
    }
    
    searchComponents(query) {
        const items = document.querySelectorAll('.component-item');
        const lowerQuery = query.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(lowerQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    newProject() {
        if (confirm('Möchten Sie ein neues Projekt erstellen? Ungespeicherte Änderungen gehen verloren.')) {
            this.currentProject = {
                id: this.generateId(),
                name: 'Neues Bedrohungsmodell',
                description: '',
                components: [],
                connections: [],
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString()
            };
            
            this.clearCanvas();
            this.closePropertiesPanel();
            this.updateProjectStatus();
            document.getElementById('projectTitle').textContent = this.currentProject.name;
        }
    }
    
    saveProject() {
        this.currentProject.lastModified = new Date().toISOString();
        
        const dataStr = JSON.stringify(this.currentProject, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `${this.currentProject.name.replace(/[^a-z0-9]/gi, '_')}.json`;
        link.click();
        
        this.updateProjectStatus('Gespeichert');
    }
    
    loadProject() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const project = JSON.parse(e.target.result);
                    this.currentProject = project;
                    this.loadProjectToCanvas();
                    this.updateProjectStatus('Geladen');
                    document.getElementById('projectTitle').textContent = this.currentProject.name;
                } catch (error) {
                    alert('Fehler beim Laden der Datei: ' + error.message);
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    loadProjectToCanvas() {
        this.clearCanvas();
        
        // Render components
        this.currentProject.components.forEach(component => {
            this.renderComponent(component);
        });
        
        // Render connections
        this.renderConnections();
    }
    
    exportProject() {
        // Create a comprehensive report
        const report = this.generateThreatReport();
        
        const dataStr = report;
        const dataBlob = new Blob([dataStr], { type: 'text/plain' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `${this.currentProject.name.replace(/[^a-z0-9]/gi, '_')}_report.txt`;
        link.click();
    }
    
    generateThreatReport() {
        const project = this.currentProject;
        const date = new Date().toLocaleDateString('de-DE');
        
        let report = `BEDROHUNGSMODELLIERUNGS-BERICHT\n`;
        report += `=====================================\n\n`;
        report += `Projekt: ${project.name}\n`;
        report += `Erstellt am: ${new Date(project.createdAt).toLocaleDateString('de-DE')}\n`;
        report += `Bericht generiert am: ${date}\n\n`;
        
        report += `BESCHREIBUNG\n`;
        report += `------------\n`;
        report += `${project.description || 'Keine Beschreibung verfügbar'}\n\n`;
        
        report += `KOMPONENTEN (${project.components.length})\n`;
        report += `------------------\n`;
        project.components.forEach((comp, index) => {
            report += `${index + 1}. ${comp.name}\n`;
            report += `   Typ: ${comp.type}\n`;
            report += `   Beschreibung: ${comp.description}\n`;
            if (comp.properties.bsiId) {
                report += `   BSI-ID: ${comp.properties.bsiId}\n`;
            }
            if (comp.properties.strideCategory) {
                report += `   STRIDE: ${comp.properties.strideCategory}\n`;
            }
            report += `\n`;
        });
        
        // Analyze threats
        const threats = project.components.filter(c => c.type === 'threat' || c.type === 'bsi-threat');
        const systems = project.components.filter(c => c.type === 'system');
        const mitigations = project.components.filter(c => c.type === 'mitigation');
        
        report += `BEDROHUNGSANALYSE\n`;
        report += `-----------------\n`;
        report += `Identifizierte Bedrohungen: ${threats.length}\n`;
        report += `Betroffene Systeme: ${systems.length}\n`;
        report += `Schutzmaßnahmen: ${mitigations.length}\n\n`;
        
        if (threats.length > 0) {
            report += `IDENTIFIZIERTE BEDROHUNGEN:\n`;
            threats.forEach((threat, index) => {
                report += `${index + 1}. ${threat.name}\n`;
                report += `   ${threat.description}\n\n`;
            });
        }
        
        report += `EMPFEHLUNGEN\n`;
        report += `------------\n`;
        report += `1. Regelmäßige Überprüfung der Bedrohungsmodelle\n`;
        report += `2. Implementierung angemessener Schutzmaßnahmen\n`;
        report += `3. Schulung der Mitarbeiter zu Sicherheitsrisiken\n`;
        report += `4. Kontinuierliche Überwachung der Systeme\n\n`;
        
        report += `Dieser Bericht wurde automatisch generiert vom BSI Threat Modeling Tool.\n`;
        
        return report;
    }
    
    clearCanvas() {
        document.getElementById('components').innerHTML = '';
        document.getElementById('connections').innerHTML = '';
    }
    
    renderConnections() {
        const connectionsGroup = document.getElementById('connections');
        connectionsGroup.innerHTML = '';
        
        this.currentProject.connections.forEach(connection => {
            this.renderConnection(connection);
        });
    }
    
    renderConnection(connection) {
        const sourceComp = this.currentProject.components.find(c => c.id === connection.sourceComponentId);
        const targetComp = this.currentProject.components.find(c => c.id === connection.targetComponentId);
        
        if (!sourceComp || !targetComp) return;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', `connection-line ${connection.type}`);
        line.setAttribute('x1', sourceComp.x);
        line.setAttribute('y1', sourceComp.y);
        line.setAttribute('x2', targetComp.x);
        line.setAttribute('y2', targetComp.y);
        
        document.getElementById('connections').appendChild(line);
    }
    
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel * 1.2, 3);
        this.updateCanvasTransform();
    }
    
    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel / 1.2, 0.3);
        this.updateCanvasTransform();
    }
    
    resetZoom() {
        this.zoomLevel = 1;
        this.panOffset = { x: 0, y: 0 };
        this.updateCanvasTransform();
    }
    
    updateCanvasTransform() {
        const canvas = document.getElementById('canvas');
        canvas.style.transform = `scale(${this.zoomLevel}) translate(${this.panOffset.x}px, ${this.panOffset.y}px)`;
    }
    
    runAnalysis() {
        const panel = document.getElementById('analysisPanel');
        const content = document.getElementById('analysisContent');
        
        // Simulate analysis
        content.innerHTML = '<div class="loading">Analyse wird durchgeführt...</div>';
        panel.classList.add('open');
        
        setTimeout(() => {
            const analysisResult = this.performThreatAnalysis();
            content.innerHTML = analysisResult;
        }, 1500);
    }
    
    performThreatAnalysis() {
        const threats = this.currentProject.components.filter(c => c.type === 'threat' || c.type === 'bsi-threat');
        const systems = this.currentProject.components.filter(c => c.type === 'system');
        const mitigations = this.currentProject.components.filter(c => c.type === 'mitigation');
        
        let analysis = '<div class="analysis-results">';
        analysis += '<h4>Analyseergebnisse</h4>';
        
        // Risk assessment
        const riskLevel = this.calculateRiskLevel(threats.length, systems.length, mitigations.length);
        analysis += `<div class="risk-assessment">`;
        analysis += `<h5>Risikobewertung: <span class="risk-${riskLevel.level}">${riskLevel.label}</span></h5>`;
        analysis += `<p>${riskLevel.description}</p>`;
        analysis += `</div>`;
        
        // Statistics
        analysis += '<div class="analysis-stats">';
        analysis += `<div class="stat"><strong>Bedrohungen:</strong> ${threats.length}</div>`;
        analysis += `<div class="stat"><strong>Systeme:</strong> ${systems.length}</div>`;
        analysis += `<div class="stat"><strong>Schutzmaßnahmen:</strong> ${mitigations.length}</div>`;
        analysis += '</div>';
        
        // Recommendations
        analysis += '<div class="recommendations">';
        analysis += '<h5>Empfehlungen:</h5>';
        analysis += '<ul>';
        
        if (mitigations.length < threats.length) {
            analysis += '<li>Zusätzliche Schutzmaßnahmen implementieren</li>';
        }
        
        if (threats.length > systems.length * 2) {
            analysis += '<li>Bedrohungsmodell überprüfen und konsolidieren</li>';
        }
        
        analysis += '<li>Regelmäßige Sicherheitsschulungen durchführen</li>';
        analysis += '<li>Incident Response Plan erstellen</li>';
        analysis += '</ul>';
        analysis += '</div>';
        
        analysis += '</div>';
        
        return analysis;
    }
    
    calculateRiskLevel(threatCount, systemCount, mitigationCount) {
        const ratio = threatCount / Math.max(mitigationCount, 1);
        
        if (ratio > 2) {
            return {
                level: 'high',
                label: 'Hoch',
                description: 'Viele Bedrohungen mit wenigen Schutzmaßnahmen identifiziert.'
            };
        } else if (ratio > 1) {
            return {
                level: 'medium',
                label: 'Mittel',
                description: 'Ausgewogenes Verhältnis zwischen Bedrohungen und Schutzmaßnahmen.'
            };
        } else {
            return {
                level: 'low',
                label: 'Niedrig',
                description: 'Gute Abdeckung der Bedrohungen durch Schutzmaßnahmen.'
            };
        }
    }
    
    closeAnalysisPanel() {
        document.getElementById('analysisPanel').classList.remove('open');
    }
    
    openCustomComponentModal() {
        document.getElementById('customComponentModal').classList.add('open');
    }
    
    closeCustomComponentModal() {
        document.getElementById('customComponentModal').classList.remove('open');
        document.getElementById('customComponentForm').reset();
    }
    
    addCustomComponent(e) {
        e.preventDefault();
        
        const name = document.getElementById('customName').value;
        const type = document.getElementById('customType').value;
        const description = document.getElementById('customDescription').value;
        const icon = document.getElementById('customIcon').value || 'fas fa-cog';
        
        const customComponent = {
            id: this.generateId(),
            name: name,
            type: type,
            description: description,
            icon: icon,
            custom: true
        };
        
        this.customComponents.push(customComponent);
        this.addCustomComponentToSidebar(customComponent);
        this.saveCustomComponents();
        this.closeCustomComponentModal();
    }
    
    addCustomComponentToSidebar(component) {
        const customCategory = document.querySelector('[data-category="custom"] .category-content');
        const addButton = customCategory.querySelector('.add-custom-btn');
        
        const item = document.createElement('div');
        item.className = `component-item ${component.type}-item`;
        item.draggable = true;
        item.dataset.type = component.type;
        item.innerHTML = `
            <i class="${component.icon}"></i>
            <span>${component.name}</span>
        `;
        
        item.addEventListener('dragstart', (e) => this.handleDragStart(e));
        
        customCategory.insertBefore(item, addButton);
    }
    
    saveCustomComponents() {
        localStorage.setItem('bsi-threat-tool-custom-components', JSON.stringify(this.customComponents));
    }
    
    loadCustomComponents() {
        const saved = localStorage.getItem('bsi-threat-tool-custom-components');
        if (saved) {
            this.customComponents = JSON.parse(saved);
            this.customComponents.forEach(comp => this.addCustomComponentToSidebar(comp));
        }
    }
    
    updateProjectStatus(status = 'Nicht gespeichert') {
        document.getElementById('projectStatus').textContent = status;
        this.currentProject.lastModified = new Date().toISOString();
    }
    
    handleKeyboard(e) {
        // Ctrl+S for save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            this.saveProject();
        }
        
        // Ctrl+N for new project
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            this.newProject();
        }
        
        // Delete key for selected component
        if (e.key === 'Delete' && this.selectedComponent) {
            this.deleteComponent(this.selectedComponent.id);
        }
        
        // Escape to close panels
        if (e.key === 'Escape') {
            this.closePropertiesPanel();
            this.closeAnalysisPanel();
            this.closeCustomComponentModal();
        }
    }
    
    handleResize() {
        this.updateCanvasSize();
    }
}

// Initialize the tool when the page loads
let threatTool;
document.addEventListener('DOMContentLoaded', () => {
    threatTool = new ThreatModelingTool();
});

// Add some additional CSS for analysis results
const additionalStyles = `
<style>
.analysis-results {
    font-size: 0.875rem;
}

.analysis-results h4 {
    color: #1e293b;
    margin-bottom: 1rem;
    font-size: 1.125rem;
}

.analysis-results h5 {
    color: #374151;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.risk-assessment {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    border-left: 4px solid #3b82f6;
}

.risk-high {
    color: #dc2626;
    font-weight: 600;
}

.risk-medium {
    color: #d97706;
    font-weight: 600;
}

.risk-low {
    color: #059669;
    font-weight: 600;
}

.analysis-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.stat {
    background: white;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    text-align: center;
}

.recommendations {
    background: #f0f9ff;
    padding: 1rem;
    border-radius: 0.375rem;
    border-left: 4px solid #0ea5e9;
}

.recommendations ul {
    margin: 0.5rem 0 0 1.5rem;
}

.recommendations li {
    margin-bottom: 0.25rem;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

