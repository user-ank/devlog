import React from 'react'
import './Blog.css'
import LeftSide from '../HomePage/LeftSide';

export default function Blog(postData) {
  let post = postData.postData;
  return (
    <div className="blog">
      <LeftSide />
      <div className="blogPageCenter">
          <h1 className="blog-title">{post?.title}</h1>
          {post?.subtitle && <h2 className="blog-subtitle">{post?.subtitle}</h2>}
          {post?.photo && (
            <div className="blog-image">
              <img src={post?.photo} alt={post?.title} />
            </div>
          )}
          {/* <div className="blog-summary">
           <p>{post?.summary}</p>
         </div> */}
          <div className="blog-content">
            {post?.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="blog-footer">
            <div className="blog-meta">
              <span>{post?.minute_read} min read</span>
              <span> | </span>
              <span>{new Date(post?.creationTime).toDateString()}</span>
              <span> | </span>
              <span>{post?.category}</span>
            </div>
            <div className="blog-likes-comments">
              <span>{post?.likes.length} likes</span>
              <span> | </span>
              <span>{post?.comments.length} comments</span>
            </div>
          </div>
      </div>
    </div>
  );
}