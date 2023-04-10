import React from 'react'
import "./Profile_home_post.css";
// import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Profile_home_post(prop) {

  let {post}=prop;
  // console.log(post);

  return (
    <div className='ph-posts'>
      <div className="ph-posts-contents">
        <h1 className='ph-posts-title'>{post?.title}</h1>
        <div className="ph-posts-time">
          <div className="ph-posts-date">{post?.createdAt.substring(0,10)}</div>
          <div className="ph-posts-time-to-read"> <MenuBookIcon /> </div>
          <div className="ph-posts-time-to-read">{Math.ceil(0.00546448087 * post?.content.split(" ").length)} minute read</div>
        </div>
        <div className="ph-posts-description">{post?.summary}</div>
      </div>
      {
        post?.ContainImage ? <div className="ph-posts-image"><img src={post?.photo} alt="post-img" /></div> : null
      }
      {/* <div className="ph-posts-image"><img src={post?.photo} alt="post-img" /></div> */}
    </div>

  )
}

export default Profile_home_post