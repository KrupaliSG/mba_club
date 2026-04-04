<?php
session_start();
include "connect.php";

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){

    $row = mysqli_fetch_assoc($result);

    if(password_verify($password, $row['password'])){

        $_SESSION['user_id'] = $row['id'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['is_paid'] = $row['is_paid'];

        // ✅ DECIDE REDIRECT HERE
        if($row['is_paid'] == 1){
            header("Location: dashboard.php");
        } else {
            header("Location: index.html");
        }

        exit();

    } else {
        echo "Wrong Password!";
    }

} else {
    echo "User not found!";
}
?>
