// BSI Threat Modeling Tool - Asset Data Module
// Datenstrukturen und Beispieldaten für die assetorientierte Modellierung

// Asset-Typen Definition
const assetTypes = {
  server: "Server",
  database: "Datenbank",
  application: "Anwendung",
  network: "Netzwerk",
  data: "Daten",
  personnel: "Personal",
  facility: "Einrichtung",
  device: "Gerät"
};

// CIA-Dimensionen für Assets
const ciaDimensions = {
  confidentiality: "Vertraulichkeit",
  integrity: "Integrität",
  availability: "Verfügbarkeit"
};

// Beispiel-Assets
const assetCategories = [
  {
    id: "IT_INFRASTRUCTURE",
    name: "IT-Infrastruktur",
    assets: [
      {
        id: "ASSET001",
        name: "Webserver Frontend",
        description: "Öffentlicher Webserver für die Unternehmenswebsite",
        type: "server",
        criticality: 3,
        cia: {
          confidentiality: 6,
          integrity: 9,
          availability: 9
        },
        owner: "IT-Operations",
        location: "DMZ",
        associatedThreats: ["C001.01", "C001.02", "C001.04"],
        associatedControls: ["CTRL001", "CTRL002"],
        position: { x: 100, y: 100 }
      },
      {
        id: "ASSET002",
        name: "Kundendatenbank",
        description: "Zentrale Datenbank mit Kundendaten und Transaktionshistorie",
        type: "database",
        criticality: 3,
        cia: {
          confidentiality: 10,
          integrity: 10,
          availability: 8
        },
        owner: "Datenschutzbeauftragter",
        location: "Internes Netzwerk",
        associatedThreats: ["C001.05", "C001.06", "M001.03"],
        associatedControls: ["CTRL003", "CTRL004"],
        position: { x: 300, y: 200 }
      },
      {
        id: "ASSET003",
        name: "Active Directory Server",
        description: "Zentraler Authentifizierungsserver für alle Benutzerkonten",
        type: "server",
        criticality: 3,
        cia: {
          confidentiality: 9,
          integrity: 10,
          availability: 9
        },
        owner: "IT-Security",
        location: "Internes Netzwerk",
        associatedThreats: ["C001.06", "M001.06"],
        associatedControls: ["CTRL005", "CTRL006"],
        position: { x: 500, y: 150 }
      },
      {
        id: "ASSET004",
        name: "Firewall",
        description: "Perimeter-Firewall zum Schutz des internen Netzwerks",
        type: "network",
        criticality: 3,
        cia: {
          confidentiality: 7,
          integrity: 9,
          availability: 9
        },
        owner: "Network-Team",
        location: "DMZ",
        associatedThreats: ["C001.04", "C001.10"],
        associatedControls: ["CTRL007"],
        position: { x: 200, y: 50 }
      }
    ]
  },
  {
    id: "APPLICATIONS",
    name: "Anwendungen",
    assets: [
      {
        id: "ASSET005",
        name: "ERP-System",
        description: "Enterprise Resource Planning System für Geschäftsprozesse",
        type: "application",
        criticality: 3,
        cia: {
          confidentiality: 8,
          integrity: 9,
          availability: 8
        },
        owner: "Business-Team",
        location: "Internes Netzwerk",
        associatedThreats: ["C001.08", "M001.07"],
        associatedControls: ["CTRL008", "CTRL009"],
        position: { x: 400, y: 300 }
      },
      {
        id: "ASSET006",
        name: "E-Mail-Server",
        description: "Microsoft Exchange Server für interne und externe Kommunikation",
        type: "application",
        criticality: 2,
        cia: {
          confidentiality: 7,
          integrity: 8,
          availability: 7
        },
        owner: "IT-Operations",
        location: "DMZ",
        associatedThreats: ["C001.01", "M001.06"],
        associatedControls: ["CTRL010"],
        position: { x: 150, y: 250 }
      },
      {
        id: "ASSET007",
        name: "Backup-System",
        description: "Zentrale Backup-Lösung für alle kritischen Daten",
        type: "application",
        criticality: 2,
        cia: {
          confidentiality: 8,
          integrity: 10,
          availability: 6
        },
        owner: "IT-Operations",
        location: "Rechenzentrum",
        associatedThreats: ["C001.03", "P001.04"],
        associatedControls: ["CTRL011"],
        position: { x: 600, y: 250 }
      }
    ]
  },
  {
    id: "DATA_ASSETS",
    name: "Daten-Assets",
    assets: [
      {
        id: "ASSET008",
        name: "Personaldaten",
        description: "Mitarbeiterdaten gemäß DSGVO",
        type: "data",
        criticality: 3,
        cia: {
          confidentiality: 10,
          integrity: 9,
          availability: 6
        },
        owner: "HR-Abteilung",
        location: "HR-System",
        associatedThreats: ["C001.05", "M001.03"],
        associatedControls: ["CTRL012", "CTRL013"],
        position: { x: 350, y: 400 }
      },
      {
        id: "ASSET009",
        name: "Finanzdaten",
        description: "Buchhaltungsdaten und Finanzberichte",
        type: "data",
        criticality: 3,
        cia: {
          confidentiality: 9,
          integrity: 10,
          availability: 7
        },
        owner: "Finanzabteilung",
        location: "ERP-System",
        associatedThreats: ["C001.05", "M001.02"],
        associatedControls: ["CTRL014"],
        position: { x: 450, y: 350 }
      }
    ]
  },
  {
    id: "PHYSICAL_ASSETS",
    name: "Physische Assets",
    assets: [
      {
        id: "ASSET010",
        name: "Rechenzentrum",
        description: "Hauptrechenzentrum mit kritischer IT-Infrastruktur",
        type: "facility",
        criticality: 3,
        cia: {
          confidentiality: 8,
          integrity: 9,
          availability: 10
        },
        owner: "Facility-Management",
        location: "Hauptgebäude UG",
        associatedThreats: ["P001.03", "E001.01", "E001.02"],
        associatedControls: ["CTRL015", "CTRL016"],
        position: { x: 250, y: 450 }
      },
      {
        id: "ASSET011",
        name: "Arbeitsplätze",
        description: "Mitarbeiter-Arbeitsplätze mit Zugang zu Unternehmensdaten",
        type: "device",
        criticality: 2,
        cia: {
          confidentiality: 6,
          integrity: 7,
          availability: 6
        },
        owner: "IT-Support",
        location: "Bürogebäude",
        associatedThreats: ["P001.04", "M001.05"],
        associatedControls: ["CTRL017"],
        position: { x: 550, y: 400 }
      }
    ]
  }
];

// Flache Liste aller Assets erstellen
const allAssets = assetCategories.flatMap(category =>
  category.assets.map(asset => ({
    ...asset,
    category: category.id,
    categoryName: category.name
  }))
);

// Schutzmaßnahmen (Controls) Definition
const securityControls = [
  {
    id: "CTRL001",
    name: "Web Application Firewall",
    description: "Schutz vor webbasierten Angriffen",
    type: "technical"
  },
  {
    id: "CTRL002",
    name: "SSL/TLS Verschlüsselung",
    description: "Verschlüsselung der Datenübertragung",
    type: "technical"
  },
  {
    id: "CTRL003",
    name: "Datenbankzugriffskontrolle",
    description: "Rollenbasierte Zugriffskontrolle auf Datenbankebene",
    type: "technical"
  },
  {
    id: "CTRL004",
    name: "Datenbank-Verschlüsselung",
    description: "Verschlüsselung sensibler Daten in der Datenbank",
    type: "technical"
  },
  {
    id: "CTRL005",
    name: "Multi-Faktor-Authentifizierung",
    description: "Zusätzliche Sicherheitsebene für Benutzeranmeldung",
    type: "technical"
  },
  {
    id: "CTRL006",
    name: "Privileged Access Management",
    description: "Verwaltung privilegierter Benutzerkonten",
    type: "organizational"
  },
  {
    id: "CTRL007",
    name: "Intrusion Detection System",
    description: "Erkennung von Netzwerkangriffen",
    type: "technical"
  },
  {
    id: "CTRL008",
    name: "Anwendungssicherheit",
    description: "Sichere Entwicklung und Konfiguration",
    type: "technical"
  },
  {
    id: "CTRL009",
    name: "Patch-Management",
    description: "Regelmäßige Sicherheitsupdates",
    type: "organizational"
  },
  {
    id: "CTRL010",
    name: "E-Mail-Sicherheit",
    description: "Anti-Spam und Anti-Malware für E-Mails",
    type: "technical"
  },
  {
    id: "CTRL011",
    name: "Backup-Strategie",
    description: "Regelmäßige und getestete Datensicherung",
    type: "organizational"
  },
  {
    id: "CTRL012",
    name: "Datenschutz-Richtlinien",
    description: "DSGVO-konforme Datenverarbeitung",
    type: "organizational"
  },
  {
    id: "CTRL013",
    name: "Zugriffsprotokolierung",
    description: "Logging und Monitoring von Datenzugriffen",
    type: "technical"
  },
  {
    id: "CTRL014",
    name: "Finanzdaten-Kontrollen",
    description: "Vier-Augen-Prinzip und Genehmigungsworkflows",
    type: "organizational"
  },
  {
    id: "CTRL015",
    name: "Physische Sicherheit",
    description: "Zutrittskontrolle und Überwachung",
    type: "physical"
  },
  {
    id: "CTRL016",
    name: "Umgebungsüberwachung",
    description: "Temperatur, Feuchtigkeit, Brandschutz",
    type: "physical"
  },
  {
    id: "CTRL017",
    name: "Endpoint-Schutz",
    description: "Antivirus und Endpoint Detection Response",
    type: "technical"
  }
];

// Hilfsfunktionen für Asset-Management
function saveAssetDataToStorage() {
  try {
    localStorage.setItem('threatModeling_assets', JSON.stringify(allAssets));
    localStorage.setItem('threatModeling_assetCategories', JSON.stringify(assetCategories));
    localStorage.setItem('threatModeling_securityControls', JSON.stringify(securityControls));
    return true;
  } catch (error) {
    console.error('Fehler beim Speichern der Asset-Daten:', error);
    return false;
  }
}

function loadAssetDataFromStorage() {
  try {
    const storedAssets = localStorage.getItem('threatModeling_assets');
    const storedCategories = localStorage.getItem('threatModeling_assetCategories');
    const storedControls = localStorage.getItem('threatModeling_securityControls');

    if (storedAssets && storedCategories && storedControls) {
      const parsedAssets = JSON.parse(storedAssets);
      const parsedCategories = JSON.parse(storedCategories);
      const parsedControls = JSON.parse(storedControls);

      // Arrays aktualisieren
      allAssets.length = 0;
      assetCategories.length = 0;
      securityControls.length = 0;

      parsedAssets.forEach(asset => allAssets.push(asset));
      parsedCategories.forEach(category => assetCategories.push(category));
      parsedControls.forEach(control => securityControls.push(control));

      return true;
    }
    return false;
  } catch (error) {
    console.error('Fehler beim Laden der Asset-Daten:', error);
    return false;
  }
}

// Asset-Risiko-Berechnung
function calculateAssetRisk(asset) {
  // Berechne das Gesamtrisiko basierend auf Kritikalität und zugeordneten Bedrohungen
  let totalRisk = 0;
  let threatCount = 0;

  asset.associatedThreats.forEach(threatId => {
    const threat = allThreats.find(t => t.id === threatId);
    if (threat) {
      const threatRisk = threat.position.row * threat.position.col;
      totalRisk += threatRisk;
      threatCount++;
    }
  });

  const averageThreatRisk = threatCount > 0 ? totalRisk / threatCount : 0;
  const assetCriticalityWeight = asset.criticality / 3; // Normalisierung auf 0-1
  
  return {
    assetRisk: averageThreatRisk * assetCriticalityWeight,
    threatCount: threatCount,
    averageThreatRisk: averageThreatRisk,
    criticalityWeight: assetCriticalityWeight
  };
}

// Asset-CIA-Score berechnen
function calculateAssetCIAScore(asset) {
  const { confidentiality, integrity, availability } = asset.cia;
  return {
    total: confidentiality + integrity + availability,
    average: (confidentiality + integrity + availability) / 3,
    confidentiality,
    integrity,
    availability
  };
}

// Initialisierung der Asset-Daten
if (!localStorage.getItem('threatModeling_assets')) {
  saveAssetDataToStorage();
}

