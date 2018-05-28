import React from 'react';

import { observer } from "mobx-react";

@observer
class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput    
    this.onKeyPress_Input4Search = this.onKeyPress_Input4Search.bind(this);
    this.onChange_Input4Search = this.onChange_Input4Search.bind(this);
    this.onClick_A4ClearSearch = this.onClick_A4ClearSearch.bind(this);
    // this.onInput = this.onInput.bind(this);

  }

  onChange_Input4Search(e){    
    this.props.store.keyword4search =  e.target.value
    // console.log(e.target.value)
  }

  onKeyPress_Input4Search(e){    
    if (e.key === 'Enter') {
      this.props.store.search()      
    }
  }

  onClick_A4ClearSearch(){
    this.props.store.keyword4search = ""
  }

  render (){
    return (
      <section id="searchbox">        
        <div id="searchbox-box">
          <input            
            autoComplete="off" autoCorrect="off"
            className="form-control input-lg" id="search-input"
            placeholder="Type in keyword here in format 'keyword1&&keyword2&&-keywordX1'"
            spellCheck="false" tabIndex="1"
            onKeyPress={this.onKeyPress_Input4Search}
            onChange={this.onChange_Input4Search}
            value={this.props.store.keyword4search}
        />
        </div>
       <div id="searchbox-search-icon">
          <div className="table">
            <a aria-hidden="true"
              className="fa fa-search"
              href="#" onClick={this.searchSearchBox}
              id="search-clear">
                <span className="sr-only">
                  Search
                </span>
            </a>
          </div>
       </div>
       <div id="searchbox-clear-icon">
          <div className="table">
            <a aria-hidden="true" className="fa fa-times-circle"
             href="#" onClick={this.onClick_A4ClearSearch} id="search-clear">
              <span className="sr-only">Clear search</span>
            </a>
          </div>
       </div>
      </section>

    )
  }
}


export default SearchBox;
