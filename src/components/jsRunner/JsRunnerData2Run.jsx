import React, { Component } from "react";
import { observable, action, toJS} from "mobx";
import { observer } from "mobx-react";

import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

import { Form, Text, Radio, RadioGroup, TextArea, Checkbox , Select as Select2} from 'react-form';


@observer
class JsRunnerData2Run extends React.Component {
  // @observable newTodoTitle = "";

  // onSelect = (v, option) => {
  //   // console.log('onSelect', v, option);
  //   // console.log( option.key);
  //   this.props.store.selectTask(option.key)
  // }
// <Select2 field="status" id="select-input-status" options={task.inputs[key].values} className="mb-4" />

// element

  outputs = null

  input2element = (input,key,inputORoutput,idx)=>{
    let element = null
    let tooltip = ''

    let localStarageData = localStorage.getItem(inputORoutput+'_'+key) || ''

    switch(input.type) {
      case 'input':
      case 'textbox':
          // element =  <Text field="firstName" placeholder='First Name' />;
          element = <input type="text" key={idx} className="form-control" id={inputORoutput+'_'+key} title={tooltip} data-toggle="tooltip" placeholder={inputORoutput+'_'+key} />
          break;
      case 'select':
          element = <Select
            id={inputORoutput+'_'+key}  
            key={idx}
            style={{ width: 500 }}
            onSelect={this.onSelect}
            notFoundContent=""
            allowClear
            placeholder=""
            value={localStarageData}
            combobox
            backfill
          >
            {input.values.map((t,i)=>{
              return (
                <Option value={t} key={i}>
                  <span style={{ 
                      'font-size': '0.7em'
                    }}
                  >{t}</span>
                </Option>)
            })}            
          </Select>;
          break;
      case 'textarea':
          element= <textarea key={idx} type="text" className="form-control" id={inputORoutput+'_'+key} rows="10" placeholder={inputORoutput+'_'+key} defaultValue={localStarageData}></textarea>;
          break;
      case 'iframe':
          element= <div key={idx} className="embed-responsive embed-responsive-16by9"><iframe key={idx} id={inputORoutput+'_'+key} className="embed-responsive-item" src="" style="zoom:0.60" width="99.6%" height="250" frameborder="1px"></iframe></div>;
          break;
      default:
          element = null;
          break;
    }
    return (
      <div key={idx}>
        <label >{ input.label || key }</label>  
        {element}
      </div>
    )
  }

  inputs2form = (task) => {
    // if (val.type == "input"){
    //     str_html2append += '<input type="text" class="form-control" id="'+io+'_'+key+'" title="' + tooltip + '" data-toggle="tooltip" placeholder=""'+io+'_'+key+'"">'
        
    //   }else if (val.type == "textarea"){
    //     str_html2append += '<textarea type="text" class="form-control" id="'+io+'_'+key+'" rows="10" placeholder="'+io+'_'+key+'"></textarea>'
        
    //   }else if (val.type == "iframe"){
    //     str_html2append += '<div class="embed-responsive embed-responsive-16by9"><iframe id="'+io+'_'+key+'" class="embed-responsive-item" src="" style="zoom:0.60" width="99.6%" height="250" frameborder="1px"></iframe></div>'
        
    //   }else if (val.type == "select"){
    //     str_html2append += ': <select id="'+io+'_'+key+'">'
        
    //     $.each(val.values,function(i_choice,choice){
    //       str_html2append += '<option value="'+choice+'">'+choice+'</option>'
    //     });
    //     str_html2append += '</select>'
    //   }else if (val.type != ""){
    //     str_html2append += '<div class="embed-responsive embed-responsive-16by9"><'+val.type+' id="'+io+'_'+key+'" class="embed-responsive-item" src="" style="zoom:0.60" width="99.6%" height="250" frameborder="1px"></'+val.type+'></div>'
        
    //   }

    return Object.keys(task.inputs).map((key,idx)=>{
      return this.input2element(task.inputs[key],key,"input",idx)
    })

  }

  outputs2form = (task) => {

    return Object.keys(task.outputs).map((key,idx)=>{
      return (
        <div className="output" key={idx}>
          { this.input2element(task.outputs[key],key,"output",idx) }
        </div>
      )
    })

  }

  getInputs = () =>{
    let task = toJS(this.props.store.task)
    if (! task){
      return null
    }
    if (! task.inputs){
      return null
    }

    // return Object.keys(task.inputs).map(key=>{
    //     return <span>___{key}</span>
    //   })
    // { 
    //           if (task.inputs[key].type == 'input'){
    //             return <Text field="firstName" placeholder='First Name' />
    //           }
    //         }
    // let objReturn = <Form render={({submitForm }) => (
    //   <form onSubmit={submitForm}>
    //     <Text field="firstName" placeholder='First Name' />
    //     <Text field="lastName" placeholder='Last Name' />
    //     <RadioGroup field="gender">
    //       <Radio value="male" />
    //       <Radio value="female" />
    //     </RadioGroup>
    //     <TextArea field="bio" />
    //     <Checkbox field="agreesToTerms" />
    //     <button type="submit">Submit</button>
    //     {
    //       this.inputs2form(task)
    //     }
    //   </form>
    // )} />

    return (
      <div>
        { task.inputs? this.inputs2form(task):null}
        { task.outputs? this.outputs2form(task):null}
      </div>
    )
  }


  render() {
    return (

      <div>
        { this.getInputs()}
        
      </div>      
    );
  }
}

export default JsRunnerData2Run;