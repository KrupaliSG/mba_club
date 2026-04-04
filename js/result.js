const data = JSON.parse(localStorage.getItem("lastResult"));

if (data) {

  document.getElementById("totalQ").innerText = data.total;
  document.getElementById("attemptedQ").innerText = data.attempted;
  document.getElementById("correctQ").innerText = data.correct;
  document.getElementById("incorrectQ").innerText = data.incorrect;
  document.getElementById("skippedQ").innerText = data.skipped;

  // ✅ ACCURACY
  let accuracy = data.attempted === 0 
    ? 0 
    : (data.correct / data.attempted) * 100;

  accuracy = Math.round(accuracy);

  document.getElementById("accuracyCircle").innerText = accuracy + "%";

  // SVG logic
  const circle = document.getElementById("progressCircle");

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  setTimeout(() => {
    const offset = circumference - (accuracy / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }, 300);

} // ✅ YE MISSING THA

// BUTTONS (ye bahar hi rahenge)
function goDashboard() {
  window.location.href = "../dashboard.php";
}

function reattempt() {
  window.location.href = "questions.html";
}

function viewSolution() {
  window.location.href = "solution.html";
}
