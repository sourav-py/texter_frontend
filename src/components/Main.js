import { useEffect, useState } from 'react';
import Login from './Login';
import ServerDown from './ServerDown';

function Main () {


    const authServerEndpoint = 'http://127.0.0.1:8000/';

    const [user,setUser] = useState(null);

    let requestFailed = false;

    //Check if a sesion exists or not
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response =  await fetch(authServerEndpoint + 'auth/user/',{
                    mode: "cors", // no-cors, *cors, same-origin
                    credentials: 'include', 
                });
                if(response.status == 200 || response.status == 201){
                    let responseData = await response.json();
                    setUser(responseData);
                }
                    
            }
            catch(error){
                console.log(error);
                requestFailed = true;
            }
        }

        fetchUser();

        
    },[])
    
    console.log("username: " + user.username);
    
    if(requestFailed){
        return <ServerDown/>
    }

    if(user == null)
    {
        return <Login/>
    }

    return (
        <div>
            Main
        </div>
    )
}

export default Main;