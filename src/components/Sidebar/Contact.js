import { useEffect, useState, useRef } from 'react';

function Contact (props) {

    const authServerEndpoint = 'https://base64dev.pythonanywhere.com';

   return (
        <div class="chatroom-list-item">
            <div class="chatroom-list-item-avatar-wrapper">
                <img class="chatroom-list-item-avatar" src={props.profile.avatar ? authServerEndpoint + props.profile.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            </div>
            <div class="chatroom-list-item-name-message-wrapper">
                <div class="chatroom-list-item-name">
                    <p>{props.profile.name ? props.profile.name : props.profile.phone}</p>
                </div>
            </div>
        </div>
   ) 
}

export default Contact;