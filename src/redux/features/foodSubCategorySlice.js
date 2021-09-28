import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from "axios";

// import { CREATE, RETRIEVE, RETRIEVEONE, UPDATE, DELETE } from '../../store/contants/actionTypes';
import FoodSubCategoryServices from '../../store/HttpTransport/Services/FoodSubCategoryServices';

// import setAuthToken from '../../store/HttpTransport/SetAuthToken'; //'./utils/setAuthToken';

// if(localStorage.token) {
//     setAuthToken(localStorage.token);
// }

/**
 * using thunk with async and await
 */
 export const retrieveAll = createAsyncThunk('foodSubCategory/retrieveAll', async (id) => {

    // var url = "http://localhost:8081/login";
    // var methodType = "POST";

    console.log('retrieveAll data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodSubCategoryServices.getAll();

    console.log('retrieveAll-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
 export const retrieveOne = createAsyncThunk('foodSubCategory/retrieveOne', async (id) => {

    // var url = "http://localhost:8081/login";
    // var methodType = "POST";

    console.log('retrieveOne data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodSubCategoryServices.get(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});


/**
 * foodSubCategoriesByCategoryId function used to get all food sub categories by food category Id
 */
 export const foodSubCategoriesByCategoryId = createAsyncThunk('foodSubCategory/foodSubCategoriesByCategoryId', async (id) => {

    console.log('foodSubCategoriesByCategoryId id')
    console.log(id)

    const {data} = await FoodSubCategoryServices.findByFoodCategoryId(id);

    console.log('foodSubCategoriesByCategoryId-response')
    console.log(data)

    return {'food_category_id': id, 'food_sub_categories': data}

    return data;
});

/**
 * using thunk with async and await
 */
 export const removeOne = createAsyncThunk('foodSubCategory/removeOne', async (id) => {

    console.log('removeOne data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodSubCategoryServices.remove(id);

    console.log('removeOne-response')
    console.log(data)
    return data;

});



/**
 * handleSubmitAction used to submit restaurant details
 */

 export const handleSubmitAction = createAsyncThunk('foodSubCategory/handleSubmitAction', async (foodSubCategoryData, { rejectWithValue }) => {
    try {
        // const {data} = await axios.post(url, foodSubCategoryData);//await fetch(url,{method: methodType,body: data });
        
        var {data} = FoodSubCategoryServices.create(foodSubCategoryData);
        console.log('handleSubmitAction response data')
        console.log(data)

        return data;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        return rejectWithValue(err.response.data)
    }
});

/**
 * handleUpdateAction used to submit foodSubCategory details
 */

 export const handleUpdateAction = createAsyncThunk('foodSubCategory/handleUpdateAction', async (foodSubCategoryData, { rejectWithValue }) => {
    try {
        var {data} = FoodSubCategoryServices.update(foodSubCategoryData._id,foodSubCategoryData);
        return data;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility

        console.log('handleUpdateAction rejectWithValue data')
        console.log(err.response.data)

        return rejectWithValue(err.response.data)
    }
});


const foodSubCategorySlice = createSlice({
    name : "foodSubCategory",
    initialState : {
        food_category_id        : "",
        name                    : "",
        status                  : "",
        isReadyForUpdate        : false,
        allFoodSubCategories    : null,
        // foodSubCategoryDetails : null,
        isLoaded                : false,
        actionStatus            : false,
    },
    reducers : {
        updateInputDetails : (state, action) => {
            const key = Object.keys(action.payload)[0];
            return {
                ...state,
                [key ]: action.payload[key]
            };
        },
    },
    extraReducers : {
        [retrieveAll.fulfilled]: (state, action) => {
            console.log('retrieveAll-extra-reducers')
            console.log(action.payload)

            state.allFoodSubCategories = action.payload;
            state.isLoaded =  true;
        },
        [retrieveOne.fulfilled]: (state, action) => {
            console.log('retrieveOne-extra-reducers')
            console.log(action.payload)

            // state.allFoodSubCategories = null;
            state.food_category_id = action.payload.food_category_id;
            state.name = action.payload.name;
            state.status = action.payload.status;
            state.isLoaded = false;
            state.isReadyForUpdate = true;
        },
        [foodSubCategoriesByCategoryId.fulfilled]: (state, action) => {
            console.log('foodSubCategoriesByCategoryId-extra-reducers')
            console.log(action.payload)

            state.allFoodSubCategories = action.payload.food_sub_categories;
            state.food_category_id = action.payload.food_category_id;
            state.isLoaded =  true;
        },
        [handleSubmitAction.fulfilled] : (state, action) => {

            console.log('handleSubmitAction-fulfilled')
            console.log(action.payload)

            // state.allFoodSubCategories = null;
            state.food_category_id = "";
            state.name = "";
            state.status = "";
            state.actionStatus = true;

        },
        [handleUpdateAction.fulfilled] : (state, action) => {

            console.log('handleUpdateAction-fulfilled')
            console.log(action.payload)

            // state.allFoodSubCategories = null;
            state.food_category_id = "";
            state.name = "";
            state.status = "";
            state.actionStatus = true;

        },
        [removeOne.fulfilled] : (state, action) => {

            console.log('removeOne-fulfilled')
            console.log(action.payload)

            state.allFoodSubCategories = action.payload;
            // state.name = action.payload.name;
            // state.status = action.payload.status;
            state.actionStatus = true;

        },
    }
});

export const {updateInputDetails} = foodSubCategorySlice.actions
export default foodSubCategorySlice.reducer;