const section = localStorage.getItem("section");
const module = localStorage.getItem("module");

const grid = document.getElementById("topicGrid");
const title = document.getElementById("moduleTitle");

title.innerText = module.toUpperCase();

let data;

if (section === "qa") data = QA_QUESTIONS[module];
if (section === "lrdi") data = LRDI_QUESTIONS[module];
if (section === "varc") data = VARC_QUESTIONS[module];

// 🔥 GET LEVEL (FIXED)
function getLevel(topic) {
  let progress = JSON.parse(localStorage.getItem("progress")) || {};
  let key = module + "_" + topic;   // ✅ MAIN FIX
  return progress[key] || 0;
}

// 🔥 SHOW TOPICS
Object.keys(data).forEach(topic => {

  let level = getLevel(topic);
  let percent = (level / 3) * 100;

  const div = document.createElement("div");
  div.className = "topic-card";

  div.innerHTML = `
    <h3>${data[topic].title}</h3>
    <p class="percent-text">${percent.toFixed(0)}% Completed</p>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>
  `;

  div.onclick = () => {
    localStorage.setItem("selectedTopic", topic);
    document.getElementById("levelPopup").style.display = "flex";
  };

  grid.appendChild(div);
});

// LEVEL SELECT
function selectLevel(level) {
  localStorage.setItem("selectedLevel", level);
  document.getElementById("levelPopup").style.display = "none";
  document.getElementById("modePopup").style.display = "flex";
}

// 🔥 SAVE PROGRESS (FIXED)
function saveProgress() {

  let topic = localStorage.getItem("selectedTopic");
  let level = Number(localStorage.getItem("selectedLevel"));

  let progress = JSON.parse(localStorage.getItem("progress")) || {};

  let key = module + "_" + topic;   // ✅ MAIN FIX

  if (!progress[key] || level > progress[key]) {
    progress[key] = level;
  }

  localStorage.setItem("progress", JSON.stringify(progress));
}

// START TEST
window.startTest = function(mode) {

  saveProgress();

  localStorage.setItem("testMode", mode);

  window.location.href = "questions.html";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}
