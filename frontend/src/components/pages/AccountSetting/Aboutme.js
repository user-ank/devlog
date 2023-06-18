import React from 'react'
import './Aboutme.css'
import AddIcon from '@mui/icons-material/Add';
import AccountContext from '../../../context/accountContext';

function Aboutme() {
    const {isUsers, info} = React.useContext(AccountContext);
    
    return (
        <div className='user-aboutme'>
            <div className="aboutme">
                <div className="user-aboutme-text"> About Me</div>
                {
                    isUsers ?
                        <>
                            <div className="aboutme-account-aboutmebtn">
                                <div className="aboutme-account-aboutmeicon"> <AddIcon /> </div>
                                <div className="aboutme-account-aboutme"> Add Bio </div>
                            </div>
                            <div className="message-of-empty-bio">
                                Your bio is empty. Tell the world who you are by writing a short description about you.
                            </div>
                        </>
                        :
                        <p className="profileaboutme-about-content">
                            Pro in DSA,
                            Pro in Web Development,
                            Technical Writer,
                            Open Source Enthusiast.
                            I'm currently scratching my head trying to build beautiful responsive websites. Simultaneously, I am distributing my insightful technical articles to multiple publishers. Moreover, I have a habit of feeling relieved only after opening issues and pull requests in projects in which I'm interested in.
                        </p>
                }

            </div>
        </div>
    )
}

export default Aboutme