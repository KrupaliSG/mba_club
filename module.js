const section = localStorage.getItem("section");
const grid = document.getElementById("moduleGrid");

// 🔥 GET DATA BASED ON SECTION
let data;

if (section === "qa") data = QA_QUESTIONS;
else if (section === "lrdi") data = LRDI_QUESTIONS;
else if (section === "varc") data = VARC_QUESTIONS;

// 🔥 CALCULATE PROGRESS
function calculateModuleProgress(moduleName) {

  const progress = JSON.parse(localStorage.getItem("progress")) || {};

  const topics = data[moduleName];
  let totalLevels = Object.keys(topics).length * 3;
  let completedLevels = 0;

  Object.keys(topics).forEach(topic => {

    let key = moduleName + "_" + topic;

    let level = Number(progress[key]) || 0;

    if (level > 3) level = 3;

    completedLevels += level;
  });

  return totalLevels === 0 ? 0 : (completedLevels / totalLevels) * 100;
}

// 🔥 CREATE UI DYNAMICALLY
Object.keys(data).forEach(moduleName => {

  const percent = calculateModuleProgress(moduleName);

  const div = document.createElement("div");
  div.className = "module-card";

  div.innerHTML = `
    <h3>${moduleName.toUpperCase()}</h3>
    <p>${percent.toFixed(0)}% Completed</p>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>
  `;

  div.onclick = () => {
    localStorage.setItem("module", moduleName);
    window.location.href = "submodule.html";
  };

  grid.appendChild(div);
});
