import Navbar from './Navbar';
import Searchbar from './Searchbar';
import {useAuth} from '../../context/auth'
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Will contain header components like search-bar nav-bar login-icon 

function Header() {

   const auth = useAuth();
    // user object

    return (
        <div>
            <header>
                <div className="name">DEV<span className="ex">log</span></div>

                <Searchbar />

                <Navbar />

                {auth.user ? (

                <div id="loginImgDiv">
                    <Link to="/devlog/profile"><div id="loginImg"></div></Link>
                    <div id='logoutButton' onClick={auth.logout}>Logout</div>
                </div> // if user is logged in then show image

                ) : (
                    // else show the option to login
                    <div id="login">
                        <Link className='user' to="/devlog/login">
                            <span> Login </span>
                        </Link>
                    </div>
                )}



            </header>

            <div className='hr'></div>
        </div>

    );
}

export default Header;