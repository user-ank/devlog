import React from 'react'
import './Usersocials.css'
import AccountContext from '../../../context/accountContext';
import { Skeleton } from '@mui/material';

function Usersocials() {

    const {info} = React.useContext(AccountContext);

    return (
        <div className='account-usersocials'>
            <div className="usersocial-socials">

                {
                    info?.website &&
                    <a href={info.website}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="website" src={require('../../img/earth.png')} /></span>
                    </a>

                }
                {
                    info?.gitHub &&
                    <a href={info.gitHub}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="github" src={require('../../img/github.png')} /></span>
                    </a>
                }
                {
                    info?.twitter &&
                    <a href={info.twitter}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="twitter" src={require('../../img/twitter.png')} /></span>
                    </a>
                }
                {
                    info?.facebook &&
                    <a href={info.facebook}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="facebook" src={require('../../img/facebook.png')} /></span>
                    </a>
                }
                {
                    info?.linkedIn &&
                    <a href={info.linkedIn}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="linkedin" src={require('../../img/linkedin.png')} /></span>
                    </a>
                }
                {
                    info?.stackOverflow &&
                    <a href={info.stackOverflow}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="stackoverflow" src={require('../../img/stackoverflow.png')} /></span>
                    </a>
                }
                {
                    info?.youtube &&
                    <a href={info.youtube}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="youtube" src={require('../../img/youtube.png')} /></span>
                    </a>
                }
                {
                    info?.instagram &&
                    <a href={info.instagram}>
                        <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="instagram" src={require('../../img/instagram.png')} /></span>
                    </a>
                }
                
            </div>

            {
                info?.location && 
                <div className="usersocial-address">
                    <img className="usersocial-socials-logo-location" alt="location" src={require('../../img/pin.png')} />
                    <span className='usersocial-address-city'>
                        {info.location}
                    </span>
                </div>
            }

            {
                info ?     
                <div className="usersocial-joined">
                    <img className="usersocial-socials-logo-calender" alt="calender" src={require('../../img/calendar.png')} />
                    <span className="usersocial-joined-date">
                        Member Since {info?.creationTime}
                    </span>
                </div> :

                <Skeleton variant='rounded' height={25} width="30%" sx={{borderRadius : 1.5}}/>
            }
        </div>
    )
}

export default Usersocials