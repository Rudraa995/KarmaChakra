document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       ELEMENTS
    ========================================= */

    const sidebarItems =
        document.querySelectorAll(".sidebar-item");

    const sections =
        document.querySelectorAll(".dashboard-section");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageDescription =
        document.getElementById("pageDescription");

    const sidebar =
        document.getElementById("sidebar");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    /* =========================================
       SECTION INFORMATION
    ========================================= */

    const sectionInfo = {

        "plant-tree": {

            title: "Plant a Tree",

            description: "Make an impact. One tree at a time."

        },

        "monthly-challenges": {

            title: "Monthly Challenges",

            description: "Take on environmental missions and earn Karma points."

        },

        "ar-zone": {

            title: "AR Zone",

            description: "Visualize how your planted tree can grow over the years."

        },

        "emergency": {

            title: "Emergency Reporting",

            description: "Report environmental incidents and help protect nature."

        },

        "rewards": {

            title: "Rewards",

            description: "Your environmental actions unlock exciting rewards."

        },

        "competitions": {

            title: "School & College Competitions",

            description: "Represent your campus and climb the environmental rankings."

        },

        "notifications": {

            title: "Notifications",

            description: "Stay updated with your Karma activities."

        }

    };


    /* =========================================
       SHOW SECTION
    ========================================= */

    function showSection(sectionId) {

        /* Hide all sections */

        sections.forEach(function(section) {

            section.classList.remove("active");

        });


        /* Remove active from sidebar */

        sidebarItems.forEach(function(item) {

            item.classList.remove("active");

        });


        /* Show selected section */

        const selectedSection =
            document.getElementById(sectionId);

        if (selectedSection) {

            selectedSection.classList.add("active");

        }


        /* Activate selected sidebar item */

        sidebarItems.forEach(function(item) {

            if (
                item.dataset.section === sectionId
            ) {

                item.classList.add("active");

            }

        });


        /* Change heading */

        if (sectionInfo[sectionId]) {

            pageTitle.textContent =
                sectionInfo[sectionId].title;

            pageDescription.textContent =
                sectionInfo[sectionId].description;

        }


        /* Close mobile sidebar */

        closeSidebar();

    }


    /* =========================================
       SIDEBAR CLICK
    ========================================= */

    sidebarItems.forEach(function(item) {

        item.addEventListener(
            "click",
            function() {

                const sectionId =
                    item.dataset.section;

                showSection(sectionId);

            }
        );

    });


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    function openSidebar() {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    }


    mobileMenu.addEventListener(
        "click",
        function() {

            if (
                sidebar.classList.contains("open")
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    sidebarOverlay.addEventListener(
        "click",
        function() {

            closeSidebar();

        }
    );


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =========================================
       START WITH PLANT TREE
    ========================================= */

    showSection("plant-tree");


    /* =========================================
       BUTTONS
    ========================================= */

    const primaryButtons =
        document.querySelectorAll(".primary-button");


    primaryButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const currentSection =
                    document.querySelector(
                        ".dashboard-section.active"
                    );

                if (
                    currentSection &&
                    currentSection.id === "plant-tree"
                ) {

                    alert(
                        "Plant Tree feature will be added next."
                    );

                } else if (
                    currentSection &&
                    currentSection.id === "ar-zone"
                ) {

                    alert(
                        "AR Zone feature will be added next."
                    );

                }

            }
        );

    });


    console.log(
        "KarmChakra Prakriti Dashboard loaded."
    );

});

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("treeForm");

    const photo = document.getElementById("treePhoto");
    const uploadBox = document.getElementById("uploadBox");

    const previewContainer =
        document.getElementById("photoPreviewContainer");

    const preview =
        document.getElementById("photoPreview");

    const removePhoto =
        document.getElementById("removePhoto");


    /* ================= PHOTO ================= */

    photo.addEventListener("change", () => {

        const file = photo.files[0];

        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {

            alert("Photo must be less than 10 MB.");

            photo.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {

            preview.src = e.target.result;

            uploadBox.style.display = "none";

            previewContainer.style.display = "block";
        };

        reader.readAsDataURL(file);

    });


    /* ================= REMOVE PHOTO ================= */

    removePhoto.addEventListener("click", () => {

        photo.value = "";

        preview.src = "";

        previewContainer.style.display = "none";

        uploadBox.style.display = "flex";

    });


    /* ================= GPS ================= */

    document
        .getElementById("getLocation")
        .addEventListener("click", () => {

            const status =
                document.getElementById("locationStatus");

            const location =
                document.getElementById("location");

            if (!navigator.geolocation) {

                status.textContent =
                    "Geolocation is not supported by your browser.";

                return;
            }

            status.textContent =
                "Getting your location...";

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const lat =
                        position.coords.latitude;

                    const lon =
                        position.coords.longitude;

                    location.value =
                        `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;

                    status.textContent =
                        "✓ Location detected successfully.";

                },

                () => {

                    status.textContent =
                        "Unable to get location. Please allow location access.";

                }

            );

        });


    /* ================= CHARACTER COUNT ================= */

    const description =
        document.getElementById("description");

    const charCount =
        document.getElementById("charCount");

    description.addEventListener("input", () => {

        charCount.textContent =
            description.value.length;

    });


    /* ================= SUBMIT ================= */

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const treeName =
            document.getElementById("treeName").value.trim();

        const location =
            document.getElementById("location").value.trim();

        const desc =
            description.value.trim();


        if (!photo.files.length) {

            alert("Please upload a tree photo.");

            return;
        }

        if (!treeName) {

            alert("Please enter the tree name.");

            return;
        }

        if (!location) {

            alert("Please get your GPS location.");

            return;
        }

        if (!desc) {

            alert("Please describe your contribution.");

            return;
        }


        /* Show loading */

        const button =
            document.getElementById("submitBtn");

        const text =
            document.getElementById("submitText");

        const loader =
            document.getElementById("submitLoader");

        button.disabled = true;

        text.textContent =
            "Submitting...";

        loader.style.display =
            "inline";


        /* Demo verification */

        setTimeout(() => {

            button.disabled = false;

            text.textContent =
                "Submit for Verification";

            loader.style.display =
                "none";


            document.getElementById(
                "successOverlay"
            ).style.display = "flex";

        }, 1500);

    });


    /* ================= CLOSE SUCCESS ================= */

    document
        .getElementById("closeSuccess")
        .addEventListener("click", () => {

            document.getElementById(
                "successOverlay"
            ).style.display = "none";

            form.reset();

            preview.src = "";

            previewContainer.style.display = "none";

            uploadBox.style.display = "flex";

            document.getElementById(
                "charCount"
            ).textContent = "0";

            document.getElementById(
                "locationStatus"
            ).textContent = "";

        });

});