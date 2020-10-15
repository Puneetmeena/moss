<?php
include 'connect.php';

session_start();

$array = array(
  'status' => 0,
  'username' => ''
);

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    $query = "SELECT * from admin_users where id = '$admin_id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows == 1) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          $array['username'] = $query_fetch['username'];

          $array['status'] = 1;

        }

      }

    }

  }

}

echo json_encode($array);
?>
