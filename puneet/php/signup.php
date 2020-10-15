<?php
include 'connect.php';

session_start();

if (isset($_POST['firstname']) &&
    isset($_POST['lastname']) &&
    isset($_POST['email']) &&
    isset($_POST['username']) &&
    isset($_POST['password'])){

  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $email = $_POST['email'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  if ($firstname && $lastname && $email && $username && $password) {

    $query = "SELECT * from user_info where email = '$email' OR username = '$username'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows == 0) {

        $query = "INSERT INTO user_info(firstname, lastname, email, username, password) VALUES('$firstname', '$lastname', '$email', '$username', '$password')";

        if ($query_run = $db->query($query)) {

          $query = "SELECT * from user_info where email = '$email' AND username = '$username'";

          if ($query_run = $db->query($query)) {

            if ($query_num_rows = $query_run->num_rows) {

              if ($query_fetch = $query_run->fetch_assoc()) {

                $_SESSION['id'] = $query_fetch['id'];

                echo "Sign Up Successful";

              }

            }

          }

        }

      }
      else {

        echo "Username or Email is already exist";

      }

    }

  }
  else {

    echo "All fields are required";

  }

}

?>
