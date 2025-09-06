/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links & mobile menu closing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                let offsetPosition = 0;
                // Don't offset for the #home link, scroll to the very top
                if (targetId !== '#home') {
                    const headerOffset = 70; // From --header-height in CSS
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                }
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if active
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    const successMessage = document.getElementById('form-success-message');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // In a real application, you would send the form data to a server here.
            // For this MVP, we'll just show a success message.
            
            successMessage.style.display = 'block';
            contactForm.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

});