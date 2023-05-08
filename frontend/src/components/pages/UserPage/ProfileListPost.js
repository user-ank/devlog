import React from 'react'
import ProfileHomePost from './Profile_home_post'
import BlogHome from '../HomePage/BlogHome';
// import ProfileHome from './Profile_home'

function ProfileListPost(props) {

    let { posts } = props; //  
    console.log(posts)
    return (
      <div className='userpageCenter'>
        {
          posts.map((post) => (
              // <ProfileHome post={post} />
              <ProfileHomePost key={post._id} post={post}/>
          ))

        }
        {/* {
          posts.map((userDetail) => (
              <ProfileHome userDetail={userDetail} />
              // <ProfileHomePost post={post} />
          ))

        } */}
      </div>
    )
  }

export default ProfileListPost