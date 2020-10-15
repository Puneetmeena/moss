$(document).ready(function () {

    $.post(
      "php/check_session.php",
      {
        data: "upload_prescription"
      },
      function (data) {

      var checkobj = JSON.parse(data);

      if(checkobj.login_status == 1) {

        if (checkobj.status == 1) {

          if (checkobj.order_json != '') {

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

            $("#upload_prescription_form").on('submit', function () {

              var file = $("#fileToUpload").val();

              var date = new Date();

              $("#date").val(date);

              if (file.trim() == "") {

                alert("Please Choose an image!");

                return false;

              }
              else {

                $.ajax({
                  url: "php/upload_prescription.php",
                  method: "POST",
                  data: new FormData(this),
                  contentType: false,
                  processData: false,
                  success: function(data){

                    console.log(data);

                    var myobj = JSON.parse(data);

                    if (myobj.status != '') {

                      if (myobj.status == "Image Uploaded") {

                        location.reload();

                      }
                      else {

                        alert(myobj.status);

                      }

                    }

                  }
                });

              }


            });

            $.post(
              "php/fetch_prescription_img.php",
              function (data) {

                myobj = JSON.parse(data);

                if (myobj.login_status == 1) {

                  if (myobj.images != '') {

                    var myimg = JSON.parse(myobj.images);

                    if (myimg.length != 0) {

                      $("#checkout-btn").removeClass("disabled");

                    }

                    for (var i = 0; i < myimg.length; i++) {

                      cls = "";

                      if (i == 0) {

                        cls = "checkbox-checked";

                      }

                      /*$("#prescription_images").append("<div class='col-md-3' style='padding: 0; margin: 10px 15px;'>" +
                        "<a href='javascript:void(0);' onclick='removeImg(" + i + ");' style='position: absolute; z-index: 8; top: 0; right: 0; color: black;'><img src='img/CloseCircle.svg' alt='close'> </a>" +
                        "<img src='" + myimg[i] + "' id='img-"+ i +"' style='width: 100%; height: 185px; object-fit: cover;' alt='hola'>" +
                      "</div>");*/

                      $("#prescription_images").append("<div class='col-md-3' style='padding: 0; margin: 10px 15px;'>" +
                        "<div class='row' style='margin: 15px 0 0 0;'>" +
                          "<div class='col-md-2'>" +
                            "<div style='font-size: 20px;'>" +
                              "<span class='custom-checkbox-img "+ cls +"' data-id='"+ i +"'><i class='fa fa-check-square'></i></span>" +
                            "</div>" +
                          "</div>" +
                          "<div class='col-md-10'>" +
                            "<div>" +
                              "<a href='javascript:void(0);' onclick='removeImg(" + i + ");' style='position: absolute; z-index: 8; top: 0; right: 0; color: black;'><img src='img/CloseCircle.svg'></a>" +
                              "<img src='" + myimg[i] + "' id='img-"+ i +"' style='width: 100%; height: 185px; object-fit: cover;'>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>");

                    }

                    $("#prescription_images").css("display", "block");

                  }
                  else {

                    $("#prescription-header").remove();

                    $("#prescription_images").remove();

                  }

                }
                else {

                  alert("Something's went Wrong! Please try again later");

                }

                $(".custom-checkbox-img").click(function () {
                  if (!$(this).hasClass('checkbox-checked')) {
                    $(this).removeClass("checkbox-img");
                    $(this).addClass('checkbox-checked');
                    $("#checkout-btn").removeClass("disabled");
                  }
                  else {
                    $(this).removeClass("checkbox-checked");
                    $(this).addClass('checkbox-img');
                    $("#checkout-btn").removeClass("disabled");
                  }

                  if (!$(".custom-checkbox-img").hasClass("checkbox-checked")) {
                    $("#checkout-btn").addClass("disabled");
                  }
                });

                $("#checkout-btn").click(function () {

                  if (!$("#checkout-btn").hasClass("disabled")) {

                    var items = $(".checkbox-checked");

                    var arr = [];

                    items.each(function (index) {
                      data_id = $(this).attr("data-id");

                      arr[index] = $("#img-" + data_id).attr("src");
                      //console.log($(this).attr("data-id"));
                    });

                    $.post(
                      "php/setSession.php",
                      {
                        pg: "upload_prescription",
                        img: JSON.stringify(arr)
                      },
                      function (data) {

                        console.log(data);

                        var mydata = JSON.parse(data);

                        if (mydata.login_status == 1) {

                          if (mydata.order_json != '') {

                            if (mydata.status == "All Set") {

                              if (mydata.img != '') {

                                var confirm = window.confirm("Are you sure want to proceed with this prescription?");

                                if (confirm) {

                                  window.location.href = "order_summary";

                                }

                              }
                              else {

                                alert("Something's went wrong! Please try again later.");

                              }

                            }
                            else {

                              alert("Something's went Wrong! Please try again later.");

                            }

                          }
                          else {

                            alert("Something's went Wrong! Please try again later.");

                          }

                        }
                        else {

                          alert("Something's went Wrong! Please try again later.");

                        }

                      }
                    );

                    //console.log(JSON.stringify(arr));

                  }

                });

              }
            );

          }
          else {

            //add some medicines

            window.location.href = "cart";

          }

        }
        else {

          window.location.href = "cart";

        }

      }
      else {

        window.location.href = "cart";

      }

    });

    /*$("#checkout-btn").click(function () {

      if (!$("#checkout-btn").hasClass("disabled")) {

        $.post(
          "php/setSession.php",
          {
            pg: "upload_prescription"
          },
          function (data) {

            console.log(data);

            var mydata = JSON.parse(data);

            if (mydata.login_status == 1) {

              if (mydata.order_json != '') {

                if (mydata.status == "All Set") {

                  if (mydata.img != '') {

                    var confirm = window.confirm("Are you sure want to proceed with this prescription?");

                    if (confirm) {

                      window.location.href = "order_summary";

                    }

                  }
                  else {

                    alert("Something's went wrong! Please try again later.");

                  }

                }
                else {

                  alert("Something's went Wrong! Please try again later.");

                }

              }
              else {

                alert("Something's went Wrong! Please try again later.");

              }

            }
            else {

              alert("Something's went Wrong! Please try again later.");

            }

          }
        );

      }

    });*/

});

function removeImg(i) {

  var img_name = $("#img-" + i).attr("src");

  $.post(
    "php/removeImg.php",
    {
      img_name: img_name
    },
    function (data) {

      console.log(data);

      var myobj = JSON.parse(data);

      if (myobj.login_status == 1) {

        if (myobj.status != '') {

          if (myobj.status == "Image Deleted") {

            location.reload();

          }
          else if (myobj.status == "Image Cannot be delete") {

            alert(myobj.status);

          }

        }
        else {

          alert("Something's went Wrong! Please try again later.");

        }

      }
      else {

        alert("Something's went Wrong! Please try again later.");

      }

    }

  );

}
