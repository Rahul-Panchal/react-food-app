import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import { render } from '@testing-library/react';

import Welcome from '../components/Welcome';

import Cookies from 'universal-cookie';

function Navbar(props){

    const cookies = new Cookies();
    let token =  cookies.get('token')

    return(
      <nav>
        <div className="nav-wrapper" style={{backgroundColor:"#008000a1"}}>
          <Link to="/" className="brand-logo" style={{display: "flow-root"}}>Users Management</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
    <li> Welcome {props.name} {props.lastname}</li>
    {/* <li> Welcome {props.loggedInUserName}</li> */}
            <li><Link to="/about">About us</Link></li>
            {
              token ?  <li><Link to="/users">Users</Link></li> : null
            }
            {/* {
              props.token ?  <li><Link to="/users-list">Users List</Link></li> : null
            } */}
            {
              token ?  <li><Link to="/all-users-list">All Users List</Link></li> : null
            }
            {
              token ?  <li><Link to="/logout">Logout</Link></li> : <li><Link to="/">Login</Link></li> 
            }
            {/* <li><Link to="/welcome">Login</Link></li> */}
          </ul>
        </div>
      </nav>
    )
}

export default withRouter(Navbar);