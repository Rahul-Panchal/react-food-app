export const changeFirstName = (name)=>{
    return{
        type    : 'CHANGE_NAME',
        payload : name
    }
}

export const changeLastName = (name)=>{
    return{
        type    : 'CHANGE_LAST_NAME',
        payload : name
    }
}

export const saveTokenValue = (token)=>{
    return{
        type    : 'SAVE_TOKEN_VALUE',
        payload : token
    }
}

export const removeTokenValue = ()=>{
    return{
        type    : 'REMOVE_TOKEN_VALUE',
        payload : ''
    }
}

export const updateLoggedInUserDetails = ()=>{
    return{
        type    : 'UPDATE_LOGIN_DETAILS',
        payload : ''
    }
}


/**
 * when to use thunk means need to wait for get a response from api call.
 */

// export const changeFirstName = (name)=>{
//     return (dispatch) => {
//         fetch("http://localhost:8081/users/get-users-list")
//         .then(res=>res.json())
//         .then(response=>{
//             dispatch({
//                 type    : 'CHANGE_NAME',
//                 payload : response[0].name
//             })
//         });
//     }
// }

/**
 * using thunk with async and await
 */

// export const changeFirstName = (name)=>{
//     return async (dispatch) => {
//         const data = await fetch("http://localhost:8081/users/get-users-list");
//         const response = await data.json();
//         dispatch({
//             type    : 'CHANGE_NAME',
//             payload : response[2].name
//         });
//     }
// }


// export const changeLastName = (name)=>{
//     return async (dispatch) => {
//         const data = await fetch("http://localhost:8081/users/get-users-list");
//         const response = await data.json();
//         dispatch({
//             type    : 'CHANGE_LAST_NAME',
//             payload : response[2].address
//         });
//     }
// }