import React from 'react'
import BlogHome from './BlogHome'
import './BlogListHome.css'


function BlogListHome(props) {

  let { blogs, header } = props;   
  
  return (
    <div className='homePageCenter'>
      <div className='homePageCenterHeader'>{header}</div>
      <>
        {
          blogs.map((blog) => (

          
              <BlogHome key={blog.id} blog={blog} />
        

          ))
        }
      </>
    </div>
  )
}

export default BlogListHome


