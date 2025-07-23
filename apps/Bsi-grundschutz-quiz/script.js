document.addEventListener('DOMContentLoaded', function() {

// Quiz-Daten

  const quizData = {
    "meta": {
      "title": "Übungsfragen für den BSI-Grundschutz Praktiker",
      "contributors": []
    },
    "quiz": {
      "Einstieg": {
        "7": {
          "question": "Welche Informationen beinhaltet die IT-Grundschutz-Methodik (BSI-Standard 200-2)?",
          "answers": {
            "A": "besonders schutzwürdigen Komponenten",
            "B": "methodische Hilfestellungen zur schrittweisen Einführung eines ISMS",
            "C": "wie die Informationssicherheit im laufenden Betrieb aufrechterhalten und kontinuierlich verbessert werden kann",
            "D": "effiziente Verfahren, um die allgemeinen Anforderungen des BSI-Standards 200-1 zu konkretisieren"
          },
          "right": ["B", "C", "D"]
        },
        "8": {
          "question": "Welche Schichten gehören zu den Prozess-Bausteinen im IT-Grundschutz-Kompendium?",
          "answers": {
            "A": "ISMS",
            "B": "APP",
            "C": "OPS",
            "D": "DER"
          },
          "right": ["A", "C", "D"]
        },
        "9": {
          "question": "Welche Schichten gehören zu den Sytem-Bausteinen im IT-Grundschutz-Kompendium?",
          "answers": {
            "A": "IND",
            "B": "APP",
            "C": "NET",
            "D": "INF"
          },
          "right": ["A", "B", "C", "D"]
        },
        "10": {
          "question": "Was gehört zu den Aufgaben des IT Grundschutz nach BSI?",
          "answers": {
            "A": "systematisch nach Schwachstellen suchen",
            "B": "die Angemessenheit umgesetzter Schutzmaßnahmen prüfen",
            "C": "Sicherheitskonzepte entwickeln und fortzuschreiben die allgemein anerkannten Standards genügen",
            "D": "Das Management von der Haftung auszunehmen"
          },
          "right": ["A", "B", "C"]
        },
        "11": {
          "question": "Welche Aussagen über den BSI-Standard 200-3 sind korrekt?",
          "answers": {
            "A": "Er beschreibt die Risikoanalyse-Methodik",
            "B": "Er enthält Hinweise zur Risikobehandlung",
            "C": "Er ist nur für Hochsicherheitsbereiche anzuwenden",
            "D": "Er ersetzt die Schutzbedarfsfeststellung"
          },
          "right": ["A", "B"]
        },
        "12": {
          "question": "Welche der folgenden Aussagen zum IT-Grundschutz sind richtig?",
          "answers": {
            "A": "IT-Grundschutz bietet eine Methodik zur Erstellung eines Sicherheitskonzepts",
            "B": "IT-Grundschutz richtet sich nur an Behörden",
            "C": "IT-Grundschutz besteht aus Standards und einem IT-Grundschutz-Kompendium",
            "D": "IT-Grundschutz kann nur verwendet werden, wenn eine Zertifizierung angestrebt wird"
          },
          "right": ["A", "C"]
        }
      },
      "Sicherheitsmanagement": {
        "7": {
          "question": "Welche Aussagen zur Norm ISO/IEC 27002 sind richtig?",
          "answers": {
            "A": "Sie gibt Rahmenempfehlungen zum Risikomanagement für Informationssicherheit",
            "B": "spezifiziert Anforderungen an die Akkreditierung von Zertifizierungsstellen für ISMS",
            "C": "Beschreibung von Sicherheitsmaßnahmen",
            "D": "Die Umsetzung der Sicherheitsempfehlungen ist eine von vielen Möglichkeiten, die Anforderungen der ISO-Norm 27001 zu erfüllen"
          },
          "right": ["C", "D"]
        },
        "8": {
          "question": "Welche Aussagen zur Norm ISO/IEC 31010 sind richtig?",
          "answers": {
            "A": "Sie beschreibt wie die Risikobeurteilung in ein Risikomanagementsystem integriert werden kann",
            "B": "spezifiziert Anforderungen an die Akkreditierung von Zertifizierungsstellen für ISMS",
            "C": "Enthält die Spezifika der ISMS-Zertifizierungsprozesse",
            "D": "Gibt Rahmenempfehlungen zum Risikomanagement für Informationssicherheit"
          },
          "right": ["A", "C"]
        },
        "9": {
          "question": "Welche Art von Schutz hat Informationssicherheit zum Ziel?",
          "answers": {
            "A": "Informationen jeglicher Art und Herkunft zu schützen",
            "B": "Den Schutz elektronisch gespeicherter Informationen und deren Verarbeitung",
            "C": "Den Schutz von Informationen in den Köpfen der Mitarbeiter",
            "D": "Den Schutz von Informationen auf Papier"
          },
          "right": ["A", "B", "C", "D"]
        },
        "10": {
          "question": "Was sind neben Vertraulichkeit, Integrität und Verfügbarkeit weitere generische Oberbegriffe der Informationssicherheit?",
          "answers": {
            "A": "Authentizität",
            "B": "Verbindlichkeit",
            "C": "Kontinuum",
            "D": "Resilienz"
          },
          "right": ["A", "B", "D"]
        },
        "11": {
          "question": "Was zeichnet einen Informationsverbund im Sinne des BSI-Grundschutz aus?",
          "answers": {
            "A": "eine Mindestgröße von 20 Elementen",
            "B": "ein festgelegter Geltungsbereich",
            "C": "eine sinnvolle Mindestgröße",
            "D": "Teilbereiche sollten gut abgrenzbar sein"
          },
          "right": ["B", "C", "D"]
        },
        "12": {
          "question": "Welche Informationen und Detailangaben müssen bei der Erstaufnahme des Informationsverbundes unter anderem erfasst werden?",
          "answers": {
            "A": "Geschäftsprozesse im Informationsverbund (Name, Beschreibung, fachverantwortliche Stelle)",
            "B": "IT-Systeme und ICS-Komponenten (Name, Systemplattform und eventuell Aufstellungsort)",
            "C": "Verantwortliche Stellen und Behörden (Name, Ansprechpartner, Telefonnummern)",
            "D": "virtuelle Systeme (entsprechend gekennzeichnet und benannt)"
          },
          "right": ["A", "B", "D"]
        },
        "13": {
          "question": "Was sind Zielobjekte des Sicherheitskonzepts?",
          "answers": {
            "A": "Alle IT-Systeme einer Institution",
            "B": "Alle in der Erstaufnahme ermittelten Komponenten",
            "C": "Ausschließlich die Mitarbeiter auf Ebene der Geschäftsführung",
            "D": "Die angemieteten Gebäude einer Institution"
          },
          "right": ["B"]
        },
        "14": {
          "question": "Was sind geeignete technische und organisatorische Maßnahmen in einem Sicherheitskonzept?",
          "answers": {
            "A": "Maßnahmen zur physischen Absicherung von Gebäuden und Räumlichkeiten",
            "B": "ausreichende Datensicherungsverfahren",
            "C": "Verfahren zur Messung der Mitarbeiterzufriedenheit",
            "D": "Sicherstellen der pünktlichen Zahlung von Abgaben und Gehältern"
          },
          "right": ["A", "B"]
        },
        "15": {
          "question": "Was sind geeignete Auswahlkriterien für Sicherheitsmaßnahmen?",
          "answers": {
            "A": "Empfehlung der Geschäftsführung",
            "B": "Auswirkungen auf das Sicherheitsniveau",
            "C": "Kosten-Nutzen-Aspekte",
            "D": "Praxistauglichkeit"
          },
          "right": ["B", "C", "D"]
        },
        "16": {
          "question": "Welche Elemente gehören zu einer angemessenen Informationssicherheitsorganisation?",
          "answers": {
            "A": "Leitungsebene, die die Gesamtverantwortung trägt",
            "B": "Informationssicherheitsbeauftragter (ISB), der die Leitungsebene berät und unterstützt",
            "C": "Ein IT-Sicherheitsmanagementteam (IS-Management-Team), das den ISB unterstützt",
            "D": "Ein externes Auditteam, das jährlich die Informationssicherheit prüft"
          },
          "right": ["A", "B", "C"]
        },
        "17": {
          "question": "Was soll eine Informationssicherheitsleitlinie mindestens enthalten?",
          "answers": {
            "A": "Sicherheitsziele und Sicherheitsstrategie der Institution",
            "B": "Verpflichtung der Leitungsebene zum Sicherheitsprozess",
            "C": "Beschreibung der Organisationsstruktur für Informationssicherheit",
            "D": "Detaillierte technische Sicherheitskonfigurationen aller IT-Systeme"
          },
          "right": ["A", "B", "C"]
        }
      },
      "Strukturanalyse": {
        "7": {
          "question": "Was gehört zu den Aufgaben der Strukturanalyse?",
          "answers": {
            "A": "Erfassung aller für den Informationsverbund relevanten Objekte",
            "B": "Definition von Teilnetzen und Kommunikationsverbindungen",
            "C": "Absicherung der Datenbestände durch Backup-Systeme",
            "D": "Identifikation aller relevanten Zielobjekte"
          },
          "right": ["A", "B", "D"]
        },
        "8": {
          "question": "Welche Aspekte sollten bei der Definition von Teilnetzen berücksichtigt werden?",
          "answers": {
            "A": "Sicherheitsdomänen mit unterschiedlichem Schutzbedarf",
            "B": "Unterschiedliche Zuständigkeiten",
            "C": "Geographische Gegebenheiten",
            "D": "Alter der verwendeten Hardware"
          },
          "right": ["A", "B", "C"]
        },
        "9": {
          "question": "Welche Arten von Netzen sollten bei der Strukturanalyse typischerweise unterschieden werden?",
          "answers": {
            "A": "Interne Netze",
            "B": "Externe Netze",
            "C": "Demilitarisierte Zonen (DMZ)",
            "D": "Broadcast-Netze"
          },
          "right": ["A", "B", "C"]
        },
        "10": {
          "question": "Was sind typische Netzübergänge, die bei der Strukturanalyse berücksichtigt werden sollten?",
          "answers": {
            "A": "Router",
            "B": "Firewalls",
            "C": "Switches",
            "D": "VPN-Zugänge"
          },
          "right": ["A", "B", "D"]
        },
        "11": {
          "question": "Welche Arten von Dokumenten sollten bei der Strukturanalyse erstellt werden?",
          "answers": {
            "A": "Netzplan mit logischen Zonen und zugehörigen IT-Systemen",
            "B": "Detaillierte Konfigurations-Backups aller Systeme",
            "C": "Übersicht über die Gebäude- und Raumstruktur",
            "D": "Ausführliche Personalentwicklungspläne"
          },
          "right": ["A", "C"]
        }
      },
      "Schutzbedarfsfeststellung": {
        "7": {
          "question": "Wovon hängt der Schutzbedarf eines Objekts besonders ab?",
          "answers": {
            "A": "vom Schutzbedarf derjenigen Geschäftsprozesse, für deren Bearbeitung es benötigt wird",
            "B": "vom Schutzbedarf derjenigen Informationen, für deren Bearbeitung es benötigt wird",
            "C": "vom Schutzbedarf derjenigen Anwendungen, für deren Bearbeitung es benötigt wird",
            "D": "vom Schutzbedarf derjenigen Räume, für deren Bearbeitung es benötigt wird"
          },
          "right": ["A", "B"]
        },
        "8": {
          "question": "Was bedeutet das Maximumprinzip im Zusammenhang mit der Schutzbedarffeststelltung?",
          "answers": {
            "A": "Das ein maximaler Schutz für einen Informationsverbund anzustreben ist",
            "B": "Das die Schutzmaßnahmen maximal 20% des Jahresumsatz kosten dürfen",
            "C": "Das sich in vielen Fällen der höchste Schutzbedarf aller Anwendungen auf einem IT-System, als Schutzberdarf für das IT-System übernehmen lässt",
            "D": "Das nur die maximal wirksame Bausteine aus dem Grundschutzkompendium angewandt werden"
          },
          "right": ["C"]
        },
        "9": {
          "question": "Wenn bei der Schutzbedarfsfeststellung für ein IT-System Verteilungseffekte berücksichtigt werden, bedeutet dies, dass …",
          "answers": {
            "A": "… sich der Schutzbedarf des IT-Systems erhöht, weil sich Einzelschäden zu einem höheren Gesamtschaden verteilen.",
            "B": "… sich der Schutzbedarf des IT-Systems verringert, weil geeignete, sich gegenseitig verstärkende Sicherheitsmaßnahmen im Einsatz sind.",
            "C": "… sich der Schutzbedarf des IT-Systems verringert, wenn eine Anwendung mit hohem Schutzbedarf auf mehrere Systeme verteilt ist.",
            "D": "… der Schutzbedarf geringer ist, wenn auf dem betreffenden IT-System nur weniger wichtige Teile dieser Anwendung ausgeführt werden."
          },
          "right": ["C", "D"]
        },
        "10": {
          "question": "Wer sollte bei der Abschätzung eines möglichen Schadens mit einbezogen werden?",
          "answers": {
            "A": "das Management, da sie letztlich die Verantwortung trägt und so bei Unstimmigkeiten entscheiden muss.",
            "B": "die Anwender, um aus ihrer Sicht realistische Schadensszenarien zu entwickeln.",
            "C": "die Verantwortlichen und die Benutzer der Anwendung,",
            "D": "die Auditoren für das angestrebte ISO 27001 - Zertifkat."
          },
          "right": ["A", "B", "C"]
        },
        "11": {
          "question": "Was ist bei der Schutzbedarfsfeststellungen besonders zu berücksichtigen?",
          "answers": {
            "A": "die Schutzbedarfsfeststellungen ausführlich zu begründen, so das die Entscheidung später nachvollzogen werden kann",
            "B": "das sich Schutzbedarfsfeststellung keinesfalls im Prozess verändern dürfen",
            "C": "das nur die Geschäftsführung zu Schutzbedarfsfeststellung berechtigt ist",
            "D": "das Schutzbedarfsfeststellungen dem Standard gemäß ISO 27003 entsprechend dokumentiert werden"
          },
          "right": ["A"]
        },
        "12": {
          "question": "Welche Schutzbedarfskategorien werden nach IT-Grundschutz unterschieden?",
          "answers": {
            "A": "Normal, hoch, sehr hoch",
            "B": "Gering, mittel, hoch",
            "C": "Niedrig, mittel, hoch, sehr hoch",
            "D": "Unkritisch, kritisch, sehr kritisch"
          },
          "right": ["A"]
        },
        "13": {
          "question": "Welche der folgenden Aspekte sollten bei der Schutzbedarfsfeststellung berücksichtigt werden?",
          "answers": {
            "A": "Beeinträchtigung der Aufgabenerfüllung",
            "B": "Verstöße gegen Gesetze, Vorschriften und Verträge",
            "C": "Finanzielle Auswirkungen",
            "D": "Popularität der eingesetzten Technologie"
          },
          "right": ["A", "B", "C"]
        }
      },
      "Modellierung": {
        "7": {
          "question": "Was ist das Ziel der Modellierung im IT-Grundschutz?",
          "answers": {
            "A": "Das Zusammenführen der identifizierten Zielobjekte mit den entsprechenden Bausteinen",
            "B": "Die Erstellung eines abstrakten 3D-Modells des Unternehmens",
            "C": "Die Simulation von Angriffen auf die IT-Infrastruktur",
            "D": "Die Definition eines spezifischen Sicherheitsprofils für die Institution"
          },
          "right": ["A", "D"]
        },
        "8": {
          "question": "Was versteht man unter Schichtenmodellierung im IT-Grundschutz?",
          "answers": {
            "A": "Die Modellierung erfolgt anhand von Schichten wie ISMS, OPS, NET, usw.",
            "B": "Die Zuordnung von Bausteinen zu logisch zusammengehörigen Gruppen",
            "C": "Das schichtweise Aufbauen von Sicherheitsmaßnahmen nach dem Zwiebelschalenprinzip",
            "D": "Die hierarchische Gliederung der IT-Systeme nach Wichtigkeit"
          },
          "right": ["A", "B"]
        },
        "9": {
          "question": "Welche Aussagen zur Modellierung gemäß IT-Grundschutz sind richtig?",
          "answers": {
            "A": "Ein Baustein kann mehrfach angewendet werden",
            "B": "Jedes Zielobjekt muss mindestens einem Baustein zugeordnet werden",
            "C": "Ein Zielobjekt kann mehreren Bausteinen zugeordnet werden",
            "D": "Ein Baustein kann genau einem Zielobjekt zugeordnet werden"
          },
          "right": ["A", "B", "C"]
        },
        "10": {
          "question": "Was ist eine Grundvoraussetzung für die Modellierung?",
          "answers": {
            "A": "Eine vollständige Strukturanalyse",
            "B": "Die abgeschlossene Schutzbedarfsfeststellung",
            "C": "Die Verfügbarkeit des IT-Grundschutz-Kompendiums",
            "D": "Eine ISO 27001 Zertifizierung"
          },
          "right": ["A", "B", "C"]
        }
      },
      "IT-Grundschutz-Check": {
        "7": {
          "question": "Was ist das Ziel des IT-Grundschutz-Checks?",
          "answers": {
            "A": "Die Ermittlung des aktuellen Umsetzungsstatus der Sicherheitsanforderungen im Informationsverbund",
            "B": "Die Erstellung eines vollständigen Sicherheitskonzepts",
            "C": "Die Identifikation von organisatorischen Schwachstellen",
            "D": "Der Vergleich des aktuellen Sicherheitszustands mit dem Soll-Zustand"
          },
          "right": ["A", "D"]
        },
        "8": {
          "question": "Welche Elemente gehören zu einem strukturierten IT-Grundschutz-Check?",
          "answers": {
            "A": "Dokumentenprüfung",
            "B": "Interviews mit verantwortlichen Mitarbeitern",
            "C": "Begehungen und Besichtigungen",
            "D": "Revision der Unternehmensbilanz"
          },
          "right": ["A", "B", "C"]
        },
        "9": {
          "question": "Welche Bewertungsstufen werden für die Anforderungen beim IT-Grundschutz-Check verwendet?",
          "answers": {
            "A": "Entbehrlich, wünschenswert, erforderlich",
            "B": "Ja, nein, teilweise",
            "C": "Erfüllt, teilweise erfüllt, nicht erfüllt, nicht anwendbar",
            "D": "Niedrig, mittel, hoch"
          },
          "right": ["C"]
        },
        "10": {
          "question": "Welche Vorbereitungen sollten für einen IT-Grundschutz-Check getroffen werden?",
          "answers": {
            "A": "Erstellung eines strukturierten Fragenkatalogs",
            "B": "Festlegung eines Zeitplans für die Durchführung",
            "C": "Bestimmung der zuständigen Ansprechpartner für die einzelnen Bereiche",
            "D": "Schulung aller Mitarbeiter in den IT-Grundschutz-Anforderungen"
          },
          "right": ["A", "B", "C"]
        },
        "11": {
          "question": "Was sollte nach Abschluss eines IT-Grundschutz-Checks durchgeführt werden?",
          "answers": {
            "A": "Eine dokumentierte Auswertung der Ergebnisse",
            "B": "Die Einleitung von Korrekturmaßnahmen bei identifizierten Mängeln",
            "C": "Die Überarbeitung der Sicherheitskonzeption",
            "D": "Die vollständige Neugestaltung der IT-Infrastruktur"
          },
          "right": ["A", "B", "C"]
        }
      },
      "Risikoanalyse": {
        "7": {
          "question": "In welchen Fällen besteht ein zusätzlicher Risiko-Analysebedarf?",
          "answers": {
            "A": "ein Zielobjekt hat einen hohen oder sehr hohen Schutzbedarf",
            "B": "es gibt eine aktualisierte Auflage des IT-Grundschutz-Kompendium",
            "C": "es gibt für ein Zielobjekt keinen hinreichend passenden Baustein im IT-Grundschutz-Kompendium",
            "D": "die Einsatzumgebung des Zielobjekts ist untypisch für den IT-Grundschutz"
          },
          "right": ["A", "C", "D"]
        },
        "8": {
          "question": "Was sind geeignete Methoden zur Risikoanalyse?",
          "answers": {
            "A": "BSI-Standard 200-1 Risikoanalyse auf der Basis von IT-Grundschutz",
            "B": "BSI-Standard 200-2 Risikoanalyse auf der Basis von IT-Grundschutz",
            "C": "BSI-Standard 200-3 Risikoanalyse auf der Basis von IT-Grundschutz",
            "D": "Schätzen mit Beratung durch den Hersteller oder unabhängige Sicherheitsberater"
          },
          "right": ["C", "D"]
        },
        "9": {
          "question": "Unter welchen Voraussetzungen ist ein zweiter IT-Grundschutz-Check notwendig?",
          "answers": {
            "A": "wenn dies der Auditor dies für die Vergabe des IT-Grundschutz Zertifikats verlangt",
            "B": "immer regelmäßig im Zyklus von 3 Jahren",
            "C": "wenn sich durch die Risikoanalyse das Sicherheitskonzept geändert hat",
            "D": "wenn der Umsetzungsstatus neu hinzugekommener oder geänderter Maßnahmen zu prüfen ist"
          },
          "right": ["C", "D"]
        },
        "10": {
          "question": "Welche Schritte umfasst die Risikoanalyse nach IT-Grundschutz?",
          "answers": {
            "A": "Identifikation der Gefährdungen",
            "B": "Bestimmung der Eintrittswahrscheinlichkeit",
            "C": "Abschätzung der Schadenshöhe",
            "D": "Berechnung der Versicherungssumme"
          },
          "right": ["A", "B", "C"]
        },
        "11": {
          "question": "Was ist bei der Durchführung einer ergänzenden Risikoanalyse zu beachten?",
          "answers": {
            "A": "Sie muss immer vom BSI durchgeführt werden",
            "B": "Sie sollte verhältnismäßig zum Schutzbedarf sein",
            "C": "Der Zeit- und Ressourcenaufwand sollte angemessen sein",
            "D": "Die Ergebnisse müssen den Elementar-Gefährdungen des IT-Grundschutzes zugeordnet werden"
          },
          "right": ["B", "C"]
        },
        "12": {
          "question": "Welche Gefährdungen werden bei einer ergänzenden Risikoanalyse betrachtet?",
          "answers": {
            "A": "Spezifische Gefährdungen, die im IT-Grundschutz nicht oder nicht ausreichend berücksichtigt sind",
            "B": "Ausschließlich neue, bisher unbekannte Gefährdungen",
            "C": "Elementargefährdungen gemäß des IT-Grundschutz-Kompendiums",
            "D": "Gefährdungen mit besonders hoher Eintrittswahrscheinlichkeit"
          },
          "right": ["A", "D"]
        }
      },
      "Umsetzungsplanung": {
        "7": {
          "question": "Was sind sinnvolle Schritte um Maßnahmen zu konsolidieren?",
          "answers": {
            "A": "Ergebnissen des IT-Grundschutz-Checks und eventuell durchgeführter Risikoanalysen filtern",
            "B": "Unzureichend erfüllten Anforderungen nach den betroffenen Zielobjekten gruppieren",
            "C": "Einen Termin für den Rechenschaftsbericht der Bereichsverantwortlichen koordinieren",
            "D": "Maßnahmen festlegen, mit denen Sie die verbleibenden Sicherheitslücken schließen können"
          },
          "right": ["A", "B", "D"]
        },
        "8": {
          "question": "Was sind Handlungsoptionen, wenn die bewilligten Finanzmittel nicht für die sofortige Umsetzung sämtlicher Maßnahmen ausreichen?",
          "answers": {
            "A": "Informationssicherheit muss die höchste Priorität für ein Unternehmen haben, daher müssen die Geschäftführer durch ihr Privatvermögen die Mittel bereitstellen",
            "B": "Das Budget muss aufgestockt werden",
            "C": "Über die KfW können Mittel aus dem nationalen Fonds für Cybersicherheit beantragt werden",
            "D": "Die Restrisiken müssen getragen werden"
          },
          "right": ["B", "D"]
        },
        "9": {
          "question": "Welche Kriterien sollten bei der Priorisierung von Sicherheitsmaßnahmen berücksichtigt werden?",
          "answers": {
            "A": "Aufwand für die Umsetzung",
            "B": "Wirksamkeit der Maßnahme",
            "C": "Höhe des adressierten Risikos",
            "D": "Alter der IT-Systeme"
          },
          "right": ["A", "B", "C"]
        }
      },
      "Notfallmanagement initiieren": {
        "7": {
          "question": "Welche Aufgaben fallen in den Arbeitsbereich des Notfallbeauftragten?",
          "answers": {
            "A": "die Koordination der Anfertigung der Sicherheitsleitlinie",
            "B": "die Umsetzung von Maßnahmen zur Notfallprävention",
            "C": "die Überwachung der Einrichtungen zur frühzeitigen Erkennen von Notfällen (z. B. Alarmanlagen)",
            "D": "die Koordination der Entwicklung des Notfallvorsorgekonzepts"
          },
          "right": ["A", "D"]
        }
      },
      "Business Impact Analyse": {
        "7": {
          "question": "Welche Aussagen zur Erhebung der Ressourcen im Rahmen einer Business Impact Analyse sind zutreffend?",
          "answers": {
            "A": "Wenn Sie die Ressourcen zusammen mit der Schadensanalyse erheben, können Sie beides in einem einzigen Gespräch erledigen.",
            "B": "Wenn Sie die Ressourcen erst nach der Schadensanalyse erheben, können Sie sich auf die kritischen Prozesse beschränken.",
            "C": "Wenn Sie die Ressourcen vor der Schadensanalyse erheben, erübrigt sich in vielen Fällen eine gesonderte Schadensanalyse.",
            "D": "Nur dann, wenn Sie zuvor erhoben haben, welche Ressourcen ein Geschäftsprozess benötigt, können Sie den möglichen Schaden einer Unterbrechung exakt analysieren."
          },
          "right": ["A", "B"]
        },
        "8": {
          "question": "Mit welchen Kenngrößen beschreiben Sie Anforderungen an den Wiederanlauf eines Geschäftsprozesses?",
          "answers": {
            "A": "maximal tolerierbare Ausfallzeit",
            "B": "Wiederanlaufzeit",
            "C": "maximale Anzahl an Wiederanlaufversuchen",
            "D": "Wiederanlauf-Niveau"
          },
          "right": ["A", "B", "D"]
        },
        "9": {
          "question": "Welche Vorgehensweisen erhöhen die Qualität und Effizienz einer Business Impact Analyse?",
          "answers": {
            "A": "Ein allgemeiner Fragebogen zur Erhebung von generellen Informationen",
            "B": "Gezielten Interviews mit kompetenten Vertretern",
            "C": "Einführende Workshops mit den Beteiligten zum Sinn des Notfallmanagement",
            "D": "Zusicherung der Unterstützung durch das Management einholen"
          },
          "right": ["A", "B", "C", "D"]
        },
        "10": {
          "question": "Welche Aussagen zu Prozessen im Rahmen einer einer Business Impact Analyse sind richtig?",
          "answers": {
            "A": "In einer Business Impact Analyse muss man Hauptprozesse und Begleitprozesse unterscheiden",
            "B": "In einer Business Impact Analyse muss man Kernprozesse und Hilfsprozesse unterscheiden",
            "C": "Unterstützende Prozesse können auch zu den hochgradig kritischen Prozessen einer Einrichtung gehören",
            "D": "Als Faustregel empfiehlt der BSI-Standard 100-4, zwischen 5 - 15 Prozesse pro Organisationseinheit zu betrachten"
          },
          "right": ["B", "C", "D"]
        }
      },
      "Pruefungsvorbereitung": {
        "7": {
          "question": "Welche Ziele verfolgt das Risikomanagement gemäß BSI-Standard 200-3?",
          "answers": {
            "A": "die pauschale Vermeidung aller Risiken durch technische Sicherheitsmaßnahmen",
            "B": "die systematische Identifikation, Analyse und Bewertung von Risiken",
            "C": "die angemessene Behandlung identifizierter Risiken",
            "D": "die Dokumentation von Entscheidungen zur Risikobehandlung"
          },
          "right": ["B", "C", "D"]
        },
        "8": {
          "question": "Welche Komponenten umfasst ein Informationssicherheitsmanagementsystem (ISMS)?",
          "answers": {
            "A": "Managementprinzipien",
            "B": "Ressourcen und Mitarbeiter",
            "C": "Beschreibung eines Sicherheitsprozesses",
            "D": "Penetrationstestwerkzeuge"
          },
          "right": ["A", "B", "C"]
        },
        "9": {
          "question": "Welche Kennzeichnungen werden für Anforderungen in den IT-Grundschutz-Bausteinen verwendet?",
          "answers": {
            "A": "\"MUSS\" kennzeichnet unbedingt zu erfüllende Anforderungen",
            "B": "\"SOLLTE\" bedeutet, dass die Anforderung normalerweise erfüllt werden muss, bei stichhaltigen Gründen aber auch davon abgesehen werden kann",
            "C": "\"DARF NICHT\" bedeutet, dass etwas in keinem Fall getan werden darf",
            "D": "\"KANN\" kennzeichnet Anforderungen mit höchster Priorität"
          },
          "right": ["A", "B", "C"]
        },
        "10": {
          "question": "Welche Optionen stehen zur Behandlung von Risiken zur Verfügung?",
          "answers": {
            "A": "Risikovermeidung durch Umstrukturierung der Geschäftsprozesse",
            "B": "Risikoreduktion durch weitere Sicherheitsmaßnahmen",
            "C": "Risikotransfer (z.B. durch Versicherungen oder Outsourcing)",
            "D": "Risikoakzeptanz"
          },
          "right": ["A", "B", "C", "D"]
        },
        "11": {
          "question": "Welche Aussagen über virtuelle Systeme bei der Modellierung nach IT-Grundschutz sind korrekt?",
          "answers": {
            "A": "Virtuelle Systeme werden in gleicher Weise modelliert wie physische Systeme",
            "B": "Für einen Virtualisierungsserver müssen der Baustein SYS.1.5 Virtualisierung und mindestens ein weiterer Server-Baustein angewendet werden",
            "C": "Für virtuelle Server müssen keine IT-Grundschutz-Bausteine angewendet werden",
            "D": "Für jeden virtuellen Server auf einem Virtualisierungsserver müssen die üblichen Bausteine für Server angewendet werden"
          },
          "right": ["A", "B", "D"]
        },
        "12": {
          "question": "Welche Aspekte sind bei der Dokumentation der Ergebnisse eines IT-Grundschutz-Checks zu berücksichtigen?",
          "answers": {
            "A": "Datum und Durchführende des Interviews",
            "B": "Das geprüfte Zielobjekt",
            "C": "Befragte Personen",
            "D": "Zeitpunkt der nächsten Revision"
          },
          "right": ["A", "B", "C"]
        },
        "13": {
          "question": "Welche organisatorischen Rahmenbedingungen sollten vor der Durchführung von Risikoanalysen festgelegt werden?",
          "answers": {
            "A": "Unter welchen Voraussetzungen ist eine Risikoanalyse erforderlich?",
            "B": "Mit welchem Verfahren werden Risiken identifiziert, eingeschätzt, bewertet und behandelt?",
            "C": "Welche Organisationseinheiten sind für die verschiedenen Teilaufgaben des Risikomanagements zuständig?",
            "D": "Welche technischen Maßnahmen müssen umgesetzt werden?"
          },
          "right": ["A", "B", "C"]
        },
        "14": {
          "question": "Welche Akteure sollten bei der Einführung eines Informationssicherheitsmanagementsystems (ISMS) einbezogen werden?",
          "answers": {
            "A": "Die Leitungsebene",
            "B": "Der Informationssicherheitsbeauftragte (ISB)",
            "C": "Das IS-Management-Team (sofern vorhanden)",
            "D": "Ausschließlich externe Berater"
          },
          "right": ["A", "B", "C"]
        },
        "15": {
          "question": "Welche Informationen müssen bei der Schutzbedarfsfeststellung für ein IT-System berücksichtigt werden?",
          "answers": {
            "A": "Der Schutzbedarf der Anwendungen, die auf dem IT-System ausgeführt werden",
            "B": "Mögliche Kumulationseffekte bei mehreren Anwendungen auf einem IT-System",
            "C": "Mögliche Verteilungseffekte bei redundanten IT-Systemen",
            "D": "Die Kosten des IT-Systems"
          },
          "right": ["A", "B", "C"]
        }
      }
    }
  };

// DOM-Elemente
  const startScreen = document.getElementById('start-screen');
  const categoryScreen = document.getElementById('category-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultsScreen = document.getElementById('results-screen');
  const startBtn = document.getElementById('start-btn');
  const categoriesContainer = document.getElementById('categories-container');
  const randomCategoryBtn = document.getElementById('random-category-btn');
  const categoryDisplay = document.getElementById('category-display');
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');
  const answerOptions = document.querySelectorAll('.answer-option');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackContainer = document.getElementById('feedback-container');
  const feedbackMessage = document.getElementById('feedback-message');
  const correctAnswers = document.getElementById('correct-answers');
  const nextBtn = document.getElementById('next-btn');
  const scoreDisplay = document.getElementById('score-display');
  const percentageDisplay = document.getElementById('percentage-display');
  const restartBtn = document.getElementById('restart-btn');
  const progressBar = document.getElementById('progress-bar');

// Quiz-Zustandsvariablen

  let categories = Object.keys(quizData.quiz);
  let currentCategory = null;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let selectedAnswers = [];
  let score = 0;
  let totalQuestions = 0;

// Event-Listener

  startBtn.addEventListener('click', showCategoryScreen);
  randomCategoryBtn.addEventListener('click', () => startQuiz('random'));
  submitBtn.addEventListener('click', checkAnswer);
  nextBtn.addEventListener('click', showNextQuestion);
  restartBtn.addEventListener('click', restartQuiz);

// Antwortoptionen auswählbar machen

  answerOptions.forEach(option => {
    option.addEventListener('click', () => {
      const optionLetter = option.getAttribute('data-option');
      if (selectedAnswers.includes(optionLetter)) {
        // Wenn bereits ausgewählt, Auswahl aufheben
        selectedAnswers = selectedAnswers.filter(letter => letter !== optionLetter);
        option.classList.remove('selected');
      } else {
        // Sonst auswählen
        selectedAnswers.push(optionLetter);
        option.classList.add('selected');
      }
    });
  });

  function addHomeButton() {
    // Prüfen, ob der Button bereits existiert
    if (!document.getElementById('home-button')) {
      const homeButton = document.createElement('button');
      homeButton.id = 'home-button';
      homeButton.textContent = 'Zurück zur Startseite';
      homeButton.classList.add('chalk-btn');
      homeButton.addEventListener('click', () => {
        quizScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
      });
      // Button zum Quiz-Screen hinzufügen
      document.getElementById('submit-container').appendChild(homeButton);
    }
  }

// Neue Kategorie für sequentielles Lernen hinzufügen

  function addSequentialLearningCategory() {
    const sequentialCategoryBtn = document.createElement('button');
    sequentialCategoryBtn.textContent = 'Lernmodus';
    sequentialCategoryBtn.classList.add('category-btn');
    sequentialCategoryBtn.addEventListener('click', () => startSequentialLearning());
    categoriesContainer.appendChild(sequentialCategoryBtn);
  }

// Funktion für sequentielles Lernen

  function startSequentialLearning() {
    categoryScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    // Quiz mit allen Fragen in Reihenfolge initialisieren
    currentCategory = 'sequential';
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    // Alle Fragen aus allen Kategorien sammeln
    categories.forEach(cat => {
      const categoryQuestions = Object.keys(quizData.quiz[cat]);
      categoryQuestions.forEach(questionId => {
        currentQuestions.push({
          category: cat,
          id: questionId,
          ...quizData.quiz[cat][questionId]
        });
      });
    });
    // Fragen nicht mischen im Lernmodus
    totalQuestions = currentQuestions.length;
    // Erste Frage anzeigen
    showQuestion();
    // Zurück-Button und Home-Button hinzufügen
    addBackButton();
    addHomeButton();
  }

// Zurück-Button für Navigation zur vorherigen Frage

  function addBackButton() {
    // Prüfen ob bereits ein Zurück-Button existiert und entfernen
    const existingBackButton = document.getElementById('back-button');
    if (existingBackButton) {
      existingBackButton.remove();
    }
    const backButton = document.createElement('button');
    backButton.id = 'back-button';
    backButton.textContent = 'Zurück';
    backButton.classList.add('chalk-btn'); //alex hilfe
    backButton.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
      }
    });
    // Button zum Quiz-Screen hinzufügen
    document.getElementById('submit-container').appendChild(backButton);
  }

// Funktionen

  function showCategoryScreen() {
    startScreen.classList.add('hidden');
    categoryScreen.classList.remove('hidden');
    // Kategorien anzeigen
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
      if (Object.keys(quizData.quiz[category]).length > 0) {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('category-btn');
        categoryBtn.textContent = category;
        categoryBtn.addEventListener('click', () => startQuiz(category));
        categoriesContainer.appendChild(categoryBtn);
      }
    });
    // Lernmodus-Kategorie hinzufügen
    addSequentialLearningCategory();
  }

  function startQuiz(category) {
    categoryScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    // Quiz initialisieren
    currentCategory = category;
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    // Fragen sammeln
    if (category === 'random') {
      // Zufällige Fragen aus allen Kategorien
      categories.forEach(cat => {
        const categoryQuestions = Object.keys(quizData.quiz[cat]);
        categoryQuestions.forEach(questionId => {
          currentQuestions.push({
            category: cat,
            id: questionId,
            ...quizData.quiz[cat][questionId]
          });
        });
      });
      // Mischen und auf 5 Fragen begrenzen
      shuffleArray(currentQuestions);
      currentQuestions = currentQuestions.slice(0, 5);
    } else {
      // Alle Fragen aus der gewählten Kategorie
      const categoryQuestions = Object.keys(quizData.quiz[category]);
      categoryQuestions.forEach(questionId => {
        currentQuestions.push({
          category: category,
          id: questionId,
          ...quizData.quiz[category][questionId]
        });
      });
      // Mischen
      shuffleArray(currentQuestions);
    }
    totalQuestions = currentQuestions.length;
    showQuestion();
    // Home-Button hinzufügen
    addHomeButton();
  }

  function showQuestion() {
    // Fortschrittsbalken aktualisieren
    progressBar.style.width = `${(currentQuestionIndex / totalQuestions) * 100}%`;
    // Ausgewählte Antworten zurücksetzen
    selectedAnswers = [];
    answerOptions.forEach(option => {
      option.classList.remove('selected', 'correct', 'incorrect');
    });
    // Feedback ausblenden
    feedbackContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    const currentQuestion = currentQuestions[currentQuestionIndex];
    // Kategorie anzeigen
    categoryDisplay.textContent = currentQuestion.category;
    // Frage anzeigen
    questionContainer.textContent = currentQuestion.question;
    // Antwortoptionen anzeigen
    answerOptions.forEach(option => {
      const optionLetter = option.getAttribute('data-option');
      const optionText = option.querySelector('.option-text');
      optionText.textContent = currentQuestion.answers[optionLetter];
    });
  }

  function checkAnswer() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const correctAnswerLetters = currentQuestion.right;
    // Antworten markieren
    answerOptions.forEach(option => {
      const optionLetter = option.getAttribute('data-option');
      if (correctAnswerLetters.includes(optionLetter)) {
        option.classList.add('correct');
      } else if (selectedAnswers.includes(optionLetter)) {
        option.classList.add('incorrect');
      }
    });
    // Prüfen, ob alle richtigen Antworten ausgewählt wurden und keine falschen
    const allCorrectSelected = correctAnswerLetters.every(letter => selectedAnswers.includes(letter));
    const noIncorrectSelected = selectedAnswers.every(letter => correctAnswerLetters.includes(letter));
    const isCorrect = allCorrectSelected && noIncorrectSelected;
    // Feedback anzeigen
    feedbackContainer.classList.remove('hidden');
    if (isCorrect) {
      feedbackMessage.textContent = "Richtig! Alle korrekten Antworten wurden ausgewählt.";
      correctAnswers.textContent = "";
      score++;
    } else {
      feedbackMessage.textContent = "Falsch!";
      // Richtige Antworten anzeigen
      correctAnswers.textContent = `Die richtigen Antworten sind: ${correctAnswerLetters.map(letter =>
          `${letter}: ${currentQuestion.answers[letter]}`).join(', ')}`;
    }
    // Submit-Button ausblenden und Next-Button einblenden
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
  }

  function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    scoreDisplay.textContent = `Du hast ${score} von ${totalQuestions} Fragen richtig beantwortet.`;
    const percentage = (score / totalQuestions) * 100;
    percentageDisplay.textContent = `Erfolgsquote: ${percentage.toFixed(1)}%`;
  }

  function restartQuiz() {
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
  }

// Hilfsfunktion zum Mischen eines Arrays

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

});
