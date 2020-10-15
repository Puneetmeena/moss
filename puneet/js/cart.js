$(document).ready(function(){

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

  $.post("php/cart.php", function(data) {

      var irp = 0;

      var inrp = 0;

      myobj = JSON.parse(data);

      if (myobj.length != 0) {

        var total_items = 0;

        var total_price = 0;

        for (var i = 0; i < myobj.length; i++) {

          mydata = JSON.parse(myobj[i]);

          console.log(mydata);

          total_items += parseInt(mydata.quantity);

          if (mydata.prescription_required == "No") {

            inrp++;

            if (mydata.image_url != "") {

              if (mydata.offer_mrp != 0) {

                total_price += (parseFloat(mydata.offer_mrp) * parseInt(mydata.quantity));

                $("#items-not-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='" + mydata.image_url + "' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.offer_mrp + "</span>" +
      									"</div>" +
      									"<div id='price' style='display: inline-block; padding-left: 5px; color: grey; text-decoration: line-through;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      								"<div id='save' style='margin-top: 5px; color: #388e3c; font-weight: 550; font-size: 15px;'>" +
      									"Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
              else {

                total_price += (parseFloat(mydata.mrp) * parseInt(mydata.quantity));

                $("#items-not-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='" + mydata.image_url + "' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
            }
            else {

              if (mydata.offer_mrp != 0) {

                total_price += (parseFloat(mydata.offer_mrp) * parseInt(mydata.quantity));

                $("#items-not-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='img/coming_soon.jpeg' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.offer_mrp + "</span>" +
      									"</div>" +
      									"<div id='price' style='display: inline-block; padding-left: 5px; color: grey; text-decoration: line-through;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      								"<div id='save' style='margin-top: 5px; color: #388e3c; font-weight: 550; font-size: 15px;'>" +
      									"Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
              else {

                total_price += (parseFloat(mydata.mrp) * parseInt(mydata.quantity));

                $("#items-not-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='img/coming_soon.jpeg' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }

            }

          }
          else {
            console.log(parseFloat(mydata.offer_mrp));
            irp++;
            if (mydata.image_url != "") {

              if (parseFloat(mydata.offer_mrp) != 0) {

                console.log("hola");

                total_price += (parseFloat(mydata.offer_mrp) * parseInt(mydata.quantity));

                $("#items-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='" + mydata.image_url + "' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.offer_mrp + "</span>" +
      									"</div>" +
      									"<div id='price' style='display: inline-block; padding-left: 5px; color: grey; text-decoration: line-through;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      								"<div id='save' style='margin-top: 5px; color: #388e3c; font-weight: 550; font-size: 15px;'>" +
      									"Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
              else {

                total_price += (parseFloat(mydata.mrp) * parseInt(mydata.quantity));

                $("#items-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='" + mydata.image_url + "' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
            }
            else {
              if (mydata.offer_mrp != 0) {

                total_price += (parseFloat(mydata.offer_mrp) * parseInt(mydata.quantity));

                $("#items-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='img/coming_soon.jpeg' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.offer_mrp + "</span>" +
      									"</div>" +
      									"<div id='price' style='display: inline-block; padding-left: 5px; color: grey; text-decoration: line-through;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      								"<div id='save' style='margin-top: 5px; color: #388e3c; font-weight: 550; font-size: 15px;'>" +
      									"Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
              else {

                total_price += (parseFloat(mydata.mrp) * parseInt(mydata.quantity));

                $("#items-requiring-prescription").append("<div class='details'>" +
      						"<div class='row' style='margin: 0;'>" +
      							"<div class='col-md-3 col-sm-3 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='prod-img'>" +
      									"<img class='img-thumbnail' style='width: 120px; height: 100px;' src='img/coming_soon.jpeg' alt='" + mydata.product_name + "'>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-md-9 col-sm-9 col-xs-6' style='padding-left: 0;'>" +
      								"<div id='med-name'>" +
      									"<span>" + mydata.product_name + "</span>" +
      								"</div>" +
      								"<div id='company_name'>" +
      									"<a href=''>" + mydata.company_name + "</a>" +
      								"</div>" +
      								"<div>" +
      									"<div id='offer-price' style='display: inline-block;'>" +
      										"&#8377; <span>" + mydata.mrp + "</span>" +
      									"</div>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      						"<div class='row' style='margin: 10px 0 0 0;'>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='quantity'>" +
      									"<button type='button' onclick='quantityDec(" + i + ", " + mydata.id + ");' id='quantity-dec' name='button'>-</button>" +
      									"<span style='padding: 5px;'>" + mydata.quantity + "</span>" +
      									"<button type='button' onclick='quantityInc(" + i + ", " + mydata.id + ");' id='quantity-inc' name='button'>+</button>" +
      								"</div>" +
      							"</div>" +
      							"<div class='col-xs-6' style='padding: 0;'>" +
      								"<div id='remove'>" +
      									"<button type='button' onclick='remove(" + mydata.id +");' name='button'><span class='fa fa-trash'></span> Remove</button>" +
      								"</div>" +
      							"</div>" +
      						"</div>" +
      					"</div>");

              }
            }
          }

        }

        if (irp == 0) {
          $("#irp").remove();
        }
        else {

          $("#irp span").html(irp);

          $("#irp").css("display", "block;");

        }

        if (inrp == 0) {

          $("#inrp").remove();

        }
        else {

          $("#inrp span").html(inrp);

          $("#inrp").css("display", "block;");

        }

        $("#total-items").html(total_items);

        $("#total-price span").html(Math.round(total_price * 100) / 100);

        $("#amt-payable span").html(Math.round(total_price * 100) / 100);

      }
      else {

        //$("#cart-items").html("<h1>No items in your cart</h1>");

      }
    }
  );

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

  $("#quantity-dec").click(function(){

    var quantity = $("#quantity span").html();

    if (quantity == 1) {

    }
    else {
      quantity--;

      $("#quantity span").html(quantity);

    }
  });

  $("#quantity-inc").click(function(){

    var quantity = $("#quantity span").html();

    if (quantity == 10) {

    }
    else {
      quantity++;

      $("#quantity span").html(quantity);

    }

  });

  $("#checkout-btn").click(function () {
    $.post(
      "php/logincheck.php",
      function (data) {

        var myobj = JSON.parse(data);

        if (myobj.status == 1) {

          $.post(
            "php/checkout.php",
            function (data) {

              console.log(data);

              var myobj = JSON.parse(data);

              //alert(myobj.status);

              if (myobj.status == "Row Inserted") {

                if (myobj.prescription_required_meds == 1) {

                  //window.location.href = "php/setSession.php?pg=cart";

                  $.post(
                    "php/setSession.php",
                    {
                      pg: "cart"
                    },
                    function (data) {

                      console.log(data);

                      var mydata = JSON.parse(data);

                      if (mydata.login_status == 1) {

                        if (mydata.status == "All Set") {

                          if (mydata.pres_req == 1) {

                            window.location.href = "upload_prescription";

                          }
                          else {

                            window.location.href = "order_summary";

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
                else {

                  $.post(
                    "php/setSession.php",
                    {
                      pg: "cart"
                    },
                    function (data) {

                      var mydata = JSON.parse(data);

                      if (mydata.login_status == 1) {

                        if (mydata.status == "All Set") {

                          if (mydata.pres_req == 1) {

                            window.location.href = "upload_prescription";

                          }
                          else {

                            window.location.href = "order_summary";

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

              }
              else if (myobj.status == "Row Updated") {

                //alert(myobj.status);

                if (myobj.prescription_required_meds == 1) {

                  $.post(
                    "php/setSession.php",
                    {
                      pg: "cart"
                    },
                    function (data) {

                      var mydata = JSON.parse(data);

                      if (mydata.login_status == 1) {

                        if (mydata.status == "All Set") {

                          if (mydata.pres_req == 1) {

                            window.location.href = "upload_prescription";

                          }
                          else {

                            window.location.href = "order_summary";

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
                else {

                  $.post(
                    "php/setSession.php",
                    {
                      pg: "cart"
                    },
                    function (data) {

                      console.log(data);

                      var mydata = JSON.parse(data);

                      if (mydata.login_status == 1) {

                        if (mydata.status == "All Set") {

                          if (mydata.pres_req == 1) {

                            window.location.href = "upload_prescription";

                          }
                          else {

                            window.location.href = "order_summary";

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

              }
              else if(myobj.status == "Something went wrong! Please try again later.") {

                alert(myobj.status);

              }
              else if (myobj.status == "Please insert some medicines in your cart") {

                alert(myobj.status);

              }

            }

          );

        }
        else {
          $("#myModal").modal("show");
        }
      }
    );
  });

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

function quantityInc(no, id) {

  //var quantity = $("#quantity-" + no).html();

  $.post(
    "php/quantity_change.php",
    {
      type: 'inc',
      id: id
    },
    function (data) {

      if (data != "Something's not right Please try again!") {

        //var myobj = JSON.parse(data);

        /*var total_items = 0;

        var total_price = 0;

        for (var i = 0; i < myobj.length; i++) {

          total_items += parseInt(myobj[i].quantity);

          total_price += parseFloat(myobj[i].mrp);

        }

        alert(total_price);

        $("#total-items").html(total_items);

        $("#total-price span").html(Math.round(total_price * 100) / 100);*/

        location.reload();

      }

      else {

        alert(data);

      }

    }
  );

  /*if (quantity >= 10) {

  }
  else {

    $("#quantity-" + no).html(quantity);

  }*/

}


function quantityDec(no, id) {

  $.post(
    "php/quantity_change.php",
    {
      type: 'dec',
      id: id
    },
    function (data) {

      if (data != "Something's not right Please try again!") {

        /*var total_items = 0;

        var total_price = 0;

        for (var i = 0; i < myobj.length; i++) {

          total_items += parseInt(myobj[i].quantity);

          total_price += parseFloat(myobj[i].mrp);

        }

        alert(total_price);

        $("#total-items").html(total_items);

        $("#total-price span").html(Math.round(total_price * 100) / 100);*/

        location.reload();

      }

      else {

        alert(data);

      }

    }
  );

}

function remove(id) {

  $.post(
    "php/remove.php",
    {
      id: id
    },
    function (data){

      if (data != "Something's not right Please try again!") {

        location.reload();

      }
      else {

      }

    }
  );

}
