import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DummyLogin from './DummyLogin';


function Main () {

    console.log("----MAIN-----")
    const authServerEndpoint = 'http://127.0.0.1:8000/';
    const debugPrefix = "MAIN:::::";
    const navigate = useNavigate();

    const userProfile = useRef(null);


    //Check if a sesion exists or not
    useEffect(() => {
        const fetchUser = async () => {
            fetch(authServerEndpoint + 'auth/user/',{
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                } 
            })
            .then(
                response => {
                    if(response.status == 200){
                        console.log(debugPrefix + "Got 200 response code!!");
                        response.json()
                        .then(
                            userProfileData => {
                                console.log(debugPrefix + "User Profile: " + userProfile);
                                userProfile.current = userProfileData;
                            }
                        )
                    }
                    else{
                        console.log(debugPrefix + "response code is not 200!!");
                        navigate('/login');
                    }
                }
            )
            .catch(
                error => {
                    console.log(debugPrefix + error);
                    navigate('/login');
                }
            );
        }   

        fetchUser();

    },[])
   
    return (

            <div>
                <div>
                </div>
             </div>
        )
}

export default Main;