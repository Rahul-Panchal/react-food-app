import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import DatePicker from "react-datepicker";

// import { getAllUsersList } from '../../store/actions/useraction';
// import { handleInputAction, validatePassword, getCountriesList, getStateList, getCitiesList, getStateCities, handleImageChange, handleDateChange, handleSubmitAction } from '../../store/actions/restaurantaction';

 import { retrieveAll as getAllUsersList } from '../../redux/features/userSlice';

import { clearFormData, handleSubmitAction, updateInputDetails, handleImageChange, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getRestaurantStatusList, getUserTypesList } from '../../redux/features/restaurantSlice';
import { useForm } from 'react-hook-form';


const AddRestaurant = (props) => {

  const restaurantDetail = useSelector((state) => state.restaurant.restaurantDetails)
  const isReadyForUpdate = useSelector((state) => state.restaurant.isReadyForUpdate)

  const dispatch = useDispatch();
  const history = useHistory();


  const countriesList = useSelector((state) => state.restaurant.countriesList);
  const statesList = useSelector((state) => state.restaurant.statesList);
  const citiesList = useSelector((state) => state.restaurant.citiesList);
  const allUsersList = useSelector((state)=> state.user.allUsersList);
  const restaurantStatusList = useSelector((state)=> state.restaurant.restaurantStatusList);
  const stateId = useSelector((state) => state.restaurant.stateId);
  // const isPasswordMatch = useSelector((state) => state.restaurant.isPasswordMatch);

  // const { id } = useParams();

  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    {
      defaultValues: {
        _id                       : "",
        restaurant_name           : "",
        owner_id                  : "",
        restaurant_opening_time   : "",
        restaurant_closing_time   : "",
        restaurant_current_status : "",
        banner_image              : "",
        contact_no                : "",
        email_id                  : "",
        address                   : "",
        city_id                   : "",
        state_id                  : "",
        pin_code                   : "",
        country_id                : "",
        delivery_area_in_km       : "",
        minimum_order_value       : "",
        restaurant_desc           : "",
        food_image                : "", // [ Food Image Upload and Menu ]
        delivery_maximum_time     : "", // [on show website Like 30 min]
        gst_percentage            : "",
        delivery_charge           : "",
        is_active                 : "",
      },
    }
  );

  useEffect(() => {

    console.log('userDetail Details')
    // console.log(userDetail);
    // console.log('id :: '+id);

    console.log('isReadyForUpdate :: ' + isReadyForUpdate);


    dispatch(getCountriesList());
    dispatch(getStateList());
    dispatch(getAllUsersList());
    dispatch(getRestaurantStatusList());

    return () => {
      dispatch(clearFormData());
    }

  }, []);

  const onSubmit = async (data) => {
    console.log('userDetail submit form Details')
    console.log(data);
    await dispatch(handleSubmitAction(data));
    history.push("/restaurants-list");
  };

  return (
  
    <div className="container-fluid">

      <div className="row">
        <div className="container">

          <form className="user" onSubmit={handleSubmit(onSubmit)}>

            <div class="form-header">
              {"Add New Restaurant"}
            </div>



            <div className="form-group row">
              <div className="col-sm-3"><label><b>Restaurant Name</b></label></div>
              <div className="col-sm-3">
                <input type="text" {...register('restaurant_name', { required: true})} name="restaurant_name" className="form-control" placeholder="Restaurant Name" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.name} required />
              </div>
              <div className="col-sm-3"><label><b>Owner Name</b></label></div>
              <div className="col-sm-3">
                {/* <input type="text" className="form-control" placeholder="Enter User Name" name="owner_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.owner_id} required /> */}
                <select className="form-control" {...register('owner_id', { required: true})}  name="owner_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.owner_id} required>
                  <option>Select Owner</option>
                  {
                    (allUsersList) ?
                      (allUsersList.map((data) =>

                        <option key={data._id} value={data._id} >{data.name}</option>
                      )) : null
                  }
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Restaurant Description</b></label></div>
              <div className="col-sm-9">
                <textarea className="form-control" placeholder="Restaurant Description" {...register('restaurant_desc', { required: false})} name="restaurant_desc" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.restaurant_desc} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Restaurant Opening Time</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Restaurant Opening Time" {...register('restaurant_opening_time', { required: false})}  name="restaurant_opening_time" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.restaurant_opening_time} />
              </div>
              <div className="col-sm-3"><label><b>Restaurant Closing Time</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Restaurant Closing Time" {...register('restaurant_closing_time', { required: false})}  name="restaurant_closing_time" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.restaurant_closing_time} />
              </div>
            </div>





            <div className="form-group row">
              <div className="col-sm-3"><label><b>Restaurant Current Status</b></label></div>
              <div className="col-sm-3">
                {/* <input type="text" className="form-control" placeholder="Restaurant Current Status"  {...register('restaurant_current_status', { required: false})}  name="restaurant_current_status" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.restaurant_current_status} required /> */}
                <select className="form-control" {...register('restaurant_current_status', { required: false })} name="restaurant_current_status" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={restaurantDetail.restaurant_current_status}>
                    <option>Select Current Status</option>
                    {
                      (restaurantStatusList) ?
                        (restaurantStatusList.map((data) =>
                          // (user_type == data.id) ?
                          <option key={data.id} value={data.id} >{data.name}</option>
                          // :null
                        )) : null
                    }
                  </select>
              </div>
              

              <div className="col-sm-3"><label><b>Banner Image</b></label></div>
              <div className="col-sm-3">
                <div className="custom-file">
                  {/* <input type="file" className="custom-file-input" id="customFile" name="banner_image" onChange={(e) => handleImageChange(e.target)} /> */}
                  <input type="file" className="custom-file-input" id="customFile" {...register('banner_image', { required: true})} name="banner_image" onChange={(e) => dispatch(handleImageChange({ [e.target.name]: e.target.files[0] }))} />
                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Email Id</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Email Id" {...register('email_id', { required: false})} name="email_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.email_id} />
              </div>
              <div className="col-sm-3"><label><b>Contact No.</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Contact No." {...register('contact_no', { required: false})} name="contact_no" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.contact_no} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>State</b></label></div>
              <div className="col-sm-3">

                {/* <select className="form-control" name="state" onChange={this.handleStateChange} value={this.state.restaurantDetail.state} required> */}
                <select className="form-control"  {...register('state_id', { required: false})} name="state_id" onChange={(e) => dispatch(getStateCities(e.target.value))} value={restaurantDetail.state_id} >
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
                <select className="form-control" {...register('city_id', { required: false})}  name="city_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.city_id} >
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
                {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
                <textarea className="form-control" placeholder="Address" {...register('address', { required: false})} name="address" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.address} required />
              </div>
            </div>

            <div className="form-group row">

              <div className="col-sm-3"><label><b>Country</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" {...register('country_id', { required: false})}  name="country_id" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.country_id} >
                  <option>Select Country</option>
                  {
                    (countriesList) ?
                      (countriesList.map((data) =>
                        // (counrty_id == data.id) ?
                        <option key={data.id} value={data.id} >{data.name}</option>
                        // :null
                      )) : null
                  }
                </select>
              </div>

              <div className="col-sm-3"><label><b>Pin Code</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Pin Code" {...register('pin_code', { required: false})} name="pin_code" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.pin_code}  />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Delivery Area In KM</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Delivery Area In KM"  {...register('delivery_area_in_km', { required: false})}  name="delivery_area_in_km" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.delivery_area_in_km}/>
              </div>
              <div className="col-sm-3"><label><b>Minimum Order Value</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Minimum Order Value"  {...register('minimum_order_value', { required: false})}  name="minimum_order_value" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.minimum_order_value} />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-3"><label><b>Delivery Maximum Time</b></label></div>
              <div className="col-sm-3">
                {/* <input type="text" className="form-control" placeholder="Enter Name" name="name" onChange={this.onChange} value={this.state.restaurantDetail.name} required /> */}
                <input type="text" className="form-control" placeholder="Delivery Maximum Time" {...register('delivery_maximum_time', { required: false})} name="delivery_maximum_time" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.delivery_maximum_time}/>
              </div>
              <div className="col-sm-3"><label><b>Delivery Charge</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Delivery Charge" {...register('delivery_charge', { required: false})} name="delivery_charge" onChange={(e) => dispatch(updateInputDetails({ [e.target.name]: e.target.value }))} value={restaurantDetail.delivery_charge}/>
              </div>
            </div>


            <button type="submit" className="btn btn-info">{"Submit"}</button>

          </form>
        </div>

      </div>
    </div>
  );

}

export default AddRestaurant;