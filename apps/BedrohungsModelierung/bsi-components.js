// BSI Threat Modeling Tool - Extended Component Database
// This file contains comprehensive BSI building blocks and threat definitions

const BSI_COMPONENTS = {
    // System Components (SYS)
    systems: {
        'SYS.1.1': {
            id: 'SYS.1.1',
            name: 'Allgemeiner Server',
            category: 'Server',
            description: 'Grundlegende Sicherheitsanforderungen für Server-Systeme aller Art',
            threats: ['G.0.8', 'G.0.25', 'G.0.26', 'G.0.28', 'G.0.30', 'G.0.31'],
            icon: 'fas fa-server',
            color: '#3b82f6'
        },
        'SYS.1.2': {
            id: 'SYS.1.2',
            name: 'Windows Server',
            category: 'Server',
            description: 'Spezifische Sicherheitsanforderungen für Microsoft Windows Server',
            threats: ['G.0.21', 'G.0.28', 'G.0.30', 'G.0.39'],
            icon: 'fab fa-windows',
            color: '#3b82f6'
        },
        'SYS.1.3': {
            id: 'SYS.1.3',
            name: 'Linux/Unix Server',
            category: 'Server',
            description: 'Sicherheitsanforderungen für Linux und Unix Server-Systeme',
            threats: ['G.0.21', 'G.0.28', 'G.0.30', 'G.0.31'],
            icon: 'fab fa-linux',
            color: '#3b82f6'
        },
        'SYS.1.5': {
            id: 'SYS.1.5',
            name: 'Virtualisierung',
            category: 'Server',
            description: 'Sicherheitsaspekte virtualisierter Server-Umgebungen',
            threats: ['G.0.18', 'G.0.25', 'G.0.28', 'G.0.30'],
            icon: 'fas fa-layer-group',
            color: '#3b82f6'
        },
        'SYS.2.1': {
            id: 'SYS.2.1',
            name: 'Allgemeiner Client',
            category: 'Desktop-Systeme',
            description: 'Grundlegende Sicherheitsanforderungen für Client-Systeme',
            threats: ['G.0.16', 'G.0.17', 'G.0.28', 'G.0.39', 'G.0.42'],
            icon: 'fas fa-desktop',
            color: '#10b981'
        },
        'SYS.2.2': {
            id: 'SYS.2.2',
            name: 'Windows Client',
            category: 'Desktop-Systeme',
            description: 'Sicherheitsanforderungen für Windows-Arbeitsplätze',
            threats: ['G.0.21', 'G.0.28', 'G.0.39', 'G.0.42'],
            icon: 'fab fa-windows',
            color: '#10b981'
        },
        'SYS.3.1': {
            id: 'SYS.3.1',
            name: 'Laptop',
            category: 'Mobile Devices',
            description: 'Sicherheitsanforderungen für mobile Arbeitsplätze',
            threats: ['G.0.16', 'G.0.17', 'G.0.19', 'G.0.42'],
            icon: 'fas fa-laptop',
            color: '#f59e0b'
        },
        'SYS.3.2': {
            id: 'SYS.3.2',
            name: 'Smartphone/Tablet',
            category: 'Mobile Devices',
            description: 'Sicherheitsaspekte für mobile Endgeräte',
            threats: ['G.0.16', 'G.0.17', 'G.0.19', 'G.0.38', 'G.0.42'],
            icon: 'fas fa-mobile-alt',
            color: '#f59e0b'
        }
    },

    // Application Components (APP)
    applications: {
        'APP.3.1': {
            id: 'APP.3.1',
            name: 'Webanwendung',
            category: 'Netzbasierte Dienste',
            description: 'Sicherheitsanforderungen für Webanwendungen und Webservices',
            threats: ['G.0.14', 'G.0.19', 'G.0.21', 'G.0.22', 'G.0.23', 'G.0.28', 'G.0.40'],
            icon: 'fas fa-globe',
            color: '#8b5cf6'
        },
        'APP.3.2': {
            id: 'APP.3.2',
            name: 'Webserver',
            category: 'Netzbasierte Dienste',
            description: 'Sicherheitsaspekte für Webserver-Anwendungen',
            threats: ['G.0.23', 'G.0.28', 'G.0.40'],
            icon: 'fas fa-server',
            color: '#8b5cf6'
        },
        'APP.4.3': {
            id: 'APP.4.3',
            name: 'Relationale Datenbank',
            category: 'Business-Anwendungen',
            description: 'Schutz von relationalen Datenbanksystemen',
            threats: ['G.0.14', 'G.0.19', 'G.0.21', 'G.0.22', 'G.0.23', 'G.0.45', 'G.0.46'],
            icon: 'fas fa-database',
            color: '#8b5cf6'
        },
        'APP.5.3': {
            id: 'APP.5.3',
            name: 'E-Mail-System',
            category: 'E-Mail/Groupware',
            description: 'Sicherheitsanforderungen für E-Mail-Systeme',
            threats: ['G.0.14', 'G.0.15', 'G.0.19', 'G.0.39', 'G.0.42'],
            icon: 'fas fa-envelope',
            color: '#8b5cf6'
        }
    },

    // Network Components (NET)
    network: {
        'NET.1.1': {
            id: 'NET.1.1',
            name: 'Netzarchitektur',
            category: 'Netze',
            description: 'Grundlagen der Netzarchitektur und des Netzdesigns',
            threats: ['G.0.9', 'G.0.18', 'G.0.27'],
            icon: 'fas fa-network-wired',
            color: '#ef4444'
        },
        'NET.3.1': {
            id: 'NET.3.1',
            name: 'Router/Switch',
            category: 'Netzkomponenten',
            description: 'Sicherheitsanforderungen für Router und Switches',
            threats: ['G.0.9', 'G.0.21', 'G.0.23', 'G.0.25'],
            icon: 'fas fa-route',
            color: '#ef4444'
        },
        'NET.3.2': {
            id: 'NET.3.2',
            name: 'Firewall',
            category: 'Netzkomponenten',
            description: 'Netzwerk-Sicherheitskomponente zur Zugriffskontrolle',
            threats: ['G.0.18', 'G.0.21', 'G.0.23', 'G.0.31'],
            icon: 'fas fa-shield-alt',
            color: '#ef4444'
        },
        'NET.3.3': {
            id: 'NET.3.3',
            name: 'VPN',
            category: 'Netzkomponenten',
            description: 'Virtual Private Network für sichere Verbindungen',
            threats: ['G.0.14', 'G.0.15', 'G.0.21', 'G.0.28'],
            icon: 'fas fa-lock',
            color: '#ef4444'
        }
    },

    // Infrastructure Components (INF)
    infrastructure: {
        'INF.1': {
            id: 'INF.1',
            name: 'Allgemeines Gebäude',
            category: 'Infrastruktur',
            description: 'Physische Sicherheit von Gebäuden',
            threats: ['G.0.1', 'G.0.2', 'G.0.3', 'G.0.5', 'G.0.44'],
            icon: 'fas fa-building',
            color: '#6b7280'
        },
        'INF.2': {
            id: 'INF.2',
            name: 'Rechenzentrum',
            category: 'Infrastruktur',
            description: 'Sicherheitsanforderungen für Rechenzentren und Serverräume',
            threats: ['G.0.1', 'G.0.2', 'G.0.8', 'G.0.44'],
            icon: 'fas fa-warehouse',
            color: '#6b7280'
        }
    }
};

// BSI Elementary Threats (Elementare Gefährdungen)
const BSI_THREATS = {
    'G.0.1': {
        id: 'G.0.1',
        name: 'Feuer',
        category: 'Elementare Gefährdungen',
        description: 'Schäden durch Feuer und Rauchentwicklung',
        impact: 'Hoch',
        likelihood: 'Niedrig',
        affectedAssets: ['Hardware', 'Infrastruktur', 'Daten'],
        icon: 'fas fa-fire',
        color: '#dc2626'
    },
    'G.0.2': {
        id: 'G.0.2',
        name: 'Ungünstige klimatische Bedingungen',
        category: 'Elementare Gefährdungen',
        description: 'Schäden durch extreme Temperaturen, Feuchtigkeit oder andere klimatische Einflüsse',
        impact: 'Mittel',
        likelihood: 'Mittel',
        affectedAssets: ['Hardware', 'Infrastruktur'],
        icon: 'fas fa-thermometer-half',
        color: '#dc2626'
    },
    'G.0.8': {
        id: 'G.0.8',
        name: 'Ausfall der Stromversorgung',
        category: 'Elementare Gefährdungen',
        description: 'Störungen oder Ausfall der elektrischen Energieversorgung',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Verfügbarkeit', 'Hardware'],
        icon: 'fas fa-bolt',
        color: '#dc2626'
    },
    'G.0.14': {
        id: 'G.0.14',
        name: 'Ausspähen von Informationen',
        category: 'Vorsätzliche Handlungen',
        description: 'Unbefugtes Erlangen von Informationen durch Spionage',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Vertraulichkeit', 'Daten'],
        icon: 'fas fa-search',
        color: '#f59e0b'
    },
    'G.0.15': {
        id: 'G.0.15',
        name: 'Abhören',
        category: 'Vorsätzliche Handlungen',
        description: 'Unbefugtes Mithören oder Aufzeichnen von Kommunikation',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Vertraulichkeit', 'Kommunikation'],
        icon: 'fas fa-microphone',
        color: '#f59e0b'
    },
    'G.0.16': {
        id: 'G.0.16',
        name: 'Diebstahl von Geräten',
        category: 'Vorsätzliche Handlungen',
        description: 'Entwendung von IT-Geräten, Datenträgern oder Dokumenten',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Verfügbarkeit', 'Vertraulichkeit', 'Hardware'],
        icon: 'fas fa-user-secret',
        color: '#f59e0b'
    },
    'G.0.19': {
        id: 'G.0.19',
        name: 'Offenlegung schützenswerter Informationen',
        category: 'Vorsätzliche Handlungen',
        description: 'Unbeabsichtigte Preisgabe vertraulicher Informationen',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Vertraulichkeit', 'Daten'],
        icon: 'fas fa-eye',
        color: '#f59e0b'
    },
    'G.0.21': {
        id: 'G.0.21',
        name: 'Manipulation von Hard- oder Software',
        category: 'Vorsätzliche Handlungen',
        description: 'Unbefugte Veränderung von Hardware oder Software',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Integrität', 'Verfügbarkeit'],
        icon: 'fas fa-tools',
        color: '#f59e0b'
    },
    'G.0.22': {
        id: 'G.0.22',
        name: 'Manipulation von Informationen',
        category: 'Vorsätzliche Handlungen',
        description: 'Unbefugte Veränderung von Daten oder Informationen',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Integrität', 'Daten'],
        icon: 'fas fa-edit',
        color: '#f59e0b'
    },
    'G.0.23': {
        id: 'G.0.23',
        name: 'Unbefugtes Eindringen in IT-Systeme',
        category: 'Vorsätzliche Handlungen',
        description: 'Unerlaubter Zugriff auf IT-Systeme durch Angreifer',
        impact: 'Hoch',
        likelihood: 'Hoch',
        affectedAssets: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit'],
        icon: 'fas fa-user-ninja',
        color: '#f59e0b'
    },
    'G.0.25': {
        id: 'G.0.25',
        name: 'Ausfall von Geräten oder Systemen',
        category: 'Technisches Versagen',
        description: 'Funktionsausfall von IT-Komponenten oder Systemen',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Verfügbarkeit'],
        icon: 'fas fa-exclamation-triangle',
        color: '#ef4444'
    },
    'G.0.28': {
        id: 'G.0.28',
        name: 'Software-Schwachstellen',
        category: 'Technisches Versagen',
        description: 'Sicherheitslücken in Software-Produkten',
        impact: 'Hoch',
        likelihood: 'Hoch',
        affectedAssets: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit'],
        icon: 'fas fa-bug',
        color: '#ef4444'
    },
    'G.0.30': {
        id: 'G.0.30',
        name: 'Unberechtigte Nutzung',
        category: 'Menschliche Fehlhandlungen',
        description: 'Missbrauch von Berechtigungen oder Systemen',
        impact: 'Mittel',
        likelihood: 'Mittel',
        affectedAssets: ['Vertraulichkeit', 'Integrität'],
        icon: 'fas fa-user-times',
        color: '#6b7280'
    },
    'G.0.31': {
        id: 'G.0.31',
        name: 'Fehlerhafte Nutzung',
        category: 'Menschliche Fehlhandlungen',
        description: 'Unbeabsichtigte Fehlbedienung von Systemen',
        impact: 'Mittel',
        likelihood: 'Hoch',
        affectedAssets: ['Verfügbarkeit', 'Integrität'],
        icon: 'fas fa-user-slash',
        color: '#6b7280'
    },
    'G.0.39': {
        id: 'G.0.39',
        name: 'Schadprogramme',
        category: 'Vorsätzliche Handlungen',
        description: 'Schäden durch Malware, Viren, Trojaner etc.',
        impact: 'Hoch',
        likelihood: 'Hoch',
        affectedAssets: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit'],
        icon: 'fas fa-virus',
        color: '#f59e0b'
    },
    'G.0.40': {
        id: 'G.0.40',
        name: 'Denial of Service',
        category: 'Vorsätzliche Handlungen',
        description: 'Verhinderung der Verfügbarkeit von Diensten',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Verfügbarkeit'],
        icon: 'fas fa-ban',
        color: '#f59e0b'
    },
    'G.0.42': {
        id: 'G.0.42',
        name: 'Social Engineering',
        category: 'Vorsätzliche Handlungen',
        description: 'Manipulation von Personen zur Preisgabe von Informationen',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Vertraulichkeit', 'Integrität'],
        icon: 'fas fa-comments',
        color: '#f59e0b'
    },
    'G.0.45': {
        id: 'G.0.45',
        name: 'Datenverlust',
        category: 'Technisches Versagen',
        description: 'Verlust von Daten durch technische Defekte',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Verfügbarkeit', 'Daten'],
        icon: 'fas fa-database',
        color: '#ef4444'
    },
    'G.0.46': {
        id: 'G.0.46',
        name: 'Integritätsverlust',
        category: 'Technisches Versagen',
        description: 'Verlust der Datenintegrität',
        impact: 'Hoch',
        likelihood: 'Mittel',
        affectedAssets: ['Integrität', 'Daten'],
        icon: 'fas fa-exclamation-circle',
        color: '#ef4444'
    }
};

// STRIDE Threat Categories
const STRIDE_THREATS = {
    'spoofing': {
        id: 'spoofing',
        name: 'Spoofing (Identitätsfälschung)',
        category: 'STRIDE',
        description: 'Vortäuschen einer falschen Identität oder Authentifizierung',
        relatedBsiThreats: ['G.0.36', 'G.0.42'],
        affectedAssets: ['Authentizität'],
        icon: 'fas fa-mask',
        color: '#f59e0b'
    },
    'tampering': {
        id: 'tampering',
        name: 'Tampering (Datenmanipulation)',
        category: 'STRIDE',
        description: 'Unbefugte Änderung von Daten oder Code',
        relatedBsiThreats: ['G.0.21', 'G.0.22'],
        affectedAssets: ['Integrität'],
        icon: 'fas fa-edit',
        color: '#f59e0b'
    },
    'repudiation': {
        id: 'repudiation',
        name: 'Repudiation (Nichtabstreitbarkeit)',
        category: 'STRIDE',
        description: 'Abstreiten von durchgeführten Aktionen',
        relatedBsiThreats: ['G.0.37'],
        affectedAssets: ['Nachweisbarkeit'],
        icon: 'fas fa-user-times',
        color: '#f59e0b'
    },
    'information-disclosure': {
        id: 'information-disclosure',
        name: 'Information Disclosure (Informationsoffenlegung)',
        category: 'STRIDE',
        description: 'Unbefugte Preisgabe von Informationen',
        relatedBsiThreats: ['G.0.14', 'G.0.19'],
        affectedAssets: ['Vertraulichkeit'],
        icon: 'fas fa-eye',
        color: '#f59e0b'
    },
    'denial-of-service': {
        id: 'denial-of-service',
        name: 'Denial of Service (Dienstverweigerung)',
        category: 'STRIDE',
        description: 'Verhinderung der Verfügbarkeit von Diensten',
        relatedBsiThreats: ['G.0.40', 'G.0.25'],
        affectedAssets: ['Verfügbarkeit'],
        icon: 'fas fa-ban',
        color: '#f59e0b'
    },
    'elevation-of-privilege': {
        id: 'elevation-of-privilege',
        name: 'Elevation of Privilege (Rechteausweitung)',
        category: 'STRIDE',
        description: 'Erlangung höherer Berechtigungen als vorgesehen',
        relatedBsiThreats: ['G.0.30', 'G.0.32'],
        affectedAssets: ['Autorisierung'],
        icon: 'fas fa-user-shield',
        color: '#f59e0b'
    }
};

// Mitigation Strategies
const MITIGATION_STRATEGIES = {
    'encryption': {
        id: 'encryption',
        name: 'Verschlüsselung',
        category: 'Technische Maßnahmen',
        description: 'Schutz von Daten durch kryptographische Verfahren',
        addressedThreats: ['G.0.14', 'G.0.15', 'G.0.19'],
        icon: 'fas fa-key',
        color: '#10b981'
    },
    'authentication': {
        id: 'authentication',
        name: 'Authentifizierung',
        category: 'Technische Maßnahmen',
        description: 'Überprüfung der Identität von Benutzern und Systemen',
        addressedThreats: ['spoofing', 'G.0.23', 'G.0.30'],
        icon: 'fas fa-user-check',
        color: '#10b981'
    },
    'access-control': {
        id: 'access-control',
        name: 'Zugriffskontrolle',
        category: 'Technische Maßnahmen',
        description: 'Kontrolle und Beschränkung von Systemzugriffen',
        addressedThreats: ['elevation-of-privilege', 'G.0.23', 'G.0.30'],
        icon: 'fas fa-lock',
        color: '#10b981'
    },
    'logging': {
        id: 'logging',
        name: 'Protokollierung',
        category: 'Technische Maßnahmen',
        description: 'Aufzeichnung von Systemereignissen für Überwachung und Forensik',
        addressedThreats: ['repudiation', 'G.0.23', 'G.0.30'],
        icon: 'fas fa-clipboard-list',
        color: '#10b981'
    },
    'backup': {
        id: 'backup',
        name: 'Datensicherung',
        category: 'Technische Maßnahmen',
        description: 'Regelmäßige Sicherung wichtiger Daten',
        addressedThreats: ['G.0.45', 'G.0.25', 'G.0.39'],
        icon: 'fas fa-save',
        color: '#10b981'
    },
    'training': {
        id: 'training',
        name: 'Schulungen',
        category: 'Organisatorische Maßnahmen',
        description: 'Sensibilisierung und Schulung der Mitarbeiter',
        addressedThreats: ['G.0.42', 'G.0.31', 'G.0.19'],
        icon: 'fas fa-graduation-cap',
        color: '#10b981'
    },
    'incident-response': {
        id: 'incident-response',
        name: 'Incident Response',
        category: 'Organisatorische Maßnahmen',
        description: 'Verfahren zur Behandlung von Sicherheitsvorfällen',
        addressedThreats: ['G.0.23', 'G.0.39', 'G.0.40'],
        icon: 'fas fa-ambulance',
        color: '#10b981'
    },
    'physical-security': {
        id: 'physical-security',
        name: 'Physische Sicherheit',
        category: 'Infrastrukturelle Maßnahmen',
        description: 'Schutz der physischen IT-Infrastruktur',
        addressedThreats: ['G.0.1', 'G.0.16', 'G.0.44'],
        icon: 'fas fa-shield-alt',
        color: '#10b981'
    }
};

// Risk Assessment Matrix
const RISK_MATRIX = {
    calculateRisk: function(impact, likelihood) {
        const impactValues = { 'Niedrig': 1, 'Mittel': 2, 'Hoch': 3 };
        const likelihoodValues = { 'Niedrig': 1, 'Mittel': 2, 'Hoch': 3 };
        
        const riskScore = impactValues[impact] * likelihoodValues[likelihood];
        
        if (riskScore >= 6) return { level: 'Hoch', color: '#dc2626', priority: 1 };
        if (riskScore >= 4) return { level: 'Mittel', color: '#f59e0b', priority: 2 };
        return { level: 'Niedrig', color: '#10b981', priority: 3 };
    },
    
    getRiskRecommendations: function(riskLevel) {
        const recommendations = {
            'Hoch': [
                'Sofortige Maßnahmen erforderlich',
                'Regelmäßige Überwachung implementieren',
                'Incident Response Plan aktivieren',
                'Management informieren'
            ],
            'Mittel': [
                'Maßnahmen zeitnah umsetzen',
                'Risiko regelmäßig bewerten',
                'Präventive Kontrollen verstärken'
            ],
            'Niedrig': [
                'Risiko akzeptabel',
                'Gelegentliche Überprüfung',
                'Dokumentation aktuell halten'
            ]
        };
        
        return recommendations[riskLevel] || [];
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BSI_COMPONENTS,
        BSI_THREATS,
        STRIDE_THREATS,
        MITIGATION_STRATEGIES,
        RISK_MATRIX
    };
}

