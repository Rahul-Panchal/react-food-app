import React from 'react';
import ReactDOM from 'react-dom';


// import {Dialog} from 'primereact/dialog';
// import {Accordion,AccordionTab} from 'primereact/accordion';

// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// import 'bootstrap/dist/css/bootstrap.min.css'; 

import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
/*
import nameReducer from './reducers/nameReducer';
import lastnameReducer from './reducers/lastnameReducer';

import usersReducer from './reducers/usersReducer';
import tokenReducer from './reducers/tokenReducer';
import loginReducer from './reducers/loginReducer';
import restaurantsReducer from './reducers/restaurantsReducer';

import thunk from 'redux-thunk';

const masterReducer = combineReducers({
    name        : nameReducer,
    lastname    : lastnameReducer,
    users       : usersReducer,
    token       : tokenReducer,
    login       : loginReducer,
    restaurant  : restaurantsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
*/

// const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const store = createStore(masterReducer,{name:'Rahul', lastname: 'Kumar', users:''},composeEnhancers(applyMiddleware(thunk)));

/*
const appStore = createStore(masterReducer,composeEnhancers(applyMiddleware(thunk)));



ReactDOM.render(<Provider store={appStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

*/

import store from "./redux/store.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


