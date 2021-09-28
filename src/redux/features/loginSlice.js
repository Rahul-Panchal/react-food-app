import Cookies from 'universal-cookie';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

// inputChange: (state, action) => {
//     const key = Object.keys(action.payload)[0];
//     return {
//       ...state,
//       [key ]: {
//         ...state[action.payload[key]],
//         value: action.payload[key ] || state.num_building.value,
//       },
//     };
//   },

/**
 * using thunk with async and await
 */
export const handleLoginAction = createAsyncThunk('login/handleLoginAction', async (loginData) => {

    var url = "http://localhost:8081/login";
    var methodType = "POST";

    console.log('handleLoginAction data')
    console.log(loginData)

    const {data} = await axios.post(url, loginData);//await fetch(url,{method: methodType,body: data });
    // const response = await result.json();

    console.log('login-response')
    console.log(data)

    // const cookies = new Cookies();
    // cookies.set('token', data.token, { path: '/' });

    localStorage.setItem('token', data.token);

    return data;
    // dispatch(loginSuccess(response));
});

const loginSlice = createSlice({
    name : "login",
    initialState : {
        username: '',
        password: '',
        loggedInUserStatus : false,
        token : false,
        loggedInUserDetails : {
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
    },
    reducers : {
        updateInputDetails : (state, action) => {
            const key = Object.keys(action.payload)[0];
            return {
                ...state,
                [key ]: action.payload[key]
            };
        },

        // updateInputDetails : (state, action) => {
        //     const key = Object.keys(action.payload)[0];

        //     console.log('key + action.payload[key]')
        //     console.log(action.payload)

        //     return {
        //       ...state,
        //       [key ]: {
        //         ...state[action.payload[key]],
        //         value: action.payload[key ] || "",
        //       },
        //     };
        // },
        getUserDetails : (state, action) => {

        },
        loginSuccess : (state, action) => {

 
            // console.log('loginSuccess-reducer')
            // console.log(action.payload)

            // // state.loggedInUserDetails = [action.payload, ...state.loggedInUserDetails];
            // return {
            //     ...state,
            //     loggedInUserStatus: true,
            //     loggedInUserDetails : {
            //         ...state.loggedInUserDetails,
            //         ...action.payload.user,
            //         token : action.payload.token,
            //         // name :  action.payload.user.name
            //     }
            // }
        },
        logout : (state, action) => {   
            console.log('logout-reducers')
            localStorage.removeItem('token');
            return {
                ...state,
                loggedInUserStatus: false,
                token : false,
                loggedInUserDetails : {
                    ...state.loggedInUserDetails,
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
                }
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(loginSuccess.fulfilled, (state, action) => {
    //         state.loggedInUserDetails = action.payload.user;
    //         state.loggedInUserStatus =  true;
    //         state.token = action.payload.token;
    //         // state.loading = false;
    //     })
    // }
    extraReducers : {
        [handleLoginAction.fulfilled]: (state, action) => {
            console.log('loginSuccess-extra-reducers')
            console.log(action.payload)

            state.loggedInUserDetails = action.payload.user;
            state.loggedInUserStatus =  true;
            state.token = action.payload.token;
            state.username = '';
            state.password = '';
        }
    }
});

export const {getUserDetails, updateInputDetails, logout} = loginSlice.actions;
export default loginSlice.reducer;


// export const login = ({ username, password }) => async dispatch => {
//     try {
//       // const res = await api.post('/api/auth/login/', { username, password })
//       dispatch(loginSuccess({username}));
//     } catch (e) {
//       return console.error(e.message);
//     }
// }




