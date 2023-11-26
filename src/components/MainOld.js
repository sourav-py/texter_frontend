import { useEffect, useState } from 'react';


function MainOld () {

    console.log("----MAIN-----")
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
                    console.log("Main::::: user data: " + user);
                }
                    
            }
            catch(error){
                console.log(error);
                requestFailed = true;
            }
        }

        fetchUser();

    },[])
   
    if(requestFailed)
    {
        //Redirect to "System is down for maintainance page"
        window.location.replace(window.location.protocol + "//" + window.location.host + "/down-for-maintainance");
    }
    else if(user == null)
    {
        //Redirect to login page
        window.location.replace(window.location.protocol + "//" + window.location.host + "/login");
    }
    else
    { 
        return (
            <div>
            Main 
            </div>
        )
    }
}

export default MainOld;