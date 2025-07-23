// Asset Risk Matrix Application
class AssetRiskMatrix {
    constructor() {
        this.assets = [];
        this.currentEditingAsset = null;
        this.currentDetailAsset = null;
        this.charts = {};
        this.init();
    }

    init() {
        this.loadSampleData();
        this.initializeEventListeners();
        this.setupTabs();
        this.renderMatrix();
        this.renderAssetTable();
        this.updateDashboard();
    }

    loadSampleData() {
        this.assets = [
            {
                id: 1,
                name: "Produktionsserver-01",
                type: "Server",
                location: "Rechenzentrum A",
                businessValue: "Kritisch",
                securityLevel: "Hoch",
                criticality: 4,
                vulnerability: 2,
                description: "Hauptproduktionsserver für E-Commerce-Anwendung",
                threats: ["DDoS", "Malware", "Unauthorisierter Zugriff"]
            },
            {
                id: 2,
                name: "Kundendatenbank",
                type: "Database",
                location: "Rechenzentrum B",
                businessValue: "Kritisch",
                securityLevel: "Hoch",
                criticality: 4,
                vulnerability: 1,
                description: "Zentrale Datenbank mit Kundendaten und Transaktionsdaten",
                threats: ["SQL Injection", "Datendiebstahl", "Ransomware"]
            },
            {
                id: 3,
                name: "Mitarbeiter-Workstation",
                type: "Workstation",
                location: "Büro Etage 2",
                businessValue: "Mittel",
                securityLevel: "Mittel",
                criticality: 2,
                vulnerability: 3,
                description: "Standard-Arbeitsplatz für Bürotätigkeiten",
                threats: ["Phishing", "Malware", "USB-Angriffe"]
            },
            {
                id: 4,
                name: "Firewall-System",
                type: "Network Device",
                location: "Netzwerk-Perimeter",
                businessValue: "Hoch",
                securityLevel: "Hoch",
                criticality: 3,
                vulnerability: 1,
                description: "Zentrale Firewall für Netzwerksicherheit",
                threats: ["DDoS", "Konfigurationsfehler", "Zero-Day-Exploits"]
            },
            {
                id: 5,
                name: "HR-System",
                type: "Application",
                location: "Cloud",
                businessValue: "Hoch",
                securityLevel: "Mittel",
                criticality: 3,
                vulnerability: 2,
                description: "Personalverwaltungssystem mit Mitarbeiterdaten",
                threats: ["Datenleaks", "Insider-Bedrohungen", "Cloud-Schwachstellen"]
            }
        ];
    }

    initializeEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Asset management
        document.getElementById('addAssetBtn').addEventListener('click', () => this.openAssetModal());
        document.getElementById('saveAsset').addEventListener('click', (e) => {
            e.preventDefault();
            this.saveAsset();
        });
        document.getElementById('cancelModal').addEventListener('click', () => this.closeAssetModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeAssetModal());

        // Asset detail modal
        document.getElementById('closeDetailModal').addEventListener('click', () => this.closeAssetDetailModal());
        document.getElementById('closeDetailBtn').addEventListener('click', () => this.closeAssetDetailModal());
        document.getElementById('editAssetBtn').addEventListener('click', () => this.editCurrentAsset());
        document.getElementById('deleteAssetBtn').addEventListener('click', () => this.deleteCurrentAsset());

        // Search and filter
        document.getElementById('assetSearch').addEventListener('input', () => this.filterAssets());
        document.getElementById('typeFilter').addEventListener('change', () => this.filterAssets());

        // Modal background clicks
        document.getElementById('assetModal').addEventListener('click', (e) => {
            if (e.target.id === 'assetModal') this.closeAssetModal();
        });
        document.getElementById('assetDetailModal').addEventListener('click', (e) => {
            if (e.target.id === 'assetDetailModal') this.closeAssetDetailModal();
        });

        // Form submission
        document.getElementById('assetForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAsset();
        });
    }

    setupTabs() {
        this.switchTab('dashboard');
    }

    switchTab(tabName) {
        console.log('Switching to tab:', tabName);

        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        const activeTab = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Show/hide content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const activeContent = document.getElementById(tabName);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Refresh content based on tab with slight delay to ensure DOM is ready
        setTimeout(() => {
            if (tabName === 'dashboard') {
                this.updateDashboard();
            } else if (tabName === 'matrix') {
                this.renderMatrix();
            } else if (tabName === 'assets') {
                this.renderAssetTable();
            }
        }, 100);
    }

    calculateRiskLevel(criticality, vulnerability) {
        const riskScore = Math.ceil((criticality + vulnerability) / 2);
        return Math.min(riskScore, 4);
    }

    getRiskLevelName(level) {
        const names = {1: 'Niedrig', 2: 'Mittel', 3: 'Hoch', 4: 'Kritisch'};
        return names[level] || 'Unbekannt';
    }

    getAssetTypeClass(type) {
        const typeMap = {
            'Server': 'server',
            'Database': 'database',
            'Workstation': 'workstation',
            'Network Device': 'network',
            'Application': 'application',
            'Mobile Device': 'mobile',
            'IoT Device': 'iot'
        };
        return `asset-type-${typeMap[type] || 'server'}`;
    }

    renderMatrix() {
        const matrixGrid = document.getElementById('riskMatrix');
        if (!matrixGrid) {
            console.error('Matrix grid element not found');
            return;
        }

        matrixGrid.innerHTML = '';

        // Create 4x4 grid (criticality y-axis, vulnerability x-axis)
        for (let y = 4; y >= 1; y--) { // criticality (4=critical to 1=low)
            for (let x = 1; x <= 4; x++) { // vulnerability (1=low to 4=critical)
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.dataset.criticality = y;
                cell.dataset.vulnerability = x;

                const riskLevel = this.calculateRiskLevel(y, x);
                cell.classList.add(`risk-${riskLevel}`);

                // Add click handler for empty cells
                cell.addEventListener('click', () => {
                    this.showCellInfo(y, x, riskLevel);
                });

                // Add assets to appropriate cells
                const assetsInCell = this.assets.filter(asset =>
                    asset.criticality === y && asset.vulnerability === x
                );

                assetsInCell.forEach(asset => {
                    const assetElement = this.createAssetElement(asset);
                    cell.appendChild(assetElement);
                });

                // Add drop zone functionality
                this.setupDropZone(cell);
                matrixGrid.appendChild(cell);
            }
        }
    }

    showCellInfo(criticality, vulnerability, riskLevel) {
        const assetsInCell = this.assets.filter(asset =>
            asset.criticality === criticality && asset.vulnerability === vulnerability
        );

        if (assetsInCell.length === 0) {
            const criticalityNames = {1: 'Niedrig', 2: 'Mittel', 3: 'Hoch', 4: 'Kritisch'};
            const vulnerabilityNames = {1: 'Niedrig', 2: 'Mittel', 3: 'Hoch', 4: 'Kritisch'};

            alert(`Zelle Information:\nKritikalität: ${criticalityNames[criticality]}\nVerwundbarkeit: ${vulnerabilityNames[vulnerability]}\nRisiko-Level: ${this.getRiskLevelName(riskLevel)}\n\nKeine Assets in dieser Zelle.`);
        }
    }

    createAssetElement(asset) {
        const element = document.createElement('div');
        element.className = 'asset-item';
        element.draggable = true;
        element.dataset.assetId = asset.id;

        const typeIndicator = document.createElement('div');
        typeIndicator.className = `asset-type-indicator ${this.getAssetTypeClass(asset.type)}`;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = asset.name;
        nameSpan.style.fontSize = '11px';
        nameSpan.style.overflow = 'hidden';
        nameSpan.style.textOverflow = 'ellipsis';
        nameSpan.style.whiteSpace = 'nowrap';

        element.appendChild(typeIndicator);
        element.appendChild(nameSpan);

        // Add drag event listeners
        element.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            this.handleDragStart(e, asset);
        });
        element.addEventListener('dragend', (e) => {
            e.stopPropagation();
            this.handleDragEnd(e);
        });
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showAssetDetail(asset);
        });

        return element;
    }

    setupDropZone(cell) {
        cell.addEventListener('dragover', (e) => this.handleDragOver(e));
        cell.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        cell.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        cell.addEventListener('drop', (e) => this.handleDrop(e));
    }

    handleDragStart(e, asset) {
        e.dataTransfer.setData('text/plain', asset.id.toString());
        e.target.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e) {
        e.preventDefault();
        const cell = e.target.closest('.matrix-cell');
        if (cell) {
            cell.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        const cell = e.target.closest('.matrix-cell');
        if (cell) {
            cell.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const cell = e.target.closest('.matrix-cell');
        if (cell) {
            cell.classList.remove('drag-over');

            const assetId = parseInt(e.dataTransfer.getData('text/plain'));
            const asset = this.assets.find(a => a.id === assetId);

            if (asset) {
                asset.criticality = parseInt(cell.dataset.criticality);
                asset.vulnerability = parseInt(cell.dataset.vulnerability);

                // Update business value and security level based on new position
                const valueMap = {1: 'Niedrig', 2: 'Mittel', 3: 'Hoch', 4: 'Kritisch'};
                asset.businessValue = valueMap[asset.criticality];
                asset.securityLevel = valueMap[asset.vulnerability];

                this.renderMatrix();
                this.updateDashboard();
                this.renderAssetTable();
            }
        }
    }

    updateDashboard() {
        // Update metrics
        const totalAssets = this.assets.length;
        const criticalAssets = this.assets.filter(a => a.criticality === 4 || a.vulnerability === 4).length;
        const highRiskAssets = this.assets.filter(a => this.calculateRiskLevel(a.criticality, a.vulnerability) >= 3).length;

        document.getElementById('totalAssets').textContent = totalAssets;
        document.getElementById('criticalAssets').textContent = criticalAssets;
        document.getElementById('highRiskAssets').textContent = highRiskAssets;

        // Update charts
        setTimeout(() => {
            this.updateAssetTypeChart();
            this.updateRiskChart();
            this.updateTopRiskAssets();
        }, 100);
    }

    updateAssetTypeChart() {
        const canvas = document.getElementById('assetTypeChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (this.charts.assetType) {
            this.charts.assetType.destroy();
        }

        const typeCounts = {};
        this.assets.forEach(asset => {
            typeCounts[asset.type] = (typeCounts[asset.type] || 0) + 1;
        });

        this.charts.assetType = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(typeCounts),
                datasets: [{
                    data: Object.values(typeCounts),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 10,
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    updateRiskChart() {
        const canvas = document.getElementById('riskChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (this.charts.risk) {
            this.charts.risk.destroy();
        }

        const riskCounts = {1: 0, 2: 0, 3: 0, 4: 0};
        this.assets.forEach(asset => {
            const riskLevel = this.calculateRiskLevel(asset.criticality, asset.vulnerability);
            riskCounts[riskLevel]++;
        });

        this.charts.risk = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Niedrig', 'Mittel', 'Hoch', 'Kritisch'],
                datasets: [{
                    label: 'Anzahl Assets',
                    data: [riskCounts[1], riskCounts[2], riskCounts[3], riskCounts[4]],
                    backgroundColor: ['#4CAF50', '#FF9800', '#F44336', '#9C27B0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    updateTopRiskAssets() {
        const topRiskContainer = document.getElementById('topRiskAssets');
        if (!topRiskContainer) return;

        const sortedAssets = [...this.assets]
            .sort((a, b) => {
                const riskA = this.calculateRiskLevel(a.criticality, a.vulnerability);
                const riskB = this.calculateRiskLevel(b.criticality, b.vulnerability);
                return riskB - riskA;
            })
            .slice(0, 5);

        topRiskContainer.innerHTML = sortedAssets.map(asset => {
            const riskLevel = this.calculateRiskLevel(asset.criticality, asset.vulnerability);
            const riskName = this.getRiskLevelName(riskLevel).toLowerCase();

            return `
                <div class="risk-item" style="cursor: pointer;" onclick="window.app.showAssetDetail(${JSON.stringify(asset).replace(/"/g, '&quot;')})">
                    <div>
                        <div class="risk-item-name">${asset.name}</div>
                        <div class="risk-item-type">${asset.type}</div>
                    </div>
                    <div class="risk-level ${riskName}">${this.getRiskLevelName(riskLevel)}</div>
                </div>
            `;
        }).join('');
    }

    renderAssetTable() {
        const tbody = document.getElementById('assetsTableBody');
        if (!tbody) return;

        const filteredAssets = this.getFilteredAssets();

        tbody.innerHTML = filteredAssets.map(asset => {
            const riskLevel = this.calculateRiskLevel(asset.criticality, asset.vulnerability);
            const riskName = this.getRiskLevelName(riskLevel).toLowerCase();

            return `
                <tr>
                    <td>${asset.name}</td>
                    <td>${asset.type}</td>
                    <td>${asset.location}</td>
                    <td>${asset.businessValue}</td>
                    <td>${asset.securityLevel}</td>
                    <td><span class="risk-level ${riskName}">${this.getRiskLevelName(riskLevel)}</span></td>
                    <td class="asset-actions">
                        <button class="btn btn--sm btn--outline btn-icon" onclick="window.app.showAssetDetail(${JSON.stringify(asset).replace(/"/g, '&quot;')})" title="Details anzeigen">👁</button>
                        <button class="btn btn--sm btn--secondary btn-icon" onclick="window.app.editAsset(${asset.id})" title="Bearbeiten">✏</button>
                        <button class="btn btn--sm btn--outline btn-icon" onclick="window.app.deleteAsset(${asset.id})" title="Löschen">🗑</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getFilteredAssets() {
        const searchInput = document.getElementById('assetSearch');
        const typeFilterSelect = document.getElementById('typeFilter');

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const typeFilter = typeFilterSelect ? typeFilterSelect.value : '';

        return this.assets.filter(asset => {
            const matchesSearch = asset.name.toLowerCase().includes(searchTerm) ||
                asset.location.toLowerCase().includes(searchTerm) ||
                asset.description.toLowerCase().includes(searchTerm);
            const matchesType = !typeFilter || asset.type === typeFilter;

            return matchesSearch && matchesType;
        });
    }

    filterAssets() {
        this.renderAssetTable();
    }

    openAssetModal(asset = null) {
        this.currentEditingAsset = asset;
        const modal = document.getElementById('assetModal');
        const form = document.getElementById('assetForm');
        const title = document.getElementById('modalTitle');

        if (asset) {
            title.textContent = 'Asset bearbeiten';
            document.getElementById('assetName').value = asset.name;
            document.getElementById('assetType').value = asset.type;
            document.getElementById('assetLocation').value = asset.location;
            document.getElementById('businessValue').value = asset.businessValue;
            document.getElementById('securityLevel').value = asset.securityLevel;
            document.getElementById('assetDescription').value = asset.description;
        } else {
            title.textContent = 'Neues Asset hinzufügen';
            form.reset();
        }

        modal.classList.add('active');
    }

    closeAssetModal() {
        document.getElementById('assetModal').classList.remove('active');
        this.currentEditingAsset = null;
    }

    saveAsset() {
        const form = document.getElementById('assetForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = {
            name: document.getElementById('assetName').value,
            type: document.getElementById('assetType').value,
            location: document.getElementById('assetLocation').value,
            businessValue: document.getElementById('businessValue').value,
            securityLevel: document.getElementById('securityLevel').value,
            description: document.getElementById('assetDescription').value
        };

        // Map business value and security level to numeric values
        const valueMap = {'Niedrig': 1, 'Mittel': 2, 'Hoch': 3, 'Kritisch': 4};

        if (this.currentEditingAsset) {
            // Update existing asset
            Object.assign(this.currentEditingAsset, formData);
            this.currentEditingAsset.criticality = valueMap[formData.businessValue];
            this.currentEditingAsset.vulnerability = valueMap[formData.securityLevel];
        } else {
            // Create new asset
            const newAsset = {
                id: Math.max(...this.assets.map(a => a.id), 0) + 1,
                ...formData,
                criticality: valueMap[formData.businessValue],
                vulnerability: valueMap[formData.securityLevel],
                threats: []
            };
            this.assets.push(newAsset);
        }

        this.closeAssetModal();
        this.renderMatrix();
        this.renderAssetTable();
        this.updateDashboard();
    }

    editAsset(id) {
        const asset = this.assets.find(a => a.id === id);
        if (asset) {
            this.openAssetModal(asset);
        }
    }

    deleteAsset(id) {
        if (confirm('Sind Sie sicher, dass Sie dieses Asset löschen möchten?')) {
            this.assets = this.assets.filter(a => a.id !== id);
            this.renderMatrix();
            this.renderAssetTable();
            this.updateDashboard();
        }
    }

    showAssetDetail(asset) {
        const modal = document.getElementById('assetDetailModal');
        const title = document.getElementById('detailModalTitle');
        const content = document.getElementById('assetDetailContent');

        title.textContent = asset.name;

        const riskLevel = this.calculateRiskLevel(asset.criticality, asset.vulnerability);
        const riskName = this.getRiskLevelName(riskLevel);

        content.innerHTML = `
            <div class="asset-detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Asset-Typ</div>
                    <div class="detail-value">${asset.type}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Standort</div>
                    <div class="detail-value">${asset.location}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Geschäftswert</div>
                    <div class="detail-value">${asset.businessValue}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Sicherheitslevel</div>
                    <div class="detail-value">${asset.securityLevel}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Kritikalität</div>
                    <div class="detail-value">${asset.criticality}/4</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Verwundbarkeit</div>
                    <div class="detail-value">${asset.vulnerability}/4</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Risiko-Level</div>
                    <div class="detail-value">
                        <span class="risk-level ${riskName.toLowerCase()}">${riskName}</span>
                    </div>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Beschreibung</div>
                <div class="detail-value">${asset.description}</div>
            </div>
            ${asset.threats && asset.threats.length > 0 ? `
                <div class="detail-item">
                    <div class="detail-label">Identifizierte Bedrohungen</div>
                    <div class="threats-list">
                        ${asset.threats.map(threat => `<span class="threat-tag">${threat}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        // Store current asset for editing/deleting
        this.currentDetailAsset = asset;
        modal.classList.add('active');
    }

    closeAssetDetailModal() {
        document.getElementById('assetDetailModal').classList.remove('active');
        this.currentDetailAsset = null;
    }

    editCurrentAsset() {
        if (this.currentDetailAsset) {
            this.closeAssetDetailModal();
            this.openAssetModal(this.currentDetailAsset);
        }
    }

    deleteCurrentAsset() {
        if (this.currentDetailAsset) {
            this.deleteAsset(this.currentDetailAsset.id);
            this.closeAssetDetailModal();
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.app = new AssetRiskMatrix();
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.app) {
            window.app = new AssetRiskMatrix();
        }
    });
} else {
    window.app = new AssetRiskMatrix();
}