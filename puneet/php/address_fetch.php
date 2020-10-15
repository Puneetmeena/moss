<?php
include 'connect.php';

session_start();

$array = array(
  "total_address" => 0,
  "json" => array()
);

$arr = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $query = "SELECT * from user_address where user_id = '$id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        $array['total_address'] = $query_run->num_rows;

        while ($query_fetch = $query_run->fetch_assoc()) {

          $arr['id'] = $query_fetch['id'];

          $arr['user_id'] = $id;

          $arr['address_json'] = json_decode($query_fetch['address_json']);

          $arr['name'] = $query_fetch['name'];

          $arr['phone'] = $query_fetch['phone'];

          array_push($array['json'], $arr);

        }

      }

    }

  }

}

echo json_encode($array);
?>
