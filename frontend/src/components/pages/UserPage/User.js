import React from 'react'
import { useEffect, useState } from "react";
import "./User.css"
import ProfileHome from './Profile_home'
import ProfileListPost from './ProfileListPost'
import { useParams } from 'react-router-dom';
import UserState from '../../../context/userState';


function User() {
  const { username } = useParams();
  // console.log("username ",username);
  //since there was no click in the beginning thus there was no redborder on homelink
  //thus this stylingNavbar is there
  function stylingNavbar() {
    let list = document.getElementsByClassName("navImg");
    for (let element of list) {
      element.classList.remove("navActive");
    }
  }

  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    stylingNavbar()

    let loader = document.getElementById('loader');
    loader.style.visibility = "visible";
    loader.classList.add("eighty");


    fetch("http://localhost:8000/api/v1/posts/user/" + username)
      .then(res => {
        return (res.json())
      })
      .then((data) => {
        console.log(data);
        setUserArray(data.data);
        // console.log("userArray ", data.data);
        loader.classList.add("hundred");

        setTimeout(() => {
          loader.style.visibility = "hidden";
          loader.classList.remove("eighty", "hundred");
        }, 700)

      })
  }, [username])


  return (

    <div id='user'>
      <UserState>
        <ProfileHome />
        <div id="user-post-component">

          <ProfileListPost posts={userArray} />
        </div>
      </UserState>
    </div>
  )
}

export default User
