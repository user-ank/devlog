import React from 'react'
import './AccountProfile.css'
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AccountContext from '../../../context/accountContext';

function AccountProfile() {
    const isUsers = React.useContext(AccountContext);

    return (
        <div className='account-profile'>
            <div className="account-profile-top">
                <div className='account-profile_1'>
                    <div className="profilephoto">
                        <img className="account-profile-profilepic" src={"https://res.cloudinary.com/ddugttm1b/image/upload/v1678987699/BLOG_API/x5b7doigbtppeyyssvye.jpg"} alt="profilep" />
                        {isUsers && <button className='profile-photo-delete-btn' > <DeleteForeverRoundedIcon /> </button>}

                    </div>
                    <div className="account-profile-user-info">
                        <span className="account-profile-users-name">
                            <span className="account-profile-user-name">Anuj Patel</span>
                        </span>
                        <div className="account-profile-user-tagline">
                            <p className='usertagline'>Abhi seekh raha hoo aur abhi bhi bahut kuchh seekhana baaki hai . </p>
                        </div>
                        <div className="account-profile-social-count">
                            <div className="account-profile-numfollower account-profile-nums">
                                <b className='account-profile-count'> 46 </b>
                                Followers
                            </div>
                            <div className="account-profile-numfollowing account-profile-nums">
                                <b className='account-profile-count'> 3 </b>
                                Following
                            </div>
                        </div>

                    </div>
                </div>
                <div className="account-profile-useful-buttons">
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



                </div>
            </div>
        </div>
    )
}

export default AccountProfile