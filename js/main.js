/* ============================================
   Dhananjay Rawat PORTFOLIO — main.js
   Handles: index.html AND all skill pages
   ============================================ */

// ---- LOADER ----
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  const loader = document.getElementById('loader');
  if (!loader) return;
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => loader.classList.add('hidden'), 500); }
    fill.style.width = p + '%';
  }, 60);
});

// ---- CUSTOM CURSOR ----
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
  (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.skill-card,.asset-card,.project-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ ring.style.width='60px'; ring.style.height='60px'; ring.style.borderColor='var(--accent2)'; });
    el.addEventListener('mouseleave',()=>{ ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='var(--accent)'; });
  });
}

// ---- THEME TOGGLE ----
const themeBtn = document.getElementById('themeToggle');
let isDark = localStorage.getItem('theme') !== 'light';
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- TYPEWRITER (index only) ----
const tw = document.getElementById('typewriter');
if (tw) {
  const phrases = ['Aspiring Full Stack Developer','Godot Game Developer 🎮','3D Artist with Blender 🎨','B.Tech IT Student 🎓','Open Source Enthusiast 🌟','Building the Future 🚀'];
  let pi=0, ci=0, del=false;
  function type(){
    const p=phrases[pi];
    tw.textContent = del ? p.slice(0,ci--) : p.slice(0,ci++);
    if(!del && ci>p.length){del=true; setTimeout(type,1800); return;}
    if(del && ci<0){del=false; pi=(pi+1)%phrases.length;}
    setTimeout(type, del?50:90);
  }
  type();
}

// ---- SCROLL REVEAL ----
const revealObs = new IntersectionObserver(entries=>{
  entries.forEach((e,i) => { if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'), i*80); });
}, {threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// ---- COUNTERS ----
const cntObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target, target=+el.getAttribute('data-target');
      let cur=0; const step=target/60;
      const iv=setInterval(()=>{ cur+=step; if(cur>=target){el.textContent=target; clearInterval(iv);} else el.textContent=Math.floor(cur); },25);
      cntObs.unobserve(el);
    }
  });
},{threshold:.5});
document.querySelectorAll('.stat-number').forEach(c=>cntObs.observe(c));

// ---- SKILL BAR ANIMATION ----
const barObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const w = e.target.getAttribute('data-width') || '0';
      e.target.style.width = w+'%';
      barObs.unobserve(e.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.skill-progress, .skill-level-fill').forEach(b=>{ b.style.width='0'; barObs.observe(b); });

// ---- PROJECT FILTER ----
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(c=>{
      c.classList.toggle('hidden', f!=='all' && c.getAttribute('data-cat')!==f);
    });
  });
});

// ---- CONTACT FORM ----
function handleForm(e){
  e.preventDefault();
  showToast('✅ Message sent! Connect Formspree for real emails.');
  e.target.reset();
}

// ---- TOAST ----
function showToast(msg){
  const t=document.getElementById('toast');
  if(!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// ============================================
// THREE.JS — HERO CANVAS
// ============================================
(function(){
  const canvas=document.getElementById('heroCanvas');
  if(!canvas||typeof THREE==='undefined') return;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,1,.1,100);
  camera.position.z=5;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  function resize(){ renderer.setSize(canvas.clientWidth,canvas.clientHeight,false); camera.aspect=canvas.clientWidth/canvas.clientHeight; camera.updateProjectionMatrix(); }
  resize(); window.addEventListener('resize',resize);
  const count=1500, geo=new THREE.BufferGeometry();
  const pos=new Float32Array(count*3), col=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    pos[i*3]=(Math.random()-.5)*20; pos[i*3+1]=(Math.random()-.5)*20; pos[i*3+2]=(Math.random()-.5)*20;
    const r=Math.random();
    col[i*3]=r>.5?.49:.02; col[i*3+1]=r>.5?.23:.84; col[i*3+2]=r>.5?.93:.63;
  }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const particles=new THREE.Points(geo,new THREE.PointsMaterial({size:.04,vertexColors:true,transparent:true,opacity:.8}));
  scene.add(particles);
  const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(2,1),new THREE.MeshBasicMaterial({color:0x7c3aed,wireframe:true,transparent:true,opacity:.1}));
  scene.add(sphere);
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{ mx=(e.clientX/innerWidth-.5)*.5; my=(e.clientY/innerHeight-.5)*.5; });
  (function animate(){ requestAnimationFrame(animate); const t=Date.now()*.0005; particles.rotation.y=t*.1+mx; particles.rotation.x=t*.05+my; sphere.rotation.y=t*.2; sphere.rotation.x=t*.1; renderer.render(scene,camera); })();
})();

// ============================================
// THREE.JS — SKILLS CANVAS
// ============================================
(function(){
  const canvas=document.getElementById('skillsCanvas');
  if(!canvas||typeof THREE==='undefined') return;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true});
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,1,.1,100);
  camera.position.z=8;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  function resize(){ renderer.setSize(canvas.clientWidth,canvas.clientHeight,false); camera.aspect=canvas.clientWidth/canvas.clientHeight; camera.updateProjectionMatrix(); }
  resize(); window.addEventListener('resize',resize);
  const clrs=[0x7c3aed,0x06d6a0,0xf72585], rings=[];
  for(let i=0;i<6;i++){
    const m=new THREE.Mesh(new THREE.TorusGeometry(1.5+i*.7,.015,8,60),new THREE.MeshBasicMaterial({color:clrs[i%3],transparent:true,opacity:.12}));
    m.rotation.x=Math.random()*Math.PI; m.rotation.y=Math.random()*Math.PI;
    scene.add(m); rings.push(m);
  }
  (function animate(){ requestAnimationFrame(animate); rings.forEach((r,i)=>{ r.rotation.x+=.003*(i%2?1:-1); r.rotation.y+=.002; }); renderer.render(scene,camera); })();
})();

// ============================================
// THREE.JS — CONTACT CANVAS
// ============================================
(function(){
  const canvas=document.getElementById('contactCanvas');
  if(!canvas||typeof THREE==='undefined') return;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true});
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,1,.1,100);
  camera.position.z=6;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  function resize(){ renderer.setSize(canvas.clientWidth,canvas.clientHeight,false); camera.aspect=canvas.clientWidth/canvas.clientHeight; camera.updateProjectionMatrix(); }
  resize(); window.addEventListener('resize',resize);
  const pts=[];
  for(let x=-10;x<=10;x++) for(let y=-10;y<=10;y++) pts.push(x,y,0);
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
  const grid=new THREE.Points(geo,new THREE.PointsMaterial({color:0x7c3aed,size:.05,transparent:true,opacity:.25}));
  scene.add(grid);
  let t=0;
  (function animate(){ requestAnimationFrame(animate); t+=.005; grid.rotation.x=Math.sin(t*.5)*.3; grid.rotation.y=t*.1; renderer.render(scene,camera); })();
})();

// ============================================
// THREE.JS — SKILL PAGE CANVAS (pages/*.html)
// ============================================
(function(){
  const canvas=document.getElementById('skillPageCanvas');
  if(!canvas||typeof THREE==='undefined') return;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,1,.1,100);
  camera.position.z=6;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  function resize(){ renderer.setSize(canvas.clientWidth,canvas.clientHeight,false); camera.aspect=canvas.clientWidth/canvas.clientHeight; camera.updateProjectionMatrix(); }
  resize(); window.addEventListener('resize',resize);
  // Floating cubes
  const cubes=[];
  for(let i=0;i<12;i++){
    const size=.15+Math.random()*.3;
    const m=new THREE.Mesh(
      new THREE.BoxGeometry(size,size,size),
      new THREE.MeshBasicMaterial({color:[0x7c3aed,0x06d6a0,0xf72585][i%3],wireframe:true,transparent:true,opacity:.3})
    );
    m.position.set((Math.random()-.5)*10,(Math.random()-.5)*6,(Math.random()-.5)*4);
    m.userData={vx:(Math.random()-.5)*.01,vy:(Math.random()-.5)*.01};
    scene.add(m); cubes.push(m);
  }
  (function animate(){
    requestAnimationFrame(animate);
    cubes.forEach(c=>{ c.rotation.x+=.01; c.rotation.y+=.008; c.position.x+=c.userData.vx; c.position.y+=c.userData.vy;
      if(Math.abs(c.position.x)>5) c.userData.vx*=-1;
      if(Math.abs(c.position.y)>3) c.userData.vy*=-1;
    });
    renderer.render(scene,camera);
  })();
})();