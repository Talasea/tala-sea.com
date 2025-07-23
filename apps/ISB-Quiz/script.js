// DSGVO Datenschutzbeauftragter Quiz - Vollständige JavaScript-Datei
// Alle 53 Fragen aus dem offiziellen ISB/ISO Prüfungsbogen

// Vollständiger Fragenkatalog mit allen 53 Fragen
const questionDatabase = [
    {
        id: 1,
        question: "Welche Aufgaben haben üblicherweise Informationssicherheits-Beauftragte?",
        answers: [
            "Die Entwicklung von Sicherheitskonzepten zu koordinieren.",
            "Die eingesetzte Sicherheitstechnik zu konfigurieren.",
            "Der Leitungsebene über den Stand der Informationssicherheit zu berichten.",
            "Presseanfragen zum Stand der Informationssicherheit im Unternehmen zu beantworten."
        ],
        correct: [0, 2],
        multipleChoice: true
    },
    {
        id: 2,
        question: "Welche Inhalte/Aufgaben gehören zur IS-Leitlinie?",
        answers: [
            "Geltungsbereich",
            "Regelmäßige Überarbeitung/Überprüfung",
            "Umgang mit sozialen Netzwerken",
            "Angestrebte Sicherheitsziele"
        ],
        correct: [0, 1, 3],
        multipleChoice: true
    },
    {
        id: 3,
        question: "Wer ist für die Freigabe der Leitlinie zur Informationssicherheit verantwortlich?",
        answers: [
            "IS-Management-Team (ISMT)",
            "Informationssicherheits-Beauftragte (ISB/ISO)",
            "Unternehmens- oder Behördenleitung",
            "Öffentlichkeitsabteilung eines Unternehmens oder einer Behörde."
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 4,
        question: "Was gehört alles zum Aufbau eines Informationssicherheitssystems (ISMS)?",
        answers: [
            "Festlegung von Verantwortlichkeiten.",
            "Erarbeiten einer unternehmensweiten Leitlinie (Sicherheitspolitik).",
            "Etablierung eines IT-Sicherheitsmanagementprozesses.",
            "Auslagerung der IT.",
            "Benennung des IT-Administrators zum Informationssicherheits-Beauftragten."
        ],
        correct: [0, 1, 2],
        multipleChoice: true
    },
    {
        id: 5,
        question: "In Facebook, Twitter und anderen Messenger-Diensten bzw. sozialen Netzwerken ist wie folgt mit Unternehmensdaten umzugehen:",
        answers: [
            "Ich trage so viel wie möglich Positives ein, denn das stellt Werbung für das Unternehmen dar!",
            "Ich \"zwitschere\" nichts aus, denn es handelt sich hierbei womöglich um vertrauliche betriebsinterne Informationen.",
            "Ich diskutiere gerne über die Firmenphilosophie und meine Kolleginnen und Kollegen.",
            "Solange ich die Informationen nur innerhalb meines Freundeskreises austausche, kann ich von einem vertrauensvollen Umgang ausgehen."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 6,
        question: "Bei der Umsetzung und Durchsetzung von Sicherheitsrichtlinien ist die Einbeziehung aller relevanten Personengruppen von großer Bedeutung. Wer muss für eine wirkliche Umsetzung unbedingt zustimmen?",
        answers: [
            "IT-Leiter",
            "Administrator",
            "IT-Nutzer",
            "Unternehmensführung"
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 7,
        question: "Was bedeutet der Begriff \"IT-Compliance\"?",
        answers: [
            "Gewährleistung eines angemessenes und gleichbleibendes regelkonformes IT-System/Sicherheitsniveaus.",
            "Gewährleistet Sicherheit durch einmalige Installation von Firewalls, IDS und Virenscanner.",
            "Die IT-Systeme müssen den für Einrichtung und Betrieb solcher Systeme geltenden Gesetzen, Richtlinien und Verhaltensmaßregeln genügen."
        ],
        correct: [0, 2],
        multipleChoice: true
    },
    {
        id: 8,
        question: "Wer gehört potenziell zur Zielgruppe von Sensibilisierungs-Maßnahmen im Zusammenhang mit dem ISMS? 1. Mitarbeiter der Organisation 2. Externe Nutzer von Informationssystemen, die von der Organisation bereitgestellt werden 3. Vertragspartner",
        answers: [
            "Nur 1 und 2",
            "Nur 1 und 3",
            "Nur 2 und 3",
            "Alle"
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 9,
        question: "Das ISMS erfordert eine Reihe von Dokumenten. Wie könnte eine Organisation der unbeabsichtigten Nutzung veralteter Dokumente entgegenwirken?",
        answers: [
            "Durch einheitliche Dokumenten-Vorlagen (Templates).",
            "Indem nur die Dokumente als relevant und gültig angesehen werden, die in einem zentralen Dokumentenmanagement-System erfasst sind.",
            "Durch die Einführung von Versionsnummern für Dokumente.",
            "Indem Änderungen an bereits genehmigten und verteilten Dokumenten vermieden werden."
        ],
        correct: [1, 2],
        multipleChoice: true
    },
    {
        id: 10,
        question: "Was ist der beste Weg, um eine kontinuierliche Überwachung der Compliance in einer Organisation zu erreichen?",
        answers: [
            "Überprüfen Sie die Einhaltung nur unmittelbar vor dem planmäßigen Eintreffen der Auditoren vor Ort.",
            "Beauftragen Sie Compliance- und Informationssicherheitspartner damit, auftretende Probleme zu beheben.",
            "Lagern Sie Compliance an einen Drittanbieter aus und überlassen Sie ihm die Verwaltung des Programms.",
            "Lassen Sie die Compliance die Informationssicherheit leiten, um Probleme nach dem Prüferbericht zu beheben."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 11,
        question: "Was ist/sind keine Arbeitsanweisung/en, sondern Richtlinie/n (Security Policies)?",
        answers: [
            "Betriebshandbücher",
            "Installationsanleitungen",
            "Einsatz von mobilen Geräten im Unternehmen"
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 12,
        question: "Wann bewerten Sie beim IT-Grundschutz-Check eine Anforderung eines IT-Grundschutz-Bausteins als erfüllt?",
        answers: [
            "Wenn zu der Anforderung geeignete Maßnahme/n vollständig, wirksam und angemessen umgesetzt ist/sind.",
            "Wenn der Gesprächspartner Ihnen glaubhaft versichert hat, dass es bislang zu keinen Sicherheitsproblemen auf dem betreffenden IT-System gekommen ist.",
            "Wenn sowohl im Interview mit einem für das IT-System Zuständigen als auch bei einer stichprobenartigen Überprüfung keine Sicherheitsmängel festgestellt wurden."
        ],
        correct: [0],
        multipleChoice: false
    },
    {
        id: 13,
        question: "Was müssen Sie prüfen, wenn Sie die Umsetzung von Sicherheitsmaßnahmen planen?",
        answers: [
            "Welche begleitenden Maßnahmen für eine erfolgreiche Umsetzung erforderlich sind.",
            "Ob die betreffende Maßnahme bereits eingeführt ist.",
            "Ob die Maßnahme mit anderen Maßnahmen vereinbar ist.",
            "In welcher Reihenfolge die verschiedenen Maßnahmen umgesetzt werden sollen."
        ],
        correct: [0, 1, 2, 3],
        multipleChoice: true
    },
    {
        id: 14,
        question: "Welche Schritte gehören zum Risikomanagement?",
        answers: [
            "Identifikation der Risiken.",
            "Risikoüberwachung.",
            "Unterdrückung von Risiken bzw. Nichtbeachtung, da Risiken immer bestehen.",
            "Analyse und Bewertung der Risiken."
        ],
        correct: [0, 1, 3],
        multipleChoice: true
    },
    {
        id: 15,
        question: "Akzeptable Ebenen der Informationssicherheits-Risikotoleranz in einer Organisation sollten bestimmt werden durch ...",
        answers: [
            "Unternehmensrechtsberater",
            "CEO und Vorstand",
            "ISB/ISO in Bezug auf die Unternehmensziele",
            "Corporate-Compliance-Ausschuss"
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 16,
        question: "Das Risiko, das nach der Risikominderung verbleibt, wird bezeichnet als …",
        answers: [
            "Dauerhaftes Risiko",
            "Restrisiko",
            "Akzeptiertes Risiko",
            "Nicht toleriertes Risiko"
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 17,
        question: "Das Unternehmen beschließt, die Anwendung freizugeben, ohne die hochriskanten Schwachstellen zu beheben. Welcher der folgenden Gründe ist der wahrscheinlichste Grund für das Unternehmen, die Anwendung freizugeben?",
        answers: [
            "Dem Unternehmen fehlt ein Risikomanagementprozess.",
            "Das Unternehmen hat eine hohe Risikobereitschaft.",
            "Das Unternehmen glaubt nicht, dass die Sicherheitslücken real sind.",
            "Dem Unternehmen fehlen die Tools, um eine Schwachstellenanalyse durchzuführen."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 18,
        question: "Der neu ernannte ISB/ISO einer Organisation überprüft den IT-Sicherheits-Strategieplan. Welche der folgenden ist die wichtigste Komponente des Strategieplans?",
        answers: [
            "Es gibt eine Integration zwischen IT-Sicherheit und Personalausstattung.",
            "Es gibt eine klare Definition der IT-Sicherheitsmission und -vision.",
            "Es gibt eine Prüfungsmethodik.",
            "Der Plan fordert eine Kapitalrendite für alle Sicherheitsprojekte."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 19,
        question: "Die Risikobereitschaft wird typischerweise durch welche der folgenden organisatorischen Funktionen bestimmt?",
        answers: [
            "Sicherheit.",
            "Geschäftseinheiten.",
            "CEO und Vorstand.",
            "Audit und Compliance."
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 20,
        question: "Ein Gewitter kann zum Schaden bei der IT führen. Zu welcher Kategorie zählt dieses?",
        answers: [
            "Organisatorische Mängel",
            "Höhere Gewalt",
            "Menschliche Fehlhandlung",
            "Technisches Versagen"
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 21,
        question: "Sie haben eine neue Sicherheitskontrolle implementiert. Welche der folgenden Risikostrategieoptionen haben Sie in Anspruch genommen?",
        answers: [
            "Risikovermeidung",
            "Risikoakzeptanz",
            "Risikotransfer",
            "Risikominderung"
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 22,
        question: "Wodurch verlagern Sie ein Risiko?",
        answers: [
            "Durch den Abschluss einer Versicherung.",
            "Durch Outsourcing des risikobehafteten Geschäftsprozesses an einen externen Dienstleister.",
            "Durch Umstrukturierung des risikobehafteten Geschäftsprozesses.",
            "Durch die Entscheidung, risikomindernde Maßnahmen erst dann umzusetzen, wenn die hierzu erforderlichen Finanzmittel bereitstehen."
        ],
        correct: [0, 1],
        multipleChoice: true
    },
    {
        id: 23,
        question: "Welche Angaben sind für IT-Systeme bei der Strukturanalyse zu erfassen?",
        answers: [
            "Typ und Einsatzzweck",
            "Administration, technische Verantwortliche",
            "Standort (Gebäude, Raum)"
        ],
        correct: [0, 1, 2],
        multipleChoice: true
    },
    {
        id: 24,
        question: "Welche Anwendungen sind in der Strukturanalyse zu erfassen?",
        answers: [
            "Alle Anwendungen, die für mindestens einen der bereits erfassten Geschäftsprozesse erforderlich sind.",
            "Alle Anwendungen, für die eine gültige Lizenz vorhanden ist.",
            "Alle Anwendungen, die von mindestens 20 Prozent der Mitarbeiter genutzt werden."
        ],
        correct: [0],
        multipleChoice: false
    },
    {
        id: 25,
        question: "Welche Ziele verfolgt die Strukturanalyse im Rahmen der IT-Grundschutz-Methodik?",
        answers: [
            "Nur die Identifizierung der Objekte, die besonders stark gefährdet sind.",
            "Die Ermittlung der Objekte, die in einem Sicherheitskonzept zu berücksichtigen sind.",
            "Die angemessene Zusammenfassung von Objekten, für die gleiche Sicherheitsmaßnahmen angewendet werden können.",
            "Die Ermittlung der Objekte, für die es passende Bausteine im IT-Grundschutz-Kompendium gibt."
        ],
        correct: [1, 2, 3],
        multipleChoice: true
    },
    {
        id: 26,
        question: "Ein ISB/ISO sieht ungewöhnlich viele Ausnahmen von Sicherheitsanforderungen und ständigen Druck von Geschäftsbereichen, Sicherheitsprozesse zu ändern. Welche der folgenden Aussagen stellt die wahrscheinlichste Ursache für diese Situation dar?",
        answers: [
            "Fehlende Anwesenheit von Führungskräften innerhalb des Sicherheitsprogramms.",
            "Mangelnde Ausrichtung des Sicherheitsprogramms auf Geschäftsanforderungen.",
            "Dies ist normal, da Geschäftseinheiten normalerweise Sicherheitsanforderungen widerstehen."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 27,
        question: "Zu welchen Schutzmaßnahmen zählt die Awareness-Schulung?",
        answers: [
            "Infrastrukturelle Maßnahme",
            "Organisatorische Maßnahme",
            "Technische Maßnahme",
            "Personelle Maßnahme"
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 28,
        question: "Wann ist die Risikoakzeptanz grundsätzlich unzulässig?",
        answers: [
            "Bei der Nichterfüllung von Basis-Anforderungen.",
            "Beim Vorhandensein von elementaren Gefährdungen.",
            "Bei sehr hohem Schutzbedarf.",
            "Bei Nichterfüllung von Standard-Anforderungen."
        ],
        correct: [0],
        multipleChoice: false
    },
    {
        id: 29,
        question: "Was bewerten Sie bei der Risikoeinschätzung?",
        answers: [
            "Die Häufigkeit des Eintretens einer Gefährdung.",
            "Das mit einer Gefährdung verbundene Schadensausmaß.",
            "Die Wirksamkeit der geplanten und umgesetzten Maßnahmen gegen eine Gefährdung."
        ],
        correct: [0, 1, 2],
        multipleChoice: true
    },
    {
        id: 30,
        question: "Sie haben im Rahmen Ihrer Risikostrategie eine neue Versicherung abgeschlossen. Welche der folgenden Risikostrategieoptionen haben Sie in Anspruch genommen?",
        answers: [
            "Risikovermeidung",
            "Risikoakzeptanz",
            "Risikotransfer",
            "Risikominderung"
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 31,
        question: "Wie oft soll eine Umgebung auf Cyber-Bedrohungen/Cyber-Risiken überwacht werden?",
        answers: [
            "Wöchentlich",
            "Monatlich",
            "Vierteljährlich",
            "Täglich"
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 32,
        question: "Welche der folgenden Aktivitäten ist der Hauptzweck des Risikobewertungsprozesses?",
        answers: [
            "Erstellen eines Inventars von Informationsbeständen.",
            "Klassifizieren und Organisieren von Informationsbeständen in aussagekräftige Gruppen.",
            "Jedem Informationswert einen Wert zuweisen.",
            "Berechnung der Risiken, denen Vermögenswerte in ihrer aktuellen Umgebung ausgesetzt sind."
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 33,
        question: "Welche der folgenden Punkte muss ein ISB/ISO am wichtigsten verstehen, wenn er Bedrohungen identifiziert?",
        answers: [
            "Wie sich das Sicherheitsbetriebsteam bei gemeldeten Vorfällen verhalten wird.",
            "Wie Schwachstellen potenziell in Systemen ausgenutzt werden können, die sich auf die Organisation auswirken.",
            "Wie die Firewall und andere Sicherheitsvorrichtungen konfiguriert sind, um Angriffe zu verhindern.",
            "Wie sich das Incident-Management-Team auf den Umgang mit einem Angriff vorbereitet."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 34,
        question: "Welche der folgenden sind die wichtigsten Faktoren für die proaktive Ermittlung von Systemschwachstellen?",
        answers: [
            "Abonnieren Sie die Anbieter-Mailingliste, um Benachrichtigungen über Systemschwachstellen zu erhalten.",
            "Stellen Sie das Intrusion Detection System (IDS) bereit und installieren Sie Antivirus auf den Systemen.",
            "Firewall, Perimeter-Router und Intrusion Prevention System (IPS) konfigurieren.",
            "Führen Sie Sicherheitstests, Schwachstellen-Scans und Penetrationstests durch."
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 35,
        question: "Was bedeutet der Begriff \"Single-Point-of-Failure\"?",
        answers: [
            "Eine Ressource, ohne die ein Geschäftsprozess vollständig ausfallen würde.",
            "Eine Ressource, deren Ausfall nur unter sehr speziellen Bedingungen größeren Schaden bewirken kann.",
            "Eine Ressource, deren Kritikalität für einen Geschäftsprozess sehr hoch ist.",
            "Eine Ressource, auf die im Notfall verzichtet werden kann."
        ],
        correct: [0],
        multipleChoice: false
    },
    {
        id: 36,
        question: "Aus welchen Gründen kann es gerechtfertigt sein, auch ein hohes Risiko zu akzeptieren?",
        answers: [
            "Der Aufwand für mögliche Schutzmaßnahmen ist unangemessen hoch.",
            "Vergleichbare Institutionen akzeptieren das Risiko ebenfalls.",
            "Es gibt keine wirksamen Schutzmaßnahmen gegen das Risiko.",
            "Es ist bislang noch zu keinem nennenswerten Sicherheitsvorfall aufgrund der dem Risiko zugrunde liegenden Gefährdung gekommen."
        ],
        correct: [0, 2],
        multipleChoice: true
    },
    {
        id: 37,
        question: "In welchen Fällen können Sie gemäß IT-Grundschutz-Methodik auf die Schutzbedarfsfeststellung für ein IT-System verzichten?",
        answers: [
            "Wenn das IT-System spätestens innerhalb von 18 Monaten ausgesondert wird.",
            "Wenn das IT-System nicht eingesetzt wird.",
            "Wenn die Anwendungen, die es unterstützt, nur einen normalen Schutzbedarf haben.",
            "Wenn der Schutzbedarf bereits im Rahmen einer vor einem Jahr durchgeführten Revision festgestellt wurde."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 38,
        question: "Was gehört zur Schutzbedarfsfeststellung gemäß BSI?",
        answers: [
            "Erfassung vorhandener IT-Systeme.",
            "Erfassung geplanter IT-Systeme.",
            "Erfassung der IT-Anwendungen und Zuordnungen zu den einzelnen IT-Systemen.",
            "Kontrolle der Mitarbeiter."
        ],
        correct: [0, 1, 2],
        multipleChoice: true
    },
    {
        id: 39,
        question: "Was berücksichtigen Sie, wenn Sie den Schutzbedarf einer Anwendung bestimmen?",
        answers: [
            "Die Informationen, die im Zusammenhang mit der Anwendung verwendet werden.",
            "Die Bedeutung der Anwendung für die Geschäftsprozesse oder Fachaufgaben.",
            "Die räumliche Umgebung des IT-Systems, das die Anwendung bereitstellt."
        ],
        correct: [0, 1],
        multipleChoice: true
    },
    {
        id: 40,
        question: "Wer in der Organisation bestimmt den Zugang zu Informationen?",
        answers: [
            "Dateneigentümer/-in",
            "Compliance-Beauftragte/-r",
            "Rechtsabteilung",
            "Informationssicherheits-Beauftragte/-r"
        ],
        correct: [0],
        multipleChoice: false
    },
    {
        id: 41,
        question: "Trotz eines modernen Smartcard-basierten Zugangskontrollsystems kam es an einem kritischen IT-System zu einem schweren Informationssicherheits-Vorfall. Welche der folgenden Informationen stellt in diesem Zusammenhang die wichtigste Eingabe (Input) in die nächste Managementbewertung dar?",
        answers: [
            "Informationen zu Bedrohungen, die zuvor im Rahmen der Risikoeinschätzung nicht ausreichend berücksichtigt wurden.",
            "Ergebnisse von Messungen der Wirksamkeit des Zugangskontrollsystems.",
            "Ein aktualisierter Risikobehandlungsplan.",
            "Eine Aufzeichnung über diesen Informationssicherheits-Vorfall einschließlich Informationen zu Ursachen, Auslösern, Reaktion und Folgemaßnahmen."
        ],
        correct: [3],
        multipleChoice: false
    },
    {
        id: 42,
        question: "Mit Unterlagen oder Daten der betreuten Kunden ist wie folgt umzugehen:",
        answers: [
            "Ich nehme sie mit nach Hause und sortiere sie dort, denn an meinem Arbeitsplatz habe ich nicht ausreichend Zeit für die Ablage.",
            "Ich gehe mit den Daten vertraulich um und verwende sie ausschließlich im für den ordnungsgemäßen Geschäftsgang erforderlichen Umfang.",
            "Ich kopiere sie und verteile sie an meine Kollegen, damit alle den gleichen Informationsstand haben.",
            "Soweit die Unterlagen aufbewahrt werden müssen, lege ich sie nach Bearbeitung im entsprechenden Kundenordner zugriffsgeschützt ab."
        ],
        correct: [1, 3],
        multipleChoice: true
    },
    {
        id: 43,
        question: "Warum kann es sinnvoll sein, sich für eine Sicherheitskonzeption gemäß der Basis-Absicherung zu entscheiden?",
        answers: [
            "Weil schnell Informationssicherheit umgesetzt werden muss und die Basis-Absicherung hierfür einen geeigneten Einstieg bietet.",
            "Weil Informationssicherheit Schritt für Schritt umgesetzt werden soll. Mittelfristig kann das Sicherheitskonzept nach Standard-Absicherung ausgebaut werden.",
            "Weil die hochwertigen Informationen dringend geschützt werden müssen. Die Basis-Absicherung sorgt für den angemessenen Schutz der \"Kronjuwelen\" einer Institution."
        ],
        correct: [0, 1],
        multipleChoice: true
    },
    {
        id: 44,
        question: "Welche Voraussetzungen müssen für den Erwerb eines ISO/IEC 27001-Zertifikats auf der Basis von BSI IT-Grundschutz erfüllt sein?",
        answers: [
            "Ausschließlich die in einem Audit nachgewiesene Erfüllung der Basis-Anforderungen.",
            "Die durch Sichtung von Dokumenten und Vor-Ort-Prüfungen begründete Feststellung der erfolgreichen Erfüllung der IT-Grundschutz-Anforderungen durch einen zertifizierten Auditor.",
            "Ein positives Resultat bei der Überprüfung des Audit-Berichts durch das BSI.",
            "Die Unterschrift eines zertifizierten internen Auditors unter die Selbsterklärung einer Institution, dass sie die IT-Grundschutz-Anforderungen umfassend erfüllt hat."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 45,
        question: "Welche/n Vorteil/e bietet ein Reifegradmodell für die Bewertung eines ISMS?",
        answers: [
            "Mit einem Reifegradmodell können der Grad der Strukturiertheit und das Maß der systematischen Steuerung eines Prozesses bewertet werden.",
            "Die Anwendung eines Reifegradmodells ist Voraussetzung für den Erwerb eines IT-Grundschutz-Zertifikats.",
            "Ein Reifegradmodell kann auf Teilaspekte des ISMS angewendet werden und Defizite bei einzelnen Prozessen abbilden.",
            "Durch Anwendung eines Reifegradmodells wird eine zentrale Forderung der Norm ISO/IEC 27001 erfüllt."
        ],
        correct: [0, 2],
        multipleChoice: true
    },
    {
        id: 46,
        question: "Der Serverraum ihres Unternehmens besitzt eine Zugangskontrolle mit Videoüberwachung. Um welche Schutzmaßnahme handelt es sich?",
        answers: [
            "Infrastrukturelle Maßnahme",
            "Personelle Maßnahme",
            "Organisatorische Maßnahme",
            "Notfallvorsorgemaßnahme"
        ],
        correct: [0],
        multipleChoice: false
    },
    {
        id: 47,
        question: "Was ist eine Erklärung der Anwendbarkeit (Statement of Applicability, SoA)?",
        answers: [
            "Ein Überblick darüber, was das Militär während des Krieges tun wird.",
            "In der SoA werden die Maßnahmenziele (Control Objectives) und Maßnahmen (Controls), die von einer Organisation festgelegt wurden, aufgezeigt.",
            "Geschäftsberatung durch den CEO."
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 48,
        question: "In Ihrem Unternehmensnetzwerk wurde eine schwerwiegende Sicherheitsbedrohung erkannt. Als ISB/ISO versammeln Sie schnell wichtige Mitglieder des IT-Teams und des Geschäftsbetriebs, um eine Änderung der Sicherheitskontrollen als Reaktion auf die Bedrohung festzulegen. Dies ist ein Beispiel für ...",
        answers: [
            "Änderungsverwaltung.",
            "Geschäftskontinuitätsplanung.",
            "Reaktion auf Sicherheitsvorfälle.",
            "Vordenkerrolle."
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 49,
        question: "Was ist/sind kein/e Schritt/e beim Aufbau eines Informationssicherheitskonzeptes auf der Basis von IT-Grundschutz?",
        answers: [
            "Schutzbedarfsfeststellung",
            "Strukturanalyse",
            "Klassifizierungsrichtlinie"
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 50,
        question: "Ein Unternehmen möchte eine Position als ISB/ISO in der Organisation besetzen. Sie müssen ein ganzheitliches Sicherheitsprogramm definieren und implementieren. Welche der folgenden Qualifikationen und Erfahrungen wären bei einem Kandidaten am wünschenswertesten?",
        answers: [
            "Mehrere Zertifizierungen, starke technische Fähigkeiten und langer Lebenslauf",
            "Branchenzertifizierungen, technische Kenntnisse und Fähigkeiten im Programmmanagement",
            "Hochschulabschluss, Prüfungsfähigkeiten und komplexes Projektmanagement",
            "Mehrere Referenzen, strenge Hintergrundprüfung und Branchenzertifizierungen"
        ],
        correct: [1],
        multipleChoice: false
    },
    {
        id: 51,
        question: "Welche Vorarbeiten erfordert der IT-Grundschutz-Check?",
        answers: [
            "Die Festlegung eines Zeitplans.",
            "Die Auswahl von geeigneten Gesprächspartnern.",
            "Einen Penetrationstest, um Schwachstellen zu identifizieren, die mit den ausgewählten Gesprächspartnern erörtert werden.",
            "Die Zusammenstellung und Lektüre der vorhandenen Dokumente zur Informationssicherheit in dem betrachteten Informationsverbund."
        ],
        correct: [0, 1, 3],
        multipleChoice: true
    },
    {
        id: 52,
        question: "Unter welchen Bedingungen kann der Schutzbedarf eines IT-Systems bezüglich Verfügbarkeit geringer sein als derjenige der Anwendungen, für die es eingesetzt wird?",
        answers: [
            "Wenn der Buchwert des IT-Systems einen zuvor definierten Schwellwert unterschreitet.",
            "Wenn das IT-System nur solche Teile der Anwendungen bedient, die einen geringeren Schutzbedarf haben.",
            "Wenn mindestens ein weiteres redundantes IT-System in Betrieb ist, dass die betreffenden Anwendungen bereitstellen kann.",
            "Wenn die Anwendungen innerhalb der nächsten drei Monate so umstrukturiert werden sollen, dass das betreffende IT-System nicht mehr benötigt wird."
        ],
        correct: [2],
        multipleChoice: false
    },
    {
        id: 53,
        question: "Welche klassischen und wichtigsten Schutzziele werden bei der Schutzbedarfsfeststellung gemäß IT-Grundschutz empfohlen?",
        answers: [
            "Authentizität",
            "Verfügbarkeit",
            "Integrität"
        ],
        correct: [1, 2],
        multipleChoice: true
    }
];

// Quiz-Zustandsverwaltung
let currentQuiz = {
    mode: '',
    questions: [],
    currentIndex: 0,
    userAnswers: {},
    startTime: null,
    endTime: null,
    skippedQuestions: new Set()
};

// Timer-Funktionalität
let timerInterval = null;

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

function initializeQuiz() {
    showModeSelection();
}

// Modi-Auswahl anzeigen
function showModeSelection() {
    hideAllViews();
    document.getElementById('mode-selection').classList.remove('hidden');
}

// Quiz starten
function startQuiz(mode) {
    currentQuiz.mode = mode;
    currentQuiz.startTime = new Date();
    currentQuiz.currentIndex = 0;
    currentQuiz.userAnswers = {};
    currentQuiz.skippedQuestions.clear();

    // Fragen basierend auf Modus auswählen
    switch(mode) {
        case 'random':
            currentQuiz.questions = getRandomQuestions(10);
            break;
        case 'exam':
            currentQuiz.questions = [...questionDatabase];
            break;
        case 'learning':
            currentQuiz.questions = [...questionDatabase];
            break;
    }

    hideAllViews();
    document.getElementById('quiz-interface').classList.remove('hidden');

    setupQuizInterface();
    loadQuestion();
    startTimer();
}

// Fragenkatalog anzeigen
function showCatalog() {
    hideAllViews();
    document.getElementById('catalog-view').classList.remove('hidden');
    renderCatalog();
}

// Zufällige Fragen auswählen
function getRandomQuestions(count) {
    const shuffled = [...questionDatabase].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Quiz-Interface einrichten
function setupQuizInterface() {
    const totalQuestions = currentQuiz.questions.length;

    // Fragen-Navigation erstellen
    const navContainer = document.getElementById('question-nav');
    navContainer.innerHTML = '';

    for(let i = 0; i < totalQuestions; i++) {
        const navBtn = document.createElement('button');
        navBtn.className = 'nav-btn';
        navBtn.textContent = i + 1;
        navBtn.onclick = () => goToQuestion(i);
        navBtn.id = `nav-btn-${i}`;
        navContainer.appendChild(navBtn);
    }

    updateQuestionCounter();
    updateProgress();
}

// Frage laden und anzeigen
function loadQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    if (!question) return;

    document.getElementById('question-text').textContent = question.question;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.onclick = () => selectAnswer(index);

        const inputType = question.multipleChoice ? 'checkbox' : 'radio';
        const inputName = question.multipleChoice ? `question_${question.id}_${index}` : `question_${question.id}`;

        answerDiv.innerHTML = `
            <input type="${inputType}" name="${inputName}" value="${index}" 
                   class="answer-input" id="answer_${question.id}_${index}">
            <label for="answer_${question.id}_${index}" class="answer-label">
                <span class="answer-letter">${String.fromCharCode(97 + index)})</span>
                <span class="answer-text">${answer}</span>
            </label>
        `;

        answersContainer.appendChild(answerDiv);
    });

    // Vorherige Antworten wiederherstellen
    restorePreviousAnswers();
    updateNavigationButtons();
    updateQuestionNavigation();
    updateUnansweredQuestions();
}

// Antwort auswählen
function selectAnswer(answerIndex) {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const questionId = question.id;

    if (question.multipleChoice) {
        if (!currentQuiz.userAnswers[questionId]) {
            currentQuiz.userAnswers[questionId] = [];
        }

        const answerArray = currentQuiz.userAnswers[questionId];
        const existingIndex = answerArray.indexOf(answerIndex);

        if (existingIndex > -1) {
            answerArray.splice(existingIndex, 1);
        } else {
            answerArray.push(answerIndex);
        }

        // Checkbox Status aktualisieren
        const checkbox = document.getElementById(`answer_${questionId}_${answerIndex}`);
        if (checkbox) {
            checkbox.checked = answerArray.includes(answerIndex);
        }
    } else {
        currentQuiz.userAnswers[questionId] = [answerIndex];

        // Radio Button Status aktualisieren
        const radioButtons = document.querySelectorAll(`input[name="question_${questionId}"]`);
        radioButtons.forEach((radio, idx) => {
            radio.checked = (idx === answerIndex);
        });
    }

    updateAnswerDisplay();
    updateNavigationButtons();
    updateQuestionNavigation();
    updateUnansweredQuestions();
}

// Vorherige Antworten wiederherstellen
function restorePreviousAnswers() {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const questionId = question.id;
    const userAnswer = currentQuiz.userAnswers[questionId];

    if (userAnswer && userAnswer.length > 0) {
        userAnswer.forEach(answerIndex => {
            const input = document.getElementById(`answer_${questionId}_${answerIndex}`);
            if (input) {
                input.checked = true;
            }
        });
    }
}

// Antwort-Display aktualisieren
function updateAnswerDisplay() {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const questionId = question.id;
    const userAnswer = currentQuiz.userAnswers[questionId];

    // Alle Answer-Optionen als ausgewählt/nicht ausgewählt markieren
    question.answers.forEach((answer, index) => {
        const answerDiv = document.querySelector(`#answer_${questionId}_${index}`).closest('.answer-option');
        if (userAnswer && userAnswer.includes(index)) {
            answerDiv.classList.add('selected');
        } else {
            answerDiv.classList.remove('selected');
        }
    });
}

// Timer-Funktionen
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!currentQuiz.startTime) return;

    const elapsed = Math.floor((new Date() - currentQuiz.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    document.getElementById('timer').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Navigation zwischen Fragen
function nextQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        loadQuestion();
        updateQuestionCounter();
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        loadQuestion();
        updateQuestionCounter();
        updateProgress();
    }
}

function goToQuestion(index) {
    if (index >= 0 && index < currentQuiz.questions.length) {
        currentQuiz.currentIndex = index;
        loadQuestion();
        updateQuestionCounter();
        updateProgress();
    }
}

function skipQuestion() {
    const questionId = currentQuiz.questions[currentQuiz.currentIndex].id;
    currentQuiz.skippedQuestions.add(questionId);
    nextQuestion();
}

// Navigations-Buttons aktualisieren
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');

    prevBtn.disabled = currentQuiz.currentIndex === 0;
    nextBtn.disabled = currentQuiz.currentIndex === currentQuiz.questions.length - 1;

    if (currentQuiz.currentIndex === currentQuiz.questions.length - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }
}

// Fragen-Navigation aktualisieren
function updateQuestionNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        btn.classList.remove('current', 'answered', 'skipped');

        if (index === currentQuiz.currentIndex) {
            btn.classList.add('current');
        }

        const questionId = currentQuiz.questions[index].id;
        if (currentQuiz.userAnswers[questionId] && currentQuiz.userAnswers[questionId].length > 0) {
            btn.classList.add('answered');
        }

        if (currentQuiz.skippedQuestions.has(questionId)) {
            btn.classList.add('skipped');
        }
    });
}

// Unbeantwortete Fragen aktualisieren
function updateUnansweredQuestions() {
    const unansweredSection = document.getElementById('unanswered-section');
    const unansweredList = document.getElementById('unanswered-list');

    const unanswered = currentQuiz.questions.filter((question, index) => {
        const hasAnswer = currentQuiz.userAnswers[question.id] &&
            currentQuiz.userAnswers[question.id].length > 0;
        return !hasAnswer;
    });

    if (unanswered.length === 0) {
        unansweredSection.style.display = 'none';
    } else {
        unansweredSection.style.display = 'block';
        unansweredList.innerHTML = '';

        unanswered.forEach(question => {
            const questionIndex = currentQuiz.questions.findIndex(q => q.id === question.id);
            const btn = document.createElement('button');
            btn.className = 'unanswered-btn';
            btn.textContent = `Frage ${questionIndex + 1}`;
            btn.onclick = () => goToQuestion(questionIndex);
            unansweredList.appendChild(btn);
        });
    }
}

// Fragen-Zähler aktualisieren
function updateQuestionCounter() {
    const current = currentQuiz.currentIndex + 1;
    const total = currentQuiz.questions.length;
    document.getElementById('question-counter').textContent = `Frage ${current} von ${total}`;
}

// Fortschrittsbalken aktualisieren
function updateProgress() {
    const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

// Quiz beenden
function finishQuiz() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    currentQuiz.endTime = new Date();
    calculateResults();
    showResults();
}

// Quiz wiederholen
function retryQuiz() {
    startQuiz(currentQuiz.mode);
}

// Ergebnisse berechnen
function calculateResults() {
    let correct = 0;
    let total = currentQuiz.questions.length;
    let detailedResults = [];

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = currentQuiz.userAnswers[question.id] || [];
        const isCorrect = arraysEqual(userAnswer.sort(), question.correct.sort());

        if (isCorrect) {
            correct++;
        }

        detailedResults.push({
            questionNumber: index + 1,
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.correct,
            isCorrect: isCorrect,
            answers: question.answers
        });
    });

    const timeSpent = currentQuiz.endTime - currentQuiz.startTime;
    const minutes = Math.floor(timeSpent / 60000);
    const seconds = Math.floor((timeSpent % 60000) / 1000);

    currentQuiz.score = {
        correct: correct,
        wrong: total - correct,
        total: total,
        percentage: Math.round((correct / total) * 100),
        timeSpent: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        skipped: currentQuiz.skippedQuestions.size,
        detailedResults: detailedResults
    };
}

// Ergebnisse anzeigen
function showResults() {
    hideAllViews();
    document.getElementById('results-view').classList.remove('hidden');

    const score = currentQuiz.score;

    // Hauptergebnisse
    document.getElementById('score-percentage').textContent = `${score.percentage}%`;
    document.getElementById('correct-answers').textContent = score.correct;
    document.getElementById('wrong-answers').textContent = score.wrong;
    document.getElementById('total-time').textContent = score.timeSpent;
    document.getElementById('skipped-count').textContent = score.skipped;

    // Feedback basierend auf Ergebnis
    const feedbackElement = document.getElementById('results-feedback');
    let feedbackText = '';
    let feedbackClass = '';

    if (score.percentage >= 90) {
        feedbackText = '🎉 Ausgezeichnet! Sie haben die Prüfung mit sehr gutem Ergebnis bestanden.';
        feedbackClass = 'excellent';
    } else if (score.percentage >= 80) {
        feedbackText = '✅ Sehr gut! Sie haben die Prüfung bestanden.';
        feedbackClass = 'good';
    } else if (score.percentage >= 70) {
        feedbackText = '👍 Bestanden! Ein solides Ergebnis.';
        feedbackClass = 'passed';
    } else if (score.percentage >= 60) {
        feedbackText = '⚠️ Knapp bestanden. Vertiefen Sie Ihr Wissen in den schwächeren Bereichen.';
        feedbackClass = 'barely-passed';
    } else {
        feedbackText = '❌ Nicht bestanden. Wiederholen Sie das Lernmaterial und versuchen Sie es erneut.';
        feedbackClass = 'failed';
    }

    feedbackElement.innerHTML = `<div class="feedback ${feedbackClass}">${feedbackText}</div>`;

    // Detaillierte Ergebnisse
    renderDetailedResults();
}

// Detaillierte Ergebnisse rendern
function renderDetailedResults() {
    const breakdownElement = document.getElementById('results-breakdown');
    const detailedResults = currentQuiz.score.detailedResults;

    breakdownElement.innerHTML = '';

    detailedResults.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;

        const userAnswerText = result.userAnswer.length > 0 ?
            result.userAnswer.map(idx => `${String.fromCharCode(97 + idx)}) ${result.answers[idx]}`).join(', ') :
            'Nicht beantwortet';

        const correctAnswerText = result.correctAnswer.map(idx =>
            `${String.fromCharCode(97 + idx)}) ${result.answers[idx]}`).join(', ');

        resultDiv.innerHTML = `
            <div class="result-header">
                <span class="result-number">Frage ${result.questionNumber}</span>
                <span class="result-status ${result.isCorrect ? 'correct' : 'incorrect'}">
                    ${result.isCorrect ? '✓' : '✗'}
                </span>
            </div>
            <div class="result-question">${result.question}</div>
            <div class="result-answers">
                <div class="user-answer">
                    <strong>Ihre Antwort:</strong> ${userAnswerText}
                </div>
                <div class="correct-answer">
                    <strong>Richtige Antwort:</strong> ${correctAnswerText}
                </div>
            </div>
        `;

        breakdownElement.appendChild(resultDiv);
    });
}

// Katalog rendern
function renderCatalog() {
    const catalogContent = document.getElementById('catalog-content');
    catalogContent.innerHTML = '';

    questionDatabase.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'catalog-question';

        const answersHtml = question.answers.map((answer, index) => {
            const isCorrect = question.correct.includes(index);
            return `
                <div class="catalog-answer ${isCorrect ? 'correct' : ''}">
                    <span class="answer-letter">${String.fromCharCode(97 + index)})</span>
                    <span class="answer-text">${answer}</span>
                    ${isCorrect ? '<span class="correct-indicator">✓</span>' : ''}
                </div>
            `;
        }).join('');

        questionDiv.innerHTML = `
            <div class="catalog-question-header">
                <span class="catalog-question-number">Frage ${question.id}</span>
                <span class="catalog-question-type">
                    ${question.multipleChoice ? 'Mehrfachauswahl' : 'Einfachauswahl'}
                </span>
            </div>
            <div class="catalog-question-text">${question.question}</div>
            <div class="catalog-answers">${answersHtml}</div>
        `;

        catalogContent.appendChild(questionDiv);
    });
}

// Hilfsfunktionen
function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}

function hideAllViews() {
    const views = [
        'mode-selection',
        'quiz-interface',
        'catalog-view',
        'results-view'
    ];

    views.forEach(viewId => {
        const element = document.getElementById(viewId);
        if (element) {
            element.classList.add('hidden');
        }
    });
}

// Loading-Overlay Funktionen
function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

// Keyboard-Navigation
document.addEventListener('keydown', function(event) {
    if (currentQuiz.mode && !document.getElementById('quiz-interface').classList.contains('hidden')) {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                previousQuestion();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextQuestion();
                break;
            case 'Enter':
                if (event.ctrlKey) {
                    event.preventDefault();
                    finishQuiz();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                if (!event.ctrlKey && !event.altKey) {
                    const answerIndex = parseInt(event.key) - 1;
                    const question = currentQuiz.questions[currentQuiz.currentIndex];
                    if (answerIndex < question.answers.length) {
                        event.preventDefault();
                        selectAnswer(answerIndex);
                    }
                }
                break;
        }
    }
});

// Responsive Design Helper
function checkMobileDevice() {
    return window.innerWidth <= 768;
}

// Auto-Save Funktionalität (Optional)
function saveProgress() {
    const progressData = {
        mode: currentQuiz.mode,
        currentIndex: currentQuiz.currentIndex,
        userAnswers: currentQuiz.userAnswers,
        startTime: currentQuiz.startTime,
        skippedQuestions: Array.from(currentQuiz.skippedQuestions)
    };

    localStorage.setItem('quizProgress', JSON.stringify(progressData));
}

function loadProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
        const progressData = JSON.parse(saved);

        // Nur laden wenn weniger als 24 Stunden alt
        const hoursSinceStart = (new Date() - new Date(progressData.startTime)) / (1000 * 60 * 60);
        if (hoursSinceStart < 24) {
            return progressData;
        }
    }
    return null;
}

// Performance Optimierung
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Quiz-Statistiken
function getQuizStatistics() {
    const stats = {
        totalQuestions: questionDatabase.length,
        currentProgress: currentQuiz.currentIndex + 1,
        answeredQuestions: Object.keys(currentQuiz.userAnswers).length,
        skippedQuestions: currentQuiz.skippedQuestions.size,
        timeElapsed: currentQuiz.startTime ?
            Math.floor((new Date() - currentQuiz.startTime) / 1000) : 0
    };

    return stats;
}

// Export/Import Funktionalität (für erweiterte Features)
function exportResults() {
    if (currentQuiz.score) {
        const exportData = {
            mode: currentQuiz.mode,
            score: currentQuiz.score,
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `quiz-ergebnisse-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

// Initialisierung bei DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Prüfe auf gespeicherten Fortschritt
    const savedProgress = loadProgress();
    if (savedProgress) {
        // Zeige Dialog zum Fortsetzen an (optional)
        // Hier könnte ein Bestätigungsdialog implementiert werden
    }

    // Verstecke Loading-Overlay
    hideLoading();

    // Initialisiere Quiz
    initializeQuiz();
});

// Cleanup bei Seitenverlassen
window.addEventListener('beforeunload', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Optional: Fortschritt speichern
    if (currentQuiz.mode && currentQuiz.startTime) {
        saveProgress();
    }
});
