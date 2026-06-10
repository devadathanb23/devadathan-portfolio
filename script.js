/* ============================================================
   DEVADATHAN B — Portfolio
   script.js
   ============================================================ */

/* ── 1. THEME TOGGLE (Floating Pull Cord Switch) ──────────── */
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;
const cordPull    = document.getElementById('cordPull');

// Restore saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Physics bounce on pull
  cordPull.style.transition = 'transform 0.08s ease-in';
  cordPull.style.transform  = 'translateY(8px)';
  setTimeout(() => {
    cordPull.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    cordPull.style.transform  = 'translateY(0)';
  }, 80);
});

/* ── 2. CUSTOM CURSOR ─────────────────────────────────────── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

let mouseX = 0, mouseY = 0;
let curX   = 0, curY   = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Dot snaps instantly
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Ring follows with lag
function animateCursor() {
  curX += (mouseX - curX) * 0.10;
  curY += (mouseY - curY) * 0.10;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover state on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .tool-card, .project-row, .work-small-card, .think-item, .cap-item, .process-col, .testimonial-card'
);
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorDot.classList.add('dot-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorDot.classList.remove('dot-hover');
  });
});

// Hide/show on window leave
document.addEventListener('mouseleave', () => {
  cursor.style.opacity    = '0';
  cursorDot.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity    = '1';
  cursorDot.style.opacity = '1';
});

/* ── 3. MAGNETIC CTA BUTTON ───────────────────────────────── */
const heroBtn = document.getElementById('heroCtaBtn');

if (heroBtn) {
  const RADIUS = 220; // Increased magnetic pull radius from 140px to 220px

  document.addEventListener('mousemove', e => {
    const rect   = heroBtn.getBoundingClientRect();
    const btnCX  = rect.left + rect.width  / 2;
    const btnCY  = rect.top  + rect.height / 2;
    const dx     = e.clientX - btnCX;
    const dy     = e.clientY - btnCY;
    const dist   = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      const pull = (RADIUS - dist) / RADIUS; // 0 → 1 as you get closer
      const moveX = dx * pull * 0.22; // Slower, premium movement (from 0.35 to 0.22)
      const moveY = dy * pull * 0.22;
      heroBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      heroBtn.style.transform = 'translate(0, 0)';
    }
  });

  // Snap back on leave (0.7s slow transition back to center)
  heroBtn.addEventListener('mouseleave', () => {
    heroBtn.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    heroBtn.style.transform  = 'translate(0, 0)';
  });
  heroBtn.addEventListener('mouseenter', () => {
    heroBtn.style.transition = 'transform 0.1s ease';
  });
}

/* ── 4. SONAR PING ANIMATION TRIGGER ──────────────────────── */
const heroCtaBtn = document.getElementById('heroCtaBtn');

if (heroCtaBtn) {
  // After page loads, wait 4 seconds, then start the sonar animation
  setTimeout(() => {
    if (!heroCtaBtn.classList.contains('sonar-disabled')) {
      heroCtaBtn.classList.add('sonar-active');
    }
  }, 4000);

  // Stop sonar animation permanently once the user clicks the CTA button
  heroCtaBtn.addEventListener('click', () => {
    heroCtaBtn.classList.add('sonar-disabled');
    heroCtaBtn.classList.remove('sonar-active');
  });
}

/* ── 5. SCROLL REVEAL ─────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// Hero elements reveal immediately on load
document.querySelectorAll('#hero .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('in-view'), i * 100 + 80);
});

/* ── 6. TOOL BAR FILL (on scroll into view) ───────────────── */
const toolCards = document.querySelectorAll('.tool-card');

const toolObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      toolObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

toolCards.forEach(card => toolObserver.observe(card));

/* ── 7. NAV SCROLL EFFECT ─────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 48) {
    nav.style.borderBottomColor = 'var(--border-strong)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
});

/* ── 8. ACTIVE NAV LINK (highlight on scroll) ─────────────── */
const sections  = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── 9. SMOOTH SCROLL FOR NAV LINKS ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});