const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.side-nav-link');

const linkForSection = (id) =>
  document.querySelector(`.side-nav-link[href="#${id}"]`);

const setActive = (id) => {
  navLinks.forEach((link) => link.classList.remove('active'));
  const link = linkForSection(id);
  if (link) link.classList.add('active');
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-10% 0px -80% 0px' }
);

sections.forEach((section) => observer.observe(section));

if (sections[0]) setActive(sections[0].id);

// --- Améliorations d'accessibilité (RGAA) ---
const isEN = document.documentElement.lang === 'en';

// 13.5 — alternative textuelle de la note en étoiles
const starLabel = isEN ? 'Rating: 5 out of 5 stars' : 'Note : 5 sur 5 étoiles';
document.querySelectorAll('.stars').forEach((s) => {
  s.setAttribute('role', 'img');
  s.setAttribute('aria-label', starLabel);
});

// 6.1 — intitulés de liens explicites pour les avis (nom de la personne)
const linkedinBase = isEN ? 'See the LinkedIn profile of ' : 'Voir le profil LinkedIn de ';
document.querySelectorAll('.testimonial-content a').forEach((a) => {
  const card = a.closest('.accordion');
  const title = card && card.querySelector('.accordion-title');
  if (title) a.setAttribute('aria-label', linkedinBase + title.textContent.trim());
});

const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');

  let lightboxTrigger = null;

  const openLightbox = (img) => {
    lightboxTrigger = img;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    const caption = img.dataset.caption || '';
    lightboxCaption.textContent = caption;
    lightboxCaption.hidden = !caption;
    lightbox.hidden = false;
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.removeAttribute('src');
    lightboxCaption.textContent = '';
    lightboxCaption.hidden = true;
    if (lightboxTrigger) {
      lightboxTrigger.focus();
      lightboxTrigger = null;
    }
  };

  // 7.3 — images agrandissables opérables au clavier (bouton + Entrée/Espace)
  document.querySelectorAll('.exp-img').forEach((img) => {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-haspopup', 'dialog');
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target === lightboxImg) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
  // piège de focus : maintenir le focus dans la boîte de dialogue
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && !lightbox.hidden) {
      event.preventDefault();
      lightboxClose.focus();
    }
  });
}

const langRadios = document.querySelectorAll('.lang-select input[type="radio"]');

if (langRadios.length) {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.hidden = true;
  loadingOverlay.innerHTML =
    '<p class="loading-text"></p>' +
    '<div class="loading-bar" role="progressbar"><div class="loading-bar-fill"></div></div>';
  document.body.appendChild(loadingOverlay);

  const loadingText = loadingOverlay.querySelector('.loading-text');

  langRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;

      const toEnglish = radio.value === 'en';
      const onLegal = /mentions-legales|legal-notice/.test(window.location.pathname);
      const target = toEnglish
        ? (onLegal ? '../en/legal-notice.html' : '../en/index.html')
        : (onLegal ? '../fr/mentions-legales.html' : '../fr/index.html');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        || document.documentElement.classList.contains('no-animations');

      loadingText.textContent = toEnglish
        ? "Switching to His Majesty's language"
        : "Chargement d'un je-ne-sais-quoi !";

      loadingOverlay.hidden = false;

      window.setTimeout(() => {
        window.location.href = target;
      }, reduce ? 300 : 1300);
    });
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const animateScrollTo = (targetY, duration) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const triggerEcho = (link) => {
  const dot = link.querySelector('.dot');
  if (!dot) return;
  dot.classList.remove('echo');
  void dot.offsetWidth;
  dot.classList.add('echo');
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    triggerEcho(link);

    const targetY = target.getBoundingClientRect().top + window.scrollY - 40;
    if (prefersReducedMotion || document.documentElement.classList.contains('no-animations')) {
      window.scrollTo(0, targetY);
    } else {
      animateScrollTo(targetY, 500);
    }
    // 12.7 — déplacer le focus vers la cible (lien d'évitement / navigation)
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.pushState(null, '', `#${id}`);
  });
});

// --- Site animations toggle (accessibility) ---
const animToggle = document.getElementById('anim-toggle');

const applyAnimations = (enabled) => {
  document.documentElement.classList.toggle('no-animations', !enabled);
  if (animToggle) animToggle.checked = enabled;
};

let storedAnimations = 'on';
try { storedAnimations = localStorage.getItem('site-animations') || 'on'; } catch (e) {}
applyAnimations(storedAnimations !== 'off');

if (animToggle) {
  animToggle.addEventListener('change', () => {
    const enabled = animToggle.checked;
    try { localStorage.setItem('site-animations', enabled ? 'on' : 'off'); } catch (e) {}
    applyAnimations(enabled);
  });
}
