// ==========================================================================
// KarmChakra — site data & interactions
// ==========================================================================

// Single source of truth for the seven karma domains. Used to render the
// hero orbit badges, the "Seven Karmas" card grid, and the karma.html
// detail template — so the content only has to be authored once.
const KARMA_DOMAINS = [{
        id: "prakriti",
        name: "Prakriti Karma",
        subtitle: "Karma for Nature",
        action: "Tree Plantation Drive",
        points: 100,
        icon: "🌱",
        tone: "green",
        description: "Prakriti Karma honors every action taken to protect, restore or nurture the natural world — from planting trees to reducing waste in daily life."
    },
    {
        id: "seva",
        name: "Seva Karma",
        subtitle: "Karma of Selfless Service",
        action: "Feed 25 People",
        points: 120,
        icon: "🤝",
        tone: "gold",
        description: "Seva Karma celebrates selfless service — acts done for others with no expectation of return, the oldest form of good karma."
    },
    {
        id: "jeeva",
        name: "Jeeva Karma",
        subtitle: "Karma for All Living Beings",
        action: "Street Animal Care",
        points: 90,
        icon: "🐾",
        tone: "teal",
        description: "Jeeva Karma recognizes compassion shown to animals and all living creatures who share our world."
    },
    {
        id: "suraksha",
        name: "Suraksha Karma",
        subtitle: "Karma of Protection",
        action: "Community Safety Watch",
        points: 110,
        icon: "🛡️",
        tone: "blue",
        description: "Suraksha Karma is earned by keeping others safe — from neighbourhood watch efforts to speaking up against harm."
    },
    {
        id: "samaj",
        name: "Samaj Karma",
        subtitle: "Karma for Society",
        action: "Clean Public Space",
        points: 80,
        icon: "🏛️",
        tone: "purple",
        description: "Samaj Karma rewards contributions to shared public life — clean spaces, civic participation, and community upkeep."
    },
    {
        id: "arogya",
        name: "Arogya Karma",
        subtitle: "Karma of Health & Life",
        action: "Blood Donation",
        points: 150,
        icon: "❤️",
        tone: "rose",
        description: "Arogya Karma honors actions that protect health and save lives, from blood donation to caring for the sick."
    },
    {
        id: "vidya",
        name: "Vidya Karma",
        subtitle: "Karma of Knowledge",
        action: "Teach an Underprivileged Child",
        points: 130,
        icon: "📚",
        tone: "indigo",
        description: "Vidya Karma celebrates the sharing of knowledge — teaching, mentoring, and opening doors through education."
    }
];

const COLLECTIVE_IMPACT = [
    { icon: "🌳", value: "126", label: "Trees Planted" },
    { icon: "🍲", value: "480", label: "Meals Served" },
    { icon: "🐕", value: "62", label: "Animals Helped" },
    { icon: "📖", value: "104", label: "Hours Taught" },
    { icon: "🌍", value: "2.4 t", label: "CO₂ Offset" },
    { icon: "✨", value: "1,320", label: "Lives Touched" }
];

// ---------- Seva Karma domain: activity catalog ----------
// Each Seva activity has its own proof rules and three goal tiers
// (beginner / intermediate / advanced), matching the PDF's Goal System.
// This is the single source of truth for seva.html and, later, seva-log.html.
const SEVA_ACTIVITIES = [{
        id: "feed-hungry",
        name: "Feed the Hungry",
        icon: "🍲",
        summary: "Distribute meals to people in need.",
        basePoints: 80,
        impactUnit: "people fed",
        proofNote: "Photo of the meal distribution + how many people you fed.",
        tiers: { beginner: 5, intermediate: 25, advanced: 100 }
    },
    {
        id: "donate-essentials",
        name: "Donate Essentials",
        icon: "👕",
        summary: "Give old clothes, blankets or books to those who need them.",
        basePoints: 60,
        impactUnit: "items donated",
        proofNote: "Photo of the items before handover + how many items.",
        tiers: { beginner: 5, intermediate: 20, advanced: 50 }
    },
    {
        id: "elderly-care",
        name: "Elderly Care Visit",
        icon: "👵",
        summary: "Spend time helping or checking in on elderly people.",
        basePoints: 90,
        impactUnit: "visits",
        proofNote: "Photo from the visit + a short description.",
        tiers: { beginner: 1, intermediate: 5, advanced: 15 }
    },
    {
        id: "blood-camp-support",
        name: "Blood Camp Support",
        icon: "🩸",
        summary: "Volunteer at (not just donate to) a blood donation camp.",
        basePoints: 100,
        impactUnit: "camps supported",
        proofNote: "Photo at the camp + your role there.",
        tiers: { beginner: 1, intermediate: 3, advanced: 10 }
    },
    {
        id: "disaster-relief",
        name: "Disaster Relief Support",
        icon: "🚨",
        summary: "Help with relief work after floods, fires or other disasters.",
        basePoints: 150,
        impactUnit: "relief efforts",
        proofNote: "Photo of the relief work + location + description.",
        tiers: { beginner: 1, intermediate: 3, advanced: 8 }
    },
    {
        id: "teach-support",
        name: "Community Teaching Support",
        icon: "📚",
        summary: "Teach or mentor underprivileged children or adults.",
        basePoints: 70,
        impactUnit: "hours taught",
        proofNote: "Photo of the session + hours taught.",
        tiers: { beginner: 2, intermediate: 10, advanced: 30 }
    }
];

// Mock/demo user progress for the Seva domain only — this is NOT real data.
// Replace this object with a real API response once the backend exists.
const SEVA_USER_STATS = {
    mudra: 320,
    activitiesCompleted: 4,
    tierLabel: "Seva Sevak · Tier 2"
};

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initOrbitWheel();
    initKarmaGrid();
    initImpactStats();
    initScrollReveal();
    initKarmaDetailPage();
    initSevaPage();
});

// ---------- Navbar: mobile close + scrollspy + scrolled state ----------
function initNavbar() {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbar = document.querySelector(".kc-navbar");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains("show")) {
                const toggle = document.querySelector(".navbar-toggler");
                if (toggle) toggle.click();
            }
        });
    });

    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle("kc-navbar--scrolled", window.scrollY > 12);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Highlight the current nav item as the visitor scrolls past each section.
    const sections = [...document.querySelectorAll("main[id], section[id]")];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
}

// ---------- Hero: build the clickable orbit badges around the chakra ----------
function initOrbitWheel() {
    const track = document.querySelector("[data-orbit-track]");
    if (!track) return;

    const badges = KARMA_DOMAINS.map((domain, index) => {
        const badge = document.createElement("a");
        badge.href = `karma.html?domain=${domain.id}`;
        badge.className = `orbit-badge tone-${domain.tone}`;
        badge.style.setProperty("--i", index);
        badge.setAttribute("aria-label", `${domain.name} — open karma details`);
        badge.innerHTML = `
      <span class="orbit-badge-circle">${domain.icon}</span>
      <span class="orbit-badge-label">${domain.name}</span>
    `;
        return badge;
    });

    track.append(...badges);
}

// ---------- Homepage: render the Seven Karmas card grid ----------
function initKarmaGrid() {
    const grid = document.querySelector("[data-karma-grid]");
    if (!grid) return;

    grid.innerHTML = KARMA_DOMAINS.map(domain => `
    <a class="karma-card" href="karma.html?domain=${domain.id}">
      <span class="karma-card-icon tone-${domain.tone}">${domain.icon}</span>
      <h3 class="karma-card-title">${domain.name}</h3>
      <p class="karma-card-subtitle">${domain.subtitle}</p>
      <p class="karma-card-action">${domain.action} · +${domain.points} Mudrā</p>
    </a>
  `).join("");
}

// ---------- Homepage: render the Collective Impact stat row ----------
function initImpactStats() {
    const row = document.querySelector("[data-impact-stats]");
    if (!row) return;

    row.innerHTML = COLLECTIVE_IMPACT.map(stat => `
    <div class="impact-stat">
      <span class="impact-stat-icon">${stat.icon}</span>
      <div class="impact-stat-value">${stat.value}</div>
      <div class="impact-stat-label">${stat.label}</div>
    </div>
  `).join("");
}

// ---------- Fade/slide sections in as they enter the viewport ----------
function initScrollReveal() {
    const revealEls = document.querySelectorAll("[data-reveal]");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
        revealEls.forEach(el => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 }
    );

    revealEls.forEach(el => observer.observe(el));
}

// ---------- karma.html: populate the detail page from ?domain= ----------
function initKarmaDetailPage() {
    const root = document.querySelector("[data-karma-detail]");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const domain =
        KARMA_DOMAINS.find(d => d.id === params.get("domain")) || KARMA_DOMAINS[0];

    document.title = `${domain.name} — KarmChakra`;

    root.innerHTML = `
    <span class="karma-detail-icon tone-${domain.tone}">${domain.icon}</span>
    <span class="section-kicker">${domain.subtitle.toUpperCase()}</span>
    <h1>${domain.name}</h1>
    <p class="karma-detail-description">${domain.description}</p>

    <div class="karma-detail-action">
      <span class="karma-detail-action-label">Featured Karma</span>
      <span class="karma-detail-action-value">${domain.action}</span>
      <span class="karma-detail-action-points">+${domain.points} Mudrā</span>
    </div>

    <div class="hero-actions karma-detail-ctas">
      <a href="${domain.id === 'seva' ? 'seva.html' : 'plant-tree.html'}" class="btn kc-primary-btn">Log This Karma</a>
      <a href="index.html#karmas" class="btn kc-outline-btn">← Back to Karmas</a>
    </div>
  `;

    // Keep the badge/card grid for the other six domains visible below.
    const others = document.querySelector("[data-karma-others]");
    if (others) {
        others.innerHTML = KARMA_DOMAINS.filter(d => d.id !== domain.id)
            .map(d => `
        <a class="karma-card karma-card--compact" href="karma.html?domain=${d.id}">
          <span class="karma-card-icon tone-${d.tone}">${d.icon}</span>
          <h3 class="karma-card-title">${d.name}</h3>
        </a>
      `).join("");
    }
}

// ---------- seva.html: summary strip + activity catalog ----------
function initSevaPage() {
    const summaryRow = document.querySelector("[data-seva-summary]");
    const catalog = document.querySelector("[data-seva-catalog]");
    if (!summaryRow && !catalog) return; // not on seva.html, skip

    if (summaryRow) {
        summaryRow.innerHTML = `
      <div class="impact-stat">
        <span class="impact-stat-icon">✺</span>
        <div class="impact-stat-value">${SEVA_USER_STATS.mudra}</div>
        <div class="impact-stat-label">Seva Mudrā Earned</div>
      </div>
      <div class="impact-stat">
        <span class="impact-stat-icon">🤝</span>
        <div class="impact-stat-value">${SEVA_USER_STATS.activitiesCompleted}</div>
        <div class="impact-stat-label">Seva Activities Completed</div>
      </div>
      <div class="impact-stat">
        <span class="impact-stat-icon">🏅</span>
        <div class="impact-stat-value">${SEVA_USER_STATS.tierLabel}</div>
        <div class="impact-stat-label">Current Standing</div>
      </div>
    `;
    }

    if (catalog) {
        catalog.innerHTML = SEVA_ACTIVITIES.map(a => `
      <a class="karma-card" href="seva-log.html?activity=${a.id}">
        <span class="karma-card-icon tone-gold">${a.icon}</span>
        <h3 class="karma-card-title">${a.name}</h3>
        <p class="karma-card-subtitle">${a.summary}</p>
        <p class="karma-card-action">Goal: ${a.tiers.beginner} ${a.impactUnit} · +${a.basePoints} Mudrā</p>
      </a>
    `).join("");
    }
}

// ===== SEVA FORM LOGIC =====
document.addEventListener('DOMContentLoaded', function () {

  const sevaForm = document.getElementById('sevaForm');
  if (!sevaForm) return; // agar seva page nahi hai to yahin ruk jao

  const photoInput = document.getElementById('sevaPhoto');
  const uploadBox = document.getElementById('sevaUploadBox');
  const previewContainer = document.getElementById('sevaPhotoPreviewContainer');
  const previewImg = document.getElementById('sevaPhotoPreview');
  const removePhotoBtn = document.getElementById('removeSevaPhoto');

  const descriptionInput = document.getElementById('sevaDescription');
  const charCount = document.getElementById('sevaCharCount');

  const locationInput = document.getElementById('sevaLocation');
  const getLocationBtn = document.getElementById('getSevaLocation');
  const locationStatus = document.getElementById('sevaLocationStatus');

  const submitBtn = document.getElementById('sevaSubmitBtn');

  // ---- 1. PHOTO PREVIEW ----
  photoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Photo 10MB se chhoti honi chahiye.');
      this.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewContainer.classList.add('active');
      uploadBox.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  removePhotoBtn.addEventListener('click', function () {
    photoInput.value = '';
    previewImg.src = '';
    previewContainer.classList.remove('active');
    uploadBox.style.display = 'flex';
  });

  // ---- 2. CHARACTER COUNT ----
  descriptionInput.addEventListener('input', function () {
    charCount.textContent = this.value.length;
  });

  // ---- 3. GPS LOCATION ----
  getLocationBtn.addEventListener('click', function () {
    if (!navigator.geolocation) {
      locationStatus.textContent = 'Geolocation is not supported by this browser.';
      locationStatus.classList.add('error');
      return;
    }

    locationStatus.textContent = 'Location fetch ho rahi hai...';
    locationStatus.classList.remove('error');

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        locationInput.value = `${lat}, ${lng}`;
        locationStatus.textContent = '✓ Location captured successfully';
        locationStatus.classList.remove('error');
      },
      function (error) {
        locationStatus.textContent = 'Location permission denied ya nahi mil payi.';
        locationStatus.classList.add('error');
      }
    );
  });

  // ---- 4. FORM SUBMIT ----
  sevaForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!photoInput.files[0]) {
      alert('Please photo upload karo.');
      return;
    }
    if (!locationInput.value) {
      alert('Please location capture karo.');
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Yahan par tum apna actual API call laga sakte ho
    setTimeout(function () {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      alert('Seva submitted for verification! 🙏');
      sevaForm.reset();
      previewContainer.classList.remove('active');
      uploadBox.style.display = 'flex';
      charCount.textContent = '0';
      locationStatus.textContent = '';
    }, 1800);
  });

});