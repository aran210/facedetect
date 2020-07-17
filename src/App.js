import React, { Component } from 'react'; 
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputBar from './components/InputBar/InputBar';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';

const app = new Clarifai.App({
  apiKey: 'd8f8eb2f27a543fc82a2dc5b7c217203'
 });

const particleOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
    const multFaces = data['outputs'][0]['data']['regions']
    multFaces.forEach(face => { 
      face = face['region_info']['bounding_box'];
      console.log(face);
    });  
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => this.setState({input: event.target.value});

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))      
    .catch(err => console.log("error: ", err));
  }

  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <InputBar onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
        <FaceRecognition box={this.state.box} imageSource={this.state.imageURL} />
      </div>
    )
  }
}

export default App;
