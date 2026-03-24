document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggles
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMob = document.getElementById('theme-toggle-mobile');
    
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIconMob = document.getElementById('theme-toggle-dark-icon-mob');
    const lightIconMob = document.getElementById('theme-toggle-light-icon-mob');

    const updateIcons = () => {
        if (document.documentElement.classList.contains('dark')) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            darkIconMob.classList.add('hidden');
            lightIconMob.classList.remove('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
            lightIconMob.classList.add('hidden');
            darkIconMob.classList.remove('hidden');
        }
    };

    updateIcons();

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        updateIcons();
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleBtnMob.addEventListener('click', toggleTheme);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
});
