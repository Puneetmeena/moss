<?php
include 'connect.php';
session_start();

if (isset($_POST['admin_id']) && isset($_POST['admin_password'])) {
  $admin_id = $_POST['admin_id'];
  $admin_password = $_POST['admin_password'];

  if ($admin_id && $admin_password) {
    $query = "SELECT * from admin_users where (email = '$admin_id' OR username = '$admin_id') AND password = '$admin_password'";

    if ($query_run = $db->query($query)) {
      $query_num_rows = $query_run->num_rows;
      if ($query_num_rows == 1) {
        if ($query_fetch = $query_run->fetch_assoc()) {
          $_SESSION['admin_id'] = $query_fetch['id'];
          echo "login successful";
        }
      }
      else {
        echo "Incorrect Admin ID or Password!";
      }
    }
  }
}
?>
