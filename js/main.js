document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader Logic ---
    // This function hides the preloader animation once the entire page (including images) is fully loaded.
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            // --- EDIT STARTS HERE ---
            // Introduce a delay (in milliseconds) before hiding the preloader.
            // For example, to make it last an additional 2 seconds (2000 milliseconds):
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 1000); // <-- Change this value to adjust the delay
            // --- EDIT ENDS HERE ---
        }
    });

    // --- Hamburger Menu & Side-Nav Logic ---
    // This handles the opening and closing of the mobile navigation menu.
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    const sideNavLinks = document.querySelectorAll('.side-nav-link');

    if (hamburger && sideNav) {
        hamburger.addEventListener('click', () => {
            // Toggles the hamburger animation (lines to 'X') and slides the nav in/out.
            hamburger.classList.toggle('active');
            sideNav.classList.toggle('open');
        });
    }

    // This ensures the menu closes when a link inside it is clicked.
    sideNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && sideNav) {
                hamburger.classList.remove('active');
                sideNav.classList.remove('open');
            }
        });
    });


    // --- Animate on Scroll Logic ---
    // This uses the Intersection Observer API for better performance than scroll event listeners.
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

    // Add event listener for scroll and run the function once on load to catch elements already in view.
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    // --- Advanced Project Filtering Logic ---
    // This handles the filtering of projects based on the selected category buttons.
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Manages the 'active' state for the clicked button.
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    // Gets all categories for a project, which are comma-separated.
                    const projectCategories = card.getAttribute('data-category').split(',');
                    
                    // Checks if the project's categories include the filter value, or if "All" is selected.
                    if (filterValue === 'all' || projectCategories.includes(filterValue)) {
                        card.classList.remove('hide'); // Show the card
                    } else {
                        card.classList.add('hide'); // Hide the card
                    }
                });
            });
        });
    }
});