const initialState = {
    loggedInStatus: false, 
    user : {}
}

const loggedInUserDetailsReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'UPDATE_LOGIN_DETAILS': return {
            ...state,
            user : {
                ...state.userDetails,
                user : action.payload,
                loggedInStatus : true
            }
        }
        
        default:
            return state;
    }
    // if(action.type==='UPDATE_INPUT'){
    //     return{
    //         ...state,
    //         userDetails : {
    //             ...state.userDetails,
    //             [action.payload.field_name] : action.payload.field_value
    //         }
    //     }
    // }
    // return state;
}

export default loggedInUserDetailsReducer;