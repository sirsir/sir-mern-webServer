import React, { Component } from "react";
import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";

import brace from 'brace';
import AceEditor from 'react-ace';

import Sugar from 'sugar'

import 'brace/mode/javascript';
import 'brace/theme/monokai';


// import Toolbar from './Toolbar';
import FormNewItem from './FormNewItem';
// import FormEditItem from './FormEditItem';
import ItemLinks from './ItemLinks';
import ItemTags from './ItemTags';

const ReactMarkdown = require('react-markdown')

@observer
class MemoItems extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput

    this.onClickEdit = this.onClickEdit.bind(this);
    


  }



  handleKeyPressMemoItems(e){
    // console.log('xxxxx')

    if (e.key === 'Enter') {
      console.log('Enter')
      this.props.store.keyword4search =  e.target.value
      this.props.store.search()
    }
  }


  onClickEdit(itemsIdx,e){
    e.stopPropagation() 
    e.preventDefault()
    store.startEditItem( itemsIdx)
    $('#modal4edit').modal('show');

    let editor = ace.edit("brace-editor");
    editor.getSession().setValue(this.props.store.editingMemo.detail)
    console.log("Finish onClickEdit")
  }



  render (){
    let items = toJS(this.props.store.memos)
    // let itemsExt = toJS(this.props.store.memosExtension)
    let store = this.props.store

    return (
      <section className='display-item'>
        <div className="wrapper">
          <ul>
            {items.map((item,idx) => {
              // let item = memo
              // let itemExt = itemsExt[idx]
              let itemExt = store.getMemosExtension(item._id)              
              // let itemExt = itemsExt[item._id]
              let itemsIdx = item._id

              if (! itemExt || ! item){
                return null;
              }
              // console.log(item)

              return (
                <li key={idx} >
                  <div className={itemExt.editMode ? 'present-mode displayNone' : 'present-mode'}>
                    <div className='titlebar' onClick={() => store.toggleCollapseExpand( item._id)}>
                      <div className='title'>{item.title} </div>
                      {
                        /*
                        item.owner === this.state.user.uid || item.user === this.state.user.displayName || item.user === this.state.user.email ?
                        */
                        <div className='right'>
                          <div className="itemsIdx">
                            
                            {item.updated_at?Sugar.Date.long(new Date(item.updated_at)):null}
                            
                          </div>
                          <div className="buttons-edit-delete">
                            <a className="btn btn-default" href='#' onClick={this.onClickEdit.bind(this,itemsIdx)} aria-label="Settings">
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </a>
                            <a className="btn btn-default" href="#" onClick={this.onClickEdit.bind(this,itemsIdx)} aria-label="Delete">
                              <i className="fa fa-trash-alt" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      }
                    </div>
                    <div className={itemExt.collapse ? 'content displayNone' : 'content'}>
                      <div>
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <div className='detail'>
                          <ReactMarkdown source={item.detail} />
                        </div>
                      </div>
                      <ItemLinks links={item.links}>
                      </ItemLinks>
                      <ItemTags tags={item.tags}>
                      </ItemTags>
                    </div>
                  </div>
                  <div className={itemExt.editMode ? 'edit-mode' : 'edit-mode displayNone'}>
                    <div className='titlebar' onClick={() => store.toggleCollapseExpand( idx)}>
                      <div className='title'>{item.title}</div>
                      {
                        /*
                        item.owner === this.state.user.uid || item.user === this.state.user.displayName || item.user === this.state.user.email ?
                        */
                        <div className='right'>
                          <a className="btn btn-default" href='#' onClick={(e) => this.editItemGui( e, itemsIdx)} aria-label="Settings">
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </a>
                          <a className="btn btn-danger" href="#" onClick={(e) => this.removeItem(e, item.id)} aria-label="Delete">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </a>
                        </div>
                      }
                    </div>

                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

    )
  }
}


export default MemoItems;
