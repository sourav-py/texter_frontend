import { useState } from "react";

function Login () {

    const authServerEndpoint = 'http://127.0.0.1:8000/';    
    const [email,setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleInput = (event) => {
        if(event.target.name == 'email'){
            setEmail(event.target.value);
        }
        else if(event.target.name == 'password'){
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        
        console.log("Handle submit function");
        const requestData = {
            "email" : email,
            "password": password
        } 
        
        const response = fetch(authServerEndpoint + 'auth/login/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            credentials: 'include',
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(requestData), // body data type must match "Content-Type" header
        });

        console.log("Response for login request!!");
        console.log(response);
    
        event.preventDefault();
    }

    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email </label>
                        <input type="text" name="email" required onChange={handleInput} />
                    </div>
                    <div>
                        <label>Password </label>
                        <input type="password" name="password" required onChange={handleInput} />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;