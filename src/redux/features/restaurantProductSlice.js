import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import RestaurantProductServices from '../../store/HttpTransport/Services/RestaurantProductServices';

/**
 * using thunk with async and await
 * 
 * retrieveAll users List
 */
 export const retrieveAll = createAsyncThunk('restaurantProduct/retrieveAll', async (id) => {

    console.log('retrieveAll data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await RestaurantProductServices.getAll();

    console.log('retrieveAll-response')
    console.log(data)
    return data;

});


/**
 * using thunk with async and await
 */
 export const retrieveOne = createAsyncThunk('restaurantProduct/retrieveOne', async (id) => {

    const {data} = await RestaurantProductServices.get(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});

/**
 * Get All food products as per restaurant id
 * 
 * using thunk with async and await
 */
 export const getRestaurantFoodProducts = createAsyncThunk('restaurantProduct/getRestaurantFoodProducts', async (id) => {

    const {data} = await RestaurantProductServices.getAllFoodProducts(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});

/**
 * Get one food product as per product id
 * 
 * using thunk with async and await
 */
 export const getFoodProduct = createAsyncThunk('restaurantProduct/getFoodProduct', async (id) => {

    const {data} = await RestaurantProductServices.getFoodProduct(id);

    console.log('getFoodProduct-response')
    console.log(data)
    return data;

});



/**
 * using thunk with async and await
 */
 export const removeOne = createAsyncThunk('restaurantProduct/removeOne', async (id) => {

    const {data} = await RestaurantProductServices.remove(id);

    console.log('removeOne-response')
    console.log(data)
    return data;

});


/**
 * using thunk with async and await
 */
export const getRestaurantStatusList = createAsyncThunk('restaurantProduct/getRestaurantStatusList', async (id) => {
    
    const restaurantStatusList = [
        { id: true, name: 'Active'},
        { id: false, name: 'Not Active'},
    ];
    return restaurantStatusList
});

/**
 * using thunk with async and await
 */
export const getUserTypesList = createAsyncThunk('restaurantProduct/getUserTypesList', async (id) => {
    
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

 export const handleUpdateAction = createAsyncThunk('restaurantProduct/handleUpdateAction', async (restaurantData, { rejectWithValue }) => {
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

        var {data} = RestaurantProductServices.update(restaurantData._id,bodyFormData);
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

export const handleSubmitAction = createAsyncThunk('restaurantProduct/handleSubmitAction', async (restaurantData, { rejectWithValue }) => {
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

            var {data} = RestaurantProductServices.create(bodyFormData);
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
 * using thunk with async and await
 */
export const getFoodProductStatusList = createAsyncThunk('restaurantProduct/getFoodProductStatusList', async (id) => {
    
    const foodProductStatusList = [
        { id: true, name: 'Active'},
        { id: false, name: 'Not Active'},
    ];
    return foodProductStatusList
});


const restaurantSlice = createSlice({
    name : "restaurantProduct",
    initialState : {
        food_category_id        : null,
        food_sub_category_id    : null,
        isReadyForUpdate        : null,
        foodProductStatusList   : null,
        allFoodProducts         : null,
        restaurantDetails       : null,
        foodProductDetails: {
            _id                     : "",
            restaurant_detail_id    : "",
            food_product_id         : "",
            product_discount        : "",
            half_plate_price        : "",
            full_plate_price        : "",
            product_price           : "",
            product_image           : "",
            status                  : "", 
            isImageUploaded         : false,    
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
            //     restaurantDetails : {
            //         ...state.restaurantDetails,
            //         [key ]: action.payload[key]
            //         // [action.payload.field_name] : action.payload.field_value
            //     }
            // }
            state.foodProductDetails.product_image = action.payload[key];
            state.foodProductDetails.isImageUploaded = true;
        },
        clearFormData : (state) =>{
            state.foodProductDetails = {
                _id                     : "",
                restaurant_detail_id    : "",
                food_product_id         : "",
                product_discount        : "",
                half_plate_price        : "",
                full_plate_price        : "",
                product_price           : "",
                product_image           : "",
                status                  : "", 
                isImageUploaded         : false,     
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
            state.restaurantDetails = action.payload;
            state.stateId = action.payload.state_id;
            state.isLoaded = false;
            state.isReadyForUpdate = true;
        },
        [getRestaurantFoodProducts.fulfilled]: (state, action) => {
            console.log('getRestaurantFoodProducts-extra-reducers')
            console.log(action.payload)

            state.allFoodProducts = action.payload;
        },
        [getFoodProduct.fulfilled]: (state, action) => {
            console.log('getFoodProduct-extra-reducers')
            console.log(action.payload)

            state.foodProductDetails = action.payload;
            state.food_category_id = action.payload.food_product_id.food_category_id;
            state.food_sub_category_id = action.payload.food_product_id.food_sub_category_id._id;
            state.isReadyForUpdate =  true;
        },
        [handleSubmitAction.fulfilled] : (state, action) => {

            console.log('handleSubmitAction-fulfilled')
            console.log(action.payload);

            // state.allFoodProducts  = [...state.allFoodProducts, action.payload];/
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
        [getFoodProductStatusList.fulfilled] : (state, action) => {
            state.foodProductStatusList = action.payload;
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