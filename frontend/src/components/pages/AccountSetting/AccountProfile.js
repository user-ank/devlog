import React from 'react'
import './AccountProfile.css'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShareIcon from '@mui/icons-material/Share';

function AccountProfile() {
    return (
        <div className='account-profile'>
            <div className="account-profile-top">
                <div className="profilephoto">
                    <img className="account-profile-profilepic" src={"https://res.cloudinary.com/ddugttm1b/image/upload/v1678987699/BLOG_API/x5b7doigbtppeyyssvye.jpg"} alt="profilep" />
                </div>
                <div className="account-profile-user-info">
                    <span className="account-profile-users-name">
                        <span className="account-profile-user-name">Anuj Patel</span>
                    </span>
                    <div className="account-profile-user-tagline">
                        <p className='usertagline'>Software Engineer writing on tech journey. ❤️ Travelling + Food + Music + Books</p>
                    </div>
                    <div className="account-profile-social-count">
                        <div className="account-profile-numfollower account-profile-nums">
                            <b className='account-profile-count'> 46 </b>
                            Followers
                        </div>
                        <div className="account-profile-numfollowing account-profile-nums">
                            <b className='account-profile-count'> 3 </b>
                            Following
                        </div>
                    </div>

                </div>
                <div className="account-profile-useful-buttons">
                    <div className="sharebtn">
                        <ShareIcon />
                    </div>
                    <div className="account-profile-followbtn">
                        <div className="account-profile-followicon"> <PersonAddAltIcon /> </div>
                        <div className="account-profile-follow"> Follow </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountProfile