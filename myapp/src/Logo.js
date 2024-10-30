import React from 'react';
import './App.css';
import logo from './wings.jpg'; 

const Logo = () => {
    return (
        <div id="logoContainer">
            <img src={logo} alt="Wings Cafe Logo" />
        </div>
    );
};

export default Logo;
