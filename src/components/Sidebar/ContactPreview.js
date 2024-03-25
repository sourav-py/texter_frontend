
function ContactPreview (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000';

   return (
        <div class="flex p-2 mt-4 min-w-0 gap-x-4 rounded-lg bg-slate-200">
            <img class="h-10 w-10 flex-none rounded-full bg-gray-50" src={props.profile.avatar ? authServerEndpoint + props.profile.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            <div class="min-w-0 flex-auto">
                <div class="text-sm font-semibold leading-6">
                    <p>{props.profile.name ? props.profile.name : props.profile.phone}</p>
                </div>
            </div>
        </div>
   ) 
}

export default ContactPreview;