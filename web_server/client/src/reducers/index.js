import { combineReducers } from 'redux';
import searchTerm from './reducer_search_term';
import startTerm from './reducer_startdate_term';
import endTerm from './reducer_enddate_term';
import posNews from './reducer_pos_news';
import neuNews from './reducer_neu_news';
import negNews from './reducer_neg_news'

const rootReducer = combineReducers({
    searchTerm,
    startTerm,
    endTerm,
    posNews,
    neuNews,
    negNews
})

export default rootReducer;