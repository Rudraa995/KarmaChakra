// ==========================================================================
// KarmChakra — site data & interactions
// ==========================================================================

// Single source of truth for the seven karma domains.
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

// ==========================================================================
// SEVA KARMA — ACTIVITY CATALOG
// ==========================================================================

const SEVA_ACTIVITIES = [
    {
        id: "feed-hungry",
        name: "Feed the Hungry",
        icon: "🍲",
        summary: "Distribute meals to people in need.",
        basePoints: 80,
        impactUnit: "people fed",
        proofNote: "Photo of the meal distribution + how many people you fed.",
        tiers: {
            beginner: 5,
            intermediate: 25,
            advanced: 100
        },
        extraFields: [
            {
                id: "peopleFed",
                label: "Number of People Fed",
                type: "number",
                placeholder: "e.g. 10",
                min: 1,
                required: true
            }
        ]
    },

    {
        id: "donate-essentials",
        name: "Donate Essentials",
        icon: "👕",
        summary: "Give old clothes, blankets or books to those who need them.",
        basePoints: 60,
        impactUnit: "items donated",
        proofNote: "Photo of the items before handover + how many items.",
        tiers: {
            beginner: 5,
            intermediate: 20,
            advanced: 50
        },
        extraFields: [
            {
                id: "itemsDonated",
                label: "Number of Items Donated",
                type: "number",
                placeholder: "e.g. 10",
                min: 1,
                required: true
            }
        ]
    },

    {
        id: "elderly-care",
        name: "Elderly Care Visit",
        icon: "👵",
        summary: "Spend time helping or checking in on elderly people.",
        basePoints: 90,
        impactUnit: "visits",
        proofNote: "Photo from the visit + a short description.",
        tiers: {
            beginner: 1,
            intermediate: 5,
            advanced: 15
        },
        extraFields: [
            {
                id: "elderlyPerson",
                label: "Elderly Person / Home Name",
                type: "text",
                placeholder: "e.g. Shanti Old Age Home",
                required: true
            },
            {
                id: "timeSpent",
                label: "Time Spent",
                type: "text",
                placeholder: "e.g. 2 hours",
                required: true
            }
        ]
    },

    

    {
        id: "teach-support",
        name: "Community Teaching Support",
        icon: "📚",
        summary: "Teach or mentor underprivileged children or adults.",
        basePoints: 70,
        impactUnit: "hours taught",
        proofNote: "Photo of the session + hours taught.",
        tiers: {
            beginner: 2,
            intermediate: 10,
            advanced: 30
        },
        extraFields: [
            {
                id: "teachingHours",
                label: "Teaching Hours",
                type: "number",
                placeholder: "e.g. 2",
                min: 0.5,
                step: 0.5,
                required: true
            },
            {
                id: "studentsTaught",
                label: "Number of Students Taught",
                type: "number",
                placeholder: "e.g. 15",
                min: 1,
                required: true
            }
        ]
    }
];

// ==========================================================================
// SEVA HISTORY — DEMO DATA
// ==========================================================================

const SEVA_HISTORY = [
    {
        activityId: "feed-hungry",
        title: "Distributed meals to 25 people",
        date: "28 Aug 2026",
        details: "25 people fed",
        icon: "🍲"
    },
    {
        activityId: "donate-essentials",
        title: "Donated clothes and blankets",
        date: "22 Aug 2026",
        details: "18 items donated",
        icon: "👕"
    },
    {
        activityId: "elderly-care",
        title: "Visited Shanti Old Age Home",
        date: "15 Aug 2026",
        details: "2 hours spent",
        icon: "👵"
    },
    {
        activityId: "teach-support",
        title: "Community teaching session",
        date: "08 Aug 2026",
        details: "3 hours · 12 students",
        icon: "📚"
    }
];


// ==========================================================================
// DOM READY
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initOrbitWheel();
    initKarmaGrid();
    initImpactStats();
    initScrollReveal();
    initKarmaDetailPage();
    initSevaPage();

    // IMPORTANT:
    // This loads seva-activity.html?activity=...
    initSevaActivityPage();
});

// ==========================================================================
// NAVBAR
// ==========================================================================

function initNavbar() {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbar = document.querySelector(".kc-navbar");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (
                window.innerWidth < 992 &&
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {
                const toggle = document.querySelector(".navbar-toggler");

                if (toggle) {
                    toggle.click();
                }
            }
        });
    });

    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle(
                "kc-navbar--scrolled",
                window.scrollY > 12
            );
        };

        onScroll();

        window.addEventListener(
            "scroll",
            onScroll,
            { passive: true }
        );
    }

    const sections = [
        ...document.querySelectorAll("main[id], section[id]")
    ];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// HERO ORBIT
// ==========================================================================

function initOrbitWheel() {
    const track = document.querySelector("[data-orbit-track]");

    if (!track) return;

    const badges = KARMA_DOMAINS.map((domain, index) => {
        const badge = document.createElement("a");

        badge.href = `karma.html?domain=${domain.id}`;
        badge.className = `orbit-badge tone-${domain.tone}`;
        badge.style.setProperty("--i", index);

        badge.setAttribute(
            "aria-label",
            `${domain.name} — open karma details`
        );

        badge.innerHTML = `
            <span class="orbit-badge-circle">
                ${domain.icon}
            </span>

            <span class="orbit-badge-label">
                ${domain.name}
            </span>
        `;

        return badge;
    });

    track.append(...badges);
}

// ==========================================================================
// HOMEPAGE KARMA GRID
// ==========================================================================

function initKarmaGrid() {
    const grid = document.querySelector("[data-karma-grid]");

    if (!grid) return;

    grid.innerHTML = KARMA_DOMAINS.map(domain => `
        <a
            class="karma-card"
            href="karma.html?domain=${domain.id}"
        >
            <span class="karma-card-icon tone-${domain.tone}">
                ${domain.icon}
            </span>

            <h3 class="karma-card-title">
                ${domain.name}
            </h3>

            <p class="karma-card-subtitle">
                ${domain.subtitle}
            </p>

            <p class="karma-card-action">
                ${domain.action} · +${domain.points} Mudrā
            </p>
        </a>
    `).join("");
}

// ==========================================================================
// SEVA ACTIVITY PAGE
// ==========================================================================

function initSevaActivityPage() {
    const page = document.querySelector(
        "[data-seva-activity-page]"
    );

    // Only run on seva-activity.html
    if (!page) return;

    const params = new URLSearchParams(
        window.location.search
    );

    const activityId = params.get("activity");

    const activity = SEVA_ACTIVITIES.find(
        a => a.id === activityId
    );

    if (!activity) {
        page.innerHTML = `
            <div class="container py-5">
                <h2>Seva activity not found.</h2>

                <a href="seva.html">
                    ← Back to Seva
                </a>
            </div>
        `;

        return;
    }

    document.title =
        `${activity.name} — KarmChakra`;



    page.innerHTML = `

        <!-- HERO -->
        <section class="seva-activity-hero">

            <div class="container kc-container">

                <a
                    href="seva.html"
                    class="seva-back-link"
                >
                    ← Back to Seva Activities
                </a>

                <div class="seva-activity-header">

                    <div class="seva-activity-icon">
                        ${activity.icon}
                    </div>

                    <div>

                        <span class="section-kicker">
                            SEVA KARMA
                        </span>

                        <h1>
                            ${activity.name}
                        </h1>

                        <p>
                            ${activity.summary}
                        </p>

                    </div>

                </div>

            </div>

        </section>


        <!-- GOAL -->
        <section class="seva-goal-section">

            <div class="container kc-container">

                <div class="seva-goal-panel">

                    <div class="seva-goal-main">

                        <span class="section-kicker">
                            YOUR GOAL
                        </span>

                        <h2>
                            ${activity.tiers.beginner}
                            ${activity.impactUnit}
                        </h2>

                        <p>
                            Complete this Seva activity and
                            submit valid proof to earn Karma Points.
                        </p>

                    </div>

                    <div class="seva-goal-points">

                        <strong>
                            ${activity.basePoints}
                        </strong>

                        <span>
                            Karma Points
                        </span>

                    </div>

                </div>

            </div>

        </section>


        

        <!-- FORM -->
        <section class="seva-activity-form-section">

            <div class="container kc-container">

                <div class="seva-activity-form-grid">


                    <!-- LEFT INFO -->
                    <div class="seva-activity-info">

                        <span class="section-kicker">
                            LOG YOUR SEVA
                        </span>

                        <h2>
                            ${activity.name}
                        </h2>

                        <p>
                            ${activity.proofNote}
                        </p>

                        <div class="seva-verification-box">

                            <span>✨</span>

                            <div>

                                <strong>
                                    AI Verification
                                </strong>

                                <p>
                                    Your photo, location and
                                    contribution details will be
                                    checked for verification.
                                </p>

                            </div>

                        </div>

                    </div>


                    <!-- FORM -->
                    <div class="seva-form-card">

                        <form id="sevaActivityForm">


                            <!-- PHOTOS -->
                            <div class="form-section">

                                <label class="form-label">
                                    <span>1.</span>
                                    Upload Proof Photos
                                </label>

                                <p class="form-help">
                                    Upload up to 5 clear photos.
                                </p>

                                <input
                                    type="file"
                                    id="sevaActivityPhotos"
                                    class="tree-input"
                                    accept="image/jpeg,image/png,image/jpg"
                                    multiple
                                    required
                                >

                                <div
                                    id="sevaPhotoPreview"
                                    class="seva-photo-grid"
                                ></div>

                            </div>


                            <!-- EXTRA FIELDS -->
                            <div id="sevaExtraFields">

                                ${
                                    activity.extraFields
                                    ?
                                    activity.extraFields
                                        .map(field => {

                                            if (
                                                field.type === "select"
                                            ) {

                                                return `
                                                    <div class="form-section">

                                                        <label
                                                            for="${field.id}"
                                                            class="form-label"
                                                        >
                                                            ${field.label}
                                                        </label>

                                                        <select
                                                            id="${field.id}"
                                                            class="tree-input"
                                                            ${field.required ? "required" : ""}
                                                        >

                                                            <option value="">
                                                                Select ${field.label}
                                                            </option>

                                                            ${field.options
                                                                .map(option => `
                                                                    <option value="${option}">
                                                                        ${option}
                                                                    </option>
                                                                `)
                                                                .join("")}

                                                        </select>

                                                    </div>
                                                `;
                                            }

                                            return `
                                                <div class="form-section">

                                                    <label
                                                        for="${field.id}"
                                                        class="form-label"
                                                    >
                                                        ${field.label}
                                                    </label>

                                                    <input
                                                        type="${field.type}"
                                                        id="${field.id}"
                                                        class="tree-input"
                                                        placeholder="${field.placeholder || ""}"
                                                        ${field.min !== undefined ? `min="${field.min}"` : ""}
                                                        ${field.step !== undefined ? `step="${field.step}"` : ""}
                                                        ${field.required ? "required" : ""}
                                                    >

                                                </div>
                                            `;

                                        })
                                        .join("")
                                    :
                                    ""
                                }

                            </div>


                            <!-- TITLE -->
                            <div class="form-section">

                                <label
                                    for="activitySevaTitle"
                                    class="form-label"
                                >
                                    Seva Title
                                </label>

                                <input
                                    type="text"
                                    id="activitySevaTitle"
                                    class="tree-input"
                                    placeholder="e.g. Distributed meals to 20 people"
                                    required
                                >

                            </div>


                            <!-- GPS -->
                            <div class="form-section">

                                <label class="form-label">
                                    GPS Location
                                </label>

                                <div class="location-row">

                                    <input
                                        type="text"
                                        id="activitySevaLocation"
                                        class="tree-input"
                                        placeholder="Your activity location"
                                        readonly
                                        required
                                    >

                                    <button
                                        type="button"
                                        id="activityGetLocation"
                                        class="location-btn"
                                    >
                                        📍 Get Location
                                    </button>

                                </div>

                            </div>


                            <!-- DESCRIPTION -->
                            <div class="form-section">

                                <label
                                    for="activitySevaDescription"
                                    class="form-label"
                                >
                                    Describe Your Contribution
                                </label>

                                <textarea
                                    id="activitySevaDescription"
                                    class="tree-input tree-textarea"
                                    maxlength="500"
                                    rows="5"
                                    placeholder="Tell us what you did..."
                                    required
                                ></textarea>

                                <div class="character-count">

                                    <span id="activityDescriptionCount">
                                        0
                                    </span>

                                    / 500

                                </div>

                            </div>


                            <!-- SUBMIT -->
                            <button
                                type="submit"
                                class="submit-btn"
                                id="activitySubmitBtn"
                            >
                                Submit for Verification
                            </button>

                            <p class="secure-note">
                                🔒 Your submission is securely processed
                                for Karma verification.
                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </section>


        <!-- BACK -->
        <section class="seva-back-section">

            <div class="container kc-container text-center">

                <a
                    href="seva.html"
                    class="btn kc-outline-btn"
                >
                    ← Back to Seva Activities
                </a>

            </div>

        </section>

    `;

    initSevaActivityForm(activity);
}

// ==========================================================================
// COLLECTIVE IMPACT
// ==========================================================================

function initImpactStats() {
    const row = document.querySelector(
        "[data-impact-stats]"
    );

    if (!row) return;

    row.innerHTML = COLLECTIVE_IMPACT.map(stat => `
        <div class="impact-stat">

            <span class="impact-stat-icon">
                ${stat.icon}
            </span>

            <div class="impact-stat-value">
                ${stat.value}
            </div>

            <div class="impact-stat-label">
                ${stat.label}
            </div>

        </div>
    `).join("");
}

// ==========================================================================
// SCROLL REVEAL
// ==========================================================================

function initScrollReveal() {
    const revealEls =
        document.querySelectorAll("[data-reveal]");

    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {

        revealEls.forEach(el => {
            el.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealEls.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================================================
// KARMA DETAIL PAGE
// ==========================================================================

function initKarmaDetailPage() {

    const root =
        document.querySelector(
            "[data-karma-detail]"
        );

    if (!root) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const domain =
        KARMA_DOMAINS.find(
            d => d.id === params.get("domain")
        ) ||
        KARMA_DOMAINS[0];

    document.title =
        `${domain.name} — KarmChakra`;

    root.innerHTML = `

        <span class="karma-detail-icon tone-${domain.tone}">
            ${domain.icon}
        </span>

        <span class="section-kicker">
            ${domain.subtitle.toUpperCase()}
        </span>

        <h1>
            ${domain.name}
        </h1>

        <p class="karma-detail-description">
            ${domain.description}
        </p>

        <div class="karma-detail-action">

            <span class="karma-detail-action-label">
                Featured Karma
            </span>

            <span class="karma-detail-action-value">
                ${domain.action}
            </span>

            <span class="karma-detail-action-points">
                +${domain.points} Mudrā
            </span>

        </div>

        <div class="hero-actions karma-detail-ctas">

            <a
                href="${
    domain.id === "seva"
    ? "seva.html"
    : domain.id === "samaj"
    ? "samaj.html"
    : "plant-tree.html"
}"
                class="btn kc-primary-btn"
            >
                Log This Karma
            </a>

            <a
                href="index.html#karmas"
                class="btn kc-outline-btn"
            >
                ← Back to Karmas
            </a>

        </div>
    `;

    const others =
        document.querySelector(
            "[data-karma-others]"
        );

    if (others) {

        others.innerHTML =
            KARMA_DOMAINS
                .filter(
                    d => d.id !== domain.id
                )
                .map(d => `

                    <a
                        class="karma-card karma-card--compact"
                        href="karma.html?domain=${d.id}"
                    >

                        <span
                            class="karma-card-icon tone-${d.tone}"
                        >
                            ${d.icon}
                        </span>

                        <h3 class="karma-card-title">
                            ${d.name}
                        </h3>

                    </a>

                `)
                .join("");
    }
}

// ==========================================================================
// SEVA.HTML
// ==========================================================================

function initSevaPage() {

    const summaryRow =
        document.querySelector(
            "[data-seva-summary]"
        );

    const catalog =
        document.querySelector(
            "[data-seva-catalog]"
        );

    if (!summaryRow && !catalog) return;


    // SUMMARY
    if (summaryRow) {

        summaryRow.innerHTML = `

            <div class="impact-stat">

                <span class="impact-stat-icon">
                    ✺
                </span>

                <div class="impact-stat-value">
                    ${SEVA_USER_STATS.mudra}
                </div>

                <div class="impact-stat-label">
                    Seva Mudrā Earned
                </div>

            </div>


            <div class="impact-stat">

                <span class="impact-stat-icon">
                    🤝
                </span>

                <div class="impact-stat-value">
                    ${SEVA_USER_STATS.activitiesCompleted}
                </div>

                <div class="impact-stat-label">
                    Seva Activities Completed
                </div>

            </div>


            <div class="impact-stat">

                <span class="impact-stat-icon">
                    🏅
                </span>

                <div class="impact-stat-value">
                    ${SEVA_USER_STATS.tierLabel}
                </div>

                <div class="impact-stat-label">
                    Current Standing
                </div>

            </div>

        `;
    }


    // ACTIVITY CATALOG
    if (catalog) {

        catalog.innerHTML =
            SEVA_ACTIVITIES.map(a => `

                <a
                    class="karma-card"
                    href="seva-activity.html?activity=${a.id}"
                >

                    <span
                        class="karma-card-icon tone-gold"
                    >
                        ${a.icon}
                    </span>

                    <h3 class="karma-card-title">
                        ${a.name}
                    </h3>

                    <p class="karma-card-subtitle">
                        ${a.summary}
                    </p>

                    <p class="karma-card-action">
                        Goal:
                        ${a.tiers.beginner}
                        ${a.impactUnit}
                        · +${a.basePoints} Mudrā
                    </p>

                </a>

            `).join("");
    }
}

// ==========================================================================
// OLD SEVA FORM — seva.html
// ==========================================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const sevaForm =
            document.getElementById(
                "sevaForm"
            );

        if (!sevaForm) return;

        const photoInput =
            document.getElementById(
                "sevaPhoto"
            );

        const uploadBox =
            document.getElementById(
                "sevaUploadBox"
            );

        const previewContainer =
            document.getElementById(
                "sevaPhotoPreviewContainer"
            );

        const previewImg =
            document.getElementById(
                "sevaPhotoPreview"
            );

        const removePhotoBtn =
            document.getElementById(
                "removeSevaPhoto"
            );

        const descriptionInput =
            document.getElementById(
                "sevaDescription"
            );

        const charCount =
            document.getElementById(
                "sevaCharCount"
            );

        const locationInput =
            document.getElementById(
                "sevaLocation"
            );

        const getLocationBtn =
            document.getElementById(
                "getSevaLocation"
            );

        const locationStatus =
            document.getElementById(
                "sevaLocationStatus"
            );

        const submitBtn =
            document.getElementById(
                "sevaSubmitBtn"
            );


        // PHOTO PREVIEW
        if (photoInput) {

            photoInput.addEventListener(
                "change",
                function () {

                    const file =
                        this.files[0];

                    if (!file) return;

                    if (
                        file.size >
                        10 * 1024 * 1024
                    ) {

                        alert(
                            "Photo 10MB se chhoti honi chahiye."
                        );

                        this.value = "";

                        return;
                    }

                    const reader =
                        new FileReader();

                    reader.onload =
                        function (e) {

                            if (previewImg) {
                                previewImg.src =
                                    e.target.result;
                            }

                            if (previewContainer) {
                                previewContainer.classList.add(
                                    "active"
                                );
                            }

                            if (uploadBox) {
                                uploadBox.style.display =
                                    "none";
                            }
                        };

                    reader.readAsDataURL(file);
                }
            );
        }


        // REMOVE PHOTO
        if (removePhotoBtn) {

            removePhotoBtn.addEventListener(
                "click",
                function () {

                    if (photoInput) {
                        photoInput.value = "";
                    }

                    if (previewImg) {
                        previewImg.src = "";
                    }

                    if (previewContainer) {
                        previewContainer.classList.remove(
                            "active"
                        );
                    }

                    if (uploadBox) {
                        uploadBox.style.display =
                            "flex";
                    }
                }
            );
        }


        // CHARACTER COUNT
        if (descriptionInput && charCount) {

            descriptionInput.addEventListener(
                "input",
                function () {

                    charCount.textContent =
                        this.value.length;

                }
            );
        }


        // GPS LOCATION
        if (getLocationBtn) {

            getLocationBtn.addEventListener(
                "click",
                function () {

                    if (!navigator.geolocation) {

                        if (locationStatus) {
                            locationStatus.textContent =
                                "Geolocation is not supported by this browser.";

                            locationStatus.classList.add(
                                "error"
                            );
                        }

                        return;
                    }

                    if (locationStatus) {
                        locationStatus.textContent =
                            "Location fetch ho rahi hai...";

                        locationStatus.classList.remove(
                            "error"
                        );
                    }

                    navigator.geolocation.getCurrentPosition(

                        function (position) {

                            const lat =
                                position.coords.latitude
                                    .toFixed(6);

                            const lng =
                                position.coords.longitude
                                    .toFixed(6);

                            if (locationInput) {
                                locationInput.value =
                                    `${lat}, ${lng}`;
                            }

                            if (locationStatus) {
                                locationStatus.textContent =
                                    "✓ Location captured successfully";

                                locationStatus.classList.remove(
                                    "error"
                                );
                            }

                        },

                        function () {

                            if (locationStatus) {
                                locationStatus.textContent =
                                    "Location permission denied ya nahi mil payi.";

                                locationStatus.classList.add(
                                    "error"
                                );
                            }

                        }
                    );
                }
            );
        }


        // SUBMIT
        sevaForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                if (
                    !photoInput ||
                    !photoInput.files[0]
                ) {

                    alert(
                        "Please photo upload karo."
                    );

                    return;
                }

                if (
                    !locationInput ||
                    !locationInput.value
                ) {

                    alert(
                        "Please location capture karo."
                    );

                    return;
                }

                if (submitBtn) {

                    submitBtn.classList.add(
                        "loading"
                    );

                    submitBtn.disabled = true;
                }

                setTimeout(
                    function () {

                        if (submitBtn) {

                            submitBtn.classList.remove(
                                "loading"
                            );

                            submitBtn.disabled =
                                false;
                        }

                        alert(
                            "Seva submitted for verification! 🙏"
                        );

                        sevaForm.reset();

                        if (previewContainer) {
                            previewContainer.classList.remove(
                                "active"
                            );
                        }

                        if (uploadBox) {
                            uploadBox.style.display =
                                "flex";
                        }

                        if (charCount) {
                            charCount.textContent =
                                "0";
                        }

                        if (locationStatus) {
                            locationStatus.textContent =
                                "";
                        }

                    },
                    1800
                );
            }
        );

    }
);

// ==========================================================================
// INDIVIDUAL SEVA ACTIVITY FORM
// ==========================================================================

function initSevaActivityForm(activity) {

    const form =
        document.getElementById(
            "sevaActivityForm"
        );

    if (!form) return;


    const photoInput =
        document.getElementById(
            "sevaActivityPhotos"
        );

    const photoPreview =
        document.getElementById(
            "sevaPhotoPreview"
        );


    // ----------------------------------------------------------------------
    // PHOTO PREVIEW
    // ----------------------------------------------------------------------

    if (photoInput && photoPreview) {

        photoInput.addEventListener(
            "change",
            function () {

                photoPreview.innerHTML = "";

                const files =
                    Array.from(
                        photoInput.files
                    );

                if (files.length > 5) {

                    alert(
                        "You can upload maximum 5 photos."
                    );

                    photoInput.value = "";

                    return;
                }


                files.forEach(
                    (file, index) => {

                        if (
                            file.size >
                            10 * 1024 * 1024
                        ) {

                            alert(
                                `${file.name} is larger than 10 MB.`
                            );

                            return;
                        }


                        if (
                            !file.type.startsWith(
                                "image/"
                            )
                        ) {

                            alert(
                                `${file.name} is not a valid image.`
                            );

                            return;
                        }


                        const reader =
                            new FileReader();


                        reader.onload =
                            function (e) {

                                const wrapper =
                                    document.createElement(
                                        "div"
                                    );

                                wrapper.className =
                                    "seva-photo-preview";


                                wrapper.innerHTML = `

                                    <img
                                        src="${e.target.result}"
                                        alt="Seva proof"
                                    >

                                    <button
                                        type="button"
                                        class="remove-seva-photo"
                                        data-index="${index}"
                                    >
                                        ×
                                    </button>

                                `;


                                photoPreview.appendChild(
                                    wrapper
                                );


                                // REMOVE PHOTO BUTTON
                                const removeBtn =
                                    wrapper.querySelector(
                                        ".remove-seva-photo"
                                    );

                                removeBtn.addEventListener(
                                    "click",
                                    function () {

                                        wrapper.remove();

                                    }
                                );

                            };


                        reader.readAsDataURL(
                            file
                        );

                    }
                );
            }
        );
    }


    // ----------------------------------------------------------------------
    // GPS
    // ----------------------------------------------------------------------

    const locationInput =
        document.getElementById(
            "activitySevaLocation"
        );

    const locationBtn =
        document.getElementById(
            "activityGetLocation"
        );


    if (
        locationBtn &&
        locationInput
    ) {

        locationBtn.addEventListener(
            "click",
            function () {

                if (!navigator.geolocation) {

                    alert(
                        "Geolocation is not supported by your browser."
                    );

                    return;
                }


                locationBtn.textContent =
                    "Getting location...";

                locationBtn.disabled =
                    true;


                navigator.geolocation.getCurrentPosition(

                    function (position) {

                        const lat =
                            position.coords.latitude;

                        const lng =
                            position.coords.longitude;


                        locationInput.value =
                            `${lat.toFixed(6)}, ${lng.toFixed(6)}`;


                        locationBtn.textContent =
                            "✓ Location Added";

                        locationBtn.disabled =
                            false;

                    },

                    function () {

                        alert(
                            "Unable to get your location. Please allow location permission."
                        );

                        locationBtn.textContent =
                            "📍 Get Location";

                        locationBtn.disabled =
                            false;

                    }
                );

            }
        );
    }


    // ----------------------------------------------------------------------
    // DESCRIPTION COUNTER
    // ----------------------------------------------------------------------

    const description =
        document.getElementById(
            "activitySevaDescription"
        );

    const counter =
        document.getElementById(
            "activityDescriptionCount"
        );


    if (
        description &&
        counter
    ) {

        description.addEventListener(
            "input",
            function () {

                counter.textContent =
                    description.value.length;

            }
        );

    }


    // ----------------------------------------------------------------------
    // SUBMIT
    // ----------------------------------------------------------------------

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            if (
                !photoInput ||
                photoInput.files.length === 0
            ) {

                alert(
                    "Please upload at least one proof photo."
                );

                return;
            }


            if (
                !locationInput ||
                !locationInput.value
            ) {

                alert(
                    "Please add your GPS location."
                );

                return;
            }


            const submitBtn =
                document.getElementById(
                    "activitySubmitBtn"
                );


            if (submitBtn) {

                submitBtn.disabled =
                    true;

                submitBtn.textContent =
                    "Verifying...";

            }


            // MOCK AI VERIFICATION
            setTimeout(
                function () {

                    alert(
                        `✨ Seva submitted successfully!\n\n` +
                        `${activity.name}\n` +
                        `Base Karma: ${activity.basePoints} points\n\n` +
                        `Your submission is now under AI verification.`
                    );


                    form.reset();


                    if (photoPreview) {
                        photoPreview.innerHTML =
                            "";
                    }


                    if (counter) {
                        counter.textContent =
                            "0";
                    }


                    if (submitBtn) {

                        submitBtn.disabled =
                            false;

                        submitBtn.textContent =
                            "Submit for Verification";
                    }

                },
                1500
            );

        }
    );
}