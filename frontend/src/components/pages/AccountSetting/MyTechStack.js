import React from 'react'
import './MyTechStack.css'
import AddIcon from '@mui/icons-material/Add';

function MyTechStack() {
    return (
        <div className='user-mytechstack'>
            <div className="mytechstack">
                <div className="user-mytechstack-text"> My Tech Stack</div>
                <div className="mytechstack-account-mytechstackbtn">
                    <div className="mytechstack-account-mytechstackicon"> <AddIcon /> </div>
                    <div className="mytechstack-account-mytechstack"> Add your skills </div>
                </div>
                
            </div>
        </div>
    )
}

export default MyTechStack