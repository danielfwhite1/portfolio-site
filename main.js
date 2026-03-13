/* ─────────── Beams background animation ─────────── */
(function () {
  const canvas = document.getElementById("beams-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const BEAM_COUNT = 30;
  let beams = [];

  function createBeam(w, h) {
    return {
      x: Math.random() * w * 1.5 - w * 0.25,
      y: Math.random() * h * 1.5 - h * 0.25,
      width: 30 + Math.random() * 60,
      length: h * 2.5,
      angle: -35 + Math.random() * 10,
      speed: 0.6 + Math.random() * 1.2,
      opacity: 0.06 + Math.random() * 0.08,
      hue: 25 + Math.random() * 35,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  }

  function resetBeam(beam, index) {
    const col = index % 3;
    const spacing = window.innerWidth / 3;
    beam.y = window.innerHeight + 100;
    beam.x = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
    beam.width = 100 + Math.random() * 100;
    beam.speed = 0.5 + Math.random() * 0.4;
    beam.hue = 25 + (index * 35) / BEAM_COUNT;
    beam.opacity = 0.06 + Math.random() * 0.07;
  }

  function drawBeam(beam) {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate((beam.angle * Math.PI) / 180);
    const op = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * 0.7;
    const g = ctx.createLinearGradient(0, 0, 0, beam.length);
    g.addColorStop(0,   `hsla(${beam.hue},80%,60%,0)`);
    g.addColorStop(0.1, `hsla(${beam.hue},80%,60%,${op * 0.5})`);
    g.addColorStop(0.4, `hsla(${beam.hue},80%,60%,${op})`);
    g.addColorStop(0.6, `hsla(${beam.hue},80%,60%,${op})`);
    g.addColorStop(0.9, `hsla(${beam.hue},80%,60%,${op * 0.5})`);
    g.addColorStop(1,   `hsla(${beam.hue},80%,60%,0)`);
    ctx.fillStyle = g;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(dpr, dpr);
    beams = Array.from({ length: BEAM_COUNT }, () =>
      createBeam(window.innerWidth, window.innerHeight)
    );
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "blur(35px)";
    beams.forEach((beam, i) => {
      beam.y -= beam.speed;
      beam.pulse += beam.pulseSpeed;
      if (beam.y + beam.length < -100) resetBeam(beam, i);
      drawBeam(beam);
    });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener("resize", resize);
  animate();
})();

/* ─────────── Navigation ─────────── */
const ITEMS = ["about", "projects", "work", "contact"];
const LABELS = {
  about: "About",
  projects: "Projects",
  work: "Experience",
  contact: "Contact",
};
let current = null;

function go(id) {
  const page = document.getElementById("page");
  page.classList.add("fade-out");
  setTimeout(() => {
    current = current === id ? null : id;
    draw();
    if (current !== null) {
      const activeLink = page.querySelector("a.section-active");
      if (activeLink) {
        window.scrollTo(0, 0);
        const top = activeLink.getBoundingClientRect().top - 32;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
    page.classList.remove("fade-out");
  }, 280);
}

function draw() {
  let left = "";

  left += `<a href="#" class="site-name plain" onclick="go(null);return false;">Daniel White</a>`;
  left += `<span class="site-name site-subtitle">Software Developer</span>`;
  left += `<div class="nav-gap"></div>`;

  if (current === null) {
    for (const item of ITEMS) {
      left += `<a href="#" class="big muted plain" onclick="go('${item}');return false;">${LABELS[item]}</a>`;
    }
  } else {
    const idx = ITEMS.indexOf(current);

    for (let i = 0; i < idx; i++) {
      left += `<a href="#" class="big muted plain" onclick="go('${ITEMS[i]}');return false;">${LABELS[ITEMS[i]]}</a>`;
    }

    left += `<a href="#" class="big plain section-active" onclick="go('${ITEMS[idx]}');return false;">${LABELS[ITEMS[idx]]}</a>`;
    left += sectionContent(current);

    if (idx + 1 < ITEMS.length) left += `<div class="section-gap"></div>`;
    for (let i = idx + 1; i < ITEMS.length; i++) {
      left += `<a href="#" class="big muted plain" onclick="go('${ITEMS[i]}');return false;">${LABELS[ITEMS[i]]}</a>`;
    }
  }

  const h = `
    <div class="layout">
      <div class="layout-left">${left}</div>
    </div>`;

  const pageEl = document.getElementById("page");
  pageEl.innerHTML = h;
  pageEl.classList.toggle("section-open", current !== null);

  // Size image to span exactly from top of page to bottom of last nav item
  // sidebar dimensions are fixed via CSS
}

/* ─────────── Cursor icons ─────────── */
const CURSOR_ICONS = {
  email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#d4a853"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
};

/* ─────────── Section content ─────────── */
function sectionContent(id) {
  const tmpl = document.getElementById(`section-${id}`);
  if (tmpl) return tmpl.innerHTML;
  return "";
}

draw();

/* ─────────── Heatmap carousel ─────────── */
const _heatmaps = [
  { src: "images/curry-heatmap.png", label: "Steph Curry" },
  { src: "images/harden-heatmap.png", label: "James Harden" },
];
let _heatmapIdx = 0;

function cycleHeatmap() {
  _heatmapIdx = (_heatmapIdx + 1) % _heatmaps.length;
  const img = document.getElementById("heatmap-img");
  const label = document.getElementById("heatmap-label");
  if (img) img.src = _heatmaps[_heatmapIdx].src;
  if (label) label.textContent = _heatmaps[_heatmapIdx].label;
}

/* ─────────── Custom cursor ─────────── */
const dot = Object.assign(document.createElement("div"), {
  className: "cursor-dot",
});
const ring = Object.assign(document.createElement("div"), {
  className: "cursor-ring",
});
const iconEl = Object.assign(document.createElement("div"), {
  className: "cursor-icon",
});
document.body.append(dot, ring, iconEl);

let mx = -200,
  my = -200,
  rx = -200,
  ry = -200;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  rx += (mx - rx) * 0.35;
  ry += (my - ry) * 0.35;
  dot.style.cssText += `left:${mx}px;top:${my}px;`;
  ring.style.cssText += `left:${rx}px;top:${ry}px;`;
  iconEl.style.cssText += `left:${mx}px;top:${my}px;`;
  requestAnimationFrame(tick);
})();

document.addEventListener("mouseover", (e) => {
  const link = e.target.closest("a");
  if (link) {
    dot.classList.add("on-link");
    ring.classList.add("on-link");
    const type = link.dataset.cursorType;
    if (type && CURSOR_ICONS[type]) {
      iconEl.innerHTML = CURSOR_ICONS[type];
      iconEl.classList.add("visible");
    }
  }
});

document.addEventListener("mouseout", (e) => {
  const link = e.target.closest("a");
  if (link) {
    dot.classList.remove("on-link");
    ring.classList.remove("on-link");
    iconEl.classList.remove("visible");
  }
});
