/* ============================================
   SUNRISE EDUCATION - MAIN JAVASCRIPT
   ============================================ */

// ============================================
// MULTILINGUAL SUPPORT
// ============================================

let currentLanguage = localStorage.getItem('language') || 'en';

const languageNames = {
    'en': '🌐 English',
    'zh': '中文',
    'ms': '📍 Malay'
};

function initializeLanguage() {
    updateLanguage(currentLanguage);
    updateLanguageButton();
}

function updateLanguageButton() {
    const btn = document.getElementById('langToggle');
    if (btn) {
        btn.textContent = languageNames[currentLanguage];
    }
}

function toggleLanguage() {
    const languages = ['en', 'zh', 'ms'];
    const currentIndex = languages.indexOf(currentLanguage);
    currentLanguage = languages[(currentIndex + 1) % languages.length];
    localStorage.setItem('language', currentLanguage);
    updateLanguage(currentLanguage);
    updateLanguageButton();
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        const key = `data-${lang}`;
        if (element.hasAttribute(key)) {
            element.textContent = element.getAttribute(key);
        }
    });
}

// Language Toggle Button Event Listener
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    initializeLanguage();
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Update button appearance
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ============================================
// ADMISSION FORM HANDLING
// ============================================

function initializeAdmissionForm() {
    const form = document.getElementById('admissionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const parentName = document.getElementById('parentName').value;
            const childName = document.getElementById('childName').value;
            const childAge = document.getElementById('childAge').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const interestedLevel = document.getElementById('interestedLevel').value;
            const currentSchool = document.getElementById('currentSchool').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!parentName || !childName || !childAge || !email || !phone || !interestedLevel) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Hello Sunrise Education,%0A%0AParent/Guardian: ${parentName}%0AChild's Name: ${childName}%0AAge: ${childAge}%0AEmail: ${email}%0APhone: ${phone}%0AInterested Level: ${interestedLevel}%0ACurrent School: ${currentSchool || 'N/A'}%0AAdditional: ${message || 'N/A'}%0A%0AI would like to know more about your homeschooling program.`;
            
            // Send to WhatsApp
            const whatsappURL = `https://wa.me/60124251556?text=${whatsappMessage}`;
            
            // Also send email data via form submission (if you have a backend)
            // For now, we'll open WhatsApp and show success message
            window.open(whatsappURL, '_blank');
            
            // Show success message
            showSuccessMessage(form);
            
            // Reset form
            form.reset();
        });
    }
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background-color: #27AE60;
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.innerHTML = `
        <h3>✓ Thank you!</h3>
        <p>Your application has been submitted. We will contact you soon via WhatsApp or email.</p>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', initializeAdmissionForm);

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animateElements = document.querySelectorAll(
        '.mission-card, .benefit-card, .activity-card, .team-member, .value-card, .contact-card, .step'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightActiveNavLink);

// ============================================
// STICKY NAVBAR ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ============================================
// FORM INPUT VALIDATION
// ============================================

function initializeFormValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Check if required
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
        isValid = phoneRegex.test(value) && value.length >= 9;
    }
    
    // Age validation
    if (input.type === 'number' && value) {
        const age = parseInt(value);
        isValid = age >= 7 && age <= 18;
    }
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
    
    return isValid;
}

document.addEventListener('DOMContentLoaded', initializeFormValidation);

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
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
}

document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

function initializePageAnimation() {
    // Add fade-in animation to main elements on page load
    const mainElements = document.querySelectorAll('h1, h2, .hero, .hero-content');
    mainElements.forEach((element, index) => {
        element.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
    });
}

window.addEventListener('load', initializePageAnimation);

// ============================================
// CONTACT LINK HANDLERS
// ============================================

function initializeContactHandlers() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    // Track phone clicks
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('Phone Call', 'Clicked phone number');
        });
    });
    
    // Track email clicks
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('Email', 'Clicked email link');
        });
    });
    
    // Track WhatsApp clicks
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('WhatsApp', 'Clicked WhatsApp link');
        });
    });
}

function trackEvent(category, action) {
    // This is a placeholder for analytics tracking
    // You can integrate Google Analytics here
    console.log(`Event Tracked: ${category} - ${action}`);
}

document.addEventListener('DOMContentLoaded', initializeContactHandlers);

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get current year for footer
function updateFooterYear() {
    const year = new Date().getFullYear();
    const footerYears = document.querySelectorAll('footer p:last-child');
    footerYears.forEach(el => {
        el.textContent = el.textContent.replace(/\d{4}-\d{4}/, `2014-${year}`);
    });
}

document.addEventListener('DOMContentLoaded', updateFooterYear);

// Debounce function for resize events
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

// ============================================
// DOCUMENT READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sunrise Education website loaded successfully');
    
    // Initialize all features
    initializeLanguage();
    initializeMobileMenu();
    highlightActiveNavLink();
    initializeFormValidation();
    initializeScrollAnimations();
    initializeContactHandlers();
});