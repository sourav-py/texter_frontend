import { useEffect, useState, useRef } from 'react';
import '../static/css/main.css';

function ChatRoomsListItem ({chatRoom}) {

    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const debugPrefix = "CHATROOM_LIST_ITEM:::::";

   
   return (
        <div class="chatroom-list-item">
            <div class="chatroom-list-item-avatar">
            </div>
            <div class="chatroom-list-item-name">
            </div>
        </div>
   ) 
}

export default ChatRoomsListItem;