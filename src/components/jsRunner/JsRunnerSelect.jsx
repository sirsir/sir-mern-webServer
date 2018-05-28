import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

// import ReactWidgets from 'react-widgets';
// let { Combobox } = ReactWidgets
// import 'react-widgets/dist/css/react-widgets.css';
// import DropdownList from 'react-widgets/lib/DropdownList';
// import Combobox from 'react-widgets/lib/Combobox';

import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

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

  onSelect = (v, option) => {
    // console.log('onSelect', v, option);
    // console.log( option.key);
    this.props.store.selectTask(option.key)
    localStorage.setItem('selectedTask',v)
    localStorage.setItem('selectedTaskId',option.key)
  }

  render() {
    let previousSelected = localStorage.getItem('selectedTask') || ""
    return (
      <div>
        <Select
          style={{ width: "90%" }}
          onSelect={this.onSelect}
          notFoundContent=""
          allowClear
          placeholder=""
          value={previousSelected}
          combobox
          backfill
        >
        {this.props.store.titles.map((t,i)=>{
          return (
            <Option value={t.title} key={t._id}>
              <span style={{ 
                  'font-size': '0.7em'
                }}
              >{t.title}</span>
            </Option>)
          })}
          
        </Select>
      </div>      
    );
  }
}

export default JsRunnerSelect;