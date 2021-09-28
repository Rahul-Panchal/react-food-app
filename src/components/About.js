import React from 'react';


const About=(props)=>{
    return(
        <div>
            <h1>About Page</h1>
            <button onClick={()=>{props.history.push('/')}}>Back To Home</button>
        </div>
      
    )
  }

  export default About;