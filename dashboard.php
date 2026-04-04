<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}

if ($_SESSION['is_paid'] != 1) {
    header("Location: course.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <!-- CSS -->
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<?php if(!isset($_SESSION['user_id'])): ?>

<div style="
position:fixed;
top:0; left:0;
width:100%; height:100%;
background:rgba(0,0,0,0.7);
display:flex;
justify-content:center;
align-items:center;
z-index:999;
">

<div style="background:white; padding:30px; border-radius:10px; text-align:center;">
  <h2>Login Required</h2>

  <input type="email" id="loginEmail" placeholder="Email"><br><br>
  <input type="password" id="loginPass" placeholder="Password"><br><br>

  <button onclick="loginNow()">Login</button>
</div>

</div>

<script>
function loginNow(){

  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPass").value;

  let form = document.createElement("form");
  form.method = "POST";
  form.action = "login.php";

  let e = document.createElement("input");
  e.name = "email";
  e.value = email;

  let p = document.createElement("input");
  p.name = "password";
  p.value = pass;

  form.appendChild(e);
  form.appendChild(p);

  document.body.appendChild(form);
  form.submit();
}
</script>

<?php endif; ?>

<div class="layout">

    <!-- Sidebar -->
    <div class="sidebar">
        <h2 class="brand">MBA Club</h2>
        <ul>
            <li>Dashboard</li>
            <li>My Courses</li>
            <li>Tests</li>
            <li>Performance</li>
            <li>Profile</li>
            <li onclick="window.location.href='logout.php'">Logout</li>
        </ul>
    </div>


<div class="main">

    <div class="header">
        <h1>Welcome, Aspirant 👋</h1>
    </div>

    <!-- ROW 1 -->
    <div class="overall-card">
        <h2>Overall</h2>
        <p id="overallPercent">0% Completed</p>
        <div class="progress-bar">
            <div class="progress-fill" id="overallBar"></div>
        </div>
    </div>

    <!-- ROW 2 -->
   <div class="subject-row">

    <a href="modules/module.html" onclick="setSection('qa')" class="small-card">
        <h3>QA</h3>
        <p id="qaPercent">0% Completed</p>
        <div class="progress-bar">
            <div class="progress-fill" id="qaBar"></div>
        </div>
    </a>

    <a href="modules/module.html" onclick="setSection('lrdi')" class="small-card">
        <h3>LRDI</h3>
        <p id="lrdiPercent">0% Completed</p>
        <div class="progress-bar">
            <div class="progress-fill" id="lrdiBar"></div>
        </div>
    </a>

    <a href="modules/module.html" onclick="setSection('varc')" class="small-card">
        <h3>VARC</h3>
        <p id="varcPercent">0% Completed</p>
        <div class="progress-bar">
            <div class="progress-fill" id="varcBar"></div>
        </div>
    </a>

</div>

<script src="data/qa_questions.js"></script>
<script src="data/lrdi_questions.js"></script>
<script src="data/varc_questions.js"></script>
<script src="js/dashboard.js"></script>

</body>
</html>
