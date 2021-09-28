import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, useHistory } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';

import { useForm } from 'react-hook-form';

// import { connect } from 'react-redux';
// import { foodCategoryReducer, initialState } from '../../store/reducers/foodCategoryReducer';
// import { getAllUsersList } from '../../store/actions/useraction';
// import { handleInputAction, validatePassword, getCountriesList, getStateList, getCitiesList, getStateCities, handleImageChange, handleDateChange, handleSubmitAction } from '../../store/actions/foodcategoryaction';

import {handleSubmitAction, updateInputDetails} from '../../redux/features/foodCategorySlice';


import Cookies from 'universal-cookie';


// const initialState = {
//   name                : 'NORTH',
//   status              : '',
//   isReadyForUpdate    : false,
// };

const AddFoodCategory = (props) => {

    const dispatch = useDispatch();

    const [name, setName ]= useState("");
    const [status, setStatus ]= useState("");
    const [actionStatus, setActionStatus ]= useState();

    const history = useHistory();
    const formData = useSelector((state) => state.foodCategory); 

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
      {
          defaultValues: {
              name: "",//formData.username,
              status: "",//formData.password,
          },
      }
    );

    const onSubmit = async (data) => {

      await dispatch(handleSubmitAction(data));

      reset({
          name: "",
          status: "",
      });

      history.push("/all-food-categories");
    };

    useEffect(()=>{
      return () => {
        console.log('setActionStatus is calling');
        setActionStatus(false);
      }
    },[])

    return (

        // <form method="POST" action="http://localhost:8081/users/add-user">
  
        <div className="container-fluid">
  
          <div className="row">
            <div className="container">
  
              {/* <form onSubmit={(e) => dispatch(handleSubmitAction(e, props.history))}> */}
              <form className="user" onSubmit={handleSubmit(onSubmit)}>  
                <div class="form-header">
                  {(props.isReadyForEdit) ? "Update Food Category" : "Add Food Category"}
                </div>
  

                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Food Category</b></label></div>
                  <div className="col-sm-3">
                    {/* <input type="text" className="form-control" placeholder="Restaurant Opening Time" name="name" onChange={(e) => props.handleInput(e.target)}  value={data.name} required /> */}
                    <input type="text" {...register('name', { required: true, maxLength: 30 })} className="form-control" placeholder="Food Category" name="name" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={formData.name} required />
                  </div>
                </div>
  
                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Status</b></label></div>
                  <div className="col-sm-3">
                    <select className="form-control" {...register('status', { required: true})} name="status" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={formData.status} required>
                      <option>Select Current Status</option>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                      {/* {
                        (props.allUsersList) ?
                          (props.allUsersList.map((data) =>
  
                            <option key={data.id} value={data.id} >{data.name}</option>
                          )) : null
                      } */}
                    </select>
                  </div>
                </div>
  
                <div className="form-group row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-3 col-sm-">
                    <button type="submit" className="btn btn-info">Submit</button>
                  </div>
                  
                </div>

              </form>
            </div>
  
          </div>
        </div>
      );

}

export default AddFoodCategory;