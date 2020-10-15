
   $(document).ready(function() {

     geoLocation();

     function geoLocation() {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition);
       }
       else {
         alert("Geo Location is not Supported on your browser");
       }
     }

     function showPosition(position) {
       var locAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude +","+ position.coords.longitude +"&sensor=true";

       $.get({
         url: locAPI,
         success: function (data) {
           $(".location span").html(data.results[0].address_components[5].long_name);
         }
       });
     }

     $(".location a").click(function () {

     });

     var owl = $('.owl-carousel');
     owl.owlCarousel({
       items: 5,
       loop: true,
       margin: 10,
       autoplay: true,
       autoplayTimeout: 2500,
       autoplayHoverPause: true
     });
     $('.play').on('click', function() {
       owl.trigger('play.owl.autoplay', [1000])
     });
     $('.stop').on('click', function() {
       owl.trigger('stop.owl.autoplay')
     });
  });

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

  /*$("#upper-list a").click(function () {
    var category_name = $(this).html().trim();

    window.location.href = "page2?sub-category=" + category_name;
  });*/

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

  $("#anti-cancer-btn").click(function () {
    window.location.href = 'page2?category=Cancer Care';
  });

  $("#otc-btn").click(function () {
    window.location.href = 'page2?category=OTC';
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

/*$.post(
  "php/data_fetch.php",
  {
    data_type: "Cancer Care"
  },
  function (data) {

    var myobj;

    myobj = JSON.parse(data);

    if (myobj.length) {

      var myobj;

      myobj = JSON.parse(data);

      if (myobj.length) {

        for(var i = 0; i < myobj.length; i++) {

          var myobj2;

          myobj2 = JSON.parse(myobj[i]);

          $("#anti-cancer-carousel").append(
            "<div class='item'>" +
              "<div class='col-sm-12 col-xs-12'>" +
                "<a href='page3?med_name=" + myobj2.product_name + "&id=" + myobj2.id + "' style='text-decoration: none;' class='thumbnail'>" +
                  "<img src='" + myobj2.image_url + "' style='width:100%; height: 155px;' alt='' />" +
                  "<div class='desc' style='text-align: center; height: 120px; padding-top: 10px;'>" +
                    "<div style='font-size: 16px; font-weight: bold; color: black;' class=''>" +
                      myobj2.product_name +
                    "</div>" +
                    "<div style='font-size: 12px; color: gray;' class=''>" +
                      myobj2.company_name +
                    "</div>" +
                    "<div class=''>" +
                      "<div style='display: inline-block; padding: 2px; color: #9e9e9e; text-decoration: line-through;'>&#8377;" + myobj2.mrp +"</div>" +
                      "<div id='save-txt' style='display: inline-block; padding: 2px; color: green; font-size: 12px;'>Save " + Math.round((myobj2.mrp - myobj2.mrp) / myobj2.mrp * 100) + "%</div>" +
                    "</div>" +
                    "<div class='' style='font-size: 20px; font-weight: bold;'>" +
                      "&#8377;" + myobj2.mrp + "" +
                    "</div>" +
                  "</div>" +
                "</a>" +
              "</div>" +
            "</div>"
          );

        }

      }

    }

  }
);

$.post(
  "php/data_fetch.php",
  {
    data_type: "OTC"
  },
  function (data) {

    var myobj;

    myobj = JSON.parse(data);

    if (myobj.length) {

      for(var i = 0; i < myobj.length; i++) {

        var myobj2;

        myobj2 = JSON.parse(myobj[i]);

        $("#otc-carousel").append(
          "<div class='item'>" +
            "<div class='col-sm-12 col-xs-12'>" +
              "<a href='page3?med_name=" + myobj2.product_name + "&id=" + myobj2.id + "' style='text-decoration: none;' class='thumbnail'>" +
                "<img src='" + myobj2.image_url + "' style='width:100%; height: 155px;' alt='' />" +
                "<div class='desc' style='text-align: center; height: 120px; padding-top: 10px;'>" +
                  "<div style='font-size: 16px; font-weight: bold; color: black;' class=''>" +
                    myobj2.product_name +
                  "</div>" +
                  "<div style='font-size: 12px; color: gray;' class=''>" +
                    myobj2.company_name +
                  "</div>" +
                  "<div class=''>" +
                    "<div style='display: inline-block; padding: 2px; color: #9e9e9e; text-decoration: line-through;'>&#8377;" + myobj2.mrp +"</div>" +
                    "<div id='save-txt' style='display: inline-block; padding: 2px; color: green; font-size: 12px;'>Save " + Math.round((parseFloat(myobj2.mrp) - parseFloat(myobj2.mrp)) / parseFloat(myobj2.mrp) * 100) + "%</div>" +
                  "</div>" +
                  "<div class='' style='font-size: 20px; font-weight: bold;'>" +
                    "&#8377;" + myobj2.mrp + "" +
                  "</div>" +
                "</div>" +
              "</a>" +
            "</div>" +
          "</div>"
        );

      }

    }

  }
);*/
