// Metasploitable 2 Documentation - Interactive Functionality (No LocalStorage)
class MetasploitableApp {
    constructor() {
        this.searchData = [];
        this.currentTab = 'home';
        this.init();
    }

    init() {
        this.setupWarningModal();
        this.setupTabNavigation();
        this.setupSearchOverlay();
        this.setupCopyButtons();
        this.setupThemeToggle();
        this.setupKeyboardShortcuts();
        this.buildSearchIndex();
    }

    // Legal Warning Modal
    setupWarningModal() {
        const warningModal = document.getElementById('legalWarning');
        const mainApp = document.getElementById('mainApp');
        const acceptBtn = document.getElementById('acceptWarning');
        const declineBtn = document.getElementById('declineWarning');

        // Always show modal on first load (no storage)
        warningModal.classList.remove('hidden');
        mainApp.classList.add('hidden');

        acceptBtn.addEventListener('click', () => {
            warningModal.classList.add('hidden');
            mainApp.classList.remove('hidden');
            this.showNotification('Willkommen im Metasploitable 2 Labor! Viel Erfolg beim ethischen Hacking.', 'success');
        });

        declineBtn.addEventListener('click', () => {
            document.body.innerHTML = `
                <div style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    background: #000; 
                    color: #39FF14; 
                    font-family: 'Orbitron', monospace;
                    text-align: center;
                    flex-direction: column;
                    gap: 1rem;
                ">
                    <h1>ZUGRIFF VERWEIGERT</h1>
                    <p>Die rechtlichen Bedingungen wurden nicht akzeptiert.</p>
                    <p>Diese Dokumentation ist nur für autorisierte Bildungszwecke verfügbar.</p>
                </div>
            `;
        });
    }

    // Tab Navigation System
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.nav__tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });

        // Handle URL hash for direct linking
        if (window.location.hash) {
            const hashTab = window.location.hash.slice(1);
            if (document.getElementById(hashTab)) {
                this.switchTab(hashTab);
            }
        }

        // Update URL when tab changes
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.tab) {
                this.switchTab(e.state.tab);
            }
        });

        // Default active tab
        document.querySelector('.nav__tab.active').click();
    }

    switchTab(targetTab) {
        // Update active tab button
        document.querySelectorAll('.nav__tab').forEach(tab => tab.classList.remove('active'));
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (targetButton) targetButton.classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById(targetTab);
        if (targetContent) targetContent.classList.add('active');

        // Update URL (hash only)
        window.location.hash = targetTab;
        this.currentTab = targetTab;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Search Overlay
    setupSearchOverlay() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const searchBtn = document.getElementById('searchBtn');
        const closeSearch = document.getElementById('closeSearch');

        const openSearch = () => {
            searchOverlay.classList.remove('hidden');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        };

        const closeSearchOverlay = () => {
            searchOverlay.classList.add('hidden');
            searchInput.value = '';
            searchResults.innerHTML = '';
            document.body.style.overflow = 'auto';
        };

        searchBtn.addEventListener('click', openSearch);
        closeSearch.addEventListener('click', closeSearchOverlay);

        searchOverlay.addEventListener('click', e => {
            if (e.target === searchOverlay) closeSearchOverlay();
        });

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => this.performSearch(e.target.value), 250);
        });

        searchResults.addEventListener('click', (e) => {
            const item = e.target.closest('.search-result');
            if (!item) return;
            const tab = item.dataset.tab;
            const elementId = item.dataset.element;
            closeSearchOverlay();
            this.switchTab(tab);
            setTimeout(() => {
                const el = document.getElementById(elementId);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }

    // Copy buttons
    setupCopyButtons() {
        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('copy-btn')) return;
            const btn = e.target;
            const text = btn.dataset.copy || btn.previousElementSibling.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const old = btn.textContent;
                btn.textContent = 'Kopiert!';
                setTimeout(() => (btn.textContent = old), 2000);
            }).catch(() => {
                alert('Kopieren nicht unterstützt');
            });
        });
    }

    // Theme toggle (fun effect)
    setupThemeToggle() {
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.triggerMatrixEffect();
        });
    }

    triggerMatrixEffect() {
        const chars = '01';
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden';
        document.body.appendChild(container);
        for (let i = 0; i < 60; i++) {
            const span = document.createElement('span');
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            span.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-20px;color:#39FF14;font-family:Share Tech Mono, monospace;font-size:${Math.random()*16+12}px;animation:fall ${Math.random()*3+2}s linear forwards`;
            container.appendChild(span);
            setTimeout(()=>span.remove(),5000);
        }
        if(!document.getElementById('fallAnim')){
            const st=document.createElement('style');st.id='fallAnim';st.textContent='@keyframes fall{to{transform:translateY(100vh);opacity:0}}';document.head.appendChild(st);
        }
        setTimeout(()=>container.remove(),5500);
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('searchBtn').click();}
            if (e.key==='Escape' && !document.getElementById('searchOverlay').classList.contains('hidden')){
                document.getElementById('closeSearch').click();
            }
        });
    }

    // Build simple search index
    buildSearchIndex() {
        this.searchData = Array.from(document.querySelectorAll('h2, h3, h4')).map(el=>({
            title:el.textContent.trim(),
            content: el.parentElement.textContent.trim(),
            tab: el.closest('.tab-content').id,
            element: el.closest('.tab-content').id
        }));
    }

    performSearch(q){
        const res=document.getElementById('searchResults');
        const query=q.toLowerCase();
        if(!query){res.innerHTML='<p class="search-result">Bitte Suchbegriff eingeben</p>';return;}
        const matches=this.searchData.filter(it=>it.title.toLowerCase().includes(query)||it.content.toLowerCase().includes(query)).slice(0,20);
        if(!matches.length){res.innerHTML='<p class="search-result">Keine Ergebnisse</p>';return;}
        res.innerHTML=matches.map(m=>`<div class="search-result" data-tab="${m.tab}" data-element="${m.element}"><h4>${m.title}</h4><p>${m.content.substring(0,120)}...</p></div>`).join('');
    }

    // Placeholder notification (could be enhanced)
    showNotification(msg,type){console.log(msg);} // simplified
}

document.addEventListener('DOMContentLoaded',()=>new MetasploitableApp());