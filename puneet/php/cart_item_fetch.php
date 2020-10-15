<?php
include 'connect.php';

session_start();

$array = array(
  'login_status' => 0,
  'total_items' => 0
);

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_COOKIE['cart_item'])) {

      $cookie_json = $_COOKIE['cart_item'];

      if ($cookie_json) {

        $cookie_array = json_decode($cookie_json);

        $query = "SELECT * from cart where user_id = '$id'";

        if ($query_run = $db->query($query)) {

          $query_num_rows = $query_run->num_rows;

          if ($query_num_rows) {

            $j = 0;

            foreach ($cookie_array as $key) {

              $med_id = $key->id;

              $quantity = $key->quantity;

              $query = "SELECT * from cart where user_id = '$id' AND med_id='$med_id'";

              if ($query_run = $db->query($query)) {

                if ($query_run->num_rows == 0) {

                  $query = "INSERT INTO cart VALUES('', '$med_id', '$id', '$quantity')";

                  if ($query_run = $db->query($query)) {

                    #inserting items

                    $j++;

                  }

                }

              }

            }

            $array['login_status'] = 1;

            $q = "SELECT * from cart where user_id = '$id'";

            if ($q_run = $db->query($q)) {

              $array['total_items'] = $q_run->num_rows;

            }

            echo json_encode($array);

          }
          else {

            foreach ($cookie_array as $key) {

              $med_id = $key->id;

              $quantity = $key->quantity;

              $query = "INSERT INTO cart VALUES('', '$med_id', '$id', '$quantity')";

              if ($query_run = $db->query($query)) {

                #inserting items

              }

            }

            $array['login_status'] = 1;

            $array['total_items'] = sizeof($cookie_array);

            echo json_encode($array);

          }

        }

      }

    }
    else {

      $query = "SELECT * from cart where user_id = '$id'";

      if ($query_run = $db->query($query)) {

        $query_num_rows = $query_run->num_rows;

      }

      $array['login_status'] = 1;

      $array['total_items'] = $query_num_rows;

      echo json_encode($array);

    }

  }

}
elseif (isset($_COOKIE['cart_item'])) {

  $cart_items_json = $_COOKIE['cart_item'];

  if ($cart_items_json) {

    $cookie_array = json_decode($cart_items_json);

    $array['login_status'] = 0;

    $array['total_items'] = sizeof($cookie_array);

    echo json_encode($array);

  }
  else {

    echo "no data";

  }

}

else {

  echo "no data";

}

?>
