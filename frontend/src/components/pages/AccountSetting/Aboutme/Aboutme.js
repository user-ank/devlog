import React from 'react'
import './Aboutme.css'
import AccountContext from '../../../../context/accountContext';
import AboutmeIsUser from './AboutmeIsUser';
import AboutmeNonUser from './AboutmeNonUser';

function Aboutme() {
    const {isUsers, info} = React.useContext(AccountContext);
    
    return (
        <div className='user-aboutme'>
            <div className="aboutme">
                <div className="user-aboutme-text"> About Me</div>
                {
                    isUsers ?
                    <AboutmeIsUser/>
                    :
                    <AboutmeNonUser/>
                }

            </div>
        </div>
    )
}

export default Aboutme