/* =============================================
   ALAN HUMPHREYS — Website Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initMobileMenu();
  initScrollTop();
  initSmoothScroll();
  initActiveNav();
  initParallax();
});

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* --- Scroll Reveal (Intersection Observer) --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once visible, unobserve for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');

  function closeMenu() {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('active');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --- Scroll to top button --- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Smooth scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- Active nav link on scroll --- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* --- Subtle parallax on hero --- */
function initParallax() {
  const heroImage = document.querySelector('.hero-image-wrapper img');
  if (!heroImage) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrolled < heroHeight) {
      const yOffset = scrolled * 0.15;
      heroImage.style.transform = `translateY(${yOffset}px) scale(1.02)`;
    }
  }, { passive: true });
}

/* --- Form Submission Handler --- */
function handleFormSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('intakeForm');
  const formSuccess = document.getElementById('formSuccess');

  // Collect form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Log data (in production, this would be sent to a backend)
  console.log('Form submission:', data);

  // Show success message
  form.style.display = 'none';
  document.querySelector('.contact-form h3').style.display = 'none';
  document.querySelector('.contact-form .form-subtitle').style.display = 'none';
  formSuccess.classList.add('show');

  // Create mailto link as fallback
  const subject = encodeURIComponent(`New Inquiry from ${data.firstName} ${data.lastName}`);
  const body = encodeURIComponent(
    `Name: ${data.firstName} ${data.lastName}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || 'Not provided'}\n` +
    `Business Type: ${data.businessType}\n` +
    `Interest: ${data.interest}\n` +
    `Message: ${data.message || 'No message provided'}`
  );

  // Open mailto (optional — can be removed in production)
  window.open(`mailto:alanhumphreys72@gmail.com?subject=${subject}&body=${body}`, '_self');
}

/* --- Counter animation for hero stats --- */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = el.textContent.replace(/[\d,]/g, '');

  function update() {
    start += increment;
    if (start < target) {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }

  update();
}

// Animate counters when they come into view
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.number');
      numbers.forEach(num => {
        const text = num.textContent;
        const value = parseInt(text.replace(/[^\d]/g, ''));
        if (!isNaN(value) && value > 0) {
          const suffix = text.replace(/[\d,]/g, '');
          num.textContent = '0' + suffix;
          animateCounter(num, value);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    statObserver.observe(statsContainer);
  }

  // --- Product Details Thumbnails & Tabs ---
  initProductDetails();

  // --- Blog & Product Catalog Filters ---
  initCategoryFilters();
});

function initProductDetails() {
  // Thumbnail switching
  const thumbs = document.querySelectorAll('.thumb-btn');
  const mainImg = document.getElementById('mainProductImg');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const newSrc = thumb.getAttribute('data-img');
      if (mainImg && newSrc) {
        mainImg.src = newSrc;
      }
    });
  });

  // Quantity Picker
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('quantitySelect');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let current = parseInt(qtyInput.value) || 1;
      if (current > 1) qtyInput.value = current - 1;
    });

    qtyPlus.addEventListener('click', () => {
      let current = parseInt(qtyInput.value) || 1;
      if (current < 10) qtyInput.value = current + 1;
    });
  }

  // Chip options
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const parent = chip.parentElement;
      parent.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Product Tabs
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetTab = link.getAttribute('data-tab');
      tabLinks.forEach(tl => tl.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      link.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) activeContent.classList.add('active');
    });
  });
}

function initCategoryFilters() {
  // Blog Filters
  const blogBtns = document.querySelectorAll('.blog-cat-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  blogBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      blogCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Product Catalog Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      catalogCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

