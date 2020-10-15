<?php
include 'connect.php';

session_start();

$array = array();

$med_name = '';

$msg = "";

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if (isset($_POST['group_id']) && isset($_POST['date']) && isset($_POST['data_id'])) {

    $group_id = $_POST['group_id'];

    $date = $_POST['date'];

    $med_id = $_POST['data_id'];

    if ($group_id && $date && $med_id) {

      $q1 = "SELECT * from cc_queue where group_id = '$group_id'";

      if ($q1_run = $db->query($q1)) {

        if ($q1_run->num_rows) {

          if ($q1_fetch = $q1_run->fetch_assoc()) {

            $order = json_decode($q1_fetch['order_json']);

            foreach ($order as $key) {

              $arr = array();

              if ($med_id == $key->id) {

                $msg = "Medicine is already in order";

              }

              $arr['id'] = $key->id;

              $arr['mrp'] = $key->mrp;

              $arr['offer_mrp'] = $key->offer_mrp;

              $arr['vendor_mrp'] = 0;

              $arr['quantity'] = $key->quantity;

              array_push($array, $arr);

            }

            if ($msg != "Medicine is already in order") {

              $q2 = "SELECT * from med_info where id = '$med_id'";

              if ($q2_run = $db->query($q2)) {

                if ($q2_run->num_rows) {

                  if ($q2_fetch = $q2_run->fetch_assoc()) {

                    $arr = array();

                    $med_name = $q2_fetch['product_name'];

                    $arr['id'] = $q2_fetch['id'];

                    $arr['mrp'] = $q2_fetch['mrp'];

                    $arr['offer_mrp'] = $q2_fetch['offer_mrp'];

                    $arr['vendor_mrp'] = 0;

                    $arr['quantity'] = 1;

                    array_push($array, $arr);

                  }

                  $order_json = json_encode($array);

                  $q3 = "UPDATE cc_queue SET order_json = '$order_json' where group_id = '$group_id'";

                  $q4 = "UPDATE my_orders SET order_json = '$order_json' where group_id = '$group_id'";

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

                                  array_push($arr, "Medicine: $med_name and its Medicine ID: $med_id was added in customer order on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                }

                              }

                            }

                            $action_json = json_encode($arr);

                            $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                            if ($q6_run = $db->query($q6)) {

                              echo "Medicine Added Successfully";

                            }

                          }

                        }

                      }

                    }

                  }

                }

              }

            }
            else {

              echo $msg;

            }

          }

        }

      }

    }

  }

}
?>
