import React from 'react'
import { useEffect, useState } from "react";
import "./User.css"
import ProfileHome from './Profile_home'
import ProfileListPost from './ProfileListPost'

function User() {
  //since there was no click in the beginning thus there was no redborder on homelink
  //thus this stylingNavbar is there
  function stylingNavbar() {
    let list = document.getElementsByClassName("navImg");
    let home = document.getElementById("homeLink");
    for (let element of list) {
      element.classList.remove("navActive");
    }
    home.classList.add("navActive");
  }

  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    stylingNavbar()

    let loader = document.getElementById('loader');
    loader.style.visibility = "visible";
    loader.classList.add("eighty");

    
    fetch('http://localhost:8000/api/v1/posts/Iamankit45')
      .then(res => {
        return (res.json())
      })
      .then((data) => {
        console.log(data);
        setUserArray(data.data);
        loader.classList.add("hundred");

        setTimeout(() => {
          loader.style.visibility = "hidden";
          loader.classList.remove("eighty", "hundred");
        }, 1000)

      })
  }, [])


  return (
    <div id='user'>
      <ProfileHome posts={userArray} />
      <div id="user-post-component">

        <ProfileListPost posts={userArray} />
      </div>
    </div>
  )
}

export default User
