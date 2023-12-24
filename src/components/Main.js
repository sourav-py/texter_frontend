import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DummyLogin from './DummyLogin';
import Sidebar from './Sidebar';

import '../static/css/main.css';
import ChatRoom from './ChatRoom';


function Main () {

    console.log("----MAIN-----")
    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const debugPrefix = "MAIN:::::";
    const navigate = useNavigate();
    
    const [userProfile,setUserProfile] = useState(null);
    const [currentChatRoomId,setCurrentChatRoomId] = useState(null);
    const [lastMessageTimestamp,setLastMessageTimestamp] = useState(null);


    const handleLastMessageTimestampUpdate = () => {
        console.log("updating last message timestamp!!!!");
        setLastMessageTimestamp(new Date());
    }


    //Check if a sesion exists or not
    useEffect(() => {
        const fetchUser = async () => {
            fetch(authServerEndpoint + 'auth/user/',{
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                } 
            })
            .then(
                response => {
                    if(response.status == 200){
                        console.log(debugPrefix + "Got 200 response code!!");
                        response.json()
                        .then(
                            userProfileData => {
                                setUserProfile(userProfileData);
                                console.log(debugPrefix + userProfile);
                            }
                        )
                    }
                    else{
                        console.log(debugPrefix + "response code is not 200!!");
                        navigate('/login');
                    }
                }
            )
            .catch(
                error => {
                    console.log(debugPrefix + error);
                    navigate('/login');
                }
            );
        }   

        fetchUser();

    },[])
    
    if(userProfile){
        return (
           <div class="container">
                <Sidebar setCurrentChatRoomId = {setCurrentChatRoomId} userProfile={userProfile} lastMessageTimeStamp = {lastMessageTimestamp} setLastMessageTimestamp = {setLastMessageTimestamp}/>
                <ChatRoom chatRoomId = {currentChatRoomId} userId = {userProfile.id} handleLastMessageTimestampUpdate = {handleLastMessageTimestampUpdate}/> 
            </div> 
        )
    }
    else{
        return (
            
            <div>
                <p>Loading...</p>
            </div>
            
        )
    }
}

export default Main;