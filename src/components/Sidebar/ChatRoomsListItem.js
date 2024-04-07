import { useEffect, useState, useRef } from 'react';

function ChatRoomsListItem (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000';
    const debugPrefix = "CHATROOM_LIST_ITEM:::::";
    const [className,setClassName] = useState("flex bg-sky-50 p-2 min-w-0 gap-x-4 hover:bg-sky-100 rounded-md");


    const handleChatRoomSelection = () => {
        console.log("Clicked a chatroom!!!");
        props.setCurrentChatRoom(props.chatroom);
    }

    useEffect(() => {
        if(props.currentChatRoom){
            if(props.currentChatRoom.id == props.chatroom.id){
                setClassName("flex p-2 min-w-0 gap-x-4 rounded-lg bg-sky-800 text-white");
            }
            else{
                setClassName("flex bg-sky-50 p-2 min-w-0 gap-x-4 hover:bg-sky-100 rounded-md");
            }
        }
    },[props.currentChatRoom])
   
   return (
        <div className= {className} onClick={handleChatRoomSelection}>
            <img className="h-10 w-10 flex-none rounded-full " src={props.chatroom.avatar ? authServerEndpoint + props.chatroom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            <div class="min-w-0 flex-auto">
                <div className="flex flex-row justify-between">
                    <div className="leading-6">{props.chatroom.name}</div>
                    <div className="text-xs content-center p-1 italic">{props.chatroom.timestamp_str}</div>
                </div>
                <p class=" truncate text-xs leading-5"> {props.chatroom.last_message}</p>
            </div> 
        </div>
   ) 
}

export default ChatRoomsListItem;