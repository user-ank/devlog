import { useEffect, useState } from "react";
import BlogList from "../BlogList";

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

    })

       

        

    return (
        <div id="home" >

            <BlogList blogs={blogArray}/>

        </div>
    );
}

export default Home;