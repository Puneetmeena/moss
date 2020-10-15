$(document).ready(function () {
  $.post(
    "php/check_session.php",
    {
      data: "payment"
    },
    function (data) {

      console.log(data);

      var checkobj = JSON.parse(data);

      console.log(checkobj);

      if(checkobj.login_status == 1) {

        if (checkobj.status == 1) {

          if (checkobj.order_json != '') {

            if (checkobj.address_json != '') {

              if (checkobj.pres_req == 0) {

                $("body").css("display", "block");

              }
              else if (checkobj.pres_req == 1) {

                if (checkobj.img != '') {

                  $("body").css("display", "block");

                }
                else {

                  window.location.href = "cart";

                }

              }

            }
            else {

              window.location.href = "cart";

            }

            $("body").css("display", "block");

            $.post("php/logincheck.php", function (data) {

              var myobj = JSON.parse(data);

              if (myobj.pres_req == 1) {

                $("#pres_not_req").remove();

                $("#pres_req").css("display", "block");

              }
              else {

                $("#pres_req").remove();

                $("#pres_not_req").css("display", "block");

              }

              if (myobj.status != 0) {

                $("#user-li a span").html("Hello, " + myobj.username);

                $("#login-li").remove();

                $("#user-li").css("display", "block");

              }
              else {

                window.location.href = "cart";

                $("#user-li").remove();

                $("#login-li").css("display", "block");

              }

            });

            //cart number fetch
            $.post("php/cart_item_fetch.php", function(data){

              if (data != "no data") {

                myobj = JSON.parse(data);

                //console.log(myobj);

                if (myobj.login_status == 0) {

                  if (myobj.total_items > 0) {

                    $("#cart_no_of_items").html(myobj.total_items);

                    $("#cart_no_of_items").css("visibility", "visible");

                  }

                }
                else {

                  if (myobj.total_items > 0) {

                    $("#cart_no_of_items").html(myobj.total_items);

                    $("#cart_no_of_items").css("visibility", "visible");

                  }

                }

              }

            });

            //on login
            $("#login-form").on("submit", function(){
              var email = $("#login-email").val();
              var password = $("#login-password").val();

              //removing spaces at the beginning and at the end of the strings
              email = email.trim();
              password = password.trim();

              //checking fields are empty or not
              if (email == "" && password == "") {
                alert("All fields are required");
                return false;
              }
              else if (email == "") {
                alert("Email is required");
                return false;
              }
              else if (password == "") {
                alert("Password is required");
                return false;
              }
              else {
                $.post("php/login.php",
                  $("#login-form :input").serializeArray(),
                  function(data){
                    if (data == "Login Successful") {
                      location.reload();
                    }
                    else {
                      alert(data);
                    }
                  }
                );
                return false;
              }
            });

            $("#signup-form").on("submit", function(){
              var firstname = $("#signup-firstname").val();
              var lastname = $("#signup-lastname").val();
              var email = $("#signup-email").val();
              var username = $("#signup-username").val();
              var password = $("#signup-password").val();
              var retype_password = $("#signup-retype-password").val();

              var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

              firstname = firstname.trim();
              lastname = lastname.trim();
              email = email.trim();
              username = username.trim();
              password = password.trim();
              retype_password = retype_password.trim();

              if (firstname == "" &&
                  lastname == "" &&
                  email == "" &&
                  username == "" &&
                  password == "" &&
                  retype_password == "") {

                alert("All fields are required!");

              }
              else if (firstname == "") {

                alert("First Name cannot be empty!");

              }
              else if (lastname == "") {

                alert("Last Name cannot be empty!");

              }
              else if (email == "") {

                alert("Email cannot be empty!");

              }
              else if (username == "") {

                alert("Username cannot be empty!");

              }
              else if (password == "") {

                alert("Password cannot be empty!");

              }
              else if (retype_password == "") {

                alert("Retype Password cannot be empty!");

              }
              else {

                if (email.match(mailformat)) {

                  if (password == retype_password) {

                    if (password.length >= 8) {

                      if (password.search(" ") == -1) {

                        $.post(
                          "php/signup.php",
                          {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            username: username,
                            password: password
                          },
                          function (data){

                            if (data == "Sign Up Successful") {

                              location.reload();

                            }
                            else {

                              alert(data);

                            }

                          }
                        );

                      }
                      else {

                        alert("Password cannot contain any spaces");

                      }

                    }
                    else {

                      alert("Password should be of minimum 8 characters");

                    }

                  }

                  else {

                    alert("Password and Retype Password do not match");

                  }

                }
                else {

                  alert("Invalid Email Address");

                }

              }

              return false;
            });

            $("#search-med").on("keyup", function(){
              var search_med = $("#search-med").val();
              if (search_med != "") {
                $.post("php/search.php",
                  {
                    med_name: search_med
                  },
                  function(data){
                    if (data != "No results") {
                      myobj = JSON.parse(data);

                      $(".search-form ul li a").empty();
                      $(".search-form ul li").css("display", "none");

                      for (var i = 0; i < 4; i++) {

                        if (myobj[i] != null) {

                          mydata = JSON.parse(myobj[i]);

                          $("#" + i + " a").html(mydata.product_name);

                        }
                      }

                      $(".search-form ul li").css("display", "block");
                    }
                    else {
                      $(".search-form ul li").css("display", "none");
                      $(".search-form ul").css("display", "none");
                      $(".search-form ul").attr("value", 0);
                    }

                  }
                );
                $(".search-form ul").css("display", "block");
                $(".search-form ul").attr("value", 1);
              }
              else {
                $(".search-form ul").css("display", "none");
                $(".search-form ul").attr("value", 0);
              }
            });

            $("#search-form").on("submit", function(){

              //alert($("#testing").attr("value"));

              if ($("#search-form ul").attr("value") == 1) {

                var med_name = $(".select a").html();

              }
              else {

                var med_name = $("#search-med").val();

              }

              $.post("php/fetch_related_meds.php",
                {
                  med_name: "?search=" + med_name
                },
                function(data) {
                  window.location.href = "page2?search=" + med_name;
                }
              );

              return false;
            });

            $(document).on("keyup", function(e){

              var select = $(".select");

              if (e.which == 40) {

                console.log(select.index());

                if (select.index() == 3) {
                  return;
                }

                select.removeClass("select").next().addClass("select");

              }
              else if (e.which == 38) {

                if (select.index() == 0) {

                  return;

                }

                select.removeClass("select").prev().addClass("select");

              }
            });

            $("body").on('click', function(){

              $(".search-form ul").css("display", "none");

            });

            $("#cod").click(function () {

              $("#otp-body").css("display", "block");

            });

            $("#send-otp").click(function () {

              $.post(
                "php/send_otp.php",
                function (data) {

                  console.log(data);

                  if (data == "OTP has been sent to your registered E-Mail ID.") {

                    alert(data);

                  }
                  else if (data == "OTP has been already sent to your registered E-mail ID.") {

                    alert(data);

                  }
                  else {

                    alert("Something's went wrong! Please try again later.");

                  }
                }
              );

            });

            $("#otp-form").on('submit', function () {

              var otp = $("#otp").val();

              if (otp.trim() == "") {

                alert("Field cannot be empty");

              }
              else {

                $.post(
                  "php/check_otp.php",
                  {
                    otp: otp
                  },
                  function (data) {

                    if (data == "Otp Matches") {

                      var d = new Date();

                      $.post(
                        "php/order_confirm.php",
                        {
                          date: d
                        },
                        function (data) {

                          console.log(data);

                          if (data == "Order Confirmed") {

                            alert("Order Placed Successfully and your order details sent to your email id");

                            window.location.href = "my_orders";

                          }
                          else {

                            alert("Something's went wrong.Please try again later.");

                          }

                        }
                      );

                    }
                    else {

                      alert("Something's went wrong! Please try again later.");

                    }

                  }
                );

              }

            });

            $("#online-payment").click(function () {

              alert("This functionality is in progress");

            });

          }

        }
        else {

          window.location.href = "cart";

        }

      }
      else {

        window.location.href = "cart";

      }
    }
  );
});
