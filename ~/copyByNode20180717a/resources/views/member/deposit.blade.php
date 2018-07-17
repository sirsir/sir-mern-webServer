@extends('layouts.app_font')

@section('page-title', trans('app.dashboard'))

@section('content')

<div class="row">
  <div class="col-xs-12">
    <div class="row">
      <div class="x_panel" >
        <div class="x_title">
          <h2>แจ้งฝากเงิน</h2>
        </div>
        <div class="x_content">
          <div class="entry">
            <p><span style="color: #ffcc00;"><strong><span style="font-size: 18pt;">รายการฝากเงิน </span></strong></span></p>
            <p><span style="font-size: 14pt; color: #cfcaca;">เมื่อเจ้าหน้าทำการตรวจสอบข้อมูลการแจ้งฝากถูกต้อง ส่งแจ้ง User & Password ช่องทางการเข้าเล่น ทาง SMS เบอร์ {{$User->phone}}</span></p>
            <div class="datagrid">
             <table class="table" style="background-color: white;"> 
               <thead>
                <tr> <th>#</th> <th >ชื่อ</th> <th>ธนาคาร</th> <th>วันที่ เวลา</th><th>จำนวนเงิน</th> <th>สถานะ</th> <th>วันที่สร้างรายการ</th>  <th>หมายเหตุ</th><th>สลิป</th></tr>

              </thead> 
              <tbody>
                @foreach($Transactions as $key=>$Transaction)
                <tr>
                  <td>{{++$key}}</td>
                  <td >{{$Transaction->first_name}}</td>
                  <td>{{$Transaction->bank}}</td>
                  <td>{{$Transaction->date}} {{$Transaction->time}}</td>
                  <td>{{$Transaction->money}}</td>
                  <td style="color:{{$Transaction->color_status}}">{{$Transaction->status}}</td>

                  <td>{{$Transaction->created_at}}</td>
                  <td>{{$Transaction->remark}}</td>
                  <td style="text-align: center;font-size: 14px">
                    @if (!empty($Transaction->avatar))
                    <a class="image" data-url="{{URL::to('/')}}/upload/slips/{{$Transaction->avatar}}"> <i class="fa fa-file-image-o" aria-hidden="true"></i></a>
                    @else

                    @endif
                  </td>
                </tr>

                @endforeach
              </tbody>
            </table>    
          </div>



          <?php /* <div class="row">
            <div class="col-xs-12">
              <div class="row">
                <div class="col-xs-12" style="
                margin-top: 18px;">
                <div class="panel panel-default panel-transparent">
                  <div class="panel-body">           
                   <form role="form" enctype="multipart/form-data"  action="<?= url('member/deposit') ?>"  method="post" id="registration-form" autocomplete="off" class="form-horizontal">
                     <input type="hidden" value="<?= csrf_token() ?>" name="_token">
                     <p style="text-align: center"><span style="font-size: 16pt; color: #cfcaca;">แจ้งฝากเงิน</span></p>
                     <div class="form-group">
                      <label  class="col-xs-3 control-label">ชื่อ - นาสกุล<span style="color: red;padding-left: 5px;">*</span></label>
                      <div class="col-xs-9">
                        <input type="text" class="form-control" id="first_name" name="first_name" placeholder="ชื่อ - นาสกุล" readonly disabled style="background-color: gray;color: :white" maxlength="255" value="{{ $User->first_name }}">
                      </div>
                    </div>

                    <div class="form-group">
                      <label  class="col-xs-3 control-label">username<span style="color: red;padding-left: 5px;">*</span></label>
                      <div class="col-xs-9">
                        <input type="hidden" name="email">
                        <input type="hidden" name="type" value="1">
                        <input type="text" class="form-control" id="username" name="username" placeholder="username" maxlength="255"  readonly disabled style="background-color: gray;color: :white" value="{{ $User->username }}" >
                      </div>
                    </div>
                    <div class="form-group" style="display: none;>
                    <label for="inputWebsite" class="col-xs-3 control-label">เว็บไซต์</label>
                    <div class="col-xs-9">
                      <select class="form-control" name="website">
                        @foreach($Websites as $Website)
                        <option value="{{$Website->id}}">{{$Website->website}}</option>
                        @endforeach
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-xs-3 control-label">เลือกธนาคาร</label>
                    <div class="col-xs-9">
                      <select name="bank" id="bank" class="form-control">
                          <option value="">กรุณาเลือก</option>
                          <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                          <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                          <option value="ธนาคารกรุงศรี">ธนาคารกรุงศรี</option>
                          <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                          <option value="ธนาคารทหารไทย">ธนาคารทหารไทย</option>
                          <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                        </select>
                      </select>
                    </div>
                  </div>
                  <div class="form-group" style="display: none;">
                    <label class="col-xs-3 control-label">เลือกช่องทาง</label>
                    <div class="col-xs-9">
                      <select name="channal" id="channal" class="form-control">
                        <option value="ฝาก">ฝาก</option>
                        <option value="เงินสด">เงินสด</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-xs-3 control-label">วันที่ ที่ฝากเงิน</label>
                    <div class="col-xs-9">
                      <div class='input-group date' id='datetimepicker1'>
                        <input type="text" class="form-control" id="transferAmountDate" name="date" placeholder="วันที่ ที่ฝากเงิน">
                        <span class="input-group-addon">
                          <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                      </div>                                
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-xs-3 control-label">เวลาที่ฝากงิน</label>
                    <div class="col-xs-9">
                      <div class='input-group date' id='datetimepicker2'>
                        <input type="text" class="form-control time" id="transferAmountTime" name="time" placeholder="เวลาที่ฝากงิน"  maxlength="20">
                        <span class="input-group-addon">
                          <span class="glyphicon glyphicon-time"></span>
                        </span>
                      </div>                                
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-xs-3 control-label">ยอดเงินที่ฝาก</label>
                    <div class="col-xs-9">
                      <input type="number" class="form-control input-number-only" id="lastNumber" name="money" placeholder="ยอดเงินที่ฝาก">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-xs-3 control-label">อัพโหลดสลิป</label>
                    <div class="col-xs-9">
                     {{Form::file('avatar')}}
                   </div>
                 </div>

                 <div class="form-group">
                  <div class="col-xs-offset-5 col-xs-7">
                   <button  id="btn-login" type="submit" class="btn btn-danger button_custom_v1">ส่งข้อมูล</button>
                 </div>
               </div>

               <p ><span style="font-size: 14pt; color: #cfcaca; padding-left: 25px">หมายเหตุ <span style="color: red;padding-left: 5px;">*</span> จำเป็นต้องระบุข้อมูล</span></p>

             </form>






           </div>
         </div>
       </div>
     </div>            
   </div>









 </div> */?>
</div>  

</div>
</div>

<!-- Modal -->
<div id="modal_display" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">สลิป</h4>
      </div>
      <div class="modal-body" style="text-align: center;">
       <span id="modal_url"></span>
     </div>
     <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
<script>
  $(function () {
    $('#datetimepicker1').datetimepicker({
      format: 'DD/MM/YYYY',
      defaultDate: new Date()
    });

    $('#datetimepicker2').datetimepicker({
      format: 'HH:mm',
    });
  });
</script>
<script>
  $('.image').click(function(){
   // $('#modal_haeder').html('<h3>'+$(this).data('name')+'</h3>');
   $('#modal_url').html('<img src="'+$(this).data('url')+'" class="img-rounded" id="image_display" alt="สลิป" >');
   $('#modal_display').modal('show');
 });





</script>
{!! JsValidator::formRequest('Vanguard\Http\Requests\Transaction\TransactionRequest', '#registration-form') !!}
@stop