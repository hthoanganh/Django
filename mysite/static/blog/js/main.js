document.addEventListener('DOMContentLoaded', () => {

    // --- KHAI BÁO CÁC PHẦN TỬ ---
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('.card-wrapper > section');
    const nav = document.querySelector('.main-nav');
    const stickyHeader = document.getElementById('sticky-header');
    const mainHeader = document.getElementById('header');
    const themeButton = document.getElementById('interactive-button');
    const aboutSection = document.getElementById('about');

    // --- CÁC HÀM KHỞI TẠO ---

    /**
     * Khởi tạo hiệu ứng gõ chữ
     */
    function startTypingEffect(element) {
        if (!element) return;
        const originalText = element.textContent.trim();
        element.textContent = '';
        element.style.display = 'inline';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                element.classList.add('typing-done');
            }
        }, 100);
    }

    /**
     * Khởi tạo các hiệu ứng kích hoạt khi cuộn
     */
    function initScrollAnimations() {
        // Observer cho các card hiện ra và kích hoạt typewriter
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('show');

                    // Tìm và kích hoạt typewriter nếu có trong card này
                    const typewriterElement = card.querySelector('.typewriter-text');
                    if (typewriterElement && !typewriterElement.classList.contains('typing-done')) {
                        startTypingEffect(typewriterElement);
                    }

                    observer.unobserve(card); // Tối ưu: Ngừng theo dõi sau khi đã hiện
                }
            });
        }, { threshold: 0.3 });
        if (cards.length) {
            cards.forEach(card => cardObserver.observe(card));
        }

        // Observer cho sticky header
        if (stickyHeader && mainHeader) {
            const headerObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    stickyHeader.classList.toggle('visible', !entry.isIntersecting);
                });
            }, { rootMargin: "-100px 0px 0px 0px" });
            headerObserver.observe(mainHeader);
        }

        // Observer cho hiệu ứng mục "About Me"
        if (aboutSection) {
            const aboutObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutSection.classList.add('visible');
                    }
                });
            }, { threshold: 0.3 });
            aboutObserver.observe(aboutSection);
        }
    }

    /**
     * Khởi tạo gạch chân động cho menu
     */
    function initNavIndicator() {
        if (!nav || sections.length === 0) return;

        const indicator = document.createElement('span');
        indicator.classList.add('nav-indicator');
        nav.appendChild(indicator);
        let activeSection = sections[0];
        let isTicking = false;

        function updateIndicator() {
            if (!activeSection) return;
            const activeLink = document.querySelector(`.main-nav a[href="#${activeSection.id}"]`);
            if (!activeLink) return;

            const rect = activeSection.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            const nextSection = activeSection.nextElementSibling;
            const nextLink = nextSection ? document.querySelector(`.main-nav a[href="#${nextSection.id}"]`) : null;

            let currentLeft = activeLink.offsetLeft;
            let currentWidth = activeLink.offsetWidth;

            if (nextLink && progress > 0) {
                currentLeft += (nextLink.offsetLeft - currentLeft) * progress;
                currentWidth += (nextLink.offsetWidth - currentWidth) * progress;
            }
            indicator.style.left = `${currentLeft}px`;
            indicator.style.width = `${currentWidth}px`;
        }

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) activeSection = entry.target;
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => sectionObserver.observe(section));

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateIndicator();
                    isTicking = false;
                });
                isTicking = true;
            }
        });
        updateIndicator();
    }

    /**
     * Khởi tạo chức năng cho nút bấm (Dark Mode, Mây)
     */
    function initThemeToggle() {
        if (!themeButton) return;

        const themeIcon = document.getElementById('theme-icon');
        const cloudOverlay = document.getElementById('cloud-intro');

        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun', isDarkMode);
                themeIcon.classList.toggle('fa-moon', !isDarkMode);
            }

            if (cloudOverlay) {
                cloudOverlay.classList.add('animate');
                setTimeout(() => {
                    cloudOverlay.classList.remove('animate');
                }, 3000);
            }
        });
    }

    // --- CHẠY CÁC HÀM KHỞI TẠO ---
    initScrollAnimations();
    initNavIndicator();
    initThemeToggle();
});