<?php
include 'connect.php';

session_start();

function orderId()
{
  $chars = "0123456789";

  $order_id = "OD";

  $order_id_len = strlen($order_id);

  for ($i=0; $i < 16 ; $i++) {

    $order_id[ $order_id_len + $i ] = $chars[rand(0, strlen($chars) - 1)];

  }

  return $order_id;
}

$array = array(
  "user_id" => '',
  "order_id" => '',
  "order_json" => '',
  "user_json" => ''
);

$order_id = orderId();

$array1 = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $query = "SELECT * from user_info where id = '$id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows == 1) {

        $end = 1;

        if ($query_fetch = $query_run->fetch_assoc()) {

          $array['user_id'] = $id;

          $array['user_json'] = json_encode($query_fetch);

          for ($i=0; $i < $end; $i++) {

            $query = "SELECT * from orders where order_id = '$order_id'";

            if ($query_run = $db->query($query)) {

              if ($query_run->num_rows != 0) {

                $order_id = orderId();

                $end++;

              }

            }

          }

          $array['order_id'] = $order_id;

          $query = "SELECT * from cart where user_id = '$id'";

          if ($query_run = $db->query($query)) {

            if ($query_run->num_rows) {

              while ($query_fetch = $query_run->fetch_assoc()) {

                $quantity = $query_fetch['quantity'];

                $med_id = $query_fetch['med_id'];

                $q = "SELECT * from med_info where id = '$med_id'";

                if ($q_run = $db->query($q)) {

                  if ($q_run->num_rows) {

                    while ($q_fetch = $q_run->fetch_assoc()) {

                      $arr = array();

                      $arr['id'] = $q_fetch['id'];

                      $arr['mrp'] = $q_fetch['mrp'];

                      $arr['offer_mrp'] = $q_fetch['offer_mrp'];

                      $arr['quantity'] = $quantity;

                      array_push($array1, json_encode($arr));

                    }

                    if (sizeof($array1)) {

                      $array['order_json'] = json_encode($array1);

                    }

                  }

                }

              }

            }

          }

          if ($array['user_id'] != '' && $array['order_id'] != '' && $array['order_json'] != '' && $array['user_json'] != '') {

            $u_id = $array['user_id'];
            $o_id = $array['order_id'];
            $o_json = $array['order_json'];
            $u_json = $array['user_json'];

            $a = "INSERT INTO orders VALUES('', '$o_id', '$u_id', '$o_json', '$u_json')";

            //$a = "SELECT * from orders";

            //echo $a;

            if ($a_run = $db->query($a)) {

              echo "Row Inserted";

              //echo $a_run->num_rows;

            }

          }

        }

      }

    }

  }

}

//echo json_encode($array);
?>
