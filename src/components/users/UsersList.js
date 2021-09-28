import React,{Component} from 'react';
import LazyLoad from 'react-lazyload';

// import  axios from 'axios';
// import ReactDOM from 'react-dom';

class UsersList extends React.Component{

    // state = {
    //     usersList : [{_id: null,user_name: null,age: null,salary: null}]
    // };

    constructor(props) {
        super(props);
        this.state = {
            usersList  : [],
            statesList : [],
            citiesList : []
        };
        // this.handleView = this.handleView.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    Loading(){
        return(

            // <div className="Post Loading">
            //     <div className="preloader-wrapper big active">
            //         <div className="spinner-layer spinner-blue-only">
            //         <div className="circle-clipper left">
            //             <div className="circle"></div>
            //         </div><div className="gap-patch">
            //             <div className="circle"></div>
            //         </div><div className="circle-clipper right">
            //             <div className="circle"></div>
            //         </div>
            //         </div>
            //     </div>
            // </div>
            

            <tr className="Post Loading">
                <td>....Loading</td>
            </tr>
        );
    }

    componentDidMount() {
        fetch("http://localhost:8081/users/get-users-list")
        .then(res=>res.json())
        .then(response=>{
            console.log('response');
     
            console.log(response);
          
            
            this.setState({ usersList: response });
            this.getStatesList();
            this.getCitiesList();
        });
    }

    getStatesList() {
        fetch('http://localhost:3000/js/state.json', {
          // data: 'Station',
          // data: 'NameStation',
          method: "GET"
        })        
        .then(res=>res.json())
        .then(response=>{
            this.setState({ statesList: response });
        });
    }

    getCitiesList() {
        fetch('http://localhost:3000/js/cities.json', {
          // data: 'Station',
          // data: 'NameStation',
          method: "GET"
        })        
        .then(res=>res.json())
        .then(response=>{
            this.setState({ citiesList: response });
        });
    }

    handleEdit(id) {
        fetch('http://localhost:8081/users/get-user-details/'+id,{method : "get"})
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            // this.props.history.push('/users',{'userDetails' : response});

this.props.history.push({
  pathname: '/users/'+id,
//   search: '?query=abc',
  state: { 
        userDetails     : response,
        isReadyForEdit  : true 
    }
})

    //     <Link to={{
    //   pathname: '/template',
    //   search: '?query=abc',
    //   state: { detail: response.data }
    // }}> My Link </Link>

            // const updatedUsersList = this.state.usersList.filter(user=>{
            //     return user._id !== response._id;
            // })
            // this.setState({
            //     usersList : updatedUsersList
            // });
        })
    }

    /**
     * 
     * @param {*} id 
     */
    handleDelete(id) {
        fetch('http://localhost:8081/users/remove-user/'+id,{method : "delete"})
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            const updatedUsersList = this.state.usersList.filter(user=>{
                return user._id !== response._id;
            })
            this.setState({
                usersList : updatedUsersList
            });
        })
    }

    convertDate(dobDate){
        var parts =  new Date(dobDate).toDateString().split(' ');
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
        var dateValue = parts[2]+"-"+months[parts[1]]+"-"+parts[3];
        return dateValue;
    }
        
    /**
     * getStateName is ued to get state name
     * @param {*} stateId 
     */

    getStateName(stateId){
        var stateName = null;
        this.state.statesList.forEach(function (stateDetails, index) {
            if(stateDetails.id == stateId) {
                stateName = stateDetails.state_name;
            }
        });
        return stateName;
    }


    /**
     * getCityName is ued to get state name
     * @param {*} cityId 
     */
    getCityName(cityId){
        var cityName = null;
        this.state.citiesList.forEach(function (cityDetails, index) {
            if(cityDetails.id == cityId) {
                cityName = cityDetails.city_name;
            }
        });
        return cityName;
    }


    render(){
        let { usersList } = this.state;
        return (
            <div className="container">

            
            <table className="table table-bordered">
          <thead>
            <tr>
                <th width="5%">Sr. NO.</th>
                <th width="10%">Name</th>
                <th width="10%">Profile Image</th>
                <th width="10%">Email</th>
                <th width="10%">User Name</th>
                <th width="10%">DOB</th>
                <th width="10%">State</th>
                <th width="10%">City</th>
                <th width="15%">Address</th>
                <th width="5%">Edit</th>
                <th width="5%">Delete</th>
            </tr>
          </thead>
  
          <tbody>
            {
                usersList.map((user,index)=>(
                    <LazyLoad key={user._id} placeholder={this.Loading()}>
                        <tr key={user._id}>
                            <td>{++index+'.'}</td> 
                            <td>{user.name}</td>
                            <td>
                                <img src={`http://localhost:8081`+user.profileImg.map((image)=>(
                                        image.profileImg
                                    ))}  alt={user.profileImg.map((image)=>(
                                        image.profileImg
                                    ))} 
                                    width="50" height="50"/>
                    
                            </td>
                            <td>{user.email}</td>  
                            <td>{user.user_name}</td>
                            {/* <td>{this.convertDate(user.dob)}</td> */}
                            <td>{user.dob}</td>
                            <td>{this.getStateName(user.state)}</td>
                            <td>{this.getCityName(user.city)}</td>
                            <td>{user.address}</td>
                            <td><button className="waves-effect waves-light btn" onClick={()=>this.handleEdit(user._id)}>Edit</button></td>
                            <td><button className="waves-effect waves-light btn" onClick={()=>this.handleDelete(user._id)}>Delete</button></td>
                        </tr>
                    </LazyLoad>
                ))
            }
          </tbody>
        </table>
        </div>
        );
    }
}

export default UsersList;