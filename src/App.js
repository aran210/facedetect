import React from 'react'; 
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputBar from './components/InputBar/InputBar';
import './App.css';
import Particles from 'react-particles-js';

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

function App() {
  return (
    <div className="App">
      <Particles params={particleOptions} className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <InputBar />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
