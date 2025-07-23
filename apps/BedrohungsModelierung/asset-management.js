// BSI Threat Modeling Tool - Asset Management Module
// Frontend-Funktionalität für die assetorientierte Modellierung

class AssetManager {
  constructor() {
    this.selectedAsset = null;
    this.assetRadarChart = null;
    this.assetCanvas = null;
    this.assetConnections = [];
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
  }

  // Initialisierung des Asset-Managers
  init() {
    this.setupAssetTab();
    this.populateAssets();
    this.initializeAssetCanvas();
    this.initializeAssetDragAndDrop();
    this.initializeAssetRadarChart();
    this.setupAssetEventListeners();
    this.loadAssetDataFromStorage();
  }

  // Asset-Tab Setup
  setupAssetTab() {
    // Asset-Tab HTML dynamisch hinzufügen, falls nicht vorhanden
    const tabsContainer = document.querySelector('.tabs');
    if (tabsContainer && !document.querySelector('[data-tab="assets"]')) {
      const assetTabBtn = document.createElement('button');
      assetTabBtn.className = 'tab-btn';
      assetTabBtn.setAttribute('data-tab', 'assets');
      assetTabBtn.textContent = 'Assets';
      tabsContainer.appendChild(assetTabBtn);

      // Asset-Tab Content hinzufügen
      const mainContainer = document.querySelector('.container');
      const assetTabContent = document.createElement('div');
      assetTabContent.id = 'assets-tab';
      assetTabContent.className = 'tab-content';
      assetTabContent.innerHTML = this.getAssetTabHTML();
      mainContainer.appendChild(assetTabContent);

      // Tab-Event-Listener hinzufügen
      assetTabBtn.addEventListener('click', () => {
        this.switchToAssetTab();
      });
    }
  }

  // HTML-Template für Asset-Tab
  getAssetTabHTML() {
    return `
      <div class="asset-dashboard">
        <div class="asset-canvas-container">
          <h2>Asset-Modellierung</h2>
          <div class="asset-toolbar">
            <button id="asset-auto-layout" class="btn success">
              <i class="fas fa-magic"></i> Auto-Layout
            </button>
            <button id="asset-clear-canvas" class="btn warning">
              <i class="fas fa-eraser"></i> Canvas leeren
            </button>
            <button id="asset-export-model" class="btn">
              <i class="fas fa-download"></i> Modell exportieren
            </button>
            <div class="asset-view-controls">
              <label>
                <input type="checkbox" id="show-connections" checked> Verbindungen anzeigen
              </label>
              <label>
                <input type="checkbox" id="show-risk-colors" checked> Risiko-Farben
              </label>
            </div>
          </div>
          <div class="asset-canvas-wrapper">
            <canvas id="asset-canvas" width="800" height="600"></canvas>
          </div>
          <div class="asset-legend">
            <div class="legend-item">
              <span class="legend-color asset-critical"></span>Kritisch (Stufe 3)
            </div>
            <div class="legend-item">
              <span class="legend-color asset-medium"></span>Mittel (Stufe 2)
            </div>
            <div class="legend-item">
              <span class="legend-color asset-low"></span>Niedrig (Stufe 1)
            </div>
          </div>
        </div>

        <div class="asset-details-panel">
          <h2>Asset-Details</h2>
          <div id="asset-detail-content">
            <p>Wählen Sie ein Asset aus der Liste oder Canvas</p>
          </div>
          <div id="asset-detail-actions" style="display: none;">
            <button id="btn-edit-asset" class="btn">
              <i class="fas fa-edit"></i> Bearbeiten
            </button>
            <button id="btn-delete-asset" class="btn danger">
              <i class="fas fa-trash"></i> Löschen
            </button>
            <button id="btn-link-threats" class="btn">
              <i class="fas fa-link"></i> Bedrohungen verknüpfen
            </button>
          </div>
          <div class="asset-cia-chart">
            <h3>CIA-Bewertung</h3>
            <canvas id="assetRadarChart"></canvas>
          </div>
          <div class="asset-threat-list">
            <h3>Zugeordnete Bedrohungen</h3>
            <div id="asset-threats"></div>
          </div>
          <div class="asset-control-list">
            <h3>Schutzmaßnahmen</h3>
            <div id="asset-controls"></div>
          </div>
        </div>
      </div>

      <div class="asset-management-section">
        <h2>Asset-Verwaltung</h2>
        <div class="asset-filter-container">
          <div class="asset-filter-buttons">
            <button class="asset-filter-btn active" data-filter="all">Alle Assets</button>
            <button class="asset-filter-btn" data-filter="server">Server</button>
            <button class="asset-filter-btn" data-filter="database">Datenbanken</button>
            <button class="asset-filter-btn" data-filter="application">Anwendungen</button>
            <button class="asset-filter-btn" data-filter="data">Daten</button>
            <button class="asset-filter-btn" data-filter="network">Netzwerk</button>
          </div>
          <div class="asset-criticality-filters">
            <button class="criticality-filter-btn active" data-criticality="all">Alle Kritikalitäten</button>
            <button class="criticality-filter-btn" data-criticality="3">Kritisch</button>
            <button class="criticality-filter-btn" data-criticality="2">Mittel</button>
            <button class="criticality-filter-btn" data-criticality="1">Niedrig</button>
          </div>
        </div>
        <div class="asset-search-box">
          <input type="text" id="asset-search" placeholder="Asset suchen...">
          <button id="asset-search-btn"><i class="fas fa-search"></i></button>
        </div>
        <div class="assets-list" id="assets-list"></div>
        <button id="add-asset" class="btn success">
          <i class="fas fa-plus"></i> Neues Asset
        </button>
      </div>

      <!-- Asset Modal -->
      <div id="asset-modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Asset bearbeiten</h2>
          <form id="asset-form">
            <div class="form-group">
              <label for="asset-id">ID:</label>
              <input type="text" id="asset-id" readonly>
            </div>
            <div class="form-group">
              <label for="asset-name">Name:</label>
              <input type="text" id="asset-name" required>
            </div>
            <div class="form-group">
              <label for="asset-description">Beschreibung:</label>
              <textarea id="asset-description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="asset-type">Typ:</label>
              <select id="asset-type" required>
                <option value="server">Server</option>
                <option value="database">Datenbank</option>
                <option value="application">Anwendung</option>
                <option value="network">Netzwerk</option>
                <option value="data">Daten</option>
                <option value="personnel">Personal</option>
                <option value="facility">Einrichtung</option>
                <option value="device">Gerät</option>
              </select>
            </div>
            <div class="form-group">
              <label for="asset-criticality">Kritikalität (1-3):</label>
              <input type="number" id="asset-criticality" min="1" max="3" required>
            </div>
            <div class="form-group">
              <label for="asset-owner">Verantwortlicher:</label>
              <input type="text" id="asset-owner">
            </div>
            <div class="form-group">
              <label for="asset-location">Standort:</label>
              <input type="text" id="asset-location">
            </div>
            <h3>CIA-Bewertung</h3>
            <div class="cia-form-sliders" id="cia-form-sliders">
              <div class="form-group">
                <label for="cia-confidentiality">Vertraulichkeit (1-10): <span id="conf-value">5</span></label>
                <input type="range" id="cia-confidentiality" min="1" max="10" value="5">
              </div>
              <div class="form-group">
                <label for="cia-integrity">Integrität (1-10): <span id="int-value">5</span></label>
                <input type="range" id="cia-integrity" min="1" max="10" value="5">
              </div>
              <div class="form-group">
                <label for="cia-availability">Verfügbarkeit (1-10): <span id="avail-value">5</span></label>
                <input type="range" id="cia-availability" min="1" max="10" value="5">
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn success">Speichern</button>
              <button type="button" class="btn" id="cancel-asset-form">Abbrechen</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Threat Linking Modal -->
      <div id="threat-linking-modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Bedrohungen verknüpfen</h2>
          <div class="threat-linking-content">
            <div class="available-threats">
              <h3>Verfügbare Bedrohungen</h3>
              <div id="available-threats-list"></div>
            </div>
            <div class="linked-threats">
              <h3>Verknüpfte Bedrohungen</h3>
              <div id="linked-threats-list"></div>
            </div>
          </div>
          <div class="form-actions">
            <button id="save-threat-links" class="btn success">Speichern</button>
            <button id="cancel-threat-links" class="btn">Abbrechen</button>
          </div>
        </div>
      </div>
    `;
  }

  // Asset-Liste befüllen
  populateAssets() {
    const assetsList = document.getElementById('assets-list');
    if (!assetsList) return;

    assetsList.innerHTML = '';

    allAssets.forEach(asset => {
      const assetElement = document.createElement('div');
      assetElement.className = `asset-item ${asset.type} criticality-${asset.criticality}`;
      assetElement.dataset.id = asset.id;
      assetElement.innerHTML = `
        <div class="asset-header">
          <span class="asset-id">${asset.id}</span>
          <span class="asset-criticality-badge">${asset.criticality}</span>
        </div>
        <div class="asset-name">${asset.name}</div>
        <div class="asset-type">${assetTypes[asset.type] || asset.type}</div>
        <div class="asset-owner">${asset.owner}</div>
      `;

      assetElement.addEventListener('click', () => {
        this.selectAsset(asset);
      });

      assetElement.addEventListener('dblclick', () => {
        this.addAssetToCanvas(asset);
      });

      assetsList.appendChild(assetElement);
    });
  }

  // Asset-Canvas initialisieren
  initializeAssetCanvas() {
    this.assetCanvas = document.getElementById('asset-canvas');
    if (!this.assetCanvas) return;

    this.ctx = this.assetCanvas.getContext('2d');
    this.renderAssetCanvas();

    // Canvas-Event-Listener
    this.assetCanvas.addEventListener('click', (e) => {
      this.handleCanvasClick(e);
    });

    this.assetCanvas.addEventListener('mousedown', (e) => {
      this.handleCanvasMouseDown(e);
    });

    this.assetCanvas.addEventListener('mousemove', (e) => {
      this.handleCanvasMouseMove(e);
    });

    this.assetCanvas.addEventListener('mouseup', (e) => {
      this.handleCanvasMouseUp(e);
    });
  }

  // Asset-Canvas rendern
  renderAssetCanvas() {
    if (!this.ctx) return;

    // Canvas leeren
    this.ctx.clearRect(0, 0, this.assetCanvas.width, this.assetCanvas.height);

    // Hintergrund
    this.ctx.fillStyle = '#f9f9f9';
    this.ctx.fillRect(0, 0, this.assetCanvas.width, this.assetCanvas.height);

    // Grid zeichnen
    this.drawGrid();

    // Verbindungen zeichnen (falls aktiviert)
    if (document.getElementById('show-connections')?.checked) {
      this.drawConnections();
    }

    // Assets zeichnen
    allAssets.forEach(asset => {
      if (asset.position) {
        this.drawAsset(asset);
      }
    });
  }

  // Grid zeichnen
  drawGrid() {
    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.lineWidth = 1;

    // Vertikale Linien
    for (let x = 0; x <= this.assetCanvas.width; x += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.assetCanvas.height);
      this.ctx.stroke();
    }

    // Horizontale Linien
    for (let y = 0; y <= this.assetCanvas.height; y += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.assetCanvas.width, y);
      this.ctx.stroke();
    }
  }

  // Asset auf Canvas zeichnen
  drawAsset(asset) {
    const { x, y } = asset.position;
    const size = 60;
    const halfSize = size / 2;

    // Farbe basierend auf Kritikalität oder Risiko
    let color = '#4CAF50'; // Niedrig
    if (document.getElementById('show-risk-colors')?.checked) {
      const risk = calculateAssetRisk(asset);
      if (risk.assetRisk > 6) color = '#F44336'; // Hoch
      else if (risk.assetRisk > 3) color = '#FF9800'; // Mittel
    } else {
      if (asset.criticality === 3) color = '#F44336';
      else if (asset.criticality === 2) color = '#FF9800';
    }

    // Asset-Box zeichnen
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - halfSize, y - halfSize, size, size);

    // Border
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 2;
    if (this.selectedAsset && this.selectedAsset.id === asset.id) {
      this.ctx.strokeStyle = '#2196F3';
      this.ctx.lineWidth = 3;
    }
    this.ctx.strokeRect(x - halfSize, y - halfSize, size, size);

    // Asset-ID
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(asset.id, x, y - 10);

    // Asset-Name (gekürzt)
    const shortName = asset.name.length > 10 ? asset.name.substring(0, 10) + '...' : asset.name;
    this.ctx.fillText(shortName, x, y + 5);

    // Asset-Typ Icon
    this.ctx.fillText(this.getAssetTypeIcon(asset.type), x, y + 20);
  }

  // Asset-Typ Icon
  getAssetTypeIcon(type) {
    const icons = {
      server: '🖥️',
      database: '🗄️',
      application: '📱',
      network: '🌐',
      data: '📄',
      personnel: '👤',
      facility: '🏢',
      device: '💻'
    };
    return icons[type] || '📦';
  }

  // Verbindungen zwischen Assets zeichnen
  drawConnections() {
    allAssets.forEach(asset => {
      if (!asset.position) return;

      // Verbindungen zu verwandten Assets basierend auf gemeinsamen Bedrohungen
      allAssets.forEach(otherAsset => {
        if (asset.id === otherAsset.id || !otherAsset.position) return;

        const commonThreats = asset.associatedThreats.filter(threatId =>
          otherAsset.associatedThreats.includes(threatId)
        );

        if (commonThreats.length > 0) {
          this.drawConnection(asset.position, otherAsset.position, commonThreats.length);
        }
      });
    });
  }

  // Verbindung zwischen zwei Punkten zeichnen
  drawConnection(pos1, pos2, strength) {
    this.ctx.strokeStyle = `rgba(33, 150, 243, ${Math.min(strength * 0.3, 1)})`;
    this.ctx.lineWidth = Math.min(strength, 5);
    this.ctx.beginPath();
    this.ctx.moveTo(pos1.x, pos1.y);
    this.ctx.lineTo(pos2.x, pos2.y);
    this.ctx.stroke();
  }

  // Canvas-Klick behandeln
  handleCanvasClick(e) {
    const rect = this.assetCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Prüfen, ob ein Asset geklickt wurde
    const clickedAsset = this.getAssetAtPosition(x, y);
    if (clickedAsset) {
      this.selectAsset(clickedAsset);
    } else {
      this.selectedAsset = null;
      this.updateAssetDetails();
    }

    this.renderAssetCanvas();
  }

  // Asset an Position finden
  getAssetAtPosition(x, y) {
    return allAssets.find(asset => {
      if (!asset.position) return false;
      const dx = x - asset.position.x;
      const dy = y - asset.position.y;
      return Math.abs(dx) <= 30 && Math.abs(dy) <= 30;
    });
  }

  // Asset auswählen
  selectAsset(asset) {
    this.selectedAsset = asset;
    this.updateAssetDetails();
    this.updateAssetRadarChart();
    this.renderAssetCanvas();

    // Asset in der Liste markieren
    document.querySelectorAll('.asset-item').forEach(item => {
      item.classList.remove('selected');
    });
    const assetElement = document.querySelector(`[data-id="${asset.id}"]`);
    if (assetElement) {
      assetElement.classList.add('selected');
    }
  }

  // Asset-Details aktualisieren
  updateAssetDetails() {
    const detailContent = document.getElementById('asset-detail-content');
    const detailActions = document.getElementById('asset-detail-actions');

    if (!this.selectedAsset) {
      detailContent.innerHTML = '<p>Wählen Sie ein Asset aus der Liste oder Canvas</p>';
      detailActions.style.display = 'none';
      return;
    }

    const asset = this.selectedAsset;
    const risk = calculateAssetRisk(asset);
    const ciaScore = calculateAssetCIAScore(asset);

    detailContent.innerHTML = `
      <div class="asset-info">
        <h3>${asset.name} (${asset.id})</h3>
        <p><strong>Typ:</strong> ${assetTypes[asset.type] || asset.type}</p>
        <p><strong>Beschreibung:</strong> ${asset.description}</p>
        <p><strong>Kritikalität:</strong> ${asset.criticality}/3</p>
        <p><strong>Verantwortlicher:</strong> ${asset.owner}</p>
        <p><strong>Standort:</strong> ${asset.location}</p>
        <p><strong>Asset-Risiko:</strong> ${risk.assetRisk.toFixed(2)}</p>
        <p><strong>CIA-Gesamtscore:</strong> ${ciaScore.total}/30</p>
      </div>
    `;

    detailActions.style.display = 'flex';

    // Bedrohungen anzeigen
    this.updateAssetThreats();
    this.updateAssetControls();
  }

  // Zugeordnete Bedrohungen anzeigen
  updateAssetThreats() {
    const threatsContainer = document.getElementById('asset-threats');
    if (!threatsContainer || !this.selectedAsset) return;

    threatsContainer.innerHTML = '';

    this.selectedAsset.associatedThreats.forEach(threatId => {
      const threat = allThreats.find(t => t.id === threatId);
      if (threat) {
        const threatElement = document.createElement('div');
        threatElement.className = 'asset-threat-item';
        threatElement.innerHTML = `
          <span class="threat-id">${threat.id}</span>
          <span class="threat-name">${threat.name}</span>
          <span class="threat-risk">${getRiskLevel(threat.position.row, threat.position.col)}</span>
        `;
        threatsContainer.appendChild(threatElement);
      }
    });

    if (this.selectedAsset.associatedThreats.length === 0) {
      threatsContainer.innerHTML = '<p>Keine Bedrohungen zugeordnet</p>';
    }
  }

  // Schutzmaßnahmen anzeigen
  updateAssetControls() {
    const controlsContainer = document.getElementById('asset-controls');
    if (!controlsContainer || !this.selectedAsset) return;

    controlsContainer.innerHTML = '';

    this.selectedAsset.associatedControls.forEach(controlId => {
      const control = securityControls.find(c => c.id === controlId);
      if (control) {
        const controlElement = document.createElement('div');
        controlElement.className = 'asset-control-item';
        controlElement.innerHTML = `
          <span class="control-id">${control.id}</span>
          <span class="control-name">${control.name}</span>
          <span class="control-type">${control.type}</span>
        `;
        controlsContainer.appendChild(controlElement);
      }
    });

    if (this.selectedAsset.associatedControls.length === 0) {
      controlsContainer.innerHTML = '<p>Keine Schutzmaßnahmen zugeordnet</p>';
    }
  }

  // Asset-Radar-Chart initialisieren
  initializeAssetRadarChart() {
    if (!Chart) return;

    const ctx = document.getElementById('assetRadarChart');
    if (!ctx) return;

    this.assetRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: Object.values(ciaDimensions),
        datasets: [{
          label: 'CIA-Bewertung',
          data: [0, 0, 0],
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: 'rgb(33, 150, 243)',
          pointBackgroundColor: 'rgb(33, 150, 243)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(33, 150, 243)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 10,
            ticks: { stepSize: 2 }
          }
        }
      }
    });
  }

  // Asset-Radar-Chart aktualisieren
  updateAssetRadarChart() {
    if (!this.assetRadarChart || !this.selectedAsset) return;

    const { confidentiality, integrity, availability } = this.selectedAsset.cia;
    this.assetRadarChart.data.datasets[0].data = [confidentiality, integrity, availability];
    this.assetRadarChart.update();
  }

  // Event-Listener einrichten
  setupAssetEventListeners() {
    // Auto-Layout Button
    document.getElementById('asset-auto-layout')?.addEventListener('click', () => {
      this.autoLayoutAssets();
    });

    // Canvas leeren Button
    document.getElementById('asset-clear-canvas')?.addEventListener('click', () => {
      this.clearAssetCanvas();
    });

    // Asset hinzufügen Button
    document.getElementById('add-asset')?.addEventListener('click', () => {
      this.showAssetModal();
    });

    // Asset bearbeiten Button
    document.getElementById('btn-edit-asset')?.addEventListener('click', () => {
      if (this.selectedAsset) {
        this.showAssetModal(this.selectedAsset);
      }
    });

    // Asset löschen Button
    document.getElementById('btn-delete-asset')?.addEventListener('click', () => {
      if (this.selectedAsset) {
        this.deleteAsset(this.selectedAsset);
      }
    });

    // Bedrohungen verknüpfen Button
    document.getElementById('btn-link-threats')?.addEventListener('click', () => {
      if (this.selectedAsset) {
        this.showThreatLinkingModal(this.selectedAsset);
      }
    });

    // Filter-Buttons
    document.querySelectorAll('.asset-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterAssets(btn.dataset.filter);
      });
    });

    // Kritikalitäts-Filter
    document.querySelectorAll('.criticality-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterAssetsByCriticality(btn.dataset.criticality);
      });
    });

    // Suche
    document.getElementById('asset-search')?.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.searchAssets();
      }
    });

    document.getElementById('asset-search-btn')?.addEventListener('click', () => {
      this.searchAssets();
    });

    // View-Controls
    document.getElementById('show-connections')?.addEventListener('change', () => {
      this.renderAssetCanvas();
    });

    document.getElementById('show-risk-colors')?.addEventListener('change', () => {
      this.renderAssetCanvas();
    });
  }

  // Zu Asset-Tab wechseln
  switchToAssetTab() {
    // Alle Tabs deaktivieren
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Asset-Tab aktivieren
    document.querySelector('[data-tab="assets"]').classList.add('active');
    document.getElementById('assets-tab').classList.add('active');

    // Canvas neu rendern
    setTimeout(() => {
      this.renderAssetCanvas();
    }, 100);
  }

  // Auto-Layout für Assets
  autoLayoutAssets() {
    const canvasWidth = this.assetCanvas.width;
    const canvasHeight = this.assetCanvas.height;
    const margin = 80;

    // Einfaches Grid-Layout
    const cols = Math.ceil(Math.sqrt(allAssets.length));
    const rows = Math.ceil(allAssets.length / cols);
    const cellWidth = (canvasWidth - 2 * margin) / cols;
    const cellHeight = (canvasHeight - 2 * margin) / rows;

    allAssets.forEach((asset, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      asset.position = {
        x: margin + col * cellWidth + cellWidth / 2,
        y: margin + row * cellHeight + cellHeight / 2
      };
    });

    this.renderAssetCanvas();
    saveAssetDataToStorage();
  }

  // Canvas leeren
  clearAssetCanvas() {
    allAssets.forEach(asset => {
      delete asset.position;
    });
    this.renderAssetCanvas();
    saveAssetDataToStorage();
  }

  // Asset-Modal anzeigen
  showAssetModal(asset = null) {
    const modal = document.getElementById('asset-modal');
    const form = document.getElementById('asset-form');
    
    if (asset) {
      // Bearbeiten
      document.getElementById('asset-id').value = asset.id;
      document.getElementById('asset-name').value = asset.name;
      document.getElementById('asset-description').value = asset.description;
      document.getElementById('asset-type').value = asset.type;
      document.getElementById('asset-criticality').value = asset.criticality;
      document.getElementById('asset-owner').value = asset.owner;
      document.getElementById('asset-location').value = asset.location;
      document.getElementById('cia-confidentiality').value = asset.cia.confidentiality;
      document.getElementById('cia-integrity').value = asset.cia.integrity;
      document.getElementById('cia-availability').value = asset.cia.availability;
    } else {
      // Neu erstellen
      form.reset();
      document.getElementById('asset-id').value = 'ASSET' + String(allAssets.length + 1).padStart(3, '0');
    }

    modal.style.display = 'block';
  }

  // Asset-Daten aus localStorage laden
  loadAssetDataFromStorage() {
    if (loadAssetDataFromStorage()) {
      this.populateAssets();
      this.renderAssetCanvas();
    }
  }

  // Assets filtern
  filterAssets(filter) {
    document.querySelectorAll('.asset-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    document.querySelectorAll('.asset-item').forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Assets nach Kritikalität filtern
  filterAssetsByCriticality(criticality) {
    document.querySelectorAll('.criticality-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-criticality="${criticality}"]`).classList.add('active');

    document.querySelectorAll('.asset-item').forEach(item => {
      if (criticality === 'all' || item.classList.contains(`criticality-${criticality}`)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Assets suchen
  searchAssets() {
    const searchTerm = document.getElementById('asset-search').value.toLowerCase();
    
    document.querySelectorAll('.asset-item').forEach(item => {
      const assetId = item.dataset.id;
      const asset = allAssets.find(a => a.id === assetId);
      
      if (!searchTerm || 
          asset.id.toLowerCase().includes(searchTerm) ||
          asset.name.toLowerCase().includes(searchTerm) ||
          asset.description.toLowerCase().includes(searchTerm) ||
          asset.owner.toLowerCase().includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Asset zur Canvas hinzufügen
  addAssetToCanvas(asset) {
    if (!asset.position) {
      // Zufällige Position zuweisen
      asset.position = {
        x: Math.random() * (this.assetCanvas.width - 100) + 50,
        y: Math.random() * (this.assetCanvas.height - 100) + 50
      };
      this.renderAssetCanvas();
      saveAssetDataToStorage();
    }
  }

  // Canvas-Maus-Events
  handleCanvasMouseDown(e) {
    const rect = this.assetCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedAsset = this.getAssetAtPosition(x, y);
    if (clickedAsset) {
      this.isDragging = true;
      this.draggedAsset = clickedAsset;
      this.dragOffset = {
        x: x - clickedAsset.position.x,
        y: y - clickedAsset.position.y
      };
      this.assetCanvas.style.cursor = 'grabbing';
    }
  }

  handleCanvasMouseMove(e) {
    if (!this.isDragging || !this.draggedAsset) return;

    const rect = this.assetCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.draggedAsset.position.x = x - this.dragOffset.x;
    this.draggedAsset.position.y = y - this.dragOffset.y;

    // Grenzen einhalten
    this.draggedAsset.position.x = Math.max(30, Math.min(this.assetCanvas.width - 30, this.draggedAsset.position.x));
    this.draggedAsset.position.y = Math.max(30, Math.min(this.assetCanvas.height - 30, this.draggedAsset.position.y));

    this.renderAssetCanvas();
  }

  handleCanvasMouseUp(e) {
    if (this.isDragging) {
      this.isDragging = false;
      this.draggedAsset = null;
      this.assetCanvas.style.cursor = 'default';
      saveAssetDataToStorage();
    }
  }
}

// Globale Asset-Manager-Instanz
let assetManager = null;

// Asset-Manager initialisieren, wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
  if (!assetManager) {
    assetManager = new AssetManager();
    assetManager.init();
  }
});

