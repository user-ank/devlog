import { Link } from "react-router-dom"
import EventsLink from "./NavbarElements/EventsLink";
import HomeLink from "./NavbarElements/HomeLink";
import NotificationsLink from "./NavbarElements/NotificationsLink";
import GroupsLink from "./NavbarElements/GroupsLink";

function Navbar() {

    return (

        <nav>
            <Link to="/devlog/">  <HomeLink/>  </Link>
            <Link to="/devlog/events">  <EventsLink/>  </Link>
            <Link to="/devlog/groups"> <GroupsLink/>  </Link>
            <Link to="/devlog/notifications">  <NotificationsLink/>   </Link>
        </nav>
    );
}

export default Navbar;