import React from 'react'
import AccountContext from '../../../../context/accountContext'
import { Skeleton } from '@mui/material';
import NothingToShow from '../NothingToShow';

function TechStackNonUser() {
    const {info} = React.useContext(AccountContext);

    return (
        <>
            {
                (info) ? 
                <>
                    {
                        (info.techStack.length != 0) ?
                        <div className="profileaboutme-about-content">{info.techStack.map(tech => <div className='techStackElements'>{tech}</div>)}</div>
                        :
                        <NothingToShow/>
                    }
                </>
                :
                <Skeleton variant='rounded' animation='wave' height={30} width='100%'/>
            }
        </>
  )
}

export default TechStackNonUser