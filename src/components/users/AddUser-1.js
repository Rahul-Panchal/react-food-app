import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

// import '../../containers/Login.css';

class AddUser extends React.Component{

  constructor(props) {

    console.log(' state from add user page');
    console.log(state);

    super(props);
    // this.state = {
    //   isReadyForEdit : false,
    //   userDetails : null
    // };
  }

  handleSubmit(e){
    e.preventDefault();
    // const url = "http://localhost:8081/users/add-user";
    const url = "http://localhost:8081/users/save-user-details";
    var data = new URLSearchParams();

    for(const pair of new FormData(e.target)){
      data.append(pair[0],pair[1])
    }
    fetch(url,{
      method:"post",
      // headers: {
      //   "Content-Type": "text/plain"
      // },
      body:data, 
    }).then(res=>res.json()).then(res2=>
      this.props.history.push('/users-list')
    );
  }

    render(){

        return (
          // <form method="POST" action="http://localhost:8081/users/add-user">
            <form onSubmit={(e)=>this.handleSubmit(e)}>
            <h1>Hello</h1>
            <p>Enter your name:</p>
            <div className="container">
              <div className="row">
                  <div className="col-sm-2"><label><b>User Name</b></label></div>
                  <div className="col-sm-10"><input type="text" placeholder="Enter Name" name="user_name" required/></div>
              </div>
              <div className="row">
                  <div className="col-sm-2"><label><b>Age</b></label></div>
                  <div className="col-sm-10"><input type="text" placeholder="Enter Age" name="age" required/></div>
              </div>
              <div className="row">
                  <div className="col-sm-2"><label><b>Salary</b></label></div>
                  <div className="col-sm-10"><input type="text" placeholder="Enter Salary" name="salary" required/></div>
              </div>
              
            </div>
            <button type="submit" className="waves-effect waves-light btn">Submit</button>
          </form> 
        );
    }
}

export default withRouter(AddUser);