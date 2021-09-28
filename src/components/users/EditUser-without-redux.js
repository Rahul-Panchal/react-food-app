import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Redirect } from 'react-router-dom';

import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

// import '../../App.css';

// import {statesList} from '../../state.js';

// import '../../containers/Login.css';

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReadyForEdit: false,
      match: null,
      statesList: null,
      stateId: null,
      citiesList: null,
      userDetails: {
        id: "",
        name: "",
        user_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        dob: "",
        state: "",
        city: "",
        age: "",
        address: "",
        salary: "",
        profileImg: "",
        // dob: new Date()
      },
    };
  }

  /**
   * this is submit event
   */
  handleSubmit(e) {
    e.preventDefault();
    const id = (this.state.isReadyForEdit) ? this.state.userDetails._id : null;
    console.log('id is ' + id);
    var url = null;
    var methodType = null;
    if (id != null) {
      url = "http://localhost:8081/users/update-user-details/" + id;
      methodType = "PUT";
    } else {
      // url = "http://localhost:8081/users/save-user-details";
      url = "http://localhost:8081/users/user-profile";
      methodType = "POST";
    }

    const data = new FormData(e.target);
    // var data = new URLSearchParams();

    // for (const pair of new FormData(e.target)) {
    //   data.append(pair[0], pair[1])
    // }

    // data.append('profileImg', this.state.profileImg);

    // const data = new FormData() 
    // data.append('profileImg', this.state.profileImg)

    // console.log('data');
    // console.log(data);

    fetch(url, {
      method: methodType,
      body: data,
    }).then(res => res.json()).then(res2 =>
      this.props.history.push('/users-list')
    );
  }

  componentDidMount() {
    if (this.props.location.state) {
      console.log('componentDidMount');
      console.log(this.props.location.state);
      this.setState({
        isReadyForEdit: this.props.location.state.isReadyForEdit,
        userDetails: this.props.location.state.userDetails
      });
    }

    // console.log(this.props.location.state.userDetails);
    // if(this.props.location != null) {
    //   this.setState({
    //     isReadyForEdit  : true,
    //     // userDetails     : this.props.location.state.userDetails
    //   });
    // }

    this.getStatesList();

  }


  getStatesList() {
    fetch('http://localhost:3000/js/state.json', {
      // data: 'Station',
      // data: 'NameStation',
      method: "GET"
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ statesList: response });
        /**
         * call in case if edit
         */
        if (this.state.isReadyForEdit) {
          this.getCitiesList(this.state.userDetails.state);
        }
      });
  }

  handleImageChange = (event) => {
    const state = this.state.userDetails;
    // state[event.target.name] = URL.createObjectURL(event.target.files[0])
    state[event.target.name] = event.target.files[0];
    this.setState(state);
    console.log(state);

    // this.setState({ userDetails: currentState });
    // this.setState({
    //   file : URL.createObjectURL(event.target.files[0])
    // })
  }

  onChange = (e) => {
    console.log(e.target.name)

    const state = this.state.userDetails
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleStateChange = (e) => {
    console.log(e.target.name)

    const state = this.state.userDetails
    state[e.target.name] = e.target.value;
    this.setState(state);

    this.getCitiesList(e.target.value);
  }

  /**
   * get cities list
   */
  getCitiesList(stateId) {
    this.setState({ stateId: stateId });
    fetch('http://localhost:3000/js/cities.json', {
      // data: 'Station',
      // data: 'NameStation',
      method: "GET"
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ citiesList: response });
      });
  }

  handleDateChange = dateValue => {

    const state = this.state.userDetails;
    state['dob'] = dateValue;
    this.setState(state);
  };


  handleConfirmPasswordChange = (event) => {
    const state = this.state.userDetails;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  comparePassword = (event) => {
    if (this.state.userDetails.password === this.state.userDetails.confirm_password) {
      this.setState({
        match: true
      });
    } else {
      this.setState({
        match: false
      });
    }
  }

  convertDate(dobDate) {
    var parts = new Date(dobDate).toDateString().split(' ');
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };
    var dateValue = parts[2] + "-" + months[parts[1]] + "-" + parts[3];
    return dateValue;
  }

  render() {
    console.log(this.state);

    if (this.state.isReadyForEdit) {
      console.log('User Details for EDIT');
      // this.setState({ userDetails : this.props.location.state.userDetails });
      // console.log(this.props.location.state.userDetails);


    } else {
      console.log('NEW User Details');
      // console.log(this.props.location.state.userDetails);
    }

    return (

      <div className="container-fluid">

        <div className="container">
          {/* // <form method="POST" action="http://localhost:8081/users/add-user"> */}
          <form onSubmit={(e) => this.handleSubmit(e)}>

            <h4>{(this.state.isReadyForEdit) ? "Update User Details" : "Add New User Details"}</h4>

            {/* <div className="row"> */}
            <div className="form-group row">
              <div className="col-sm-3"><label><b>Name</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Enter Name" name="name" onChange={this.onChange} value={this.state.userDetails.name} required />
              </div>
              <div className="col-sm-3"><label><b>User Name</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Enter User Name" name="user_name" onChange={this.onChange} value={this.state.userDetails.user_name} required />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Email Id</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Email Id" name="email" onChange={this.onChange} value={this.state.userDetails.email} required />
              </div>
              <div className="col-sm-3"><label><b>Contact No.</b></label></div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Contact No." name="phone" onChange={this.onChange} value={this.state.userDetails.phone} required />
              </div>
            </div>

            {/* https://github.com/hiiamrohit/Countries-States-Cities-database/blob/master/states.json */}
            {/* https://codepen.io/SteveHayes/pen/JVyjwj */}

            {
              (this.state.isReadyForEdit) ? null :
                <div className="form-group row">
                  <div className="col-sm-3"><label><b>Password</b></label></div>
                  <div className="col-sm-3"><input type="password" className="form-control" placeholder="Enter Password" name="password" onChange={this.onChange} value={this.state.userDetails.password} required /></div>

                  <div className="col-sm-3">
                    <label className={`${this.state.match == false ? 'confirm-password-error' : null}`}>
                      Confirm Password
                  </label>
                    {/* <label><b>Confirm Password</b></label> */}
                  </div>
                  <div className="col-sm-3">
                    <input type="password"
                      // onChange={(event) => this.handleConfirmPasswordChange(event)}
                      onBlur={this.comparePassword}
                      className={`form-control ${(this.state.match === false) ? 'confirm-password-error' : null}`}
                      placeholder="Enter Confirm Password" name="confirm_password"
                      onChange={this.onChange} value={this.state.userDetails.confirm_password} required />
                  </div>
                </div>
            }

            <div className="form-group row">
              <div className="col-sm-3"><label><b>D.O.B</b></label></div>
              <div className="col-sm-3">
                {/* //selected={this.state.userDetails.dob} */}
                <DatePicker dateFormat="dd-MM-yyyy" className="form-control" selected={(this.state.isReadyForEdit) ? null : this.state.userDetails.dob} value={(this.state.isReadyForEdit) ? this.convertDate(this.state.userDetails.dob) : this.state.userDetails.dob} onChange={this.handleDateChange} placeholderText="Click to select a date" />
                <input type="hidden" className="form-control" placeholder="Enter Date of birth" name="dob" value={(this.state.userDetails.dob) ? this.convertDate(this.state.userDetails.dob) : ""} onChange={this.onChange} required />
              </div>

              <div className="col-sm-3"><label><b>Profile Image</b></label></div>
              <div className="col-sm-3">
                {/* <input type="file" name="profileImg" onChange={this.handleImageChange} />
              <img src={this.state.userDetails.profileImg} height={100} width={100}/> */}


                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile" name="profileImg" onChange={this.handleImageChange} />
                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>State</b></label></div>
              <div className="col-sm-3">

                <select className="form-control" name="state" onChange={this.handleStateChange} value={this.state.userDetails.state} required>
                  <option>Select State</option>
                  {
                    (this.state.statesList) ?
                      (this.state.statesList.map((data) =>

                        <option key={data.id} value={data.id} >{data.state_name}</option>
                      )) : null
                  }
                </select>
              </div>

              <div className="col-sm-3"><label><b>City</b></label></div>
              <div className="col-sm-3">
                <select className="form-control" name="city" onChange={this.onChange} value={this.state.userDetails.city} required>
                  <option>Select City</option>
                  {
                    (this.state.citiesList) ?
                      (this.state.citiesList.map((data) =>
                        (this.state.stateId == data.state_id) ?
                          <option key={data.id} value={data.id} >{data.city_name}</option>
                          : null
                      )) : null
                  }
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3"><label><b>Address</b></label></div>
              <div className="col-sm-9">
                {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
                <textarea className="form-control" placeholder="Address" name="address" onChange={this.onChange} value={this.state.userDetails.address} required />
              </div>
            </div>

            <button type="submit" className="btn btn-info">{(this.state.isReadyForEdit) ? "Update" : "Submit"}</button>

          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditUser);