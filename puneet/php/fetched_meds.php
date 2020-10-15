<?php

require 'connect.php';

session_start();

$array = array();

if (isset($_POST['med_name']) && isset($_POST['offset']) && isset($_POST['limit'])) {
  $med_name = $_POST['med_name'];
  $offset = $_POST['offset'];
  $limit = $_POST['limit'];

  if ($med_name && $limit) {

    if (isset($_SESSION['product_name'])) {
      $product_name = $_SESSION['product_name'];
    }
    else {
      $product_name = "abc";
    }

    if (substr($med_name, 0, 8) == "?search=") {

      $encoded_name = str_replace("?search=", "", $med_name);

      $med_name = $db->real_escape_string(urldecode($encoded_name));

    }

    $query = "SELECT * FROM med_info where product_name = '$med_name'";

    if ($query_run = $db->query($query)) {

      $query_num_rows = $query_run->num_rows;

      if ($query_num_rows) {

        if($query_fetch = $query_run->fetch_assoc()){

          array_push($array, json_encode($query_fetch));

          $_SESSION['product_name'] = $query_fetch['product_name'];

          $_SESSION['company_name'] = $query_fetch['company_name'];

          $_SESSION['composition'] = $query_fetch['composition'];

          $_SESSION['main_category'] = $query_fetch['main_category'];

        }

      }

    }

    if (isset($_SESSION['main_category']) && isset($_SESSION['product_name'])) {

      $main_category = $_SESSION['main_category'];

      $product_name = $_SESSION['product_name'];

      $product = explode(" ", $_SESSION['product_name']);

      $prod_name = $product[0];

      if ($main_category && $product_name) {

        $query = "SELECT * from med_info where product_name like '$prod_name%' AND product_name != '$product_name' LIMIT {$limit} OFFSET {$offset}";

        if ($query_run = $db->query($query)) {

          while ($query_fetch = $query_run->fetch_assoc()) {

            array_push($array, json_encode($query_fetch));

          }

        }

      }

    }

  }

}

if (isset($_POST['category']) && isset($_POST['offset']) && isset($_POST['limit'])) {

  $main_category = urldecode($_POST['category']);
  $offset = $_POST['offset'];
  $limit = $_POST['limit'];

  if ($main_category && $limit) {
    //$query = "SELECT * from med_info where main_category = '$main_category' LIMIT {$limit} OFFSET {$offset}";

    $query = "SELECT * from med_info where main_category = '$main_category'";

    if ($query_run = $db->query($query)) {

      while ($query_fetch = $query_run->fetch_assoc()) {

        array_push($array, json_encode($query_fetch));

      }

    }
  }

}

if (isset($_POST['sub_category']) && isset($_POST['offset']) && isset($_POST['limit'])) {

  $main_category = urldecode($_POST['sub_category']);
  $offset = $_POST['offset'];
  $limit = $_POST['limit'];

  if ($main_category && $limit) {
    //$query = "SELECT * from med_info where main_category = '$main_category' LIMIT {$limit} OFFSET {$offset}";

    $query = "SELECT * from med_info where sub_category = '$main_category' LIMIT $limit OFFSET $offset";

    if ($query_run = $db->query($query)) {

      while ($query_fetch = $query_run->fetch_assoc()) {

        array_push($array, json_encode($query_fetch));

      }

    }
  }

}

echo json_encode($array);
?>
