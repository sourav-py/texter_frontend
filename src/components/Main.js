import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DummyLogin from './login/DummyLogin';
import Sidebar from './Sidebar/Sidebar';

import ChatRoom from './chatroom/ChatRoom';


function Main () {

    console.log("----MAIN-----")
    const authServerEndpoint = 'https://texter-backend.vercel.app/';
    const debugPrefix = "MAIN:::::";
    const navigate = useNavigate();
   
    const [isTabFocused,setIsTabFocused] = useState(true);
    const [userProfile,setUserProfile] = useState(null);
    const [currentChatRoomId,setCurrentChatRoomId] = useState(null);
    const [currentChatRoom,setCurrentChatRoom] = useState(null);
    const [lastMessageTimestamp,setLastMessageTimestamp] = useState(null);
    


    const handleLastMessageTimestampUpdate = () => {
        setLastMessageTimestamp(new Date());
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabFocused(!document.hidden);
        };

        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);


    useEffect(() => {
        // Make API calls only when the tab is focused and user is logged in
        if (isTabFocused && userProfile) {
            const interval = setInterval(() => {
                const requestData = {
                    'userId': userProfile.id
                }
                fetch(authServerEndpoint + 'auth/activitystatus/?action=update',{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(requestData) 
            })
            .then(
                () => {
                    console.log('USER STATUS API CALL MADE');
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            );
            }, 5000); // Adjust the interval as needed

        // Clean up the interval on component unmount or when the tab loses focus
        return () => clearInterval(interval);
        }
    }, [isTabFocused,userProfile]);

    

    //Check if a sesion exists or not
    useEffect(() => {

        const handleVisibilityChange = () => {
            setIsTabFocused(!document.hidden);
        };

        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        //For initial Status API call
        setIsTabFocused(!document.hidden);
    

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

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange); 
        };

    },[])
    
    if(userProfile){
        return (
            <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-slate-300">
                <div className="h-[92vh] w-[85vw] flex flex-row place-content-around">
                    <div className="flex flex-col h-full  place-content-around w-[22%] ">
                        <Sidebar currentChatRoom = {currentChatRoom} setCurrentChatRoom = {setCurrentChatRoom} userProfile={userProfile} setUserProfile = {setUserProfile} lastMessageTimeStamp = {lastMessageTimestamp} setLastMessageTimestamp = {setLastMessageTimestamp}/>
                    </div>
                    <div className=" h-full bg-white rounded-lg w-[76%]">
                        <ChatRoom chatRoomId = {currentChatRoomId} chatRoom={currentChatRoom} userId = {userProfile.id} handleLastMessageTimestampUpdate = {handleLastMessageTimestampUpdate}/> 
                    </div>
                </div> 
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