import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, useHistory, useParams } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';

import { useForm } from 'react-hook-form';


import {retrieveAll as getAllFoodCategories} from '../../redux/features/foodCategorySlice';

import {handleUpdateAction, updateInputDetails, retrieveOne} from '../../redux/features/foodSubCategorySlice';

const EditFoodSubCategory = (props) => {

  const dispatch = useDispatch();

  // const [name, setName ]= useState("");
  // const [status, setStatus ]= useState("");
  // const [actionStatus, setActionStatus ]= useState();

  const history = useHistory();
  const allFoodCategoreis = useSelector((state) => state.foodCategory.allFoodCategoreis);
  const formData = useSelector((state) => state.foodSubCategory); 


  const { sub_food_category_id } = useParams();
  // let foodCategoryId = 

  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    {
        defaultValues: {
            food_category_id : "",
            name: "",//formData.username,
            status: "",//formData.password,
        },
    }
  );

  const onSubmit = async (data) => {

    data['_id'] = sub_food_category_id;

    await dispatch(handleUpdateAction(data));
    history.push("/all-food-sub-categories");
  };

  useEffect(()=>{

    dispatch(getAllFoodCategories());
    // dispatch(retrieveOne());

    console.log('food sub category Id :: ' + sub_food_category_id);

    // console.log('food category foodCategoryId ::: ' + foodCategoryId);

    console.log('all Food Categories');
    console.log(allFoodCategoreis);


    // return () => {
    //   console.log('setActionStatus is calling');
    //   setActionStatus(false);
    // }
  },[sub_food_category_id])

  return (

      <div className="container-fluid">

        <div className="row">
          <div className="container">

            <form className="user" onSubmit={handleSubmit(onSubmit)}>  
              <div class="form-header">
                {"Edit Food Sub Category"}
              </div>

              <div className="form-group row">
                <div className="col-sm-3"><label><b>Food Category</b></label></div>
                <div className="col-sm-3">

                  <select className="form-control" {...register('food_category_id', { required: true })} name="food_category_id" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={formData.food_category_id} required>
                    <option>Select Food Category</option>
                    {
                      (allFoodCategoreis) ?
                        (allFoodCategoreis.map((data) =>

                          <option key={data._id} value={data._id} >{data.name}</option>
                        )) : null
                    }
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-3"><label><b>Food Sub Category</b></label></div>
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

export default EditFoodSubCategory;