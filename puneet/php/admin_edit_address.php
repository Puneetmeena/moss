<?php
include 'connect.php';

session_start();

$array = array(
  'status' => 0,
  'json' => array()
);

$arr = array();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($id) {

    if (isset($_POST['address_id']) && isset($_POST['$user_id'])) {

      $address_id = $_POST['address_id'];

      $user_id = $_POST['user_id'];

      if ($address_id && $user_id) {

        $query = "SELECT * from user_address where id = '$address_id' AND user_id = '$user_id'";

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
