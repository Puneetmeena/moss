<?php
include 'connect.php';

session_start();

$adm_email = '';

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['remarks']) && isset($_POST['date']) && isset($_POST['group_id'])) {

      $remarks = $db->real_escape_string($_POST['remarks']);

      $date = $_POST['date'];

      $group_id = $_POST['group_id'];

      if ($remarks && $date && $group_id) {

        $q = "SELECT * from admin_users where id = '$admin_id'";

        if ($q_run = $db->query($q)) {

          if ($q_fetch = $q_run->fetch_assoc()) {

            $adm_email = $q_fetch['email'];

          }

        }

        $q1 = "SELECT * from cc_queue where group_id = '$group_id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            if ($q1_fetch = $q1_run->fetch_assoc()) {

              $a = array();

              $a['remarks'] = $remarks;

              $a['added_by'] = $adm_email;

              $remarks_json = json_encode($a);

              $q2 = "UPDATE cc_queue SET remarks_json = '$remarks_json' where group_id ='$group_id'";

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

                            array_push($arr, "CC Queue remarks: $remarks was added on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                          }

                        }

                      }

                      $action_json = json_encode($arr);

                      $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                      if ($q6_run = $db->query($q6)) {

                        echo "Remarks Added";

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

}
?>
