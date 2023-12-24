import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile(props) {

    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const navigate = useNavigate();
    const [userName,setUserName] = useState(null);
    const [userBio,setUserBio] = useState(null);
    const [userAvatar,setUserAvatar] = useState(null);
    const [errorMsg,setErrorMsg] = useState(null);

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleBioChange = (e) => {
        setUserBio(e.target.value);
    }

    const handleAvatarChange = (e) => {
        console.log(e.target.files[0]);
        setUserAvatar(e.target.files[0]);
         
    }



    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const requestData = {
            "id": props.userProfile.id,
            "phone": props.userProfile.phone,
            "name": userName,
            "bio": userBio,
            //"avatar": userAvatar,
            "date_joined": props.userProfile.date_joined
        }
       
        /*
        const formData = new FormData();
        formData.append("id",props.userProfile.id);
        formData.append("phone", props.userProfile.phone);
        formData.append("name", userName);
        formData.append("bio", userBio);
        //requestData.append("avatar", userAvatar);
        formData.append("date_joined", props.userProfile.date_joined);
        */


        fetch(backendServerEndpoint + '/auth/updateprofile/',{
            method: "POST", 
            mode: "cors", 
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        })
        .then(
           response => {
                if(response.status === 200){
                   navigate('/'); 
                }
                else{
                    setErrorMsg("Unable to update data!!");
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
        <div className="edit-user-data">
            <form onSubmit={handleProfileUpdate}>
                <label>Phone</label>
                <input type="tel" value={props.userProfile.phone} disabled/>
                <label>Name</label>
                <input type="text" onChange={handleNameChange} value={userName}/>
                <label>bio</label>
                <input type="text"  disabled = {false} onChange={handleBioChange} value={userBio}/>
                <label>avatar</label>
                <input type="file" onChange={handleAvatarChange}/>
                <div className="form-submission-error">
                </div>
                <input type="submit" value="Update"/>
            </form>
        </div>
    )
}

export default UpdateProfile;