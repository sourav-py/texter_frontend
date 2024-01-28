

function Message (props) {

    return (
        <div className={props.senderId == props.userId ? "message right" : "message left"}>
          <p>{props.message} </p>
        </div>
    )
}

export default Message;