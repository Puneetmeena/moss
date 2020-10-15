<?php
include 'connect.php';

session_start();

$array = array(
  "status" => 0,
  "meds_infos" => array()
);

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $q1 = "SELECT * from my_orders where user_id = '$id' order by id desc";

    if ($q1_run = $db->query($q1)) {

      if ($q1_run->num_rows) {

        $array['status'] = 1;

        while ($q1_fetch = $q1_run->fetch_assoc()) {

          $arr = array(
            "order_id" => '',
            "group_id" => '',
            "user_id" => '',
            "order_json" => '',
            "user_json" => '',
            "shipping_price" => 0,
            "order_name" => '',
            "order_phone" => '',
            "order_time" => '',
            "doctor_name" => '',
            "patient_name" => '',
            "status" => '',
            "med_info" => array(),
            "deliver_date" => ''
          );

          $arr['order_id'] = $q1_fetch['order_id'];
          $arr['group_id'] = $q1_fetch['group_id'];
          $arr['user_id'] = $q1_fetch['user_id'];
          $arr['order_json'] = json_decode($q1_fetch['order_json']);
          $arr['user_json'] = json_decode($q1_fetch['user_json']);
          $arr['shipping_price'] =$q1_fetch['shipping_price'];
          $arr['order_name'] = $q1_fetch['order_name'];
          $arr['order_phone'] = $q1_fetch['order_phone'];
          $arr['order_time'] = $q1_fetch['order_time'];
          $arr['doctor_name'] = $q1_fetch['doctor_name'];
          $arr['patient_name'] = $q1_fetch['patient_name'];
          $arr['status'] = $q1_fetch['status'];
          $arr['deliver_date'] = $q1_fetch['deliver_date'];

          $order_json_decode = json_decode($q1_fetch['order_json']);

          foreach ($order_json_decode as $key) {

            $med_id = $key->id;

            $q4 = "SELECT * from med_info where id = '$med_id'";

            if ($q4_run = $db->query($q4)) {

              if ($q4_run->num_rows) {

                if ($q4_fetch = $q4_run->fetch_assoc()) {

                  $q4_fetch['offer_mrp'] = $key->offer_mrp;

                  $q4_fetch['mrp'] = $key->mrp;

                  $q4_fetch['quantity'] = $key->quantity;

                  $q4_fetch['vendor_mrp'] = $key->vendor_mrp;

                  array_push($arr['med_info'], $q4_fetch);

                }

              }

            }

          }

          array_push($array['meds_infos'], $arr);

        }

        echo json_encode($array);

      }

    }

  }

}
?>
