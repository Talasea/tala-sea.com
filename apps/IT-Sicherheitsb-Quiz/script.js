document.addEventListener("DOMContentLoaded", function () {
    // Debug-Modus für bessere Fehlerdiagnose
    const DEBUG = true;
    function debug(message) {
      if (DEBUG) console.log(`[DEBUG] ${message}`);
    }
  
    debug("DOM geladen, Initialisierung beginnt...");
  
    // Array mit den Fragen und Antworten
    const questions = [
      {
        id: "A13b",
        question: "Was ist beim Anfertigen eines Backups zu beachten?",
        answers: [
          {
            text: "Grober Sicherheitsverstoß, wenn keines gemacht wird",
            correct: true
          },
          { text: "Backup-Recovery-Übungen sind durchzuführen", correct: true },
          {
            text:
              "Verschlüsseln, um die Daten vor dem Zugriff dritter zu schützen",
            correct: true
          },
          {
            text: "Aufbewahrung an einem anderen Ort/Brandschutzsektor",
            correct: true
          }
        ],
        category: "Backup"
      },
      {
        id: "A25c",
        question:
          "Was ist in Bezug auf Zugänge in einer Organisation zu beachten?",
        answers: [
          {
            text:
              "Bei Beendigung der Beschäftigung sollen die Zugangsrechte wieder entzogen werden",
            correct: true
          },
          {
            text: "Benutzerzugangsrechte sollen regelmäßig überprüft werden",
            correct: true
          },
          {
            text: "Für die Zugangsteuerung sollte es eine Richtlinie geben",
            correct: true
          }
        ],
        category: "Zugang und Zugriff"
      },
      {
        id: "A03f",
        question: "Was ist die Aufgabe einer Firewall?",
        answers: [
          { text: "Programme aktualisieren", correct: false },
          {
            text:
              "Alle Daten kontrollieren, die in das eigene Netzwerk hineinkommen oder es verlassen",
            correct: true
          },
          { text: "Vor Spam-Mail schützen", correct: false }
        ],
        category: "Netzwerksicherheit"
      },
      {
        id: "A26j",
        question:
          "Welcher der vier Standards des BSI beschäftigt sich mit dem Notfallmanagement?",
        answers: [
          { text: "BSI Risikoanalyse (200-3)", correct: false },
          { text: "BSI Notfallmanagement (100-4)", correct: true },
          { text: "BSI ISMS (200-1)", correct: false },
          { text: "BSI Vorgehen (200-2)", correct: false }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A05f",
        question: "Wie kann eine Risikobehandlung durchgeführt werden?",
        answers: [
          { text: "Risiko minimieren", correct: true },
          { text: "Risiko transferieren", correct: true },
          { text: "Risiko reduzieren", correct: true },
          { text: "Risiko akzeptieren", correct: true }
        ],
        category: "Risikomanagement"
      },
      {
        id: "A20d",
        question:
          "Wodurch können Informationssicherheitsvorfälle hervorgerufen bzw. begünstigt werden?",
        answers: [
          { text: "Ungesteuerte Systemänderungen", correct: true },
          {
            text: "Äußere Einwirkungen wie z.B. Wetterereignisse",
            correct: true
          },
          { text: "Verstöße gegen Sicherheitsvorschriften", correct: true },
          { text: "Fehlfunktionen von Systemen", correct: true }
        ],
        category: "Informationssicherheit"
      },
      {
        id: "A26i",
        question: "Für was steht die Abkürzung BCM?",
        answers: [
          { text: "business continiuous management", correct: false },
          { text: "busy continiuty management", correct: false },
          { text: "Business Continuity Management", correct: true }
        ],
        category: "Business Continuity"
      },
      {
        id: "A26a",
        question:
          "Welche sind Bereiche, die eine besondere Aufmerksamkeit in Bezug auf Zugang und Zugriff benötigen?",
        answers: [
          { text: "Geschäfsführer", correct: false },
          {
            text: "Privilegierte Benutzer, wie Tool, Systtemadministratoren",
            correct: true
          },
          {
            text:
              "Bereiche, wo Werkzeuge mit privilegierten Rechten zum Einsatz kommen (Datenbanktools, Netzwerk-Sniffer, …)",
            correct: true
          },
          { text: "Abteilungschef", correct: false }
        ],
        category: "Zugang und Zugriff"
      },
      {
        id: "A06c",
        question: "Wen umfasst das BSI-Gesetz zu den kritischen Infrastukturen?",
        answers: [
          {
            text:
              "Alle Unternehmen der im Gesetz aufgeführten Sektoren (Ernährung, Wasser, Energie, Transport und Verkehr, Gesundheit, Finanz und Versicherungswesen, Information und Telekommunikation), die die in der jeweiligen Rechtsverordnung genannten Schwellenwerte überschreiten.",
            correct: true
          },
          { text: "alle Unternehmen", correct: false }
        ],
        category: "Gesetzliche Grundlagen"
      },
      {
        id: "A07f",
        question:
          "Ein Code oder Stück Software gewährt Zugriff auf ein System. Wie nennt man das?",
        answers: [
          { text: "Backdoor", correct: true },
          { text: "Social Engineering", correct: false },
          { text: "logic bomb", correct: false },
          { text: "Betriebssystem", correct: false }
        ],
        category: "Angriffsmethoden"
      },
      {
        id: "A26c",
        question: "Wie lange ist eine ISO 27001 Zertifizierung gültig?",
        answers: [
          { text: "3 Jahre", correct: true },
          { text: "sie gilt solange das Unternehmen existiert", correct: false },
          {
            text:
              "solange 2x Überwachungsaudit im 3-Jahreszeitraum (jährlich 1x) erfolgen",
            correct: false
          }
        ],
        category: "Zertifizierung"
      },
      {
        id: "A07d",
        question:
          "Muss eine SOA (Statement of Applicability) bei der ISMS-Einführung erstellt werden?",
        answers: [
          {
            text: "Wenn nach BSI Grundschutz zertifiziert wurde 200-2 etc.",
            correct: false
          },
          { text: "unbedingt", correct: true },
          { text: "Nur wenn du 27001 konform sein willst", correct: false }
        ],
        category: "ISMS"
      },
      {
        id: "A25h",
        question: "Was sollten dokumentierte Bedienabläufe enthalten?",
        answers: [
          { text: "Dokumentation des gesamten ISMS", correct: false },
          { text: "Dokumentation der ISO 27001", correct: false },
          {
            text:
              "Die Dokumentation sollte Informationen zur Durchführung von Systemneustarts enthalten",
            correct: true
          },
          {
            text:
              "Die Dokumentation sollte Informationen zur Durchführung von Backups enthalten",
            correct: true
          }
        ],
        category: "Dokumentation"
      },
      {
        id: "A14f",
        question:
          "Was betrachtet die Informationssicherheit außer technische IT-Sicherheit?",
        answers: [
          {
            text:
              "Grundsätzlich alle Informationen im Unternehmen, unabhängig des Speichermediums",
            correct: true
          },
          { text: "Information in den Köpfen der Mitarbeiter", correct: false },
          {
            text: "Informationen, welche in IT-Systemen gespeichert sind",
            correct: false
          }
        ],
        category: "Informationssicherheit"
      },
      {
        id: "A20c",
        question:
          "Unter welchen Umständen kann eine Organisation Anforderungen aus dem Kapitel 4 der ISO-27001 für nicht anwendbar erklären?",
        answers: [
          {
            text: "man kann über die SOA gewisse Teile ausschließen",
            correct: false
          },
          {
            text: "wenn nach BSI Grundschutz zertifiziert wurde 200-2 etc.",
            correct: false
          },
          {
            text:
              "Unter keinen Umständen (wenn eine Organisation Konformität mit dieser internationalen Norm für sich beansprucht, darf sie keine der Anforderungen in den Abschnitten 4 bis 10 ausschließen.)",
            correct: true
          },
          { text: "nur wenn du nicht 27001 konform sein willst", correct: false }
        ],
        category: "ISO 27001"
      },
      {
        id: "A07i",
        question: "Was ist die Aufgabe des Notfallmanagements nach BSI 100-4",
        answers: [
          {
            text:
              "Der BSI-Standart 100-4 stellt einen systematischen Weg auf, ein Notfallmanagement in deiner Behörde oder in einem Unternehmen aufzubauen, um die Kontinuität des Geschäftsbetriebs sicherzustellen",
            correct: true
          },
          { text: "BCM business continuity management", correct: false }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A03j",
        question: "Welche Aussagen sind in Bezug auf den Datenschutz zu machen?",
        answers: [
          {
            text:
              "Daten dürfen nur unter Berücksichtigung der gesetzlichen Vorgaben verarbeitet werden",
            correct: true
          },
          {
            text:
              "Einwilligung zur Datenverarbeitung können nachträglich widerrufen werden",
            correct: true
          },
          {
            text:
              "Nutzer können die Berichtigung bzw. Löschung ihrer Daten beantragen",
            correct: true
          },
          {
            text: "Daten dürfen zwischen Unternehmen ausgetauscht werden",
            correct: false
          }
        ],
        category: "Datenschutz"
      },
      {
        id: "A01a",
        question: "Welche Personen sind am IT Security Prozess beteiligt?",
        answers: [
          { text: "Die Organisationsleitung", correct: true },
          { text: "alle übrigen Mitarbeiter", correct: true },
          {
            text: "nach ITIL Info-Sec Manager, Service Owner, etc.",
            correct: false
          },
          { text: "Chef", correct: false },
          {
            text: "die übrigen Inhaber von Rollen der Informationssicherheit",
            correct: true
          },
          {
            text: "IT-Security Beauftragte/Informationssicherheitsbeauftragte",
            correct: true
          }
        ],
        category: "IT Security Prozess"
      },
      {
        id: "A25a",
        question: "Was muss bei einer Ereignisprotokollierung gemacht werden?",
        answers: [
          { text: "Ereignisprotokolle regelmäßig überprüfen", correct: true },
          {
            text:
              "Vorsicht!: Unter Umständen lassen sich Rückschlüsse auf das Arbeitsverhalten von Mitarbeitern machen. Hier sollte der Betriebsrat mit eingeschaltet werden.",
            correct: true
          },
          {
            text:
              "Vorsicht!: Ereignisprotokolle enthalten oft personenbezogene Daten besonders schützen",
            correct: true
          },
          { text: "Definieren, was protokolliert werden soll", correct: true }
        ],
        category: "Ereignisprotokollierung"
      },
      {
        id: "A22j",
        question:
          "Im Bereich Zugang und Zugriff benötigen welche Bereiche besondere Achtsamkeit/Aufmerksamkeit)?",
        answers: [
          {
            text: "Privilegierte Benutzer; wie System- oder Tool-Administratoren",
            correct: true
          },
          { text: "alle", correct: false },
          {
            text:
              "Der Einsatz von Werkzeugen mit privilegierten Rechten, wie z.B. Netzwerk-Sniffer oder Datenbanktools",
            correct: true
          }
        ],
        category: "Zugang und Zugriff"
      },
      {
        id: "A21i",
        question:
          "Die ISO 27001 fordert alles Stakeholder zu bestimmen. Wer kann dazu gehören?",
        answers: [
          { text: "Kunden", correct: true },
          { text: "Mitarbeiter/Personal", correct: true },
          { text: "Öffentlichkeit", correct: true },
          { text: "Behörden", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A25i",
        question:
          "Was sollte beim Umgang mit mobilen Geräten aus der Sicht der IT Sicherheit beachtet werden?",
        answers: [
          {
            text:
              "Bei Einsatz von Mobilgeräten an öffentlichen Plätzen (z.B. am Flughafen oder in der Bahn) ist besonders auf die Vertraulichkeit zu achten",
            correct: true
          },
          {
            text: "Mobilgeräte sollten vor Diebstahl geschützt werden",
            correct: true
          },
          {
            text: "Sie sollten in einem Softcover getragen werden",
            correct: false
          },
          {
            text:
              "Mitarbeiter, die Mobilgeräte einsetzen, sollten besonders für die Gefahren des Einsatzes dieser Geräte sensibilisiert werden",
            correct: true
          }
        ],
        category: "Mobile Sicherheit"
      },
      {
        id: "A13a",
        question: "Was ist beim Anfertigen eines Backups zu beachten?",
        answers: [
          {
            text: "Grober Sicherheitsverstoß, wenn keines gemacht wird",
            correct: true
          },
          { text: "Backup Recovery Übungen sind durchzuführen", correct: true },
          {
            text: "Aufbewahrung an einem anderen Ort/Brandschutzsektor",
            correct: true
          },
          {
            text:
              "Verschlüsseln, um die Daten vor dem Zugriff dritter zu schützen",
            correct: true
          }
        ],
        category: "Backup"
      },
      {
        id: "A16g",
        question:
          "Nach ISO 27001 haben IT-Sicherheitsziele welche Eigenschaften?",
        answers: [
          { text: "Sie müssen deutsch formuliert sein", correct: false },
          { text: "Sie sind allen bekannt", correct: false },
          { text: "Im Unternehmen bekannt gemacht werden", correct: true },
          { text: "Sollen nach Möglichkeit messbar sein", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A16b",
        question: "Wie ist die Verbreitung von Werkzeugen für Cyberangriffe?",
        answers: [
          { text: "Gibt es nicht, Fake-News", correct: false },
          {
            text: "Es sind auch Baukästen im DarkNet, die man kaufen kann",
            correct: true
          },
          { text: "Vielfach frei verfügbar", correct: true },
          {
            text:
              "Teilweise ganz normale Werkzeuge, die auch für die Administration und Überprüfung der eigenen Netze einsetzbar sind",
            correct: true
          }
        ],
        category: "Cyberangriffe"
      },
      {
        id: "A14d",
        question: "Wie wird der Begriff Verfügbarkeit am besten beschrieben?",
        answers: [
          {
            text: "Es ist genug Geld für IT-Sicherheit verfügbar",
            correct: false
          },
          {
            text: "Ich kann auf alles zugreifen, was ich brauche",
            correct: false
          },
          { text: "Alles ist verfügbar für die EDV", correct: false },
          {
            text:
              "Informationen und Systeme stehen entsprechend den Vereinbarungen (SLA) dem definierten Benutzerkreis zur Verfügung",
            correct: true
          }
        ],
        category: "Grundbegriffe"
      },
      {
        id: "A21k",
        question:
          "Wo sollte der IT-Sicherheitsbeauftragte am besten innerhalb einer Organisation angesiedelt sein?",
        answers: [
          { text: "Als Stabstelle bei der Organisationsleitung", correct: true },
          { text: "In der IT-Abteilung", correct: false },
          { text: "In der Rechtsabteilung", correct: false }
        ],
        category: "IT-Sicherheitsorganisation"
      },
      {
        id: "A03d",
        question: "Was bezeichnet die \"MTA\" im Rahmen des Notfallmanagements?",
        answers: [
          { text: "Medizinisch technische Assistentin", correct: false },
          { text: "Minimum technical accountable", correct: false },
          {
            text:
              "Dieser Wert gibt an, wann ein Prozess spätestens wieder anlaufen muss, damit die Überlebensfähigkeit einer Institution kurz oder langfristig nicht gefährdet ist",
            correct: true
          }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A22b",
        question:
          "Welche Voraussetzungen sind zur Behandlung von Informationssicherheitsvorfällen wichtig?",
        answers: [
          {
            text:
              "Mitarbeiter in der Lage sind, Informationssicherheitsvorfälle zu erkennen und wissen, wo sie diese melden müssen",
            correct: true
          },
          {
            text:
              "Anlaufstellen für die Informationssicherheitsvorfälle eingerichtet und im Unternehmen bekannt sind",
            correct: true
          },
          {
            text: "Prozesse für die Reaktion der Organisation definiert sind",
            correct: true
          },
          {
            text:
              "Verfahren für den Umgang mit forensischen Beweismitteln festgelegt sind",
            correct: true
          }
        ],
        category: "Incident Management"
      },
      {
        id: "A07c",
        question:
          "Für wen gilt das am 25.07.2015 in Kraft getretene IT-Sicherheitsgesetz?",
        answers: [
          { text: "Betreiber kritischer Infrastrukturen", correct: true },
          { text: "Betreiber von Webangeboten", correct: false },
          { text: "BSI", correct: false },
          { text: "Telekommunkationsunternehmen", correct: true }
        ],
        category: "Gesetzliche Grundlagen"
      },
      {
        id: "A02a",
        question: "Welche Personen sind am IT Security Prozess beteiligt?",
        answers: [
          { text: "Die Organisationsleitung", correct: true },
          {
            text: "Nach ITIL Info-Sec Manager, Service Owner, etc.",
            correct: false
          },
          {
            text: "Die übrigen Inhaber von Rollen der Informationssicherheit",
            correct: true
          },
          { text: "Alle übrigen Mitarbeiter", correct: true },
          {
            text: "IT-Security Beauftragte/Informationssicherheitsbeauftragte",
            correct: true
          },
          { text: "Chef", correct: false }
        ],
        category: "IT Security Prozess"
      },
      {
        id: "A03b",
        question: "Was gehört im engeren Sinn zum Thema Cybercrime:",
        answers: [
          { text: "Computerbetrug", correct: true },
          { text: "Ausspähen von Daten", correct: true },
          { text: "Computerzerstörung", correct: true },
          { text: "Computersabotage", correct: true }
        ],
        category: "Cybercrime"
      },
      {
        id: "A03c",
        question: "Was ist nach BSI-Standard 100-4 eine Krise?",
        answers: [
          { text: "Eine Krise ist eine ungeplante Abweichung vom Normalbetrieb, die mit dem normalen Aufbau und Ablauforganisation nicht bewältigt werden kann", correct: true },
          { text: "Eine Krise ist die Vorstufe einer Katastrophe", correct: true },
          { text: "Eine Krise ist ein verschärfter Notfall, in dem die Existenz des Unternehmens oder Leben und Gesundheit von Personen gefährdet sind", correct: true }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A03e",
        question: "Welche Aussage/n zum Umgang mit technischen Schwachstellen der in der Organisation eingesetzten Software ist/sind wichtig?",
        answers: [
          { text: "Informationen zu technischen Schwachstellen sollte rechtzeitig eingeholt werden", correct: true },
          { text: "Die Organisation sollte Aufgaben und Verantwortlichkeiten zum Einholen von Informationen über und zum Umgang mit technischen Schwachstellen festlegen", correct: true },
          { text: "Ein Patch sollte vor der Installation getestet und beurteilt werden", correct: true }
        ],
        category: "Schwachstellenmanagement"
      },
      {
        id: "A03g",
        question: "Was müssen Sie tun, wenn eine Festplatte aus dem Rechner herausgenommen wird und den Standort verlässt?",
        answers: [
          { text: "Löschen", correct: false },
          { text: "Archivieren", correct: false },
          { text: "Verschlüsseln", correct: true }
        ],
        category: "Datensicherheit"
      },
      {
        id: "A03h",
        question: "Um ein Ad-hoc-Drahtlosnetzwerk einzurichten, müssen drei Elemente zwischen den Teilnehmern vereinbart werden. Dies sind:",
        answers: [
          { text: "Wenn ein WEP aktiviert ist, WEP-Schlüssel, SSID und zu verwendende IP Adressen", correct: true },
          { text: "Wenn ein WEP aktiviert ist, WEP-Schlüssel, SSID und zu verwendende Frequenz", correct: false },
          { text: "Wenn ein WEP aktiviert ist, WEP-Schlüssel, SSID und zu verwendender Kanal", correct: false }
        ],
        category: "WLAN"
      },
      {
        id: "A03i",
        question:
          "Die Verkabelung des Netzwerkes muss durch einen Raum geführt werden, indem es zu starken Interferenzstörungen kommen kann. Welche der folgenden Kabeltypen bietet den größten Schutz gegen diese Strahlungen?",
        answers: [
          {
            text:
              "Abgeschirmte Kabel (S/STP) (Screened Shield-Twisted-Pair)-Kabel",
            correct: true
          },
          { text: "Coaxial", correct: false },
          { text: "UTP unshielded twisted pair", correct: false }
        ],
        category: "Physische Sicherheit"
      },
      {
        id: "A03k",
        question: "Das Modell \"Role-Based-Access-Control (RBAC)\" gehört zu welchem Kontrollmodell?",
        answers: [
          { text: "Zugangskontrolle", correct: false },
          { text: "Eingangskontrolle", correct: false },
          { text: "Zutrittskontrolle", correct: false },
          { text: "Zugriffskontrolle", correct: true }
        ],
        category: "Zugriffskontrolle"
      },
      {
        id: "A04",
        question: "Welche Aussagen auf Daten treffen zu?",
        answers: [
          { text: "Aus Daten können Informationen gewonnen werden", correct: true },
          { text: "Daten sind Informationen", correct: false },
          { text: "Daten können gespeichert werden", correct: true },
          { text: "Daten können verarbeitet werden", correct: true }
        ],
        category: "Grundbegriffe"
      },
      {
        id: "A04b",
        question:
          "Sie haben ein IDS-System, das nur auf einem Computer in Ihrem Netzwerk ausgeführt wird. Um welche Art von IDS-System handelt es sich?",
        answers: [
          { text: "Aktives System", correct: false },
          { text: "Netzwerk System", correct: false },
          { text: "Host-System", correct: true },
          { text: "Ungewöhnliches System", correct: false }
        ],
        category: "Netzwerksicherheit"
      },
      {
        id: "A04c",
        question: "Es gibt drei Elemente der Mehr-Faktor-Authentifizierung. Welche sind das?",
        answers: [
          { text: "Etwas, das der Benutzer gelernt hat", correct: false },
          { text: "Etwas, das der Benutzer ist, wie ein Fingerabdruck, optische Merkmale oder Stimme", correct: true },
          { text: "Etwas, das der Benutzer kennt, wie ein Passwort oder eine PIN Nummer", correct: true },
          { text: "Etwas, das der Benutzer hat, wie ein mobiles Gerät oder Token", correct: true }
        ],
        category: "Authentifizierung"
      },
      {
        id: "A04d",
        question: "Welche Möglichkeiten bieten sich Unternehmen bei der Nutzung von \"Cloud-Computing\" über das Internet?",
        answers: [
          { text: "Speicherkapazität beziehen", correct: true },
          { text: "Firewall-Dienste nutzen", correct: true },
          { text: "Rechenleistung nutzen", correct: true },
          { text: "Software beziehen bzw. nutzen", correct: true }
        ],
        category: "Cloud-Computing"
      },
      {
        id: "A04f",
        question:
          "Was umfasst bzw. grenzt die IT-Sicherheit von der Informationssicherheit ab?",
        answers: [
          {
            text:
              "IT-Security betrachtet technische Aspekte der Informationssicherheit",
            correct: true
          },
          {
            text: "Informationssicherheit umfasst die IT-Security",
            correct: true
          },
          {
            text:
              "Informationssicherheit und IT-Sicherheit sind im Wesentlichen identisch",
            correct: false
          }
        ],
        category: "Grundbegriffe"
      },
      {
        id: "A04g",
        question: "Was versteht man unter Cross-Site-Scripting-Angriffe?",
        answers: [
          { text: "Infizierte Webseiten übertragen Viren", correct: false },
          { text: "Infizierte Webseiten nützen Sicherheitslücken aus", correct: false },
          { text: "Infizierte Webseiten blenden fremde Skripte ein, um z.B. Benutzerdaten abzugreifen (korrekt wäre: 'Fremde Skripte werden in Webseiten eingeschleust und im Browser des Opfers ausgeführt.')", correct: true }
        ],
        category: "Web-Sicherheit"
      },
      {
        id: "A04h",
        question: "Welche möglichen Konsequenzen sollten Sie bedenken, bevor Sie sich ein Profil in einem sozialen Netzwerk einrichten?",
        answers: [
          { text: "Preisgabe privater Informationen, Beziehungskrisen, Identitätsdiebstahl, Phishing", correct: true },
          { text: "Preisgabe privater Informationen, Verbreitung von Schadsoftware, Identitätsdiebstahl, Phishing", correct: true },
          { text: "Preisgabe privater Informationen, Beziehungskrisen, Verbreitung von Schadsoftware, Phishing", correct: true }
        ],
        category: "Social Media"
      },
      {
        id: "A04i",
        question: "Wie soll sich ein Mitarbeiter verhalten, wenn es auf seinem System zu einem Sicherheitsvorfall kommt?",
        answers: [
          { text: "Vom Netz (LAN) nehmen", correct: true },
          { text: "IT-System herunterfahren", correct: true },
          { text: "Bildschirminfos speichern/sichern", correct: true },
          { text: "IT-Sicherheit benachrichtigen", correct: true }
        ],
        category: "Incident Response"
      },
      {
        id: "A04j",
        question: "Sie besuchen eine Internetseite. Woran erkennen Sie, dass die Daten sicher übertragen werden?",
        answers: [
          { text: "Es muss eine Authentifizierung stattfinden", correct: false },
          { text: "Die URL der aufgerufenen Internetseite beginnt mit https://", correct: true },
          { text: "Die aufgerufene Internetseite zeigt ein Schloss", correct: true }
        ],
        category: "Web-Sicherheit"
      },
      {
        id: "A05b",
        question: "Welche Aussagen können Sie zum Cybercrime machen?",
        answers: [
          { text: "Gruppen der organisierten Kriminalität (OK) betätigen sich zunehmend im Internet", correct: true },
          { text: "Mit Cybercrime verdient man Geld", correct: true },
          { text: "Zur Cyberkriminalität im weiteren Sinne zählen die Delikte, in denen das Tatmittel Internet eingesetzt wird", correct: true },
          { text: "Im Bereich Cybercrime ist das Dunkelfeld sehr groß", correct: true }
        ],
        category: "Cyberkriminalität"
      },
      {
        id: "A05c",
        question: "Welche Natur sind Sicherheitslücken?",
        answers: [
          { text: "können auch organisatorische Ursachen haben", correct: true },
          { text: "können auch technische Ursachen haben", correct: true },
          { text: "können auch Folge individuellen Fehlverhaltens sein", correct: true }
        ],
        category: "Sicherheitslücken"
      },
      {
        id: "A05d",
        question: "Nennen Sie die Normen, die sich im Kern mit der IT-Sicherheit beschäftigen:",
        answers: [
          { text: "NIS Richtlinie", correct: true },
          { text: "ISO 27000 Serie", correct: true },
          { text: "ISO 27001", correct: true },
          { text: "BSI 200-2", correct: true }
        ],
        category: "IT-Sicherheitsnormen"
      },
      {
        id: "A05e",
        question:
          "Welches sind für Sie die am häufigsten vorkommenden Sicherheitsmängel in der IT",
        answers: [
          {
            text:
              "Unzureichendes Bewusstsein für Informationssicherheit bei den Mitarbeitern einer Institution",
            correct: true
          },
          {
            text: "Fehlendes oder unzureichendes Patch-Management",
            correct: true
          },
          {
            text:
              "Fehlende oder unzureichende Überwachung von Systemen von Netzen (Monitoring)",
            correct: true
          },
          {
            text:
              "Fehlendes oder unzureichendes Veränderungsmanagement (Change Management)",
            correct: true
          }
        ],
        category: "Sicherheitsmängel"
      },
      {
        id: "A05g",
        question: "Was beinhaltet eine Informationssicherheitsrichtlinie?",
        answers: [
          { text: "Unter anderem die Strategie", correct: true },
          { text: "Unter anderem: Konzepte zur Umsetzung", correct: true },
          { text: "Unter anderem: Sicherheitsziele", correct: true }
        ],
        category: "Informationssicherheit"
      },
      {
        id: "A06b",
        question: "Welche Aussagen zum Datenschutz gibt es in Bezug auf Daten?",
        answers: [
          { text: "Datenschutz beschäftigt sich ausschließlich mit personenbezogenen oder personenbeziehbaren Daten", correct: true },
          { text: "Der Datenschutz beschäftigt sich mit allen Daten im Unternehmen", correct: false }
        ],
        category: "Datenschutz"
      },
      {
        id: "A07b",
        question: "Welche Kabelart (Kupferbasis) ist am besten abgesichert/abgeschirmt?",
        answers: [
          { text: "Coaxial", correct: false },
          { text: "UTP unshielded twisted pair", correct: false },
          { text: "S/STP Screened shielded twisted pair", correct: true }
        ],
        category: "Netzwerkinfrastruktur"
      },
      {
        id: "A07e",
        question: "Was versteht man unter einem Bot-Netz?",
        answers: [
          { text: "Bots sind dazu da, den PC zu zerstören", correct: false },
          { text: "Bots sind E-Mail-Spam", correct: false },
          { text: "Zusammengeschaltete PCs, die zum Aussenden von SPAM verwendet werden", correct: true }
        ],
        category: "Netzwerksicherheit"
      },
      {
        id: "A07g",
        question: "Welche Aufgabe hat Ethical Hacking?",
        answers: [
          { text: "Schwachstellen und Risiken in einer Infrastruktur zu identifizieren/Hacking mit Erlaubnis", correct: true },
          { text: "Netzwerk ausspionieren", correct: false },
          { text: "Datenklau", correct: false },
          { text: "Schwachstellen in einer Infrastruktur ohne Erlaubnis ausnutzen", correct: false }
        ],
        category: "Ethical Hacking"
      },
      {
        id: "A07h",
        question: "Wer verbindet sich bei einer WLAN-Verbindung mit wem?",
        answers: [
          { text: "AccessPoint: Authenticator", correct: false },
          { text: "AccessPoint mit Geräten", correct: true },
          { text: "Mobile Device: Supplicant", correct: true },
          { text: "W-Lan-Router mit Geräten", correct: true }
        ],
        category: "WLAN"
      },
      {
        id: "A13c",
        question: "Welche wichtigen Aufgaben hat ein Auditor durchzuführen",
        answers: [
          { text: "Vorortkontrolle/-begehung", correct: true },
          { text: "Zuhören", correct: true }
        ],
        category: "Auditing"
      },
      {
        id: "A13d",
        question: "Mit welchem Effekt bzw. Prinzip wird das Risiko bei redundanten Systemen reduziert ",
        answers: [
          { text: "Verteilungseffekt", correct: true },
          { text: "Kumulativer Effekt", correct: false },
          { text: "Maximum Prinzip", correct: false },
          { text: "Subtraktionseffekt", correct: false }
        ],
        category: "Risikomanagement"
      },
      {
        id: "A14b",
        question:
          "Welche Haftung hat ein IT Security Beauftragter in der Praxis?",
        answers: [
          {
            text:
              "Eine Haftung kommt auch bei unterlassenen Tätigkeiten/mangelhafter Aufgabenerfüllung in Frage",
            correct: true
          },
          {
            text:
              "Sowohl ein interner als auch ein externer Informationssicherheitsbeauftragter haftet dem Unternehmen gegenüber grundsätzlich für Schäden, die er schuldhaft verursacht hat",
            correct: true
          },
          { text: "Er haftet für den Bilanzverlust", correct: false },
          { text: "Er haftet für Stromausfall", correct: false }
        ],
        category: "Rechtliche Aspekte"
      },
      {
        id: "A14c",
        question: "Wie kann ein angemessenes Niveau in der IT Sicherheit erreicht werden?",
        answers: [
          { text: "Durch Kauf einer Firewall", correct: false },
          { text: "ist der Aufbau und Betrieb eines ISMS zielführend", correct: true },
          { text: "Durch Umsetzung vernünftiger Sicherheitsmaßnahmen", correct: true },
          { text: "Bedarf es eines abgestimmten Zusammenspiels von technischen, organisatorischen und rechtlichen Maßnahmen", correct: true }
        ],
        category: "IT-Sicherheit"
      },
      {
        id: "A16c",
        question: "Welche Aussage kann man über die Vereinbarkeit von ISO-27001 und BSI Grundschutz machen?",
        answers: [
          { text: "Ein grundschutzkonformes ISMS ist auch ISO-27001 konform", correct: false },
          { text: "Dazu hat sich keiner Gedanken gemacht", correct: false },
          { text: "Sie sind nicht miteinander vereinbar", correct: false },
          { text: "Dazu gibt es Vergleiche", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A16d",
        question: "Wie wird der Begriff Vertraulichkeit am besten beschrieben?",
        answers: [
          { text: "Informationen sind nicht von Dritten änderbar", correct: false },
          { text: "Informationen sind vor der unberechtigten Offenlegung geschützt", correct: true }
        ],
        category: "Grundbegriffe"
      },
      {
        id: "A16e",
        question: "Was legt eine Informationssicherheitsleitlinie fest?",
        answers: [
          { text: "legt u.a. die Strategie zur Umsetzung fest", correct: true },
          { text: "stellt u.a. die Sicherheitsziele einer Organisation dar", correct: true },
          { text: "legt u.a. die Konzepte zur Umsetzung fest", correct: true }
        ],
        category: "Informationssicherheit"
      },
      {
        id: "A20b",
        question: "Was ist bei Rollen, die im Konflikt stehen, in der Informationssicherheit zu beachten?",
        answers: [
          { text: "Sind Rollenkonflikte nicht zu vermeiden, sollen andere Maßnahmen wie eine zusätzliche Überwachung in Betracht gezogen werden", correct: true },
          { text: "Miteinander in Konflikt stehende Rollen sind unbedingt zu vermeiden", correct: true },
          { text: "Miteinander in Konflikt stehende Rollen sollen nicht vom selben Rolleninhaber besetzt werden", correct: true },
          { text: "Miteinander in Konflikt stehende Aufgabenfelder sollen nicht in einer Rolle zusammenfallen", correct: true }
        ],
        category: "Rollenkonflikt"
      },
      {
        id: "A20e",
        question: "Was haben Sie im Kontakt mit Behörden zu beachten?",
        answers: [
          { text: "Ein angemessener Kontakt zu relevanten Behörden sollte auch präventiv gepflegt werden", correct: true },
          { text: "Die Telefonnummern mit dem Landes-Sicherheitsbeauftragten austauschen", correct: false },
          { text: "Unternehmen sollten über Regeln, Verfahren und Zuständigkeiten zur Kontaktpflege mit relevanten Behörden verfügen", correct: true },
          { text: "Blumen zum Geburtstag schicken", correct: false }
        ],
        category: "Behördenkontakte"
      },
      {
        id: "A20f",
        question: "Welche Aufgaben schreibt ein ISMS der Führung eines Unternehmens/Organisation vor?",
        answers: [
          { text: "Die fortlaufende Verbesserung des ISMS zu fördern", correct: true },
          { text: "Strafen festlegen", correct: false },
          { text: "Sanktionsmechanismen bei Verstößen etablieren", correct: false },
          { text: "Sicherzustellen, dass die Informationssicherheitspolitik mit den strategischen Zielen der Organisation vereinbar ist", correct: true },
          { text: "Personen anzuleiten und zu unterstützen, damit diese positive Beiträge zum ISMS leisten können", correct: true }
        ],
        category: "ISMS"
      },
      {
        id: "A20g",
        question: "Aus welchen beiden Blickwinkeln betrachtet die ISO-27001 im Kern die Informationssicherheit?",
        answers: [
          { text: "Prozessorientiert", correct: true },
          { text: "Risikobasiert", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A21b",
        question: "Um ISO-27001 konform zu sein, muss das ISMS wie verwirklicht sein?",
        answers: [
          { text: "Kontinuierlich verbessert werden", correct: true },
          { text: "Aufgebaut und realisiert", correct: true },
          { text: "Fortgeführt bzw. aufrechterhalten werden", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A21c",
        question: "Was beschreibt der ISO-27001 Standard?",
        answers: [
          { text: "Anleitungen (\"Best Practice\") zur Umsetzung aller der in Anhang A der ISO-27001 befindlichen Controls", correct: false },
          { text: "Formulare, die eingesetzt werden bei der Zertifizierung nach 27001", correct: false },
          { text: "Die Form in der die Umsetzung von 27001 stattfinden muss", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A21e",
        question: "Was könnten die Gründe sein, Kontakt zu speziellen Interessenverbänden, Expertenforen, Fachverbänden wegen der IT-Sicherheit zu halten?",
        answers: [
          { text: "Um sich über aktuelle Entwicklungen bei neuen Technologien und damit im Zusammenhang stehenden Fragen der Informationssicherheit austauschen zu können", correct: true },
          { text: "Um sicherzustellen, dass das eigene Verständnis zum Thema Informationssicherheit vollständig und zeitgemäß ist", correct: true },
          { text: "Um über aktuelle Entwicklungen der Informationssicherheit auf dem Laufenden zu bleiben", correct: true },
          { text: "Um rechtzeitig Warnungen vor akuten Informationssicherheitsbedrohungen zu erhalten", correct: true }
        ],
        category: "Netzwerkpflege"
      },
      {
        id: "A21f",
        question: "Wie wird in der ISO 27001 die Bereitstellung der Ressourcen beschrieben? Welches Kapitel?",
        answers: [
          { text: "nur in Anhang A.12", correct: false },
          { text: "in 5.1 Abschnitt c Die Führung ist verpflichtet sicherzustellen, dass die für das Informationssicherheitsmanagementsystem erforderlichen Ressourcen zur Verfügung stehen", correct: true },
          { text: "(in 7.1) Die Organisation muss die zur Einrichtung, Implementierung, Aufrechterhaltung und laufenden Verbesserung des ISMS erforderlichen Ressourcen ermitteln und bereitstellen", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A21h",
        question: "Welche Themen zum Verstehen des externen Kontextes einer Organisation nach ISO 27001 können dazugehören?",
        answers: [
          { text: "Die natürliche Umwelt", correct: false },
          { text: "Soziale und kulturelle Themen", correct: true },
          { text: "Technische Trends und Entwicklungen, die sich auf die Zielerreichung der Organisation auswirken können", correct: true }
        ],
        category: "ISO 27001"
      },
      {
        id: "A21j",
        question: "In welchen Bereichen sollte die Informationssicherheit zusätzlich zur IT-Abteilung berücksichtigt werden?",
        answers: [
          { text: "Spielt auch im Personalbereich eine wichtige Rolle", correct: true },
          { text: "Im Organigramm", correct: false },
          { text: "in jeder Art von Projekt", correct: true },
          { text: "Sollte auch im Projektmanagement, in jeder Art von Projekt berücksichtigt werden", correct: true }
        ],
        category: "Informationssicherheit"
      },
      {
        id: "A22c",
        question: "Was ist in Bezug auf die Rollen in der IT-Sicherheit zu beachten?",
        answers: [
          { text: "Die Rollen, die Zuordnung zu den Rolleninhabern sowie deren Kompetenzen und Zuständigkeiten sollten im Unternehmen bekannt gemacht werden", correct: true },
          { text: "Alle Rollen sind definiert und festgelegt, insbesondere in Hinblick auf Kompetenzen und Zuständigkeiten", correct: true },
          { text: "Es muss immer eine Rolle IT-Sicherheitsbeauftragter geben", correct: false },
          { text: "Alle Rollen sind Rolleninhaber zugeordnet", correct: true }
        ],
        category: "IT-Sicherheitsrollen"
      },
      {
        id: "A22d",
        question: "Wer ist für die Informationssicherheit im Unternehmen / in der Organisation verantwortlich?",
        answers: [
          { text: "Der IT-Sicherheitsbeauftragte", correct: false },
          { text: "Die Geschäftsleitung", correct: false },
          { text: "alle", correct: true }
        ],
        category: "Verantwortlichkeiten"
      },
      {
        id: "A22e",
        question: "Welche Eigenschaften muss die IT-Sicherheitspolitik aufweisen?",
        answers: [
          { text: "sie muss unabhängig von der GF definiert werden", correct: false },
          { text: "Informationssicherheitsziele ODER ein Rahmen, wie sie sich aus den Unternehmenszielen ableiten lassen", correct: true },
          { text: "Eignung für den Zweck der Organisation", correct: true },
          { text: "Einbeziehung einer Verpflichtung zur laufenden Verbesserung des Informationssicherheitsmanagement (ISMS)", correct: true }
        ],
        category: "IT-Sicherheitspolitik"
      },
      {
        id: "A22f",
        question: "Wozu sind Sicherheitsperimeter?",
        answers: [
          { text: "Sie sind KPIs und dienen der Ziellerreichungsmessung", correct: false },
          { text: "Dienen dem Schutz der organisationseigenen Werte", correct: true },
          { text: "Sollten festgelegt werden", correct: true }
        ],
        category: "Physische Sicherheit"
      },
      {
        id: "A22g",
        question: "Welche Aussagen sind in Bezug auf Veränderungen an Systemen zu machen?",
        answers: [
          { text: "Es sollte Regeln und Prozesse für eine Änderungssteuerung geben (Change-Management)", correct: true },
          { text: "Die Änderungssteuerung sollte ein formales Genehmigungsverfahren beinhalten", correct: true },
          { text: "Es sollte sichergestellt werden, dass auch bei und nach Veränderungen alle Vorgaben der Informationssicherheit eingehalten werden", correct: true },
          { text: "Veränderungen sind immer beim IT-Sicherheitsbeauftragten zu beantragen", correct: false }
        ],
        category: "Change-Management"
      },
      {
        id: "A22h",
        question:
          "Welche Maßnahmen zum Schutz vor Schadsoftware müssen ergriffen werden?",
        answers: [
          {
            text:
              "Mitarbeiter sollten für das Problem von Schadsoftware angemessen sensibilisiert werden",
            correct: true
          },
          {
            text: "Schadsoftware soll jeder Mitarbeiter beseitigen können",
            correct: false
          },
          {
            text:
              "Beseitigte Schadsoftware muss vom Mitarbeiter an die Landesbehörde gemeldet werden",
            correct: false
          },
          {
            text:
              "Bekannte technische Schwachstellen sollten behoben werden (Patch Management)",
            correct: true
          }
        ],
        category: "Schadsoftware"
      },
      {
        id: "A22i",
        question: "Was soll zum Thema Ereignisprotokollierung umgesetzt sein?",
        answers: [
          { text: "Administratoren sollten nicht in der Lage sein, die Protokolle ihrer eigenen Aktivitäten zu ändern", correct: true },
          { text: "Auch Aktivitäten von Administratoren sollten protokolliert werden", correct: true },
          { text: "Nicht synchron laufende Uhren in den Systemen erschweren die Auswertung von Protokollinformationen deutlich", correct: true }
        ],
        category: "Ereignisprotokollierung"
      },
      {
        id: "A25b",
        question: "Was ist bei der Installation von Software aus Sicht der IT Sicherheit zu beachten?",
        answers: [
          { text: "Vor dem Aufspielen neuer oder geänderter Software sollte eine Rollback Strategie existieren", correct: true },
          { text: "Software sollte nur bei vorliegender Genehmigung installiert werden", correct: true },
          { text: "Nutzen und Risiko einer Software Installation sollten gegeneinander abgewogen werden", correct: true }
        ],
        category: "Software-Installation"
      },
      {
        id: "A25d",
        question:
          "Welche Tätigkeiten sind beim Risikomanagement nach ISO 27001 zwingend zu machen",
        answers: [
          { text: "Risiken bestimmen", correct: true },
          {
            text: "Die Zertifizierung muss im 4ten Jahr wiederholt werden",
            correct: false
          },
          { text: "Risiken behandeln", correct: true },
          { text: "Risiken bewerten", correct: true }
        ],
        category: "Risikomanagement"
      },
      {
        id: "A25e",
        question: "Was ist bei der Ereignisprotokollierung zu beachten?",
        answers: [
          { text: "Da Ereignisprotokolle möglicherweise Rückschlüsse auf das Arbeitsverhalten von Mitarbeitern erlauben, ist ggf. der Betriebsrat zu beteiligen", correct: true },
          { text: "Es sollte definiert werden, was protokolliert wird", correct: true },
          { text: "Ereignisprotokolle sollten regelmäßig überprüft werden", correct: true },
          { text: "Da Ereignisprotokolle oftmals personenbezogene Daten enthalten, müssen sie besonders geschützt werden", correct: true }
        ],
        category: "Ereignisprotokollierung"
      },
      {
        id: "A25f",
        question: "Was bedeutet der Begriff Zutritt?",
        answers: [
          { text: "Nur der Zutritt zum Serverraum", correct: false },
          { text: "Die Möglichkeit einen begrenzten Bereich/Sektor/Raum zu betreten", correct: true }
        ],
        category: "Zutrittskontrolle"
      },
      {
        id: "A25g",
        question: "Was bedeutet der Begriff Zugang?",
        answers: [
          { text: "Die Möglichkeit der Nutzung eines IT Systems, eventuell mit vorheriger Anmeldung", correct: true },
          { text: "Fingerabdruck-Einlass-System", correct: false },
          { text: "Login+Passwort", correct: false }
        ],
        category: "Zugangskontrolle"
      },
      {
        id: "A25j",
        question: "Welche \"Normen\" beschäftigen sich mit dem Risikomanagement?",
        answers: [
          { text: "ISO 9001", correct: false },
          { text: "ISO 27005", correct: true },
          { text: "BSI Grundschutz 200-3", correct: true },
          { text: "ISO 31000", correct: true }
        ],
        category: "Risikomanagement"
      },
      {
        id: "A25k",
        question: "Was ist die Notfallbewältigung von Ihrem Grundsatz her?",
        answers: [
          { text: "eine optionale Handlungsempfehlung", correct: false },
          { text: "eine Norm", correct: false },
          { text: "Reaktive Abarbeitung der Sicherheitsmaßnahmen", correct: true }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A25l",
        question: "Was ist die Notfallvorsorge von ihrem Grundsatz her?",
        answers: [
          { text: "Vorausschauend", correct: true },
          { text: "Proaktiv", correct: true },
          { text: "Reaktiv", correct: false }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A25m",
        question: "Was sollten sich die Mitarbeiter einer Organisation nach ISO 27001 bewusst sein?",
        answers: [
          { text: "Ihres Beitrags zum ISMS", correct: true },
          { text: "Der Informationssicherheitspolitik", correct: true },
          { text: "Der Folgen einer Nichterfüllung der Anforderungen des ISMS", correct: true },
          { text: "Mögliche Sanktionen bei Nichterfüllung", correct: true }
        ],
        category: "ISMS"
      },
      {
        id: "A26d",
        question: "Welche Rollen gehören zur Notfallvorsorge?",
        answers: [
          { text: "Notfallbeauftragter", correct: true },
          { text: "Notfallkoordinator", correct: true },
          { text: "Unternehmensleitung", correct: true },
          { text: "Notfallvorsorgeteam", correct: true }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A26e",
        question: "Was ist eine Katastrophe nach BSI 100-4?",
        answers: [
          { text: "Ein Großschadensereignis, zum Beispiel als Folge von Überschwemmungen oder Erdbeben", correct: true },
          { text: "Katastrophen können nur durch Mitarbeiter ausgelöst werden", correct: false },
          { text: "Eine Katastrophe ist nicht auf das eigene Unternehmen beschränkt", correct: true },
          { text: "Eine Katastrophe verhält sich aus Sicht des betroffenen Unternehmens wie eine Krise", correct: true }
        ],
        category: "Notfallmanagement"
      },
      {
        id: "A26g",
        question: "Was stellt ein Audit dar?",
        answers: [
          { text: "eine lückenlose Prüfung aller möglichen Notfallszenarien", correct: false },
          { text: "Eine Vorschrift im ISO27001", correct: false },
          { text: "der Vergleich zwischen einem IST-Zustand und einem SOLL-Zustand", correct: true }
        ],
        category: "Auditing"
      },
      {
        id: "A26l",
        question: "Was muss bei Awarenesskampagnen bedacht werden?",
        answers: [
          { text: "Marketingleitung muss eingebunden werden", correct: false },
          { text: "zielgruppenorientiert sein", correct: true },
          { text: "gut geplant werden", correct: true },
          { text: "die Informationssicherheitsziele der Organisation berücksichtigen/zugeschnitten", correct: true }
        ],
        category: "Awareness"
      },
      {
        id: "B06o",
        question: "Was sind Bestandteile eines Business Continuity Plans?",
        answers: [
          { text: "Notfallpläne", correct: true },
          { text: "Wiederanlaufpläne", correct: true },
          { text: "Marketingstrategien", correct: false },
          { text: "Kommunikationskonzepte für den Krisenfall", correct: true }
        ],
        category: "Business Continuity"
      },
      {
        id: "C11k",
        question: "Was ist ein Intrusion Detection System (IDS)?",
        answers: [
          {
            text: "Ein System zur Erkennung von Eindringen in Netzwerke",
            correct: true
          },
          { text: "Eine Firewall zum Blockieren von Angriffen", correct: false },
          {
            text:
              "Ein System zur Überwachung von Netzwerkverkehr auf verdächtige Aktivitäten",
            correct: true
          },
          { text: "Ein Antivirus-Programm", correct: false }
        ],
        category: "Netzwerksicherheit"
      },
      {
        id: "D07g",
        question:
          "Welche Anforderungen muss ein Passwort nach den gängigen Sicherheitsrichtlinien erfüllen?",
        answers: [
          { text: "Mindestens 8 Zeichen", correct: true },
          { text: "Kombination aus Groß- und Kleinbuchstaben", correct: true },
          { text: "Sonderzeichen und Zahlen", correct: true },
          { text: "Es sollte leicht zu merken sein", correct: false }
        ],
        category: "Passwörter"
      },
      {
        id: "D10n",
        question: "Was sind wichtige Aspekte des Datenschutzes in Unternehmen?",
        answers: [
          { text: "Einhaltung der DSGVO", correct: true },
          { text: "Regelmäßige Schulungen der Mitarbeiter", correct: true },
          { text: "Dokumentation aller Verarbeitungstätigkeiten", correct: true },
          {
            text: "Speicherung aller Daten für mindestens 10 Jahre",
            correct: false
          }
        ],
        category: "Datenschutz"
      },
      {
        id: "E09i",
        question:
          "Was sollte bei der Einrichtung einer sicheren E-Mail-Kommunikation beachtet werden?",
        answers: [
          {
            text: "Verschlüsselung der E-Mails mittels S/MIME oder PGP",
            correct: true
          },
          { text: "Regelmäßige Überprüfung der Spam-Filter", correct: true },
          { text: "Verzicht auf HTML-Formatierung", correct: false },
          { text: "Absenderprüfung durch SPF, DKIM und DMARC", correct: true }
        ],
        category: "E-Mail-Sicherheit"
      },
      {
        id: "M02j",
        question:
          "Welche Maßnahmen gehören zu einem sicheren Umgang mit mobilen Geräten?",
        answers: [
          { text: "Verwendung von Bildschirmsperren", correct: true },
          { text: "Regelmäßige Software-Updates", correct: true },
          { text: "Verzicht auf öffentliche WLAN-Netzwerke", correct: false },
          { text: "Verschlüsselung des Speichers", correct: true }
        ],
        category: "Mobile Sicherheit"
      },
      {
        id: "N05h",
        question: "Was ist unter dem Begriff 'Social Engineering' zu verstehen?",
        answers: [
          {
            text:
              "Manipulation von Menschen, um an vertrauliche Informationen zu gelangen",
            correct: true
          },
          { text: "Einsatz von sozialen Medien zur Überwachung", correct: false },
          { text: "Optimierung von sozialen Netzwerken", correct: false },
          {
            text:
              "Ausnutzen menschlicher Eigenschaften wie Hilfsbereitschaft oder Vertrauen",
            correct: true
          }
        ],
        category: "Social Engineering"
      },
      {
        id: "P01d",
        question: "Was sind typische Angriffsszenarien im Internet?",
        answers: [
          { text: "Phishing", correct: true },
          { text: "DDoS-Angriffe", correct: true },
          { text: "SQL-Injection", correct: true },
          { text: "Remote-Support", correct: false }
        ],
        category: "Angriffsszenarien"
      },
      {
        id: "R08m",
        question: "Welche Maßnahmen sind Teil eines wirksamen Risikomanagements?",
        answers: [
          { text: "Identifikation von Risiken", correct: true },
          { text: "Bewertung von Risiken", correct: true },
          { text: "Vermeidung aller Risiken", correct: false },
          { text: "Implementierung von Gegenmaßnahmen", correct: true }
        ],
        category: "Risikomanagement"
      },
      {
        id: "S12a",
        question: "Welche Maßnahmen gehören zum Patch-Management?",
        answers: [
          {
            text: "Regelmäßige Überprüfung auf verfügbare Updates",
            correct: true
          },
          {
            text:
              "Testen der Updates vor dem Einspielen in der Produktivumgebung",
            correct: true
          },
          { text: "Dokumentation der eingespielten Updates", correct: true },
          {
            text: "Erstellen von Datensicherungen vor dem Einspielen von Updates",
            correct: true
          }
        ],
        category: "Patch-Management"
      },
      {
        id: "V04l",
        question: "Was sind Merkmale einer Zwei-Faktor-Authentifizierung?",
        answers: [
          { text: "Kombination aus Wissen und Besitz", correct: true },
          {
            text: "Verwendung von zwei verschiedenen Passwörtern",
            correct: false
          },
          {
            text: "Biometrische Merkmale können als zweiter Faktor dienen",
            correct: true
          },
          {
            text:
              "Erhöhung der Sicherheit durch zusätzliche Authentifizierungsebene",
            correct: true
          }
        ],
        category: "Authentifizierung"
      },
      {
        id: "V15p",
        question:
          "Welche Sicherheitsmaßnahmen sollten bei der Nutzung von Cloud-Diensten beachtet werden?",
        answers: [
          {
            text: "Starke Authentifizierung für alle Cloud-Zugänge",
            correct: true
          },
          {
            text: "Verschlüsselung sensibler Daten vor dem Upload",
            correct: true
          },
          { text: "Regelmäßige Überprüfung der Zugriffsrechte", correct: true },
          {
            text: "Nutzung ausschließlich kostenloser Cloud-Dienste",
            correct: false
          }
        ],
        category: "Cloud-Sicherheit"
      },
      {
        id: "Z101",
        question: "Was bedeutet Zugriff?",
        answers: [
          { text: "Zugang zur Küche haben und Zugriff auf den Kühlschrank haben", correct: false },
          { text: "die Nutzung bestimmter Daten", correct: true },
          { text: "Mitarbeiter physisch greifen können", correct: false }
        ],
        category: "Zugriffskontrolle"
      },
      {
        id: "Z102",
        question: "Was heißt ISMS?",
        answers: [
          { text: "International-Security-Management-System", correct: false },
          { text: "Informations-Sicherheits-Management-System", correct: true }
        ],
        category: "ISMS"
      },
      {
        id: "Z103",
        question: "Zugriff bedeutet",
        answers: [
          { text: "Zugriff bedeutet die Rechtevergabe auf bestimmte Objekte", correct: true },
          { text: "die Möglichkeit der Nutzung bestimmter Daten und Informationen", correct: true },
          { text: "Autorisierung des Benutzers für den Zugriff auf bestimmte Dateien, Verzeichnisse, Programme und Funktionen", correct: true }
        ],
        category: "Zugriffskontrolle"
      },
      {
        id: "Z104",
        question: "Was muss die Führung bzgl. der Informationssicherheitsziele beachten?",
        answers: [
          { text: "sie müssen im Unternehmen bekanntgemacht werden", correct: true },
          { text: "sie müssen im Einklang mit der Informationssicherheitspolitik stehen", correct: true },
          { text: "jeder muss sie beachten", correct: false },
          { text: "sie müssen messbar sein", correct: true }
        ],
        category: "Informationssicherheit"
      }
    ];

    // Variablen für die Anwendung
    let currentScreen = "startscreen";
    let currentPracticeQuestion = null;
    let practiceHistory = [];
    let examQuestions = [];
    let examAnswers = [];
    let currentExamQuestion = 0;
    let timeLeft = 0;
    let timerInterval = null;

    // Statistik laden oder initialisieren
    let statistics = loadStatistics() || {
      answeredQuestions: {},
      totalAnswered: 0,
      totalCorrect: 0,
      totalIncorrect: 0
    };

    // MDL-Komponenten nach der Initialisierung aktualisieren
    function upgradeComponents() {
      if (window.componentHandler) {
        componentHandler.upgradeAllRegistered();
      }
    }

    // DOM-Elemente
    const screens = document.querySelectorAll(".screen");
    const practiceQuestionContainer = document.getElementById(
      "practice-question-container"
    );
    const examQuestionContainer = document.getElementById(
      "exam-question-container"
    );
    const questionNumberElement = document.getElementById("question-number");
    const timeLeftElement = document.getElementById("time-left");
    const catalogContainer = document.getElementById("catalog-container");
    const overviewContainer = document.getElementById("overview-container");
    const scoreElement = document.getElementById("score");
    const percentageElement = document.getElementById("percentage");
    const passFailElement = document.getElementById("pass-fail");

    // Statistik-DOM-Elemente
    const totalQuestionsElement = document.getElementById("total-questions");
    const correctAnswersElement = document.getElementById("correct-answers");
    const incorrectAnswersElement = document.getElementById("incorrect-answers");
    const correctPercentageElement = document.getElementById(
      "correct-percentage"
    );
    const incorrectPercentageElement = document.getElementById(
      "incorrect-percentage"
    );
    const incorrectQuestionsListElement = document.getElementById(
      "incorrect-questions-list"
    );
    const allQuestionsStatsElement = document.getElementById(
      "all-questions-stats"
    );
    const notAnsweredQuestionsListElement = document.getElementById(
      "not-answered-questions-list"
    );
    const practiceIncorrectButton = document.getElementById("practice-incorrect");
    const practiceNotAnsweredButton = document.getElementById(
      "practice-not-answered"
    );
    const catalogSearchInput = document.getElementById("catalog-search");
    const overviewSearchInput = document.getElementById("overview-search");

    // Hilfsfunktionen
    function showScreen(screenId) {
        screens.forEach((screen) => screen.classList.remove("active"));
        document.getElementById(screenId).classList.add("active");
        currentScreen = screenId;
  
        if (screenId === "statistics") {
          updateStatisticsDisplay();
        }
  
        upgradeComponents();
      }
  
      function getRandomQuestion(filteredQuestions = null) {
        const questionPool = filteredQuestions || questions;
        return questionPool[Math.floor(Math.random() * questionPool.length)];
      }
  
      function generateQuestionHTML(question, mode) {
        if (!question) return '<div class="question">Keine Frage verfügbar</div>';
  
        let html = `<div class="question">${
          question.id ? `[${question.id}] ` : ""
        }${question.question}</div><div class="answers">`;
        question.answers.forEach((answer, index) => {
          html += `
                  <div class="answer">
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${mode}-answer-${index}">
                          <input type="checkbox" id="${mode}-answer-${index}" class="mdl-checkbox__input" data-correct="${answer.correct}">
                          <span class="mdl-checkbox__label answer-text">${answer.text}</span>
                      </label>
                  </div>`;
        });
        return html + "</div>";
      }
  
      // ========================= Neuer checkAnswer-Patch =========================
      function checkAnswer(mode) {
        const container = document.getElementById(`${mode}-question-container`);
        // alte Zusammenfassung entfernen
        const oldSum = container.querySelector(".answer-summary");
        if (oldSum) oldSum.remove();
  
        const answers = Array.from(container.querySelectorAll(".answer"));
        let allCorrect = true;
        const correctLetters = [];
  
        answers.forEach((answer, idx) => {
          const input = answer.querySelector("input");
          const isChecked = input.checked;
          const isCorrect = input.dataset.correct === "true";
          const letter = String.fromCharCode(65 + idx); // A, B, C…
  
          // Feedback-Span anlegen/finden
          let fb = answer.querySelector(".feedback");
          if (!fb) {
            fb = document.createElement("span");
            fb.classList.add("feedback");
            // Sicherstellen, dass das Feedback *innerhalb* des Labels ist oder sinnvoll platziert wird
            // Hier: Annahme, das Feedback soll neben dem Text stehen. Ggf. anpassen!
            const label = answer.querySelector(".mdl-checkbox__label");
            if (label) {
              label.appendChild(fb); // Hängt es ans Ende des Labels an
            } else {
              answer.appendChild(fb); // Fallback
            }
          }
          fb.textContent = "";
          answer.classList.remove("correct", "incorrect", "missed");
  
          if (isChecked && isCorrect) {
            answer.classList.add("correct");
            fb.textContent = "✔";
            correctLetters.push(letter);
          } else if (isChecked && !isCorrect) {
            answer.classList.add("incorrect");
            fb.textContent = "✖";
            allCorrect = false;
          } else if (!isChecked && isCorrect) {
            answer.classList.add("missed");
            fb.textContent = "⚠";
            correctLetters.push(letter);
            allCorrect = false;
          }
        });
  
        // Zusammenfassung am Ende anhängen
        const summary = document.createElement("div");
        summary.classList.add("answer-summary");
        const label = allCorrect ? "Richtig!" : "Falsch!";
        summary.innerHTML = `<strong>${label}</strong><br>Die richtigen Antworten: ${correctLetters.join(
          ", "
        )}.`;
        container.appendChild(summary);
  
        // Statistik aktualisieren (nur im Übungsmodus)
        if (mode === "practice" && currentPracticeQuestion) {
          updateQuestionStatistics(currentPracticeQuestion.id, allCorrect);
        }
  
        return allCorrect;
      }
      // ============================================================================
  
      function updateQuestionStatistics(questionId, isCorrect) {
        if (!questionId) return;
  
        // Zähle nur, wenn die Frage *zum ersten Mal* beantwortet wird oder ihren Status ändert
        const previousStatus = statistics.answeredQuestions[questionId];
        if (!previousStatus) {
          statistics.totalAnswered++;
        }
  
        statistics.answeredQuestions[questionId] = {
          answered: true,
          correct: isCorrect,
          timestamp: Date.now()
        };
  
        updateOverallStatistics(); // Aktualisiere die Gesamtstatistik
        saveStatistics();
        // Optional: Aktualisiere die Statistik-Ansicht, falls sie gerade angezeigt wird
        if (currentScreen === "statistics") {
          updateStatisticsDisplay();
        }
      }
  
      function updateOverallStatistics() {
        let correct = 0;
        let incorrect = 0;
        let answeredIds = Object.keys(statistics.answeredQuestions);
  
        statistics.totalAnswered = answeredIds.length; // Korrekte Zählung der beantworteten Fragen
  
        answeredIds.forEach((questionId) => {
          if (statistics.answeredQuestions[questionId].correct) {
            correct++;
          } else {
            incorrect++;
          }
        });
  
        statistics.totalCorrect = correct;
        statistics.totalIncorrect = incorrect;
      }
  
      function saveStatistics() {
        localStorage.setItem("quizStatistics", JSON.stringify(statistics));
      }
  
      function loadStatistics() {
        const savedStats = localStorage.getItem("quizStatistics");
        // Füge eine Fehlerbehandlung für ungültiges JSON hinzu
        try {
          const parsedStats = savedStats ? JSON.parse(savedStats) : null;
          // Stelle sicher, dass die Grundstruktur vorhanden ist
          if (
            parsedStats &&
            typeof parsedStats.answeredQuestions === "object" &&
            parsedStats.answeredQuestions !== null
          ) {
            return parsedStats;
          } else {
            // Wenn ungültig oder fehlt, initialisiere neu
            return {
              answeredQuestions: {},
              totalAnswered: 0,
              totalCorrect: 0,
              totalIncorrect: 0
            };
          }
        } catch (e) {
          console.error("Fehler beim Laden der Statistik:", e);
          return {
            answeredQuestions: {},
            totalAnswered: 0,
            totalCorrect: 0,
            totalIncorrect: 0
          }; // Bei Fehler neu initialisieren
        }
      }
  
      function resetStatistics() {
        statistics = {
          answeredQuestions: {},
          totalAnswered: 0,
          totalCorrect: 0,
          totalIncorrect: 0
        };
        saveStatistics();
        updateStatisticsDisplay();
      }
  
      function updateStatisticsDisplay() {
        // Stelle sicher, dass die Elemente existieren, bevor darauf zugegriffen wird
        if (
          !totalQuestionsElement ||
          !correctAnswersElement ||
          !incorrectAnswersElement ||
          !correctPercentageElement ||
          !incorrectPercentageElement ||
          !incorrectQuestionsListElement ||
          !allQuestionsStatsElement ||
          !notAnsweredQuestionsListElement ||
          !practiceIncorrectButton ||
          !practiceNotAnsweredButton
        ) {
          console.error("Ein oder mehrere Statistik-DOM-Elemente fehlen.");
          return;
        }
  
        totalQuestionsElement.textContent = questions.length;
        correctAnswersElement.textContent = statistics.totalCorrect;
        incorrectAnswersElement.textContent = statistics.totalIncorrect;
  
        // Vermeide Division durch Null
        const totalAnsweredCount = statistics.totalAnswered || 0; // Stelle sicher, dass es eine Zahl ist
        const correctPercentage =
          totalAnsweredCount > 0
            ? Math.round((statistics.totalCorrect / totalAnsweredCount) * 100)
            : 0;
        const incorrectPercentage =
          totalAnsweredCount > 0
            ? Math.round((statistics.totalIncorrect / totalAnsweredCount) * 100)
            : 0;
  
        correctPercentageElement.textContent = `(${correctPercentage}%)`;
        incorrectPercentageElement.textContent = `(${incorrectPercentage}%)`;
  
        // Liste der falsch beantworteten Fragen
        incorrectQuestionsListElement.innerHTML = "";
        let hasIncorrectQuestions = false;
        const incorrectQuestions = getIncorrectQuestions(); // Hole die Liste
  
        incorrectQuestions.forEach((question) => {
          hasIncorrectQuestions = true;
          const item = document.createElement("div");
          item.className = "stat-question-item";
          item.innerHTML = `
                    <span class="stat-question-id">${question.id || "N/A"}</span>
                    <span class="stat-question-text">${question.question}</span>
                    <span class="stat-question-status incorrect">
                        <i class="material-icons">close</i>
                    </span>
                `;
          item.addEventListener("click", () => {
            loadPracticeQuestion(question); // Lade spezifische Frage
            showScreen("practice-mode");
          });
          incorrectQuestionsListElement.appendChild(item);
        });
  
        if (!hasIncorrectQuestions) {
          incorrectQuestionsListElement.innerHTML =
            '<p class="empty-list-message">Keine falsch beantworteten Fragen vorhanden.</p>';
          practiceIncorrectButton.disabled = true;
        } else {
          practiceIncorrectButton.disabled = false;
        }
  
        // Gesamtliste aller Fragen mit Status
        allQuestionsStatsElement.innerHTML = "";
        questions.forEach((question) => {
          const stat = statistics.answeredQuestions[question.id];
          const item = document.createElement("div");
          item.className = "stat-question-item";
  
          let statusIcon, statusClass, statusText;
  
          if (!stat) {
            statusIcon = "help_outline";
            statusClass = "not-answered";
            statusText = "Nicht beantwortet";
          } else if (stat.correct) {
            statusIcon = "check";
            statusClass = "correct";
            statusText = "Richtig";
          } else {
            statusIcon = "close";
            statusClass = "incorrect";
            statusText = "Falsch";
          }
  
          item.innerHTML = `
                    <span class="stat-question-id">${question.id || "N/A"}</span>
                    <span class="stat-question-text">${question.question}</span>
                    <span class="stat-question-status ${statusClass}" title="${statusText}">
                        <i class="material-icons">${statusIcon}</i>
                    </span>
                `;
          item.addEventListener("click", () => {
            loadPracticeQuestion(question);
            showScreen("practice-mode");
          });
          allQuestionsStatsElement.appendChild(item);
        });
  
        // Liste der nicht beantworteten Fragen
        notAnsweredQuestionsListElement.innerHTML = "";
        let hasNotAnsweredQuestions = false;
        const notAnsweredQuestions = getNotAnsweredQuestions(); // Hole die Liste
  
        notAnsweredQuestions.forEach((question) => {
          hasNotAnsweredQuestions = true;
          const item = document.createElement("div");
          item.className = "stat-question-item";
          item.innerHTML = `
                    <span class="stat-question-id">${question.id || "N/A"}</span>
                    <span class="stat-question-text">${question.question}</span>
                    <span class="stat-question-status not-answered">
                        <i class="material-icons">help_outline</i>
                    </span>
                `;
          item.addEventListener("click", () => {
            loadPracticeQuestion(question);
            showScreen("practice-mode");
          });
          notAnsweredQuestionsListElement.appendChild(item);
        });
  
        if (!hasNotAnsweredQuestions) {
          notAnsweredQuestionsListElement.innerHTML =
            '<p class="empty-list-message">Alle Fragen wurden bereits beantwortet.</p>';
          practiceNotAnsweredButton.disabled = true;
        } else {
          practiceNotAnsweredButton.disabled = false;
        }
  
        upgradeComponents();
      }
  
      function loadPracticeQuestion(specificQuestion = null) {
        // Nur zur History hinzufügen, wenn es eine vorherige Frage gab *und* wir nicht gezielt eine laden
        if (currentPracticeQuestion && !specificQuestion) {
          // Vermeide Duplikate direkt nacheinander
          if (
            practiceHistory.length === 0 ||
            practiceHistory[practiceHistory.length - 1]?.id !==
              currentPracticeQuestion.id
          ) {
            practiceHistory.push(currentPracticeQuestion);
            // Begrenze die History-Länge optional
            if (practiceHistory.length > 20) practiceHistory.shift();
          }
        }
  
        if (specificQuestion) {
          currentPracticeQuestion = specificQuestion;
        } else {
          // Wähle eine zufällige Frage, idealerweise eine, die noch nicht beantwortet wurde
          const notAnswered = getNotAnsweredQuestions();
          if (notAnswered.length > 0) {
            currentPracticeQuestion = getRandomQuestion(notAnswered);
          } else {
            // Wenn alle beantwortet, nimm irgendeine
            currentPracticeQuestion = getRandomQuestion();
          }
        }
  
        if (!currentPracticeQuestion) {
          console.error("Keine Frage zum Laden gefunden.");
          practiceQuestionContainer.innerHTML =
            '<div class="question">Keine Fragen mehr verfügbar.</div>';
          return;
        }
  
        practiceQuestionContainer.innerHTML = generateQuestionHTML(
          currentPracticeQuestion,
          "practice"
        );
        upgradeComponents(); // Wichtig nach dynamischem HTML
      }
  
      function loadPreviousPracticeQuestion() {
        if (practiceHistory.length > 0) {
          currentPracticeQuestion = practiceHistory.pop(); // Nimm die letzte aus der History
          practiceQuestionContainer.innerHTML = generateQuestionHTML(
            currentPracticeQuestion,
            "practice"
          );
          upgradeComponents();
        } else {
          showSnackbar("Keine vorherige Frage verfügbar!");
        }
      }
  
      function showSnackbar(message) {
        // Finde die Snackbar-Komponente im DOM mit der korrekten ID
        let snackbarContainer = document.querySelector("#snackbar-container");
        
        // Prüfe, ob die Snackbar-Komponente existiert
        if (!snackbarContainer) {
          // Erstelle die Snackbar, wenn sie nicht existiert
          snackbarContainer = document.createElement('div');
          snackbarContainer.id = 'snackbar-container';
          snackbarContainer.className = 'mdl-js-snackbar mdl-snackbar';
          snackbarContainer.innerHTML = `
            <div class="mdl-snackbar__text"></div>
            <button class="mdl-snackbar__action" type="button"></button>
          `;
          document.body.appendChild(snackbarContainer);
          
          // Aktualisiere die MDL-Komponenten, um die neue Snackbar zu initialisieren
          upgradeComponents();
        }
        
        // Prüfe, ob die MaterialSnackbar initialisiert ist
        if (snackbarContainer.MaterialSnackbar) {
          const data = {
            message: message,
            timeout: 2500 // Etwas längere Anzeigezeit
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        } else {
          // Fallback, falls die Snackbar nicht korrekt initialisiert ist
          console.warn("Snackbar nicht initialisiert. Fallback zu alert().");
          alert(message);
        }
      }
  
      function startExam() {
        examQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, 50); // Wähle 50 zufällige Fragen
        examAnswers = Array(examQuestions.length).fill(null); // Initialisiere Antworten für die ausgewählten Fragen
        currentExamQuestion = 0;
        loadExamQuestion();
  
        timeLeft = 60 * 60; // 60 Minuten
        updateTimer();
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
      }
  
      function loadExamQuestion() {
        // Stelle sicher, dass currentExamQuestion im gültigen Bereich liegt
        if (
          currentExamQuestion < 0 ||
          currentExamQuestion >= examQuestions.length
        ) {
          console.error(
            "Ungültiger Fragenindex:",
            currentExamQuestion,
            "von",
            examQuestions.length
          );
          return;
        }
  
        // Aktualisiere Fragennummer-Anzeige
        if (questionNumberElement) {
          questionNumberElement.textContent = `Frage ${
            currentExamQuestion + 1
          }/${examQuestions.length}`;
        }
  
        // Lade die aktuelle Frage
        examQuestionContainer.innerHTML = generateQuestionHTML(
          examQuestions[currentExamQuestion],
          "exam"
        );
  
        // Stelle gespeicherte Antworten wieder her, falls vorhanden
        restoreExamAnswers();
  
        // Aktualisiere UI-Zustand (z.B. Buttons aktivieren/deaktivieren)
        updateExamNavigation();
  
        upgradeComponents(); // Wichtig nach dynamischem HTML
      }
  
      function updateExamNavigation() {
        const prevButton = document.getElementById("prev-question-exam");
        const nextButton = document.getElementById("next-question-exam");
        const submitButton = document.getElementById("submit-exam");
  
        if (prevButton) {
          prevButton.disabled = currentExamQuestion === 0;
        }
  
        if (nextButton) {
          nextButton.disabled =
            currentExamQuestion === examQuestions.length - 1;
        }
  
        if (submitButton) {
          submitButton.disabled =
            currentExamQuestion < examQuestions.length - 1;
        }
      }
  
      function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeLeftElement.textContent = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showSnackbar(
            "Die Zeit ist abgelaufen! Die Prüfung wird jetzt ausgewertet."
          );
          submitExam();
        } else {
          timeLeft--;
        }
      }
  
      function saveExamAnswers() {
        // Stelle sicher, dass examQuestions und examAnswers synchron sind
        if (currentExamQuestion >= examQuestions.length) return; // Sicherheitscheck
  
        const currentQuestionAnswers = document.querySelectorAll(
          "#exam-question-container .answer input"
        );
        // Stelle sicher, dass die Anzahl der Inputs mit der Anzahl der Antworten übereinstimmt
        const expectedAnswerCount =
          examQuestions[currentExamQuestion]?.answers?.length;
        if (currentQuestionAnswers.length !== expectedAnswerCount) {
          console.warn(
            `Anzahl der Inputs (${currentQuestionAnswers.length}) stimmt nicht mit erwarteter Anzahl (${expectedAnswerCount}) für Frage ${currentExamQuestion} überein.`
          );
          // Eventuell Fallback oder Fehlerbehandlung
          examAnswers[currentExamQuestion] = Array(expectedAnswerCount).fill(false); // Fallback
        } else {
          examAnswers[currentExamQuestion] = Array.from(currentQuestionAnswers).map(
            (input) => input.checked
          );
        }
      }
  
      function restoreExamAnswers() {
        // Stelle sicher, dass examQuestions und examAnswers synchron sind
        if (
          currentExamQuestion >= examQuestions.length ||
          !examAnswers[currentExamQuestion]
        ) {
          // Keine gespeicherten Antworten oder Index ungültig, alle Checkboxen löschen
          const answerInputs = document.querySelectorAll(
            "#exam-question-container .answer input"
          );
          answerInputs.forEach((input) => {
            input.checked = false;
            // MDL Checkboxen benötigen eventuell ein Update ihres Zustands
            if (input.parentElement && input.parentElement.MaterialCheckbox) {
              input.parentElement.MaterialCheckbox.updateClasses_();
            }
          });
          return;
        }
  
        const answerInputs = document.querySelectorAll(
          "#exam-question-container .answer input"
        );
  
        // Stelle sicher, dass die Anzahl übereinstimmt
        if (answerInputs.length === examAnswers[currentExamQuestion].length) {
          answerInputs.forEach((input, index) => {
            input.checked = examAnswers[currentExamQuestion][index];
            // Wichtig für MDL: Checkbox-Status aktualisieren
            if (input.parentElement && input.parentElement.MaterialCheckbox) {
              input.parentElement.MaterialCheckbox.updateClasses_();
            }
          });
        } else {
          console.warn(
            "Anzahl der Antwort-Inputs stimmt nicht mit gespeicherten Antworten überein für Frage",
            currentExamQuestion
          );
          // Fallback: Alle löschen
          answerInputs.forEach((input) => {
            input.checked = false;
            if (input.parentElement && input.parentElement.MaterialCheckbox) {
              input.parentElement.MaterialCheckbox.updateClasses_();
            }
          });
        }
      }
  
      function submitExam() {
        clearInterval(timerInterval);
        saveExamAnswers(); // Speichere die Antworten der letzten angezeigten Frage
  
        let correctAnswers = 0;
        let examResults = [];
  
        examQuestions.forEach((question, questionIndex) => {
          let questionCorrect = true;
          const userAnswers = examAnswers[questionIndex]; // Die vom Benutzer gegebenen Antworten für diese Frage
  
          // Wenn keine Antworten für diese Frage gespeichert wurden (z.B. übersprungen)
          if (!userAnswers) {
            questionCorrect = false; // Frage gilt als falsch, wenn nicht beantwortet
            // Überprüfe, ob die Frage korrekte Antworten hatte
            if (question.answers.some((a) => a.correct)) {
              // Ja, es gab korrekte Antworten, die nicht ausgewählt wurden
            } else {
              // Sonderfall: Frage hatte keine korrekten Antworten (sollte nicht vorkommen)
              questionCorrect = true; // Dann ist "nichts ankreuzen" richtig
            }
          } else {
            // Vergleiche jede mögliche Antwort
            question.answers.forEach((answer, answerIndex) => {
              const isChecked = userAnswers[answerIndex]; // Hat der Benutzer diese Antwort ausgewählt?
              const isCorrect = answer.correct; // Ist diese Antwort korrekt?
  
              // Wenn eine falsche Antwort ausgewählt wurde ODER eine richtige nicht ausgewählt wurde
              if ((isChecked && !isCorrect) || (!isChecked && isCorrect)) {
                questionCorrect = false;
              }
            });
          }
  
          if (questionCorrect) {
            correctAnswers++;
          }
  
          examResults.push({
            question,
            answers: userAnswers || Array(question.answers.length).fill(false), // Gespeicherte oder leere Antworten
            correct: questionCorrect
          });
        });
  
        const percentage = Math.round(
          (correctAnswers / examQuestions.length) * 100
        ); // Verwende die tatsächliche Anzahl der Prüfungsfragen
  
        // Aktualisiere Ergebnis-Anzeige
        if (scoreElement && percentageElement && passFailElement) {
          scoreElement.textContent = correctAnswers;
          percentageElement.textContent = percentage;
  
          if (percentage >= 70) {
            passFailElement.textContent = "Bestanden!";
            passFailElement.className = "pass-fail pass"; // Klassen hinzufügen/entfernen
          } else {
            passFailElement.textContent = "Nicht bestanden";
            passFailElement.className = "pass-fail fail"; // Klassen hinzufügen/entfernen
          }
        } else {
          console.error("Ergebnis-Anzeige Elemente nicht gefunden!");
        }
  
        // Detaillierte Ergebnisübersicht generieren
        const examReviewContainer = document.getElementById(
          "exam-questions-review"
        );
        if (examReviewContainer) {
          examReviewContainer.innerHTML = ""; // Container leeren
  
          examResults.forEach((result, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = `exam-review-question ${
              result.correct ? "correct" : "incorrect"
            }`;
  
            const questionHeader = document.createElement("div");
            questionHeader.className = "exam-question-header";
            questionHeader.innerHTML = `
                       <span class="exam-question-number">Frage ${index + 1}</span>
                       <span class="exam-question-result ${
                         result.correct ? "correct" : "incorrect"
                       }">
                           ${result.correct ? "Richtig" : "Falsch"}
                       </span>
                   `;
  
            const questionText = document.createElement("div");
            questionText.className = "exam-question-text";
            questionText.textContent = `[${result.question.id || "N/A"}] ${
              result.question.question
            }`; // ID hinzufügen
  
            const answersDiv = document.createElement("div");
            answersDiv.className = "exam-answers";
  
            result.question.answers.forEach((answer, answerIndex) => {
              const answerDiv = document.createElement("div");
              const isChecked = result.answers[answerIndex]; // Benutzerantwort
  
              // Klassen für visuelles Feedback
              let answerClass = "exam-answer";
              if (answer.correct && isChecked) {
                answerClass += " correct"; // Richtig ausgewählt
              } else if (!answer.correct && isChecked) {
                answerClass += " incorrect"; // Falsch ausgewählt
              } else if (answer.correct && !isChecked) {
                answerClass += " missed"; // Richtige verpasst
              }
              answerDiv.className = answerClass;
  
              // Icons hinzufügen für Klarheit
              let icons = "";
              if (isChecked) {
                icons +=
                  ' <i class="material-icons tiny user-checked">check_box</i>'; // Benutzer hat gewählt
              } else {
                icons +=
                  ' <i class="material-icons tiny user-unchecked">check_box_outline_blank</i>'; // Benutzer hat nicht gewählt
              }
              if (answer.correct) {
                icons +=
                  ' <i class="material-icons tiny correct-answer-indicator">check_circle</i>'; // Dies ist eine korrekte Antwort
              }
  
              answerDiv.innerHTML = `
                        <span class="exam-answer-text">${answer.text}</span>
                        <span class="exam-answer-feedback">${icons}</span>
                    `;
  
              answersDiv.appendChild(answerDiv);
            });
  
            questionDiv.appendChild(questionHeader);
            questionDiv.appendChild(questionText);
            questionDiv.appendChild(answersDiv);
            examReviewContainer.appendChild(questionDiv);
          });
        } else {
          console.error(
            "Container für Ergebnisübersicht (exam-questions-review) nicht gefunden!"
          );
        }
  
        showScreen("results");
        upgradeComponents(); // Aktualisiere MDL-Komponenten in der neuen Ansicht
      }
  
      function createCatalog(filteredQuestions = questions) {
        catalogContainer.innerHTML = ""; // Leere den Container
  
        const searchTerm = catalogSearchInput.value.toLowerCase();
        const questionsToDisplay = searchTerm
          ? questions.filter(
              (q) =>
                (q.id && q.id.toLowerCase().includes(searchTerm)) ||
                q.question.toLowerCase().includes(searchTerm) ||
                (q.category && q.category.toLowerCase().includes(searchTerm))
            )
          : questions; // Zeige alle, wenn kein Suchbegriff
  
        const categoriesMap = {};
        questionsToDisplay.forEach((question) => {
          const category = question.category || "Allgemein";
          if (!categoriesMap[category]) {
            categoriesMap[category] = [];
          }
          categoriesMap[category].push(question);
        });
  
        // Sortiere Kategorien alphabetisch
        Object.keys(categoriesMap)
          .sort((a, b) => a.localeCompare(b)) // Alphabetische Sortierung der Kategorienamen
          .forEach((category) => {
            // Kategorie-Überschrift erstellen
            const categoryHeader = document.createElement("h3"); // Verwende h3 für bessere Struktur
            categoryHeader.className = "catalog-category-header";
            categoryHeader.textContent = category;
            catalogContainer.appendChild(categoryHeader);
  
            // Fragen innerhalb der Kategorie auflisten (optional sortieren, z.B. nach ID)
            categoriesMap[category]
              .sort((a, b) => (a.id || "").localeCompare(b.id || "")) // Sortiere Fragen nach ID
              .forEach((question) => {
                const catalogItem = document.createElement("div");
                const stat = statistics.answeredQuestions[question.id];
  
                catalogItem.className =
                  "catalog-item mdl-button mdl-js-button mdl-js-ripple-effect"; // Style als Button
                let statusClass = "not-answered";
                if (stat) {
                  statusClass = stat.correct
                    ? "answered-correct"
                    : "answered-incorrect";
                }
                catalogItem.classList.add(statusClass); // Füge Statusklasse hinzu
  
                catalogItem.innerHTML = `
                        <span class="catalog-item-id">${question.id || "N/A"}</span>
                        <span class="catalog-item-text">${question.question.substring(
                          0,
                          50
                        )}...</span> <span class="catalog-item-status ${statusClass}-icon"></span> `;
                catalogItem.title = question.question; // Voller Text im Tooltip
  
                catalogItem.addEventListener("click", () => {
                  loadPracticeQuestion(question); // Lade diese Frage im Übungsmodus
                  showScreen("practice-mode");
                });
  
                catalogContainer.appendChild(catalogItem);
              });
          });
  
        // Meldung, wenn keine Fragen gefunden wurden
        if (questionsToDisplay.length === 0 && searchTerm) {
          catalogContainer.innerHTML = `<p>Keine Fragen für "${searchTerm}" gefunden.</p>`;
        }
  
        upgradeComponents(); // Wichtig für MDL-Buttons etc.
      }
  
      function createOverview(filteredQuestions = questions) {
        overviewContainer.innerHTML = ""; // Leere den Container
  
        const searchTerm = overviewSearchInput.value.toLowerCase();
        const questionsToDisplay = searchTerm
          ? questions.filter(
              (q) =>
                (q.id && q.id.toLowerCase().includes(searchTerm)) ||
                q.question.toLowerCase().includes(searchTerm) ||
                (q.category && q.category.toLowerCase().includes(searchTerm))
            )
          : questions; // Alle Fragen, wenn kein Suchbegriff
  
        // Sortiere die Fragen (z.B. nach ID) für eine konsistente Ansicht
        questionsToDisplay.sort((a, b) => (a.id || "").localeCompare(b.id || ""));
  
        questionsToDisplay.forEach((question) => {
          const overviewItem = document.createElement("div");
          overviewItem.className = "overview-item mdl-card mdl-shadow--2dp"; // Style als Card
  
          // Card Title
          const title = document.createElement("div");
          title.className = "mdl-card__title";
          title.innerHTML = `<h2 class="mdl-card__title-text">${
            question.id ? "[" + question.id + "] " : ""
          }${question.question}</h2>`;
          overviewItem.appendChild(title);
  
          // Card Supporting Text (für Antworten)
          const content = document.createElement("div");
          content.className = "mdl-card__supporting-text";
  
          question.answers.forEach((answer) => {
            const answerElement = document.createElement("p"); // Verwende <p> für Antworten
            answerElement.className = answer.correct
              ? "overview-answer correct"
              : "overview-answer incorrect"; // Behalte Klassen für Styling bei
            // Füge Icon für Korrektheit hinzu
            answerElement.innerHTML = `<i class="material-icons tiny">${
              answer.correct ? "check" : "close"
            }</i> ${answer.text}`;
            content.appendChild(answerElement);
          });
          overviewItem.appendChild(content);
  
          // Optional: Card Actions (z.B. zum Üben dieser Frage)
          const actions = document.createElement("div");
          actions.className = "mdl-card__actions mdl-card--border";
          const practiceButton = document.createElement("button");
          practiceButton.className =
            "mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect";
          practiceButton.textContent = "Diese Frage üben";
          practiceButton.addEventListener("click", () => {
            loadPracticeQuestion(question);
            showScreen("practice-mode");
          });
          actions.appendChild(practiceButton);
          overviewItem.appendChild(actions);
  
          overviewContainer.appendChild(overviewItem);
        });
  
        // Meldung, wenn keine Fragen gefunden wurden
        if (questionsToDisplay.length === 0 && searchTerm) {
          overviewContainer.innerHTML = `<p>Keine Fragen für "${searchTerm}" gefunden.</p>`;
        }
  
        upgradeComponents(); // Wichtig für MDL Cards, Buttons etc.
      }
  
      function getIncorrectQuestions() {
        return questions.filter((q) => {
          const stat = statistics.answeredQuestions[q.id];
          return stat && !stat.correct; // Nur die, die beantwortet UND falsch sind
        });
      }
  
      function getNotAnsweredQuestions() {
        return questions.filter((q) => !statistics.answeredQuestions[q.id]); // Nur die, die noch keinen Eintrag haben
      }
  
      // Event-Listener definieren
      function setupEventListeners() {
        debug("Event-Listener werden eingerichtet...");
        
        // --- Navigation Hauptmenü & Drawer ---
        const navMapping = {
          home: () => showScreen("startscreen"),
          practice: () => {
            loadPracticeQuestion();
            showScreen("practice-mode");
          },
          exam: () => {
            startExam();
            showScreen("exam-mode");
          },
          catalog: () => {
            createCatalog();
            showScreen("catalog");
          },
          overview: () => {
            createOverview();
            showScreen("overview");
          },
          stats: () => showScreen("statistics")
        };
  
        // Desktop Nav & Drawer Nav Buttons
        ["main-menu", "drawer"].forEach((prefix) => {
          Object.keys(navMapping).forEach((key) => {
            const element = document.getElementById(`${prefix}-${key}`);
            if (element) {
              debug(`Event-Listener für ${prefix}-${key} wird hinzugefügt`);
              element.addEventListener("click", (e) => {
                e.preventDefault(); // Verhindert Standardverhalten falls Links
                debug(`Klick auf ${prefix}-${key} erkannt`);
                navMapping[key]();
                // Schließe den Drawer nach Klick (wenn vorhanden)
                const layout = document.querySelector(".mdl-layout");
                if (
                  layout &&
                  layout.MaterialLayout &&
                  layout.MaterialLayout.drawer_
                ) {
                  layout.MaterialLayout.toggleDrawer();
                }
              });
            } else {
              debug(`Element ${prefix}-${key} nicht gefunden!`);
            }
          });
        });
  
        // --- Startbildschirm Buttons ---
        const startActions = {
          "practice-btn": navMapping["practice"],
          "exam-btn": navMapping["exam"],
          "catalog-btn": navMapping["catalog"],
          "overview-btn": navMapping["overview"],
          "stats-btn": navMapping["stats"]
        };
        Object.keys(startActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              startActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
  
        // --- Übungsmodus Buttons ---
        const practiceActions = {
          "home-practice": navMapping["home"],
          "catalog-practice": navMapping["catalog"],
          "prev-question-practice": loadPreviousPracticeQuestion,
          "check-answer-practice": () => checkAnswer("practice"),
          "next-question-practice": () => {
            loadPracticeQuestion(); // Lade neue Frage
          }
        };
        Object.keys(practiceActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              practiceActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
  
        // --- Prüfungsmodus Buttons ---
        const examActions = {
          "home-exam": () => {
            if (
              confirm(
                "Möchten Sie die Prüfung wirklich abbrechen? Alle Fortschritte gehen verloren."
              )
            ) {
              clearInterval(timerInterval);
              navMapping["home"]();
            }
          },
          "catalog-exam": () => {
            saveExamAnswers(); // Speichere aktuelle Antworten
            createCatalog();
            showScreen("catalog");
          },
          "prev-question-exam": () => {
            saveExamAnswers(); // Speichere aktuelle Antworten
            currentExamQuestion = Math.max(0, currentExamQuestion - 1);
            loadExamQuestion();
          },
          "next-question-exam": () => {
            saveExamAnswers(); // Speichere aktuelle Antworten
            currentExamQuestion = Math.min(
              examQuestions.length - 1,
              currentExamQuestion + 1
            );
            loadExamQuestion();
          },
          "submit-exam": () => {
            if (confirm("Möchten Sie die Prüfung wirklich abgeben?")) {
              submitExam();
            }
          }
        };
        Object.keys(examActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              examActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
  
        // --- Katalog Buttons ---
        const catalogActions = {
          "home-catalog": navMapping["home"]
          // Der Rest wird dynamisch erstellt
        };
        Object.keys(catalogActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              catalogActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
        // Suche im Katalog
        if (catalogSearchInput) {
          debug("Event-Listener für catalog-search wird hinzugefügt");
          catalogSearchInput.addEventListener("input", () => createCatalog());
        } else {
          debug("Element catalog-search nicht gefunden!");
        }
  
        // --- Übersicht Buttons ---
        const overviewActions = {
          "home-overview": navMapping["home"],
          "catalog-overview": navMapping["catalog"]
          // Der Rest wird dynamisch erstellt
        };
        Object.keys(overviewActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              overviewActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
        // Suche in Übersicht
        if (overviewSearchInput) {
          debug("Event-Listener für overview-search wird hinzugefügt");
          overviewSearchInput.addEventListener("input", () => createOverview());
        } else {
          debug("Element overview-search nicht gefunden!");
        }
  
        // --- Ergebnis Buttons ---
        const resultsActions = {
          "home-results": navMapping["home"],
          "retry-exam": navMapping["exam"], // Starte neue Prüfung
          "review-answers": () => {
            const reviewContainer = document.getElementById(
              "exam-review-container"
            );
            if (reviewContainer) {
              reviewContainer.scrollIntoView({ behavior: "smooth" });
            }
          }
        };
        Object.keys(resultsActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              resultsActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
  
        // --- Statistik Buttons ---
        const statsActions = {
          "home-stats": navMapping["home"],
          "reset-stats": () => {
            if (
              confirm("Möchten Sie wirklich alle Lernstatistiken zurücksetzen?")
            ) {
              resetStatistics();
              showSnackbar("Statistiken zurückgesetzt.");
            }
          },
          "practice-incorrect": () => {
            const incorrectQuestions = getIncorrectQuestions();
            if (incorrectQuestions.length > 0) {
              loadPracticeQuestion(getRandomQuestion(incorrectQuestions));
              showScreen("practice-mode");
            } else {
              showSnackbar("Keine falsch beantworteten Fragen vorhanden!");
            }
          },
          "practice-not-answered": () => {
            const notAnsweredQuestions = getNotAnsweredQuestions();
            if (notAnsweredQuestions.length > 0) {
              loadPracticeQuestion(getRandomQuestion(notAnsweredQuestions));
              showScreen("practice-mode");
            } else {
              showSnackbar("Alle Fragen wurden bereits beantwortet!");
            }
          }
          // Der Rest (Listen-Items) wird dynamisch hinzugefügt
        };
        Object.keys(statsActions).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            debug(`Event-Listener für ${id} wird hinzugefügt`);
            element.addEventListener("click", (e) => {
              debug(`Klick auf ${id} erkannt`);
              statsActions[id]();
            });
          } else {
            debug(`Element ${id} nicht gefunden!`);
          }
        });
        
        debug("Event-Listener-Setup abgeschlossen");
      } // Ende setupEventListeners
  
      // Initialisieren
      debug("Initialisierung beginnt...");
      
      // Füge eine Snackbar zum DOM hinzu, falls sie nicht existiert
      if (!document.getElementById('snackbar-container')) {
        debug("Snackbar wird erstellt...");
        const snackbarContainer = document.createElement('div');
        snackbarContainer.id = 'snackbar-container';
        snackbarContainer.className = 'mdl-js-snackbar mdl-snackbar';
        snackbarContainer.innerHTML = `
          <div class="mdl-snackbar__text"></div>
          <button class="mdl-snackbar__action" type="button"></button>
        `;
        document.body.appendChild(snackbarContainer);
      }
      
      // Lade Statistiken zuerst
      statistics = loadStatistics();
      
      // Warte länger, damit MDL-Komponenten vollständig initialisiert werden können
      debug("Warte auf vollständige MDL-Initialisierung...");
      setTimeout(() => {
        debug("MDL-Komponenten werden aktualisiert...");
        upgradeComponents(); // Initialisiere alle MDL-Komponenten zuerst
        
        debug("Statistik wird angezeigt...");
        updateStatisticsDisplay(); // Zeige geladene Statistiken an
        
        debug("Startbildschirm wird angezeigt...");
        showScreen("startscreen"); // Zeige den Startbildschirm standardmäßig
        
        // Warte noch etwas länger, bevor Event-Listener hinzugefügt werden
        setTimeout(() => {
          debug("Event-Listener werden eingerichtet...");
          setupEventListeners();
          debug("Initialisierung abgeschlossen.");
          
          // Versuche, die Buttons manuell zu aktivieren
          document.querySelectorAll('.mdl-button').forEach(button => {
            debug(`Button aktiviert: ${button.id || 'ohne ID'}`);
            if (button.MaterialButton) {
              button.MaterialButton.boundRippleMouseUp_();
            }
          });
          
          // Zeige eine Bestätigungsnachricht
          showSnackbar("Quiz erfolgreich initialisiert!");
        }, 500);
      }, 1000);
  });