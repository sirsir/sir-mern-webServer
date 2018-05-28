import React from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';

const ReactMarkdown = require('react-markdown')

class FormEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAceEditor : true,
      textInAceEditor : '',
      editor: 'AceEditor'
    };

    this.setTimeout_UpdateMemoDetail = null;
    this.setTimeout_UpdateMemoTags = null;

    // bind onSubmit and onInput
    this.onChange_Ace4Detail = this.onChange_Ace4Detail.bind(this);
    this.switchEditor = this.switchEditor.bind(this);
    this.onChange_Textarea4Detail = this.onChange_Textarea4Detail.bind(this);
    this.createTagCheckbox = this.createTagCheckbox.bind(this);
    this.changeCheckboxTag = this.changeCheckboxTag.bind(this);
    this.onChange_Input4Tags = this.onChange_Input4Tags.bind(this);
    this.onChange_Input4Title = this.onChange_Input4Title.bind(this);
    this.onChange_Input4Links = this.onChange_Input4Links.bind(this);
  }

  updateMemoDetail(newValue){
    if (this.setTimeout_UpdateMemoDetail){
      clearTimeout(this.setTimeout_UpdateMemoDetail)
    }

    this.setTimeout_UpdateMemoDetail = setTimeout(
      ()=>{
        this.props.store.editingMemo.detail=newValue
        // console.log('2')
      },
      1000
    )
  }

  onChange_Ace4Detail(newValue){
    this.setState({ textInAceEditor: newValue});
    this.updateMemoDetail(newValue)
  }

  switchEditor(e){
    if (this.state.editor == 'AceEditor'){
      this.setState({ editor: 'textarea'});
    }else{
      this.setState({ editor: 'AceEditor'});
    }
    // console.log(e.target)
    let editor = ace.edit("brace-editor");
    editor.renderer.updateFull()
  }

  onChange_Textarea4Detail(e){
    let newValue = e.target.value
    // this.props.store.editingMemo.detail=newValue
    // this.setState({ textInAceEditor: newValue});
    let editor = ace.edit("brace-editor");
    editor.getSession().setValue(newValue)
    
  }

  onChange_Input4Tags(e){
    if (this.setTimeout_UpdateMemoTags){
      clearTimeout(this.setTimeout_UpdateMemoTags)
    }

    let store = this.props.store
    let newValue = e.target.value
    
    let separator = ','

    let tagsNew = e.target.value.split(separator)
    tagsNew.forEach(tag=>{
      if (!store.tags2count[tag]){
        store.tags2count[tag] = 0
      }
    })

    store.editingMemo.tags = tagsNew

    this.setTimeout_UpdateMemoTags = setTimeout(
      ()=>{
        Object.keys(store.tags2count).forEach(tag=>{
          if (store.tags2count[tag] == 0 && store.editingMemo.tags.indexOf(tag) == -1 ){
            console.log('delete tag'+tag)
            delete store.tags2count[tag]
          }
        })        

        // store.tags2count.dummy_tag = store.tags2count.dummy_tag? store.tags2count.dummy_tag+1:0
      },
      2000
    )

    

  }

  onChange_Input4Title(e){
    let newValue = e.target.value
    // this.props.store.editingMemo.detail=newValue
    // this.setState({ textInAceEditor: newValue});
    this.props.store.editingMemo.title = newValue
    
  }

  onChange_Input4Links(e){
    let newValue = e.target.value
    // this.props.store.editingMemo.detail=newValue
    // this.setState({ textInAceEditor: newValue});
    this.props.store.editingMemo.links = newValue.split("\n")
    
  }

  changeCheckboxTag(tagIn){
    let tags = []
    tags = JSON.parse(JSON.stringify(this.props.store.editingMemo.tags))
    if (tags.includes(tagIn)){
      this.props.store.editingMemo.tags = tags.filter(item => item !== tagIn)
    }
    else {
      if (tagIn !== '') {
        this.props.store.editingMemo.tags.push(tagIn)
      }
    }    
  }

  createTagCheckbox(tagsAll, tagsHere){
    let thisReact = this
    // let changeCheckboxTag = this.changeCheckboxTag

    return (
      <div className='tag-checkboxes'>

        {
          Object.keys(tagsAll).map(function(tag,idx){

            let checked = tagsHere.includes(tag)?
              'checked':false;

                // onChange={thisReact.changeCheckboxTag( itemIdx, tag.tag)}

            if (tag !== ''){
              return (
                  <div key={idx}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e)=>{thisReact.changeCheckboxTag(  tag)}}
                      />
                    <label>{tag}</label>
                  </div>

              )
            }


        })
      }
      </div>

    )
  }

  render (){
    let memo = this.props.store.editingMemo
    let store = this.props.store
    // return (
    //   <div>
    //     later....
    //   </div>
    // )

    // <div className='right'>
    //       <button type="submit" className="btn-link">
    //         <a className="btn btn-default" href='#' onClick={(e) => this.props.handleSubmitEdit} aria-label="Settings">
    //           <i className="fa fa-floppy-o" aria-hidden="true"></i>
    //         </a>
    //       </button>
    //       <a className="btn btn-danger" href="#" onClick={() => {}} aria-label="Delete">
    //         cancel
    //       </a>

    //     </div>
    
    return (
        <form  >
        
        <input type="hidden" name="_id" placeholder="_id" readOnly="true" value={memo._id} />
        {
          <input type="hidden" name="idx" placeholder="idx" readOnly="true" value={memo._id} />

        }
        <div className='form-label'>Title: </div>
        <input type="text" name="title"
         placeholder="title?"
          onChange={(e)=> this.onChange_Input4Title(e)}
           defaultValue={memo.title }
           value={memo.title }
           />
        <div className='form-label'>Tags: </div>

        
          {this.createTagCheckbox(
            store.tags2count,
            memo.tags,
          )}
        

        
          <input type="text" name="tags"
           placeholder="tags (separated by ,)"
            onChange={
              (e) => this.onChange_Input4Tags(e)
            }
            value={memo.tags? memo.tags.join(','):''}
          />
        
        
        <div className='form-label'>
          <span>Detail: </span>
          <div className='btn-switchEditor' >
            <input type='button' onClick={(e) => this.switchEditor(e)} value='Switch Editor' />
          </div>
          <div className='btn-detail_preview right'>
           <input type='button' onClick={(e) => this.props.previewMarkdown(e,memo._id)} value='Markdown update' />
          </div>
        </div>


        <div className={this.state.editor == 'AceEditor' ? 'container4ace' : 'container4ace displayNone'}>
          <AceEditor
            mode="javascript"
            theme="monokai"

            defaultValue={memo.detail}
            value={this.state.textInAceEditor}
            onChange={
              this.onChange_Ace4Detail
            }
            setOptions={{
              highlightActiveLine: true,
              showLineNumbers: true,
              tabSize: 2,
              minLines: 20,
              maxLines: 40
            }}
            editorProps={{$blockScrolling: true}}
           />

         </div>


         <textarea type="text" name="detail"
          placeholder="Details?"
          className={
            this.state.editor == 'AceEditor' ? 'displayNone' : 'container4ace'
          }
          onChange={
            (e)=> this.onChange_Textarea4Detail(e)
          }
          defaultValue={memo.detail}
          value={this.state.textInAceEditor}
        />

          <div className='detail_preview'

          >
          <ReactMarkdown source={memo.detail}/>
          </div>

        <div className='form-label'>Links: </div>
        <textarea type="text" name="links"
          placeholder="related links"
          onChange={(e)=> this.onChange_Input4Links(e)}
          defaultValue={
            memo.links?
              memo.links.join('\n')
              :
              ''
          }

          />


      </form>
    )
    // return (
    //   <form onSubmit={this.props.handleSubmitEdit} >
    //     <div className='right'>
    //       <button type="submit" className="btn-link">
    //         <a className="btn btn-default" href='#' onClick={(e) => this.props.handleSubmitEdit} aria-label="Settings">
    //           <i className="fa fa-floppy-o" aria-hidden="true"></i>
    //         </a>
    //       </button>
    //       <a className="btn btn-danger" href="#" onClick={() => this.props.editItemGuiCancel( memo._id)} aria-label="Delete">
    //         cancel
    //       </a>

    //     </div>
    //     <input type="hidden" name="id" placeholder="id" readOnly="true" value={this.props.item.id} />
    //     <input type="hidden" name="idx" placeholder="idx" readOnly="true" value={memo._id} />
    //     <div className='form-label'>Title: </div>
    //     <input type="text" name="title"
    //      placeholder="title?"
    //       onChange={(e)=> {}}
    //        defaultValue={memo.title }
    //        ref=
    //        {
    //          (node)=> {
    //            this.props.setRef('_title'+memo._id, node)
    //          }
    //        }
    //        />
    //     <div className='form-label'>Tags: </div>

    //     {
    //       this.props.createTagCheckbox(
    //         this.props.state.tagsList,
    //         this.props.state.items[memo._id].tags,
    //         memo._id,
    //         this.props.changeCheckboxTag
    //       )
    //     }

    //     <input type="text" name="tags"
    //      placeholder="tags (separated by ,)"
    //       onChange={
    //         (e) => this.props.handleChangeArray(e, memo._id)
    //       }
    //       value={this.props.state.items[memo._id].tags.join(',')}
    //     />
    //     <div className='form-label'>
    //       <span>Detail: </span>
    //       <div className='btn-switchEditor' >
    //         <input type='button' onClick={(e) => this.props.switchEditor(e,memo._id)} value='Switch Editor' />
    //       </div>
    //       <div className='btn-detail_preview right'>
    //        <input type='button' onClick={(e) => this.props.previewMarkdown(e,memo._id)} value='Markdown update' />
    //       </div>
    //     </div>


    //     <div className={this.state.displayAceEditor ? 'container4ace' : 'container4ace displayNone'}>
    //       <AceEditor
    //         mode="javascript"
    //         theme="monokai"
    //         ref=
    //         {
    //           (node)=> {
    //             this.props.setRef('__detail'+memo._id, node)
    //           }
    //         }
    //         onChange={(value)=>this.props.onChange_Ace4Detail(value,memo._id)}
    //         value={memo}
    //         setOptions={{
    //           highlightActiveLine: true,
    //           showLineNumbers: true,
    //           tabSize: 2,
    //           minLines: 20,
    //           maxLines: 40
    //         }}
    //         editorProps={{$blockScrolling: true}}
    //        />

    //      </div>


    //      <textarea type="text" name="detail"
    //       placeholder="Details?"
    //       className={
    //         this.state.displayAceEditor ? 'displayNone' : 'container4ace'
    //       }
    //       onChange={
    //         (e)=> this.props.onChange_Textarea4Detail(e,memo._id)
    //       }
    //       defaultValue={memo}
    //       ref=
    //       {
    //         (node)=> {
    //           this.props.setRef('_detail'+memo._id, node)
    //         }
    //       }
    //     />

    //       <div className='detail_preview'
    //         ref=
    //         {
    //           (node)=> {
    //             this.props.setRef('__detailPreview'+memo._id, node)
    //           }
    //         }
    //       >
    //       <ReactMarkdown source={this.props.state.editingDetail}/>
    //       </div>

    //     <div className='form-label'>Links: </div>
    //     <textarea type="text" name="links"
    //       placeholder="related links"
    //       onChange={(e)=> {}}
    //       defaultValue={
    //         this.props.state.items[memo._id].links?
    //           this.props.state.items[memo._id].links.join('\n')
    //           :
    //           ''
    //       }
    //       ref=
    //       {
    //         (node)=> {
    //           this.props.setRef('_links'+memo._id, node)
    //         }
    //       }

    //       />


    //   </form>

    // )
  }
}


export default FormEditItem;
