import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

// import LazyLoad from 'react-lazyload';

import { connect } from 'react-redux';

import { Link, useHistory } from "react-router-dom";


import { retrieveAll,retrieveOne, removeOne, getStateList, getCitiesList, getUserStatusList,getUserTypesList } from '../../redux/features/userSlice';


const AllUsersList = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const usersList = useSelector((state)=> state.user.allUsersList);
    const isLoaded = useSelector((state)=> state.user.isLoaded);
    const statesList = useSelector((state)=> state.user.statesList);
    const citiesList = useSelector((state)=> state.user.citiesList);
    const userStatusList = useSelector((state)=> state.user.userStatusList);
    const userTypesList = useSelector((state)=> state.user.userTypesList);

    useEffect(()=>{

        dispatch(retrieveAll());
        dispatch(getStateList());
        dispatch(getCitiesList());
        dispatch(getUserStatusList());
        dispatch(getUserTypesList());

    },[isLoaded]);

    const handleEditAction = (userId) =>{
        dispatch(retrieveOne(userId));
        history.push("/edit-user/"+userId);
    }

    return (
        <div className="container-fluid">

            <div className="row">


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
                                        <th width="20%">Name</th>
                                        {/* <th width="10%">Profile Image</th> */}
                                        <th width="10%">Email</th>
                                        <th width="10%">User Type</th>
                                        <th width="10%">Contact No.</th>
                                        <th width="10%">State</th>
                                        <th width="10%">City</th>
                                        <th width="10%">Status</th>
                                        <th width="10%">Action</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        (usersList) ?
                                            usersList.map((user, index) => (
                                                // <LazyLoad key={user._id} placeholder={this.Loading()}>
                                                    <tr key={user._id}>
                                                        <td>{++index + '.'}</td>
                                                        <td>{user.name}</td>
                                                        {/* <td>
                            <img src={`http://localhost:8081`+user.profileImg.map((image)=>(
                                    image.profileImg
                                ))}  alt={user.profileImg.map((image)=>(
                                    image.profileImg
                                ))} 
                                width="50" height="50"/>
                
                        </td> */}
                                                        <td>{user.email_id}</td>
                                                        <td>
                                                            {
                                                                userTypesList.map((type) => (
                                                                    (type.id == user.user_type) ? type.name : null
                                                                ))
                                                            }
                                                        </td>
                                                        {/* <td>{this.convertDate(user.dob)}</td> */}
                                                        <td>{user.contact_no}</td>
                                                        <td>
                                                            {
                                                                statesList.map((state) => (
                                                                    (state.id == user.state_id) ? state.state_name : null
                                                                ))
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                citiesList.map((city) => (
                                                                    (city.id == user.city_id) ? city.city_name : null
                                                                ))
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                userStatusList.map((status) => (
                                                                    (status.id == user.is_active) ? status.name : null
                                                                ))
                                                            }
                                                        </td>
                                                        <td>
                                                            <span className="btn btn-primary btn-circle btn-sm" onClick={() => handleEditAction(user._id)}>
                                                                <i className="fas fa-pencil-alt"></i>
                                                            </span>

                                                            <button className="btn btn-danger btn-circle btn-sm" onClick={() => {
                                                                    const confirmBox = window.confirm(
                                                                    "Do you really want to change active status of this Food Category?"
                                                                    )
                                                                    if (confirmBox === true) {
                                                                        dispatch(removeOne(user._id))
                                                                    }
                                                                }}>
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                // </LazyLoad>
                                            )) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default AllUsersList;