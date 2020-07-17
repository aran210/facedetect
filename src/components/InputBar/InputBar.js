import React from 'react';
import './InputBar.css'

const inputBar = () => {
    return (
        <div>
            <p className="f3">
                {'Upload an image and we will detect the face.'}
            </p>
            <div className="center">
                <div className="bg form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" />
                    <button className="w-30 f4 z2 grow link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    );
}

export default inputBar;