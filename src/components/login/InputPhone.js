import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterOTP from "./EnterOTP";
import FloatingIcons from "./FloatingIcons";


function InputPhone(){

    const backendServerEndpoint = 'https://texter-backend.vercel.app';
    const navigate = useNavigate();
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [otpSent,setOtpSent] = useState(false);
    const [newProfile,setNewProfile] = useState(false);
    const [introText,setIntroText] = useState("");

    useEffect(() => {
        var fullIntroText = "Let's start texting ....";
        var i = 0;
        function typeWriter(){
            if(i < fullIntroText.length){
                i += 1;
                //console.log("itr: ",i);
                setIntroText(fullIntroText.substring(0,i));
                setTimeout(typeWriter,50);
            }
        }
        typeWriter();
    },[])


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
        <div className="flex flex-row h-[100vh]">
            <div className="grid grid-cols-3 gap-4 p-6 w-[50%]">
                <FloatingIcons/>
            </div>
            <div className="flex justify-center items-center w-[50%] bg-white">
                {!otpSent && 
                    <form className="w-[80%]" onSubmit={handleSubmit}>
                        <div className="flex justify-center p-2 mb-6  text-6xl text-slate-800">
                            {introText}
                        </div>
                        <div className="p-2 mb-6  flex justify-center">
                            <input className="border-[2px] w-3/4 p-2 rounded-md placeholder:text-slate-400 text-slate-700 border-slate-500 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1" type="tel" id="phone" placeholder="Enter phone number" required onChange={handleInput}></input>
                        </div>
                        <div className="p-2 m-2 flex justify-center items-center">
                            <button className="rounded-lg h-10 w-24 border-2 border-slate-400 hover:bg-slate-400 hover:text-white" type="submit">Send otp</button>
                        </div>
                    </form>
                }
                {otpSent && <EnterOTP phoneNumber={phoneNumber} newProfile = {newProfile}/>}
            </div>
        </div>
    )
}

export default InputPhone;