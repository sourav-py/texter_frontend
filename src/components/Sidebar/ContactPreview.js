
function ContactPreview (props) {

    const authServerEndpoint = 'https://texter-backend.vercel.app';

   return (
        <div class="contact-preview">
            <div class="contact-avatar-wrapper">
                <img class="contact-avatar" src={props.profile.avatar ? authServerEndpoint + props.profile.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            </div>
            <div class="contact-name-message-wrapper">
                <div class="contact-name">
                    <p>{props.profile.name ? props.profile.name : props.profile.phone}</p>
                </div>
            </div>
        </div>
   ) 
}

export default ContactPreview;