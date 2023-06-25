import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LeftSide from "../HomePage/LeftSide";
import '../HomePage/BlogListHome.css'
import "./Bookmark.css";
import BlogListHome from "../HomePage/BlogListHome";
import { startLoader, finishLoader } from "../../Header/Header";
import EmptyPage from "./EmptyPage";

function Bookmark() {

    const [blogArray, setBlogArray] = useState([]);
    const PrivateApi = useAxiosPrivate();
    const [isEmpty, setEmpty] = useState(false);

    const getBookmarks = async () => {

        startLoader();
        const res = await PrivateApi.get("/users/bookmarkedPost/");
        setBlogArray(res.data.data);
        finishLoader();
        if(res.data.data.length == 0)
            setEmpty(true);
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
              {isEmpty ? <EmptyPage/> : <BlogListHome header="Bookmarks page" blogs={blogArray}/>} 
            
            {/* Reusing the BlogListHome component; EmptyPage will be shown in case of no bookmarks*/}
                   
        </div>
    )
}

export default Bookmark
