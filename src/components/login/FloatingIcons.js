
import { faComment, faUser, faBook, faCommenting, faComments, faQuoteLeft, faQuoteRight, faNewspaper, faPaperPlane, faPaperclip,faUsers, faAddressCard, faBookmark } from "@fortawesome/free-solid-svg-icons";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function FloatingIcons() {

    
    const faIconsList = []


    return (
        <>
            <FontAwesomeIcon className="text-white text-7xl" icon={faComment}/>
            <FontAwesomeIcon className="text-white text-4xl" icon={faUser}/>
            <FontAwesomeIcon className="text-white text-9xl" icon={faBook}/>
            <FontAwesomeIcon className="text-white text-4xl" icon={faCommenting}/>
            <FontAwesomeIcon className="text-white text-8xl" icon={faComments}/>
            <FontAwesomeIcon className="text-white text-7xl" icon={faQuoteLeft}/>
            <FontAwesomeIcon className="text-white text-4xl" icon={faNewspaper}/>
            <FontAwesomeIcon className="text-white text-6xl" icon={faQuoteRight}/>
            <FontAwesomeIcon className="text-white text-3xl" icon={faPaperPlane}/>
            <FontAwesomeIcon className="text-white text-8xl" icon={faPaperclip}/>
            <FontAwesomeIcon className="text-white text-6xl" icon={faUsers}/>
            <FontAwesomeIcon className="text-white text-7xl" icon={faAddressCard}/>
            <FontAwesomeIcon className="text-white text-3xl" icon={faBookmark}/>
            <FontAwesomeIcon className="text-white text-8xl" icon={faUser}/>
            <FontAwesomeIcon className="text-white text-6xl" icon={faComment}/>
            <FontAwesomeIcon className="text-white text-6xl" icon={faQuoteLeft}/>
        </>
    )
}

export default FloatingIcons;