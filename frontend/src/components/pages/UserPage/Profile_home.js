import React from 'react'
import "./Profile_home.css";

import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HexagonIcon from '@mui/icons-material/Hexagon';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar } from '@mui/material';

function Profile_home() {
    return (
        <div className='profile_home'>
            <div className="profile_home-header">
                <div className="profile_home-header-firstline">
                    <div className="profile_home-header-firstline-firstpart">
                        <div className="profile_home_blogger_avatar firstline-firstpart">
                            <Avatar />
                        </div>
                        <div className="profile_home__userblog firstline-firstpart">
                            <h2 className='username_blog'>Lavesh Sharma's Blog</h2>
                        </div>
                    </div>

                    <div className="profile_home-header-firstline-secondpart">
                        {/* <div className="profile_home-icons"> */}
                            <div className="profile_home-header-search firstline-secondpart"> <SearchIcon /> </div>
                            <div className="profile_home-header-darkmode firstline-secondpart"> <DarkModeIcon /> </div>
                            <div className="profile_home_user_avatar firstline-secondpart"><Avatar /></div>
                        {/* </div> */}
                    </div>
                </div>
                <div className="profile_home-header-secondline">
                    <div className="profile_home-header-mainprofile"> <HexagonIcon/> </div>
                    <div className="profile_home-header-secondline-secondpart">
                        <div className="profile_home-header-followbtn">
                            <div className="profile_home-header-followicon"> <PersonAddAltIcon/> </div>
                            <div className="profile_home-header-follow"> Follow </div>
                        </div>
                        <div className="profile_home-header-newsletter">
                            <div className="profile_home-header-newsletter-icon"> <MailIcon/> </div>
                        </div>
                    </div>
                </div>
                <div className="profile_home-header-thirdline">
                    <div className="profile_home-header-homebtn btns"> Home </div>
                    <div className="profile_home-header-badgesbtn btns">Badges</div>
                    <div className="profile_home-header-newsletterbtn btns">Newsletter</div>
                </div>
            </div>
        </div>
        
    )
}

export default Profile_home