      const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the observed element if it has data-animate
                    if (entry.target.hasAttribute('data-animate')) {
                        const animation = entry.target.getAttribute('data-animate');
                        entry.target.classList.add(`animate-${animation}`);
                    }
                    // Animate children with data-animate
                    const animatedElements = entry.target.querySelectorAll('[data-animate]');
                    animatedElements.forEach(el => {
                        const animation = el.getAttribute('data-animate');
                        el.classList.add(`animate-${animation}`);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections and the footer
        document.querySelectorAll('section, footer').forEach(element => {
            observer.observe(element);
        });

        // Smooth scroll for navbar links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });


tailwind.config = {
            theme: {
                extend: {
                    animation: {
                       
                        'slide-up': 'slideUp 0.7s ease-out',
                        
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        slideLeft: {
                            '0%': { transform: 'translateX(20px)', opacity: '0' },
                            '100%': { transform: 'translateX(0)', opacity: '1' },
                        },
                    }
                }
            }
        }