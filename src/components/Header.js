import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import '../style/Header.css'

const Header = ({isLoggedIn}) => {
    return (
        <div className='header'>
           
               
                <div className='header__nav'>
                    <Link className='nav_link' to="/">Home</Link> 
                    <Link className='nav_link' to="/candles">Shop</Link>
                    
                    {isLoggedIn ? 
                    <Link className='nav_link' to="/cart">Cart</Link> :
                    ''}
                    
                    {isLoggedIn ?  
                    <Link className='nav_link' to="/logout">Logout</Link> :
                    <Link className='nav_link' to="/login">Login</Link>  }
                    
                </div> 
                <Link className='nav_link' to="/"> <h1>MAJK</h1></Link> 
        </div>
    );
};

export default Header;