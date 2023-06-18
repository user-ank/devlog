import React from 'react'
import './AccountProfile.css'
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AccountContext from '../../../context/accountContext';
import Skeleton from '@mui/material/Skeleton';

function AccountProfile() {
    const {isUsers, info} = React.useContext(AccountContext);

    return (
        <div className='account-profile'>
            <div className="account-profile-top">
                <div className='account-profile_1'>
                    <div className="profilephoto">
                        {
                            (info) ? 
                            <>
                                <img className="account-profile-profilepic" src={info?.profilePhoto} alt="profilep" />
                                {isUsers && <button className='profile-photo-delete-btn' > <DeleteForeverRoundedIcon /> </button>}
                            </> : 

                            <Skeleton variant="circular"  width={160} height={160}/>
                        }

                    </div>
                    <div className="account-profile-user-info">
                        <span className="account-profile-users-name">
                            {
                                (info) ?
                                <span className="account-profile-user-name">{info.name}</span>
                                :
                                <Skeleton animation="wave" variant='rectangle' height={35} width={200}/>
                            }
                            
                        </span>
                        <div className="account-profile-user-tagline">
                            {
                               (info) ?
                                <p className='usertagline'>{info?.profileTagline}</p>
                                :
                                <Skeleton className='usertagline' animation="wave" variant='rectangle' />
                            }
                        </div>
                        <div className="account-profile-social-count">
                            {
                                (info) ? 
                                <>
                                    <div className="account-profile-numfollower account-profile-nums">
                                        <b className='account-profile-count'> {info.followers} </b>
                                        Followers
                                    </div>
                                    <div className="account-profile-numfollowing account-profile-nums">
                                        <b className='account-profile-count'> {info.following} </b>
                                        Following
                                    </div>
                                </> : 
                                <Skeleton animation="wave" variant='rectangle' height={20} width={300}/>
                            }
                        </div>

                    </div>
                </div>
                <div className="account-profile-useful-buttons">
                    {
                        (info) ?
                        <>
                            <div className="sharebtn">
                                <ShareIcon />
                            </div>
                            {isUsers ?
                                <div className="account-profile-editbtn">
                                <div className="account-profile-editicon"> <EditIcon /> </div>
                                <div className="account-profile-edit"> Edit </div>
                                </div>
                                :
                                <div className="account-profile-editbtn">
                                    <div className="account-profile-editicon"> <AddIcon /> </div>
                                    <div className="account-profile-edit"> Follow </div>
                                </div>
                            }
                        </> :
                        <Skeleton variant='rounded' height={40} width={180} sx={{ borderRadius: 5 }} />
                    }

                </div>
            </div>
        </div>
    )
}

export default AccountProfile