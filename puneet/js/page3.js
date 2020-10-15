var search_for = window.location.search;

$(document).ready(function(){

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

  var search_for = window.location.search;

  if (search_for == "") {

    window.location.href = "index";

  }
  else if (search_for.search("med-name=") == -1) {

    window.location.href = "index";

  }
  else if (search_for.search("id=") == -1){

    window.location.href = "index";

  }
  else {

    $.post("php/decodeURL.php", {search_for: search_for}, function (data) {
      var params = data;

      $.post(
        "php/page3.php",
        {
          json: params
        },
        function (data) {

          myobj = JSON.parse(data);

          console.log(myobj.missed_dosage);


          if (myobj.image_url != "") {

            $("#img img").attr("src", myobj.image_url);

          }

          if (myobj.med_name != "") {

            $("#med_name h2").html(myobj.med_name);

          }

          if (myobj.company_name != "") {

            $("#company_name a").html(myobj.company_name);

          }

          if (myobj.offer_mrp != "") {

            if (myobj.offer_mrp == 0) {

              if (myobj.mrp != "") {

                $("#offer-price span").html(myobj.mrp);

                $("#price").remove();

                $("#save-txt").remove();

                $("#offer-price").css("display", "inline-block");

              }

            }
            else {

              if (myobj.mrp != "") {

                $("#offer-price span").html(myobj.offer_mrp);

                $("#price span").html(myobj.mrp);

                $("#save-txt span").html(Math.round((myobj.mrp - myobj.offer_mrp) / myobj.mrp * 100));

                $("#offer-price").css("display", "inline-block");

                $("#price").css("display", "inline-block");

                $("#save-txt").css("display", "inline-block");

              }

            }

          }

          if (myobj.storage != "") {

            $("#storage p").html(myobj.storage);

          }

          if (myobj.prescription_required == "Yes") {

            $("#prescription-required span").html("Prescription is required");

            $("#prescription-required").css("display", "block");

          }
          else {

            $("#item-status").remove();

          }

          if (myobj.primarily_used != "") {

            $("#primarily-used span").html(myobj.primarily_used);

          }

          if (myobj.composition != "") {

            $("#composition span").html(myobj.composition);

          }

          if (myobj.pack_size != "") {

            $("#pack-size span").html(myobj.pack_size);

          }

          if (myobj.description != "") {

            $("#desc").html(myobj.description);

          }

          if (myobj.instructions_for_the_patients == "") {

            $("#instructions-for-the-patients").remove();

            $("#iftp-hr").remove();
          }
          else {

            $("#instructions-for-the-patients p").html(myobj.instructions_for_the_patients);

            $("#instructions-for-the-patients").css("display", "block");

            $("#iftp-hr").css("display", "block");

          }

          if (myobj.side_effects != "") {

            $("#side-effects p").html(myobj.side_effects);

          }
          else {

            $("#side-effects").remove();

            $("#se").remove();

          }

          if (myobj.missed_dosage != '') {
            $("#missed-dosage p").html(myobj.missed_dosage);
          }
          else {
            $("#missed-dosage").remove();
          }

          $.post(
            "php/substitute_products.php",
            {
              id: myobj.id,
              composition: myobj.composition
            },
            function (data) {

              mydata = JSON.parse(data);

              if (mydata.length) {

                for (var i = 0; i < mydata.length; i++) {

                  mydata1 = JSON.parse(mydata[i]);

                  if (mydata1.offer_mrp != 0) {

                    $("#sub-products").append("<li class='als-item' style='background-color: #f1f1f1; border-bottom: 1px solid #DED6D5;'>" +
                      "<div class='row' style='margin: 0px;'>" +
                        "<div class='col-md-9 col-sm-9 col-xs-9'>" +
                          "<div style='text-align: left; font-weight: bold; font-size: 14px;'>" +
                            mydata1.product_name +
                          "</div>" +
                        "</div>" +
                        "<div class='col-md-3 col-sm-3 col-xs-3'>" +
                          "&#8377; "+ mydata1.offer_mrp +
                        "</div>" +
                      "</div>" +
                      "<div class='row' style='margin: 2px 0px;'>" +
                        "<div class='col-md-9 col-sm-9 col-xs-9'>" +
                          "<div style='text-align: left; font-weight: lighter; font-size: 12px;'>" +
                            mydata1.company_name +
                          "</div>" +
                        "</div>" +
                        "<div class='col-md-3 col-sm-3 col-xs-3'>" +
                          "<div style='text-decoration: line-through;'>" +
                            "&#8377; " + mydata1.mrp +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                      "<div class='row' style='margin: 2px 0px;'>" +
                        "<div class='col-md-offset-9 col-md-3 col-sm-12 col-xs-12'>" +
                          "<div id='save-txt' style='text-align: center;'>" +
                            "Save "+ Math.round((mydata1.mrp - mydata1.mrp) / mydata1.mrp * 100) +"%" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</li>");

                  }
                  else {

                    $("#sub-products").append("<li class='als-item' style='background-color: #f1f1f1; border-bottom: 1px solid #DED6D5;'>" +
                      "<div class='row' style='margin: 0px;'>" +
                        "<div class='col-md-9 col-sm-9 col-xs-9'>" +
                          "<div style='text-align: left; font-weight: bold; font-size: 14px;'>" +
                            mydata1.product_name +
                          "</div>" +
                        "</div>" +
                        "<div class='col-md-3 col-sm-3 col-xs-3'>" +
                          "&#8377; "+ mydata1.mrp +
                        "</div>" +
                      "</div>" +
                      "<div class='row' style='margin: 2px 0px;'>" +
                        "<div class='col-md-9 col-sm-9 col-xs-9'>" +
                          "<div style='text-align: left; font-weight: lighter; font-size: 12px;'>" +
                            mydata1.company_name +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</li>");

                  }

                }

                if (mydata.length > 4) {

                  $("#demo1").als({
                     visible_items: 4,
                     scrolling_items: 1,
                     orientation: "vertical",
                     circular: "yes",
                     autoscroll: "yes",
                     interval: 2000
                  });

                }
                else {

                }

              }
              else {

                $("#demo1").html("<p>There is no substitute products</p>");

              }

            }
          );

        }
      );
    });


  }

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
          }

        }
      );
      $(".search-form ul").css("display", "block");
    }
    else {
      $(".search-form ul").css("display", "none");
    }
  });

  $("#search-form").on("submit", function(){

    //alert($("#search-form ul").css("display"));

    if ($("#search-form ul").css("display") == "block") {

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


$(document).ready(function(){
	$(".str").on('click', function(){
		$(".str").removeClass("checked");
		$(".str").removeClass("secondary-checked");
		$(this).addClass("checked");
		$(this).prevAll().addClass("secondary-checked");
	});
	$(".str").mouseenter(function(){
		$(this).addClass("active");
		$(this).prevAll().addClass("secondary-active");
	});
	$(".str").mouseleave(function(){
		$(".str").removeClass("active");
		$(".str").removeClass("secondary-active");
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

  $("#add-to-cart-btn").click(function(){

    var cart = getJsonFromUrl(search_for);

    $.post(
      "php/add_to_cart.php",
      {
        med_id: cart.id
      },
      function (data) {

        var myobj = JSON.parse(data);

        if (myobj.status == "item added in your cart" || myobj.status == "Item is already in cart") {

          if (myobj.cart_items != '') {

            var myobj2 = JSON.parse(myobj.cart_items);

            $("#cart_no_of_items").html(myobj2.length);
            $("#cart_no_of_items").css("visibility", "visible");

            alert(myobj.status);

          }
          else {

            $("#cart_no_of_items").html(myobj.total_items);
            $("#cart_no_of_items").css("visibility", "visible");

            alert(myobj.status);

          }

        }

      }
    );

  });

  $("#buy-now-btn").click(function(){

    alert("Coming Soon..");

  });

});

function getJsonFromUrl(hashBased) {
var query;
if(hashBased) {
  var pos = location.href.indexOf("?");
  if(pos==-1) return [];
  query = location.href.substr(pos+1);
} else {
  query = location.search.substr(1);
}
var result = {};
query.split("&").forEach(function(part) {
  if(!part) return;
  part = part.split("+").join(" "); // replace every + with space, regexp-free version
  var eq = part.indexOf("=");
  var key = eq>-1 ? part.substr(0,eq) : part;
  var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
  var from = key.indexOf("[");
  if(from==-1) result[decodeURIComponent(key)] = val;
  else {
    var to = key.indexOf("]",from);
    var index = decodeURIComponent(key.substring(from+1,to));
    key = decodeURIComponent(key.substring(0,from));
    if(!result[key]) result[key] = [];
    if(!index) result[key].push(val);
    else result[key][index] = val;
  }
});
return result;
}
