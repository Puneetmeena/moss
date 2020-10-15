<?php
include 'connect.php';

session_start();

/*$val = $_SESSION['test'];

//copy("../img/rx_images/1/1.png", "../img/rx_check_img/1/1.png");

//$scan_dir = scandir('../img/rx_images/1/');

$scan_dir = json_decode('[{"img_name":"1.jpg","img_date":"Mon Apr 09 2018 13:37:33 GMT+0530 (India Standard Time)"},{"img_name":"2.png","img_date":"Mon Apr 09 2018 13:37:38 GMT+0530 (India Standard Time)"}]');

echo "<pre>";
print_r($scan_dir);
echo "</pre>";*/

/*$array = array("order");

foreach(json_decode('["Order Place on Tue Apr 10 2018 14:31:48 GMT+0530 (India Standard Time)","Order Moved to CC Queue on Tue Apr 10 2018 14:31:48 GMT+0530 (India Standard Time)"]') as $key) {
  echo "$key<br>";
}*/

$q1 = "SELECT * from med_info where id='1'";

if ($q1_run = $db->query($q1)) {
  if ($q1_run->num_rows) {
    while ($q1_fetch = $q1_run->fetch_assoc()) {
      print_r($q1_fetch);
    }
  }
  else {
    echo "fuck";
  }
}

?>
