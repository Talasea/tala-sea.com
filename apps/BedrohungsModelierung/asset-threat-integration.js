// BSI Threat Modeling Tool - Asset-Threat Integration Module
// Integration der Asset-Modellierung mit Bedrohungen und Risiken

class AssetThreatIntegration {
  constructor() {
    this.assetRiskMatrix = [];
    this.threatAssetMappings = new Map();
    this.automaticMappingRules = [];
    this.initializeMappingRules();
  }

  // Initialisierung der automatischen Zuordnungsregeln
  initializeMappingRules() {
    this.automaticMappingRules = [
      // Server-spezifische Bedrohungen
      {
        assetType: 'server',
        location: 'DMZ',
        threats: ['C001.01', 'C001.02', 'C001.04', 'C001.10', 'P001.06'],
        confidence: 0.9
      },
      {
        assetType: 'server',
        location: 'Internes Netzwerk',
        threats: ['C001.06', 'C001.07', 'M001.07', 'P001.06'],
        confidence: 0.85
      },
      // Datenbank-spezifische Bedrohungen
      {
        assetType: 'database',
        threats: ['C001.05', 'C001.06', 'C001.08', 'M001.03', 'M001.07'],
        confidence: 0.95
      },
      // Anwendungs-spezifische Bedrohungen
      {
        assetType: 'application',
        threats: ['C001.01', 'C001.08', 'C001.09', 'M001.05', 'M001.07'],
        confidence: 0.8
      },
      // Netzwerk-spezifische Bedrohungen
      {
        assetType: 'network',
        threats: ['C001.02', 'C001.04', 'C001.10', 'C001.11', 'P001.06'],
        confidence: 0.9
      },
      // Daten-spezifische Bedrohungen
      {
        assetType: 'data',
        threats: ['C001.05', 'M001.02', 'M001.03', 'P001.04'],
        confidence: 0.95
      },
      // Personal-spezifische Bedrohungen
      {
        assetType: 'personnel',
        threats: ['M001.01', 'M001.02', 'M001.06', 'M001.08'],
        confidence: 0.85
      },
      // Einrichtungs-spezifische Bedrohungen
      {
        assetType: 'facility',
        threats: ['P001.01', 'P001.03', 'P001.05', 'E001.01', 'E001.02', 'E001.03'],
        confidence: 0.9
      },
      // Geräte-spezifische Bedrohungen
      {
        assetType: 'device',
        threats: ['P001.04', 'M001.05', 'C001.07'],
        confidence: 0.8
      }
    ];
  }

  // Automatische Bedrohungszuordnung für ein Asset
  autoAssignThreats(asset) {
    const assignedThreats = [];
    const confidenceScores = {};

    this.automaticMappingRules.forEach(rule => {
      let matches = false;
      let confidence = rule.confidence;

      // Typ-basierte Zuordnung
      if (rule.assetType === asset.type) {
        matches = true;
      }

      // Standort-basierte Zuordnung (falls spezifiziert)
      if (rule.location && asset.location) {
        if (asset.location.toLowerCase().includes(rule.location.toLowerCase())) {
          matches = true;
          confidence += 0.1; // Bonus für Standort-Match
        } else if (rule.location) {
          matches = false; // Standort muss übereinstimmen, wenn spezifiziert
        }
      }

      // Kritikalitäts-basierte Anpassung
      if (matches && asset.criticality === 3) {
        confidence += 0.05; // Bonus für kritische Assets
      }

      if (matches) {
        rule.threats.forEach(threatId => {
          if (!assignedThreats.includes(threatId)) {
            assignedThreats.push(threatId);
            confidenceScores[threatId] = Math.min(confidence, 1.0);
          }
        });
      }
    });

    return {
      threats: assignedThreats,
      confidenceScores: confidenceScores
    };
  }

  // Alle Assets automatisch mit Bedrohungen verknüpfen
  autoAssignAllAssets() {
    let totalAssignments = 0;
    const assignmentLog = [];

    allAssets.forEach(asset => {
      const assignment = this.autoAssignThreats(asset);
      
      // Nur neue Bedrohungen hinzufügen
      const newThreats = assignment.threats.filter(threatId => 
        !asset.associatedThreats.includes(threatId)
      );

      if (newThreats.length > 0) {
        asset.associatedThreats.push(...newThreats);
        totalAssignments += newThreats.length;

        assignmentLog.push({
          assetId: asset.id,
          assetName: asset.name,
          newThreats: newThreats,
          confidenceScores: assignment.confidenceScores
        });
      }
    });

    // Daten speichern
    saveAssetDataToStorage();

    return {
      totalAssignments,
      assignmentLog
    };
  }

  // Asset-Risiko-Matrix generieren
  generateAssetRiskMatrix() {
    this.assetRiskMatrix = [];

    allAssets.forEach(asset => {
      const assetRisk = calculateAssetRisk(asset);
      const ciaScore = calculateAssetCIAScore(asset);
      
      // Bedrohungsanalyse für das Asset
      const threatAnalysis = this.analyzeAssetThreats(asset);
      
      const matrixEntry = {
        asset: asset,
        riskScore: assetRisk.assetRisk,
        criticalityScore: asset.criticality,
        ciaScore: ciaScore.total,
        threatCount: asset.associatedThreats.length,
        highRiskThreats: threatAnalysis.highRiskThreats,
        mediumRiskThreats: threatAnalysis.mediumRiskThreats,
        lowRiskThreats: threatAnalysis.lowRiskThreats,
        controlCoverage: this.calculateControlCoverage(asset),
        residualRisk: this.calculateResidualRisk(asset)
      };

      this.assetRiskMatrix.push(matrixEntry);
    });

    // Nach Risiko sortieren
    this.assetRiskMatrix.sort((a, b) => b.riskScore - a.riskScore);

    return this.assetRiskMatrix;
  }

  // Bedrohungsanalyse für ein Asset
  analyzeAssetThreats(asset) {
    const analysis = {
      highRiskThreats: [],
      mediumRiskThreats: [],
      lowRiskThreats: [],
      totalRiskScore: 0
    };

    asset.associatedThreats.forEach(threatId => {
      const threat = allThreats.find(t => t.id === threatId);
      if (threat) {
        const riskLevel = getRiskLevel(threat.position.row, threat.position.col);
        const riskScore = threat.position.row * threat.position.col;

        const threatInfo = {
          id: threat.id,
          name: threat.name,
          riskLevel: riskLevel,
          riskScore: riskScore,
          position: threat.position
        };

        if (riskLevel === 'Hohes Risiko') {
          analysis.highRiskThreats.push(threatInfo);
        } else if (riskLevel === 'Mittleres Risiko') {
          analysis.mediumRiskThreats.push(threatInfo);
        } else {
          analysis.lowRiskThreats.push(threatInfo);
        }

        analysis.totalRiskScore += riskScore;
      }
    });

    return analysis;
  }

  // Schutzmaßnahmen-Abdeckung berechnen
  calculateControlCoverage(asset) {
    const totalThreats = asset.associatedThreats.length;
    if (totalThreats === 0) return 1.0;

    // Vereinfachte Berechnung: Anzahl der Schutzmaßnahmen vs. Bedrohungen
    const controlCount = asset.associatedControls.length;
    const coverage = Math.min(controlCount / totalThreats, 1.0);

    return {
      coverage: coverage,
      controlCount: controlCount,
      threatCount: totalThreats,
      coveragePercentage: Math.round(coverage * 100)
    };
  }

  // Residualrisiko berechnen
  calculateResidualRisk(asset) {
    const baseRisk = calculateAssetRisk(asset).assetRisk;
    const controlCoverage = this.calculateControlCoverage(asset);
    
    // Residualrisiko = Basisrisiko * (1 - Schutzmaßnahmen-Abdeckung)
    const residualRisk = baseRisk * (1 - controlCoverage.coverage * 0.7); // 70% max. Risikoreduktion
    
    return {
      baseRisk: baseRisk,
      residualRisk: residualRisk,
      riskReduction: baseRisk - residualRisk,
      reductionPercentage: Math.round(((baseRisk - residualRisk) / baseRisk) * 100)
    };
  }

  // Asset-Bedrohungs-Heatmap generieren
  generateAssetThreatHeatmap() {
    const heatmapData = [];

    // Alle einzigartigen Bedrohungen sammeln
    const allThreatIds = [...new Set(allAssets.flatMap(asset => asset.associatedThreats))];
    
    allAssets.forEach(asset => {
      const assetRow = {
        assetId: asset.id,
        assetName: asset.name,
        assetType: asset.type,
        criticality: asset.criticality,
        threats: {}
      };

      allThreatIds.forEach(threatId => {
        const isAssigned = asset.associatedThreats.includes(threatId);
        const threat = allThreats.find(t => t.id === threatId);
        
        assetRow.threats[threatId] = {
          assigned: isAssigned,
          riskScore: isAssigned && threat ? threat.position.row * threat.position.col : 0,
          impactOnAsset: isAssigned ? this.calculateThreatImpactOnAsset(asset, threat) : 0
        };
      });

      heatmapData.push(assetRow);
    });

    return {
      heatmapData: heatmapData,
      threatIds: allThreatIds,
      threats: allThreatIds.map(id => allThreats.find(t => t.id === id)).filter(t => t)
    };
  }

  // Bedrohungsauswirkung auf Asset berechnen
  calculateThreatImpactOnAsset(asset, threat) {
    if (!threat) return 0;

    const threatRisk = threat.position.row * threat.position.col;
    const assetCriticality = asset.criticality / 3; // Normalisiert auf 0-1
    const ciaImpact = (asset.cia.confidentiality + asset.cia.integrity + asset.cia.availability) / 30; // Normalisiert auf 0-1

    return threatRisk * assetCriticality * ciaImpact;
  }

  // Asset-Abhängigkeiten analysieren
  analyzeAssetDependencies() {
    const dependencies = [];

    allAssets.forEach(asset => {
      allAssets.forEach(otherAsset => {
        if (asset.id === otherAsset.id) return;

        // Gemeinsame Bedrohungen finden
        const commonThreats = asset.associatedThreats.filter(threatId =>
          otherAsset.associatedThreats.includes(threatId)
        );

        // Gemeinsame Schutzmaßnahmen finden
        const commonControls = asset.associatedControls.filter(controlId =>
          otherAsset.associatedControls.includes(controlId)
        );

        if (commonThreats.length > 0 || commonControls.length > 0) {
          const dependencyStrength = (commonThreats.length * 2 + commonControls.length) / 10;
          
          dependencies.push({
            fromAsset: asset.id,
            toAsset: otherAsset.id,
            commonThreats: commonThreats,
            commonControls: commonControls,
            strength: Math.min(dependencyStrength, 1.0),
            type: this.determineDependencyType(asset, otherAsset, commonThreats, commonControls)
          });
        }
      });
    });

    return dependencies;
  }

  // Abhängigkeitstyp bestimmen
  determineDependencyType(asset1, asset2, commonThreats, commonControls) {
    // Logik zur Bestimmung des Abhängigkeitstyps
    if (asset1.type === 'database' && asset2.type === 'application') {
      return 'data_dependency';
    } else if (asset1.type === 'server' && asset2.type === 'application') {
      return 'hosting_dependency';
    } else if (asset1.type === 'network' && (asset2.type === 'server' || asset2.type === 'application')) {
      return 'network_dependency';
    } else if (commonControls.length > commonThreats.length) {
      return 'control_dependency';
    } else {
      return 'threat_dependency';
    }
  }

  // Asset-Risiko-Dashboard-Daten generieren
  generateAssetRiskDashboard() {
    const dashboard = {
      summary: {
        totalAssets: allAssets.length,
        criticalAssets: allAssets.filter(a => a.criticality === 3).length,
        mediumAssets: allAssets.filter(a => a.criticality === 2).length,
        lowAssets: allAssets.filter(a => a.criticality === 1).length,
        totalThreats: [...new Set(allAssets.flatMap(a => a.associatedThreats))].length,
        totalControls: [...new Set(allAssets.flatMap(a => a.associatedControls))].length
      },
      riskDistribution: this.calculateRiskDistribution(),
      topRiskAssets: this.getTopRiskAssets(10),
      controlGaps: this.identifyControlGaps(),
      threatCoverage: this.calculateThreatCoverage(),
      complianceStatus: this.assessComplianceStatus()
    };

    return dashboard;
  }

  // Risikoverteilung berechnen
  calculateRiskDistribution() {
    const distribution = {
      high: 0,
      medium: 0,
      low: 0
    };

    allAssets.forEach(asset => {
      const risk = calculateAssetRisk(asset).assetRisk;
      if (risk >= 7) {
        distribution.high++;
      } else if (risk >= 4) {
        distribution.medium++;
      } else {
        distribution.low++;
      }
    });

    return distribution;
  }

  // Top-Risiko-Assets ermitteln
  getTopRiskAssets(count = 10) {
    const assetRisks = allAssets.map(asset => ({
      asset: asset,
      risk: calculateAssetRisk(asset)
    }));

    return assetRisks
      .sort((a, b) => b.risk.assetRisk - a.risk.assetRisk)
      .slice(0, count);
  }

  // Schutzmaßnahmen-Lücken identifizieren
  identifyControlGaps() {
    const gaps = [];

    allAssets.forEach(asset => {
      const threatCount = asset.associatedThreats.length;
      const controlCount = asset.associatedControls.length;
      
      if (threatCount > controlCount) {
        const gap = threatCount - controlCount;
        gaps.push({
          assetId: asset.id,
          assetName: asset.name,
          threatCount: threatCount,
          controlCount: controlCount,
          gap: gap,
          gapPercentage: Math.round((gap / threatCount) * 100)
        });
      }
    });

    return gaps.sort((a, b) => b.gap - a.gap);
  }

  // Bedrohungsabdeckung berechnen
  calculateThreatCoverage() {
    const allThreatIds = [...new Set(allAssets.flatMap(a => a.associatedThreats))];
    const coverage = {};

    allThreatIds.forEach(threatId => {
      const assetsWithThreat = allAssets.filter(a => a.associatedThreats.includes(threatId));
      const assetsWithControls = assetsWithThreat.filter(a => a.associatedControls.length > 0);
      
      coverage[threatId] = {
        totalAssets: assetsWithThreat.length,
        protectedAssets: assetsWithControls.length,
        coveragePercentage: assetsWithThreat.length > 0 ? 
          Math.round((assetsWithControls.length / assetsWithThreat.length) * 100) : 0
      };
    });

    return coverage;
  }

  // Compliance-Status bewerten
  assessComplianceStatus() {
    const compliance = {
      dsgvo: this.assessDSGVOCompliance(),
      iso27001: this.assessISO27001Compliance(),
      bsiGrundschutz: this.assessBSICompliance()
    };

    return compliance;
  }

  // DSGVO-Compliance bewerten
  assessDSGVOCompliance() {
    const dataAssets = allAssets.filter(a => a.type === 'data');
    const personalDataAssets = dataAssets.filter(a => 
      a.name.toLowerCase().includes('personal') || 
      a.description.toLowerCase().includes('personal') ||
      a.name.toLowerCase().includes('mitarbeiter') ||
      a.name.toLowerCase().includes('kunden')
    );

    let compliantAssets = 0;
    personalDataAssets.forEach(asset => {
      const hasPrivacyControls = asset.associatedControls.some(controlId => {
        const control = securityControls.find(c => c.id === controlId);
        return control && control.name.toLowerCase().includes('datenschutz');
      });
      
      if (hasPrivacyControls && asset.cia.confidentiality >= 8) {
        compliantAssets++;
      }
    });

    return {
      totalPersonalDataAssets: personalDataAssets.length,
      compliantAssets: compliantAssets,
      compliancePercentage: personalDataAssets.length > 0 ? 
        Math.round((compliantAssets / personalDataAssets.length) * 100) : 100
    };
  }

  // ISO 27001 Compliance bewerten
  assessISO27001Compliance() {
    const criticalAssets = allAssets.filter(a => a.criticality === 3);
    let compliantAssets = 0;

    criticalAssets.forEach(asset => {
      const hasAdequateControls = asset.associatedControls.length >= 2;
      const hasHighCIA = (asset.cia.confidentiality + asset.cia.integrity + asset.cia.availability) >= 24;
      
      if (hasAdequateControls && hasHighCIA) {
        compliantAssets++;
      }
    });

    return {
      totalCriticalAssets: criticalAssets.length,
      compliantAssets: compliantAssets,
      compliancePercentage: criticalAssets.length > 0 ? 
        Math.round((compliantAssets / criticalAssets.length) * 100) : 100
    };
  }

  // BSI IT-Grundschutz Compliance bewerten
  assessBSICompliance() {
    let compliantAssets = 0;

    allAssets.forEach(asset => {
      const hasBSIThreats = asset.associatedThreats.some(threatId => 
        threatId.startsWith('C001') || threatId.startsWith('P001') || 
        threatId.startsWith('E001') || threatId.startsWith('M001')
      );
      
      const hasAdequateControls = asset.associatedControls.length > 0;
      
      if (hasBSIThreats && hasAdequateControls) {
        compliantAssets++;
      }
    });

    return {
      totalAssets: allAssets.length,
      compliantAssets: compliantAssets,
      compliancePercentage: allAssets.length > 0 ? 
        Math.round((compliantAssets / allAssets.length) * 100) : 100
    };
  }

  // Empfehlungen für Asset-Sicherheit generieren
  generateSecurityRecommendations() {
    const recommendations = [];

    // Analyse jedes Assets
    allAssets.forEach(asset => {
      const assetRecommendations = this.generateAssetRecommendations(asset);
      if (assetRecommendations.length > 0) {
        recommendations.push({
          assetId: asset.id,
          assetName: asset.name,
          recommendations: assetRecommendations
        });
      }
    });

    return recommendations;
  }

  // Empfehlungen für einzelnes Asset
  generateAssetRecommendations(asset) {
    const recommendations = [];
    const risk = calculateAssetRisk(asset);
    const controlCoverage = this.calculateControlCoverage(asset);

    // Hohe Risiko-Empfehlungen
    if (risk.assetRisk >= 7) {
      recommendations.push({
        priority: 'high',
        category: 'risk_reduction',
        title: 'Hohes Risiko reduzieren',
        description: `Asset ${asset.name} hat ein hohes Risiko (${risk.assetRisk.toFixed(2)}). Zusätzliche Schutzmaßnahmen erforderlich.`,
        actions: ['Zusätzliche Schutzmaßnahmen implementieren', 'Regelmäßige Sicherheitsüberprüfungen', 'Incident Response Plan aktualisieren']
      });
    }

    // Schutzmaßnahmen-Lücken
    if (controlCoverage.coverage < 0.5) {
      recommendations.push({
        priority: 'medium',
        category: 'control_gaps',
        title: 'Schutzmaßnahmen-Lücken schließen',
        description: `Nur ${controlCoverage.coveragePercentage}% der Bedrohungen sind durch Schutzmaßnahmen abgedeckt.`,
        actions: ['Fehlende Schutzmaßnahmen identifizieren', 'Implementierungsplan erstellen', 'Budget für Sicherheitsmaßnahmen beantragen']
      });
    }

    // CIA-Bewertungs-Empfehlungen
    if (asset.criticality === 3) {
      if (asset.cia.confidentiality < 8) {
        recommendations.push({
          priority: 'medium',
          category: 'cia_improvement',
          title: 'Vertraulichkeit verbessern',
          description: 'Kritisches Asset benötigt höhere Vertraulichkeits-Bewertung.',
          actions: ['Verschlüsselung implementieren', 'Zugriffskontrolle verstärken', 'Datenklassifikation überprüfen']
        });
      }

      if (asset.cia.availability < 8) {
        recommendations.push({
          priority: 'high',
          category: 'cia_improvement',
          title: 'Verfügbarkeit verbessern',
          description: 'Kritisches Asset benötigt höhere Verfügbarkeits-Bewertung.',
          actions: ['Redundanz implementieren', 'Backup-Strategien überprüfen', 'Disaster Recovery Plan erstellen']
        });
      }
    }

    return recommendations;
  }
}

// Globale Integration-Instanz
let assetThreatIntegration = null;

// Integration initialisieren
document.addEventListener('DOMContentLoaded', function() {
  if (!assetThreatIntegration) {
    assetThreatIntegration = new AssetThreatIntegration();
  }
});

