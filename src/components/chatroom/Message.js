

function Message (props) {

    return (
        <div className={props.senderId == props.userId ? " border-2 border-dotted m-2 p-2 float-right clear-left" : " border-2 border-dotted m-2 p-2 float-left clear-right"}>
          <p>{props.message} </p>
        </div>
    )
}

export default Message;