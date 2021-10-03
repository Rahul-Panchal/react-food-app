import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { retrieveAll as getAllUsersList } from '../../redux/features/userSlice';

import { retrieveAll as getAllFoodProducts, clearFormData, handleSubmitAction, updateInputDetails, handleImageChange, comparePassword, retrieveAll, retrieveOne, removeOne, getCountriesList, getStateList, getStateCities, getCitiesList, getUserStatusList, getUserTypesList } from '../../redux/features/foodProductSlice';
import LazyLoad from 'react-lazyload';

const AllFoodProducts = (props) => {


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

    const handleEditAction = (foodProductId) =>{
        dispatch(retrieveOne(foodProductId));
        history.push("/edit-food-product/"+foodProductId);
    }

    useEffect(() => {

        console.log('foodProduct Details')
        // console.log(userDetail);
        // console.log('id :: '+id);
    
        // console.log('isReadyForUpdate :: ' + isReadyForUpdate);
    
    
        dispatch(getCountriesList());
        dispatch(getStateList());
        dispatch(getAllUsersList());
        dispatch(getAllFoodProducts());
        dispatch(getCitiesList());
    
        return () => {
          dispatch(clearFormData());
        }
    
      }, []);

    return (
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Food Prodcuts</h6>
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
                                                    <td>{foodProduct.food_sub_category_id.food_category_id.name}</td>
                                                    <td>{foodProduct.food_sub_category_id.name}</td>
                                                    <td>{foodProduct.product_name}</td>
                                                    <td>
                                                        <img src={`http://localhost:8081/images/product_images/`+foodProduct.product_image}  alt={foodProduct.product_image} width="25" height="25"/>
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

export default AllFoodProducts;