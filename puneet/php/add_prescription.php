<?php
include 'connect.php';

session_start();

$a = array();

$arr = array();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['group_id']) && isset($_POST['date']) && isset($_FILES['myPresc'])) {

      $group_id = $_POST['group_id'];

      $date = $_POST['date'];

      if ($group_id && $date && $_FILES['myPresc']) {

        $file_name = $_FILES['myPresc']['name'];
        $file_tmp = $_FILES['myPresc']['tmp_name'];
        $file_type = $_FILES['myPresc']['type'];

        if (substr($file_type, 0, 5) == 'image') {

          if (move_uploaded_file($file_tmp, "../img/rx_check_img/$group_id/$file_name")) {

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

                        array_push($arr, "Image Added on $date from external source by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

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

                            $arr = array();

                            foreach ($img_list as $key) {

                              $arr['img_name'] = $key->img_name;

                              $arr['img_date'] = $key->img_date;

                              array_push($a, $arr);

                            }

                            $arr['img_name'] = $file_name;

                            $arr['img_date'] = $date;

                            array_push($a, $arr);

                            $img_date_json = json_encode($a);

                            $q5 = "UPDATE cc_queue SET img_date_json = '$img_date_json' where group_id = '$group_id'";

                            $q6 = "UPDATE my_orders SET img_date_json = '$img_date_json' where group_id = '$group_id'";

                            if ($q5_run = $db->query($q5)) {

                              if ($q6_run = $db->query($q6)) {

                                echo "Image Added";

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

}
?>
