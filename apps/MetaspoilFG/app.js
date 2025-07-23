// app.js – Metasploit Framework 2025 Documentation - Complete Implementation
(() => {
  'use strict';

  /* ---------------- Constants ---------------- */
  const TABS = [
    'historie',
    'erklaerung', 
    'installation',
    'nutzung',
    'module',
    'exploit',
    'auxiliary',
    'payload',
    'post',
    'encoder',
    'workspace',
    'cheatsheet',
    'cloud',
    'container',
    'evasion',
    'sessions',
    'memory',
    'adcs',
    'framework-api',
    'automation',
    'threat-intel',
    'mobile',
    'iot',
    'forensics',
    'compliance',
    'legal'
  ];

  const STORAGE_KEYS = {
    LEGAL_DISMISSED: 'msf-legal-dismissed',
    THEME: 'msf-theme'
  };

  const KEYBOARD_SHORTCUTS = {
    SEARCH: ['Control+k', 'Meta+k'],
    ESCAPE: 'Escape',
    TAB_1: 'Alt+1',
    TAB_2: 'Alt+2',
    TAB_3: 'Alt+3',
    TAB_4: 'Alt+4',
    TAB_5: 'Alt+5',
    TAB_6: 'Alt+6',
    TAB_7: 'Alt+7',
    TAB_8: 'Alt+8',
    TAB_9: 'Alt+9'
  };

  /* -------------- Utility Functions -------------- */
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

  function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getStorageItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('LocalStorage not available:', e);
      return null;
    }
  }

  function setStorageItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }

  /* -------------- Tab Navigation System -------------- */
  function initTabNavigation() {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
      link.addEventListener('click', handleTabClick);
    });

    // Initialize from URL hash or default
    const initialTab = getInitialTab();
    switchToTab(initialTab);
  }

  function handleTabClick(event) {
    event.preventDefault();
    const tabId = event.currentTarget.dataset.tab;
    
    if (tabId && TABS.includes(tabId)) {
      switchToTab(tabId);
    }
  }

  function switchToTab(tabId) {
    if (!TABS.includes(tabId)) {
      console.warn('Invalid tab ID:', tabId);
      return;
    }

    // Hide all tab contents
    TABS.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        section.classList.remove('active');
      }
    });

    // Show target tab content
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update navigation state
    updateTabNavigation(tabId);
    
    // Update URL hash
    updateURLHash(tabId);
  }

  function updateTabNavigation(activeTabId) {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
      if (link.dataset.tab === activeTabId) {
        link.classList.add('active');
        link.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center'
        });
      } else {
        link.classList.remove('active');
      }
    });
  }

  function getInitialTab() {
    const hash = window.location.hash.slice(1);
    if (hash && TABS.includes(hash)) {
      return hash;
    }
    return 'historie'; // Default tab
  }

  function updateURLHash(tabId) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, null, `#${tabId}`);
    } else {
      window.location.hash = tabId;
    }
  }

  /* -------------- Search Functionality -------------- */
  function initSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBtn = document.getElementById('searchBtn');
    const closeBtn = document.getElementById('closeSearch');

    if (!searchOverlay || !searchInput || !searchResults || !searchBtn || !closeBtn) {
      console.error('Search elements not found');
      return;
    }

    // Event listeners
    searchBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', handleOverlayClick);
    
    // Debounced search
    const debouncedSearch = debounce(performSearch, 300);
    searchInput.addEventListener('input', debouncedSearch);

    function openSearch() {
      searchOverlay.classList.add('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
      searchInput.focus();
    }

    function closeSearch() {
      searchOverlay.classList.remove('active');
    }

    function handleOverlayClick(event) {
      if (event.target === searchOverlay) {
        closeSearch();
      }
    }

    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      
      if (query.length < 2) {
        return;
      }

      const results = [];
      
      TABS.forEach(tabId => {
        const section = document.getElementById(tabId);
        if (!section) return;

        const content = section.textContent.toLowerCase();
        const title = section.querySelector('h2')?.textContent || tabId;
        
        if (content.includes(query)) {
          const snippet = createSearchSnippet(section.textContent, query);
          results.push({
            tabId,
            title,
            snippet,
            relevance: calculateRelevance(content, query)
          });
        }
      });

      // Sort by relevance
      results.sort((a, b) => b.relevance - a.relevance);

      displaySearchResults(results, query);
    }

    function createSearchSnippet(text, query) {
      const lowerText = text.toLowerCase();
      const lowerQuery = query.toLowerCase();
      const index = lowerText.indexOf(lowerQuery);
      
      if (index === -1) return '';
      
      const start = Math.max(0, index - 60);
      const end = Math.min(text.length, index + query.length + 60);
      
      let snippet = text.substring(start, end).trim();
      
      // Clean up whitespace
      snippet = snippet.replace(/\s+/g, ' ');
      
      return (start > 0 ? '...' : '') + snippet + (end < text.length ? '...' : '');
    }

    function calculateRelevance(content, query) {
      const matches = (content.match(new RegExp(query, 'gi')) || []).length;
      return matches;
    }

    function displaySearchResults(results, query) {
      if (results.length === 0) {
        searchResults.innerHTML = `
          <div class="search-result-item">
            <p>Keine Ergebnisse für "${sanitizeHTML(query)}" gefunden.</p>
          </div>
        `;
        return;
      }

      const resultsHTML = results.map(result => `
        <div class="search-result-item" data-tab="${result.tabId}">
          <h4>${sanitizeHTML(result.title)}</h4>
          <p>${highlightSearchTerm(sanitizeHTML(result.snippet), query)}</p>
        </div>
      `).join('');

      searchResults.innerHTML = resultsHTML;

      // Add click handlers
      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const tabId = item.dataset.tab;
          switchToTab(tabId);
          closeSearch();
        });
      });
    }

    function highlightSearchTerm(text, term) {
      if (!text || !term) return text;
      
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark style="background: #39FF14; color: #000; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    }

    // Return public methods
    return { openSearch, closeSearch };
  }

  /* -------------- Copy to Clipboard -------------- */
  function initCopyToClipboard() {
    // Use event delegation for better performance
    document.addEventListener('click', handleCopyClick);

    function handleCopyClick(event) {
      if (!event.target.classList.contains('copy-btn')) {
        return;
      }

      const button = event.target;
      const textToCopy = button.getAttribute('data-copy');
      
      if (!textToCopy) {
        console.warn('No text to copy found');
        return;
      }

      copyTextToClipboard(textToCopy, button);
    }

    async function copyTextToClipboard(text, button) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          showCopyFeedback(button, true);
        } else {
          // Fallback for older browsers
          fallbackCopyText(text);
          showCopyFeedback(button, true);
        }
      } catch (error) {
        console.error('Copy failed:', error);
        showCopyFeedback(button, false);
      }
    }

    function fallbackCopyText(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.setAttribute('readonly', '');
      
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed:', err);
        throw err;
      } finally {
        document.body.removeChild(textArea);
      }
    }

    function showCopyFeedback(button, success) {
      const originalText = button.textContent;
      const originalBackground = button.style.backgroundColor;
      const originalColor = button.style.color;
      
      button.textContent = success ? '✓ Kopiert!' : '✗ Fehler';
      button.style.backgroundColor = success ? '#39FF14' : '#FF4444';
      button.style.color = '#000';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBackground;
        button.style.color = originalColor;
      }, 2000);
    }
  }

  /* -------------- Keyboard Shortcuts -------------- */
  function initKeyboardShortcuts() {
    const searchAPI = initSearch();
    
    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
      const key = event.key;
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const isAlt = event.altKey;

      // Search shortcut (Ctrl+K or Cmd+K)
      if (isCtrlOrCmd && key.toLowerCase() === 'k') {
        event.preventDefault();
        if (searchAPI) {
          searchAPI.openSearch();
        }
        return;
      }

      // Escape key
      if (key === 'Escape') {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay && searchOverlay.classList.contains('active')) {
          event.preventDefault();
          if (searchAPI) {
            searchAPI.closeSearch();
          }
        }
        return;
      }

      // Tab navigation shortcuts (Alt+1-9)
      if (isAlt && !isCtrlOrCmd) {
        const num = parseInt(key, 10);
        if (!isNaN(num) && num >= 1 && num <= 9) {
          event.preventDefault();
          const tabIndex = num - 1;
          if (TABS[tabIndex]) {
            switchToTab(TABS[tabIndex]);
          }
        }
      }
    }
  }

  /* -------------- Legal Banner -------------- */
  function initLegalBanner() {
    const banner = document.getElementById('legalNotice');
    const closeBtn = document.getElementById('closeNotice');
    
    if (!banner || !closeBtn) {
      console.warn('Legal banner elements not found');
      return;
    }

    // Check if previously dismissed
    if (getStorageItem(STORAGE_KEYS.LEGAL_DISMISSED) === 'true') {
      banner.style.display = 'none';
      adjustContentPadding(false);
    }

    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      setStorageItem(STORAGE_KEYS.LEGAL_DISMISSED, 'true');
      adjustContentPadding(false);
    });

    function adjustContentPadding(showBanner) {
      const contentWrapper = document.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.style.paddingTop = showBanner ? '60px' : '0';
      }
    }
  }

  /* -------------- Theme Toggle -------------- */
  function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    
    if (!themeBtn) {
      console.warn('Theme toggle button not found');
      return;
    }

    const root = document.documentElement;
    let currentTheme = getStorageItem(STORAGE_KEYS.THEME) || 'dark';
    
    // Apply initial theme
    applyTheme(currentTheme);

    themeBtn.addEventListener('click', toggleTheme);

    function toggleTheme() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      setStorageItem(STORAGE_KEYS.THEME, currentTheme);
    }

    function applyTheme(theme) {
      root.setAttribute('data-color-scheme', theme);
      updateThemeButtonText(theme);
    }

    function updateThemeButtonText(theme) {
      const isDark = theme === 'dark';
      themeBtn.innerHTML = `${isDark ? '☀️' : '🌙'} ${isDark ? 'Light' : 'Dark'} Mode`;
    }
  }

  /* -------------- Hash Navigation -------------- */
  function initHashNavigation() {
    window.addEventListener('hashchange', handleHashChange);

    function handleHashChange() {
      const hash = window.location.hash.slice(1);
      if (hash && TABS.includes(hash)) {
        switchToTab(hash);
      }
    }
  }

  /* -------------- Performance Optimization -------------- */
  function initPerformanceOptimizations() {
    // Lazy load non-critical functionality
    requestIdleCallback(() => {
      initServiceWorker();
      preloadCriticalResources();
    });

    // Optimize scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Scroll-based optimizations can go here
      }, 150);
    }, { passive: true });
  }

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      const swCode = `
        const CACHE_NAME = 'msf-docs-v2025';
        const urlsToCache = [
          './',
          './index.html',
          './style.css',
          './app.js'
        ];

        self.addEventListener('install', (event) => {
          event.waitUntil(
            caches.open(CACHE_NAME)
              .then((cache) => cache.addAll(urlsToCache))
              .catch((error) => console.error('Cache failed:', error))
          );
        });

        self.addEventListener('fetch', (event) => {
          event.respondWith(
            caches.match(event.request)
              .then((response) => {
                return response || fetch(event.request);
              })
              .catch(() => {
                // Fallback for offline
                return caches.match('./index.html');
              })
          );
        });
      `;
      
      const blob = new Blob([swCode], { type: 'text/javascript' });
      const swURL = URL.createObjectURL(blob);
      
      navigator.serviceWorker.register(swURL)
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.warn('Service Worker registration failed:', error);
        });
    }
  }

  function preloadCriticalResources() {
    // Preload Google Fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Share+Tech+Mono:wght@400&family=Orbitron:wght@400;700;900&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  /* -------------- Accessibility Enhancements -------------- */
  function initAccessibility() {
    // Add skip link
    addSkipLink();
    
    // Improve focus management
    improveFocusManagement();
    
    // Add ARIA labels where missing
    addARIALabels();
  }

  function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Zum Hauptinhalt springen';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #39FF14;
      color: #000;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  function improveFocusManagement() {
    // Trap focus in search overlay
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
      searchOverlay.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          trapFocusInOverlay(event, searchOverlay);
        }
      });
    }
  }

  function trapFocusInOverlay(event, overlay) {
    const focusableElements = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function addARIALabels() {
    // Add ARIA labels to tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach((link, index) => {
      link.setAttribute('aria-selected', link.classList.contains('active') ? 'true' : 'false');
      link.setAttribute('tabindex', link.classList.contains('active') ? '0' : '-1');
    });

    // Add ARIA labels to code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach((block, index) => {
      block.setAttribute('aria-label', `Code-Beispiel ${index + 1}`);
    });
  }

  /* -------------- Error Handling -------------- */
  function initErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // Don't break the application
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Don't break the application
    });
  }

  /* -------------- Main Initialization -------------- */
  function initialize() {
    try {
      // Core functionality
      initTabNavigation();
      initCopyToClipboard();
      initKeyboardShortcuts();
      initLegalBanner();
      initThemeToggle();
      initHashNavigation();
      
      // Enhancements
      initAccessibility();
      initPerformanceOptimizations();
      initErrorHandling();
      
      // Mark as loaded
      document.body.classList.add('loaded');
      
      console.log('✅ Metasploit Framework 2025 Documentation initialized successfully');
      
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      // Try to continue with basic functionality
      initTabNavigation();
      initCopyToClipboard();
    }
  }

  /* -------------- DOM Ready Check -------------- */
  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  // Initialize when DOM is ready
  domReady(initialize);

})();