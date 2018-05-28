const jsRunner={
  callback:{
    onClick_runButton: function(ev){
        //var str2eval = $('#code>textarea').val();
        let editor = ace.edit("AceEditor-code");
        var str2eval = editor.getSession().getValue()
        
        $.each(['input','output'],function(i_io,io){          
          $.each(store.task[io+'s'],function(key,val){
            //~ Set localStorage
            try {
              valTemp = $('#'+io+'_'+key).val();
              
              localStorage.setItem(io+'_'+key, valTemp);
            }
            catch(err) {
                console.log(err);
            }
              
                    
          });
        });
        
        eval(str2eval);                      
    },

    onClick_saveAsNewButton: function(ev){
      console.log('onClick_saveButton')
  
      let editor = ace.edit("AceEditor-code");
      let editor2 = ace.edit("AceEditor-nocode");
      let editor3 = ace.edit("AceEditor-note");
      
      var functionObj = JSON.parse(editor2.getSession().getValue());
      functionObj.code = editor.getSession().getValue()
      functionObj.note = editor3.getSession().getValue()

      delete functionObj._id;

      reqJson = {task: JSON.stringify(functionObj)}

      // $.put( "/jsRunnerApi/task/"+functionObj._id,reqObj)
      $.post( "/jsRunnerApi/task",reqJson)
      .fail(function() {
        alert('Error in saving!!!');
      })
      .done(  function( resp ) {
       //$( ".result" ).html( data );
       console.log(resp)
       alert('Save(as new) Successfully :)');
       store.addTask(resp)

       // if (resp.hasOwnProperty('functions')){
       //   functions = resp.functions;
       //   console.log(functionObj)
       //   selected_function_val = functionObj.title;
       //   update_functions();
       //   alert('Save Successfully. Please Reload page!!!');
       // }else{
       //   alert('Error in saving!!!');
       // }
      });
    },


    onClick_saveButton: function(ev){
      console.log('onClick_saveButton')
  
      let editor = ace.edit("AceEditor-code");
      let editor2 = ace.edit("AceEditor-nocode");
      let editor3 = ace.edit("AceEditor-note");
      
      var functionObj = JSON.parse(editor2.getSession().getValue());
      functionObj.code = editor.getSession().getValue()
      functionObj.note = editor3.getSession().getValue()
      
      //selected_function_val = functionObj.title;
      //  functionObj.title = selected_function_val;
      
      
      
      // selected_function_id = functions.findIndex(x => x.title==$('#functionsSelector select').find("option:selected").val());
      //- selected_function_id = x.title==$('#functionsSelector select').find("option:selected").val()
      //- console.log("selected_function_id:" + selected_function_id)
       
      var str4dialog = "Do you want to replace\n=======================\n";
      
      str4dialog += JSON.stringify(store.task,null,"\t")
      
      str4dialog += "\n======================\nwith the following:\n"
      str4dialog += JSON.stringify(functionObj, null, "\t" )
      
      let callback = function(){
        let reqJson = {task: JSON.stringify(functionObj)}
              
       // $.put( "/jsRunnerApi/task/"+functionObj._id,reqObj)
       $.post( "/jsRunnerApi/task/"+functionObj._id,reqJson)
       .fail(function() {
          alert('Error in saving!!!');
        })
       .done(  function( resp ) {
         //$( ".result" ).html( data );
         console.log(resp)
         alert('Save(overwrite) Successfully :)');

         store.replaceTask(resp)

         // if (resp.hasOwnProperty('functions')){
         //   functions = resp.functions;
         //   console.log(functionObj)
         //   selected_function_val = functionObj.title;
         //   update_functions();
         //   alert('Save Successfully. Please Reload page!!!');
         // }else{
         //   alert('Error in saving!!!');
         // }
       });
      }

      jsRunner.confirmModal.show({
        title: "Confirm",
        body: str4dialog,
        callback: callback

      })
      // while (jsRunner.confirmModal.isShow){
      //   sleep(200)
      // }


       // var r = confirm(str4dialog);
       // if (r !== true) {
       //  return;
       // }

       
             
    },

    onClick_deleteButton: function(ev){
      console.log('onClick_saveButton')
  
      let editor = ace.edit("AceEditor-code");
      let editor2 = ace.edit("AceEditor-nocode");
      let editor3 = ace.edit("AceEditor-note");
      
      var functionObj = JSON.parse(editor2.getSession().getValue());
      functionObj.code = editor.getSession().getValue()
      functionObj.note = editor3.getSession().getValue()
      
      //selected_function_val = functionObj.title;
      //  functionObj.title = selected_function_val;
      
      
      
      // selected_function_id = functions.findIndex(x => x.title==$('#functionsSelector select').find("option:selected").val());
      //- selected_function_id = x.title==$('#functionsSelector select').find("option:selected").val()
      //- console.log("selected_function_id:" + selected_function_id)
       
      var str4dialog = "Do you want to delete\n=======================\n";
      
      str4dialog += JSON.stringify(store.task,null,"\t")
      
      
       var r = confirm(str4dialog);
       if (r !== true) {
        return;
       }

       $.ajax({
          url: "/jsRunnerApi/task/"+functionObj._id,
          type: 'DELETE',
          success: function(result) {
              // Do something with the result
          }
        })
       .done(  function( resp ) {
         //$( ".result" ).html( data );
         console.log(resp)
         alert('Delete Successfully :)');
         store.removeTask(functionObj._id)
       });                    
             
    }
  },

  confirmModal: {
    isShowing: false,
    show: function(option){
      jsRunner.confirmModal.isShow = true;
      let title = option.title || ""
      let body = option.body || ""
      let callback = option.callback || function(){alert('You click yes but no callback set:(')}

      $("#confirmModal .modal-title").html(option.title)
      $("#confirmModal .modal-body textarea").val(option.body)
      $("#confirmModal .modal-footer button.btn-primary").off('click').on('click',callback)
      
      $("#confirmModal").modal();
    }

  },
  
  runCurrentTask: function(){
    let editor = ace.edit("AceEditor-code");
    let code = editor.getSession().getValue()
    console.log(code)
    eval(code)
  }
}

$('#runButton').off('click').on('click',jsRunner.callback.onClick_runButton);

// $('#saveAsNewButton').click(function(){
//         //var functionObj = JSON.parse($('#nocode>textarea').val());
//         //functionObj.code = $('#code>textarea').val();
        
//         var functionObj = JSON.parse(editor2.getSession().getValue());
//         functionObj.code = editor.getSession().getValue()
//         functionObj.note = editor3.getSession().getValue()
//         //selected_function_val = functionObj.title;
        
//         functions[selected_function_id] = functionObj
        
//         reqObj = {
//           'function':{
//             'id': selected_function_id,
//             'obj': functionObj
//           },
//           'method': 'new'
//         }
        
//         //console.log(reqObj)
        
//         $.post( "/js_runner",reqObj)
//         .fail(function() {
//            alert('Error in saving!!!');
//          })
//         .done(  function( resp ) {
//           //$( ".result" ).html( data );
//           console.log(resp)
//           if (resp.hasOwnProperty('functions')){
//             functions = resp.functions;
//             //console.log(functionObj)
//             selected_function_val = functionObj.title;
//             update_functions();
//             alert('Save Successfully. Please Reload page!!!');
//           }else{
//             alert('Error in saving!!!');
//           }
          
//         });
        
// })

$('#saveAsNewButton').off('click').on('click',jsRunner.callback.onClick_saveAsNewButton);
$('#saveButton').off('click').on('click',jsRunner.callback.onClick_saveButton);
$('#deleteButton').off('click').on('click',jsRunner.callback.onClick_deleteButton);

// ENABLE BOOTSTRAP Popover
$(function () {
  $('[data-toggle="popover"]').popover()
})
// $('#loadDefaultButton').click(function(){
  
  
//   //var functionObj = JSON.parse($('#nocode>textarea').val());
//   //functionObj.code = $('#code>textarea').val();
  
//   var functionObj = JSON.parse(editor2.getSession().getValue());
//   //- functionObj.code = editor.getSession().getValue()
//   functionObj.note = editor3.getSession().getValue()
  
//   //selected_function_val = functionObj.title;
//   //  functionObj.title = selected_function_val;
  
  
  
//   selected_function_id = functions.findIndex(x => x.title==$('#functionsSelector select').find("option:selected").val());
//   //- selected_function_id = x.title==$('#functionsSelector select').find("option:selected").val()
//   //- console.log("selected_function_id:" + selected_function_id)
   
//   var str4dialog = "Do you want to load default values of:\n=======================\n";
  
  
//   str4dialog += JSON.stringify(functionObj.inputs, null, "\t" )
  
//    var r = confirm(str4dialog);
//    if (r == true) {
//      //functions[selected_function_id] = functionObj
     
//      Object.keys(functionObj.inputs).forEach(function(key){
//        console.log(key)
//        $("#input_"+key).val(functionObj.inputs[key]["default"])
//        })
//      //console.log(reqObj)
     
     
//    } else {
//        return;
//    }        
// });

// $('#saveDefaultButton').click(function(){
  
  
//   //var functionObj = JSON.parse($('#nocode>textarea').val());
//   //functionObj.code = $('#code>textarea').val();
  
//   var functionObj = JSON.parse(editor2.getSession().getValue());
//   //- functionObj.code = editor.getSession().getValue()
//   functionObj.note = editor3.getSession().getValue()
  
//   //selected_function_val = functionObj.title;
//   //  functionObj.title = selected_function_val;
  
  
  
//   selected_function_id = functions.findIndex(x => x.title==$('#functionsSelector select').find("option:selected").val());
//   //- selected_function_id = x.title==$('#functionsSelector select').find("option:selected").val()
//   //- console.log("selected_function_id:" + selected_function_id)
   
//   //- var str4dialog = "Do you want to load default values of:\n=======================\n";
//   //- 
//   //- 
//   //- str4dialog += JSON.stringify(functionObj.inputs, null, "\t" )
//   //- 
//   //-  var r = confirm(str4dialog);
//   //-  if (r == true) {
//      //functions[selected_function_id] = functionObj
     
//      Object.keys(functionObj.inputs).forEach(function(key){
//        console.log(key)
//        functionObj.inputs[key]["default"] = $("#input_"+key).val()
//      })
       
//      $('#myModal').modal() 
     
//      var string4editor = JSON.stringify(functionObj.inputs,null, "\t")
     
//      $("#myModal .modal-title").text("Copy following to 'inputs' in 'No-Code'")
//      editorModal.setValue(string4editor); 
     
//      $("#myModal button.load").off().on("click",function(){
//        el.find(".form-body").val(editor.getValue())
       
//        $('#myModal').modal('hide')
//      })
//      //console.log(reqObj)
     
     
//   //-  } else {
//   //-      return;
//   //-  }        
// })