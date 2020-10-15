<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['group_id']) && isset($_POST['bill_no']) && isset($_POST['date'])) {

      $date = $_POST['date'];

      $group_id = $_POST['group_id'];

      $bill_no = $_POST['bill_no'];

      if ($group_id && $bill_no && $date) {

        $q1 = "SELECT * from packaging_queue where group_id = '$group_id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            $q2 = "UPDATE packaging_queue SET bill_number = '$bill_no' where group_id = '$group_id'";

            if ($q2_run = $db->query($q2)) {

              $q5 = "SELECT * from order_history where group_id = '$group_id'";

              if ($q5_run = $db->query($q5)) {

                if ($q5_run->num_rows) {

                  if ($q5_fetch = $q5_run->fetch_assoc()) {

                    $action = json_decode($q5_fetch['action_json']);

                    $arr = array();

                    foreach ($action as $key) {

                      array_push($arr, $key);

                    }

                    $q6 = "SELECT * from admin_users where id = '$admin_id'";

                    if ($q6_run = $db->query($q6)) {

                      if ($q6_run->num_rows) {

                        if ($q6_fetch = $q6_run->fetch_assoc()) {

                          $admin_email = $q6_fetch['email'];

                          array_push($arr, "Bill Number: $bill_no was entered on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                        }

                      }

                    }

                    $action_json = json_encode($arr);

                    $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                    if ($q6_run = $db->query($q6)) {

                      echo "Bill Number Entered";

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

}
?>
