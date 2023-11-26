import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";

function DummyLogin() {
    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const debugPrefix = "DUMMY_LOGIN:::::";
    const navigate = useNavigate();
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [userProfile,setUserProfile] = useState(null);



    const handleInput = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleSubmit = (event) => {
        const requestData = {
            'phoneNumber' : phoneNumber,
        }

       fetch(backendServerEndpoint + '/auth/dummy-login/',{
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
                console.log(debugPrefix + "Got 200 response from verify otp endpoint!!!")
               response.json()
               .then(userProfileData => {
                    console.log(debugPrefix + userProfileData);
                    setUserProfile(userProfileData);
                    navigate('/');
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
                <input type="tel" placeholder="phone number" onChange={handleInput}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default DummyLogin;