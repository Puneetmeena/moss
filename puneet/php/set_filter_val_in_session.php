<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_POST['status'])) {

      $status = $_POST['status'];

      if ($status) {

        unset($_SESSION['status']);

        $_SESSION['status'] = $status;

        echo "All Set";

      }

    }
    if (isset($_POST['filter_order_id']) &&
        isset($_POST['filter_email']) &&
        isset($_POST['filter_start_date']) &&
        isset($_POST['filter_end_date']) &&
        isset($_POST['filter_order_by']) &&
        isset($_POST['filter_city']) &&
        isset($_POST['filter_phone_number']) &&
        isset($_POST['filter_rpp'])) {

        unset($_SESSION['filter_order_id']);
        unset($_SESSION['filter_email']);
        unset($_SESSION['filter_start_date']);
        unset($_SESSION['filter_end_date']);
        unset($_SESSION['filter_order_by']);
        unset($_SESSION['filter_city']);
        unset($_SESSION['filter_phone_number']);
        unset($_SESSION['filter_rpp']);


      if ($_POST['filter_order_id']) {
        $_SESSION['filter_order_id'] = $_POST['filter_order_id'];
      }
      if ($_POST['filter_email']) {
        $_SESSION['filter_email'] = $_POST['filter_email'];
      }
      if ($_POST['filter_start_date']) {
        $_SESSION['filter_start_date'] = $_POST['filter_start_date'];
      }
      if ($_POST['filter_end_date']) {
        $_SESSION['filter_end_date'] = $_POST['filter_end_date'];
      }
      if ($_POST['filter_order_by']) {
        $_SESSION['filter_order_by'] = $_POST['filter_order_by'];
      }
      if ($_POST['filter_city']) {
        $_SESSION['filter_city'] = $_POST['filter_city'];
      }
      if ($_POST['filter_phone_number']) {
        $_SESSION['filter_phone_number'] = $_POST['filter_phone_number'];
      }
      if ($_POST['filter_rpp']) {
        $_SESSION['filter_rpp'] = $_POST['filter_rpp'];
      }
      echo "All set";
    }

  }

}
?>
