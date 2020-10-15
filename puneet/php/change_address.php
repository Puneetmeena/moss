<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['address_line1']) &&
        isset($_POST['address_line2']) &&
        isset($_POST['city']) &&
        isset($_POST['region']) &&
        isset($_POST['postal_code']) &&
        isset($_POST['phone']) &&
        isset($_POST['country']) &&
        isset($_POST['group_id']) &&
        isset($_POST['id']) &&
        isset($_POST['date'])) {

          $address_line1 = $_POST['address_line1'];
          $address_line2 = $_POST['address_line2'];
          $city = $_POST['city'];
          $region = $_POST['region'];
          $postal_code = $_POST['postal_code'];
          $phone = $_POST['phone'];
          $country = $_POST['country'];
          $group_id = $_POST['group_id'];
          $cc_id = $_POST['id'];
          $date = $_POST['date'];

          if ($address_line1 && $address_line2 && $cc_id && $group_id &&
              $city && $region && $postal_code && $phone && $country && $date) {

              $address_json = json_encode($_POST);

              $q1 = "UPDATE cc_queue SET address_json = '$address_json', order_phone = '$phone' where id = '$cc_id'";

              $q2 = "UPDATE my_orders SET address_json = '$address_json', order_phone = '$phone' where group_id = '$group_id'";

              $q3 = "SELECT * from order_history where group_id = '$group_id'";

              if ($q3_run = $db->query($q3)) {

                if ($q3_run->num_rows) {

                  if ($q3_fetch = $q3_run->fetch_assoc()) {

                    $action = json_decode($q3_fetch['action_json']);

                    $arr = array();

                    foreach ($action as $key) {

                      array_push($arr, $key);

                    }

                    $q5 = "SELECT * from admin_users where id = '$admin_id'";

                    if ($q5_run = $db->query($q5)) {

                      if ($q5_run->num_rows) {

                        if ($q5_fetch = $q5_run->fetch_assoc()) {

                          $admin_email = $q5_fetch['email'];

                          array_push($arr, "Address Edited on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                        }

                      }

                    }

                    $action_json = json_encode($arr);

                    $q4 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                    if ($q4_run = $db->query($q4)) {

                      if ($q1 = $db->query($q1)) {

                        if ($q2 = $db->query($q2)) {

                          echo "Address Edited Successfully";

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
