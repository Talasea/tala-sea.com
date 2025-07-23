document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileToggle();
    initNavigation();
    initExpandableSections();
    initProgressTracking();
    initSearchFunctionality();
    initScrollToTop();
    initAccessibility();
    
    console.log('Netzwerk-Lernplattform successfully initialized!');
});

/**
 * Initialize mobile sidebar toggle
 */
function initMobileToggle() {
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (!mobileToggle || !sidebar) return;
    
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        
        // Update icon
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
                sidebar.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile sidebar
                    const sidebar = document.getElementById('sidebar');
                    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                        const mobileToggle = document.getElementById('mobileToggle');
                        if (mobileToggle) {
                            const icon = mobileToggle.querySelector('i');
                            icon.className = 'fas fa-bars';
                        }
                    }
                }
            }
        });
    });
    
    // Handle scroll spy
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update active navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavigation();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateActiveNavigation();
}

/**
 * Initialize expandable sections
 */
function initExpandableSections() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Close section
                this.classList.remove('active');
                content.classList.remove('active');
                content.style.display = 'none';
            } else {
                // Open section
                this.classList.add('active');
                content.classList.add('active');
                content.style.display = 'block';
                
                // Smooth scroll to section if needed
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    if (rect.top < 0) {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            }
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Auto-expand first section in each content area
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const firstExpandButton = section.querySelector('.expand-btn');
        if (firstExpandButton) {
            setTimeout(() => {
                firstExpandButton.click();
            }, 100);
        }
    });
}

/**
 * Initialize progress tracking
 */
function initProgressTracking() {
    const checkboxes = document.querySelectorAll('.progress-checkbox');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!progressFill || !progressText) return;
    
    // Handle checkbox changes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgressBar();
        });
    });
    
    function updateProgressBar() {
        const totalSections = checkboxes.length;
        const completedSections = document.querySelectorAll('.progress-checkbox:checked').length;
        const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
        
        // Update progress bar with animation
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '% abgeschlossen';
        
        // Add visual feedback
        progressFill.style.transition = 'width 0.5s ease-in-out';
        
        // Change color based on progress
        if (percentage >= 100) {
            progressFill.style.backgroundColor = 'var(--color-success)';
        } else if (percentage >= 50) {
            progressFill.style.backgroundColor = 'var(--color-primary)';
        } else {
            progressFill.style.backgroundColor = 'var(--color-primary)';
        }
    }
    
    // Initial progress bar update
    updateProgressBar();
}

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (!searchInput) return;
    
    // Debounced search function
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.toLowerCase().trim());
        }, 300);
    });
    
    function performSearch(query) {
        if (!query) {
            // Show all sections
            contentSections.forEach(section => {
                section.style.display = 'block';
                // Reset highlights
                removeHighlights(section);
            });
            return;
        }
        
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const title = section.querySelector('h1, h2')?.textContent.toLowerCase() || '';
            
            if (text.includes(query) || title.includes(query)) {
                section.style.display = 'block';
                highlightMatches(section, query);
            } else {
                section.style.display = 'none';
                removeHighlights(section);
            }
        });
    }
    
    function highlightMatches(element, query) {
        removeHighlights(element);
        
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script and style elements
                    if (node.parentNode.tagName === 'SCRIPT' || 
                        node.parentNode.tagName === 'STYLE' ||
                        node.parentNode.classList.contains('highlight')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
            
            if (regex.test(text)) {
                const highlightedText = text.replace(regex, '<mark class="highlight">$1</mark>');
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    }
    
    function removeHighlights(element) {
        const highlights = element.querySelectorAll('mark.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Clear search on escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            performSearch('');
        }
    });
}

/**
 * Initialize scroll to top functionality
 */
function initScrollToTop() {
    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleScrollToTop() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }
    
    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                toggleScrollToTop();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    toggleScrollToTop();
}

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Zum Hauptinhalt springen';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 2000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Skip if user is typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowDown':
            case 'j':
                e.preventDefault();
                navigateToNextSection();
                break;
            case 'ArrowUp':
            case 'k':
                e.preventDefault();
                navigateToPreviousSection();
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
    });
    
    function navigateToNextSection() {
        const currentSection = getCurrentSection();
        const allSections = document.querySelectorAll('.content-section');
        const currentIndex = Array.from(allSections).indexOf(currentSection);
        
        if (currentIndex < allSections.length - 1) {
            const nextSection = allSections[currentIndex + 1];
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function navigateToPreviousSection() {
        const currentSection = getCurrentSection();
        const allSections = document.querySelectorAll('.content-section');
        const currentIndex = Array.from(allSections).indexOf(currentSection);
        
        if (currentIndex > 0) {
            const prevSection = allSections[currentIndex - 1];
            prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function getCurrentSection() {
        const sections = document.querySelectorAll('.content-section');
        const scrollPosition = window.scrollY + 100;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                return section;
            }
        }
        
        return sections[0];
    }
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window && 'timing' in performance) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    });
}

/**
 * Initialize error handling
 */
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

/**
 * Utility functions
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialize responsive features
 */
function initResponsiveFeatures() {
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts after orientation change
            const activeSection = document.querySelector('.nav-link.active');
            if (activeSection) {
                const href = activeSection.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetElement = document.getElementById(href.substring(1));
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        }, 100);
    });
    
    // Handle viewport changes
    function handleViewportChange() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    handleViewportChange();
    window.addEventListener('resize', throttle(handleViewportChange, 100));
}

/**
 * Initialize theme handling
 */
function initThemeHandling() {
    // Detect system theme preference
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            applyTheme(e.matches ? 'dark' : 'light');
        });
    }
    
    // Apply initial theme
    applyTheme(getSystemTheme());
}

/**
 * Initialize additional features on DOM ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initPerformanceMonitoring();
    initErrorHandling();
    initResponsiveFeatures();
    initThemeHandling();
});

/**
 * Initialize service worker (if available)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added here for offline functionality
        console.log('Service Worker support detected');
    });
}

/**
 * Export functions for testing (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileToggle,
        initNavigation,
        initExpandableSections,
        initProgressTracking,
        initSearchFunctionality,
        debounce,
        throttle
    };
}