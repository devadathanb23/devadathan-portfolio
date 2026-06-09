// 1. PULL CORD THEME TOGGLE
const themePull = document.getElementById('theme-pull');
const body = document.body;

themePull.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    
    // Simple audio-visual feedback
    console.log(`Theme switched to ${newTheme}`);
});

// 2. MAGNETIC BUTTON INTERACTION
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// 3. THE 4-SECOND NUDGE
const nudge = document.getElementById('nudge');

window.addEventListener('load', () => {
    setTimeout(() => {
        nudge.classList.add('visible');
    }, 4000);
});

// Hide nudge on first click/move of CTA
document.querySelector('.cta-container').addEventListener('mouseenter', () => {
    nudge.style.display = 'none';
});

// 4. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check on load