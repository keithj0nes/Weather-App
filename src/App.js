import React, { Component } from 'react';
import './styles/App.css';
import WeatherResults from './components/WeatherResults';
import SearchWeather from './components/SearchWeather';

class App extends Component {
  render() {
    return (
      <div className="App">

      <SearchWeather />

        <WeatherResults />
      </div>
    );
  }
}

export default App;
