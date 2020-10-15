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
              filter_order_by: 'abc',
              filter_city: filter_city,
              filter_phone_number: filter_phone_number,
              filter_rpp: filter_rpp
            },
            function (data) {
              console.log(data);
              if (data == "All set") {
                window.location.href = "search_order?filter=search_filter";
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


  $.post("php/admin_login_check.php", function (data) {

    var myobj = JSON.parse(data);

    if (myobj.status == 1) {

      $("body").css("display", "block");

      var key = window.location.search;

      if (key != '') {

        key = key.replace("?filter=", '');

        console.log(key);

        if (key == "search_filter") {

          $.post(
            "php/search_order.php",
            {
              mode: "search_filter"
            },
            function (data) {
              console.log(data);
              myobj = JSON.parse(data);
              console.log(myobj);

              if (myobj.info.length != 0) {

                $.post(
                  "php/admin_fetch_search_orders.php",
                  {
                    data: data
                  },
                  function (data) {
                    console.log(data);
                    myobj1 = JSON.parse(data);
                    console.log(myobj1);

                    myobj1.meds_infos.forEach(function (el1, index) {

                      var hh = '';

                      var mm = '';

                      var ss = '';

                      var dd = '';

                      var mM = '';

                      var yyyy = '';

                      var hh1 = '';

                      var mm1 = '';

                      var ss1 = '';

                      var dd1 = '';

                      var mM1 = '';

                      var yyyy1 = '';

                      var hh2 = '';

                      var mm2 = '';

                      var ss2 = '';

                      var dd2 = '';

                      var mM2 = '';

                      var yyyy2 = '';

                      var total_mrp = 0;

                      var total_offer_mrp = 0;

                      var shipping_price = 0;

                      var time_since = '';

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

                        time_since = timeSince(d.getTime()/1000);

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

                      patient_name = '';

                      if (el1.patient_name) {
                        patient_name = el1.patient_name;
                      }
                      else {
                        patient_name = "Not Provided";
                      }

                      $("#list").append("<div class='row' style='margin-top: 30px;'>" +
                            "<div class='col-md-4' style='padding-right: 0%;padding-left: 12%;'>" +
                            	"<div class='col-md-12 thumbnail'>" +
                            		"<div style='font-weight: bold;'>Payment Details</div><br>" +
                                    "<p>Cart MRP: <span> Rs." + total_mrp.toFixed(2) + "</span></p>" +
                                    "<p>Current MRP: <span> Rs."+ total_offer_mrp.toFixed(2) +"</span></p>" +
                                    "<p>Discounted MRP: <span> Rs." + discounted_mrp.toFixed(2) + "</span></p>" +
                                    "<p>Coupon Discount: <span> Rs. 0.00</span></p>" +
                                    "<p>MOS Cash Used: <span> Rs.866.00</span></p>" +
                                    "<p>Shipping Charges: <span> Rs."+ el1.shipping_price +"</span></p>" +
                                    "<p>Amount Payable: <span> Rs."+total_offer_mrp+"</span></p>" +
                                    "<p>Order Time: <span> "+yyyy+"-"+mM+"-"+dd+" <span>"+hh+":"+mm+":"+ss+"</span></span></p>" +
                                    "<p>Mode:<span>COD</span></p>" +
                            	"</div>" +
                            	"<div class='col-md-12 thumbnail'>" +
                            		"<div style='font-weight: bold;'>User Details</div><br>" +
                                    "<p>Patient Name: <span>"+patient_name+"</span></p>" +
                                    "<p>Email: <span>"+el1.user_json.email+"</span></p>" +
                            	"</div>" +
                            	"<div class='col-md-12 thumbnail'>" +
                            		"<div style='font-weight: bold;'>Delivery Address:</div><br>" +
                                    "<p>"+el1.order_name+"</p>" +
                                    "<p>"+ el1.address_json.address_line1 +",</p>" +
                                    "<p>"+ el1.address_json.address_line2 +",</p>" +
                                    "<p>"+ el1.address_json.city +",</p>" +
                                    "<p>"+ el1.address_json.region +" - </p>" +
                                    "<p>"+ el1.address_json.postal_code +"</p>" +
                                    "<p>"+ el1.address_json.country +"</p>" +
                                    "<p>Ph."+el1.order_phone+"</p>" +
                            	"</div>" +
                                "<div class='col-md-12 thumbnail'>" +
                                  "<table>" +
                                    "<tr>" +
                                      "<th>Prescription</th>" +
                                      "<th>Upload Dates</th>" +
                                    "</tr>" +
                                  "</table>" +
                                "</div>" +
                            "</div>" +
                            "<div class='col-md-7 thumbnail'>" +
                                "<div class='col-md-5''>" +
                                    "<a style='text-decoration:none;cursor:pointer;color:grey;'>Group ID: <span>"+el1.group_id+"</span></a><br>" +
                                    "<a style='text-decoration:none;cursor:pointer;color:grey;'>Order ID: <span>"+el1.order_id+"</span></a><br><br>" +
                                    "<p>Order Type: <span>MOS COD</span></p>" +
                                    "<p>Store: <span>Sharma Drugs</span></p>" +
                                "</div>" +
                                "<div class='col-md-4'>" +
                                    "<p>Order Time: <span> "+yyyy+"-"+mM+"-"+dd+" <span>"+hh+":"+mm+":"+ss+"</span></span></p>" +
                                    "<p>Time since: <span>"+time_since+"</span></p>" +
                                "</div>" +
                            "</div>" +
                            "<div class='col-md-7 thumbnail'>" +
                                "<button data-toggle='modal' data-target='#myModal"+index+"'>View History</button>" +
                                "<button>Coupon</button>" +
                                "<br><br>" +
                                "<form>" +
                                        "<table>" +
                                            "<thead>" +
                                                "<tr>" +
                                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Product Name</td>" +
                                                  "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Drug/Pack Form</td>" +
                                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Quantity</td>" +
                                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>Price</td>" +
                                                "</tr>" +
                                            "</thead>" +
                                            "<tbody id='med-lists-"+index+"' style='background-color: rgba(233, 255, 226,0.6);font-size:12px;'>" +
                                                //appending data
                                            "</tbody>" +
                                        "</table>" +
                                    "</form>" +
                                    "<br>" +
                            "</div>" +
                    	"</div>");

                      $("#modal-lists").append("<div class='modal fade' id='myModal"+index+"' role='dialog'>" +
                		    "<div class='modal-dialog'>" +
                		      "<div class='modal-content'>" +
                		        "<div class='modal-header'>" +
                		          "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
                		          "<h4 class='modal-title'>Order History</h4>" +
                		        "</div>" +
                		        "<div class='modal-body' style='height: 400px; overflow-y: auto;'>" +
                							"<a style='text-decoration:none;cursor:pointer;color:grey;' id='grp_id'>Group ID: <span>"+el1.group_id+"</span></a><br>" +
                							"<a style='text-decoration:none;cursor:pointer;color:grey;' id='order_id'>Order ID: <span>"+el1.order_id+"</span></a><br><br>" +
                							"<table id='order-history-"+index+"' class='order-history'>" +
                								"<tr>" +
                									"<th>S.No</th>" +
                									"<th>Actions</th>" +
                								"</tr>" +
                							"</table>" +
                		        "</div>" +
                		        "<div class='modal-footer'>" +
                		          "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
                		        "</div>" +
                		      "</div>" +
                		    "</div>" +
                		  "</div>");

                      JSON.parse(el1.order_history).forEach(function (el, idx) {
                        $("#order-history-" + index).append("<tr><td>" + (idx + 1) + ".</td><td> " + el + " </td></tr>");
                      });

                      el1.med_info.forEach(function (el) {

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
                            "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>"+el.product_name+" <br><span>Manufacturer : <span>"+el.company_name+"</span></span></td>" +
                            "<td class='col-md-3' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                "<p>Drug Form: <span> Capsule</span></p>" +
                                "<p>Schedule: <span> H</span></p>" +
                                "<p>Pack Form: <span> Strip</span></p>" +
                                "<p>Label: <span>"+el.pack_size+"</span></p>" +
                            "</td>" +
                            "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                "<p>"+el.quantity+"</p>" +
                            "</td>" +
                            "<td class='col-md-2' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                "<p>Rs. <span>"+(mrp * el.quantity)+"</span></p>" +
                            "</td>" +
                        "</tr>");

                      });

                    });

                  }
                );


              }
              else {

                alert("no data found");

              }
            }
          );

        }

      }

    }

  });

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
