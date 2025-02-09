(function ($) {
    "use strict";

    // Enhanced Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    // Initialize WOW.js with enhanced options
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true
    }).init();

    // Enhanced Carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Enhanced Counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Enhanced Scroll to Top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
            $('.back-to-top').addClass('animate-float');
        } else {
            $('.back-to-top').fadeOut('slow');
            $('.back-to-top').removeClass('animate-float');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Mouse Trail Effect
    const trails = [];
    const trailCount = 20;

    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            delay: i * 2
        });
    }

    document.addEventListener('mousemove', (e) => {
        trails.forEach((trail, index) => {
            setTimeout(() => {
                trail.x = e.clientX;
                trail.y = e.clientY;
                trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
                trail.element.style.opacity = 1 - (index / trailCount);
            }, trail.delay);
        });
    });

    // Enhanced Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (localStorage.getItem('darkMode') !== 'disabled' && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
    }

    darkModeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', 
            body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
        );
        updateDarkModeIcon();
    });

    function updateDarkModeIcon() {
        if (darkModeToggle) {
            darkModeToggle.innerHTML = body.classList.contains('dark-mode') 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }

    // Enhanced WhatsApp Integration
    window.sendWhatsAppMessage = function() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            project: document.getElementById('project').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Form validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        const whatsappMessage = `Name: ${formData.name}%0aEmail: ${formData.email}%0aPhone: ${formData.phone}%0aProject: ${formData.project}%0aSubject: ${formData.subject}%0aMessage: ${formData.message}`;
        const whatsappURL = `https://api.whatsapp.com/send?phone=+919342446559&text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
    };

    // Interactive Background Effect
    const sections = document.querySelectorAll('.section-transition');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

})(jQuery);