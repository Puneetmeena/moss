<?php
include 'connect.php';

session_start();

$array = array(
  "login_status" => 0,
  "order_json" => '',
  "pres_req" => 0,
  "img" => '',
  "address_json" => '',
  "status" => 0
);

function orderJson($id, $db) {

  $query = "SELECT * from orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['order_json']) {

          return $query_fetch['order_json'];

        }

      }

    }

  }

}

function checkAddress($id, $db) {

  $query = "SELECT * from orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['address_json'] && $query_fetch['order_phone']) {

          $GLOBALS['array']['address_json'] = $query_fetch['address_json'];

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

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $array['login_status'] = 1;

    if (isset($_POST['data'])) {

      $data = $_POST['data'];

      if ($data) {

        if ($data == 'upload_prescription') {

          if (isset($_SESSION['upload_prescription'])) {

            if ($_SESSION['upload_prescription']) {

              $array['status'] = $_SESSION['upload_prescription'];

              $order_json = orderJson($id, $db);

              $array['order_json'] = $order_json;

            }

          }

        }
        elseif ($data == "order_summary") {

          if (isset($_SESSION['order_summary'])) {

            if ($_SESSION['order_summary']) {

              $array['status'] = $_SESSION['order_summary'];

              $order_json = orderJson($id, $db);

              $array['order_json'] = $order_json;

              $pres_req = check_prescription_meds($order_json, $db);

              if ($pres_req) {

                $array['pres_req'] = 1;

                checkImg($id, $db);

              }

            }

          }

        }
        elseif ($data == "payment") {

          if (isset($_SESSION['payment'])) {

            if ($_SESSION['payment']) {

              $array['status'] = $_SESSION['order_summary'];

              $order_json = orderJson($id, $db);

              $array['order_json'] = $order_json;

              $pres_req = check_prescription_meds($order_json, $db);

              if ($pres_req) {

                $array['pres_req'] = 1;

                checkImg($id, $db);

              }

              checkAddress($id, $db);

            }

          }

        }

      }

    }

  }

}

echo json_encode($array);
?>
