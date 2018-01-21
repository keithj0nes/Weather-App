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
      userZip: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
// enter zip
handleSubmit(event) {
    event.preventDefault()
    const that = this
    axios.get('http://api.openweathermap.org/data/2.5/weather?zip=' + this.state.userZip +',us&APPID=' + config.apiKey +'&units=imperial')
      .then(function(response) {
        that.setState({weather: response.data, loading: false});
        // const d = response.data
        console.log(response.data, 'here is the response');
      })
      .catch(function(error) {
        that.setState({error: true})
        console.log(error, 'here is the error');
      });


    console.log(this.state.userZip)

  }

  handleChange(event) {
  this.setState({userZip: event.target.value});
}




  componentDidMount(){

  }

  renderWeather(){
    if(this.state.loading === false){
      return (
        <div>
          <h2> {this.state.weather.name} </h2>
          <h3>{this.state.weather.main.temp}</h3>
          <h4>{moment.unix(this.state.weather.dt).format('MMMM Do YYYY, h:mm:ss a')}</h4>
          <h5>{this.state.weather.wind.speed + ' mph'}</h5>
          <h6>{'Sunrise: ' + moment.unix(this.state.weather.sys.sunrise).format('h:mm a')}</h6>
          <h6>{'Sunset: ' + moment.unix(this.state.weather.sys.sunset).format('h:mm a')}</h6>



        </div>
      )
    }
  }

  componentDidUpdate(){
    console.log(this.state.userZip);
  }

  render() {
    var loadingIcon = this.state.loading === true ? <img src={logo} className="App-logo" alt="logo" /> :  " "

    return (
      <div>
        <h1> Weather </h1>
        {this.renderWeather()}
        <form onSubmit={this.handleSubmit}>
        <label>
          Zip:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>


        {loadingIcon}
      </div>
    )
  }
}



export default WeatherResults;
