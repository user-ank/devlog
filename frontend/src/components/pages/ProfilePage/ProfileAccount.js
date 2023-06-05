import React from 'react'
import '../AccountSetting/Account.css'
import LeftSide from "../HomePage/LeftSide";
import ProfileMainAccount from './ProfileMainAccount'

function ProfileAccount() {
  return (
    <div className='account-setting'>
        <LeftSide/>
        <ProfileMainAccount/>

    </div>
  )
}

export default ProfileAccount