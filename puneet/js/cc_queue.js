$(document).ready(function () {

  function time() {
    $.post(
      "php/admin_change_status.php",
      {
        pg: "cc_queue"
      },
      function (data) {
        console.log(data);
      }
    );
  }

  setInterval(time, 5000);

  function total_items() {
    $.post(
      "php/admin_total_items.php",
      function (data) {
        obj = JSON.parse(data);
        $("#cc_queue_items span").html(obj.cc_queue_items);
        $("#packaging_queue_items span").html(obj.packaging_queue_items);
        $("#shipping_queue_items span").html(obj.shipping_queue_items);
        $("#manage_queue_items span").html(obj.manage_queue_items);
        $("#collection_queue_items span").html(obj.collection_queue_items);
      }
    );
  }

  total_items();

  setInterval(total_items, 5000);

  var order_time = '';

  var time_format = '';

  var hh = '';

  var mm = '';

  var ss = '';

  var dd = '';

  var mM = '';

  var yyyy = '';

  var total_mrp = 0;

  var total_offer_mrp = 0;

  var shipping_price = 0;

  var key = window.location.search;

  var user_id = 0;

  var group_id = '';

  var order_id = '';

  if (key != '') {

    key = key.replace("?key=", "");

    $.post(
      "php/admin_login_check.php",
      function (data) {

        var myobj = JSON.parse(data);

        if (myobj.status == 1) {

          $("body").css("display", "block");

          $.post(
            "php/cc_queue.php",
            {
              id: key
            },
            function (data) {

              console.log(data);

              var myobj = JSON.parse(data);

              console.log(myobj);

              user_id = myobj.user_id;

              group_id = myobj.group_id;

              order_id = myobj.order_id;

              if (myobj.status == 1) {

                $("#packaging_queue_items span").html(myobj.packaging_queue_total_items);

                if (myobj.total_items != 0) {

                  $("#cc_queue_items span").html(myobj.total_items);

                }

                if (myobj.order_id != '') {

                  $("#order_id span").html(myobj.order_id);

                  $("#grp_id span").html(myobj.group_id);

                }

                if (myobj.order_json != '') {

                  myobj.order_json.forEach(function (el) {

                    total_mrp += el.mrp * el.quantity;

                    if (el.offer_mrp != 0) {

                      total_offer_mrp += el.offer_mrp * el.quantity;

                    }
                    else {

                      total_offer_mrp += el.mrp * el.quantity;

                    }

                  });

                }


                $("#cart_mrp span").html(total_offer_mrp.toFixed(2));

                $("#current_mrp span").html(total_offer_mrp.toFixed(2));

                $("#discounted_mrp span").html((total_mrp - total_offer_mrp).toFixed(2));

                if (myobj.shipping_price != '') {

                  shipping_price = parseInt(myobj.shipping_price);

                  total_offer_mrp += parseInt(myobj.shipping_price);

                  total_mrp += parseInt(myobj.shipping_price);

                  $("#shipping_price span").html(parseInt(myobj.shipping_price).toFixed(2));

                }

                $("#amt_payable span").html((total_offer_mrp).toFixed(2));

                if (myobj.order_time != '') {

                  order_time = myobj.order_time;

                  var d = new Date(order_time);

                  hh = d.getHours();

                  if (hh < 10) {

                    hh = '0' + hh;

                  }

                  mm = d.getMinutes();

                  if (mm < 10) {

                    mm = "0" + mm;

                  }

                  ss = d.getSeconds();

                  if (ss < 10) {

                    ss = "0" + ss;

                  }

                  dd = d.getDate();

                  if (dd < 10) {

                    dd = "0" + dd;

                  }

                  mM = d.getMonth() + 1;

                  if (mM < 10) {

                    mM = "0" + mM;

                  }

                  yyyy = d.getFullYear();

                  console.log(dd + "-" + mM + "-" + yyyy + "&nbsp;&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss);

                  $(".order_time span").html(dd + "-" + mM + "-" + yyyy + "&nbsp;&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss);

                  $(".o_time span").html(dd + "-" + mM + "-" + yyyy + "&nbsp;&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss);

                  $("#time_since span").html(timeSince(d.getTime()/1000));

                }

                //$("#patient_name span").html(myobj.user_json.firstname + " " + myobj.user_json.lastname);

                $("#patient_name span").html(myobj.name);

                $("#email span").html(myobj.email);

                $("#order_name span").html(myobj.order_name);

                $("#address_line1 span").html(myobj.address_json.address_line1);

                $("#address_line2 span").html(myobj.address_json.address_line2);

                $("#city span").html(myobj.address_json.city);

                $("#region").html(myobj.address_json.region);

                $("#postal_code").html(myobj.address_json.postal_code);

                $("#country span").html(myobj.address_json.country);

                $("#order_phone span").html(myobj.order_phone);

                if (myobj.prescription_confirmed == 1) {
                  $("#prescription-confirmed").prop("checked", true);
                }


                if (myobj.remarks_json != '') {

                  $("#remarks_show").html(myobj.remarks_json.remarks + " : <span style='font-weight:bold;'>" + myobj.remarks_json.added_by + "</span>");

                }
                else {

                  $("#remarks_show").html("No remarks");

                }

                if (myobj.doctor_name != '') {
                  $("#doc_name").val(myobj.doctor_name);
                }
                if (myobj.patient_name != '') {
                  $("#pat_name").val(myobj.patient_name);
                }

                if (myobj.img_date_json != null) {

                  if(myobj.img_date_json.length != 0) {

                    myobj.img_date_json.forEach(function (el) {

                      $("#prescription-details").append("<tr><td><a target='_blank' style='overflow: hidden; width: 31px; white-space: nowrap; text-overflow: ellipsis;display: inline-block;' href='img/rx_check_img/"+ myobj.order_id +"/" + el.img_name + "'>" + el.img_name + "</a><td><p>" + new Date(el.img_date).toDateString() + "</p><button class='delete-prescription-btn' data-id='" + el.img_name  + "'>Delete</button></td></tr>");

                    });

                    $(".delete-prescription-btn").click(function () {

                      var confirm = window.confirm("Are you sure want to delete that Image?");

                      var date = new Date();

                      var img_name = $(this).attr("data-id");

                      if (confirm) {

                        $.post(
                          "php/admin_delete_img.php",
                          {
                            date: date,
                            img_name: img_name,
                            group_id: group_id
                          },
                          function (data) {
                            console.log(data);
                            if (data == "Image Deleted") {
                              alert(data);
                              location.reload();
                            }
                            else {
                              alert("Something's went wrong! Please try again layer.");
                            }
                          }
                        );

                      }

                    });

                  }

                }

                var prescription_required = "No";

                myobj.med_info.forEach(function (el) {

                  if (el.prescription_required == "Yes") {
                    prescription_required = el.prescription_required;
                    $("#pres-checkbox").prop('checked', true);
                  }

                  $("#medicines-list").append("<div class='col-md-12 thumbnail'> " +
                    "<div class='col-md-12'>" +
                      "<div class='col-md-6'>" +
                        "<p>" + el.product_name + "</p>" +
                        "<p id='quantity-select'>" +
                          "Quantity: <button type='button' class='med-dec' data-id='"+el.id+"' name='button'>-</button>" +
                          "<span>"+ el.quantity +"</span> <button type='button' name='button' class='med-inc' data-id='"+el.id+"'>+</button>" +
                        "</p>" +
                      "</div>" +
                      "<div class='col-md-4'>" +
                          "<p style='font-size:0.9em;'>MRP: <span>Rs " + el.mrp + "</span></p>" +
                          "<p style='font-size: 0.9em;'>Offer Price: <span>Rs:" + el.offer_mrp + "</span></p>" +
                      "</div>" +
                      "<div class='col-md-2'>" +
                          "<button class='delete-med' style='border-width:1px;background-color:lightgrey;padding:6%;border-radius:10%;' data-id='"+el.id+"'>Delete</button>" +
                      "</div>" +
                    "</div>" +
                    "<div class='col-md-12' style='padding:0%;margin:0%;'>" +
                      "<div class='col-md-4'>" +
                        "<p style='font-size:0.9em;padding:0%;margin:0%;'>Selling Unit: <span>" + el.quantity + "</span></p>" +
                      "</div>" +
                      "<div class='col-md-offset-4 col-md-4'>" +
                        "<p style='font-size:0.9em;'>Prescription Required: "+ el.prescription_required +"</p>" +
                      "</div>" +
                    "</div>" +
                    "<div class='col-md-12'>" +
                        "<p style='font-size:0.9em'>label: <span>" + el.pack_size + "</span></p>" +
                    "</div>" +
                    "<div class='col-md-12'>" +
                        "<p style='font-size:0.9em'>Schedule: <span>H</span></p>" +
                    "</div>" +
                    "<div class='col-md-12'>" +
                      "<div class='col-md-12' style='padding: 0%;margin: 0%; text-align: right;'>" +
                          "<button style='background-color:green;color: #fff;border-width:1px;float:right;'>OK</button>" +
                      "</div>" +
                    "</div>" +
                  "</div>");
                });

                myobj.med_info.forEach(function (el, index) {
                  $("#excel-table tbody").append("<tr>" +
                    "<td>" + myobj.group_id + "</td>" +
                    "<td>" + myobj.order_id + "</td>" +
                    "<td>" + myobj.user_json.email + "</td>" +
                    "<td>" + dd + "-" + mM + "-" + yyyy + "  " + hh + ":" + mm + ":" + ss + "</td>" +
                    "<td>" + el.product_name + "</td>" +
                    "<td>" + (index + 1) + "</td>" +
                    "<td>" + (total_mrp - parseFloat(myobj.shipping_price)).toFixed(2) + "</td>" +
                    "<td>" + (total_offer_mrp - parseFloat(myobj.shipping_price)).toFixed(2) + "</td>" +
                    "<td>" + el.pack_size + "</td>" +
                    "<td>" + el.quantity + "</td>" +
                    "<td>" + parseFloat(myobj.shipping_price).toFixed(2) + "</td>" +
                    "<td>" + "" + "</td>" +
                    "<td>" + (total_offer_mrp - parseFloat(myobj.shipping_price)).toFixed(2) + "</td>" +
                    "<td>" + myobj.patient_name +"</td>" +
                    "<td>" + el.pack_size + "</td>" +
                    "<td>" + myobj.doctor_name + "</td>" +
                    "<td>" + myobj.order_phone + "</td>" +
                    "<td>" + myobj.address_json.address_line1 + ", " + myobj.address_json.address_line2 + ", " + myobj.address_json.city + ", " + myobj.address_json.region + "</td>" +
                    "<td>" + myobj.address_json.address_line1 + "</td>" +
                    "<td>" + myobj.address_json.address_line2 + "</td>" +
                    "<td>" + myobj.address_json.city + "</td>" +
                    "<td>" + myobj.address_json.postal_code + "</td>" +
                    "<td>" + myobj.address_json.region + "</td>" +
                    "<td>" + myobj.address_json.country + "</td>" +
                    "<td>" + myobj.split_time + "</td>" +
                    "<td>" + "" + "</td>" +
                    "<td>" + prescription_required + "</td>" +
                    "<td>" + myobj.remarks_json.remarks + "</td>" +
                    "<td>" + "" + "</td>" +
                  "</tr>");
                });

                $("#download-excel-btn").click(function () {

                  $("#excel-table").table2excel({
                    exclude: ".noExl",
    				        name: "Excel Document Name"
                  });

                });

                $("#search-med").on("keyup", function(e){
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
                  else {

                    var search_med = $("#search-med").val();
                    if (search_med != "") {
                      $.post("php/search.php",
                        {
                          med_name: search_med
                        },
                        function(data){
                          if (data != "No results") {
                            myobj = JSON.parse(data);

                            console.log(myobj);

                            $(".search-form ul li a").empty();
                            $(".search-form ul li").css("display", "none");

                            html = '';

                            for (var i = 0; i < 4; i++) {

                              if (myobj[i] != null) {

                                mydata = JSON.parse(myobj[i]);

                                if (i == 0) {
                                  if (mydata.offer_mrp != 0) {

                                    html += "<li class='select' data-id='" + mydata.id + "'><a>" + mydata.product_name + "<div style='font-size:12px;'>" + mydata.company_name + "</div><div style='font-size:12px;'>MRP: &#8377;" + mydata.mrp + "<span style='padding-left:5px;'>Offer MRP: &#8377;" + mydata.offer_mrp + "</span></div><div style='font-size:12px;'>Pack Size: " + mydata.pack_size + "</div></li>";

                                  }
                                  else {

                                    html += "<li class='select' data-id='" + mydata.id + "'><a>" + mydata.product_name + "<div style='font-size:12px;'>" + mydata.company_name + "</div><div style='font-size:12px;'>MRP: &#8377;" + mydata.mrp + "</div><div style='font-size:12px;'>Pack Size: " + mydata.pack_size + "</div></li>";

                                  }
                                }
                                else {

                                  if (mydata.offer_mrp != 0) {

                                    html += "<li data-id='" + mydata.id + "'><a>" + mydata.product_name + "<div style='font-size:12px;'>" + mydata.company_name + "</div><div style='font-size:12px;'>MRP: &#8377;" + mydata.mrp + "<span style='padding-left:5px;'>Offer MRP: &#8377;" + mydata.offer_mrp + "</span></div><div style='font-size:12px;'>Pack Size: " + mydata.pack_size + "</div></li>";

                                  }
                                  else {

                                    html += "<li data-id='" + mydata.id + "'><a>" + mydata.product_name + "<div style='font-size:12px;'>" + mydata.company_name + "</div><div style='font-size:12px;'>MRP: &#8377;" + mydata.mrp + "</div><div style='font-size:12px;'>Pack Size: " + mydata.pack_size + "</div></li>";

                                  }

                                }

                              }
                            }

                            console.log(html);

                            $(".search-form ul").html(html);

                            $(".search-form ul li").css("display", "block");

                          }
                          else {
                            $(".search-form ul li").css("display", "none");
                            $(".search-form ul").css("display", "none");
                            $(".search-form ul").attr("value", 0);
                          }

                          $(".search-form li").click(function () {
                            var data_id = $(this).attr("data-id");
                            var date = new Date();
                            $.post(
                              "php/admin_add_medicines.php",
                              {
                                data_id: data_id,
                                group_id: group_id,
                                date: date
                              },
                              function (data) {
                                console.log(data);

                                if (data == "Medicine Added Successfully") {
                                  alert(data);
                                  location.reload();
                                }
                                else if (data == "Medicine is already in order") {
                                  alert(data);
                                }
                                else {
                                  alert("Something's went wrong! Please try again later");
                                }
                              }
                            );

                          });

                        }
                      );
                      $(".search-form ul").css("display", "block");
                      $(".search-form ul").attr("value", 1);
                    }
                    else {
                      $(".search-form ul").css("display", "none");
                      $(".search-form ul").attr("value", 0);
                    }

                  }
                });

                $("body").on('click', function(){

                  $(".search-form ul").css("display", "none");

                });

                $(".med-dec").click(function () {
                  var med_id = $(this).attr("data-id");
                  var date = new Date();
                  var confirm = window.confirm("Are you sure want to decrement quantity?");
                  if (confirm) {
                    $.post(
                      "php/admin_med_change.php",
                      {
                        med_id: med_id,
                        group_id: group_id,
                        date: date,
                        mode: "quantity_decrement"
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Quantity Decremented") {
                          alert(data);
                          location.reload();
                        }
                        else {
                          alert("Something's went wrong! Please try again later.");
                        }
                      }
                    );
                  }
                });

                $(".med-inc").click(function () {
                  var med_id = $(this).attr("data-id");
                  var date = new Date();
                  var confirm = window.confirm("Are you sure want to increment quantity?");
                  if (confirm) {
                    $.post(
                      "php/admin_med_change.php",
                      {
                        med_id: med_id,
                        group_id: group_id,
                        date: date,
                        mode: "quantity_increment"
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Quantity Incremented") {
                          alert(data);
                          location.reload();
                        }
                        else {
                          alert("Something's went wrong! Please try again later.");
                        }
                      }
                    );
                  }
                });

                $(".delete-med").click(function () {
                  var med_id = $(this).attr("data-id");
                  var date = new Date();
                  var confirm = window.confirm("Are you sure want to delete that medicine?");
                  if (confirm) {
                    $.post(
                      "php/admin_med_change.php",
                      {
                        med_id: med_id,
                        group_id: group_id,
                        date: date,
                        mode: "med_delete"
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Medicine Deleted") {
                          alert(data);
                          location.reload();
                        }
                        else {
                          alert("Something's went wrong! Please try again later.");
                        }
                      }
                    );
                  }
                });

                var itr = 1;

                console.log(myobj.order_history);

                myobj.order_history.forEach(function (el) {

                  el.forEach(function (ele) {

                    $("#order-history").append("<tr><td>" + itr + ".</td><td> " + ele + " </td></tr>");

                    itr++;

                  });

                });

                $("#order-placed span").html(myobj.user_history[0].order_placed);

                $("#order-delivered span").html(myobj.user_history[0].order_delivered);

                $("#edit-address-btn").click(function (){

                  $("#edit-address_line1").val(myobj.address_json.address_line1);

                  $("#edit-address_line2").val(myobj.address_json.address_line2);

                  $("#edit-city").val(myobj.address_json.city);

                  $("#edit-region").val(myobj.address_json.region);

                  $("#edit-postal_code").val(myobj.address_json.postal_code);

                  $("#edit-phone").val(myobj.order_phone);

                  $("#edit-country").val(myobj.address_json.country);

                });

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

                $("#edit-change-address").on('submit', function () {

                  var address_line1 = $("#edit-address_line1").val();

                  var address_line2 = $("#edit-address_line2").val();

                  var city = $("#edit-city").val();

                  var region = $("#edit-region").val();

                  var postal_code = $("#edit-postal_code").val();

                  var phone = $("#edit-phone").val();

                  var country = $("#edit-country").val();

                  var group_id = myobj.group_id;

                  var date = new Date();

                  address_line1 = address_line1.trim();

                  address_line2 = address_line2.trim();

                  city = city.trim();

                  region = region.trim();

                  postal_code = postal_code.trim();

                  phone = phone.trim();

                  country = country.trim();

                  if (address_line1 == "" &&
                      address_line2 == "" &&
                      city == "" &&
                      region == "" &&
                      postal_code == "" &&
                      phone == "" &&
                      country == "") {

                        alert("All fields are required");

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
                  else {

                    var confirm = window.confirm("Are you sure want to proceed with that address and phone no.?");

                    if (confirm) {

                      $.post(
                        "php/change_address.php",
                        {
                          address_line1: address_line1,
                          address_line2: address_line2,
                          city: city,
                          region: region,
                          postal_code: postal_code,
                          phone: phone,
                          country: country,
                          group_id: group_id,
                          id: key,
                          date: date
                        },
                        function (data) {

                          console.log(data);

                          if (data == "Address Edited Successfully") {

                            alert(data);

                            location.reload();

                          }
                          else {

                            alert("Something's went wrong! Please try again later.");

                          }

                        }
                      );

                    }


                  }

                });

                $.post(
                  "php/admin_address_fetch.php",
                  {
                    user_id: myobj.user_id
                  },
                  function (data) {

                    console.log(data);

                    var mydata = JSON.parse(data);

                    console.log(mydata);

                    if (mydata.admin_status != 0) {

                      if (mydata.total_address == 0) {

                        $("#address-list").remove();

                        $("#add-address-body").css("display", "block");

                      }
                      else if (mydata.json != '' && mydata.total_address < 6) {

                        $("#add-address-body").css("display", "block");

                        console.log(mydata.json);

                        var cls = "";

                        for (var i = 0; i < mydata.json.length; i++) {

                          if (i == 0) {
                            cls = "radio-checked";
                          }
                          else {
                            cls = "";
                          }

                          $("#all-address").append("<li style='margin-top: 5px;'>" +
                            "<div class='row' style='margin: 0;'>" +
                              "<div class='col-md-8 col-xs-9' style='padding: 0;'>" +
                                "<div class='row' style='margin: 0;'>" +
                                  "<div class='col-md-1 col-xs-2' style='padding-left: 0;'>" +
                                    "<div class='radio-btn "+ cls +"' data-id=" + mydata.json[i].id + ">" +
                                    "</div>" +
                                  "</div>" +
                                  "<div class='col-md-11 col-xs-10' style='font-size: 12px; padding-left: 0;'>" +
                                    "<div id='full-name' style='font-weight: bold;'>" +
                                      "<span>"+ mydata.json[i].name +"</span>" +
                                    "</div>" +
                                    "<div>" +
                                      mydata.json[i].address_json.address_line1  +", " +
                                      mydata.json[i].address_json.address_line2  +", " +
                                      mydata.json[i].address_json.city  +", " +
                                      mydata.json[i].address_json.region + ", " +
                                      mydata.json[i].address_json.country + " - " +
                                      mydata.json[i].address_json.postal_code +
                                    "</div>" +
                                    "<div>" +
                                      "<span>" + mydata.json[i].phone + "</span>" +
                                    "</div>" +
                                  "</div>" +
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

                  }
                );

                $("#change-btn").click(function () {

                  var address_id = $(".radio-checked").attr("data-id");

                  var date = new Date();

                  var confirm = window.confirm("Are you sure want to change address?");

                  if (confirm) {

                    $.post(
                      "php/admin_change_address.php",
                      {
                        address_id: address_id,
                        user_id: user_id,
                        group_id: group_id,
                        date: date
                      },
                      function (data) {

                        console.log(data);

                        if (data == "Address Changed Successfully") {

                          alert(data);

                          location.reload();

                        }
                        else {

                          alert("Something's went wrong! Please try later.");

                        }

                      }
                    );

                  }

                });

                $.post(
                  "php/admin_fetch_img.php",
                  {
                    user_id: user_id
                  },
                  function (data) {

                    myImg = JSON.parse(data);

                    myImg.forEach(function (el, index) {

                      cls = "";

                      if (index == 0) {

                        cls = "checkbox-checked";

                      }

                      $("#user-img").append("<div class='col-md-4'>" +
    										"<div class='row' style='margin: 15px 0 0 0px;'>" +
    											"<div class='col-md-3'>" +
    												"<div style='font-size: 20px;'>" +
    													"<span class='custom-checkbox-img "+cls+"' data-id='"+el+"'><i class='fa fa-check-square'></i></span>" +
    												"</div>" +
    											"</div>" +
    											"<div class='col-md-9'>" +
    												"<div>" +
    													"<img src='"+el+"' style='max-width: 100px; max-height: 150px; object-fit: scale-down;'>" +
    												"</div>" +
    											"</div>" +
    										"</div>" +
    									"</div>" +
    								"</div>");

                    });

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

                    $("#add-prescription-btn").click(function () {
                      var items = $(".checkbox-checked");
                      var date = new Date();
                      var arr = [];

                      items.each(function (index) {
                        data_id = $(this).attr("data-id");

                        arr[index] = data_id;
                        //console.log($(this).attr("data-id"));
                      });

                      if (arr.length > 0) {

                        var confirm = window.confirm("Are you sure want to Add these Prescription Images?");

                        if (confirm) {

                          $.post(
                            "php/admin_add_prescription.php",
                            {
                              group_id: group_id,
                              date: date,
                              user_id: user_id,
                              mode: "from user img",
                              img_arr: JSON.stringify(arr)
                            },
                            function (data) {
                              console.log(data);
                              if (data == "Images Added") {
                                alert(data);
                                location.reload();
                              }
                              else {
                                alert("Something's went wrong! Please try again later.");
                              }
                            }
                          );

                        }

                      }
                      else {

                        alert("Please select atleast one image");

                      }
                    });
                  }
                );

                $("#cancel-order-form").on('submit', function () {
                  var reason = $("#cancel-order-form input[type='radio']:checked");
                  var date = new Date();

                  var other_info = $("#other-info").val();

                  other_info = other_info.trim();

                  if (reason.length > 0) {
                    if (reason.val() == "Other") {
                      if (other_info == "") {
                        alert("Please Specify a reason");
                      }
                      else {
                        var confirm = window.confirm("Do you really want to cancel that order?");

                        if (confirm) {
                          $.post(
                            "php/admin_cancel_order.php",
                            {
                              order_id: order_id,
                              group_id: group_id,
                              date: date,
                              reason: other_info
                            },
                            function (data) {
                              console.log(data);
                              if (data == "Order Cancelled") {
                                alert(data);
                                window.location.href = "php/redirector.php?pg=cc_queue";
                              }
                              else {
                                alert("Something's went wrong! Please try again later.");
                              }
                            }
                          );
                        }
                      }
                    }
                    else {
                      var confirm = window.confirm("Do you really want to cancel that order?");
                      console.log(reason.val());
                      if (confirm) {
                        $.post("php/admin_cancel_order.php",
                          {
                            order_id: order_id,
                            group_id: group_id,
                            date: date,
                            reason: reason.val()
                          },
                          function (data) {
                            alert(data);
                          }
                        );
                      }
                    }
                  }
                  else {
                    alert("Please Select an option");
                  }
                });

                $("#upload-prescription-form").on('submit', function () {
                  var file = $("#myPresc").val();

                  $("#grp-id").val(group_id);

                  var date = new Date();

                  $("#curr_date").val(date);

                  if (file != '') {

                    var confirm = window.confirm("Are you sure want to upload that image?");

                    if (confirm) {

                      $.ajax({
                        url: "php/add_prescription.php",
                        method: "POST",
                        data: new FormData(this),
                        contentType: false,
                        processData: false,
                        success: function(data){

                          console.log(data);

                          if (data == "Image Added") {

                            alert(data);

                          }
                          else {

                            alert("Something's went wrong! Please try again later.");

                          }

                        }
                      });

                    }

                  }
                  else {

                    alert("Please Select an image");

                  }
                });

                $("#doc-pat-form").on('submit', function () {

                  var doc_name = $("#doc_name").val();

                  var pat_name = $("#pat_name").val();

                  var date = new Date();

                  doc_name = doc_name.trim();

                  pat_name = pat_name.trim();

                  if (doc_name == '' && pat_name == '') {

                    alert("All fields are required");

                  }
                  else if (doc_name == '') {

                    alert("Doctor's Name is required");

                  }
                  else if (pat_name == '') {

                    alert("Patient'name is required");

                  }
                  else {

                    var confirm = window.confirm("Are you sure want to proceed with this Doctor name and Patient name?");

                    $.post(
                      "php/add_doc_pat_name.php",
                      {
                        group_id: group_id,
                        date: date,
                        doc_name: doc_name,
                        pat_name: pat_name
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Details Added") {

                          alert(data);

                          location.reload();

                        }
                        else {

                          alert("Something's went wrong! Please try again later.");

                        }

                      }
                    );

                  }

                });

                $("#add-remarks-form").on('submit', function () {

                  var remarks = $("#remarks").val();

                  var date = new Date();

                  remarks = remarks.trim();

                  if (remarks != '') {
                    var confirm = window.confirm("Are you sure want to add remarks?");

                    $.post(
                      "php/add_remarks.php",
                      {
                        remarks: remarks,
                        date: date,
                        group_id: group_id
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Remarks Added") {
                          alert(data);
                          location.reload();
                        }
                        else {
                          alert("Something's went wrong. Please try again later.");
                        }
                      }
                    );
                  }
                  else {
                    alert("Please Add a remark");
                  }
                });

                $("#prescription-confirmed").click(function () {

                  if ($(this).prop("checked") == true) {

                    var confirm = window.confirm("Do you really want to confirm the prescription?");

                    if (!confirm) {
                      $(this).prop("checked", false);
                    }
                    else {
                      var date = new Date();

                      $.post(
                        "php/admin_prescription_confirmed.php",
                        {
                          group_id: group_id,
                          date: date
                        },
                        function (data) {
                          console.log(data);
                          if (data == "Prescription Confirmed") {
                            $(this).prop("checked", true);
                            alert(data);
                          }
                          else {
                            alert("Something's went wrong. Please try again later.");
                          }
                        }
                      );
                    }

                  }
                  else {

                    $(this).prop("checked", true);

                    alert("You cannot change the confirmation of prescription.");

                  }

                });

                $("#process-order-that-form").on('submit', function () {
                  var process_time = $("#process_time").val();
                  var date = new Date();

                  if (process_time != "") {
                    if (!isNaN(process_time)) {
                      $.post(
                        "php/admin_process_order_that.php",
                        {
                          group_id: group_id,
                          date: date,
                          process_time: process_time
                        },
                        function (data) {
                          if (data == "This order will be in process after some time") {
                            alert(data);
                          }
                          else {
                            alert("Something's went wrong! Please try again later.");
                          }
                        }
                      );
                    }
                    else {
                      alert("Don't Play with codes");
                    }
                  }
                  else {
                    alert("Don't Play with codes");
                  }
                });

                $("#next-btn").click(function () {
                  var date = new Date();
                  $.post(
                    "php/wait_cc_queue.php",
                    {
                      group_id: group_id,
                      date: date
                    },
                    function (data) {
                      console.log(data);

                      if (data == "Order Skipped") {
                        alert(data);
                        window.location.href = "php/redirector.php?pg=cc_queue";
                      }
                      else {
                        alert("Something's went wrong. Please try again later.");
                      }
                    }
                  );
                });

                $("#next-queue-btn").click(function (data) {
                  var date = new Date();
                  $.post(
                    "php/move_to_next_queue.php",
                    {
                      group_id: group_id,
                      date: date,
                      pg: "cc_queue"
                    },
                    function (data) {
                      console.log(data);

                      if (data == "Moved Successfully") {
                        alert(data);
                        window.location.href = "php/redirector.php?pg=cc_queue";
                      }
                      else {
                        alert("Somethong's went wrong! Please try again later.");
                      }
                    }
                  );
                });

              }
              else {

                alert("cc_queue.php error");

              }
            }
          );

          $("#packaging_queue_items").click(function () {
            window.location.href = "php/redirector.php?pg=packaging_queue";
          });

        }
        else {

          window.location.href = "admin_login";

        }

      }
    );

  }
  else {

    alert("Invalid Access!");

    window.location.href = "admin_login";

  }

});

function timeSince(date) {
  var seconds = Math.floor(((new Date().getTime()/1000) - date)),
  interval = Math.floor(seconds / 31536000);

  if (interval > 1) return interval + " years ago";

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " days " + Math.floor((seconds % 84600) / 3600) + " hours ago";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " hours " + Math.floor((seconds % 3600) / 60) + " mins ago";

  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}
