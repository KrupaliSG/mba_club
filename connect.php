<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "mba_club"; // ⚠️ apna actual DB name likhna

$conn = new mysqli($host, $username, $password, $database);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
