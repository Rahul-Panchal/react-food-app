
import { CREATE, RETRIEVE, RETRIEVEONE, UPDATE, DELETE } from "../contants/actionTypes";

const initialState = {
    name                : null,
    status              : null,
    isReadyForUpdate    : false,
    allFoodCategoreis   : null,
    // foodCategoryDetails : null,
    isLoaded            : false
};


const foodCategoryReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'UPDATE_INPUT': 
            console.log('action.payload')
            console.log(action.payload)
            return {
                ...state,
                // userDetails : {
                    // ...state.userDetails,
                    [action.payload.field_name] : action.payload.field_value
                // }
            }

        case RETRIEVE: 
            console.log(' RETRIEVE action.payload')
            console.log(action.payload)
            return {
                ...state,
                isLoaded : true,
                allFoodCategoreis : action.payload,
            }
            
        case RETRIEVEONE: 
            console.log(' RETRIEVEONE action.payload')
            console.log(action.payload)
            return {
                ...state,
                isReadyForUpdate : true,
                name : action.payload.name,
                status : action.payload.status,
            }

            

        case DELETE: 
            console.log(' DELETE action.payload')
            console.log(action.payload)
            return {
                ...state,
                isLoaded : true,
                allFoodCategoreis : action.payload,
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

// export default foodCategoryReducer;
// export  default initialState;

export { foodCategoryReducer, initialState };
