const module = localStorage.getItem("module");
const topic = localStorage.getItem("selectedTopic");
const level = localStorage.getItem("selectedLevel");

const questions = QA_QUESTIONS[module][topic][level];

const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];

const box = document.getElementById("solutionBox");

questions.forEach((q, index) => {

  const userAns = userAnswers[index];
  const isCorrect = userAns === q.answer;

  const div = document.createElement("div");
  div.className = "solution-card";

  div.innerHTML = `
    <h3>Q${index + 1}. ${q.question}</h3>

    <p><strong>Your Answer:</strong> 
      <span class="${isCorrect ? "correct" : "incorrect"}">
        ${userAns || "Not Attempted"}
      </span>
    </p>

    <p><strong>Correct Answer:</strong> 
      <span class="correct">${q.answer}</span>
    </p>

    <div class="explanation">
      <strong>Explanation:</strong><br>
      ${q.explanation || "Explanation not added yet"}
    </div>
  `;

  box.appendChild(div);

});

function goBack() {
  window.location.href = "result.html";
}
