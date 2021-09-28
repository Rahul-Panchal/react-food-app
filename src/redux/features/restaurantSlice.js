import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import RestaurantServices from '../../store/HttpTransport/Services/RestaurantServices';

/**
 * using thunk with async and await
 * 
 * retrieveAll users List
 */
 export const retrieveAll = createAsyncThunk('restaurant/retrieveAll', async (id) => {

    console.log('retrieveAll data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await RestaurantServices.getAll();

    console.log('retrieveAll-response')
    console.log(data)
    return data;

});


/**
 * using thunk with async and await
 */
 export const retrieveOne = createAsyncThunk('restaurant/retrieveOne', async (id) => {

    const {data} = await RestaurantServices.get(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
 export const removeOne = createAsyncThunk('restaurant/removeOne', async (id) => {

    const {data} = await RestaurantServices.remove(id);

    console.log('removeOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
export const getCountriesList = createAsyncThunk('restaurant/getCountriesList', async (id) => {
    
    const countriesList = [
        {name: 'India', id: '1'}
    ];

    return  countriesList;
});


/**
 * using thunk with async and await
 */
export const getStateList = createAsyncThunk('restaurant/getStateList', async (id) => {
    const data = await fetch("http://localhost:3000/js/state.json");
    const response = await data.json();

    return response;
});

/**
 * using thunk with async and await
 */

export const getStateCities  = createAsyncThunk('restaurant/getStateCities', async  (stateId)=>{
    const data = await fetch("http://localhost:3000/js/cities.json");
    const response = await data.json();
    
    return {'state_id': stateId, 'cities_list': response}

});


/**
 * using thunk with async and await
 */
export const getCitiesList = createAsyncThunk('restaurant/getCitiesList', async (id) => {
    const data = await fetch("http://localhost:3000/js/cities.json");
    const response = await data.json();

    return response;
});

/**
 * using thunk with async and await
 */
export const getRestaurantStatusList = createAsyncThunk('restaurant/getRestaurantStatusList', async (id) => {
    
    const restaurantStatusList = [
        { id: true, name: 'Active'},
        { id: false, name: 'Not Active'},
    ];
    return restaurantStatusList
});

/**
 * using thunk with async and await
 */
export const getUserTypesList = createAsyncThunk('restaurant/getUserTypesList', async (id) => {
    
    const userTypes = [
        { id: '1', name: 'Admin'},
        { id: '2', name: 'Restaurant Managers'},
        { id: '3', name: 'Field boy'},
        { id: '4', name: 'Customer'},
    ];

    return userTypes
});

/**
 * handleUpdateAction used to update user details
 */

 export const handleUpdateAction = createAsyncThunk('restaurant/handleUpdateAction', async (restaurantData, { rejectWithValue }) => {
    try {


        console.log(restaurantData.banner_image[0]);

        var bodyFormData = new FormData();
    
        bodyFormData.append('banner_image',restaurantData.banner_image[0]);
    
        for ( var key in restaurantData ) {
            console.log(key + ' and ' + restaurantData[key]);
            bodyFormData.append(key, restaurantData[key]);
        }
        console.log('bodyFormData');
        console.log(bodyFormData);

        var {data} = RestaurantServices.update(restaurantData._id,bodyFormData);
        return data;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility

        console.log('handleUpdateAction rejectWithValue data')
        console.log(err.response.data)

        return rejectWithValue(err.response.data)
    }
});

/**
 * handleSubmitAction used to submit user details
 */

export const handleSubmitAction = createAsyncThunk('restaurant/handleSubmitAction', async (restaurantData, { rejectWithValue }) => {
    try {

        console.log(restaurantData.banner_image[0]);

        var bodyFormData = new FormData();
    
        bodyFormData.append('banner_image',restaurantData.banner_image[0]);
    
        for ( var key in restaurantData ) {
            console.log(key + ' and ' + restaurantData[key]);
            bodyFormData.append(key, restaurantData[key]);
        }
        console.log('bodyFormData');
        console.log(bodyFormData);

        console.log('restaurantData');
        console.log(restaurantData);

            var {data} = RestaurantServices.create(bodyFormData);
            return data;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility

        console.log('handleUpdateAction rejectWithValue data')
        console.log(err.response.data)

        return rejectWithValue(err.response.data)
    }
});


const restaurantSlice = createSlice({
    name : "restaurant",
    initialState : {
        isReadyForUpdate    : null,
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
        }
    },
    reducers : {
        updateInputDetails : (state, action) => {
            const key = Object.keys(action.payload)[0];
            return {
                ...state,
                restaurantDetails : {
                    ...state.restaurantDetails,
                    [key ]: action.payload[key]
                }
            };
        },
        handleImageChange : (state, action) => {
            console.log('handleImageChange is calling')
            console.log(action.payload)
            const key = Object.keys(action.payload)[0];
            // return {
            //     ...state,
            //     restaurantDetails : {
            //         ...state.restaurantDetails,
            //         [key ]: action.payload[key]
            //         // [action.payload.field_name] : action.payload.field_value
            //     }
            // }
            state.restaurantDetails.banner_image = action.payload[key];
        },
        clearFormData : (state) =>{
            state.restaurantDetails = {
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
            }
        }
    },
    extraReducers : {
        [retrieveAll.fulfilled]: (state, action) => {
            console.log('retrieveAll-extra-reducers')
            console.log(action.payload)

            state.allRestaurantsList = action.payload;
            state.isLoaded =  true;
        },
        [retrieveOne.fulfilled]: (state, action) => {
            console.log('retrieveOne-extra-reducers')
            console.log(action.payload)

            // state.allRestaurantsList  = null;
            state.restaurantDetails = action.payload;
            state.stateId = action.payload.state_id;
            state.isLoaded = false;
            state.isReadyForUpdate = true;
        },
        [handleSubmitAction.fulfilled] : (state, action) => {

            console.log('handleSubmitAction-fulfilled')
            console.log(action.payload)

            // state.allRestaurantsList  = null;
            // state.name = null;
            // state.status = null;
            // state.actionStatus = true;

        },
        [handleUpdateAction.fulfilled] : (state, action) => {

            console.log('handleUpdateAction-fulfilled')
            console.log(action.payload)

            // state.allRestaurantsList  = null;
            // state.name = null;
            // state.status = null;
            // state.actionStatus = true;

        },
        [removeOne.fulfilled] : (state, action) => {

            console.log('removeOne-fulfilled')
            console.log(action.payload)

            state.allRestaurantsList  = action.payload;
            // state.name = action.payload.name;
            state.actionStatus = true;

        },
        [getCountriesList.fulfilled] : (state, action) => {
            state.countriesList = action.payload;
            state.isLoaded =  true;
        },
        [getStateList.fulfilled] : (state, action) => {
            state.statesList = action.payload;
            state.isLoaded =  true;
        },
        [getStateCities.fulfilled] : (state, action) => {
            state.citiesList = action.payload.cities_list;
            state.stateId =  action.payload.state_id;
            state.restaurantDetails.state_id = action.payload.state_id;
        },
        [getCitiesList.fulfilled] : (state, action) => {
            state.citiesList = action.payload;
            state.isLoaded =  true;
        },
        [getRestaurantStatusList.fulfilled] : (state, action) => {
            state.restaurantStatusList = action.payload;
            state.isLoaded =  true;
        },
        [getUserTypesList.fulfilled] : (state, action) => {
            state.userTypesList = action.payload;
            state.isLoaded =  true;
        },
    }
});

export const {updateInputDetails, handleImageChange, clearFormData} = restaurantSlice.actions
export default restaurantSlice.reducer;