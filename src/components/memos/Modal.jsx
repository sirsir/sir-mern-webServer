import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput
    // this.searchSearchBox = this.searchSearchBox.bind(this);
    // this.handleKeyPressSearchbox = this.handleKeyPressSearchbox.bind(this);
    // this.clearSearchBox = this.clearSearchBox.bind(this);
    // this.onInput = this.onInput.bind(this);

    // init state
    // this.state = {
    //   input: ''
    // };
  }

  onSubmit() {
    // this.props.onSubmit(this.state.input);
  }

  handleKeyPressSearchbox(e){
    // console.log('xxxxx')

    if (e.key === 'Enter') {
      console.log('Enter')
      this.props.store.keyword4search =  e.target.value
      this.props.store.search()
      // this.searchSearchBox()
    }
  }



  render (){
    return (
      <div className={"modal fade"+(this.props.store.isEditing?" show":"") } id={this.props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">{this.props.buttonText}</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default SearchBox;
