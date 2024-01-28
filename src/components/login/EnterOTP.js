import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../Main";
import UpdateProfile from "../Sidebar/UpdateProfile";


function EnterOTP(props) {

    const backendServerEndpoint = 'https://base64dev.pythonanywhere.com';
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
                    navigate('/');
                }

                response.json()
                .then(
                    responseData => {
                        setUserProfile(responseData);    
                        setErrorMsg(null);
                    }
                )
            }
            else{
                response.json()
                .then(
                    responseData => {
                        setErrorMsg(responseData.message);
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
            {!userProfile && 
                <div className="form-wrapper">
                    <form className="form" onSubmit={handleSubmit}>
                        <label>Enter OTP</label>
                        <br/>
                        <input type="text" placeholder="OTP" onChange={handleInput}></input>
                        <button type="submit">Verify</button>
                        <div style={{color:"red",fontSize:"12px",margin:"5%"}}>
                            {errorMsg}
                        </div>
                    </form>
                </div>
            }
            {userProfile && props.newProfile && 
                <div>
                    <UpdateProfile userProfile = {userProfile} />
                    <a onClick={handleProfileUpdateSkip}>skip</a>
                </div>
            }
        </div>
    )
}

export default EnterOTP;