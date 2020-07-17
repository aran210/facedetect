import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageSource, box }) => {
    return (
        <div className="center ma mt2">
            <div className="absolute mt2" >
                <img id='inputimage' width='500px' height='auto' src={imageSource} alt="" />
                <div style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}} className="bounding_box"></div>
            </div>
        </div>
    )
}

export default FaceRecognition;