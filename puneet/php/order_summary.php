<?php
include 'connect.php';

session_start();

$array = array(
  "orders" => '',
  "sub_total" => 0,
  "shipping" => 0,
  'total_price' => 0
);

$shipping_price = 0;

$total_price = 0;

$array1 = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $query = "SELECT * from orders where user_id = '$id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          $shipping_price = $query_fetch['shipping_price'];

          $array['shipping'] = $shipping_price;

          $order_json = $query_fetch['order_json'];

          $orders = json_decode($order_json);

          foreach ($orders as $key) {

            $arr = array();

            $med_id = $key->id;

            $quantity = $key->quantity;

            $mrp = $key->mrp;

            $offer_mrp = $key->offer_mrp;

            $query = "SELECT * from med_info where id = '$med_id'";

            if ($query_run = $db->query($query)) {

              if ($query_run->num_rows) {

                if ($query_fetch = $query_run->fetch_assoc()) {

                  $arr['product_name'] = $query_fetch['product_name'];

                  $arr['company_name'] = $query_fetch['company_name'];

                  $arr['mrp'] = $query_fetch['mrp'];

                  $arr['offer_mrp'] = $offer_mrp;

                  $arr['quantity'] = $quantity;

                  if ($offer_mrp) {

                    $arr['total'] = $offer_mrp * $quantity;

                  }
                  else {

                    $arr['total'] = $mrp * $quantity;

                  }

                  $total_price += $arr['total'];

                  array_push($array1, $arr);

                }

              }

            }

          }

          $array['orders'] = $array1;

          $array['sub_total'] = $total_price;

          $total_price += $shipping_price;

          $array['total_price'] = $total_price;

        }

      }

    }

  }

}

echo json_encode($array);
?>
