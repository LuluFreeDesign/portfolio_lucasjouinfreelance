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

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');

const openLightbox = (img) => {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  const caption = img.dataset.caption || '';
  lightboxCaption.textContent = caption;
  lightboxCaption.hidden = !caption;
  lightbox.hidden = false;
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImg.src = '';
  lightboxCaption.textContent = '';
  lightboxCaption.hidden = true;
};

document.querySelectorAll('.exp-img').forEach((img) => {
  img.addEventListener('click', () => openLightbox(img));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === lightboxImg) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

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
      const target = toEnglish ? '../en/index.html' : '../fr/index.html';
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
    } else {
      animateScrollTo(targetY, 500);
    }
    history.pushState(null, '', `#${id}`);
  });
});
