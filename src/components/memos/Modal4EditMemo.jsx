import React from 'react';

import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import FormEditItem from './FormEditItem';


@observer
class Modal4EditMemo extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput
    this.onClick_Button4Save = this.onClick_Button4Save.bind(this);
    this.onClick_Button4SaveAsNew = this.onClick_Button4SaveAsNew.bind(this);
    this.onClick_Button4Discard = this.onClick_Button4Discard.bind(this);
    this.onClick_Button4Delete = this.onClick_Button4Delete.bind(this);

    // init state
    // this.state = {
    //   input: ''
    // };
  }

  onClick_Button4Save(){
    var r = confirm("The existing data will be overwritten! Are you sure to overwrite?");
    if (r !== true) {
        return;
    }

    store.CRUD_update()
    .then(resp => {
      alert('Update successfully\nTitle: ' + resp.title)
    })

    $("#modal4edit").modal('hide')
  }


  onClick_Button4SaveAsNew(){
    store.CRUD_create()
    .then(resp => {
      alert('Insert successfully\nTitle: ' + resp.title)
    })

    $("#modal4edit").modal('hide')
  } 
  onClick_Button4Discard(){
    if (this.props.store.isMemoChanged){
      var r = confirm("Some change existed! All editing data will be lost! Are you sure to DISCARD?");
      if (r !== true) {
          return;
      }
    }
    

    $("#modal4edit").modal('hide')
  }
  onClick_Button4Delete (){
    var r = confirm("All exiting data will be lost! Are you sure to DELETE?");
    if (r !== true) {
        return;
    }

    store.CRUD_delete()
    .then(resp => {
      alert('Delete successfully\nTitle: ' + resp.title)
    })

    $("#modal4edit").modal('hide')
  }

  handleKeyPressSearchbox(e){
    // console.log('xxxxx')

    if (e.key === 'Enter') {
      // console.log('Enter')
      this.props.store.keyword4search =  e.target.value
      this.props.store.search()
      // this.searchSearchBox()
    }
  }

              // <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              //   <span aria-hidden="true">&times;</span>
              // </button>

  render (){
    let memo = toJS(this.props.store.editingMemo)
    return (
      <div className="modal fade" id="modal4edit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{memo.title}</h5>
              <div className='top-buttons'>
                <button className="btn btn-default save" onClick={this.onClick_Button4Save}>Save (Overwrite!)</button>
                <button className="btn btn-info saveNew" onClick={this.onClick_Button4SaveAsNew}>Save As New</button>
                <button className="btn btn-danger" onClick={this.onClick_Button4Delete}>Delete</button>
                <button type="button" className="btn btn-secondary" onClick={this.onClick_Button4Discard}>Discard</button>
              </div>
            </div>
            <div className="modal-body">
              <FormEditItem
                store={this.props.store}
              >
              </FormEditItem>
            </div>
            <div className="modal-footer">              
              <button className="btn btn-default save" onClick={this.onClick_Button4Save}>Save (Overwrite!)</button>
              <button className="btn btn-info saveNew" onClick={this.onClick_Button4SaveAsNew}>Save As New</button>
              <button className="btn btn-danger" onClick={this.onClick_Button4Delete}>Delete</button>
              <button type="button" className="btn btn-secondary" onClick={this.onClick_Button4Discard}>Discard</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default Modal4EditMemo;
