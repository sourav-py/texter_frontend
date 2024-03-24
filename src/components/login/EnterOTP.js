import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../Main";
import UpdateProfile from "../Sidebar/UpdateProfile";


function EnterOTP(props) {

    const backendServerEndpoint = 'https://texter-backend.vercel.app';
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
        <>
            {!userProfile && 
                <form className="w-[80%]" onSubmit={handleSubmit}>
                    <div className="flex justify-center p-2 mb-6  text-6xl text-slate-800">
                        Let's start chatting...
                    </div>
                    <div className="p-2 mb-6 border-dotted flex justify-center">
                        <input className="border-[2px] w-3/4 p-2 rounded-md placeholder:text-slate-400 text-slate-700 border-slate-500 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1" type="text" placeholder="Enter the OTP" onChange={handleInput}></input>
                    </div>
                    <div className="p-2 m-2 flex justify-center items-center">
                        <button className="rounded-lg h-10 w-24 border-2 border-slate-400 hover:bg-slate-400 hover:text-white" type="submit">Verify</button>
                    </div>
                    <div style={{color:"red",fontSize:"12px",margin:"5%"}}>
                        {errorMsg}
                    </div>
                </form>
            }
            {userProfile && props.newProfile && 
                <div>
                    <UpdateProfile userProfile = {userProfile} />
                    <a onClick={handleProfileUpdateSkip}>skip</a>
                </div>
            }
        </>
    )
}

export default EnterOTP;