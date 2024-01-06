# texter: front-end
### Front-end codebase for 'texter', a web socket based chat application.
This repository is a `react` project to develop UI for the texter application. This application interacts with the back-end ([texter_backend](https://github.com/sourav-py/texter_backend)) to provide seamless messaging experience. 

#### Features:
- SMS otp based authentication 
- Direct Messaging
- User activity status (online/last seen at <timestamp>)
- Typing indicator (The user that you are currently chatting with is typing a message).

#### Screenshots

![home page](/screenshots/texter-home-screen.png) 
![chat](/screenshots/texter-chat.png) 

#### Folder structure:
* src/
  * components/
    * chatroom/
      - ChatRoom.js
      - Message.js
    * login
      - EnterOTP.js
      - InputPhone.js
    * Sidebar
      - AddContact.js
      - ChatRoomListItem.js
      - Contact.js
      - ContactPreview.js
      - Sidebar.js
      - UpdateProfile.js
    - Main.js
      
#### Setup
1. Clone the repository.
2. Install dependencies using npm install.
3. Start the development server with npm start.
   
#### Development guidelines

#### Issues

#### Future developments
- Storing/Sending messages in encrypted format
- Adding minor animations



  


