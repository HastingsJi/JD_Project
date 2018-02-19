export default (state=null, action)=>{
    switch (action.type){
        case "TRACK_END_DATE_TERM":
            return action.payload;
    }
    return state;
}