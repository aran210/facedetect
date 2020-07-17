import React from 'react';
import './InputBar.css'

const InputBar = ({onInputChange, onButtonSubmit}) => {

    return (
        <div>
            <p className="f3">
                {'Machine Learning based face detection. Give it a try.'}
            </p>
            <div className="center">
                <div className="bg form center pa4 br3 shadow-5">
                    <input onChange={onInputChange} className="f4 pa2 w-70 center" placeholder="Enter URL" type="text" />
                    <button onClick={onButtonSubmit} className="w-30 f4 z2 grow link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    );
}

export default InputBar;