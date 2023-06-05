import React from 'react'
import '../AccountSetting/MainAccount.css'
import ProfileAccountProfile from "./ProfileAccountProfile";
import ProfileUsersocials from "./ProfileUsersocials";
import ProfileAboutme from './ProfileAboutme';
import ProfileMyTechStack from './ProfileMyTechStack';
import ProfileAvailableFor from './ProfileAvailableFor';

function ProfileMainAccount() {
    return (
        <div className='main-account'>
            <div className="account-prof">
                <ProfileAccountProfile />
            </div>
            <div className="account-user-soc">
                <ProfileUsersocials />
            </div>
            <div className="user-aboutme-component">
                <ProfileAboutme />
            </div>
            <div className="user-techstack-and-availablefor-component">
                <ProfileMyTechStack />
                <ProfileAvailableFor />
            </div>


        </div>
    )
}

export default ProfileMainAccount