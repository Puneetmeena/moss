<?php
include 'connect.php';

session_start();

$array = array(
  "status" => 0,
  "total_items" => 0,
  "name" => '',
  "email" => '',
  "order_id" => '',
  "user_history" => array(),
  "group_id" => '',
  "user_id" => '',
  "order_json" => '',
  "user_json" => '',
  "shipping_price" => '',
  "order_name" => '',
  "order_phone" => '',
  "order_time" => '',
  "remarks_json" => array(),
  "images" => '',
  "med_info" => array(),
  "order_history" => array(),
  "doctor_name" => '',
  "patient_name" => '',
  "prescription_confirmed" => 0,
  "split_time" => ''
);

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['id'])) {

      $cc_id = $_POST['id'];

      if ($cc_id) {

        $query = "SELECT * from cc_queue";

        if ($query_run = $db->query($query)) {

          $array['total_items'] = $query_run->num_rows;

          $query = "SELECT * from cc_queue where id = '$cc_id'";

          if ($query_run = $db->query($query)) {

            if ($query_run->num_rows == 1) {

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

                if ($query_fetch['remarks_json']) {
                  $array['remarks_json'] = json_decode($query_fetch['remarks_json']);
                }
                else {
                  $array['remarks_json'] = '';
                }

                $array['img_date_json'] = json_decode($query_fetch['img_date_json']);

                $array['order_time'] = $query_fetch['order_time'];

                $array['doctor_name'] = $query_fetch['doctor_name'];

                $array['patient_name'] = $query_fetch['patient_name'];

                $array['prescription_confirmed'] = $query_fetch['prescription_confirmed'];

                $array['split_time'] = $query_fetch['split_time'];

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

                $group_id = $array['group_id'];

                $q_history = "SELECT * from order_history where group_id = '$group_id'";

                if ($q_history_run = $db->query($q_history)) {

                  if ($q_history_run->num_rows) {

                    if ($q_history_fetch = $q_history_run->fetch_assoc()) {

                      if ($q_history_fetch['action_json']) {

                        $action_json = json_decode($q_history_fetch['action_json']);

                        array_push($array['order_history'], $action_json);

                      }

                    }

                  }

                }

                $query = "SELECT * from packaging_queue";

                if ($query_run = $db->query($query)) {

                  $array['packaging_queue_total_items'] = $query_run->num_rows;

                }

                $user_id = $array['user_id'];

                $query = "SELECT * from my_orders where user_id = '$user_id'";

                if ($query_run = $db->query($query)) {

                  $arr = array(
                    "order_placed" => 0,
                    "order_delivered" => 0
                  );

                  $arr['order_placed'] = $query_run->num_rows;

                  $i = 0;

                  while ($query_fetch = $query_run->fetch_assoc()) {

                    if ($query_fetch['status'] == "Delivered") {

                      $i++;

                    }

                  }

                  $arr['order_delivered'] = $i;

                  array_push($array['user_history'], $arr);

                }

                /*$img_path = "img/rx_check_img/".$array['group_id']."/";

                $scan_dir = "../".$img_path;*/

                /*foreach ($scan_dir as $key) {

                  if ($key != '.' && $key != '..') {

                    //$arr

                  }

                }*/

                $array['status'] = 1;

              }

            }

          }

        }

      }

    }

  }

}

$_SESSION['test'] = json_encode($array);

echo json_encode($array);
?>
