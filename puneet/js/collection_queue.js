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
                window.location.href = "collection_queue?filter=search_filter";
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

    }

    $("#status-selection-filter input").click(function () {
      var status = $(this).val();

      $.post(
        "php/set_filter_val_in_session.php",
        {
          status: status
        },
        function (data) {

          if (data == "All Set") {

            window.location.href = "collection_queue?filter=selection_filter";

          }
          else {

            alert("Something went wrong.");

          }

        }
      );
    });

    if (key == "") {

      $.post(
        "php/collection_queue.php",
        {
          mode: "no filter"
        },
        function (data) {

          console.log(data);

          myobj = JSON.parse(data);

          console.log(myobj);

          if (myobj.info.length != 0) {

            $("#mark-collected-btn").click(function () {

              var date = new Date();

              $.post(
                "php/admin_mark_collected.php",
                {
                  date: date,
                  data: data,
                  mode: "no filter"
                },
                function (data) {
                  console.log(data);

                  if (data == "Marked") {
                    alert("Status Changed");
                    location.reload();
                  }
                  else {
                    alert("Something went wrong");
                  }
                }
              );

            });

            $("#mark-uncollected-btn").click(function () {

              var date = new Date();

              $.post(
                "php/admin_mark_uncollected.php",
                {
                  date: date,
                  data: data,
                  mode: "no filter"
                },
                function (data) {
                  console.log(data);

                  if (data == "Marked") {
                    alert("Status Changed");
                    location.reload();
                  }
                  else {
                    alert("Something went wrong");
                  }
                }
              );

            });

            myobj.info.forEach(function (el1, index) {

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

              if (el1.deliver_date != '') {

                deliver_date = el1.deliver_date;

                var d = new Date(deliver_date);

                hh1 = d.getHours();

                if (hh1 < 10) {

                  hh1 = '0' + hh1;

                }

                mm1 = d.getMinutes();

                if (mm1 < 10) {

                  mm1 = "0" + mm1;

                }

                ss1 = d.getSeconds();

                if (ss1 < 10) {

                  ss1 = "0" + ss1;

                }

                dd1 = d.getDate();

                if (dd1 < 10) {

                  dd1 = "0" + dd1;

                }

                mM1 = d.getMonth() + 1;

                if (mM1 < 10) {

                  mM1 = "0" + mM1;

                }

                yyyy1 = d.getFullYear();

              }

              if (el1.time_queue != '') {

                time_queue = el1.time_queue;

                var d = new Date(time_queue);

                hh2 = d.getHours();

                if (hh2 < 10) {

                  hh2 = '0' + hh2;

                }

                mm2 = d.getMinutes();

                if (mm2 < 10) {

                  mm2 = "0" + mm2;

                }

                ss2 = d.getSeconds();

                if (ss2 < 10) {

                  ss2 = "0" + ss2;

                }

                dd2 = d.getDate();

                if (dd2 < 10) {

                  dd2 = "0" + dd2;

                }

                mM2 = d.getMonth() + 1;

                if (mM2 < 10) {

                  mM2 = "0" + mM2;

                }

                yyyy2 = d.getFullYear();

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

              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

              collection_status = 'Collected';

              if (el1.collection_status == "") {

                collection_status = "Not Updated yet";

              }

              $("#excel-table tbody").append("<tr>" +
                "<td>"+(index + 1)+"</td>" +
                "<td>"+"Sharma Drugs"+"</td>" +
                "<td>"+el1.group_id+"</td>" +
                "<td>"+el1.order_id+"</td>" +
                "<td>"+el1.deliver_date+"</td>" +
                "<td>"+el1.bill_number+"</td>" +
                "<td>"+amt_payable+"</td>" +
                "<td>"+"Delivered"+"</td>" +
                "<td>"+el1.fe_name+"</td>" +
                "<td>"+el1.fe_number+"</td>" +
                "<td>"+collection_status+"</td>" +
                "<td>"+el1.collection_date+"</td>" +
              "</tr>");

              $("#order_lists").append("<tr>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<input type='checkbox'>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                    "<p>"+el1.order_id+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>Sharma Drugs</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+el1.fe_name+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+el1.bill_number+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+el1.delivery_status+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+collection_status+"</p>" +
                  "</td>" +
                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<select class='status' data-id='"+el1.group_id+"'>" +
                          "<option value=''>--</option>" +
                          "<option value='Collected'>Collected</option>" +
                          "<option value='Not Collected'>Not Collected</option>" +
                      "</select>" +
                  "</td>" +
              "</tr>");


            });

            $("#download-excel-btn").click(function () {
              $("#excel-table").table2excel({
                exclude: ".noExl",
                name: "Excel Document Name"
              });
            });

            $(".status").change(function () {

              var sel = $(this);
              var status = $(this).val();
              var g_id = $(this).attr("data-id");
              var date = new Date();
              var confirm = window.confirm("Are you sure?");

              if (confirm) {

                $.post(
                  "php/admin_collection_status_change.php",
                  {
                    status: status,
                    group_id: g_id,
                    date: date
                  },
                  function (data) {
                    console.log(data);
                    if (data == "Status Changed") {
                      alert(data);
                      location.reload();
                    }
                    else {
                      sel.val('');
                      alert("Something's went wrong!");
                    }
                  }
                );
              }
              else {
                $(this).val('');
              }

            });

          }
          else {

            alert("No items in this queue");

          }

        }
      );

    }
    else {

      key = key = key.replace("?filter=", "");

      if (key == "search_filter") {

        $.post(
          "php/collection_queue.php",
          {
            mode: "search_filter"
          },
          function (data) {
            console.log(data);
            myobj = JSON.parse(data);
            console.log(myobj);

            if (myobj.info.length != 0) {

              $.post(
                "php/admin_fetch_collection_orders.php",
                {
                  data: data
                },
                function (data) {

                  console.log(data);
                  myobj1 = JSON.parse(data);
                  console.log(myobj1);

                  var arr = [];

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

                              arr[index] = el1.group_id;

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

                              if (el1.deliver_date != '') {

                                deliver_date = el1.deliver_date;

                                var d = new Date(deliver_date);

                                hh1 = d.getHours();

                                if (hh1 < 10) {

                                  hh1 = '0' + hh1;

                                }

                                mm1 = d.getMinutes();

                                if (mm1 < 10) {

                                  mm1 = "0" + mm1;

                                }

                                ss1 = d.getSeconds();

                                if (ss1 < 10) {

                                  ss1 = "0" + ss1;

                                }

                                dd1 = d.getDate();

                                if (dd1 < 10) {

                                  dd1 = "0" + dd1;

                                }

                                mM1 = d.getMonth() + 1;

                                if (mM1 < 10) {

                                  mM1 = "0" + mM1;

                                }

                                yyyy1 = d.getFullYear();

                              }

                              console.log(el1.time_queue);

                              if (el1.time_queue != '') {

                                time_queue = el1.time_queue;

                                var d = new Date(time_queue);

                                hh2 = d.getHours();

                                if (hh2 < 10) {

                                  hh2 = '0' + hh2;

                                }

                                mm2 = d.getMinutes();

                                if (mm2 < 10) {

                                  mm2 = "0" + mm2;

                                }

                                ss2 = d.getSeconds();

                                if (ss2 < 10) {

                                  ss2 = "0" + ss2;

                                }

                                dd2 = d.getDate();

                                if (dd2 < 10) {

                                  dd2 = "0" + dd2;

                                }

                                mM2 = d.getMonth() + 1;

                                if (mM2 < 10) {

                                  mM2 = "0" + mM2;

                                }

                                yyyy2 = d.getFullYear();

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

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              collection_status = 'Collected';

                              if (el1.collection_status == "") {

                                collection_status = "Not Updated yet";

                              }

                              $("#excel-table tbody").append("<tr>" +
                                "<td>"+(index + 1)+"</td>" +
                                "<td>"+"Sharma Drugs"+"</td>" +
                                "<td>"+el1.group_id+"</td>" +
                                "<td>"+el1.order_id+"</td>" +
                                "<td>"+el1.deliver_date+"</td>" +
                                "<td>"+el1.bill_number+"</td>" +
                                "<td>"+amt_payable+"</td>" +
                                "<td>"+"Delivered"+"</td>" +
                                "<td>"+el1.fe_name+"</td>" +
                                "<td>"+el1.fe_number+"</td>" +
                                "<td>"+collection_status+"</td>" +
                                "<td>"+el1.collection_date+"</td>" +
                              "</tr>");

                              $("#order_lists").append("<tr>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<input type='checkbox'>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.order_id+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>Sharma Drugs</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el1.fe_name+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el1.bill_number+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el1.delivery_status+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+collection_status+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<select class='status' data-id='"+el1.group_id+"'>" +
                                          "<option value=''>--</option>" +
                                          "<option value='Collected'>Collected</option>" +
                                          "<option value='Not Collected'>Not Collected</option>" +
                                      "</select>" +
                                  "</td>" +
                              "</tr>");

                              ctr++;

                            }

                          });

                      }
                      else {

                        myobj1.meds_infos.forEach(function (el1, index) {

                          var creation_time_queue = new Date(el1.order_time).getTime();

                          if ((creation_time_queue >= myobj1.filter_start_date) && (creation_time_queue <= myobj1.filter_end_date)) {

                            arr[index] = el1.group_id;

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

                            if (el1.deliver_date != '') {

                              deliver_date = el1.deliver_date;

                              var d = new Date(deliver_date);

                              hh1 = d.getHours();

                              if (hh1 < 10) {

                                hh1 = '0' + hh1;

                              }

                              mm1 = d.getMinutes();

                              if (mm1 < 10) {

                                mm1 = "0" + mm1;

                              }

                              ss1 = d.getSeconds();

                              if (ss1 < 10) {

                                ss1 = "0" + ss1;

                              }

                              dd1 = d.getDate();

                              if (dd1 < 10) {

                                dd1 = "0" + dd1;

                              }

                              mM1 = d.getMonth() + 1;

                              if (mM1 < 10) {

                                mM1 = "0" + mM1;

                              }

                              yyyy1 = d.getFullYear();

                            }

                            console.log(el1.time_queue);

                            if (el1.time_queue != '') {

                              time_queue = el1.time_queue;

                              var d = new Date(time_queue);

                              hh2 = d.getHours();

                              if (hh2 < 10) {

                                hh2 = '0' + hh2;

                              }

                              mm2 = d.getMinutes();

                              if (mm2 < 10) {

                                mm2 = "0" + mm2;

                              }

                              ss2 = d.getSeconds();

                              if (ss2 < 10) {

                                ss2 = "0" + ss2;

                              }

                              dd2 = d.getDate();

                              if (dd2 < 10) {

                                dd2 = "0" + dd2;

                              }

                              mM2 = d.getMonth() + 1;

                              if (mM2 < 10) {

                                mM2 = "0" + mM2;

                              }

                              yyyy2 = d.getFullYear();

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

                            amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                            collection_status = 'Collected';

                            if (el1.collection_status == "") {

                              collection_status = "Not Updated yet";

                            }

                            $("#excel-table tbody").append("<tr>" +
                              "<td>"+(index + 1)+"</td>" +
                              "<td>"+"Sharma Drugs"+"</td>" +
                              "<td>"+el1.group_id+"</td>" +
                              "<td>"+el1.order_id+"</td>" +
                              "<td>"+el1.deliver_date+"</td>" +
                              "<td>"+el1.bill_number+"</td>" +
                              "<td>"+amt_payable+"</td>" +
                              "<td>"+"Delivered"+"</td>" +
                              "<td>"+el1.fe_name+"</td>" +
                              "<td>"+el1.fe_number+"</td>" +
                              "<td>"+collection_status+"</td>" +
                              "<td>"+el1.collection_date+"</td>" +
                            "</tr>");

                            $("#order_lists").append("<tr>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<input type='checkbox'>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>"+el1.order_id+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>Sharma Drugs</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.fe_name+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.bill_number+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.delivery_status+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+collection_status+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<select class='status' data-id='"+el1.group_id+"'>" +
                                        "<option value=''>--</option>" +
                                        "<option value='Collected'>Collected</option>" +
                                        "<option value='Not Collected'>Not Collected</option>" +
                                    "</select>" +
                                "</td>" +
                            "</tr>");

                          }

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

                            var creation_time_queue = new Date(el1.order_time).getTime();

                            if ((creation_time_queue >= myobj1.filter_start_date) && (creation_time_queue <= myobj1.filter_end_date)) {

                              arr[index] = el1.group_id;

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

                              if (el1.deliver_date != '') {

                                deliver_date = el1.deliver_date;

                                var d = new Date(deliver_date);

                                hh1 = d.getHours();

                                if (hh1 < 10) {

                                  hh1 = '0' + hh1;

                                }

                                mm1 = d.getMinutes();

                                if (mm1 < 10) {

                                  mm1 = "0" + mm1;

                                }

                                ss1 = d.getSeconds();

                                if (ss1 < 10) {

                                  ss1 = "0" + ss1;

                                }

                                dd1 = d.getDate();

                                if (dd1 < 10) {

                                  dd1 = "0" + dd1;

                                }

                                mM1 = d.getMonth() + 1;

                                if (mM1 < 10) {

                                  mM1 = "0" + mM1;

                                }

                                yyyy1 = d.getFullYear();

                              }

                              console.log(el1.time_queue);

                              if (el1.time_queue != '') {

                                time_queue = el1.time_queue;

                                var d = new Date(time_queue);

                                hh2 = d.getHours();

                                if (hh2 < 10) {

                                  hh2 = '0' + hh2;

                                }

                                mm2 = d.getMinutes();

                                if (mm2 < 10) {

                                  mm2 = "0" + mm2;

                                }

                                ss2 = d.getSeconds();

                                if (ss2 < 10) {

                                  ss2 = "0" + ss2;

                                }

                                dd2 = d.getDate();

                                if (dd2 < 10) {

                                  dd2 = "0" + dd2;

                                }

                                mM2 = d.getMonth() + 1;

                                if (mM2 < 10) {

                                  mM2 = "0" + mM2;

                                }

                                yyyy2 = d.getFullYear();

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

                              amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                              collection_status = 'Collected';

                              if (el1.collection_status == "") {

                                collection_status = "Not Updated yet";

                              }

                              $("#excel-table tbody").append("<tr>" +
                                "<td>"+(index + 1)+"</td>" +
                                "<td>"+"Sharma Drugs"+"</td>" +
                                "<td>"+el1.group_id+"</td>" +
                                "<td>"+el1.order_id+"</td>" +
                                "<td>"+el1.deliver_date+"</td>" +
                                "<td>"+el1.bill_number+"</td>" +
                                "<td>"+amt_payable+"</td>" +
                                "<td>"+"Delivered"+"</td>" +
                                "<td>"+el1.fe_name+"</td>" +
                                "<td>"+el1.fe_number+"</td>" +
                                "<td>"+collection_status+"</td>" +
                                "<td>"+el1.collection_date+"</td>" +
                              "</tr>");

                              $("#order_lists").append("<tr>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<input type='checkbox'>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.order_id+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>Sharma Drugs</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el1.fe_name+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el1.bill_number+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+el1.delivery_status+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<p>"+collection_status+"</p>" +
                                  "</td>" +
                                  "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                      "<select class='status' data-id='"+el1.group_id+"'>" +
                                          "<option value=''>--</option>" +
                                          "<option value='Collected'>Collected</option>" +
                                          "<option value='Not Collected'>Not Collected</option>" +
                                      "</select>" +
                                  "</td>" +
                              "</tr>");

                              ctr++;

                            }

                          });

                      }
                      else {

                        myobj1.meds_infos.forEach(function (el1, index) {

                          var creation_time_queue = new Date(el1.order_time).getTime();

                          if ((creation_time_queue >= myobj1.filter_start_date) && (creation_time_queue <= myobj1.filter_end_date)) {

                            arr[index] = el1.group_id;

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

                            if (el1.deliver_date != '') {

                              deliver_date = el1.deliver_date;

                              var d = new Date(deliver_date);

                              hh1 = d.getHours();

                              if (hh1 < 10) {

                                hh1 = '0' + hh1;

                              }

                              mm1 = d.getMinutes();

                              if (mm1 < 10) {

                                mm1 = "0" + mm1;

                              }

                              ss1 = d.getSeconds();

                              if (ss1 < 10) {

                                ss1 = "0" + ss1;

                              }

                              dd1 = d.getDate();

                              if (dd1 < 10) {

                                dd1 = "0" + dd1;

                              }

                              mM1 = d.getMonth() + 1;

                              if (mM1 < 10) {

                                mM1 = "0" + mM1;

                              }

                              yyyy1 = d.getFullYear();

                            }

                            console.log(el1.time_queue);

                            if (el1.time_queue != '') {

                              time_queue = el1.time_queue;

                              var d = new Date(time_queue);

                              hh2 = d.getHours();

                              if (hh2 < 10) {

                                hh2 = '0' + hh2;

                              }

                              mm2 = d.getMinutes();

                              if (mm2 < 10) {

                                mm2 = "0" + mm2;

                              }

                              ss2 = d.getSeconds();

                              if (ss2 < 10) {

                                ss2 = "0" + ss2;

                              }

                              dd2 = d.getDate();

                              if (dd2 < 10) {

                                dd2 = "0" + dd2;

                              }

                              mM2 = d.getMonth() + 1;

                              if (mM2 < 10) {

                                mM2 = "0" + mM2;

                              }

                              yyyy2 = d.getFullYear();

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

                            amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                            collection_status = 'Collected';

                            if (el1.collection_status == "") {

                              collection_status = "Not Updated yet";

                            }

                            $("#excel-table tbody").append("<tr>" +
                              "<td>"+(index + 1)+"</td>" +
                              "<td>"+"Sharma Drugs"+"</td>" +
                              "<td>"+el1.group_id+"</td>" +
                              "<td>"+el1.order_id+"</td>" +
                              "<td>"+el1.deliver_date+"</td>" +
                              "<td>"+el1.bill_number+"</td>" +
                              "<td>"+amt_payable+"</td>" +
                              "<td>"+"Delivered"+"</td>" +
                              "<td>"+el1.fe_name+"</td>" +
                              "<td>"+el1.fe_number+"</td>" +
                              "<td>"+collection_status+"</td>" +
                              "<td>"+el1.collection_date+"</td>" +
                            "</tr>");

                            $("#order_lists").append("<tr>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<input type='checkbox'>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                  "<p>"+el1.order_id+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>Sharma Drugs</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.fe_name+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.bill_number+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+el1.delivery_status+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<p>"+collection_status+"</p>" +
                                "</td>" +
                                "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                                    "<select class='status' data-id='"+el1.group_id+"'>" +
                                        "<option value=''>--</option>" +
                                        "<option value='Collected'>Collected</option>" +
                                        "<option value='Not Collected'>Not Collected</option>" +
                                    "</select>" +
                                "</td>" +
                            "</tr>");

                          }

                        });

                      }

                    }

                  }
                  else {

                    myobj1.meds_infos.forEach(function (el1, index) {

                      arr[index] = el1.group_id;

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

                      if (el1.deliver_date != '') {

                        deliver_date = el1.deliver_date;

                        var d = new Date(deliver_date);

                        hh1 = d.getHours();

                        if (hh1 < 10) {

                          hh1 = '0' + hh1;

                        }

                        mm1 = d.getMinutes();

                        if (mm1 < 10) {

                          mm1 = "0" + mm1;

                        }

                        ss1 = d.getSeconds();

                        if (ss1 < 10) {

                          ss1 = "0" + ss1;

                        }

                        dd1 = d.getDate();

                        if (dd1 < 10) {

                          dd1 = "0" + dd1;

                        }

                        mM1 = d.getMonth() + 1;

                        if (mM1 < 10) {

                          mM1 = "0" + mM1;

                        }

                        yyyy1 = d.getFullYear();

                      }

                      console.log(el1.time_queue);

                      if (el1.time_queue != '') {

                        time_queue = el1.time_queue;

                        var d = new Date(time_queue);

                        hh2 = d.getHours();

                        if (hh2 < 10) {

                          hh2 = '0' + hh2;

                        }

                        mm2 = d.getMinutes();

                        if (mm2 < 10) {

                          mm2 = "0" + mm2;

                        }

                        ss2 = d.getSeconds();

                        if (ss2 < 10) {

                          ss2 = "0" + ss2;

                        }

                        dd2 = d.getDate();

                        if (dd2 < 10) {

                          dd2 = "0" + dd2;

                        }

                        mM2 = d.getMonth() + 1;

                        if (mM2 < 10) {

                          mM2 = "0" + mM2;

                        }

                        yyyy2 = d.getFullYear();

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

                      amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                      collection_status = 'Collected';

                      if (el1.collection_status == "") {

                        collection_status = "Not Updated yet";

                      }

                      $("#excel-table tbody").append("<tr>" +
                        "<td>"+(index + 1)+"</td>" +
                        "<td>"+"Sharma Drugs"+"</td>" +
                        "<td>"+el1.group_id+"</td>" +
                        "<td>"+el1.order_id+"</td>" +
                        "<td>"+el1.deliver_date+"</td>" +
                        "<td>"+el1.bill_number+"</td>" +
                        "<td>"+amt_payable+"</td>" +
                        "<td>"+"Delivered"+"</td>" +
                        "<td>"+el1.fe_name+"</td>" +
                        "<td>"+el1.fe_number+"</td>" +
                        "<td>"+collection_status+"</td>" +
                        "<td>"+el1.collection_date+"</td>" +
                      "</tr>");

                      $("#order_lists").append("<tr>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<input type='checkbox'>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                            "<p>"+el1.order_id+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>Sharma Drugs</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+el1.fe_name+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+el1.bill_number+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+el1.delivery_status+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<p>"+collection_status+"</p>" +
                          "</td>" +
                          "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                              "<select class='status' data-id='"+el1.group_id+"'>" +
                                  "<option value=''>--</option>" +
                                  "<option value='Collected'>Collected</option>" +
                                  "<option value='Not Collected'>Not Collected</option>" +
                              "</select>" +
                          "</td>" +
                      "</tr>");

                    });

                  }

                  $(".status").change(function () {

                    var sel = $(this);
                    var status = $(this).val();
                    var g_id = $(this).attr("data-id");
                    var date = new Date();
                    var confirm = window.confirm("Are you sure?");

                    if (confirm) {

                      $.post(
                        "php/admin_collection_status_change.php",
                        {
                          status: status,
                          group_id: g_id,
                          date: date
                        },
                        function (data) {
                          console.log(data);
                          if (data == "Status Changed") {
                            alert(data);
                            location.reload();
                          }
                          else {
                            sel.val('');
                            alert("Something's went wrong!");
                          }
                        }
                      );
                    }
                    else {
                      $(this).val('');
                    }

                  });

                  $("#mark-collected-btn").click(function () {

                    var date = new Date();

                    $.post(
                      "php/admin_mark_collected.php",
                      {
                        date: date,
                        data: JSON.stringify(arr),
                        mode: "filtered"
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Marked") {
                          alert("Status Changed");
                          location.reload();
                        }
                        else {
                          alert("Something went wrong");
                        }
                      }
                    );

                  });

                  $("#download-excel-btn").click(function () {
                    $("#excel-table").table2excel({
                      exclude: ".noExl",
                      name: "Excel Document Name"
                    });
                  });

                  $("#mark-uncollected-btn").click(function () {

                    var date = new Date();

                    $.post(
                      "php/admin_mark_uncollected.php",
                      {
                        date: date,
                        data: JSON.stringify(arr),
                        mode: "filtered"
                      },
                      function (data) {
                        console.log(data);

                        if (data == "Marked") {
                          alert("Status Changed");
                          location.reload();
                        }
                        else {
                          alert("Something went wrong");
                        }
                      }
                    );

                  });

                }
              );

            }
            else {
              alert("No search Found");
            }
          }
        );

      }
      else if (key == "selection_filter") {

        $.post(
          "php/collection_queue.php",
          {
            mode: "selection_filter"
          },
          function (data) {
            console.log(data);
            myobj = JSON.parse(data);
            console.log(myobj);

            $("#" + myobj.status).prop("checked", true);

            if (myobj.info.length) {

              $("#mark-collected-btn").click(function () {

                var date = new Date();

                $.post(
                  "php/admin_mark_collected.php",
                  {
                    date: date,
                    data: data,
                    mode: "no filter"
                  },
                  function (data) {
                    console.log(data);

                    if (data == "Marked") {
                      alert("Status Changed");
                      location.reload();
                    }
                    else {
                      alert("Something went wrong");
                    }
                  }
                );

              });

              $("#mark-uncollected-btn").click(function () {

                var date = new Date();

                $.post(
                  "php/admin_mark_uncollected.php",
                  {
                    date: date,
                    data: data,
                    mode: "no filter"
                  },
                  function (data) {
                    console.log(data);

                    if (data == "Marked") {
                      alert("Status Changed");
                      location.reload();
                    }
                    else {
                      alert("Something went wrong");
                    }
                  }
                );

              });

              myobj.info.forEach(function (el1, index) {

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

                if (el1.deliver_date != '') {

                  deliver_date = el1.deliver_date;

                  var d = new Date(deliver_date);

                  hh1 = d.getHours();

                  if (hh1 < 10) {

                    hh1 = '0' + hh1;

                  }

                  mm1 = d.getMinutes();

                  if (mm1 < 10) {

                    mm1 = "0" + mm1;

                  }

                  ss1 = d.getSeconds();

                  if (ss1 < 10) {

                    ss1 = "0" + ss1;

                  }

                  dd1 = d.getDate();

                  if (dd1 < 10) {

                    dd1 = "0" + dd1;

                  }

                  mM1 = d.getMonth() + 1;

                  if (mM1 < 10) {

                    mM1 = "0" + mM1;

                  }

                  yyyy1 = d.getFullYear();

                }

                if (el1.time_queue != '') {

                  time_queue = el1.time_queue;

                  var d = new Date(time_queue);

                  hh2 = d.getHours();

                  if (hh2 < 10) {

                    hh2 = '0' + hh2;

                  }

                  mm2 = d.getMinutes();

                  if (mm2 < 10) {

                    mm2 = "0" + mm2;

                  }

                  ss2 = d.getSeconds();

                  if (ss2 < 10) {

                    ss2 = "0" + ss2;

                  }

                  dd2 = d.getDate();

                  if (dd2 < 10) {

                    dd2 = "0" + dd2;

                  }

                  mM2 = d.getMonth() + 1;

                  if (mM2 < 10) {

                    mM2 = "0" + mM2;

                  }

                  yyyy2 = d.getFullYear();

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

                amt_payable = total_offer_mrp + parseFloat(el1.shipping_price);

                collection_status = 'Collected';

                if (el1.collection_status == "") {

                  collection_status = "Not Updated yet";

                }

                $("#excel-table tbody").append("<tr>" +
                  "<td>"+(index + 1)+"</td>" +
                  "<td>"+"Sharma Drugs"+"</td>" +
                  "<td>"+el1.group_id+"</td>" +
                  "<td>"+el1.order_id+"</td>" +
                  "<td>"+el1.deliver_date+"</td>" +
                  "<td>"+el1.bill_number+"</td>" +
                  "<td>"+amt_payable+"</td>" +
                  "<td>"+"Delivered"+"</td>" +
                  "<td>"+el1.fe_name+"</td>" +
                  "<td>"+el1.fe_number+"</td>" +
                  "<td>"+collection_status+"</td>" +
                  "<td>"+el1.collection_date+"</td>" +
                "</tr>");

                $("#order_lists").append("<tr>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<input type='checkbox'>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                      "<p>"+el1.order_id+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>Sharma Drugs</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+el1.fe_name+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+yyyy+"-"+mM+"-"+dd+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+yyyy2+"-"+mM2+"-"+dd2+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+yyyy1+"-"+mM1+"-"+dd1+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+el1.bill_number+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>Rs. "+amt_payable.toFixed(2)+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+el1.delivery_status+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<p>"+collection_status+"</p>" +
                    "</td>" +
                    "<td class='col-md-1' style='border:2px lightgrey solid;padding:8px;text-align: center;'>" +
                        "<select class='status' data-id='"+el1.group_id+"'>" +
                            "<option value=''>--</option>" +
                            "<option value='Collected'>Collected</option>" +
                            "<option value='Not Collected'>Not Collected</option>" +
                        "</select>" +
                    "</td>" +
                "</tr>");


              });

              $("#download-excel-btn").click(function () {
                $("#excel-table").table2excel({
                  exclude: ".noExl",
                  name: "Excel Document Name"
                });
              });

              $(".status").change(function () {

                var sel = $(this);
                var status = $(this).val();
                var g_id = $(this).attr("data-id");
                var date = new Date();
                var confirm = window.confirm("Are you sure?");

                if (confirm) {

                  $.post(
                    "php/admin_collection_status_change.php",
                    {
                      status: status,
                      group_id: g_id,
                      date: date
                    },
                    function (data) {
                      console.log(data);
                      if (data == "Status Changed") {
                        alert(data);
                        location.reload();
                      }
                      else {
                        sel.val('');
                        alert("Something's went wrong!");
                      }
                    }
                  );
                }
                else {
                  $(this).val('');
                }

              });

            }
            else {
              alert("No item in this search");
            }
          }
        );

      }

    }

  });

});
