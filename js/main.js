/**
 * LUCAS JOUIN — Portfolio Freelance
 * JavaScript principal
 *
 * Fonctionnalités :
 * - Navigation par ancres (scroll smooth + highlight actif)
 * - Accordéons accessibles
 * - Toggle animations
 * - Observation des sections (Intersection Observer)
 */

(function () {
  'use strict';

  /* ==========================================
     1. NAVIGATION PAR ANCRES — Scroll & Active State
     ========================================== */

  const navLinks = document.querySelectorAll('.sidebar-nav__link');
  const sections = document.querySelectorAll('.section');

  /**
   * Met à jour le lien actif dans la sidebar en fonction
   * de la section visible dans le viewport.
   */
  function initScrollSpy() {
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            setActiveLink(id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /**
   * Applique la classe active au lien correspondant à l'id donné.
   * @param {string} sectionId
   */
  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href').substring(1);
      link.classList.toggle('sidebar-nav__link--active', href === sectionId);
    });
  }

  /**
   * Navigation smooth au clic sur un lien ancre.
   */
  function initAnchorNavigation() {
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: document.body.classList.contains('no-animations') ? 'auto' : 'smooth',
            block: 'start',
          });

          // Mise à jour du focus pour l'accessibilité
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  /* ==========================================
     2. ACCORDÉONS ACCESSIBLES
     ========================================== */

  function initAccordions() {
    const triggers = document.querySelectorAll('.accordion__trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const contentId = trigger.getAttribute('aria-controls');
        const content = document.getElementById(contentId);

        if (!content) return;

        if (isExpanded) {
          // Fermer
          trigger.setAttribute('aria-expanded', 'false');
          content.hidden = true;
        } else {
          // Ouvrir
          trigger.setAttribute('aria-expanded', 'true');
          content.hidden = false;
        }
      });
    });
  }

  /* ==========================================
     3. TOGGLE ANIMATIONS
     ========================================== */

  function initAnimationsToggle() {
    const toggleSidebar = document.getElementById('toggle-animations');
    const toggleFooter = document.getElementById('toggle-animations-footer');
    const toggles = [toggleSidebar, toggleFooter].filter(Boolean);

    if (!toggles.length) return;

    // Respecter prefers-reduced-motion par défaut
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      toggles.forEach((t) => (t.checked = false));
      document.body.classList.add('no-animations');
    }

    /**
     * Synchronise tous les toggles et applique/retire la classe no-animations.
     * @param {boolean} enabled
     */
    function setAnimations(enabled) {
      document.body.classList.toggle('no-animations', !enabled);
      document.documentElement.style.scrollBehavior = enabled ? 'smooth' : 'auto';
      toggles.forEach((t) => (t.checked = enabled));
    }

    toggles.forEach((toggle) => {
      toggle.addEventListener('change', () => {
        setAnimations(toggle.checked);
      });
    });
  }

  /* ==========================================
     4. LIGHTBOX — Visualisation d'images
     ========================================== */

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox__close') : null;
    const overlay = lightbox ? lightbox.querySelector('.lightbox__overlay') : null;
    const thumbs = document.querySelectorAll('[data-lightbox]');

    if (!lightbox || !thumbs.length) return;

    /** Ouvre le lightbox avec l'image correspondante */
    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    /** Ferme le lightbox */
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        // Pour l'instant, on cherche une <img> dans le thumb, sinon on utilise le placeholder
        const img = thumb.querySelector('img');
        if (img) {
          openLightbox(img.src, img.alt);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (overlay) overlay.addEventListener('click', closeLightbox);

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  /* ==========================================
     5. INITIALISATION
     ========================================== */

  function init() {
    initScrollSpy();
    initAnchorNavigation();
    initAccordions();
    initAnimationsToggle();
    initLightbox();
  }

  // Lancer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
