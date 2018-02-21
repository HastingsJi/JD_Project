export default (state=null, action)=>{
    switch (action.type){
        case "TRACK_NEU_NEWS":
            return action.payload;
    }
    return state;
}