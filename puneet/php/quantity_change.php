<?php
include 'connect.php';

session_start();

if (isset($_SESSION['id']) && isset($_POST['type']) && isset($_POST['id'])) {

  $quantity = 0;

  $id = $_SESSION['id'];

  $type = $_POST['type'];

  $med_id = $_POST['id'];

  if ($id && $type && $med_id) {

    $query = "SELECT * from cart where user_id = '$id' AND med_id = '$med_id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          $quantity = $query_fetch['quantity'];

          if ($type == 'inc') {

            if ($quantity < 10) {

              $quantity++;

              $query = "UPDATE cart SET quantity = '$quantity' where med_id = '$med_id' AND user_id = '$id'";

            }
            else {

              $query = "UPDATE cart SET quantity = '$quantity' where med_id = '$med_id' AND user_id = '$id'";

            }

          }
          else {

            if ($quantity > 1) {

              $quantity--;

              $query = "UPDATE cart SET quantity = '$quantity' where med_id = '$med_id' AND user_id = '$id'";

            }
            else {

              $query = "UPDATE cart SET quantity = '$quantity' where med_id = '$med_id' AND user_id = '$id'";

            }

          }

        }

      }

    }

    if ($query_run = $db->query($query)) {

      echo "bravo";

    }

  }

}
elseif (isset($_POST['id']) && isset($_POST['type'])) {

  //$quantity = $_POST['quantity'];

  $id = $_POST['id'];

  $type = $_POST['type'];

  if ($id && $type) {

    if (isset($_COOKIE['cart_item'])) {

      $cart_items_json = $_COOKIE['cart_item'];

      if ($cart_items_json) {

        $cart_items = json_decode($cart_items_json);

        foreach ($cart_items as $key) {

          if ($key->id == $id) {

            if ($type == 'inc') {

              if ($key->quantity < 10) {

                $key->quantity = $key->quantity + 1;

              }

            }
            else {

              if ($key->quantity > 1) {

                $key->quantity = $key->quantity - 1;

              }

            }

          }

        }

        $cookie_json = json_encode($cart_items);

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
