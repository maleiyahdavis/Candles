import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, useHistory, Route, Link } from "react-router-dom"
import {registerUser} from '../api/index'
import {storeToken, storeUser} from '../auth/index'

const Register = ({ action, setToken, setUserData, setIsLoggedIn }) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const isLogin = action === "login";
    //const title = isLogin ? "Login" : "Register";
    // const oppositeTitle = isLogin ? "Register" : "Login";
    // const oppositeAction = isLogin ? "register" : "login";
    // const actionURL = isLogin ? API_LOGIN : API_REGISTER;
    const history = useHistory();


    return (
        <div className= "auth-comp-main" >
          <h2>Register</h2>
          <form
            id="register"
            onSubmit={async (event)=>{
              event.preventDefault();
              try {
                const { data } = await registerUser(username, password)
                storeToken(data.token)
                storeUser(username);
                setIsLoggedIn(true);
                setUsername("");
                setPassword("");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <fieldset className= "auth-comp-input">
              <label htmlFor='username'>Username</label>
              <input id="username" type="text" placeholder="enter username" value={username} onChange={(event)=>{
                  console.log(event.target.value);
                  setUsername(event.target.value);
              }}></input>
            </fieldset>
            <fieldset className= "auth-comp-input">
              <label htmlFor='password'>Password</label>
              <input id="password" type="text" placeholder='enter password' value={password} onChange={(event)=>{
                  console.log(event.target.value);
                  setPassword(event.target.value);
              }}></input>
            </fieldset>
            <button>Register</button>
          </form>
        </div>
      )
    }

export default Register;