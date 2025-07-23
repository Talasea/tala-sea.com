const net = require('net');
const os = require('os');
const https = require('https');
const { execSync } = require('child_process');

class NetworkSecurityScanner {
    constructor() {
        this.scanResults = [];
        this.commonPorts = [21, 22, 80, 443, 8080];
        this.vulnerablePorts = [21, 23, 135, 445];
    }

    async startScan() {
        try {
            await this.scanNetwork();
            await this.performPortScan();
            await this.checkSecurityHeaders();
            this.generateReport();
        } catch (error) {
            console.error('Scan error:', error);
        }
    }

    getLocalIPs() {
        const interfaces = os.networkInterfaces();
        return Object.values(interfaces)
            .flat()
            .filter(details => details.family === 'IPv4' && !details.internal)
            .map(details => details.address);
    }

    async scanNetwork() {
        const localIPs = this.getLocalIPs();
        for (const ip of localIPs) {
            const network = ip.substring(0, ip.lastIndexOf('.') + 1);
            await this.scanIPRange(network);
        }
    }

    async scanIPRange(network) {
        const promises = [];
        for (let i = 1; i <= 254; i++) {
            const target = network + i;
            promises.push(this.pingHost(target));
        }

        const results = await Promise.all(promises);
        results.forEach((isAlive, index) => {
            if (isAlive) {
                const ip = network + (index + 1);
                this.scanResults.push({ type: 'host', ip, status: 'active' });
            }
        });
    }

    pingHost(host) {
        return new Promise((resolve) => {
            const socket = new net.Socket();
            socket.setTimeout(500);

            socket.on('connect', () => {
                socket.destroy();
                resolve(true);
            });

            socket.on('timeout', () => {
                socket.destroy();
                resolve(false);
            });

            socket.on('error', () => {
                resolve(false);
            });

            socket.connect(80, host);
        });
    }

    async performPortScan() {
        const hosts = this.scanResults.filter(r => r.type === 'host');
        for (const host of hosts) {
            const openPorts = [];
            for (const port of this.commonPorts) {
                const isOpen = await this.scanPort(host.ip, port);
                if (isOpen) {
                    openPorts.push({
                        port,
                        status: 'open',
                        vulnerable: this.vulnerablePorts.includes(port)
                    });
                }
            }
            this.scanResults.push({
                type: 'portscan',
                host: host.ip,
                ports: openPorts
            });
        }
    }

    scanPort(host, port) {
        return new Promise((resolve) => {
            const socket = new net.Socket();
            socket.setTimeout(1000);

            socket.on('connect', () => {
                socket.destroy();
                resolve(true);
            });

            socket.on('timeout', () => {
                socket.destroy();
                resolve(false);
            });

            socket.on('error', () => {
                resolve(false);
            });

            socket.connect(port, host);
        });
    }

    async checkSecurityHeaders() {
        const targets = [
            'https://google.com',
            'https://github.com',
            'https://example.com'
        ];

        for (const url of targets) {
            const headers = await this.getHeaders(url);
            const securityHeaders = this.analyzeHeaders(headers);
            this.scanResults.push({
                type: 'security',
                url,
                headers: securityHeaders
            });
        }
    }

    getHeaders(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                resolve(res.headers);
            }).on('error', reject);
        });
    }

    analyzeHeaders(headers) {
        const required = [
            'strict-transport-security',
            'content-security-policy',
            'x-frame-options',
            'x-content-type-options'
        ];

        return {
            present: required.filter(h => headers[h]),
            missing: required.filter(h => !headers[h])
        };
    }

    generateReport() {
        console.log('=== Security Scan Report ===');
        console.log('Discovered Hosts:');
        this.scanResults
            .filter(r => r.type === 'host')
            .forEach(host => {
                console.log(`- ${host.ip} (${host.status})`);
            });

        console.log('\nOpen Ports:');
        this.scanResults
            .filter(r => r.type === 'portscan')
            .forEach(scan => {
                console.log(`Host: ${scan.host}`);
                scan.ports.forEach(port => {
                    console.log(`  Port ${port.port}: ${port.status} ${
                        port.vulnerable ? '(VULNERABLE)' : ''
                    }`);
                });
            });

        console.log('\nSecurity Header Analysis:');
        this.scanResults
            .filter(r => r.type === 'security')
            .forEach(scan => {
                console.log(`URL: ${scan.url}`);
                console.log('  Present Headers:', scan.headers.present.join(', '));
                console.log('  Missing Headers:', scan.headers.missing.join(', '));
            });
    }
}

// Scan durchführen
const scanner = new NetworkSecurityScanner();
scanner.startScan();
<!DOCTYPE html>
<html lang="de">```ead>
    <meta charset="```-8">
<meta name="```wport" content="width=device-width, initial-scale=1.0">
    <title>D```O Interaktives Web-Tool</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://```js.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css```    <meta name="description" content```SGVO Datenschutz-Beauftragter Kompakt-Seminar - Interaktives Web-Tool">
</head>
<body>
<div class="app-container">
    ```- Hauptnavigation -->
    <header class="main```ader">
        <div class="logo">```              <h1>DSGVO Interaktives Web-Tool</h1>
            <p>``` Akademie Schwaben - CloudCommand 24-6</p>
            ```iv>
            <nav class="main```v">
                <ul>
                    ``` <li><a href="#"```ta-view="presentation"```ass="active">Präsentation</a></li>```                  <li><a href="#"```ta-view="chapters">Kapitel```rsicht</a></li>
            ```><a href="#" data-view="essentials">Essentials</a></li```                   <li><a href="#```ata-view="links">Links</a>```i>
                </ul>
            ```av>
            <div class="search-container```                <input type="text" id="search```put" placeholder="Suche in```lien...">
        <button id="search```tton"><i class="fas fa-search"></i```button>
</div>
```eader>

<!-- Hauptinhalt```ntainer -->
<main class="main-content">
    <!-- Präsentationsansicht -->
    ```ction id="presentation-view" class="view```tive">
    <div class="presentation-controls">
        <button id="prev-slide" title="Vorherige Folie">```class="fas fa-chevron-left"></i></button>
    <div```ass="slide-info">
    ```an id="current-slide">1</span> / <span id="total-slides">364</span>
</div```                   <button id="next-slide" title="Nächste Fo```"><i class="fas fa-chevron-right"></i></button>
```tton id="fullscreen-toggle" title="```lbild"><i class="fas fa-expand"></i></button>
</div```
<div class="```de-container">
<div i```slide-content" class="slide">```                      <h2 id="slide-title">Lade Präsentation...```2>
<div id="slide-body">
    <p>Die Inhalte werden```laden...</p>
                        </div>```                  </div>
</div```
<div class="chapter```dicator">
<span id="current```apter">Kapitel: -</span>
    ```iv>
            </section>

            <!-- Kapitelübersicht -->
            ```ction id="chapters-view" class="view">
<h```apitelübersicht</h2>
                <div class="chapters-container"```="chapters-list">
    <!-- Kapitel werden```r JavaScript geladen -->
                </div>```          </section>

<!-- Essentials```sicht -->
<section id="```entials-view" class="view">```              <h2>DSGVO Ess```ials</h2>
    <p class="view```scription">Die wichtigsten Kern```kte der DSGVO im Überblick.```>

        <div class="```entials-filter">
            ```bel for="category-filter">Fil```n nach Kategorie:</label>
        ``` <select id="category-filter">```                      <option value="all">Alle```tegorien</option>
            <!-- Kategorien werden per JavaScript geladen -->
        </select>
    </div>```
    <div class="essentials```ntainer" id="essentials-list">
        ```- DSGVO Essentials werden per JavaScript gel```n -->
    </div>
    ```ection>

    <!-- Links-Ansicht -->
    <section id="links-view" class="view">
        <h2>DSGVO-Referenzen un```inks</h2>
        <p class="view-description```ichtige Referenzen,```setzestexte und weiterführende Links.```>

                <div class="```ks-container">
        <div```ass="links-category">
        ```>Gesetzestexte</h3>
    <ul>```                          <li><a href="```ps://eur-lex.europa.eu/legal-content/DE/```/HTML/?uri=CELEX:32016R0679" target="_blank">EU```GVO - Volltext (eur-lex.europa.eu)</a></li>
        ```         <li><a href="https://www```setze-im-internet.de/b```_2018/" target="_blank">```G - Bundesdatenschutz```etz (gesetze-im-internet.de)</a></li>
        <li>```href="https://eur-lex.europa.eu/legal-content/DE/```/HTML/?uri=CELEX:32023R1689" target="_blank">```AI Act (eur-lex.europa.eu)</a></li>```                      </ul>
</div```
<div class```inks-category">
<h```ufsichtsbehörden</h3>
<ul```                           <li><a href="```ps://www.bfdi.bund.de/" target="_blank">Bundes```uftragter für Datenschutz (BfDI)</a></li>
                ```         <li><a href="https://e```.europa.eu/edpb_de" target="_blank">Europäischer Dat```chutzausschuss (EDPB)</a></li>
                            <li><a href```ttps://www.datenschutz```ferenz-online.de/" target="_```nk">Datenschutzkonferenz (DSK)</a></li>
    </ul>
</div>```                  
                    <div class="```ks-category">
<h3>Hilfreiche Ressourcen</h3>
<ul>
    ```><a href="https://www.lda.bayern.de```/kleine-unternehmen.html" target="_blank">Handreich```en für kleine Unternehmen (LDA Bayern)</a></li>
<li``` href="https://www.gd```e/downloads/praxishilfen" target="_blank">Praxishilfen```r GDD</a></li```                           <li><a href="```ps://www.bsi.bund.de/DE/Themen/Un```nehmen-und-Organisationen```andards-und-Zertifizierung/```Grundschutz/it-grundschutz_node.html" target```blank">BSI IT-Grundschu```/a></li>
    ```l>
                    </div>
                ```iv>
</section>

    ```- Suchergebnisse Ansicht -->
            ```ction id="search-results-view" class="view">
    <h2>Suchergebnisse</h2>
<p id="search-query"></p>
<div i```search-results-container"></div>```              <button id="close-search" class```utton">Zurück zur Prä```tation</button>
            </section>```      </main>

<!-- Statusleiste -->
<footer class="app```oter">
    <div class="footer-info">
        <span>```VO Datenschutz-Beauftragter Kompakt-Seminar</span>
        <span>No```999TDFE25A</span>
    </div>
    ```v class="footer-credits">
    <span```2025 IHK Akademie Schwaben</span>
    ```iv>
        </footer>
    </div>

    <!-- Modal für Slide```tail-Ansicht -->
<div i```slide-modal" class="modal">
        <div class```odal-content">
<span class```lose-modal">&times;</span>
            <h```d="modal-slide-title"></h2>
<div id="modal-slide-content"></div>
</div>
</div>

<script src="script.```></script>
</body>
</html>
