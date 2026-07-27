// --- Navigation & Scroll Effects ---
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');

// Handle Navbar styling and Progress bar on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    // Navbar background blur
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';

    // Active Link Highlighting (ScrollSpy)
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to Top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    // Toggle icon between bars and times (X)
    const icon = mobileMenu.querySelector('i');
    if(navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileMenu.querySelector('i').classList.remove('fa-times');
        mobileMenu.querySelector('i').classList.add('fa-bars');
    });
});

// --- Typewriter Effect ---
const nameElement = document.getElementById('name');
const textToType = "Shahnur";
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        nameElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    }
}

// Start typing effect on load
window.addEventListener('load', () => {
    nameElement.innerHTML = '';
    setTimeout(typeWriter, 500); // Slight delay before starting
});

// --- Scroll Reveal Animations (Enhanced with Staggering) ---
const animateElements = document.querySelectorAll('.skill-item, .project, .info-card, .section-subtitle, h2');

animateElements.forEach(el => el.classList.add('animate-element'));

let delayCounter = 0; 
let delayTimer = null;

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply a staggered delay so grids load sequentially instead of all at once
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delayCounter * 100); 
            
            delayCounter++;
            animateObserver.unobserve(entry.target);
        }
    });
    
    // Reset the delay counter after a short break to allow separate sections to start from 0 delay
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
        delayCounter = 0;
    }, 150);
}, { threshold: 0.15 });

animateElements.forEach(el => animateObserver.observe(el));

// --- Working Contact Form Setup ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    // Change button text while loading
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerText = "Message sent successfully! I will get back to you soon.";
            formStatus.style.color = "#3bffc4";
            contactForm.reset();
        } else {
            formStatus.innerText = "Oops! There was a problem submitting your form.";
            formStatus.style.color = "#ff6347";
        }
    } catch (error) {
        formStatus.innerText = "Oops! There was a problem submitting your form.";
        formStatus.style.color = "#ff6347";
    }

    // Restore button
    submitBtn.innerHTML = originalBtnHTML;
    submitBtn.disabled = false;
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        formStatus.innerText = "";
    }, 5000);
});