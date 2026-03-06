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

  left += `<span class="site-name">Daniel White</span>`;
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

  const sidebarHTML =
    current === null
      ? `<div id="sidebar-img"><img src="images/sunset.jpg"></div>`
      : "";

  const h = `
    <div class="layout">
      <div class="layout-left">${left}</div>
      ${sidebarHTML}
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

  if (id === "projects") {
    const projects = [
      {
        name: "Market Pulse",
        desc: "SwiftUI iOS stock tracker with real-time\nquotes, portfolio performance, market\nnews, and push notifications",
      },
      {
        name: "Finance API",
        desc: "Python/Flask REST API aggregating financial\ndata sources with rate-limiting, caching,\nand Swagger documentation",
      },
      {
        name: "Campus Event",
        desc: "Native iOS app for event discovery with\nNode.js backend, WebSockets, geolocation,\nand push notifications",
      },
    ];

    let wh = `<div class="projects-section">`;
    for (const p of projects) {
      wh += `<div class="project-row">`;
      wh += `<div>`;
      wh += `<div class="wk-title">${p.name}</div>`;
      wh += `<div class="wk-desc">${p.desc}</div>`;
      wh += `</div>`;
      wh += `<div class="img-wrap"><img src="https://placehold.co/800x500/1a1a1a/2a2a2a"></div>`;
      wh += `</div>`;
    }
    wh += `</div>`;
    return wh;
  }

  if (id === "work") {
    const entries = [
      {
        name: "ShopPad",
        desc: "Customer Success Engineer resolving\ntechnical issues for Shopify merchants,\nreviewing code and developing SOPs",
        counter: "2021–Present",
      },
      {
        name: "Yardi",
        desc: "Technical Account Manager leading\nproduct implementation, client onboarding,\nand enterprise software testing",
        counter: "2020–2021",
      },
      {
        name: "Pensionmark",
        desc: "Investment Operations Intern maintaining\n500+ investment plans and generating\nportfolio analysis reports",
        counter: "2019–2020",
      },
    ];

    let wh = `<div class="work-section">`;
    for (const e of entries) {
      wh += `<div>`;
      wh += `<div class="wk-title">${e.name}</div>`;
      wh += `<div class="wk-desc">${e.desc}</div>`;
      if (e.counter) {
        wh += `<div class="wk-counter">${e.counter}</div>`;
      } else {
        wh += `<div class="wk-spacer"></div>`;
      }
      wh += `</div>`;
    }
    wh += `</div>`;
    return wh;
  }

  return "";
}

draw();

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
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
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
