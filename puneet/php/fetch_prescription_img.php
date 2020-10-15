<?php
session_start();

$array = array(
  "login_status" => 0,
  "images" => ''
);

$arr = array();

$arr2 = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $array['login_status'] = 1;

    $scan_dir = scandir("../img/rx_images/$id/");

    foreach ($scan_dir as $key) {

      array_push($arr, "img/rx_images/$id/$key");

    }

    unset($arr[0]);

    unset($arr[1]);

    if (sizeof($arr)) {

      foreach ($arr as $key) {

        array_push($arr2, $key);

      }

      if (sizeof($arr2)) {

        $array['images'] = json_encode($arr2);

      }

    }

  }

}

echo json_encode($array);;
?>
