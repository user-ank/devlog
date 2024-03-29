import React, { useEffect } from 'react'
import { useAuth } from '../../context/auth'

function Profile() {
 
    const auth = useAuth();

    function stylingNavbar()
      {
          let list = document.getElementsByClassName("navImg");
          for (let element of list) {
              element.classList.remove("navActive");
          }
      
      }

    useEffect(()=>{
      stylingNavbar();
    })

    return (
    <div>
        Hello {auth.user.email} ! <br/>
        Here would be Your profile
        Your access token is {auth.user.accessToken}
    </div>
  )
}

export default Profile
