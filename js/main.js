/* =====================================================
   DHANANJAY RAWAT PORTFOLIO — main.js
   Complete file — copy paste into js/main.js
   Works for index.html AND all pages/*.html files
   ===================================================== */

// ============================================================
// LOADER
// ============================================================
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  const loader = document.getElementById('loader');
  if (!loader) return;
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 15 + 5;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => loader.classList.add('hidden'), 500);
    }
    fill.style.width = p + '%';
  }, 60);
});

// ============================================================
// CUSTOM CURSOR
// ============================================================
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .skill-card, .asset-card, .project-card, .ds-card, .marquee-item, .design-thumb').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = '#00c4cc';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--accent)';
    });
  });
}

// ============================================================
// DARK / LIGHT THEME TOGGLE
// ============================================================
const themeBtn = document.getElementById('themeToggle');
// Apply saved theme on page load
let isDark = localStorage.getItem('theme') !== 'light';
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ============================================================
// MOBILE HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close menu when a link is clicked
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ============================================================
// NAVBAR — Add background when scrolled
// ============================================================
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================================
// TYPEWRITER EFFECT (homepage only)
// ============================================================
const tw = document.getElementById('typewriter');
if (tw) {
  const phrases = [
    'Aspiring Full Stack Developer',
    'Godot Game Developer 🎮',
    '3D Artist with Blender 🎨',
    'Canva Designer 🖌️',
    'B.Tech IT Student 🎓',
    'FLUX Club Member ⚡',
    'Open Source Enthusiast 🌟',
    'Building the Future 🚀'
  ];
  let pi = 0, ci = 0, del = false;
  function type() {
    const p = phrases[pi];
    tw.textContent = del ? p.slice(0, ci--) : p.slice(0, ci++);
    if (!del && ci > p.length) { del = true; setTimeout(type, 1800); return; }
    if (del && ci < 0) { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, del ? 50 : 90);
  }
  type();
}

// ============================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ============================================================
// ANIMATED STAT COUNTERS
// ============================================================
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.getAttribute('data-target');
      let cur = 0;
      const step = target / 60;
      const iv = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target; clearInterval(iv); }
        else el.textContent = Math.floor(cur);
      }, 25);
      cntObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(c => cntObs.observe(c));

// ============================================================
// SKILL PROGRESS BAR ANIMATION
// ============================================================
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const w = e.target.getAttribute('data-width') || '0';
      e.target.style.width = w + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-progress').forEach(b => {
  b.style.width = '0';
  barObs.observe(b);
});

// ============================================================
// PROJECT FILTER BUTTONS (homepage)
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(c => {
      c.classList.toggle('hidden', f !== 'all' && c.getAttribute('data-cat') !== f);
    });
  });
});

// ============================================================
// CONTACT FORM
// ============================================================
function handleForm(e) {
  e.preventDefault();
  showToast('✅ Message sent! Add Formspree to make this real.');
  e.target.reset();
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ============================================================
// DESIGN SHOWCASE — Homepage video hover
// ============================================================
const hpVideo = document.getElementById('homepageVideo');
const videoCard = document.getElementById('dsVideoCard');
if (hpVideo && videoCard) {
  videoCard.addEventListener('mouseenter', () => hpVideo.play());
  videoCard.addEventListener('mouseleave', () => {
    hpVideo.pause();
    hpVideo.currentTime = 0;
  });
}

// ============================================================
// THREE.JS — HERO CANVAS (floating particles + wireframe sphere)
// ============================================================
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 5;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  function resize() {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles
  const count = 1500;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    const r = Math.random();
    col[i * 3] = r > 0.5 ? 0.49 : 0.02;
    col[i * 3 + 1] = r > 0.5 ? 0.23 : 0.84;
    col[i * 3 + 2] = r > 0.5 ? 0.93 : 0.63;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const particles = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.8 }));
  scene.add(particles);

  // Wireframe sphere
  const sphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 1),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.1 })
  );
  scene.add(sphere);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / innerWidth - 0.5) * 0.5;
    my = (e.clientY / innerHeight - 0.5) * 0.5;
  });

  (function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.0005;
    particles.rotation.y = t * 0.1 + mx;
    particles.rotation.x = t * 0.05 + my;
    sphere.rotation.y = t * 0.2;
    sphere.rotation.x = t * 0.1;
    renderer.render(scene, camera);
  })();
})();

// ============================================================
// THREE.JS — SKILLS CANVAS (rotating rings)
// ============================================================
(function () {
  const canvas = document.getElementById('skillsCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 8;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  function resize() {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [0x7c3aed, 0x06d6a0, 0xf72585, 0x00c4cc];
  const rings = [];
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(1.5 + i * 0.7, 0.015, 8, 60),
      new THREE.MeshBasicMaterial({ color: colors[i % colors.length], transparent: true, opacity: 0.12 })
    );
    m.rotation.x = Math.random() * Math.PI;
    m.rotation.y = Math.random() * Math.PI;
    scene.add(m);
    rings.push(m);
  }

  (function animate() {
    requestAnimationFrame(animate);
    rings.forEach((r, i) => {
      r.rotation.x += 0.003 * (i % 2 ? 1 : -1);
      r.rotation.y += 0.002;
    });
    renderer.render(scene, camera);
  })();
})();

// ============================================================
// THREE.JS — CONTACT CANVAS (dot grid)
// ============================================================
(function () {
  const canvas = document.getElementById('contactCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 6;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  function resize() {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const pts = [];
  for (let x = -10; x <= 10; x++) for (let y = -10; y <= 10; y++) pts.push(x, y, 0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const grid = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x7c3aed, size: 0.05, transparent: true, opacity: 0.25 }));
  scene.add(grid);

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    grid.rotation.x = Math.sin(t * 0.5) * 0.3;
    grid.rotation.y = t * 0.1;
    renderer.render(scene, camera);
  })();
})();

// ============================================================
// THREE.JS — SKILL PAGE CANVAS (floating cubes — used by pages/*.html)
// ============================================================
(function () {
  const canvas = document.getElementById('skillPageCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 6;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  function resize() {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [0x7c3aed, 0x06d6a0, 0xf72585, 0x00c4cc];
  const cubes = [];
  for (let i = 0; i < 14; i++) {
    const size = 0.15 + Math.random() * 0.3;
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      new THREE.MeshBasicMaterial({ color: colors[i % colors.length], wireframe: true, transparent: true, opacity: 0.3 })
    );
    m.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
    m.userData = { vx: (Math.random() - 0.5) * 0.01, vy: (Math.random() - 0.5) * 0.01 };
    scene.add(m);
    cubes.push(m);
  }

  (function animate() {
    requestAnimationFrame(animate);
    cubes.forEach(c => {
      c.rotation.x += 0.01;
      c.rotation.y += 0.008;
      c.position.x += c.userData.vx;
      c.position.y += c.userData.vy;
      if (Math.abs(c.position.x) > 5) c.userData.vx *= -1;
      if (Math.abs(c.position.y) > 3) c.userData.vy *= -1;
    });
    renderer.render(scene, camera);
  })();
})();