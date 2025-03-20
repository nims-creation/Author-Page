/**
 * Main JavaScript file for Author Website
 * Author: Your Name
 * Version: 1.0
 */

// Wrap everything in an IIFE to avoid global scope pollution
(function() {
    'use strict';
    
    // DOM Elements
    const DOM = {
        header: document.querySelector('header'),
        hamburger: document.querySelector('.hamburger'),
        nav: document.querySelector('nav ul'),
        newsletterForms: document.querySelectorAll('.newsletter-form'),
        contactForm: document.querySelector('.contact-form'),
        excerptToggles: document.querySelectorAll('.excerpt-toggle'),
        faqItems: document.querySelectorAll('.faq-item'),
        cookieConsent: document.getElementById('cookieConsent'),
        acceptCookies: document.getElementById('acceptCookies'),
        cookieSettings: document.getElementById('cookieSettings'),
        yearElement: document.getElementById('year')
    };
    
    // Initialize the application
    function init() {
        setupEventListeners();
        handleScrollEffects();
        setupAnimations();
        handleCookieConsent();
        updateCopyrightYear();
        setupThemePreferences();
        setupFontSizeAdjustment();
        setupParallax();
        setupTiltEffect();
        setupPageTurnEffect();
        setupLayeredBackgroundParallax();
        setupThemeToggle();
        setupStickyHeader();
        setupMobileNav();
        setupEnhancedButtons();
        setupEnhancedSections();
        handleMissingImages();
        addInnerPageClass();
        setupStoryInteractions();
        initPressPage();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Header scroll effect
        window.addEventListener('scroll', handleScrollEffects);
        
        // Mobile navigation
        if (DOM.hamburger) {
            DOM.hamburger.addEventListener('click', toggleMobileNav);
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (DOM.nav && DOM.nav.classList.contains('active') && 
                    !event.target.closest('nav') && 
                    !event.target.closest('.hamburger')) {
                    closeMobileNav();
                }
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });
        
        // Newsletter forms
        DOM.newsletterForms.forEach(form => {
            form.addEventListener('submit', handleNewsletterSubmit);
        });
        
        // Contact form
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', handleContactSubmit);
        }
        
        // Book excerpt toggles
        DOM.excerptToggles.forEach(toggle => {
            toggle.addEventListener('click', toggleExcerpt);
        });
        
        // FAQ accordion
        DOM.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', toggleFAQ);
            }
        });
        
        // Cookie consent
        if (DOM.acceptCookies) {
            DOM.acceptCookies.addEventListener('click', acceptAllCookies);
        }
        
        if (DOM.cookieSettings) {
            DOM.cookieSettings.addEventListener('click', openCookieSettings);
        }
    }
    
    // Handle scroll effects
    function handleScrollEffects() {
        if (window.scrollY > 50) {
            DOM.header.classList.add('scrolled');
        } else {
            DOM.header.classList.remove('scrolled');
        }
        
        // Animate elements when they come into view
        animateOnScroll();
    }
    
    // Toggle mobile navigation
    function toggleMobileNav() {
        DOM.nav.classList.toggle('active');
        DOM.hamburger.classList.toggle('active');
    }
    
    // Close mobile navigation
    function closeMobileNav() {
        DOM.nav.classList.remove('active');
        DOM.hamburger.classList.remove('active');
    }
    
    // Smooth scroll for anchor links
    function smoothScroll(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
            closeMobileNav();
        }
    }
    
    // Handle newsletter form submission
    function handleNewsletterSubmit(e) {
            e.preventDefault();
            
            // Get form data
        const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const email = formObject.email;
            
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
        this.classList.add('loading');
            
            setTimeout(() => {
            this.classList.remove('loading');
            this.reset();
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                
                // You would typically send this data to your server or newsletter service
                console.log('Newsletter subscription:', formObject);
            }, 1500);
    }
    
    // Handle contact form submission
    function handleContactSubmit(e) {
            e.preventDefault();
            
            // Get form data
        const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
        this.classList.add('loading');
            
            setTimeout(() => {
            this.classList.remove('loading');
            this.reset();
                showNotification('Your message has been sent successfully!', 'success');
                
                // You would typically send this data to your server
                console.log('Contact form submission:', formObject);
            }, 1500);
    }
    
    // Toggle book excerpt
    function toggleExcerpt(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetExcerpt = document.querySelector(targetId);
            
            if (targetExcerpt) {
                targetExcerpt.classList.toggle('visible');
                
                if (targetExcerpt.classList.contains('visible')) {
                    this.textContent = 'Hide Excerpt';
                } else {
                    this.textContent = 'Read Excerpt';
                }
                
                // Scroll to excerpt if it's now visible
                if (targetExcerpt.classList.contains('visible')) {
                    setTimeout(() => {
                        targetExcerpt.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 100);
                }
            }
    }
    
    // Toggle FAQ item
    function toggleFAQ() {
        const item = this.closest('.faq-item');
        
            // Close other open FAQs
        DOM.faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
    }
    
    // Handle cookie consent
    function handleCookieConsent() {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted && DOM.cookieConsent) {
            DOM.cookieConsent.style.display = 'block';
        }
    }
    
    // Accept all cookies
    function acceptAllCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        DOM.cookieConsent.style.display = 'none';
    }
    
    // Open cookie settings
    function openCookieSettings() {
        // Here you would typically open a modal with cookie settings
        // For now, we'll just simulate accepting only necessary cookies
        localStorage.setItem('cookiesAccepted', 'necessary');
        DOM.cookieConsent.style.display = 'none';
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on notification type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Add notification to the page
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Update copyright year
    function updateCopyrightYear() {
        if (DOM.yearElement) {
            DOM.yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Setup animations
    function setupAnimations() {
        // Add animate-on-scroll class to elements
        const elementsToAnimate = document.querySelectorAll(
            '.book-card, .blog-card, .event-card, .section-header, ' +
            '.bio-content, .timeline-item, .inspiration-card, ' +
            '.fact-item, .process-step'
        );
        
        elementsToAnimate.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);

    // Animated counting for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let count = 0;
            const updateCounter = () => {
                count += step;
                if (count < target) {
                    counter.textContent = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Parallax effect for hero section
    function setupParallax() {
        const parallaxHero = document.querySelector('.parallax-hero');
        
        if (parallaxHero) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                const parallaxBg = document.querySelector('.parallax-bg');
                const parallaxOverlay = document.querySelector('.parallax-overlay');
                const parallaxContent = document.querySelector('.parallax-content');
                
                // Only apply parallax if user doesn't prefer reduced motion
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    parallaxBg.style.transform = `translateZ(-100px) scale(1.5) translateY(${scrollPosition * 0.1}px)`;
                    parallaxOverlay.style.transform = `translateZ(-50px) scale(1.2) translateY(${scrollPosition * 0.05}px)`;
                    parallaxContent.style.transform = `translateZ(0) translateY(${scrollPosition * -0.1}px)`;
                }
            });
        }
    }

    // Animated text typing effect
    function setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        
        if (typingElement) {
            const phrases = JSON.parse(typingElement.getAttribute('data-phrases'));
            let currentPhraseIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function type() {
                const currentPhrase = phrases[currentPhraseIndex];
                
                if (isDeleting) {
                    typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typingSpeed = 50;
                } else {
                    typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && currentCharIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingSpeed = 1000; // Pause at the end
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    typingSpeed = 500; // Pause before typing next phrase
                }
                
                setTimeout(type, typingSpeed);
            }
            
            type();
        }
    }

    // Book flip effect
    function setupBookFlip() {
        const books = document.querySelectorAll('.book-card');
        
        books.forEach(book => {
            const cover = book.querySelector('.book-image');
            const info = book.querySelector('.book-info');
            
            if (cover && info) {
                book.addEventListener('mouseenter', () => {
                    // Implementation of book flip effect
                });
            }
        });
    }

    // Enhanced Theme Switching with Dialog
    function setupThemePreferences() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const themeDialog = document.getElementById('themePreferencesDialog');
        const closeDialogBtn = document.getElementById('closeThemeDialog');
        const themeOptions = document.querySelectorAll('.theme-option');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Function to set theme
        function setTheme(theme) {
            if (theme === 'system') {
                theme = prefersDarkScheme.matches ? 'dark' : 'light';
                // Listen for system theme changes
                prefersDarkScheme.addEventListener('change', e => {
                    if (localStorage.getItem('themePreference') === 'system') {
                        setTheme(e.matches ? 'dark' : 'light');
                    }
                });
            }
            
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update active state on theme options
            themeOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.theme === localStorage.getItem('themePreference'));
            });
        }
        
        // Check for saved theme preference or use the system preference
        const savedPreference = localStorage.getItem('themePreference') || 'system';
        localStorage.setItem('themePreference', savedPreference);
        
        // Set initial theme
        setTheme(savedPreference === 'system' ? 
                (prefersDarkScheme.matches ? 'dark' : 'light') : 
                savedPreference);
        
        // Update active state on theme options
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === savedPreference);
            
            // Add click event to each option
            option.addEventListener('click', () => {
                const newTheme = option.dataset.theme;
                localStorage.setItem('themePreference', newTheme);
                setTheme(newTheme);
                themeDialog.classList.remove('active');
            });
        });
        
        // Toggle theme dialog when button is clicked
        themeToggleBtn.addEventListener('click', () => {
            themeDialog.classList.add('active');
        });
        
        // Close dialog when close button is clicked
        closeDialogBtn.addEventListener('click', () => {
            themeDialog.classList.remove('active');
        });
        
        // Close dialog when clicking outside
        themeDialog.addEventListener('click', (e) => {
            if (e.target === themeDialog) {
                themeDialog.classList.remove('active');
            }
        });
        
        // Close dialog with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && themeDialog.classList.contains('active')) {
                themeDialog.classList.remove('active');
            }
        });
    }

    // Font Size Adjustment
    function setupFontSizeAdjustment() {
        const fontSizeButtons = document.querySelectorAll('.font-size-btn');
        
        // Set initial font size
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        document.documentElement.setAttribute('data-font-size', savedFontSize);
        
        // Update active state on font size buttons
        fontSizeButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.size === savedFontSize);
            
            // Add click event to each button
            button.addEventListener('click', () => {
                const newSize = button.dataset.size;
                localStorage.setItem('fontSize', newSize);
                document.documentElement.setAttribute('data-font-size', newSize);
                
                // Update active state
                fontSizeButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.size === newSize);
                });
            });
        });
    }

    // 3D Tilt Effect
    function setupTiltEffect() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        tiltCards.forEach(card => {
            const content = card.querySelector('.tilt-card-content');
            const inner = card.querySelector('.tilt-card-inner');
            const shine = card.querySelector('.tilt-card-shine');
            const shadow = card.querySelector('.tilt-card-shadow');
            
            // Only apply tilt if user doesn't prefer reduced motion
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const percentX = (x - centerX) / centerX;
                    const percentY = (y - centerY) / centerY;
                    
                    const tiltLimit = 10;
                    const tiltX = percentY * tiltLimit;
                    const tiltY = percentX * -tiltLimit;
                    
                    content.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                    
                    if (inner) {
                        inner.style.transform = `translateZ(40px)`;
                    }
                    
                    if (shine) {
                        shine.style.background = `linear-gradient(
                            ${135 + percentX * 30}deg,
                            rgba(255, 255, 255, 0.25) 0%,
                            rgba(255, 255, 255, 0) 60%
                        )`;
                    }
                    
                    if (shadow) {
                        shadow.style.transform = `translateZ(-40px) translateX(${-tiltY/2}px) translateY(${-tiltX/2}px)`;
                        shadow.style.filter = `blur(${20 + Math.abs(percentX * 5) + Math.abs(percentY * 5)}px)`;
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    content.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    
                    if (inner) {
                        inner.style.transform = 'translateZ(20px)';
                    }
                    
                    if (shadow) {
                        shadow.style.transform = 'translateZ(-20px)';
                        shadow.style.filter = 'blur(20px)';
                    }
                });
            }
        });
    }

    // 3D Page Turn Effect
    function setupPageTurnEffect() {
        const pageTurns = document.querySelectorAll('.page-turn');
        
        pageTurns.forEach(page => {
            const turnBtn = page.querySelector('.page-turn-btn');
            
            if (turnBtn) {
                turnBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    page.classList.toggle('turned');
                    
                    // Update button icon
                    const icon = turnBtn.querySelector('i');
                    if (page.classList.contains('turned')) {
                        icon.className = 'fas fa-arrow-left';
                    } else {
                        icon.className = 'fas fa-arrow-right';
                    }
                });
            }
        });
    }

    // 3D Layered Background Parallax
    function setupLayeredBackgroundParallax() {
        const layeredBackgrounds = document.querySelectorAll('.layered-background');
        
        layeredBackgrounds.forEach(section => {
            const layers = section.querySelectorAll('.bg-layer');
            
            // Only apply effect if user doesn't prefer reduced motion
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                window.addEventListener('mousemove', e => {
                    const mouseX = e.clientX / window.innerWidth - 0.5;
                    const mouseY = e.clientY / window.innerHeight - 0.5;
                    
                    layers.forEach((layer, index) => {
                        const depth = 20 * (index + 1);
                        const moveX = mouseX * depth;
                        const moveY = mouseY * depth;
                        
                        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, -${(index + 1) * 10}px)`;
                    });
                });
            }
        });
    }

    // Theme Toggle Functionality
    function setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        // Set initial theme based on localStorage or system preference
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            updateThemeIcon('light');
        }
        
        // Toggle theme when button is clicked
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                let theme = 'light';
                
                // If the current theme is light or not set, switch to dark
                if (document.documentElement.getAttribute('data-theme') === 'light') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    theme = 'dark';
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    theme = 'light';
                }
                
                // Update localStorage
                localStorage.setItem('theme', theme);
                
                // Update icon
                updateThemeIcon(theme);
                
                // Announce theme change for screen readers
                announceThemeChange(theme);
            });
        }
    }

    // Update theme toggle icon
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Announce theme change for accessibility
    function announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('visually-hidden');
        announcement.textContent = `Theme changed to ${theme} mode`;
        document.body.appendChild(announcement);
        
        // Remove announcement after it's been read
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    }

    // Compact header on scroll
    function setupStickyHeader() {
        const header = document.querySelector('.main-header');
        const scrollThreshold = 50;
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > scrollThreshold) {
                    header.classList.add('compact');
                } else {
                    header.classList.remove('compact');
                }
            });
            
            // Check initial scroll position
            if (window.scrollY > scrollThreshold) {
                header.classList.add('compact');
            }
        }
    }

    // Mobile navigation toggle
    function setupMobileNav() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileNavToggle && mainNav) {
            mobileNavToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                
                // Update aria-expanded attribute for accessibility
                const isExpanded = mainNav.classList.contains('active');
                mobileNavToggle.setAttribute('aria-expanded', isExpanded);
                
                // Update icon
                const icon = mobileNavToggle.querySelector('i');
                if (isExpanded) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            // Close mobile nav when clicking outside
            document.addEventListener('click', (e) => {
                if (mainNav.classList.contains('active') && 
                    !mainNav.contains(e.target) && 
                    !mobileNavToggle.contains(e.target)) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
            
            // Close mobile nav when window is resized to desktop size
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        }
    }

    // Enhanced Button Effects
    function setupEnhancedButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add magnetic effect to buttons
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Only apply if user doesn't prefer reduced motion
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    this.style.transform = `translateY(-3px) scale(1.02) translate(${(x - rect.width / 2) / 10}px, ${(y - rect.height / 2) / 10}px)`;
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            // Add click effect
            button.addEventListener('click', function() {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                this.appendChild(ripple);
                
                // Set ripple position
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add special effects to specific buttons
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        ctaButtons.forEach((btn, index) => {
            if (index === 0) {
                btn.classList.add('btn-3d');
            } else if (index === 1) {
                btn.classList.add('btn-gradient-border');
            }
        });
        
        // Add pulse effect to newsletter submit button
        const newsletterBtn = document.querySelector('.newsletter-form .btn');
        if (newsletterBtn) {
            newsletterBtn.classList.add('btn-pulse');
        }
    }

    // Enhanced Newsletter and Events Sections
    function setupEnhancedSections() {
        // Newsletter form animation
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add success animation
                this.classList.add('success');
                
                // Show notification
                showNotification('Thank you for subscribing to our newsletter!', 'success');
            });
        }
        
        // Setup contact form
        setupContactForm();
        
        // Setup 3D book effect
        setupBookEffect();
    }

    // Enhanced Contact Form
    function setupContactForm() {
        const contactForm = document.getElementById('developer-contact-form');
        
        if (contactForm) {
            // Add focus animations
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                // Create and add floating label effect
                const formGroup = input.parentElement;
                const label = formGroup.querySelector('label');
                
                input.addEventListener('focus', () => {
                    formGroup.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (input.value === '') {
                        formGroup.classList.remove('focused');
                    }
                });
                
                // If input has value on page load, add focused class
                if (input.value !== '') {
                    formGroup.classList.add('focused');
                }
            });
            
            // Handle form submission
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show sending state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    // Show success message
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitButton.classList.add('success');
                    
                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('success');
                        
                        // Remove focused class from all inputs
                        formInputs.forEach(input => {
                            input.parentElement.classList.remove('focused');
                        });
                        
                        // Show notification
                        showNotification('Your message has been sent successfully!', 'success');
                    }, 3000);
                }, 2000);
            });
        }
    }

    // Enhanced 3D Book Effect
    function setupBookEffect() {
        const bookShowcase = document.querySelector('.book-showcase');
        
        if (bookShowcase) {
            // Only apply if user doesn't prefer reduced motion
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                bookShowcase.addEventListener('mousemove', function(e) {
                    const book = this.querySelector('.book-3d');
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const percentX = (x - centerX) / centerX;
                    
                    // Rotate the book based on mouse position
                    book.style.transform = `rotateY(${-30 + percentX * 10}deg)`;
                    
                    // Move shadow based on rotation
                    const shadow = this.querySelector('.book-shadow');
                    if (shadow) {
                        shadow.style.left = `${5 + percentX * 10}%`;
                        shadow.style.width = `${90 - Math.abs(percentX) * 10}%`;
                    }
                });
                
                bookShowcase.addEventListener('mouseleave', function() {
                    const book = this.querySelector('.book-3d');
                    book.style.transform = 'rotateY(-30deg)';
                    
                    const shadow = this.querySelector('.book-shadow');
                    if (shadow) {
                        shadow.style.left = '5%';
                        shadow.style.width = '90%';
                    }
                });
            }
        }
    }

    // Handle missing images
    function handleMissingImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.onerror = function() {
                // Special handling for author image
                if (this.parentElement && this.parentElement.classList.contains('bio-image')) {
                    console.log('Author image failed to load, trying alternative');
                    
                    // Try the professional photo first as it seems to exist
                    this.src = 'images/author/author-professional.jpg';
                    
                    // Set up a second error handler in case the first alternative fails
                    this.onerror = function() {
                        // Try other alternatives
                        if (this.src.includes('author-professional.jpg')) {
                            this.src = 'images/author/author-casual.jpg';
                        } else if (this.src.includes('author-casual.jpg')) {
                            this.src = 'images/author/author-writing.jpg';
                        } else if (this.src.includes('author-writing.jpg')) {
                            this.src = 'images/author/author-photo.jpg';
                        } else {
                            // Default fallback
                            this.src = 'images/icons/image-placeholder.png';
                            this.alt = 'Author image not available';
                            this.classList.add('missing-image');
                        }
                    };
                } else {
                    // Default fallback for other images
                    this.src = 'images/icons/image-placeholder.png';
                    this.alt = 'Image not available';
                    this.classList.add('missing-image');
                }
            };
        });
    }

    // Add inner-page class to body on non-home pages
    function addInnerPageClass() {
        // Check if we're on a page other than index.html or /
        const currentPath = window.location.pathname;
        
        // Add inner-page class to all pages to ensure consistent navigation
        document.body.classList.add('inner-page');
        
        // Force horizontal navigation on all pages
        const mainNav = document.querySelector('.main-nav');
        const navUl = document.querySelector('.main-nav ul');
        
        if (mainNav && navUl) {
            // Ensure navigation is displayed as flex
            mainNav.style.display = 'flex';
            navUl.style.display = 'flex';
            navUl.style.flexDirection = 'row';
            
            // Add appropriate styles to nav items
            const navItems = navUl.querySelectorAll('li');
            navItems.forEach(item => {
                item.style.margin = '0';
                item.style.position = 'relative';
            });
            
            // Style nav links
            const navLinks = navUl.querySelectorAll('a');
            navLinks.forEach(link => {
                link.style.padding = '8px 15px';
                link.style.borderRadius = '8px';
                link.style.display = 'block';
            });
        }
        
        // Highlight current page in navigation
        highlightCurrentPage();
    }

    // Function to highlight the current page in navigation
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if this link corresponds to the current page
            if (linkPath === currentPath || 
                currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html') ||
                (currentPath === '/' && linkPath === 'index.html')) {
                
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // About page enhancements
    document.addEventListener('DOMContentLoaded', function() {
        // Check if we're on the about page
        if (document.querySelector('.about-hero')) {
            // Simple enhancements that won't interfere with visibility
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                });
            });
        }
    });

    // Story Section Functionality
    function setupStoryInteractions() {
        const likeButtons = document.querySelectorAll('.like-btn');
        const commentButtons = document.querySelectorAll('.comment-btn');
        const commentForms = document.querySelectorAll('.comment-form');
        
        // Handle like button clicks
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const storyId = this.getAttribute('data-story-id');
                const likeCount = this.closest('.story-card').querySelector('.likes');
                const currentLikes = parseInt(likeCount.textContent.match(/\d+/)[0]);
                
                if (this.classList.contains('liked')) {
                    // Unlike
                    this.classList.remove('liked');
                    this.innerHTML = '<i class="far fa-heart"></i> Like';
                    likeCount.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes - 1}`;
                    
                    // In a real app, you would send an API request to update the like count
                    console.log(`Unlike story: ${storyId}`);
                } else {
                    // Like
                    this.classList.add('liked');
                    this.innerHTML = '<i class="fas fa-heart"></i> Liked';
                    likeCount.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes + 1}`;
                    
                    // In a real app, you would send an API request to update the like count
                    console.log(`Liked story: ${storyId}`);
                }
            });
        });
        
        // Handle comment button clicks
        commentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const storyId = this.getAttribute('data-story-id');
                const commentsSection = document.getElementById(`comments-${storyId}`);
                
                if (commentsSection) {
                    commentsSection.classList.toggle('hidden');
                    
                    if (!commentsSection.classList.contains('hidden')) {
                        // Scroll to comments section
                        commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // Focus on the comment textarea
                        const textarea = commentsSection.querySelector('textarea');
                        if (textarea) {
                            setTimeout(() => {
                                textarea.focus();
                            }, 500);
                        }
                    }
                }
            });
        });
        
        // Handle comment form submissions
        commentForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const textarea = this.querySelector('textarea');
                const commentText = textarea.value.trim();
                
                if (commentText) {
                    const commentsContainer = this.closest('.story-comments').querySelector('.comments-container');
                    const storyId = this.closest('.story-comments').id.replace('comments-', '');
                    
                    // Create a new comment element
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    
                    // Get current date in format: Month Day, Year
                    const now = new Date();
                    const options = { month: 'long', day: 'numeric', year: 'numeric' };
                    const formattedDate = now.toLocaleDateString('en-US', options);
                    
                    // In a real app, you would get the current user's info from the session
                    newComment.innerHTML = `
                        <div class="comment-author">
                            <img src="images/users/default-user.jpg" alt="You">
                            <span>You</span>
                        </div>
                        <p>${commentText}</p>
                        <span class="comment-date">Just now</span>
                    `;
                    
                    // Add the new comment to the top of the comments container
                    commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
                    
                    // Update comment count
                    const commentCount = this.closest('.story-card').querySelector('.comments');
                    const currentComments = parseInt(commentCount.textContent.match(/\d+/)[0]);
                    commentCount.innerHTML = `<i class="fas fa-comment"></i> ${currentComments + 1}`;
                    
                    // Clear the textarea
                    textarea.value = '';
                    
                    // In a real app, you would send an API request to save the comment
                    console.log(`Added comment to story: ${storyId}`);
                    console.log(`Comment text: ${commentText}`);
                    
                    // Show a notification
                    showNotification('Your comment has been posted!', 'success');
                }
            });
        });
    }

    // Setup category filters
    function setupCategoryFilters() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const storyCards = document.querySelectorAll('.story-card');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show all stories if "All" category is selected
                if (category === 'all') {
                    storyCards.forEach(card => {
                        card.style.display = 'block';
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    });
                    return;
                }
                
                // Filter stories based on category
                storyCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (cardCategory === category) {
                        card.style.display = 'block';
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        // Hide with animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Show message if no stories in category
                const visibleCards = document.querySelectorAll('.story-card[style="display: block;"]');
                const noResultsMessage = document.querySelector('.no-results-message');
                
                if (visibleCards.length === 0 && noResultsMessage) {
                    noResultsMessage.style.display = 'block';
                } else if (noResultsMessage) {
                    noResultsMessage.style.display = 'none';
                }
            });
        });
    }

    // Press Page Functionality
    function initPressPage() {
        // Tab functionality
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const targetPanel = document.getElementById(button.dataset.tab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    
                    // Add subtle animation to the newly activated panel
                    targetPanel.style.animation = 'none';
                    setTimeout(() => {
                        targetPanel.style.animation = 'fadeIn 0.5s ease forwards';
                    }, 10);
                }
            });
        });

        // Media request form handling
        const mediaForm = document.querySelector('.media-form');
        if (mediaForm) {
            mediaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Show loading state
                const submitButton = mediaForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                submitButton.classList.add('loading');

                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Your media request has been submitted successfully!', 'success');
                    
                    // Reset form
                    mediaForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');
                    
                    // Add success animation
                    submitButton.classList.add('success');
                    setTimeout(() => {
                        submitButton.classList.remove('success');
                    }, 2000);
                }, 1500);
            });
        }

        // Download tracking
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                const fileName = button.getAttribute('href').split('/').pop();
                // Track download (replace with actual analytics call)
                console.log(`Download tracked: ${fileName}`);
                
                // Add download animation
                button.classList.add('downloading');
                setTimeout(() => {
                    button.classList.remove('downloading');
                }, 1000);
            });
        });

        // Image lazy loading and hover effects
        const images = document.querySelectorAll('.photo-item img, .cover-item img, .bio-image img');
        
        // Set up intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                        
                        // Add fade-in animation
                        img.style.opacity = 0;
                        setTimeout(() => {
                            img.style.transition = 'opacity 0.5s ease';
                            img.style.opacity = 1;
                        }, 100);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            images.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback for browsers that don't support intersection observer
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
        
        // Add subtle parallax effect to press hero
        const pressHero = document.querySelector('.press-hero');
        if (pressHero) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                if (scrollPosition < 600) {
                    pressHero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
                }
            });
        }
        
        // Add smooth reveal animations for sections
        const revealSections = document.querySelectorAll('.press-overview, .press-bio, .photo-gallery, .covers-gallery, .coverage-tabs, .awards-list');
        
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '-50px 0px',
                threshold: 0.15
            });
            
            revealSections.forEach(section => {
                section.classList.add('reveal-section');
                sectionObserver.observe(section);
            });
        }
    }

    // Initialize developer page functionality
    function initDeveloperPage() {
        // Animate skill bars on scroll
        const skillLevels = document.querySelectorAll('.skill-level');
        const skillsCard = document.querySelector('.skills-card');
        
        if (skillsCard && skillLevels.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate all skill bars when skills card is visible
                        skillLevels.forEach(level => {
                            const width = level.style.width;
                            level.style.width = '0';
                            setTimeout(() => {
                                level.style.width = width;
                            }, 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(skillsCard);
        }
        
        // Add parallax effect to developer image
        const developerImage = document.querySelector('.developer-image');
        if (developerImage) {
            developerImage.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = developerImage.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                developerImage.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            developerImage.addEventListener('mouseleave', () => {
                developerImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
            });
        }
        
        // Add hover effect to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const projectImage = card.querySelector('.project-image img');
                if (projectImage) {
                    projectImage.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const projectImage = card.querySelector('.project-image img');
                if (projectImage) {
                    projectImage.style.transform = '';
                }
            });
        });
        
        // Enhanced form interactions
        const formGroups = document.querySelectorAll('.contact-form .form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Check initial state
                if (input.value.trim() !== '') {
                    group.classList.add('focused');
                }
                
                // Focus events
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (input.value.trim() === '') {
                        group.classList.remove('focused');
                    }
                });
            }
        });
        
        // Add 3D tilt effect to contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(10px)`;
                
                const icon = card.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = `translateZ(20px) rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                
                const icon = card.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
        
        // Add scroll reveal animation
        const revealElements = document.querySelectorAll('.developer-card, .education-card, .skills-card, .project-card, .contact-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        revealElements.forEach(element => {
            element.classList.add('reveal-element');
            revealObserver.observe(element);
        });
        
        // Add CSS for reveal animations
        const style = document.createElement('style');
        style.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .reveal-element.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
})();

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup theme toggle
    setupThemeToggle();
    
    // Setup story interactions (for both index and stories pages)
    if (document.querySelector('.stories-section') || document.querySelector('.story-card')) {
        setupStoryInteractions();
    }
    
    // Setup category filtering on stories page
    if (document.querySelector('.categories-nav')) {
        setupCategoryFilters();
    }
    
    // Handle missing images
    handleMissingImages();
    
    // Initialize developer page if on developer page
    if (document.querySelector('.developer-hero')) {
        initDeveloperPage();
    }
});
