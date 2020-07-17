import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav className="flex flex-wrap justify-end pa3">
                <p onClick={() => onRouteChange('signout')} className="ma3 f3 link dim pointer">Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="flex flex-wrap justify-end pa3">
                <p onClick={() => onRouteChange('signin')} className="ma3 f3 link dim pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="ma3 f3 link dim pointer">Register</p>
            </nav>
        );
    }
    
}

export default Navigation;