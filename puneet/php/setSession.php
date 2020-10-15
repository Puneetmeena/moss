<?php
include 'connect.php';

session_start();

$array = array(
  "login_status" => 0,
  "status" => '',
  "order_json" => '',
  "pres_req" => 0,
  "img" => '',
  "address_json" => ''
);

$arr = array();

function orderJson($id, $db) {

  $query = "SELECT * from orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['order_json']) {

          $GLOBALS['array']['order_json'] = $query_fetch['order_json'];

          return $query_fetch['order_json'];
        }

      }

    }

  }

}

function check_prescription_meds ($order_json, $db) {

  $orders = json_decode($order_json);

  foreach ($orders as $key) {

    $med_id = $key->id;

    $query = "SELECT * from med_info where id = '$med_id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          if ($query_fetch['prescription_required'] == "Yes") {

            return true;

          }

        }

      }

    }

  }

}

function insert_user_json ($id, $db) {

  $query = "SELECT * from orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    if($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if (!$query_fetch['user_json']) {

          $q = "SELECT * from user_info where id = '$id'";

          if ($q_run = $db->query($q)) {

            if ($q_run->num_rows) {

              if ($q_fetch = $q_run->fetch_assoc()) {

                $arr['id'] = $id;

                $arr['firstname'] = $q_fetch['firstname'];

                $arr['lastname'] = $q_fetch['lastname'];

                $arr['email'] = $q_fetch['email'];

                $arr['username'] = $q_fetch['username'];

                $arr['password'] = $q_fetch['password'];

                /*$arr['address_json'] = json_decode($q_fetch['address_json']);

                $arr['phone_no'] = $q_fetch['phone_no'];*/

                $arr['rx_img_dir_url'] = $q_fetch['rx_img_dir_url'];

                $user_json = json_encode($arr);

                $q_update = "UPDATE orders SET user_json = '$user_json' where user_id = '$id'";

                if ($q_update_run = $db->query($q_update)) {
                  //hallelujah!
                }

              }

            }

          }

        }

      }

    }

  }

}

function checkImg ($id, $db) {

  $query = "SELECT * from user_info where id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['rx_img_dir_url']) {

          $scan_dir = scandir("../".$query_fetch['rx_img_dir_url']);

          if (sizeof($scan_dir) > 2) {

            $GLOBALS['array']['img'] = $query_fetch['rx_img_dir_url'];

          }

        }

      }

    }

  }

}

function insert_Address($address_id, $id, $db) {

  $query = "SELECT * from user_address where id = '$address_id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['address_json'] && $query_fetch['phone'] && $query_fetch['user_id'] && $query_fetch['name']) {

          $user_id = $query_fetch['user_id'];

          $name = $query_fetch['name'];

          $phone = $query_fetch['phone'];

          $address_json = $query_fetch['address_json'];

          $q_update = "UPDATE orders SET address_json = '$address_json', order_name = '$name', order_phone = '$phone' where user_id = '$id'";

          if ($q_update_run = $db->query($q_update)) {

            $GLOBALS['array']['address_json'] = $query_fetch['address_json'];

          }

        }

      }

    }

  }

}

function insert_img_date($id, $db, $img) {

  $img_array = array();

  $img2_arr = array(
    'img_name' => '',
    'img_date' => ''
  );

  $query = "SELECT * from user_info where id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_fetch = $query_run->fetch_assoc()) {

      if ($query_fetch['img_date_json']) {

        $img_date = json_decode($query_fetch['img_date_json']);

        foreach ($img_date as $key1) {

          foreach ($img as $key2) {

            $img_name = str_replace("img/rx_images/$id/", "", $key2);

            if ($img_name == $key1->img_name) {

              $img2_arr['img_name'] = $key1->img_name;

              $img2_arr['img_date'] = $key1->img_date;

              array_push($img_array, $img2_arr);

            }

          }

        }

        $img_date_json = json_encode($img_array);

        $q_update = "UPDATE orders SET img_date_json = '$img_date_json' where user_id = '$id'";

        if ($q_update_run = $db->query($q_update)) {

          //successfully updated

        }

      }

    }

  }

}

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $array['login_status'] = 1;

    if (isset($_POST['pg'])) {

      $pg = $_POST['pg'];

      if ($pg) {

        if ($pg == "cart") {

          $order_json = orderJson($id, $db);

          $check = check_prescription_meds($order_json, $db);

          if ($check) {

            $_SESSION['upload_prescription'] = 1;

            $array['pres_req'] = 1;

            $array['status'] = "All Set";

          }
          else {

            $_SESSION['order_summary'] = 1;

            $array['status'] = "All Set";

          }

        }
        elseif ($pg == "upload_prescription") {

          if (isset($_POST['img'])) {

            $img = json_decode($_POST['img']);

            if ($img) {

              orderJson($id, $db);

              checkImg($id, $db);

              insert_img_date($id, $db, $img);

              $_SESSION['order_summary'] = 1;

              $array['status'] = "All Set";

            }

          }

        }
        elseif ($pg == "order_summary") {

          if (isset($_POST['address_id'])) {

            $address_id = $_POST['address_id'];

            if ($address_id) {

              insert_Address($address_id, $id, $db);

            }

          }

          insert_user_json($id, $db);

          orderJson($id, $db);

          checkImg($id, $db);

          //insert_img_date($id, $db);

          $_SESSION['payment'] = 1;

          $array['status'] = "All Set";

        }

      }

    }

  }

}

echo json_encode($array);
?>
