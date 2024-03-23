import { useEffect } from "react";

function Test() {

    const backendServerEndpoint = 'https://texter-backend-jp24ejwc8-sourav-pys-projects.vercel.app';
    //const backendServerEndpoint = 'http://127.0.0.1:8000';
    useEffect(() => {
        fetch(backendServerEndpoint + '/auth/test/',{
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            credentials: 'include',
        })
        .then(
           response => {
            if(response.status === 200){
                response.json()
                .then(
                    responseData => {
                        console.log(responseData);
                    }
                )
            }
           } 
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    },[])

    return (
        <div>
            Hey there ...
        </div>
    )
}

export default Test;