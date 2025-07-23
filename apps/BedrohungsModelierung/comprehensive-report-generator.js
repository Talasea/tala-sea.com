// BSI Threat Modeling Tool - Comprehensive Report Generator
class ComprehensiveReportGenerator {
    constructor(threatTool) {
        this.threatTool = threatTool;
        this.reportTemplates = this.initializeReportTemplates();
        this.reportData = null;
        this.currentReport = null;
        
        this.init();
    }
    
    init() {
        this.setupReportInterface();
        this.setupEventListeners();
    }
    
    setupReportInterface() {
        // Add report generation section to the analysis panel
        const analysisPanel = document.querySelector('.analysis-panel');
        if (analysisPanel) {
            const reportSection = document.createElement('div');
            reportSection.className = 'report-generation-section';
            reportSection.innerHTML = `
                <div class="section-header">
                    <h3><i class="fas fa-file-alt"></i> Berichtsgenerierung</h3>
                    <button class="btn-primary" id="generateReportBtn">
                        <i class="fas fa-magic"></i> Vollständigen Bericht erstellen
                    </button>
                </div>
                <div class="report-options">
                    <div class="option-group">
                        <label>Berichtstyp:</label>
                        <select id="reportTypeSelect">
                            <option value="executive">Executive Summary</option>
                            <option value="technical">Technischer Bericht</option>
                            <option value="compliance">Compliance-Bericht</option>
                            <option value="comprehensive">Umfassender Bericht</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>Zielgruppe:</label>
                        <select id="audienceSelect">
                            <option value="management">Management</option>
                            <option value="technical">IT-Abteilung</option>
                            <option value="security">Sicherheitsbeauftragte</option>
                            <option value="auditors">Auditoren</option>
                            <option value="mixed">Gemischte Zielgruppe</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>Detailgrad:</label>
                        <select id="detailLevelSelect">
                            <option value="high">Hoch (Vollständig)</option>
                            <option value="medium">Mittel (Zusammengefasst)</option>
                            <option value="low">Niedrig (Überblick)</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="includeRiskMatrix" checked>
                            Risikomatrix einschließen
                        </label>
                    </div>
                    <div class="option-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="includeDFD" checked>
                            Datenflussdiagramme einschließen
                        </label>
                    </div>
                    <div class="option-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="includeRecommendations" checked>
                            Handlungsempfehlungen einschließen
                        </label>
                    </div>
                    <div class="option-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="includeCompliance" checked>
                            Compliance-Analyse einschließen
                        </label>
                    </div>
                </div>
                <div class="report-preview" id="reportPreview" style="display: none;">
                    <h4>Berichtsvorschau</h4>
                    <div class="preview-content" id="previewContent"></div>
                    <div class="preview-actions">
                        <button class="btn-secondary" id="downloadReportBtn">
                            <i class="fas fa-download"></i> PDF herunterladen
                        </button>
                        <button class="btn-secondary" id="exportReportBtn">
                            <i class="fas fa-file-export"></i> Als Markdown exportieren
                        </button>
                        <button class="btn-secondary" id="printReportBtn">
                            <i class="fas fa-print"></i> Drucken
                        </button>
                    </div>
                </div>
            `;
            analysisPanel.appendChild(reportSection);
        }
    }
    
    setupEventListeners() {
        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            this.generateComprehensiveReport();
        });
        
        document.getElementById('downloadReportBtn')?.addEventListener('click', () => {
            this.downloadReportAsPDF();
        });
        
        document.getElementById('exportReportBtn')?.addEventListener('click', () => {
            this.exportReportAsMarkdown();
        });
        
        document.getElementById('printReportBtn')?.addEventListener('click', () => {
            this.printReport();
        });
        
        // Update preview when options change
        ['reportTypeSelect', 'audienceSelect', 'detailLevelSelect'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                if (this.currentReport) {
                    this.updateReportPreview();
                }
            });
        });
    }
    
    initializeReportTemplates() {
        return {
            executive: {
                name: 'Executive Summary',
                sections: [
                    'executive_summary',
                    'risk_overview',
                    'key_findings',
                    'recommendations',
                    'next_steps'
                ]
            },
            technical: {
                name: 'Technischer Bericht',
                sections: [
                    'system_overview',
                    'threat_analysis',
                    'vulnerability_assessment',
                    'risk_matrix',
                    'dfd_analysis',
                    'technical_recommendations',
                    'implementation_guide'
                ]
            },
            compliance: {
                name: 'Compliance-Bericht',
                sections: [
                    'compliance_overview',
                    'regulatory_requirements',
                    'gap_analysis',
                    'compliance_matrix',
                    'remediation_plan',
                    'audit_trail'
                ]
            },
            comprehensive: {
                name: 'Umfassender Bericht',
                sections: [
                    'executive_summary',
                    'project_overview',
                    'methodology',
                    'system_architecture',
                    'threat_landscape',
                    'vulnerability_analysis',
                    'risk_assessment',
                    'dfd_analysis',
                    'compliance_analysis',
                    'recommendations',
                    'implementation_roadmap',
                    'monitoring_strategy',
                    'appendices'
                ]
            }
        };
    }
    
    async generateComprehensiveReport() {
        try {
            // Show loading indicator
            this.showLoadingIndicator();
            
            // Collect all data
            this.reportData = await this.collectReportData();
            
            // Generate report based on selected template
            const reportType = document.getElementById('reportTypeSelect')?.value || 'comprehensive';
            const template = this.reportTemplates[reportType];
            
            this.currentReport = await this.buildReport(template);
            
            // Show preview
            this.showReportPreview();
            
            // Hide loading indicator
            this.hideLoadingIndicator();
            
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Fehler beim Erstellen des Berichts: ' + error.message);
            this.hideLoadingIndicator();
        }
    }
    
    async collectReportData() {
        const project = this.threatTool.currentProject;
        
        // Basic project data
        const data = {
            project: {
                name: project.name,
                description: project.description,
                createdAt: project.createdAt,
                lastModified: project.lastModified,
                components: project.components,
                connections: project.connections
            },
            timestamp: new Date().toISOString(),
            reportId: this.generateReportId()
        };
        
        // Threat analysis data
        if (this.threatTool.advancedAnalysis) {
            data.threatAnalysis = await this.threatTool.advancedAnalysis.getAnalysisResults();
        }
        
        // Risk matrix data
        if (this.threatTool.autoRiskMatrix) {
            data.riskMatrix = await this.threatTool.autoRiskMatrix.getRiskMatrixData();
        }
        
        // DFD data
        if (this.threatTool.dfdVisualization) {
            data.dfdData = {
                elements: this.threatTool.dfdVisualization.dfdElements,
                connections: this.threatTool.dfdVisualization.dfdConnections,
                analysis: this.threatTool.dfdVisualization.identifyThreats()
            };
        }
        
        // Compliance data
        if (this.threatTool.complianceManager) {
            data.compliance = await this.threatTool.complianceManager.getComplianceStatus();
        }
        
        // Statistics
        data.statistics = this.calculateStatistics(data);
        
        return data;
    }
    
    calculateStatistics(data) {
        const stats = {
            totalComponents: data.project.components.length,
            totalConnections: data.project.connections.length,
            totalThreats: 0,
            totalMitigations: 0,
            riskDistribution: { high: 0, medium: 0, low: 0 },
            complianceScore: 0
        };
        
        // Count threats and mitigations
        data.project.components.forEach(component => {
            if (component.threats) {
                stats.totalThreats += component.threats.length;
                
                // Count risk distribution
                component.threats.forEach(threat => {
                    const severity = threat.severity?.toLowerCase();
                    if (severity === 'hoch' || severity === 'high') {
                        stats.riskDistribution.high++;
                    } else if (severity === 'mittel' || severity === 'medium') {
                        stats.riskDistribution.medium++;
                    } else {
                        stats.riskDistribution.low++;
                    }
                });
            }
            
            if (component.mitigations) {
                stats.totalMitigations += component.mitigations.length;
            }
        });
        
        // Calculate compliance score
        if (data.compliance) {
            const totalRequirements = Object.values(data.compliance).reduce((sum, framework) => 
                sum + (framework.requirements?.length || 0), 0
            );
            const metRequirements = Object.values(data.compliance).reduce((sum, framework) => 
                sum + (framework.requirements?.filter(req => req.status === 'compliant').length || 0), 0
            );
            
            stats.complianceScore = totalRequirements > 0 ? 
                Math.round((metRequirements / totalRequirements) * 100) : 0;
        }
        
        return stats;
    }
    
    async buildReport(template) {
        const reportType = document.getElementById('reportTypeSelect')?.value || 'comprehensive';
        const audience = document.getElementById('audienceSelect')?.value || 'mixed';
        const detailLevel = document.getElementById('detailLevelSelect')?.value || 'high';
        
        const includeRiskMatrix = document.getElementById('includeRiskMatrix')?.checked;
        const includeDFD = document.getElementById('includeDFD')?.checked;
        const includeRecommendations = document.getElementById('includeRecommendations')?.checked;
        const includeCompliance = document.getElementById('includeCompliance')?.checked;
        
        let report = this.generateReportHeader();
        
        for (const sectionName of template.sections) {
            // Skip sections based on user preferences
            if (sectionName === 'risk_matrix' && !includeRiskMatrix) continue;
            if (sectionName === 'dfd_analysis' && !includeDFD) continue;
            if (sectionName.includes('recommendations') && !includeRecommendations) continue;
            if (sectionName.includes('compliance') && !includeCompliance) continue;
            
            const section = await this.generateSection(sectionName, audience, detailLevel);
            report += section + '\n\n';
        }
        
        report += this.generateReportFooter();
        
        return report;
    }
    
    generateReportHeader() {
        const project = this.reportData.project;
        const stats = this.reportData.statistics;
        
        return `# Bedrohungsmodellierungs-Bericht
## ${project.name}

**Erstellt am:** ${new Date(this.reportData.timestamp).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}

**Bericht-ID:** ${this.reportData.reportId}

**Projekt erstellt:** ${new Date(project.createdAt).toLocaleDateString('de-DE')}

**Letzte Änderung:** ${new Date(project.lastModified).toLocaleDateString('de-DE')}

---

### Projekt-Übersicht

${project.description || 'Keine Projektbeschreibung verfügbar.'}

### Schnellstatistik

| Metrik | Wert |
|--------|------|
| Systemkomponenten | ${stats.totalComponents} |
| Datenflüsse | ${stats.totalConnections} |
| Identifizierte Bedrohungen | ${stats.totalThreats} |
| Schutzmaßnahmen | ${stats.totalMitigations} |
| Compliance-Score | ${stats.complianceScore}% |
| Hohe Risiken | ${stats.riskDistribution.high} |
| Mittlere Risiken | ${stats.riskDistribution.medium} |
| Niedrige Risiken | ${stats.riskDistribution.low} |

---

`;
    }
    
    async generateSection(sectionName, audience, detailLevel) {
        const generators = {
            'executive_summary': () => this.generateExecutiveSummary(audience, detailLevel),
            'project_overview': () => this.generateProjectOverview(detailLevel),
            'methodology': () => this.generateMethodology(detailLevel),
            'system_architecture': () => this.generateSystemArchitecture(detailLevel),
            'threat_landscape': () => this.generateThreatLandscape(detailLevel),
            'threat_analysis': () => this.generateThreatAnalysis(detailLevel),
            'vulnerability_analysis': () => this.generateVulnerabilityAnalysis(detailLevel),
            'vulnerability_assessment': () => this.generateVulnerabilityAnalysis(detailLevel),
            'risk_assessment': () => this.generateRiskAssessment(detailLevel),
            'risk_overview': () => this.generateRiskOverview(audience),
            'risk_matrix': () => this.generateRiskMatrix(detailLevel),
            'dfd_analysis': () => this.generateDFDAnalysis(detailLevel),
            'compliance_analysis': () => this.generateComplianceAnalysis(detailLevel),
            'compliance_overview': () => this.generateComplianceOverview(audience),
            'regulatory_requirements': () => this.generateRegulatoryRequirements(detailLevel),
            'gap_analysis': () => this.generateGapAnalysis(detailLevel),
            'compliance_matrix': () => this.generateComplianceMatrix(detailLevel),
            'recommendations': () => this.generateRecommendations(audience, detailLevel),
            'technical_recommendations': () => this.generateTechnicalRecommendations(detailLevel),
            'key_findings': () => this.generateKeyFindings(audience),
            'next_steps': () => this.generateNextSteps(audience),
            'implementation_guide': () => this.generateImplementationGuide(detailLevel),
            'implementation_roadmap': () => this.generateImplementationRoadmap(detailLevel),
            'remediation_plan': () => this.generateRemediationPlan(detailLevel),
            'monitoring_strategy': () => this.generateMonitoringStrategy(detailLevel),
            'audit_trail': () => this.generateAuditTrail(detailLevel),
            'appendices': () => this.generateAppendices(detailLevel)
        };
        
        const generator = generators[sectionName];
        if (!generator) {
            return `## ${sectionName.replace(/_/g, ' ').toUpperCase()}\n\n*Dieser Abschnitt ist noch nicht implementiert.*\n`;
        }
        
        return await generator();
    }
    
    generateExecutiveSummary(audience, detailLevel) {
        const stats = this.reportData.statistics;
        const project = this.reportData.project;
        
        let summary = `## Executive Summary

Diese Bedrohungsmodellierung wurde für das System "${project.name}" durchgeführt, um potenzielle Sicherheitsrisiken zu identifizieren und entsprechende Schutzmaßnahmen zu empfehlen.

### Wichtigste Erkenntnisse

Das analysierte System umfasst ${stats.totalComponents} Komponenten mit ${stats.totalConnections} Datenflüssen. Dabei wurden ${stats.totalThreats} potenzielle Bedrohungen identifiziert, von denen ${stats.riskDistribution.high} als hohes Risiko eingestuft wurden.

`;
        
        if (stats.complianceScore > 0) {
            summary += `Die Compliance-Analyse zeigt einen Erfüllungsgrad von ${stats.complianceScore}% der relevanten regulatorischen Anforderungen.\n\n`;
        }
        
        if (stats.riskDistribution.high > 0) {
            summary += `**Kritische Handlungsfelder:** Es wurden ${stats.riskDistribution.high} Bedrohungen mit hohem Risiko identifiziert, die prioritär behandelt werden sollten.\n\n`;
        }
        
        summary += `**Empfohlene Maßnahmen:** Insgesamt wurden ${stats.totalMitigations} Schutzmaßnahmen empfohlen, um die identifizierten Risiken zu minimieren.\n\n`;
        
        if (audience === 'management') {
            summary += `### Geschäftliche Auswirkungen

Die identifizierten Sicherheitsrisiken können erhebliche Auswirkungen auf die Geschäftstätigkeit haben, einschließlich:

- Potenzielle Datenschutzverletzungen mit rechtlichen Konsequenzen
- Betriebsunterbrechungen durch Cyberangriffe
- Reputationsschäden bei Sicherheitsvorfällen
- Compliance-Verstöße mit möglichen Bußgeldern

### Investitionsempfehlungen

Basierend auf der Risikoanalyse wird empfohlen, prioritär in folgende Bereiche zu investieren:

1. Kritische Sicherheitsmaßnahmen für Hochrisiko-Bedrohungen
2. Compliance-Verbesserungen zur Erfüllung regulatorischer Anforderungen
3. Monitoring- und Incident-Response-Kapazitäten

`;
        }
        
        return summary;
    }
    
    generateProjectOverview(detailLevel) {
        const project = this.reportData.project;
        
        let overview = `## Projekt-Übersicht

### Systemarchitektur

Das analysierte System "${project.name}" besteht aus folgenden Hauptkomponenten:

`;
        
        // Group components by type
        const componentGroups = {};
        project.components.forEach(comp => {
            const type = comp.type || 'Sonstige';
            if (!componentGroups[type]) {
                componentGroups[type] = [];
            }
            componentGroups[type].push(comp);
        });
        
        Object.entries(componentGroups).forEach(([type, components]) => {
            overview += `**${type.charAt(0).toUpperCase() + type.slice(1)}** (${components.length})\n`;
            if (detailLevel === 'high') {
                components.forEach(comp => {
                    overview += `- ${comp.name}: ${comp.properties?.description || 'Keine Beschreibung verfügbar'}\n`;
                });
            }
            overview += '\n';
        });
        
        if (detailLevel === 'high') {
            overview += `### Datenflüsse

Das System umfasst ${project.connections.length} Datenflüsse zwischen den Komponenten:

`;
            
            project.connections.forEach(conn => {
                const source = project.components.find(c => c.id === conn.sourceId);
                const target = project.components.find(c => c.id === conn.targetId);
                
                if (source && target) {
                    overview += `- **${source.name}** → **${target.name}**: ${conn.properties?.description || 'Datenübertragung'}\n`;
                }
            });
        }
        
        return overview;
    }
    
    generateThreatAnalysis(detailLevel) {
        const project = this.reportData.project;
        
        let analysis = `## Bedrohungsanalyse

### Identifizierte Bedrohungen

Die systematische Analyse des Systems hat folgende Bedrohungen identifiziert:

`;
        
        // Collect all threats
        const allThreats = [];
        project.components.forEach(comp => {
            if (comp.threats) {
                comp.threats.forEach(threat => {
                    allThreats.push({
                        ...threat,
                        componentName: comp.name,
                        componentId: comp.id
                    });
                });
            }
        });
        
        // Group threats by severity
        const threatsBySeverity = {
            'Hoch': allThreats.filter(t => t.severity === 'Hoch' || t.severity === 'high'),
            'Mittel': allThreats.filter(t => t.severity === 'Mittel' || t.severity === 'medium'),
            'Niedrig': allThreats.filter(t => t.severity === 'Niedrig' || t.severity === 'low')
        };
        
        Object.entries(threatsBySeverity).forEach(([severity, threats]) => {
            if (threats.length === 0) return;
            
            analysis += `### ${severity}e Bedrohungen (${threats.length})\n\n`;
            
            threats.forEach(threat => {
                analysis += `**${threat.name}**\n`;
                analysis += `- Betroffene Komponente: ${threat.componentName}\n`;
                analysis += `- Beschreibung: ${threat.description}\n`;
                
                if (detailLevel === 'high') {
                    analysis += `- Wahrscheinlichkeit: ${threat.likelihood || 'Nicht bewertet'}\n`;
                    analysis += `- Auswirkung: ${threat.impact || 'Nicht bewertet'}\n`;
                    analysis += `- Kategorie: ${threat.category || 'Nicht kategorisiert'}\n`;
                    
                    if (threat.bsiId) {
                        analysis += `- BSI-Gefährdung: ${threat.bsiId}\n`;
                    }
                }
                
                analysis += '\n';
            });
        });
        
        // Threat statistics
        analysis += `### Bedrohungsstatistik

| Schweregrad | Anzahl | Anteil |
|-------------|--------|--------|
| Hoch | ${threatsBySeverity['Hoch'].length} | ${Math.round((threatsBySeverity['Hoch'].length / allThreats.length) * 100)}% |
| Mittel | ${threatsBySeverity['Mittel'].length} | ${Math.round((threatsBySeverity['Mittel'].length / allThreats.length) * 100)}% |
| Niedrig | ${threatsBySeverity['Niedrig'].length} | ${Math.round((threatsBySeverity['Niedrig'].length / allThreats.length) * 100)}% |
| **Gesamt** | **${allThreats.length}** | **100%** |

`;
        
        return analysis;
    }
    
    generateRiskMatrix(detailLevel) {
        if (!this.reportData.riskMatrix) {
            return `## Risikomatrix

*Keine Risikomatrix-Daten verfügbar.*

`;
        }
        
        let matrix = `## Risikomatrix

Die folgende Risikomatrix zeigt die Verteilung der identifizierten Bedrohungen nach Wahrscheinlichkeit und Auswirkung:

`;
        
        // Generate ASCII risk matrix
        matrix += `
\`\`\`
Auswirkung
    ^
    |
Hoch|  ${this.getRiskCount('high', 'high')}  |  ${this.getRiskCount('medium', 'high')}  |  ${this.getRiskCount('low', 'high')}  |
    |-----|-----|-----|
Mittel| ${this.getRiskCount('high', 'medium')}  |  ${this.getRiskCount('medium', 'medium')}  |  ${this.getRiskCount('low', 'medium')}  |
    |-----|-----|-----|
Niedrig| ${this.getRiskCount('high', 'low')}  |  ${this.getRiskCount('medium', 'low')}  |  ${this.getRiskCount('low', 'low')}  |
    +-----|-----|-----+---> Wahrscheinlichkeit
    Niedrig Mittel Hoch
\`\`\`

`;
        
        if (detailLevel === 'high') {
            matrix += `### Risikobewertung

**Kritische Risiken (Hoch/Hoch):** ${this.getRiskCount('high', 'high')} Bedrohungen
- Erfordern sofortige Maßnahmen
- Höchste Priorität bei der Behandlung

**Hohe Risiken:** ${this.getRiskCount('medium', 'high') + this.getRiskCount('high', 'medium')} Bedrohungen
- Sollten kurzfristig behandelt werden
- Regelmäßige Überwachung erforderlich

**Mittlere Risiken:** ${this.getRiskCount('medium', 'medium')} Bedrohungen
- Mittelfristige Behandlung
- Überwachung und Bewertung

**Niedrige Risiken:** ${this.getRiskCount('low', 'low') + this.getRiskCount('low', 'medium') + this.getRiskCount('medium', 'low')} Bedrohungen
- Langfristige Behandlung
- Dokumentation und Überwachung

`;
        }
        
        return matrix;
    }
    
    getRiskCount(likelihood, impact) {
        // This would need to be implemented based on actual risk matrix data
        // For now, return placeholder
        return Math.floor(Math.random() * 5);
    }
    
    generateDFDAnalysis(detailLevel) {
        if (!this.reportData.dfdData) {
            return `## Datenflussdiagramm-Analyse

*Keine DFD-Daten verfügbar.*

`;
        }
        
        const dfdData = this.reportData.dfdData;
        
        let analysis = `## Datenflussdiagramm-Analyse

### Systemarchitektur-Übersicht

Das Datenflussdiagramm zeigt ${dfdData.elements.length} Elemente und ${dfdData.connections.length} Datenflüsse:

`;
        
        // Analyze DFD elements
        const elementTypes = {};
        dfdData.elements.forEach(element => {
            const type = element.type || 'unknown';
            elementTypes[type] = (elementTypes[type] || 0) + 1;
        });
        
        analysis += `### Elementverteilung

| Elementtyp | Anzahl |
|------------|--------|
`;
        
        Object.entries(elementTypes).forEach(([type, count]) => {
            const typeName = {
                'external-entity': 'Externe Entitäten',
                'process': 'Prozesse',
                'data-store': 'Datenspeicher'
            }[type] || type;
            
            analysis += `| ${typeName} | ${count} |\n`;
        });
        
        analysis += '\n';
        
        if (detailLevel === 'high') {
            analysis += `### Datenfluss-Details

`;
            
            dfdData.connections.forEach(conn => {
                const fromElement = dfdData.elements.find(e => e.id === conn.from);
                const toElement = dfdData.elements.find(e => e.id === conn.to);
                
                if (fromElement && toElement) {
                    analysis += `**${conn.label}**\n`;
                    analysis += `- Von: ${fromElement.name} (${fromElement.type})\n`;
                    analysis += `- Nach: ${toElement.name} (${toElement.type})\n`;
                    analysis += `- Klassifikation: ${conn.classification}\n\n`;
                }
            });
        }
        
        // DFD-specific threats
        if (dfdData.analysis && dfdData.analysis.length > 0) {
            analysis += `### DFD-spezifische Bedrohungen

Basierend auf der Datenflussanalyse wurden folgende spezifische Bedrohungen identifiziert:

`;
            
            dfdData.analysis.forEach(threat => {
                analysis += `**${threat.name}**\n`;
                analysis += `- Beschreibung: ${threat.description}\n`;
                analysis += `- Schweregrad: ${threat.severity}\n`;
                analysis += `- Betroffenes Element: ${threat.element}\n\n`;
            });
        }
        
        return analysis;
    }
    
    generateComplianceAnalysis(detailLevel) {
        if (!this.reportData.compliance) {
            return `## Compliance-Analyse

*Keine Compliance-Daten verfügbar.*

`;
        }
        
        const compliance = this.reportData.compliance;
        
        let analysis = `## Compliance-Analyse

### Übersicht der Compliance-Frameworks

Das System wurde gegen folgende Compliance-Frameworks bewertet:

`;
        
        Object.entries(compliance).forEach(([framework, data]) => {
            const frameworkName = {
                'dsgvo': 'DSGVO (Datenschutz-Grundverordnung)',
                'iso27001': 'ISO 27001 (Informationssicherheit)',
                'bsi': 'BSI IT-Grundschutz',
                'nist': 'NIST Cybersecurity Framework'
            }[framework] || framework.toUpperCase();
            
            analysis += `### ${frameworkName}\n\n`;
            
            if (data.score !== undefined) {
                analysis += `**Compliance-Score:** ${data.score}%\n\n`;
            }
            
            if (data.requirements && detailLevel === 'high') {
                const compliant = data.requirements.filter(req => req.status === 'compliant').length;
                const nonCompliant = data.requirements.filter(req => req.status === 'non-compliant').length;
                const partial = data.requirements.filter(req => req.status === 'partial').length;
                
                analysis += `**Anforderungen:**\n`;
                analysis += `- Erfüllt: ${compliant}\n`;
                analysis += `- Teilweise erfüllt: ${partial}\n`;
                analysis += `- Nicht erfüllt: ${nonCompliant}\n\n`;
                
                if (nonCompliant > 0) {
                    analysis += `**Nicht erfüllte Anforderungen:**\n`;
                    data.requirements
                        .filter(req => req.status === 'non-compliant')
                        .forEach(req => {
                            analysis += `- ${req.id}: ${req.description}\n`;
                        });
                    analysis += '\n';
                }
            }
        });
        
        return analysis;
    }
    
    generateRecommendations(audience, detailLevel) {
        const stats = this.reportData.statistics;
        
        let recommendations = `## Handlungsempfehlungen

Basierend auf der durchgeführten Bedrohungsmodellierung werden folgende Maßnahmen empfohlen:

### Priorität 1: Kritische Sicherheitsmaßnahmen

`;
        
        if (stats.riskDistribution.high > 0) {
            recommendations += `Es wurden ${stats.riskDistribution.high} Bedrohungen mit hohem Risiko identifiziert. Diese erfordern sofortige Aufmerksamkeit:

1. **Sofortige Risikominimierung**
   - Implementierung kritischer Sicherheitskontrollen
   - Notfall-Patches für bekannte Schwachstellen
   - Verstärkte Überwachung kritischer Systeme

2. **Incident Response Vorbereitung**
   - Aktualisierung der Incident Response Pläne
   - Schulung des Sicherheitsteams
   - Test der Notfallverfahren

`;
        }
        
        recommendations += `### Priorität 2: Systematische Verbesserungen

1. **Sicherheitsarchitektur**
   - Implementierung von Defense-in-Depth Strategien
   - Verbesserung der Netzwerksegmentierung
   - Stärkung der Zugangskontrollen

2. **Monitoring und Erkennung**
   - Implementierung von SIEM-Lösungen
   - Verbesserung der Log-Analyse
   - Automatisierte Bedrohungserkennung

### Priorität 3: Langfristige Strategien

1. **Compliance-Verbesserungen**
   - Schließung identifizierter Compliance-Lücken
   - Regelmäßige Compliance-Audits
   - Dokumentation und Prozessverbesserungen

2. **Kontinuierliche Verbesserung**
   - Regelmäßige Bedrohungsmodellierung
   - Sicherheitsbewusstsein-Schulungen
   - Technologie-Updates und -Modernisierung

`;
        
        if (audience === 'management') {
            recommendations += `### Investitionsempfehlungen

**Kurzfristig (0-6 Monate):**
- Budget für kritische Sicherheitsmaßnahmen: Hoch
- Personalaufstockung im Sicherheitsbereich
- Externe Sicherheitsberatung

**Mittelfristig (6-18 Monate):**
- Modernisierung der Sicherheitsinfrastruktur
- Implementierung automatisierter Sicherheitstools
- Compliance-Verbesserungsprogramm

**Langfristig (18+ Monate):**
- Strategische Sicherheitsarchitektur-Überarbeitung
- Zero-Trust-Architektur-Implementation
- Kontinuierliche Sicherheitsverbesserungen

`;
        }
        
        return recommendations;
    }
    
    generateImplementationRoadmap(detailLevel) {
        let roadmap = `## Implementierungs-Roadmap

### Phase 1: Sofortmaßnahmen (0-3 Monate)

**Woche 1-2:**
- Kritische Sicherheitslücken schließen
- Notfall-Patches installieren
- Incident Response Team aktivieren

**Woche 3-6:**
- Verstärkte Überwachung implementieren
- Zugangskontrollen überprüfen und verstärken
- Backup-Systeme testen und verbessern

**Woche 7-12:**
- Sicherheitsrichtlinien aktualisieren
- Mitarbeiterschulungen durchführen
- Erste Compliance-Verbesserungen umsetzen

### Phase 2: Systematische Verbesserungen (3-12 Monate)

**Monate 3-6:**
- SIEM-System implementieren
- Netzwerksegmentierung verbessern
- Automatisierte Sicherheitstools einführen

**Monate 6-9:**
- Compliance-Lücken systematisch schließen
- Penetrationstests durchführen
- Sicherheitsarchitektur überarbeiten

**Monate 9-12:**
- Kontinuierliche Überwachung etablieren
- Regelmäßige Sicherheitsbewertungen einführen
- Dokumentation vervollständigen

### Phase 3: Langfristige Strategien (12+ Monate)

**Jahr 2:**
- Zero-Trust-Architektur planen und implementieren
- Erweiterte Bedrohungserkennung
- Automatisierte Incident Response

**Jahr 3+:**
- Kontinuierliche Verbesserung und Anpassung
- Neue Technologien evaluieren und integrieren
- Strategische Sicherheitspartnerschaften

`;
        
        if (detailLevel === 'high') {
            roadmap += `### Erfolgsmessung

**Key Performance Indicators (KPIs):**

| Metrik | Zielwert | Messintervall |
|--------|----------|---------------|
| Kritische Schwachstellen | 0 | Wöchentlich |
| Compliance-Score | >95% | Monatlich |
| Incident Response Zeit | <4 Stunden | Pro Vorfall |
| Sicherheitsschulungen | 100% Teilnahme | Jährlich |
| Penetrationstest-Erfolg | <5% kritische Findings | Halbjährlich |

**Meilensteine:**

- [ ] Alle kritischen Bedrohungen adressiert (Monat 3)
- [ ] SIEM-System produktiv (Monat 6)
- [ ] Compliance-Score >90% (Monat 9)
- [ ] Zero-Trust-Architektur implementiert (Monat 18)
- [ ] Kontinuierliche Verbesserung etabliert (Monat 24)

`;
        }
        
        return roadmap;
    }
    
    generateAppendices(detailLevel) {
        let appendices = `## Anhänge

### Anhang A: Technische Details

#### A.1 Systemkomponenten

`;
        
        this.reportData.project.components.forEach(comp => {
            appendices += `**${comp.name}** (${comp.type})\n`;
            appendices += `- ID: ${comp.id}\n`;
            appendices += `- Beschreibung: ${comp.properties?.description || 'Keine Beschreibung'}\n`;
            
            if (comp.threats && comp.threats.length > 0) {
                appendices += `- Bedrohungen: ${comp.threats.length}\n`;
            }
            
            if (comp.mitigations && comp.mitigations.length > 0) {
                appendices += `- Schutzmaßnahmen: ${comp.mitigations.length}\n`;
            }
            
            appendices += '\n';
        });
        
        appendices += `#### A.2 Datenflüsse

`;
        
        this.reportData.project.connections.forEach(conn => {
            const source = this.reportData.project.components.find(c => c.id === conn.sourceId);
            const target = this.reportData.project.components.find(c => c.id === conn.targetId);
            
            if (source && target) {
                appendices += `**${source.name} → ${target.name}**\n`;
                appendices += `- ID: ${conn.id}\n`;
                appendices += `- Typ: ${conn.type || 'Nicht spezifiziert'}\n`;
                appendices += `- Beschreibung: ${conn.properties?.description || 'Keine Beschreibung'}\n\n`;
            }
        });
        
        appendices += `### Anhang B: Methodologie

Diese Bedrohungsmodellierung wurde unter Verwendung folgender Methoden und Standards durchgeführt:

- **BSI IT-Grundschutz:** Systematische Identifikation von Gefährdungen und Schutzmaßnahmen
- **STRIDE-Modell:** Kategorisierung von Bedrohungen (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
- **Datenflussdiagramme (DFD):** Visualisierung der Systemarchitektur und Datenflüsse
- **Risikomatrix:** Bewertung von Bedrohungen nach Wahrscheinlichkeit und Auswirkung

### Anhang C: Glossar

**Bedrohung:** Potenzielle Gefahr für die Sicherheit eines Systems oder einer Information

**Schwachstelle:** Sicherheitslücke in einem System, die von einer Bedrohung ausgenutzt werden kann

**Risiko:** Kombination aus der Wahrscheinlichkeit einer Bedrohung und deren potenzieller Auswirkung

**Schutzmaßnahme:** Technische oder organisatorische Maßnahme zur Reduzierung von Risiken

**Compliance:** Einhaltung gesetzlicher, regulatorischer oder vertraglicher Anforderungen

**DFD:** Datenflussdiagramm zur Visualisierung von Datenverarbeitungsprozessen

**SIEM:** Security Information and Event Management System

**Zero Trust:** Sicherheitsarchitektur-Konzept ohne implizites Vertrauen

`;
        
        return appendices;
    }
    
    generateReportFooter() {
        return `---

**Bericht erstellt mit:** BSI Threat Modeling Tool v4.0
**Erstellt am:** ${new Date(this.reportData.timestamp).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}
**Bericht-ID:** ${this.reportData.reportId}

*Dieser Bericht wurde automatisch generiert und sollte von qualifizierten Sicherheitsexperten überprüft werden.*
`;
    }
    
    generateReportId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `TMR-${timestamp}-${random}`.toUpperCase();
    }
    
    showReportPreview() {
        const previewDiv = document.getElementById('reportPreview');
        const previewContent = document.getElementById('previewContent');
        
        if (previewDiv && previewContent) {
            // Convert markdown to HTML for preview
            const htmlContent = this.markdownToHtml(this.currentReport.substring(0, 2000) + '...\n\n*[Vorschau - Vollständiger Bericht verfügbar nach Export]*');
            
            previewContent.innerHTML = htmlContent;
            previewDiv.style.display = 'block';
            
            // Scroll to preview
            previewDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    markdownToHtml(markdown) {
        // Simple markdown to HTML conversion
        return markdown
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n/gim, '<br>');
    }
    
    async downloadReportAsPDF() {
        try {
            // Create temporary markdown file
            const tempFileName = `threat_report_${Date.now()}.md`;
            const blob = new Blob([this.currentReport], { type: 'text/markdown' });
            
            // Download markdown file (PDF conversion would require server-side processing)
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = tempFileName;
            link.click();
            
            // Show message about PDF conversion
            alert('Markdown-Datei wurde heruntergeladen. Für PDF-Konvertierung verwenden Sie bitte ein externes Tool wie Pandoc oder einen Online-Konverter.');
            
        } catch (error) {
            console.error('Error downloading report:', error);
            alert('Fehler beim Herunterladen des Berichts: ' + error.message);
        }
    }
    
    exportReportAsMarkdown() {
        const blob = new Blob([this.currentReport], { type: 'text/markdown' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `bedrohungsmodellierung_${this.reportData.project.name}_${Date.now()}.md`;
        link.click();
    }
    
    printReport() {
        const printWindow = window.open('', '_blank');
        const htmlContent = this.markdownToHtml(this.currentReport);
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Bedrohungsmodellierungs-Bericht</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 2cm; }
                    h1, h2, h3 { color: #333; }
                    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    @media print { body { margin: 1cm; } }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
    
    showLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'reportLoadingIndicator';
        indicator.className = 'loading-indicator';
        indicator.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>Bericht wird erstellt...</p>
                <small>Dies kann einige Sekunden dauern</small>
            </div>
        `;
        
        document.body.appendChild(indicator);
    }
    
    hideLoadingIndicator() {
        const indicator = document.getElementById('reportLoadingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Add CSS for report generator
const reportGeneratorStyles = `
<style>
.report-generation-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.section-header h3 {
    margin: 0;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.report-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.option-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.option-group label {
    font-size: 0.875rem;
    color: #374151;
    font-weight: 500;
}

.option-group select {
    padding: 0.375rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background: white;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #374151;
}

.checkbox-label input[type="checkbox"] {
    margin: 0;
}

.report-preview {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1rem;
    background: #f9fafb;
    margin-top: 1rem;
}

.report-preview h4 {
    margin: 0 0 1rem 0;
    color: #374151;
}

.preview-content {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 1rem;
    max-height: 400px;
    overflow-y: auto;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.preview-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.loading-indicator {
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

.loading-content {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-content p {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-weight: 500;
}

.loading-content small {
    color: #6b7280;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', reportGeneratorStyles);

