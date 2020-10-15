<?php
include 'connect.php';

session_start();

//checking whether all fields are set or not
if (isset($_POST['login-email']) && isset($_POST['login-password'])) {

  $email = $_POST['login-email'];
  $password = $_POST['login-password'];

  //checking if values are empty or not
  if ($email && $password) {

    //query for if user already exist or not
    $query = "SELECT * from user_info where email = '$email' AND password = '$password'";

    if ($query_run = $db->query($query)) {

      //number of rows fetched
      $query_num_rows = $query_run->num_rows;

      if ($query_num_rows == 1) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          if(isset($_POST['remember-me'])) {

            //setting cookies
            setcookie("email", trim($_POST['login-email']), time() + (10 * 365 * 24 * 60 * 60));
            setcookie("password", trim($_POST['login-password']), time() + (10 * 365 * 24 * 60 * 60));

          }

          else {

            //if remember me is unset then unset cookies
            if (isset($_COOKIE['email']) && isset($_COOKIE['password'])) {

              //unsetting cookies
              setcookie("email", trim($_POST['login-email']), time() - 1);
              setcookie("password", trim($_POST['login-password']), time() - 1);

            }

          }

          $_SESSION['id'] = $query_fetch['id'];  //creating session when login is done successfully
          echo "Login Successful";   //login Successful

        }

      }

      else {

        echo "Incorrect Email or Password";

      }


    }

  }

}
?>
