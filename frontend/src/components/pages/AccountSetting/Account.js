import React from 'react'
import './Account.css'
import LeftSide from "../HomePage/LeftSide";
import MainAccount from './MainAccount'
import AccountContext from '../../../context/accountContext';

function Account(props) {
  const isUsersProfile = props.isUsersProfile;
  console.log(props.isUsersProfile);
  return (
    <AccountContext.Provider value={isUsersProfile}>
      <div className='account-setting'>
        <LeftSide />
        <MainAccount />
      </div>
    </AccountContext.Provider>
  )
}

export default Account