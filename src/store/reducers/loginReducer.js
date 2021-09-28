const initialState = {
    username: '',
    password: '',
    loggedInUserStatus : false,
    loggedInUserDetails : {
        // name     : '',
        // lastname : '',
        token           : '',
        _id             : "",
        name            : "",
        username        : "",
        email_id        : "",
        contact_no      : "",
        password        : "",
        confirm_password: "",
        // dob             : "",
        state_id        : "",
        city_id         : "",
        // age             : "",
        address         : "",
        salary          : "",
        profile_image   : "",
        user_type       : "",
        is_active       : "",
        pin_code        : "",
        country_id      : "",
    },
};


const loginReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'UPDATE_INPUT': 
            return {
                ...state,
                // userDetails : {
                    // ...state.userDetails,
                    [action.payload.field_name] : action.payload.field_value
                // }
            }
        case 'LOGOUT' :    
            return {
                ...state,
                loggedInUserStatus: false,
                loggedInUserDetails : {
                    ...state.loggedInUserDetails,
                    token : '',
                    name :  ''
                }
            }
        case 'FORM_SUBMIT' :
            console.log('form submit form login reducer');
            console.log(action.payload);    
            return {
                ...state,
                loggedInUserStatus: true,
                loggedInUserDetails : {
                    ...state.loggedInUserDetails,
                    ...action.payload.user,
                    token : action.payload.token,
                    // name :  action.payload.user.name
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

export default loginReducer;
