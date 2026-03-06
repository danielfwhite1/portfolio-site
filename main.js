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
    window.scrollTo(0, 0);
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

    if (idx + 1 < ITEMS.length) left += `<div style="margin-top:48px;"></div>`;
    for (let i = idx + 1; i < ITEMS.length; i++) {
      left += `<a href="#" class="big muted plain" onclick="go('${ITEMS[i]}');return false;">${LABELS[ITEMS[i]]}</a>`;
    }
  }

  const sidebarHTML =
    current === null
      ? `
      <div id="sidebar-img" style="flex:0 0 38vw; overflow:hidden; background:#111;">
        <img src="images/sunset.jpg" style="width:100%; height:100%; object-fit:contain; object-position:center top; display:block;">
      </div>`
      : "";

  const h = `
    <div style="display:flex; gap:24px; align-items:flex-start;">
      <div style="flex:1; min-width:0;">${left}</div>
      ${sidebarHTML}
    </div>`;

  document.getElementById("page").innerHTML = h;

  // Size image to span exactly from top of page to bottom of last nav item
  const sidebar = document.getElementById("sidebar-img");
  if (sidebar) {
    const leftCol = sidebar.previousElementSibling;
    const navItems = leftCol.querySelectorAll("a.big");
    if (navItems.length > 0) {
      const topY = leftCol.getBoundingClientRect().top;
      const bottomY =
        navItems[navItems.length - 1].getBoundingClientRect().bottom;
      sidebar.style.height = bottomY - topY + "px";
    }
  }
}

/* ─────────── Icons ─────────── */
const ICON_EMAIL = `<svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const ICON_LINKEDIN = `<svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
const ICON_GITHUB = `<svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

const CURSOR_ICONS = {
  email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#d4a853"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
};

/* ─────────── Section content ─────────── */
function sectionContent(id) {
  if (id === "about") {
    return `
    <div style="margin-top:20px; width:75%;">
      <div style="display:flex; gap:6px;">
        <div class="img-wrap" style="margin-top:0; flex:1; aspect-ratio:4/5;"><img src="images/headshot.jpg" style="width:100%; height:100%; object-fit:cover; object-position:center top; display:block;"></div>
        <div class="img-wrap" style="margin-top:0; flex:1; aspect-ratio:4/5;"><img src="images/sdfc.jpeg" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;"></div>
        <div class="img-wrap" style="margin-top:0; flex:1; aspect-ratio:4/5;"><img src="images/brewery.jpg" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;"></div>
      </div>
      <div class="body-copy" style="margin-top:28px;">
        <p>I'm Daniel, a customer success engineer and aspiring software developer based in San Diego, CA. I'm passionate about building things that sit at the intersection of AI and technology: clean REST APIs that power real-world apps, iOS experiences that feel native and fast, and tools that make markets a little more accessible.</p>
        <p style="margin-top:1.5em;">I studied Statistics and Data Science at <a href="https://www.ucsb.edu" target="_blank">UC Santa Barbara</a> and completed a Front End Software Development program at <a href="https://promineotech.com" target="_blank">Promineo Tech</a>. After working at <a href="https://www.theshoppad.com" target="_blank">ShopPad</a>, <a href="https://www.yardi.com" target="_blank">Yardi</a>, and <a href="https://tesla.com" target="_blank">Tesla</a>, I now dedicate my spare time to building iOS apps and professionalwebsites.</p>
      </div>
    </div>`;
  }

  if (id === "contact") {
    return `
    <div class="body-copy" style="margin-top:64px; width:75%;">
      <p>I'm actively looking for software engineering opportunities. Whether that's full-time or interesting freelance work in iOS, APIs, or fintech. My inbox is always open.</p>
      <a href="mailto:danielfwhite1@gmail.com" class="say-hello-btn plain">Say Hello →</a>
      <div style="display:flex; gap:40px; align-items:center; margin-top:40px;">
        <a href="mailto:danielfwhite1@gmail.com" class="plain contact-link" data-cursor-type="email">${ICON_EMAIL}<span>Email</span></a>
        <a href="https://linkedin.com/in/danielfwhite/" target="_blank" class="plain contact-link" data-cursor-type="linkedin">${ICON_LINKEDIN}<span>LinkedIn</span></a>
        <a href="https://github.com/danielfwhite1" target="_blank" class="plain contact-link" data-cursor-type="github">${ICON_GITHUB}<span>GitHub</span></a>
      </div>
    </div>`;
  }

  if (id === "projects") {
    const projects = [
      {
        name: "Market Pulse",
        desc: "SwiftUI iOS stock tracker with real-time\nquotes, portfolio performance, market\nnews, and push notifications",
        counter: "",
      },
      {
        name: "Finance API",
        desc: "Python/Flask REST API aggregating financial\ndata sources with rate-limiting, caching,\nand Swagger documentation",
        counter: "",
      },
      {
        name: "Campus Event",
        desc: "Native iOS app for event discovery with\nNode.js backend, WebSockets, geolocation,\nand push notifications",
        counter: "",
      },
    ];

    let wh = `<div style="margin-top:64px; width:75%;">`;
    for (const p of projects) {
      wh += `<div style="display:grid; grid-template-columns:1fr 28%; gap:16px; margin-bottom:28px;">`;
      wh += `<div>`;
      wh += `<div class="wk-title">${p.name}</div>`;
      wh += `<div class="wk-desc" style="white-space:pre-line;">${p.desc}</div>`;
      wh += `</div>`;
      wh += `<div class="img-wrap" style="margin-top:0; overflow:hidden;"><img src="https://placehold.co/800x500/1a1a1a/2a2a2a" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`;
      wh += `</div>`;
    }
    wh += `</div>`;
    return wh;
  }

  if (id === "work") {
    const projects = [
      {
        name: "ShopPad",
        desc: "Customer Success Engineer resolving\ntechnical issues for Shopify merchants,\nreviewing code and developing SOPs",
        counter: "2022–Present",
      },
      {
        name: "Yardi",
        desc: "Technical Account Manager leading\nproduct implementation, client onboarding,\nand enterprise software testing",
        counter: "Summer 2023",
      },
      {
        name: "Pensionmark",
        desc: "Investment Operations Intern maintaining\n500+ investment plans and generating\nportfolio analysis reports",
        counter: "2022–2023",
      },
    ];

    let wh = `<div style="margin-top:64px;">`;
    for (const p of projects) {
      wh += `<div>`;
      wh += `<div class="wk-title">${p.name}</div>`;
      wh += `<div class="wk-desc" style="white-space:pre-line;">${p.desc}</div>`;
      if (p.counter) {
        wh += `<div class="wk-counter" style="margin-top:8px; margin-bottom:28px;">${p.counter}</div>`;
      } else {
        wh += `<div style="margin-bottom:28px;"></div>`;
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
