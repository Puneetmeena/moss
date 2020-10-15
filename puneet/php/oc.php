<?php
include 'connect.php';

session_start();

$check_user_json = false;

$check_prescription_meds = false;

$checkImg = false;

$insert_my_orders = false;

$insert_cc_queue = false;

$insert_packaging_queue = false;

$delete_cart = false;

$delete_orders = false;

function check_prescription_meds ($order_json, $db) {

  $orders = json_decode($order_json);

  foreach ($orders as $key) {

    $med_id = $key->id;

    $query = "SELECT * from med_info where id = '$med_id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          if ($query_fetch['prescription_required'] == "Yes") {

            return true;

          }

        }

      }

    }

  }

}

function check_user_json($id, $db) {

  $query = "SELECT * from orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['user_json']) {

          return true;

        }

      }

    }

  }

}

function checkImg ($id, $db) {

  $query = "SELECT * from user_info where id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['rx_img_dir_url']) {

          $scan_dir = scandir("../".$query_fetch['rx_img_dir_url']);

          if (sizeof($scan_dir) > 2) {

            $check_dir = scandir("../img/rx_check_img/");

            $j = 0;

            foreach ($check_dir as $key) {

              if ($id == $key) {

                $j++;

              }

            }

            if ($j == 0) {

              if (mkdir('../img/rx_check_img/'.$id.'/')) {

                $i = 0;

                foreach ($scan_dir as $key) {

                  if ($i > 2) {

                    copy("../".$query_fetch['rx_img_dir_url']."".$key, '../img/rx_check_img/'.$id.'/'.$key);

                  }

                  $i++;

                }

              }

            }
            else {

              $scan_fol = scandir("../img/rx_check_img/$id/");

              $i = 0;

              foreach ($scan_fol as $key) {

                $i++;

              }

              $i = $i - 2;

              $k = 0;

              foreach ($scan_fol as $key) {

                if ($k > 2) {

                  $i++;

                  $f_name = $i.".".pathinfo("../".$query_fetch['rx_img_dir_url']."".$key, PATHINFO_EXTENSION);

                  copy("../".$query_fetch['rx_img_dir_url']."".$key, '../img/rx_check_img/'.$id.'/'.$f_name);

                }

                $k++;

              }



            }

            return true;

          }

        }

      }

    }

  }

}

function insert_my_orders($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db) {

  $query = "INSERT INTO my_orders(order_id, user_id, order_json, user_json, shipping_price, order_name, order_phone, order_time) VALUES('$order_id', '$user_id', '$order_json', '$user_json', '$shipping_price', '$order_name', '$order_phone', '$date')";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

function insert_cc_queue($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db) {

  $query = "INSERT INTO cc_queue(order_id, user_id, order_json, user_json, shipping_price, order_name, order_phone, order_time) VALUES('$order_id', '$user_id', '$order_json', '$user_json', '$shipping_price', '$order_name', '$order_phone', '$date')";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

function insert_packaging_queue($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db) {

  $query = "INSERT INTO packaging_queue(order_id, user_id, order_json, user_json, shipping_price, order_name, order_phone, order_time) VALUES('$order_id', '$user_id', '$order_json', '$user_json', '$shipping_price', '$order_name', '$order_phone', '$order_time')";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

function delete_cart($id, $db) {

  $query = "DELETE FROM cart where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

function delete_orders($id, $db) {

  $query = "DELETE FROM orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_POST['date'])) {

      $date = $_POST['date'];

      if ($date) {

        $query = "SELECT * from orders where user_id = '$id'";

        if ($query_run = $db->query($query)) {

          if ($query_run->num_rows) {

            if ($query_fetch = $query_run->fetch_assoc()) {

              $order_id = $query_fetch['order_id'];

              $order_json = $query_fetch['order_json'];

              $user_id = $query_fetch['user_id'];

              $user_json = $query_fetch['user_json'];

              $shipping_price = $query_fetch['shipping_price'];

              $order_name = $query_fetch['order_name'];

              $order_phone = $query_fetch['order_phone'];

              $check_prescription_meds = check_prescription_meds($order_json, $db);

              $check_user_json = check_user_json($id, $db);

              if ($check_user_json) {

                if ($check_prescription_meds) {

                  $checkImg = checkImg($id, $db);

                  if ($checkImg) {

                    $insert_my_orders = insert_my_orders($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db);

                    $insert_cc_queue = insert_cc_queue($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db);

                    if ($insert_my_orders && $insert_cc_queue) {

                      $delete_cart = delete_cart($id, $db);

                      $delete_orders = delete_orders($id, $db);

                      if ($delete_cart && $delete_orders) {

                        if (isset($_COOKIE['cart_item'])) {

                          if ($_COOKIE['cart_item']) {

                            setcookie("cart_item", $cookie_json, time() - 1);

                          }

                        }

                        echo "Order Confirmed";

                      }

                    }

                  }

                }
                else {

                  $insert_my_orders = insert_my_orders($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db);

                  $insert_packaging_queue = insert_cc_queue($order_id, $user_id, $order_json, $user_json, $shipping_price, $order_name, $order_phone, $date, $db);

                  if ($insert_my_orders && $insert_packaging_queue) {

                    $delete_cart = delete_cart($id, $db);

                    $delete_orders = delete_orders($id, $db);

                    if ($delete_cart && $delete_orders) {

                      if (isset($_COOKIE['cart_item'])) {

                        if ($_COOKIE['cart_item']) {

                          setcookie("cart_item", $cookie_json, time() - 1);

                        }

                      }

                      echo "Order Confirmed";

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
