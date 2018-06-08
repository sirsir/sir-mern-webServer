import React from 'react';

import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";


@observer
class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput
    this.searchSearchBox = this.searchSearchBox.bind(this);
    this.handleKeyPressSearchbox = this.handleKeyPressSearchbox.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.sortItem = this.sortItem.bind(this);
    this.toggle_TagsList = this.toggle_TagsList.bind(this);


    

    // init state
    this.state = {
      input: ''
    };
  }

  toggle_TagsList(){
    this.props.store.isShowing_tagsList = ! this.props.store.isShowing_tagsList
  }


  sortItem(e,sortBy){
    this.props.store.sortMemos(sortBy)
  }

  // submit handler
  onSubmit() {
    this.props.onSubmit(this.state.input);
  }

  handleKeyPressSearchbox(e){
    // console.log('xxxxx')

    if (e.key === 'Enter') {
      // console.log('Enter')
      this.searchSearchBox()
    }
  }
  searchSearchBox(){
    let keyword = this.refs.searchbox.value

    // console.log(keyword)

    this.props.searchSearchBox(keyword)
  }
  clearSearchBox(){
    this.refs.searchbox.value = ''
  }

  toggleItem(set2collapse){
    this.props.store.memosExtension = this.props.store.memosExtension.map(ext=>{
      let extNew = ext
      if (set2collapse){
        extNew.collapse = true
      }else{
        extNew.collapse = false
      }
      return extNew
    })
  }

  render (){
    return (
      <div id="tools">
        {
          // <div id="addItemButton">
          //   <div className="table"><a aria-hidden="true" className="fa fa-plus-square" href="#" onClick={() => {this.props.toggleDisplayState('newItem')}} >Add new item</a></div>
          // </div>
        }        
        <div id="showTagsListButton">
          <div className="table"><a aria-hidden="true"
           className="fa fa-tags" href="#"
            onClick={
              () => {
                this.toggle_TagsList('tagsList')
              }
            } >
            {this.props.store.isShowing_tagsList? 'Hide tags list': 'Show all tags'}</a></div>
        </div>
        {
          // this.props.itemsIdx2show.length !== this.props.items.length ?
          // <div id="showAll">
          //   <div className="table">
          //   <a aria-hidden="true" className="fa fa-undo" href="#"
          //    onClick={this.props.showAllItems} >Show all</a></div>
          // </div>:null
        }
        { 
          this.props.store.memosExtension.reduce((boolOut, itemExt)=>{return boolOut && (! itemExt.collapse)},true) === false?
          <div id="expandAll">
            <div className="table">
            <a aria-hidden="true" className="fa fa-plus-square"
            href="#" onClick={
              () => {this.toggleItem(false)}
            } >Expand all</a></div>
          </div>
          :
          null
        }
        { 
          this.props.store.memosExtension.reduce((boolOut, itemExt)=>{return boolOut && ( itemExt.collapse)},true) === false?          
            <div id="collapseAll">
              <div className="table">
                <a aria-hidden="true" className="fa fa-minus-square" href="#"
                 onClick={() => {this.toggleItem(true)}} >
                  Collapse all
                </a>
              </div>
            </div>
            :
            null
        }
        <div id="sort">

          <div className="table">
          <div>Sort:</div>
          {
            this.props.store.sortBy !== 'title'?
            <a aria-hidden="true"
              className="fa fa-sort-alpha-down"
              href="#"
              onClick={
                (e)=>this.sortItem(e,'title')}
            ></a>
            :
            <a aria-hidden="true"
              className="fa fa-sort-alpha-down selected"
              href="#"
              onClick={
                (e)=>this.sortItem(e,'')}
            ></a>
          }
          {
            this.props.store.sortBy !== '-title'?
            <a aria-hidden="true"
              className="fa fa-sort-alpha-up"
              href="#"
              onClick={
                (e)=>this.sortItem(e,'-title')
              }
            ></a>
            :
            <a aria-hidden="true"
              className="fa fa-sort-alpha-up selected"
              href="#"
              onClick={
                (e)=>this.sortItem(e,'')
              }
            ></a>
          }
          {
            this.props.store.sortBy !== 'time'?
            <a aria-hidden="true"
              href="#"
              onClick={
                (e)=>this.sortItem(e,'time')
              }
            >
              <i className="fas fa-long-arrow-alt-down">
                <i className="fas fa-clock"></i>
              </i>
            </a>
            :
            <a aria-hidden="true"
              className='selected'
              href="#"
              onClick={
                (e)=>this.sortItem(e,'')
              }
            >
              <i className="fas fa-long-arrow-alt-down">
                <i className="fas fa-clock"></i>
              </i>
            </a>
          }
          {
            this.props.store.sortBy !== '-time'?
            <a aria-hidden="true"
              href="#"
              onClick={
                (e)=>this.sortItem(e,'-time')
              }
            >
              <i className="fas fa-long-arrow-alt-up">
                <i className="fas fa-clock"></i>
              </i>
            </a>
            :
            <a aria-hidden="true"
              href="#"
              className='selected'
              onClick={
                (e)=>this.sortItem(e,'')
              }
            >
              <i className="fas fa-long-arrow-alt-up">
                <i className="fas fa-clock"></i>
              </i>
            </a>
          }
          </div>
        </div>
      </div>

    )
  }
}


export default Toolbar;
