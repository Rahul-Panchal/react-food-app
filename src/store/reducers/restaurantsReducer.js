const initialState = {
    isReadyForEdit      : null,
    statesList          : null,
    stateId             : null,
    citiesList          : null,
    countriesList       : null,
    allRestaurantsList  : null,
    restaurantDetails   : {
        _id                       : "",
        restaurant_name           : "",
        owner_id                  : "",
        restaurant_opening_time   : "",
        restaurant_closing_time   : "",
        restaurant_current_status : "",
        banner_image              : "",
        contact_no                : "",
        email_id                  : "",
        address                   : "",
        city_id                   : "",
        state_id                  : "",
        pincode                   : "",
        country_id                : "",
        delivery_area_in_km       : "",
        minimum_order_value       : "",
        restaurant_desc           : "",
        food_image                : "", // [ Food Image Upload and Menu ]
        delivery_maximum_time     : "", // [on show website Like 30 min]
        gst_percentage            : "",
        delivery_charge           : "",
        is_active                 : "",     
    },
};


const restaurantsReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'UPDATE_INPUT': return {
            ...state,
            restaurantDetails : {
                ...state.restaurantDetails,
                [action.payload.field_name] : action.payload.field_value
            }
        }

        case 'GET_RESTAURANT_DETAIL' : 
        // console.log(...action.payload);
        return {
            
            ...state,
            isReadyForEdit : true,
            stateId : [action.payload.state_id],
            restaurantDetails : {
                ...state.restaurantDetails,
                ...action.payload,
            }
        }

        case 'GET_USER_TYPE_LIST': return {
            ...state,
            userTypesList : action.payload,
        }
        
        case 'GET_ALL_RESTAURANT_LIST': return {
            ...state,
            allRestaurantsList : action.payload,
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
            restaurantDetails : {
                ...state.restaurantDetails,
                state_id : action.payload.state_id,
            }
        }
        case 'IMAGE_UPLOAD': return {
            ...state,
            restaurantDetails : {
                ...state.restaurantDetails,
                [action.payload.field_name] : action.payload.field_value
            }
        }
        case 'SET_DOB': return {
            ...state,
            restaurantDetails : {
                ...state.restaurantDetails,
                dob : action.payload
            }
        }
        case 'USER_FORM_SUBMIT' :return {
            ...state,
            restaurantDetails : {
                ...state.restaurantDetails,
                // dob : action.payload
            }
        }
        
        default:
            return state;
    }
    // if(action.type==='UPDATE_INPUT'){
    //     return{
    //         ...state,
    //         restaurantDetails : {
    //             ...state.restaurantDetails,
    //             [action.payload.field_name] : action.payload.field_value
    //         }
    //     }
    // }
    // return state;
}

export default restaurantsReducer;
