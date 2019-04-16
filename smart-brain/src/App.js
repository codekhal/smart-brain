import React, { Component } from 'react';
import navigation from './components/Navigation/navigation';
import logo from './components/Logo/logo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <navigation />
        <logo />
      </div>
    );
  }
}

export default App;
