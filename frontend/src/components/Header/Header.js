import Navbar from './Navbar';
import { useState, useEffect, useRef, useCallback } from 'react';
import Searchbar from './Searchbar';
import { logout } from '../../api';
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom';
import { Modal } from "react-responsive-modal";
import Loader from '../../components/Loader';
import "./Header.css";
import { Avatar } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import useStyles from "./ModalStyles";

// Will contain header components like search-bar nav-bar login-icon 


// This element is in Header.js component, tell if login successful or not;
export const showSuccessMsg = () => {
    let element = document.getElementById("logInSuccess");
    element.style.opacity = 1;
    element.style.visibility = "visible";
    setTimeout(() => {
        element.style.visibility = "hidden";
        element.style.opacity = 0;
    }, 3000);
}

// This element is in Header.js component, tell if something went wrong or not;
export const wentWrongMsg = () => {
    let element = document.getElementById("wentWrong");
    element.style.opacity = 1;
    element.style.visibility = "visible";
    setTimeout(() => {
        element.style.visibility = "hidden";
        element.style.opacity = 0;
    }, 3000);
}

export const startLoader = () => {
    let loader = document.getElementById('loader');
    loader.style.visibility = "visible";
    loader.classList.add("eighty");
}

export const finishLoader = () => {
    let loader = document.getElementById('loader');
    loader.classList.add("hundred");

    setTimeout(() => {
        loader.style.visibility = "hidden";
        loader.classList.remove("eighty", "hundred");
    }, 1000)

}

function Header() {

    const auth = useAuth();
    console.log(auth);
    const [loading, setLoading] = useState(false);
    // user object

    async function handleLogout() {
        try {
            setLoading(true);
            const response = await logout();

            console.log("Logged out successfully");
            auth.logout();
            setLoading(false);

            let element = document.getElementById("logOutSuccess");
            element.style.visibility = "visible";
            element.style.opacity = 1;
            setTimeout(() => {
                element.style.visibility = "hidden";
                element.style.opacity = 0;
            }, 2500);

        }
        catch (err) {
            wentWrongMsg();
            console.log(err);
        }

    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <header>
                <div className="name">DEV<span className="ex">log</span></div>

                <Searchbar />

                <Navbar />

                {auth.user ? (

                    <div id="loginImgDiv">
                        {/* <Link to="/devlog/profile"> */}
                        <img id="loginImg" onClick={openModal} src={(auth?.user?.profilePhoto)} />

                        {isModalOpen && (
                            <Modal
                                open={isModalOpen}
                                // closeIcon={Close}
                                onClose={closeModal}
                                closeOnEsc
                                showCloseIcon={false}
                                focusTrapped={false}
                                closeOnOverlayClick={true}
                                classNames={{
                                    overlay: 'customOverlay',
                                    modal: 'qheader-modal',
                                }}
                            >

                                <div >
                                    <div className="modal__info">
                                        <Avatar src={(auth?.user?.profilePhoto)} className='avatar' />
                                        <div className="user_info">
                                            <h3 className='user-profle-name'>Anuj Patel</h3>
                                            <p className='user-id'>@anujpatel03</p>
                                        </div>
                                    </div>
                                    <div className="horizontal-line"></div>
                                    <div className="modal__Field__option">
                                        <Link to="/devlog/bookmarks">
                                            <div className='bookmarks options' onClick={closeModal}>
                                                <div className="material-icons"><BookmarkIcon /></div>
                                                My Bookmarks
                                            </div>
                                        </Link>
                                        <Link to="/devlog/username/accountsetting" onClick={closeModal}>
                                            <div className='account_setting options'>

                                                <div className="material-icons"><ManageAccountsIcon /></div>
                                                Account Settings
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </Modal>
                        )}

                        {loading ?
                            (<img id='roller' src={require("../img/roller2.gif")} />)
                            :
                            (<div id='logoutButton' onClick={handleLogout}>Logout</div>)}

                    </div> // if user is logged in then show image

                ) : (
                    // else show the option to login
                    <div id="login">
                        <Link className='user' to="/devlog/login">
                            <span> Login </span>
                        </Link>
                    </div>
                )}

            </header>

            <div className='hr'></div>
            <Loader />

            <div className='headerDivCover'>
                <div id='logInSuccess' className='logInSuccess headerDiv'>Logged &nbsp; In&nbsp; Succesfully !</div>
                <div id='logOutSuccess' className='logOutSuccess headerDiv'>Logged&nbsp; Out&nbsp; Succesfully !</div>
                <div id='wentWrong' className='wentWrong headerDiv'>Something&nbsp; went&nbsp; wrong !</div>
            </div>
        </div>

    );
}

export default Header;
