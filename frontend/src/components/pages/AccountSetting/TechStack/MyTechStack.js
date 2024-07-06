import React from 'react'
import './MyTechStack.css'
import AccountContext from '../../../../context/accountContext';
import TeckStackIsUser from './TeckStackIsUser';
import TechStackNonUser from './TechStackNonUser';

function MyTechStack() {
    const {isUsers, info} = React.useContext(AccountContext);
    
    return (
        <div className='user-mytechstack'>
            <div className="mytechstack">
                <div className="user-mytechstack-text"> My Tech Stack</div>
                {
                    isUsers ?
                        <TeckStackIsUser/>
                        :
                        <TechStackNonUser/>
                }

            </div>
        </div>
    )
}

export default MyTechStack