export function trackSearchTerm(term){
    return{
        type: 'TRACK_SEARCH_TERM',
        payload: term
    }
}