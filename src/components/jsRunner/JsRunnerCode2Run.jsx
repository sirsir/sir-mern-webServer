import React, { Component } from "react";
import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';



// const JsRunnerSelect = observer(({titles}) => (
//   <div>
//     // <Combobox
//     //   data={titles}
//     //   defaultValue={"orange"}
//     //   disabled={["red", "purple"]}
//     // />
//     <ul>
//       {
//         titles?
//           titles.map(t=> (
//             <li>
//               {t}
//             </li>
//           ))
//           :null
//       }
//     </ul> 
 // <ul>
 //          {
 //            this.props.store.titles?
 //              this.props.store.titles.map(t=> (
 //                <li>
 //                  {t}
 //                </li>
 //              ))
 //              :null
 //          }
 //        </ul> 
//   </div>
// ));


// <Select
//           disabled={this.state.disabled}
//           style={{ width: 500 }}
//           onChange={this.onChange}
//           onSelect={this.onSelect}
//           onInputKeyDown={this.onKeyDown}
//           notFoundContent=""
//           allowClear
//           placeholder="please select"
//           value={this.state.value}
//           combobox
//           backfill
//         >

// <span style={'background-color:'+(i%2==0?'azure;':'blue;') }>{t}</span>
// <span style={i%2==0?
//               { 
//                 'background-color': 'azure',
//                 'font-size': '0.7em'
//               }
//               :
//               { 
//                 'background-color': 'white',
//                 'font-size': '0.7em'
//               }
//             }>{t}</span>

@observer
class JsRunnerSelect extends React.Component {
  // @observable newTodoTitle = "";
 getTask = function(){
  return toJS(this.props.store.task)
 }

 // onChange = function(newValue) {
 //      console.log('change',newValue);
 //    }

  renderCode = function(task){
    return (
      <div>
        <label>Code:</label>
        <AceEditor
          width="80%"
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          name="AceEditor-code"
          editorProps={{$blockScrolling: true}}
          value={task.code? task.code:null}
        />
      </div>
    )
  }

  renderNoCode = function(task){
    let {note,code,...nocode} = task
    nocode = JSON.stringify(nocode, null, "  ")

    return (
      <div>
        <label>NoCode:</label>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          name="AceEditor-nocode"
          editorProps={{$blockScrolling: true}}
          value={nocode}
        />
      </div>
    )

  }

  renderNote = function(task){
    return (
      <div>
        <label>Note:</label>
        <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.onChange}
            name="AceEditor-note"
            editorProps={{$blockScrolling: true}}
            value={task.note? task.note:''}
        />
      </div>
    )
  }




  render() {
    let task = this.getTask();

    // if (! task){
    //   return <div>No task selected yet!</div>
    // }
    // {this.renderCode(task)}
    //     {this.renderNoCode(task)}
    //     {this.renderNote(task)}
    return (
      <div>
        <button className="btn btn-default save" id="saveButton">Save (Overwrite!)</button>
        <button className="btn btn-info saveNew" id="saveAsNewButton">Save As New</button>
        <button className="btn btn-danger" id="deleteButton">Delete</button>
        <button className="btn btn-primary disabled" id="loadDefaultButton" data-toggle="popover" data-placement="top" data-content="UNDER CONSTRUCTION!">Load Default</button>
        <button className="btn btn-primary disabled" id="saveDefaultButton" data-toggle="popover" data-placement="top" data-content="UNDER CONSTRUCTION!">String to Replace Default</button>
        
        {task? this.renderCode(task):null}
        {task? this.renderNoCode(task):null}
        {task? this.renderNote(task):null}
      </div>      
    );
  }
}

export default JsRunnerSelect;