<?php
include 'connect.php';

session_start();

$array = array(
  "admin_status" => 0,
  "total_address" => 0,
  "json" => array()
);

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['user_id'])) {

      $user_id = $_POST['user_id'];

      if ($user_id) {

        $query = "SELECT * from user_address where user_id = '$user_id'";

        if ($query_run = $db->query($query)) {

          if ($query_run->num_rows) {

            $array['total_address'] = $query_run->num_rows;

            if ($query_run->num_rows) {

              $array['admin_status'] = 1;

              while ($query_fetch = $query_run->fetch_assoc()) {

                $arr['id'] = $query_fetch['id'];

                $arr['user_id'] = $user_id;

                $arr['address_json'] = json_decode($query_fetch['address_json']);

                $arr['name'] = $query_fetch['name'];

                $arr['phone'] = $query_fetch['phone'];

                array_push($array['json'], $arr);

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
