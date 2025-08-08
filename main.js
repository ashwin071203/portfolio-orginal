document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    function toggleMobileMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-links');
        
        hamburger.addEventListener('click', toggleMobileMenu);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    navLinksItems.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 20);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });

    const sections = document.querySelectorAll('section');
    let isScrolling;
    
    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = `#${sectionId}`;
                if (history.pushState) {
                    history.pushState(null, null, `#${sectionId}`);
                } else {
                    window.location.hash = `#${sectionId}`;
                }
            }
        });
        
        navLinksItems.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.toggle('active', linkHref === current);
            
            if (linkHref === current) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(setActiveLink, 100);
    }, { passive: true });
    
    setActiveLink();
    
    window.addEventListener('popstate', () => {
        setActiveLink();
    });

    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.setAttribute('title', 'Back to top');
        
        function toggleBackToTop() {
            const shouldShow = window.pageYOffset > 300;
            backToTopBtn.classList.toggle('show', shouldShow);
            
            backToTopBtn.setAttribute('aria-hidden', !shouldShow);
        }
        
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(toggleBackToTop, 50);
        }, { passive: true });
        
        toggleBackToTop();
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            backToTopBtn.classList.add('keyboard-focus');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                document.body.setAttribute('tabindex', '-1');
                document.body.focus();
                setTimeout(() => document.body.removeAttribute('tabindex'), 1000);
            }, 500);
        });
        
        backToTopBtn.addEventListener('mouseup', () => {
            backToTopBtn.blur();
        });
    }


   
    
  
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Form submitted:', formObject);
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
    
    const animateElements = document.querySelectorAll('.section-title, .skill-item, .project-card, .timeline-item, .testimonial-slide');
    animateElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.animationDelay = `${index * 0.1}s`;
    });
});
