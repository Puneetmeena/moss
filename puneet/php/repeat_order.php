<?php
include 'connect.php';

session_start();

if (isset($_SESSION['id']) && isset($_POST['group_id'])) {

  $id = $_SESSION['id'];

  $group_id = $_POST['group_id'];

  if ($id && $group_id) {

    $q1 = "SELECT * from my_orders where group_id = '$group_id'";

    if ($q1_run = $db->query($q1)) {

      if ($q1_run->num_rows) {

        if ($q1_fetch = $q1_run->fetch_assoc()) {

          if ($q1_fetch['order_json']) {

            $order_decode = json_decode($q1_fetch['order_json']);

            foreach ($order_decode as $key) {

              $med_id = $key->id;

              $quantity = $key->quantity;

              $q2 = "SELECT * from cart where user_id = '$id' AND med_id = '$med_id'";

              if ($q2_run = $db->query($q2)) {

                if ($q2_run->num_rows) {

                  $q3 = "UPDATE cart SET quantity = '$quantity' where user_id = '$id' AND med_id = '$med_id'";

                  if ($q3_run = $db->query($q3)) {
                    // code...
                  }

                }
                else {

                  $q3 = "INSERT INTO cart (user_id, med_id, quantity) VALUES ('$id', '$med_id', '$quantity')";

                  if ($q3_run = $db->query($q3)) {
                    // code...
                  }

                }

              }

            }

            echo "All Set";

          }

        }

      }

    }

  }

}
?>
