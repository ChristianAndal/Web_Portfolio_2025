// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offsetTop = target.offsetTop - 82;
        window.scrollTo({
            top: offsetTop,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    });
});

// Navbar state on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple contact form submission through FormSubmit.
// No serverless function, API key, or email library is required.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.currentTarget;
        const formMessage = document.getElementById('formMessage');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        formMessage.innerHTML = '';

        try {
            const response = await fetch('https://formsubmit.co/ajax/andalpapi33@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: form.from_name.value,
                    email: form.from_email.value,
                    subject: form.subject.value,
                    message: form.message.value,
                    _subject: `Portfolio inquiry: ${form.subject.value}`,
                    _captcha: 'true'
                })
            });

            if (!response.ok) throw new Error('Unable to send message.');

            formMessage.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle"></i> Thanks for reaching out. Your inquiry has been received, and I\'ll get back to you soon.</div>';
            submitBtn.innerHTML = originalText;
            form.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            formMessage.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> We couldn\'t send your message right now. Please email <a href="mailto:andalpapi33@gmail.com">andalpapi33@gmail.com</a>.</div>';
            submitBtn.innerHTML = originalText;
        } finally {
            submitBtn.disabled = false;
            setTimeout(() => { submitBtn.innerHTML = originalText; }, 5000);
        }
    });
}

/* Legacy EmailJS handler retained only as a comment for old references.
const legacyContactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formMessage = document.getElementById('formMessage');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY" || 
            EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID" || 
            EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            formMessage.innerHTML = '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle"></i> Email service is not configured yet. Please email me directly at <a href="mailto:andalpapi33@gmail.com">andalpapi33@gmail.com</a></div>';
            console.error('EmailJS Configuration Missing!');
            console.log('Please update EMAILJS_CONFIG in script.js with your credentials from https://www.emailjs.com/');
            return;
        }
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            formMessage.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Please refresh the page or email me directly at <a href="mailto:andalpapi33@gmail.com">andalpapi33@gmail.com</a></div>';
            return;
        }
        
        // Get form data
        const formData = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'andalpapi33@gmail.com' // Your Gmail address
        };

        // Validation
        if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
            formMessage.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Please fill in all fields.</div>';
            submitBtn.style.animation = 'shake 0.5s';
            setTimeout(() => {
                submitBtn.style.animation = '';
            }, 500);
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        submitBtn.disabled = true;
        formMessage.innerHTML = '';
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, formData)
            .then(function(response) {
                // Success
                console.log('Email sent successfully!', response.status, response.text);
                formMessage.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle"></i> Message sent successfully! I\'ll get back to you soon.</div>';
                submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                submitBtn.disabled = false;
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    formMessage.innerHTML = '';
                }, 5000);
            }, function(error) {
                // Error
                console.error('EmailJS Error Details:', error);
                let errorMessage = 'Failed to send message. ';
                
                // Provide specific error messages
                if (error.status === 400) {
                    errorMessage += 'Invalid template or service configuration.';
                } else if (error.status === 401) {
                    errorMessage += 'Unauthorized. Please check your Public Key.';
                } else if (error.status === 403) {
                    errorMessage += 'Access denied. Please check your EmailJS account settings.';
                } else if (error.status === 404) {
                    errorMessage += 'Service or template not found. Please check your IDs.';
                } else {
                    errorMessage += 'Please try again later or email me directly.';
                }
                
                formMessage.innerHTML = `<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> ${errorMessage} <br><small>Or email me directly at <a href="mailto:andalpapi33@gmail.com">andalpapi33@gmail.com</a></small></div>`;
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            });
    });
}

*/

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Section reveal and hero motion are handled by animations/gsap.js.

// Mobile menu close on link click
const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navbarToggler = document.querySelector('.navbar-toggler');

navLinksMobile.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });
});

// Skill hover states are handled in CSS to avoid inline transform conflicts.

// Project Modal Functionality
const projectData = {
    'vicinity': {
        title: 'Vicinity — Multi-Tenant SaaS POS',
        description: 'Vicinity is an online SaaS point-of-sale platform developed by GoVenture for multi-tenant businesses. Built with Django and Python, PostgreSQL, and Vue.js, it combines real-time operational workflows with a hybrid database architecture for a responsive and flexible POS experience.',
        images: ['VIcinity/1.png', 'VIcinity/2.jpeg', 'VIcinity/4.jpeg', 'VIcinity/5.jpeg', 'VIcinity/6.jpeg', 'VIcinity/3.jpeg'],
        tags: ['Django', 'Python', 'PostgreSQL', 'Vue.js', 'SaaS', 'Multi-Tenant'],
        features: [
            'Multi-tenant SaaS architecture with dedicated business workspaces',
            'Real-time point-of-sale and operational workflows',
            'Hybrid database architecture for flexible data handling',
            'Django and Python backend with PostgreSQL persistence',
            'Vue.js interface for POS, product catalog, and business management',
            'Workspace onboarding, subscription plans, and sales analytics'
        ],
        link: '#',
        github: '#'
    },
    'goventure': {
        title: 'GoVenture ERP',
        description: 'Enterprise Resource Planning system developed using Python Django framework with SSMS database integration. Streamlining business processes and operations management for enhanced efficiency and productivity.',
        images: ['Goventure/1.png', 'Goventure/2.png', 'Goventure/3.png', 'Goventure/4.png'],
        tags: ['Python', 'Django', 'SSMS'],
        features: [
            'Comprehensive ERP solution for business management',
            'SSMS database integration for data storage',
            'User-friendly interface with Django framework',
            'Streamlined business processes and operations',
            'Enhanced productivity and efficiency'
        ],
        link: '#',
        github: '#'
    },
    'connect': {
        title: 'Connect: Social Media Platform',
        description: 'Developing a social media platform using Python Django framework with real-time interactions via WebSockets for live chats, instant notifications, and dynamic user interactions.',
        images: ['Connect/main.png', 'Connect/login.png', 'Connect/signup.png', 'Connect/setup.png', 'Connect/loader.png'],
        tags: ['Python', 'Django', 'WebSockets'],
        features: [
            'Real-time chat functionality with WebSockets',
            'Instant notifications system',
            'Dynamic user interactions',
            'Social media features',
            'Modern and responsive design'
        ],
        link: '#',
        github: '#'
    },
    'mastermoto': {
        title: 'MasterMoto: Inventory Optimization DSS',
        description: 'Web-based inventory optimization and demand forecasting system using ML.NET, integrated with POS platform to automate restocking. Improved inventory management by reducing stockouts.',
        images: ['Moto/dash.png', 'Moto/dash2.png', 'Moto/dss.png', 'Moto/dss1.png', 'Moto/login.png', 'Moto/audit.png', 'Moto/brand.png', 'Moto/category.png', 'Moto/cash.png', 'Moto/rep.png', 'Moto/trans.png'],
        tags: ['ASP.NET', 'ML.NET', 'C#', 'SSMS'],
        features: [
            'Machine learning-based demand forecasting',
            'Automated restocking system',
            'POS platform integration',
            'Inventory optimization',
            'Reduced stockouts and improved efficiency'
        ],
        link: '#',
        github: '#'
    },
    'catsaway': {
        title: 'Cats Away RPG Game',
        description: 'Built a role-playing game in Unity using C# with focus on gameplay mechanics, user interactions, and environment design. Designed engaging player experiences to enhance user retention.',
        images: ['cats/game1.png', 'cats/game2.png', 'cats/game3.png', 'cats/dash.png', 'cats/boss.png', 'cats/combat 1.png', 'cats/cambat 2.png', 'cats/concert.png', 'cats/end.png', 'cats/endtxt.png', 'cats/ice.png', 'cats/ice2.png', 'cats/monalog.png'],
        tags: ['Unity', 'C#', 'Game Development'],
        features: [
            'Engaging gameplay mechanics',
            'Interactive user experience',
            'Beautiful environment design',
            'Role-playing game features',
            'Enhanced user retention'
        ],
        link: '#',
        github: '#'
    },
    'healthcare-management': {
        title: 'Health Care Management System',
        description: 'A healthcare and clinic management platform developed with Python and Django to centralize patient information, appointments, medical records, staff operations, and day-to-day clinic workflows. The system is designed to make healthcare administration more organized, accessible, and efficient through a unified interface backed by SQLite.',
        images: ['new content/care/1.png', 'new content/care/2.jpeg', 'new content/care/3.jpeg'],
        tags: ['Python', 'Django', 'SQLite'],
        features: [
            'Patient profile and information management',
            'Appointment scheduling and workflow management',
            'Centralized medical records and patient history',
            'Staff and clinic operations management',
            'Organized day-to-day clinic workflows',
            'Django-based backend with SQLite data storage'
        ],
        link: '#',
        github: '#'
    },
    'company-management': {
        title: 'Company Management System with QR Code Attendance',
        description: 'PHP-based system with QR code attendance to automate attendance tracking. Utilized HTML, CSS, JavaScript, and XAMPP for frontend and backend development.',
        images: ['company/dash.png', 'company/login.png', 'company/qr.png', 'company/qr2.png', 'company/timein.png', 'company/chat.png', 'company/con1.png', 'company/con2.png', 'company/con3.png', 'company/con4.png', 'company/con5.png', 'company/con6.png', 'company/con7.png', 'company/con8.png', 'company/con9.png', 'company/log.png'],
        tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
        features: [
            'QR code-based attendance tracking',
            'Automated attendance management',
            'User-friendly interface',
            'XAMPP backend integration',
            'Improved operational efficiency'
        ],
        link: '#',
        github: '#'
    },
    'etcetera': {
        title: 'Etcetera Ecommerce Website',
        description: 'Built a robust e-commerce platform to streamline company operations and enhance efficiency. Developed using HTML, CSS, and JavaScript with advanced features for improved user experience.',
        images: ['ecom/1.png', 'ecom/2.png', 'ecom/3.png', 'ecom/4.png', 'ecom/5.png', 'ecom/6.png'],
        tags: ['HTML', 'CSS', 'JavaScript'],
        features: [
            'Full e-commerce functionality',
            'Product catalog management',
            'Shopping cart system',
            'User-friendly interface',
            'Streamlined company operations'
        ],
        link: '#',
        github: '#'
    }
};

// Initialize project modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    
    projectCards.forEach(card => {
        // Make entire card clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Prevent default if clicking on links
            if (e.target.closest('a')) {
                return;
            }
            
            const projectId = this.getAttribute('data-project');
            if (projectId && projectData[projectId]) {
                openProjectModal(projectData[projectId]);
            }
        });

        card.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            if (projectId && projectData[projectId]) {
                openProjectModal(projectData[projectId]);
            }
        });
        
        // Prevent card click when clicking on project links
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Update links with actual project data
                const projectId = card.getAttribute('data-project');
                if (projectId && projectData[projectId]) {
                    if (this.querySelector('.bi-link-45deg')) {
                        this.href = projectData[projectId].link;
                    } else if (this.querySelector('.bi-github')) {
                        this.href = projectData[projectId].github;
                    }
                }
            });
        });
    });
});

function openProjectModal(project) {
    // Update modal content
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectDescription').textContent = project.description;
    const projectLink = document.getElementById('modalProjectLink');
    const githubLink = document.getElementById('modalProjectGithub');
    projectLink.href = project.link || '#';
    githubLink.href = project.github || '#';
    projectLink.hidden = !project.link || project.link === '#';
    githubLink.hidden = !project.github || project.github === '#';
    const modalCounter = document.getElementById('modalProjectCounter');
    if (modalCounter) modalCounter.textContent = `01 / ${String(project.images?.length || 0).padStart(2, '0')}`;
    
    // Update carousel with images
    const carouselInner = document.getElementById('carouselInner');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    carouselInner.innerHTML = '';
    galleryThumbnails.innerHTML = '';
    
    if (project.images && project.images.length > 0) {
        project.images.forEach((image, index) => {
            // Create carousel item
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.innerHTML = `<img src="${image}" alt="${project.title} - Image ${index + 1}" class="d-block w-100 rounded" loading="lazy">`;
            carouselInner.appendChild(carouselItem);
            
            // Create thumbnail
            const thumbnail = document.createElement('div');
            thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
            thumbnail.addEventListener('click', function() {
                // Update active thumbnail
                galleryThumbnails.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                this.classList.add('active');
                
                // Navigate carousel
                const carousel = bootstrap.Carousel.getInstance(document.getElementById('projectCarousel'));
                if (carousel) {
                    carousel.to(index);
                }
                if (modalCounter) modalCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(project.images.length).padStart(2, '0')}`;
            });
            galleryThumbnails.appendChild(thumbnail);
        });
    } else {
        // Fallback if no images
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item active';
        carouselItem.innerHTML = `<img src="https://via.placeholder.com/800x400" alt="${project.title}" class="d-block w-100 rounded">`;
        carouselInner.appendChild(carouselItem);
    }
    
    // Update tags
    const tagsContainer = document.getElementById('modalProjectTags');
    tagsContainer.innerHTML = '';
    project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'badge bg-primary';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // Update features
    const featuresContainer = document.getElementById('modalProjectFeatures');
    featuresContainer.innerHTML = '';
    project.features.forEach(feature => {
        const featureElement = document.createElement('li');
        featureElement.className = 'mb-2';
        featureElement.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i>${feature}`;
        featuresContainer.appendChild(featureElement);
    });
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
    
    // Update active thumbnail when carousel slides
    const carousel = document.getElementById('projectCarousel');
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', function(event) {
            const activeIndex = event.to;
            const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === activeIndex);
            });
            if (modalCounter) modalCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(project.images.length).padStart(2, '0')}`;
        });
    }
}

// Console message
console.log('%c Christian Andal · Software Engineer ', 'background:#0a1020;color:#d5f16a;font-size:14px;padding:8px 12px;border-radius:6px;');

