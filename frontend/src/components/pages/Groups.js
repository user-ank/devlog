import { useEffect } from "react";

function Groups(){
    
    function stylingNavbar()
    {
        let list = document.getElementsByClassName("navImg");
        let groups = document.getElementById("groupsLink");
        for (let element of list) {
            element.classList.remove("navActive");
        }
        groups.classList.add("navActive");
    }

    useEffect(()=>{
        stylingNavbar();
    })

    return(
        <div id="groups" >
            Groups would be shown here.
        </div>
    );
}

export default Groups;