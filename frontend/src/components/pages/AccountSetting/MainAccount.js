import React from 'react'
import './MainAccount.css'
import AccountProfile from "./AccountProfile";
import Usersocials from "./Usersocials";
import Aboutme from './Aboutme';
import MyTechStack from './MyTechStack';
import AvailableFor from './AvailableFor';
import BasicInfo from './BasicInfo';
import AccountContext from '../../../context/accountContext';

function MainAccount() {
    const {isUsers} = React.useContext(AccountContext);

    const stylingNavbar = () => {
        let list = document.getElementsByClassName("navImg");
        for (let element of list) {
            element.classList.remove("navActive");
        }
    };
    stylingNavbar();
    
    return (
        <div className='main-account'>
            <div className="account-prof">
                <AccountProfile/>
            </div>
            <div className="account-user-soc">
                <Usersocials />
            </div>
            <div className="user-aboutme-component">
                <Aboutme/>
            </div>
            <div className="user-techstack-and-availablefor-component">
                <MyTechStack/>
                <AvailableFor/>
            </div>
         
            {
                isUsers && <div className="user-basic-info-component">
                    <BasicInfo />
                </div>
            }

        </div>
    )
}

export default MainAccount