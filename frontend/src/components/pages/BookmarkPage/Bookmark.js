import { useEffect, useState } from "react"
import { useAuth } from "../../../context/auth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LeftSide from "../HomePage/LeftSide";
import '../HomePage/BlogListHome.css'
import BlogListHome from "../HomePage/BlogListHome";
import { startLoader, finishLoader } from "../../Header/Header";

function Bookmark() {

    const [blogArray, setBlogArray] = useState([]);
    const PrivateApi = useAxiosPrivate();
   

    const getBookmarks = async () => {

        startLoader();
        const res = await PrivateApi.get("/users/bookmarkedPost/");
        finishLoader();
        setBlogArray(res.data.data);
        console.log(res);
    };
    

    useEffect(()=>{
        getBookmarks();
    },[]);


    return (
        <div>
              <LeftSide/>
              <BlogListHome blogs={blogArray}/> {/*  Reusing the component; There is no need to use all the features of this component here 
                                    but better writing the entire component*/}
              
        </div>
    )
}

export default Bookmark
