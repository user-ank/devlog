import React from 'react'
import "./css/Profile_home_post.css";
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Profile_home_post() {
  return (
    <div className='ph-posts'>
      <div className="ph-posts-contents">
        <h1 className='ph-posts-title'>Getting Started with HTML !</h1>
        <div className="ph-posts-time">
          <div className="ph-posts-date">Feb 27, 2023</div>
          <div className="ph-posts-time-to-read"> <MenuBookIcon /> </div>
          <div className="ph-posts-time-to-read">4 min read</div>
        </div>
        <div className="ph-posts-description">
          HTML HTML, often known as Hyper Text Markup Language, is a Markup Language used for creating Web pages, Web applications or Websites. A web...
        </div>
      </div>
      <div className="ph-posts-image">
        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677484886003/78fb8c81-bcf3-4dc9-9a64-df43cade77d5.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="post-img" />
      </div>
    </div>

  )
}

export default Profile_home_post