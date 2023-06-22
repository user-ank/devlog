import React from 'react'
import AccountContext from '../../../../context/accountContext';
import { Skeleton } from '@mui/material';
import NothingToShow from '../NothingToShow';

function AvailabelForNonUser() {
    
    const {info} = React.useContext(AccountContext);

    return (
    <>
        {

            (info) ? 
            <>
                {
                    (info.available_for) ?
                    <p className="profileavailablefor-availablefor-content">{info.available_for}</p> : <NothingToShow/>    
                }
            </>
            :
            <Skeleton variant='rounded' animation='wave' height={30} width='100%'/>
        }
    </>
  )
}

export default AvailabelForNonUser;