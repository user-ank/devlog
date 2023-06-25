import React from 'react'
import './BasicInfo.css'

function BasicInfo() {
    return (
        <div className='basic-info'>
            <div className='user-basic-info'>
                <div className="basic-info-left-part">
                    <div className="basicinfo-header-text">
                        Basic Info
                    </div>
                    <div className="basicinfo-username basicinfo-box">
                        <label htmlFor="nameField" className="basicinfo-nameField font-semibold">Full name</label>
                        <input type="text" className="input-text" id="nameField" placeholder="Enter your full name" />
                    </div>
                    <div className="basicinfo-profile-tagline basicinfo-box">
                        <label htmlFor="tagline" className="basicinfo-tagline font-semibold">Profile Tagline</label>
                        <input type="text" className="input-text" id="tagline" placeholder="Software Developer @ …" />
                    </div>
                    {/* <div className="basicinfo-profilephoto basicinfo-box">
                    <label htmlFor="profilephoto" className="basicinfo-profile-photo font-semibold">Profile Photo</label>
                    <input type="text" className="input-text" id="profilephoto" placeholder="Enter your full name" />
                </div> */}
                    <div className="basicinfo-profile-location basicinfo-box">
                        <label htmlFor="location" className="basicinfo-location font-semibold">Location</label>
                        <input type="text" className="input-text" id="location" placeholder="Jabalpur, MP" />
                    </div>
                    <div className="basicinfo-about-title">About You</div>
                    <div className="basicinfo-profile-moreabout-you basicinfo-box">
                        <label htmlFor="moreAboutYou" className="basicinfo-moreAboutYou font-semibold">Profile Bio (About you)</label>
                        <textarea type="text" className="input-textarea" name="moreAboutYou" id="moreAboutYou" rows={4}
                            cols={40} placeholder="I am a developer from …" />
                    </div>
                    <div className="basicinfo-profile-skills basicinfo-box">
                        <label htmlFor="skills" className="basicinfo-skills font-semibold">Tech Stack</label>
                        <input type="text" className="input-text" id="skills" placeholder="Search technologies, topics, more…" />
                    </div>
                    <div className="basicinfo-profile-available-for basicinfo-box">
                        <label htmlFor="availableFor" className="basicinfo-availableFor font-semibold">Profile Bio (About you)</label>
                        <textarea type="text" className="input-textarea" name="availableFor" id="availableFor" rows={4}
                            cols={40} placeholder="I am available for mentoring, …" />
                    </div>

                </div>
                <div className="basic-info-right-part">
                    <div className="basicinfo-header-text">
                        Social
                    </div>
                    <div className="basicinfo-profile-twitter basicinfo-box">
                        <label htmlFor="twitter" className="basicinfo-twitter font-semibold">Twitter Profile</label>
                        <input type="url" pattern="(http|https)://twitter\.com\/(.+)|(http|https)://www\.twitter\.com\/(.+)" className="input-text" id="twitter" placeholder="https://twitter.com/username" />
                    </div>
                    <div className="basicinfo-profile-linkedin basicinfo-box">
                        <label htmlFor="linkedin" className="basicinfo-linkedin font-semibold">LinkedIn Profile</label>
                        <input type="url" pattern="(http|https)://linkedin\.com\/(.+)|(http|https)://www\.linkedin\.com\/(.+)" className="input-text" id="linkedin" placeholder="https://linkedin.com/username" />
                    </div>
                    <div className="basicinfo-profile-github basicinfo-box">
                        <label htmlFor="github" className="basicinfo-github font-semibold">GitHub Profile</label>
                        <input type="url" pattern="(http|https)://github\.com\/(.+)|(http|https)://www\.github\.com\/(.+)" className="input-text" id="github" placeholder="https://github.com/username" />
                    </div>
                    <div className="basicinfo-profile-stackoverflow basicinfo-box">
                        <label htmlFor="stackoverflow" className="basicinfo-stackoverflow font-semibold">StackOverflow Profile</label>
                        <input type="url" pattern="(http|https)://stackoverflow\.com\/(.+)|(http|https)://www\.stackoverflow\.com\/(.+)" className="input-text" id="stackoverflow" placeholder="https://stackoverflow.com/username" />
                    </div>
                    <div className="basicinfo-profile-website basicinfo-box">
                        <label htmlFor="website" className="basicinfo-website font-semibold">Website URL</label>
                        <input type="url" pattern="(http|https)://(.+)|(http|https)://www\.(.+)" className="input-text" id="website" placeholder="https://username.com" />
                    </div>

                    <div className="basicinfo-profile-facebook basicinfo-box">
                        <label htmlFor="facebook" className="basicinfo-facebook font-semibold">Facebook Profile</label>
                        <input type="url" pattern="(http|https)://facebook\.com\/(.+)|(http|https)://www\.facebook\.com\/(.+)" className="input-text" id="facebook" placeholder="https://facebook.com/username" />
                    </div>
                    <div className="basicinfo-profile-instagram basicinfo-box">
                        <label htmlFor="instagram" className="basicinfo-instagram font-semibold">Instagram Profile</label>
                        <input type="url" pattern="(http|https)://instagram\.com\/(.+)|(http|https)://www\.instagram\.com\/(.+)" className="input-text" id="instagram" placeholder="https://instagram.com/username" />
                    </div>
                    <div className="basicinfo-profile-youtube basicinfo-box">
                        <label htmlFor="youtube" className="basicinfo-youtube font-semibold">YouTube Channel</label>
                        <input type="url" pattern="(http|https)://youtube\.com\/(.+)|(http|https)://www\.youtube\.com\/(.+)" className="input-text" id="youtube" placeholder="https://youtube.com/username" />
                    </div>
                    <div className="basicinfo-about-title">Profile Identity</div>

                    <div className="basicinfo-profile-username basicinfo-box">
                        <label htmlFor="username" className="basicinfo-username font-semibold">Username</label>
                        <input type="text" className="input-text" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="basicinfo-profile-email basicinfo-box">
                        <label htmlFor="email" className="basicinfo-email font-semibold">Email address</label>
                        <input type="email" className="input-text" id="email" placeholder="Enter your email" />
                    </div>
                </div>
            </div>
            <div className="basicinfo-account-aboutmebtn">
                <botton className="basicinfo-account-basicinfo"> Update</botton>
            </div>
        </div>
    )
}

export default BasicInfo