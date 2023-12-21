
function AddContact (props) {
   
    return (
        <div>
            <div className = {props.addContactModalDisplay === "block" ? "add-contact-modal" : "add-contact-modal-hidden"}>
                <span class="close-add-contact-modal" onClick={props.hideAddContactModal}>&times;</span>
                <form>
                    <label>Enter phone number</label>
                    <input type="tel" id="phone-input" placeholder='Enter phone number'></input>
                    <input type="submit"/>
                </form>
            </div>
            <div className={props.addContactModalDisplay === "block" ? "overlay" : "overlay-hidden"} onClick={props.hideAddContactModal}></div>
        </div>
    )
}

export default AddContact;