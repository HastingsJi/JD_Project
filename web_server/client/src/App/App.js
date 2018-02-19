import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import React from 'react';
import './App.css';
import NewsPanel from '../NewsPanel/NewsPanel';
import SearchBar from '../SearchBar/SearchBar';
import DatePicker from '../DatePicker/DatePicker';
import NewsAnalysis from '../NewsAnalysis/NewsAnalysis'
import { connect } from 'react-redux';

class App extends React.Component {
    // constructor(){
    //     super();                        // no props because on props taken as params 
    //     // this.state = { source:'bbc-news'};        // news exsit as Newspanel's child and saved as json list
    // }


    
    render (){
        return (

     
                <div className='container'>
                    <SearchBar />
                    <NewsPanel  />   
                    {/* <DatePicker /> */}
                    {/* <NewsAnalysis /> */}
                    {/* <p>{this.props.startTerm}</p> */}
                    {/* {this.props.endtTerm} */}
                    
                </div>
        );
    }
}

// export default App;

export default connect(mapStateToProps)(App);

function mapStateToProps(state){
    return{
        searchTerm: state.searchTerm,
        startTerm: state.startTerm,
        endtTerm: state.endtTerm,


    }
}
