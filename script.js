/* =========================================
   Lucky HDR — Project Page JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ====== Mobile Hamburger Menu ======
  const navHamburger = document.getElementById('navHamburger');
  const navLinksContainer = document.getElementById('navLinks');
  if (navHamburger) {
    navHamburger.addEventListener('click', () => {
      navHamburger.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navHamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ====== Navbar, Scroll Progress & Parallax (unified scroll handler) ======
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollProgress = document.getElementById('scrollProgress');
  const heroParallax = document.getElementById('heroParallax');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky navbar — toggle scrolled class
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 50);
    }

    // Active nav link tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Scroll progress bar
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = scrollPct + '%';
    }

    // Hero parallax
    if (heroParallax && scrollY < window.innerHeight) {
      heroParallax.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  }, { passive: true });

  // ====== Smooth scroll for nav links ======
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 60; // navbar height
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ====== Scroll-triggered fade-in (with stagger support) ======
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger delay for children that declare --delay
        const children = entry.target.querySelectorAll('[style*="--delay"]');
        if (children.length > 0) {
          children.forEach(child => {
            child.classList.add('visible');
          });
        }
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ====== Animated Stat Counters ======
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const isFloat = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          el.textContent = isFloat ? current.toFixed(1) : Math.round(current);
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }
        requestAnimationFrame(animate);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  // ====== Auto-play Merge Demo (dynamic inputs + scene tabs) ======
  // Inputs live under assets/merge/<directory_name>/<frame_name>.
  // Progressive merge previews: assets/merge/<directory_name>/luckyhdr_f<N>.jpg for N = 1 .. frameCount.

  const MERGE_BASE = 'assets/images/merge';

  const mergeScenes = [
    {
      label: 'Synthetic',
      directory_name: 'blender',
      frames: [
        { label: '-10.0 EV', frame_name: 'frame0_exp_-10.00.jpg' },
        { label: '-8.0 EV', frame_name: 'frame1_exp_-8.00.jpg' },
        { label: '-6.0 EV', frame_name: 'frame2_exp_-6.00.jpg' },
        { label: '-4.0 EV', frame_name: 'frame3_exp_-4.00.jpg' },
        { label: '-2.0 EV', frame_name: 'frame4_exp_-2.00.jpg' },
        { label: '+0.0 EV', frame_name: 'frame5_exp_0.00.jpg' },
        { label: '+2.0 EV', frame_name: 'frame6_exp_2.00.jpg' },
        { label: '+4.0 EV', frame_name: 'frame7_exp_4.00.jpg' },
      ]
    },
    {
      label: 'Tree',
      directory_name: '1H7A7902',
      frames: [
        { label: '-4.0 EV', frame_name: 'frame0_exp_-3.97.jpg' },
        { label: '-2.0 EV', frame_name: 'frame1_exp_-2.00.jpg' },
        { label: '+0.0 EV', frame_name: 'frame2_exp_0.00.jpg' },
        { label: '+2.0 EV', frame_name: 'frame3_exp_2.00.jpg' },
        { label: '+4.0 EV', frame_name: 'frame4_exp_4.00.jpg' }
      ]
    },
    {
      label: 'Street',
      directory_name: 'IDG_20260106_173702_486',
      frames: [
        { label: '-1.6 EV', frame_name: 'frame0_exp_-1.58.jpg' },
        { label: '-0.6 EV', frame_name: 'frame1_exp_-0.58.jpg' },
        { label: '+0.4 EV', frame_name: 'frame2_exp_0.42.jpg' },
        { label: '+2.4 EV', frame_name: 'frame3_exp_2.42.jpg' }
      ]
    },
    {
      label: 'Beach',
      directory_name: '1H7A6309',
      frames: [
        { label: '-3.0 EV', frame_name: 'frame0_exp_-3.00.jpg' },
        { label: '-1.5 EV', frame_name: 'frame1_exp_-1.68.jpg' },
        { label: '+0.0 EV', frame_name: 'frame2_exp_0.00.jpg' },
        { label: '+1.5 EV', frame_name: 'frame3_exp_1.64.jpg' },
        { label: '+3.0 EV', frame_name: 'frame4_exp_3.32.jpg' }
      ]
    },
    {
      label: 'Library',
      directory_name: 'IDG_20260106_153819_947',
      frames: [
        { label: '-1.5 EV', frame_name: 'frame0_exp_-1.58.jpg' },
        { label: '-0.5 EV', frame_name: 'frame1_exp_-0.58.jpg' },
        { label: '+0.5 EV', frame_name: 'frame2_exp_0.41.jpg' },
        { label: '+2.5 EV', frame_name: 'frame3_exp_2.41.jpg' }
      ]
    },
    {
      label: 'Lights',
      directory_name: 'IDG_20260106_170036_616',
      frames: [
        { label: '-1.0 EV', frame_name: 'frame0_exp_-1.00.jpg' },
        { label: '+0.0 EV', frame_name: 'frame1_exp_0.00.jpg' },
        { label: '+1.0 EV', frame_name: 'frame2_exp_0.99.jpg' }
      ]
    },
    {
      label: 'Garden',
      directory_name: 'IDG_20260106_174841_211',
      frames: [
        { label: '-1.0 EV', frame_name: 'frame0_exp_-1.00.jpg' },
        { label: '+0.0 EV', frame_name: 'frame1_exp_0.00.jpg' },
        { label: '+1.0 EV', frame_name: 'frame2_exp_1.01.jpg' }
   
      ]
    }
  ];

  const mergeInputsEl = document.getElementById('mergeInputs');
  const mergeSceneSelector = document.getElementById('mergeSceneSelector');
  const mergeResultImg = document.getElementById('mergeResultImg');
  const mergeResultBadge = document.getElementById('mergeResultBadge');
  const mergeCaption = document.getElementById('mergeCaption');
  const mergeDemo = document.getElementById('mergeDemo');

  let mergeCurrentIndex = 0;
  let mergeAnimationTimers = [];

  const MERGE_CHECK_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';

  function mergeSceneUrl(scene, fileName) {
    return `${MERGE_BASE}/${scene.directory_name}/${fileName}`;
  }

  function getMergeFrames() {
    return mergeInputsEl ? mergeInputsEl.querySelectorAll('.merge-frame') : [];
  }

  function clearMergeTimers() {
    mergeAnimationTimers.forEach(t => clearTimeout(t));
    mergeAnimationTimers = [];
  }

  function buildMergeInputFrames(scene) {
    if (!mergeInputsEl) return;
    mergeInputsEl.replaceChildren();
    scene.frames.forEach((fr, i) => {
      const row = document.createElement('div');
      row.className = 'merge-frame';
      row.dataset.idx = String(i);
      const img = document.createElement('img');
      img.src = mergeSceneUrl(scene, fr.frame_name);
      if (i === 0) img.alt = 'Frame 0 (shortest)';
      else if (i === scene.frames.length - 1) img.alt = `Frame ${i} (longest)`;
      else img.alt = `Frame ${i}`;
      img.loading = 'lazy';
      const lbl = document.createElement('div');
      lbl.className = 'merge-frame-label';
      lbl.textContent = fr.label;
      const check = document.createElement('div');
      check.className = 'merge-check';
      check.innerHTML = MERGE_CHECK_SVG;
      row.appendChild(img);
      row.appendChild(lbl);
      row.appendChild(check);
      mergeInputsEl.appendChild(row);
    });
  }

  function loadMergeScene(sceneIndex) {
    const scene = mergeScenes[sceneIndex];
    if (!scene) return;
    mergeCurrentIndex = sceneIndex;

    buildMergeInputFrames(scene);

    const frames = getMergeFrames();
    frames.forEach((frame) => {
      frame.classList.remove('selected');
    });

    const firstSrc = mergeSceneUrl(scene, scene.frames[0].frame_name);
    if (mergeResultImg) mergeResultImg.src = firstSrc;
    if (mergeResultBadge) mergeResultBadge.textContent = 'Base Frame';
    if (mergeCaption) mergeCaption.textContent = 'Starting from the shortest exposure\u2026';

    document.querySelectorAll('.merge-scene-btn').forEach((b, i) => {
      b.classList.toggle('active', i === sceneIndex);
    });
  }

  function initMergeDemo() {
    if (!mergeSceneSelector || !mergeInputsEl || mergeScenes.length === 0) return;
    mergeSceneSelector.replaceChildren();
    mergeScenes.forEach((scene, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'merge-scene-btn' + (i === 0 ? ' active' : '');
      btn.dataset.sceneIndex = String(i);
      btn.textContent = scene.label;
      mergeSceneSelector.appendChild(btn);
    });

    mergeSceneSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.merge-scene-btn');
      if (!btn || !mergeSceneSelector.contains(btn)) return;
      const idx = parseInt(btn.dataset.sceneIndex, 10);
      if (Number.isNaN(idx)) return;
      loadMergeScene(idx);
      playMergeAnimation();
    });

    loadMergeScene(0);
  }

  // Progressive auto-play: step N (1..n) selects frame N-1 and shows luckyhdr_fN.jpg.
  function playMergeAnimation() {
    clearMergeTimers();
    const scene = mergeScenes[mergeCurrentIndex];
    if (!scene) return;

    const mergeFrames = getMergeFrames();
    const nFrames = scene.frames.length;

    mergeFrames.forEach(f => f.classList.remove('selected'));
    if (mergeResultImg) {
      mergeResultImg.style.opacity = 1;
      mergeResultImg.src = mergeSceneUrl(scene, scene.frames[0].frame_name);
    }
    if (mergeResultBadge) mergeResultBadge.textContent = 'Base Frame (not merged)';
    if (mergeCaption) mergeCaption.textContent = 'Starting from the shortest exposure\u2026';

    const step = 900;
    for (let N = 1; N <= nFrames; N++) {
      mergeAnimationTimers.push(setTimeout(() => {
        const f = mergeFrames[N - 1];
        if (f) f.classList.add('selected');
        if (mergeResultImg) {
          mergeResultImg.style.opacity = 0;
          setTimeout(() => {
            mergeResultImg.src = mergeSceneUrl(scene, `luckyhdr_f${N}.jpg`);
            mergeResultImg.style.opacity = 1;
          }, 220);
        }
        if (mergeResultBadge) {
          mergeResultBadge.textContent = N === 1
            ? 'LuckyHDR (1 frame)'
            : (N === nFrames
              ? `LuckyHDR Output (${nFrames} frames)`
              : `LuckyHDR (${N} frames)`);
        }
        if (mergeCaption) {
          if (N === 1) {
            mergeCaption.textContent = 'Base frame: shortest exposure, bright highlights, noisy shadows.';
          } else if (N < nFrames) {
            mergeCaption.textContent = `Merged ${N} frames: shadow detail is filling in progressively.`;
          } else {
            mergeCaption.textContent = `All ${nFrames} frames merged: full HDR result with detail across the entire dynamic range.`;
          }
        }
      }, N * step));
    }
  }

  initMergeDemo();

  // Auto-play once when the merge demo first enters the viewport
  if (mergeDemo && 'IntersectionObserver' in window) {
    let hasAutoPlayed = false;
    const mergeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAutoPlayed) {
          hasAutoPlayed = true;
          setTimeout(playMergeAnimation, 300);
        }
      });
    }, { threshold: 0.35 });
    mergeObserver.observe(mergeDemo);
  } else {
    setTimeout(playMergeAnimation, 1500);
  }

  // ====== Comparison Slider (1 scene at a time, scene switched by tabs) ======
  const multiSliders = document.querySelectorAll('.multi-slider');
  let currentMethod = 'hdrflow';
  let activeSlider = null;

  const methodLabels = {
    hdrflow: 'HDRFlow',
    safnet: 'SAFNet',
    ahdrnet: 'AHDRNet',
    hdrtransformer: 'HDR-Transformer'
  };

  // Set slider position for a specific slider element (independent per-slider)
  function setSliderPos(slider, x) {
    const rect = slider.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    const left = slider.querySelector('.comp-left');
    const handle = slider.querySelector('.ms-handle');
    left.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  // Initialize each slider at 50% independently
  multiSliders.forEach(slider => {
    const left = slider.querySelector('.comp-left');
    const handle = slider.querySelector('.ms-handle');
    left.style.clipPath = `inset(0 50% 0 0)`;
    handle.style.left = '50%';
  });

  // Mouse/touch drag per slider — only the one you grab moves
  multiSliders.forEach(slider => {
    slider.addEventListener('mousedown', (e) => {
      activeSlider = slider;
      setSliderPos(slider, e.clientX);
    });
    slider.addEventListener('touchstart', (e) => {
      activeSlider = slider;
      setSliderPos(slider, e.touches[0].clientX);
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (activeSlider) {
      setSliderPos(activeSlider, e.clientX);
    }
  });
  document.addEventListener('mouseup', () => { activeSlider = null; });
  document.addEventListener('touchmove', (e) => {
    if (activeSlider) {
      e.preventDefault();
      setSliderPos(activeSlider, e.touches[0].clientX);
    }
  }, { passive: false });
  document.addEventListener('touchend', () => { activeSlider = null; });

  // Update all sliders' images when method changes
  function updateAllComparisons() {
    multiSliders.forEach(slider => {
      const scene = slider.dataset.scene;
      const leftImg = slider.querySelector('.ms-left');
      const rightImg = slider.querySelector('.ms-right');
      const label = slider.querySelector('.ms-label-left');
      const leftSrc = `assets/images/comparisons/${scene}_${currentMethod}.webp`;
      const rightSrc = `assets/images/comparisons/${scene}_luckyhdr.webp`;
      leftImg.style.opacity = 0;
      rightImg.style.opacity = 0;
      setTimeout(() => {
        leftImg.src = leftSrc;
        rightImg.src = rightSrc;
        leftImg.onload = () => { leftImg.style.opacity = 1; };
        rightImg.onload = () => { rightImg.style.opacity = 1; };
      }, 200);
      if (label) label.textContent = methodLabels[currentMethod] || currentMethod;
    });
  }

  // Method button clicks
  document.querySelectorAll('.method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMethod = btn.dataset.method;
      updateAllComparisons();
    });
  });

  // Scene tab clicks (switches scene in the single slider)
  document.querySelectorAll('.scene-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const newScene = btn.dataset.scene;
      // Update each multi-slider's scene attribute then reload
      multiSliders.forEach(s => { s.dataset.scene = newScene; });
      updateAllComparisons();
      // Reset slider position to center on scene change
      multiSliders.forEach(s => {
        const left = s.querySelector('.comp-left');
        const handle = s.querySelector('.ms-handle');
        if (left) left.style.clipPath = `inset(0 50% 0 0)`;
        if (handle) handle.style.left = '50%';
      });
    });
  });

  // Initialize
  updateAllComparisons();

  // ====== Method diagram pan on hover ======
  const methodPan = document.getElementById('methodPan');
  if (methodPan) {
    const img = methodPan.querySelector('img');
    methodPan.addEventListener('mousemove', (e) => {
      const rect = methodPan.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      // Gentle parallax pan
      const tx = (xPct - 0.5) * -30;
      const ty = (yPct - 0.5) * -15;
      img.style.transform = `scale(1.1) translate(${tx}px, ${ty}px)`;
    });
    methodPan.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  }

  // ====== Gallery lightbox ======
  // ====== Real-World Gallery viewer ======
  const RWG_SCENES = [
    'IDG_20260106_165954_767',
    'IDG_20251217_204945_129',
    'IDG_20260103_142015_113',
    'IDG_20260103_142145_560',
    'IDG_20260106_153819_947',
    'IDG_20260106_173702_486',
  ];
  const RWG_TOP = [
    { key: 'ahdrnet',        label: 'AHDRNet' },
    { key: 'hdrflow',        label: 'HDRFlow' },
    { key: 'hdrtransformer', label: 'HDRTrans.' },
    { key: 'safnet',         label: 'SAFNet' },
    { key: 'luckyhdr',       label: 'LuckyHDR', ours: true },
  ];
  const RWG_LEFT = [
    { key: 'input0', label: 'Short' },
    { key: 'input1', label: 'Mid' },
    { key: 'input2', label: 'Long' },
  ];
  const RWG_CROP_FRAC = 0.2; // square side as fraction of displayed image width

  let rwgScene = 0;
  let rwgImages = {};
  let rwgSel = null;     // { x, y, size } in px relative to displayed image
  let rwgDragging = false;
  let rwgDragOffset = null; // mouse offset from selector top-left when drag starts

  const rwgMainImg   = document.getElementById('rwgMainImg');
  const rwgContainer = document.getElementById('rwgImgContainer');
  const rwgSelector  = document.getElementById('rwgSelector');
  const rwgSceneLbl  = document.getElementById('rwgSceneLabel');

  // Build DOM — both top and left items use the same .rwg-crop-cell class
  function rwgBuildCell(key, label, ours) {
    const item = document.createElement('div');
    item.className = 'rwg-crop-cell' + (ours ? ' is-ours' : '');
    const canvas = document.createElement('canvas');
    canvas.id = `rwgCanvas_${key}`;
    canvas.width = 200; canvas.height = 200;
    const lbl = document.createElement('div');
    lbl.className = 'rwg-crop-label';
    lbl.textContent = label;
    item.appendChild(canvas);
    item.appendChild(lbl);
    return item;
  }

  const rwgTopEl  = document.getElementById('rwgTopCrops');
  const rwgLeftEl = document.getElementById('rwgLeftCrops');
  RWG_TOP.forEach(({ key, label, ours }) => rwgTopEl.appendChild(rwgBuildCell(key, label, ours)));
  RWG_LEFT.forEach(({ key, label })      => rwgLeftEl.appendChild(rwgBuildCell(key, label, false)));

  // Returns the rendered image bounds within .rwg-img-container (object-fit: contain)
  function rwgImgBounds() {
    const cw = rwgContainer.offsetWidth;
    const ch = rwgContainer.offsetHeight;
    const nw = rwgMainImg.naturalWidth;
    const nh = rwgMainImg.naturalHeight;
    if (!nw || !nh) return { x: 0, y: 0, w: cw, h: ch };
    const scale = Math.min(cw / nw, ch / nh);
    const w = nw * scale, h = nh * scale;
    return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
  }

  function rwgLoadScene(idx) {
    rwgScene = idx;
    rwgImages = {};
    rwgSel = null;
    rwgSelector.classList.remove('visible');
    rwgSceneLbl.textContent = `Scene ${idx + 1} / ${RWG_SCENES.length}`;

    const folder = `assets/images/gallery/${RWG_SCENES[idx]}`;
    rwgMainImg.src = `${folder}/luckyhdr.jpg`;

    [...RWG_TOP, ...RWG_LEFT].forEach(({ key }) => {
      if (key === 'luckyhdr') return;
      const img = new Image();
      img.onload = () => { rwgImages[key] = img; rwgRenderCrops(); };
      img.src = `${folder}/${key}.jpg`;
    });

    rwgMainImg.onload = () => {
      requestAnimationFrame(() => { rwgPlaceSel(0.5, 0.5); });
    };
  }

  // normX/normY are [0,1] within the rendered image area (not the full container)
  function rwgPlaceSel(normX, normY) {
    const b = rwgImgBounds();
    if (!b.w || !b.h) return;
    const size = Math.round(Math.min(b.w, b.h) * RWG_CROP_FRAC);
    let x = b.x + normX * b.w - size / 2;
    let y = b.y + normY * b.h - size / 2;
    x = Math.max(b.x, Math.min(x, b.x + b.w - size));
    y = Math.max(b.y, Math.min(y, b.y + b.h - size));
    rwgSel = { x, y, size };
    rwgSelector.style.left   = x + 'px';
    rwgSelector.style.top    = y + 'px';
    rwgSelector.style.width  = size + 'px';
    rwgSelector.style.height = size + 'px';
    rwgSelector.classList.add('visible');
    rwgRenderCrops();
  }

  function rwgRenderCrops() {
    if (!rwgSel) return;
    const b = rwgImgBounds();
    if (!b.w || !b.h) return;
    // Map selector (in container coords) to normalized image coords
    const nx = (rwgSel.x - b.x) / b.w;
    const ny = (rwgSel.y - b.y) / b.h;
    const nw = rwgSel.size / b.w;
    const nh = rwgSel.size / b.h;

    [...RWG_TOP, ...RWG_LEFT].forEach(({ key }) => {
      const canvas = document.getElementById(`rwgCanvas_${key}`);
      if (!canvas) return;
      const img = key === 'luckyhdr' ? rwgMainImg : rwgImages[key];
      if (!img || !img.complete || !img.naturalWidth) return;
      const sx = nx * img.naturalWidth,  sy = ny * img.naturalHeight;
      const sw = nw * img.naturalWidth,  sh = nh * img.naturalHeight;
      canvas.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    });
  }

  // Drag selector
  rwgSelector.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const r = rwgSelector.getBoundingClientRect();
    rwgDragOffset = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    rwgDragging = true;
  });

  // Click anywhere on image to teleport selector center there
  rwgContainer.addEventListener('mousedown', (e) => {
    if (e.target === rwgSelector) return;
    e.preventDefault();
    const b = rwgImgBounds();
    const cr = rwgContainer.getBoundingClientRect();
    const mx = e.clientX - cr.left, my = e.clientY - cr.top;
    // Ignore clicks outside the rendered image area
    if (mx < b.x || mx > b.x + b.w || my < b.y || my > b.y + b.h) return;
    rwgPlaceSel((mx - b.x) / b.w, (my - b.y) / b.h);
    rwgDragOffset = { dx: rwgSel.size / 2, dy: rwgSel.size / 2 };
    rwgDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (!rwgDragging || !rwgDragOffset || !rwgSel) return;
    const b = rwgImgBounds();
    const cr = rwgContainer.getBoundingClientRect();
    const { size } = rwgSel;
    let x = e.clientX - cr.left - rwgDragOffset.dx;
    let y = e.clientY - cr.top  - rwgDragOffset.dy;
    x = Math.max(b.x, Math.min(x, b.x + b.w - size));
    y = Math.max(b.y, Math.min(y, b.y + b.h - size));
    rwgSel = { x, y, size };
    rwgSelector.style.left = x + 'px';
    rwgSelector.style.top  = y + 'px';
    rwgRenderCrops();
  });

  document.addEventListener('mouseup', () => { rwgDragging = false; rwgDragOffset = null; });

  document.getElementById('rwgPrev').addEventListener('click', () => {
    rwgLoadScene((rwgScene - 1 + RWG_SCENES.length) % RWG_SCENES.length);
  });
  document.getElementById('rwgNext').addEventListener('click', () => {
    rwgLoadScene((rwgScene + 1) % RWG_SCENES.length);
  });

  rwgLoadScene(0);

  // ====== Table tabs ======
  document.querySelectorAll('.table-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.table-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('table-' + tab.dataset.table).classList.add('active');
    });
  });

  // ====== Copy BibTeX ======
  document.getElementById('copyBib').addEventListener('click', () => {
    const bibText = document.querySelector('.bibtex-block code').textContent;
    navigator.clipboard.writeText(bibText).then(() => {
      const btn = document.getElementById('copyBib');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(() => {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
      }, 2000);
    });
  });

});
