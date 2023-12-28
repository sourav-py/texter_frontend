import { useEffect, useState, useRef } from 'react';
import ChatRoomsListItem from './ChatRoomsListItem';
import AddContact from './AddContact';
import '../../static/css/main.css';
import '../../static/css/sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function Sidebar (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const debugPrefix = "------SIDEBAR-----";
    const [chatRoomsList,setChatRoomsList] = useState(null);
    const [addContactModalDisplay,setAddContactModalDisplay] = useState("none");


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

    
   
   if(chatRoomsList == null){
    return (
        <div>
            Loading....
        </div>
    )
   }
   else{
    return (
        <div class="sidebar">
            <div class="user-info">
                <img className = "user-self-avatar" src={props.userProfile.avatar ? authServerEndpoint + props.userProfile.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
                <div class="user-options-wrapper">
                    <div>profile</div>
                    <div>logout</div>
                </div>
            </div>
            <div class="chatrooms-list">
                <div class="chatrooms-list-scroll-content">
                {
                    chatRoomsList.map((chatroom,index) => (
                            <ChatRoomsListItem key = {index} setCurrentChatRoom = {props.setCurrentChatRoom} chatroom={chatroom} currentChatRoom = {props.currentChatRoom}/>  
                    )

                    )
                }

                <div className="show-add-contact-modal">
                    <FontAwesomeIcon onClick={showAddContactModal} icon={faPlusCircle}/>
                </div>
                {/*
                <button class="show-add-contact-modal" onClick={showAddContactModal}>Add Contact</button>
            */}
                </div>
            </div>
            <AddContact currentUser = {props.userProfile} addContactModalDisplay = {addContactModalDisplay} showAddContactModal = {showAddContactModal} hideAddContactModal = {hideAddContactModal} setAddContactModalDisplay = {setAddContactModalDisplay} setLastMessageTimestamp = {props.setLastMessageTimestamp}/>
        </div>
    ) 
    }
}

export default Sidebar;