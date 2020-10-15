$(document).ready(function () {

  $.post(
    "php/check_session.php",
    {
      data: "order_summary"
    },
    function (data) {

      var checkobj = JSON.parse(data);

      if(checkobj.login_status == 1) {

        if (checkobj.status == 1) {

          if (checkobj.order_json != '') {

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

            $.post(
              "php/order_summary.php",
              function (data) {

                var myobj = JSON.parse(data);

                //console.log(myobj.orders[0]['product_name']);

                if (myobj.orders != '') {

                  for (var i = 0; i < myobj.orders.length; i++) {

                    if (myobj.orders[i]['offer_mrp'] != 0) {

                      $("#items").prepend("<tr>" +
                          "<td>" + myobj.orders[i].product_name + "</td>" +
                          "<td>" + myobj.orders[i]['company_name'] + "</td>" +
                          "<td class='text-center'>&#8377;" + myobj.orders[i]['offer_mrp'] + "</td>" +
                          "<td class='text-center'>" + myobj.orders[i]['quantity'] + "</td>" +
                          "<td class='text-right'>&#8377;" + myobj.orders[i]['total'] + "</td>" +
                      "</tr>");

                    }
                    else {

                      $("#items").prepend("<tr>" +
                          "<td>" + myobj.orders[i].product_name + "</td>" +
                          "<td>" + myobj.orders[i]['company_name'] + "</td>" +
                          "<td class='text-center'>&#8377;" + myobj.orders[i]['mrp'] + "</td>" +
                          "<td class='text-center'>" + myobj.orders[i]['quantity'] + "</td>" +
                          "<td class='text-right'>&#8377;" + myobj.orders[i]['total'] + "</td>" +
                      "</tr>");

                    }

                  }

                }

                $("#sub_total span").html(Math.round(myobj.sub_total * 100) / 100);

                $("#shipping_price span").html(myobj.shipping);

                $("#total_price span").html(Math.round(myobj.total_price * 100) / 100);

              }
            );

            $.post(
              "php/address_fetch.php",
              function (data) {

                if (data != '') {

                  console.log(data);

                  var myobj = JSON.parse(data);

                  if (myobj.total_address == 0) {

                    $("#address-list").remove();

                    $("#add-address-body").css("display", "block");

                  }
                  else if (myobj.json.length != 0 && myobj.total_address < 6) {

                    $("#add-address-body").css("display", "block");

                    console.log(myobj.json);

                    var cls = "";

                    for (var i = 0; i < myobj.json.length; i++) {

                      if (i == 0) {
                        cls = "radio-checked";
                      }
                      else {
                        cls = "";
                      }

                      $(".address-list").append("<li>" +
          							"<div class='row' style='margin: 0;'>" +
          								"<div class='col-md-8 col-xs-9' style='padding: 0;'>" +
          									"<div class='row' style='margin: 0;'>" +
          										"<div class='col-md-1 col-xs-2' style='padding-left: 0;'>" +
          											"<div class='radio-btn "+ cls +"' data-id=" + myobj.json[i].id + ">" +
          											"</div>" +
          										"</div>" +
          										"<div class='col-md-11 col-xs-10' style='font-size: 12px; padding-left: 0;'>" +
          											"<div id='full-name' style='font-weight: bold;'>" +
          												"<span>"+ myobj.json[i].name +"</span>" +
          											"</div>" +
          											"<div>" +
                                  myobj.json[i].address_json.address_line1  +", " +
                                  myobj.json[i].address_json.address_line2  +", " +
                                  myobj.json[i].address_json.city  +", " +
                                  myobj.json[i].address_json.region + ", " +
                                  myobj.json[i].address_json.country + " - " +
                                  myobj.json[i].address_json.postal_code +
          											"</div>" +
          											"<div>" +
          												"<span>" + myobj.json[i].phone + "</span>" +
          											"</div>" +
          										"</div>" +
          									"</div>" +
          								"</div>" +
          								"<div class='col-md-4 col-xs-3'>" +
          									"<div class='overflow-btn'>" +
          										"<img src='img/overflow-menu.svg'>" +
          										"<ul class='overflow-hide'>" +
          											"<li onclick='editAddress(" + myobj.json[i].id + ");'><a href='#add-address-body'>Edit</a></li>" +
          											"<li onclick='deleteAddress(" + myobj.json[i].id + ");'>Delete</li>" +
          										"</ul>" +
          									"</div>" +
          								"</div>" +
          							"</div>" +
          						"</li>");

                    }

                    $("#next-btn").removeClass("disabled");

                  }
                  else if (myobj.total_address >= 5) {

                    $("#add-address-body").remove();

                  }

                  $(".overflow-btn").click(function (){
                    if ($(this).find("ul").hasClass("overflow-hide")) {
                      $(this).find("ul").removeClass("overflow-hide");
                      $(this).find("ul").addClass("overflow-show");
                    }
                  });

                  $(".overflow-btn").mouseleave(function () {

                    if ($(this).find("ul").hasClass("overflow-show")) {
                      $(this).find("ul").removeClass("overflow-show");
                      $(this).find("ul").addClass("overflow-hide");
                    }

                  });

                  $(".radio-btn").click(function (){

                    if ($(".radio-btn").hasClass('radio-checked')) {
                      $(".radio-btn").removeClass('radio-checked');
                    }
                    if (!$(this).hasClass('radio-checked')) {
                      $(this).addClass('radio-checked');
                    }

                  });

                }
                else {

                  $("#current-address").remove();

                }

              }
            );

            $("#add-address-form").on('submit', function () {

              var full_name = $("#full-name").val();
              var address_line1 = $("#address-line1").val();
              var address_line2 = $("#address-line2").val();
              var city = $("#city").val();
              var region = $("#region").val();
              var postal_code = $("#postal-code").val();
              var phone = $("#phone").val();
              var country = $("#country").val();
              var mode = $("#mode").val();
              var address_id = $("#address_id").val();

              full_name = full_name.trim();
              address_line1 = address_line1.trim();
              address_line2 = address_line2.trim();
              city = city.trim();
              region = region.trim();
              postal_code = postal_code.trim();
              phone = phone.trim();
              country = country.trim();
              mode = mode.trim();
              address_id = address_id.trim();

              if (full_name == "" &&
                  address_line1 == "" &&
                  address_line2 == "" &&
                  city == "" &&
                  region == "" &&
                  postal_code == "" &&
                  phone == "" &&
                  country == ""&&
                  mode == "") {

                    alert("All fields are required");

              }
              else if (full_name == "") {

                alert("Full Name Cannot be empty!");

              }
              else if (address_line1 == "") {

                alert("Address Line 1 Cannot be empty!");

              }
              else if (address_line2 == "") {

                alert("Address Line 2 Cannot be empty!");

              }
              else if (city == "") {

                alert("City Cannot be empty!");

              }
              else if (region == "") {

                alert("Region Cannot be empty!");

              }
              else if (postal_code == "") {

                alert("Postal Code Cannot be empty!");

              }
              else if (phone == "") {

                alert("Phone no Cannot be empty!");

              }
              else if (country == "") {

                alert("Country Cannot be empty!");

              }
              else if (mode == "") {
                alert("Something's went wrong! Please try again later.");
              }
              else {

                $.post(
                  "php/add_address.php",
                  {
                    full_name: full_name,
                    address_line1: address_line1,
                    address_line2: address_line2,
                    city: city,
                    region: region,
                    postal_code: postal_code,
                    phone: phone,
                    country: country,
                    mode: mode,
                    address_id: address_id
                  },
                  function (data) {

                    console.log(data);

                    if (data == "Row Updated" || data == "Row Inserted") {

                      location.reload();

                    }
                    else {

                      alert("Something's went wrong! Please try Again later");

                    }

                  }
                );

              }
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

  $("#edit-btn").click(function () {

    $("#add-address-body").css("display", "block");

  });

  $("#cancel-btn").click(function () {
    location.reload();
  });

  $("#next-btn").click(function () {

    if (!$("#next-btn").hasClass("disabled")) {

      var address_id = $(".radio-checked").attr("data-id");

      $.post(
        "php/setSession.php",
        {
          pg: "order_summary",
          address_id: address_id
        },
        function (data) {

          console.log(data);

          var mydata = JSON.parse(data);

          if (mydata.login_status == 1) {

            if (mydata.status == "All Set") {

              if (mydata.pres_req == 1) {

                if (mydata.img != '') {

                  if (mydata.address_json != '') {

                    var confirm = window.confirm("Are you sure want to proceed with this address & phone no.?");

                    if (confirm) {

                        window.location.href = "payment";

                    }

                  }
                  else {

                    alert("Something's went wrong! Please try again later.");

                  }

                }
                else {

                  alert("Something's went wrong! Please try again later.");

                }

              }
              else {

                if (mydata.address_json != '') {

                  var confirm = window.confirm("Are you sure want to proceed with this address & phone no.?");

                  if (confirm) {

                      window.location.href = "payment";

                  }

                }
                else {

                  alert("Something's went wrong! Please try again later.");

                }

              }

            }
            else {

              alert("Something's went wrong! Please try again later.");

            }

          }
          else {

            alert("Something's went wrong! Please try again later.");

          }
      });

    }

  });

});

function editAddress(id) {

  $.post(
    "php/edit_address.php",
    {
      address_id: id
    },
    function (data) {

      console.log(data);

      var myobj = JSON.parse(data);

      if (myobj.status != 0) {

        $("#address-header").html("<i class='fa fa-plus'></i> Update Address");

        $("#full-name").val(myobj.json[0].full_name);

        $("#address-line1").val(myobj.json[0].address_line1);

        $("#address-line2").val(myobj.json[0].address_line2);

        $("#city").val(myobj.json[0].city);

        $("#region").val(myobj.json[0].region);

        $("#postal-code").val(myobj.json[0].postal_code);

        $("#phone").val(myobj.json[0].phone);

        $("#country").val(myobj.json[0].country);

        $("#address_id").val(id);

        $("#mode").val("Update Address");

        $("#cancel-btn").css("display", "block");

        $("#address-list").remove();

      }
      else {

        alert("Something's went wrong! Please try again later.");

      }

    }
  );

}

function deleteAddress(id) {

  var confirm = window.confirm("Are you sure you want to delete that address?");

  if (confirm) {

    $.post(
      "php/delete_address.php",
      {
        address_id: id
      },
      function (data) {

        if (data == "Deleted") {

          location.reload();

        }
        else {

          alert("Something's went wrong! Please try again later.");

        }

      }
    );

  }

}
