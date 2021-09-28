import React, { Component, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { withRouter, useHistory, useParams } from 'react-router-dom';

import LazyLoad from 'react-lazyload';

import { retrieveAll, retrieveOne, removeOne } from '../../redux/features/foodSubCategorySlice';

const AllFoodSubCategoriesList = (props) => {

    console.log('props from lising page')
    console.log(props);
    const dispatch = useDispatch();
    const history = useHistory();
    const allFoodSubCategories = useSelector((state) => state.foodSubCategory.allFoodSubCategories)
    const isLoaded = useSelector((state) => state.foodSubCategory.isLoaded)

    useEffect(() => {
        console.log('I am here')
        dispatch(retrieveAll());
    }, [isLoaded]);


    const handleEditAction = (subCategoryId) => {
        dispatch(retrieveOne(subCategoryId));
        history.push("/edit-food-sub-category/" + subCategoryId);
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
                                    <th width="30%">Food Cateogry</th>
                                    <th width="30%">Sub Cateogry Name</th>
                                    <th width="10%">Status</th>
                                    <th width="20%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (allFoodSubCategories) ?
                                        allFoodSubCategories.map((subCategory, index) => (
                                            <LazyLoad key={subCategory._id}>
                                                <tr key={subCategory._id}>
                                                    <td>{++index + '.'}</td>
                                                    <td>{subCategory.food_category_id.name}</td>
                                                    <td>{subCategory.name}</td>
                                                    <td>{(subCategory.status) ? "Active" : "Not Active"}</td>
                                                    <td>
                                                        <span className="btn btn-primary btn-circle btn-sm" onClick={() => handleEditAction(subCategory._id)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </span>

                                                        <button className="btn btn-danger btn-circle btn-sm" onClick={() => {
                                                            const confirmBox = window.confirm(
                                                                "Do you really want to change active status of this Food Category?"
                                                            )
                                                            if (confirmBox === true) {
                                                                dispatch(removeOne(subCategory._id))
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
    // }
}

export default AllFoodSubCategoriesList;