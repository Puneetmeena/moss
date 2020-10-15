<?php
include 'connect.php';

session_start();

$array = array(
  "id"=> 0,
  "med_name"=>'',
  "company_name"=>'',
  "mrp"=>'',
  'offer_mrp'=>'',
  "composition"=>'',
  "primarily_used"=>'',
  "pack_size"=>'',
  "instructions_for_the_patients"=>'',
  "description"=>'',
  "side_effects"=>'',
  "prescription_required"=>'',
  "missed_dosage"=>'',
  "storage"=>'',
  "main_category"=>'',
  "sub_category"=>'',
  "image_url"=>''
);

$array2 = array(
  'med_name'=>'',
  'id'=>0,
);

if (isset($_POST['json'])) {

  $values = $_POST['json'];

  if ($values) {

    $params = explode("&", urldecode($values));

    $array2['med_name'] = str_replace("?med-name=", "",$params[0]);

    $array2['id'] = str_replace("id=", "", $params[1]);

    $json = json_encode($array2);

    $myobj = json_decode($json);

    $med_name = $myobj->med_name;

    $id =  $myobj->id;

    $query = "SELECT * from med_info where id = '$id'";

    if ($query_run = $db->query($query)) {

      $query_num_rows = $query_run->num_rows;

      if ($query_num_rows) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          $array['id'] = $query_fetch['id'];

          $array['med_name'] = $query_fetch['product_name'];

          $array['company_name'] = $query_fetch['company_name'];

          $array['mrp'] = $query_fetch['mrp'];

          $array['offer_mrp'] = $query_fetch['offer_mrp'];

          $array['composition'] = $query_fetch['composition'];

          $array['pack_size'] = $query_fetch['pack_size'];

          $array['instructions_for_the_patients'] = $query_fetch['instructions_for_the_patients'];

          $array['description'] = $query_fetch['description'];

          $array['primarily_used'] = $query_fetch['primarily_used'];

          $array['side_effects'] = $query_fetch['side_effects'];

          $array['prescription_required'] = $query_fetch['prescription_required'];

          $array['missed_dosage'] = $query_fetch['missed_dosage'];

          $array['storage'] = $query_fetch['storage'];

          $array['main_category'] = $query_fetch['main_category'];

          $array['sub_category'] = $query_fetch['sub_category'];

          $array['image_url'] = $query_fetch['image_url'];
        }

      }

    }

  }

}

echo json_encode($array);
?>
