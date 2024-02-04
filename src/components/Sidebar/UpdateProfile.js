import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile(props) {

    const backendServerEndpoint = 'http://127.0.0.1:8000';
    const navigate = useNavigate();
    const [userName,setUserName] = useState(null);
    const [userBio,setUserBio] = useState(null);
    const [userAvatar,setUserAvatar] = useState(null);
    const [errorMsg,setErrorMsg] = useState(null);

    const visibleModalClass = "fixed top-[50%] left-[50%] inset-0 z-900 bg-white rounded-lg p-8 w-96";
    const visibleOverlayClass = "fixed top-0 left-0 w-full h-full z-50  bg-gray-300 bg-opacity-50";
    const hiddenClass = "hidden";

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

    useEffect(() => {
        setUserName(props.userProfile.name);
        setUserBio(props.userProfile.bio);
    },[])



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
                    response.json()
                    .then(
                        responseData => {
                            props.setUserProfile(responseData);
                        }
                    )
                    props.hideUpdateProfileModal();
                   navigate('/'); 
                }
                else{
                    setErrorMsg("Unable to update data!!");
                }
           } 
        )
        .catch(
            error => {
                setErrorMsg("Unable to update data!!");
            }
        )

    }


    return (
        <div className=" flex flex-col gap-y-4  w-[25vw] border-slate-300 border-2 rounded-lg h-[50vh] bg-white">
            <div>
                <FontAwesomeIcon className="float-right mt-4 mr-4 text-xl" onClick={props.hideUpdateProfileModal} icon={faClose}/>
            </div>
            <form className=" h-[80%] border-2 border-black clear-end"  onSubmit={handleProfileUpdate}>
                <label>Phone</label>
                <input type="tel" value={props.userProfile.phone} disabled/>
                <label>Name</label>
                <input type="text" onChange={handleNameChange} value={userName}/>
                <label>bio</label>
                <input type="text"  disabled = {false} onChange={handleBioChange} value={userBio}/>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateProfile;