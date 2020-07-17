import React, { Component } from 'react'; 
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputBar from './components/InputBar/InputBar';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

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
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
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

  onRouteChange = (destination) => {
    if (destination === 'signout') {
      this.setState({isSignedIn: false});
    } else if (destination === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: destination});
  }

  render() {
    const { route, isSignedIn, imageURL, box } = this.state;
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ?
          <div>
            <Logo />
            <Rank />
            <InputBar onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <FaceRecognition box={box} imageSource={imageURL} />
          </div>
          :  (
            route === 'signin' || route === 'signout'
            ? <Signin onRouteChange={this.onRouteChange} /> 
            : <Register onRouteChange={this.onRouteChange} />
          )
          
        }
      </div>
    )
  }
}

export default App;
