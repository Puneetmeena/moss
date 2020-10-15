<?php
include 'connect.php';

session_start();

$array = array(
  "status" => '',
  "cart_items" => '',
  "total_items" => 0,
);

if (isset($_SESSION['id']) && isset($_POST['med_id'])) {

  $id = $_SESSION['id'];

  $med_id = $_POST['med_id'];

  if ($id && $med_id) {

    $query = "SELECT * from cart where user_id = '$id'";

    if ($query_run = $db->query($query)) {

      $query_num_rows = $query_run->num_rows;

      if ($query_num_rows) {

        $i = 0;

        while ($query_fetch = $query_run->fetch_assoc()) {

          if ($med_id == $query_fetch['med_id']) {

            break;

          }

          $i++;

        }

        if ($i == $query_num_rows) {

          /*if (isset($_SESSION['cart_items'])) {

            $session_array = $_SESSION['cart_items'];

            array_push($session_array, array('id' => $med_id, 'quantity' => 1));

          }
          else {


          }*/

          $query = "INSERT into cart VALUES ('', '$med_id', '$id', '1')";

          if ($query_run = $db->query($query)) {

            $array['status'] = "item added in your cart";

            $array['total_items'] = $query_num_rows + 1;

          }

        }
        else {

          $array['status'] = "Item is already in cart";

          $array['total_items'] = $query_num_rows;

        }

      }
      else {

        $query = "INSERT into cart VALUES ('', '$med_id', '$id', '1')";

        if ($query_run = $db->query($query)) {

          $array['status'] = "item added in your cart";

          $array['total_items'] = 1;

        }

      }

    }

  }

}
elseif (isset($_POST['med_id'])) {

  $id = $_POST['med_id'];

  if ($id) {

    $query = "SELECT * from med_info where id = '$id'";

    if ($query_run = $db->query($query)) {

      $query_num_rows = $query_run->num_rows;

      if ($query_num_rows == 1) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          if (isset($_COOKIE['cart_item'])) {

            $cookie_json = $_COOKIE['cart_item'];

            $cookie_array = json_decode($cookie_json);

            $i = 0;

            for ($i=0; $i < sizeof($cookie_array); $i++) {

              if ($cookie_array[$i]->id == $id) {

                //echo "Loop: Item is already in cart";

                $array['status'] = "Item is already in cart";

                $array['cart_items'] = $_COOKIE['cart_item'];

                break;

              }

            }

            if ($i == sizeof($cookie_array)) {

              array_push($cookie_array, array('id' => $query_fetch['id'], 'quantity' => 1));

              $cookie_json = json_encode($cookie_array);

              setcookie("cart_item", $cookie_json, time() + (10 * 365 * 24 * 60 * 60));

              //echo "item added in your cart";

              $array['status'] = "item added in your cart";

              $array['cart_items'] = $cookie_json;

            }

          }
          else {

            $cookie_json = json_encode(array(array('id' => $id, 'quantity' => 1)));

            setcookie("cart_item", $cookie_json, time() + (10 * 365 * 24 * 60 * 60));

            //echo "item added in your cart";

            $array['status'] = "item added in your cart";

            $array['cart_items'] = $cookie_json;

          }

        }
        else {

          echo "fetch empty";

        }

      }
      else {

        echo "item not exist";

      }

    }
    else {

        echo "query prob";

    }

  }

}

echo json_encode($array);
?>
