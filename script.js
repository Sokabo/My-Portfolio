// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when a link is clicked
mainNav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Sticky header shrink/shadow on scroll
// =========================================================
const siteHeader = document.getElementById('siteHeader');

function updateHeaderOnScroll() {
  if (window.scrollY > 12) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
document.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

// =========================================================
// Active nav link highlighting based on section in view
// =========================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
sections.forEach((section) => sectionObserver.observe(section));

// =========================================================
// Scroll reveal animation
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// =========================================================
// Contact form validation + submit feedback
// (No backend wired up yet — replace the TODO below with
// a real endpoint, e.g. Formspree, Netlify Forms, or your
// own API route, when you're ready to receive messages.)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function validateField(field) {
  const row = field.closest('.form-row');
  let valid = field.checkValidity();

  if (field.type === 'email' && field.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = emailPattern.test(field.value.trim());
  }

  row.classList.toggle('invalid', !valid);
  return valid;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const requiredFields = contactForm.querySelectorAll('[required]');
  let allValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) allValid = false;
  });

  if (!allValid) {
    formStatus.textContent = 'Please check the highlighted fields.';
    formStatus.style.color = '#B23A2E';
    return;
  }

  // TODO: replace this block with a real submission,
  // e.g.:
  // fetch('https://formspree.io/f/yourFormId', {
  //   method: 'POST',
  //   headers: { 'Accept': 'application/json' },
  //   body: new FormData(contactForm)
  // });

  formStatus.textContent = "Thanks — I'll get back to you within a day.";
  formStatus.style.color = '#2F5233';
  contactForm.reset();
});

// Clear the invalid state as the person fixes a field
contactForm.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => {
    if (field.closest('.form-row').classList.contains('invalid')) {
      validateField(field);
    }
  });
});

// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();