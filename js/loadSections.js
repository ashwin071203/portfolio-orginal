document.addEventListener('DOMContentLoaded', function() {
    async function loadSection(sectionId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${sectionId}: ${response.statusText}`);
            }
            const html = await response.text();
            const sectionElement = document.getElementById(`${sectionId}-section`);
            if (sectionElement) {
                sectionElement.innerHTML = html;
            }
            return true;
        } catch (error) {
            console.error(`Error loading ${sectionId}:`, error);
            return false;
        }
    }

    async function loadAllSections() {
        const sections = [
            { id: 'header', path: 'sections/header.html' },
            { id: 'home', path: 'sections/home.html' },
            { id: 'about', path: 'sections/about.html' },
            { id: 'projects', path: 'sections/projects.html' },
            { id: 'skills', path: 'sections/skills.html' },
            { id: 'experience', path: 'sections/experience.html' },
            { id: 'contact', path: 'sections/contact.html' }
        ];

        for (const section of sections) {
            await loadSection(section.id, section.path);
        }

        initEventListeners();
    }

    function initEventListeners() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });

        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
    }

    loadAllSections();
});
