document.addEventListener("DOMContentLoaded", function() {
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    const sectionTitle = document.getElementById("sectionTitle");
    const sectionDescription = document.getElementById("sectionDescription");
    const animalForm = document.getElementById("animalForm");
    const rescueForm = document.getElementById("rescueForm");
    const adoptForm = document.getElementById("adoptForm");
    const historyForm = document.getElementById("historyForm");
    const sidebarKarma = document.getElementById("sidebarKarma");
    const karmaProgress = document.getElementById("karmaProgress");
    let selectedFiles = [];

    function hideForms() {
        if (animalForm) animalForm.style.display = "none";
        if (rescueForm) rescueForm.style.display = "none";
        if (adoptForm) adoptForm.style.display = "none";
        if (historyForm) historyForm.style.display = "none";
    }

    function getLocation(input, button) {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        button.textContent = "Getting Location...";
        button.disabled = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude.toFixed(6);
            const longitude = position.coords.longitude.toFixed(6);
            if (input) input.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            button.textContent = "Location Added";
            button.disabled = false;
        }, function() {
            alert("Unable to get your location. Please enter it manually.");
            button.textContent = "Use My Location";
            button.disabled = false;
        });
    }

    sidebarItems.forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            sidebarItems.forEach(function(button) {
                button.classList.remove("active");
            });
            this.classList.add("active");
            const section = this.dataset.section;
            hideForms();

            if (section === "animal") {
                animalForm.style.display = "block";
                sectionTitle.textContent = "Feed an Animal";
                sectionDescription.textContent = "Show compassion by feeding a stray animal or bird and make a meaningful difference in their day.";
            } else if (section === "rescue") {
                rescueForm.style.display = "block";
                sectionTitle.textContent = "Rescue & Report";
                sectionDescription.textContent = "Report an injured, trapped, or abandoned animal and help connect them with timely assistance.";
            } else if (section === "adopt") {
                adoptForm.style.display = "block";
                sectionTitle.textContent = "Adopt / Help a Stray";
                sectionDescription.textContent = "Help a stray find a safe home or discover animals waiting for adoption.";
            } else if (section === "history") {
                historyForm.style.display = "block";
                sectionTitle.textContent = "Animal History";
                sectionDescription.textContent = "View your Feed an Animal, Rescue & Report and Adopt / Help a Stray activities and earned Karma.";
                renderHistory();
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    const proofMedia = document.getElementById("proofMedia");
    const previewContainer = document.getElementById("previewContainer");
    const locationInput = document.getElementById("locationInput");
    const locationBtn = document.getElementById("locationBtn");
    const animalType = document.getElementById("animalType");
    const descriptionInput = document.getElementById("descriptionInput");
    const aiVerificationText = document.getElementById("aiVerificationText");
    const aiStatus = document.getElementById("aiStatus");
    const submitSeva = document.getElementById("submitSeva");
    const successMessage = document.getElementById("successMessage");

    if (proofMedia) {
        proofMedia.addEventListener("change", function() {
            selectedFiles = Array.from(this.files).slice(0, 5);
            renderAnimalPreviews();
        });
    }

    function renderAnimalPreviews() {
        if (!previewContainer) return;
        previewContainer.innerHTML = "";
        selectedFiles.forEach(function(file, index) {
            const wrapper = document.createElement("div");
            wrapper.className = "seva-preview-item";
            let media;
            if (file.type.startsWith("video/")) {
                media = document.createElement("video");
                media.controls = true;
            } else {
                media = document.createElement("img");
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                media.src = event.target.result;
            };
            reader.readAsDataURL(file);
            const remove = document.createElement("button");
            remove.className = "seva-preview-remove";
            remove.type = "button";
            remove.innerHTML = "×";
            remove.addEventListener("click", function() {
                selectedFiles.splice(index, 1);
                renderAnimalPreviews();
                if (proofMedia) proofMedia.value = "";
            });
            wrapper.appendChild(media);
            wrapper.appendChild(remove);
            previewContainer.appendChild(wrapper);
        });
        if (aiVerificationText && aiStatus) {
            if (selectedFiles.length) {
                aiVerificationText.textContent = "Proof uploaded. AI is ready to verify your activity.";
                aiStatus.textContent = "Ready";
                aiStatus.classList.add("checking");
            } else {
                aiVerificationText.textContent = "Upload proof to enable AI verification.";
                aiStatus.textContent = "Waiting";
                aiStatus.classList.remove("checking", "verified");
            }
        }
    }

    if (locationBtn) {
        locationBtn.addEventListener("click", function() {
            getLocation(locationInput, locationBtn);
        });
    }

    if (submitSeva) {
        submitSeva.addEventListener("click", function() {
            const animalValue = animalType ? animalType.value.trim() : "";
            const descriptionValue = descriptionInput ? descriptionInput.value.trim() : "";

            if (!selectedFiles.length) {
                alert("Please upload a photo or video as proof.");
                return;
            }
            if (!locationInput || !locationInput.value.trim()) {
                alert("Please enter the feeding location.");
                return;
            }
            if (!animalValue) {
                alert("Please enter the animal type.");
                return;
            }
            if (!descriptionValue) {
                alert("Please describe your seva activity.");
                return;
            }

            submitSeva.disabled = true;
            submitSeva.textContent = "AI Verifying...";

            if (aiStatus) {
                aiStatus.textContent = "Checking...";
                aiStatus.classList.add("checking");
                aiStatus.classList.remove("verified");
            }

            if (aiVerificationText) {
                aiVerificationText.textContent = "AI is analyzing your uploaded proof...";
            }

            setTimeout(function() {
                if (aiStatus) {
                    aiStatus.textContent = "Verified";
                    aiStatus.classList.remove("checking");
                    aiStatus.classList.add("verified");
                }
                if (aiVerificationText) {
                    aiVerificationText.textContent = "AI verification completed. Proof is ready for review.";
                }
                if (successMessage) successMessage.classList.add("show");

                updateKarma(10);
                addAnimalHistory("🐕", "Feed an Animal", animalValue, "Verified", 10);

                submitSeva.disabled = false;
                submitSeva.textContent = "Submit Seva for Verification";
                selectedFiles = [];

                if (proofMedia) proofMedia.value = "";
                if (previewContainer) previewContainer.innerHTML = "";
                if (locationInput) locationInput.value = "";
                if (animalType) animalType.value = "";
                if (descriptionInput) descriptionInput.value = "";

            }, 1800);
        });
    }

    const rescuePhoto = document.getElementById("rescuePhoto");
    const rescuePreview = document.getElementById("rescuePreview");
    const rescueLocationBtn = document.getElementById("rescueLocationBtn");
    const rescueLocation = document.getElementById("rescueLocation");
    const submitRescue = document.getElementById("submitRescue");
    const rescueSuccess = document.getElementById("rescueSuccess");
    const reportStatus = document.getElementById("reportStatus");
    const reportStatusText = document.getElementById("reportStatusText");

    if (rescuePhoto) {
        rescuePhoto.addEventListener("change", function() {
            if (!rescuePreview) return;
            rescuePreview.innerHTML = "";
            const file = this.files[0];
            if (!file) return;
            const wrapper = document.createElement("div");
            wrapper.className = "rescue-preview-item";
            const image = document.createElement("img");
            const reader = new FileReader();
            reader.onload = function(event) {
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
            wrapper.appendChild(image);
            rescuePreview.appendChild(wrapper);
        });
    }

    if (rescueLocationBtn) {
        rescueLocationBtn.addEventListener("click", function() {
            getLocation(rescueLocation, rescueLocationBtn);
        });
    }

    if (submitRescue) {
        submitRescue.addEventListener("click", function() {
            const descriptionElement = document.getElementById("rescueDescription");
            const description = descriptionElement ? descriptionElement.value.trim() : "";
            const priorityElement = document.querySelector('input[name="priority"]:checked');
            const priority = priorityElement ? priorityElement.value : "normal";

            if (!rescuePhoto || !rescuePhoto.files.length) {
                alert("Please upload a photo of the animal.");
                return;
            }
            if (!rescueLocation || !rescueLocation.value.trim()) {
                alert("Please enter the animal's location.");
                return;
            }
            if (!description) {
                alert("Please describe the situation.");
                return;
            }

            submitRescue.disabled = true;
            submitRescue.textContent = "Submitting Report...";

            if (reportStatus) {
                reportStatus.textContent = "Submitted";
                reportStatus.classList.add("submitted");
            }

            if (reportStatusText) {
                reportStatusText.innerHTML = `Your report has been submitted as <b>${priority}</b>. Rescue verification is in progress.`;
            }

            setTimeout(function() {
                if (rescueSuccess) rescueSuccess.classList.add("show");
                submitRescue.textContent = "Verifying...";

                setTimeout(function() {
                    if (reportStatus) {
                        reportStatus.textContent = "Verified";
                        reportStatus.classList.remove("submitted");
                        reportStatus.classList.add("verified");
                    }
                    if (reportStatusText) {
                        reportStatusText.innerHTML = "Your rescue report has been verified. <b>+10 Karma</b> earned.";
                    }

                    updateKarma(10);
                    addAnimalHistory("🚑", "Rescue & Report", priority === "emergency" ? "Emergency rescue report" : "Normal rescue report", "Verified", 10);

                    submitRescue.disabled = false;
                    submitRescue.textContent = "Report Submitted";
                }, 1800);
            }, 1200);
        });
    }

    const adoptTabs = document.querySelectorAll(".adopt-tab");
    const listAnimalSection = document.getElementById("listAnimalSection");
    const findAnimalSection = document.getElementById("findAnimalSection");

    adoptTabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
            adoptTabs.forEach(function(t) {
                t.classList.remove("active");
            });
            this.classList.add("active");

            if (this.dataset.adoptTab === "list") {
                listAnimalSection.style.display = "block";
                findAnimalSection.style.display = "none";
            } else {
                listAnimalSection.style.display = "none";
                findAnimalSection.style.display = "block";
            }
        });
    });

    const adoptAnimalPhoto = document.getElementById("adoptAnimalPhoto");
    const adoptPhotoPreview = document.getElementById("adoptPhotoPreview");

    if (adoptAnimalPhoto) {
        adoptAnimalPhoto.addEventListener("change", function() {
            adoptPhotoPreview.innerHTML = "";
            const file = this.files[0];
            if (!file) return;
            const wrapper = document.createElement("div");
            wrapper.className = "seva-preview-item";
            const image = document.createElement("img");
            const reader = new FileReader();
            reader.onload = function(event) {
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
            wrapper.appendChild(image);
            adoptPhotoPreview.appendChild(wrapper);
        });
    }

    const adoptLocationBtn = document.getElementById("adoptLocationBtn");
    const adoptLocation = document.getElementById("adoptLocation");

    if (adoptLocationBtn) {
        adoptLocationBtn.addEventListener("click", function() {
            getLocation(adoptLocation, adoptLocationBtn);
        });
    }

    const listAnimalBtn = document.getElementById("listAnimalBtn");
    const adoptionListSuccess = document.getElementById("adoptionListSuccess");

    if (listAnimalBtn) {
        listAnimalBtn.addEventListener("click", function() {
            const photo = adoptAnimalPhoto ? adoptAnimalPhoto.files.length : 0;
            const name = document.getElementById("adoptAnimalName").value.trim();
            const type = document.getElementById("adoptAnimalType").value;
            const age = document.getElementById("adoptAnimalAge").value.trim();
            const gender = document.getElementById("adoptAnimalGender").value;
            const location = adoptLocation ? adoptLocation.value.trim() : "";
            const details = document.getElementById("adoptAnimalDetails").value.trim();
            const contact = document.getElementById("adopterContact").value.trim();

            if (!photo) {
                alert("Please upload an animal photo.");
                return;
            }
            if (!name) {
                alert("Please enter the animal name.");
                return;
            }
            if (!type) {
                alert("Please select the animal type.");
                return;
            }
            if (!age) {
                alert("Please enter the animal age.");
                return;
            }
            if (!gender) {
                alert("Please select the animal gender.");
                return;
            }
            if (!location) {
                alert("Please enter the animal location.");
                return;
            }
            if (!details) {
                alert("Please enter animal details.");
                return;
            }
            if (!contact) {
                alert("Please enter contact information.");
                return;
            }

            listAnimalBtn.disabled = true;
            listAnimalBtn.textContent = "Submitting...";

            setTimeout(function() {
                if (adoptionListSuccess) adoptionListSuccess.classList.add("show");

                updateKarma(20);
                addAnimalHistory("🏠", "Adopt / Help a Stray", `${name} · ${type} · ${location}`, "Verified", 20);

                listAnimalBtn.disabled = false;
                listAnimalBtn.textContent = "Animal Listed";

            }, 1500);
        });
    }

    const contactButtons = document.querySelectorAll(".contact-adopter-btn");
    const contactMessage = document.getElementById("contactMessage");
    const adoptionStatus = document.getElementById("adoptionStatus");
    const adoptionStatusText = document.getElementById("adoptionStatusText");

    contactButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const animal = this.dataset.animal;

            if (contactMessage) {
                contactMessage.style.display = "block";
                contactMessage.innerHTML = "📞 Contact request started for <b>" + animal + "</b>. You can now contact the rescuer/adopter using the provided contact details.";
            }

            if (adoptionStatus) {
                adoptionStatus.textContent = "Contact Started";
                adoptionStatus.classList.add("submitted");
                adoptionStatus.classList.remove("verified");
            }

            if (adoptionStatusText) {
                adoptionStatusText.textContent = "You have started an adoption request for " + animal + ".";
            }

            setTimeout(function() {
                if (adoptionStatus) {
                    adoptionStatus.textContent = "Under Review";
                }
                if (adoptionStatusText) {
                    adoptionStatusText.textContent = "Your adoption request for " + animal + " is being reviewed.";
                }
            }, 2000);
        });
    });

    function updateKarma(points) {
        if (!sidebarKarma) return;
        let current = parseInt(sidebarKarma.textContent.replace(/,/g, "")) || 0;
        current += points;
        sidebarKarma.textContent = current.toLocaleString();

        if (karmaProgress) {
            const progress = Math.min((current % 1000) / 10, 100);
            karmaProgress.style.width = progress + "%";
        }
    }

    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem("jeevaAnimalHistory")) || [];
        } catch (error) {
            return [];
        }
    }

    function saveHistory(history) {
        localStorage.setItem("jeevaAnimalHistory", JSON.stringify(history));
    }

    function addAnimalHistory(icon, activity, details, status, karma) {
        const history = getHistory();

        const record = {
            id: Date.now(),
            icon: icon,
            activity: activity,
            date: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }),
            details: details,
            status: status,
            karma: karma
        };

        history.unshift(record);
        saveHistory(history);
        renderHistory();
    }

    function renderHistory() {
        const historyList = document.getElementById("animalHistoryList");
        const historyEmpty = document.getElementById("historyEmpty");
        const totalElement = document.getElementById("historyTotalKarma");
        const bottomTotal = document.getElementById("historyBottomTotal");
        const feedCount = document.getElementById("feedHistoryCount");
        const rescueCount = document.getElementById("rescueHistoryCount");
        const adoptionCount = document.getElementById("adoptionHistoryCount");

        if (!historyList) return;

        const history = getHistory();

        historyList.innerHTML = "";

        if (history.length === 0) {
            historyEmpty.style.display = "block";
        } else {
            historyEmpty.style.display = "none";
        }

        let total = 0;
        let feedCountValue = 0;
        let rescueCountValue = 0;
        let adoptionCountValue = 0;

        history.forEach(function(record) {
            total += Number(record.karma) || 0;

            if (record.activity === "Feed an Animal") {
                feedCountValue++;
            } else if (record.activity === "Rescue & Report") {
                rescueCountValue++;
            } else if (record.activity === "Adopt / Help a Stray") {
                adoptionCountValue++;
            }

            const row = document.createElement("tr");

            row.innerHTML = `
<td>
<div class="history-activity">
<span class="history-activity-icon">${record.icon}</span>
<span>${record.activity}</span>
</div>
</td>
<td>
<span class="history-date">${record.date}</span>
</td>
<td>
<span class="history-details">${record.details}</span>
</td>
<td>
<span class="history-status-badge">✓ ${record.status}</span>
</td>
<td class="history-karma">+${record.karma}</td>
`;

            historyList.appendChild(row);
        });

        if (totalElement) totalElement.textContent = total.toLocaleString();
        if (bottomTotal) bottomTotal.textContent = total.toLocaleString();
        if (feedCount) feedCount.textContent = feedCountValue;
        if (rescueCount) rescueCount.textContent = rescueCountValue;
        if (adoptionCount) adoptionCount.textContent = adoptionCountValue;
    }

    renderHistory();
});