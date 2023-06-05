import React from 'react'
import '../AccountSetting/Aboutme.css'

function ProfileAboutme() {
    return (
        <div className='user-aboutme'>
            <div className="aboutme">
                <div className="user-aboutme-text"> About Me</div>
                <p className="profileaboutme-about-content">
                    Pro in DSA,
                    Pro in Web Development,
                    Technical Writer, 
                    Open Source Enthusiast.
                    I'm currently scratching my head trying to build beautiful responsive websites. Simultaneously, I am distributing my insightful technical articles to multiple publishers. Moreover, I have a habit of feeling relieved only after opening issues and pull requests in projects in which I'm interested in.
                </p>
            </div>
        </div>
    )
}

export default ProfileAboutme