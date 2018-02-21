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
    constructor(){
        super();                        // no props because on props taken as params 
        // this.state = { source:'bbc-news'};        // news exsit as Newspanel's child and saved as json list
        this.state = {news : true, data : [
            {value: 0, name: "Positive"},
            {value: 0, name: "Neutral"},
            {value: 0, name: "Negative"}
          ],  pos:0, neu:0, neg: 0}
    }

    componentWillReceiveProps(nextProps){
        console.log('NP: '+nextProps.posNews);
        console.log('NP: '+nextProps.neuNews);
        console.log('NP: '+nextProps.negNews);
        // console.log(this.state.source);
        if (nextProps.posNews && nextProps.neuNews && nextProps.negNews != null){
            this.setState({
                
                // pos: nextProps.posNews, neu:nextProps.neuNews, neg:nextProps.neg
                data: [
                    {value: nextProps.posNews, name: "Positive"},
                    {value: nextProps.neuNews, name: "Neutral"},
                    {value: nextProps.negNews, name: "Negative"}
                ]

            }, function(){
                this.renderComponent();
            });
        }

        
    }


    handleClick(){
        if (this.state.news == true){
            this.setState({news: false})
        }else{
            this.setState({news: true})
        }

    }

    renderComponent(){
        let ComponentToRender;
        if (this.state.news){
            ComponentToRender = <NewsPanel  />
        }else{
            ComponentToRender = <NewsAnalysis data={this.state.data}/>
        }


        return (

     
                <div className='container'>
                    <SearchBar />
                    <DatePicker />
                    <button type="button" onClick={()=>this.handleClick()}>
                        Toggle
                    </button> 

                    {ComponentToRender}
                    
                </div>
        );
    }
    
    render (){
        return (
            <div>
                {this.renderComponent()}
            </div>
        )
    }
}

// export default App;

export default connect(mapStateToProps)(App);

function mapStateToProps(state){
    return{
        searchTerm: state.searchTerm,
        startTerm: state.startTerm,
        endtTerm: state.endtTerm,

        posNews: state.posNews,
        neuNews: state.neuNews,
        negNews: state.negNews
    }
}
