<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['address_id']) && isset($_POST['user_id']) && isset($_POST['group_id']) && isset($_POST['date'])) {

      $address_id = $_POST['address_id'];

      $user_id = $_POST['user_id'];

      $group_id = $_POST['group_id'];

      $date = $_POST['date'];

      if ($address_id && $user_id && $group_id && $date) {

        $q1 = "SELECT * from user_address where id = '$address_id' AND user_id = '$user_id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            if ($q1_fetch = $q1_run->fetch_assoc()) {

              if ($q1_fetch['address_json']) {

                $address_decode = json_decode($q1_fetch['address_json']);

                $order_name = $address_decode->full_name;

                $address_json = $q1_fetch['address_json'];

                $q2 = "SELECT * from cc_queue where group_id = '$group_id'";

                if ($q2_run = $db->query($q2)) {

                  if ($q2_run->num_rows) {

                    $q3 = "UPDATE cc_queue SET address_json = '$address_json', order_name = '$order_name' where group_id = '$group_id'";

                    if ($q3_run = $db->query($q3)) {

                      $q4 = "SELECT * from my_orders where group_id = '$group_id'";

                      if ($q4_run = $db->query($q4)) {

                        if ($q4_run->num_rows) {

                          $q5 = "UPDATE my_orders SET address_json = '$address_json', order_name = '$order_name' where group_id = '$group_id'";

                          if ($q5_run = $db->query($q5)) {

                            $q6 = "SELECT * from order_history where group_id = '$group_id'";

                            if ($q6_run = $db->query($q6)) {

                              if ($q6_run->num_rows) {

                                if ($q6_fetch = $q6_run->fetch_assoc()) {

                                  $action = json_decode($q6_fetch['action_json']);

                                  $arr = array();

                                  foreach ($action as $key) {

                                    array_push($arr, $key);

                                  }

                                  $q7 = "SELECT * from admin_users where id = '$admin_id'";

                                  if ($q7_run = $db->query($q7)) {

                                    if ($q7_run->num_rows) {

                                      if ($q7_fetch = $q7_run->fetch_assoc()) {

                                        $admin_email = $q7_fetch['email'];

                                        array_push($arr, "Address Changed on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                      }

                                    }

                                  }

                                  $action_json = json_encode($arr);

                                  $q4 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                                  if ($q4_run = $db->query($q4)) {

                                    if ($q1 = $db->query($q1)) {

                                      if ($q2 = $db->query($q2)) {

                                        echo "Address Changed Successfully";

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

      }

    }

  }

}
?>
