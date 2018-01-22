import React, { Component } from 'react';
import './styles/App.css';
import WeatherResults from './components/WeatherResults';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        
        </header>

        <WeatherResults/>

      </div>
    );
  }
}

export default App;
