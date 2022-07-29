import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import { CheckForToken } from '../api';
import { useHistory } from 'react-router-dom';
const jwt = require('jsonwebtoken'); 
const {JWT_SECRET = 'secret'} = process.env;

const Login = ({setToken, setUserData}) => {
        const history = useHistory();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
 
    return (
        <form  id='loginForm'onSubmit={async (e) => {
            e.preventDefault(); 
            try {
                const response = await CheckForToken(username, password)
                //NOT GETTING A RESPONSE
                console.log(response);
                if (response) {
                    console.log("Sucessfully logged in!")
                    //const data = await response.json();
                    //console.log("response", data)
                    const token = response.token
                    console.log("token",token)

                    const { id, username } = jwt.verify(token, JWT_SECRET, {ignoreExpiration: true})
                    console.log(id, username)
                
                    localStorage.setItem("token", token);
                    setToken(token);
                    setUserData({id, username});
                    
                    history.push("/");
                    
                    };
            setUsername("");
            setPassword("");
               
            } catch (error) {
                console.error()
            }
            
          }}>
              <h2>Login:</h2>
            <div>
                <label>Username: </label>
                <input type='text' placeholder='username' onChange={(e) => {console.log(e.target.value);setUsername(e.target.value)}}></input>
            </div>
            <div>
                <label>Password: </label>
                <input type='text' placeholder='password' onChange={(e) => {console.log(e.target.value); setPassword(e.target.value)}}></input>
            </div>
            <div id='loginButtons'>
           
                <button type="submit">Login</button>

            </div>
        </form>
    )
};

export default Login;