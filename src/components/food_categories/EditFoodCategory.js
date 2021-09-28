import React, { useState, useReducer, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import {handleUpdateAction, updateInputDetails} from '../../redux/features/foodCategorySlice';
import { useForm } from 'react-hook-form';



const EditFoodCategory = (props) => {

    const name = useSelector( (state) => state.foodCategory.name)
    const status = useSelector( (state) => state.foodCategory.status)
    const isReadyForUpdate = useSelector( (state) => state.foodCategory.isReadyForUpdate)

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
      {
          defaultValues: {
              name: "",//formData.username,
              status: "",//formData.password,
          },
      }
    );

    useEffect(() => {

      console.log('FoodCategory Details')
      console.log(name + '/'+ status);

      

      console.log('id :: '+id);
    },[isReadyForUpdate]);

    

    const onSubmit = async (data) => {


      console.log('FoodCategory updated form Details')
      console.log(data);

      data['_id'] = id;
      await dispatch(handleUpdateAction(data));

      reset({
          name: "",
          status: "",
      });

      history.push("/all-food-categories");
    };

    return (

        // <form method="POST" action="http://localhost:8081/users/add-user">
  
        <div className="container-fluid">
  
          <div className="row">
            <div className="container">
  
              {/* <form onSubmit={(e) => dispatch(handleSubmitAction(e, props.history))}> */}
              <form className="user" onSubmit={handleSubmit(onSubmit)}>  
                <div class="form-header">
                  {"Update Food Category"}
                </div>
  

                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Food Category</b></label></div>
                  <div className="col-sm-3">
                    <input type="text"  {...register('name', { required: true, maxLength: 30 })} className="form-control" placeholder="Food Category" name="name" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={name} required />
                  </div>
                </div>
  
                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Status</b></label></div>
                  <div className="col-sm-3">
                    <select className="form-control"  {...register('status', { required: true})}  name="status" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={status} required>
                      <option>Select Current Status</option>
                      <option value={true} selected={status}>Active</option>
                      <option value={false} selected={status}>Inactive</option>
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

export default EditFoodCategory;