/* ========================================
   Mobile Menu Toggle
   ======================================== */
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('navList');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

/* ========================================
   Theme Toggle (Dark/Light Mode)
   ======================================== */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
}

/* ========================================
   Currency Toggle (Give Page)
   ======================================== */
function switchCurrency(type) {
    const nairaView = document.getElementById('naira-view');
    const domView = document.getElementById('dom-view');
    const buttons = document.querySelectorAll('.toggle-btn');

    if (!nairaView || !domView) return;

    // Reset buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    if (type === 'naira') {
        nairaView.style.display = 'flex';
        domView.style.display = 'none';
        buttons[0].classList.add('active');
    } else {
        nairaView.style.display = 'none';
        domView.style.display = 'flex';
        buttons[1].classList.add('active');
    }
}

/* ========================================
   Copy to Clipboard Function
   ======================================== */
function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            // Create notification
            showNotification(`Account number copied: ${text}`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification(`Account number copied: ${text}`);
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
}

/* ========================================
   Show Notification
   ======================================== */
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.copy-notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   Scroll Animations
   ======================================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

/* ========================================
   Navbar Scroll Effect
   ======================================== */
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
    
    lastScroll = currentScroll;
});

/* ========================================
   Newsletter Form Submission
   ======================================== */
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send to your backend
        showNotification(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

/* ========================================
   Contact Form Submission
   ======================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send to your backend
        console.log('Form submitted:', data);
        
        showNotification('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ========================================
   Add keyboard support for copy boxes
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const copyBoxes = document.querySelectorAll('.copy-box');
    
    copyBoxes.forEach(box => {
        box.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                box.click();
            }
        });
    });
});