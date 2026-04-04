<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "User not logged in";
    exit();
}

$user_id = $_SESSION['user_id'];

include "connect.php";

// DEBUG
file_put_contents("log.txt", "HIT\n", FILE_APPEND);

$data = json_decode(file_get_contents("php://input"), true);

// DEBUG DATA
file_put_contents("log.txt", json_encode($data) . "\n", FILE_APPEND);

$payment_id = $data['razorpay_payment_id'] ?? '';
$order_id = $data['razorpay_order_id'] ?? '';
$signature = $data['razorpay_signature'] ?? '';

$keySecret = "6gHEyzyVd2EmQoBuZQEoNHyT"; // ⚠️ secret

$generated_signature = hash_hmac('sha256', $order_id . "|" . $payment_id, $keySecret);

if ($generated_signature == $signature) {


    mysqli_query($conn, "UPDATE users SET is_paid = 1 WHERE id='$user_id'");

    // SAVE PAYMENT
    $result = mysqli_query($conn, "INSERT INTO payments 
    (user_id, payment_id, order_id, amount, status) 
    VALUES 
    ('$user_id', '$payment_id', '$order_id', 1, 'success')");

    if(!$result){
        file_put_contents("log.txt", mysqli_error($conn) . "\n", FILE_APPEND);
    }

    echo "Payment verified";

} else {
    file_put_contents("log.txt", "SIGNATURE FAILED\n", FILE_APPEND);
    echo "Invalid payment";
}
?>
