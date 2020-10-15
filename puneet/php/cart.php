<?php
  include 'connect.php';

  session_start();

  $array = array();

  $check = 0;

  if (isset($_SESSION['id'])) {

    $id = $_SESSION['id'];

    if ($id) {

      $q = "SELECT * from cart where user_id = '$id'";

      if ($q_run = $db->query($q)) {

        $q_num_rows = $q_run->num_rows;

        if ($q_num_rows) {

          while ($q_fetch = $q_run->fetch_assoc()) {

            $med_id = $q_fetch['med_id'];

            $query = "SELECT * from med_info where id = '$med_id'";

            if ($query_run = $db->query($query)) {

              if ($query_run->num_rows) {

                if ($query_fetch1 = $query_run->fetch_assoc()) {

                  $query_fetch1['quantity'] = $q_fetch['quantity'];

                  $query_json = json_encode($query_fetch1);

                  array_push($array, $query_json);

                }

              }

            }

          }

        }

      }

    }

  }
  elseif (isset($_COOKIE['cart_item'])) {

    $_SESSION['cart_item'] = $_COOKIE['cart_item'];

    $cookie_json = $_COOKIE['cart_item'];

    if ($cookie_json) {

      $cart_items = json_decode($cookie_json);

      foreach ($cart_items as $cart_item) {

        $id = $cart_item->id;

        $query = "SELECT * from med_info where id = '$id'";

        if ($query_run = $db->query($query)) {

          $query_num_rows = $query_run->num_rows;

          if ($query_num_rows == 1) {

            if ($query_fetch = $query_run->fetch_assoc()) {

              $query_fetch['quantity'] = $cart_item->quantity;

              $query_json = json_encode($query_fetch);

              $_SESSION['query_json'] = $query_json;

              array_push($array, $query_json);

            }

          }

        }

      }

    }

  }

  echo json_encode($array);
?>
