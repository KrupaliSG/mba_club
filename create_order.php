<?php

$keyId = "rzp_test_SWbktIvXs1FWRE";
$keySecret = "6gHEyzyVd2EmQoBuZQEoNHyT";

$amount = 100;

$data = [
  "amount" => $amount,
  "currency" => "INR",
  "receipt" => "order_rcptid_11"
];

$ch = curl_init("https://api.razorpay.com/v1/orders");

curl_setopt($ch, CURLOPT_USERPWD, $keyId . ":" . $keySecret);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

$response = curl_exec($ch);

if(curl_errno($ch)){
  echo curl_error($ch); // 🔥 show error
}

curl_close($ch);

echo $response;
?>
