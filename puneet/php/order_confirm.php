<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

include 'connect.php';

session_start();

$check_user_json = false;

$check_prescription_meds = false;

$checkImg = false;

$insert_my_orders = false;

$insert_cc_queue = false;

$insert_packaging_queue = false;

$delete_cart = false;

$delete_orders = false;

$add_history = false;

function check_prescription_meds ($order_json, $db) {

  $orders = json_decode($order_json);

  foreach ($orders as $key) {

    $med_id = $key->id;

    $query = "SELECT * from med_info where id = '$med_id'";

    if ($query_run = $db->query($query)) {

      if ($query_run->num_rows) {

        if ($query_fetch = $query_run->fetch_assoc()) {

          if ($query_fetch['prescription_required'] == "Yes") {

            return true;

          }

        }

      }

    }

  }

}

function check_user_json($id, $db) {

  $query = "SELECT * from orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    if ($query_run->num_rows) {

      if ($query_fetch = $query_run->fetch_assoc()) {

        if ($query_fetch['user_json']) {

          return true;

        }

      }

    }

  }

}

function checkImg ($id, $db, $order_id) {

  $q1 = "SELECT * from orders where user_id = '$id'";

  if ($q1_run = $db->query($q1)) {

    if ($q1_run->num_rows) {

      if ($q1_fetch = $q1_run->fetch_assoc()) {

        if ($q1_fetch['img_date_json']) {

          $img_date = json_decode($q1_fetch['img_date_json']);

          $query = "SELECT * from user_info where id = '$id'";

          if ($query_run = $db->query($query)) {

            if ($query_run->num_rows) {

              if ($query_fetch = $query_run->fetch_assoc()) {

                if ($query_fetch['rx_img_dir_url']) {

                  $scan_dir = scandir("../".$query_fetch['rx_img_dir_url']);

                  if (sizeof($scan_dir) > 2) {

                    //echo "entering1";

                    $check_dir = scandir("../img/rx_check_img/");

                    $j = 0;

                    foreach ($check_dir as $key) {

                      //echo "entering2";

                      if ($order_id == $key) {

                        //echo "entering3";

                        $j++;

                      }

                    }

                    if ($j == 0) {

                      //echo "entering4";

                      if (mkdir('../img/rx_check_img/'.$order_id.'/')) {

                        //echo "entering5";

                        $i = 0;

                        foreach ($scan_dir as $key) {

                          //echo "entering5";

                          if ($key != "." && $key != '..') {

                            //echo "entering6";

                            foreach ($img_date as $key1) {

                              if ($key1->img_name == $key) {

                                if (copy("../".$query_fetch['rx_img_dir_url']."".$key, '../img/rx_check_img/'.$order_id.'/'.$key)) {

                                  //echo "entering7";

                                }

                              }

                            }

                          }

                          //echo "i: $i,";

                          $i++;

                        }

                      }

                    }
                    else {

                      $scan_fol = scandir("../img/rx_check_img/$order_id/");

                      $i = 0;

                      foreach ($scan_fol as $key) {

                        $i++;

                      }

                      $i = $i - 2;

                      $k = 0;

                      foreach ($scan_fol as $key) {

                        if ($key != "." && $key != '..') {

                          $i++;

                          $f_name = $i.".".pathinfo("../".$query_fetch['rx_img_dir_url']."".$key, PATHINFO_EXTENSION);

                          foreach ($img_date as $key1) {

                            if ($key == $key1->img_name) {

                              if (copy("../".$query_fetch['rx_img_dir_url']."".$key, '../img/rx_check_img/'.$id.'/'.$f_name)) {

                                //echo "entering7";

                              }

                            }

                          }

                        }

                        $k++;

                      }



                    }

                    return true;

                  }

                }

              }

            }

          }

        }

      }

    }

  }

}

function insert_my_orders($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db, $status) {

  $query = "INSERT INTO my_orders(order_id, group_id, user_id, order_json, user_json, shipping_price, order_name, order_phone, img_date_json, order_time, status) VALUES('$order_id', '$group_id', '$user_id', '$order_json', '$user_json', '$shipping_price', '$order_name', '$order_phone', '$img_date_json', '$date', '$status')";

  if ($query_run = $db->query($query)) {

    //echo "entering3";

    $q_update = "UPDATE my_orders SET address_json = '$address_json' where group_id = '$group_id'";

    if ($q_update_run = $db->query($q_update)) {

      return true;

    }

  }

}

function insert_cc_queue($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db) {

  //echo "entering4";

  $query = "INSERT INTO cc_queue(order_id, group_id, user_id, order_json, user_json, shipping_price, order_name, order_phone, img_date_json, order_time) VALUES('$order_id', '$group_id', '$user_id', '$order_json', '$user_json', '$shipping_price', '$order_name', '$order_phone', '$img_date_json', '$date')";

  if ($query_run = $db->query($query)) {

    //echo "entering5";

    $q_update = "UPDATE cc_queue SET address_json = '$address_json' where group_id = '$group_id'";

    if ($q_update_run = $db->query($q_update)) {

      return true;

    }

  }

}

function insert_packaging_queue($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db) {

  $query = "INSERT INTO packaging_queue(order_id, group_id, user_id, order_json, user_json, shipping_price, order_name, order_phone, img_date_json, order_time, time_queue) VALUES('$order_id', '$group_id', '$user_id', '$order_json', '$user_json', '$shipping_price', '$order_name', '$order_phone', '$img_date_json', '$date', '$date')";

  if ($query_run = $db->query($query)) {

    $q_update = "UPDATE packaging_queue SET address_json = '$address_json' where group_id = '$group_id'";

    if ($q_update_run = $db->query($q_update)) {

      return true;

    }

  }

}

function delete_cart($id, $db) {

  $query = "DELETE FROM cart where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

function delete_orders($id, $db) {

  $query = "DELETE FROM orders where user_id = '$id'";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

function add_history($order_id, $group_id, $date, $db, $pg) {

  $arr = array();

  $pg_moved = "Order Moved to $pg on $date";

  $action = "Order Place on $date";

  array_push($arr, $action);

  array_push($arr, $pg_moved);

  $action_json = json_encode($arr);

  $query = "INSERT INTO order_history (order_id, group_id, action_json) VALUES('$order_id', '$group_id', '$action_json')";

  if ($query_run = $db->query($query)) {

    return true;

  }

}

if (isset($_SESSION['id'])) {

  $id = $_SESSION['id'];

  if ($id) {

    if (isset($_POST['date'])) {

      $date = $_POST['date'];

      if ($date) {

        $user_email = '';

        $q1 = "SELECT * from user_info where id = '$id'";

        if ($q1_run = $db->query($q1)) {

          if ($q1_run->num_rows) {

            if ($q1_fetch = $q1_run->fetch_assoc()) {

              $user_email = $q1_fetch['email'];

            }

          }

        }

        $query = "SELECT * from orders where user_id = '$id'";

        if ($query_run = $db->query($query)) {

          if ($query_run->num_rows) {

            if ($query_fetch = $query_run->fetch_assoc()) {

              $order_id = $query_fetch['order_id'];

              $group_id = $query_fetch['group_id'];

              $order_json = $query_fetch['order_json'];

              $user_id = $query_fetch['user_id'];

              $user_json = $query_fetch['user_json'];

              $address_json = $query_fetch['address_json'];

              $shipping_price = $query_fetch['shipping_price'];

              $order_name = $query_fetch['order_name'];

              $order_phone = $query_fetch['order_phone'];

              $img_date_json = $query_fetch['img_date_json'];

              $check_prescription_meds = check_prescription_meds($order_json, $db);

              $check_user_json = check_user_json($id, $db);

              if ($check_user_json) {

                if ($check_prescription_meds) {

                  $checkImg = checkImg($id, $db, $order_id);

                  if ($checkImg) {

                    //$insert_img_date = insert_img_date($id, $db);

                    $insert_my_orders = insert_my_orders($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db, "cc_queue");

                    $insert_cc_queue = insert_cc_queue($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db);

                    $add_history = add_history($order_id, $group_id, $date, $db, "CC Queue");

                    if ($add_history) {

                      if ($insert_my_orders && $insert_cc_queue) {

                        $delete_cart = delete_cart($id, $db);

                        $delete_orders = delete_orders($id, $db);

                        if ($delete_cart && $delete_orders) {

                          if (isset($_COOKIE['cart_item'])) {

                            if ($_COOKIE['cart_item']) {

                              setcookie("cart_item", "", time() - 1);

                            }

                          }

                          $body = "Your order has been placed Successfully. Order ID: $order_id and Group ID: $group_id";

                          $subject = "Order Details";

                          $headers = 'From: MOS <support@medicineonlinestore.com>';

                          /*$mail = new PHPMailer(); // create a new object
                          $mail->IsSMTP(); // enable SMTP
                          $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
                          $mail->SMTPAuth = true; // authentication enabled
                          $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
                          $mail->Host = "smtpout.asia.secureserver.net";
                          $mail->Port = 465; // or 587
                          $mail->IsHTML(true);
                          $mail->Username = "support@medicineonlinestore.com";
                          $mail->Password = "chetan@5";
                          $mail->SetFrom("support@medicineonlinestore.com");
                          $mail->Subject = $subject;
                          $mail->Body = $body;
                          $mail->AddAddress($user_email);

                          if(!$mail->Send()) {
                             echo "Mailer Error: " . $mail->ErrorInfo;
                          } else {
                             echo "Order Confirmed";
                          }*/

                          if (mail($user_email, $subject, $body, $headers)) {
                            echo "Order Confirmed";
                          }
                          else {
                            echo 'Error sending the email';
                          }

                        }

                      }

                    }

                  }

                }
                else {

                  $img_date_json = '';

                  $insert_my_orders = insert_my_orders($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db, "packaging_queue");

                  $insert_packaging_queue = insert_packaging_queue($order_id, $group_id, $user_id, $order_json, $user_json, $address_json, $shipping_price, $order_name, $order_phone, $img_date_json, $date, $db);

                  if ($insert_my_orders && $insert_packaging_queue) {

                    $delete_cart = delete_cart($id, $db);

                    $delete_orders = delete_orders($id, $db);

                    if ($delete_cart && $delete_orders) {

                      if (isset($_COOKIE['cart_item'])) {

                        if ($_COOKIE['cart_item']) {

                          setcookie("cart_item", '', time() - 1);

                        }

                      }

                      $add_history = add_history($order_id, $group_id, $date, $db, "Packaging Queue");

                      if ($add_history) {

                        $body = "Your order has been placed Successfully. Order ID: $order_id and Group ID: $group_id";

                        $subject = "Order Details";

                        $headers = 'From: MOS <support@medicineonlinestore.com>';

                        /*$mail = new PHPMailer(); // create a new object
                        $mail->IsSMTP(); // enable SMTP
                        $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
                        $mail->SMTPAuth = true; // authentication enabled
                        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
                        $mail->Host = "smtp.gmail.com";
                        $mail->Port = 465; // or 587
                        $mail->IsHTML(true);
                        $mail->Username = "himalaya0897@gmail.com";
                        $mail->Password = "lumia@520";
                        $mail->SetFrom("himalaya0897@gmail.com");
                        $mail->Subject = $subject;
                        $mail->Body = $body;
                        $mail->AddAddress($user_email);

                        if(!$mail->Send()) {
                           echo "Mailer Error: " . $mail->ErrorInfo;
                        } else {
                           echo "Order Confirmed";
                        }*/

                        if (mail($user_email, $subject, $body, $headers)) {
                          echo "Order Confirmed";
                        }
                        else {
                          echo 'Error sending the email';
                        }

                      }

                    }

                  }

                }

              }

            }

          }

        }

      }

    }

  }

}
?>
