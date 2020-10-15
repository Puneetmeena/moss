<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-site-verification" content="x6nx4TqzTCBnZqSanskD-h22h9ELhgq6kCx_6seZyj8" />
    <meta name="description" content="India’s Trusted Pharmacy: Purchase Medicines & Drugs Online in India/Outside India. No more running from one chemist store to another when in need of medicines! Medicine Online Store brings to you as an online platform for medicines and health products, which can be accessed for all health needs. We are focused towards making healthcare accessible and affordable, and so give you plenty of options in terms of medicine substitutes.">
    <meta name="author" content="Medicine Online Store">
    <meta name="copyright" content="Medicine Online Store Inc.">
    <meta name="keywords" content="medicine online store, online medicine, medicine online, online medicine shopping, medicine store in india, buy medicine online">
    <link rel="canonical" href="https://www.medicineonlinestore.com">
    <link rel="stylesheet" href="css/index.css">
    <link rel="shortcut icon" href="img/favicon.ico" />
    <!--<link rel="stylesheet" type="text/css" href="css/chatbox.css">-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/owl.carousel.min.css">
    <link rel="stylesheet" type="text/css" href="css/owl.theme.default.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.waterwheelCarousel.js"></script>
    <script type="text/javascript">
      $(document).ready(function () {
        var carousel = $("#gzbcarousel").waterwheelCarousel({
          flankingItems: 3,
          speed: 500,
          autoPlay: 1500,
          movingToCenter: function ($item) {
            $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
          },
          movedToCenter: function ($item) {
            $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
          },
          movingFromCenter: function ($item) {
            $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
          },
          movedFromCenter: function ($item) {
            $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
          },
          clickedCenter: function ($item) {
            $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
          }
        });

        $('#prev').bind('click', function () {
          carousel.prev();
          return false
        });

        $('#next').bind('click', function () {
          carousel.next();
          return false;
        });

        $('#reload').bind('click', function () {
          newOptions = eval("(" + $('#newoptions').val() + ")");
          carousel.reload(newOptions);
          return false;
        });

      });
    </script>
    <script src="js/owl.carousel.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <title>DCJ</title>
    <style>

      body {
        font-family: 'Open Sans', sans-serif;
      }

      .affix {
        top: 0px;
        width: 100%;
        z-index: .9999 !important;
      }
      .form-control:focus
      {
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.02);
      }
      .text
      {
        border-top-width: 0px;
        border-right-width: 0px;
        border-left-width:0px;
        border-color: #7b97e2f0;
        background-color: #0000000f;
        border-radius: 0px;
        color: #fff;
      }
      .btn-default
      {
        color: #d2e3fd;
        background-color: #4a80ceab;
        border-color: #ccc0;
      }
      .btn-default:hover
      {
        background-color: #4a80ceab;
        color: black;
      }

      .search-form ul {
        display: none;
        position: absolute;
        background-color: #fff;
        z-index: 1000;
        top: 34px;
        list-style-type: none;
        width: inherit;
        border-radius: 0px 0px 2px 2px;
        box-shadow:2px 3px 5px -1px rgba(0, 0, 0, .5);
        padding: 0px;
      }

      .search-form ul li a{
        text-decoration: none;
        color: black;
        cursor: default;
      }

      .search-form ul li {
        padding: 5px 10px;
      }

      .search-form ul li:hover {
        background-color: #f1f3f6;
      }

      .select {
        background-color: #f1f3f6;
      }
      /*#user-dropdown {
        display: none;
        position: absolute;
        background-color: #fff;
        z-index: 1000;
        top: 50px;
        list-style-type: none;
        width: inherit;
        border-radius: 0px 0px 2px 2px;
        box-shadow:2px 3px 5px -1px rgba(0, 0, 0, .5);
        padding: 0px;
      }

      #user-dropdown li {
        padding: 5px;
      }
      #user-dropdown li a {
        text-decoration: none;
        color: black;
        cursor: default;
      }*/
      .test
      {
        height: 250px;
      }
      .logo
      {
        width: 180px;
      }
      .see
      {
        top:10px;
        width: 80px;
        left: 100px;
        height: 60%;
        background-color:#47d13c;
        border:0px;
        border-radius: 7px;
        color: white;
      }
      .parallax {
       /* The image used */
       background-image: url("img/parallax.jpg");

       /* Set a specific height */
       min-height: auto;

       /* Create the parallax scrolling effect */
       background-attachment: fixed;
       background-position: center;
       background-repeat: no-repeat;
       background-size: cover;
       opacity: 0.9;
      }
      .box
      {
        height: auto;margin-top:0% ;
        margin-left: 0%;margin-right: 0%; margin-bottom: 0px;
        background-color:#00102ea8;border: 0px;box-shadow: 5px 5px 12px 0px #282321;
      }
      .pick
      {
        height:150px;width: 35%;margin-left: 32%;background-color:#040615bf;border-color: black;margin-top: 4%;
      }
      @media screen and (max-width: 380px)
      {
        .pick
       {
         margin: 2%;
         width: 90%;
         height: 150px;
       }
        .parallax
       {
         min-height: 800px;
       }
        .box
       {
         height: auto;
       }
        .qwe
       {
         height: auto;
       }
        .test
       {
         height: auto;
       }
      }
     .qwe
     {
       height: 250px;
     }
     .owl-dots
     {
       display: none;
     }

     #save-txt {
       margin-left: 5px;
       transform: scale(0.8);
       animation: save 0.3s infinite alternate;
     }

     @keyframes save {
       to{
         transform: scale(1.2);
       }
     }
     .how
     {
      text-align: center;text-decoration: underline;font-weight: bold;
       -webkit-animation:colorchange 20s infinite alternate;
     }
      @-webkit-keyframes colorchange {
      0% {

        color: blue;
      }

      10% {

        color: #021E51;
      }

      20% {

        color: #1abc9c;
      }

      30% {

        color: #d35400;
      }

      40% {

        color: #29A7C9;
      }

      50% {

        color: #34495e;
      }

      60% {

        color: #A4270C;
      }

      70% {

        color: #2980b9;
      }
      80% {

        color: #f1c40f;
      }

      90% {

        color: #2980b9;
      }

      100% {

        color: #A42828;
      }
    }
    .qwerty
    {
      background-image: url('http://dhtml-menu.com/web-design/data/upload/2018/01/amp-ext-theme1.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      opacity: 0.9;
    }
    #gzbcarousel {
      width:100%;
      height:300px;
      position:relative;
      clear:both;
      overflow:hidden;
      background:#FFF;
    }
    #gzbcarousel a {
      padding: 0 10px;
    }
    #gzbcarousel img {
      visibility:hidden; /* hide images until carousel can handle them */
      cursor:pointer; /* otherwise it's not as obvious items can be clicked */
      max-width: 40%;
      max-height: 60%;
    }
   .dropdown:hover .dropdown-menu {
       display: block;
    }

    #mydropdown {
      display: block;
    }

    #mydropdown-content {
      display: none;
      position: absolute;
      background-color: #fff;
      width: auto;
      margin-left: 80px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      padding: 12px 16px;
      z-index: 100;
    }

    #mydropdown:hover #mydropdown-content {
      display: block;
    }
    .navigation-header #mydropdown:hover {
      height: auto;
    }

    .up {
      bottom: 100%;
      border-bottom-color: black;
      border-width: 9px;
    }
    </style>
  </head>
  <body>
  <!-- Load Facebook SDK for JavaScript -->
<!-- Load Facebook SDK for JavaScript -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!-- Your customer chat code -->
<div class="fb-customerchat"
  attribution="setup_tool"
  page_id="142266956457868"
  theme_color="#264373"
  logged_in_greeting="Hi! We are Medical Online Store. How may we help you?"
  logged_out_greeting="Hi! We are Medical Online Store. How may we help you?">
</div>


    <header style="width: 100%;z-index: 0;">
      <nav class="navbar navbar-style" style="border-radius: 0; margin-bottom: 0;">
        <div class="container-fluid">
          <div class="navbar-header logo" style="padding-left: 0%;">
            <a href="https://www.medicineonlinestore.com"><img src="img/DGJ.png" alt="logo" style="width: 100%;" alt="logo"></a>
            <button type="button" style="margin: 0;" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <i class="fa fa-bars"></i>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul id="collapse-list">
              <li><a href="https://www.medicineonlinestore.com" style="font-size: 15px;"><span><i class="fa fa-home"></i></span> <span class="icon-info">Home</span></a></li>
              <li><a href="#articles" style="font-size: 15px;"><span><i class="fa fa-newspaper-o"></i></span> <span class="icon-info">Articles</span></a></li>
              <li id="login-li" style="display: none;"><a href="#"  style="font-size: 15px;" data-toggle="modal" data-target="#myModal"><span><i class="fa fa-sign-in"></i></span> <span class="icon-info">Login / Sign Up</span></a></li>
              <li id="user-li" style="text-align: center; display: none;">
                <div id="mydropdown">
                  <a><span>Username</span></a>
                  <div id="mydropdown-content">
                    <a href="my_orders" style="color: black; padding: 5px;">My Orders</a>
                    <a href="php/logout.php" style="color: black; padding: 5px;">Log out</a>
                  </div>
                </div>
              </li>
              <li><a href="cart" style="font-size: 15px;"><i class="fa fa-shopping-cart"></i><span id="cart_no_of_items" style="visibility: hidden; padding: 1px 3px;position: relative; bottom: 10px; width: 18px; height: 18px; border-radius: 50%; background-color: yellow; color: black; font-size: 12px; font-weight: bold;">0</span></a></li>
              <li><a href="#" style="font-size: 15px;">Need Help?</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <nav class="navbar navbar-style" id="navbar" data-spy="affix" data-offset-top="80" style="border-radius: 0px;margin-bottom: 0px;z-index: 30;">
        <div class="container-fluid">
          <div class="col-md-2 col-xs-4 location">
            <!--<a href="#" style="color: white;"><i class="fa fa-map-marker"></i> <span>Get Location</span></a>-->
          </div>
          <div class="col-md-8 col-xs-8" style="padding: 0px;">
            <form class="search-form" id="search-form">
              <div class="input-group search-input" style="">
                <input type="text" id="search-med" autocomplete="off" class="form-control" placeholder="Search Medicines Here..." name="search" style="border-top-width:0px;border-bottom-width:2px;border-right-width:0px;border-left-width:0px;background-color: #76abfb00;border-color:#0a4cb7; color:lightgrey; font-family:Verdana, Geneva, sans-serif;border-radius: 0px;">
                <ul>
                  <li id="0" class="select" onclick="redirect(0);"><a></a></li>
                  <li id="1" onclick="redirect(1);"><a></a></li>
                  <li id="2" onclick="redirect(2);"><a></a></li>
                  <li id="3" onclick="redirect(3);"><a></a></li>
                </ul>
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit" style="background-color: #082c699c;border-color: #0a4cb7;color:#cdd2e2;width: 34px;border-radius: 50%;padding-left: 6px;padding-right: 6px;margin-left: 5px;">
                    <i class="glyphicon glyphicon-search"></i>
                  </button>
                    <i class="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-2" style="padding-top: 15px;color: #fff">
            <p>Call us at : 999-999-9999</p>
          </div>
        </div>
      </nav>
    </header>
    <div class="container" style="">
      <div class="row" id="upper-list">
        <div class="col-md-2 col-xs-4">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;width:100%;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">Allopathic Medicines<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu" id="inline-lists">
              <li><a href="page2?sub-category=Allergy">Allergy</a></li>
              <li><a href="page2?sub-category=Acidity & Ulcers">Acidity & Ulcers</a></li>
              <li><a href="page2?sub-category=Anti-Thyroid">Anti-Thyroid</a></li>
              <li><a href="page2?sub-category=Appetizer">Appetizer</a></li>
              <li><a href="page2?sub-category=Arthritis">Arthritis</a></li>
              <li><a href="page2?sub-category=Asthma & COPD">Asthma & COPD</a></li>
              <li><a href="page2?sub-category=Bacterial Infections">Bacterial Infections</a></li>
              <li><a href="page2?sub-category=Liver Care">Liver Care</a></li>
              <li><a href="page2?sub-category=Brain Health">Brain Health</a></li>
              <li><a href="page2?sub-category=Health & Cold">Cough & Cold</a></li>
              <li><a href="page2?sub-category=Diabetes Care">Diabetes Care</a></li>
              <li><a href="page2?sub-category=Fever & Pain">Fever & Pain </a></li>
              <li><a href="page2?sub-category=Fungal Infections">Fungal Infections</a></li>
              <li><a href="page2?sub-category=Gout">Gout</a></li>
              <li><a href="page2?sub-category=Heart Care">Heart Care</a></li>
              <li><a href="page2?sub-category=Migraine">Migraine</a></li>
              <li><a href="page2?sub-category=Pain & Swelling">Pain & Swelling</a></li>
              <li><a href="page2?sub-category=Parasitic Infections">Parasitic Infections</a></li>
              <li><a href="page2?sub-category=Thyroid">Thyroid</a></li>
              <li><a href="page2?sub-category=Vomiting">Vomiting</a></li>
              <li><a href="page2?sub-category=Vertigo">Vertigo</a></li>
              <li><a href="page2?sub-category=Hormones">Hormones</a></li>
              <li><a href="page2?sub-category=Steroids">Steroids</a></li>
              <li><a href="page2?sub-category=Cholestrol Killers">Cholestrol Killers</a></li>
              <li><a href="page2?sub-category=Tuberculosis">Tuberculosis</a></li>
              <li><a href="page2?sub-category=Stomach Illness">Stomach Illness</a></li>
              <li><a href="page2?sub-category=Urinary Tract Care">Urinary Tract Care</a></li>
              <li><a href="page2?sub-category=Auto Immune Disease">Auto Immune Disease</a></li>
              <li><a href="page2?sub-category=Smoking Care">Smoking Care</a></li>
              <li><a href="page2?sub-category=Alcohol Care">Alcohol Care</a></li>
              <li><a href="page2?sub-category=Anemia">Anemia</a></li>
              <li><a href="page2?sub-category=Labor">Labor</a></li>
              <li><a href="page2?sub-category=Local Anesthesia">Local Anesthesia</a></li>
              <li><a href="page2?sub-category=Malaria">Malaria</a></li>
              <li><a href="page2?sub-category=Nasal Drops & Sprays">Nasal Drops & Sprays</a></li>
              <li><a href="page2?sub-category=Menorrhagia & Mentrual Care">Menorrhagia & Mentrual Care</a></li>
              <li><a href="page2?sub-category=Sexual Wellness">Sexual Wellness</a></li>
              <li><a href="page2?sub-category=Hair Care">Hair Care</a></li>
              <li><a href="page2?sub-category=Viral Infections">Viral Infections</a></li>
              <li><a href="page2?sub-category=Bleeding">Bleeding</a></li>
              <li><a href="page2?sub-category=Pregnancy">Pregnancy</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-xs-4" style="">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;width:100%;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">Cancer Medicines<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu">
              <li><a href="page2?sub-category=Anti Cancer Medicines">Anti Cancer Medicines</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-xs-4" style="">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;cursor: pointer;width: 100%;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">Ayurvedic Medicines<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu">
              <li><a href="page2?sub-category=Dabur Products">Dabur Products</a></li>
              <li><a href="page2?sub-category=Himalaya Products">Himalaya Products</a></li>
              <li><a href="page2?sub-category=Aimil Products">Aimil Products</a></li>
              <li><a href="page2?sub-category=Baidyanath Products">Baidyanath Products</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-xs-4" style="">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;width:100%;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">Health Devices<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu">
              <li><a href="page2?sub-category=BP Monitors">BP Monitors</a></li>
              <li><a href="page2?sub-category=Sugar Measuring Devices">Sugar Measuring Devices</a></li>
              <li><a href="page2?sub-category=Sugar Test Strips">Sugar Test Strips</a></li>
              <li><a href="page2?sub-category=Sugar Test Pen">Sugar Test Pen</a></li>
              <li><a href="page2?sub-category=Thermometers">Thermometers</a></li>
              <li><a href="page2?sub-category=Pulse Meter">Pulse Meter</a></li>
              <li><a href="page2?sub-category=Stethoscope">Stethoscope</a></li>
              <li><a href="page2?sub-category=Nebulizers">Nebulizers</a></li>
              <li><a href="page2?sub-category=Steamer/Veporizer">Steamer/Vaporizer</a></li>
              <li><a href="page2?sub-category=Surgical Goods">Surgical Goods</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-1 col-xs-4" style="">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;width:100%;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">OTC<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu">
              <li><a href="page2?sub-category=Oral Care">Oral Care</a></li>
              <li><a href="page2?sub-category=Hair Care">Hair Care</a></li>
              <li><a href="page2?sub-category=Skin Care">Skin Care</a></li>
              <li><a href="page2?sub-category=Eye Care">Eye / Ear Care</a></li>
              <li><a href="page2?sub-category=Sexual Wellness">Sexual Wellness</a></li>
              <li><a href="page2?sub-category=Foot Care">Foot Care</a></li>
              <li><a href="page2?sub-category=Pain Reliver">Pain Reliever</a></li>
              <li><a href="page2?sub-category=Medicated Soap">Medicated Soap</a></li>
              <li><a href="page2?sub-category=Stomach Care">Stomach Care</a></li>
              <li><a href="page2?sub-category=Cough & Cold Remedies">Cough & Cold Remedies</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-xs-4" style="">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;width:100%;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">Woman & Child Care<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu">
              <li><a href="page2?sub-category=Baby Care / Baby Health">Baby Care/Baby Health</a></li>
              <li><a href="page2?sub-category=Mother Care / Mother Health">Mother Care / Mother Health</a></li>
              <li><a href="page2?sub-category=Female Care">Female Care</a></li>
            </ul>
          </div>
        </div>
         <div class="col-md-1 col-xs-4" style="">
          <div class="dropdown" style="font-size: 25px;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: white;border:0px;width:100%;padding-left:5px;"><span style="color: black;font-weight: bold;font-size: 15px;color:#18577d;">Nutrition<i class="fa fa-caret-down"></i></span></button>
            <ul class="dropdown-menu">
              <li><a href="page2?sub-category=Vitamins & Minerals Health">Vitamins & Minerals Health</a></li>
              <li><a href="page2?sub-category=Proteins Health">Proteins Health</a></li>
              <li><a href="page2?sub-category=Bone Health & Supplements">Bone Health & Supplements</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br>
    <h1 style="display: none;">Medicine Online Store</h1>
    <div style="width: 100%;">
      <div class="row test" style="margin: 0px;">
        <div class="col-md-8 col-xs-12 qwe" style="padding: 0px;">
          <div class="" style="margin: 0px;padding:0px;width:100%;">
            <div id="myCarousel" class="carousel slide" data-ride="carousel" style="width:100%;position: relative;">
              <!-- Indicators -->
              <ol class="carousel-indicators" style="background-position: center; opacity:1;">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <!--<li data-target="#myCarousel" data-slide-to="2"></li>
                  <li data-target="#myCarousel" data-slide-to="3"></li>-->
              </ol>
              <div class="carousel-inner" style="height: 275px;">
                <div class="item active">
                  <img src="img/Banner_1.png" style="width:100%; height: 250px;" alt="banner 1">
                </div>

                <div class="item">
                  <img src="img/Banner_2.png"  style="width:100%; height: 250px;" alt="banner 2">
                </div>

                <!--<div class="item">
                  <img src="img/imggg3.jpeg"  style="width:100%; height: 250px;">
                </div>
                <div class="item">
                  <img src="img/img4.jpeg" style="width: 100%; height: 250px;">
                </div>-->
              </div>
              <a class="left carousel-control" href="#myCarousel" data-slide="prev" style="opacity: 0.9;width: 0px;">
                <span class="left" style="cursor: pointer;position: absolute;top: 45%;width:auto;padding: 16px;padding-left:10px ; margin-top: -22px;color: white;font-weight: bold;font-size: 18px;transition: 0.6s ease;border-radius: 0 3px 3px 0;left: 0">&#10094;</span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#myCarousel" data-slide="next" style="opacity: 0.9;width: 0px;">
                <span class="right" style="cursor: pointer;position: absolute;top: 45%;width: auto;padding: 16px;  margin-top: -22px;color: white;font-weight: bold;font-size: 18px;transition: 0.6s ease;  border-radius: 3 0px 0px 3;right: 0;">&#10095;</span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-12 qwe" style="padding-left: 0%;padding-right: 0%;">
          <div class="article-active" style="margin-top: 0px;">
            Articles
          </div>
          <ul class="articles-list" style="height:210px; overflow-y: auto;">
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            <li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li>
              <div class="row" style="margin: 0px;">
                <div class="col-md-2 col-sm-2 col-xs-2">
                  <div class="" style="margin: 10px; background-color: #0b3e52; height: 50px; width: 50px;">
                    <div style="font-size: 18px; color: white; text-align: center;">
                      29
                    </div>
                    <span style="font-size: 15px; color: white; padding: 0px 13px;">Jan</span>
                  </div>
                </div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                  <p data-toggle="modal" data-target="#myModal1" style="cursor: pointer; padding: 10px 10px 0px 10px; font-size: 12px; margin: 0px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis posuere nibh.
                  </p>
                  <span style="font-size: 12px; float: right; padding: 0px 15px;">1.1k views</span>
                </div>
              </div>
            </li>
            <li class="article-last"><a href="#" style="text-align: center;">(View More)</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal for article-->
    <div id="myModal1" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
          </div>
          <div class="modal-body" style="overflow-y: auto; height: 400px;">
            <p style="text-align: justify;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt quam eget feugiat bibendum. Nunc eget justo a risus commodo rutrum. Duis faucibus urna sit amet feugiat ultricies. Donec non pulvinar lectus. Donec interdum blandit justo, vel porta risus suscipit iaculis. Aliquam molestie ante sit amet ex facilisis, sit amet porta libero ornare. Maecenas in ex fringilla, pellentesque lectus luctus, ullamcorper est. Aliquam venenatis sem a libero pellentesque hendrerit vitae ac dui. Sed vel posuere quam, at molestie leo. Ut pulvinar tellus sed sem congue commodo. Cras efficitur pharetra consequat. Nunc ultricies aliquam mi, vitae placerat massa. Morbi porta dui risus, quis finibus tellus feugiat eu. Suspendisse facilisis, tortor id cursus luctus, diam lectus hendrerit mi, at dictum lacus ligula at elit.

              Sed eget sem quis ligula sollicitudin mollis. Mauris eu ultricies tellus, id sodales arcu. In egestas porta hendrerit. Proin eu felis sed nulla sodales finibus sit amet et lectus. Phasellus nisl velit, venenatis at condimentum ut, bibendum vitae augue. Praesent sem elit, ornare ac risus sed, luctus semper massa. Fusce porta libero commodo tincidunt iaculis. Aliquam urna lectus, aliquam nec sem quis, mollis varius urna. Etiam blandit nibh nunc, in aliquet nisl egestas vitae. Nulla ac justo vitae sapien ultricies fermentum ac vitae quam.

              Nulla eget odio ultricies, sollicitudin sem ut, semper nisi. Nullam mollis diam sit amet condimentum blandit. Donec molestie urna augue, vitae vehicula risus iaculis ac. Nulla odio est, dictum et cursus at, convallis et est. Morbi et nisi et dui aliquam efficitur. Ut ac aliquam nisi. Donec finibus purus in mi hendrerit, nec interdum ex commodo. Praesent congue vestibulum arcu, nec consectetur dui iaculis nec. Donec aliquam tristique quam, ac scelerisque purus ornare quis. Aliquam erat volutpat. Morbi elementum scelerisque metus, non congue ipsum porta eu.

              Nulla aliquam dolor justo. Quisque viverra sit amet enim eu ultrices. Nunc mi nulla, faucibus sit amet neque sit amet, tincidunt ornare ipsum. Nunc aliquam, arcu non blandit imperdiet, mi tellus vehicula mauris, vitae fringilla purus erat sed tellus. Pellentesque tincidunt aliquet lacus, quis vulputate tortor consequat in. In hac habitasse platea dictumst. Nulla sed risus et justo interdum tristique sit amet ac ligula. Donec molestie nulla et ante varius, at bibendum dolor dictum. Integer lobortis nec urna nec accumsan. Praesent dignissim est non porta varius. Aenean sed mattis ante. Nunc rhoncus tellus porttitor nibh bibendum ultrices.

              In eu felis sit amet mauris pharetra egestas. Sed ultrices, felis at dapibus lobortis, magna quam mattis elit, ac faucibus neque ex elementum purus. Mauris ultrices nulla id blandit pellentesque. Donec congue imperdiet varius. Vivamus et nisl sit amet velit congue tristique et eu libero. Etiam a magna eget ante consequat eleifend quis vel odio. Cras accumsan egestas augue a tristique. Morbi vel nisi nec velit finibus finibus. Quisque fermentum velit placerat felis egestas, sit amet posuere eros molestie. Proin at interdum nibh, vel ornare leo.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

     <!--Modal for Sign up and Sign In-->
    <div class="modal fade" style="margin-top:30px;" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content" style="background-color: #001223f7;">
          <div id="loginbox">
            <div class="modal-header" style="border-bottom-width: 0px; ">
              <h4 class="modal-title" style="color:#d3ddf1;">Login Here</h4>
            </div>
            <div class="modal-body">
              <form method="post" id="login-form" style="padding: 10px;">
                <fieldset>
                  <div class="form-group">
                    <input type="text" id="login-email" class="form-control text" name="login-email" value="" placeholder="Email">
                  </div>
                  <div class="form-group">
                    <input type="password" id="login-password" class="form-control text" name="login-password" value="" placeholder="Password" >
                  </div>
                  <div class="checkbox">
                    <label style="color:#d3ddf1;"><input type="checkbox" name="checkbox" name="remember-me" value="1" checked> Remember me</label>
                  </div>
                  <button type="submit" id="login-btn" class="btn btn-default" name="button">Log In</button>
                </fieldset>
              </form>
              <div class="" style="color:white; padding-left: 1.5%;">
                Don't have an account? <a style="cursor: pointer;" onclick="$('#loginbox').hide(); $('#signupbox').show()">Sign up Here</a>
              </div>
            </div>
          </div>
          <div id="signupbox" style="display: none;">
            <div class="modal-header" style="border-bottom-width: 0px; ">
              <h4 class="modal-title" style="color:#d3ddf1;">Sign Up Here</h4>
            </div>
            <div class="modal-body">
              <form method="post" id="signup-form" style="padding: 10px;">
                <fieldset>
                  <div class="form-group">
                    <input type="text" id="signup-firstname" class="form-control text" name="signup-firstname" value="" placeholder="First Name">
                  </div>
                  <div class="form-group">
                    <input type="text" id="signup-lastname" class="form-control text" name="signup-lastname" value="" placeholder="Last Name">
                  </div>
                  <div class="form-group">
                    <input type="text" id="signup-email" class="form-control text" name="signup-email" value="" placeholder="Email">
                  </div>
                  <div class="form-group">
                    <input type="text" id="signup-username" class="form-control text" name="signup-username" value="" placeholder="Username">
                  </div>
                  <div class="form-group">
                    <input type="password" id="signup-password" class="form-control text" name="signup-password" value="" placeholder="Password" >
                  </div>
                  <div class="form-group">
                    <input type="password" id="signup-retype-password" class="form-control text" name="signup-retype-password" value="" placeholder="Re-type Password">
                  </div>
                  <button type="submit" id="signup-btn" style="width: auto;" class="btn btn-default" name="button">Sign Up</button>
                </fieldset>
              </form>
              <div class="" style="color:white; padding-left: 1.5%;">
                Already Have an Account? <a style="cursor: pointer;" onclick="$('#signupbox').hide(); $('#loginbox').show()">Log In Here</a>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="border-top-width: 0px;">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="background-color: #DCDCDC;height: auto;padding: 0%;margin:0%;width: 100%;margin-top:3%;">
      <!--<div class="row">
        <div class="">

        </div>
      </div>-->
      <h4 style="padding-left: 3%;padding-top: 0.5%;font-family: garamond;font-weight: bold;" class="col-md-10 col-xs-5">Anti-Cancer</h4>
      <button class="col-md-2 see" id="anti-cancer-btn" style="padding: 0.3%;">See All</button>
    </div>
    <div class="container" style="margin:0%;width: 100%;">
      <div class="col-md-12" style="margin-top: 3%;">
        <div class="container wrapper" style="width: 100%;">
          <div class="row">
            <div class="owl-carousel owl-theme" id="anti-cancer-carousel">
              <?php
                include 'php/connect.php';

                $query = "SELECT * from med_info where main_category = 'Cancer Care' AND image_url != '' LIMIT 25";

                if ($query_run = $db->query($query)) {

                  while ($query_fetch = $query_run->fetch_assoc()) {

              ?>
              <div class="item">
                <div class="col-sm-12 col-xs-12">
                  <a href="page3?med-name=<?=$query_fetch['product_name']?>&id=<?=$query_fetch['id']?>" style="text-decoration: none; text-align: center;" class="thumbnail">
                    <img src="<?=$query_fetch['image_url']?>" style='width:100%; max-width: 155px; height: 155px;object-fit: scale-down;' alt="<?=$query_fetch['product_name']?>" />
                    <div class="desc" style="text-align: center; height: 120px; padding-top: 10px;">
                      <div style="font-size: 16px; font-weight: bold; color: black;" class="">
                        <?=$query_fetch['product_name']?>
                      </div>
                      <div style="font-size: 12px; color: gray;" class="">
                        <?=$query_fetch['company_name']?>
                      </div>
                      <?php
                        if ($query_fetch['offer_mrp']) {
                      ?>
                      <div class="">
                        <div style="display: inline-block; padding: 2px; color: #9e9e9e; text-decoration: line-through;">&#8377;<?=$query_fetch['mrp']?></div>
                        <div id="save-txt" style="display: inline-block; padding: 2px; color: green; font-size: 12px;">Save <?=round(($query_fetch['mrp'] - $query_fetch['offer_mrp']) / $query_fetch['mrp'] * 100)?>%</div>
                      </div>
                      <div class="" style="font-size: 20px; font-weight: bold;">
                        &#8377;<?=$query_fetch['offer_mrp']?>
                      </div>
                      <?php
                      }
                      else {
                      ?>
                      <div class="" style="font-size: 20px; font-weight: bold;">
                        &#8377;<?=$query_fetch['mrp']?>
                      </div>
                      <?php
                      }
                      ?>
                    </div>
                  </a>
                </div>
              </div>
              <?php
                }
              }
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="background-color: #DCDCDC;height: auto;padding: 0%;margin:0%;width: 100%;margin-top:3%;">
      <h4 style="padding-left: 3%;padding-top: 0.5%;font-family: garamond;font-weight: bold;" class="col-md-10 col-xs-5">OTC</h4>
      <button class="col-md-2 see" id="otc-btn" style="padding: 0.3%;">See All</button>
    </div>
    <div class="container" style="margin:0%;width: 100%;">
      <div class="col-md-12" style="margin-top: 3%;">
        <div class="container wrapper" style="width: 100%;">
          <div class="row">
            <div class="owl-carousel owl-theme" id="otc-carousel">
              <?php
                include 'php/connect.php';

                $query = "SELECT * from med_info where main_category = 'OTC' AND image_url != '' LIMIT 25";

                if ($query_run = $db->query($query)) {

                  while ($query_fetch = $query_run->fetch_assoc()) {

              ?>
              <div class="item">
                <div class="col-sm-12 col-xs-12">
                  <a href="page3?med-name=<?=$query_fetch['product_name']?>&id=<?=$query_fetch['id']?>" style="text-decoration: none; text-align: center;" class="thumbnail">
                    <img src="<?=$query_fetch['image_url']?>" style='width:100%; max-width: 155px; height: 155px; object-fit: scale-down;' alt="<?=$query_fetch['product_name']?>" />
                    <div class="desc" style="text-align: center; height: 120px; padding-top: 10px;">
                      <div style="font-size: 16px; font-weight: bold; color: black;" class="">
                        <?=$query_fetch['product_name']?>
                      </div>
                      <div style="font-size: 12px; color: gray;" class="">
                        <?=$query_fetch['company_name']?>
                      </div>
                      <?php
                        if ($query_fetch['offer_mrp']) {
                      ?>
                      <div class="">
                        <div style="display: inline-block; padding: 2px; color: #9e9e9e; text-decoration: line-through;">&#8377;<?=$query_fetch['mrp']?></div>
                        <div id="save-txt" style="display: inline-block; padding: 2px; color: green; font-size: 12px;">Save <?=round(($query_fetch['mrp'] - $query_fetch['offer_mrp']) / $query_fetch['mrp'] * 100)?>%</div>
                      </div>
                      <div class="" style="font-size: 20px; font-weight: bold;">
                        &#8377;<?=$query_fetch['offer_mrp']?>
                      </div>
                      <?php
                      }
                      else {
                      ?>
                      <div class="" style="font-size: 20px; font-weight: bold;">
                        &#8377;<?=$query_fetch['mrp']?>
                      </div>
                      <?php
                      }
                      ?>
                    </div>
                  </a>
                </div>
              </div>
              <?php
                }
              }
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container " style="margin:0%;height: auto;width: 100%;margin-top: 5%;">
      <div class="col-md-5 col-xs-12 works" style="padding: 0%;height: 100%;">
        <div class="thumbnail" style="border-right-width:1px; border:0px;border-color:grey;height: 100%;border-radius: 0%;">
          <h3 class="how">How It <span style="text-shadow: 1px 1px grey;color:#2e0061;">WORKS</span></h3><br>
          <div class="col-md-2 col-xs-2" style="margin-top: 2%;">
            <img src="img/search.png" style="height:50px;" alt="search">
          </div>
          <div class="col-md-10 col-xs-10" style="margin-top: 2%;">
            <h4 style="font-family: sans-garamond;font-weight: bold;color: darkslategrey;">Search For Your Medicines</h4>
            <p>Search Drugs Information, Images and Side Effects</p><br>
          </div>
          <div class="col-md-2 col-xs-2" >
            <img src="img/cart.png" style="height: 50px;" alt="cart">
          </div>
          <div class="col-md-10 col-xs-10">
            <h4 style="font-weight: bold;font-family: sans-garamond;color: darkslategrey;">Add To Cart</h4>
            <p>Buy Quality Medicines Online</p><br>
          </div>
          <div class="col-md-2 col-xs-2">
            <img src="img/download.png" style="height: 50px;" alt="verification">
          </div>
          <div class="col-md-10 col-xs-10">
            <h4 style="font-weight: bold;font-family: sans-garamond;color: darkslategrey;">Attach Prescriptions</h4>
            <p>Our Expert Pharmacist Will Verify Your Prescriptions</p><br>
          </div>
          <div class="col-md-2 col-xs-2">
            <img src="img/pay.png" style="height: 50px;" alt="pay">
          </div>
          <div class="col-md-10 col-xs-10">
            <h4 style="font-weight: bold;font-family: sans-garamond;color: darkslategrey;">Make Payment</h4>
            <p>Pay Now Or Pay Later</p><br>
          </div>
          <div class="col-md-2 col-xs-2">
            <img src="https://img2.annuncicdn.it/e6/99/e699d193a829be5bcda894eb772ffbab_orig.jpg" style="height: 50px;" alt="e699d193a829be5bcda894eb772ffbab_orig.jpg">
          </div>
          <div class="col-md-10 col-xs-10">
            <h4 style="font-weight: bold;font-family: sans-garamond;color: darkslategrey;">Recieve Your Order</h4>
            <p>Your Order Will Checked By Trusted Pharmacy & </p>
            <p>Delivered By Trusted Logistics Partners</p>
          </div>
        </div>
      </div>
      <div class="col-md-7 col-xs-12" style="padding: 0%;height: 100%;">
        <div class="thumbnail" style="border-left-width: 2px;border-color:grey;border:0px;height: 100%;border-radius: 0%;">
          <h3 style="text-align: center;color: #021E51;text-decoration: underline;font-weight: bold;">Top Products</h3><br>
          <div id="gzbcarousel">
            <a href="#"><img class="thumbnail" src="img/pic1.jpeg" id="item-1" alt="pic1.jpeg"/></a>
            <a href="#"><img class="thumbnail" src="img/pic2.jpeg" id="item-2" alt="pic2.jpeg"/></a>
            <a href="#"><img class="thumbnail" src="img/pic3.jpg" id="item-3" alt="pic3.jpeg"/></a>
            <a href="#"><img class="thumbnail" src="img/pic4.jpg" id="item-4" alt="pic4.jpeg"/></a>
            <a href="#"><img class="thumbnail" src="img/pic5.jpg" id="item-5" alt="pic5.jpeg"/></a>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="background-color: #DCDCDC;height: auto;padding: 0%;margin:0%;width: 100%;margin-top:3%;">
      <!--<div class="row">
        <div class="">

        </div>
      </div>-->
      <h4 style="padding-left: 3%;padding-top: 0.5%;font-family: garamond;font-weight: bold;" class="col-md-10 col-xs-5">Nutrition</h4>
      <button class="col-md-2 see" id="anti-cancer-btn" style="padding: 0.3%;">See All</button>
    </div>
    <div class="container" style="margin:0%;width: 100%;">
      <div class="col-md-12" style="margin-top: 3%;">
        <div class="container wrapper" style="width: 100%;">
          <div class="row">
            <div class="owl-carousel owl-theme" id="anti-cancer-carousel">
              <?php
                include 'php/connect.php';

                $query = "SELECT * from med_info where main_category = 'Nutritions' LIMIT 25";

                if ($query_run = $db->query($query)) {

                  while ($query_fetch = $query_run->fetch_assoc()) {

              ?>
              <div class="item">
                <div class="col-sm-12 col-xs-12">
                  <a href="page3?med-name=<?=$query_fetch['product_name']?>&id=<?=$query_fetch['id']?>" style="text-decoration: none; text-align: center;" class="thumbnail">
                    <img src="img/coming_soon.jpeg" style='width:100%; max-width: 155px; height: 155px;object-fit: scale-down;' alt="<?=$query_fetch['product_name']?>" />
                    <div class="desc" style="text-align: center; height: 120px; padding-top: 10px;">
                      <div style="font-size: 16px; font-weight: bold; color: black;" class="">
                        <?=$query_fetch['product_name']?>
                      </div>
                      <div style="font-size: 12px; color: gray;" class="">
                        <?=$query_fetch['company_name']?>
                      </div>
                      <?php
                        if ($query_fetch['offer_mrp']) {
                      ?>
                      <div class="">
                        <div style="display: inline-block; padding: 2px; color: #9e9e9e; text-decoration: line-through;">&#8377;<?=$query_fetch['mrp']?></div>
                        <div id="save-txt" style="display: inline-block; padding: 2px; color: green; font-size: 12px;">Save <?=round(($query_fetch['mrp'] - $query_fetch['offer_mrp']) / $query_fetch['mrp'] * 100)?>%</div>
                      </div>
                      <div class="" style="font-size: 20px; font-weight: bold;">
                        &#8377;<?=$query_fetch['offer_mrp']?>
                      </div>
                      <?php
                      }
                      else {
                      ?>
                      <div class="" style="font-size: 20px; font-weight: bold;">
                        &#8377;<?=$query_fetch['mrp']?>
                      </div>
                      <?php
                      }
                      ?>
                    </div>
                  </a>
                </div>
              </div>
              <?php
                }
              }
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>s
    <div class="parallax">
      <div class="caption">
        <div class="thumbnail box">
          <div class="" style="height: auto;width: 95%;margin-left: 2.5%;margin-right: 2%; margin-top: 13px;background-color:031430eb;border-color: #105294;">
            <h3 style="text-align: center;color:#fff;font-family: garamond;font-weight:bold;">India's No. 1 Medicine Online Store</h3>
            <p style="color: #00fff3;padding-left: 1%;"><span style="font-weight:bold;font-size: 17px;color: lightgreen">India’s Trusted Pharmacy: Purchase Medicines & Drugs Online in India/Outside India</span><br>

            No more running from one chemist store to another when in need of medicines! Medicine Online Store brings to you as an online platform for
            medicines and health products, which can be accessed for all health needs. We are focused towards making healthcare accessible and affordable, and
            so give you plenty of options in terms of medicine substitutes. With us, you can know about the composition of medicines prescribed to you by your doctor and search for its cheaper but equally effective substitute.
            With online medicine delivery, we believe in taking stress off your shoulders and helping you focus only on your recovery.

            We cater to the demands of Prescription/Non-Prescription/Health Products are delivered in INDIA - Delhi–NCR and Middle East Countries-
            Bahrain, Iran, Iraq, Israel, Jordan, Kuwait, Lebanon, Oman, Qatar, Saudi Arabia, United Arab Emirates.<br><br>

            <span style="font-weight:bold;font-size: 17px;color:lightgreen">Reach us for online pharmacy store in India</span><br>

            On our website, you will get detailed information about medicines vetted by certified pharmacists. You can also attach your prescription
            online whenever you need to do so. Adding new wings to E-Pharmacy, we ensure complete health care for all. The popular Health Products at our website are diabetes devices, Ayurveda and mother & child.
            At Medicine Online Store you can explore various online prescription medicines as well as Health Products. Buying prescription drugs online is very simple on
            Medicine online Store, you just need to search for the medicine, add to cart and if the medicine requires a prescription – you can upload a copy of the
            prescription from your desktop right there and proceed to checkout. You can also buy other health care products online that don’t require a prescription.<br>
            So shop for online health care medicines for your personal and family wellness.
            </p>
          </div>
          <br><br>
        </div>
      </div>
    </div>

  <button onclick="topFunction()" id="myBtn" title="Back to top"><span class="glyphicon glyphicon-arrow-up"></span></button>
    <!--<div class="chatbox chatbox--tray chatbox--empty" style="border-radius: 0px; z-index: 1300;">
       <div class="chatbox__title">
           <h5><a href="#">Chat</a></h5>
           <button class="chatbox__title__tray">
             <span></span>
           </button>
           <button class="chatbox__title__close">
             <span>
                <svg viewBox="0 0 12 12" width="12px" height="12px">
                    <line stroke="#FFFFFF" x1="11.75" y1="0.25" x2="0.25" y2="11.75"></line>
                    <line stroke="#FFFFFF" x1="11.75" y1="11.75" x2="0.25" y2="0.25"></line>
                </svg>
             </span>
           </button>
        </div>
        <div class="chatbox__body">
        <div class="chatbox__body__message chatbox__body__message--left">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
            <p>yup</p>
        </div>
        <div class="chatbox__body__message chatbox__body__message--right">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/arashmil/128.jpg" alt="Picture">
            <p>hlo</p>
        </div>
        <div class="chatbox__body__message chatbox__body__message--left">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
            <p>hey</p>
        </div>
        <div class="chatbox__body__message chatbox__body__message--right">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/arashmil/128.jpg" alt="Picture">
            <p>bye</p>
        </div>
        <div class="chatbox__body__message chatbox__body__message--right">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/arashmil/128.jpg" alt="Picture">
            <p>tata</p>
        </div>
    </div>

    <textarea class="chatbox__message" placeholder="Write Here.."></textarea>
</div>-->

<section id="follow" style="z-index: 0;height:auto;">
  <div class="col-md-12 social-icons">
    <div class="row">
      <div class="col-md-4">
        <div style="color:#fff;text-align: left;padding-left:35%;">
          <h4 style="font-family:sans-serif;">SOME LINKS HERE</h4>
          <p><a href="#" style="color:lightblue;text-decoration: none;">ABOUT</a></p>
          <p><a href="#" style="color:lightblue;text-decoration: none;">CONTACT US</a></p>
          <p><a href="#" style="color:lightblue;text-decoration: none;">What Product We Sell</a></p>
          <p><a href="#" style="color:lightblue;text-decoration: none;">Privacy Policy</a></p>
          <p><a href="#" style="color:lightblue;text-decoration: none;">Terms & Conditions</a></p>
          <p><a href="#" style="color:lightblue;text-decoration: none;">Return/Refund</a></p><br>
        </div>
      </div>
      <div class="col-md-4">
        <h4 style="color:#fff;"><i class="fa fa-twitter" style="color:#3b94d9;"></i> Widget</h4>
        <a class="twitter-timeline" data-width="250" data-height="300" href="https://twitter.com/StoreMedicine?ref_src=twsrc%5Etfw">Tweets by StoreMedicine</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
      <div class="col-md-4" style="padding-top: 0%;">
      <!--  <ul class="social-network social-circle">
          <li><a target="_blank" href="https://www.facebook.com/Medicine-Online-Store-142266956457868" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
          <li><a target="_blank" href="https://plus.google.com/u/0/106897364395270957072" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a></li>
          <li><a target="_blank" href="https://www.linkedin.com/in/medicine-online-store-568632159/" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/StoreMedicine" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
        </ul>-->
        <h4 style="color:#fff;"><i class="fa fa-facebook-square" style="color:#365899;"></i> Widget</h4>
        <div class="fb-page" data-href="https://www.facebook.com/MedicineOnlineStoreOfficial/" data-tabs="timeline" data-width="250" data-height="300" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/MedicineOnlineStoreOfficial/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/MedicineOnlineStoreOfficial/">Medicine Online Store</a></blockquote></div>
      </div>
    </div>
  <div class="row" style="padding-top:5%;">
    <div class="col-md-3">
      <img src="img/mos_logo.png" style="width:75%;" alt="logo">
    </div>
    <div class="col-md-6" style="">
      <ul class="social-network social-circle">
        <li><a target="_blank" href="https://www.facebook.com/Medicine-Online-Store-142266956457868" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
        <li><a target="_blank" href="https://plus.google.com/u/0/106897364395270957072" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a></li>
        <li><a target="_blank" href="https://www.linkedin.com/in/medicine-online-store-568632159/" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
        <li><a target="_blank" href="https://twitter.com/StoreMedicine" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
      </ul>
      <p>&copy Medicine Online Store 2018. All rights reserved.</p>
      <p style="font-size: 11px;padding-bottom:20px;">In compliance with Drug and Cosmetic Act and Rules, we don't process requests for Schedule X and other habit forming drugs.</p>
    </div>
    <div class="col-md-3">
      <div class="ani" style="font-size: 25px;color:#fff;">Medicineonlinestore.com</div>
    </div>
  </div>
  </div>
</section>

<script type="text/javascript">
   window.onscroll=function() {scrollFunction()};

  function scrollFunction()
  {
    if (document.body.scrollTop>20 || document.documentElement.scrollTop>20)
    {
      document.getElementById("myBtn").style.display = "block";
    }
    else
    {
      document.getElementById("myBtn").style.display = "none";
    }
  }
  function topFunction()
  {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

 /* window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.remove("navbar-style");
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
    navbar.classList.add("navbar-style");
  }
}*/


   (function($) {
    $(document).ready(function() {
        var $chatbox = $('.chatbox'),
            $chatboxTitle = $('.chatbox__title'),
            $chatboxTitleClose = $('.chatbox__title__close');

        $chatboxTitle.on('click', function() {
            $chatbox.toggleClass('chatbox--tray');
        });
        $chatboxTitleClose.on('click', function(e) {
            e.stopPropagation();
            $chatbox.addClass('chatbox--closed');
        });
        $chatbox.on('transitionend', function() {
            if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
             $chatbox.removeClass('chatbox--empty');
        });

    });
})(jQuery);

</script>
  </body>
</html>
