<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['vendor_mrp']) && isset($_POST['group_id']) && isset($_POST['med_id']) && isset($_POST['date'])) {

      $vendor_mrp = $_POST['vendor_mrp'];

      $group_id = $_POST['group_id'];

      $med_id = $_POST['med_id'];

      $date = $_POST['date'];

      $med_name = '';

      if ($vendor_mrp && $group_id && $med_id && $date) {

        $q = "SELECT * from med_info where id = '$med_id'";

        if ($q_run = $db->query($q)) {

          if ($q_run->num_rows) {

            if ($q_fetch = $q_run->fetch_assoc()) {

              $med_name = $q_fetch['product_name'];

            }

          }

        }

        $q1 = "SELECT * from packaging_queue where group_id = '$group_id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            if ($q1_fetch = $q1_run->fetch_assoc()) {

              if ($q1_fetch['order_json']) {

                $order = json_decode($q1_fetch['order_json']);

                foreach ($order as $key) {

                  if ($med_id == $key->id) {

                    $key->vendor_mrp = $vendor_mrp;

                    break;

                  }

                }

                $order_json = json_encode($order);

                $q2 = "UPDATE packaging_queue SET order_json = '$order_json' where group_id='$group_id'";

                $q = "UPDATE my_orders SET order_json = '$order_json' where group_id='$group_id'";

                if ($q_run = $db->query($q)) {
                  
                }

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

                              array_push($arr, "Vendor MRP: Rs. $vendor_mrp of medicine: $med_name (Med-Id: $med_id) was added on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                            }

                          }

                        }

                        $action_json = json_encode($arr);

                        $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                        if ($q6_run = $db->query($q6)) {

                          echo $order_json;

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
