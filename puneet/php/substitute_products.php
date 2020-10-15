<?php
include 'connect.php';

$array = array();

if (isset($_POST['composition']) && isset($_POST['id'])) {

  $id = $_POST['id'];

  $composition = $_POST['composition'];

  if ($composition) {

    $query = "SELECT * from med_info where composition = '$composition' AND id != '$id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        while ($query_fetch = $query_run->fetch_assoc()) {

            array_push($array, json_encode($query_fetch));

        }

      }

    }

  }

}

echo json_encode($array);
?>
