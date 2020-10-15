$(document).ready(function () {

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

  var key = window.location.search;

  $("#filter-form-btn").on('click', function () {
    var filter_order_id = $("#filter-order-id").val();
    var filter_email = $("#filter-email").val();
    var filter_start_date = $("#filter-start-date").val();
    var filter_end_date = $("#filter-end-date").val();
    var filter_order_by = $("#filter-order-by").val();
    var filter_city = $("#filter-city").val();
    var filter_phone_number = $("#filter-phone-number").val();
    var filter_rpp = $("#filter-rpp").val();

    if (filter_start_date != '') {

      d = filter_start_date.split("-");

      filter_start_date = new Date(d[0], parseInt(d[1]) - 1, d[2]).getTime();

    }
    if (filter_end_date != "") {
      d = filter_end_date.split("-");
      filter_end_date = new Date(d[0], parseInt(d[1]) - 1, d[2]).getTime();
    }

    console.log(filter_start_date);

    if (filter_order_id != "" ||
        filter_email != "" ||
        filter_start_date != "" ||
        filter_end_date != "" ||
        filter_order_by != null ||
        filter_city != "" ||
        filter_phone_number != "" ||
        filter_rpp != "") {

          $.post(
            "php/set_filter_val_in_session.php",
            {
              filter_order_id: filter_order_id,
              filter_email: filter_email,
              filter_start_date: filter_start_date,
              filter_end_date: filter_end_date,
              filter_order_by: filter_order_by,
              filter_city: filter_city,
              filter_phone_number: filter_phone_number,
              filter_rpp: filter_rpp
            },
            function (data) {
              console.log(data);
              if (data == "All set") {
                window.location.href = "shipping_queue?filter=true";
              }
            }
          );

    }
    else {
      alert("Fields Cannot be empty!");
    }

    console.log(filter_order_id);
    console.log(filter_email);
    console.log(filter_start_date);
    console.log(filter_end_date);
    console.log(filter_order_by);
    console.log(filter_city);
    console.log(filter_phone_number);
    console.log(filter_rpp);
  });

  $("#fe-form").on("submit", function () {

    var g_id = $(this).attr("data-id");

    var fe_name = $("#fe-name").val();

    var fe_number = $("#fe-number").val();

    var date = new Date();

    $.post(
      "php/admin_add_fe_details.php",
      {
        group_id: g_id,
        fe_name: fe_name,
        fe_number: fe_number,
        date: date
      },
      function (data) {
        console.log(data);
        if (data == "FE Details Added") {
          alert("FE Details Added");
          $("#fe-name").val('');
          $("#fe-number").val('');
          $("#myModal2").modal("hide");
        }
        else {
          alert("Something went wrong");
        }
      }
    );

  });

  $.post("php/admin_login_check.php", function (data) {

    var myobj = JSON.parse(data);

    if (myobj.status == 1) {

      $("body").css("display", "block");

      if (key == "") {

        $.post(
          "php/shipping_queue.php",
          {
            mode: "no filter"
          },
          function (data) {
            console.log(data);

            myobj = JSON.parse(data);

            console.log(myobj);

            if (myobj.info.length != 0) {

              var less_two_hr = 0;

              var bw_two_eight_hr = 0;

              var bw_eight_twenty_four_hr = 0;

              var more_twenty_four_hr = 0;

              var curr_date = new Date();

              myobj.time_queue_json.forEach(function (el) {
                time_queue = new Date(el);
                time_hr_diff = (((curr_date.getTime() - time_queue.getTime())/1000)/60)/60;

                if (time_hr_diff < 2) {
                  less_two_hr++;
                }
                else if (time_hr_diff > 2 && time_hr_diff < 8) {
                  bw_two_eight_hr++;
                }
                else if (time_hr_diff > 8 && time_hr_diff < 24) {
                  bw_eight_twenty_four_hr++;
                }
                else if (time_hr_diff > 24) {
                  more_twenty_four_hr++;
                }
              });

              if (less_two_hr < 10) {
                less_two_hr = "0" + less_two_hr;
              }
              if (bw_two_eight_hr < 10) {
                bw_two_eight_hr = "0" + bw_two_eight_hr;
              }
              if (bw_eight_twenty_four_hr < 10) {
                bw_eight_twenty_four_hr = "0" + bw_eight_twenty_four_hr;
              }
              if (more_twenty_four_hr < 10) {
                more_twenty_four_hr = "0" + more_twenty_four_hr;
              }

              $("#less-two-hr").html(less_two_hr);

              $("#bw-two-eight-hr").html(bw_two_eight_hr);

              $("#bw-eight-twenty-four-hr").html(bw_eight_twenty_four_hr);

              $("#more-twenty-four-hr").html(more_twenty_four_hr);

              myobj.info.forEach(function (el1, index) {

                var hh = '';

                var mm = '';

                var ss = '';

                var dd = '';

                var mM = '';

                var yyyy = '';

                var total_mrp = 0;

                var total_offer_mrp = 0;

                var shipping_price = 0;


                if (el1.doctor_name != "") {
                  doctor_name = el1.doctor_name;
                }
                else {
                  doctor_name = "Not Provided";
                }

                if (el1.patient_name != "") {
                  patient_name = el1.patient_name;
                }
                else {
                  patient_name = el1.user_json.firstname + " " + el1.user_json.lastname;
                }

                if (el1.order_time != '') {

                  order_time = el1.order_time;

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

                }

                if (el1.split_time != '') {
                  split_time = myobj.split_time;
                }
                else {
                  split_time = "N/A";
                }

                el1.med_info.forEach(function (el, idx) {

                  console.log("idx:" +idx + " vm: " + el.vendor_mrp + " om: " + el.offer_mrp + " m: " + el.mrp);

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

                console.log(total_offer_mrp);

                discounted_mrp = total_mrp - total_offer_mrp;

                if (discounted_mrp < 0) {

                  discounted_mrp = 0;

                }

                amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                $("#excel-table tbody").append("<tr>" +
                  "<td>"+(index + 1)+"</td>" +
                  "<td>"+"Sharma Drugs"+"</td>" +
                  "<td>"+el1.group_id+"</td>" +
                  "<td>"+el1.order_id+"</td>" +
                  "<td>"+el1.order_time+"</td>" +
                  "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                  "<td>"+el1.address_json.postal_code+"</td>" +
                  "<td>"+el1.bill_number+"</td>" +
                  "<td>"+"0"+"</td>" +
                  "<td>"+amt_payable+"</td>" +
                  "<td>"+"To be Delivered"+"</td>" +
                  "<td>"+el1.delivery_partner+"</td>" +
                "</tr>");

                $("#medicines-list").append("<div class='col-md-12 thumbnail' style='margin-bottom: 20px;'>" +
                    "<div class='row'>" +
                        "<div class='col-md-9'>" +
                            "<div class='row'>" +
                                "<div class='col-md-3'>" +
                                    "<p>Group ID:<span> "+el1.group_id+"</span></p>" +
                                "</div>" +
                                "<div class='col-md-3'>" +
                                    "<p>Order ID:<span> "+el1.order_id+"</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p>Store:<span> Sharma Drugs</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p>Order Time: " + new Date(el1.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
                                "</div>" +
                                "<div class='col-md-1'>" +
                                    "<p>Split Time: <span>" + split_time + "</span></p>" +
                                "</div>" +
                                "<div class='col-md-1'>" +
                                    "<p>select</p>" +
                                    "<input type='checkbox' name='abc'>" +
                                "</div>" +
                            "</div>" +
                            "<div class='row'>" +
                                "<div class='col-md-2'>" +
                                    "<p>Total MRP Amount Rs. <span> " + total_mrp.toFixed(2) + "</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p>Discounted MRP Amount Rs.<span> "+ discounted_mrp.toFixed(2) +"</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p>Coupon Discount: <span>Rs. 00.00</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p>MOS Cash Used: <span> Rs. 0</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p>Shipping Charges: <span>Rs. " + parseFloat(el1.shipping_price).toFixed(2) +"</span></p>" +
                                "</div>" +
                                "<div class='col-md-2'>" +
                                    "<p id='amt-payable-"+index+"'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
                                "</div>" +
                            "</div>" +
                            "<span>Billed Amount: Rs.<span>"+ amt_payable.toFixed(2) +"</span></span>" +
                            "<button class='btn'>Coupon</button>" +
                            "<br><br>" +
                            "<form>" +
                                "<table>" +
                                    "<thead>" +
                                        "<tr>" +
                                          "<td class='col-md-6' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                          "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                          "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                          "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                        "</tr>" +
                                    "</thead>" +
                                    "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                    //appending data below
                                    "</tbody>" +
                                "</table>" +
                            "</form>" +
                            "<br>" +
                        "</div>" +
                        "<div class='col-md-3'>" +
                            "<p style='color:darkgrey;font-weight:bold;'>Patient's Name</p>" +
                            "<p>"+patient_name+"</p>" +
                            "<p style='color:darkgrey;font-weight:bold;'>Address </p>" +
                            "<p>Delivery Address</p>" +
                            "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                            "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                            "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                            "<p id='city'> " + el1.address_json.city + " - </p>" +
                            "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                            "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                            "<p id='country'>"+ el1.address_json.country +"</p>" +
                            "<p style='background-color:lightgrey;'>Delivery Partners-<span>"+el1.delivery_partner+"</span><br></p>" +
                            "<button class='btn btn-default download-shipping-label' data-id='"+el1.group_id+"' type='button' style='background-color:#eb9316;color:#fff;'>Download Shipping Label</button><br>" +
                            "<button class='btn btn-default fe-form' data-toggle='modal' data-target='#myModal2' data-id='"+el1.group_id+"' style='border-width:1px;background-color:#337ab7;color:#fff;'>FE Form</button>" +
                            "<button class='btn btn-default move-out-delivery-btn' style='background-color:#265a88;color:#fff;' data-id='"+el1.group_id+"'>Move Out Delivery</button>" +
                        "</div>" +
                    "</div>" +
                    "<br>" +
                "</div>");

                el1.med_info.forEach(function (el, idx) {
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

                  $("#med-lists-" + index).append("<tr>" +
                      "<td class='col-md-5' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                      "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<p>Schedule: <span> H</span></p>" +
                          "<p>Pack Form: <span> Strip</span></p>" +
                          "<p>Label: <span>"+el.pack_size+"</span></p>" +
                      "</td>" +
                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<p>"+el.quantity+"</p>" +
                      "</td>" +
                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<p>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                      "</td>" +
                  "</tr>");
                });

              });

              $(".download-shipping-label").click(function () {
                var g_id = $(this).attr("data-id");
                alert(g_id);
              });

              $(".move-out-delivery-btn").click(function () {
                var g_id = $(this).attr("data-id");
                var date = new Date();
                var confirm = window.confirm("are you sure?");
                if (confirm) {
                  $.post(
                    "php/move_to_manage_queue.php",
                    {
                      group_id: g_id,
                      date: date
                    },
                    function (data) {
                      console.log(data);
                      if (data == "Moved Successfully") {
                        alert(data);
                        location.reload();
                      }
                      else if (data == "Please enter FE Details") {
                        alert(data);
                      }
                      else {
                        alert("Something's went wrong!");
                      }
                    }
                  );
                }
              });

              $(".fe-form").click(function () {
                var g_id = $(this).attr("data-id");
                $("#fe-form").attr("data-id", g_id);
              });

              $(".cancel-waybill-btn").click(function () {
                var g_id = $(this).attr("data-id");
                alert(g_id);
              });

              $("#download-excel-btn").click(function () {
                $("#excel-table").table2excel({
                  exclude: ".noExl",
                  name: "Excel Document Name"
                });
              });

            }
            else {

              alert("No item in shipping_queue");

            }

          }
        );

        $("#filter-form-btn").click(function () {
          window.location.href = "shipping_queue?filter=true";
        });

      }
      else {
        key = key.replace("?filter=", "");

        if (key) {

          $.post(
            "php/shipping_queue.php",
            {
              mode: "filtered"
            },
            function (data) {
              console.log(data);
              myobj = JSON.parse(data);
              console.log(myobj);

              if (myobj.info != 0) {
                $.post(
                  "php/admin_fetch_shipping_orders.php",
                  {
                    data: data
                  },
                  function (data) {
                    console.log(data);
                    myobj1 = JSON.parse(data);
                    console.log(myobj1);

                    var less_two_hr = 0;

                    var bw_two_eight_hr = 0;

                    var bw_eight_twenty_four_hr = 0;

                    var more_twenty_four_hr = 0;

                    var curr_date = new Date();

                    myobj1.time_queue_json.forEach(function (el) {
                      time_queue = new Date(el);
                      time_hr_diff = (((curr_date.getTime() - time_queue.getTime())/1000)/60)/60;

                      if (time_hr_diff < 2) {
                        less_two_hr++;
                      }
                      else if (time_hr_diff > 2 && time_hr_diff < 8) {
                        bw_two_eight_hr++;
                      }
                      else if (time_hr_diff > 8 && time_hr_diff < 24) {
                        bw_eight_twenty_four_hr++;
                      }
                      else if (time_hr_diff > 24) {
                        more_twenty_four_hr++;
                      }
                    });

                    if (less_two_hr < 10) {
                      less_two_hr = "0" + less_two_hr;
                    }
                    if (bw_two_eight_hr < 10) {
                      bw_two_eight_hr = "0" + bw_two_eight_hr;
                    }
                    if (bw_eight_twenty_four_hr < 10) {
                      bw_eight_twenty_four_hr = "0" + bw_eight_twenty_four_hr;
                    }
                    if (more_twenty_four_hr < 10) {
                      more_twenty_four_hr = "0" + more_twenty_four_hr;
                    }

                    $("#less-two-hr").html(less_two_hr);

                    $("#bw-two-eight-hr").html(bw_two_eight_hr);

                    $("#bw-eight-twenty-four-hr").html(bw_eight_twenty_four_hr);

                    $("#more-twenty-four-hr").html(more_twenty_four_hr);

                    if (myobj1.filter_start_date != '' && myobj1.filter_end_date != '') {

                      if (myobj1.filter_order_by == "Order Creation Time") {

                        if (myobj1.filter_rpp != 0) {

                          filter_rpp = myobj1.filter_rpp;

                          var ctr = 0;

                            myobj1.meds_infos.forEach(function (el1, index) {

                              if (!(ctr < filter_rpp)) {

                                return false;

                              }

                              var creation_time_queue = new Date(el1.order_time).getTime();

                              if ((creation_time_queue >= myobj1.filter_start_date) && (creation_time_queue <= myobj1.filter_end_date)) {

                                var hh = '';

                                var mm = '';

                                var ss = '';

                                var dd = '';

                                var mM = '';

                                var yyyy = '';

                                var total_mrp = 0;

                                var total_offer_mrp = 0;

                                var shipping_price = 0;


                                if (el1.doctor_name != "") {
                                  doctor_name = el1.doctor_name;
                                }
                                else {
                                  doctor_name = "Not Provided"
                                }

                                if (el1.patient_name != "") {
                                  patient_name = el1.patient_name;
                                }
                                else {
                                  patient_name = el1.user_json.firstname + " " + el1.user_json.lastname;
                                }

                                if (el1.order_time != '') {

                                  order_time = el1.order_time;

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

                                }

                                if (el1.split_time != '') {
                                  split_time = myobj.split_time;
                                }
                                else {
                                  split_time = "N/A";
                                }

                                el1.med_info.forEach(function (el, idx) {

                                  console.log("idx:" +idx + " vm: " + el.vendor_mrp + " om: " + el.offer_mrp + " m: " + el.mrp);

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

                                discounted_mrp = total_mrp - total_offer_mrp;

                                if (discounted_mrp < 0) {

                                  discounted_mrp = 0;

                                }

                                amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                                $("#excel-table tbody").append("<tr>" +
                                  "<td>"+(index + 1)+"</td>" +
                                  "<td>"+"Sharma Drugs"+"</td>" +
                                  "<td>"+el1.group_id+"</td>" +
                                  "<td>"+el1.order_id+"</td>" +
                                  "<td>"+el1.order_time+"</td>" +
                                  "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                                  "<td>"+el1.address_json.postal_code+"</td>" +
                                  "<td>"+el1.bill_number+"</td>" +
                                  "<td>"+"0"+"</td>" +
                                  "<td>"+amt_payable+"</td>" +
                                  "<td>"+"To be Delivered"+"</td>" +
                                  "<td>"+el1.delivery_partner+"</td>" +
                                "</tr>");

                                $("#medicines-list").append("<div class='col-md-12 thumbnail' style='margin-bottom: 20px;'>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-9'>" +
                                            "<div class='row'>" +
                                                "<div class='col-md-3'>" +
                                                    "<p>Group ID:<span> "+el1.group_id+"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-3'>" +
                                                    "<p>Order ID:<span> "+el1.order_id+"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Store:<span> Sharma Drugs</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Order Time: " + new Date(el1.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
                                                "</div>" +
                                                "<div class='col-md-1'>" +
                                                    "<p>Split Time: <span>" + split_time + "</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-1'>" +
                                                    "<p>select</p>" +
                                                    "<input type='checkbox' name='abc'>" +
                                                "</div>" +
                                            "</div>" +
                                            "<div class='row'>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Total MRP Amount Rs. <span> " + total_mrp.toFixed(2) + "</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Discounted MRP Amount Rs.<span> "+ discounted_mrp.toFixed(2) +"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Coupon Discount: <span>Rs. 00.00</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>MOS Cash Used: <span> Rs. 0</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Shipping Charges: <span>Rs. " + parseFloat(el1.shipping_price).toFixed(2) +"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p id='amt-payable-"+index+"'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
                                                "</div>" +
                                            "</div>" +
                                            "<span>Billed Amount: Rs.<span>"+ amt_payable.toFixed(2) +"</span></span>" +
                                            "<button class='btn'>Coupon</button>" +
                                            "<br><br>" +
                                            "<form>" +
                                                "<table>" +
                                                    "<thead>" +
                                                        "<tr>" +
                                                          "<td class='col-md-6' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                          "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                          "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                                          "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                                        "</tr>" +
                                                    "</thead>" +
                                                    "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                    //appending data below
                                                    "</tbody>" +
                                                "</table>" +
                                            "</form>" +
                                            "<br>" +
                                        "</div>" +
                                        "<div class='col-md-3'>" +
                                            "<p style='color:darkgrey;font-weight:bold;'>Patient's Name</p>" +
                                            "<p>"+patient_name+"</p>" +
                                            "<p style='color:darkgrey;font-weight:bold;'>Address </p>" +
                                            "<p>Delivery Address</p>" +
                                            "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                            "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                            "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                            "<p id='city'> " + el1.address_json.city + " - </p>" +
                                            "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                            "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                            "<p id='country'>"+ el1.address_json.country +"</p>" +
                                            "<p style='background-color:lightgrey;'>Delivery Partners-<span>"+el1.delivery_partner+"</span><br></p>" +
                                            "<button class='btn btn-default download-shipping-label' data-id='"+el1.group_id+"' type='button' style='background-color:#eb9316;color:#fff;'>Download Shipping Label</button><br>" +
                                            "<button class='btn btn-default fe-form' data-toggle='modal' data-target='#myModal2' data-id='"+el1.group_id+"' style='border-width:1px;background-color:#337ab7;color:#fff;'>FE Form</button>" +
                                            "<button class='btn btn-default move-out-delivery-btn' style='background-color:#265a88;color:#fff;' data-id='"+el1.group_id+"'>Move Out Delivery</button>" +
                                        "</div>" +
                                    "</div>" +
                                    "<br>" +
                                "</div>");

                                el1.med_info.forEach(function (el, idx) {
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

                                  $("#med-lists-" + index).append("<tr>" +
                                      "<td class='col-md-5' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                                      "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                          "<p>Schedule: <span> H</span></p>" +
                                          "<p>Pack Form: <span> Strip</span></p>" +
                                          "<p>Label: <span>"+el.pack_size+"</span></p>" +
                                      "</td>" +
                                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                          "<p>"+el.quantity+"</p>" +
                                      "</td>" +
                                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                          "<p>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                      "</td>" +
                                  "</tr>");
                                });

                                ctr++;
                              }
                            });

                        }
                        else {

                          myobj1.meds_infos.forEach(function (el1, index) {

                            var hh = '';

                            var mm = '';

                            var ss = '';

                            var dd = '';

                            var mM = '';

                            var yyyy = '';

                            var total_mrp = 0;

                            var total_offer_mrp = 0;

                            var shipping_price = 0;


                            if (el1.doctor_name != "") {
                              doctor_name = el1.doctor_name;
                            }
                            else {
                              doctor_name = "Not Provided"
                            }

                            if (el1.patient_name != "") {
                              patient_name = el1.patient_name;
                            }
                            else {
                              patient_name = el1.user_json.firstname + " " + el1.user_json.lastname;
                            }

                            if (el1.order_time != '') {

                              order_time = el1.order_time;

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

                            }

                            if (el1.split_time != '') {
                              split_time = myobj.split_time;
                            }
                            else {
                              split_time = "N/A";
                            }

                            el1.med_info.forEach(function (el, idx) {

                              console.log("idx:" +idx + " vm: " + el.vendor_mrp + " om: " + el.offer_mrp + " m: " + el.mrp);

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

                            discounted_mrp = total_mrp - total_offer_mrp;

                            if (discounted_mrp < 0) {

                              discounted_mrp = 0;

                            }

                            amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                            $("#excel-table tbody").append("<tr>" +
                              "<td>"+(index + 1)+"</td>" +
                              "<td>"+"Sharma Drugs"+"</td>" +
                              "<td>"+el1.group_id+"</td>" +
                              "<td>"+el1.order_id+"</td>" +
                              "<td>"+el1.order_time+"</td>" +
                              "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                              "<td>"+el1.address_json.postal_code+"</td>" +
                              "<td>"+el1.bill_number+"</td>" +
                              "<td>"+"0"+"</td>" +
                              "<td>"+amt_payable+"</td>" +
                              "<td>"+"To be Delivered"+"</td>" +
                              "<td>"+el1.delivery_partner+"</td>" +
                            "</tr>");

                            $("#medicines-list").append("<div class='col-md-12 thumbnail' style='margin-bottom: 20px;'>" +
                                "<div class='row'>" +
                                    "<div class='col-md-9'>" +
                                        "<div class='row'>" +
                                            "<div class='col-md-3'>" +
                                                "<p>Group ID:<span> "+el1.group_id+"</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-3'>" +
                                                "<p>Order ID:<span> "+el1.order_id+"</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p>Store:<span> Sharma Drugs</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p>Order Time: " + new Date(el1.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
                                            "</div>" +
                                            "<div class='col-md-1'>" +
                                                "<p>Split Time: <span>" + split_time + "</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-1'>" +
                                                "<p>select</p>" +
                                                "<input type='checkbox' name='abc'>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='row'>" +
                                            "<div class='col-md-2'>" +
                                                "<p>Total MRP Amount Rs. <span> " + total_mrp.toFixed(2) + "</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p>Discounted MRP Amount Rs.<span> "+ discounted_mrp.toFixed(2) +"</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p>Coupon Discount: <span>Rs. 00.00</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p>MOS Cash Used: <span> Rs. 0</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p>Shipping Charges: <span>Rs. " + parseFloat(el1.shipping_price).toFixed(2) +"</span></p>" +
                                            "</div>" +
                                            "<div class='col-md-2'>" +
                                                "<p id='amt-payable-"+index+"'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
                                            "</div>" +
                                        "</div>" +
                                        "<span>Billed Amount: Rs.<span>"+ amt_payable.toFixed(2) +"</span></span>" +
                                        "<button class='btn'>Coupon</button>" +
                                        "<br><br>" +
                                        "<form>" +
                                            "<table>" +
                                                "<thead>" +
                                                    "<tr>" +
                                                      "<td class='col-md-6' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                      "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                                    "</tr>" +
                                                "</thead>" +
                                                "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                //appending data below
                                                "</tbody>" +
                                            "</table>" +
                                        "</form>" +
                                        "<br>" +
                                    "</div>" +
                                    "<div class='col-md-3'>" +
                                        "<p style='color:darkgrey;font-weight:bold;'>Patient's Name</p>" +
                                        "<p>"+patient_name+"</p>" +
                                        "<p style='color:darkgrey;font-weight:bold;'>Address </p>" +
                                        "<p>Delivery Address</p>" +
                                        "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                        "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                        "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                        "<p id='city'> " + el1.address_json.city + " - </p>" +
                                        "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                        "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                        "<p id='country'>"+ el1.address_json.country +"</p>" +
                                        "<p style='background-color:lightgrey;'>Delivery Partners-<span>"+el1.delivery_partner+"</span><br></p>" +
                                        "<button class='btn btn-default download-shipping-label' data-id='"+el1.group_id+"' type='button' style='background-color:#eb9316;color:#fff;'>Download Shipping Label</button><br>" +
                                        "<button class='btn btn-default fe-form' data-toggle='modal' data-target='#myModal2' data-id='"+el1.group_id+"' style='border-width:1px;background-color:#337ab7;color:#fff;'>FE Form</button>" +
                                        "<button class='btn btn-default move-out-delivery-btn' style='background-color:#265a88;color:#fff;' data-id='"+el1.group_id+"'>Move Out Delivery</button>" +
                                    "</div>" +
                                "</div>" +
                                "<br>" +
                            "</div>");

                            el1.med_info.forEach(function (el, idx) {
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

                              $("#med-lists-" + index).append("<tr>" +
                                  "<td class='col-md-5' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>Schedule: <span> H</span></p>" +
                                      "<p>Pack Form: <span> Strip</span></p>" +
                                      "<p>Label: <span>"+el.pack_size+"</span></p>" +
                                  "</td>" +
                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el.quantity+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                  "</td>" +
                              "</tr>");
                            });

                          });

                        }

                      }
                      else if (myobj1.filter_order_by == "Order Queue Time") {

                        if (myobj1.filter_rpp != 0) {

                          filter_rpp = myobj1.filter_rpp;

                          var ctr = 0;

                            myobj1.meds_infos.forEach(function (el1, index) {

                              if (!(ctr < filter_rpp)) {

                                return false;

                              }

                              var time_queue = new Date(el1.time_queue).getTime();

                              if ((time_queue >= myobj1.filter_start_date) && (time_queue <= myobj1.filter_end_date)) {

                                var hh = '';

                                var mm = '';

                                var ss = '';

                                var dd = '';

                                var mM = '';

                                var yyyy = '';

                                var total_mrp = 0;

                                var total_offer_mrp = 0;

                                var shipping_price = 0;


                                if (el1.doctor_name != "") {
                                  doctor_name = el1.doctor_name;
                                }
                                else {
                                  doctor_name = "Not Provided"
                                }

                                if (el1.patient_name != "") {
                                  patient_name = el1.patient_name;
                                }
                                else {
                                  patient_name = el1.user_json.firstname + " " + el1.user_json.lastname;
                                }

                                if (el1.order_time != '') {

                                  order_time = el1.order_time;

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

                                }

                                if (el1.split_time != '') {
                                  split_time = myobj.split_time;
                                }
                                else {
                                  split_time = "N/A";
                                }

                                el1.med_info.forEach(function (el, idx) {

                                  console.log("idx:" +idx + " vm: " + el.vendor_mrp + " om: " + el.offer_mrp + " m: " + el.mrp);

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

                                discounted_mrp = total_mrp - total_offer_mrp;

                                if (discounted_mrp < 0) {

                                  discounted_mrp = 0;

                                }

                                amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                                $("#excel-table tbody").append("<tr>" +
                                  "<td>"+(index + 1)+"</td>" +
                                  "<td>"+"Sharma Drugs"+"</td>" +
                                  "<td>"+el1.group_id+"</td>" +
                                  "<td>"+el1.order_id+"</td>" +
                                  "<td>"+el1.order_time+"</td>" +
                                  "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                                  "<td>"+el1.address_json.postal_code+"</td>" +
                                  "<td>"+el1.bill_number+"</td>" +
                                  "<td>"+"0"+"</td>" +
                                  "<td>"+amt_payable+"</td>" +
                                  "<td>"+"To be Delivered"+"</td>" +
                                  "<td>"+el1.delivery_partner+"</td>" +
                                "</tr>");

                                $("#medicines-list").append("<div class='col-md-12 thumbnail' style='margin-bottom: 20px;'>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-9'>" +
                                            "<div class='row'>" +
                                                "<div class='col-md-3'>" +
                                                    "<p>Group ID:<span> "+el1.group_id+"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-3'>" +
                                                    "<p>Order ID:<span> "+el1.order_id+"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Store:<span> Sharma Drugs</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Order Time: " + new Date(el1.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
                                                "</div>" +
                                                "<div class='col-md-1'>" +
                                                    "<p>Split Time: <span>" + split_time + "</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-1'>" +
                                                    "<p>select</p>" +
                                                    "<input type='checkbox' name='abc'>" +
                                                "</div>" +
                                            "</div>" +
                                            "<div class='row'>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Total MRP Amount Rs. <span> " + total_mrp.toFixed(2) + "</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Discounted MRP Amount Rs.<span> "+ discounted_mrp.toFixed(2) +"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Coupon Discount: <span>Rs. 00.00</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>MOS Cash Used: <span> Rs. 0</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p>Shipping Charges: <span>Rs. " + parseFloat(el1.shipping_price).toFixed(2) +"</span></p>" +
                                                "</div>" +
                                                "<div class='col-md-2'>" +
                                                    "<p id='amt-payable-"+index+"'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
                                                "</div>" +
                                            "</div>" +
                                            "<span>Billed Amount: Rs.<span>"+ amt_payable.toFixed(2) +"</span></span>" +
                                            "<button class='btn'>Coupon</button>" +
                                            "<br><br>" +
                                            "<form>" +
                                                "<table>" +
                                                    "<thead>" +
                                                        "<tr>" +
                                                          "<td class='col-md-6' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                          "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                          "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                                          "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                                        "</tr>" +
                                                    "</thead>" +
                                                    "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                    //appending data below
                                                    "</tbody>" +
                                                "</table>" +
                                            "</form>" +
                                            "<br>" +
                                        "</div>" +
                                        "<div class='col-md-3'>" +
                                            "<p style='color:darkgrey;font-weight:bold;'>Patient's Name</p>" +
                                            "<p>"+patient_name+"</p>" +
                                            "<p style='color:darkgrey;font-weight:bold;'>Address </p>" +
                                            "<p>Delivery Address</p>" +
                                            "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                            "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                            "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                            "<p id='city'> " + el1.address_json.city + " - </p>" +
                                            "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                            "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                            "<p id='country'>"+ el1.address_json.country +"</p>" +
                                            "<p style='background-color:lightgrey;'>Delivery Partners-<span>"+el1.delivery_partner+"</span><br></p>" +
                                            "<button class='btn btn-default download-shipping-label' data-id='"+el1.group_id+"' type='button' style='background-color:#eb9316;color:#fff;'>Download Shipping Label</button><br>" +
                                            "<button class='btn btn-default fe-form' data-toggle='modal' data-target='#myModal2' data-id='"+el1.group_id+"' style='border-width:1px;background-color:#337ab7;color:#fff;'>FE Form</button>" +
                                            "<button class='btn btn-default move-out-delivery-btn' style='background-color:#265a88;color:#fff;' data-id='"+el1.group_id+"'>Move Out Delivery</button>" +
                                        "</div>" +
                                    "</div>" +
                                    "<br>" +
                                "</div>");

                                el1.med_info.forEach(function (el, idx) {
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

                                  $("#med-lists-" + index).append("<tr>" +
                                      "<td class='col-md-5' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                                      "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                          "<p>Schedule: <span> H</span></p>" +
                                          "<p>Pack Form: <span> Strip</span></p>" +
                                          "<p>Label: <span>"+el.pack_size+"</span></p>" +
                                      "</td>" +
                                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                          "<p>"+el.quantity+"</p>" +
                                      "</td>" +
                                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                          "<p>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                      "</td>" +
                                  "</tr>");
                                });

                                ctr++;
                              }
                            });

                        }
                        else {

                          myobj1.meds_infos.forEach(function (el1, index) {

                            var time_queue = new Date(el1.time_queue).getTime();

                            console.log("start:" + myobj1.filter_start_date);

                            console.log("end:" + myobj1.filter_end_date);

                            console.log("time:" + time_queue);

                            if ((time_queue >= myobj1.filter_start_date) && (time_queue <= myobj1.filter_end_date)) {


                              var hh = '';

                              var mm = '';

                              var ss = '';

                              var dd = '';

                              var mM = '';

                              var yyyy = '';

                              var total_mrp = 0;

                              var total_offer_mrp = 0;

                              var shipping_price = 0;


                              if (el1.doctor_name != "") {
                                doctor_name = el1.doctor_name;
                              }
                              else {
                                doctor_name = "Not Provided"
                              }

                              if (el1.patient_name != "") {
                                patient_name = el1.patient_name;
                              }
                              else {
                                patient_name = el1.user_json.firstname + " " + el1.user_json.lastname;
                              }

                              if (el1.order_time != '') {

                                order_time = el1.order_time;

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

                              }

                              if (el1.split_time != '') {
                                split_time = myobj.split_time;
                              }
                              else {
                                split_time = "N/A";
                              }

                              el1.med_info.forEach(function (el, idx) {

                                console.log("idx:" +idx + " vm: " + el.vendor_mrp + " om: " + el.offer_mrp + " m: " + el.mrp);

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

                              discounted_mrp = total_mrp - total_offer_mrp;

                              if (discounted_mrp < 0) {

                                discounted_mrp = 0;

                              }

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              $("#excel-table tbody").append("<tr>" +
                                "<td>"+(index + 1)+"</td>" +
                                "<td>"+"Sharma Drugs"+"</td>" +
                                "<td>"+el1.group_id+"</td>" +
                                "<td>"+el1.order_id+"</td>" +
                                "<td>"+el1.order_time+"</td>" +
                                "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                                "<td>"+el1.address_json.postal_code+"</td>" +
                                "<td>"+el1.bill_number+"</td>" +
                                "<td>"+"0"+"</td>" +
                                "<td>"+amt_payable+"</td>" +
                                "<td>"+"To be Delivered"+"</td>" +
                                "<td>"+el1.delivery_partner+"</td>" +
                              "</tr>");

                              $("#medicines-list").append("<div class='col-md-12 thumbnail' style='margin-bottom: 20px;'>" +
                                  "<div class='row'>" +
                                      "<div class='col-md-9'>" +
                                          "<div class='row'>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Group ID:<span> "+el1.group_id+"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Order ID:<span> "+el1.order_id+"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>Store:<span> Sharma Drugs</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>Order Time: " + new Date(el1.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
                                              "</div>" +
                                              "<div class='col-md-1'>" +
                                                  "<p>Split Time: <span>" + split_time + "</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-1'>" +
                                                  "<p>select</p>" +
                                                  "<input type='checkbox' name='abc'>" +
                                              "</div>" +
                                          "</div>" +
                                          "<div class='row'>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>Total MRP Amount Rs. <span> " + total_mrp.toFixed(2) + "</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>Discounted MRP Amount Rs.<span> "+ discounted_mrp.toFixed(2) +"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>Coupon Discount: <span>Rs. 00.00</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>MOS Cash Used: <span> Rs. 0</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p>Shipping Charges: <span>Rs. " + parseFloat(el1.shipping_price).toFixed(2) +"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-2'>" +
                                                  "<p id='amt-payable-"+index+"'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
                                              "</div>" +
                                          "</div>" +
                                          "<span>Billed Amount: Rs.<span>"+ amt_payable.toFixed(2) +"</span></span>" +
                                          "<button class='btn'>Coupon</button>" +
                                          "<br><br>" +
                                          "<form>" +
                                              "<table>" +
                                                  "<thead>" +
                                                      "<tr>" +
                                                        "<td class='col-md-6' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                                      "</tr>" +
                                                  "</thead>" +
                                                  "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                  //appending data below
                                                  "</tbody>" +
                                              "</table>" +
                                          "</form>" +
                                          "<br>" +
                                      "</div>" +
                                      "<div class='col-md-3'>" +
                                          "<p style='color:darkgrey;font-weight:bold;'>Patient's Name</p>" +
                                          "<p>"+patient_name+"</p>" +
                                          "<p style='color:darkgrey;font-weight:bold;'>Address </p>" +
                                          "<p>Delivery Address</p>" +
                                          "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                          "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                          "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                          "<p id='city'> " + el1.address_json.city + " - </p>" +
                                          "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                          "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                          "<p id='country'>"+ el1.address_json.country +"</p>" +
                                          "<p style='background-color:lightgrey;'>Delivery Partners-<span>"+el1.delivery_partner+"</span><br></p>" +
                                          "<button class='btn btn-default download-shipping-label' data-id='"+el1.group_id+"' type='button' style='background-color:#eb9316;color:#fff;'>Download Shipping Label</button><br>" +
                                          "<button class='btn btn-default fe-form' data-toggle='modal' data-target='#myModal2' data-id='"+el1.group_id+"' style='border-width:1px;background-color:#337ab7;color:#fff;'>FE Form</button>" +
                                          "<button class='btn btn-default move-out-delivery-btn' data-id='"+el1.group_id+"' style='background-color:#265a88;color:#fff;' data-id='"+el1.group_id+"'>Move Out Delivery</button>" +
                                      "</div>" +
                                  "</div>" +
                                  "<br>" +
                              "</div>");

                              el1.med_info.forEach(function (el, idx) {
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

                                $("#med-lists-" + index).append("<tr>" +
                                    "<td class='col-md-5' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>Schedule: <span> H</span></p>" +
                                        "<p>Pack Form: <span> Strip</span></p>" +
                                        "<p>Label: <span>"+el.pack_size+"</span></p>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>"+el.quantity+"</p>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                    "</td>" +
                                "</tr>");
                              });
                            }
                          });

                        }

                      }

                    }
                    else {

                      myobj1.meds_infos.forEach(function (el1, index) {

                        var hh = '';

                        var mm = '';

                        var ss = '';

                        var dd = '';

                        var mM = '';

                        var yyyy = '';

                        var total_mrp = 0;

                        var total_offer_mrp = 0;

                        var shipping_price = 0;


                        if (el1.doctor_name != "") {
                          doctor_name = el1.doctor_name;
                        }
                        else {
                          doctor_name = "Not Provided"
                        }

                        if (el1.patient_name != "") {
                          patient_name = el1.patient_name;
                        }
                        else {
                          patient_name = el1.user_json.firstname + " " + el1.user_json.lastname;
                        }

                        if (el1.order_time != '') {

                          order_time = el1.order_time;

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

                        }

                        if (el1.split_time != '') {
                          split_time = myobj.split_time;
                        }
                        else {
                          split_time = "N/A";
                        }

                        el1.med_info.forEach(function (el, idx) {

                          console.log("idx:" +idx + " vm: " + el.vendor_mrp + " om: " + el.offer_mrp + " m: " + el.mrp);

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

                        discounted_mrp = total_mrp - total_offer_mrp;

                        if (discounted_mrp < 0) {

                          discounted_mrp = 0;

                        }

                        amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                        $("#excel-table tbody").append("<tr>" +
                          "<td>"+(index + 1)+"</td>" +
                          "<td>"+"Sharma Drugs"+"</td>" +
                          "<td>"+el1.group_id+"</td>" +
                          "<td>"+el1.order_id+"</td>" +
                          "<td>"+el1.order_time+"</td>" +
                          "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                          "<td>"+el1.address_json.postal_code+"</td>" +
                          "<td>"+el1.bill_number+"</td>" +
                          "<td>"+"0"+"</td>" +
                          "<td>"+amt_payable+"</td>" +
                          "<td>"+"To be Delivered"+"</td>" +
                          "<td>"+el1.delivery_partner+"</td>" +
                        "</tr>");

                        $("#medicines-list").append("<div class='col-md-12 thumbnail' style='margin-bottom: 20px;'>" +
                            "<div class='row'>" +
                                "<div class='col-md-9'>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-3'>" +
                                            "<p>Group ID:<span> "+el1.group_id+"</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-3'>" +
                                            "<p>Order ID:<span> "+el1.order_id+"</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p>Store:<span> Sharma Drugs</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p>Order Time: " + new Date(el1.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
                                        "</div>" +
                                        "<div class='col-md-1'>" +
                                            "<p>Split Time: <span>" + split_time + "</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-1'>" +
                                            "<p>select</p>" +
                                            "<input type='checkbox' name='abc'>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-2'>" +
                                            "<p>Total MRP Amount Rs. <span> " + total_mrp.toFixed(2) + "</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p>Discounted MRP Amount Rs.<span> "+ discounted_mrp.toFixed(2) +"</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p>Coupon Discount: <span>Rs. 00.00</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p>MOS Cash Used: <span> Rs. 0</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p>Shipping Charges: <span>Rs. " + parseFloat(el1.shipping_price).toFixed(2) +"</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-2'>" +
                                            "<p id='amt-payable-"+index+"'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
                                        "</div>" +
                                    "</div>" +
                                    "<span>Billed Amount: Rs.<span>"+ amt_payable.toFixed(2) +"</span></span>" +
                                    "<button class='btn'>Coupon</button>" +
                                    "<br><br>" +
                                    "<form>" +
                                        "<table>" +
                                            "<thead>" +
                                                "<tr>" +
                                                  "<td class='col-md-6' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                                "</tr>" +
                                            "</thead>" +
                                            "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                            //appending data below
                                            "</tbody>" +
                                        "</table>" +
                                    "</form>" +
                                    "<br>" +
                                "</div>" +
                                "<div class='col-md-3'>" +
                                    "<p style='color:darkgrey;font-weight:bold;'>Patient's Name</p>" +
                                    "<p>"+patient_name+"</p>" +
                                    "<p style='color:darkgrey;font-weight:bold;'>Address </p>" +
                                    "<p>Delivery Address</p>" +
                                    "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                    "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                    "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                    "<p id='city'> " + el1.address_json.city + " - </p>" +
                                    "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                    "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                    "<p id='country'>"+ el1.address_json.country +"</p>" +
                                    "<p style='background-color:lightgrey;'>Delivery Partners-<span>"+el1.delivery_partner+"</span><br></p>" +
                                    "<button class='btn btn-default download-shipping-label' data-id='"+el1.group_id+"' type='button' style='background-color:#eb9316;color:#fff;'>Download Shipping Label</button><br>" +
                                    "<button class='btn btn-default fe-form' data-toggle='modal' data-target='#myModal2' data-id='"+el1.group_id+"' style='border-width:1px;background-color:#337ab7;color:#fff;'>FE Form</button>" +
                                    "<button class='btn btn-default move-out-delivery-btn' style='background-color:#265a88;color:#fff;' data-id='"+el1.group_id+"'>Move Out Delivery</button>" +
                                "</div>" +
                            "</div>" +
                            "<br>" +
                        "</div>");

                        el1.med_info.forEach(function (el, idx) {
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

                          $("#med-lists-" + index).append("<tr>" +
                              "<td class='col-md-5' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                              "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>Schedule: <span> H</span></p>" +
                                  "<p>Pack Form: <span> Strip</span></p>" +
                                  "<p>Label: <span>"+el.pack_size+"</span></p>" +
                              "</td>" +
                              "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>"+el.quantity+"</p>" +
                              "</td>" +
                              "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                              "</td>" +
                          "</tr>");
                        });

                      });
                    }
                    $(".download-shipping-label").click(function () {
                      var g_id = $(this).attr("data-id");
                      alert(g_id);
                    });

                    $(".move-out-delivery-btn").click(function () {
                      var g_id = $(this).attr("data-id");
                      var date = new Date();
                      var confirm = window.confirm("are you sure?");
                      if (confirm) {
                        $.post(
                          "php/move_to_manage_queue.php",
                          {
                            group_id: g_id,
                            date: date
                          },
                          function (data) {
                            console.log(data);
                            if (data == "Moved Successfully") {
                              alert(data);
                              location.reload();
                            }
                            else if (data == "Please enter FE Details") {
                              alert(data);
                            }
                            else {
                              alert("Something's went wrong!");
                            }
                          }
                        );
                      }
                    });

                    $(".fe-form").click(function () {
                      var g_id = $(this).attr("data-id");
                      $("#fe-form").attr("data-id", g_id);
                    });

                    $(".cancel-waybill-btn").click(function () {
                      var g_id = $(this).attr("data-id");
                      alert(g_id);
                    });

                    $("#download-excel-btn").click(function () {
                      $("#excel-table").table2excel({
                        exclude: ".noExl",
                        name: "Excel Document Name"
                      });
                    });
                  }
                );
              }
              else {
                alert("No items in this search");
                window.location.href = "shipping_queue";
              }
            }

          );

        }

      }

    }

  });
});
