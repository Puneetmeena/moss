$(document).ready(function () {

  function time() {
    $.post(
      "php/admin_change_status.php",
      {
        pg: "packaging_queue"
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

  $("#cc_queue_items").click(function () {
    window.location.href = "php/redirector.php?pg=cc_queue";
  });

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
                window.location.href = "php/redirector.php?pg=filter";
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

  if (key != '') {

    find_key = key.indexOf("?key=");

    find_filter = key.indexOf("?filter=");

    if (find_key != -1) {

      key = key.replace("?key=", "");

      $.post("php/admin_login_check.php", function (data) {

        var myobj = JSON.parse(data);

        if (myobj.status == 1) {

          $("body").css("display", "block");

          $.post(
            "php/packaging_queue.php",
            {
              id: key,
              mode: "no filter"
            },
            function (data) {

              var myobj = JSON.parse(data);

              console.log(myobj);



              if (myobj.status == 1) {

                $("#packaging_queue_items span").html(myobj.packaging_queue_total_items);

                if (myobj.cc_total_items != 0) {

                  $("#cc_queue_items span").html(myobj.cc_total_items);

                }

                if (myobj.doctor_name != "") {
                  doctor_name = myobj.doctor_name;
                }
                else {
                  doctor_name = "Not Provided"
                }

                if (myobj.patient_name != "") {
                  patient_name = myobj.patient_name;
                }
                else {
                  patient_name = "Not Provided";
                }

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

                }

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

                if (myobj.split_time != '') {
                  split_time = myobj.split_time;
                }
                else {
                  split_time = "N/A";
                }

                myobj.med_info.forEach(function (el) {

                  if (el.offer_mrp == 0) {
                    total_offer_mrp += el.mrp * el.quantity;
                  }
                  else {
                    total_offer_mrp += el.offer_mrp * el.quantity;
                  }

                  total_mrp += el.mrp * el.quantity;
                });

                discounted_mrp = total_mrp - total_offer_mrp;

                amt_payable = total_offer_mrp + parseFloat(myobj.shipping_price);

                group_id = myobj.group_id;

                $("#medicines-list").append("<div class='col-md-12 thumbnail'>" +
      	            "<div class='row'>" +
      	                "<div class='col-md-9'>" +
      	                    "<div class='row'>" +
      	                        "<div class='col-md-3'>" +
      	                            "<p>Group ID:<span> "+ myobj.group_id +"</span></p>" +
      	                        "</div>" +
      	                        "<div class='col-md-3'>" +
      	                            "<p>Order ID:<span> "+ myobj.order_id +"</span></p>" +
      	                        "</div>" +
      	                        "<div class='col-md-2'>" +
      	                            "<p>Store:<span> Sharma Drugs</span></p>" +
      	                        "</div>" +
      	                        "<div class='col-md-2'>" +
      	                            "<p>Order Time: " + new Date(myobj.order_time).toDateString() + "&nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + "</p>" +
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
      	                            "<p>Shipping Charges: <span>Rs. " + parseFloat(myobj.shipping_price).toFixed(2) +"</span></p>" +
      	                        "</div>" +
      	                        "<div class='col-md-2'>" +
      	                            "<p id='amt-payable'>Amount Payable:<span> Rs."+ amt_payable.toFixed(2) +"</span></p>" +
      	                        "</div>" +
      	                    "</div>" +
      	                    "<button class='btn'>Coupon</button>" +
      	                    "<button class='btn'>Avail Cash</button>" +
      	                    "<br><br>" +
      	                    "<form>" +
      	                        "<table>" +
      	                            "<thead>" +
      	                                "<tr>" +
      	                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
      	                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
      	                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity Required</td>" +
      	                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Vendor Mrp</td>" +
      	                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Total Vendor Price</td>" +
      	                                "</tr>" +
      	                            "</thead>" +
      	                            "<tbody id='med-lists' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
      	                               //appending data below
      	                            "</tbody>" +
      	                        "</table>" +
      	                    "</form>" +
      	                    "<br>" +
      	                    "<div class='col-md-6'>" +
      	                        "<div class='row'>" +
      	                            "<input type='text' name='' id='bill-no' class='form-control' placeholder='Enter Bill Number' style='width: 90%;'>" +
      	                        "</div>" +
      	                    "</div>" +
      	                "</div>" +
      	                "<div class='col-md-3'>" +
      	                    "<p>Address </p>" +
      	                    "<p>Delivery Address</p>" +
      	                    "<p>"+ myobj.user_json.firstname +" "+ myobj.user_json.lastname +"</p>" +
      	                    "<p id='address_line1'>"+ myobj.address_json.address_line1 +",</p>" +
      	                    "<p id='address_line2'>"+ myobj.address_json.address_line2 +",</p>" +
      	                    "<p id='city'> " + myobj.address_json.city + " - </p>" +
      	                    "<p id='region'><span id='postal'>"+ myobj.address_json.postal_code +"</span></p>" +
      	                    "<p>Ph. <span>" + myobj.order_phone + "</span></p>" +
      	                    "<p id='country'>"+ myobj.address_json.country +"</p>" +
      	                    "<p>Patient's Name: <span>" + doctor_name + "</span></p>" +
      	                    "<p>Doctor's Name: <span>" + patient_name + "</span></p>" +
      	                    "<p>Delivery Partners:</p>" +
      	                    "<select id='del-partners' style='width: 100%;'>" +
      	                        "<option value='Delhivery'>Delhivery</option>" +
      	                        "<option value='MOS In House'>MOS In House</option>" +
      	                    "</select>" +
      	                    "<button class='btn btn-default' id='move-to-shipping-queue' data-id='"+group_id+"'>Move To shipping Queue</button>" +
      	                "</div>" +
      	            "</div>" +
      	            "<br>" +
      	            "<button class='btn btn-default' type='button' style='background-color:lightgrey;' id='update-order-btn' data-id='"+group_id+"'>Update Order</button>" +
                    "<button class='btn btn-default move-back-to-cc-queue-btn' type='button' style='background-color:lightgrey; margin-left: 10px;' data-id='"+group_id+"'>Move Back To CC Queue</button>" +
      	        "</div>");

                $(".move-back-to-cc-queue-btn").click(function () {
                  var g_id = $(this).attr("data-id");
                  var date = new Date();
                  var confirm = window.confirm("Are you sure?");

                  if (confirm) {

                    $.post(
                      "php/move_back_to_cc_queue.php",
                      {
                        group_id: g_id,
                        date: date
                      },
                      function (data) {
                        console.log(data);
                        if (data == 'Moved Successfully') {
                          alert(data);
                          location.reload();
                        }
                        else {
                          alert("Something's went wrong!");
                        }
                      }
                    );

                  }
                });

                myobj.med_info.forEach(function (el, index) {

                  var mrp = 0;

                  if (el.offer_mrp == 0) {
                    mrp = el.mrp;
                  }
                  else {
                    mrp = el.offer_mrp;
                  }

                  $("#excel-table tbody").append("<tr>"+
                    "<td>"+myobj.group_id+"</td>"+
                    "<td>"+myobj.order_id+"</td>"+
                    "<td>"+myobj.user_json.email+"</td>"+
                    "<td>"+myobj.order_time+"</td>"+
                    "<td>"+el.product_name+"</td>" +
                    "<td>"+el.company_name+"</td>"+
                    "<td>"+(index+1)+"</td>"+
                    "<td>"+el.mrp+"</td>"+
                    "<td>"+mrp+"</td>"+
                    "<td>"+el.pack_size+"</td>"+
                    "<td>"+el.quantity+"</td>"+
                    "<td>"+myobj.shipping_price+"</td>"+
                    "<td>"+myobj.patient_name+"</td>"+
                    "<td>"+myobj.doctor_name+"</td>"+
                    "<td>"+myobj.order_phone+"</td>"+
                    "<td>" + myobj.address_json.address_line1 + ", " + myobj.address_json.address_line2 + ", " + myobj.address_json.city + ", " + myobj.address_json.region + "</td>" +
                    "<td>"+myobj.address_json.address_line1+"</td>"+
                    "<td>"+myobj.address_json.address_line2+"</td>"+
                    "<td>"+myobj.address_json.city+"</td>"+
                    "<td>"+myobj.address_json.postal_code+"</td>"+
                    "<td>"+myobj.address_json.region+"</td>"+
                    "<td>"+myobj.address_json.country+"</td>"+
                    "<td>"+myobj.split_time+"</td>"+
                    "<td></td>"+
                    "<td>COD</td>"+
                    "<td>"+amt_payable+"</td>"+
                  "</tr>");

                  $("#med-lists").append("<tr>" +
                      "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" + el.product_name + " <br><span>Manufacturer : <span>" + el.company_name + "</span></span></td>" +
                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<p>Drug Name: <span> Capsule</span></p>" +
                          "<p>Schedule: <span> H</span></p>" +
                          "<p>Pack Form: <span> Strip</span></p>" +
                          "<p>Label: <span>" + el.pack_size + "</span></p>" +
                      "</td>" +
                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<p>" + el.quantity + "</p>" +
                      "</td>" +
                      "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<input type='text' id='"+index+"' data-id='"+group_id+"' med-id='"+el.id+"' class='form-control' name='ven' style='width: 100%;'>" +
                          "<p style='font-size:12px;'>for 1 strip</p>" +
                          "<button class='vendor-mrp-btn' type='button' data-id='"+index+"'>Submit</button>" +
                      "</td>" +
                      "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                          "<p id='total-mrp-"+el.id+"'>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                      "</td>" +
                  "</tr>");
                });

                $("#download-excel-btn").click(function () {
                  $("#excel-table").table2excel({
                    exclude: ".noExl",
    				        name: "Excel Document Name"
                  });
                });

                $(".vendor-mrp-btn").click(function () {
                  var input_id = $(this).attr("data-id");

                  var vendor_mrp = $("#" + input_id).val();

                  var g_id = $("#" + input_id).attr("data-id");

                  var med_id = $("#" + input_id).attr("med-id");

                  var date = new Date();

                  $.post(
                    "php/admin_vendor_mrp.php",
                    {
                      vendor_mrp: vendor_mrp,
                      group_id: g_id,
                      med_id: med_id,
                      date: date
                    },
                    function (data) {
                      console.log(data);
                      obj1 = JSON.parse(data);
                      t_mrp = 0;
                      obj1.forEach(function (el, index) {
                        if (el.vendor_mrp != 0) {
                          t_mrp += el.vendor_mrp * el.quantity;
                          $("#total-mrp-" + el.id + " span").html((el.vendor_mrp * el.quantity).toFixed(2));
                        }
                        else {
                          if (el.offer_mrp != 0) {
                            t_mrp += el.offer_mrp * el.quantity;
                          }
                          else {
                            t_mrp += el.mrp * el.quantity;
                          }
                        }
                      });

                      $("#amt-payable span").html("Rs." + t_mrp.toFixed(2));

                    }
                  );
                });

                $("#update-order-btn").click(function () {

                  var g_id = $(this).attr('data-id');

                  var bill_no = $("#bill-no").val();

                  var date = new Date();

                  var confirm = window.confirm("Are you sure?");

                  if (confirm) {

                    $.post(
                      "php/admin_add_bill_no.php",
                      {
                        group_id: g_id,
                        bill_no: bill_no,
                        date: date
                      },
                      function (data) {
                        console.log(data);
                        if (data == "Bill Number Entered") {
                          alert(data);
                        }
                        else {
                          alert("Something's went wrong");
                        }
                      }
                    );

                  }

                });

                $("#move-to-shipping-queue").click(function () {
                  var delivery_partners = $("#del-partners").val();

                  var g_id = $(this).attr("data-id");

                  var date = new Date();

                  var confirm = window.confirm("Are You Sure?");

                  if (confirm) {

                    $.post(
                      "php/move_to_shipping_queue.php",
                      {
                        delivery_partners: delivery_partners,
                        group_id: g_id,
                        date: date
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Moved Successfully") {
                          alert(data);
                          location.reload();
                        }
                        else if (data == "Please add bill number") {
                          alert(data);
                        }
                        else {
                          alert("Something's went wrong!");
                        }
                      }
                    );

                  }
                });

              }
              else {

                alert("Looks like there is no item in queue or processing by another admin comeback after sometime if item is appeared in queue the click next button");

              }

            }
          );

        }
        else {

          window.location.href = "admin_login"

        }

      });

    }
    else if (find_filter != -1) {

      key = key.replace("?filter=", "");

      if (key) {

        $.post("php/admin_login_check.php", function (data) {

          var myobj = JSON.parse(data);

          if (myobj.status == 1) {

            $("body").css("display", "block");

            $.post(
              "php/packaging_queue.php",
              {
                mode: "filtered"
              },
              function (data) {
                console.log(data);
                myobj = JSON.parse(data);
                console.log(myobj);

                if(myobj.info.length == 0) {

                  alert("No Items in this search");

                  window.location.href = 'php/redirector.php?pg=packaging_queue';

                }

                $("#packaging_queue_items span").html(myobj.total_items);

                if (myobj.cc_total_items != 0) {

                  $("#cc_queue_items span").html(myobj.cc_total_items);

                }

                $.post(
                  "php/admin_fetch_orders.php",
                  {
                    data: data
                  },
                  function (data) {
                    console.log(data);
                    myobj1 = JSON.parse(data);
                    console.log(myobj1);

                    console.log(myobj1.filter_rpp);

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

                      console.log("entering1");

                      if (myobj1.filter_order_by == "Order Creation Time") {

                        console.log("entering2");

                        if (myobj1.filter_rpp != 0) {

                          console.log("entering3");

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
                                patient_name = "Not Provided";
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

                                if (el.offer_mrp == 0) {
                                  total_offer_mrp += el.mrp * el.quantity;
                                }
                                else {
                                  total_offer_mrp += el.offer_mrp * el.quantity;
                                }

                                total_mrp += el.mrp * el.quantity;
                              });

                              discounted_mrp = total_mrp - total_offer_mrp;

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              console.log(amt_payable);

                              $("#medicines-list").append("<div class='col-md-12 thumbnail'>" +
                                  "<div class='row'>" +
                                      "<div class='col-md-9'>" +
                                          "<div class='row'>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Group ID:<span> "+ el1.group_id +"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Order ID:<span> "+ el1.order_id +"</span></p>" +
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
                                          "<button class='btn'>Coupon</button>" +
                                          "<button class='btn'>Avail Cash</button>" +
                                          "<br><br>" +
                                          "<form>" +
                                              "<table>" +
                                                  "<thead>" +
                                                      "<tr>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity Required</td>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Vendor Mrp</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Total Vendor Price</td>" +
                                                      "</tr>" +
                                                  "</thead>" +
                                                  "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                     //appending data below
                                                  "</tbody>" +
                                              "</table>" +
                                          "</form>" +
                                          "<br>" +
                                          "<div class='col-md-6'>" +
                                              "<div class='row'>" +
                                                  "<input type='text' name='' class='form-control' placeholder='Enter Bill Number' id='"+el1.group_id+"' style='width: 90%;'>" +
                                              "</div>" +
                                          "</div>" +
                                      "</div>" +
                                      "<div class='col-md-3'>" +
                                          "<p>Address </p>" +
                                          "<p>Delivery Address</p>" +
                                          "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                          "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                          "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                          "<p id='city'> " + el1.address_json.city + " - </p>" +
                                          "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                          "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                          "<p id='country'>"+ el1.address_json.country +"</p>" +
                                          "<p>Patient's Name: <span>" + doctor_name + "</span></p>" +
                                          "<p>Doctor's Name: <span>" + patient_name + "</span></p>" +
                                          "<p>Delivery Partners:</p>" +
                                          "<select style='width: 100%;' id='del-partners"+el1.group_id+"'>" +
                                              "<option value='Delhivery'>Delhivery</option>" +
                                              "<option value='MOS In House'>MOS In House</option>" +
                                          "</select>" +
                                          "<button class='btn btn-default move-to-shipping-queue' type='button' data-id='"+el1.group_id+"'>Move To shipping Queue</button>" +
                                      "</div>" +
                                  "</div>" +
                                  "<br>" +
                                  "<button class='btn btn-default update-order-btn' type='button' style='background-color:lightgrey;' data-id='"+el1.group_id+"'>Update Order</button>" +
                                  "<button class='btn btn-default move-back-to-cc-queue-btn' data-id='"+el1.group_id+"' style='background-color:lightgrey; margin-left: 10px;'>Move Back To CC Queue</button>" +
                              "</div>");

                              if (ctr == 0) {

                              }

                              el1.med_info.forEach(function (el, idx) {

                                var mrp = 0;

                                if (el.offer_mrp == 0) {
                                  mrp = el.mrp;
                                }
                                else {
                                  mrp = el.offer_mrp;
                                }

                                $("#med-lists-" + index).append("<tr>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" + el.product_name + " <br><span>Manufacturer : <span>" + el.company_name + "</span></span></td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>Drug Name: <span> Capsule</span></p>" +
                                        "<p>Schedule: <span> H</span></p>" +
                                        "<p>Pack Form: <span> Strip</span></p>" +
                                        "<p>Label: <span>" + el.pack_size + "</span></p>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>" + el.quantity + "</p>" +
                                    "</td>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<input type='text' id='"+el1.group_id+""+idx+"' data-id='"+el1.group_id+"' med-id='"+el.id+"' class='form-control' name='ven' style='width: 100%;'>" +
                                        "<p style='font-size:12px;'>for 1 strip</p>" +
                                        "<button class='vendor-mrp-btn' type='button' amt-id='"+index+"' data-id='"+el1.group_id+""+idx+"'>Submit</button>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p id='total-mrp-"+el1.group_id+""+el.id+"'>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                    "</td>" +
                                "</tr>");
                              });

                              $(".vendor-mrp-btn").click(function () {
                                var input_id = $(this).attr("data-id");

                                var vendor_mrp = $("#" + input_id).val();

                                var g_id = $("#" + input_id).attr("data-id");

                                var med_id = $("#" + input_id).attr("med-id");

                                var amt_id = $(this).attr("amt-id");

                                var date = new Date();

                                $.post(
                                  "php/admin_vendor_mrp.php",
                                  {
                                    vendor_mrp: vendor_mrp,
                                    group_id: g_id,
                                    med_id: med_id,
                                    date: date
                                  },
                                  function (data) {
                                    console.log(data);
                                    obj1 = JSON.parse(data);
                                    t_mrp = 0;
                                    obj1.forEach(function (el, index) {
                                      if (el.vendor_mrp != 0) {
                                        t_mrp += el.vendor_mrp * el.quantity;
                                        $("#total-mrp-" + g_id + "" +el.id + " span").html((el.vendor_mrp * el.quantity).toFixed(2));
                                      }
                                      else {
                                        if (el.offer_mrp != 0) {
                                          t_mrp += el.offer_mrp * el.quantity;
                                        }
                                        else {
                                          t_mrp += el.mrp * el.quantity;
                                        }
                                      }
                                    });

                                    $("#amt-payable-"+amt_id+" span").html("Rs." + t_mrp.toFixed(2));

                                  }
                                );


                              });

                              ctr++;

                            }


                          });

                        }
                        else {

                          console.log("entering2");

                          myobj1.meds_infos.forEach(function (el1, index) {

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
                                patient_name = "Not Provided";
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

                              el1.med_info.forEach(function (el) {

                                if (el.offer_mrp == 0) {
                                  total_offer_mrp += el.mrp * el.quantity;
                                }
                                else {
                                  total_offer_mrp += el.offer_mrp * el.quantity;
                                }

                                total_mrp += el.mrp * el.quantity;
                              });

                              discounted_mrp = total_mrp - total_offer_mrp;

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              console.log(amt_payable);

                              $("#medicines-list").append("<div class='col-md-12 thumbnail'>" +
                                  "<div class='row'>" +
                                      "<div class='col-md-9'>" +
                                          "<div class='row'>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Group ID:<span> "+ el1.group_id +"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Order ID:<span> "+ el1.order_id +"</span></p>" +
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
                                          "<button class='btn'>Coupon</button>" +
                                          "<button class='btn'>Avail Cash</button>" +
                                          "<br><br>" +
                                          "<form>" +
                                              "<table>" +
                                                  "<thead>" +
                                                      "<tr>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity Required</td>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Vendor Mrp</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Total Vendor Price</td>" +
                                                      "</tr>" +
                                                  "</thead>" +
                                                  "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                     //appending data below
                                                  "</tbody>" +
                                              "</table>" +
                                          "</form>" +
                                          "<br>" +
                                          "<div class='col-md-6'>" +
                                              "<div class='row'>" +
                                                  "<input type='text' name='' id='"+el1.group_id+"' class='form-control' placeholder='Enter Bill Number' style='width: 90%;'>" +
                                              "</div>" +
                                          "</div>" +
                                      "</div>" +
                                      "<div class='col-md-3'>" +
                                          "<p>Address </p>" +
                                          "<p>Delivery Address</p>" +
                                          "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                          "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                          "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                          "<p id='city'> " + el1.address_json.city + " - </p>" +
                                          "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                          "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                          "<p id='country'>"+ el1.address_json.country +"</p>" +
                                          "<p>Patient's Name: <span>" + doctor_name + "</span></p>" +
                                          "<p>Doctor's Name: <span>" + patient_name + "</span></p>" +
                                          "<p>Delivery Partners:</p>" +
                                          "<select style='width: 100%;' id='del-partners"+el1.group_id+"'>" +
                                              "<option value='Delhivery'>Delhivery</option>" +
                                              "<option value='MOS In House'>MOS In House</option>" +
                                          "</select>" +
                                          "<button class='btn btn-default move-to-shipping-queue' data-id='"+el1.group_id+"'>Move To shipping Queue</button>" +
                                      "</div>" +
                                  "</div>" +
                                  "<br>" +
                                  "<button class='btn btn-default update-order-btn' type='button' data-id='"+el1.group_id+"' style='background-color:lightgrey;'>Update Order</button>" +
                                  "<button class='btn btn-default move-back-to-cc-queue-btn' data-id='"+el1.group_id+"' style='background-color:lightgrey; margin-left: 10px;'>Move Back To CC Queue</button>" +
                              "</div>");

                              el1.med_info.forEach(function (el, idx) {

                                var mrp = 0;

                                if (el.offer_mrp == 0) {
                                  mrp = el.mrp;
                                }
                                else {
                                  mrp = el.offer_mrp;
                                }

                                $("#excel-table tbody").append("<tr>"+
                                  "<td>"+el1.group_id+"</td>"+
                                  "<td>"+el1.order_id+"</td>"+
                                  "<td>"+el1.user_json.email+"</td>"+
                                  "<td>"+el1.order_time+"</td>"+
                                  "<td>"+el.product_name+"</td>" +
                                  "<td>"+el.company_name+"</td>"+
                                  "<td>"+(idx+1)+"</td>"+
                                  "<td>"+el.mrp+"</td>"+
                                  "<td>"+mrp+"</td>"+
                                  "<td>"+el.pack_size+"</td>"+
                                  "<td>"+el.quantity+"</td>"+
                                  "<td>"+el1.shipping_price+"</td>"+
                                  "<td>"+el1.patient_name+"</td>"+
                                  "<td>"+el1.doctor_name+"</td>"+
                                  "<td>"+el1.order_phone+"</td>"+
                                  "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                                  "<td>"+el1.address_json.address_line1+"</td>"+
                                  "<td>"+el1.address_json.address_line2+"</td>"+
                                  "<td>"+el1.address_json.city+"</td>"+
                                  "<td>"+el1.address_json.postal_code+"</td>"+
                                  "<td>"+el1.address_json.region+"</td>"+
                                  "<td>"+el1.address_json.country+"</td>"+
                                  "<td>"+el1.split_time+"</td>"+
                                  "<td></td>"+
                                  "<td>COD</td>"+
                                  "<td>"+amt_payable+"</td>"+
                                "</tr>");

                                $("#med-lists-" + index).append("<tr>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" + el.product_name + " <br><span>Manufacturer : <span>" + el.company_name + "</span></span></td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>Drug Name: <span> Capsule</span></p>" +
                                        "<p>Schedule: <span> H</span></p>" +
                                        "<p>Pack Form: <span> Strip</span></p>" +
                                        "<p>Label: <span>" + el.pack_size + "</span></p>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>" + el.quantity + "</p>" +
                                    "</td>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<input type='text' id='"+el1.group_id+""+idx+"' data-id='"+el1.group_id+"' med-id='"+el.id+"' class='form-control' name='ven' style='width: 100%;'>" +
                                        "<p style='font-size:12px;'>for 1 strip</p>" +
                                        "<button class='vendor-mrp-btn' type='button' amt-id='"+index+"' data-id='"+el1.group_id+""+idx+"'>Submit</button>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p id='total-mrp-"+el1.group_id+""+el.id+"'>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                    "</td>" +
                                "</tr>");
                              });

                              $(".vendor-mrp-btn").click(function () {
                                var input_id = $(this).attr("data-id");

                                var vendor_mrp = $("#" + input_id).val();

                                var g_id = $("#" + input_id).attr("data-id");

                                var med_id = $("#" + input_id).attr("med-id");

                                var amt_id = $(this).attr("amt-id");

                                var date = new Date();

                                $.post(
                                  "php/admin_vendor_mrp.php",
                                  {
                                    vendor_mrp: vendor_mrp,
                                    group_id: g_id,
                                    med_id: med_id,
                                    date: date
                                  },
                                  function (data) {
                                    console.log(data);
                                    obj1 = JSON.parse(data);
                                    t_mrp = 0;
                                    obj1.forEach(function (el, index) {
                                      if (el.vendor_mrp != 0) {
                                        t_mrp += el.vendor_mrp * el.quantity;
                                        $("#total-mrp-" + g_id + "" +el.id + " span").html((el.vendor_mrp * el.quantity).toFixed(2));
                                      }
                                      else {
                                        if (el.offer_mrp != 0) {
                                          t_mrp += el.offer_mrp * el.quantity;
                                        }
                                        else {
                                          t_mrp += el.mrp * el.quantity;
                                        }
                                      }
                                    });

                                    $("#amt-payable-"+amt_id+" span").html("Rs." + t_mrp.toFixed(2));

                                  }
                                );


                              });

                              ctr++;

                            }

                          });

                        }

                      }
                      else if (myobj1.filter_order_by == "Order Queue Time") {

                        if (myobj1.filter_rpp != 0) {

                          var filter_rpp = myobj1.filter_rpp;

                          var ctr = 0;

                          myobj1.meds_infos.forEach(function (el1, index) {

                            if (!(ctr < filter_rpp)) {

                              return false;

                            }

                            var time_queue = new Date(el1.time_queue).getTime();

                            console.log("time_queue:" + time_queue);

                            console.log("filter_start_date:" + myobj1.filter_start_date);

                            console.log("filter_end_date:" + myobj1.filter_end_date);

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

                              $("#packaging_queue_items span").html(el1.total_items);

                              if (el1.cc_total_items != 0) {

                                $("#cc_queue_items span").html(el1.cc_total_items);

                              }

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
                                patient_name = "Not Provided";
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

                              el1.med_info.forEach(function (el) {

                                if (el.offer_mrp == 0) {
                                  total_offer_mrp += el.mrp * el.quantity;
                                }
                                else {
                                  total_offer_mrp += el.offer_mrp * el.quantity;
                                }

                                total_mrp += el.mrp * el.quantity;
                              });

                              discounted_mrp = total_mrp - total_offer_mrp;

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              console.log(amt_payable);

                              $("#medicines-list").append("<div class='col-md-12 thumbnail'>" +
                                  "<div class='row'>" +
                                      "<div class='col-md-9'>" +
                                          "<div class='row'>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Group ID:<span> "+ el1.group_id +"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Order ID:<span> "+ el1.order_id +"</span></p>" +
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
                                          "<button class='btn'>Coupon</button>" +
                                          "<button class='btn'>Avail Cash</button>" +
                                          "<br><br>" +
                                          "<form>" +
                                              "<table>" +
                                                  "<thead>" +
                                                      "<tr>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity Required</td>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Vendor Mrp</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Total Vendor Price</td>" +
                                                      "</tr>" +
                                                  "</thead>" +
                                                  "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                     //appending data below
                                                  "</tbody>" +
                                              "</table>" +
                                          "</form>" +
                                          "<br>" +
                                          "<div class='col-md-6'>" +
                                              "<div class='row'>" +
                                                  "<input type='text' name='' id='"+el1.group_id+"' class='form-control' placeholder='Enter Bill Number' style='width: 90%;'>" +
                                              "</div>" +
                                          "</div>" +
                                      "</div>" +
                                      "<div class='col-md-3'>" +
                                          "<p>Address </p>" +
                                          "<p>Delivery Address</p>" +
                                          "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                          "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                          "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                          "<p id='city'> " + el1.address_json.city + " - </p>" +
                                          "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                          "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                          "<p id='country'>"+ el1.address_json.country +"</p>" +
                                          "<p>Patient's Name: <span>" + doctor_name + "</span></p>" +
                                          "<p>Doctor's Name: <span>" + patient_name + "</span></p>" +
                                          "<p>Delivery Partners:</p>" +
                                          "<select style='width: 100%;' id='del-partners"+el1.group_id+"'>" +
                                              "<option value='Delhivery'>Delhivery</option>" +
                                              "<option value='MOS In House'>MOS In House</option>" +
                                          "</select>" +
                                          "<button class='btn btn-default move-to-shipping-queue' type='button' data-id='"+el1.group_id+"'>Move To shipping Queue</button>" +
                                      "</div>" +
                                  "</div>" +
                                  "<br>" +
                                  "<button class='btn btn-default update-order-btn' type='button' data-id='"+el1.group_id+"' style='background-color:lightgrey;'>Update Order</button>" +
                                  "<button class='btn btn-default move-back-to-cc-queue-btn' data-id='"+el1.group_id+"' style='background-color:lightgrey; margin-left: 10px;'>Move Back To CC Queue</button>" +
                              "</div>");

                              el1.med_info.forEach(function (el, idx) {

                                var mrp = 0;

                                if (el.offer_mrp == 0) {
                                  mrp = el.mrp;
                                }
                                else {
                                  mrp = el.offer_mrp;
                                }

                                $("#excel-table tbody").append("<tr>"+
                                  "<td>"+el1.group_id+"</td>"+
                                  "<td>"+el1.order_id+"</td>"+
                                  "<td>"+el1.user_json.email+"</td>"+
                                  "<td>"+el1.order_time+"</td>"+
                                  "<td>"+el.product_name+"</td>" +
                                  "<td>"+el.company_name+"</td>"+
                                  "<td>"+(idx+1)+"</td>"+
                                  "<td>"+el.mrp+"</td>"+
                                  "<td>"+mrp+"</td>"+
                                  "<td>"+el.pack_size+"</td>"+
                                  "<td>"+el.quantity+"</td>"+
                                  "<td>"+el1.shipping_price+"</td>"+
                                  "<td>"+el1.patient_name+"</td>"+
                                  "<td>"+el1.doctor_name+"</td>"+
                                  "<td>"+el1.order_phone+"</td>"+
                                  "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                                  "<td>"+el1.address_json.address_line1+"</td>"+
                                  "<td>"+el1.address_json.address_line2+"</td>"+
                                  "<td>"+el1.address_json.city+"</td>"+
                                  "<td>"+el1.address_json.postal_code+"</td>"+
                                  "<td>"+el1.address_json.region+"</td>"+
                                  "<td>"+el1.address_json.country+"</td>"+
                                  "<td>"+el1.split_time+"</td>"+
                                  "<td></td>"+
                                  "<td>COD</td>"+
                                  "<td>"+amt_payable+"</td>"+
                                "</tr>");

                                $("#med-lists-" + index).append("<tr>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" + el.product_name + " <br><span>Manufacturer : <span>" + el.company_name + "</span></span></td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>Drug Name: <span> Capsule</span></p>" +
                                        "<p>Schedule: <span> H</span></p>" +
                                        "<p>Pack Form: <span> Strip</span></p>" +
                                        "<p>Label: <span>" + el.pack_size + "</span></p>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>" + el.quantity + "</p>" +
                                    "</td>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<input type='text' id='"+el1.group_id+""+idx+"' data-id='"+el1.group_id+"' med-id='"+el.id+"' class='form-control' name='ven' style='width: 100%;'>" +
                                        "<p style='font-size:12px;'>for 1 strip</p>" +
                                        "<button class='vendor-mrp-btn' type='button' amt-id='"+index+"' data-id='"+el1.group_id+""+idx+"'>Submit</button>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p id='total-mrp-"+el1.group_id+""+el.id+"'>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                    "</td>" +
                                "</tr>");
                              });

                              $(".vendor-mrp-btn").click(function () {
                                var input_id = $(this).attr("data-id");

                                var vendor_mrp = $("#" + input_id).val();

                                var g_id = $("#" + input_id).attr("data-id");

                                var med_id = $("#" + input_id).attr("med-id");

                                var amt_id = $(this).attr("amt-id");

                                var date = new Date();

                                $.post(
                                  "php/admin_vendor_mrp.php",
                                  {
                                    vendor_mrp: vendor_mrp,
                                    group_id: g_id,
                                    med_id: med_id,
                                    date: date
                                  },
                                  function (data) {
                                    console.log(data);
                                    obj1 = JSON.parse(data);
                                    t_mrp = 0;
                                    obj1.forEach(function (el, index) {
                                      if (el.vendor_mrp != 0) {
                                        t_mrp += el.vendor_mrp * el.quantity;
                                        $("#total-mrp-" + g_id + "" +el.id + " span").html((el.vendor_mrp * el.quantity).toFixed(2));
                                      }
                                      else {
                                        if (el.offer_mrp != 0) {
                                          t_mrp += el.offer_mrp * el.quantity;
                                        }
                                        else {
                                          t_mrp += el.mrp * el.quantity;
                                        }
                                      }
                                    });

                                    $("#amt-payable-"+amt_id+" span").html("Rs." + t_mrp.toFixed(2));

                                  }
                                );


                              });

                              ctr++;

                            }

                          });

                        }
                        else {

                          console.log("entering");

                          myobj1.meds_infos.forEach(function (el1, index) {

                            var time_queue = new Date(el1.time_queue).getTime();

                            console.log("time_queue:" + time_queue);

                            console.log("filter_start_date:" + myobj1.filter_start_date);

                            console.log("filter_end_date:" + myobj1.filter_end_date);

                            //console.log(1523647505000 >= 1523730600000);

                            if ((parseInt(time_queue) >= parseInt(myobj1.filter_start_date)) && (parseInt(time_queue) <= parseInt(myobj1.filter_end_date))) {

                              var hh = '';

                              var mm = '';

                              var ss = '';

                              var dd = '';

                              var mM = '';

                              var yyyy = '';

                              var total_mrp = 0;

                              var total_offer_mrp = 0;

                              var shipping_price = 0;

                              $("#packaging_queue_items span").html(el1.total_items);

                              if (el1.cc_total_items != 0) {

                                $("#cc_queue_items span").html(el1.cc_total_items);

                              }

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
                                patient_name = "Not Provided";
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

                              el1.med_info.forEach(function (el) {

                                if (el.offer_mrp == 0) {
                                  total_offer_mrp += el.mrp * el.quantity;
                                }
                                else {
                                  total_offer_mrp += el.offer_mrp * el.quantity;
                                }

                                total_mrp += el.mrp * el.quantity;
                              });

                              discounted_mrp = total_mrp - total_offer_mrp;

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              console.log(amt_payable);

                              $("#medicines-list").append("<div class='col-md-12 thumbnail'>" +
                                  "<div class='row'>" +
                                      "<div class='col-md-9'>" +
                                          "<div class='row'>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Group ID:<span> "+ el1.group_id +"</span></p>" +
                                              "</div>" +
                                              "<div class='col-md-3'>" +
                                                  "<p>Order ID:<span> "+ el1.order_id +"</span></p>" +
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
                                          "<button class='btn'>Coupon</button>" +
                                          "<button class='btn'>Avail Cash</button>" +
                                          "<br><br>" +
                                          "<form>" +
                                              "<table>" +
                                                  "<thead>" +
                                                      "<tr>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity Required</td>" +
                                                        "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Vendor Mrp</td>" +
                                                        "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Total Vendor Price</td>" +
                                                      "</tr>" +
                                                  "</thead>" +
                                                  "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                     //appending data below
                                                  "</tbody>" +
                                              "</table>" +
                                          "</form>" +
                                          "<br>" +
                                          "<div class='col-md-6'>" +
                                              "<div class='row'>" +
                                                  "<input type='text' name='' id='"+el1.group_id+"' class='form-control' placeholder='Enter Bill Number' style='width: 90%;'>" +
                                              "</div>" +
                                          "</div>" +
                                      "</div>" +
                                      "<div class='col-md-3'>" +
                                          "<p>Address </p>" +
                                          "<p>Delivery Address</p>" +
                                          "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                          "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                          "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                          "<p id='city'> " + el1.address_json.city + " - </p>" +
                                          "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                          "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                          "<p id='country'>"+ el1.address_json.country +"</p>" +
                                          "<p>Patient's Name: <span>" + doctor_name + "</span></p>" +
                                          "<p>Doctor's Name: <span>" + patient_name + "</span></p>" +
                                          "<p>Delivery Partners:</p>" +
                                          "<select style='width: 100%;' id='del-partners"+el1.group_id+"'>" +
                                              "<option value='Delhivery'>Delhivery</option>" +
                                              "<option value='MOS In House'>MOS In House</option>" +
                                          "</select>" +
                                          "<button class='btn btn-default move-to-shipping-queue' type='button' data-id='"+el1.group_id+"'>Move To shipping Queue</button>" +
                                      "</div>" +
                                  "</div>" +
                                  "<br>" +
                                  "<button class='btn btn-default update-order-btn' type='button' data-id='"+el1.group_id+"' style='background-color:lightgrey;'>Update Order</button>" +
                                  "<button class='btn btn-default move-back-to-cc-queue-btn' data-id='"+el1.group_id+"' style='background-color:lightgrey; margin-left: 10px;'>Move Back To CC Queue</button>" +
                              "</div>");

                              el1.med_info.forEach(function (el, idx) {

                                var mrp = 0;

                                if (el.offer_mrp == 0) {
                                  mrp = el.mrp;
                                }
                                else {
                                  mrp = el.offer_mrp;
                                }

                                $("#excel-table tbody").append("<tr>"+
                                  "<td>"+el1.group_id+"</td>"+
                                  "<td>"+el1.order_id+"</td>"+
                                  "<td>"+el1.user_json.email+"</td>"+
                                  "<td>"+el1.order_time+"</td>"+
                                  "<td>"+el.product_name+"</td>" +
                                  "<td>"+el.company_name+"</td>"+
                                  "<td>"+(idx+1)+"</td>"+
                                  "<td>"+el.mrp+"</td>"+
                                  "<td>"+mrp+"</td>"+
                                  "<td>"+el.pack_size+"</td>"+
                                  "<td>"+el.quantity+"</td>"+
                                  "<td>"+el1.shipping_price+"</td>"+
                                  "<td>"+el1.patient_name+"</td>"+
                                  "<td>"+el1.doctor_name+"</td>"+
                                  "<td>"+el1.order_phone+"</td>"+
                                  "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                                  "<td>"+el1.address_json.address_line1+"</td>"+
                                  "<td>"+el1.address_json.address_line2+"</td>"+
                                  "<td>"+el1.address_json.city+"</td>"+
                                  "<td>"+el1.address_json.postal_code+"</td>"+
                                  "<td>"+el1.address_json.region+"</td>"+
                                  "<td>"+el1.address_json.country+"</td>"+
                                  "<td>"+el1.split_time+"</td>"+
                                  "<td></td>"+
                                  "<td>COD</td>"+
                                  "<td>"+amt_payable+"</td>"+
                                "</tr>");

                                $("#med-lists-" + index).append("<tr>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" + el.product_name + " <br><span>Manufacturer : <span>" + el.company_name + "</span></span></td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>Drug Name: <span> Capsule</span></p>" +
                                        "<p>Schedule: <span> H</span></p>" +
                                        "<p>Pack Form: <span> Strip</span></p>" +
                                        "<p>Label: <span>" + el.pack_size + "</span></p>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p>" + el.quantity + "</p>" +
                                    "</td>" +
                                    "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<input type='text' id='"+el1.group_id+""+idx+"' amt-id='"+index+"' data-id='"+el1.group_id+"' med-id='"+el.id+"' class='form-control' name='ven' style='width: 100%;'>" +
                                        "<p style='font-size:12px;'>for 1 strip</p>" +
                                        "<button class='vendor-mrp-btn' type='button' amt-id='"+index+"' data-id='"+el1.group_id+""+idx+"'>Submit</button>" +
                                    "</td>" +
                                    "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                        "<p id='total-mrp-"+el1.group_id+""+el.id+"'>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                                    "</td>" +
                                "</tr>");
                              });

                              $(".vendor-mrp-btn").click(function () {
                                var input_id = $(this).attr("data-id");

                                var vendor_mrp = $("#" + input_id).val();

                                var g_id = $("#" + input_id).attr("data-id");

                                var med_id = $("#" + input_id).attr("med-id");

                                var amt_id = $(this).attr("amt-id");

                                var date = new Date();

                                $.post(
                                  "php/admin_vendor_mrp.php",
                                  {
                                    vendor_mrp: vendor_mrp,
                                    group_id: g_id,
                                    med_id: med_id,
                                    date: date
                                  },
                                  function (data) {
                                    console.log(data);
                                    obj1 = JSON.parse(data);
                                    t_mrp = 0;
                                    obj1.forEach(function (el, index) {
                                      if (el.vendor_mrp != 0) {
                                        t_mrp += el.vendor_mrp * el.quantity;
                                        $("#total-mrp-" + g_id + "" +el.id + " span").html((el.vendor_mrp * el.quantity).toFixed(2));
                                      }
                                      else {
                                        if (el.offer_mrp != 0) {
                                          t_mrp += el.offer_mrp * el.quantity;
                                        }
                                        else {
                                          t_mrp += el.mrp * el.quantity;
                                        }
                                      }
                                    });

                                    $("#amt-payable-"+amt_id+" span").html("Rs." + t_mrp.toFixed(2));

                                  }
                                );


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

                        $("#packaging_queue_items span").html(el1.total_items);

                        if (el1.cc_total_items != 0) {

                          $("#cc_queue_items span").html(el1.cc_total_items);

                        }

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
                          patient_name = "Not Provided";
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

                        el1.med_info.forEach(function (el) {

                          if (el.offer_mrp == 0) {
                            total_offer_mrp += el.mrp * el.quantity;
                          }
                          else {
                            total_offer_mrp += el.offer_mrp * el.quantity;
                          }

                          total_mrp += el.mrp * el.quantity;
                        });

                        discounted_mrp = total_mrp - total_offer_mrp;

                        amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                        console.log(amt_payable);

                        $("#medicines-list").append("<div class='col-md-12 thumbnail'>" +
                            "<div class='row'>" +
                                "<div class='col-md-9'>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-3'>" +
                                            "<p>Group ID:<span> "+ el1.group_id +"</span></p>" +
                                        "</div>" +
                                        "<div class='col-md-3'>" +
                                            "<p>Order ID:<span> "+ el1.order_id +"</span></p>" +
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
                                    "<button class='btn'>Coupon</button>" +
                                    "<button class='btn'>Avail Cash</button>" +
                                    "<br><br>" +
                                    "<form>" +
                                        "<table>" +
                                            "<thead>" +
                                                "<tr>" +
                                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity Required</td>" +
                                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Vendor Mrp</td>" +
                                                  "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Total Vendor Price</td>" +
                                                "</tr>" +
                                            "</thead>" +
                                            "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                               //appending data below
                                            "</tbody>" +
                                        "</table>" +
                                    "</form>" +
                                    "<br>" +
                                    "<div class='col-md-6'>" +
                                        "<div class='row'>" +
                                            "<input type='text' name='' class='form-control' id='"+el1.group_id+"' placeholder='Enter Bill Number' style='width: 90%;'>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='col-md-3'>" +
                                    "<p>Address </p>" +
                                    "<p>Delivery Address</p>" +
                                    "<p>"+ el1.user_json.firstname +" "+ el1.user_json.lastname +"</p>" +
                                    "<p id='address_line1'>"+ el1.address_json.address_line1 +",</p>" +
                                    "<p id='address_line2'>"+ el1.address_json.address_line2 +",</p>" +
                                    "<p id='city'> " + el1.address_json.city + " - </p>" +
                                    "<p id='region'><span id='postal'>"+ el1.address_json.postal_code +"</span></p>" +
                                    "<p>Ph. <span>" + el1.order_phone + "</span></p>" +
                                    "<p id='country'>"+ el1.address_json.country +"</p>" +
                                    "<p>Patient's Name: <span>" + doctor_name + "</span></p>" +
                                    "<p>Doctor's Name: <span>" + patient_name + "</span></p>" +
                                    "<p>Delivery Partners:</p>" +
                                    "<select style='width: 100%;' id='del-partners"+el1.group_id+"'>" +
                                        "<option value='Delhivery'>Delhivery</option>" +
                                        "<option value='MOS In House'>MOS In House</option>" +
                                    "</select>" +
                                    "<button class='btn btn-default move-to-shipping-queue' type='button' data-id='"+el1.group_id+"'>Move To shipping Queue</button>" +
                                "</div>" +
                            "</div>" +
                            "<br>" +
                            "<button class='btn btn-default update-order-btn' type='button' data-id='"+el1.group_id+"' style='background-color:lightgrey;'>Update Order</button>" +
                            "<button class='btn btn-default move-back-to-cc-queue-btn' data-id='"+el1.group_id+"' style='background-color:lightgrey; margin-left: 10px;'>Move Back To CC Queue</button>" +
                        "</div>");

                        el1.med_info.forEach(function (el, idx) {

                          var mrp = 0;

                          if (el.offer_mrp == 0) {
                            mrp = el.mrp;
                          }
                          else {
                            mrp = el.offer_mrp;
                          }

                          $("#excel-table tbody").append("<tr>"+
                            "<td>"+el1.group_id+"</td>"+
                            "<td>"+el1.order_id+"</td>"+
                            "<td>"+el1.user_json.email+"</td>"+
                            "<td>"+el1.order_time+"</td>"+
                            "<td>"+el.product_name+"</td>" +
                            "<td>"+el.company_name+"</td>"+
                            "<td>"+(idx+1)+"</td>"+
                            "<td>"+el.mrp+"</td>"+
                            "<td>"+mrp+"</td>"+
                            "<td>"+el.pack_size+"</td>"+
                            "<td>"+el.quantity+"</td>"+
                            "<td>"+el1.shipping_price+"</td>"+
                            "<td>"+el1.patient_name+"</td>"+
                            "<td>"+el1.doctor_name+"</td>"+
                            "<td>"+el1.order_phone+"</td>"+
                            "<td>" + el1.address_json.address_line1 + ", " + el1.address_json.address_line2 + ", " + el1.address_json.city + ", " + el1.address_json.region + "</td>" +
                            "<td>"+el1.address_json.address_line1+"</td>"+
                            "<td>"+el1.address_json.address_line2+"</td>"+
                            "<td>"+el1.address_json.city+"</td>"+
                            "<td>"+el1.address_json.postal_code+"</td>"+
                            "<td>"+el1.address_json.region+"</td>"+
                            "<td>"+el1.address_json.country+"</td>"+
                            "<td>"+el1.split_time+"</td>"+
                            "<td></td>"+
                            "<td>COD</td>"+
                            "<td>"+amt_payable+"</td>"+
                          "</tr>");

                          $("#med-lists-" + index).append("<tr>" +
                              "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" + el.product_name + " <br><span>Manufacturer : <span>" + el.company_name + "</span></span></td>" +
                              "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>Drug Name: <span> Capsule</span></p>" +
                                  "<p>Schedule: <span> H</span></p>" +
                                  "<p>Pack Form: <span> Strip</span></p>" +
                                  "<p>Label: <span>" + el.pack_size + "</span></p>" +
                              "</td>" +
                              "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>" + el.quantity + "</p>" +
                              "</td>" +
                              "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<input type='text' id='"+el1.group_id+""+idx+"' amt-id='"+index+"' data-id='"+el1.group_id+"' med-id='"+el.id+"' class='form-control' name='ven' style='width: 100%;'>" +
                                  "<p style='font-size:12px;'>for 1 strip</p>" +
                                  "<button class='vendor-mrp-btn' type='button' amt-id='"+index+"' data-id='"+el1.group_id+""+idx+"'>Submit</button>" +
                              "</td>" +
                              "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p id='total-mrp-"+el1.group_id+""+el.id+"'>Rs. <span>"+ (mrp * el.quantity).toFixed(2) +"</span></p>" +
                              "</td>" +
                          "</tr>");
                        });

                        $(".vendor-mrp-btn").click(function () {
                          var input_id = $(this).attr("data-id");

                          var vendor_mrp = $("#" + input_id).val();

                          var g_id = $("#" + input_id).attr("data-id");

                          var med_id = $("#" + input_id).attr("med-id");

                          var amt_id = $(this).attr("amt-id");

                          var date = new Date();

                          $.post(
                            "php/admin_vendor_mrp.php",
                            {
                              vendor_mrp: vendor_mrp,
                              group_id: g_id,
                              med_id: med_id,
                              date: date
                            },
                            function (data) {
                              console.log(data);
                              obj1 = JSON.parse(data);
                              t_mrp = 0;
                              obj1.forEach(function (el, index) {
                                if (el.vendor_mrp != 0) {
                                  t_mrp += el.vendor_mrp * el.quantity;
                                  $("#total-mrp-" + g_id + "" +el.id + " span").html((el.vendor_mrp * el.quantity).toFixed(2));
                                }
                                else {
                                  if (el.offer_mrp != 0) {
                                    t_mrp += el.offer_mrp * el.quantity;
                                  }
                                  else {
                                    t_mrp += el.mrp * el.quantity;
                                  }
                                }
                              });

                              $("#amt-payable-"+amt_id+" span").html("Rs." + t_mrp.toFixed(2));

                            }
                          );


                        });

                      });

                    }

                    $(".move-to-shipping-queue").click(function () {

                      var g_id = $(this).attr("data-id");

                      var delivery_partners = $("#del-partners" + g_id).val();

                      var date = new Date();

                      var confirm = window.confirm("Are You Sure?");

                      if (confirm) {

                        $.post(
                          "php/move_to_shipping_queue.php",
                          {
                            delivery_partners: delivery_partners,
                            group_id: g_id,
                            date: date
                          },
                          function (data) {
                            console.log(data);

                            if (data == "Moved Successfully") {
                              alert(data);
                              location.reload();
                            }
                            else if (data == "Please add bill number") {
                              alert(data);
                            }
                            else {
                              alert("Something's went wrong!");
                            }
                          }
                        );

                      }
                    });

                    $("#download-excel-btn").click(function () {
                      $("#excel-table").table2excel({
                        exclude: ".noExl",
        				        name: "Excel Document Name"
                      });
                    });

                    $(".update-order-btn").click(function () {
                      var g_id = $(this).attr('data-id');

                      var bill_no = $("#" + g_id).val();

                      var date = new Date();

                      var confirm = window.confirm("Are you Sure?");

                      if (confirm) {

                        console.log(g_id + " " + bill_no + " " + date);

                        $.post(
                          "php/admin_add_bill_no.php",
                          {
                            bill_no: bill_no,
                            group_id: g_id,
                            date: date
                          },
                          function (data) {
                            console.log(data);
                            if (data == "Bill Number Entered") {
                              alert(data);
                            }
                            else {
                              alert("Something's went wrong!");
                            }
                          }
                        );

                      }
                    });

                    $(".move-back-to-cc-queue-btn").click(function () {
                      var g_id = $(this).attr("data-id");
                      var date = new Date();
                      var confirm = window.confirm("Are you sure?");

                      if (confirm) {

                        $.post(
                          "php/move_back_to_cc_queue.php",
                          {
                            group_id: g_id,
                            date: date
                          },
                          function (data) {
                            console.log(data);
                            if (data == 'Moved Successfully') {
                              alert(data);
                              location.reload();
                            }
                            else {
                              alert("Something's went wrong!");
                            }
                          }
                        );

                      }
                    });
                  }
                );
              }
            );

          }
          else {
            window.location.href = "admin_login";
          }
        });

      }

    }
    else {
      alert("Invalid Access");
      window.location.href = "admin_login";
    }

  }

});
