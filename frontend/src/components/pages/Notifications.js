import { useEffect } from "react";

function Notifications(){

    function stylingNavbar()
    {
        let list = document.getElementsByClassName("navImg");
        let notifications = document.getElementById("notificationsLink");
        for (let element of list) {
            element.classList.remove("navActive");
        }
        notifications.classList.add("navActive");
    }

    useEffect(()=>{
        stylingNavbar();
    })

    return(
        <div id="notifications" >
            Notifications would be shown here.
        </div>
    );
}

export default Notifications;