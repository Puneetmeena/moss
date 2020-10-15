$(document).ready(function () {

  $.post("php/logincheck.php", function (data) {

    var myobj = JSON.parse(data);

    if (myobj.status != 0) {

      $("#user-li a span").html("Hello, " + myobj.username);

      $("#login-li").remove();

      $("#user-li").css("display", "block");

    }
    else {

      $("#user-li").remove();

      $("#login-li").css("display", "block");

      $("#myModal").modal('show');

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
            //alert(data);
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

  $("body").on('click', function(){

    $(".search-form ul").css("display", "none");

  });


  $.post(
    "php/my_orders.php",
    function (data) {
      console.log(data);
      myobj = JSON.parse(data);
      console.log(myobj);

      if (myobj.meds_infos.length) {

        myobj.meds_infos.forEach(function (el1, index) {

          var total_mrp = 0;

          var total_offer_mrp = 0;

          el1.med_info.forEach(function (el, idx) {

            if (el.vendor_mrp != 0) {

              total_offer_mrp += el.vendor_mrp * el.quantity;

            }
            else {

              if (el.offer_mrp == 0) {
                total_offer_mrp += el.mrp * el.quantity;
              }
              else {
                total_offer_mrp += el.offer_mrp * el.quantity;
              }

            }

            total_mrp += el.mrp * el.quantity;
          });

          var status = '';

          if (el1.status == 'cc_queue') {

            status = 'We will call you later for confirmation';

          }
          else if (el1.status == 'packaging_queue') {

            status = 'Packed';

          }
          else if (el1.status == 'shipping_queue') {

            status = 'Shipped';

          }
          else if (el1.status == 'manage_queue') {

            status = 'Out For Delivery';

          }
          else if (el1.status == 'Delivered') {

            status = 'Delivered';

          }
          else if (el1.status == 'Cancelled') {

            status = 'Order Cancelled';

          }
          else if (el1.status == 'Not Delivered') {

            status = 'Out For Delivery';

          }

          var deliver_date = '';

          if (el1.deliver_date) {

            deliver_date = "Delivered on " + new Date(el1.deliver_date).toDateString();

          }


          $("#orders-list").append("<div class='container' style='height: 100%;width: 100%;'>" +
    			"<div class='row' style='padding-top: 1%;'>" +
    				"<div class='col-md-10' id='medicines-list'>" +
    					"<div class='thumbnail' style='margin-right: 3%;padding-left: 1%;margin-left: 1%;width:100%;'>" +
              "<button class='btn btn-default repeat-order-btn' data-id='"+el1.group_id+"' style='width: 25%;color:#fff;background-color: #f0c14b;margin-top:3px;bottom:80px;right: 10px;position: absolute;'>Repeat Order</button>" +
    						"<div class='row' style='margin: 0px;'>" +
    							"<div class='row' style='background-color:#f6f6f6; border-bottom-width:1px solid black;margin:0px;'>" +
    								"<div class='col-md-5' style='padding:1%;'>" +
    									"<button class='btn btn-default' style='width:50%;background-color: #2874f0;'><a href='javascript:void(0);' style='color:#fff;'>"+el1.order_id+"</a></button>" +
    								"</div>" +
    								"<div class='col-md-7' style='padding:1%;font-size:17px;text-align:right;'>" +
    									"<button class='btn btn-default' style='width:20%;background-color:#fff;box-shadow:1px 2px lightgrey;color:blue;'>Track Order</button>" +
    									"<a href='javascript:void(0);'>Need Help?</a>" +
    								"</div>" +
    							"</div>" +
    							"<div id='med-list-"+index+"'></div>" +
    						"</div>" +
    						"<div class='row' style='margin: 0px;'>" +
                  "<div class='col-md-12' style='margin:0px;box-sizing: border-box;border-top:5px;'>" +
                    "<div class='col-md-6'>" +
                      "<p style='font-size:16px;'>Ordered On <span>28 oct 2018</span></p>" +
                    "</div>" +
                    "<div class='col-md-6'>" +
                      "<p style='text-align:right;font-size:16px;'>Total Rs.<span>"+total_offer_mrp.toFixed(2)+"</span></p>" +
                    "</div>" +
                  "</div>" +
    						"</div>" +
    					"</div>" +
    				"</div>" +
        		"</div>" +
        	"</div>");

          el1.med_info.forEach(function (el, idx) {

            var img_url = "img/coming_soon.jpeg";

            if (el.image_url) {
              img_url = el.image_url;
            }

            var mrp = 0;

            if (el.vendor_mrp != 0) {
              mrp = el.vendor_mrp;
            }
            else {

              if (el.offer_mrp == 0) {
                mrp = el.mrp;
              }
              else {
                mrp = el.offer_mrp;
              }

            }

            if (idx == 0) {

              $("#med-list-" + index).append("<div class = 'row' style='margin: 0;'><div class='col-sm-2' style='padding-left: 2%;'>" +
                "<img src='"+img_url+"' class='img-responsive thumbnail' style='margin-top: 20px; height: 130px;'>" +
              "</div>" +
              "<div class='col-sm-7'>" +
                "<div class='row'>" +
                  "<div class='col-md-5'>" +
                    "<h3 id='med_name'>"+el.product_name+"</h3>" +
                  "</div>" +
                  "<div class='col-md-3'>" +
                    "<p id='quantity' style='display: inline-block; background-color: #f0f0f0;margin-top: 20px;'>"+el.quantity+" Quantity</p>" +
                  "</div>" +
                  "<div class='col-md-4'>" +
                    "<p style='margin-top:20px;'>MRP: Rs.<span>"+mrp+"</span></p>" +
                  "</div>" +
                "</div>" +
                  "<h6 id='company_name'>"+el.company_name+"</h6>" +
                "<div class='col-md-6' style='padding-left: 0px;'>" +
                  "<h5 style='padding-top: 5px;text-align: left;' id='primarily-used'>Primarily Used: "+el.primarily_used+"</h5>" +
                "</div>" +
              "</div>" +
              "<div class='col-md-3' style='text-align:;bottom: 0px;'>" +
                "<div class='row'>" +
                  "<p>"+deliver_date+"</p>" +
                  "<p>"+status+"</p><br>" +
                "</div>" +
              "</div></div>");

            }
            else {

              $("#med-list-" + index).append("<div class = 'row' style='margin: 0;'><div class='col-sm-2' style='padding-left: 2%;'>" +
                "<img src='"+img_url+"' class='img-responsive thumbnail' style='margin-top: 20px; height: 130px;'>" +
              "</div>" +
              "<div class='col-sm-7'>" +
                "<div class='row'>" +
                  "<div class='col-md-5'>" +
                    "<h3 id='med_name'>"+el.product_name+"</h3>" +
                  "</div>" +
                  "<div class='col-md-3'>" +
                    "<p id='quantity' style='display: inline-block; background-color: #f0f0f0;margin-top: 20px;'>"+el.quantity+" Quantity</p>" +
                  "</div>" +
                  "<div class='col-md-4'>" +
                    "<p style='margin-top:20px;'>MRP: Rs.<span>"+mrp+"</span></p>" +
                  "</div>" +
                "</div>" +
                  "<h6 id='company_name'>"+el.company_name+"</h6>" +
                "<div class='col-md-6' style='padding-left: 0px;'>" +
                  "<h5 style='padding-top: 5px;text-align: left;' id='primarily-used'>Primarily Used: "+el.primarily_used+"</h5>" +
                "</div>" +
              "</div>" +
              "</div>");

            }

          });

        });

        $(".repeat-order-btn").click(function () {

          var g_id = $(this).attr("data-id");

          $.post(
            "php/repeat_order.php",
            {
              group_id: g_id
            },
            function (data) {

              if (data == "All Set") {

                window.location.href = "cart";

              }
              else {

                alert("Something went wrong!");

              }

            }
          );

        });

      }
      else {

        alert("You haven't placed any orders");

      }

    }
  );

});

function redirect(i) {
  var med_name = $("#" + i + " a").html();

  $.post("php/fetch_related_meds.php",
    {
      med_name: "?search=" + med_name
    },
    function(data){

      window.location.href = "page2?search=" + med_name;

    }
  );
}
