document.addEventListener("DOMContentLoaded", function() {
            const sidebarItems = document.querySelectorAll(".sidebar-item");
            const sections = document.querySelectorAll(".dashboard-section");
            const pageTitle = document.getElementById("pageTitle");
            const pageDescription = document.getElementById("pageDescription");
            const sidebar = document.getElementById("sidebar");
            const mobileMenu = document.getElementById("mobileMenu");
            const sidebarOverlay = document.getElementById("sidebarOverlay");

            const sectionInfo = {
                "plant-tree": {
                    title: "Plant a Tree",
                    description: "Make an impact. One tree at a time."
                },
                "tree-history": {
                    title: "Tree History",
                    description: "Track every tree you have planted and your Karma points."
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

            function showSection(sectionId) {
                sections.forEach(function(section) {
                    section.classList.remove("active");
                });

                sidebarItems.forEach(function(item) {
                    item.classList.remove("active");
                });

                const selectedSection = document.getElementById(sectionId);

                if (selectedSection) {
                    selectedSection.classList.add("active");
                }

                sidebarItems.forEach(function(item) {
                    if (item.dataset.section === sectionId) {
                        item.classList.add("active");
                    }
                });

                if (sectionInfo[sectionId]) {
                    pageTitle.textContent = sectionInfo[sectionId].title;
                    pageDescription.textContent = sectionInfo[sectionId].description;
                }

                if (sectionId === "tree-history") {
                    renderTreeHistory();
                }

                closeSidebar();
            }

            sidebarItems.forEach(function(item) {
                item.addEventListener("click", function() {
                    showSection(item.dataset.section);
                });
            });

            function openSidebar() {
                sidebar.classList.add("open");
                sidebarOverlay.classList.add("show");
            }

            function closeSidebar() {
                sidebar.classList.remove("open");
                sidebarOverlay.classList.remove("show");
            }

            if (mobileMenu) {
                mobileMenu.addEventListener("click", function() {
                    if (sidebar.classList.contains("open")) {
                        closeSidebar();
                    } else {
                        openSidebar();
                    }
                });
            }

            if (sidebarOverlay) {
                sidebarOverlay.addEventListener("click", function() {
                    closeSidebar();
                });
            }

            document.addEventListener("keydown", function(event) {
                if (event.key === "Escape") {
                    closeSidebar();
                }
            });

            showSection("plant-tree");

            const primaryButtons = document.querySelectorAll(".primary-button");

            primaryButtons.forEach(function(button) {
                button.addEventListener("click", function() {
                    const currentSection = document.querySelector(".dashboard-section.active");

                    if (currentSection && currentSection.id === "plant-tree") {
                        alert("Plant Tree feature will be added next.");
                    } else if (currentSection && currentSection.id === "ar-zone") {
                        alert("AR Zone feature will be added next.");
                    }
                });
            });

            const KARMA_PER_TREE = 10;
            const STORAGE_KEY = "karmchakra_tree_history";

            function getTreeHistory() {
                try {
                    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
                } catch (error) {
                    return [];
                }
            }

            function saveTreeHistory(history) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            }

            function escapeHTML(value) {
                const div = document.createElement("div");
                div.textContent = value || "";
                return div.innerHTML;
            }

            function getCurrentDate() {
                return new Date().toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });
            }

            function updateKarmaScore() {
                const history = getTreeHistory();
                const totalKarma = history.length * KARMA_PER_TREE;

                const karmaScore = document.getElementById("karmaScore");
                const totalKarmaElement = document.getElementById("totalKarma");

                if (karmaScore) {
                    karmaScore.textContent = totalKarma.toLocaleString();
                }

                if (totalKarmaElement) {
                    totalKarmaElement.textContent = totalKarma.toLocaleString();
                }
            }

            function renderTreeHistory() {
                const container = document.getElementById("treeHistory");

                if (!container) {
                    updateKarmaScore();
                    return;
                }

                const history = getTreeHistory();

                if (history.length === 0) {
                    container.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-seedling"></i>
                    <h3>No Trees Planted Yet</h3>
                    <p>Plant your first tree to start earning Karma Points.</p>
                </div>
            `;

                    updateKarmaScore();
                    return;
                }

                container.innerHTML = `
            <div class="history-table-wrapper">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Tree</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Karma Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${history.map(function(tree) {
                            const statusClass = tree.status.toLowerCase();

                            return `
                                <tr>
                                    <td>
                                        <strong>${escapeHTML(tree.tree)}</strong>
                                    </td>
                                    <td>${escapeHTML(tree.date)}</td>
                                    <td>${escapeHTML(tree.location)}</td>
                                    <td>
                                        <span class="status ${statusClass}">
                                            ${escapeHTML(tree.status)}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="karma-points">
                                            +${KARMA_PER_TREE}
                                        </span>
                                    </td>
                                </tr>
                            `;
                        }).join("")}
                    </tbody>
                </table>
            </div>
        `;

        updateKarmaScore();
    }

    function addTreeToHistory(treeName, location, description) {
        const history = getTreeHistory();

        const treeRecord = {
            id: Date.now(),
            tree: treeName,
            date: getCurrentDate(),
            location: location,
            description: description,
            status: "Pending",
            karma: KARMA_PER_TREE
        };

        history.push(treeRecord);
        saveTreeHistory(history);
        renderTreeHistory();
    }

    const form = document.getElementById("treeForm");
    const photo = document.getElementById("treePhoto");
    const uploadBox = document.getElementById("uploadBox");
    const previewContainer = document.getElementById("photoPreviewContainer");
    const preview = document.getElementById("photoPreview");
    const removePhoto = document.getElementById("removePhoto");

    if (photo) {
        photo.addEventListener("change", function() {
            const file = photo.files[0];

            if (!file) return;

            if (file.size > 10 * 1024 * 1024) {
                alert("Photo must be less than 10 MB.");
                photo.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
                uploadBox.style.display = "none";
                previewContainer.style.display = "block";
            };

            reader.readAsDataURL(file);
        });
    }

    if (removePhoto) {
        removePhoto.addEventListener("click", function() {
            photo.value = "";
            preview.src = "";
            previewContainer.style.display = "none";
            uploadBox.style.display = "flex";
        });
    }

    const getLocationButton = document.getElementById("getLocation");

    if (getLocationButton) {
        getLocationButton.addEventListener("click", function() {
            const status = document.getElementById("locationStatus");
            const location = document.getElementById("location");

            if (!navigator.geolocation) {
                status.textContent = "Geolocation is not supported by your browser.";
                return;
            }

            status.textContent = "Getting your location...";

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    location.value = `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;
                    status.textContent = "✓ Location detected successfully.";
                },
                function() {
                    status.textContent = "Unable to get location. Please allow location access.";
                }
            );
        });
    }

    const description = document.getElementById("description");
    const charCount = document.getElementById("charCount");

    if (description && charCount) {
        description.addEventListener("input", function() {
            charCount.textContent = description.value.length;
        });
    }

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const treeName = document.getElementById("treeName").value.trim();
            const location = document.getElementById("location").value.trim();
            const desc = description.value.trim();

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

            const button = document.getElementById("submitBtn");
            const text = document.getElementById("submitText");
            const loader = document.getElementById("submitLoader");

            button.disabled = true;
            text.textContent = "Submitting...";
            loader.style.display = "inline";

            setTimeout(function() {
                addTreeToHistory(treeName, location, desc);

                button.disabled = false;
                text.textContent = "Submit for Verification";
                loader.style.display = "none";

                const successOverlay = document.getElementById("successOverlay");

                if (successOverlay) {
                    successOverlay.style.display = "flex";
                }
            }, 1500);
        });
    }

    const closeSuccess = document.getElementById("closeSuccess");

    if (closeSuccess) {
        closeSuccess.addEventListener("click", function() {
            const successOverlay = document.getElementById("successOverlay");

            if (successOverlay) {
                successOverlay.style.display = "none";
            }

            form.reset();
            preview.src = "";
            previewContainer.style.display = "none";
            uploadBox.style.display = "flex";

            if (charCount) {
                charCount.textContent = "0";
            }

            const locationStatus = document.getElementById("locationStatus");

            if (locationStatus) {
                locationStatus.textContent = "";
            }
        });
    }

    renderTreeHistory();
    updateKarmaScore();

    console.log("KarmChakra Prakriti Dashboard loaded.");
});

document.addEventListener("DOMContentLoaded",function(){
const sidebarItems=document.querySelectorAll(".sidebar-item"),sections=document.querySelectorAll(".dashboard-section"),sidebar=document.getElementById("sidebar"),sidebarOverlay=document.getElementById("sidebarOverlay"),pageTitle=document.getElementById("pageTitle"),pageDescription=document.getElementById("pageDescription");
const KARMA=10;

function showSection(id){
sections.forEach(s=>s.classList.remove("active"));
sidebarItems.forEach(s=>s.classList.remove("active"));
const section=document.getElementById(id);
const button=document.querySelector(`[data-section="${id}"]`);
if(section)section.classList.add("active");
if(button)button.classList.add("active");

const titles={
"plant-tree":["Plant a Tree","Upload a photo and let our AI verify your contribution."],
"tree-history":["Tree History","All your planted trees and earned Karma points."],
"emergency":["Emergency Reporting","Report environmental incidents and help protect nature."],
"rewards":["Rewards","Your environmental actions unlock exciting rewards."],
"competitions":["School & College Competitions","Represent your campus and climb the environmental rankings."]
};

if(titles[id]){
pageTitle.textContent=titles[id][0];
pageDescription.textContent=titles[id][1];
}

sidebar.classList.remove("open");
sidebarOverlay.classList.remove("show");
}

sidebarItems.forEach(button=>{
button.addEventListener("click",()=>showSection(button.dataset.section));
});

document.getElementById("mobileMenu").addEventListener("click",()=>{
sidebar.classList.add("open");
sidebarOverlay.classList.add("show");
});

sidebarOverlay.addEventListener("click",()=>{
sidebar.classList.remove("open");
sidebarOverlay.classList.remove("show");
});

const form=document.getElementById("treeForm");
const photo=document.getElementById("treePhoto");
const preview=document.getElementById("photoPreview");
const previewBox=document.getElementById("photoPreviewContainer");
const locationInput=document.getElementById("location");
const locationStatus=document.getElementById("locationStatus");
const description=document.getElementById("description");
const charCount=document.getElementById("charCount");

photo.addEventListener("change",()=>{
const file=photo.files[0];
if(!file)return;
if(file.size>10*1024*1024){
alert("Photo must be less than 10 MB.");
photo.value="";
return;
}
preview.src=URL.createObjectURL(file);
previewBox.style.display="block";
});

document.getElementById("removePhoto").addEventListener("click",()=>{
photo.value="";
preview.src="";
previewBox.style.display="none";
});

description.addEventListener("input",()=>{
charCount.textContent=description.value.length;
});

document.getElementById("getLocation").addEventListener("click",()=>{
if(!navigator.geolocation){
locationStatus.textContent="Location is not supported by your browser.";
return;
}
locationStatus.textContent="Getting location...";
navigator.geolocation.getCurrentPosition(position=>{
locationInput.value=`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;
locationStatus.textContent="Location captured successfully.";
},()=>{
locationStatus.textContent="Unable to get location.";
});
});

let trees=JSON.parse(localStorage.getItem("karmTrees")||"[]");

function renderHistory(){
const historyList=document.getElementById("historyList");
const empty=document.getElementById("historyEmpty");
const total=document.getElementById("totalKarma");
const side=document.getElementById("sideKarma");
const fill=document.getElementById("karmaFill");

historyList.innerHTML="";
let points=0;

trees.forEach(tree=>{
points+=KARMA;
const row=document.createElement("div");
row.className="history-row";
row.innerHTML=`<span class="tree-name">🌱 ${tree.tree}</span><span>${tree.date}</span><span>📍 ${tree.location}</span><span><b class="status ${tree.status.toLowerCase()}">${tree.status}</b></span><strong>+${KARMA}</strong>`;
historyList.appendChild(row);
});

empty.style.display=trees.length?"none":"block";
total.textContent=points+" pts";
side.innerHTML=points+' <span>pts</span>';
fill.style.width=Math.min(points,100)+"%";
}

renderHistory();

form.addEventListener("submit",e=>{
e.preventDefault();

const tree=document.getElementById("treeName").value.trim();
const location=locationInput.value.trim();

if(!photo.files.length){
alert("Please upload a tree photo.");
return;
}

if(!tree){
alert("Please enter the tree name.");
return;
}

if(!location){
locationStatus.textContent="Please get your planting location.";
return;
}

if(!description.value.trim()){
alert("Please describe your contribution.");
return;
}

trees.push({
tree:tree,
location:location,
date:new Date().toLocaleDateString("en-IN"),
status:"Pending"
});

localStorage.setItem("karmTrees",JSON.stringify(trees));
renderHistory();

document.getElementById("successOverlay").style.display="flex";

form.reset();
previewBox.style.display="none";
preview.src="";
charCount.textContent="0";
locationStatus.textContent="";
});

document.getElementById("closeSuccess").addEventListener("click",()=>{
document.getElementById("successOverlay").style.display="none";
showSection("tree-history");
});

const incidentForm=document.getElementById("emergencyForm");
const incidentPhoto=document.getElementById("incidentPhoto");
const incidentPreview=document.getElementById("incidentPreview");
const incidentPreviewContainer=document.getElementById("incidentPreviewContainer");
const incidentLocation=document.getElementById("incidentLocation");
const incidentLocationStatus=document.getElementById("incidentLocationStatus");
const incidentDescription=document.getElementById("incidentDescription");
const incidentCharCount=document.getElementById("incidentCharCount");
const emergencySuccess=document.getElementById("emergencySuccessOverlay");

incidentPhoto.addEventListener("change",()=>{
const file=incidentPhoto.files[0];
if(!file)return;
if(file.size>10*1024*1024){
alert("Photo must be less than 10 MB.");
incidentPhoto.value="";
return;
}
incidentPreview.src=URL.createObjectURL(file);
incidentPreviewContainer.style.display="block";
});

document.getElementById("removeIncidentPhoto").addEventListener("click",()=>{
incidentPhoto.value="";
incidentPreview.src="";
incidentPreviewContainer.style.display="none";
});

document.getElementById("getIncidentLocation").addEventListener("click",()=>{
if(!navigator.geolocation){
incidentLocationStatus.textContent="Location is not supported by your browser.";
return;
}
incidentLocationStatus.textContent="Getting location...";
navigator.geolocation.getCurrentPosition(position=>{
incidentLocation.value=`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;
incidentLocationStatus.textContent="Location captured successfully.";
},()=>{
incidentLocationStatus.textContent="Unable to get location.";
});
});

incidentDescription.addEventListener("input",()=>{
incidentCharCount.textContent=incidentDescription.value.length;
});

incidentForm.addEventListener("submit",e=>{
e.preventDefault();

if(!incidentPhoto.files.length){
alert("Please upload photo evidence.");
return;
}

if(!incidentLocation.value.trim()){
incidentLocationStatus.textContent="Please get the incident location.";
return;
}

if(!incidentDescription.value.trim()){
alert("Please describe the incident.");
return;
}

const submitButton=document.getElementById("emergencySubmitBtn");
const submitText=document.getElementById("emergencySubmitText");
const loader=document.getElementById("emergencySubmitLoader");

submitButton.disabled=true;
submitText.style.display="none";
loader.style.display="inline";

setTimeout(()=>{
submitButton.disabled=false;
submitText.style.display="inline";
loader.style.display="none";
emergencySuccess.style.display="flex";

incidentForm.reset();
incidentPreview.src="";
incidentPreviewContainer.style.display="none";
incidentLocationStatus.textContent="";
incidentCharCount.textContent="0";
},1200);
});

document.getElementById("closeEmergencySuccess").addEventListener("click",()=>{
emergencySuccess.style.display="none";
});

showSection("plant-tree");
});

document.addEventListener("DOMContentLoaded",function(){
const sidebarItems=document.querySelectorAll(".sidebar-item"),sections=document.querySelectorAll(".dashboard-section"),sidebar=document.getElementById("sidebar"),sidebarOverlay=document.getElementById("sidebarOverlay"),mobileMenu=document.getElementById("mobileMenu"),pageTitle=document.getElementById("pageTitle"),pageDescription=document.getElementById("pageDescription");
const form=document.getElementById("treeForm"),historyList=document.getElementById("historyList"),empty=document.getElementById("historyEmpty"),total=document.getElementById("totalKarma"),side=document.getElementById("sideKarma"),fill=document.getElementById("karmaFill"),overlay=document.getElementById("successOverlay"),photo=document.getElementById("treePhoto"),preview=document.getElementById("photoPreview"),previewBox=document.getElementById("photoPreviewContainer"),removePhoto=document.getElementById("removePhoto"),locationInput=document.getElementById("location"),locationStatus=document.getElementById("locationStatus"),getLocation=document.getElementById("getLocation"),description=document.getElementById("description"),charCount=document.getElementById("charCount"),closeSuccess=document.getElementById("closeSuccess");
let trees=JSON.parse(localStorage.getItem("karmTrees")||"[]");

function updateKarma(){
const karma=trees.length*10;
if(side)side.innerHTML=karma+' <span>pts</span>';
if(total)total.textContent=karma+" pts";
if(fill)fill.style.width=Math.min(100,(karma/100)*100)+"%";
}

function renderHistory(){
if(!historyList)return;
historyList.innerHTML="";
if(!trees.length){
empty.style.display="block";
updateKarma();
return;
}
empty.style.display="none";
trees.forEach(tree=>{
const row=document.createElement("div");
row.className="history-row";
row.innerHTML=`<span>${tree.name}</span><span>${tree.date}</span><span>${tree.location}</span><span class="history-status pending">Pending</span><span class="history-karma">+10</span>`;
historyList.appendChild(row);
});
updateKarma();
}

function navigate(sectionId){
sidebarItems.forEach(item=>item.classList.toggle("active",item.dataset.section===sectionId));
sections.forEach(section=>section.classList.toggle("active",section.id===sectionId));
const item=document.querySelector(`[data-section="${sectionId}"]`);
if(item&&pageTitle&&pageDescription){
const data={
"plant-tree":["Plant a Tree","Upload a photo and let our AI verify your contribution."],
"tree-history":["Tree History","View your planted trees and earned Karma points."],
"emergency":["Emergency Reporting","Report environmental incidents and help protect nature."],
"rewards":["Rewards","Your environmental actions unlock exciting rewards."],
"competitions":["Competitions","Join environmental competitions and represent your college."]
};
pageTitle.textContent=data[sectionId][0];
pageDescription.textContent=data[sectionId][1];
}
sidebar.classList.remove("open");
sidebarOverlay.classList.remove("show");
}

sidebarItems.forEach(item=>item.addEventListener("click",()=>navigate(item.dataset.section)));

if(mobileMenu){
mobileMenu.addEventListener("click",()=>{
sidebar.classList.toggle("open");
sidebarOverlay.classList.toggle("show");
});
}

if(sidebarOverlay){
sidebarOverlay.addEventListener("click",()=>{
sidebar.classList.remove("open");
sidebarOverlay.classList.remove("show");
});
}

if(photo){
photo.addEventListener("change",function(){
const file=this.files[0];
if(!file)return;
if(file.size>10*1024*1024){
alert("Photo size must be less than 10 MB.");
this.value="";
return;
}
const reader=new FileReader();
reader.onload=e=>{
preview.src=e.target.result;
previewBox.style.display="block";
};
reader.readAsDataURL(file);
});
}

if(removePhoto){
removePhoto.addEventListener("click",()=>{
photo.value="";
preview.src="";
previewBox.style.display="none";
});
}

if(description&&charCount){
description.addEventListener("input",()=>charCount.textContent=description.value.length);
}

if(getLocation){
getLocation.addEventListener("click",()=>{
if(!navigator.geolocation){
locationStatus.textContent="Geolocation is not supported by your browser.";
return;
}
locationStatus.textContent="Getting your location...";
navigator.geolocation.getCurrentPosition(position=>{
locationInput.value=`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
locationStatus.textContent="Location detected successfully.";
},()=>{
locationStatus.textContent="Unable to get your location.";
});
});
}

if(form){
form.addEventListener("submit",function(e){
e.preventDefault();
if(!photo.files.length){
alert("Please upload a tree photo.");
return;
}
if(!locationInput.value){
alert("Please get the tree location.");
return;
}
const tree={
name:document.getElementById("treeName").value.trim(),
date:new Date().toLocaleDateString("en-IN"),
location:locationInput.value,
karma:10,
status:"Pending"
};
trees.push(tree);
localStorage.setItem("karmTrees",JSON.stringify(trees));
renderHistory();
form.reset();
preview.src="";
previewBox.style.display="none";
locationStatus.textContent="";
charCount.textContent="0";
overlay.classList.add("show");
});
}

if(closeSuccess){
closeSuccess.addEventListener("click",()=>{
overlay.classList.remove("show");
navigate("tree-history");
});
}

const incidentForm=document.getElementById("emergencyForm"),incidentPhoto=document.getElementById("incidentPhoto"),incidentPreview=document.getElementById("incidentPreview"),incidentPreviewContainer=document.getElementById("incidentPreviewContainer"),removeIncidentPhoto=document.getElementById("removeIncidentPhoto"),incidentLocation=document.getElementById("incidentLocation"),getIncidentLocation=document.getElementById("getIncidentLocation"),incidentLocationStatus=document.getElementById("incidentLocationStatus"),incidentDescription=document.getElementById("incidentDescription"),incidentCharCount=document.getElementById("incidentCharCount"),emergencySuccessOverlay=document.getElementById("emergencySuccessOverlay"),closeEmergencySuccess=document.getElementById("closeEmergencySuccess");

if(incidentPhoto){
incidentPhoto.addEventListener("change",function(){
const file=this.files[0];
if(!file)return;
if(file.size>10*1024*1024){
alert("Photo size must be less than 10 MB.");
this.value="";
return;
}
const reader=new FileReader();
reader.onload=e=>{
incidentPreview.src=e.target.result;
incidentPreviewContainer.style.display="block";
};
reader.readAsDataURL(file);
});
}

if(removeIncidentPhoto){
removeIncidentPhoto.addEventListener("click",()=>{
incidentPhoto.value="";
incidentPreview.src="";
incidentPreviewContainer.style.display="none";
});
}

if(getIncidentLocation){
getIncidentLocation.addEventListener("click",()=>{
if(!navigator.geolocation){
incidentLocationStatus.textContent="Geolocation is not supported by your browser.";
return;
}
incidentLocationStatus.textContent="Getting your location...";
navigator.geolocation.getCurrentPosition(position=>{
incidentLocation.value=`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
incidentLocationStatus.textContent="Location detected successfully.";
},()=>{
incidentLocationStatus.textContent="Unable to get your location.";
});
});
}

if(incidentDescription&&incidentCharCount){
incidentDescription.addEventListener("input",()=>incidentCharCount.textContent=incidentDescription.value.length);
}

if(incidentForm){
incidentForm.addEventListener("submit",function(e){
e.preventDefault();
if(!incidentPhoto.files.length){
alert("Please upload photo evidence.");
return;
}
if(!incidentLocation.value){
alert("Please get the incident location.");
return;
}
if(!incidentDescription.value.trim()){
alert("Please describe the incident.");
return;
}
const button=document.getElementById("emergencySubmitBtn"),text=document.getElementById("emergencySubmitText"),loader=document.getElementById("emergencySubmitLoader");
button.disabled=true;
text.style.display="none";
loader.style.display="inline";
setTimeout(()=>{
button.disabled=false;
text.style.display="inline";
loader.style.display="none";
incidentForm.reset();
incidentPreview.src="";
incidentPreviewContainer.style.display="none";
incidentLocationStatus.textContent="";
incidentCharCount.textContent="0";
emergencySuccessOverlay.classList.add("show");
},700);
});
}

if(closeEmergencySuccess){
closeEmergencySuccess.addEventListener("click",()=>emergencySuccessOverlay.classList.remove("show"));
}

renderHistory();
});