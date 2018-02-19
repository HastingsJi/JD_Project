export default (state=null, action)=>{
    switch (action.type){
        case "TRACK_START_DATE_TERM":
            return action.payload;
    }
    return state;
}