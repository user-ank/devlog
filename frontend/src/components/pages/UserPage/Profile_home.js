import React, { useContext } from 'react'
import UserContext from '../../../context/userContext';
import "./Profile_home.css";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar } from '@mui/material';

function Profile_home() {
    const a = useContext(UserContext);
    console.log("a ", a);

    return (
        <div className='profile_home'>
            <div className="profile_home-header">
                <div className="profile_home-header-firstline">
                    <div className="profile_home-header-firstline-firstpart">
                        <div className="profile_home_blogger_avatar firstline-firstpart">
                            <Avatar src={a?.userArray[0]?.user?.profilePhoto} />
                        </div>
                        <div className="profile_home__userblog firstline-firstpart">
                            <h2 className='username_blog'>{(a?.userArray[0]?.user?.name) ? (a?.userArray[0]?.user?.name + "'s Posts") : (null)}</h2>
                            {/* <h2 className='username_blog'>{userDetail.title}</h2> */}
                        </div>
                    </div>

                    <div className="profile_home-header-firstline-secondpart">
                        {/* <div className="profile_home-icons"> */}
                        {/* <div className="profile_home-header-search firstline-secondpart"> <SearchIcon /> </div> */}
                        {/* <div className="profile_home-header-darkmode firstline-secondpart"> <DarkModeIcon /> </div> */}
                        {/* <div className="profile_home_user_avatar firstline-secondpart"><Avatar /></div> */}
                        <div className="profile_home-header-followbtn">
                            <div className="profile_home-header-followicon"> <PersonAddAltIcon /> </div>
                            <div className="profile_home-header-follow"> Follow </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>

                <div className="profile_home-header-thirdline">
                    <div className="profile_home-header-homebtn btns"> Home </div>
                    <div className="profile_home-header-badgesbtn btns">Awards</div>
                    <div className="profile_home-header-newsletterbtn btns">Newsletter</div>
                </div>
                <hr className='horizontal-line' />
            </div>
        </div>

    )
}

export default Profile_home