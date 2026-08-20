document.addEventListener('DOMContentLoaded', () => {
    /* --- Intro Boot Sequence --- */
    const introScreen = document.getElementById('intro-screen');
    const introTyping = document.querySelector('.intro-typing');
    
    if (introScreen && introTyping) {
        const bootText = "SYSTEM INITIALIZING... WELCOME BRAMASETIO.";
        let charIndex = 0;
        
        function typeBootText() {
            if (charIndex < bootText.length) {
                introTyping.textContent += bootText.charAt(charIndex);
                charIndex++;
                setTimeout(typeBootText, 50); // Typing speed
            } else {
                // Wait for loading bar to finish (approx 2.5s total), then fade out
                setTimeout(() => {
                    introScreen.classList.add('hidden');
                    // Remove from DOM after fade out transition (1s)
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        document.body.style.overflow = 'auto'; // Re-enable scroll if disabled
                    }, 1000);
                }, 1000);
            }
        }
        
        // Disable scroll during intro
        document.body.style.overflow = 'hidden';
        
        // Start typing after a tiny delay
        setTimeout(typeBootText, 300);
    }

    /* --- Custom Cursor --- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Adding a slight delay to the outline for a smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Hover effects for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .btn-neon, .project-card, .skill-tag');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* --- Mobile Navigation --- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu on link click
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    /* --- Header Scroll Effect --- */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* --- Typing Animation --- */
    const typeText = "GAME DEVELOPER STUDENT";
    const typeElement = document.querySelector('.typing-text');
    
    if (typeElement) {
        let i = 0;
        let isDeleting = false;
        let delay = 100;
        
        function typeWriter() {
            if (isDeleting) {
                typeElement.textContent = typeText.substring(0, i - 1);
                i--;
                delay = 50;
            } else {
                typeElement.textContent = typeText.substring(0, i + 1);
                i++;
                delay = 150;
            }
            
            if (!isDeleting && i === typeText.length) {
                delay = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && i === 0) {
                isDeleting = false;
                delay = 500; // Pause before typing again
            }
            
            setTimeout(typeWriter, delay);
        }
        
        // Start typing effect after a small delay
        setTimeout(typeWriter, 1000);
    }
    
    /* --- Vanilla Tilt Init --- */
    // Ensure vanilla-tilt is loaded before initializing
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
        
        VanillaTilt.init(document.querySelectorAll(".about-image-wrapper"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    }
});
