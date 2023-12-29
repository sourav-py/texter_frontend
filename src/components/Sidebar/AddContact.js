import { useState } from "react";
import Contact from "./Contact";
import { Button } from "react-bootstrap";

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
        <div>
            <div className = {props.addContactModalDisplay === "block" ? "add-contact-modal" : "add-contact-modal-hidden"}>
                <span class="close-add-contact-modal" onClick={props.hideAddContactModal}>&times;</span>
                <form  className="add-contact-form" onSubmit={handleFormSubmission}>
                    <div className="form-input-review-wrapper">
                        <div className="add-contact-heading">
                            Add Contact
                        </div>
                        <input className="phone-input"  type="tel" id="phone-input" value = {phoneNumber} onChange = {handlePhoneNumberInput} placeholder='Enter phone number'></input>
                        <div className="contact-preview">
                        {profile && <Contact profile={profile}/>} 
                        <div className="participation-creation-error">{errorMsg}</div>
                        </div>
                    </div>
                    <div className="chat-btn-wrapper">
                        { !profile && <input className="chat-btn" type="submit" value="Chat" disabled/>}
                        { profile && <input className="chat-btn" type="submit" value="Chat"/>}
                    </div>
                </form>
            </div>
            <div className={props.addContactModalDisplay === "block" ? "overlay" : "overlay-hidden"} onClick={props.hideAddContactModal}></div>
        </div>
    )
}

export default AddContact;