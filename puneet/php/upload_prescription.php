<?php
include 'connect.php';

session_start();

$array = array(
  "status" => '',
  "img_date_json" => array()
);

$arr = array(
  'img_name' => '',
  'img_date' => ''
);

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_FILES['fileToUpload']['name']) && isset($_POST['date'])) {

      $date = $_POST['date'];

      if ($date) {

        $array['date'] = $_POST['date'];

      }

      $file_name = $_FILES['fileToUpload']['name'];
      $file_tmp = $_FILES['fileToUpload']['tmp_name'];
      $file_type = $_FILES['fileToUpload']['type'];

      $dir_name = "../img/rx_images/".$id."/";

      $scan_dir = scandir("../img/rx_images/");

      $j = 0;

      foreach ($scan_dir as $key) {
        if ($key == $id) {
          $j++;
        }
      }

      if ($j == 0) {

        if (mkdir($dir_name)) {

          if ($file_name && $file_tmp && $file_type) {

            if (substr($file_type, 0, 5) == 'image') {
              //uploading image to the specified directory

              $f_name ="1.".pathinfo($file_name, PATHINFO_EXTENSION);

              if (move_uploaded_file($file_tmp, $dir_name."".$f_name)) {

                $fol_path = str_replace("../", "", $dir_name);

                $query = "UPDATE user_info SET rx_img_dir_url = '$fol_path' where id = '$id'";

                if ($query_run = $db->query($query)) {

                  $a = "SELECT * from user_info where id = '$id'";

                  if ($a_run = $db->query($a)) {

                    if ($a_run->num_rows) {

                      if ($a_fetch = $a_run->fetch_assoc()) {

                        if ($a_fetch['img_date_json'] && $a_fetch['img_date_json'] != '[]') {

                          $img_date = json_decode($a_fetch['img_date_json']);

                          foreach ($img_date as $key ) {

                            $arr['img_name'] = $key->img_name;

                            $arr['img_date'] = $key->img_date;

                            array_push($array['img_date_json'], $arr);

                          }

                          $arr['img_name'] = $f_name;

                          $arr['img_date'] = $date;

                          array_push($array['img_date_json'], $arr);

                          $img_date_json = json_encode($array['img_date_json']);

                          $q_update = "UPDATE orders SET img_date_json = '$img_date_json' where user_id = '$id'";

                          $q_update2 = "UPDATE user_info SET img_date_json = '$img_date_json' where id = '$id'";

                          if ($q_update_run = $db->query($q_update)) {

                            if ($q_update2_run = $db->query($q_update2)) {

                              $array['status'] = "Image Uploaded";

                            }

                          }

                        }
                        else {

                          $q_check = "SELECT * from orders where user_id = '$id'";

                          if ($q_check_run = $db->query($q_check)) {

                            if ($q_check_run->num_rows) {

                              if ($q_check_fetch = $q_check_run->fetch_assoc()) {

                                if ($q_check_fetch['img_date_json'] && $q_check_fetch['img_date_json'] != '[]') {

                                  $img_date = json_decode($q_check_fetch['img_date_json']);

                                  foreach ($img_date as $key) {

                                    $arr['img_name'] = $key->img_name;

                                    $arr['img_date'] = $key->img_date;

                                    array_push($array['img_date_json'], $arr);

                                  }

                                  $arr['img_name'] = $f_name;

                                  $arr['img_date'] = $date;

                                  array_push($array['img_date_json'], $arr);

                                }
                                else {

                                  $arr['img_name'] = $f_name;

                                  $arr['img_date'] = $date;

                                  array_push($array['img_date_json'], $arr);

                                }

                                $img_date_json = json_encode($array['img_date_json']);

                                $q_update = "UPDATE orders SET img_date_json = '$img_date_json' where user_id = '$id'";

                                $q_update2 = "UPDATE user_info SET img_date_json = '$img_date_json' where id = '$id'";

                                if ($q_update_run = $db->query($q_update)) {

                                  if ($q_update2_run = $db->query($q_update2)) {

                                    $array['status'] = "Image Uploaded";

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

                $array['status'] = "Cannot Upload File";

              }

            }
            else {

              $array['status'] = "Choose Image Only";

            }

          }

        }

      }
      else {

        if ($file_name && $file_tmp && $file_type) {

          if (substr($file_type, 0, 5) == 'image') {
            //uploading image to the specified directory

            $scan_fol = scandir($dir_name);

            $i = 1;

            foreach ($scan_fol as $key) {

              $i++;

            }

            $i = $i - 2;

            if ($i <= 4) {

              $f_name = $i.".".pathinfo($file_name, PATHINFO_EXTENSION);

              if (move_uploaded_file($file_tmp, $dir_name."".$f_name)) {

                $folder_name = str_replace("../", "", $dir_name);

                //images successfully uploaded
                $query = "UPDATE user_info SET rx_img_dir_url = '$folder_name' where id = '$id'";

                if ($query_run = $db->query($query)) {

                  $a = "SELECT * from user_info where id = '$id'";

                  if ($a_run = $db->query($a)) {

                    if ($a_run->num_rows) {

                      if ($a_fetch = $a_run->fetch_assoc()) {

                        if ($a_fetch['img_date_json'] && $a_fetch['img_date_json'] != '[]') {

                          $img_date = json_decode($a_fetch['img_date_json']);

                          foreach ($img_date as $key ) {

                            $arr['img_name'] = $key->img_name;

                            $arr['img_date'] = $key->img_date;

                            array_push($array['img_date_json'], $arr);

                          }

                          $arr['img_name'] = $f_name;

                          $arr['img_date'] = $date;

                          array_push($array['img_date_json'], $arr);

                          $img_date_json = json_encode($array['img_date_json']);

                          $q_update = "UPDATE orders SET img_date_json = '$img_date_json' where user_id = '$id'";

                          $q_update2 = "UPDATE user_info SET img_date_json = '$img_date_json' where id = '$id'";

                          if ($q_update_run = $db->query($q_update)) {

                            if ($q_update2_run = $db->query($q_update2)) {

                              $array['status'] = "Image Uploaded";

                            }

                          }

                        }
                        else {

                          $q_check = "SELECT * from orders where user_id = '$id'";

                          if ($q_check_run = $db->query($q_check)) {

                            if ($q_check_run->num_rows) {

                              if ($q_check_fetch = $q_check_run->fetch_assoc()) {

                                if ($q_check_fetch['img_date_json'] && $q_check_fetch['img_date_json'] != '[]') {

                                  $img_date = json_decode($q_check_fetch['img_date_json']);

                                  foreach ($img_date as $key) {

                                    $arr['img_name'] = $key->img_name;

                                    $arr['img_date'] = $key->img_date;

                                    array_push($array['img_date_json'], $arr);

                                  }

                                  $arr['img_name'] = $f_name;

                                  $arr['img_date'] = $date;

                                  array_push($array['img_date_json'], $arr);

                                }
                                else {

                                  $arr['img_name'] = $f_name;

                                  $arr['img_date'] = $date;

                                  array_push($array['img_date_json'], $arr);

                                }

                                $img_date_json = json_encode($array['img_date_json']);

                                $q_update = "UPDATE orders SET img_date_json = '$img_date_json' where user_id = '$id'";

                                $q_update2 = "UPDATE user_info SET img_date_json = '$img_date_json' where id = '$id'";

                                if ($q_update_run = $db->query($q_update)) {

                                  if ($q_update2_run = $db->query($q_update2)) {

                                    $array['status'] = "Image Uploaded";

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

                $array['status'] = "Cannot Upload File";

              }

            }
            else {

              $array['status'] = "You cannot upload more than four prescription";

            }

          }

        }
        else {

          $array['status'] = "Choose Image Only";

        }

      }

    }

  }

}
else {

  $array['status'] = "Something's went wrong! Please try again later.";

}

echo json_encode($array);

?>
