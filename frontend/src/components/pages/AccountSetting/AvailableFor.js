import React from 'react'
import './AvailableFor.css'
import AddIcon from '@mui/icons-material/Add';

function AvailableFor() {
    return (
        <div className='user-availablefor'>
            <div className="availablefor">
                <div className="user-availablefor-text"> I am available for</div>
                <div className="availablefor-account-availableforbtn">
                    <div className="availablefor-account-availableforicon"> <AddIcon /> </div>
                    <div className="availablefor-account-availablefor"> Add Available For </div>
                </div>
                
            </div>
        </div>
    )
}

export default AvailableFor