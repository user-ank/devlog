import { useEffect, useState } from "react";
import './Home.css'
import BlogListHome from "./BlogListHome";
import LeftSide from "./LeftSide";

function Home() {
    //since there was no click in the beginning thus there was no redborder on homelink
    //thus this stylingNavbar is there
    function stylingNavbar()
    {
        let list = document.getElementsByClassName("navImg");
        let home = document.getElementById("homeLink");
        for (let element of list) {
            element.classList.remove("navActive");
        }
        home.classList.add("navActive");
    }

    
    const [blogArray, setBlogArray] = useState([]);

    useEffect(() => {
        stylingNavbar()

        let loader =  document.getElementById('loader');
        loader.style.visibility = "visible";
        loader.classList.add("eighty");

        fetch('http://localhost:8000/api/v1/posts')
        .then(res => {
            
            return (res.json())
        })
        .then((data) => {
            console.log(data);
            setBlogArray(data.data);
            loader.classList.add("hundred");
            
            setTimeout(()=>{
                loader.style.visibility = "hidden";
                loader.classList.remove("eighty", "hundred");
            },1000)
            
        })
    },[])
       

        

    return (
        <div id="home" >
            <LeftSide/>
            <BlogListHome blogs={blogArray} />

        </div>
    );
}

export default Home;