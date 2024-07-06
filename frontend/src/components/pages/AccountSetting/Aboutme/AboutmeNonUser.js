import React from 'react'
import AccountContext from '../../../../context/accountContext'
import { Skeleton } from '@mui/material';
import NothingToShow from '../NothingToShow';
import './Aboutme.css'

function AboutmeNonUser() {
    //Till the info loads Skeleton will be there; Text will be shown if it is present else NothingToShow.
    
    const { info } = React.useContext(AccountContext);

    return (
        <div>
            {
                (info) ?
                <>
                    {
                        (info?.profileBio) ? <p className="profileaboutme-about-content">{info.profileBio}</p> : <NothingToShow />
                    }
                </>
                :
                <Skeleton variant='rounded' animation='wave' height={30} width='100%' />
            }
        </div>
    )
}

export default AboutmeNonUser
