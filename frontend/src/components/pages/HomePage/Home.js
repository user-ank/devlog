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
        fetch('http://localhost:8000/api/v1/posts')
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setBlogArray(data.data);
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