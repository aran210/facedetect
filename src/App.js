import React, { Component } from 'react'; 
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputBar from './components/InputBar/InputBar';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

import './App.css';


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

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},            // change to array of objects
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (user) => {
    this.setState({ user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
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
    fetch('http://localhost:3000/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
    })
    .then(response => response.json())
    .then(response => { 
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }));
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })      
    .catch(err => console.log("error: ", err));
  }

  onRouteChange = (destination) => {
    if (destination === 'signout') {
      this.setState(initialState);
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <InputBar onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <FaceRecognition box={box} imageSource={imageURL} />
          </div>
          :  (
            route === 'signin' || route === 'signout'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
          
        }
      </div>
    )
  }
}

export default App;
