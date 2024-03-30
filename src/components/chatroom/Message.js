

function Message (props) {

    return (
        <div className={props.senderId == props.userId ? " rounded-xl bg-slate-200 m-2 p-2 float-right clear-left" : "rounded-xl bg-slate-300 text-black m-2 p-2 float-left clear-right"}>
          <p>{props.message} </p>
        </div>
    )
}

export default Message;