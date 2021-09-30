import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { retrieveAll as getAllUsersList } from '../../redux/features/userSlice';

import { retrieveOne as getRestaurantDetail} from '../../redux/features/restaurantSlice';
import { getRestaurantFoodProducts as getAllFoodProducts, clearFormData, handleSubmitAction, updateInputDetails, handleImageChange, comparePassword, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getUserStatusList, getUserTypesList } from '../../redux/features/foodProductSlice';
import LazyLoad from 'react-lazyload';

const RestaurantFoodProducts = (props) => {


    const Loading = () => {
        return (
            <tr className="Post Loading">
                <td>....Loading</td>
            </tr>
        );
    }

    const dispatch = useDispatch();
    const history = useHistory();

    const allFoodProducts  = useSelector((state) => state.foodProduct.allFoodProducts);
    const restaurantDetail = useSelector((state) => state.restaurant.restaurantDetails)

    const handleEditAction = (foodProductId) =>{
        dispatch(retrieveOne(foodProductId));
        history.push("/edit-food-product/"+foodProductId);
    }

    const {restaurant_id}  =useParams ();

    useEffect(() => {

        console.log('foodProduct Details')
        // console.log(userDetail);
        console.log('restaurant_id :: '+restaurant_id);
    
        // console.log('isReadyForUpdate :: ' + isReadyForUpdate);
    
    
        dispatch(getCountriesList());
        dispatch(getStateList());
        dispatch(getAllUsersList());
        dispatch(getRestaurantDetail(restaurant_id))
        dispatch(getAllFoodProducts(restaurant_id));
        dispatch(getCitiesList());
    
        return () => {
          dispatch(clearFormData());
        }
    
      }, []);

    return (
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Food Prodcuts for {restaurantDetail.restaurant_name}</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th width="10%">Sr. No.</th>
                                    <th width="20%">Food Category</th>
                                    <th width="20%">Food Sub Category</th>
                                    <th width="20%">Product Name</th>
                                    <th width="10%">Product Image</th>
                                    <th width="10%">Status</th>
                                    <th width="10%">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    (allFoodProducts) ?
                                    allFoodProducts.map((foodProduct, index) => (
                                            <LazyLoad key={foodProduct._id} placeholder={Loading()}>
                                                <tr key={foodProduct._id}>
                                                    <td>{++index + '.'}</td>
                                                    <td>{foodProduct.food_product_id.food_sub_category_id.food_category_id.name}</td>
                                                    <td>{foodProduct.food_product_id.food_sub_category_id.name}</td>
                                                    <td>{foodProduct.food_product_id.product_name}</td>
                                                    <td>
                                                        <img src={`http://localhost:8081/images/product_images/`+foodProduct.food_product_id.product_image}  alt={foodProduct.food_product_id.product_image} width="25" height="25"/>
                                                    </td>
                                                    <td>{foodProduct.status ? "Active" : "Not Active"}</td>
                                                    <td>
                                                        <span className="btn btn-primary btn-circle btn-sm" onClick={() => handleEditAction(foodProduct._id)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </span>

                                                        <button className="btn btn-danger btn-circle btn-sm" onClick={() => {
                                                                const confirmBox = window.confirm(
                                                                "Do you really want to change active status of this foodProduct ?"
                                                                )
                                                                if (confirmBox === true) {
                                                                    dispatch(removeOne(foodProduct._id))
                                                                }
                                                            }}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>
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

export default RestaurantFoodProducts;