import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import {Link, NavLink, withRouter} from 'react-router-dom';

import {handleSubmitAction, updateInputDetails, handleImageChange, comparePassword, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getUserStatusList, getUserTypesList } from '../redux/features/userSlice';
  
const HeaderSearch = (props) => {

    return (  
      <div>  
            
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">  
            <div className="input-group">  
              <input type="text" className="form-control bg-light border-0 small" name="search" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>  
              <div className="input-group-append">  
                <button className="btn btn-primary" type="button">  
                  <i className="fas fa-search fa-sm"></i>  
                </button>  
              </div>  
            </div>  
          </form>  
          
      </div>  
    )  
}  
  
export default HeaderSearch;