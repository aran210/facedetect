import React from 'react';
import Tilt from 'react-tilt';
import brain from "./brain.png"
import './Logo.css';

const Logo = () => {
    return (
        <div className="ba">
            <Tilt className="Tilt br2 shadow-2 ma4 " options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner h-100 pa3">
                    <img src={brain} alt='brain logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;