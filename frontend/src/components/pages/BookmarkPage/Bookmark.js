import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LeftSide from "../HomePage/LeftSide";
import '../HomePage/BlogListHome.css'
import "./Bookmark.css";
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
    
    const stylingNavbar = () => {
        let list = document.getElementsByClassName("navImg");
        for (let element of list) {
            element.classList.remove("navActive");
        }
    };

    useEffect(()=>{
        stylingNavbar();
        getBookmarks();
    },[]);


    return (
        <div id="bookmark">
              <LeftSide/>
              <BlogListHome header="Bookmarks page" blogs={blogArray}/> {/*  Reusing the component; There is no need to use all the features of this component here 
                                    but better writing the entire component*/}
              
        </div>
    )
}

export default Bookmark
