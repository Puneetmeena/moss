<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['group_id']) && isset($_POST['date']) && isset($_POST['delivery_partners'])) {

      $group_id = $_POST['group_id'];

      $date = $_POST['date'];

      $delivery_partners = $_POST['delivery_partners'];

      if ($group_id && $date && $delivery_partners) {

        $q1 = "SELECT * from packaging_queue where group_id = '$group_id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            $q2 = "UPDATE packaging_queue SET delivery_partner = '$delivery_partners' where group_id = '$group_id'";

            if ($q2_run = $db->query($q2)) {

              $q3 = "SELECT * from packaging_queue where group_id = '$group_id'";

              if ($q3_run = $db->query($q3)) {

                if ($q3_fetch = $q3_run->fetch_assoc()) {

                  if ($q3_fetch['bill_number']) {

                    $q4 = "UPDATE my_orders SET status = 'shipping_queue' where group_id = '$group_id'";

                    if ($q4_run = $db->query($q4)) {

                      //view history

                    }

                    $order_id = $q3_fetch['order_id'];

                    $group_id = $q3_fetch['group_id'];

                    $user_id = $q3_fetch['user_id'];

                    $order_json = $q3_fetch['order_json'];

                    $user_json = $q3_fetch['user_json'];

                    $address_json = $q3_fetch['address_json'];

                    $shipping_price = $q3_fetch['shipping_price'];

                    $order_name = $q3_fetch['order_name'];

                    $order_phone = $q3_fetch['order_phone'];

                    $img_date_json = $q3_fetch['img_date_json'];

                    $order_time = $q3_fetch['order_time'];

                    $doctor_name = $q3_fetch['doctor_name'];

                    $patient_name = $q3_fetch['patient_name'];

                    $cc_remarks_json = $q3_fetch['cc_remarks_json'];

                    $prescription_confirmed = $q3_fetch['prescription_confirmed'];

                    $split_time = $q3_fetch['split_time'];

                    $time_queue = $date;

                    $bill_number = $q3_fetch['bill_number'];

                    $delivery_partners = $q3_fetch['delivery_partner'];

                    $q4 = "INSERT INTO shipping_queue (order_id, group_id, user_id, order_json, user_json, address_json, shipping_price, order_name, order_phone, img_date_json, order_time, doctor_name, patient_name, cc_remarks_json, prescription_confirmed, split_time, time_queue, bill_number, delivery_partner) Values('$order_id', '$group_id', '$user_id', '$order_json', '$user_json', '$address_json', '$shipping_price', '$order_name', '$order_phone', '$img_date_json', '$order_time', '$doctor_name', '$patient_name', '$cc_remarks_json', '$prescription_confirmed', '$split_time', '$time_queue', '$bill_number', '$delivery_partners')";

                    if ($q4_run = $db->query($q4)) {

                      $q5 = "DELETE from packaging_queue where group_id = '$group_id'";

                      if ($q5_run = $db->query($q5)) {

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

                                    array_push($arr, "Order moved from Packaging queue to Shipping queue on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                  }

                                }

                              }

                              $action_json = json_encode($arr);

                              $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                              if ($q6_run = $db->query($q6)) {

                                echo "Moved Successfully";

                              }

                            }

                          }

                        }

                      }

                    }

                  }
                  else {

                    echo "Please add bill number";

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
