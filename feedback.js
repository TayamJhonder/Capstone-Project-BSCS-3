/* ===== TEAM DATA ===== */
const TEAM_MEMBERS = [
  {
    id: "jhonder", name: "Jhonder Tayam", username: "@Jhonder Tayam",
    role: "UI Development", roleShort: "Frontend Dev",
    bio: "Passionate about building clean, efficient, and user-friendly web applications. Leads the frontend architecture and UI/UX design.",
    initials: "JH",
    picture: "Jhonder.jpg",
    github: "https://github.com/TayamJhonder",
    specialization: "Frontend Development", location: "Rawis Bacon, Sorsogon City"
  },
  {
    id: "jayem", name: "Jay-em Brusola", username: "@Jay-em Brusola",
    role: "Researcher / UI Designer", roleShort: "Researcher",
    bio: "Focused on creating intuitive and visually appealing interfaces for better user experience.",
    initials: "JE",
    picture: "Jay-em.jpg",
    github: "https://github.com/jayem111205",
    specialization: "Research", location: "Sorsogon City"
  },
  {
    id: "lowell", name: "Lowell Jalmasco", username: "@Lowell Jalmasco",
    role: "Full-Stack Developer", roleShort: "Tech Lead",
    bio: "Ensuring the system runs smoothly behind the scenes with robust server-side logic and database management.",
    initials: "LO",
    picture: "Lowell.jpg",
    github: "https://github.com/lowell",
    specialization: "Server & Database", location: "Sorsogon City"
  },
  {
    id: "marites", name: "Marites Montes", username: "@Marites Montes",
    role: "Researcher", roleShort: "Researcher",
    bio: "Making sure every feature works perfectly before release. Dedicated to quality assurance and bug tracking.",
    initials: "MA",
    picture: "Marites.jpg",
    github: "https://github.com/marites",
    specialization: "Documentation", location: "Sorsogon City"
  },
  {
    id: "pau", name: "Pau Verchez", username: "@Pau Berchez",
    role: "Database Management", roleShort: "Backend Developer",
    bio: "Keeping the team organized and on track with our goals. Ensures timely delivery of project milestones.",
    initials: "PA",
    picture: "Pau.jpg",
    github: "https://github.com/pau",
    specialization: "Backend Development", location: "Sorsogon City"
  }
];

/* ===== INIT ===== */
function initFeedbackPage() {
  initGlobe();
  initScrollReveal();
  initCounter();
  renderTeamCards();
  initStarRating();
  initFeedbackForm();
  initDeveloperModal();
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const els = document.querySelectorAll("#feedback [data-reveal]");
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("revealed"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  els.forEach(el => observer.observe(el));
}

/* ===== COUNTER ===== */
function initCounter() {
  const counters = document.querySelectorAll("#feedback [data-counter]");
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.counter, 10));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ===== WORLD CONTINENTS ===== */
const WORLD_CONTINENTS = [
  [[-168,65],[-160,71],[-140,70],[-125,70],[-100,72],[-80,70],[-60,60],[-55,50],[-65,45],[-70,42],[-75,35],[-81,25],[-83,22],[-97,26],[-105,22],[-115,30],[-125,40],[-130,55],[-140,60],[-155,58],[-168,65]],
  [[-45,60],[-20,70],[-20,82],[-60,83],[-70,75],[-55,62],[-45,60]],
  [[-80,10],[-60,12],[-50,5],[-35,-5],[-38,-15],[-48,-25],[-58,-35],[-65,-45],[-70,-55],[-75,-50],[-72,-40],[-70,-20],[-80,-5],[-80,10]],
  [[-17,15],[0,20],[15,32],[30,32],[35,25],[43,12],[51,12],[42,-2],[40,-15],[35,-25],[25,-35],[18,-35],[12,-20],[8,-5],[-5,5],[-17,15]],
  [[-10,36],[0,43],[10,44],[20,40],[30,40],[40,45],[30,55],[25,65],[20,70],[5,60],[-5,50],[-10,43],[-10,36]],
  [[30,45],[45,42],[60,45],[75,50],[90,55],[110,55],[130,55],[145,50],[140,45],[145,35],[140,25],[120,22],[110,20],[100,15],[95,10],[100,3],[105,-5],[120,-8],[130,-8],[140,-8],[140,5],[130,15],[120,25],[110,35],[90,35],[75,30],[60,25],[50,25],[40,30],[30,45]],
  [[120,18],[125,18],[127,8],[123,0],[118,-5],[115,5],[120,15],[120,18]],
  [[70,25],[80,20],[90,25],[95,20],[88,15],[82,8],[78,8],[72,18],[70,25]],
  [[115,-15],[125,-12],[140,-12],[150,-22],[155,-28],[152,-38],[142,-38],[130,-32],[118,-32],[115,-22],[115,-15]],
  [[-180,-70],[-120,-72],[-60,-75],[0,-75],[60,-72],[120,-72],[180,-70],[180,-85],[-180,-85],[-180,-70]]
];

/* ===== 3D GLOBE ===== */
let globeAnimationId = null;
let globeCanvas, globeCtx;
let globeRotation = 0;
let worldDots = [];
const GLOBE_SIZE = 620;

function initGlobe() {
  const stage = document.getElementById("globeStage");
  const avatarsLayer = document.getElementById("globeAvatars");
  if (!stage || !avatarsLayer) return;

  globeCanvas = document.getElementById("globeCanvas");
  if (!globeCanvas) return;

  resizeGlobeCanvas();
  globeCtx = globeCanvas.getContext("2d");

  generateWorldDots();
  createGlobeAvatars(avatarsLayer);

  if (globeAnimationId) cancelAnimationFrame(globeAnimationId);
  animateGlobe();

  if (!window.__globeResizeBound) {
    window.__globeResizeBound = true;
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeGlobeCanvas, 150);
    });
  }
}

function resizeGlobeCanvas() {
  if (!globeCanvas) return;
  const stage = document.getElementById("globeStage");
  if (!stage) return;

  const rect = stage.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height) || 620;
  const dpr = window.devicePixelRatio || 1;

  globeCanvas.width = size * dpr;
  globeCanvas.height = size * dpr;
  globeCanvas.style.width = size + "px";
  globeCanvas.style.height = size + "px";

  if (globeCtx) {
    globeCtx.setTransform(1, 0, 0, 1, 0, 0);
    globeCtx.scale(dpr, dpr);
  }
}

function generateWorldDots() {
  worldDots = [];
  WORLD_CONTINENTS.forEach(polygon => {
    let minLon = Infinity, maxLon = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;
    polygon.forEach(([lon, lat]) => {
      minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon);
      minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
    });
    const step = 2.2;
    for (let lat = minLat; lat <= maxLat; lat += step) {
      for (let lon = minLon; lon <= maxLon; lon += step) {
        const jLat = lat + (Math.random() - 0.5) * 1.5;
        const jLon = lon + (Math.random() - 0.5) * 1.5;
        if (pointInPolygon(jLon, jLat, polygon)) {
          worldDots.push({
            lat: jLat, lon: jLon,
            x: Math.cos(jLat * Math.PI / 180) * Math.cos(jLon * Math.PI / 180),
            y: Math.sin(jLat * Math.PI / 180),
            z: Math.cos(jLat * Math.PI / 180) * Math.sin(jLon * Math.PI / 180),
            size: Math.random() * 0.9 + 0.5
          });
        }
      }
    }
  });
}

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

const AVATAR_POSITIONS = [
  { lat: 15,  lon: 0   },
  { lat: -35, lon: 60  },
  { lat: 20,  lon: 140 },
  { lat: -10, lon: 250 },
  { lat: 60,  lon: 300 }
];

let avatarElements = [];

function createGlobeAvatars(container) {
  avatarElements = [];
  container.innerHTML = "";

  TEAM_MEMBERS.forEach((member, i) => {
    const pos = AVATAR_POSITIONS[i % AVATAR_POSITIONS.length];
    const el = document.createElement("div");
    el.className = "hoc-avatar";
    el.dataset.memberId = member.id;
    el.title = member.name;

    el.innerHTML = `
      <div class="hoc-avatar-img">
        <img src="${member.picture}" alt="${member.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="hoc-avatar-initials" style="display:none;">${member.initials}</span>
      </div>
      <span class="hoc-avatar-name">${member.username}</span>
    `;

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      openDeveloperModal(member.id);
    });

    container.appendChild(el);
    avatarElements.push({
      el,
      latRad: (pos.lat * Math.PI) / 180,
      lonRad: (pos.lon * Math.PI) / 180
    });
  });
}

function project3D(x, y, z, cx, cy, perspective) {
  perspective = perspective || 900;
  const scale = perspective / (perspective + z + 500);
  return { x: cx + x * scale, y: cy + y * scale, scale, z };
}

function animateGlobe() {
  if (!globeCtx || !globeCanvas) return;

  const dpr = window.devicePixelRatio || 1;
  const w = globeCanvas.width / dpr;
  const h = globeCanvas.height / dpr;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.38;
  const avatarDist = radius * 1.45;

  const isMobile = w < 480;
  const isTablet = w < 768;

  globeCtx.clearRect(0, 0, w, h);
  globeRotation += 0.0018;

  const cosRot = Math.cos(globeRotation);
  const sinRot = Math.sin(globeRotation);

  /* AMBIENT */
  const glow = globeCtx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.5);
  glow.addColorStop(0, "rgba(15, 23, 41, 0.025)");
  glow.addColorStop(1, "rgba(15, 23, 41, 0)");
  globeCtx.fillStyle = glow;
  globeCtx.beginPath();
  globeCtx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
  globeCtx.fill();

  /* OUTLINE */
  globeCtx.strokeStyle = "rgba(15, 23, 41, 0.15)";
  globeCtx.lineWidth = 1;
  globeCtx.beginPath();
  globeCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  globeCtx.stroke();

  /* LATITUDE */
  for (let lat = -75; lat <= 75; lat += 15) {
    const latRad = (lat * Math.PI) / 180;
    globeCtx.strokeStyle = "rgba(15, 23, 41, 0.06)";
    globeCtx.lineWidth = 0.8;
    globeCtx.beginPath();
    let started = false;
    for (let lon = 0; lon <= 360; lon += 4) {
      const lonRad = (lon * Math.PI) / 180 + globeRotation;
      const x3d = Math.cos(latRad) * Math.cos(lonRad) * radius;
      const y3d = Math.sin(latRad) * radius;
      const z3d = Math.cos(latRad) * Math.sin(lonRad) * radius;
      const p = project3D(x3d, y3d, z3d, cx, cy);
      if (z3d > 0) {
        if (!started) { globeCtx.moveTo(p.x, p.y); started = true; }
        else globeCtx.lineTo(p.x, p.y);
      } else started = false;
    }
    globeCtx.stroke();
  }

  /* LONGITUDE */
  for (let lon = 0; lon < 180; lon += 30) {
    const lonRad = (lon * Math.PI) / 180 + globeRotation;
    globeCtx.strokeStyle = "rgba(15, 23, 41, 0.05)";
    globeCtx.lineWidth = 0.8;
    globeCtx.beginPath();
    let started = false;
    for (let lat = -90; lat <= 90; lat += 4) {
      const latRad = (lat * Math.PI) / 180;
      const x3d = Math.cos(latRad) * Math.cos(lonRad) * radius;
      const y3d = Math.sin(latRad) * radius;
      const z3d = Math.cos(latRad) * Math.sin(lonRad) * radius;
      const p = project3D(x3d, y3d, z3d, cx, cy);
      if (z3d > 0) {
        if (!started) { globeCtx.moveTo(p.x, p.y); started = true; }
        else globeCtx.lineTo(p.x, p.y);
      } else started = false;
    }
    globeCtx.stroke();
  }

  /* WORLD DOTS */
  const projectedDots = worldDots.map(dot => {
    const x1 = dot.x * cosRot - dot.z * sinRot;
    const z1 = dot.x * sinRot + dot.z * cosRot;
    return { x: x1 * radius, y: dot.y * radius, z: z1 * radius, size: dot.size };
  }).sort((a, b) => a.z - b.z);

  projectedDots.forEach(dot => {
    const p = project3D(dot.x, dot.y, dot.z, cx, cy);
    const depth = (dot.z + radius) / (radius * 2);
    const alpha = 0.15 + depth * 0.75;
    const size = dot.size * (0.4 + depth * 1.1);

    globeCtx.fillStyle = `rgba(15, 23, 41, ${alpha})`;
    globeCtx.beginPath();
    globeCtx.arc(p.x, p.y, size, 0, Math.PI * 2);
    globeCtx.fill();
  });

  /* POSITION AVATARS */
  avatarElements.forEach(item => {
    const { el, latRad, lonRad } = item;
    const angle = lonRad + globeRotation;

    const x3d = Math.cos(latRad) * Math.cos(angle) * avatarDist;
    const y3d = Math.sin(latRad) * avatarDist;
    const z3d = Math.cos(latRad) * Math.sin(angle) * avatarDist;

    const p = project3D(x3d, y3d, z3d, 0, 0, 1200);
    const depth = (z3d + avatarDist) / (avatarDist * 2);

    // === UPDATED: Mas malaki sa mobile ===
    let mobileScaleMul = 1;
    if (isMobile) mobileScaleMul = 0.95;
    else if (isTablet) mobileScaleMul = 1.0;

    const tx = Math.round(p.x * 100) / 100;
    const ty = Math.round(p.y * 100) / 100;
    const scale = Math.round((0.7 + depth * 0.5) * mobileScaleMul * 100) / 100;
    const opacity = Math.round((0.45 + depth * 0.55) * 100) / 100;

    el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${scale})`;
    el.style.opacity = opacity;
    el.style.zIndex = Math.round(depth * 1000);
    el.style.pointerEvents = z3d > -30 ? "auto" : "none";
  });

  globeAnimationId = requestAnimationFrame(animateGlobe);
}

/* ============================================ */
/* ===== TEAM CARDS — FLIP + TYPING ========== */
/* ============================================ */
function renderTeamCards() {
  const container = document.getElementById("teamCards");
  if (!container) {
    console.error("teamCards container NOT FOUND");
    return;
  }

  container.innerHTML = TEAM_MEMBERS.map((member, i) => `
    <div class="team-card" data-member-id="${member.id}">
      <!-- FRONT FACE -->
      <div class="team-card-face team-card-front">
        <div class="team-card-avatar">
          <img src="${member.picture}" alt="${member.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='${member.initials}';">
        </div>
        <span class="team-role">${member.roleShort}</span>
        <h4>${member.name}</h4>
        <a href="${member.github}" class="team-github-btn" target="_blank" rel="noopener" onclick="event.stopPropagation()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <div class="team-flip-hint">
          <span>Click to flip</span>
          <span>→</span>
        </div>
      </div>

      <!-- BACK FACE -->
      <div class="team-card-face team-card-back">
        <span class="back-name">Developer Profile</span>
        <h3 class="back-fullname">${member.name}</h3>
        <div class="back-divider"></div>

        <div class="back-info">
          <div class="back-info-row">
            <span class="back-info-label">Role</span>
            <span class="back-info-value" data-type-field="role"></span>
          </div>
          <div class="back-info-row">
            <span class="back-info-label">Specialization</span>
            <span class="back-info-value" data-type-field="specialization"></span>
          </div>
          <div class="back-info-row">
            <span class="back-info-label">Location</span>
            <span class="back-info-value" data-type-field="location"></span>
          </div>
          <div class="back-info-row">
            <span class="back-info-label">GitHub</span>
            <span class="back-info-value" data-type-field="github"></span>
          </div>
        </div>

        <div class="back-hint">
          <span>← Back</span>
        </div>
      </div>
    </div>
  `).join("");

  const cards = container.querySelectorAll(".team-card");

  cards.forEach((card) => {
    card.style.cursor = "pointer";
    card.onclick = function(e) {
      if (e.target.closest(".team-github-btn")) return;

      e.preventDefault();
      e.stopPropagation();

      const memberId = card.getAttribute("data-member-id");
      const member = TEAM_MEMBERS.find(m => m.id === memberId);
      if (!member) return;

      const wasFlipped = card.classList.contains("flipped");

      if (wasFlipped) {
        card.classList.remove("flipped");
        resetTyping(card);
      } else {
        card.classList.add("flipped");
        setTimeout(() => startTyping(card, member), 400);
      }
    };
  });
}

/* ===== TYPING ANIMATION ===== */
const typingTimeouts = new WeakMap();

function startTyping(card, member) {
  clearCardTyping(card);

  const fields = {
    role: member.role,
    specialization: member.specialization,
    location: member.location,
    github: member.username
  };

  const fieldOrder = ["role", "specialization", "location", "github"];
  const timeouts = [];

  fieldOrder.forEach(fieldName => {
    const el = card.querySelector(`[data-type-field="${fieldName}"]`);
    if (el) el.textContent = "";
  });

  let delay = 0;

  fieldOrder.forEach((fieldName) => {
    const el = card.querySelector(`[data-type-field="${fieldName}"]`);
    if (!el) return;

    const text = fields[fieldName] || "";

    for (let i = 0; i <= text.length; i++) {
      const partial = text.slice(0, i);
      const isLast = i === text.length;

      const t = setTimeout(() => {
        if (!card.classList.contains("flipped")) return;

        if (isLast) {
          el.textContent = partial;
        } else {
          el.innerHTML = `${partial}<span class="type-cursor"></span>`;
        }
      }, delay);

      timeouts.push(t);
      delay += 45;
    }

    delay += 220;
  });

  typingTimeouts.set(card, timeouts);
}

function clearCardTyping(card) {
  const timeouts = typingTimeouts.get(card);
  if (timeouts) {
    timeouts.forEach(t => clearTimeout(t));
    typingTimeouts.delete(card);
  }
}

function resetTyping(card) {
  clearCardTyping(card);
  ["role", "specialization", "location", "github"].forEach(fieldName => {
    const el = card.querySelector(`[data-type-field="${fieldName}"]`);
    if (el) el.textContent = "";
  });
}

/* ===== STAR RATING ===== */
let currentRating = 0;

function initStarRating() {
  const stars = document.querySelectorAll("#starRating .star");
  const ratingText = document.getElementById("ratingText");
  if (!stars.length) return;

  const labels = ["", "Poor 😞", "Fair 😐", "Good 🙂", "Very Good 😊", "Excellent 🤩"];

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const v = parseInt(star.dataset.value);
      currentRating = v;
      stars.forEach(s => s.classList.toggle("active", parseInt(s.dataset.value) <= v));
      ratingText.textContent = labels[v] || "Click to rate";
    });

    star.addEventListener("mouseenter", () => {
      const v = parseInt(star.dataset.value);
      stars.forEach(s => s.style.color = parseInt(s.dataset.value) <= v ? "#0f1729" : "");
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach(s => s.style.color = parseInt(s.dataset.value) <= currentRating ? "#0f1729" : "");
    });
  });
}

/* ===== FEEDBACK FORM ===== */
function initFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  if (!form || form.dataset.bound === "1") return;
  form.dataset.bound = "1";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("feedbackName");
    const email = document.getElementById("feedbackEmail");
    const subject = document.getElementById("feedbackSubject");
    const message = document.getElementById("feedbackMessage");

    ["feedbackNameError", "feedbackEmailError", "feedbackSubjectError", "feedbackMessageError"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    document.getElementById("feedbackError").textContent = "";
    document.getElementById("feedbackSuccess").textContent = "";

    let valid = true;
    if (!name.value.trim()) { document.getElementById("feedbackNameError").textContent = "Please enter your name."; valid = false; }
    if (!email.value.trim() || !email.value.includes("@")) { document.getElementById("feedbackEmailError").textContent = "Please enter a valid email."; valid = false; }
    if (!subject.value.trim()) { document.getElementById("feedbackSubjectError").textContent = "Please enter a subject."; valid = false; }
    if (!message.value.trim()) { document.getElementById("feedbackMessageError").textContent = "Please enter your message."; valid = false; }
    if (currentRating === 0) { document.getElementById("feedbackError").textContent = "Please rate your experience."; valid = false; }

    if (!valid) return;

    const btn = document.getElementById("feedbackSubmitBtn");
    btn.disabled = true;
    btn.innerHTML = `<span>Submitting...</span>`;

    setTimeout(() => {
      const feedbacks = JSON.parse(localStorage.getItem("examcheckFeedback") || "[]");
      feedbacks.push({
        id: Date.now(),
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        rating: currentRating,
        date: new Date().toISOString()
      });
      localStorage.setItem("examcheckFeedback", JSON.stringify(feedbacks));

      document.getElementById("feedbackSuccess").textContent = "Thank you! Your feedback has been submitted successfully.";

      form.reset();
      currentRating = 0;
      document.querySelectorAll("#starRating .star").forEach(s => {
        s.classList.remove("active");
        s.style.color = "";
      });
      document.getElementById("ratingText").textContent = "Click to rate";

      btn.disabled = false;
      btn.innerHTML = `
        <span>Submit Feedback</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;

      if (typeof fireConfetti === "function") fireConfetti(80);
      if (typeof showToast === "function") showToast("Feedback submitted successfully! 🎉");

      setTimeout(() => {
        document.getElementById("feedbackSuccess").textContent = "";
      }, 5000);
    }, 1200);
  });
}

/* ===== DEVELOPER MODAL ===== */
function initDeveloperModal() {
  const modal = document.getElementById("developerModal");
  const closeBtn = document.getElementById("closeDeveloperModal");

  if (closeBtn && closeBtn.dataset.bound !== "1") {
    closeBtn.dataset.bound = "1";
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDeveloperModal();
    });
  }

  if (modal && modal.dataset.bound !== "1") {
    modal.dataset.bound = "1";
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeDeveloperModal();
    });
  }

  if (!window.__devModalKeyBound) {
    window.__devModalKeyBound = true;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
        closeDeveloperModal();
      }
    });
  }
}

function openDeveloperModal(memberId) {
  const member = TEAM_MEMBERS.find(m => m.id === memberId);
  if (!member) return;

  const modal = document.getElementById("developerModal");
  const avatar = document.getElementById("devModalAvatar");
  const name = document.getElementById("devModalName");
  const role = document.getElementById("devModalRole");
  const bio = document.getElementById("devModalBio");
  const roleDetail = document.getElementById("devModalRoleDetail");
  const spec = document.getElementById("devModalSpec");
  const location = document.getElementById("devModalLocation");
  const githubLink = document.getElementById("devGithubLink");

  if (member.picture) {
    avatar.innerHTML = `<img src="${member.picture}" alt="${member.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" onerror="this.style.display='none'; this.parentElement.innerHTML='${member.initials}';">`;
  } else {
    avatar.innerHTML = member.initials;
  }

  name.textContent = member.name;
  role.textContent = member.role;
  bio.textContent = member.bio || "Passionate about building clean, efficient, and user-friendly web applications.";
  roleDetail.textContent = member.role;
  spec.textContent = member.specialization;
  location.textContent = member.location;
  githubLink.href = member.github;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeDeveloperModal() {
  const modal = document.getElementById("developerModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

/* ===== EXPOSE ===== */
window.openDeveloperModal = openDeveloperModal;
window.closeDeveloperModal = closeDeveloperModal;
window.initFeedbackPage = initFeedbackPage;