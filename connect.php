<?php
$host = "junction.proxy.rlwy.net";
$user = "root";
$pass = "RiWmpQmqlyRULVrfqXyrUgXNAqziwlaj";
$db   = "railway";
$port = "38586";

$conn = mysqli_connect($host, $user, $pass, $db, $port);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
