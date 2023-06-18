import React from 'react'
import './AvailableFor.css'
import AddIcon from '@mui/icons-material/Add';
import AccountContext from '../../../context/accountContext';

function AvailableFor() {
    const {isUsers, info} = React.useContext(AccountContext);
    return (
        <div className='user-availablefor'>
            <div className="availablefor">
                <div className="user-availablefor-text"> I am available for</div>
                {
                    isUsers ?
                        <>
                            <div className="availablefor-account-availableforbtn">
                                <div className="availablefor-account-availableforicon"> <AddIcon /> </div>
                                <div className="availablefor-account-availablefor"> Add Available For </div>
                            </div>
                        </>
                        :
                        <p className="profileavailablefor-availablefor-content">
                            DSA,
                            Web Development,
                            Technical Writing,
                            Mentorship,
                            Guidance,
                            Open Source Contribution,
                            Competitive Programming Guidance,
                            Internships,
                            Freelancing,
                            Contract basis,
                            Full Time Basis,
                            Part Time Basis,
                            Remote Work,
                            Full Stack Development,
                            Frontend Development,
                            Backend Development,
                            Software Developer,
                            Software Engineer,
                            Software Development Engineer.
                        </p>
                }


            </div>
        </div>
    )
}

export default AvailableFor