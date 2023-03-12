import React from 'react'
import Blog from './Blog'
import { Link, useParams } from 'react-router-dom'

function BlogList(props) {

    let {blogs} = props; //  

  return (
    <div className='postlist'>
      {
        blogs.map((blog)=>{

            <Link to={"/devlog/" + blog.username + "/" + blog.title}>
              <Blog blog={blog}/>
            </Link>
        })
      }
    </div>
  )
}

export default BlogList


