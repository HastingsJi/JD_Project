import React from 'react';
import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';
// import _ from 'lodash';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';


class NewsPanel extends React.Component {
    constructor(props){
        super(props);                        // no props because on props taken as params 
        this.state = { news:null, pageNum:1, loadedAll:false, source:'', num: 0};        // news exsit as Newspanel's child and saved as json list
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.searchTerm);
        // console.log(this.state.source);
        this.setState({source: nextProps.searchTerm}, function(){
            console.log(this.state.source);
            this.loadMoreNews();
            this.loadNumNews();
        });
        
    }



    componentDidMount() {

        console.log('zzz')
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
    
        const news_url = 'http://' + window.location.hostname + ':3000' +
            '/news/source/' + this.state.source + '/pageNum/' + this.state.pageNum;
    
        const request = new Request(
          encodeURI(news_url),
          {
            method:'GET',
            // headers: {
            //   'Authorization': 'bearer ' + Auth.getToken(),
            // }
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

    handlePageClick = (data) =>{
        console.log('handlepageclick')
        let dataNum = data.selected + 1
        console.log(dataNum)
        // console.log(page.selected)
        console.log('before ' + this.state.pageNum)
        this.setState({pageNum: dataNum}, function(){
            console.log('after ' + this.state.pageNum)
            this.loadMoreNews();
        })
        
    }
    // handlePageClick = (data) => {
    //     let selected = data.selected;
    //     let offset = Math.ceil(selected * this.props.perPage);
    
    //     this.setState({offset: offset}, () => {
    //       this.loadCommentsFromServer();
    //     });
    //   };
    

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
                       pageCount={10}
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
                    <p>{this.props.searchTerm} </p>
                    {/* Loading... */}
                </div>
            );
        }
    }

}

// export default NewsPanel;

export default connect(mapStateToProps)(NewsPanel);

function mapStateToProps(state){
    return{
        searchTerm: state.searchTerm
    }
}