<?php
session_start();
include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($_SESSION['user_id'])) {
    die("User not logged in");
}

$user_id = $_SESSION['user_id'];

if (isset($data['payment_id'])) {

    $payment_id = $data['payment_id'];

    // save payment + mark paid
    $sql = "UPDATE users SET is_paid = 1 WHERE id = '$user_id'";

    if (mysqli_query($conn, $sql)) {

        $_SESSION['is_paid'] = 1;

        echo "Payment success";

    } else {
        echo "DB error";
    }

} else {
    echo "No payment data";
}
?>
