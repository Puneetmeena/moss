<?php
include 'connect.php';

session_start();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_POST['address_id'])) {

      $address_id = $_POST['address_id'];

      if ($address_id) {

        $query = "DELETE FROM user_address where id = '$address_id' AND user_id = '$id'";

        if ($query_run = $db->query($query)) {

          echo "Deleted";

        }

      }

    }

  }

}
?>
