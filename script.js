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

const openLightbox = (img) => {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.hidden = false;
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImg.src = '';
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
