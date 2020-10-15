<?php
include 'connect.php';

session_start();

$array = array();

$itr = 0;

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['group_id']) && isset($_POST['user_id']) && isset($_POST['date']) && isset($_POST['mode'])) {

      $group_id = $_POST['group_id'];

      $user_id = $_POST['user_id'];

      $date = $_POST['date'];

      $mode = $_POST['mode'];

      if ($mode == "from user img") {

        if (isset($_POST['img_arr'])) {

          $img_arr = $_POST['img_arr'];

          if ($img_arr) {

            $img_array = json_decode($img_arr);

            $q1 = "SELECT * from user_info where id = '$user_id'";

            if ($q1_run = $db->query($q1)) {

              if ($q1_run->num_rows) {

                if ($q1_fetch = $q1_run->fetch_assoc()) {

                  $scan_user_fol = scandir("../img/rx_images/$user_id/");

                  $scan_order_fol = scandir("../img/rx_check_img/$group_id/");

                  $q2 = "SELECT * from cc_queue where group_id = '$group_id'";

                  if ($q2_run = $db->query($q2)) {

                    if ($q2_run->num_rows) {

                      if ($q2_fetch = $q2_run->fetch_assoc()) {

                        if ($q2_fetch['img_date_json']) {

                          $img_decode = json_decode($q2_fetch['img_date_json']);

                          foreach ($img_decode as $key) {

                            $arr = array();

                            $arr['img_name'] = $key->img_name;

                            $arr['img_date'] = $key->img_date;

                            array_push($array, $arr);

                          }

                        }

                      }

                    }

                  }

                  $i = 1;

                  foreach ($scan_user_fol as $key1) {

                    if ($key1 != '.' && $key1 != '..') {

                      foreach ($img_array as $key2) {

                        if ($key2 == $key1) {

                          $f_name = (sizeof($scan_order_fol) - 2) + $i;

                          $file_name = $f_name.".".pathinfo($key1, PATHINFO_EXTENSION);

                          if (copy("../img/rx_images/$user_id/$key1", "../img/rx_check_img/$group_id/$file_name")) {

                            $itr++;

                            $arr = array();

                            $arr['img_name'] = $file_name;

                            $arr['img_date'] = $date;

                            array_push($array, $arr);

                          }
                          else {

                            echo "error";
                          }

                          $i++;

                        }

                      }

                    }

                  }

                  if (sizeof($array)) {

                    $img_date_json = json_encode($array);

                    $q3 = "UPDATE cc_queue SET img_date_json = '$img_date_json' where group_id = '$group_id'";

                    $q4 = "UPDATE my_orders SET img_date_json = '$img_date_json' where group_id = '$group_id'";

                    if ($q3_run = $db->query($q3)) {

                      if ($q4_run = $db->query($q4)) {

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

                                    array_push($arr, "$itr Prescription Images was added from user account on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                  }

                                }

                              }

                              $action_json = json_encode($arr);

                              $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                              if ($q6_run = $db->query($q6)) {

                                echo "Images Added";

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
