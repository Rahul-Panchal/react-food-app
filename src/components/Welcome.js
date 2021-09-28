import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';

// import Navbar from '../Layout/Navbar';

const Welcome = (props) => {

    const loggedInUser  = useSelector((state)=>state.login.loggedInUserDetails);
    useEffect(()=>{

        // console.log('calling props from welcome page')
        // console.log(loggedInUser);
    },[loggedInUser])

    

    return(
        <div className="container-fluid">
            <div className="container">
                <div>
                    <h1>Welcome {loggedInUser.name} to the users Management</h1>
                    {/* <h1>Welcome {this.state.loggedInUserName}</h1> */}
                    {/* <Navbar name={this.state.loggedInUserName}></Navbar> */}
                </div>
            </div>
        </div>
        
    )
  
}

export default Welcome;