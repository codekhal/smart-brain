  import React, { Component } from 'react';
  import Particles from 'react-particles-js';
  import Clarifai from 'clarifai';
  import Navigation from './components/Navigation/Navigation';
  import Logo from './components/Logo/Logo';
  import Rank from './components/Rank/Rank';
  import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
  import FaceRecognition from './components/FaceRecognition/FaceRecognition';
  import './App.css';

  const app = new Clarifai.App({
    apiKey: 'c850023b47bf46519a8920cf52fe886d'       //We have to add our own API Key we get after signing into Clarifai
   });

  const particleOptions = {
    "particles": {
      "number": {
          "value": 180,
          "density": {  
              "enable": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 4,
              "size_min": 0.5
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
      }
    },
    "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "bubble"
          },
          "onclick": {
              "enable": true,
              "mode": "repulse"
          }
      },
      "modes": {
          "bubble": {
              "distance": 50,
              "duration": 2,
              "size": 0,
              "opacity": 0
          },
          "repulse": {
              "distance": 200,
              "duration": 4
          }
      }
    }
  }
  class App extends Component {
    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
      }
    }

    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }

    displayFaceBox = (box) => {
      this.setState({box: box});
    }

  onInputChange = (event) => {
    this.setState({input: event.input.value});
  }

  onButtonSubmit = () => {
    this.setState( {imageUrl: this.state.input} )
    
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));  
  }
  render() {
  return (
      <div className="App">
          <Particles className = 'particles'
            params={ particleOptions } 
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange = {this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}
        />
        <FaceRecognition box = {this.state.box} imageUrl = { this.state.imageUrl } />
      </div>
  );
  }
  }

  export default App;
