import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from "axios";

// import { CREATE, RETRIEVE, RETRIEVEONE, UPDATE, DELETE } from '../../store/contants/actionTypes';
import FoodCategoryServices from '../../store/HttpTransport/Services/FoodCategoryServices';

// import setAuthToken from '../../store/HttpTransport/SetAuthToken'; //'./utils/setAuthToken';

// if(localStorage.token) {
//     setAuthToken(localStorage.token);
// }

/**
 * using thunk with async and await
 */
 export const retrieveAll = createAsyncThunk('foodCategory/retrieveAll', async (id) => {

    // var url = "http://localhost:8081/login";
    // var methodType = "POST";

    console.log('retrieveAll data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodCategoryServices.getAll();

    console.log('retrieveAll-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
 export const retrieveOne = createAsyncThunk('foodCategory/retrieveOne', async (id) => {

    // var url = "http://localhost:8081/login";
    // var methodType = "POST";

    console.log('retrieveOne data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodCategoryServices.get(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
 export const removeOne = createAsyncThunk('foodCategory/removeOne', async (id) => {

    console.log('removeOne data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await FoodCategoryServices.remove(id);

    console.log('removeOne-response')
    console.log(data)
    return data;

});



/**
 * handleSubmitAction used to submit restaurant details
 */

 export const handleSubmitAction = createAsyncThunk('foodCategory/handleSubmitAction', async (foodCategoryData, { rejectWithValue }) => {
    try {
        // const {data} = await axios.post(url, foodCategoryData);//await fetch(url,{method: methodType,body: data });
        
        var {data} = FoodCategoryServices.create(foodCategoryData);
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
 * handleUpdateAction used to submit foodCategory details
 */

 export const handleUpdateAction = createAsyncThunk('foodCategory/handleUpdateAction', async (foodCategoryData, { rejectWithValue }) => {
    try {
        var {data} = FoodCategoryServices.update(foodCategoryData._id,foodCategoryData);
        return data;
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility

        console.log('handleUpdateAction rejectWithValue data')
        console.log(err.response.data)

        return rejectWithValue(err.response.data)
    }
});


const foodCategorySlice = createSlice({
    name : "foodCategory",
    initialState : {
        name                : null,
        status              : null,
        isReadyForUpdate    : false,
        allFoodCategoreis   : null,
        // foodCategoryDetails : null,
        isLoaded            : false,
        actionStatus        : false,
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

            state.allFoodCategoreis = action.payload;
            state.isLoaded =  true;
        },
        [retrieveOne.fulfilled]: (state, action) => {
            console.log('retrieveOne-extra-reducers')
            console.log(action.payload)

            state.allFoodCategoreis = null;
            state.name = action.payload.name;
            state.status = action.payload.status;
            state.isLoaded = false;
            state.isReadyForUpdate = true;
        },
        [handleSubmitAction.fulfilled] : (state, action) => {

            console.log('handleSubmitAction-fulfilled')
            console.log(action.payload)

            // state.allFoodCategoreis = null;
            state.name = null;
            state.status = null;
            state.actionStatus = true;

        },
        [handleUpdateAction.fulfilled] : (state, action) => {

            console.log('handleUpdateAction-fulfilled')
            console.log(action.payload)

            // state.allFoodCategoreis = null;
            state.name = null;
            state.status = null;
            state.actionStatus = true;

        },
        [removeOne.fulfilled] : (state, action) => {

            console.log('removeOne-fulfilled')
            console.log(action.payload)

            state.allFoodCategoreis = action.payload;
            // state.name = action.payload.name;
            // state.status = action.payload.status;
            state.actionStatus = true;

        },
    }
});

export const {updateInputDetails} = foodCategorySlice.actions
export default foodCategorySlice.reducer;