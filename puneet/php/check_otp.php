<?php
include 'connect.php';

session_start();

function orderId($db)
{
  $chars = "0123456789";

  $order_id = "OD";

  $order_id_len = strlen($order_id);

  for ($i=0; $i < 16 ; $i++) {

    $order_id[ $order_id_len + $i ] = $chars[rand(0, strlen($chars) - 1)];

  }

  $end = 1;

  for ($i=0; $i < $end; $i++) {

    $query = "SELECT * from order_id where order_id = '$order_id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows != 0) {

        $order_id = orderId($db);

        $end++;

      }

    }

  }

  return $order_id;
}

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_POST['otp'])) {

      $otp = $_POST['otp'];

      if ($otp) {

        if (isset($_SESSION['otp'])) {

          if ($_SESSION['otp']) {

            if ($otp == $_SESSION['otp']) {

              $order_id = orderId($db);

              if ($order_id) {

                $q_ins = "INSERT INTO order_id VALUES('', '$order_id')";

                if ($q_ins_run = $db->query($q_ins)) {

                  $query = "UPDATE orders SET order_id = '$order_id', group_id = '$order_id' where user_id = '$id'";

                  if ($query_run = $db->query($query)) {

                    unset($_SESSION['otp']);

                    echo "Otp Matches";

                  }

                }

              }

            }

          }

        }

      }

    }

  }

}
?>
