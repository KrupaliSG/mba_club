<?php
session_start();
session_regenerate_id(true);
include "connect.php";

$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$password = $_POST['password'];

$hashed = password_hash($password, PASSWORD_DEFAULT);

// check duplicate
$check = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($conn, $check);

if(mysqli_num_rows($result) > 0){

    echo "Email already exists!";

} else {

    $sql = "INSERT INTO users (name, email, mobile, password)
            VALUES ('$name', '$email', '$mobile', '$hashed')";

    if(mysqli_query($conn, $sql)){
        header("Location: index.html");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }

}
?>
