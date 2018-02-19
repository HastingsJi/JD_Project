import { combineReducers } from 'redux';
import searchTerm from './reducer_search_term';
import startTerm from './reducer_startdate_term';
import endTerm from './reducer_enddate_term';

const rootReducer = combineReducers({
    searchTerm,
    startTerm,
    endTerm
})

export default rootReducer;