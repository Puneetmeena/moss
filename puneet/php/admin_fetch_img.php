<?php
include 'connect.php';

session_start();

$array = array();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['user_id'])) {

      $user_id = $_POST['user_id'];

      if ($user_id) {

        $scan_dir = scandir("../img/rx_images/$user_id/");

        foreach ($scan_dir as $key) {

          if ($key != '.' && $key != '..') {

            array_push($array, "img/rx_images/$user_id/$key");

          }

        }

      }

    }

  }

}

echo json_encode($array);
?>
