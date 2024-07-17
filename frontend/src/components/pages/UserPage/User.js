import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LeftSide from "../HomePage/LeftSide";
import '../HomePage/BlogListHome.css';
import "../BookmarkPage/Bookmark.css";
import BlogListHome from "../HomePage/BlogListHome";
import { startLoader, finishLoader } from "../../Header/Header";
import EmptyPage from "../BookmarkPage/EmptyPage";
import ProfileHome from './Profile_home';
import UserState from '../../../context/userState';

function User() {
  const { username } = useParams();
  const [userArray, setUserArray] = useState([]);
  const PrivateApi = useAxiosPrivate();
  const [isEmpty, setEmpty] = useState(false);

  const getUserPosts = async () => {
    startLoader();
    const res = await PrivateApi.get(`/posts/user/${username}`);
    setUserArray(res.data.data);
    finishLoader();
    if (res.data.data.length === 0) setEmpty(true);
    console.log("User's res : ",res);
  };

  const stylingNavbar = () => {
    let list = document.getElementsByClassName("navImg");
    for (let element of list) {
      element.classList.remove("navActive");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    stylingNavbar();
    getUserPosts();
  }, [username]);

  return (
    <div id='user'>
      <UserState>
        <ProfileHome />
        <div id="bookmark">
          <LeftSide />
          {isEmpty ? (
            <EmptyPage header="User" message="User haven't posted any post." />
          ) : (
            <BlogListHome header="User's Posts" blogs={userArray} showLimited={true} />
          )}
        </div>
      </UserState>
    </div>
  );
}

export default User;