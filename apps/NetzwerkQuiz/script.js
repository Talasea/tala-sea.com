const quizData = [
    // Kategorie: Netzwerkhardware
    {
        category: "Netzwerkhardware",
        question: "Was ist der Hauptunterschied zwischen einem Switch und einem Hub bezüglich der Datenweiterleitung?",
        answers: {
            a: "Ein Hub leitet Daten gezielt weiter, ein Switch sendet an alle Ports.",
            b: "Ein Switch lernt MAC-Adressen und leitet Daten gezielt weiter, ein Hub sendet an alle Ports.",
            c: "Beide leiten Daten nur an den Zielport weiter.",
            d: "Ein Hub arbeitet auf Schicht 3, ein Switch auf Schicht 2."
        },
        correct: ["b"]
    },
    {
        category: "Netzwerkhardware",
        question: "Welches Gerät wird typischerweise verwendet, um verschiedene Netzwerke (z.B. LAN und WAN) miteinander zu verbinden?",
        answers: {
            a: "Hub",
            b: "Switch (Layer 2)",
            c: "Router",
            d: "Repeater"
        },
        correct: ["c"]
    },
    {
        category: "Netzwerkhardware",
        question: "Welche Art von Domäne wird durch einen Router getrennt, aber von einem Switch (Layer 2) nicht?",
        answers: {
            a: "Kollisionsdomäne",
            b: "Broadcast-Domäne",
            c: "MAC-Domäne",
            d: "IP-Domäne"
        },
        correct: ["b"]
    },
    {
        category: "Netzwerkhardware",
        question: "Welche Aussage über Switches ist korrekt?",
        answers: {
            a: "Switches arbeiten immer im Halbduplex-Modus.",
            b: "Jeder Port eines Switches bildet eine eigene Kollisionsdomäne.",
            c: "Switches verwenden IP-Adressen zur Weiterleitung von Frames.",
            d: "Switches sind technologisch veraltet und werden durch Hubs ersetzt."
        },
        correct: ["b"]
    },

    // Kategorie: Netzwerk Grundlagen
    {
        category: "Netzwerk Grundlagen",
        question: "Welches Protokoll auf der Transportschicht (Layer 4) ist verbindungsorientiert und garantiert eine zuverlässige Datenübertragung?",
        answers: {
            a: "UDP",
            b: "IP",
            c: "TCP",
            d: "HTTP"
        },
        correct: ["c"]
    },
    {
        category: "Netzwerk Grundlagen",
        question: "Wofür wird UDP (User Datagram Protocol) typischerweise verwendet?",
        answers: {
            a: "Dateiübertragungen (FTP)",
            b: "Web-Browsing (HTTP)",
            c: "E-Mail (SMTP)",
            d: "Live-Streaming und Online-Spiele"
        },
        correct: ["d"]
    },
    {
        category: "Netzwerk Grundlagen",
        question: "Was ist der Hauptzweck von Portnummern in TCP und UDP?",
        answers: {
            a: "Identifizierung des physischen Geräts im Netzwerk.",
            b: "Adressierung spezifischer Anwendungen oder Dienste auf einem Host.",
            c: "Fehlererkennung während der Übertragung.",
            d: "Festlegung des Übertragungsweges (Routing)."
        },
        correct: ["b"]
    },
    {
        category: "Netzwerk Grundlagen",
        question: "Welche Aussage beschreibt den Hauptunterschied zwischen TCP und UDP bezüglich der Geschwindigkeit?",
        answers: {
            a: "TCP ist schneller, da es verbindungsorientiert ist.",
            b: "UDP ist schneller, da es weniger Overhead hat (verbindungslos, keine garantierte Zustellung).",
            c: "Beide Protokolle haben exakt die gleiche Geschwindigkeit.",
            d: "Die Geschwindigkeit hängt nur von der Netzwerkhardware ab."
        },
        correct: ["b"]
    },
    {
        category: "Netzwerk Grundlagen",
        question: "Welcher Port wird standardmäßig für unverschlüsselte DNS-Anfragen verwendet?",
        answers: {
            a: "Port 80",
            b: "Port 443",
            c: "Port 25",
            d: "Port 53"
        },
        correct: ["d"]
    },

    // Kategorie: OSI Model
    {
        category: "OSI Model",
        question: "Wie viele Schichten hat das OSI-Referenzmodell?",
        answers: {
            a: "4",
            b: "5",
            c: "7",
            d: "8"
        },
        correct: ["c"]
    },
    {
        category: "OSI Model",
        question: "Welche Schicht ist für die logische Adressierung (IP-Adressen) und das Routing verantwortlich?",
        answers: {
            a: "Schicht 2 (Sicherungsschicht)",
            b: "Schicht 3 (Vermittlungsschicht)",
            c: "Schicht 4 (Transportschicht)",
            d: "Schicht 7 (Anwendungsschicht)"
        },
        correct: ["b"]
    },
    {
        category: "OSI Model",
        question: "Auf welcher Schicht findet die Umwandlung von Datenformaten (z.B. ASCII zu EBCDIC) und Verschlüsselung statt?",
        answers: {
            a: "Schicht 4 (Transport)",
            b: "Schicht 5 (Sitzung)",
            c: "Schicht 6 (Darstellung)",
            d: "Schicht 7 (Anwendung)"
        },
        correct: ["c"]
    },
    {
        category: "OSI Model",
        question: "Was ist die Dateneinheit auf der Sicherungsschicht (Layer 2)?",
        answers: {
            a: "Bit",
            b: "Paket",
            c: "Segment",
            d: "Frame"
        },
        correct: ["d"]
    },
    {
        category: "OSI Model",
        question: "Welche Schicht stellt die physische Verbindung und die Übertragung roher Bits sicher?",
        answers: {
            a: "Schicht 1 (Bitübertragung)",
            b: "Schicht 2 (Sicherung)",
            c: "Schicht 3 (Vermittlung)",
            d: "Schicht 4 (Transport)"
        },
        correct: ["a"]
    },

    // Kategorie: Subnetting
    {
        category: "Subnetting",
        question: "Was ist der Hauptzweck von Subnetting?",
        answers: {
            a: "Erhöhung der maximalen Übertragungsgeschwindigkeit.",
            b: "Aufteilung eines großen Netzwerks in kleinere, effizientere Subnetze.",
            c: "Vereinfachung der physischen Verkabelung.",
            d: "Ausschließliche Verwendung von IPv6-Adressen."
        },
        correct: ["b"]
    },
    {
        category: "Subnetting",
        question: "Was gibt die Subnetzmaske an?",
        answers: {
            a: "Die MAC-Adresse des Routers.",
            b: "Die maximale Anzahl von Geräten im gesamten Internet.",
            c: "Welcher Teil einer IP-Adresse den Netzwerkanteil und welcher den Hostanteil darstellt.",
            d: "Die physische Topologie des Netzwerks."
        },
        correct: ["c"]
    },
    {
        category: "Subnetting",
        question: "Was bedeutet die CIDR-Notation /24?",
        answers: {
            a: "Es gibt 24 mögliche Hosts im Netzwerk.",
            b: "Die ersten 24 Bits der IP-Adresse bilden den Netzwerkanteil.",
            c: "Das Netzwerk verwendet 24 verschiedene Router.",
            d: "Die maximale Datenrate beträgt 24 Mbit/s."
        },
        correct: ["b"]
    },
    {
        category: "Subnetting",
        question: "Welche Adresse in einem Subnetz kann NICHT einem Host zugewiesen werden?",
        answers: {
            a: "Die erste gültige Hostadresse.",
            b: "Die letzte gültige Hostadresse.",
            c: "Die Netzwerkadresse und die Broadcast-Adresse.",
            d: "Jede Adresse mit einer geraden Zahl im letzten Oktett."
        },
        correct: ["c"]
    },
    {
        category: "Subnetting",
        question: "Wie viele gültige Hostadressen gibt es in einem Subnetz mit der CIDR-Notation /27?",
        answers: {
            a: "32",
            b: "30",
            c: "64",
            d: "62"
        },
        correct: ["b"]
    },

    // Kategorie: Bits & Bytes
    {
        category: "Bits & Bytes",
        question: "Wie viele Bits enthält ein Byte?",
        answers: {
            a: "1",
            b: "4",
            c: "8",
            d: "16"
        },
        correct: ["c"]
    },
    {
        category: "Bits & Bytes",
        question: "Wofür wird die Einheit 'Mbit/s' (Megabit pro Sekunde) typischerweise verwendet?",
        answers: {
            a: "Messung von Festplattenspeicherplatz.",
            b: "Messung von Arbeitsspeichergröße (RAM).",
            c: "Messung von Netzwerkübertragungsgeschwindigkeiten.",
            d: "Messung der Prozessorleistung."
        },
        correct: ["c"]
    },
    {
        category: "Bits & Bytes",
        question: "Wenn eine Internetverbindung eine Geschwindigkeit von 100 Mbit/s hat, wie hoch ist die theoretische maximale Download-Rate in Megabyte pro Sekunde (MB/s)?",
        answers: {
            a: "100 MB/s",
            b: "800 MB/s",
            c: "12.5 MB/s",
            d: "1.25 MB/s"
        },
        correct: ["c"]
    },
    {
        category: "Bits & Bytes",
        question: "Welches Präfix steht für 1.000.000.000 Bits pro Sekunde?",
        answers: {
            a: "kbit/s (Kilo)",
            b: "Mbit/s (Mega)",
            c: "Gbit/s (Giga)",
            d: "Tbit/s (Tera)"
        },
        correct: ["c"]
    },
    {
        category: "Bits & Bytes",
        question: "Warum ist der tatsächliche Datendurchsatz (Nettodatenrate) oft niedriger als die angegebene Brutto-Datenrate einer Netzwerkverbindung?",
        answers: {
            a: "Weil Bytes größer sind als Bits.",
            b: "Wegen des Overheads durch Protokoll-Header und Steuerinformationen.",
            c: "Weil die Kabelqualität immer schlecht ist.",
            d: "Weil Computer nur im Halbduplex-Modus arbeiten."
        },
        correct: ["b"]
    },

    // Kategorie: Computerarchitektur (NIC & MAC)
    {
        category: "Computerarchitektur",
        question: "Was ist die Hauptfunktion einer Netzwerkkarte (NIC)?",
        answers: {
            a: "Speicherung von Betriebssystemdateien.",
            b: "Berechnung komplexer mathematischer Operationen.",
            c: "Herstellung der physischen Verbindung zum Netzwerkmedium.",
            d: "Anzeige von Grafiken auf dem Monitor."
        },
        correct: ["c"]
    },
    {
        category: "Computerarchitektur",
        question: "Was ist eine MAC-Adresse?",
        answers: {
            a: "Eine logische Adresse, die vom Netzwerkadministrator zugewiesen wird.",
            b: "Eine weltweit eindeutige Hardwareadresse einer Netzwerkkarte.",
            c: "Eine temporäre Adresse für die Internetverbindung.",
            d: "Ein anderer Name für die IP-Adresse."
        },
        correct: ["b"]
    },
    {
        category: "Computerarchitektur",
        question: "Wie viele Bits hat eine Standard-MAC-Adresse?",
        answers: {
            a: "32 Bits",
            b: "48 Bits",
            c: "64 Bits",
            d: "128 Bits"
        },
        correct: ["b"]
    },
    {
        category: "Computerarchitektur",
        question: "Was identifizieren die ersten 24 Bits (OUI) einer MAC-Adresse?",
        answers: {
            a: "Den Benutzer des Geräts.",
            b: "Den Standort des Geräts.",
            c: "Den Hersteller der Netzwerkkarte.",
            d: "Das verwendete Betriebssystem."
        },
        correct: ["c"]
    },
    {
        category: "Computerarchitektur",
        question: "Auf welcher Schicht des OSI-Modells operiert die MAC-Adresse?",
        answers: {
            a: "Schicht 1 (Bitübertragung)",
            b: "Schicht 2 (Sicherung)",
            c: "Schicht 3 (Vermittlung)",
            d: "Schicht 4 (Transport)"
        },
        correct: ["b"]
    },

    // Kategorie: Netzwerk Topologien
    {
        category: "Netzwerk Topologien",
        question: "Welche Topologie verbindet alle Geräte an ein einziges gemeinsames Kabel?",
        answers: {
            a: "Stern",
            b: "Ring",
            c: "Bus",
            d: "Mesh"
        },
        correct: ["c"]
    },
    {
        category: "Netzwerk Topologien",
        question: "Was ist der Hauptvorteil der Sterntopologie gegenüber der Bustopologie?",
        answers: {
            a: "Benötigt weniger Kabel.",
            b: "Ist immun gegen den Ausfall des zentralen Geräts.",
            c: "Der Ausfall eines Endgeräts oder Kabels legt nicht das gesamte Netzwerk lahm.",
            d: "Ist kostengünstiger in der Anschaffung."
        },
        correct: ["c"]
    },
    {
        category: "Netzwerk Topologien",
        question: "Welche Topologie bietet die höchste Ausfallsicherheit und Redundanz, ist aber auch am teuersten und komplexesten?",
        answers: {
            a: "Bus",
            b: "Stern",
            c: "Ring",
            d: "Vollständige Mesh-Topologie (Full Mesh)"
        },
        correct: ["d"]
    },
    {
        category: "Netzwerk Topologien",
        question: "Was ist ein Nachteil der Ringtopologie?",
        answers: {
            a: "Hohe Kollisionsrate.",
            b: "Ausfall eines Geräts oder Kabels kann den gesamten Ring unterbrechen.",
            c: "Sehr einfache Fehlersuche.",
            d: "Geringer Verkabelungsaufwand."
        },
        correct: ["b"]
    },
    {
        category: "Netzwerk Topologien",
        question: "Welche Topologie wird heute am häufigsten in lokalen Netzwerken (LANs) mit Switches verwendet?",
        answers: {
            a: "Bus",
            b: "Ring",
            c: "Stern",
            d: "Mesh"
        },
        correct: ["c"]
    },

    // Kategorie: DNS
    {
        category: "DNS",
        question: "Was ist die Hauptfunktion des Domain Name Systems (DNS)?",
        answers: {
            a: "Verschlüsselung von Datenübertragungen.",
            b: "Übersetzung von Domainnamen in IP-Adressen.",
            c: "Verwaltung von MAC-Adressen.",
            d: "Physische Verbindung von Netzwerkkabeln."
        },
        correct: ["b"]
    },
    {
        category: "DNS",
        question: "Welcher DNS-Servertyp ist für die verbindlichen Einträge einer bestimmten Domain (Zone) verantwortlich?",
        answers: {
            a: "Resolver (Rekursiver Server)",
            b: "Root-Nameserver",
            c: "TLD-Nameserver",
            d: "Autoritativer Nameserver"
        },
        correct: ["d"]
    },
    {
        category: "DNS",
        question: "Welcher DNS-Record-Typ wird verwendet, um einen Hostnamen auf eine IPv4-Adresse abzubilden?",
        answers: {
            a: "AAAA",
            b: "MX",
            c: "CNAME",
            d: "A"
        },
        correct: ["d"]
    },
    {
        category: "DNS",
        question: "Was macht ein CNAME-Record?",
        answers: {
            a: "Gibt den Mailserver für eine Domain an.",
            b: "Erstellt einen Alias, der einen Hostnamen auf einen anderen Hostnamen verweist.",
            c: "Mappt einen Hostnamen auf eine IPv6-Adresse.",
            d: "Speichert Textinformationen für Verifizierungszwecke."
        },
        correct: ["b"]
    },
    {
        category: "DNS",
        question: "Was bestimmt der TTL-Wert (Time To Live) eines DNS-Eintrags?",
        answers: {
            a: "Die maximale Anzahl von Anfragen pro Sekunde.",
            b: "Die geografische Position des Servers.",
            c: "Wie lange eine DNS-Antwort im Cache gespeichert werden darf.",
            d: "Die Priorität des Mailservers."
        },
        correct: ["c"]
    },

    // Kategorie: Domänen
    {
        category: "Domänen",
        question: "Was ist eine Top-Level Domain (TLD)?",
        answers: {
            a: "Der vollständige Name einer Website (z.B. www.beispiel.de).",
            b: "Die Endung einer Domain (z.B..com,.de,.org).",
            c: "Der Name des Unternehmens, das die Domain registriert hat.",
            d: "Die IP-Adresse des Servers."
        },
        correct: ["b"]
    },
    {
        category: "Domänen",
        question: "Was ist der Unterschied zwischen einer gTLD (generische TLD) und einer ccTLD (länderspezifische TLD)?",
        answers: {
            a: "gTLDs sind immer kürzer als ccTLDs.",
            b: "ccTLDs sind einem spezifischen Land zugeordnet (z.B..de), gTLDs sind allgemeiner (z.B..com).",
            c: "Nur ccTLDs können für kommerzielle Websites verwendet werden.",
            d: "gTLDs werden von Regierungen verwaltet, ccTLDs von Unternehmen."
        },
        correct: ["b"]
    },
    {
        category: "Domänen",
        question: "Was ist eine Second-Level Domain (SLD)?",
        answers: {
            a: "Die Domainendung (z.B..com).",
            b: "Der Teil des Domainnamens direkt links von der TLD (z.B. 'beispiel' in beispiel.com).",
            c: "Ein anderer Name für eine Subdomain (z.B. www).",
            d: "Die oberste Ebene in der DNS-Hierarchie."
        },
        correct: ["b"]
    },
    {
        category: "Domänen",
        question: "Wofür werden Subdomains (Third-Level Domains) häufig verwendet?",
        answers: {
            a: "Um die Hauptdomain zu ersetzen.",
            b: "Um verschiedene Bereiche oder Dienste einer Website logisch zu trennen (z.B. shop.beispiel.de).",
            c: "Um die TLD zu definieren.",
            d: "Ausschließlich zur Angabe des Landes."
        },
        correct: ["b"]
    },
    {
        category: "Domänen",
        question: "Was ist ein Fully Qualified Domain Name (FQDN)?",
        answers: {
            a: "Nur der SLD-Teil einer Domain.",
            b: "Nur die TLD.",
            c: "Der vollständige, eindeutige Name eines Hosts im DNS, der alle Ebenen umfasst.",
            d: "Ein Alias für eine IP-Adresse."
        },
        correct: ["c"]
    },

    // Kategorie: Netzwerkkabel
    {
        category: "Netzwerkkabel",
        question: "Welche Ethernet-Kabelkategorie ist der Mindeststandard für Gigabit Ethernet (1 Gbit/s)?",
        answers: {
            a: "Cat5",
            b: "Cat5e",
            c: "Cat3",
            d: "Cat6"
        },
        correct: ["b"]
    },
    {
        category: "Netzwerkkabel",
        question: "Welche Kategorie unterstützt 10 Gbit/s über die volle Distanz von 100 Metern?",
        answers: {
            a: "Cat5e",
            b: "Cat6",
            c: "Cat6a",
            d: "Cat7"
        },
        correct: ["c"]
    },
    {
        category: "Netzwerkkabel",
        question: "Was bedeutet UTP bei Netzwerkkabeln?",
        answers: {
            a: "Ultra Twisted Pair (besonders schnell)",
            b: "Unshielded Twisted Pair (ungeschirmt)",
            c: "Universal Twisted Pair (für alle Geräte)",
            d: "Underground Twisted Pair (für Erdverlegung)"
        },
        correct: ["b"]
    },
    {
        category: "Netzwerkkabel",
        question: "Welcher Steckertyp wird am häufigsten für Ethernet-Twisted-Pair-Kabel verwendet?",
        answers: {
            a: "USB-C",
            b: "BNC",
            c: "RJ11",
            d: "RJ45"
        },
        correct: ["d"]
    },
    {
        category: "Netzwerkkabel",
        question: "Was beschreibt die Bandbreite eines Netzwerkkabels (angegeben in MHz)?",
        answers: {
            a: "Die maximale Länge des Kabels.",
            b: "Die Anzahl der Aderpaare im Kabel.",
            c: "Den Frequenzbereich, den das Kabel unterstützt, was potenziell höhere Geschwindigkeiten ermöglicht.",
            d: "Die Farbe der Kabelummantelung."
        },
        correct: ["c"]
    },

    // Kategorie: Wireshark
    {
        category: "Wireshark",
        question: "Was ist der Hauptzweck von Wireshark?",
        answers: {
            a: "Erstellung von Netzwerkdiagrammen.",
            b: "Konfiguration von Routern und Switches.",
            c: "Analyse und Aufzeichnung von Netzwerkverkehr (Packet Sniffing).",
            d: "Verwaltung von Benutzerkonten im Netzwerk."
        },
        correct: ["c"]
    },
    {
        category: "Wireshark",
        question: "Welche Funktion von Wireshark ermöglicht es, nur bestimmte Arten von Netzwerkverkehr anzuzeigen?",
        answers: {
            a: "Capturing (Aufzeichnung)",
            b: "Decoding (Dekodierung)",
            c: "Filtering (Filterung)",
            d: "Exporting (Exportieren)"
        },
        correct: ["c"]
    },
    {
        category: "Wireshark",
        question: "Kann Wireshark den Netzwerkverkehr aktiv verändern oder Pakete senden?",
        answers: {
            a: "Ja, es ist primär ein Werkzeug zur Netzwerkmanipulation.",
            b: "Nein, es ist ein passives Analysewerkzeug und sendet normalerweise keine Pakete.",
            c: "Nur wenn es im Admin-Modus ausgeführt wird.",
            d: "Nur in drahtlosen Netzwerken."
        },
        correct: ["b"]
    },
    {
        category: "Wireshark",
        question: "Wofür verwenden Netzwerkadministratoren Wireshark häufig?",
        answers: {
            a: "Installation von Betriebssystemen.",
            b: "Fehlersuche bei Netzwerkproblemen und Analyse der Performance.",
            c: "Erstellung von Webseiten.",
            d: "Verwaltung von E-Mail-Servern."
        },
        correct: ["b"]
    },
    {
        category: "Wireshark",
        question: "Was bedeutet es, wenn Wireshark Pakete mit unterschiedlichen Farben anzeigt?",
        answers: {
            a: "Die Farben repräsentieren die geografische Herkunft der Pakete.",
            b: "Die Farben helfen, verschiedene Protokolltypen oder Fehler schnell zu erkennen.",
            c: "Die Farben zeigen die Priorität der Pakete an.",
            d: "Die Farben haben keine spezifische Bedeutung und sind zufällig."
        },
        correct: ["b"]
    },

    // Kategorie: IPv4
    {
        category: "IPv4",
        question: "Wie viele Bits hat eine IPv4-Adresse?",
        answers: {
            a: "16 Bits",
            b: "32 Bits",
            c: "64 Bits",
            d: "128 Bits"
        },
        correct: ["b"]
    },
    {
        category: "IPv4",
        question: "Wie wird eine IPv4-Adresse üblicherweise dargestellt?",
        answers: {
            a: "Als 12 hexadezimale Ziffern.",
            b: "Als vier durch Punkte getrennte Dezimalzahlen (0-255).",
            c: "Als eine lange Binärzahl.",
            d: "Als Domainname."
        },
        correct: ["b"]
    },
    {
        category: "IPv4",
        question: "Welcher der folgenden Adressbereiche ist gemäß RFC 1918 für private Netzwerke reserviert?",
        answers: {
            a: "8.8.8.0 - 8.8.8.255",
            b: "192.168.0.0 - 192.168.255.255",
            c: "203.0.113.0 - 203.0.113.255",
            d: "Alle Adressen, die mit 1 beginnen."
        },
        correct: ["b"]
    },
    {
        category: "IPv4",
        question: "Was ist der Zweck von privaten IP-Adressbereichen?",
        answers: {
            a: "Sie sind schneller als öffentliche IP-Adressen.",
            b: "Sie können im öffentlichen Internet geroutet werden.",
            c: "Sie ermöglichen die Nutzung von Adressen in lokalen Netzwerken, ohne globale Eindeutigkeit zu benötigen und sparen öffentliche Adressen.",
            d: "Sie sind ausschließlich für Regierungsbehörden reserviert."
        },
        correct: ["c"]
    },
    {
        category: "IPv4",
        question: "Welcher Mechanismus wird benötigt, damit Geräte mit privaten IPv4-Adressen auf das öffentliche Internet zugreifen können?",
        answers: {
            a: "DNS (Domain Name System)",
            b: "DHCP (Dynamic Host Configuration Protocol)",
            c: "NAT (Network Address Translation)",
            d: "ARP (Address Resolution Protocol)"
        },
        correct: ["c"]
    },

    // Kategorie: Switches und Hubs (Wiederholung/Vertiefung)
    {
        category: "Switches und Hubs",
        question: "Welches Gerät arbeitet auf Layer 1 und sendet eingehende Signale an alle anderen Ports?",
        answers: {
            a: "Router",
            b: "Switch",
            c: "Hub",
            d: "Firewall"
        },
        correct: ["c"]
    },
    {
        category: "Switches und Hubs",
        question: "Welches Gerät arbeitet auf Layer 2, lernt MAC-Adressen und leitet Frames gezielt weiter?",
        answers: {
            a: "Hub",
            b: "Repeater",
            c: "Switch",
            d: "Modem"
        },
        correct: ["c"]
    },
    {
        category: "Switches und Hubs",
        question: "Was ist eine Kollisionsdomäne?",
        answers: {
            a: "Ein Bereich im Netzwerk, in dem alle Geräte dieselbe IP-Adresse haben.",
            b: "Ein Netzwerksegment, in dem Datenpakete kollidieren können, wenn mehrere Geräte gleichzeitig senden.",
            c: "Ein anderer Name für ein Subnetz.",
            d: "Der physische Bereich, den ein WLAN-Signal abdeckt."
        },
        correct: ["b"]
    },
    {
        category: "Switches und Hubs",
        question: "Wie beeinflusst ein Switch die Kollisionsdomänen im Vergleich zu einem Hub?",
        answers: {
            a: "Ein Switch schafft eine einzige große Kollisionsdomäne, ein Hub mehrere kleine.",
            b: "Ein Hub schafft eine Kollisionsdomäne pro Port, ein Switch eine einzige große.",
            c: "Ein Switch schafft für jeden Port eine separate Kollisionsdomäne, während bei einem Hub alle Ports in einer einzigen sind.",
            d: "Weder Hubs noch Switches beeinflussen Kollisionsdomänen."
        },
        correct: ["c"]
    },
    {
        category: "Switches und Hubs",
        question: "Welcher Kommunikationsmodus wird von modernen Switches typischerweise unterstützt und eliminiert Kollisionen?",
        answers: {
            a: "Halbduplex",
            b: "Simplex",
            c: "Vollduplex",
            d: "Multiplex"
        },
        correct: ["c"]
    }
];
// Quiz-Initialisierung
function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-button');
    const resultsContainer = document.getElementById('results-container');

    renderQuiz();

    submitButton.addEventListener('click', showResults);

    // Quiz nach Kategorien gruppiert anzeigen
    function renderQuiz() {
        const categorizedQuestions = {};
        quizData.forEach((q) => {
            if (!categorizedQuestions[q.category]) {
                categorizedQuestions[q.category] = [];
            }
            categorizedQuestions[q.category].push(q);
        });

        let quizHTML = '';
        let globalIndex = 0;

        for (const category in categorizedQuestions) {
            quizHTML += `<h2>${category}</h2>`;
            categorizedQuestions[category].forEach((questionData) => {
                quizHTML += `
                    <div class="question-block">
                        <div class="question-text">${questionData.question}</div>
                        <div class="answers">
                `;
                for (const key in questionData.answers) {
                    quizHTML += `
                        <div>
                            <input type="checkbox" id="q${globalIndex}_${key}" name="q${globalIndex}" value="${key}">
                            <label for="q${globalIndex}_${key}">${questionData.answers[key]}</label>
                        </div>
                    `;
                }
                quizHTML += `</div></div>`;
                globalIndex++;
            });
        }
        quizContainer.innerHTML = quizHTML;
    }

    // Auswertung und Markierung der Antworten
    function showResults() {
        let correctAnswers = 0;
        let totalQuestions = quizData.length;
        let globalIndex = 0;

        // Vorherige Markierungen entfernen
        document.querySelectorAll('.correct, .incorrect').forEach(el => {
            el.classList.remove('correct', 'incorrect');
        });

        quizData.forEach((questionData, qIdx) => {
            const selected = [];
            for (const key in questionData.answers) {
                const checkbox = document.getElementById(`q${qIdx}_${key}`);
                if (checkbox && checkbox.checked) {
                    selected.push(key);
                }
            }
            // Vergleich: richtige Antworten vs. ausgewählte
            const selectedSorted = selected.slice().sort().join(',');
            const correctSorted = questionData.correct.slice().sort().join(',');
            if (selectedSorted === correctSorted) {
                correctAnswers++;
                // Markiere alle richtigen Antworten grün
                questionData.correct.forEach(key => {
                    const label = document.querySelector(`label[for="q${qIdx}_${key}"]`);
                    if (label) label.parentElement.classList.add('correct');
                });
            } else {
                // Markiere richtige grün, falsch gewählte rot
                for (const key in questionData.answers) {
                    const label = document.querySelector(`label[for="q${qIdx}_${key}"]`);
                    if (!label) continue;
                    if (questionData.correct.includes(key)) {
                        label.parentElement.classList.add('correct');
                    } else if (selected.includes(key)) {
                        label.parentElement.classList.add('incorrect');
                    }
                }
            }
        });

        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        resultsContainer.innerHTML = `
            <p>Du hast ${correctAnswers} von ${totalQuestions} Fragen richtig beantwortet (${percentage}%).</p>
        `;
        submitButton.disabled = true;
        submitButton.textContent = 'Quiz abgeschlossen';
    }
}

// Initialisierung nach DOM-Load
document.addEventListener('DOMContentLoaded', initializeQuiz);

