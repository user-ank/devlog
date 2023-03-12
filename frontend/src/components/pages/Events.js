import { useEffect } from "react";

function Events(){

    function stylingNavbar()
      {
          let list = document.getElementsByClassName("navImg");
          let events = document.getElementById("eventsLink");
          for (let element of list) {
              element.classList.remove("navActive");
          }
          events.classList.add("navActive");
      }

    useEffect(()=>{
        stylingNavbar();
    })
    return(
        <div id="events" >
            Upcoming Events would be shown here.
        </div>
    );
}

export default Events;