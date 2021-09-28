import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';



// import Navbar from './Layout/Navbar';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

import Home from './components/Home';
import About from './components/About';
import Users from './components/users/Users';
import EditUser from './components/users/EditUser';
import UsersList from './components/users/UsersList';
import AllUsersList from './components/users/AllUsersList';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import Welcome from './components/Welcome';

import {BrowserRouter, Route} from 'react-router-dom';

import {Calendar} from 'primereact/calendar';
import {Dropdown} from 'primereact/dropdown';

import {connect} from 'react-redux';
import {changeFirstName, changeLastName, saveTokenValue} from './actions/myaction';
// import { token } from 'morgan';


import Cookies from 'universal-cookie';


class App extends  React.Component{
  constructor(props) {
    super(props);
    // this.state = {loggedInUserName: "Ram Kumar"};
    // this.state = {
    //   loggedInStatus: false, 
    //   user : {}
    // };
  }


  componentDidMount(){
    console.log('I am logged in');
  }

  render() {

    console.log('this.props from app.js ')
    console.log(this.props)

  // const citySelectItems = [
  //     {label: 'New York', value: 'NY'},
  //     {label: 'Rome', value: 'RM'},
  //     {label: 'London', value: 'LDN'},
  //     {label: 'Istanbul', value: 'IST'},
  //     {label: 'Paris', value: 'PRS'}
  // ];

  // const cities = [
  //     {name: 'New York', code: 'NY'},
  //     {name: 'Rome', code: 'RM'},
  //     {name: 'London', code: 'LDN'},
  //     {name: 'Istanbul', code: 'IST'},
  //     {name: 'Paris', code: 'PRS'}
  // ];

    const cookies = new Cookies();
    let token =  cookies.get('token')

    console.log('token from APP : ' +token);

    return (
      <BrowserRouter>
        <div className="App">

        <Header/>
        
        {
          (token) ? 
         
          <Navbar name={this.props.name} lastname={this.props.lastname} token={this.props.token}/>
            : null
          }
            {/* <Route exact path="/" component={Home}/> */}
            <Route exact path="/" component={Login}/>
            <Route path="/about" component={About}/>
            <Route exact path="/users/:id" component={EditUser}/>
            <Route exact path="/users" component={Users}/>
            {/* <Route path="/users-list" component={UsersList}/> */}
            <Route path="/all-users-list" component={AllUsersList}/>
            <Route path="/welcome" component={Welcome}/>
            <Route path="/logout" component={Logout}/>
          {/* <header className="App-header"> */}
          {/* <Users></Users> */}
          {/* <Dropdown value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="Select a City"/>
          <Calendar value={this.state.date} onChange={(e) => this.setState({date: e.value})}></Calendar>
          <Dropdown optionLabel="name" value={this.state.city} options={cities} onChange={(e) => {this.setState({city: e.value})}} placeholder="Select a City"/>
          <Dropdown optionLabel="name" value={this.state.city} options={cities} onChange={(e) => {this.setState({city: e.value})}} filter={true} filterPlaceholder="Select City" filterBy="label,value" placeholder="Select a City"/> */}

          {/* </header> */}
          {/* <button onClick={()=>this.props.changeFirstName("Ajay")}>Change FIRST Name</button>
          <button onClick={()=>this.props.changeLastName("Panchal")}>Change LAST Name</button> */}
        
          <Footer/>
        </div>
      </BrowserRouter>
      
    );
  }
}

const mapStateToProps =(state)=>{
  console.log('state');
  console.log(state);
  return {
    // name            : state.name,
    // lastname        : state.lastname,
    // token           : state.token,
    // user            : state.user,
    // loggedInStatus  : state.loggedInStatus

    name            : state.login.loggedInUserDetails.name,
    lastname        : state.login.loggedInUserDetails.name,
    token           : state.login.loggedInUserDetails.token,
    user            : state.user,
    loggedInStatus  : state.loggedInStatus
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    // changeFirstName : (name)=>{
    //   dispatch(changeFirstName(name))
    // },
    // changeLastName : (lastname)=>{
    //   dispatch(changeLastName(lastname))
    // },
    // saveTokenValue : (token)=>{
    //   dispatch(saveTokenValue(token))
    // }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
