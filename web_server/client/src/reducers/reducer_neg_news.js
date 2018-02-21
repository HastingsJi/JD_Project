export default (state=null, action)=>{
    switch (action.type){
        case "TRACK_NEG_NEWS":
            return action.payload;
    }
    return state;
}