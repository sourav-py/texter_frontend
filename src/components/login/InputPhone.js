import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterOTP from "./EnterOTP";

import '../../static/css/phone-input.css';

function InputPhone(){

    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const navigate = useNavigate();
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [otpSent,setOtpSent] = useState(false);
    const [newProfile,setNewProfile] = useState(false);


    const handleInput = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleSubmit = (event) => {
        //send API request to the backend to generate and send an OTP
        //to the input phone number
        
        const requestData = {
            'phoneNumber' : phoneNumber
        };

        fetch(backendServerEndpoint + '/auth/sendotp/',{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            credentials: 'include',
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(requestData), 
        })
        .then(
           response => {
            if(response.status === 200){
                setOtpSent(true);
                response.json()
                .then(
                    responseData => {
                        console.log(responseData);
                        if(responseData.newProfile){
                            console.log("It is a new profile!!!");
                            setNewProfile(true);
                        }
                    }
                )
            }
           } 
        )
        .catch(
            error => {
                console.log(error);
            }
        )

        
        event.preventDefault();
    }

    return (
        <div>
            {!otpSent && 
                <div className="form-wrapper">
                    <form className="form" onSubmit={handleSubmit}>
                            <label>Login</label><br/>
                            <input type="tel" id="phone" placeholder="Enter phone number" required onChange={handleInput}></input>
                            <button type="submit">Verify</button>
                    </form>
                </div>
            }
            {otpSent && <EnterOTP phoneNumber={phoneNumber} newProfile = {newProfile}/>}
        </div>
    )
}

export default InputPhone;