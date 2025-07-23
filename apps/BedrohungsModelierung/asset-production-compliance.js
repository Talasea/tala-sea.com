// BSI Threat Modeling Tool - Asset Production & Compliance Module
// Produktionstauglichkeit und Compliance-Features für Asset-Modellierung

class AssetProductionCompliance {
  constructor() {
    this.complianceFrameworks = {
      dsgvo: 'DSGVO',
      iso27001: 'ISO 27001',
      bsiGrundschutz: 'BSI IT-Grundschutz',
      nistCsf: 'NIST Cybersecurity Framework',
      sox: 'Sarbanes-Oxley Act',
      pciDss: 'PCI DSS'
    };
    this.auditLog = [];
    this.performanceMetrics = {
      assetLoadTime: 0,
      canvasRenderTime: 0,
      riskCalculationTime: 0,
      reportGenerationTime: 0
    };
    this.errorHandling = new AssetErrorHandler();
    this.dataValidation = new AssetDataValidator();
  }

  // Produktionstauglichkeits-Initialisierung
  initializeProductionFeatures() {
    this.setupPerformanceMonitoring();
    this.setupErrorHandling();
    this.setupDataValidation();
    this.setupAuditLogging();
    this.setupBackupAndRestore();
    this.setupSecurityFeatures();
    this.initializeComplianceChecks();
  }

  // Performance-Monitoring einrichten
  setupPerformanceMonitoring() {
    // Asset-Lade-Performance überwachen
    const originalPopulateAssets = assetManager.populateAssets;
    assetManager.populateAssets = (...args) => {
      const startTime = performance.now();
      const result = originalPopulateAssets.apply(assetManager, args);
      this.performanceMetrics.assetLoadTime = performance.now() - startTime;
      this.logPerformanceMetric('assetLoad', this.performanceMetrics.assetLoadTime);
      return result;
    };

    // Canvas-Render-Performance überwachen
    const originalRenderCanvas = assetManager.renderAssetCanvas;
    assetManager.renderAssetCanvas = (...args) => {
      const startTime = performance.now();
      const result = originalRenderCanvas.apply(assetManager, args);
      this.performanceMetrics.canvasRenderTime = performance.now() - startTime;
      this.logPerformanceMetric('canvasRender', this.performanceMetrics.canvasRenderTime);
      return result;
    };

    // Risiko-Berechnungs-Performance überwachen
    const originalCalculateRisk = calculateAssetRisk;
    window.calculateAssetRisk = (asset) => {
      const startTime = performance.now();
      const result = originalCalculateRisk(asset);
      this.performanceMetrics.riskCalculationTime = performance.now() - startTime;
      return result;
    };

    // Performance-Dashboard aktualisieren
    setInterval(() => {
      this.updatePerformanceDashboard();
    }, 5000);
  }

  // Performance-Metrik protokollieren
  logPerformanceMetric(operation, duration) {
    const metric = {
      timestamp: new Date().toISOString(),
      operation: operation,
      duration: duration,
      threshold: this.getPerformanceThreshold(operation),
      status: duration > this.getPerformanceThreshold(operation) ? 'warning' : 'ok'
    };

    // Warnung bei Performance-Problemen
    if (metric.status === 'warning') {
      console.warn(`Performance Warning: ${operation} took ${duration.toFixed(2)}ms (threshold: ${metric.threshold}ms)`);
      this.logAuditEvent('performance_warning', `${operation} exceeded performance threshold`, { metric });
    }

    // Metrik speichern
    const performanceLog = JSON.parse(localStorage.getItem('threatModeling_performanceLog') || '[]');
    performanceLog.push(metric);
    
    // Nur die letzten 1000 Einträge behalten
    if (performanceLog.length > 1000) {
      performanceLog.splice(0, performanceLog.length - 1000);
    }
    
    localStorage.setItem('threatModeling_performanceLog', JSON.stringify(performanceLog));
  }

  // Performance-Schwellenwerte
  getPerformanceThreshold(operation) {
    const thresholds = {
      assetLoad: 500,      // 500ms
      canvasRender: 100,   // 100ms
      riskCalculation: 50, // 50ms
      reportGeneration: 2000 // 2s
    };
    return thresholds[operation] || 1000;
  }

  // Fehlerbehandlung einrichten
  setupErrorHandling() {
    // Globale Fehlerbehandlung
    window.addEventListener('error', (event) => {
      this.handleError('javascript_error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Promise-Rejection-Behandlung
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('promise_rejection', event.reason);
    });

    // Asset-spezifische Fehlerbehandlung
    this.wrapAssetFunctionsWithErrorHandling();
  }

  // Asset-Funktionen mit Fehlerbehandlung umhüllen
  wrapAssetFunctionsWithErrorHandling() {
    const functionsToWrap = [
      'selectAsset',
      'addAssetToCanvas',
      'autoLayoutAssets',
      'generateAssetRiskMatrix'
    ];

    functionsToWrap.forEach(funcName => {
      if (assetManager[funcName]) {
        const originalFunc = assetManager[funcName];
        assetManager[funcName] = (...args) => {
          try {
            return originalFunc.apply(assetManager, args);
          } catch (error) {
            this.handleError(`asset_${funcName}_error`, error, { args });
            this.showUserFriendlyError(`Fehler bei ${funcName}`, 'Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.');
            return null;
          }
        };
      }
    });
  }

  // Fehler behandeln
  handleError(type, error, context = {}) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      type: type,
      message: error.message || error.toString(),
      stack: error.stack,
      context: context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Fehler protokollieren
    console.error('Asset Error:', errorInfo);
    this.logAuditEvent('error', `${type}: ${errorInfo.message}`, errorInfo);

    // Fehler-Statistiken aktualisieren
    this.updateErrorStatistics(type);

    // Bei kritischen Fehlern Backup erstellen
    if (this.isCriticalError(type)) {
      this.createEmergencyBackup();
    }
  }

  // Benutzerfreundliche Fehlermeldung anzeigen
  showUserFriendlyError(title, message) {
    // Erstelle eine benutzerfreundliche Fehlermeldung
    const errorDiv = document.createElement('div');
    errorDiv.className = 'asset-error-notification';
    errorDiv.innerHTML = `
      <div class="error-content">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>${title}</h4>
        <p>${message}</p>
        <button onclick="this.parentElement.parentElement.remove()">Schließen</button>
      </div>
    `;

    document.body.appendChild(errorDiv);

    // Automatisch nach 10 Sekunden entfernen
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 10000);
  }

  // Datenvalidierung einrichten
  setupDataValidation() {
    // Asset-Daten vor dem Speichern validieren
    const originalSaveAssetData = saveAssetDataToStorage;
    window.saveAssetDataToStorage = () => {
      try {
        // Validierung durchführen
        const validationResult = this.dataValidation.validateAllAssets();
        
        if (!validationResult.isValid) {
          console.warn('Asset Data Validation Warnings:', validationResult.warnings);
          this.logAuditEvent('data_validation_warning', 'Asset data validation found issues', validationResult);
        }

        // Daten speichern
        return originalSaveAssetData();
      } catch (error) {
        this.handleError('data_save_error', error);
        return false;
      }
    };
  }

  // Audit-Logging einrichten
  setupAuditLogging() {
    // Asset-Änderungen protokollieren
    this.setupAssetChangeLogging();
    
    // Benutzeraktionen protokollieren
    this.setupUserActionLogging();
    
    // System-Events protokollieren
    this.setupSystemEventLogging();
  }

  // Asset-Änderungen protokollieren
  setupAssetChangeLogging() {
    // Asset-Erstellung protokollieren
    const originalAddAsset = assetManager.addAsset;
    if (originalAddAsset) {
      assetManager.addAsset = (asset) => {
        this.logAuditEvent('asset_created', `Asset ${asset.id} created`, { asset });
        return originalAddAsset.call(assetManager, asset);
      };
    }

    // Asset-Änderungen protokollieren
    const originalUpdateAsset = assetManager.updateAsset;
    if (originalUpdateAsset) {
      assetManager.updateAsset = (asset, changes) => {
        this.logAuditEvent('asset_updated', `Asset ${asset.id} updated`, { asset, changes });
        return originalUpdateAsset.call(assetManager, asset, changes);
      };
    }

    // Asset-Löschung protokollieren
    const originalDeleteAsset = assetManager.deleteAsset;
    if (originalDeleteAsset) {
      assetManager.deleteAsset = (asset) => {
        this.logAuditEvent('asset_deleted', `Asset ${asset.id} deleted`, { asset });
        return originalDeleteAsset.call(assetManager, asset);
      };
    }
  }

  // Audit-Event protokollieren
  logAuditEvent(action, description, data = {}) {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      action: action,
      description: description,
      data: data,
      user: this.getCurrentUser(),
      sessionId: this.getSessionId(),
      ipAddress: this.getClientIP()
    };

    this.auditLog.push(auditEntry);

    // Audit-Log in localStorage speichern
    const storedAuditLog = JSON.parse(localStorage.getItem('threatModeling_auditLog') || '[]');
    storedAuditLog.push(auditEntry);
    
    // Nur die letzten 10000 Einträge behalten
    if (storedAuditLog.length > 10000) {
      storedAuditLog.splice(0, storedAuditLog.length - 10000);
    }
    
    localStorage.setItem('threatModeling_auditLog', JSON.stringify(storedAuditLog));

    // Bei kritischen Aktionen zusätzliche Sicherheitsmaßnahmen
    if (this.isCriticalAction(action)) {
      this.handleCriticalAction(auditEntry);
    }
  }

  // Backup und Wiederherstellung einrichten
  setupBackupAndRestore() {
    // Automatische Backups alle 30 Minuten
    setInterval(() => {
      this.createAutomaticBackup();
    }, 30 * 60 * 1000);

    // Backup bei kritischen Änderungen
    this.setupCriticalChangeBackup();
  }

  // Automatisches Backup erstellen
  createAutomaticBackup() {
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        version: '5.0',
        assets: allAssets,
        assetCategories: assetCategories,
        securityControls: securityControls,
        auditLog: this.auditLog.slice(-100), // Nur die letzten 100 Einträge
        performanceMetrics: this.performanceMetrics
      };

      // Backup komprimieren und speichern
      const compressedBackup = this.compressData(backupData);
      const backupKey = `threatModeling_backup_${Date.now()}`;
      
      localStorage.setItem(backupKey, compressedBackup);

      // Alte Backups löschen (nur die letzten 10 behalten)
      this.cleanupOldBackups();

      this.logAuditEvent('automatic_backup', 'Automatic backup created', { backupKey });
    } catch (error) {
      this.handleError('backup_error', error);
    }
  }

  // Notfall-Backup erstellen
  createEmergencyBackup() {
    try {
      const emergencyBackup = {
        timestamp: new Date().toISOString(),
        type: 'emergency',
        assets: allAssets,
        reason: 'Critical error detected'
      };

      localStorage.setItem('threatModeling_emergencyBackup', JSON.stringify(emergencyBackup));
      this.logAuditEvent('emergency_backup', 'Emergency backup created due to critical error');
    } catch (error) {
      console.error('Failed to create emergency backup:', error);
    }
  }

  // Sicherheitsfeatures einrichten
  setupSecurityFeatures() {
    // XSS-Schutz
    this.setupXSSProtection();
    
    // Input-Sanitization
    this.setupInputSanitization();
    
    // Session-Management
    this.setupSessionManagement();
    
    // Daten-Verschlüsselung
    this.setupDataEncryption();
  }

  // XSS-Schutz einrichten
  setupXSSProtection() {
    // Content Security Policy setzen
    const csp = document.createElement('meta');
    csp.setAttribute('http-equiv', 'Content-Security-Policy');
    csp.setAttribute('content', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");
    document.head.appendChild(csp);

    // HTML-Sanitization für Asset-Daten
    this.sanitizeAssetData();
  }

  // Asset-Daten sanitisieren
  sanitizeAssetData() {
    allAssets.forEach(asset => {
      asset.name = this.sanitizeHTML(asset.name);
      asset.description = this.sanitizeHTML(asset.description);
      asset.owner = this.sanitizeHTML(asset.owner);
      asset.location = this.sanitizeHTML(asset.location);
    });
  }

  // HTML sanitisieren
  sanitizeHTML(str) {
    if (typeof str !== 'string') return str;
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Compliance-Checks initialisieren
  initializeComplianceChecks() {
    // Regelmäßige Compliance-Überprüfungen
    setInterval(() => {
      this.performComplianceCheck();
    }, 60 * 60 * 1000); // Stündlich

    // Compliance-Dashboard einrichten
    this.setupComplianceDashboard();
  }

  // Compliance-Überprüfung durchführen
  performComplianceCheck() {
    const complianceResults = {};

    Object.keys(this.complianceFrameworks).forEach(framework => {
      complianceResults[framework] = this.checkFrameworkCompliance(framework);
    });

    // Ergebnisse speichern
    localStorage.setItem('threatModeling_complianceResults', JSON.stringify({
      timestamp: new Date().toISOString(),
      results: complianceResults
    }));

    // Audit-Event protokollieren
    this.logAuditEvent('compliance_check', 'Compliance check performed', complianceResults);

    return complianceResults;
  }

  // Framework-spezifische Compliance prüfen
  checkFrameworkCompliance(framework) {
    switch (framework) {
      case 'dsgvo':
        return this.checkDSGVOCompliance();
      case 'iso27001':
        return this.checkISO27001Compliance();
      case 'bsiGrundschutz':
        return this.checkBSICompliance();
      case 'nistCsf':
        return this.checkNISTCompliance();
      default:
        return { compliant: true, score: 100, issues: [] };
    }
  }

  // DSGVO-Compliance prüfen
  checkDSGVOCompliance() {
    const issues = [];
    let score = 100;

    // Personendaten-Assets prüfen
    const personalDataAssets = allAssets.filter(asset => 
      asset.type === 'data' && (
        asset.name.toLowerCase().includes('personal') ||
        asset.name.toLowerCase().includes('mitarbeiter') ||
        asset.name.toLowerCase().includes('kunden')
      )
    );

    personalDataAssets.forEach(asset => {
      // Vertraulichkeit prüfen
      if (asset.cia.confidentiality < 8) {
        issues.push(`Asset ${asset.id}: Vertraulichkeit zu niedrig für Personendaten`);
        score -= 10;
      }

      // Schutzmaßnahmen prüfen
      const hasPrivacyControls = asset.associatedControls.some(controlId => {
        const control = securityControls.find(c => c.id === controlId);
        return control && control.name.toLowerCase().includes('datenschutz');
      });

      if (!hasPrivacyControls) {
        issues.push(`Asset ${asset.id}: Keine Datenschutz-Schutzmaßnahmen`);
        score -= 15;
      }
    });

    return {
      compliant: score >= 80,
      score: Math.max(0, score),
      issues: issues,
      personalDataAssets: personalDataAssets.length
    };
  }

  // ISO 27001 Compliance prüfen
  checkISO27001Compliance() {
    const issues = [];
    let score = 100;

    // Kritische Assets prüfen
    const criticalAssets = allAssets.filter(a => a.criticality === 3);

    criticalAssets.forEach(asset => {
      // CIA-Bewertung prüfen
      const ciaSum = asset.cia.confidentiality + asset.cia.integrity + asset.cia.availability;
      if (ciaSum < 24) {
        issues.push(`Asset ${asset.id}: CIA-Bewertung zu niedrig für kritisches Asset`);
        score -= 10;
      }

      // Schutzmaßnahmen prüfen
      if (asset.associatedControls.length < 2) {
        issues.push(`Asset ${asset.id}: Unzureichende Schutzmaßnahmen`);
        score -= 15;
      }

      // Risikobewertung prüfen
      const risk = calculateAssetRisk(asset);
      if (risk.assetRisk > 7) {
        issues.push(`Asset ${asset.id}: Zu hohes Restrisiko`);
        score -= 10;
      }
    });

    return {
      compliant: score >= 75,
      score: Math.max(0, score),
      issues: issues,
      criticalAssets: criticalAssets.length
    };
  }

  // BSI IT-Grundschutz Compliance prüfen
  checkBSICompliance() {
    const issues = [];
    let score = 100;

    allAssets.forEach(asset => {
      // BSI-Bedrohungen prüfen
      const hasBSIThreats = asset.associatedThreats.some(threatId => 
        threatId.startsWith('C001') || threatId.startsWith('P001') || 
        threatId.startsWith('E001') || threatId.startsWith('M001')
      );

      if (!hasBSIThreats) {
        issues.push(`Asset ${asset.id}: Keine BSI-Bedrohungen zugeordnet`);
        score -= 5;
      }

      // Schutzmaßnahmen prüfen
      if (asset.associatedControls.length === 0) {
        issues.push(`Asset ${asset.id}: Keine Schutzmaßnahmen definiert`);
        score -= 10;
      }
    });

    return {
      compliant: score >= 85,
      score: Math.max(0, score),
      issues: issues,
      totalAssets: allAssets.length
    };
  }

  // NIST Cybersecurity Framework Compliance prüfen
  checkNISTCompliance() {
    const issues = [];
    let score = 100;

    // Identify, Protect, Detect, Respond, Recover Funktionen prüfen
    const nistFunctions = {
      identify: 0,
      protect: 0,
      detect: 0,
      respond: 0,
      recover: 0
    };

    allAssets.forEach(asset => {
      // Asset-Identifikation (immer erfüllt, da Asset existiert)
      nistFunctions.identify++;

      // Schutzmaßnahmen
      if (asset.associatedControls.length > 0) {
        nistFunctions.protect++;
      }

      // Erkennung (vereinfacht: Monitoring-Controls)
      const hasMonitoring = asset.associatedControls.some(controlId => {
        const control = securityControls.find(c => c.id === controlId);
        return control && (
          control.name.toLowerCase().includes('monitoring') ||
          control.name.toLowerCase().includes('detection') ||
          control.name.toLowerCase().includes('logging')
        );
      });

      if (hasMonitoring) {
        nistFunctions.detect++;
      }

      // Response (vereinfacht: Incident Response Controls)
      const hasIncidentResponse = asset.associatedControls.some(controlId => {
        const control = securityControls.find(c => c.id === controlId);
        return control && control.name.toLowerCase().includes('incident');
      });

      if (hasIncidentResponse) {
        nistFunctions.respond++;
      }

      // Recovery (vereinfacht: Backup Controls)
      const hasBackup = asset.associatedControls.some(controlId => {
        const control = securityControls.find(c => c.id === controlId);
        return control && control.name.toLowerCase().includes('backup');
      });

      if (hasBackup) {
        nistFunctions.recover++;
      }
    });

    // Score basierend auf Funktionsabdeckung
    const totalAssets = allAssets.length;
    Object.keys(nistFunctions).forEach(func => {
      const coverage = totalAssets > 0 ? (nistFunctions[func] / totalAssets) * 100 : 100;
      if (coverage < 50) {
        issues.push(`NIST ${func.toUpperCase()} Funktion: Nur ${coverage.toFixed(1)}% Abdeckung`);
        score -= 15;
      }
    });

    return {
      compliant: score >= 70,
      score: Math.max(0, score),
      issues: issues,
      functionCoverage: nistFunctions
    };
  }

  // Compliance-Dashboard einrichten
  setupComplianceDashboard() {
    // Compliance-Daten für Dashboard bereitstellen
    window.getAssetComplianceDashboard = () => {
      const results = this.performComplianceCheck();
      return {
        timestamp: new Date().toISOString(),
        overallCompliance: this.calculateOverallCompliance(results),
        frameworkResults: results,
        recommendations: this.generateComplianceRecommendations(results)
      };
    };
  }

  // Gesamte Compliance berechnen
  calculateOverallCompliance(results) {
    const scores = Object.values(results).map(r => r.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    
    return {
      score: Math.round(averageScore),
      status: averageScore >= 80 ? 'compliant' : averageScore >= 60 ? 'partial' : 'non-compliant',
      frameworkCount: scores.length,
      compliantFrameworks: scores.filter(s => s >= 80).length
    };
  }

  // Compliance-Empfehlungen generieren
  generateComplianceRecommendations(results) {
    const recommendations = [];

    Object.entries(results).forEach(([framework, result]) => {
      if (!result.compliant) {
        recommendations.push({
          framework: this.complianceFrameworks[framework],
          priority: result.score < 50 ? 'high' : 'medium',
          score: result.score,
          issues: result.issues.slice(0, 3), // Top 3 Issues
          actions: this.getFrameworkActions(framework, result)
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Framework-spezifische Aktionen
  getFrameworkActions(framework, result) {
    const actions = {
      dsgvo: [
        'Datenschutz-Schutzmaßnahmen für Personendaten implementieren',
        'Vertraulichkeits-Bewertungen für kritische Daten erhöhen',
        'Datenschutz-Folgenabschätzung durchführen'
      ],
      iso27001: [
        'Zusätzliche Schutzmaßnahmen für kritische Assets implementieren',
        'CIA-Bewertungen überprüfen und anpassen',
        'Risikomanagement-Prozesse verbessern'
      ],
      bsiGrundschutz: [
        'BSI-Bedrohungen für alle Assets zuordnen',
        'Grundlegende Schutzmaßnahmen implementieren',
        'IT-Grundschutz-Check durchführen'
      ],
      nistCsf: [
        'Monitoring und Detection Controls implementieren',
        'Incident Response Prozesse etablieren',
        'Backup und Recovery Strategien verbessern'
      ]
    };

    return actions[framework] || ['Compliance-Lücken schließen', 'Regelmäßige Überprüfungen durchführen'];
  }

  // Hilfsfunktionen
  getCurrentUser() {
    return localStorage.getItem('threatModeling_currentUser') || 'anonymous';
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('threatModeling_sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('threatModeling_sessionId', sessionId);
    }
    return sessionId;
  }

  getClientIP() {
    // In einer echten Anwendung würde dies über eine API erfolgen
    return 'localhost';
  }

  isCriticalError(type) {
    const criticalTypes = ['data_corruption', 'security_breach', 'system_failure'];
    return criticalTypes.includes(type);
  }

  isCriticalAction(action) {
    const criticalActions = ['asset_deleted', 'bulk_delete', 'data_export', 'system_reset'];
    return criticalActions.includes(action);
  }

  compressData(data) {
    // Vereinfachte Komprimierung (in Produktion würde man eine echte Komprimierung verwenden)
    return JSON.stringify(data);
  }

  cleanupOldBackups() {
    const backupKeys = Object.keys(localStorage).filter(key => key.startsWith('threatModeling_backup_'));
    if (backupKeys.length > 10) {
      backupKeys.sort().slice(0, backupKeys.length - 10).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }

  updatePerformanceDashboard() {
    // Performance-Dashboard-Daten aktualisieren
    const performanceData = {
      timestamp: new Date().toISOString(),
      metrics: this.performanceMetrics,
      status: this.getPerformanceStatus(),
      recommendations: this.getPerformanceRecommendations()
    };

    localStorage.setItem('threatModeling_performanceDashboard', JSON.stringify(performanceData));
  }

  getPerformanceStatus() {
    const avgLoadTime = this.performanceMetrics.assetLoadTime;
    const avgRenderTime = this.performanceMetrics.canvasRenderTime;

    if (avgLoadTime > 1000 || avgRenderTime > 200) {
      return 'poor';
    } else if (avgLoadTime > 500 || avgRenderTime > 100) {
      return 'fair';
    } else {
      return 'good';
    }
  }

  getPerformanceRecommendations() {
    const recommendations = [];
    
    if (this.performanceMetrics.assetLoadTime > 500) {
      recommendations.push('Asset-Lade-Performance optimieren');
    }
    
    if (this.performanceMetrics.canvasRenderTime > 100) {
      recommendations.push('Canvas-Rendering optimieren');
    }
    
    if (allAssets.length > 100) {
      recommendations.push('Virtualisierung für große Asset-Listen implementieren');
    }

    return recommendations;
  }
}

// Asset-Daten-Validator
class AssetDataValidator {
  validateAllAssets() {
    const warnings = [];
    let isValid = true;

    allAssets.forEach(asset => {
      const assetWarnings = this.validateAsset(asset);
      if (assetWarnings.length > 0) {
        warnings.push({
          assetId: asset.id,
          warnings: assetWarnings
        });
      }
    });

    return {
      isValid: warnings.length === 0,
      warnings: warnings
    };
  }

  validateAsset(asset) {
    const warnings = [];

    // Pflichtfelder prüfen
    if (!asset.id || !asset.name) {
      warnings.push('Pflichtfelder fehlen');
    }

    // ID-Format prüfen
    if (asset.id && !/^[A-Z0-9_]+$/.test(asset.id)) {
      warnings.push('ID enthält ungültige Zeichen');
    }

    // Kritikalität prüfen
    if (asset.criticality < 1 || asset.criticality > 3) {
      warnings.push('Kritikalität außerhalb des gültigen Bereichs');
    }

    // CIA-Werte prüfen
    Object.values(asset.cia).forEach(value => {
      if (value < 1 || value > 10) {
        warnings.push('CIA-Werte außerhalb des gültigen Bereichs');
      }
    });

    // Bedrohungszuordnungen prüfen
    asset.associatedThreats.forEach(threatId => {
      if (!allThreats.find(t => t.id === threatId)) {
        warnings.push(`Unbekannte Bedrohung: ${threatId}`);
      }
    });

    // Schutzmaßnahmen prüfen
    asset.associatedControls.forEach(controlId => {
      if (!securityControls.find(c => c.id === controlId)) {
        warnings.push(`Unbekannte Schutzmaßnahme: ${controlId}`);
      }
    });

    return warnings;
  }
}

// Asset-Fehlerbehandlung
class AssetErrorHandler {
  constructor() {
    this.errorCounts = {};
    this.lastErrors = [];
  }

  handleError(error, context) {
    // Fehler-Statistiken aktualisieren
    const errorType = error.name || 'UnknownError';
    this.errorCounts[errorType] = (this.errorCounts[errorType] || 0) + 1;

    // Letzten Fehler speichern
    this.lastErrors.unshift({
      timestamp: new Date().toISOString(),
      error: error,
      context: context
    });

    // Nur die letzten 50 Fehler behalten
    if (this.lastErrors.length > 50) {
      this.lastErrors = this.lastErrors.slice(0, 50);
    }

    // Recovery-Strategien anwenden
    this.attemptRecovery(errorType, error, context);
  }

  attemptRecovery(errorType, error, context) {
    switch (errorType) {
      case 'DataCorruptionError':
        this.recoverFromDataCorruption();
        break;
      case 'RenderError':
        this.recoverFromRenderError();
        break;
      case 'NetworkError':
        this.recoverFromNetworkError();
        break;
      default:
        this.genericRecovery();
    }
  }

  recoverFromDataCorruption() {
    // Versuche Daten aus Backup wiederherzustellen
    const emergencyBackup = localStorage.getItem('threatModeling_emergencyBackup');
    if (emergencyBackup) {
      try {
        const backupData = JSON.parse(emergencyBackup);
        allAssets.length = 0;
        allAssets.push(...backupData.assets);
        console.log('Data recovered from emergency backup');
      } catch (e) {
        console.error('Failed to recover from emergency backup:', e);
      }
    }
  }

  recoverFromRenderError() {
    // Canvas zurücksetzen und neu rendern
    if (assetManager && assetManager.assetCanvas) {
      const ctx = assetManager.assetCanvas.getContext('2d');
      ctx.clearRect(0, 0, assetManager.assetCanvas.width, assetManager.assetCanvas.height);
      setTimeout(() => {
        assetManager.renderAssetCanvas();
      }, 1000);
    }
  }

  recoverFromNetworkError() {
    // Offline-Modus aktivieren
    document.body.classList.add('offline-mode');
    console.log('Network error detected, switching to offline mode');
  }

  genericRecovery() {
    // Generische Recovery-Maßnahmen
    console.log('Attempting generic error recovery');
  }
}

// Globale Instanz
let assetProductionCompliance = null;

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  if (!assetProductionCompliance) {
    assetProductionCompliance = new AssetProductionCompliance();
    assetProductionCompliance.initializeProductionFeatures();
  }
});

