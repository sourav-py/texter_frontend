
function Message (props) {

    return (
        <div class="message">
          <p>senderId: {props.senderId} Message: {props.message} </p>
        </div>
    )
}

export default Message;