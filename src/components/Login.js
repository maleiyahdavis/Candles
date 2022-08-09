import React, {useState} from 'react';
import { CheckForToken } from '../api';
import { useHistory, Link } from 'react-router-dom';
const jwt = require('jsonwebtoken'); 
const {JWT_SECRET = 'secret'} = process.env;

const Login = ({setToken, setUserData, setIsLoggedIn}) => {
        const history = useHistory();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const handleSubmit = async (event) => {
            event.preventDefault();
            const response = await fetch(`http://localhost:4000/api/user/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: {
                  username: username,
                  password: password,
                },
              }),
            });
            console.log("response", response)
            if (response) {
            
              const data = await response.json();
              console.log("response", data)
              const token = data.token;
              localStorage.setItem("token", token);
              setToken(token);
              setUserData({...data, username})
              history.push("/");
            }
            setIsLoggedIn(true);
            setUsername("");
            setPassword("");
            //history.push("/profile");
          };
          return (
            <div id="login">
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onChange={(event) => setUsername(event.target.value)}
                ></input>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button type="submit">Login</button>
                <br></br>
                <Link to="/register">Don't have a login? Register here.</Link>
              </form>
            </div>
          );
        };
        export default Login;
//     return (
       
//         <form  id='loginForm'
//             onSubmit={async (e) => {
//             e.preventDefault(); 
//             console.log("this is a test")
//             try {
//                 console.log("second test")
                
//                 // const response = await CheckForToken(username, password)
//                 // //NOT GETTING A RESPONSE
//                 // console.log("login response:", response);
//                 // //console.log("Sucessfully logged in!")
//                 // //const data = await response.json();
//                 // //console.log("response", data)
//                 // const token = response.token
//                 // console.log("token",token)

//                 // const { id, username } = jwt.verify(token, JWT_SECRET, {ignoreExpiration: true})
//                 // console.log(id, username)
            
//                // localStorage.setItem("token", token);
//                 setToken(token);
//                 setUserData({id, username});
                
//                 history.push("/candles");
//                 setUsername("");
//                 setPassword("");
               
//             } catch (error) {
//                 console.error()
//             }
            
//           }}>
               
//               <h2>Login:</h2>
//             <div>
//                 <label>Username: </label>
//                 <input id="username" type="text" placeholder="enter username" value={username} onChange={(event)=>{
//                   console.log(event.target.value);
//                   setUsername(event.target.value);
//               }}></input>
//             </div>
//             <div>
//                 <label>Password: </label>
//                 <input type='text' placeholder='password' value={password}  onChange={(e) => {console.log(e.target.value); setPassword(e.target.value)}}></input>
//             </div>
//             <div id='loginButtons'>
           
//                 <button type="submit">Login</button>
//                 <br />
//                 <Link to="/register">Don't have an account? Register now</Link>
//             </div>
            
//         </form>
//     )
// };

// export default Login;