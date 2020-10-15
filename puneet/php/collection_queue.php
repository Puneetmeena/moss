<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['mode'])) {

      $mode = $_POST['mode'];

      if ($mode) {

        if ($mode == 'no filter') {

          $arr = array(
            "info" => array(),
            "time_queue_json" => array()
          );

          $q1 = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = '' LIMIT 10";

          if ($q1_run = $db->query($q1)) {

            if ($q1_run->num_rows) {

              while ($q1_fetch = $q1_run->fetch_assoc()) {

                $array = array(
                  "name" => '',
                  "email" => '',
                  "order_id" => '',
                  "group_id" => '',
                  "user_id" => '',
                  "order_json" => '',
                  "user_json" => '',
                  "shipping_price" => '',
                  "order_name" => '',
                  "order_phone" => '',
                  "order_time" => '',
                  "images" => '',
                  "med_info" => array(),
                  "doctor_name" => '',
                  "patient_name" => '',
                  "split_time" => '',
                  "delivery_partner" => '',
                  "bill_number" => '',
                  "time_queue_json" => array(),
                  "deliver_date" => '',
                  "time_queue" => '',
                  "delivery_status" => '',
                  "collection_status" => '',
                  "collection_date" => '',
                  "fe_name" => '',
                  "fe_number" => ''
                 );

                 $array['order_id'] = $q1_fetch['order_id'];

                 $array['group_id'] = $q1_fetch['group_id'];

                 $array['user_id'] = $q1_fetch['user_id'];

                 $array['order_json'] = json_decode($q1_fetch['order_json']);

                 $array['user_json'] = json_decode($q1_fetch['user_json']);

                 $array['address_json'] = json_decode($q1_fetch['address_json']);

                 $array['shipping_price'] = $q1_fetch['shipping_price'];

                 $array['order_name'] = $q1_fetch['order_name'];

                 $array['order_phone'] = $q1_fetch['order_phone'];

                 $array['order_time'] = $q1_fetch['order_time'];

                 $array['doctor_name'] = $q1_fetch['doctor_name'];

                 $array['patient_name'] = $q1_fetch['patient_name'];

                 $array['split_time'] = $q1_fetch['split_time'];

                 $array['bill_number'] = $q1_fetch['bill_number'];

                 $array['delivery_partner'] = $q1_fetch['delivery_partner'];

                 $array['deliver_date'] = $q1_fetch['deliver_date'];

                 $array['time_queue'] = $q1_fetch['time_queue'];

                 $array['delivery_status'] = $q1_fetch['delivery_status'];

                 $array['collection_status'] = $q1_fetch['collection_status'];

                 $array['collection_date'] = $q1_fetch['collection_date'];

                 $array['fe_name'] = $q1_fetch['fe_name'];

                 $array['fe_number'] = $q1_fetch['fe_number'];

                 $id = $array['user_id'];

                 $q2 = "SELECT * from user_info where id = '$id'";

                 if ($q2_run = $db->query($q2)) {

                   if ($q2_run->num_rows) {

                     if ($q2_fetch = $q2_run->fetch_assoc()) {

                       $array['name'] = $q2_fetch['firstname']." ". $q2_fetch['lastname'];

                       $array['email'] = $q2_fetch['email'];

                     }

                   }

                 }

                 $order_json_decode = json_decode($q1_fetch['order_json']);

                 foreach ($order_json_decode as $key) {

                   $med_id = $key->id;

                   $q = "SELECT * from med_info where id = '$med_id'";

                   if ($q_run = $db->query($q)) {

                     if ($q_run->num_rows) {

                       if ($q_fetch = $q_run->fetch_assoc()) {

                         $q_fetch['offer_mrp'] = $key->offer_mrp;

                         $q_fetch['mrp'] = $key->mrp;

                         $q_fetch['quantity'] = $key->quantity;

                         $q_fetch['vendor_mrp'] = $key->vendor_mrp;

                         array_push($array['med_info'], $q_fetch);

                       }

                     }

                   }

                 }

                 array_push($arr['info'], $array);

              }

              $q2 = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = ''";

              if ($q2_run = $db->query($q2)) {

                if ($q2_run->num_rows) {

                  while ($q2_fetch = $q2_run->fetch_assoc()) {

                    array_push($arr['time_queue_json'], $q2_fetch['time_queue']);

                  }

                }

              }

            }

            echo json_encode($arr);

          }

        }
        elseif ($mode == "search_filter") {

          $array = array(
            "info" => array(),
            "filter_order_id" => 0,
            "filter_email" => 0,
            "filter_start_date" => 0,
            "filter_end_date" => 0,
            "filter_order_by" => 0,
            "filter_city" => 0,
            "filter_phone_number" => 0,
            "filter_rpp" => 0,
            "total_items" => 0,
            "cc_total_items"=> 0,
            "log" => ''
          );

          if (isset($_SESSION['filter_order_id'])) {

            $filter_order_id = $_SESSION['filter_order_id'];

            if ($filter_order_id) {

              $array['filter_order_id'] = $filter_order_id;

              $q1 = "SELECT * from manage_queue where (order_id = '$filter_order_id' OR group_id = '$filter_order_id') AND delivery_status = 'Delivered'";

              if ($q1_run = $db->query($q1)) {

                if ($q1_run->num_rows) {

                  if ($q1_fetch = $q1_run->fetch_assoc()) {

                    if ($q1_fetch['collection_status'] == "") {

                      $arr = array();

                      //$arr[''] = $q1_fetch['id'];

                      array_push($array['info'], $q1_fetch);

                    }

                  }

                }

              }

            }

          }
          elseif (isset($_SESSION['filter_email'])) {

            $filter_email = $_SESSION['filter_email'];

            if ($filter_email) {

              $array['filter_email'] = $filter_email;

              if (isset($_SESSION['filter_start_date'])) {

                $filter_start_date = $_SESSION['filter_start_date'];

                if ($filter_start_date) {

                  $array['filter_start_date'] = $filter_start_date;

                }

              }
              if (isset($_SESSION['filter_end_date'])) {

                $filter_end_date = $_SESSION['filter_end_date'];

                if ($filter_end_date) {

                  $array['filter_end_date'] = $filter_end_date;

                }

              }
              if (isset($_SESSION['filter_order_by'])) {

                $filter_order_by = $_SESSION['filter_order_by'];

                if ($filter_order_by) {

                  $array['filter_order_by'] = $filter_order_by;

                }

              }

              if (isset($_SESSION['filter_rpp'])) {

                $filter_rpp = $_SESSION['filter_rpp'];

                if ($filter_rpp) {

                  $array['filter_rpp'] = $filter_rpp;

                  $q = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = ''";

                  if ($q_run = $db->query($q)) {

                    if ($q_run->num_rows) {

                      while ($q_fetch = $q_run->fetch_assoc()) {

                        if ($q_fetch['user_json']) {

                          $address = json_decode($q_fetch['user_json']);

                          if ($filter_rpp) {

                            if (strtolower($address->email) == $filter_email) {

                              array_push($array['info'], $q_fetch);

                              $filter_rpp--;

                            }

                          }

                        }

                      }

                    }

                  }

                }

              }
              else {

                $q = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = ''";

                if ($q_run = $db->query($q)) {

                  if ($q_run->num_rows) {

                    while ($q_fetch = $q_run->fetch_assoc()) {

                      if ($q_fetch['user_json']) {

                        $address = json_decode($q_fetch['user_json']);

                        if (strtolower($address->email) == $filter_email) {

                          array_push($array['info'], $q_fetch);

                        }

                      }

                    }

                  }

                }

              }

            }

          }
          elseif (isset($_SESSION['filter_city'])) {

            $f_city = $_SESSION['filter_city'];

            if ($f_city) {

              $filter_city = strtolower($f_city);

              $array['filter_city'] = $filter_city;

              if (isset($_SESSION['filter_start_date'])) {

                $filter_start_date = $_SESSION['filter_start_date'];

                if ($filter_start_date) {

                  $array['filter_start_date'] = $filter_start_date;

                }

              }
              if (isset($_SESSION['filter_end_date'])) {

                $filter_end_date = $_SESSION['filter_end_date'];

                if ($filter_end_date) {

                  $array['filter_end_date'] = $filter_end_date;

                }

              }
              if (isset($_SESSION['filter_order_by'])) {

                $filter_order_by = $_SESSION['filter_order_by'];

                if ($filter_order_by) {

                  $array['filter_order_by'] = $filter_order_by;

                }

              }

              if (isset($_SESSION['filter_rpp'])) {

                $filter_rpp = $_SESSION['filter_rpp'];

                if ($filter_rpp) {

                  $array['filter_rpp'] = $filter_rpp;

                  $q = "SELECT * from manage_queue where delivery_status = 'Delivered'  AND collection_status = ''";

                  if ($q_run = $db->query($q)) {

                    if ($q_run->num_rows) {

                      while ($q_fetch = $q_run->fetch_assoc()) {

                        if ($q_fetch['address_json']) {

                          $address = json_decode($q_fetch['address_json']);

                          if ($filter_rpp) {

                            if (strtolower($address->city) == $filter_city) {

                              array_push($array['info'], $q_fetch);

                              $filter_rpp--;

                            }

                          }

                        }

                      }

                    }

                  }

                }

              }
              else {

                $q = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = ''";

                if ($q_run = $db->query($q)) {

                  if ($q_run->num_rows) {

                    while ($q_fetch = $q_run->fetch_assoc()) {

                      if ($q_fetch['address_json']) {

                        $address = json_decode($q_fetch['address_json']);

                        if (strtolower($address->city) == $filter_city) {

                          array_push($array['info'], $q_fetch);

                        }

                      }

                    }

                  }

                }

              }

            }

          }
          elseif (isset($_SESSION['filter_phone_number'])) {

            $filter_phone_number = $_SESSION['filter_phone_number'];

            if (isset($_SESSION['filter_start_date'])) {

              $filter_start_date = $_SESSION['filter_start_date'];

              if ($filter_start_date) {

                $array['filter_start_date'] = $filter_start_date;

              }

            }
            if (isset($_SESSION['filter_end_date'])) {

              $filter_end_date = $_SESSION['filter_end_date'];

              if ($filter_end_date) {

                $array['filter_end_date'] = $filter_end_date;

              }

            }
            if (isset($_SESSION['filter_order_by'])) {

              $filter_order_by = $_SESSION['filter_order_by'];

              if ($filter_order_by) {

                $array['filter_order_by'] = $filter_order_by;

              }

            }

            if (isset($_SESSION['filter_rpp'])) {

              $filter_rpp = $_SESSION['filter_rpp'];

              if ($filter_rpp) {

                $q = "SELECT * from manage_queue where order_phone = '$filter_phone_number' AND delivery_status = 'Delivered' LIMIT $filter_rpp";

                if ($q_run = $db->query($q)) {

                  if ($q_run->num_rows) {

                    while ($q_fetch = $q_run->fetch_assoc()) {

                      if ($q_fetch['collection_status'] == "") {

                        array_push($array['info'], $q_fetch);

                      }

                    }

                  }

                }

              }

            }
            else {

              $q = "SELECT * from manage_queue where order_phone = '$filter_phone_number' AND delivery_status = 'Delivered'";

              if ($q_run = $db->query($q)) {

                if ($q_run->num_rows) {

                  while ($q_fetch = $q_run->fetch_assoc()) {

                    if ($q_fetch['collection_status'] == "") {

                      array_push($array['info'], $q_fetch);

                    }

                  }

                }

              }

            }

          }
          elseif (isset($_SESSION['filter_start_date']) && isset($_SESSION['filter_end_date']) && isset($_SESSION['filter_order_by'])) {

            $filter_start_date = $_SESSION['filter_start_date'];

            $filter_end_date = $_SESSION['filter_end_date'];

            $filter_order_by = $_SESSION['filter_order_by'];

            if ($filter_start_date && $filter_end_date && $filter_order_by) {

              $array['filter_start_date'] = $filter_start_date;

              $array['filter_end_date'] = $filter_end_date;

              $array['filter_order_by'] = $filter_order_by;

            }

            if (isset($_SESSION['filter_rpp'])) {

              $filter_rpp = $_SESSION['filter_rpp'];

              if ($filter_rpp) {

                $array['filter_rpp'] = $filter_rpp;

              }

            }

            $q = "SELECT * from manage_queue where delivery_status = 'Delivered'";

            if ($q_run = $db->query($q)) {

              if ($q_run->num_rows) {

                while ($q_fetch = $q_run->fetch_assoc()) {

                  if ($q_fetch['collection_status'] == "") {

                    array_push($array['info'], $q_fetch);

                  }

                }

              }

            }

          }
          elseif (isset($_SESSION['filter_rpp'])) {

            $filter_rpp = $_SESSION['filter_rpp'];

            if ($filter_rpp) {

              $array['filter_rpp'] = $filter_rpp;

              $q1 = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = '' LIMIT $filter_rpp";

              if ($q1_run = $db->query($q1)) {

                if ($q1_run->num_rows) {

                  while ($q1_fetch = $q1_run->fetch_assoc()) {

                    $arr = array();

                    //$arr[''] = $q1_fetch['id'];

                    array_push($array['info'], $q1_fetch);

                  }

                }

              }

            }

          }
          echo json_encode($array);

        }
        elseif ($mode == "selection_filter") {

          if (isset($_SESSION['status'])) {

            $status = $_SESSION['status'];

            if ($status) {

              $array = array(
                "info"=> array(),
                "status"=> ''
              );

              $q1 = '';

              if ($status == "Out For Delivery") {

                $array['status'] = 'ofd';

                $q1 = "SELECT * from manage_queue where delivery_status = ''";

              }
              elseif ($status == "Delivered") {

                $array['status'] = 'delivered';

                $q1 = "SELECT * from manage_queue where delivery_status = '$status' AND collection_status = ''";

              }
              elseif ($status == "Not Delivered") {

                $array['status'] = 'not-delivered';

                $q1 = "SELECT * from manage_queue where delivery_status = 'Not Delivered'";

              }
              elseif ($status == "Collected") {

                $array['status'] = 'collected';

                $q1 = "SELECT * from manage_queue where collection_status = '$status'";

              }
              elseif ($status == "Not Collected") {

                $array['status'] = 'not-collected';

                $q1 = "SELECT * from manage_queue where collection_status = '$status'";

              }
              elseif ($status == "Not Updated Yet") {

                $array['status'] = 'not-updated-yet';

                $q1 = "SELECT * from manage_queue where collection_status = '' AND delivery_status = 'Delivered'";

              }

              if ($q1_run = $db->query($q1)) {

                if ($q1_run->num_rows) {

                  while ($q1_fetch = $q1_run->fetch_assoc()) {

                    $arr = array(
                      "name" => '',
                      "email" => '',
                      "order_id" => '',
                      "group_id" => '',
                      "user_id" => '',
                      "order_json" => '',
                      "user_json" => '',
                      "shipping_price" => '',
                      "order_name" => '',
                      "order_phone" => '',
                      "order_time" => '',
                      "images" => '',
                      "med_info" => array(),
                      "doctor_name" => '',
                      "patient_name" => '',
                      "split_time" => '',
                      "delivery_partner" => '',
                      "bill_number" => '',
                      "time_queue_json" => array(),
                      "deliver_date" => '',
                      "time_queue" => '',
                      "delivery_status" => '',
                      "collection_status" => '',
                      "collection_date" => '',
                      "fe_name" => '',
                      "fe_number" => ''
                     );

                     $arr['order_id'] = $q1_fetch['order_id'];

                     $arr['group_id'] = $q1_fetch['group_id'];

                     $arr['user_id'] = $q1_fetch['user_id'];

                     $arr['order_json'] = json_decode($q1_fetch['order_json']);

                     $arr['user_json'] = json_decode($q1_fetch['user_json']);

                     $arr['address_json'] = json_decode($q1_fetch['address_json']);

                     $arr['shipping_price'] = $q1_fetch['shipping_price'];

                     $arr['order_name'] = $q1_fetch['order_name'];

                     $arr['order_phone'] = $q1_fetch['order_phone'];

                     $arr['order_time'] = $q1_fetch['order_time'];

                     $arr['doctor_name'] = $q1_fetch['doctor_name'];

                     $arr['patient_name'] = $q1_fetch['patient_name'];

                     $arr['split_time'] = $q1_fetch['split_time'];

                     $arr['bill_number'] = $q1_fetch['bill_number'];

                     $arr['delivery_partner'] = $q1_fetch['delivery_partner'];

                     $arr['deliver_date'] = $q1_fetch['deliver_date'];

                     $arr['time_queue'] = $q1_fetch['time_queue'];

                     $arr['delivery_status'] = $q1_fetch['delivery_status'];

                     $arr['collection_status'] = $q1_fetch['collection_status'];

                     $arr['collection_date'] = $q1_fetch['collection_date'];

                     $arr['fe_name'] = $q1_fetch['fe_name'];

                     $arr['fe_number'] = $q1_fetch['fe_number'];


                    $order_json_decode = json_decode($q1_fetch['order_json']);

                    foreach ($order_json_decode as $key) {

                      $med_id = $key->id;

                      $q = "SELECT * from med_info where id = '$med_id'";

                      if ($q_run = $db->query($q)) {

                        if ($q_run->num_rows) {

                          if ($q_fetch = $q_run->fetch_assoc()) {

                            $q_fetch['offer_mrp'] = $key->offer_mrp;

                            $q_fetch['mrp'] = $key->mrp;

                            $q_fetch['quantity'] = $key->quantity;

                            $q_fetch['vendor_mrp'] = $key->vendor_mrp;

                            array_push($arr['med_info'], $q_fetch);

                          }

                        }

                      }

                    }

                    array_push($arr, $q1_fetch);

                    array_push($array['info'], $arr);

                  }

                }

              }

              echo json_encode($array);

            }

          }

        }

      }

    }

  }

}
?>
