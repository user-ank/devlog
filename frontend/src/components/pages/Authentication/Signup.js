import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as api from '../../../api/index'
import './Signup.css';
import { useAuth } from '../../../context/auth';

const initialState = { firstName: "", lastName: "", email: "", userName: "", password: "", confirmPassword: "" };

export default function Signup() {

    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation()
    const redirectPath = location.state?.path || '/devlog';

    const [loading, setLoading] = useState(false);
    const [mismatch, setMismatch] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [check, setCheck] = useState(false);
    // const [availabeObj, setObj] = useState({usernameAva:false, emailAva:false})

    const [formData, setFormData] = useState(initialState);

    function checkMismatch() {
        if (formData.password !== formData.confirmPassword) {
            setMismatch(true);
            return (false);
        }
        else {
            setMismatch(false);
            return (true);
        }
    }
    function checkMandatory() {
        if (formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.userName === "" || formData.password === "" || formData.confirmPassword === "") {
            setEmpty(true);
            return (false);
        }
        else {
            setEmpty(false)
            return (true);
        }
    }
    function checkButton() {
        if (formData.email !== "" && formData.userName !== "") {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
    }
    function finalCheck(resObj) {
        let warnEmail = document.getElementById("warnEmail");
        let warnUsername = document.getElementById("warnUsername");
        let emailInput = document.getElementById("emailInput");
        let userNameInput = document.getElementById("userNameInput");
        let avaUsername = document.getElementById("avaUsername");

        if (resObj.usernameAva === false) {
            avaUsername.style.visibility = "hidden";
            warnUsername.style.visibility = "visible";
            userNameInput.classList.remove("greenBorder");

        }
        else {
            avaUsername.style.visibility = "visible";
            warnUsername.style.visibility = "hidden";
            userNameInput.classList.add("greenBorder");
            // setUsername(true);
        }

        if (resObj.emailAva === false) {
            warnEmail.style.visibility = "visible";
            emailInput.classList.remove("greenBorder");
        }
        else {
            warnEmail.style.visibility = "hidden";
            emailInput.classList.add("greenBorder");
            // setEmail(true);    
        }
    }


    async function checkAvalaibility() {
        try {
            setLoading(true);
            const dataObj = await api.checkEmailUsername({ userName: formData.userName, email: formData.email });
            setLoading(false);
            console.log(dataObj.data.resObj);

            finalCheck(dataObj.data.resObj);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        checkButton();
    }, [formData.email, formData.userName])


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(formData);
    }

    function removeStyling(e) {

        e.target.classList.remove("greenBorder")
        if (e.target.id === "userNameInput") {
            let warnUsername = document.getElementById("warnUsername");
            let avaUsername = document.getElementById("avaUsername");
            avaUsername.style.visibility = "hidden";
            warnUsername.style.visibility = "hidden";
        }
    }

    async function handleSubmit(e) {
        try {

            e.preventDefault();
            // console.log(formData);
            let cond1 = checkMismatch();
            let cond2 = checkMandatory();


            if (cond1 && cond2) {
                setLoading(true);
                const resObj = await api.signup({
                    name: formData.firstName + " " + formData.lastName,
                    email: formData.email, userName: formData.userName, password: formData.password
                });

                console.log(resObj);

                if (resObj.status === 200) {
                    finalCheck(resObj.data.resObj);
                   
                }
                else if (resObj.status === 201) {
                    console.log(resObj);
                    auth.login({email: formData.email, accessToken:resObj.data.accessToken});
                    navigate(redirectPath);
                }
                else {
                    console.log("some problem, happened")
                    console.log(resObj);
                }
            }
            else {
                console.log("cant post");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='signUpPage'>
            <h3 className='signUpName'>DEV<span className='ex'>log</span></h3>
            <h4 className='signUpName'>Sign Up<hr /></h4>

            {empty ? (<h4 className='warnings'>All Fields Are Mandatory</h4>) : null}
            {mismatch ? (<h4 className='warnings'>Password Mismatch</h4>) : null}

            <form onSubmit={handleSubmit}>
                <div className='firstlastNameDiv'>
                    <input placeholder='First Name*' name="firstName" className='box' type="text" onChange={handleChange} />
                    <input placeholder='Last Name*' name="lastName" className='box' type="text" onChange={handleChange} />
                </div>

                <div>
                    <input id='emailInput' placeholder='Email Address*' name="email" className='box boxDown' type="email" onChange={(e) => { handleChange(e); removeStyling(e) }} />
                    <div id='warnEmail' className='warnEmail'>Email already in use</div>


                    <input id='userNameInput' placeholder='Username*' name="userName" className='box boxDown' type="text" onChange={(e) => { handleChange(e); removeStyling(e) }} />
                    <div className='warnUsernameCheckDiv'>
                        <div id='warnUsername' className='warnUsername'>Username Not Availabe</div>
                        <div id='avaUsername' className='avaUsername'>Username availabe <span id="greenTick">&#x2713;</span></div>

                        {check ? (<div className='check' onClick={checkAvalaibility}>Check</div>) : null}
                    </div>

                    <input placeholder='Password*' name="password" className='box boxDown' type="password" onChange={handleChange} />
                    <input placeholder='Confirm Password*' name="confirmPassword" className='box boxDown' type="password" onChange={handleChange} />
                </div>


                <button type='Submit' disabled={loading} className='submitButton'>
                    {loading ? (<img className='spinner' src={require("../../img/spinner6.gif")} />)
                        :
                        <>Submit</>
                    }
                </button>

            </form>

            <div className='lastDiv'>Already have an account ? &nbsp; Login <Link className='here' to='/devlog/login'>Here</Link></div>
        </div>
    )
}


// onChange={(e)=>setUsername(e.target.value)}