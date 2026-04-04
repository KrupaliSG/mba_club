function logout() {
  localStorage.removeItem("mbaUser");
  window.location.href = "index.html";
}

// 🌙 THEME
function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// 🔥 COMMON FUNCTION (FOR ALL SECTIONS)
function calculateSectionProgress(dataObj) {

  const progress = JSON.parse(localStorage.getItem("progress")) || {};

  let totalLevels = 0;
  let completedLevels = 0;

  Object.keys(dataObj).forEach(module => {

    Object.keys(dataObj[module]).forEach(topic => {

      totalLevels += 3;

      let key = module + "_" + topic;   // ✅ FIX

      let level = Number(progress[key]) || 0;

      if (level > 3) level = 3;

      completedLevels += level;

    });

  });

  return totalLevels === 0 ? 0 : (completedLevels / totalLevels) * 100;
}

window.addEventListener("DOMContentLoaded", function () {

  let qa = calculateSectionProgress(QA_QUESTIONS);

  let lrdi = typeof LRDI_QUESTIONS !== "undefined"
    ? calculateSectionProgress(LRDI_QUESTIONS)
    : 0;

  let varc = typeof VARC_QUESTIONS !== "undefined"
    ? calculateSectionProgress(VARC_QUESTIONS)
    : 0;

  // QA
  document.getElementById("qaPercent").innerText = qa.toFixed(0) + "% Completed";
  document.getElementById("qaBar").style.width = qa + "%";

  // LRDI
  document.getElementById("lrdiPercent").innerText = lrdi.toFixed(0) + "% Completed";
  document.getElementById("lrdiBar").style.width = lrdi + "%";

  // VARC
  document.getElementById("varcPercent").innerText = varc.toFixed(0) + "% Completed";
  document.getElementById("varcBar").style.width = varc + "%";

  // OVERALL
  let overall = (qa + lrdi + varc) / 3;

  document.getElementById("overallPercent").innerText =
    overall.toFixed(0) + "% Completed";

  document.getElementById("overallBar").style.width =
    overall + "%";
});

function setSection(sec) {
  localStorage.setItem("section", sec);
}


