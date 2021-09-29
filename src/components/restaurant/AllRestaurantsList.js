import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { retrieveAll as getAllUsersList } from '../../redux/features/userSlice';

import { retrieveAll as getAllRestaurantsList, clearFormData, handleSubmitAction, updateInputDetails, handleImageChange, comparePassword, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getUserStatusList, getUserTypesList } from '../../redux/features/restaurantSlice';
import LazyLoad from 'react-lazyload';

const AllRestaurantsList = (props) => {


    const Loading = () => {
        return (
            <tr className="Post Loading">
                <td>....Loading</td>
            </tr>
        );
    }

    const dispatch = useDispatch();
    const history = useHistory();


    const allRestaurantsList  = useSelector((state) => state.restaurant.allRestaurantsList);
    const countriesList = useSelector((state) => state.restaurant.countriesList);
    const statesList = useSelector((state) => state.restaurant.statesList);
    const citiesList = useSelector((state) => state.restaurant.citiesList);
    const allUsersList = useSelector((state)=> state.user.allUsersList);


    const handleEditAction = (restaurantId) =>{
        dispatch(retrieveOne(restaurantId));
        history.push("/edit-restaurant/"+restaurantId);
    }

    const addFoodProductsAction = (restaurantId) => {
        history.push("/select-food-products/"+restaurantId);
    }

    useEffect(() => {

        console.log('restaurant Details')
        // console.log(userDetail);
        // console.log('id :: '+id);
    
        // console.log('isReadyForUpdate :: ' + isReadyForUpdate);
    
    
        dispatch(getCountriesList());
        dispatch(getStateList());
        dispatch(getAllUsersList());
        dispatch(getAllRestaurantsList());
        dispatch(getCitiesList());
    
        return () => {
          dispatch(clearFormData());
        }
    
      }, []);

    return (
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Restaurants List</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th width="10%">Sr. NO.</th>
                                    <th width="25%">Restaurant Name</th>
                                    <th width="10%">Banner Image</th>
                                    <th width="10%">Owner Name</th>
                                    <th width="10%">Address</th>
                                    <th width="10%">Contact No.</th>
                                    <th width="10%">State</th>
                                    <th width="10%">City</th>
                                    <th width="15%">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    (allRestaurantsList) ?
                                    allRestaurantsList.map((restaurant, index) => (
                                            <LazyLoad key={restaurant._id} placeholder={Loading()}>
                                                <tr key={restaurant._id}>
                                                    <td>{++index + '.'}</td>
                                                    <td>{restaurant.restaurant_name}</td>
                                                    <td>
                                                        <img src={`http://localhost:8081/images/banner_images/`+restaurant.banner_image}  alt={restaurant.banner_image} width="25" height="25"/>
                                                    </td>
                                                    <td>{restaurant.owner_id.name}</td>
                                                    <td>
                                                    {/* {
                                                        userTypesList.map((type)=>(
                                                            (type.id == user.user_type) ? type.name : null
                                                        ))
                                                    } */}

                                                        {restaurant.address}
                                                    </td>
                                                    {/* <td>{this.convertDate(user.dob)}</td> */}
                                                    <td>{restaurant.contact_no}</td>
                                                    <td>
                                                    {
                                                        statesList.map((state)=>(
                                                            (state.id == restaurant.state_id) ? state.state_name : null
                                                        ))
                                                    }
                                                    </td>
                                                    <td>
                                                    {
                                                        citiesList.map((city)=>(
                                                            (city.id == restaurant.city_id) ? city.city_name : null
                                                        ))
                                                    }
                                                    </td>
                                                    <td>
                                                        <span className="btn btn-primary btn-circle btn-sm" onClick={() => handleEditAction(restaurant._id)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </span>
                                                        
                                    

                                                        <button className="btn btn-danger btn-circle btn-sm" onClick={() => {
                                                                const confirmBox = window.confirm(
                                                                "Do you really want to change active status of this Restaurant ?"
                                                                )
                                                                if (confirmBox === true) {
                                                                    dispatch(removeOne(restaurant._id))
                                                                }
                                                            }}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>

                                                        <span className="btn btn-primary btn-circle btn-sm" onClick={() => addFoodProductsAction(restaurant._id)}>
                                                            <i className="fas fa-plus-square" title="Add Food Products"></i>
                                                        </span>

                                                    </td>
                                                </tr>
                                            </LazyLoad>
                                        )) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AllRestaurantsList;