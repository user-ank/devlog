import React from 'react';
import BlogHome from './BlogHome';
import './BlogListHome.css';

function BlogListHome(props) {
  const { blogs, header, showLimited } = props;

  return (
    <div className='homePageCenter'>
      <div className='homePageCenterHeader'>{header}</div>
      <>
        {blogs.map((blog) => (
          <BlogHome key={blog.id} blog={blog} showLimited={showLimited} />
        ))}
      </>
    </div>
  );
}

export default BlogListHome;