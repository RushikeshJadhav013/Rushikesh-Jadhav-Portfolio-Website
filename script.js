document.addEventListener('DOMContentLoaded', function() {
    // ========== Theme Toggle ==========
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            body.classList.remove('light-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(savedTheme);

    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ========== Mobile Menu Toggle ==========
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('fa-times');
            navbar.classList.toggle('active');
            document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('fa-times');
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ========== Sticky Header ==========
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 0);
        });
    }

    // ========== About Section Tabs ==========
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    function openTab(tabName) {
        tabLinks.forEach(link => link.classList.remove('active-link'));
        tabContents.forEach(content => content.classList.remove('active-tab'));

        const activeTab = document.querySelector(`.tab-links[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);

        if (activeTab && activeContent) {
            activeTab.classList.add('active-link');
            activeContent.classList.add('active-tab');
        }
    }

    if (tabLinks.length > 0) {
        tabLinks.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const tabName = this.getAttribute('data-tab');
                openTab(tabName);
            });
        });
        
        // Open first tab by default
        const firstTab = tabLinks[0].getAttribute('data-tab');
        if (firstTab) openTab(firstTab);
    }

    // ========== Tech Cards Hover Effect ==========
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });

    // ========== Portfolio Filtering ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-box');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter || 'all';

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        item.setAttribute('aria-hidden', 'false');
                    } else {
                        item.style.display = 'none';
                        item.setAttribute('aria-hidden', 'true');
                    }
                });
            });
        });
    }

    // ========== Portfolio Modal ==========
    const projects = {
        1: {
            title: "MAX Fashion E-commerce",
            description: "I worked as a Frontend Developer on the MAX Fashion e-commerce website Project at Infinity Data Technologies Pvt. Ltd. This online shopping platform....",
            image: "Image/E-Commerce.png",
            technologies: ["React", "Node.js", "MongoDB", "Redux", "Stripe API"],
            demoLink: "#",
            codeLink: "#"
        },
        2: {
            title: "Interior Designer Website",
            description: "This is a fully responsive interior designer website I developed as a freelancing project using HTML, CSS, and JavaScript...",
            image: "Image/Screenshot (323).png",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            demoLink: "#",
            codeLink: "#"
        },
        3: {
            title: "Wordpress Interior Designer Website",
            description: "Showcase creativity and design expertise with a beautifully crafted, fully responsive WordPress website tailored for interior designers...",
            image: "Image/BVD.png",
            technologies: ["WordPress"],
            demoLink: "#",
            codeLink: "#"
        }
    };

    const previewLinks = document.querySelectorAll('.preview-link');
    const modal = document.querySelector('.portfolio-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalTech = document.querySelector('.modal-tech');
    const liveDemoBtn = document.querySelector('.live-demo');
    const viewCodeBtn = document.querySelector('.view-code');

    if (previewLinks.length > 0 && modal) {
        previewLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.dataset.project;
                const project = projects[projectId];
                
                if (!project) return;

                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;

                // Clear and repopulate technologies
                modalTech.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tech-badge';
                    span.textContent = tech;
                    modalTech.appendChild(span);
                });

                // Update button links
                if (liveDemoBtn) liveDemoBtn.href = project.demoLink;
                if (viewCodeBtn) viewCodeBtn.href = project.codeLink;

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal events
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ========== Scroll Animations ==========
    function initScrollAnimations() {
        // Fallback animation if ScrollReveal not available
        const elements = document.querySelectorAll(
            '.home-content, .heading, .home-img, .services-container, ' +
            '.portfolio-box, .contact form, .home-sci, .about-img, .about-content'
        );

        const animateElements = () => {
            elements.forEach(el => {
                const top = el.getBoundingClientRect().top;
                const screenPos = window.innerHeight / 1.3;
                
                if (top < screenPos) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        };

        // Initialize styles
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Run once immediately and then on scroll
        animateElements();
        window.addEventListener('scroll', animateElements);
    }

    // Check if ScrollReveal is available
    if (typeof ScrollReveal === 'function') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: false,
            easing: 'cubic-bezier(0.5, 0, 0, 1)'
        });

        sr.reveal('.home-content, .heading', { delay: 200 });
        sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', {
            interval: 200,
            delay: 400
        });
        sr.reveal('.home-sci, .about-img, .about-content', {
            origin: 'bottom',
            delay: 600
        });
    } else {
        initScrollAnimations();
    }

    // ========== Contact Form ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            // Submit to Google Apps Script
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const form = document.getElementById("contactForm");

            form.addEventListener("submit", (e) => {
              e.preventDefault();
              
              const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
              };
            
              fetch("https://script.google.com/macros/s/AKfycbzaDhCXXoTg6Bgu8eXgHEvnfTCueQZ1q0Gn3p2A_HB84zDWIQcBAtU8l7fQI-NpQyIHjw/exec", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
              })
              .then(res => res.json())
              .then(data => {
                alert("Message sent successfully!");
                form.reset();
              })
              .catch(err => alert("Error: " + err));
            
            })
            .then(data => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                contactForm.reset();
                
                // Reset after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });

        // Input focus effects
        document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
            input.addEventListener('focus', function() {
                const underline = this.parentElement.querySelector('.underline');
                if (underline) underline.style.width = '100%';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    const underline = this.parentElement.querySelector('.underline');
                    if (underline) underline.style.width = '0';
                }
            });
        });
    }

    // ========== Active Section Highlighting ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ========== Download Button Animation ==========
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const btn = this;
            btn.classList.add('clicked');
            
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
                btn.classList.remove('clicked');
            }, 1000);
        });
    }
});