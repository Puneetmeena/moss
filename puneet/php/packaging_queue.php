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

          if (isset($_POST['id'])) {

            $packaging_id = $_POST['id'];

            if ($packaging_id) {

              $array = array(
                "status" => 0,
                "cc_total_items" => 0,
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
                "time_queue_json" => array()
               );

              $query = "SELECT * from packaging_queue where id = '$packaging_id'";

              if ($query_run = $db->query($query)) {

                if ($query_run->num_rows) {

                  if ($query_fetch = $query_run->fetch_assoc()) {

                    $array['order_id'] = $query_fetch['order_id'];

                    $array['group_id'] = $query_fetch['group_id'];

                    $array['user_id'] = $query_fetch['user_id'];

                    $array['order_json'] = json_decode($query_fetch['order_json']);

                    $array['user_json'] = json_decode($query_fetch['user_json']);

                    $array['address_json'] = json_decode($query_fetch['address_json']);

                    $array['shipping_price'] = $query_fetch['shipping_price'];

                    $array['order_name'] = $query_fetch['order_name'];

                    $array['order_phone'] = $query_fetch['order_phone'];

                    $array['order_time'] = $query_fetch['order_time'];

                    $array['doctor_name'] = $query_fetch['doctor_name'];

                    $array['patient_name'] = $query_fetch['patient_name'];

                    $array['split_time'] = $query_fetch['split_time'];

                    $q1 = "SELECT * from packaging_queue";

                    if ($q1_run = $db->query($q1)) {

                      if ($q1_run->num_rows) {

                        while ($q1_fetch = $q1_run->fetch_assoc()) {

                          array_push($array['time_queue_json'], $q1_fetch['time_queue']);

                        }

                      }

                    }

                    $id = $array['user_id'];

                    $q = "SELECT * from user_info where id = '$id'";

                    if ($q_run = $db->query($q)) {

                      if ($q_run->num_rows) {

                        if ($q_fetch = $q_run->fetch_assoc()) {

                          $array['name'] = $q_fetch['firstname']." ". $q_fetch['lastname'];

                          $array['email'] = $q_fetch['email'];

                        }

                      }

                    }

                    $order_json_decode = json_decode($query_fetch['order_json']);

                    foreach ($order_json_decode as $key) {

                      $med_id = $key->id;

                      $q = "SELECT * from med_info where id = '$med_id'";

                      if ($q_run = $db->query($q)) {

                        if ($q_run->num_rows) {

                          if ($q_fetch = $q_run->fetch_assoc()) {

                            $q_fetch['offer_mrp'] = $key->offer_mrp;

                            $q_fetch['mrp'] = $key->mrp;

                            $q_fetch['quantity'] = $key->quantity;

                            array_push($array['med_info'], $q_fetch);

                          }

                        }

                      }

                    }

                    $query = "SELECT * from packaging_queue";

                    if ($query_run = $db->query($query)) {

                      $array['packaging_queue_total_items'] = $query_run->num_rows;

                    }

                    $query = "SELECT * from cc_queue";

                    if ($query_run = $db->query($query)) {

                      $array['cc_total_items'] = $query_run->num_rows;

                    }

                    $array['status'] = 1;

                  }

                }

              }

              echo json_encode($array);

            }

          }

        }
        elseif ($mode == "filtered") {

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
            "cc_total_items"=> 0
          );

          $q = "SELECT * from packaging_queue";

          if ($q_run = $db->query($q)) {

            $array['total_items'] = $q_run->num_rows;

            $q = "SELECT * from cc_queue";

            if ($q_run = $db->query($q)) {

              $array['cc_total_items'] = $q_run->num_rows;

            }

          }

          if (isset($_SESSION['filter_order_id'])) {

            $filter_order_id = $_SESSION['filter_order_id'];

            if ($filter_order_id) {

              $array['filter_order_id'] = $filter_order_id;

              $q1 = "SELECT * from packaging_queue where order_id = '$filter_order_id' OR group_id = '$filter_order_id'";

              if ($q1_run = $db->query($q1)) {

                if ($q1_run->num_rows) {

                  if ($q1_fetch = $q1_run->fetch_assoc()) {

                    if ($q1_fetch['status'] == 'Available') {

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

                  $q = "SELECT * from packaging_queue where status = 'Available'";

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

                $q = "SELECT * from packaging_queue where status = 'Available'";

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

                  $q = "SELECT * from packaging_queue where status = 'Available'";

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

                $q = "SELECT * from packaging_queue where status = 'Available'";

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

                $q = "SELECT * from packaging_queue where order_phone = '$filter_phone_number' AND status = 'Available' LIMIT $filter_rpp";

                if ($q_run = $db->query($q)) {

                  if ($q_run->num_rows) {

                    while ($q_fetch = $q_run->fetch_assoc()) {

                      array_push($array['info'], $q_fetch);

                    }

                  }

                }

              }

            }
            else {

              $q = "SELECT * from packaging_queue where order_phone = '$filter_phone_number' AND status = 'Available'";

              if ($q_run = $db->query($q)) {

                if ($q_run->num_rows) {

                  while ($q_fetch = $q_run->fetch_assoc()) {

                    array_push($array['info'], $q_fetch);

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

            $q = "SELECT * from packaging_queue where status = 'Available'";

            if ($q_run = $db->query($q)) {

              if ($q_run->num_rows) {

                while ($q_fetch = $q_run->fetch_assoc()) {

                  array_push($array['info'], $q_fetch);

                }

              }

            }

          }
          elseif (isset($_SESSION['filter_rpp'])) {

            $filter_rpp = $_SESSION['filter_rpp'];

            if ($filter_rpp) {

              $array['filter_rpp'] = $filter_rpp;

              $q1 = "SELECT * from packaging_queue where status = 'Available' LIMIT $filter_rpp";

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

      }

    }

  }

}
?>
