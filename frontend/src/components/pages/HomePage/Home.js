import { useEffect, useState } from "react";
import './Home.css'
import BlogListHome from "./BlogListHome";
import LeftSide from "./LeftSide";
import { useAuth } from "../../../context/auth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Home() {
   
    const [blogArray, setBlogArray] = useState([]);
    const PrivateApi = useAxiosPrivate();
    const {user} = useAuth();

    function stylingNavbar()       //To style navbar (bottom red borders under icons)
    {
        let list = document.getElementsByClassName("navImg");
        let home = document.getElementById("homeLink");
        for (let element of list) {
            element.classList.remove("navActive");
        }
        home.classList.add("navActive");
    }

    function nonUserFetch(loader)   // fetches data when no user
    {
        try{

            fetch('http://localhost:8000/api/v1/posts')
            .then(res => {
                
                return (res.json())
            })
            .then((data) => {
                console.log(data);
                setBlogArray(data.data.doc);
                loader.classList.add("hundred");
                
                setTimeout(()=>{
                    loader.style.visibility = "hidden";
                    loader.classList.remove("eighty", "hundred");
                },700)
            })
        }catch(err){
            console.log(err);
        }
    }

    async function withUserFetch(loader)    // fetches data for signed in user
    {
        try{

            const res = await PrivateApi.get('/posts/authenticateUser');
            // console.log(res.data.data.doc);
            console.log(res);
            setBlogArray(res.data.data.doc);
            loader.classList.add("hundred");
                
            setTimeout(()=>{
                loader.style.visibility = "hidden";
                loader.classList.remove("eighty", "hundred");
            },700)
        }
        catch(err){
            console.log(err);
        }
       
    }
    useEffect(() => {
        //If you're navigating from one (scrollable) component to another the scrollbar isn't aware of it, since you're just changing views without reloading the whole page, and will keep it's y (and x) position. To avoid this behavior you need to manually set the scroll position on re-render, like so:
        window.scrollTo({ top: 0, left: 0 });
       
        //since there was no click in the beginning thus there was no redborder on homelink
        //thus this stylingNavbar is there
        stylingNavbar()

        let loader =  document.getElementById('loader');
        loader.style.visibility = "visible";
        loader.classList.add("eighty");

        user ? withUserFetch(loader) : nonUserFetch(loader)
       
        return ()=>{
            loader.classList.add("hundred");
            loader.style.visibility = "hidden";
            loader.classList.remove("eighty", "hundred");
        }
    },[])
       

    
    return (
        <div id="home" >
            <LeftSide/>
            <BlogListHome header="Home Page" blogs={blogArray} />

        </div>
    );
}

export default Home;