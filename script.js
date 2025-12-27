function switchView(viewId) {
            // Remove active class from buttons
            document.querySelectorAll('.view-btn').forEach(el => el.classList.remove('active'));
            
            // Scroll to selected screen
            document.getElementById(viewId).scrollIntoView({ behavior: 'smooth' });
            
            // Find specific button and highlight
            const btns = document.querySelectorAll('.view-btn');
            btns.forEach(btn => {
                if(btn.innerText.toLowerCase().includes(viewId.toLowerCase()) || 
                  (viewId === 'detail' && btn.innerText.includes('Detail')) || 
                  (viewId === 'auth' && btn.innerText.includes('Login'))) {
                    btn.classList.add('active');
                }
            });
        }

let isManualScroll = false;

window.addEventListener('scroll', () => {
    if (isManualScroll) return;
    const scrollY = window.scrollY + window.innerHeight / 2; // Use middle of screen
    const sections = document.querySelectorAll('.device-screen');
    sections.forEach(section => {
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;
        if (scrollY >= offsetTop && scrollY < offsetBottom) {
            const id = section.id;
            document.querySelectorAll('.view-btn').forEach(el => el.classList.remove('active'));
            const btns = document.querySelectorAll('.view-btn');
            btns.forEach(btn => {
                if(btn.innerText.toLowerCase().includes(id.toLowerCase())) {
                    btn.classList.add('active');
                }
            });
        }
    });

    // Nav blur on scroll
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Typing effect for the name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '|';
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = text; // Remove cursor at end
        }
    }
    type();
}

// Animate on scroll
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.style.animationDelay = (index * 0.1) + 's';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.device-screen, .skill-item, .project').forEach(el => {
    animateObserver.observe(el);
});

// Initialize effects on load
window.addEventListener('load', () => {
    const nameElement = document.getElementById('name');
    if (nameElement) {
        typeWriter(nameElement, 'Shahnur', 150);
    }
});

// Back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.id = 'backToTop';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #3bffc4;
    color: #000;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 1000;
`;
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'scale(1)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'scale(0.8)';
    }
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'progressBar';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(to right, #3bffc4, #ff6347);
    z-index: 1001;
    transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Form validation and email sending
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        
        // Initialize EmailJS (replace with your user ID)
        emailjs.init('your_user_id_here');
        
        // Send email (replace with your service and template IDs)
        emailjs.send('your_service_id_here', 'your_template_id_here', {
            from_name: name,
            from_email: email,
            message: message
        }).then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        }, (error) => {
            alert('Failed to send message: ' + error.text);
        });
    });
}