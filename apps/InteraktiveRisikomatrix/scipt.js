// Risikomanagement Tool - Hauptklasse
class RiskManagementTool {
    constructor() {
        this.risks = [];
        this.currentView = 'matrix';
        this.riskIdCounter = 1;

        this.init();
    }

    init() {
        this.createMatrixGrid();
        this.bindEvents();
        this.loadFromLocalStorage();
        this.updateDisplay();
    }

    // Matrix Grid erstellen
    createMatrixGrid() {
        const matrixGrid = document.getElementById('riskMatrix');
        matrixGrid.innerHTML = '';

        // 5x5 Grid erstellen (Wahrscheinlichkeit x Auswirkung)
        for (let probability = 5; probability >= 1; probability--) {
            for (let impact = 1; impact <= 5; impact++) {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.dataset.probability = probability;
                cell.dataset.impact = impact;

                // Risikostufe bestimmen
                const riskLevel = this.calculateRiskLevel(probability, impact);
                cell.classList.add(`risk-${riskLevel}`);

                // Click Event für Zelle
                cell.addEventListener('click', (e) => {
                    if (e.target === cell) {
                        this.showCellInfo(probability, impact);
                    }
                });

                matrixGrid.appendChild(cell);
            }
        }
    }

    // Risikostufe berechnen
    calculateRiskLevel(probability, impact) {
        const score = probability * impact;
        if (score <= 6) return 'low';
        if (score <= 12) return 'medium';
        if (score <= 18) return 'high';
        return 'critical';
    }

    // Event Listeners binden
    bindEvents() {
        // Risiko hinzufügen
        document.getElementById('addRisk').addEventListener('click', () => {
            this.addRisk();
        });

        // Enter-Taste im Namensfeld
        document.getElementById('riskName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addRisk();
            }
        });

        // View Toggle
        document.getElementById('toggleView').addEventListener('click', () => {
            this.toggleView();
        });

        // Export
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Modal schließen
        document.querySelectorAll('.close, .close-modal').forEach(element => {
            element.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Modal außerhalb klicken
        document.getElementById('riskModal').addEventListener('click', (e) => {
            if (e.target.id === 'riskModal') {
                this.closeModal();
            }
        });

        // Risiko löschen
        document.getElementById('deleteRisk').addEventListener('click', () => {
            this.deleteCurrentRisk();
        });
    }

    // Risiko hinzufügen
    addRisk() {
        const nameInput = document.getElementById('riskName');
        const probabilitySelect = document.getElementById('riskProbability');
        const impactSelect = document.getElementById('riskImpact');

        const name = nameInput.value.trim();
        const probability = parseInt(probabilitySelect.value);
        const impact = parseInt(impactSelect.value);

        if (!name || !probability || !impact) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }

        const risk = {
            id: this.riskIdCounter++,
            name: name,
            probability: probability,
            impact: impact,
            level: this.calculateRiskLevel(probability, impact),
            created: new Date().toISOString()
        };

        this.risks.push(risk);

        // Felder zurücksetzen
        nameInput.value = '';
        probabilitySelect.value = '';
        impactSelect.value = '';

        this.updateDisplay();
        this.saveToLocalStorage();

        // Feedback für Benutzer
        this.showNotification('Risiko erfolgreich hinzugefügt!', 'success');
    }

    // Display aktualisieren
    updateDisplay() {
        if (this.currentView === 'matrix') {
            this.updateMatrixView();
        } else {
            this.updateListView();
        }
    }

    // Matrix View aktualisieren
    updateMatrixView() {
        // Alle Zellen leeren
        document.querySelectorAll('.matrix-cell').forEach(cell => {
            cell.innerHTML = '';
        });

        // Risiken in entsprechende Zellen einfügen
        this.risks.forEach(risk => {
            const cell = document.querySelector(
                `[data-probability="${risk.probability}"][data-impact="${risk.impact}"]`
            );

            if (cell) {
                const riskElement = document.createElement('div');
                riskElement.className = 'risk-item new';
                riskElement.textContent = risk.name;
                riskElement.title = `${risk.name}\nWahrscheinlichkeit: ${this.getProbabilityText(risk.probability)}\nAuswirkung: ${this.getImpactText(risk.impact)}`;

                riskElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showRiskDetails(risk);
                });

                cell.appendChild(riskElement);

                // Animation entfernen nach kurzer Zeit
                setTimeout(() => {
                    riskElement.classList.remove('new');
                }, 500);
            }
        });
    }

    // Listen View aktualisieren
    updateListView() {
        const tbody = document.getElementById('riskTableBody');
        tbody.innerHTML = '';

        // Risiken sortieren (kritische zuerst)
        const sortedRisks = [...this.risks].sort((a, b) => {
            const levelOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
            return levelOrder[b.level] - levelOrder[a.level];
        });

        sortedRisks.forEach(risk => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${risk.name}</strong></td>
                <td>${this.getProbabilityText(risk.probability)}</td>
                <td>${this.getImpactText(risk.impact)}</td>
                <td><span class="risk-level ${risk.level}">${this.getRiskLevelText(risk.level)}</span></td>
                <td>
                    <button class="btn btn-secondary" onclick="riskTool.showRiskDetails(${JSON.stringify(risk).replace(/"/g, '&quot;')})">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Statistiken aktualisieren
        this.updateRiskStats();
    }

    // Risiko-Statistiken aktualisieren
    updateRiskStats() {
        const stats = document.getElementById('riskStats');
        const counts = {
            total: this.risks.length,
            critical: this.risks.filter(r => r.level === 'critical').length,
            high: this.risks.filter(r => r.level === 'high').length,
            medium: this.risks.filter(r => r.level === 'medium').length,
            low: this.risks.filter(r => r.level === 'low').length
        };

        stats.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${counts.total}</span>
                <span class="stat-label">Gesamt</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" style="color: #e74c3c">${counts.critical}</span>
                <span class="stat-label">Kritisch</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" style="color: #e67e22">${counts.high}</span>
                <span class="stat-label">Hoch</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" style="color: #f39c12">${counts.medium}</span>
                <span class="stat-label">Mittel</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" style="color: #27ae60">${counts.low}</span>
                <span class="stat-label">Gering</span>
            </div>
        `;
    }

    // View zwischen Matrix und Liste wechseln
    toggleView() {
        const matrixView = document.getElementById('matrixView');
        const listView = document.getElementById('listView');
        const toggleBtn = document.getElementById('toggleView');

        if (this.currentView === 'matrix') {
            matrixView.style.display = 'none';
            listView.style.display = 'block';
            toggleBtn.innerHTML = '<i class="fas fa-th"></i> Matrixansicht';
            this.currentView = 'list';
        } else {
            matrixView.style.display = 'block';
            listView.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-table"></i> Listenansicht';
            this.currentView = 'matrix';
        }

        this.updateDisplay();
    }

    // Risiko-Details anzeigen
    showRiskDetails(risk) {
        const modal = document.getElementById('riskModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        title.textContent = risk.name;

        body.innerHTML = `
            <div style="display: grid; gap: 1rem;">
                <div class="detail-item">
                    <strong>Risikobezeichnung:</strong> ${risk.name}
                </div>
                <div class="detail-item">
                    <strong>Wahrscheinlichkeit:</strong> ${this.getProbabilityText(risk.probability)} (${risk.probability}/5)
                </div>
                <div class="detail-item">
                    <strong>Auswirkung:</strong> ${this.getImpactText(risk.impact)} (${risk.impact}/5)
                </div>
                <div class="detail-item">
                    <strong>Risikostufe:</strong> 
                    <span class="risk-level ${risk.level}">${this.getRiskLevelText(risk.level)}</span>
                </div>
                <div class="detail-item">
                    <strong>Risikoscore:</strong> ${risk.probability * risk.impact}/25
                </div>
                <div class="detail-item">
                    <strong>Erstellt am:</strong> ${new Date(risk.created).toLocaleString('de-DE')}
                </div>
                <div class="detail-item">
                    <strong>BSI-Empfehlung:</strong> ${this.getBSIRecommendation(risk.level)}
                </div>
            </div>
        `;

        // Aktuelles Risiko für Löschfunktion speichern
        this.currentRisk = risk;

        modal.style.display = 'block';
    }

    // Zellen-Info anzeigen
    showCellInfo(probability, impact) {
        const level = this.calculateRiskLevel(probability, impact);
        const risksInCell = this.risks.filter(r => r.probability === probability && r.impact === impact);

        const modal = document.getElementById('riskModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        title.textContent = `Matrix-Position: ${this.getProbabilityText(probability)} / ${this.getImpactText(impact)}`;

        body.innerHTML = `
            <div style="display: grid; gap: 1rem;">
                <div class="detail-item">
                    <strong>Wahrscheinlichkeit:</strong> ${this.getProbabilityText(probability)}
                </div>
                <div class="detail-item">
                    <strong>Auswirkung:</strong> ${this.getImpactText(impact)}
                </div>
                <div class="detail-item">
                    <strong>Risikostufe:</strong> 
                    <span class="risk-level ${level}">${this.getRiskLevelText(level)}</span>
                </div>
                <div class="detail-item">
                    <strong>Anzahl Risiken:</strong> ${risksInCell.length}
                </div>
                ${risksInCell.length > 0 ? `
                    <div class="detail-item">
                        <strong>Risiken in dieser Zelle:</strong>
                        <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                            ${risksInCell.map(r => `<li>${r.name}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="detail-item">
                    <strong>BSI-Empfehlung:</strong> ${this.getBSIRecommendation(level)}
                </div>
            </div>
        `;

        // Kein aktuelles Risiko für diese Ansicht
        this.currentRisk = null;

        // Löschen-Button verstecken
        document.getElementById('deleteRisk').style.display = 'none';

        modal.style.display = 'block';
    }

    // BSI-Empfehlungen basierend auf Risikostufe
    getBSIRecommendation(level) {
        const recommendations = {
            'low': 'Die bereits umgesetzten Maßnahmen bieten einen ausreichenden Schutz. Regelmäßige Überwachung empfohlen.',
            'medium': 'Die bereits umgesetzten Maßnahmen reichen möglicherweise nicht aus. Zusätzliche Schutzmaßnahmen sollten geprüft werden.',
            'high': 'Die bereits umgesetzten Sicherheitsmaßnahmen bieten keinen ausreichenden Schutz. Dringende Maßnahmen erforderlich.',
            'critical': 'Sofortige Maßnahmen erforderlich! Das Risiko ist inakzeptabel hoch und muss umgehend behandelt werden.'
        };
        return recommendations[level] || 'Keine Empfehlung verfügbar.';
    }

    // Aktuelles Risiko löschen
    deleteCurrentRisk() {
        if (!this.currentRisk) return;

        if (confirm(`Möchten Sie das Risiko "${this.currentRisk.name}" wirklich löschen?`)) {
            this.risks = this.risks.filter(r => r.id !== this.currentRisk.id);
            this.closeModal();
            this.updateDisplay();
            this.saveToLocalStorage();
            this.showNotification('Risiko erfolgreich gelöscht!', 'success');
        }
    }

    // Modal schließen
    closeModal() {
        const modal = document.getElementById('riskModal');
        modal.style.display = 'none';
        this.currentRisk = null;

        // Löschen-Button wieder anzeigen
        document.getElementById('deleteRisk').style.display = 'inline-flex';
    }

    // Daten exportieren
    exportData() {
        const data = {
            risks: this.risks,
            exportDate: new Date().toISOString(),
            toolVersion: '1.0'
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = `risikomatrix_${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        this.showNotification('Daten erfolgreich exportiert!', 'success');
    }

    // Notification anzeigen
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Lokaler Speicher
    saveToLocalStorage() {
        localStorage.setItem('riskManagementData', JSON.stringify({
            risks: this.risks,
            riskIdCounter: this.riskIdCounter
        }));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('riskManagementData');
        if (saved) {
            const data = JSON.parse(saved);
            this.risks = data.risks || [];
            this.riskIdCounter = data.riskIdCounter || 1;
        }
    }

    // Hilfsfunktionen für Textkonvertierung
    getProbabilityText(value) {
        const texts = {
            1: 'Sehr unwahrscheinlich',
            2: 'Unwahrscheinlich',
            3: 'Möglich',
            4: 'Wahrscheinlich',
            5: 'Sehr wahrscheinlich'
        };
        return texts[value] || 'Unbekannt';
    }

    getImpactText(value) {
        const texts = {
            1: 'Sehr gering',
            2: 'Gering',
            3: 'Mittel',
            4: 'Hoch',
            5: 'Sehr hoch'
        };
        return texts[value] || 'Unbekannt';
    }

    getRiskLevelText(level) {
        const texts = {
            'low': 'Gering',
            'medium': 'Mittel',
            'high': 'Hoch',
            'critical': 'Kritisch'
        };
        return texts[level] || 'Unbekannt';
    }
}

// CSS für Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Tool initialisieren
let riskTool;
document.addEventListener('DOMContentLoaded', function() {
    riskTool = new RiskManagementTool();
});
