import React, { Component, useState, useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { useHistory,Link, NavLink } from 'react-router-dom';

import LazyLoad from 'react-lazyload';

import { retrieveAll, retrieveOne, removeOne } from '../../redux/features/foodCategorySlice';

const AllFoodCategoriesList = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const allFoodCategoreis = useSelector( (state) => state.foodCategory.allFoodCategoreis)
    const isLoaded = useSelector( (state) => state.foodCategory.isLoaded)
    
    useEffect(() => {
        dispatch(retrieveAll());
    },[isLoaded]);

    const handleEditAction = (categoryId) => {
        dispatch(retrieveOne(categoryId));
        history.push("/edit-food-category/"+categoryId);
    }


    const addFoodSubCategoyAction = (categoryId) => {
        history.push("/add-food-sub-category/"+categoryId);
    }

    return (
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th width="10%">Sr. NO.</th>
                                    <th width="50%">Foo Cateogry Name</th>
                                    <th width="10%">Status</th>
                                    <th width="20%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (allFoodCategoreis) ?
                                        allFoodCategoreis.map((category, index) => (
                                            <LazyLoad key={category._id}>
                                                <tr key={category._id}>
                                                    <td>{++index + '.'}</td>
                                                    <td>{category.name}</td>
                                                    <td>{(category.status) ? "Active" : "Not Active"}</td>
                                                    <td>
                                                        <span className="btn btn-primary btn-circle btn-sm" onClick={() => handleEditAction(category._id)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </span>
                                                        
                                    

                                                        <button className="btn btn-danger btn-circle btn-sm" onClick={() => {
                                                                const confirmBox = window.confirm(
                                                                "Do you really want to change active status of this Food Category?"
                                                                )
                                                                if (confirmBox === true) {
                                                                    dispatch(removeOne(category._id))
                                                                }
                                                            }}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>

                                                        <span className="btn btn-primary btn-circle btn-sm" onClick={() => addFoodSubCategoyAction(category._id)}>
                                                            <i className="fas fa-plus-square" title="Add Food Sub Category"></i>
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
    // }
}

export default AllFoodCategoriesList;