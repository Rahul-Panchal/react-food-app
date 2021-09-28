import React, { Component } from 'react';

import {useSelector} from 'react-redux';

import ReactDOM from 'react-dom';
import logo from './logo.svg';
// import './App.css';



// import Navbar from './Layout/Navbar';
import Layout from './Layout/Layout';

import Home from './components/Home';
import About from './components/About';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import UsersList from './components/users/UsersList';
import AllUsersList from './components/users/AllUsersList';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import Welcome from './components/Welcome';

import {BrowserRouter, Route} from 'react-router-dom';

import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';

import {connect} from 'react-redux';
import {changeFirstName, changeLastName, saveTokenValue} from './store/actions/myaction';
// import { token } from 'morgan';


import Cookies from 'universal-cookie';


const App = (props) => {

  // const cookies = new Cookies();
  // let token =  cookies.get('token')

  // console.log('token from APP : ' +token);

  const token  = useSelector((state)=>state.login.token);
  const name  = useSelector((state)=>state.login.loggedInUserDetails.name);

  return (
    <BrowserRouter>
      {/* <div className="App"> */}
      {/* <Layout name={props.name} /> */}
      <div>
        {(token) ? <Layout name={name} /> : <Login/> }
      </div>
    </BrowserRouter>
    
  );
}

export default App;
