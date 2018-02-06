import React, { Component } from 'react';
import './SearchBar.css';

import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import {trackSearchTerm} from "../actions/track_search_term";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    render() {
        return (
            // <form className="input-group search-bar" onSubmit={(e) => {
            //     e.preventDefault();
            // }}
            // >
            //     <i className="input-group-addon glyphicon glyphicon-search" aria-hidden="true"></i>
            //     <input className="form-control"
            //         value={this.state.term}
            //         onChange={
            //             (event) => {
            //                 this.setState({ term: event.target.value});
            //                 // this.props.sendToApp(event.target.value);
            //             }
            //         }
            //     />
            //     <span className="input-group-btn">
            //         <button type="submit" className="btn btn-primay">
            //             Search
            //         </button>
            //     </span>
            //     <div class="row">In search bar component: {this.state.term}</div>
            // </form>

            <nav>
            <div class="nav-wrapper">
              <form onSubmit={(e) => {
                  e.preventDefault();
              }}>
                <div class="input-field">
                
                  <input id="search" type="search" required 
                    value = {this.state.term}
                    onChange={
                        (event) => {
                            this.setState({term:event.target.value});
                            this.props.trackSearchTerm(event.target.value);
                        }
                    }
                  />
                  <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                  <i class="material-icons">close</i>
                  
                </div>
             
                <div class="row card-panel teal lighten-2">In search bar component: {this.state.term}</div>
              </form> 
            </div>
          </nav>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({trackSearchTerm}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar); 