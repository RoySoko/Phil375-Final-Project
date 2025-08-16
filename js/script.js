/* Small utilities */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* Mobile nav toggle */
const navToggle = $('#navToggle');
const siteNav = $('#siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

/* Footer year */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Theme toggle (dark <-> light via simple invert) */
const themeBtn = $('#themeToggle');
if (themeBtn) {
  const KEY = 'privacy-theme';
  const saved = localStorage.getItem(KEY);
  if (saved === 'light') document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.style.filter.includes('invert(1)');
    if (isLight) {
      document.documentElement.style.filter = '';
      localStorage.setItem(KEY, 'dark');
      themeBtn.setAttribute('aria-pressed', 'false');
    } else {
      document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
      localStorage.setItem(KEY, 'light');
      themeBtn.setAttribute('aria-pressed', 'true');
    }
  });
}

/* Reveal on scroll */
const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 })
  : null;

if (observer) $$('.reveal').forEach(el => observer.observe(el));
