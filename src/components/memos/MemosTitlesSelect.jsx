import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';


@observer
class MemosTitlesSelect extends React.Component {
  // @observable newTodoTitle = "";

  onSelect = (v, option) => {
    // console.log('onSelect', v, option);
    // console.log( option.key);
    // this.props.store.selectTask(option.key)
    // localStorage.setItem('selectedTask',v)
    // localStorage.setItem('selectedTaskId',option.key)
    this.props.store.keyword4search =  v
    this.props.store.search()
  }

  render() {
    let previousSelected = localStorage.getItem('selectedMemos') || ""
    return (
      <div>
        <label>All Titles:</label>
        <Select
          style={{ width: "90%" }}
          onSelect={this.onSelect}
          notFoundContent=""
          allowClear
          placeholder=""
          value={previousSelected}
          combobox
          backfill={false}
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

export default MemosTitlesSelect;