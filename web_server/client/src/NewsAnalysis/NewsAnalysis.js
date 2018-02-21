import React from 'react';
import ReactDOM from 'react-dom';
import './NewsAnalysis.css';
import NewsCard from '../NewsCard/NewsCard';
// import _ from 'lodash';
import { connect } from 'react-redux';
// import ReactPaginate from 'react-paginate';


var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/title')

export default class NewsAnalysis extends React.Component {

    constructor(props) {
        super(props)
        this.setPieOption = this.setPieOption.bind(this)
        this.initPieChart = this.initPieChart.bind(this)
    }

    initPieChart() {
        const { data } = this.props
        let myChart = echarts.init(this.refs.pieChart)
        let options = this.setPieOption(data)
        myChart.setOption(options)
    }

    componentDidMount() {
        this.initPieChart()
    }

    componentDidUpdate() {
        this.initPieChart()
    }

    render() {
        return (
            <div className="pie-react">
                <div ref="pieChart" style={{width: "100%", height: '500px'}}></div>
            </div>
        )
    }

    setPieOption(data) {
        return {
            title:{
              text:"News Sentiment Analysis",
              left:"center"
            },
            series : [
                {
                    name: 'data',
                    type: 'pie',
                    data: data,
                    label: {
                        normal: {
                            formatter: "{d}% \n{b}",
                        }
                    }
                }
            ]
        }
    }
}

// // export default NewsPanel;

// export default connect(mapStateToProps)(NewsAnalysis);

// function mapStateToProps(state){
//     return{
//         searchTerm: state.searchTerm,
//         startTerm: state.startTerm,
//         endtTerm: state.endtTerm,
//     }
// }