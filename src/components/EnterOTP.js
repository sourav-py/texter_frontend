import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import UpdateProfile from "./UpdateProfile";

function EnterOTP(props) {

    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const navigate = useNavigate();
    const [otp,setOtp] = useState(null);
    const [userProfile,setUserProfile] = useState(null);
    const [errorMsg,setErrorMsg] = useState(null);

    const handleInput = (event) => {
        setOtp(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestData = {
            'phoneNumber' : props.phoneNumber,
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
                if(!props.newProfile){
                    //navigate('/');
                }

                response.json()
                .then(
                    responseData => {
                        setUserProfile(responseData);    
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
    } 

    const handleProfileUpdateSkip = () => {
        navigate('/');
    }
    
    return(
        <div>
            {!userProfile && <form onSubmit={handleSubmit}>
                    <label>Enter OTP</label>
                    <input type="text" placeholder="OTP" onChange={handleInput}></input>
                    <input type="submit"></input>
                </form>
            }
            {userProfile && 
                <div>
                    <UpdateProfile userProfile = {userProfile} />
                    <a onClick={handleProfileUpdateSkip}>skip</a>
                </div>
            }
        </div>
    )
}

export default EnterOTP;