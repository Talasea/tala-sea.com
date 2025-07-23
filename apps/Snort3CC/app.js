// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const navMenus = document.querySelectorAll('.nav-menu');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');

// State Management
let currentTab = 'kali';
let isLightMode = false;
let isMobileMenuOpen = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateActiveNavigation();
});

// Initialize Application
function initializeApp() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
    
    // Set initial tab
    showTab('kali');
    
    // Initialize Prism.js for syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            showTab(tabName);
        });
    });
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            updateActiveNavLink(link);
            
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Search functionality
    searchToggle.addEventListener('click', toggleSearch);
    searchClose.addEventListener('click', toggleSearch);
    searchInput.addEventListener('input', handleSearch);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen && !sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Scroll spy for navigation
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Search with Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearchEnter();
        }
    });
}

// Tab Management
function showTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        }
    });
    
    // Update tab content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName + 'Content') {
            content.classList.add('active');
        }
    });
    
    // Update navigation menu
    navMenus.forEach(menu => {
        menu.classList.add('hidden');
        if (menu.id === tabName + 'Nav') {
            menu.classList.remove('hidden');
        }
    });
    
    // Clear search results when switching tabs
    clearSearchResults();
    
    // Update active navigation after tab switch
    setTimeout(updateActiveNavigation, 100);
}

// Navigation Management
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(clickedLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

function updateActiveNavigation() {
    const activeTabContent = document.querySelector('.tab-content.active');
    if (!activeTabContent) return;
    
    const sections = activeTabContent.querySelectorAll('section');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    let activeSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = section;
        }
    });
    
    if (activeSection) {
        const activeId = activeSection.id;
        const currentNavMenu = document.getElementById(currentTab + 'Nav');
        
        if (currentNavMenu) {
            const navLinks = currentNavMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + activeId) {
                    link.classList.add('active');
                }
            });
        }
    }
}

// Search Functionality - Fixed to search only active tab content
function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        clearSearchResults();
    }
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        clearSearchResults();
        return;
    }
    
    // Search only in active tab content
    searchInActiveContent(query);
}

function searchInActiveContent(query) {
    const activeContent = document.querySelector('.tab-content.active');
    if (!activeContent) return;
    
    const sections = activeContent.querySelectorAll('section');
    
    // Remove previous highlights
    clearSearchResults();
    
    let hasResults = false;
    let firstResult = null;
    
    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        if (textContent.includes(query)) {
            highlightSearchResult(section, query);
            hasResults = true;
            if (!firstResult) {
                firstResult = section;
            }
        }
    });
    
    if (hasResults && firstResult) {
        // Scroll to first result
        setTimeout(() => {
            scrollToSection(firstResult.id);
        }, 100);
    } else {
        showNoResultsMessage();
    }
}

function highlightSearchResult(section, query) {
    section.style.border = '2px solid #64b5ff';
    section.style.backgroundColor = isLightMode ? '#f0f8ff' : '#1a365d';
    section.style.transition = 'all 0.3s ease';
}

function clearSearchResults() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.border = '';
        section.style.backgroundColor = '';
        section.style.transition = '';
    });
}

function showNoResultsMessage() {
    console.log('Keine Suchergebnisse im aktuellen Bereich gefunden');
}

function handleSearchEnter() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
        const activeContent = document.querySelector('.tab-content.active');
        const sections = activeContent.querySelectorAll('section');
        
        for (let section of sections) {
            if (section.textContent.toLowerCase().includes(query)) {
                scrollToSection(section.id);
                break;
            }
        }
    }
}

// Theme Management
function toggleTheme() {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode');
    
    // Update theme toggle button
    themeToggle.textContent = isLightMode ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    // Update Prism.js theme if needed
    updatePrismTheme();
}

function updatePrismTheme() {
    const prismLink = document.querySelector('link[href*="prism"]');
    if (prismLink) {
        if (isLightMode) {
            prismLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism.min.css';
        } else {
            prismLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css';
        }
    }
}

// Mobile Menu Management
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    sidebar.classList.toggle('mobile-open');
    mobileMenuToggle.textContent = isMobileMenuOpen ? '✕' : '☰';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
}

// Copy to Clipboard Functionality - Fixed with proper feedback
function copyToClipboard(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.querySelector('code');
    const textToCopy = code ? code.textContent : codeBlock.textContent;
    
    // Show immediate feedback
    const originalText = button.textContent;
    button.textContent = 'Kopiere...';
    button.disabled = true;
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopySuccess(button, originalText);
        }).catch(err => {
            console.error('Clipboard API failed:', err);
            fallbackCopyToClipboard(textToCopy, button, originalText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(textToCopy, button, originalText);
    }
}

function showCopySuccess(button, originalText) {
    button.textContent = 'Kopiert!';
    button.classList.add('copied');
    button.style.backgroundColor = '#48bb78';
    button.style.color = '#ffffff';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
        button.disabled = false;
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 2000);
}

function fallbackCopyToClipboard(text, button, originalText) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showCopySuccess(button, originalText);
        } else {
            showCopyError(button, originalText);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyError(button, originalText);
    }
}

function showCopyError(button, originalText) {
    button.textContent = 'Fehler!';
    button.style.backgroundColor = '#ff4444';
    button.style.color = '#ffffff';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 2000);
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
    
    // Ctrl/Cmd + D for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Escape to close search or mobile menu
    if (e.key === 'Escape') {
        if (searchBar.classList.contains('active')) {
            toggleSearch();
        } else if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Tab switching with Alt + 1/2
    if (e.altKey && e.key === '1') {
        e.preventDefault();
        showTab('kali');
    }
    
    if (e.altKey && e.key === '2') {
        e.preventDefault();
        showTab('ubuntu');
    }
}

// Utility Functions
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Enhanced Search with Highlighting
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Performance Optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth Scrolling Polyfill for older browsers
function smoothScrollTo(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        element.scrollTop = start + change * easeInOutQuad(progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Service Worker Registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can register a service worker here if needed
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Print Functionality
function printPage() {
    window.print();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showTab,
        toggleTheme,
        copyToClipboard,
        scrollToSection,
        handleSearch
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Global functions for HTML onclick events
window.copyToClipboard = copyToClipboard;
window.showTab = showTab;
window.toggleTheme = toggleTheme;
window.printPage = printPage;