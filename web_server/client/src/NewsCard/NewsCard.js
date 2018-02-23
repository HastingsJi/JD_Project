import './NewsCard.css';
import React from 'react'

class NewsCard extends React.Component {

    redirectToUrl(url, event){
        event.preventDefault();
        window.open(url, '_blank');
    }

    render(){
        return(
            <div className="news-container" onClick={(event) => this.redirectToUrl(this.props.news.url, event)}>
                <div className='row'>
                <div className='col s4 fill'>
                    <img src={this.props.news.urlToImage} alt=' NOT LOAD'/>
                </div>
                <div className="col s8">
                    <div className="news-intro-col">
                    <div className="news-intro-panel">
                        <h5>{this.props.news.title}</h5>
                        <div className="news-description">
                        <p>{this.props.news.description}</p>
                        <div>
                            {this.props.news.source != null && <div className='chip light-blue news-chip'>{this.props.news.source}</div>}
                            {this.props.news.rate != null && <div className='chip light-green news-chip'>{this.props.news.rate}</div>}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default NewsCard;