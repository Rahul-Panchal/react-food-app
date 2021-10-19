import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import UserDetailServices from '../../store/HttpTransport/Services/UserDetailServices';

/**
 * using thunk with async and await
 * 
 * retrieveAll users List
 */
 export const retrieveAll = createAsyncThunk('user/retrieveAll', async (id) => {

    console.log('retrieveAll data')
    console.log(id)

    //const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    const {data} = await UserDetailServices.getAll();

    console.log('retrieveAll-response')
    console.log(data)
    return data;

});


/**
 * using thunk with async and await
 */
 export const retrieveOne = createAsyncThunk('user/retrieveOne', async (id) => {

    const {data} = await UserDetailServices.get(id);

    console.log('retrieveOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
 export const removeOne = createAsyncThunk('user/removeOne', async (id) => {

    const {data} = await UserDetailServices.remove(id);

    console.log('removeOne-response')
    console.log(data)
    return data;

});

/**
 * using thunk with async and await
 */
export const getCountriesList = createAsyncThunk('user/getCountriesList', async (id) => {
    
    const countriesList = [
        {name: 'India', id: '1'}
    ];

    return  countriesList;
});


/**
 * using thunk with async and await
 */
export const getStateList = createAsyncThunk('user/getStateList', async (id) => {
    const data = await fetch("http://localhost:3000/js/state.json");
    const response = await data.json();

    return response;
});

/**
 * using thunk with async and await
 */

export const getStateCities  = createAsyncThunk('user/getStateCities', async  (stateId)=>{
    const data = await fetch("http://localhost:3000/js/cities.json");
    const response = await data.json();
    
    return {'state_id': stateId, 'cities_list': response}

});


/**
 * using thunk with async and await
 */
export const getCitiesList = createAsyncThunk('user/getCitiesList', async (id) => {
    const data = await fetch("http://localhost:3000/js/cities.json");
    const response = await data.json();

    return response;
});

/**
 * using thunk with async and await
 */
export const getUserStatusList = createAsyncThunk('user/getUserStatusList', async (id) => {
    
    const userStatusList = [
        { id: true, name: 'Active'},
        { id: false, name: 'Not Active'},
    ];
    return userStatusList
});

/**
 * using thunk with async and await
 */
export const getUserTypesList = createAsyncThunk('user/getUserTypesList', async (id) => {
    
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

 export const handleUpdateAction = createAsyncThunk('user/handleUpdateAction', async (userData, { rejectWithValue }) => {
    try {

        console.log(userData.profile_image[0]);

        var userFormData = new FormData();
    
        userFormData.append('profile_image',userData.profile_image[0]);
    
        for ( var key in userData ) {
            console.log(key + ' and ' + userData[key]);
            userFormData.append(key, userData[key]);
        }
        console.log('userFormData');
        console.log(userFormData);

        var {data} = UserDetailServices.update(userData._id,userFormData);
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

export const handleSubmitAction = createAsyncThunk('user/handleSubmitAction', async (userData, { rejectWithValue }) => {
    try {

        console.log(userData.profile_image[0]);

        var userFormData = new FormData();
    
        userFormData.append('profile_image',userData.profile_image[0]);
    
        for ( var key in userData ) {
            console.log(key + ' and ' + userData[key]);
            userFormData.append(key, userData[key]);
        }
        console.log('userFormData');
        console.log(userFormData);

        var {data} = UserDetailServices.create(userFormData);
        return data;

    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility

        console.log('handleUpdateAction rejectWithValue data')
        console.log(err.response.data)

        return rejectWithValue(err.response.data)
    }
});


const userSlice = createSlice({
    name : "user",
    initialState : {
        isReadyForUpdate  : false,
        isPasswordMatch : null,
        statesList      : null,
        stateId         : null,
        citiesList      : null,
        countriesList   : null,
        userTypesList   : null,
        userStatusList  : null,
        allUsersList    : null,
        isLoaded        : false,
        // userDetails     : {},
        userDetails     : {
            _id             : "",
            name            : "",
            username        : "",
            email_id        : "",
            contact_no      : "",
            password        : "",
            confirm_password: "",
            state_id        : "",
            city_id         : "",
            address         : "",
            profile_image   : "",
            user_type       : "",
            is_active       : "",
            pin_code        : "",
            country_id      : "",
        }
    },
    reducers : {
        updateInputDetails : (state, action) => {
            const key = Object.keys(action.payload)[0];
            return {
                ...state,
                userDetails : {
                    ...state.userDetails,
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
            //     userDetails : {
            //         ...state.userDetails,
            //         [key ]: action.payload[key]
            //         // [action.payload.field_name] : action.payload.field_value
            //     }
            // }
            state.userDetails.profile_image = action.payload[key];
        },
        comparePassword: (state, action) => {
            console.log('comparePassword action');
            console.log(action);
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
        },
        clearFormData : (state) =>{
            state.userDetails = {
                name            : "",
                username        : "",
                email_id        : "",
                contact_no      : "",
                password        : "",
                confirm_password: "",
                state_id        : "",
                city_id         : "",
                address         : "",
                salary          : "",
                profile_image   : "",
                user_type       : "",
                is_active       : "",
                pin_code        : "",
                country_id      : "",
            }
        },
    },
    extraReducers : {
        [retrieveAll.fulfilled]: (state, action) => {
            console.log('retrieveAll-extra-reducers')
            console.log(action.payload)

            state.allUsersList = action.payload;
            state.isLoaded =  true;
        },
        [retrieveOne.fulfilled]: (state, action) => {
            console.log('retrieveOne-extra-reducers')
            console.log(action.payload)

            // state.allUsersList  = null;
            state.userDetails = action.payload;
            state.stateId = action.payload.state_id;
            state.isLoaded = false;
            state.isReadyForUpdate = true;
        },
        [handleSubmitAction.fulfilled] : (state, action) => {

            console.log('handleSubmitAction-fulfilled')
            console.log(action.payload)

            // state.allUsersList  = null;
            // state.name = null;
            // state.status = null;
            // state.actionStatus = true;

        },
        [handleUpdateAction.fulfilled] : (state, action) => {

            console.log('handleUpdateAction-fulfilled')
            console.log(action.payload)

            // state.allUsersList  = null;
            // state.name = null;
            // state.status = null;
            // state.actionStatus = true;

        },
        [removeOne.fulfilled] : (state, action) => {

            console.log('removeOne-fulfilled')
            console.log(action.payload)

            state.allUsersList  = action.payload;
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
            state.userDetails.state_id = action.payload.state_id;
        },
        [getCitiesList.fulfilled] : (state, action) => {
            state.citiesList = action.payload;
            state.isLoaded =  true;
        },
        [getUserStatusList.fulfilled] : (state, action) => {
            state.userStatusList = action.payload;
            state.isLoaded =  true;
        },
        [getUserTypesList.fulfilled] : (state, action) => {
            state.userTypesList = action.payload;
            state.isLoaded =  true;
        },
    }
});

export const {updateInputDetails, handleImageChange, comparePassword, clearFormData} = userSlice.actions
export default userSlice.reducer;