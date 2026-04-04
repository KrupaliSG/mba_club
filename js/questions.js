const mode = localStorage.getItem("testMode");
let userAnswers = [];
let timeLeft = 20 * 60; // 20 minutes (seconds)
let timerInterval;

function startTimer() {

  const timerBox = document.getElementById("timerBox");

  timerInterval = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // format: 09:05
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerBox.innerText = `⏳ Time Left: ${minutes}:${seconds}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      submitTest();  // auto submit
    }

    if (timeLeft <= 60) {
    timerBox.style.color = "red";
    }


  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {

  let module = localStorage.getItem("module") || "arithmetic";
  let topic = localStorage.getItem("selectedTopic") || "percentage";
  let level = localStorage.getItem("selectedLevel") || "1";

  module = module.toLowerCase();
  topic = topic.toLowerCase();

  window.questions = QA_QUESTIONS[module][topic][level];

  let currentIndex = 0;
  let score = 0;

  // TITLE
  document.getElementById("topicTitle").innerText =
    module.toUpperCase() + " - " + topic.toUpperCase() + " (Level " + level + ")";

  function loadQuestion() {

    const q = questions[currentIndex];
    const container = document.getElementById("questionBox");

    let optionsHTML = "";

    q.options.forEach(opt => {
      optionsHTML +=
        '<label>' +
        '<input type="radio" name="answer" value="' + opt + '">' +
        opt +
        '</label><br>';
    });

    container.innerHTML =
  '<div class="question-card">' +

  '<h3>' + (currentIndex + 1) + '. ' + q.question + '</h3>' +

  q.options.map(opt => `
    <div class="option-card">
      <label>
        <input type="radio" name="answer" value="${opt}">
        ${opt}
      </label>
    </div>
  `).join("") +

  '</div>';

    // ✅ BUTTON LOGIC
    if (currentIndex === questions.length - 1) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("submitBtn").style.display = "inline-block";
    } else {
      document.getElementById("nextBtn").style.display = "inline-block";
      document.getElementById("submitBtn").style.display = "none";
    }
  }

  // NEXT
  window.nextQuestion = function () {

  const selected = document.querySelector('input[name="answer"]:checked');

  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  // ✅ SAVE ANSWER
  userAnswers[currentIndex] = selected.value;

  currentIndex++;
  loadQuestion();
};

  // SUBMIT
  window.submitTest = function () {

  // ✅ SAVE LAST QUESTION ANSWER
  const selected = document.querySelector('input[name="answer"]:checked');

  if (selected) {
    userAnswers[currentIndex] = selected.value;
  }

  if (!selected) {
  if (!confirm("You have not selected an answer. Submit anyway?")) {
    return;
  }
}

  console.log("SUBMIT CLICKED");

  let total = questions.length;
  let attempted = 0;
  let correct = 0;

  questions.forEach((q, index) => {

    let answer = userAnswers[index]; // ✅ FIXED

    if (answer !== undefined) {
      attempted++;

      if (answer === q.answer) {
        correct++;
      }
    }

  });

  let incorrect = attempted - correct;
  let skipped = total - attempted;

  const resultData = {
    total,
    attempted,
    correct,
    incorrect,
    skipped
  };

  localStorage.setItem("lastResult", JSON.stringify(resultData));
localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

// small delay before redirect
setTimeout(() => {
  window.location.href = "result.html";
}, 100);

};

  loadQuestion();

});

if (mode === "timer") {
  startTimer();
} else {
  document.getElementById("timerBox").innerText = "Practice Mode";
}
