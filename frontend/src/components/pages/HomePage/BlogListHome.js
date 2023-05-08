import React from 'react'
import BlogHome from './BlogHome'
import './BlogListHome.css'


function BlogListHome(props) {

  let { blogs } = props;   
  
  return (
    <div className='homePageCenter'>
      {
        blogs.map((blog) => (

         
            <BlogHome key={blog.id} blog={blog} />
       

        ))
      }
    </div>
  )
}

export default BlogListHome


