import { useEffect, useState, useRef } from 'react';
import ChatRoomsListItem from './ChatRoomsListItem';
import AddContact from './AddContact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlusCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import UpdateProfile from './UpdateProfile';
import { useNavigate } from 'react-router-dom';

function Sidebar (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const navigate = useNavigate();
    const debugPrefix = "------SIDEBAR-----";
    const [chatRoomsList,setChatRoomsList] = useState(null);
    const [addContactModalDisplay,setAddContactModalDisplay] = useState("none");
    const [updateProfileModalDisplay,setupdateProfileModalDisplay] = useState("none");


    useEffect(() => {

        const fetchChatRooms = setInterval(() => {

            const requestData = {
                'phoneNumber': props.userProfile.phone
            }
            
            fetch(authServerEndpoint + 'chat/chatrooms/',{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData) 
            })
            .then(
                response => {
                    if(response.status == 200){
                        console.log(debugPrefix + "Got 200 response code!!");
                        response.json()
                        .then(
                            responseData => {
                                var responseDataJson = JSON.parse(responseData);
                                setChatRoomsList(responseDataJson);
                                console.log(debugPrefix + chatRoomsList);
                            }
                        )
                    }
                }
            )
            .catch(
                error => {
                    console.log(debugPrefix + error);
                }
            );
        },5000);   

        return () => clearInterval(fetchChatRooms);

    },[])


    useEffect(() => {
        const requestData = {
                'phoneNumber': props.userProfile.phone
            }
            

            fetch(authServerEndpoint + 'chat/chatrooms/',{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData) 
            })
            .then(
                response => {
                    if(response.status == 200){
                        console.log(debugPrefix + "Got 200 response code!!");
                        response.json()
                        .then(
                            responseData => {
                                var responseDataJson = JSON.parse(responseData);
                                setChatRoomsList(responseDataJson);
                                console.log(debugPrefix + chatRoomsList);
                            }
                        )
                    }
                }
            )
            .catch(
                error => {
                    console.log(debugPrefix + error);
                }
            );
    },[props.setLastMessageTimestamp])

    const showAddContactModal = () => {
        setAddContactModalDisplay("block");
    }

    const hideAddContactModal = () => {
        console.log("Clicked here!!!");
        setAddContactModalDisplay("none");
    }

    const showUpdateProfileModal = () => {
        setupdateProfileModalDisplay("block");
    }

    const hideUpdateProfileModal = () => {
        setupdateProfileModalDisplay("none");
    }

    const logout = () => {
        fetch(authServerEndpoint + 'auth/logout/',{
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }
        })
        .then(
            response => {
                console.log(response);
                if(response.status === 200){
                    navigate('/login');
                }
            }
        )
        .catch(
            error => {
                console.log("Logout error: ",error);
            }
        )
    }

    
   
   if(chatRoomsList == null){
    return (
        <div>
            Loading....
        </div>
    )
   }
   else{
    return (
        <>
            <div className="flex flex-row space-x-10 pl-4 items-center border-2 border-dotted border-blue-500 h-[9%] overflow-hidden">
                <img className = "w-10 h-10" src={props.userProfile.avatar ? authServerEndpoint + props.userProfile.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
                <div className=" flex place-content-end pr-2 border-2 border-dotted border-slate-700 w-full flex-row items-center">
                    <div className="pr-4 text-xl">
                        <FontAwesomeIcon onClick = {showUpdateProfileModal} icon={faCog}/>
                    </div>
                    <div className="pr-4 text-xl">
                        <FontAwesomeIcon onClick = {logout} icon={faSignOut}/>
                    </div>
                </div>
            </div>
            <div className="h-[6%] flex items-end">
                <div className="text-lg text-slate-600 pl-3">
                    Chats
                </div>
            </div>
            <div className="h-[83%]  p-2 overflow-y-scroll no-scrollbar">
                <div className=" flex flex-col gap-2">
                    {
                        chatRoomsList.map((chatroom,index) => (
                                <ChatRoomsListItem key = {index} setCurrentChatRoom = {props.setCurrentChatRoom} chatroom={chatroom} currentChatRoom = {props.currentChatRoom}/>          
                                                    )

                        )
                    }
                    <div className="flex flex-row place-content-end p-4 text-3xl text-slate-600 mr-2 sticky bottom-0">
                        <FontAwesomeIcon  onClick={showAddContactModal} icon={faPlusCircle}/>
                    </div>
                </div>
            </div>
            
            <div className="hidden">
                <AddContact  currentUser = {props.userProfile} addContactModalDisplay = {addContactModalDisplay} showAddContactModal = {showAddContactModal} hideAddContactModal = {hideAddContactModal} setAddContactModalDisplay = {setAddContactModalDisplay} setLastMessageTimestamp = {props.setLastMessageTimestamp}/>
            </div>
            <div className="hidden">
                <UpdateProfile  setUserProfile={props.setUserProfile} userProfile = {props.userProfile} updateProfileModalDisplay = {updateProfileModalDisplay} hideUpdateProfileModal={hideUpdateProfileModal}/>
            </div>
        </>
    ) 
    }
}

export default Sidebar;