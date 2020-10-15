<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['data']) && isset($_POST['mode']) && isset($_POST['date'])) {

      $date = $_POST['date'];

      $data = $_POST['data'];

      $mode = $_POST['mode'];

      if ($data && $mode && $date) {

        if ($mode == "no filter") {

          $data_decode = json_decode($data);

          foreach ($data_decode->info as $key) {

            $group_id = $key->group_id;

            $q = "UPDATE manage_queue SET collection_status = 'Collected', collection_date = '$date' where group_id = '$group_id'";

            if ($q_run = $db->query($q)) {

            }

          }

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

                      array_push($arr, "Order was marked Collected on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                    }

                  }

                }

                $action_json = json_encode($arr);

                $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                if ($q6_run = $db->query($q6)) {

                  echo "Marked";

                }

              }

            }

          }

        }
        elseif ($mode == "filtered") {

          $data_decode = json_decode($data);

          foreach ($data_decode as $key) {

            $group_id = $key;

            $q = "UPDATE manage_queue SET collection_status = 'Collected' where group_id = '$group_id'";

            if ($q_run = $db->query($q)) {


            }

          }

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

                      array_push($arr, "Order was marked Collected on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                    }

                  }

                }

                $action_json = json_encode($arr);

                $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                if ($q6_run = $db->query($q6)) {

                  echo "Marked";

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
