import React from 'react'
import BlogHome from './BlogHome'
import './BlogListHome.css'
// import { Link } from 'react-router-dom'

function BlogListHome(props) {

  let { blogs } = props; //  
  console.log(blogs)
  return (
    <div className='homePageCenter'>
      {
        blogs.map((blog) => (

         
            <BlogHome blog={blog} />
       

        ))
      }
    </div>
  )
}

export default BlogListHome


