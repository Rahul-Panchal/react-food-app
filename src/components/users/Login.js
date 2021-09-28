import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, useHistory } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';

import { useForm } from 'react-hook-form';

// import './login.css';



import { connect } from 'react-redux';
import loginReducer from '../../store/reducers/loginReducer';
//'../../reducers/loginReducer';
// import { handleInputAction, handleSubmitAction } from '../../store/actions/loginaction';

import {handleLoginAction, updateInputDetails} from '../../redux/features/loginSlice';



const Login = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const formData = useSelector((state) => state.login); 
    // const { handleSubmit, control, reset, register } = useForm({
    //     defaultValues: {
    //       username: "",//formData.username,
    //       password: "",//formData.password,
    //     },
    //   });
    // const { handleSubmit, control, reset, register } = useForm();

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        {
            defaultValues: {
                username: "",//formData.username,
                password: "",//formData.password,
            },
        }
    );
    // const onSubmit = data => console.log(data);         

    const onSubmit = async (data) => {

        await dispatch(handleLoginAction(data));

        // console.log('data onSubmit ')
        // console.log(data)

        reset({
            username: "",
            password: "",
        });

        history.push("/welcome");
    };

    // useEffect(()=>{
    //     console.log('formData');
    //     console.log(formData);
    //             // dispatch()
    // },[]);

    return (
        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    {/* <form className="user" method="POST" onSubmit={(e) => dispatch(handleSubmit(e, history))}> */}
                                    <form className="user" onSubmit={handleSubmit(onSubmit)}>  
                                        <div className="form-group">
                                        <input id="username"  {...register('username', { required: true, maxLength: 30 })} className="form-control form-control-user" placeholder="Username or Email" onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={formData.username}/>
                                            {/* <input type="text" className="form-control form-control-user" name="username" placeholder="Username or Email"  onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={formData.username} required /> */}
                                        </div>
                                        {/* <input {...register("firstName")} />
      <input {...register("lastName")} /> */}

                                        <div className="form-group">
                                            <input type="password" {...register('password', { required: true, maxLength: 30 })}  className="form-control form-control-user" name="password" placeholder="Password"  onChange={(e)=>dispatch(updateInputDetails({[e.target.name] : e.target.value}))} value={formData.password} required />
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                <label className="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        {/* <a href="index.html" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </a> */}
                                        <input type="submit" className="btn btn-primary btn-user btn-block" name="commit" value="Login" />

                                        {/* <hr> */}
                                        <a href="index.html" className="btn btn-google btn-user btn-block">
                                            <i className="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                            <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a>
                                    </form>
                                    {/* <hr> */}
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="register.html">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default Login;