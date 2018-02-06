import { combineReducers } from 'redux';
import searchTerm from './reducer_search_term'

const rootReducer = combineReducers({
    searchTerm
})

export default rootReducer;