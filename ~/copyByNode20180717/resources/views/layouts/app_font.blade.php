<!doctype html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">


  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ settings('app_name') }}</title>

  <link rel="apple-touch-icon" sizes="180x180" href="{{ url('assets/img/icons/apple-touch-icon.png') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ url('assets/img/icons/favicon-32x32.png') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ url('assets/img/icons/favicon-16x16.png') }}">
  <link rel="manifest" href="{{ url('assets/img/icons/site.webmanifest') }}">
  <link rel="mask-icon" href="{{ url('assets/img/icons/safari-pinned-tab.svg') }}" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">


  {{-- For production, it is recommended to combine following styles into one. --}}
  {!! HTML::style('assets/css/bootstrap.min.css') !!}
  {!! HTML::style('assets/css/font-awesome.min.css') !!}
  {!! HTML::style('assets/css/font-thaisanslite.css') !!}
  {!! HTML::style('assets/css/metisMenu.css') !!}
  {!! HTML::style('assets/css/sweetalert.css') !!}
  {!! HTML::style('assets/css/bootstrap-social.css') !!}
  {!! HTML::style('assets/css/app.css') !!}
  {!! HTML::style('assets/css/main.css') !!}
  {!! HTML::style('assets/css/bootstrap-datetimepicker.css') !!}
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
  @yield('styles')




</head>
<body >

<div id="app">
<div class="nav-mobile animated fadeInUp">
    <ul>
        <li>
            <a href="{{ route('member.index') }}">
                <i class="fa fa-home fa-5x"></i>
                <small>หน้าหลัก</small>
            </a>
        </li>
        <li>
            <a href="{{ route('member.index') }}">
                <div class="alert-count">!</div>
                <i class="fa fa-shopping-cart fa-5x"></i>
                <small>โปรโมชั่น</small>
            </a>
        </li>
        <li>
            <a href="{{ route('member.deposit') }}" data-toggle="modal" data-target="#depositModal">
			    <i class="fa fa-money fa-5x"></i>
                <small>แจ้งฝาก</small>
            </a>
        </li>
        <li>
            <a href={{ route('member.withdraw') }} data-toggle="modal" data-target="#withdrawModal">
                <i class="fa fa-usd fa-5x"></i>
                <small>แจ้งถอน</small>
            </a>
        </li>
        <li>
            <a href="https://line.me/R/ti/p/@ufavip" target="_blank" data-toggle="modal" data-target="#contactModal">
                <div class="alert-online"></div>
                <i class="fa fa-phone fa-5x"></i>
                <small>ติดต่อเรา</small>
            </a>
        </li>
    </ul>
</div>	
</div>

  <header id="head-banner">
    <div class="container body-container">
      <div class="row" >
        <div class="col-xs-3" style="text-align: center;color: white;">
          <img src="{{url('assets/img/logo.png')}}"  style="width:175px">

        </div>
        <div class="col-xs-9">
          <img src="{{ $BannerHeaderTop->avatar }}" class="logo-header">
        </div>
      </div>
      @include('partials.menu')
      <div class="row show-grid" id="user-login" >
        <div class="col-xs-12" style="padding-bottom: 10px;">
         <div class="col-xs-12">
          {{-- This will simply include partials/messages.blade.php view here --}}
          @include('partials/messages')
        </div>
        <div class="col-xs-12 right">

          @if (!Auth::check())   
          <form class="form-inline"  role="form" action="<?= url('login') ?>" method="POST" id="login-form" autocomplete="off">
            <input type="hidden" value="<?= csrf_token() ?>" name="_token">
            @if (Input::has('to'))
            <input type="hidden" value="{{ Input::get('to') }}" name="to">
            @endif
            <div class="form-group">
              <label class="hidden-xs">Username</label>
              <input type="text" name="username" id="username" class="form-control input_english" placeholder="username">
            </div>
            <div class="form-group">
              <label class="hidden-xs" for="exampleInputEmail2">Password</label>
              <input type="password" name="password" id="password" class="form-control" placeholder="@lang('app.password')">
              @if (settings('forgot_password'))
              <a href="<?= url('password/remind') ?>" class="forgot">@lang('app.i_forgot_my_password')</a>
              @endif
            </div>
            
            <div class="form-group">
              <button type="submit" class="btn  btn-danger" id="btn-login">
                @lang('app.log_in')
              </button>
            </div>
          </form>
          @else
          <div class="col-xs-12 right">

            <nav class="navbar navbar-default " style="text-align:left;height: 45px;vertical-align: middle;margin-bottom: 0px;"> 
              <div class="container-fluid">
               <div class="navbar-header"> 
                <button type="button" class="collapsed navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6" aria-expanded="false">
                 <span class="sr-only">Toggle navigation</span> 
                 <span class="icon-bar"></span> 
                 <span class="icon-bar"></span> <span class="icon-bar"></span> 
               </button>
               <a href="{{ route('member.profile') }}" style="    vertical-align: middle;" class="">ยินดีต้อนรับ คุณ {{ Auth::user()->present()->name }}</a>
             </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
              <ul class="nav navbar-nav" style="margin-top: -5px">
                <li ><a href="{{ route('member.index') }}">Dashboard</a>
                </li> 
                <li><a href="{{ route('member.deposit') }}">แจ้งฝากเงิน</a>
                </li> 
                <li><a href="{{ route('member.withdraw') }}">แจ้งถอนเงิน</a>
                </li> 
                <li><a href="{{ route('auth.logout') }}">ออกจากระบบ</a>
                </li> 
              </ul> 
            </div>
          </div>
        </nav>

      </div>
      @endif
    </div>
  </div>
</div>
</div>
</header>

<section class="main-content">

 <div class="container container-panel body-container-content">
   @yield('content')

 </div>
</section>
<footer >
 <div class="container footer-top" style="background: #2e2e2e;color: white;">
   <img class="aligncenter size-full wp-image-209 tie-appear" src="{{url('assets/img/animate01.gif')}}" alt="animate01"  width="100%" >
 </div>
 <div class="container" style="background: #2e2e2e;color: white;">

  <div class="col-xs-12">
    <p class="copyright">
     COPYRIGHT  {{ date('Y') }} UFA-VIP.COM | UFA-VIP

   </p>

 </div>

</div>
</footer>
<div id="topbar">
 <a id="a_Topbar" onclick="TopbarClick();" href="javascript:void(0);"> 
  <div class="tt_btn_close">
    <i class="fa fa-times"></i></div>

  </a>
  <a class="tt_img_fixed" target="_blank" href="javascript:void(0);"><img style="width: 100%;" src="{{ url('assets/img/qrline.jpg') }}">
    <span class="tt_tx_line"> LINE : @UFAVIP</span>
  </a> 

</div>

{{-- For production, it is recommended to combine following scripts into one. --}}
{!! HTML::script('assets/js/jquery-2.1.4.min.js') !!}
{!! HTML::script('assets/js/bootstrap.min.js') !!}
{!! HTML::script('assets/js/metisMenu.min.js') !!}
{!! HTML::script('assets/js/sweetalert.min.js') !!}
{!! HTML::script('assets/js/delete.handler.js') !!}
{!! HTML::script('assets/plugins/js-cookie/js.cookie.js') !!}

{!! HTML::script('assets/js/moment.min.js') !!}
{!! HTML::script('assets/js/bootstrap-datetimepicker.min.js') !!}

<script type="text/javascript">
  $.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
  });


  jQuery(function() {


    $('body').css('background-image', "url({{url('assets/img/BodyBG/body-bg2.png')}})");
    $('#main-nav').css('background-image', "url({{url('assets/img/bg-nav3.jpg')}})");
    $('#main-nav').css('border-image',
     "url({{url('assets/img/bg-nav3.jpg')}} ) 30 30 stretch");    
    $('#main-nav').css('border-image',
     "url({{url('assets/img/animate01.gif')}} ) 30 30 stretch");
    $('.button-custom').css('border-image',
     "url({{url('assets/img/animate01.gif')}} ) 30 30 stretch");
  });
  $(document).ready(function(){
    document.getElementById("topbar").style.display = "block";

  });
  function TopbarClick(){
    document.getElementById("topbar").style.display = "none";
  }
</script>
<!--Start of Tawk.to Script-->
<script type="text/javascript">
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5a941a76d7591465c7080729/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  })();
</script>
<!--End of Tawk.to Script-->
{!! HTML::script('vendor/jsvalidation/js/jsvalidation.js') !!}
{!! HTML::script('assets/js/as/app.js') !!}
{!! HTML::script('assets/js/as/login.js') !!}
@yield('scripts')

</bod>
</html>