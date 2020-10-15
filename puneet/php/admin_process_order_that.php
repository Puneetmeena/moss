<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['group_id']) && isset($_POST['date']) && isset($_POST['process_time'])) {

      $group_id = $_POST['group_id'];

      $date = $_POST['date'];

      $process_time = $_POST['process_time'];

      if ($group_id && $date && $process_time) {

        $process_order_time = $process_time + time();

        $q1 = "UPDATE cc_queue SET process_order = '$process_order_time' where group_id = '$group_id'";

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

                      $str = '';

                      if ($process_time == 1800) {
                        $str = "30 min";
                      }
                      elseif ($process_time == 3600) {
                        $str = "1 hr";
                      }
                      elseif ($process_time == 7200) {
                        $str = "2 hr";
                      }
                      elseif ($process_time == 10800) {
                        $str = "3 hr";
                      }
                      elseif ($process_time == 14400) {
                        $str = "4 hr";
                      }
                      elseif ($process_time == 18000) {
                        $str = "5 hr";
                      }
                      else {
                        $str = "after 24 hr";
                      }

                      array_push($arr, "Process order that: $str time was assigned by Admin-Email-ID: $admin_email and Admin-ID: $admin_id on $date");

                    }

                  }

                }

                $action_json = json_encode($arr);

                $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                if ($q6_run = $db->query($q6)) {

                  echo "This order will be in process after some time";

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
