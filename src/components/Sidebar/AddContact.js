import { useState } from "react";
import ContactPreview from "./ContactPreview";
import { Button } from "react-bootstrap";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddContact (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [validPhoneNumber,setValidPhoneNumber] = useState(false);
    const [profile,setProfile] = useState(null);
    const [errorMsg,setErrorMsg] = useState(null);

    const handlePhoneNumberInput = (e) => {
        const requestData = {
            'phoneNumber': e.target.value
        }
        fetch(authServerEndpoint + 'auth/fetchuser/',{
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(requestData)
        }).then(
            response => {
                console.log("Response status: ",response.status);
                if(response.status == 200){
                    response.json()
                    .then(
                        responseData => {
                            console.log("Response data: ",responseData);
                            setProfile(responseData);
                        }
                    )
                }
                else{
                    setProfile(null);
                }
            }
        )
        .catch(
            error => {
                console.log(error)
                setProfile(null);
            }
        )
    }

    const handleFormSubmission = (e) => {
        e.preventDefault();
        console.log("handling form submission!!!");
        const requestData = {
            'phoneNumbers': [props.currentUser.phone,profile.phone],
            "mode": "DIRECT"
        }
        console.log("Request data: ",requestData);
        fetch(authServerEndpoint + 'chat/participation/',{
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(requestData)
        }).then(
            response => {
                if(response.status == 200){
                    props.setLastMessageTimestamp(new Date());
                    props.setAddContactModalDisplay("none");
                }
                else{
                    setErrorMsg("Failed to create chatroom!!");
                }
            }
        )
        .catch(
            error => {
                setErrorMsg(error);
            }
        )
    }

    return (
            <div className=" flex flex-col gap-y-4  w-[21vw] border-slate-300 border-2 rounded-lg h-[50vh] bg-white">
                <div>
                    <FontAwesomeIcon className="float-right rounded-full p-1 hover:bg-slate-200 mt-2 mr-4 text-xl" onClick={props.hideAddContactModal} icon={faClose}/>
                </div>
                <form  className=" h-[80%] flex flex-col items-center clear-end" onSubmit={handleFormSubmission}>
                    <div className="h-[70%]">
                        <div className="text-xl font-mono mb-4">
                            Add Contact
                        </div>
                        <input className="w-full rounded-md py-1 pl-2 shadow-sm text-gray-800 ring-1 ring-inset ring-gray-300" type="tel"  type="tel" id="phone-input" value = {phoneNumber} onChange = {handlePhoneNumberInput} placeholder='Enter phone number'></input>
                        {profile && <ContactPreview profile={profile}/>} 
                        <div className="">{errorMsg}</div>
                    </div>
                    <div className="h-[30%]">
                        { !profile && <input className="block w-20 h-8 rounded-md hover:bg-slate-500 bg-slate-700 text-white mt-6" type="submit" value="Chat" disabled/>}
                        { profile && <input className="block w-20 h-8 rounded-md hover:bg-slate-500 bg-slate-700 text-white mt-6" type="submit" value="Chat"/>}
                    </div>
                </form>
            </div>
    )
}

export default AddContact;