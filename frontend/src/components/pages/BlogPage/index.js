import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CircularProgress from '@mui/material/CircularProgress';
import Blog from './Blog';

function BlogPage() {
  const {username, blogTitle} = useParams();
  // const username = params.username, blogTitle = params.blogTitle

  const PrivateAPI = useAxiosPrivate();
  const[isLoading, setIsLoading] = useState(true);
  const[pageData, setPageData] = useState(null);
  const getBlogPage = async () => {
    const result = await PrivateAPI.get(`/posts/${username}/${blogTitle}`);
    setPageData(result.data.data);
    setIsLoading(false);
    return;
  }
  useEffect(()=>{
    try{
    
      getBlogPage();
      
    }
    catch(err){
      console.log(err);
    }

  },[])
  return (
    <div className='blogPage'>

    {
      isLoading ? 
      <CircularProgress/>
      :
      <Blog postData={pageData}/>
    }
      
      {/* {console.log(username, blogTitle, statei)} */}
      {/* {JSON.stringify(pageData)} */}
    </div>
  )
}

export default BlogPage
