import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterOTP from "./EnterOTP";

function InputPhone(){
    const [phoneNumber,setPhoneNumber] = useState(null);
    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const [otpSent,setOtpSent] = useState(false);

    const navigate = useNavigate();

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
            console.log(response);
            if(response.status === 200){
                console.log("Response status is 200 [Enter phone number component]")
                setOtpSent(true);
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
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Enter phone number</label><br/>
                    <input type="tel" id="phone" required onChange={handleInput}></input>
                    <input type="submit"></input>
                </form>    
            </div>}
            {otpSent && <EnterOTP phoneNumber={phoneNumber}/>}
        </div>
    )

    /*
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter phone number</label><br/>
                <input type="tel" id="phone" required onChange={handleInput}></input>
                <input type="submit"></input>
            </form>
        </div>
    );
    */
}

export default InputPhone;