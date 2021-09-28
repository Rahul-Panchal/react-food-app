import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import FoodProductServices from '../../store/HttpTransport/Services/FoodProductServices';

/**
 * using thunk with async and await
 * 
 * retrieveAll users List
 */
 export const retrieveAll = createAsyncThunk('foodProduct/retrieveAll', async (id) => {

    console.log('retrieveAll data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodProductServices.getAll();

    console.log('retrieveAll-response')
    console.log(data)
    return data;

});


/**
 * using thunk with async and await
 */
 export const retrieveOne = createAsyncThunk('foodProduct/retrieveOne', async (id) => {

    const {data} = await FoodProductServices.get(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
 export const removeOne = createAsyncThunk('foodProduct/removeOne', async (id) => {

    const {data} = await FoodProductServices.remove(id);

    console.log('removeOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
export const getCountriesList = createAsyncThunk('foodProduct/getCountriesList', async (id) => {
    
    const countriesList = [
        {name: 'India', id: '1'}
    ];

    return  countriesList;
});


/**
 * using thunk with async and await
 */
export const getStateList = createAsyncThunk('foodProduct/getStateList', async (id) => {
    const data = await fetch("http://localhost:3000/js/state.json");
    const response = await data.json();

    return response;
});

/**
 * using thunk with async and await
 */

export const getStateCities  = createAsyncThunk('foodProduct/getStateCities', async  (stateId)=>{
    const data = await fetch("http://localhost:3000/js/cities.json");
    const response = await data.json();
    
    return {'state_id': stateId, 'cities_list': response}

});


/**
 * using thunk with async and await
 */
export const getCitiesList = createAsyncThunk('foodProduct/getCitiesList', async (id) => {
    const data = await fetch("http://localhost:3000/js/cities.json");
    const response = await data.json();

    return response;
});

/**
 * using thunk with async and await
 */
export const getFoodProductStatusList = createAsyncThunk('foodProduct/getFoodProductStatusList', async (id) => {
    
    const foodProductStatusList = [
        { id: true, name: 'Active'},
        { id: false, name: 'Not Active'},
    ];
    return foodProductStatusList
});

/**
 * using thunk with async and await
 */
export const getUserTypesList = createAsyncThunk('foodProduct/getUserTypesList', async (id) => {
    
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

 export const handleUpdateAction = createAsyncThunk('foodProduct/handleUpdateAction', async (restaurantData, { rejectWithValue }) => {
    try {


        console.log(restaurantData.product_image[0]);

        var bodyFormData = new FormData();
    
        bodyFormData.append('product_image',restaurantData.product_image[0]);
    
        for ( var key in restaurantData ) {
            console.log(key + ' and ' + restaurantData[key]);
            bodyFormData.append(key, restaurantData[key]);
        }
        console.log('bodyFormData');
        console.log(bodyFormData);

        var {data} = FoodProductServices.update(restaurantData._id,bodyFormData);
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

export const handleSubmitAction = createAsyncThunk('foodProduct/handleSubmitAction', async (restaurantData, { rejectWithValue }) => {
    try {

        console.log(restaurantData.product_image[0]);

        var bodyFormData = new FormData();
    
        bodyFormData.append('product_image',restaurantData.product_image[0]);
    
        for ( var key in restaurantData ) {
            console.log(key + ' and ' + restaurantData[key]);
            bodyFormData.append(key, restaurantData[key]);
        }
        console.log('bodyFormData');
        console.log(bodyFormData);

        console.log('restaurantData');
        console.log(restaurantData);

            var {data} = FoodProductServices.create(bodyFormData);
            return data;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility

        console.log('handleUpdateAction rejectWithValue data')
        console.log(err.response.data)

        return rejectWithValue(err.response.data)
    }
});


const foodProductSlice = createSlice({
    name : "foodProduct",
    initialState : {
        food_category_id    : "",
        isReadyForUpdate    : null,
        statesList          : null,
        stateId             : null,
        citiesList          : null,
        countriesList       : null,
        allFoodProducts     : null,
        
        foodProductDetails   : {
            '_id'                   : "",
            'food_category_id'      : "",
            'food_sub_category_id'  : "",
            'product_name'          : "",
            // 'product_taste_type'    : "",// [ Veg/Non Veg ]
            'product_description'   : "",
            // 'product_price'         : "",
            // 'product_disclaimer'    : "",
            'product_image'         : "",// [Array Object Multiple]
            // 'product_weight_desc'   : "",// [Half Plate / Full Plate ( Need help Input text or create separate table ) ]
            'status'                : "",// [0/1]
            // 'product_best_offer'    : "",// [0/1]
            // 'product_top_selling'   : "",// [0/1]
            'isImageUploaded'     : false,
        }
    },
    reducers : {
        updateInputDetails : (state, action) => {
            const key = Object.keys(action.payload)[0];
            return {
                ...state,
                foodProductDetails : {
                    ...state.foodProductDetails,
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
            //     foodProductDetails : {
            //         ...state.foodProductDetails,
            //         [key ]: action.payload[key]
            //         // [action.payload.field_name] : action.payload.field_value
            //     }
            // }
            state.foodProductDetails.product_image = action.payload[key];
            state.foodProductDetails.isImageUploaded = true;
        },
        clearFormData : (state) =>{
            state.foodProductDetails = {
                "_id"                   : "",      
                'food_category_id'      : "",
                'food_sub_category_id'  : "",
                'product_name'          : "",
                // 'product_taste_type'    : "",// [ Veg/Non Veg ]
                'product_description'   : "",
                // 'product_price'         : "",
                // 'product_disclaimer'    : "",
                'product_image'         : "",// [Array Object Multiple]
                // 'product_weight_desc'   : "",// [Half Plate / Full Plate ( Need help Input text or create separate table ) ]
                'status'                : "",// [0/1]
                // 'product_best_offer'    : "",// [0/1]
                // 'product_top_selling'   : "",
                'isImageUploaded'     : false,
            }
        }
    },
    extraReducers : {
        [retrieveAll.fulfilled]: (state, action) => {
            console.log('retrieveAll-extra-reducers')
            console.log(action.payload)

            state.allFoodProducts = action.payload;
            state.isLoaded =  true;
        },
        [retrieveOne.fulfilled]: (state, action) => {
            console.log('retrieveOne-extra-reducers')
            console.log(action.payload)

            // state.allFoodProducts  = null;
            state.foodProductDetails = action.payload;
            state.food_category_id = action.payload.food_category_id;
            state.isLoaded = false;
            state.isReadyForUpdate = true;
        },
        [handleSubmitAction.fulfilled] : (state, action) => {

            console.log('handleSubmitAction-fulfilled')
            console.log(action.payload)

            // state.allFoodProducts  = null;
            // state.name = null;
            // state.status = null;
            // state.actionStatus = true;

        },
        [handleUpdateAction.fulfilled] : (state, action) => {

            console.log('handleUpdateAction-fulfilled')
            console.log(action.payload)

            // state.allFoodProducts  = null;
            // state.name = null;
            // state.status = null;
            // state.actionStatus = true;

        },
        [removeOne.fulfilled] : (state, action) => {

            console.log('removeOne-fulfilled')
            console.log(action.payload)

            state.allFoodProducts  = action.payload;
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
            state.foodProductDetails.state_id = action.payload.state_id;
        },
        [getCitiesList.fulfilled] : (state, action) => {
            state.citiesList = action.payload;
            state.isLoaded =  true;
        },
        [getFoodProductStatusList.fulfilled] : (state, action) => {
            state.foodProductStatusList = action.payload;
            state.isLoaded =  true;
        },
        [getUserTypesList.fulfilled] : (state, action) => {
            state.userTypesList = action.payload;
            state.isLoaded =  true;
        },
    }
});

export const {updateInputDetails, handleImageChange, clearFormData} = foodProductSlice.actions
export default foodProductSlice.reducer;