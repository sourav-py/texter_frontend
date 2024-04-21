import { useEffect, useState, useRef } from 'react';

function ChatRoomsListItem (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000';
    const debugPrefix = "CHATROOM_LIST_ITEM:::::";
    const [className,setClassName] = useState("flex bg-sky-50 p-2 min-w-0 gap-x-4 hover:bg-sky-100 rounded-md");
    const [lastMessageClassName,setLastMessageClassName] = useState("truncate text-xs leading-5 text-slate-700");
    const [lastMessageTimestampClassName,setLastMessageTimestampClassName] = useState("text-xs content-center text-slate-700 p-1 italic");


    const handleChatRoomSelection = () => {
        console.log("Clicked a chatroom!!!");
        props.setCurrentChatRoom(props.chatroom);
    }

    useEffect(() => {
        if(props.currentChatRoom){
            if(props.currentChatRoom.id == props.chatroom.id){
                setClassName("flex p-2 min-w-0 gap-x-4 rounded-lg bg-sky-800 text-white");
                setLastMessageClassName("truncate text-xs leading-5 text-slate-300")
                setLastMessageTimestampClassName("text-xs content-center text-slate-300 p-1 italic")
            }
            else{
                setClassName("flex bg-sky-50 p-2 min-w-0 gap-x-4 hover:bg-sky-100 rounded-md");
                setLastMessageClassName("truncate text-xs leading-5 text-slate-700")
                setLastMessageTimestampClassName("text-xs content-center text-slate-700 p-1 italic")
            }
        }
    },[props.currentChatRoom])
   
   return (
        <div className= {className} onClick={handleChatRoomSelection}>
            <img className="h-10 w-10 flex-none rounded-full " src={props.chatroom.avatar ? authServerEndpoint + props.chatroom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            <div class="min-w-0 flex-auto">
                <div className="flex flex-row justify-between">
                    <div className="leading-6">{props.chatroom.name}</div>
                    <div className= {lastMessageTimestampClassName}>{props.chatroom.timestamp_str}</div>
                </div>
                <p className = {lastMessageClassName}> {props.chatroom.last_message}</p>
            </div> 
        </div>
   ) 
}

export default ChatRoomsListItem;