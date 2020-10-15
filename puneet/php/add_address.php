<?php
include 'connect.php';

session_start();

$array = array();

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_POST['full_name']) &&
        isset($_POST['address_line1']) &&
        isset($_POST['address_line2']) &&
        isset($_POST['city']) &&
        isset($_POST['region']) &&
        isset($_POST['postal_code']) &&
        isset($_POST['phone']) &&
        isset($_POST['country']) &&
        isset($_POST['mode'])) {

      $full_name = $_POST['full_name'];
      $address_line1 = $_POST['address_line1'];
      $address_line2 = $_POST['address_line2'];
      $city = $_POST['city'];
      $region = $_POST['region'];
      $postal_code = $_POST['postal_code'];
      $phone = $_POST['phone'];
      $country = $_POST['country'];
      $mode = $_POST['mode'];

      if ($full_name && $address_line1 && $address_line2 &&
          $city && $region && $postal_code && $phone && $country) {

        if ($mode == "Add Address") {

          if ($query_run = $db->query("SELECT * from user_address where user_id = '$id'")) {

            $query_num_rows = $query_run->num_rows;

            if ($query_num_rows < 5) {

              $address_json = json_encode($_POST);

              $query = "INSERT INTO user_address (user_id, address_json, name, phone) VALUES ('$id', '$address_json', '$full_name', '$phone')";

              if ($query_run = $db->query($query)) {

                echo "Row Inserted";

              }

            }

          }

        }
        elseif ($mode == "Update Address") {

          if (isset($_POST['address_id'])) {

            $address_id = $_POST['address_id'];

            if ($address_id) {

              $address_json = json_encode($_POST);

              $check = "SELECT * from user_address where id = '$address_id'";

              if ($check_run = $db->query($check)) {

                if($check_run->num_rows) {

                  $query = "UPDATE user_address SET address_json = '$address_json', name = '$full_name', phone = '$phone' where id = '$address_id'";

                  if ($query_run = $db->query($query)) {

                    echo "Row Updated";

                  }

                }

              }

            }

          }

        }

         /*$query = "UPDATE orders SET order_name = '$full_name' where user_id = '$id'";

         if ($query_run = $db->query($query)) {

           $array['address_line1'] = $address_line1;

           $array['address_line2'] = $address_line2;

           $array['city'] = $city;

           $array['region'] = $region;

           $array['postal_code'] = $postal_code;

           $array['country'] = $country;

           $address = json_encode($array);

           $query = "UPDATE user_info SET address_json = '$address', phone_no = '$phone' where id = '$id'";

           if ($query_run = $db->query($query)) {

             $q = "SELECT * from user_info where id = '$id'";

             if ($q_run = $db->query($q)) {

               if ($q_run->num_rows) {

                 if ($q_fetch = $q_run->fetch_assoc()) {

                   $user_json = json_decode($q_fetch['address_json']);

                   $arr = $q_fetch;

                   $arr['address_json'] = $user_json;

                   $user_json = json_encode($arr);

                   $q_update = "UPDATE orders SET user_json = '$user_json' where user_id = '$id'";

                   if ($q_update_run = $db->query($q_update)) {

                     echo "Row Updated";

                   }

                 }

               }

             }

           }

         }

      }*/

    }

  }

}

}
?>
