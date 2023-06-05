import React from 'react'
import '../AccountSetting/AccountProfile.css'
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';

function ProfileAccountProfile() {
    return (
        <div className='account-profile'>
            <div className="account-profile-top">
                <div className='account-profile_1'>
                    <div className="profilephoto">
                        <img className="account-profile-profilepic" src={"https://res.cloudinary.com/ddugttm1b/image/upload/v1678987218/BLOG_API/joidxmeqajrwpqczwxub.jpg"} alt="profilep" />
                    </div>
                    <div className="account-profile-user-info">
                        <span className="account-profile-users-name">
                            <span className="account-profile-user-name">Ankit Kumar</span>
                        </span>
                        <div className="account-profile-user-tagline">
                            <p className='usertagline'>Grinding DSA and making wonderful websites</p>
                        </div>
                        <div className="account-profile-social-count">
                            <div className="account-profile-numfollower account-profile-nums">
                                <b className='account-profile-count'> 464 </b>
                                Followers
                            </div>
                            <div className="account-profile-numfollowing account-profile-nums">
                                <b className='account-profile-count'> 33 </b>
                                Following
                            </div>
                        </div>

                    </div>
                </div>
                <div className="account-profile-useful-buttons">
                    <div className="sharebtn">
                        <ShareIcon />
                    </div>
                    <div className="account-profile-editbtn">
                        <div className="account-profile-editicon"> <AddIcon /> </div>
                        <div className="account-profile-edit"> Follow </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAccountProfile