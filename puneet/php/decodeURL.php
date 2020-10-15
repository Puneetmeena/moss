<?php
if (isset($_POST['search_for'])) {

  $search_for = $_POST['search_for'];

  if ($search_for) {

    echo urldecode($search_for);

  }

}
?>
