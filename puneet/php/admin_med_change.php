<?php
include 'connect.php';

session_start();

$total_price = 0;

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['med_id']) && isset($_POST['mode']) && isset($_POST['group_id']) && isset($_POST['date'])) {

      $group_id = $_POST['group_id'];

      $med_id = $_POST['med_id'];

      $mode = $_POST['mode'];

      $date = $_POST['date'];

      if ($med_id && $mode && $group_id && $date) {

        $q = "SELECT * from med_info where id = '$med_id'";

        if ($q_run = $db->query($q)) {

          if ($q_run->num_rows) {

            if ($q_fetch = $q_run->fetch_assoc()) {

              $med_name = $q_fetch['product_name'];

              if ($mode == "quantity_decrement") {

                $q1 = "SELECT * from cc_queue where group_id = '$group_id'";

                if ($q1_run = $db->query($q1)) {

                  if ($q1_run->num_rows) {

                    if ($q1_fetch = $q1_run->fetch_assoc()) {

                      if ($q1_fetch['order_json']) {

                        $order_decode = json_decode($q1_fetch['order_json']);

                        foreach ($order_decode as $key) {

                          if ($key->id == $med_id) {

                            if ($key->quantity > 1) {

                              $key->quantity -= 1;

                            }

                          }

                          if ($key->offer_mrp) {

                            $total_price += $key->offer_mrp * $key->quantity;

                          }
                          else {

                            $total_price += $key->mrp * $key->quantity;

                          }

                        }

                        $order_json = json_encode($order_decode);

                        $shipping_price = 0;

                        if ($total_price < 250) {

                          $shipping_price = 100;

                        }

                        $q2 = "UPDATE cc_queue SET order_json = '$order_json', shipping_price = '$shipping_price' where group_id = '$group_id'";

                        $q3 = "UPDATE my_orders SET order_json = '$order_json', shipping_price = '$shipping_price' where group_id = '$group_id'";

                        if ($q2_run = $db->query($q2)) {

                          if ($q3_run = $db->query($q3)) {

                            $q4 = "SELECT * from order_history where group_id = '$group_id'";

                            if ($q4_run = $db->query($q4)) {

                              if ($q4_run->num_rows) {

                                if ($q4_fetch = $q4_run->fetch_assoc()) {

                                  $action = json_decode($q4_fetch['action_json']);

                                  $arr = array();

                                  foreach ($action as $key) {

                                    array_push($arr, $key);

                                  }

                                  $q5 = "SELECT * from admin_users where id = '$admin_id'";

                                  if ($q5_run = $db->query($q5)) {

                                    if ($q5_run->num_rows) {

                                      if ($q5_fetch = $q5_run->fetch_assoc()) {

                                        $admin_email = $q5_fetch['email'];

                                        array_push($arr, "Quantity of $med_name was decremented by one on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                      }

                                    }

                                  }

                                  $action_json = json_encode($arr);

                                  $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                                  if ($q6_run = $db->query($q6)) {

                                    echo "Quantity Decremented";

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
              elseif ($mode == "quantity_increment") {

                $q1 = "SELECT * from cc_queue where group_id = '$group_id'";

                if ($q1_run = $db->query($q1)) {

                  if ($q1_run->num_rows) {

                    if ($q1_fetch = $q1_run->fetch_assoc()) {

                      if ($q1_fetch['order_json']) {

                        $order_decode = json_decode($q1_fetch['order_json']);

                        foreach ($order_decode as $key) {

                          if ($key->id == $med_id) {

                            if ($key->quantity < 10) {

                              $key->quantity += 1;

                            }

                          }

                          if ($key->offer_mrp) {

                            $total_price += $key->offer_mrp * $key->quantity;

                          }
                          else {

                            $total_price += $key->mrp * $key->quantity;

                          }

                        }

                        $order_json = json_encode($order_decode);

                        $shipping_price = 0;

                        if ($total_price < 250) {

                          $shipping_price = 100;

                        }

                        $q2 = "UPDATE cc_queue SET order_json = '$order_json', shipping_price = '$shipping_price' where group_id = '$group_id'";

                        $q3 = "UPDATE my_orders SET order_json = '$order_json', shipping_price = '$shipping_price' where group_id = '$group_id'";

                        if ($q2_run = $db->query($q2)) {

                          if ($q3_run = $db->query($q3)) {

                            $q4 = "SELECT * from order_history where group_id = '$group_id'";

                            if ($q4_run = $db->query($q4)) {

                              if ($q4_run->num_rows) {

                                if ($q4_fetch = $q4_run->fetch_assoc()) {

                                  $action = json_decode($q4_fetch['action_json']);

                                  $arr = array();

                                  foreach ($action as $key) {

                                    array_push($arr, $key);

                                  }

                                  $q5 = "SELECT * from admin_users where id = '$admin_id'";

                                  if ($q5_run = $db->query($q5)) {

                                    if ($q5_run->num_rows) {

                                      if ($q5_fetch = $q5_run->fetch_assoc()) {

                                        $admin_email = $q5_fetch['email'];

                                        array_push($arr, "Quantity of $med_name was incremented by one on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                      }

                                    }

                                  }

                                  $action_json = json_encode($arr);

                                  $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                                  if ($q6_run = $db->query($q6)) {

                                    echo "Quantity Incremented";

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
              elseif ($mode == "med_delete") {

                $q1 = "SELECT * from cc_queue where group_id = '$group_id'";

                $array1 = array();

                if ($q1_run = $db->query($q1)) {

                  if ($q1_run->num_rows) {

                    if ($q1_fetch = $q1_run->fetch_assoc()) {

                      if ($q1_fetch['order_json']) {

                        $order_decode = json_decode($q1_fetch['order_json']);

                        foreach ($order_decode as $key) {

                          $arr = array();

                          if ($key->id != $med_id) {

                            $arr['id'] = $key->id;

                            $arr['mrp'] = $key->mrp;

                            $arr['offer_mrp'] = $key->offer_mrp;

                            $arr['vendor_mrp'] = 0;

                            $arr['quantity'] = $key->quantity;

                            array_push($array1, $arr);

                          }

                        }

                        foreach ($array1 as $key) {

                          if ($key['offer_mrp']) {

                            $total_price += $key['offer_mrp'] * $key['quantity'];

                          }
                          else {

                            $total_price += $key['mrp'] * $key['quantity'];

                          }

                        }

                        $order_json = json_encode($array1);

                        $shipping_price = 0;

                        if ($total_price < 250) {

                          $shipping_price = 100;

                        }

                        $q2 = "UPDATE cc_queue SET order_json = '$order_json', shipping_price = '$shipping_price' where group_id = '$group_id'";

                        $q3 = "UPDATE my_orders SET order_json = '$order_json', shipping_price = '$shipping_price' where group_id = '$group_id'";

                        if ($q2_run = $db->query($q2)) {

                          if ($q3_run = $db->query($q3)) {

                            $q4 = "SELECT * from order_history where group_id = '$group_id'";

                            if ($q4_run = $db->query($q4)) {

                              if ($q4_run->num_rows) {

                                if ($q4_fetch = $q4_run->fetch_assoc()) {

                                  $action = json_decode($q4_fetch['action_json']);

                                  $arr = array();

                                  foreach ($action as $key) {

                                    array_push($arr, $key);

                                  }

                                  $q5 = "SELECT * from admin_users where id = '$admin_id'";

                                  if ($q5_run = $db->query($q5)) {

                                    if ($q5_run->num_rows) {

                                      if ($q5_fetch = $q5_run->fetch_assoc()) {

                                        $admin_email = $q5_fetch['email'];

                                        array_push($arr, "$med_name was deleted on $date by Admin-Email-ID: $admin_email and Admin-ID: $admin_id");

                                      }

                                    }

                                  }

                                  $action_json = json_encode($arr);

                                  $q6 = "UPDATE order_history SET action_json = '$action_json' where group_id = '$group_id'";

                                  if ($q6_run = $db->query($q6)) {

                                    echo "Medicine Deleted";

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
