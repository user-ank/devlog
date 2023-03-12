import React from 'react'
import { useParams } from 'react-router-dom'

function BlogPage() {
    const params = useParams();
    const username = params.username
    const blogTitle = params.blogTitle

  return (
    <div>
      {console.log(username, blogTitle)}
    </div>
  )
}

export default BlogPage
