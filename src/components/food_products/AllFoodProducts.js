import React, { useEffect, useState } from 'react';
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

    const [filterData, filterResult] = useState("");

    const allFoodProducts  = useSelector((state) => state.foodProduct.allFoodProducts);
    const userType  = useSelector((state)=>state.login.loggedInUserDetails.user_type);

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

                    <div className="form-group row">
                        <div className="col-sm-3"><label><b>Search</b></label></div>
                        <div className="col-sm-9">
                            <input type="text"  name="search" className="form-control" placeholder="Search For...." onChange={(e)=>filterResult(e.target.value)} />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th style={{ width: '9%'}}>Sr. No.</th>
                                    <th style={{ width: '16%'}}>Food Category</th>
                                    <th style={{ width: '19%'}}>Food Sub Category</th>
                                    <th style={{ width: '16%'}}>Product Name</th>
                                    <th style={{ width: '15%'}}>Product Image</th>
                                    <th style={{ width: '10%'}}>Status</th>
                                    <th style={{ width: '15%'}}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    (allFoodProducts) ?
                                    allFoodProducts.filter( (val)=> {
                                        if(filterData===''){
                                            return val;
                                        } else if(
                                            val.product_name.toLowerCase().includes(filterData.toLowerCase()) || 
                                            val.food_sub_category_id.food_category_id.name.toLowerCase().includes(filterData.toLowerCase()) || 
                                            val.food_sub_category_id.name.toLowerCase().includes(filterData.toLowerCase())
                                        ) {
                                            return val;
                                        }
                                    }).map((foodProduct, index) => (
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
                                                    {
                                                        (['1','2'].includes(userType)) ?
                                                        <>
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
                                                        </>
                                                        :
                                                        <span className="btn btn-primary btn-circle btn-sm">
                                                            <i className="fa fa-list-ol" title="view Restaurant Food Products"></i>
                                                        </span>
                                                    }
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