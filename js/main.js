import Swup from 'swup';
import Lenis from 'lenis';

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize Swup for page transitions
const swup = new Swup();

// Function to initialize all page-specific logic
function initPageLogic() {
    // 1. Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    const sideNavLinks = document.querySelectorAll('.side-nav-link');

    if (hamburger && sideNav) {
        // Remove old listeners to prevent duplicates on swup transition
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        newHamburger.addEventListener('click', () => {
            newHamburger.classList.toggle('active');
            sideNav.classList.toggle('open');
        });

        sideNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                newHamburger.classList.remove('active');
                sideNav.classList.remove('open');
            });
        });
    }

    // 2. Animate on Scroll Logic
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.removeEventListener('scroll', handleScrollAnimation);
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // 3. Project Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        // We clone and replace to avoid multiple event listeners after swup nav
        filterButtons.forEach(button => {
            const newBtn = button.cloneNode(true);
            button.parentNode.replaceChild(newBtn, button);
            
            newBtn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                newBtn.classList.add('active');

                const filterValue = newBtn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const projectCategories = card.getAttribute('data-category').split(',');
                    if (filterValue === 'all' || projectCategories.includes(filterValue)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }
}

// Function to initialize Theme Toggle logic
function initTheme() {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const root = document.documentElement;
    
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        root.setAttribute('data-theme', 'light');
    }

    toggleBtns.forEach(btn => {
        // replace to clear listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            let newTheme = 'dark';
            if (currentTheme !== 'light') {
                newTheme = 'light';
            }
            
            if (newTheme === 'light') {
                root.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcons(newTheme);
        });
    });

    updateThemeIcons(savedTheme || 'dark');
}

function updateThemeIcons(theme) {
    const toggleBtnIcons = document.querySelectorAll('.theme-toggle-btn i');
    toggleBtnIcons.forEach(icon => {
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    });
}

// Run on initial load
document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
        }, 1000);
    }
    
    initTheme();
    initPageLogic();
});

// Re-run logic after swup transitions
swup.hooks.on('page:view', () => {
    initTheme();
    initPageLogic();
});