  import React, { Component } from 'react';
  import Particles from 'react-particles-js';
  import Clarifai from 'clarifai';
  import Navigation from './components/Navigation/Navigation';
  import Signin from './components/Signin/Signin';
  import Register from './components/Register/Register';
  import Logo from './components/Logo/Logo';
  import Rank from './components/Rank/Rank';
  import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
  import FaceRecognition from './components/FaceRecognition/FaceRecognition';
  import './App.css';

  const app = new Clarifai.App({
    apiKey: 'c850023b47bf46519a8920cf52fe886d'       //One have to add their own API Key which they could get after signing into Clarifai
   });

  const particleOptions = {
    "particles": {
      "number": {
          "value": 270,
          "density": {  
              "enable": false
          }
      },
      "size": {
          "value": 4,
          "random": true,
          "anim": {
              "speed": 5,
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
              "distance": 400,
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
        route: 'signin',
        isSignedIn: false
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
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));  
  }

  onRouteChange = (route) => {
    if(route === 'signout')
    {
      this.setState({isSignedIn: 'false'})
    }
    else if(route === 'home')
    {
      this.setState({isSignedIn: 'true'})
    }
    this.setState({route: route});
  }
  render() {
  return (
      <div className="App">
          <Particles className = 'particles'
            params={ particleOptions } 
          />
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
        { this.state.route === 'home'
          ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceRecognition box = {this.state.box} imageUrl = { this.state.imageUrl } />
           </div>
          
          : (
              this.state.route === 'signin' 
              ?<Signin onRouteChange = {this.onRouteChange} />
              :<Register onRouteChange = {this.onRouteChange} />
            )
        }
      </div>
  );
  }
  }

  export default App;

//**  {
//   You may try one of these Face Samples:
//      https://images.summitmedia-digital.com/cosmo/images/2017/11/10/5-best-things-about-having-a-round-face-main2-1510299634.jpg
//      http://dreamicus.com/data/face/face-04.jpg
// }**/