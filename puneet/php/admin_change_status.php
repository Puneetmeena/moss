<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {
  $admin_id = $_SESSION['admin_id'];
  if ($admin_id) {
    if (isset($_POST['pg'])) {
      $pg = $_POST['pg'];
      if ($pg) {
        if ($pg == "cc_queue") {
          $q1 = "SELECT * from cc_queue where status != 'Available' OR process_order != 'none'";
          if ($q1_run = $db->query($q1)) {
            while ($q1_fetch = $q1_run->fetch_assoc()) {
              $id = $q1_fetch['id'];
              $status = $q1_fetch['status'];
              $curr_time = time();
              if ($q1_fetch['status'] != "Available") {
                $time_diff = $curr_time - $status;
                if ($time_diff > 120) {
                  $q2 = "UPDATE cc_queue SET status = 'Available' where id = '$id'";
                  if ($q2_run = $db->query($q2)) {
                    echo "Running";
                  }
                }
                echo $time_diff;
              }
              if ($q1_fetch['process_order'] != 'none') {
                echo "run";
                $process_time = $q1_fetch['process_order'];
                $process_time = $process_time - $curr_time;
                if ($process_time < 0) {
                  $q3 = "UPDATE cc_queue SET process_order = 'none' where id = '$id'";
                  if ($q3_run = $db->query($q3)) {
                    echo "process running";
                  }
                }
              }
            }
          }
        }
        elseif ($pg == "packaging_queue") {
          $q1 = "SELECT * from packaging_queue where status != 'Available'";
          if ($q1_run = $db->query($q1)) {
            while ($q1_fetch = $q1_run->fetch_assoc()) {
              $id = $q1_fetch['id'];
              $status = $q1_fetch['status'];
              $curr_time = time();
              if ($q1_fetch['status'] != "Available") {
                $time_diff = $curr_time - $status;
                if ($time_diff > 120) {
                  $q2 = "UPDATE packaging_queue SET status = 'Available' where id = '$id'";
                  if ($q2_run = $db->query($q2)) {
                    echo "Running";
                  }
                }
                echo $time_diff;
              }
            }
          }
        }
      }
    }
  }
}
?>
