const newState = {
    token : ''
}

const tokenReducer = (state = newState, action) =>{
    if(action.type==='SAVE_TOKEN_VALUE'){
        // return{
        //     name:action.payload 
        // }
        return action.payload 
    }

    if(action.type==='GET_TOKEN_VALUE'){
        return{
            token : action.payload,
            ...state
        }
        
    }

    if(action.type==='REMOVE_TOKEN_VALUE'){
        return{
            token : action.payload,
            ...state
        }
        
    }

    return state;
}

export default tokenReducer;