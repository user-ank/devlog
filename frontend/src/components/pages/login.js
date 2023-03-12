import React from 'react';
import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './login.module.css';
import { useAuth } from '../../context/auth';

export default function Login() {

  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation()
  
  const redirectPath = location.state?.path || '/devlog';

  async function handleLogin() {
  
    try {
      await auth.login(username);
      navigate(redirectPath, {replace:true})
    
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div className={classes.loginPage}>
      <h4>{(location.state?.path) ? "You need to login first" : " "}</h4>
      <h3 className={classes.name}>Colleg<span className='ex'>Ex</span></h3>
      <h4 className={classes.name}>Login<hr /></h4>

      <div  className={classes.loginWithGoogle} onClick={handleLogin}>
        Login By Your College ID <img src={require('../img/google.png')} className={classes.icon} />
      </div>

      <form onSubmit={handleLogin}>
        <label for="username">Username: </label>
        <input  name="username" type="text" onChange={(e)=>setUsername(e.target.value)}/>
      </form>
    </div>
  )
}


// async function handleSigninWithGoogle() {
    
//   try {
  
//     await auth.googleSignIn()
  
//   } catch (error) {
//     console.log(error);
//   }
// }