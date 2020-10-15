<?php
include 'connect.php';

session_start();

$a = array();

$arr = array(
  "img_name" => '',
  "img_date" => ''
);

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['img_name']) && isset($_POST['group_id']) && isset($_POST['date'])) {

      $img_name = $_POST['img_name'];

      $group_id = $_POST['group_id'];

      $date = $_POST['date'];

      if ($img_name && $group_id && $date) {

        $q1 = "SELECT * from order_history where group_id = '$group_id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            if ($q1_fetch = $q1_run->fetch_assoc()) {

              $action = json_decode($q1_fetch['action_json']);

              $arr = array();

              foreach ($action as $key) {

                array_push($arr, $key);

              }

              $q2 = "SELECT * from admin_users where id = '$admin_id'";

              if ($q2_run = $db->query($q2)) {

                if ($q2_run->num_rows) {

                  if ($q2_fetch = $q2_run->fetch_assoc()) {

                    $admin_email = $q2_fetch['email'];

                    array_push($arr, "Prescription Image deleted on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                  }

                }

              }

              $action_json = json_encode($arr);

              $q3 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

              if ($q3_run = $db->query($q3)) {

                $q4 = "SELECT * from cc_queue where group_id = '$group_id'";

                if ($q4_run = $db->query($q4)) {

                  if ($q4_run->num_rows) {

                    if ($q4_fetch = $q4_run->fetch_assoc()) {

                      if ($q4_fetch['img_date_json']) {

                        $img_list = json_decode($q4_fetch['img_date_json']);

                        foreach ($img_list as $key) {

                          if ($key->img_name != $img_name) {

                            $arr['img_name'] = $key->img_name;

                            $arr['img_date'] = $key->img_date;

                            array_push($a, $arr);

                          }

                        }

                        $img_date_json = json_encode($a);

                        $q5 = "UPDATE cc_queue SET img_date_json = '$img_date_json' where group_id = '$group_id'";

                        $q6 = "UPDATE my_orders SET img_date_json = '$img_date_json' where group_id = '$group_id'";

                        if ($q5_run = $db->query($q5)) {

                          if ($q6_run = $db->query($q6)) {

                            if (unlink("../img/rx_check_img/$group_id/$img_name")) {

                              echo "Image Deleted";

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

    }

  }

}
?>
