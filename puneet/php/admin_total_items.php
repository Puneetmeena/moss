<?php
include 'connect.php';

session_start();

$array = array(
  'cc_queue_items' => 0,
  'packaging_queue_items' => 0,
  'shipping_queue_items' => 0,
  'manage_queue_items' => 0,
  'collection_queue_items' => 0
);

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    $q1 = "SELECT * from cc_queue";

    $q2 = "SELECT * from packaging_queue";

    $q3 = "SELECT * from shipping_queue";

    $q4 = "SELECT * from manage_queue where delivery_status = ''";

    $q5 = "SELECT * from manage_queue where delivery_status = 'Delivered' AND collection_status = ''";

    if ($q1_run = $db->query($q1)) {

      $array['cc_queue_items'] = $q1_run->num_rows;

    }

    if ($q2_run = $db->query($q2)) {

      $array['packaging_queue_items'] = $q2_run->num_rows;

    }

    if ($q3_run = $db->query($q3)) {

      $array['shipping_queue_items'] = $q3_run->num_rows;

    }

    if ($q4_run = $db->query($q4)) {

      $array['manage_queue_items'] = $q4_run->num_rows;

    }

    if ($q5_run = $db->query($q5)) {

      $array['collection_queue_items'] = $q5_run->num_rows;

    }

  }

}

echo json_encode($array);
?>
