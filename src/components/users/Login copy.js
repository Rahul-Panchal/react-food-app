import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

// import './login.css';



import {connect} from 'react-redux';
import loginReducer from '../../reducers/loginReducer';
import {handleInputAction, handleSubmitAction} from '../../actions/loginaction';


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <form onSubmit={(e) => this.props.handleSubmit(e,this.props.history)}>
            //     <div className="container">

            //         <h4>Login Details</h4>
            //         <div className="form-group row">
            //             {/* <div className="row"> */}
            //             <div className="col-sm-3"><label><b>User Name</b></label></div>
            //             <div className="col-sm-9"><input type="text" placeholder="Username" name="username" onChange={(e)=>this.props.handleInput(e.target)} value={this.props.username} required /></div>
            //         </div>
            //         <div className="form-group row">
            //             <div className="col-sm-3"><label><b>Password</b></label></div>
            //             <div className="col-sm-9"><input type="password" placeholder="Password" name="password" onChange={(e)=>this.props.handleInput(e.target)} value={this.props.password} required /></div>
            //         </div>

            //         <button type="submit" className="btn btn-info">Login</button>
            //     </div>
            // </form>

                <div class="login">
                     <h1>Login to Web App</h1>
                     <form onSubmit={(e) => this.props.handleSubmit(e,this.props.history)}>
                         <p><input type="text" name="username" value="" placeholder="Username or Email" onChange={(e)=>this.props.handleInput(e.target)} value={this.props.username} required /></p>
                         <p><input type="password" name="password" value="" placeholder="Password" onChange={(e)=>this.props.handleInput(e.target)} value={this.props.password} required /></p>
                         <p class="remember_me">
                         <label>
                             <input type="checkbox" name="remember_me" id="remember_me"/>
                             Remember me on this computer
                        </label>
                         </p>
                         <p class="submit"><input type="submit" name="commit" value="Login"/></p>
                     </form>
                 </div>

                //  <div class="login-help">
                //  <p>Forgot your password? <a href="#">Click here to reset it</a>.</p>
                // </div>


           
        );
    }
}
// export default Login;

const mapStateToProps =(state)=>{

    // console.log('state from login page');
    // console.log(state);

    return {
        // name : state.name,
        // lastname : state.name,
        // token: state.token
        username : state.username,
        password : state.password,
        loggedInUserStatus  : state.loggedInUserStatus,
        loggedInUserDetails : {
            // name     : state.loggedInUserDetails.name,
            // lastname : state.loggedInUserDetails.name,
            // token    : state.loggedInUserDetails.lastname

            name     : '',
            lastname : '',
            token    : ''
            
        }
    }
}
  
const mapDispatchToProps =(dispatch)=>{
    return{
        handleInput : (inputField)=>{
            dispatch(handleInputAction(inputField))
        },
        handleSubmit : (event, history)=>{
            dispatch(handleSubmitAction(event, history))
        },
    }
}


const ShowTheLocationWithRouter = withRouter(Login);

export default connect(mapStateToProps,mapDispatchToProps)(ShowTheLocationWithRouter);