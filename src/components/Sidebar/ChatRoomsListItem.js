import { useEffect, useState, useRef } from 'react';

function ChatRoomsListItem (props) {

    const authServerEndpoint = 'https://texter-backend.vercel.app';
    const debugPrefix = "CHATROOM_LIST_ITEM:::::";
    const [className,setClassName] = useState("flex bg-slate-100 p-1 min-w-0 gap-x-4 hover:bg-slate-200 rounded-sm");


    const handleChatRoomSelection = () => {
        console.log("Clicked a chatroom!!!");
        props.setCurrentChatRoom(props.chatroom);
    }

    useEffect(() => {
        if(props.currentChatRoom){
            if(props.currentChatRoom.id == props.chatroom.id){
                setClassName("flex p-1 min-w-0 gap-x-4 rounded-sm bg-slate-200");
            }
            else{
                setClassName("flex bg-slate-100 p-1 min-w-0 gap-x-4 hover:bg-slate-200 rounded-sm");
            }
        }
    },[props.currentChatRoom])
   
   return (
        <div className= {className} onClick={handleChatRoomSelection}>
            <img className="h-10 w-10 flex-none rounded-full bg-gray-50" src={props.chatroom.avatar ? authServerEndpoint + props.chatroom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6">{props.chatroom.name}</p>
                <p class=" truncate text-xs leading-5 text-gray-600"></p>
            </div> 
        </div>
   ) 
}

export default ChatRoomsListItem;