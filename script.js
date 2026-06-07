/* ============================================================
   PLATBASE TECHNOLOGIES — SHARED JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll shadow ─────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger / Mobile menu ──────────────────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on any link tap
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active nav link ──────────────────────────────────────── */
  (function highlightNav() {
    const raw    = window.location.pathname.split('/').pop();
    const page   = raw === '' ? 'index.html' : raw;
    const allLinks = document.querySelectorAll('.navbar-links a, .mobile-menu ul a');
    allLinks.forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      const match = href === page || (page === 'index.html' && (href === '' || href === 'index.html'));
      a.classList.toggle('active', match);
    });
  })();

  /* ── Scroll reveal (IntersectionObserver) ─────────────────── */
  (function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    els.forEach(el => observer.observe(el));
  })();

  /* ── Form submission (client-side feedback only) ─────────── */
  document.querySelectorAll('form[data-feedback]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const successEl = document.getElementById(form.dataset.feedback);
      if (successEl) {
        form.style.display = 'none';
        successEl.classList.add('show');
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* ── Smooth anchor scroll (same-page # links) ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Animate nav entrance ─────────────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.28s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  // fallback
  setTimeout(() => { document.body.style.opacity = '1'; }, 300);

})();
