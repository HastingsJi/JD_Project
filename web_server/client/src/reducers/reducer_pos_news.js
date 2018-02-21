export default (state=null, action)=>{
    switch (action.type){
        case "TRACK_POS_NEWS":
            return action.payload;
    }
    return state;
}