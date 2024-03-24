import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile(props) {

    const backendServerEndpoint = 'https://texter-backend.vercel.app';
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
        <div className=" flex flex-col gap-y-4  w-[23vw] border-slate-300 border-2 rounded-lg h-[50vh] bg-white">
            <div>
                <FontAwesomeIcon className="float-right rounded-full p-1 hover:bg-slate-200 mt-2 mr-4 text-xl" onClick={props.hideUpdateProfileModal} icon={faClose}/>
            </div>
            <form className=" h-[80%] flex flex-col items-center clear-end"  onSubmit={handleProfileUpdate}>
                <div className="mt-4">
                    <label className="block text-md mb-1">Phone</label>
                    <input disabled className="w-full rounded-md py-1 pl-2 shadow-sm text-gray-800 ring-1 ring-inset ring-gray-300" type="tel" value={props.userProfile.phone}/>
                </div>
                <div className="mt-4">
                    <label className="block text-md mb-1">Name</label>
                    <input className="w-full border-0 outline-none rounded-md py-1 pl-2 shadow-sm text-gray-800 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-500" type="text" onChange={handleNameChange} value={userName}/>
                </div>
                <div className="mt-4">
                    <label className="block text-md mb-1">bio</label>
                    <input className="w-full border-0 outline-none rounded-md py-1 pl-2 shadow-sm text-gray-800 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-500" type="text"  disabled = {false} onChange={handleBioChange} value={userBio}/>
                </div>
                <button className="block w-20 h-8 rounded-md hover:bg-slate-500 bg-slate-700 text-white mt-6" type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateProfile;