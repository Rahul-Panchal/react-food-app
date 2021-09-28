import axios from "axios";
import Cookies from 'universal-cookie';
// import {useSelector} from "react-redux";
// import store from './../../redux/store';//'./redux/store';

// const cookies = new Cookies();
// let token = cookies.get('token');

// let token = localStorage.getItem('token');

// let tokenFromState = store.getState().login.token;

// let token = (tokenFromState) ? tokenFromState : tokenFormCookie;

import setAuthToken from './SetAuthToken'; //'./utils/setAuthToken';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

export default axios.create({
    // baseURL: "https://60ae52e05b8c300017dea3a3.mockapi.io",
    baseURL: "http://localhost:8081",
    headers: {
    //     "Content-type": "application/json",
    //     // "x-access-token": token
    }
})