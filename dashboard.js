document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // ------------------------------------------------------------------
    // Config
    // ------------------------------------------------------------------
    const API_BASE_URL = "http://127.0.0.1:8000";
    const TREE_API_URL = `${API_BASE_URL}/api/trees/`;
    const KARMA_PER_TREE = 10;
    const ALLOWED_TYPES = ["image/jpeg", "image/png"];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    const REQUEST_TIMEOUT_MS = 20000;

    const $ = id => document.getElementById(id);

    // ------------------------------------------------------------------
    // Page elements
    // ------------------------------------------------------------------
    const sidebar = $("sidebar");
    const sidebarOverlay = $("sidebarOverlay");
    const sections = document.querySelectorAll(".dashboard-section");
    const sidebarItems = document.querySelectorAll(".sidebar-item");

    const sectionInfo = {
        "plant-tree": [
            "Plant a Tree",
            "Upload a photo and let our AI verify your contribution."
        ],
        "tree-history": [
            "Tree History",
            "View your planted trees and earned Karma points."
        ],
        "emergency": [
            "Emergency Reporting",
            "Report environmental incidents and help protect nature."
        ],
        "rewards": [
            "Rewards",
            "Your environmental actions unlock exciting rewards."
        ],
        "competitions": [
            "School & College Competitions",
            "Represent your campus and climb the environmental rankings."
        ]
    };

    // ------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------
    let latitude = null;
    let longitude = null;
    let incidentLatitude = null;
    let incidentLongitude = null;
    let treePreviewUrl = null;
    let incidentPreviewUrl = null;
    let historyRequestId = 0; // prevents stale responses overwriting newer ones

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------
    function notify(message) {
        // Simple wrapper so alerts can be swapped for a toast UI later.
        alert(message);
    }

    async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT_MS) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        try {
            return await fetch(url, { ...options, signal: controller.signal });
        } catch (error) {
            if (error.name === "AbortError") {
                throw new Error("The server took too long to respond. Please try again.");
            }
            throw new Error("Cannot reach the server. Please check your connection or backend.");
        } finally {
            clearTimeout(timer);
        }
    }

    function extractErrorMessage(data, fallback) {
        if (!data) return fallback;

        if (Array.isArray(data.detail)) {
            return data.detail.map(item => item.msg).join(", ") || fallback;
        }

        return data.detail || fallback;
    }

    // ------------------------------------------------------------------
    // Sidebar navigation
    // ------------------------------------------------------------------
    function openSidebar() {
        sidebar?.classList.add("open");
        sidebarOverlay?.classList.add("show");
    }

    function closeSidebar() {
        sidebar?.classList.remove("open");
        sidebarOverlay?.classList.remove("show");
    }

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.toggle("active", section.id === sectionId);
        });

        sidebarItems.forEach(item => {
            item.classList.toggle("active", item.dataset.section === sectionId);
        });

        if (sectionInfo[sectionId]) {
            const [title, description] = sectionInfo[sectionId];

            if ($("pageTitle")) $("pageTitle").textContent = title;
            if ($("pageDescription")) $("pageDescription").textContent = description;
        }

        closeSidebar();

        if (sectionId === "tree-history") {
            loadTreeHistory();
        }
    }

    sidebarItems.forEach(item => {
        item.addEventListener("click", () => showSection(item.dataset.section));
    });

    $("mobileMenu")?.addEventListener("click", () => {
        if (sidebar?.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarOverlay?.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSidebar();
            $("successOverlay")?.classList.remove("show");
            $("emergencySuccessOverlay")?.classList.remove("show");
        }
    });

    // ------------------------------------------------------------------
    // Photo validation & preview
    // ------------------------------------------------------------------
    function validatePhoto(file) {
        if (!file) {
            notify("Please upload a photo.");
            return false;
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            notify("Only JPG, JPEG and PNG images are allowed.");
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            notify("Photo size cannot exceed 10 MB.");
            return false;
        }

        return true;
    }

    function previewPhoto(inputId, imageId, containerId, type) {
        const input = $(inputId);
        const image = $(imageId);
        const container = $(containerId);
        const file = input?.files?.[0];

        if (!input || !image || !container || !file) {
            return;
        }

        if (!validatePhoto(file)) {
            input.value = "";
            return;
        }

        if (type === "tree" && treePreviewUrl) {
            URL.revokeObjectURL(treePreviewUrl);
        }

        if (type === "incident" && incidentPreviewUrl) {
            URL.revokeObjectURL(incidentPreviewUrl);
        }

        const url = URL.createObjectURL(file);
        image.src = url;
        container.style.display = "block";

        if (type === "tree") {
            treePreviewUrl = url;

            const uploadBox = document.querySelector(".upload-box");
            if (uploadBox) uploadBox.style.display = "none";
        } else {
            incidentPreviewUrl = url;
        }
    }

    function removePhoto(inputId, imageId, containerId, type) {
        if ($(inputId)) $(inputId).value = "";
        if ($(imageId)) $(imageId).removeAttribute("src");
        if ($(containerId)) $(containerId).style.display = "none";

        if (type === "tree") {
            if (treePreviewUrl) URL.revokeObjectURL(treePreviewUrl);
            treePreviewUrl = null;

            const uploadBox = document.querySelector(".upload-box");
            if (uploadBox) uploadBox.style.display = "";
        } else {
            if (incidentPreviewUrl) URL.revokeObjectURL(incidentPreviewUrl);
            incidentPreviewUrl = null;
        }
    }

    $("treePhoto")?.addEventListener("change", () => {
        previewPhoto("treePhoto", "photoPreview", "photoPreviewContainer", "tree");
    });

    $("incidentPhoto")?.addEventListener("change", () => {
        previewPhoto("incidentPhoto", "incidentPreview", "incidentPreviewContainer", "incident");
    });

    $("removePhoto")?.addEventListener("click", () => {
        removePhoto("treePhoto", "photoPreview", "photoPreviewContainer", "tree");
    });

    $("removeIncidentPhoto")?.addEventListener("click", () => {
        removePhoto("incidentPhoto", "incidentPreview", "incidentPreviewContainer", "incident");
    });

    // Free object URLs when leaving the page
    window.addEventListener("beforeunload", () => {
        if (treePreviewUrl) URL.revokeObjectURL(treePreviewUrl);
        if (incidentPreviewUrl) URL.revokeObjectURL(incidentPreviewUrl);
    });

    // ------------------------------------------------------------------
    // GPS location
    // ------------------------------------------------------------------
    function getLocation(inputId, statusId, buttonId, callback) {
        const button = $(buttonId);
        const status = $(statusId);
        const input = $(inputId);

        if (!navigator.geolocation) {
            if (status) status.textContent = "Geolocation is not supported by your browser.";
            return;
        }

        if (button) button.disabled = true;
        if (status) status.textContent = "Getting your location...";

        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                if (input) input.value = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                if (status) status.textContent = "✓ Location detected successfully.";
                if (button) button.disabled = false;

                if (typeof callback === "function") callback(lat, lon);
            },
            error => {
                const messages = {
                    1: "Location permission denied. Please allow access.",
                    2: "Your location is unavailable.",
                    3: "Location request timed out. Try again."
                };

                if (status) status.textContent = messages[error.code] || "Unable to get location.";
                if (button) button.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    }

    $("getLocation")?.addEventListener("click", () => {
        getLocation("location", "locationStatus", "getLocation", (lat, lon) => {
            latitude = lat;
            longitude = lon;
        });
    });

    $("getIncidentLocation")?.addEventListener("click", () => {
        getLocation("incidentLocation", "incidentLocationStatus", "getIncidentLocation", (lat, lon) => {
            incidentLatitude = lat;
            incidentLongitude = lon;
        });
    });

    // ------------------------------------------------------------------
    // Character counters
    // ------------------------------------------------------------------
    $("description")?.addEventListener("input", event => {
        if ($("charCount")) $("charCount").textContent = event.target.value.length;
    });

    $("incidentDescription")?.addEventListener("input", event => {
        if ($("incidentCharCount")) $("incidentCharCount").textContent = event.target.value.length;
    });

    // ------------------------------------------------------------------
    // Karma score
    // ------------------------------------------------------------------
    function updateKarmaScore(trees) {
        const verifiedCount = trees.filter(
            tree => (tree.status || "").toLowerCase() === "verified"
        ).length;
        const verifiedTotal = verifiedCount * KARMA_PER_TREE;

        if ($("sideKarma")) $("sideKarma").textContent = `${verifiedTotal} pts`;
        if ($("totalKarma")) $("totalKarma").textContent = `${verifiedTotal} pts`;
        if ($("karmaScore")) $("karmaScore").textContent = verifiedTotal.toLocaleString("en-IN");
        if ($("karmaFill")) $("karmaFill").style.width = `${Math.min(verifiedTotal, 100)}%`;
    }

    // ------------------------------------------------------------------
    // Tree history
    // ------------------------------------------------------------------
    function renderTreeHistory(trees) {
        const historyList = $("historyList");
        const historyEmpty = $("historyEmpty");

        if (!historyList || !historyEmpty) return;

        historyList.replaceChildren();

        if (!Array.isArray(trees) || trees.length === 0) {
            historyEmpty.style.display = "block";
            historyEmpty.textContent =
                "🌱 No trees planted yet. Plant a tree to create your first history record.";
            updateKarmaScore([]);
            return;
        }

        historyEmpty.style.display = "none";

        trees.forEach(tree => {
            const row = document.createElement("div");
            row.className = "history-row";

            const status = (tree.status || "pending").toLowerCase();

            const values = [
                `🌱 ${tree.tree_name || "Unnamed tree"}`,
                tree.created_at
                    ? new Date(tree.created_at).toLocaleDateString("en-IN")
                    : "—",
                `📍 ${tree.location || "—"}`,
                status,
                `${status === "verified" ? KARMA_PER_TREE : 0} pts`
            ];

            values.forEach((value, index) => {
                const cell = document.createElement("span");
                cell.textContent = value;

                if (index === 3) {
                    cell.className = `status ${status}`;
                }

                row.appendChild(cell);
            });

            historyList.appendChild(row);
        });

        updateKarmaScore(trees);
    }

    async function loadTreeHistory() {
        const historyEmpty = $("historyEmpty");
        const requestId = ++historyRequestId;

        if (historyEmpty) {
            historyEmpty.textContent = "Loading tree history...";
            historyEmpty.style.display = "block";
        }

        try {
            const response = await fetchWithTimeout(TREE_API_URL);

            if (!response.ok) {
                throw new Error("Unable to load tree history. Check your GET API.");
            }

            const trees = await response.json();

            // Ignore outdated responses
            if (requestId !== historyRequestId) return;

            renderTreeHistory(trees);
        } catch (error) {
            if (requestId !== historyRequestId) return;

            console.error("Tree history error:", error);

            if (historyEmpty) {
                historyEmpty.textContent = "Unable to load history. Please check your backend.";
                historyEmpty.style.display = "block";
            }
        }
    }

    // ------------------------------------------------------------------
    // Submission result
    // ------------------------------------------------------------------
    function buildPhotoUrl(rawPath) {
        let photoPath = String(rawPath).replace(/\\/g, "/");

        if (photoPath.startsWith("app/uploads/")) {
            photoPath = photoPath.replace("app/uploads/", "/uploads/");
        }

        if (/^https?:\/\//i.test(photoPath)) {
            return photoPath;
        }

        return `${API_BASE_URL}${photoPath.startsWith("/") ? "" : "/"}${photoPath}`;
    }

    function displaySubmission(data) {
        const fields = {
            resultTreeName: data.tree_name,
            resultLocation: data.location,
            resultLatitude: data.latitude,
            resultLongitude: data.longitude,
            resultDescription: data.description,
            resultStatus: data.status || "pending",
            resultCreatedAt: data.created_at
                ? new Date(data.created_at).toLocaleString("en-IN")
                : "—"
        };

        Object.entries(fields).forEach(([id, value]) => {
            if ($(id)) $(id).textContent = value ?? "";
        });

        if (data.photo_path && $("resultPhoto")) {
            $("resultPhoto").src = buildPhotoUrl(data.photo_path);
        }

        if ($("submissionResult")) {
            $("submissionResult").style.display = "block";
        }
    }

    function resetTreeForm() {
        $("treeForm")?.reset();

        latitude = null;
        longitude = null;

        if ($("charCount")) $("charCount").textContent = "0";
        if ($("locationStatus")) $("locationStatus").textContent = "";

        removePhoto("treePhoto", "photoPreview", "photoPreviewContainer", "tree");
    }

    // ------------------------------------------------------------------
    // Tree form submit
    // ------------------------------------------------------------------
    $("treeForm")?.addEventListener("submit", async event => {
        event.preventDefault();

        const form = event.currentTarget;
        const button = $("submitBtn");
        const photo = $("treePhoto")?.files?.[0];
        const treeName = $("treeName")?.value.trim() || "";
        const location = $("location")?.value.trim() || "";
        const description = $("description")?.value.trim() || "";

        if (!form.reportValidity()) return;
        if (!validatePhoto(photo)) return;

        if (treeName.length < 2 || treeName.length > 50) {
            notify("Tree name must contain 2 to 50 characters.");
            return;
        }

        if (description.length < 10 || description.length > 500) {
            notify("Description must contain 10 to 500 characters.");
            return;
        }

        if (!location || latitude === null || longitude === null) {
            notify("Please get your GPS location before submitting.");
            return;
        }

        const formData = new FormData();

        formData.append("tree_photo", photo);
        formData.append("tree_name", treeName);
        formData.append("location", location);
        formData.append("latitude", String(latitude));
        formData.append("longitude", String(longitude));
        formData.append("description", description);

        // Check the exact data being sent
        for (const [key, value] of formData.entries()) {
            console.log(
                key,
                value instanceof File
                    ? `${value.name} (${value.type}, ${value.size} bytes)`
                    : value
            );
        }

        if (button) {
            button.disabled = true;
            button.textContent = "Submitting...";
        }

        try {
            const response = await fetchWithTimeout(TREE_API_URL, {
                method: "POST",
                body: formData
            }, 60000); // uploads may take longer

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(extractErrorMessage(data, "Tree submission failed."));
            }

            displaySubmission(data);
            resetTreeForm();

            $("successOverlay")?.classList.add("show");

            await loadTreeHistory();
        } catch (error) {
            console.error("Tree submission error:", error);
            notify(error.message || "Unable to submit your tree.");
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = "Submit for Verification";
            }
        }
    });

    // ------------------------------------------------------------------
    // Success popup
    // ------------------------------------------------------------------
    $("closeSuccess")?.addEventListener("click", () => {
        $("successOverlay")?.classList.remove("show");
        showSection("tree-history");
    });

    $("successOverlay")?.addEventListener("click", event => {
        if (event.target.id === "successOverlay") {
            $("successOverlay").classList.remove("show");
        }
    });

    // ------------------------------------------------------------------
    // Emergency form (API not connected yet)
    // ------------------------------------------------------------------
    $("emergencyForm")?.addEventListener("submit", event => {
        event.preventDefault();

        const form = event.currentTarget;
        const photo = $("incidentPhoto")?.files?.[0];
        const location = $("incidentLocation")?.value.trim() || "";
        const description = $("incidentDescription")?.value.trim() || "";

        if (!form.reportValidity()) return;
        if (!validatePhoto(photo)) return;

        if (!location || incidentLatitude === null || incidentLongitude === null) {
            notify("Please get the incident location.");
            return;
        }

        if (description.length < 10) {
            notify("Please provide at least 10 characters describing the incident.");
            return;
        }

        notify("The Emergency API is not connected yet. No report has been saved.");
    });

    $("closeEmergencySuccess")?.addEventListener("click", () => {
        $("emergencySuccessOverlay")?.classList.remove("show");
    });

    // ------------------------------------------------------------------
    // Join button
    // ------------------------------------------------------------------
    document.querySelector(".join-button")?.addEventListener("click", () => {
        window.location.href = "signup.html";
    });

    // ------------------------------------------------------------------
    // Initial page setup
    // ------------------------------------------------------------------
    showSection("plant-tree");
    loadTreeHistory(); // also fills the sidebar Karma score on load

    console.log("Karmachakra dashboard loaded.");
});
