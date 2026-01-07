// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💍 ¡Bienvenido a nuestra invitación de boda! 💍',
        'font-size: 20px; color: #1E3A8A; font-weight: bold;');

    initMusic();
    initCountdown();
    initContentTransitions();
    initScrollAnimations();
    initSmoothScroll();
});

// ===================================
// MÚSICA DE FONDO
// ===================================
function initMusic() {
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    if (!music || !musicToggle || !musicIcon) {
        console.log('Elementos de música no encontrados');
        return;
    }

    let isPlaying = false;
    let hasInteracted = false;

    function startMusic() {
        if (!hasInteracted) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicIcon.className = 'fas fa-volume-up';
                    hasInteracted = true;
                    console.log('Música iniciada automáticamente');
                }).catch(e => {
                    console.log('Autoplay bloqueado, esperando interacción del usuario:', e);
                    isPlaying = false;
                    musicIcon.className = 'fas fa-volume-mute';
                });
            }
        }
    }

    ['click', 'touchstart', 'touchend', 'scroll'].forEach(event => {
        document.addEventListener(event, startMusic, { once: true, passive: true });
    });

    function toggleMusic(e) {
        e.preventDefault();
        e.stopPropagation();

        hasInteracted = true;

        if (music.paused || !isPlaying) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicIcon.className = 'fas fa-volume-up';
                    console.log('Música reproduciendo');
                }).catch(e => {
                    console.log('Error al reproducir:', e);
                    isPlaying = false;
                    musicIcon.className = 'fas fa-volume-mute';
                });
            }
        } else {
            music.pause();
            isPlaying = false;
            musicIcon.className = 'fas fa-volume-mute';
            console.log('Música pausada');
        }
    }

    musicToggle.addEventListener('click', toggleMusic);
    musicToggle.addEventListener('touchend', toggleMusic);

    music.addEventListener('play', function() {
        isPlaying = true;
        musicIcon.className = 'fas fa-volume-up';
    });

    music.addEventListener('pause', function() {
        isPlaying = false;
        musicIcon.className = 'fas fa-volume-mute';
    });
}

// ===================================
// CUENTA REGRESIVA - Abraham y Laura 2026
// ===================================
function initCountdown() {
    // Fecha: 19 de diciembre de 2026
    // Como la hora aún no está definida, usamos un horario estimado (19:00)
    const weddingYear = 2026;
    const weddingMonth = 11; // Diciembre (0=enero, 11=diciembre)
    const weddingDay = 19;
    const weddingHour = 19; // 7:00 PM estimado
    const weddingMinute = 0;

    const weddingDate = new Date(weddingYear, weddingMonth, weddingDay, weddingHour, weddingMinute, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            const countdown = document.getElementById('countdown');
            if (countdown) {
                countdown.innerHTML = '<div style="text-align: center; font-size: 2rem; color: var(--azul-talavera); font-family: var(--font-serif);">¡Es hoy! 🎉</div>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
    console.log('✅ Cuenta regresiva inicializada - Boda: 19 de Diciembre 2026');
}

// ===================================
// TRANSICIONES DE CONTENIDO
// ===================================
function initContentTransitions() {
    const contentSections = document.querySelectorAll('.content-section');

    if (contentSections.length === 0) {
        console.log('No se encontraron secciones de contenido');
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-80px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const sectionType = entry.target.dataset.section;

                if (sectionType === 'quote') {
                    animateQuoteLetters(entry.target);
                } else if (sectionType === 'initial') {
                    animateInitialSection(entry.target);
                } else if (sectionType === 'countdown') {
                    animateCountdownLabels(entry.target);
                } else if (sectionType === 'ceremony' || sectionType === 'reception') {
                    animateEventSection(entry.target);
                } else if (sectionType === 'dresscode') {
                    animateDressCodeSection(entry.target);
                } else if (sectionType === 'gifts') {
                    animateGiftsSection(entry.target);
                } else if (sectionType === 'social') {
                    animateSocialSection(entry.target);
                } else if (sectionType === 'rsvp') {
                    animateRSVPSection(entry.target);
                } else if (sectionType === 'info') {
                    animateInfoSection(entry.target);
                }
            }
        });
    }, observerOptions);

    contentSections.forEach(section => {
        observer.observe(section);
    });

    console.log('✅ Transiciones de contenido inicializadas');

    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateFooter(entry.target);
                }
            });
        }, observerOptions);

        footerObserver.observe(footer);
    }
}

// ===================================
// FUNCIONES DE ANIMACIÓN
// ===================================
function animateTextLetterByLetter(element, baseDelay = 0, speed = 25) {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';

    const text = element.textContent.trim();
    element.innerHTML = '';
    element.style.opacity = '1';

    const letters = [];
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.display = 'inline';
        span.style.transition = 'opacity 0.3s ease-out';

        if (text[i] === ' ') {
            span.style.opacity = '1';
        }

        element.appendChild(span);

        if (text[i].trim() !== '') {
            letters.push({ span, index: i });
        }
    }

    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);

    shuffledLetters.forEach((letter, i) => {
        setTimeout(() => {
            letter.span.style.opacity = '1';
        }, baseDelay + (i * speed));
    });
}

function animateQuoteLetters(quoteSection) {
    if (quoteSection.dataset.animated === 'true') return;
    quoteSection.dataset.animated = 'true';

    const quoteMessage = quoteSection.querySelector('.quote-message');
    if (!quoteMessage) return;

    animateTextLetterByLetter(quoteMessage, 0, 25);
}

function animateInitialSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const coupleNames = section.querySelector('.couple-names');
    const dateMonth = section.querySelector('.date-month');
    const dateDay = section.querySelector('.date-day');
    const dateNumber = section.querySelector('.date-number');
    const dateTime = section.querySelector('.date-time');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);
    if (coupleNames) animateTextLetterByLetter(coupleNames, 600, 40);
    if (dateMonth) animateTextLetterByLetter(dateMonth, 1200, 25);
    if (dateDay) animateTextLetterByLetter(dateDay, 1400, 25);
    if (dateNumber) animateTextLetterByLetter(dateNumber, 1600, 50);
    if (dateTime) animateTextLetterByLetter(dateTime, 1800, 25);
}

function animateCountdownLabels(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const labels = section.querySelectorAll('.countdown-label');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);

    labels.forEach((label, index) => {
        animateTextLetterByLetter(label, 600 + (index * 100), 20);
    });
}

function animateEventSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const eventTime = section.querySelector('.event-time');
    const eventLocation = section.querySelector('.event-location');
    const eventAddress = section.querySelector('.event-address');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);
    if (eventTime) animateTextLetterByLetter(eventTime, 600, 25);
    if (eventLocation) animateTextLetterByLetter(eventLocation, 800, 25);
    if (eventAddress) animateTextLetterByLetter(eventAddress, 1000, 20);
}

function animateDressCodeSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const dressCodeText = section.querySelector('.dress-code-text');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);
    if (dressCodeText) animateTextLetterByLetter(dressCodeText, 600, 40);
}

function animateGiftsSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const giftsSubtitle = section.querySelector('.gifts-subtitle');
    const giftsH3 = section.querySelector('.gifts-hero-content h3');
    const giftsP = section.querySelector('.gifts-hero-content p');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);
    if (giftsSubtitle) animateTextLetterByLetter(giftsSubtitle, 600, 25);
    if (giftsH3) animateTextLetterByLetter(giftsH3, 900, 30);
    if (giftsP) animateTextLetterByLetter(giftsP, 1200, 20);
}

function animateSocialSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const socialSubtitle = section.querySelector('.social-subtitle');
    const hashtag = section.querySelector('.hashtag');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);
    if (socialSubtitle) animateTextLetterByLetter(socialSubtitle, 600, 25);
    if (hashtag) animateTextLetterByLetter(hashtag, 900, 35);
}

function animateRSVPSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const rsvpSubtitle = section.querySelector('.rsvp-subtitle');
    const whatsappNames = section.querySelectorAll('.whatsapp-name');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);
    if (rsvpSubtitle) animateTextLetterByLetter(rsvpSubtitle, 600, 20);

    whatsappNames.forEach((name, index) => {
        animateTextLetterByLetter(name, 900 + (index * 200), 30);
    });
}

function animateInfoSection(section) {
    if (section.dataset.animated === 'true') return;
    section.dataset.animated = 'true';

    const heroSubtitle = section.querySelector('.hero-subtitle');
    const heroTitle = section.querySelector('.hero-title');
    const infoCards = section.querySelectorAll('.info-card h3');

    if (heroSubtitle) animateTextLetterByLetter(heroSubtitle, 0, 30);
    if (heroTitle) animateTextLetterByLetter(heroTitle, 300, 30);

    infoCards.forEach((card, index) => {
        animateTextLetterByLetter(card, 600 + (index * 150), 25);
    });

    const infoParagraphs = section.querySelectorAll('.info-card p');
    infoParagraphs.forEach((p, index) => {
        animateTextLetterByLetter(p, 1200 + (index * 150), 15);
    });
}

function animateFooter(footer) {
    if (footer.dataset.animated === 'true') return;
    footer.dataset.animated = 'true';

    const footerMessage = footer.querySelector('.footer-message');
    const footerNames = footer.querySelector('.footer-names');
    const footerDate = footer.querySelector('.footer-date');
    const footerCredit = footer.querySelector('.footer-credit');

    if (footerMessage) animateTextLetterByLetter(footerMessage, 0, 35);
    if (footerNames) animateTextLetterByLetter(footerNames, 500, 40);
    if (footerDate) animateTextLetterByLetter(footerDate, 900, 50);
    if (footerCredit) animateTextLetterByLetter(footerCredit, 1300, 20);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(`
        .countdown-item,
        .event-icon,
        .map-buttons,
        .social-links,
        .info-card,
        .whatsapp-item
    `);

    animatedElements.forEach((element, index) => {
        if (element.classList.contains('countdown-item')) {
            element.classList.add('scale-in');
            element.classList.add(`delay-${(index % 4) + 1}`);
        } else if (element.classList.contains('info-card')) {
            element.classList.add('fade-in-up');
            element.classList.add(`delay-${(index % 4) + 1}`);
        } else if (element.classList.contains('whatsapp-item')) {
            element.classList.add(index % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
        } else {
            element.classList.add('fade-in-up');
        }

        observer.observe(element);
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

console.log('%c✨ Invitación de Abraham y Laura cargada exitosamente ✨', 'font-size: 14px; color: #3B82F6; font-weight: bold;');