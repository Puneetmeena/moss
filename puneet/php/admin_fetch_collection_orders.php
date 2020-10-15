<?php
include 'connect.php';

session_start();

$array = array(
  "meds_infos" => array(),
  "time_queue_json" => array(),
  "filter_start_date" => '',
  "filter_end_date" => '',
  "filter_order_by" => '',
  "filter_rpp" => 0
);

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['data'])) {

      $data_json = $_POST['data'];

      if ($data_json) {

        $data = json_decode($data_json);

        $array['filter_order_by'] = $data->filter_order_by;

        $array['filter_end_date'] = $data->filter_end_date;

        $array['filter_start_date'] = $data->filter_start_date;

        $array['filter_rpp'] = $data->filter_rpp;

        foreach ($data->info as $key) {

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
            "bill_number"=> '',
            "delivery_partner" => '',
            "time_queue" => '',
            "delivery_status" => '',
            "collection_status" => '',
            "deliver_date" => '',
            "collection_date" => '',
            "fe_name" => '',
            "fe_number" => ''
           );

          $id = $key->id;

          $q1 = "SELECT * from manage_queue where id = '$id' AND delivery_status = 'Delivered'";

          if ($q1_run = $db->query($q1)) {

            if ($q1_run->num_rows) {

              if ($q1_fetch = $q1_run->fetch_assoc()) {

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

                $arr['time_queue'] = $q1_fetch['time_queue'];

                $arr['delivery_status'] = $q1_fetch['delivery_status'];

                $arr['collection_status'] = $q1_fetch['collection_status'];

                $arr['collection_date'] = $q1_fetch['collection_date'];

                $arr['deliver_date'] = $q1_fetch['deliver_date'];

                $arr['fe_name'] = $q1_fetch['fe_name'];

                $arr['fe_number'] = $q1_fetch['fe_number'];

                $id = $arr['user_id'];

                $q3 = "SELECT * from user_info where id = '$id'";

                if ($q3_run = $db->query($q3)) {

                  if ($q3_run->num_rows) {

                    if ($q3_fetch = $q3_run->fetch_assoc()) {

                      $arr['name'] = $q3_fetch['firstname']." ". $q3_fetch['lastname'];

                      $arr['email'] = $q3_fetch['email'];

                    }

                  }

                }

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

              }

            }

          }

          array_push($array['meds_infos'], $arr);

        }

        $q2 = "SELECT * from manage_queue where delivery_status = 'Delivered'";

        if ($q2_run = $db->query($q2)) {

          if ($q2_run->num_rows) {

            while ($q2_fetch = $q2_run->fetch_assoc()) {

              array_push($array['time_queue_json'], $q2_fetch['time_queue']);

            }

          }

        }

        echo json_encode($array);

      }

    }

  }

}
?>
