const initialState = {
    isReadyForEdit  : false,
    isPasswordMatch : null,
    statesList      : null,
    stateId         : null,
    citiesList      : null,
    countriesList   : null,
    userTypesList   : null,
    userStatusList  : null,
    allUsersList    : null,
    // userDetails     : {},
    userDetails     : {
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


const usersReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'UPDATE_INPUT': return {
            ...state,
            userDetails : {
                ...state.userDetails,
                [action.payload.field_name] : action.payload.field_value
            }
        }
        case 'COMPARE_PASSWORD':{
            if(state.userDetails.password === state.userDetails.confirm_password){
                return{
                    ...state,
                    isPasswordMatch: true
                }
            } else {
                return {
                    ...state,
                    isPasswordMatch: false
                }
            }
        }

        case 'GET_USER_TYPE_LIST': return {
            ...state,
            userTypesList : action.payload,
        }

        case 'GET_USER_STATUS_LIST': return {
            ...state,
            userStatusList : action.payload,
        }
        
        case 'GET_ALL_USERS_LIST': return {
            ...state,
            allUsersList : action.payload,
        }
        
        case 'GET_COUNTRY_LIST': return {
            ...state,
            countriesList : action.payload,
        }
        
        case 'GET_STATE_LIST': return {
            ...state,
            statesList : action.payload,
        }
        
        case 'GET_CITIES_LIST': return {
            ...state,
            citiesList : action.payload,
        }
        
        case 'GET_STATE_CITIES': return {
            ...state,
            citiesList  : action.payload.cities_list,
            stateId     : action.payload.state_id,
            userDetails : {
                ...state.userDetails,
                state_id : action.payload.state_id,
            }
        }
        
        case 'IMAGE_UPLOAD': return {
            ...state,
            userDetails : {
                ...state.userDetails,
                [action.payload.field_name] : action.payload.field_value
            }
        }
        
        case 'SET_DOB': return {
            ...state,
            userDetails : {
                ...state.userDetails,
                dob : action.payload
            }
        }

        case 'GET_USER_DETAIL' : 
        // console.log(...action.payload);
        return {
            
            ...state,
            isReadyForEdit : true,
            stateId : [action.payload.state_id],
            userDetails : {
                ...state.userDetails,
                ...action.payload,
            }
        }

        case 'USER_FORM_SUBMIT' : return {
            ...state,
            userDetails : {
                ...state.userDetails,
                // dob : action.payload
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

export default usersReducer;
