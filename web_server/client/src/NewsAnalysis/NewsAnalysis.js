import React from 'react';
import './NewsAnalysis.css';
import NewsCard from '../NewsCard/NewsCard';
// import _ from 'lodash';
import { connect } from 'react-redux';
// import ReactPaginate from 'react-paginate';


class NewsAnalysis extends React.Component {
    constructor(props){
        super(props);                        // no props because on props taken as params 
        this.state = { news:null,  keyword:'Trump', startdate: '2017-01-10T17:40:40.000Z', enddate:'2018-02-16T17:00:00.000Z'};        // news exsit as Newspanel's child and saved as json list
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('nextProps.startdate');
    //     // console.log(this.state.source);
    //     this.setState({startdate: nextProps.startTerm, enddate:nextProps.endtTerm}, function(){
    //         // console.log(this.state.source);
    //         // this.loadMoreNews();
    //         this.loadNews();
    //     });
        
    // }

  

    componentDidMount() {
        console.log('componentDidMount')
        this.loadNews();
        console.log(this.state.news)

    }

    loadNews(){
        // console.log('num of news')
        // '/keyword/:keyword/startdate/:startdate/enddate/:enddate'

        const news_url = 'http://' + window.location.hostname + ':3000' +
        '/news/keyword/' + this.state.keyword + '/startdate/' + this.state.startdate +
        '/enddate/' + this.state.enddate;

        const request = new Request(
        encodeURI(news_url),
        {
            method:'GET',
     
        });

        fetch(request)
        .then(res => res.json())
        .then(news => {
            // if (!news || news.length == 0) {
            // this.setState({loadedAll:true});
            // }

            this.setState({

                news: news
            });
        });
    }


    renderNews(){
        const news_list = this.state.news.map(news => {
            return(
                <a className='list-group-item' key={news.digest} href='#'>
                    <NewsCard news={news} />
                </a>
            )
        });

        return(
            <div className='container-fluid'>
                <div className='list-group'>
                {news_list}
                </div>
            </div>
        );
    }



    render() {
        if (this.state.news){
            return (
                <div>
                   
                    {this.renderNews()}   

                 
                    
                    <p>{this.state.news}</p>
                       
                </div>
            );
        } else{
            return(
                <div>
                    <p>'ssss'</p>
                    <p>{this.props.startTerm}</p>
                    <p>{this.props.endtTerm}</p>
                    {/* Loading... */}
                </div>
            );
        }
    }

}

// export default NewsPanel;

export default connect(mapStateToProps)(NewsAnalysis);

function mapStateToProps(state){
    return{
        searchTerm: state.searchTerm,
        startTerm: state.startTerm,
        endtTerm: state.endtTerm,
    }
}