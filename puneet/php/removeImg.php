<?php
include 'connect.php';

session_start();

$array = array(
  "login_status" => 0,
  "status" => ''
);

$a = array();

$arr = array(
  "img_name" => '',
  "img_date" => ''
);

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    $array['login_status'] = 1;

    if (isset($_POST['img_name'])) {

      $img_name = $_POST['img_name'];

      $img_f_name = str_replace("img/rx_images/$id/", "", $img_name);

      if (unlink("../$img_name")) {

        $query = "SELECT * from orders where user_id = '$id'";

        if ($query_run = $db->query($query)) {

          if ($query_run->num_rows) {

            if ($query_fetch = $query_run->fetch_assoc()) {

              if ($query_fetch['img_date_json']) {

                $img_date = json_decode($query_fetch['img_date_json']);

                foreach ($img_date as $key) {

                  if ($key->img_name != $img_f_name) {

                    $arr['img_name'] = $key->img_name;

                    $arr['img_date'] = $key->img_date;

                    array_push($a, $arr);

                  }

                }

                $img_date_json = json_encode($a);

                $array['a'] = $img_date_json;

                $q_update = "UPDATE orders SET img_date_json = '$img_date_json' where user_id = '$id'";

                $q_update2 = "UPDATE user_info SET img_date_json = '$img_date_json' where id = '$id'";

                if ($q_update_run = $db->query($q_update)) {

                  if ($q_update2_run = $db->query($q_update2)) {

                    $array['status'] = "Image Deleted";

                  }

                }

              }
              else {

                $query = "SELECT * from user_info where id = '$id'";

                if ($query_run = $db->query($query)) {

                  if ($query_run->num_rows) {

                    if ($query_fetch = $query_run->fetch_assoc()) {

                      if ($query_fetch['img_date_json']) {

                        $img_date = json_decode($query_fetch['img_date_json']);

                        foreach ($img_date as $key) {

                          if ($key->img_name != $img_f_name) {

                            $arr['img_name'] = $key->img_name;

                            $arr['img_date'] = $key->img_date;

                            array_push($a, $arr);

                          }

                        }

                        $img_date_json = json_encode($a);

                        $q_update2 = "UPDATE user_info SET img_date_json = '$img_date_json' where id = '$id'";

                        if ($query_run = $db->query($q_update2)) {

                          $array['status'] = "Image Deleted";

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

        $array['status'] = "Image Cannot be delete";

      }

    }

  }

}

echo json_encode($array);
?>
