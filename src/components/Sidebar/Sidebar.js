import { useEffect, useState, useRef } from 'react';
import ChatRoomsListItem from './ChatRoomsListItem';
import AddContact from './AddContact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlusCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import UpdateProfile from './UpdateProfile';
import { useNavigate } from 'react-router-dom';

function Sidebar (props) {

    const authServerEndpoint = 'https://texter-backend.vercel.app/';
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
        console.log("hiding update profile modal!!!");
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
    

    return (
        <>
            <div className=" bg-white rounded-lg flex flex-row space-x-10 pl-4 items-center  h-[9%] overflow-hidden">
                <img className = "w-10 h-10" src={props.userProfile.avatar ? authServerEndpoint + props.userProfile.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
                <div className=" flex place-content-end pr-2  w-full flex-row items-center">
                    <div className="pr-4 text-2xl text-slate-700">
                        <FontAwesomeIcon onClick = {showUpdateProfileModal} icon={faCog}/>
                    </div>
                    <div className="pr-4 text-2xl text-slate-700">
                        <FontAwesomeIcon onClick = {logout} icon={faSignOut}/>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg h-[90%]">
                <div className=" mt-2 mb-2 flex items-end">
                    <div className="text-lg text-slate-600 pl-3">
                        Chats
                    </div>
                </div>
                <div className="p-2 overflow-y-scroll no-scrollbar">

                { chatRoomsList != null && 
                    <div className=" flex flex-col gap-1">
                        {
                            chatRoomsList.map((chatroom,index) => (
                                    <ChatRoomsListItem key = {index} setCurrentChatRoom = {props.setCurrentChatRoom} chatroom={chatroom} currentChatRoom = {props.currentChatRoom}/>          
                                                        )

                            )
                        }
                        <div className="flex flex-row place-content-end p-4 text-3xl text-slate-600  sticky bottom-0">
                            <FontAwesomeIcon  onClick={showAddContactModal} icon={faPlusCircle}/>
                        </div>
                    </div>

                }
                {
                    chatRoomsList == null && 
                    <div className="animate-pulse flex flex-col gap-1">
                        <div className= "">
                            <div className="h-10 w-10 flex-none bg-slate-200 rounded-full"></div>
                            <div class="min-w-0 flex-auto">
                                <p class="h-2 bg-slate-200 rounded"></p>
                                <p class="h-1 bg-slate-200 rounded"></p>
                            </div> 
                        </div>

                        <div className="flex flex-row place-content-end p-4 text-3xl text-slate-600  sticky bottom-0">
                            <FontAwesomeIcon  onClick={showAddContactModal} icon={faPlusCircle}/>
                        </div>
                    </div> 
                }
                </div>
            </div>
            <div className={addContactModalDisplay === "block" ? "fixed inset-0 bg-slate-300 opacity-40" : "hidden"} onClick={hideAddContactModal} ></div>

            <div className={addContactModalDisplay === "block" ? "fixed inset-0 flex justify-center items-center" : "hidden"}>
                <AddContact  currentUser = {props.userProfile} addContactModalDisplay = {addContactModalDisplay} showAddContactModal = {showAddContactModal} hideAddContactModal = {hideAddContactModal} setAddContactModalDisplay = {setAddContactModalDisplay} setLastMessageTimestamp = {props.setLastMessageTimestamp}/>
            </div>

            <div className={updateProfileModalDisplay === "block" ? "fixed inset-0 bg-slate-300 opacity-40" : "hidden"} onClick={hideUpdateProfileModal} ></div>

            <div className={updateProfileModalDisplay === "block" ? "fixed inset-0 flex justify-center items-center" : "hidden"}>
                <UpdateProfile  setUserProfile={props.setUserProfile} userProfile = {props.userProfile} updateProfileModalDisplay = {updateProfileModalDisplay} hideUpdateProfileModal={hideUpdateProfileModal}/>
            </div>
        </>
    ) 
}

export default Sidebar;