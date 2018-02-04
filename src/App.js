import React, { Component } from 'react';
import WeatherResults from './components/WeatherResults';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherResults />
      </div>
    )
  }
}

export default App;
