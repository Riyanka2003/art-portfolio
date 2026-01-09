import Lenis from '@studio-freight/lenis';
const REPO_NAME = '/art-portfolio';
// --- 1. ASSETS ---
const ASSETS = [
  '/assets/Dzire Official Merch Design(1).webp', '/assets/Dzire Official Merch Design (2).webp', '/assets/Coconut Campaign slide4.webp',
  '/assets/Agomoni Brochure.webp', '/assets/Agomoni Poster.webp',
  '/assets/Interschool Banner Back side.webp', '/assets/Battle of Bands (1).webp', 
  '/assets/Battle of Bands (2).webp', '/assets/beatnik banner (1).webp', 
  '/assets/beatnik banner (2).webp', '/assets/beAtnik poster.webp',
  '/assets/Coconut Campaign slide1.webp', '/assets/Coconut Campaign slide2.webp', '/assets/Coconut Campaign slide3.webp', '/assets/Coconut Campaign slide5.webp',
  '/assets/Dzire Core Team 2025.webp', '/assets/Covelogo.webp',
  '/assets/cover (2).webp', '/assets/cover (3).webp', '/assets/cover (4).webp', 
  '/assets/cover.webp', '/assets/d1.webp', '/assets/d2.webp', '/assets/d3.webp', 
  '/assets/d4.webp', '/assets/d5.webp', '/assets/DANSPERATION 3.0 Banner.webp', 
  '/assets/DANSPERATION 3.0 Poster.webp', '/assets/Demo banner 1.webp', 
  '/assets/Demo Banner 2.webp', '/assets/Demo Logo 1.webp',
  '/assets/Design 1(Tshirt).webp', '/assets/DZIRE ID.webp', 
  '/assets/dzire logo black.webp', '/assets/E1.png', '/assets/E2.png',
  '/assets/Ele1.webp', '/assets/Ele2.webp', '/assets/Ele3.webp', '/assets/Ele4.webp',
  '/assets/Executives 2025.webp', '/assets/folk poster.webp', 
  '/assets/FOLKlore fiesta banner.webp', '/assets/Gift card.png',
  '/assets/Harmony Hunt Banner.webp', '/assets/harmony hunt poster.webp',
  '/assets/interschl dance.webp', '/assets/calender cards.webp','/assets/interschool banner.webp', 
  '/assets/interschool updates.webp', '/assets/k1.png', '/assets/k2.png', 
  '/assets/k3.png', '/assets/k4.png', '/assets/MASCOT.webp',
  '/assets/melody mania.webp', '/assets/MELODY mania poster.webp',
  '/assets/models need.png', '/assets/MOKSHA IX dates banner.webp',
  '/assets/MOKSHA IX OFFICIAL MERCH.webp', '/assets/moksha maestro banner (1).webp',
  '/assets/MOKSHA MAESTRO banner (2).webp', '/assets/Moksha MAestro poster.webp',
  '/assets/MOKSHA OFFICIAL FONT.webp', '/assets/Moksha Poster.webp',
  '/assets/moksha x malhar(1) (3).webp', '/assets/Official Dzire Logo.webp',
  '/assets/pass.webp', '/assets/Poster Demo.webp', '/assets/pre1.webp',
  '/assets/pre2.webp', '/assets/q1.webp', '/assets/q2.webp', '/assets/q3.webp',
  '/assets/q4.webp', '/assets/RedFm Collab.webp', '/assets/s1.webp',
  '/assets/s2.webp', '/assets/s3.webp', '/assets/s4.webp', '/assets/s5.webp',
  '/assets/Sangeet Avinya 2.0.webp', '/assets/Sangeet Avinya 3.0.webp',
  '/assets/Selestialogo.png', '/assets/Socials Demo.webp',
  '/assets/Stage Design Layout.webp', '/assets/thumb g.webp', '/assets/thumbd.webp',
  '/assets/Udaan finals.webp', '/assets/UDAAN P2 (5 x 4).webp'
];

// --- 2. DESCRIPTIONS (Fixed: Added this back) ---
const DESCRIPTIONS = {
    'Agomoni Poster': 'Agomoni Cultural Fest Branding',
    'beatnik poster': 'Beatnik Rap Battle Typography',
    'Moksha Poster': 'Moksha IX Identity System',
    'DZIRE ID': 'Team ID Card Design',
};

// --- 3. GENERATE GRID ---
const grid = document.getElementById('grid');
const loader = document.getElementById('loader');
let loadedImages = 0;

const shuffled = ASSETS.sort(() => 0.5 - Math.random());

shuffled.forEach((url) => {
    const filename = url.split('/').pop().split('.')[0].replace(/%20/g, ' ');
    let desc = "Graphic Design Project";
    
    for (const [key, value] of Object.entries(DESCRIPTIONS)) {
        if (filename.includes(key)) desc = value;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';

    // RANDOM FLOAT TIMING
    const randomDuration = 5 + Math.random() * 5; 
    const randomDelay = Math.random() * 5; 
    wrapper.style.animationDuration = `${randomDuration}s`;
    wrapper.style.animationDelay = `-${randomDelay}s`;

    const card = document.createElement('div');
    card.className = 'card';

    // SCATTER ROTATION
    const rotate = (Math.random() - 0.5) * 5; 
    card.style.transform = `rotate(${rotate}deg)`;

    card.innerHTML = `
      <div class="card-inner">
        <div class="front">
          <img src="${url}" loading="lazy" alt="${filename}">
        </div>
        <div class="back">
          <h3>${filename}</h3>
          <p>${desc}</p>
        </div>
      </div>
    `;

    // 1. FLIP (Single Click)
    card.addEventListener('click', () => card.classList.toggle('flipped'));

    // 2. ZOOM (Double Click)
    card.addEventListener('dblclick', (e) => {
        e.stopPropagation(); // Stop the flip from triggering
        openLightbox(url);
    });

    wrapper.appendChild(card);
    grid.appendChild(wrapper);

    const img = card.querySelector('img');
    img.onload = checkLoad;
    img.onerror = () => wrapper.style.display = 'none';
});

function checkLoad() {
    loadedImages++;
    if(loadedImages >= 10 && loader) {
       loader.style.opacity = '0';
       setTimeout(() => loader.style.display = 'none', 500);
    }
}
setTimeout(() => { if(loader) loader.style.display = 'none'; }, 2000);


// --- 4. SCROLL & TILT ---
const lenis = new Lenis({
    lerp: 0.07,
    smoothWheel: true,
    wheelMultiplier: 0.9,
});

const scrollContent = document.querySelector('.scroll-content');

function raf(time) {
    lenis.raf(time);
    
    const velocity = lenis.velocity;
    const tilt = Math.min(Math.max(velocity * 0.1, -5), 5);
    
    if(scrollContent) {
        scrollContent.style.transform = `rotateX(${-tilt}deg)`;
    }

    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- 5. UI LOGIC (Lightbox & Modal) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeModal = document.getElementById('close-modal');

// OPEN LIGHTBOX
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    lenis.stop(); // Stop scroll
}

// CLOSE LIGHTBOX
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lenis.start(); // Resume scroll
});

// ABOUT MODAL
aboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('active');
    lenis.stop();
});

closeModal.addEventListener('click', () => {
    aboutModal.classList.remove('active');
    lenis.start();
});

aboutModal.addEventListener('click', (e) => {
    if(e.target === aboutModal) {
        aboutModal.classList.remove('active');
        lenis.start();
    }
});
console.log("Deployed version 2.0");
