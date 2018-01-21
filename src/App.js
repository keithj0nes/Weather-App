import React, { Component } from 'react';
import './App.css';
import WeatherResults from './components/WeatherResults';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Weather </h1>
        </header>

        <WeatherResults/>

      </div>
    );
  }
}

export default App;
