<?php
include 'connect.php';

session_start();

$status_array = array(
  "prescription_required_meds" => 0,
  "status" => '',
  'order_json' => ''
);

$array = array(
  'user_id' => '',
  'order_json' => '',
  'shipping_price' => 0
);

$order_name = "";

$order_phone = "";

$total_price = 0;

$array1 = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $query = "SELECT * from user_info where id = '$id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows == 1) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          $order_name = $query_fetch['firstname']." ".$query_fetch['lastname'];

          $order_phone = $query_fetch['phone_no'];

          $array['user_id'] = $id;

          $query = "SELECT * from cart where user_id = '$id'";

          if ($query_run = $db->query($query)) {

            if ($query_num_rows = $query_run->num_rows) {

              while ($query_fetch = $query_run->fetch_assoc()) {

                $quantity = $query_fetch['quantity'];

                $med_id = $query_fetch['med_id'];

                $q = "SELECT * from med_info where id = '$med_id'";

                if ($q_run = $db->query($q)) {

                  if ($q_run->num_rows) {

                    while ($q_fetch = $q_run->fetch_assoc()) {

                      if ($q_fetch['prescription_required'] == 'Yes') {

                        $status_array['prescription_required_meds'] = 1;

                      }

                      $arr = array();

                      $arr['id'] = $q_fetch['id'];

                      $arr['mrp'] = $q_fetch['mrp'];

                      $arr['offer_mrp'] = $q_fetch['offer_mrp'];

                      $arr['vendor_mrp'] = 0;

                      $arr['quantity'] = $quantity;

                      if ($q_fetch['offer_mrp']) {

                        $total_price += $q_fetch['offer_mrp'] * $quantity;

                      }
                      else {

                        $total_price += $q_fetch['mrp'] * $quantity;

                      }

                      array_push($array1, $arr);

                    }

                    if ($total_price > 250) {

                      $array['shipping_price'] = 0;

                    }
                    else {

                      $array['shipping_price'] = 100;

                    }

                    if (sizeof($array1)) {

                      $array['order_json'] = json_encode($array1);

                    }

                  }

                }
                else {

                  $status_array['status'] = "Something went wrong! Please try again later.";

                }

              }

              if ($array['user_id'] != '' && $array['order_json'] != '' && $order_name != "") {

                $u_id = $array['user_id'];

                $o_json = $array['order_json'];

                $shipping_price = $array['shipping_price'];

                $a_check_query = "SELECT * from orders where user_id = '$u_id'";

                if ($a_check_query_run = $db->query($a_check_query)) {

                  if ($a_check_query_run->num_rows) {

                    $update_query = "UPDATE orders SET order_json = '$o_json', shipping_price = '$shipping_price', order_name = '$order_name', order_phone = '$order_phone' where user_id = '$u_id'";

                    if ($update_query_run = $db->query($update_query)) {

                      $status_array['status'] = "Row Updated";

                    }

                  }
                  else {

                    $a = "INSERT INTO orders(user_id, order_json, shipping_price, order_name, order_phone) VALUES('$u_id', '$o_json', '$shipping_price', '$order_name', '$order_phone')";

                    if ($a_run = $db->query($a)) {

                      $status_array['status'] = "Row Inserted";

                    }

                  }

                }

              }

            }
            else {

              $query = "SELECT * from orders where user_id = '$id'";

              if ($query_run = $db->query($query)) {

                if ($query_run->num_rows) {

                  $query = "UPDATE orders SET order_json = '' where user_id = '$id'";

                  if ($query_run = $db->query($query)) {

                    $status_array['status'] = "Please insert some medicines in your cart";

                  }

                }
                else {

                  $status_array['status'] = "Please insert some medicines in your cart";

                }

              }

            }

          }
          else {

            $status_array['status'] = "Something went wrong! Please try again later.";

          }

        }

      }
      else {

        $status_array['status'] = "Something went wrong! Please try again later.";

      }

    }
    else {

      $status_array['status'] = "Something went wrong! Please try again later.";

    }

  }
  else {

    $status_array['status'] = "Something went wrong! Please try again later.";

  }

}
else {

  $status_array['status'] = "Something went wrong! Please try again later.";

}

echo json_encode($status_array);
?>
