import React from 'react'
import './Account.css'
import LeftSide from "../HomePage/LeftSide";
import MainAccount from './MainAccount'

function Account() {
  return (
    <div className='account-setting'>
        <LeftSide/>
        <MainAccount/>

    </div>
  )
}

export default Account