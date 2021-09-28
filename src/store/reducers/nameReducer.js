// const iState = {
//     name : "Rahul Panchal"
// }

// const nameReducer = (state=iState, action) =>{
//     if(action.type==='CHANGE_NAME'){
//         return{
//             name:action.payload 
//         }
//     }
//     return state;
// }

// export default nameReducer;

const nameReducer = (state='', action) =>{
    if(action.type==='CHANGE_NAME'){
        // return{
        //     name:action.payload 
        // }
        return action.payload 
    }
    return state;
}

export default nameReducer;