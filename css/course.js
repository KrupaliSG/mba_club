function openSubModule(moduleName) {
    localStorage.setItem("qaModule", moduleName);
    window.location.href = "submodule.html";
}

function goDashboard() {
    window.location.href = "dashboard.html";
}

function logout() {
  alert("Logged out successfully");
}

function chooseMode(topic) {
    localStorage.setItem("qaTopic", topic);
    document.getElementById("modePopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("modePopup").style.display = "none";
}

function startTest(mode) {
    localStorage.setItem("testMode", mode);

    if (mode === "timer") {
        localStorage.setItem("testTime", 20); // minutes
    }

    window.location.href = "questions.html";
}

