import { createStore, applyMiddleware, combineReducers} from "redux";
// import reducer from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';

import nameReducer from './reducers/nameReducer';
import lastnameReducer from './reducers/lastnameReducer';
import usersReducer from './reducers/usersReducer';
import tokenReducer from './reducers/tokenReducer';
import loginReducer from './reducers/loginReducer';
import restaurantsReducer from './reducers/restaurantsReducer';
import {foodCategoryReducer} from "./reducers/foodCategoryReducer";

import thunk from 'redux-thunk';

const masterReducer = combineReducers({
    name        : nameReducer,
    lastname    : lastnameReducer,
    users       : usersReducer,
    token       : tokenReducer,
    login       : loginReducer,
    restaurant  : restaurantsReducer,
    foodCategory: foodCategoryReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    // reducer,
    masterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;