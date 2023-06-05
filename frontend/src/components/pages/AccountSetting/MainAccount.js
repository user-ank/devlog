import React from 'react'
import './MainAccount.css'
import AccountProfile from "./AccountProfile";
import Usersocials from "./Usersocials";
import Aboutme from './Aboutme';
import MyTechStack from './MyTechStack';
import AvailableFor from './AvailableFor';
import BasicInfo from './BasicInfo';

function MainAccount() {
    return (
        <div className='main-account'>
            <div className="account-prof">
                <AccountProfile/>
            </div>
            <div className="account-user-soc">
                <Usersocials/>
            </div>
            <div className="user-aboutme-component">
                <Aboutme/>
            </div>
            <div className="user-techstack-and-availablefor-component">
                <MyTechStack/>
                <AvailableFor/>
            </div>
            <div className="user-basic-info-component">
                <BasicInfo/>
            </div>

        </div>
    )
}

export default MainAccount