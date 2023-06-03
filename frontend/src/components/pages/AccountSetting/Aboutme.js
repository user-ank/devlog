import React from 'react'
import './Aboutme.css'
import AddIcon from '@mui/icons-material/Add';

function Aboutme() {
    return (
        <div className='user-aboutme'>
            <div className="aboutme">
                <div className="user-aboutme-text"> About Me</div>
                <div className="aboutme-account-aboutmebtn">
                    <div className="aboutme-account-aboutmeicon"> <AddIcon /> </div>
                    <div className="aboutme-account-aboutme"> Add Bio </div>
                </div>
                <div className="message-of-empty-bio">
                    Your bio is empty. Tell the world who you are by writing a short description about you.
                </div>
            </div>
        </div>
    )
}

export default Aboutme