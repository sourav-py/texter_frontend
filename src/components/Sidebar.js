import { useEffect, useState, useRef } from 'react';
import ChatRoomsListItem from './ChatRoomsListItem';
import AddContact from './AddContact';
import '../static/css/main.css';

function Sidebar (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const debugPrefix = "------SIDEBAR-----";
    const [chatRoomsList,setChatRoomsList] = useState(null);
    const [addContactModalDisplay,setAddContactModalDisplay] = useState("none");


    useEffect(() => {

        const fetchChatRooms = async () => {

            const requestData = {
                'phoneNumber': props.userProfile.phone
            }
            
            function getCookie(name) {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            const csrfToken = getCookie('csrftoken');

            fetch(authServerEndpoint + 'chat/chatrooms/',{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
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
        }   

        fetchChatRooms();

    },[props.lastMessageTimeStamp])

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
                <div class="user-self-avatar">
                    
                </div>
                <div class="user-self-phone-number">
                </div>
            </div>
            <div class="chatrooms-list">
                <div class="chatrooms-list-scroll-content">
                {
                    chatRoomsList.map((chatroom,index) => (
                            <ChatRoomsListItem key = {index} setCurrentChatRoomId = {props.setCurrentChatRoomId} chatroom={chatroom}/>  
                    )

                    )
                }
                <button class="show-add-contact-modal" onClick={showAddContactModal}>Add Contact</button>
                </div>
            </div>
            <AddContact currentUser = {props.userProfile} addContactModalDisplay = {addContactModalDisplay} showAddContactModal = {showAddContactModal} hideAddContactModal = {hideAddContactModal} setAddContactModalDisplay = {setAddContactModalDisplay} setLastMessageTimestamp = {props.setLastMessageTimestamp}/>
        </div>
    ) 
    }
}

export default Sidebar;