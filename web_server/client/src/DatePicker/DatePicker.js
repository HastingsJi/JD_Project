import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
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

    componentWillUpdate() {
        console.log('zz')
        if (this.state.startDate !== null & this.state.endDate !== null){
            // console.log(this.state.startDate.toISOString())
            this.props.trackStartDateTerm(this.state.startDate.toISOString());
            this.props.trackEndDateTerm(this.state.endDate.toISOString());
            
        }
        
        
    }
    

    render() {
        return (
            
            <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
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




