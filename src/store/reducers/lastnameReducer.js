// const iState = {
//     name : "Rahul Panchal"
// }

const lastnameReducer = (state='', action) =>{
    if(action.type==='CHANGE_LAST_NAME'){
        return action.payload
        // return{
        //     lastname:action.payload 
        // }
    }
    return state;
}

export default lastnameReducer;