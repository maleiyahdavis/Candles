import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import './Logout.css'

const Logout = ({setIsLoggedIn, setSingleCandle}) => {
    const history = useHistory();
    

    useEffect(() => {
        localStorage.clear(); //for removing the user entirely
        console.log(localStorage)
        setIsLoggedIn(false)
        setSingleCandle({})
        
    }, [])

    return (
        <div className='logout'>
            <h1>Successfully logged out</h1>
        </div>
    );
};

export default Logout;