import React, { Component, useEffect } from 'react';

import { useHistory } from 'react-router-dom';




import {connect, useSelector, useDispatch} from 'react-redux';
// import loginReducer from '../../store/reducers/loginReducer';
// import {handleLogoutAction} from '../../store/actions/loginaction';

import {logout} from '../../redux/features/loginSlice';

import Cookies from 'universal-cookie';


const Logout = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(()=>{
      // const cookies = new Cookies();
      // cookies.set('token', '', { path: '/' });

      console.log('LOGOUT IS CALLING');
      dispatch(logout());

      history.push("/");
  },[]);

  return (
    <div>
      <h1>Logout Done</h1>
    </div>
  )
}



export default Logout;