import React from 'react'
import './AvailableFor.css'
import AccountContext from '../../../../context/accountContext';
import AvailabelForIsUser from './AvailabelForIsUser';
import AvailabelForNonUser from './AvailabelForNonUser';

function AvailableFor() {
    const {isUsers, info} = React.useContext(AccountContext);
    return (
        <div className='user-availablefor'>
            <div className="availablefor">
                <div className="user-availablefor-text"> I am available for</div>
                {
                    isUsers ?
                        <AvailabelForIsUser/>
                        :
                        <AvailabelForNonUser/>
                }
            </div>
        </div>
    )
}

export default AvailableFor