import React from 'react';

import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react";

@observer
class TagsList extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput
    // this.searchSearchBox = this.searchSearchBox.bind(this);
    // this.handleKeyPressSearchbox = this.handleKeyPressSearchbox.bind(this);
    // this.clearSearchBox = this.clearSearchBox.bind(this);
    // this.toggleItem = this.toggleItem.bind(this);
    this.searchByTag = this.searchByTag.bind(this);
  }

  searchByTag(tag){
    // console.log(tag)
    this.props.store.searchByTag(tag)
  }

  render (){
    let tags = ''

    if (this.props.store.tags2count && this.props.store.totalTags !== 0){
      let max = Object.values(this.props.store.tags2count).reduce((num, count)=>{return Math.max(count, num)}, 0)
      let min = Object.values(this.props.store.tags2count).reduce((num, count)=>{return Math.min(count, num)}, max)

      // let min = this.props.store.tags2count.reduce((num, tag)=>{console.log(tag.count);console.log(Math.min(tag.count, num));return Math.min(tag.count, num)},0)
      // let max = this.props.store.tags2count.reduce((num,tag)=>{return Math.max(tag.count, num)})

      let minSize = 0.8
      let maxSize = 1.5
      tags = (
        <div className='tags'>
          Tags:
            <ul className="tags-list">
              {
                  Object.keys(this.props.store.tags2count).map((tag,idx) => {
                    let count = this.props.store.tags2count[tag]
                    let tagSize = minSize + (count-min) / (max-min) *(maxSize-minSize)
                    // console.log(tagSize)
                    return (
                      <li key={idx} style={{
                        fontSize: tagSize.toString()+'em'
                      }} >
                        <a href='#' onClick={()=>{this.searchByTag(tag)}}>{tag} <span></span></a>
                      </li>
                    )
                  })
              }
            </ul>
          </div>
        )
    }

    
    return (
      <div className={this.props.store.isShowing_tagsList? 'tags-list' : 'tags-list displayNone'} >
            {tags}
      </div>
    )
  }
}

export default TagsList;