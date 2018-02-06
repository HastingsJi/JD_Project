export default (state=null, action)=>{
    switch (action.type){
        case "TRACK_SEARCH_TERM":
            return action.payload;
    }
    return state;
}