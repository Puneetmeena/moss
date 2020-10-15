<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['mode'])) {

      $mode = $_POST['mode'];

      if ($mode == "search_filter") {

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

            $q1 = "SELECT * from my_orders where order_id = '$filter_order_id' OR group_id = '$filter_order_id'";

            if ($q1_run = $db->query($q1)) {

              if ($q1_run->num_rows) {

                if ($q1_fetch = $q1_run->fetch_assoc()) {

                  $arr = array();

                  //$arr[''] = $q1_fetch['id'];

                  array_push($array['info'], $q1_fetch);

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

                $q = "SELECT * from my_orders";

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

              $q = "SELECT * from my_orders";

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

                $q = "SELECT * from my_orders";

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

              $q = "SELECT * from my_orders";

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

              $q = "SELECT * from my_orders where order_phone = '$filter_phone_number' LIMIT $filter_rpp";

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

            $q = "SELECT * from my_orders where order_phone = '$filter_phone_number'";

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

          $q = "SELECT * from my_orders";

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

            $q1 = "SELECT * from my_orders LIMIT $filter_rpp";

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
?>
