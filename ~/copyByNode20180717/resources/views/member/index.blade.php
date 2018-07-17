@extends('layouts.app_font')

@section('page-title', trans('app.dashboard'))

@section('content')

<div class="row">
  <div class="col-xs-12">
    <div class="row">
      <div class="x_panel" >
        <div class="x_title">
          <h2>Dashboard</h2>
        </div>
        <div class="x_content">
          <div class="entry">
            <p><span style="color: #ffcc00;"><strong><span style="font-size: 18pt;">ข้อมูลสมาชิก </span><a href="{{ route('member.profile') }}" > แก้ไขข้อมูลส่วนตัว</a></strong></span></p>
            <div class=""  style="background-color: white"> 
              <table class="table table-bordered table-striped datagrid">  <tbody> <tr> <th scope="row">ชื่อ - นาสกุล</th> <td>{{ $User->first_name}}</td> </tr> 
                <tr>
                 <th scope="row">User (ชื่อใช้งาน)</th> <td>{{ $User->username}}</td> </tr>
                 <th scope="row">Type (ประเภทสมาชิก)</th> <td>{{ $User->type}}</td> </tr>
                 <tr>
                   <th scope="row">เบอร์โทร</th> <td>{{ $User->phone}}</td> </tr>
                   <tr> <th scope="row">จำนวนเงิน (เครดิต)</th> <td>{{$MoneySum}}</td> </tr>
                   <tr> <th scope="row" colspan="2">
                     <table>
                       <tr>
                         <th style="display: none;">เว็บไซต์</th>
                         <th style="display: none;">URL</th>
                         <th>User</th>
                         <th>Password</th>
                         <th>จำนวนเงิน (เครดิต)</th>
                       </tr>
                       @foreach($Moneys as $key=>$Money)
                       <tr>
                        <td style="display: none;">{{$Money->website}}</td>
                        <td style="display: none;">{{$Money->url}}</td>
                        <td>{{$Money->username}}</td>
                        <td>{{$Money->Password}}</td>
                        <td>{{$Money->money}}</td>
                      </tr>
                      @endforeach
                    </table>
                  </th>  </tr>
                </tbody> </table>
              </div> 
              @if(Auth::user()->hasRole('Agent'))
              <div class=""  style="background-color: white"> 
               &nbsp; พันธมิตร
               <table class="table table-bordered table-striped datagrid">  
                <tr>
                  <th style="text-align: center;">จำนวนคลิก</th>
                  <th style="text-align: center;">ลงทะเบียนใหม่</th>
                </tr>
                <tbody>
                 <tr>
                  <th style="text-align: center;">{{ $User->count_click}}</th>
                  <th style="text-align: center;">{{count($AgentData)}}</th>
                </tr> 
				<tr>
					<td colspan="2" style="text-align: center;font-size: 2em;font-weight: 900;">เครดิตลูกค้า
					</td>
				</tr>
                <tr>
                  <td colspan="2">
                    <div class="table-responsive top-border-table" id="users-table-wrapper">
                      <table class="table" id="tbl-user">
                        <thead>
                          <th>@lang('app.username')</th>
                          <th style="max-width: 200px">@lang('app.full_name')</th>
                          <th class="text-center">เงินทั้งหมด</th>
                          <th class="text-center">เงินฝาก</th>
                          <th class="text-center">เงินถอน</th>
                          <th class="text-center">คงเหลือ</th>
                        </thead>
                        <tbody>
                          @if (count($users))
                          @foreach ($users as $user)
                          <tr class="label-{{ $user->present()->labelClass }} {{ $user->username ?'': 'user-new' }}">
                            <td style="width: 15px;">{{ $user->username ?: trans('app.n_a') }}</td>
                            <td style="max-width: 100px">{{ $user->first_name . ' ' . $user->last_name }}</td>
                            <td class="text-right" style="    background-color: rgba(128, 128, 128, 0.38);">{{number_format($user->deposit+$user->withdraw, 2, '.', ',')}}</td>
                            <td class="text-right" style="        background-color: rgba(215, 216, 30, 0.38);;">{{number_format($user->deposit, 2, '.', ',')}}</td>
                            <td class="text-right" style="    background-color: rgba(232, 52, 26, 0.38);">{{number_format($user->withdraw, 2, '.', ',')}}</td>
                            <td class="text-right" style="    background-color: rgba(91, 193, 77, 0.38);">{{number_format($user->deposit-$user->withdraw, 2, '.', ',')}}</td>
                          </tr>
                          @endforeach
                          @else
                          <tr>
                            <td colspan="6"><em>@lang('app.no_records_found')</em></td>
                          </tr>
                          @endif
                        </tbody>
                      </table>

                      {!! $users->render() !!}
                    </div>
                  </td>
                </tr>
              </tbody> 
            </table>
          </div>  
          @endif


          {{--
          <p><span style="color: #ffcc00;"><strong><span style="font-size: 16pt;">ขั้นตอนเริ่มเล่น</span></strong></span></p>
          <p><span style="font-size: 16pt; color: #cfcaca;">1. สมาชิกสามารถโอนเงินเข้าบัญชี ได้ดังนี้</span></p>
          <div class="datagrid">
           <table class="table" style="background-color: white;"> 
             <thead>
              <tr> <th>#</th> <th>ธนาคาร</th> <th>ชื่อ</th> <th>หมายเลขบัญชี</th> </tr>
            </thead> 
            <tbody> 
              <tr> <th scope="row">1</th> <td>กสิกรไทย</td> <td>กิตติพงษ์</td> <td>0358754414</td> </tr> <tr> <th scope="row">2</th> <td>ไทยพาณิชย์</td> <td>กิตติพงษ์</td> <td>6222754538</td> </tr> 
              <tr> 
                <th scope="row">3</th> <td>กรุงไทย</td> <td>กิตติพงษ์</td> <td>3030946495</td> 
              </tr> 

              <tr> 
                <th scope="row">4</th> <td>กรุงเพพ</td> <td>กิตติพงษ์</td> <td>3314840558</td> 
              </tr> 
              <tr> 
                <th scope="row">5</th> <td>ทหารไทย</td> <td>กิตติพงษ์</td> <td>4812508630</td> 
              </tr> 
            </tbody>
          </table>    
        </div>
        <p><span style="color: #ffcc00;"><strong><span style="font-size: 16pt;">  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; คำเตือน</span></strong></span></p>
        <p><span style="font-size: 14pt; color: #cfcaca;">
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; โปรดระวังมิจฉาชีพ เเอบอ้างให้โอนสาย หรือเปลี่่ยนแปลงเลขบัญชี โปรดทราบว่า หากสมาชิกโอนเงินไปยังบัญชีอื่น ซึ่งไม่ใช่บัญชีที่ทางทีมงานได้แจ้งไว้ก่อนหน้านี้ เราจะไม่รับผิดชอบกับความเสียหายใดๆ ที่เกิดขึ้น ฉะนั้นหากมีข้อสงสัย เบื้องต้นให้สอบถามข้อมูลต่างๆ ที่เคยสมัครไว้กับทีมงาน เพื่อยืนยันว่าเป็นตัวจริงหรือมิจฉาชีพ จึงเรียนมาเพื่อทราบ

        </span></p>
        --}}
        {{--
        <p><span style="font-size: 16pt; color: #cfcaca;">2. แจ้งการโอนเงิน</span> 
        --}}

          <button type="button" onclick="location.href = '{{ route('member.deposit') }}';" class="btn btn-danger btn-lg btn-block button-custom">
             รายการฝากเงินของลูกค้า
         </button></p>
		 {{--
         <p><span style="font-size: 16pt; color: #cfcaca;">3. แจ้งการถอนเงิน</span> 
		 --}}
          <button type="button" onclick="location.href = '{{ route('member.withdraw') }}';"  class="btn btn-danger btn-lg btn-block button-custom">
           รายการถอนเงินของลูกค้า
         </button></p>
         {{--
         <p><span style="font-size: 16pt; color: #cfcaca;">4. ช่องทางพนันออนไลน์</span> 
		 --}}
          <button type="button" onclick="location.href = '{{ route('ช่องทางพนันออนไลน์') }}';"  class="btn btn-danger btn-lg btn-block button-custom">
           ช่องทางการเช็คค่าคอมกับยอดได้เสีย
         </button></p>
         @if(Auth::user()->hasRole('Agent'))
			{{--
         <p><span style="font-size: 16pt; color: #cfcaca;">5. พันธมิตร</span> 
			--}}
           <div class="highlight">
             <p> URL <span style="font-size: 16pt; color: #000000;">ลิ้งค์พันธมิตรของคุณ</span> </p>
             <div>
               <span class="s">{{url("")}}?agent={{ $User->username}}</span>
             </div>
           </div>

{{--
           @foreach($BannersOthers as $key=>$BannersOther)
           @if($BannersOther->avatar != "")
           <a href="{{url("?agent=$User->username")}}" target="_blank" > 
            <img src="{{$BannersOther->avatar}}" class="logo-header">
          </a>
          <div class="highlight">
           <p> Copy Code</p>
           <div>
            <span class="nt">&lt;a target="_blank"</span>
            <span class="na">href=</span>
            <span class="s">"{{url("")}}?agent={{ $User->username}}"</span>
            <span class="nt">&gt;</span>
            <span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">"{{$BannersOther->avatar}}"</span> <span class="na">class=</span><span class="s">"img-responsive"</span> <span class="na">alt=</span><span class="s">"Responsive image"</span><span class="nt">&gt;</span>
            <span class="nt">&lt;/a&gt;</span>
          </div>
        </div>
        @endif
        @endforeach  
--}}



      </p>
      @endif



    </div>


  </div>
</div>  

</div>
</div>




@stop
@section('styles')
<style type="text/css">
.datagrid table { border-collapse: collapse; text-align: left; width: 100%; } .datagrid {font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #006699; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; }.datagrid table td, .datagrid table th { padding: 3px 10px; }.datagrid table thead th {background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; color:#FFFFFF; font-size: 15px; font-weight: bold; border-left: 1px solid #0070A8; } .datagrid table thead th:first-child { border: none; }.datagrid table tbody td { color: #00496B; border-left: 1px solid #E1EEF4;font-size: 12px;font-weight: normal; }.datagrid table tbody .alt td { background: #E1EEF4; color: #00496B; }.datagrid table tbody td:first-child { border-left: none; }.datagrid table tbody tr:last-child td { border-bottom: none; }.datagrid table tfoot td div { border-top: 1px solid #006699;background: #E1EEF4;} .datagrid table tfoot td { padding: 0; font-size: 12px } .datagrid table tfoot td div{ padding: 2px; }.datagrid table tfoot td ul { margin: 0; padding:0; list-style: none; text-align: right; }.datagrid table tfoot  li { display: inline; }.datagrid table tfoot li a { text-decoration: none; display: inline-block;  padding: 2px 8px; margin: 1px;color: #FFFFFF;border: 1px solid #006699;-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; }.datagrid table tfoot ul.active, .datagrid table tfoot ul a:hover { text-decoration: none;border-color: #006699; color: #FFFFFF; background: none; background-color:#00557F;}div.dhtmlx_window_active, div.dhx_modal_cover_dv { position: fixed !important; }

</style>

@stop

@section('scripts')

@stop