import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as api from '../../../api/index'
import './LoginModal.css';
import { useAuth } from '../../../context/auth';
import { showSuccessMsg, wentWrongMsg } from '../../Header/Header';

const initialState = { email: "", password: "" };

export default function LoginModal(prop) {

    const auth = useAuth();                                 // to set user context
    const [loading, setLoading] = useState(false);          // is for loading effect on top of submit button
    const [empty, setEmpty] = useState(false);              // is for giving warning
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState); //email and username would be kept here to posted.

    // To show invalid credentials warning.
    function invalidWarning(val){
        let element = document.getElementById("invalid");
        if(val) {
            element.style.visibility = "visible";
        }
        else{
            element.style.visibility = "hidden";
        }
    }

    // To check if all fields are provided or not;
    function checkMandatory() {                             
        if (formData.email === "" || formData.password === "") {
            setEmpty(true);
            return (false);
        }
        else {
            setEmpty(false)
            return (true);
        }
    }

    // On every change in input field, this functions updates formdata.
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        invalidWarning(false);
    }


    // The function to handle submit action.
    // it checks for the responses from the server
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            let cond1 = checkMandatory();           

            if (cond1) {

                setLoading(true);

                const resObj = await api.login({ email: formData.email, password: formData.password });

                if (resObj.status == 200) {
                   
                    auth.login(resObj?.data?.data);

                    prop.changeModal(false)
                    navigate("/");
                    showSuccessMsg();
                }       
            }
            else {
                console.log("cant post");
                setLoading(false);
            }
        }
        catch (err) {
            if (!err?.response) {
                console.log("No server response");
                setLoading(false);
                wentWrongMsg();
               
            }
            else if(err.response.status === 401){

                console.log('wrong credentials')
                setLoading(false);
                invalidWarning(true);
            }
            console.log(err.response);

        }
    }
    
    return (
        <div className='modal'>
             <div className='loginPage'>
                <div className='close' onClick={()=>{prop.changeModal(false)}}>Close</div>

                <h3 className='loginName'>DEV<span className='ex'>log</span></h3>
                <h4 className='loginName'>Sign In<hr /></h4>

                {empty ? (<h4 className='warnings'>All Fields Are Mandatory</h4>) : null}

                <div id='invalid' className='invalid'>Invalid Email Or Password</div>

                <form onSubmit={handleSubmit}>

                    <div>
                        <input id='emailInput' placeholder='Email Address*' name="email" className='box boxDown' type="email" onChange={handleChange} />
                        <input placeholder='Password*' name="password" className='box boxDown' type="password" onChange={handleChange} />
                    </div>
                    
                    <button type='Submit' disabled={loading} className='submitButton'>

                        {loading ? ( <img className='spinner' src={require("../../img/spinner6.gif")}/>)
                        :
                        <>Submit</>
                    }
                    
                    </button>


                    <div className='lastDiv'>Don't have an account ? &nbsp; Sign Up <Link className='here' to='/devlog/signup'>Here</Link></div>

                </form>
            </div>
        </div>
    )
}

