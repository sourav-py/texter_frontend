import { useState } from "react";
import Main from "./Main";
import Home from "./Home";

function EnterOTP(props) {
    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const [otp,setOtp] = useState(null);
    const [userProfile,setUserProfile] = useState(null)

    const phoneNumber = props.phoneNumber;

    const handleInput = (event) => {
        setOtp(event.target.value);
    }

    const handleSubmit = (event) => {
        const requestData = {
            'phoneNumber' : phoneNumber,
            'otp': otp
        }

       fetch(backendServerEndpoint + '/auth/verifyotp/',{
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
                console.log("Got 200 response from verify otp endpoint!!!")
               response.json()
               .then(userProfileData => {
                    console.log(userProfileData);
                    setUserProfile(userProfileData);
               }) 
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
    console.log("User profile: " + userProfile);
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter OTP</label>
                <input type="text" placeholder="OTP" onChange={handleInput}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default EnterOTP;