<?php
include 'connect.php';

session_start();

$array = array(
  'status' => 0,
  'json' => array()
);

$arr = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_POST['address_id'])) {

      $address_id = $_POST['address_id'];

      if ($address_id) {

        $query = "SELECT * from user_address where id = '$address_id' AND user_id = '$id'";

        if ($query_run = $db->query($query)) {

          if ($query_run->num_rows) {

            if ($query_fetch = $query_run->fetch_assoc()) {

              array_push($array['json'], json_decode($query_fetch['address_json']));

              $array['status'] = 1;

            }

          }

        }

      }

    }

  }

}

echo json_encode($array);
?>
