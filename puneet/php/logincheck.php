<?php
include 'connect.php';

session_start();

$array = array(
  'status' => 0,
  'username' => '',
  'pres_req' => 0
);

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $query = "SELECT * from user_info where id = '$id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows == 1) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          $array['status'] = 1;

          $array['username'] = $query_fetch['username'];

          $query = "SELECT * from cart where user_id = '$id'";

          if ($query_run = $db->query($query)) {

            if ($query_run->num_rows) {

              while ($query_fetch = $query_run->fetch_assoc()) {

                $med_id = $query_fetch['med_id'];

                $q = "SELECT * from med_info where id = '$med_id'";

                if ($q_run = $db->query($q)) {

                  if ($q_fetch = $q_run->fetch_assoc()) {

                    if ($q_fetch['prescription_required'] == "Yes") {

                      $array['pres_req'] = 1;

                      break;

                    }

                  }

                }

              }

            }

          }

        }

      }

    }

  }

}
else {
  if (isset($_COOKIE['cart_item'])) {

    $cookie_json = $_COOKIE['cart_item'];

    if ($cookie_json) {

      $cart_items = json_decode($cookie_json);

      foreach ($cart_items as $key) {

        $id = $key->id;

        $query = "SELECT * from med_info where id = '$id'";

        if ($query_run = $db->query($query)) {

          if ($query_run->num_rows) {

            while ($query_fetch = $query_run->fetch_assoc()) {

              if ($query_fetch['prescription_required'] == "Yes") {

                $array['pres_req'] = 1;

                break;

              }

            }

          }

        }

      }

    }

  }

}

echo json_encode($array);
?>
