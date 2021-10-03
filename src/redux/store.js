/*
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import loginReducer from './features/loginSlice';
import foodCategoryReducer from './features/foodCategorySlice';

export default configureStore({
    reducer : {
        user : userReducer,
        login : loginReducer,
        foodCategory : foodCategoryReducer
    }     
})
*/


import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist';
import userReducer from './features/userSlice';
import loginReducer from './features/loginSlice';
import foodCategoryReducer from './features/foodCategorySlice';
import foodSubCategoryReducer from './features/foodSubCategorySlice';
import restaurantReducer from './features/restaurantSlice';
import foodProductReducer from './features/foodProductSlice';
import restaurantProductReducer from './features/restaurantProductSlice';

export default configureStore({
    reducer : {
        user                : userReducer,
        login               : loginReducer,
        foodCategory        : foodCategoryReducer,
        foodSubCategory     : foodSubCategoryReducer,
        foodProduct         : foodProductReducer,
        restaurant          : restaurantReducer,
        restaurantProduct   : restaurantProductReducer
    } ,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),    
})