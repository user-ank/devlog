import Navbar from './Navbar';
import {useState} from 'react';
import Searchbar from './Searchbar';
import { logout } from '../../api';
import {useAuth} from '../../context/auth'
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

// Will contain header components like search-bar nav-bar login-icon 

export const showSuccessMsg = () => {         
        
    // This element is in Header.js component, tell if login successful or not;
    let element = document.getElementById("logInSuccess"); 
    element.style.opacity = 1;
    element.style.visibility = "visible";
    setTimeout(()=>{
        element.style.visibility = "hidden";
        element.style.opacity = 0;
    },3000);
}

export const wentWrongMsg = () => {
    let element = document.getElementById("wentWrong"); 
    element.style.opacity = 1;
    element.style.visibility = "visible";
    setTimeout(()=>{
        element.style.visibility = "hidden";
        element.style.opacity = 0;
    },3000);
}

function Header() {

   const auth = useAuth();
   const [loading, setLoading] = useState(false); 
    // user object

    async function handleLogout(){
        try{
            setLoading(true);
            const response = await logout();
            if(response.status == 200) 
            {
                console.log("Logged out successfully");
                auth.logout();
                setLoading(false);
                
                let element = document.getElementById("logOutSuccess");
                element.style.visibility = "visible";
                element.style.opacity = 1;
                setTimeout(()=>{
                    element.style.visibility = "hidden";
                    element.style.opacity = 0;
                },2500);
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

    return (
        <div>
            <header>
                <div className="name">DEV<span className="ex">log</span></div>

                <Searchbar />

                <Navbar />

                {auth.user ? (

                <div id="loginImgDiv">
                    <Link to="/devlog/profile"><img id="loginImg" src={(auth.user.profilePhoto)}/></Link>

                    {loading ? 
                    (<img id='roller' src={require("../img/roller2.gif")}/>)
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
            <Loader/>
            
            <div className='headerDivCover'>
                <div id='logInSuccess' className='logInSuccess headerDiv'>Logged &nbsp; In&nbsp; Succesfully !</div>
                <div id='logOutSuccess' className='logOutSuccess headerDiv'>Logged&nbsp; Out&nbsp; Succesfully !</div>
                <div id='wentWrong' className='wentWrong headerDiv'>Something&nbsp; went&nbsp; wrong !</div>
            </div>
        </div>

    );
}

export default Header;
