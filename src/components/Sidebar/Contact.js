import { useEffect, useState, useRef } from 'react';
import '../../static/css/main.css';


function Contact (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000';

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