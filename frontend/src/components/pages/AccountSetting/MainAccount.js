import React from 'react'
import './MainAccount.css'
import AccountProfile from "./AccountProfile";

function MainAccount() {
    return (
        <div className='main-account'>
            <div className="account-prof">
                <AccountProfile/>
            </div>
        </div>
    )
}

export default MainAccount