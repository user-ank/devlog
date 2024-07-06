import React, { useEffect, useState } from 'react'
import './Account.css'
import LeftSide from "../HomePage/LeftSide";
import MainAccount from './MainAccount'
import AccountContext from '../../../context/accountContext';
import { useParams } from 'react-router-dom';

function Account(props) {
  const isUsers = props.isUsersProfile;
  const [info, setInfo] = useState(null);
  const { userName } = useParams();

  console.log(props.isUsersProfile);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    fetch('http://localhost:8000/api/v1/users/getUserProfile/' + userName)
      .then(res => res.json())
      .then((resObj) => {
        setInfo(resObj.data);
        console.log(resObj);
      });
  }, [])

  return (
    <AccountContext.Provider value={{ isUsers, info }}>
      <div className='account-setting'>
        <LeftSide />
        <MainAccount />
      </div>
    </AccountContext.Provider>
  )
}

export default Account