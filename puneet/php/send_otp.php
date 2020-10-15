<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


include 'connect.php';

session_start();

if ($_SESSION['id']) {

  $id = $_SESSION['id'];

  if ($id) {

    if(isset($_SESSION['otp'])) {

      if ($_SESSION['otp']) {

        echo "OTP has been already sent to your registered E-mail ID.";

      }

    }
    else {

      $query = "SELECT * from user_info where id = '$id'";

      if ($query_run = $db->query($query)) {

        if ($query_run->num_rows) {

          if ($query_fetch = $query_run->fetch_assoc()) {

            $to = $query_fetch['email'];

            $_SESSION['otp'] = rand(1111, 9999);

            $otp = $_SESSION['otp'];

            $body = "Your One Time Password: $otp";

            $subject = "MOS OTP";

            $headers = 'From: MOS <support@medicineonlinestore.com>';

            /*$mail = new PHPMailer(); // create a new object
            $mail->IsSMTP(); // enable SMTP
            $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
            $mail->SMTPAuth = true; // authentication enabled
            $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
            $mail->Host = "smtpout.asia.secureserver.net";
            $mail->Port = 465; // or 587
            $mail->IsHTML(true);
            $mail->Username = "support@medicineonlinestore.com";
            $mail->Password = "chetan@5";
            $mail->SetFrom("support@medicineonlinestore.com");
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->AddAddress($to);

            if(!$mail->Send()) {
               echo "Mailer Error: " . $mail->ErrorInfo;
            } else {
               echo "OTP has been sent to your registered E-Mail ID.";
            }*/

            if (mail($to, $subject, $body, $headers)) {

              echo "OTP has been sent to your registered E-Mail ID.";

            }
            else {

              echo 'Error sending the email';

            }

          }

        }

      }

    }

  }

}
?>
