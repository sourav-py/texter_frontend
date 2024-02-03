# texter: front-end

### Index
- [Introduction](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#front-end-codebase-for-texter-a-web-socket-based-chat-application)
- [Features](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#features)
- [Screenshots](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#screenshots)
- [Folder Structure](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#folder-structure)
- [Setup](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#setup)
- [Development Guidelines](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#development-guidelines)
- [Issues](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#issues)
- [Future Developments](https://github.com/sourav-py/texter_frontend/tree/main?tab=readme-ov-file#future-developments)
  
#### Front-end codebase for 'texter', a web socket based chat application.
This repository is a `react` project to develop UI for the texter application. This application interacts with the back-end ([texter_backend](https://github.com/sourav-py/texter_backend)) to provide seamless messaging experience. 

#### Features:
- SMS otp based authentication 
- Direct Messaging
- User activity status (online/last seen at <timestamp>)
- Typing indicator (The user that you are currently chatting with is typing a message).

#### Screenshots


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
- [text styling](https://github.com/sourav-py/texter_frontend/issues/17)
#### Future developments
- [Message encryption](https://github.com/sourav-py/texter_frontend/issues/19)
- [Animations](https://github.com/sourav-py/texter_frontend/issues/18)



  


