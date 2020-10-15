<?php
include 'connect.php';

session_start();

if (isset($_SESSION['admin_id'])) {

  $admin_id = $_SESSION['admin_id'];

  if ($admin_id) {

    if (isset($_GET['pg'])) {

      $pg = $_GET['pg'];

      if ($pg) {

        if ($pg == "cc_queue") {

          $query = "SELECT * from cc_queue where status = 'Available' AND process_order = 'none'";

          if ($query_run = $db->query($query)) {

            if ($query_run->num_rows) {

              if ($query_fetch = $query_run->fetch_assoc()) {

                $key = $query_fetch['id'];

                $status = time();

                $q = "UPDATE cc_queue SET status = '$status' where id = '$key'";

                if ($q_run = $db->query($q)) {

                  header("Location: ../cc_queue?key=$key");

                }

              }

            }
            else {

              header("Location: ../cc_queue?key=0");

            }

          }

        }
        elseif ($pg == "packaging_queue") {

          $query = "SELECT * from packaging_queue where status = 'Available'";

          if ($query_run = $db->query($query)) {

            if ($query_run->num_rows) {

              if ($query_fetch = $query_run->fetch_assoc()) {

                $key = $query_fetch['id'];

                header("Location: ../packaging_queue?key=$key");

              }

            }
            else {

              header("Location: ../packaging_queue?key=0");

            }

          }

        }
        elseif ($pg == "filter") {
          header("Location: ../packaging_queue?filter=true");
        }

      }

    }

  }

}
?>
