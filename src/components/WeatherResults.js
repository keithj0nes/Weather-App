import React from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import config from '../config.js';
import moment from 'moment'






class WeatherResults extends React.Component {

  constructor(){
    super();
    this.state = {
      weather: {},
      error: false,
      loading: true,

    }
  }

  componentDidMount(){
    const that = this;
    setTimeout(function () {
      axios.get('http://api.openweathermap.org/data/2.5/weather?zip=98166,us&APPID='+config.apiKey +'&units=imperial')
        .then(function(response) {
          that.setState({weather: response.data, loading: false});
          // const d = response.data
          console.log(response.data, 'here is the response');
        })
        .catch(function(error) {
          that.setState({error: true})
          console.log(error, 'here is the error');
        });
    }, 2000);
  }

  renderWeather(){
    if(this.state.loading === false){
      return (
        <div>
          <h2> {this.state.weather.name} </h2>
          <h3>{this.state.weather.main.temp}</h3>
          <h4>{moment(this.state.weather.dt).format('MMMM Do YYYY, h:mm:ss a')}</h4>



        </div>
      )
    }
  }

  componentDidUpdate(){
    console.log(this.state.weather.dt, "component did update");
  }

  render() {
    var loadingIcon = this.state.loading === true ? <img src={logo} className="App-logo" alt="logo" /> :  " "

    return (
      <div>
        <h1> Weather </h1>
        {this.renderWeather()}

        {loadingIcon}
      </div>
    )
  }
}



export default WeatherResults;
