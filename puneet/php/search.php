<?php
include 'connect.php';

$array = array();

if (isset($_POST['med_name'])) {
  $med_name = $db->real_escape_string($_POST['med_name']);

  if ($med_name) {

    $query = "SELECT * from med_info where product_name like '$med_name%' LIMIT 4";

    if ($query_run = $db->query($query)) {

      if ($query_num_rows = $query_run->num_rows) {

        while ($query_fetch = $query_run->fetch_assoc()) {

          array_push($array, json_encode($query_fetch));
        }

        echo json_encode($array);

      }
      else {

        echo "No results";

      }

    }

  }

}
?>
