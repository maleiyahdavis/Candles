import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import RenderAllCandles from './RenderAllCandles'
import Register from './Register';
import Login from './Login';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [allCandles, setAllCandles] = useState([]);
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

  return (
    <div className="app-container">
      <Route exact path="/" >
      <h1>Hello!</h1>
      <p>API Status: {APIHealth}</p>
      </Route>
      
      <Route path="/candles"><RenderAllCandles allCandles={allCandles}/></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/login"><Login setToken={setToken} setUserData={setUserData} /></Route>
    </div>
  );
};

export default App;
