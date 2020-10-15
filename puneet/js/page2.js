$(document).ready(function(){

  var search_for = window.location.search;

  if (search_for == "") {

    window.location.href = "index";

  }
  else if (search_for.search("search=") == -1 && search_for.search("category=") == -1) {

    window.location.href = "index";

  }

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


  var flag = 0;

  if (search_for.search("search=") != -1) {
    search_for = search_for.replace("?search=", "");

    $.post("php/decodeURL.php", {search_for: search_for}, function (data) {
      $("#search-for h2").html("Searches for: " + data);
    });

    $.post(
      "php/fetched_meds.php",
      {
        med_name: window.location.search,
        offset: 0,
        limit: 15
      },
      function(data){

        console.log(data);

        //alert(data);

        if (data != "no data") {
          myobj = JSON.parse(data);
          //console.log(myobj);

          for (var i = 0; i < myobj.length; i++) {
            if (myobj[i] != null) {
              var mydata = JSON.parse(myobj[i]);
              /*$("#medicines-grid").append("<div class='col-sm-3'><div class='thumbnail' style='cursor: default;'>" +
              "<a href='page3med-name=" + mydata.product_name + "&id=" + mydata.id + "'><img src='http://via.placeholder.com/350x150' alt='its me' /><div class='desc'><p class='mname'>" + mydata.product_name + "</p><br>" +
              "<label class='mprice col-md-6'>&#8377; " + mydata.mrp + "</label><label class='col-md-6' style='padding-left: 25px; padding-right: 0px;'>" +
              "<div class='mrate'><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>" +
              "</div></label><br></div></a><button class='mcart' onclick='addToCart(" + mydata.id + ");'><span><i class='fa fa-shopping-cart'></i></span> ADD TO CART</button></div></div>");*/
              if (mydata.offer_mrp != 0) {
                $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                  "<div class='container-wrapper'>" +
                    "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                      "<div class='row' style='margin: 0;'>" +
                        "<div class='col-md-8'>" +
                          "<h4>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>Price : &#8377; <span>" + mydata.offer_mrp + "</span></h5>" +
                          "<h5 id='price'><strike>PRICE : &#8377; <span>" + mydata.mrp + "</span></strike></h5>" +
                        "</div>" +
                        "<div class='col-md-12'>" +
                          "<div class='row'>" +
                            "<div class='col-md-8'>" +
                                "<h5 class='head'>SUB-CATEGORY</h5>" +
                            "</div>" +
                            "<div class='col-md-4' style='text-align:right;'>" +
                                "<h5 id='save-txt' style='color:#167943;'>Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%</h5>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                      "</a>" +
                      "<div class='row'>" +
                        "<div class='col-md-12'>" +
                          "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>");
              }
              else {
                $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                  "<div class='container-wrapper'>" +
                    "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                      "<div class='row' style='margin: 0;'>" +
                        "<div class='col-md-8'>" +
                          "<h4>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>Price : &#8377; <span>" + mydata.mrp + "</span></h5>" +
                        "</div>" +
                      "</div>" +
                      "</a>" +
                      "<div class='row'>" +
                        "<div class='col-md-12'>" +
                          "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>");
              }
            }
          }
          flag += 15;
        }
    });

    /*$(window).scroll(function () {
      if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
        $.post(
          "php/fetched_meds.php",
          {
            med_name: window.location.search,
            offset: flag,
            limit: 15
          },
          function(data){

            //alert(data);

            if (data != "no data") {
              myobj = JSON.parse(data);
              //console.log(myobj);

              for (var i = 0; i < myobj.length; i++) {
                if (myobj[i] != null) {
                  var mydata = JSON.parse(myobj[i]);
                  $("#medicines-grid").append("<div class='col-md-11' style='height: 80%;'>" +
                    "<div class='container-wrapper'>" +
                      "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                        "<div class='col-md-8'>" +
                          "<h4 style='font-family: serif;'>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5><br>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>PRICE : &#8377; <span>" + mydata.mrp + "</span></h5>" +
                          "<h5 id='price'><strike>PRICE : &#8377; <span>" + mydata.mrp + "</span></strike></h5><br>" +
                          "<h5 style='text-align: right;color: #167943;' id='save-txt'>Save " + Math.round((mydata.mrp - mydata.mrp) / mydata.mrp * 100) + "%</h5>" +
                        "</div>" +
                        "</a><button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>ADD TO CART</button>" +
                      "</div>" +
                    "</div>" +
                  "</div>");
                }
              }
              flag += 15;
            }
        });

      }
    });*/
  }
  else if (search_for.search("sub-category=") != -1) {

    console.log("enter");

    search_for = search_for.replace("?sub-category=", "");

    $.post("php/decodeURL.php", {search_for: search_for}, function (data) {
      $("#search-for h2").html("Searches for: " + data);
    });

    $.post(
      "php/fetched_meds.php",
      {
        sub_category: search_for,
        offset: 0,
        limit: 15
      },
      function(data){

        console.log(data);

        if (data != "no data") {
          myobj = JSON.parse(data);
          //console.log(myobj);

          for (var i = 0; i < myobj.length; i++) {
            if (myobj[i] != null) {
              var mydata = JSON.parse(myobj[i]);
              if (mydata.offer_mrp != 0) {
                $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                  "<div class='container-wrapper'>" +
                    "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                      "<div class='row' style='margin: 0;'>" +
                        "<div class='col-md-8'>" +
                          "<h4>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>Price : &#8377; <span>" + mydata.offer_mrp + "</span></h5>" +
                          "<h5 id='price'><strike>PRICE : &#8377; <span>" + mydata.mrp + "</span></strike></h5>" +
                        "</div>" +
                        "<div class='col-md-12'>" +
                          "<div class='row'>" +
                            "<div class='col-md-8'>" +
                                "<h5 class='head'>SUB-CATEGORY</h5>" +
                            "</div>" +
                            "<div class='col-md-4' style='text-align:right;'>" +
                                "<h5 id='save-txt' style='color:#167943;'>Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%</h5>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                      "</a>" +
                      "<div class='row'>" +
                        "<div class='col-md-12'>" +
                          "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>");
              }
              else {
                $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                  "<div class='container-wrapper'>" +
                    "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                      "<div class='row' style='margin: 0;'>" +
                        "<div class='col-md-8'>" +
                          "<h4>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>Price : &#8377; <span>" + mydata.mrp + "</span></h5>" +
                        "</div>" +
                      "</div>" +
                      "</a>" +
                      "<div class='row'>" +
                        "<div class='col-md-12'>" +
                          "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>");
              }
            }
          }
          flag += 15;
        }
    });

    $(window).scroll(function () {
      if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
        $.post(
          "php/fetched_meds.php",
          {
            sub_category: search_for,
            offset: flag,
            limit: 15
          },
          function(data){

            //alert(data);

            if (data != "no data") {
              myobj = JSON.parse(data);
              //console.log(myobj);

              console.log(flag);

              for (var i = 0; i < myobj.length; i++) {
                if (myobj[i] != null) {
                  var mydata = JSON.parse(myobj[i]);
                  if (mydata.offer_mrp != 0) {
                    $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                      "<div class='container-wrapper'>" +
                        "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                          "<div class='row' style='margin: 0;'>" +
                            "<div class='col-md-8'>" +
                              "<h4>" + mydata.product_name + "</h4>" +
                              "<h5 class='head'>" + mydata.company_name + "</h5>" +
                              "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                            "</div>" +
                            "<div class='col-md-4'>" +
                              "<h5 id='price'>Price : &#8377; <span>" + mydata.offer_mrp + "</span></h5>" +
                              "<h5 id='price'><strike>PRICE : &#8377; <span>" + mydata.mrp + "</span></strike></h5>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                              "<div class='row'>" +
                                "<div class='col-md-8'>" +
                                    "<h5 class='head'>SUB-CATEGORY</h5>" +
                                "</div>" +
                                "<div class='col-md-4' style='text-align:right;'>" +
                                    "<h5 id='save-txt' style='color:#167943;'>Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%</h5>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                          "</a>" +
                          "<div class='row'>" +
                            "<div class='col-md-12'>" +
                              "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>");
                  }
                  else {
                    $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                      "<div class='container-wrapper'>" +
                        "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                          "<div class='row' style='margin: 0;'>" +
                            "<div class='col-md-8'>" +
                              "<h4>" + mydata.product_name + "</h4>" +
                              "<h5 class='head'>" + mydata.company_name + "</h5>" +
                              "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                            "</div>" +
                            "<div class='col-md-4'>" +
                              "<h5 id='price'>Price : &#8377; <span>" + mydata.mrp + "</span></h5>" +
                            "</div>" +
                          "</div>" +
                          "</a>" +
                          "<div class='row'>" +
                            "<div class='col-md-12'>" +
                              "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>");
                  }
                }
              }
              flag += 15;
            }
        });

      }
    });

  }
  else if (search_for.search("category=") != -1) {

    search_for = search_for.replace("?category=", "");

    $.post("php/decodeURL.php", {search_for: search_for}, function (data) {
      $("#search-for h2").html("Searches for: " + data);
    });

    $.post(
      "php/fetched_meds.php",
      {
        category: search_for,
        offset: 0,
        limit: 15
      },
      function(data){

        if (data != "no data") {
          myobj = JSON.parse(data);
          //console.log(myobj);

          for (var i = 0; i < myobj.length; i++) {
            if (myobj[i] != null) {
              var mydata = JSON.parse(myobj[i]);
              if (mydata.offer_mrp != 0) {
                $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                  "<div class='container-wrapper'>" +
                    "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                      "<div class='row' style='margin: 0;'>" +
                        "<div class='col-md-8'>" +
                          "<h4>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>Price : &#8377; <span>" + mydata.offer_mrp + "</span></h5>" +
                          "<h5 id='price'><strike>PRICE : &#8377; <span>" + mydata.mrp + "</span></strike></h5>" +
                        "</div>" +
                        "<div class='col-md-12'>" +
                          "<div class='row'>" +
                            "<div class='col-md-8'>" +
                                "<h5 class='head'>SUB-CATEGORY</h5>" +
                            "</div>" +
                            "<div class='col-md-4' style='text-align:right;'>" +
                                "<h5 id='save-txt' style='color:#167943;'>Save " + Math.round((mydata.mrp - mydata.offer_mrp) / mydata.mrp * 100) + "%</h5>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                      "</a>" +
                      "<div class='row'>" +
                        "<div class='col-md-12'>" +
                          "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>");
              }
              else {
                $("#medicines-grid").append("<div class='col-md-12' style='height: auto;'>" +
                  "<div class='container-wrapper'>" +
                    "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                      "<div class='row' style='margin: 0;'>" +
                        "<div class='col-md-8'>" +
                          "<h4>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>Price : &#8377; <span>" + mydata.mrp + "</span></h5>" +
                        "</div>" +
                      "</div>" +
                      "</a>" +
                      "<div class='row'>" +
                        "<div class='col-md-12'>" +
                          "<button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>Add to Cart</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>");
              }
            }
          }
          flag += 15;
        }
    });

    /*$(window).scroll(function () {
      if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
        $.post(
          "php/fetched_meds.php",
          {
            category: search_for,
            offset: flag,
            limit: 15
          },
          function(data){

            //alert(data);

            if (data != "no data") {
              myobj = JSON.parse(data);
              //console.log(myobj);

              for (var i = 0; i < myobj.length; i++) {
                if (myobj[i] != null) {
                  var mydata = JSON.parse(myobj[i]);
                  $("#medicines-grid").append("<div class='col-md-11' style='height: 80%;'>" +
                    "<div class='container-wrapper'>" +
                      "<div class='thumbnail center-block'><a href='page3?med-name=" + mydata.product_name + "&id=" + mydata.id + "'>" +
                        "<div class='col-md-8'>" +
                          "<h4 style='font-family: serif;'>" + mydata.product_name + "</h4>" +
                          "<h5 class='head'>" + mydata.company_name + "</h5><br>" +
                          "<h5 class='head'>" + mydata.sub_category + "</h5>" +
                        "</div>" +
                        "<div class='col-md-4'>" +
                          "<h5 id='price'>PRICE : &#8377; <span>" + mydata.mrp + "</span></h5>" +
                          "<h5 id='price'><strike>PRICE : &#8377; <span>" + mydata.mrp + "</span></strike></h5><br>" +
                          "<h5 style='text-align: right;color: #167943;' id='save-txt'>Save " + Math.round((mydata.mrp - mydata.mrp) / mydata.mrp * 100) + "%</h5>" +
                        "</div>" +
                        "</a><button type='button' onclick='addToCart(" + mydata.id + ");' id='delete' name='button' class='delete'><i class='fa fa-shopping-cart' style='padding-right: 10px;bottom: 0;'></i>ADD TO CART</button>" +
                      "</div>" +
                    "</div>" +
                  "</div>");
                }
              }
              flag += 15;
            }
        });

      }
    });*/

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

function addToCart(i) {
  var id = i;

  $.post(
    "php/add_to_cart.php",
    {
      med_id: id
    },
    function (data) {

      //alert(data);

      console.log(data);

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

}
