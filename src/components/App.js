import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import RenderAllCandles from './RenderAllCandles'
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Logout from './Logout'
import RenderSingleCandle from './RenderSingleCandle'
import Cart from './Cart';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [singleCandle, setSingleCandle] = useState({})
  
  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn}/>
      <Route exact path="/" >
      <h1>Do you believe in MAJK?</h1>
      
      </Route>
      
      
       <Route exact path="/candles"> 
        <RenderAllCandles setSingleCandle={setSingleCandle}/></Route>
       
       <Route path={`/candles/:${singleCandle.id}`}>
       <RenderSingleCandle singleCandle={singleCandle} setSingleCandle={setSingleCandle} isLoggedIn={isLoggedIn}/></Route>

       

      
     
      <Route path="/register"><Register setIsLoggedIn={setIsLoggedIn}/></Route>
      <Route path="/login"><Login setToken={setToken} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} /></Route>
      <Route path="/logout"><Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setSingleCandle={setSingleCandle}/></Route>
      <Route path="/cart"><Cart singleCandle={singleCandle}/></Route>
    </div>
  );
};

export default App;
