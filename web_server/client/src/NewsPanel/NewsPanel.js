import React from 'react';
import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';
// import _ from 'lodash';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import {bindActionCreators } from 'redux';
import {trackPosNews} from "../actions/track_pos_news";
import {trackNeuNews} from "../actions/track_neu_news";
import {trackNegNews} from "../actions/track_neg_news";



const NEWS_LIST_BATCH_SIZE = 5
const UP_THRESHOLD = 0.2
const DOWN_THRESHOLD = -0.2

class NewsPanel extends React.Component {
    constructor(props){
        super(props);                        // no props because on props taken as params 
        this.state = { news:null, pageNum:1, loadedAll:false, source:'', num: 0, startdate:'', enddate: '', slicedNews: null};        // news exsit as Newspanel's child and saved as json list
    }

    componentWillReceiveProps(nextProps){
        console.log('NP: '+nextProps.searchTerm);
        console.log('NP: '+nextProps.startTerm);
        console.log('NP: '+nextProps.endTerm);
        // console.log(this.state.source);
        if (nextProps.searchTerm && nextProps.startTerm && nextProps.endTerm != null){
            this.setState({source: nextProps.searchTerm, startdate:nextProps.startTerm,enddate:nextProps.endTerm}, function(){
                this.loadAllNews();
            });
        }

        
    }



    componentDidMount() {

        // console.log('zzz')
        this.loadNumNews();

    }

    loadNumNews(){
        console.log('num of news')
        const news_url = 'http://' + window.location.hostname + ':3000' +
        '/news/source/' + this.state.source ;

        const request = new Request(
        encodeURI(news_url),
        {
            method:'GET',
     
        });

        fetch(request)
        .then(res => res.json())
        .then(num => {
            // if (!news || news.length == 0) {
            // this.setState({loadedAll:true});
            // }

            this.setState({
       
            num: num
            });
            console.log(num)
        });
    }

    loadMoreNews() {
        // console.log('yyy')
        // if (this.state.loadedAll == true) {
        //   return;
        // }

        // /keyword/:keyword/startdate/:startdate/enddate/:enddate
    
        const news_url = 'http://' + window.location.hostname + ':3000' +
            '/news/keyword/' + this.state.source + '/startdate/' + this.state.startdate + '/enddate/' + this.state.enddate;
    
        const request = new Request(
          encodeURI(news_url),
          {
            method:'GET',
          });
    
        fetch(request)
          .then(res => res.json())
          .then(news => {
            if (!news || news.length == 0) {
              this.setState({loadedAll:true});
            }
    
            this.setState({
              news: news,
            //   pageNum: this.state.pageNum + 1,
            });
          });

          
      }

    loadAllNews(){
        const news_url = 'http://' + window.location.hostname + ':3000' +
        '/news/keyword/' + this.state.source + '/startdate/' + this.state.startdate + '/enddate/' + this.state.enddate;

        const request = new Request(
            encodeURI(news_url),
            {
                method:'GET',
        });

        fetch(request)
        .then(res => res.json())
        .then(news => {
            if (!news || news.length == 0) {
            this.setState({loadedAll:true});
            }

            this.setState({
                news: news,
                slicedNews: news.slice((this.state.pageNum-1)*NEWS_LIST_BATCH_SIZE, this.state.pageNum*NEWS_LIST_BATCH_SIZE)
            }, function(){
                let pos = 0;
                let neu = 0;
                let neg = 0;
                for (let i=0; i< this.state.news.length; i++){
                    if (this.state.news[i].rate > DOWN_THRESHOLD && this.state.news[i].rate < UP_THRESHOLD){
                        neu += 1
                    }else if (this.state.news[i].rate>= UP_THRESHOLD){
                        pos += 1
                    }else{
                        neg += 1
                    }
                }
                this.props.trackPosNews(pos);
                this.props.trackNeuNews(neu);
                this.props.trackNegNews(neg);

            });
            
            

            if (this.state.news == null){
                console.log ('num of news: 0' )
            }
            else{
                console.log('num of news: ' + this.state.news.length)
                console.log(this.state.slicedNews)
            }
        });
        }

    renderNews(){
        const news_list = this.state.slicedNews.map(slicedNews => {
            return(
                <a className='list-group-item' key={slicedNews.digest} href='#'>
                    <NewsCard news={slicedNews} />
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



    handlePageClick = (data) =>{
        console.log('handlepageclick')
        let dataNum = data.selected + 1
        console.log(dataNum)
        // console.log(page.selected)
        console.log('before ' + this.state.pageNum)

        
        this.setState({
            slicedNews: this.state.news.slice((dataNum-1)*NEWS_LIST_BATCH_SIZE, dataNum*NEWS_LIST_BATCH_SIZE)
        })

    }

    

    render() {
        if (this.state.news){
            return (
                <div>
                   
                    {this.renderNews()}

                    <div className="commentBox">
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={Math.ceil(this.state.news.length/ NEWS_LIST_BATCH_SIZE)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
                    </div>

                </div>
            );
        } else{
            return(
                <div>
                    {/* <p>{this.props.searchTerm} </p> */}
                    Loading...
                </div>
            );
        }
    }

}

// export default NewsPanel;

export default connect(mapStateToProps, mapDispatchToProps)(NewsPanel);

function mapDispatchToProps(dispatch){
    return bindActionCreators({trackPosNews, trackNeuNews, trackNegNews}, dispatch);
}


function mapStateToProps(state){
    return{
        searchTerm: state.searchTerm,
        startTerm: state.startTerm,
        endTerm: state.endTerm

    }
}