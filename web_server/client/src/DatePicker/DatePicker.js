import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import {trackStartDateTerm} from "../actions/track_startdate_term";
import {trackEndDateTerm} from "../actions/track_enddate_term";


class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { startDate: null, endDate:null, focusedInput:null };
    }

    // componentWillUpdate() {
    //     // console.log('zz')
    //     if (this.state.startDate !== null & this.state.endDate !== null){
    //         // console.log(this.state.startDate.toISOString())
    //         this.props.trackStartDateTerm(this.state.startDate.toISOString());
    //         this.props.trackEndDateTerm(this.state.endDate.toISOString());
            
    //     }
        
        
    // }
    
    datesChange(startDate, endDate){
        // if (startDate != null){
        //     console.log(startDate.startDate.toISOString())
        // }
        // if (endDate != null){
        //     console.log(endDate.endDate.toISOString())
        // }
        if (startDate.startDate != null){
            console.log('start: ' + startDate.startDate.toISOString());
            this.props.trackStartDateTerm(startDate.startDate.toISOString());
        }
        if (startDate.endDate != null){
            console.log('end: ' + startDate.endDate.toISOString());
            this.props.trackEndDateTerm(startDate.endDate.toISOString());
        }
        
        // console.log(endDate)
    }


    render() {
        return (
            
            <DateRangePicker
            isOutsideRange={()=>{ }}
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.datesChange({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
            
        )
    }
}




function mapDispatchToProps(dispatch){
    return bindActionCreators({trackStartDateTerm,trackEndDateTerm}, dispatch);
}

export default connect(null, mapDispatchToProps)(DatePicker); 




