import React, { Component } from 'react';

import {Link, NavLink, withRouter} from 'react-router-dom';

import Cookies from 'universal-cookie';

export class Header extends Component {
  
  render() {


    const cookies = new Cookies();
    let token =  cookies.get('token')

    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>


          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li> Welcome {props.name} {props.lastname}</li> */}
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


          
        </nav>
      </div>
    )
  }
}

export default Header;