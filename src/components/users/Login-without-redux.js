import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';



import {connect} from 'react-redux';
import {changeFirstName, changeLastName, saveTokenValue,updateLoggedInUserDetails} from '../../actions/myaction';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token : ''
        }
    }

    /**
     * this is submit event
     */
    handleSubmit(e) {
        e.preventDefault();
    
        var url = "http://localhost:8081/login";
        var methodType = "POST";

        // const data = new FormData(e.target);

        var data = new URLSearchParams();

        for (const pair of new FormData(e.target)) {
            data.append(pair[0], pair[1])
        }

        fetch(url, {
            method: methodType,
            body: data,
        })
        .then(res => res.json())
        .then(res2 => {
            console.log('login response');
            console.log(res2);
            console.log(res2.user.name);
            // if(res2==='ok'){
                this.props.history.push('/welcome',{
                // this.props.history.push('/',{
                    state: { 
                        isLoggedIn :true,
                        loggedInUserName : res2.user.name,
                        token : res2.token
                    }
                });

                this.props.changeFirstName(res2.user.name);
                this.props.changeLastName(res2.user.name);
                this.props.saveTokenValue(res2.token);

            // }
        });
    }

    onChange = (e) => {
        console.log(e.target.name)
    
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        
        console.log('state');
        console.log(state);
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="container">

                    <h4>Login Details</h4>
                    <div className="form-group row">
                        {/* <div className="row"> */}
                        <div className="col-sm-3"><label><b>User Name</b></label></div>
                        <div className="col-sm-9"><input type="text" placeholder="Username" name="username" onChange={this.onChange} value={this.state.username} required /></div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-3"><label><b>Password</b></label></div>
                        <div className="col-sm-9"><input type="password" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} required /></div>
                    </div>

                    <button type="submit" className="btn btn-info">Login</button>
                </div>
            </form>
        );
    }
}
// export default Login;

const mapStateToProps =(state)=>{

    console.log('state from login page');
    console.log(state);

    return {
        name : state.name,
        lastname : state.name,
        token: state.token
    }
}
  
const mapDispatchToProps =(dispatch)=>{
    return{
        changeFirstName : (name)=>{
            dispatch(changeFirstName(name))
        },
        changeLastName : (lastname)=>{
            dispatch(changeLastName(lastname))
        },
        saveTokenValue : (token)=>{
            dispatch(saveTokenValue(token))
        },
        updateLoggedInUserDetails : (token)=>{
            dispatch(updateLoggedInUserDetails(token))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);