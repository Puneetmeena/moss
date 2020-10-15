<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['group_id']) && isset($_POST['date'])) {

      $group_id = $_POST['group_id'];

      $date = $_POST['date'];

      if ($group_id && $date) {

        $curr_time = time() + 120;

        $q1 = "UPDATE cc_queue SET process_order = '$curr_time' where group_id = '$group_id'";

        if ($q1_run = $db->query($q1)) {

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

                      array_push($arr, "This order was skipped on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                    }

                  }

                }

                $action_json = json_encode($arr);

                $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                if ($q6_run = $db->query($q6)) {

                  echo "Order Skipped";

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
