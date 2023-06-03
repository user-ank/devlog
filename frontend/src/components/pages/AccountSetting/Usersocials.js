import React from 'react'
import './Usersocials.css'

function Usersocials() {
    return (
        <div className='account-usersocials'>
            <div className="usersocial-socials">
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="website" src={require('../../img/earth.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="github" src={require('../../img/github.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="twitter" src={require('../../img/twitter.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="facebook" src={require('../../img/facebook.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="stackoverflow" src={require('../../img/stackoverflow.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="linkedin" src={require('../../img/linkedin.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="youtube" src={require('../../img/youtube.png')} /></span>
                <span className="usersocial-socials-logo-bg"><img className="usersocial-socials-logo" alt="instagram" src={require('../../img/instagram.png')} /></span>
            </div>
            <div className="usersocial-address">
                <img className="usersocial-socials-logo-location" alt="location" src={require('../../img/pin.png')} />
                <span className='usersocial-address-city'>
                    Prayagraj, India
                </span>
            </div>
            <div className="usersocial-joined">
                <img className="usersocial-socials-logo-calender" alt="calender" src={require('../../img/calendar.png')} />
                <span className="usersocial-joined-date">
                    Member Since Apr, 2023
                </span>
            </div>
        </div>
    )
}

export default Usersocials