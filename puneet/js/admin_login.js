$(document).ready(function () {
  $("#adm-login").on('submit', function () {
    var adm_id = $("#adm-id").val();
    var adm_password = $("#adm-password").val();

    adm_id = adm_id.trim();
    adm_password = adm_password.trim();

    if (adm_id == "" && adm_password == "") {
      $(".alert").html("Fields Cannot be Empty!");
      $(".alert").css("display", "block");
      return false;
    }
    else if (adm_id == "") {
      $(".alert").html("Admin ID Cannot be Empty!");
      $(".alert").css("display", "block");
      return false;
    }
    else if (adm_password == "") {
      $(".alert").html("Password Cannot be Empty!");
      $(".alert").css("display", "block");
      return false;
    }
    else {
      //alert("set");
      $.post(
        "php/admin_login.php",
        {
          admin_id: adm_id,
          admin_password: adm_password
        },
        function (data) {
          if (data == "Incorrect Admin ID or Password!") {
            $(".alert").html(data);
            $(".alert").css("display", "block");
            return false;
          }
          else if (data == "login successful") {
            window.location.href = "php/redirector.php?pg=cc_queue";
          }
          else {
            $(".alert").html(data);
            $(".alert").css("display", "block");
            return false;
          }
        }
      );
      return false;
    }
    return false;
  });
});
