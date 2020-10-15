<?php
include 'connect.php';

session_start();

if (isset($_POST['med_name'])) {

  $query_num_rows = 0;

  $query1_num_rows = 0;

  if (isset($_SESSION['product_name'])) {

    $product_name = $_SESSION['product_name'];

  }
  else {

    $product_name = "abc";

  }

  $array = array();

  $prod_name = array();

  $url = $_POST['med_name'];

  $_SESSION['url'] = $_POST['med_name'];

  if ($url) {

    if (substr($url, 0, 8) == "?search=") {

      $encoded_name = str_replace("?search=", "", $url);

      $med_name = urldecode($encoded_name);

    }

  }

  $_SESSION['med_name'] = $med_name;

  if ($med_name) {

    $query = "SELECT * from med_info where product_name = '$med_name'";

    if ($query_run = $db->query($query)) {

      $query_num_rows = $query_run->num_rows;

      if ($query_num_rows) {

        if($query_fetch = $query_run->fetch_assoc()){

          array_push($array, json_encode($query_fetch));

          $_SESSION['product_name'] = $query_fetch['product_name'];

          $_SESSION['company_name'] = $query_fetch['company_name'];

          $_SESSION['composition'] = $query_fetch['composition'];

        }

      }

      if ($query_num_rows < 25) {

        if (true) {

          if (isset($_SESSION['company_name'])) {
            $company_name = $_SESSION['company_name'];
          }
          else {
            $company_name = "lalal";
          }

          if (isset($_SESSION['product_name'])) {
            $product_name = $_SESSION['product_name'];
          }
          else {
            $product_name = "lala";
          }

          if (isset($_SESSION['composition'])) {
            $composition = $_SESSION['composition'];
          }
          else {
            $composition = "asdasd";
          }

          if ($company_name && $product_name) {

            $query2 = "SELECT * from med_info where company_name = '$company_name' OR product_name like '%$med_name%' OR composition = '$composition'";

            if ($query2_run = $db->query($query2)) {

              //array_push($array, json_encode(array($med_name, $company_name, $composition)));

              while ($query2_fetch = $query2_run->fetch_assoc()) {

                if ($query2_fetch['product_name'] != $product_name) {

                  array_push($array, json_encode($query2_fetch));

                }

              }

            }

          }

        }

      }

      /*if ($query_num_rows < 25) {

        $query1 = "SELECT * from med_info where product_name like '%$med_name%'";

        if ($query1_run = $db->query($query1)) {

          $query1_num_rows = $query1_run->num_rows;

          if ($query1_num_rows) {

            while ($query1_fetch = $query1_run->fetch_assoc()) {

              if ($query1_fetch['product_name'] != $product_name) {

                array_push($array, json_encode($query1_fetch));

              }

            }

          }

        }

      }

      if (($query1_num_rows + $query_num_rows) < 25) {

        $query2 = "";

      }

    }*/

    $_SESSION['medicines'] = json_encode($array);

    echo json_encode($array);
  }

}

}
/*elseif (isset($_SESSION['medicines'])) {

  $medicines = $_SESSION['medicines'];

  if ($medicines) {

    echo $medicines;

  }
  else {

    echo "no data";

  }

}*/
?>
