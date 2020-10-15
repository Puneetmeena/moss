<?php
include 'connect.php';

$array = array();

if (isset($_POST['data_type'])) {

  $data_type = $_POST['data_type'];

  if ($data_type) {

    $query = "SELECT * from med_info where main_category = '$data_type' AND image_url != '' LIMIT 25";

    if ($query_run = $db->query($query)) {

      while ($query_fetch = $query_run->fetch_assoc()) {

        array_push($array, json_encode($query_fetch));

      }

    }

  }
}

echo json_encode($array);
?>
