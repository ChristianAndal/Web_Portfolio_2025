// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(30, 41, 59, 0.98)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

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

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials!
// Get them from: https://www.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "YOUR_PUBLIC_KEY",        // Replace with your Public Key from EmailJS dashboard
    SERVICE_ID: "YOUR_SERVICE_ID",        // Replace with your Service ID
    TEMPLATE_ID: "YOUR_TEMPLATE_ID"       // Replace with your Template ID
};

// Initialize EmailJS when library is loaded
window.addEventListener('load', function() {
    if (typeof emailjs !== 'undefined') {
        // Check if Public Key is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
            console.warn('EmailJS not configured! Please update EMAILJS_CONFIG in script.js');
        } else {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
        }
    } else {
        console.error('EmailJS library not loaded!');
    }
});

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
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
            formMessage.innerHTML = '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle"></i> EmailJS is not configured yet. Please check the console for setup instructions or email me directly at <a href="mailto:christianmiguelandal@gmail.com">christianmiguelandal@gmail.com</a></div>';
            console.error('EmailJS Configuration Missing!');
            console.log('Please update EMAILJS_CONFIG in script.js with your credentials from https://www.emailjs.com/');
            return;
        }
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            formMessage.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> EmailJS library not loaded. Please refresh the page or email me directly at <a href="mailto:christianmiguelandal@gmail.com">christianmiguelandal@gmail.com</a></div>';
            return;
        }
        
        // Get form data
        const formData = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'christianmiguelandal@gmail.com' // Your Gmail address
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
                
                formMessage.innerHTML = `<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> ${errorMessage} <br><small>Or email me directly at <a href="mailto:christianmiguelandal@gmail.com">christianmiguelandal@gmail.com</a></small></div>`;
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            });
    });
}

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

// Intersection Observer for fade-in animations
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

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .timeline-item, .award-card, .about-image, .contact-info'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Add typing effect to hero section (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-content h1 span');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && scrolled < heroSection.offsetHeight) {
        const parallaxSpeed = 0.3;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        
        if (heroContent) {
            heroContent.style.opacity = 1 - (scrolled / heroSection.offsetHeight) * 0.5;
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px) scale(${1 - scrolled / heroSection.offsetHeight * 0.1})`;
        }
    }
});

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

// Add hover effect to skill badges
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Modal Functionality
const projectData = {
    'goventure': {
        title: 'GoVenture ERP',
        description: 'Enterprise Resource Planning system developed using Python Django framework with SSMS database integration. Streamlining business processes and operations management for enhanced efficiency and productivity.',
        images: ['Goventure/goventure.jpg'],
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
    document.getElementById('modalProjectLink').href = project.link;
    document.getElementById('modalProjectGithub').href = project.github;
    
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
            carouselItem.innerHTML = `<img src="${image}" alt="${project.title} - Image ${index + 1}" class="d-block w-100 rounded">`;
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
        });
    }
}

// Console message
console.log('%c Welcome to My Portfolio! ', 'background: #007bff; color: white; font-size: 20px; padding: 10px;');
console.log('%c Let\'s build something amazing together! ', 'background: #764ba2; color: white; font-size: 14px; padding: 5px;');

