<?php
include 'connect.php';

session_start();

$array = array();

if (isset($_SESSION['id']) && isset($_POST['id'])) {

  $id = $_SESSION['id'];

  $med_id = $_POST['id'];

  if ($id && $med_id) {

    $query = "DELETE from cart where med_id = '$med_id' AND user_id = '$id'";

    if ($query_run = $db->query($query)) {

      echo "bravo";

    }

  }

}
else if (isset($_POST['id'])) {

  $id = $_POST['id'];

  if ($id) {

    if (isset($_COOKIE['cart_item'])) {

      $cookie_json = $_COOKIE['cart_item'];

      if ($cookie_json) {

        $cart_item = json_decode($cookie_json);

        $i = 0;

        foreach ($cart_item as $key) {

          if ($key->id != $id) {

            array_push($array, $key);

          }

        }

        $cookie_json = json_encode($array);

        setcookie("cart_item", $cookie_json, time() + (10 * 365 * 24 * 60 * 60));

        echo $cookie_json;

      }

    }
    else {

      echo "Something's not right Please try again!";

    }

  }

}

?>
