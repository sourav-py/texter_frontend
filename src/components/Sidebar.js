import { useEffect, useState, useRef } from 'react';
import ChatRoomsListItem from './ChatRoomsListItem';
import '../static/css/main.css';

function Sidebar ({userProfile}) {

    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const debugPrefix = "SIDEBAR:::::";

    const [chatRoomsList,setChatRoomsList] = useState(null);



    //Check if a sesion exists or not
    useEffect(() => {

        const fetchChatRooms = async () => {

            const requestData = {
                'phoneNumber': userProfile.phone
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

    },[])
   
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
                <div class="user-avatar">
                    
                </div>
                <div class="user-phone-number">
                </div>
            </div>
            <div class="chatrooms-list">
            </div>
        </div>
    ) 
            }
}

export default Sidebar;