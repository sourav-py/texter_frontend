import { useState } from "react";

function Login () {
    
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