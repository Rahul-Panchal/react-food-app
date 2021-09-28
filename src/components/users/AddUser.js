import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import DatePicker from "react-datepicker";

import { connect } from 'react-redux';

import { clearFormData, handleSubmitAction, updateInputDetails, handleImageChange, comparePassword, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getUserStatusList, getUserTypesList } from '../../redux/features/userSlice';
import { useForm } from 'react-hook-form';

const AddUser = (props) => {

  const userDetail = useSelector((state) => state.user.userDetails)
  const isReadyForUpdate = useSelector((state) => state.user.isReadyForUpdate)

  const dispatch = useDispatch();
  const history = useHistory();


  const countriesList = useSelector((state) => state.user.countriesList);
  const statesList = useSelector((state) => state.user.statesList);
  const citiesList = useSelector((state) => state.user.citiesList);
  const userStatusList = useSelector((state) => state.user.userStatusList);
  const userTypesList = useSelector((state) => state.user.userTypesList);
  const stateId = useSelector((state) => state.user.stateId);
  const isPasswordMatch = useSelector((state) => state.user.isPasswordMatch);

  // const { id } = useParams();

  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    {
      defaultValues: {
        _id: "",
        name: "",
        username: "",
        email_id: "",
        contact_no: "",
        password: "",
        confirm_password: "",
        // dob             : "",
        state_id: "",
        city_id: "",
        // age             : "",
        address: "",
        salary: "",
        profile_image: "",
        user_type: "",
        is_active: "",
        pin_code: "",
        country_id: "",

      },
    }
  );


  useEffect(() => {

    console.log('userDetail Details')
    console.log(userDetail);
    // console.log('id :: '+id);

    console.log('isReadyForUpdate :: ' + isReadyForUpdate);


    dispatch(getCountriesList());
    dispatch(getStateList());
    dispatch(getCitiesList());
    dispatch(getUserStatusList());
    dispatch(getUserTypesList());

    return () => {
      dispatch(clearFormData());
    }

  }, [isReadyForUpdate]);

  useEffect(() => {

    console.log('comparePassword');
    dispatch(comparePassword())

  }, [isPasswordMatch]);


  const onSubmit = async (data) => {
    console.log('userDetail submit form Details')
    console.log(data);

    // data['_id'] = id;
    await dispatch(handleSubmitAction(data));
    history.push("/users-list");
  };

  return (

    <div className="container-fluid">

      <div className="row">
        <div className="container">

          <form className="user" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-header">
              {(isReadyForUpdate) ? "Update User Details" : "Add New User Details"}
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Name</b></label></div>
              <div className="col-sm-3">
                <input type="text"  {...register('name', { required: true })} name="name" className="form-control" placeholder="User Name" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.name} required />
              </div>
              <div className="col-sm-3"><label><b>User Name</b></label></div>
              <div className="col-sm-3">
                <input type="text" {...register('username', { required: true })} name="username" className="form-control" placeholder="Enter User Name" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.username} required />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Email Id</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Email Id" {...register('email_id', { required: true })} name="email_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.email_id} required />
              </div>
              <div className="col-sm-3"><label><b>Contact No.</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Contact No." {...register('contact_no', { required: true })} name="contact_no" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.contact_no} required />
              </div>
            </div>

            {/* https://github.com/hiiamrohit/Countries-States-Cities-database/blob/master/states.json */}
            {/* https://codepen.io/SteveHayes/pen/JVyjwj */}


            <div className="form-group row">
              <div className="col-sm-3"><label><b>Password</b></label></div>
              <div className="col-sm-3">
                <input type="password" className="form-control" placeholder="Enter Password" {...register('password', { required: true })} name="password" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.password} required />
              </div>

              <div className="col-sm-3">
                <label className={`${isPasswordMatch == false ? 'confirm-password-error' : null}`}>
                  Confirm Password
                </label>
              </div>
              <div className="col-sm-3">
                <input type="password"
                  // onChange={(event) => this.handleConfirmPasswordChange(event)}
                  // onBlur={ () => setPasswordMatch()} 
                  onBlur={dispatch(comparePassword())}
                  className={`form-control ${(isPasswordMatch === false) ? 'confirm-password-error' : null}`}
                  placeholder="Enter Confirm Password" {...register('confirm_password', { required: true })} name="confirm_password"
                  onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.confirm_password} required />
              </div>
            </div>

            <div className="form-group row">



              <div className="col-sm-3"><label><b>User Type</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('user_type', { required: true })} name="user_type" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.user_type} required>
                  <option>Select User Type</option>
                  {
                    (userTypesList) ?
                      (userTypesList.map((data) =>
                        <option key={data.id} value={data.id} >{data.name}</option>
                      )) : null
                  }
                </select>
              </div>


              <div className="col-sm-3"><label><b>Profile Image</b></label></div>

              <div className="col-sm-3">
                {
                  (isReadyForUpdate) ?
                    <div className="col-sm-12">
                      <div className="col-sm-3">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input" id="customFile" {...register('profile_image', { required: true })} name="profile_image" onChange={(e) => dispatch(handleImageChange({ [e.target.name]: e.target.value }))} />
                          <label className="custom-file-label" htmlFor="customFile">ppppChoose file</label>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        {/* <img src={`http://localhost:8081`+user.profileImg.map((image)=>(
                          image.profileImg
                      ))}  alt={user.profileImg.map((image)=>(
                          image.profileImg
                      ))} 
                      width="50" height="50"/> */}
                      </div>
                    </div>

                    :


                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile" {...register('profile_image', { required: true})} name="profile_image" onChange={(e) => dispatch(handleImageChange({ [e.target.name]: e.target.files[0] }))} />
                      {/* <input type="file" className="custom-file-input" id="customFile" {...register('profile_image', { required: true })} name="profile_image" onChange={(e) => handleImageUpload(e.target.files[0])} /> */}
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>

                }
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>State</b></label></div>
              <div className="col-sm-3">

                <select className="form-control" {...register('state_id', { required: true })} name="state_id" onChange={(e) => dispatch(getStateCities(e.target.value))} value={stateId} required>
                  <option>Select State</option>
                  {
                    (statesList) ?
                      (statesList.map((data) =>

                        <option key={data.id} value={data.id} >{data.state_name}</option>
                      )) : null
                  }
                </select>
              </div>

              <div className="col-sm-3"><label><b>City</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('city_id', { required: true })} name="city_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.city_id} required>
                  <option>Select City</option>
                  {
                    (citiesList) ?
                      (citiesList.map((data) =>
                        (stateId == data.state_id) ?
                          <option key={data.id} value={data.id} >{data.city_name}</option>
                          : null
                      )) : null
                  }
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Address</b></label></div>
              <div className="col-sm-9">
                <textarea className="form-control" placeholder="Address" {...register('address', { required: true })} name="address" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.address} required />
              </div>
            </div>

            <div className="form-group row">

              <div className="col-sm-3"><label><b>Country</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('country_id', { required: true })} name="country_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.country_id} required>
                  <option>Select Country</option>
                  {
                    (countriesList) ?
                      (countriesList.map((data) =>
                        <option key={data.id} value={data.id} >{data.name}</option>
                      )) : null
                  }
                </select>
              </div>

              <div className="col-sm-3"><label><b>Pin Code</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Pin Code" {...register('pin_code', { required: true })} name="pin_code" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={userDetail.pin_code} required />
              </div>

            </div>

            <button type="submit" className="btn btn-info">{(isReadyForUpdate) ? "Update" : "Submit"}</button>

          </form>
        </div>

      </div>
    </div>
  );

}

export default AddUser;
