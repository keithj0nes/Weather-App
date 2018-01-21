import React from 'react';
import axios from 'axios';
import '../weather-icons-master/css/weather-icons.css';
import config from '../config.js';
import moment from 'moment'

class WeatherResults extends React.Component {
  constructor(){
    super();
    this.state = {
      weather: {},
      error: false,
      loading: false,
      userZip: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(event) {
    const that = this

    event.preventDefault()
    //setState loading to true when form is submitted - change to false after data gets back
    this.setState({loading: true})

    //setTimeout for 2 second to show loading icon - not neccessary but looks cool
    setTimeout(function () {
      axios.get('http://api.openweathermap.org/data/2.5/weather?zip=' + that.state.userZip +',us&APPID=' + config.apiKey +'&units=imperial')
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


  handleChange(event) {
    this.setState({userZip: event.target.value});
  }


  renderWeather(){
    //if our app is loading, show the loading icon
    var loadingIcon = this.state.loading === true ? <i className="App-logo wi wi-yahoo-32" alt="logo" style={{fontSize: '120px'}}> </i> :  " "

    //only show this when loading is false and we have data stored in this.state.weather
    if(this.state.loading === false && Object.keys(this.state.weather).length > 0){
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
      //when loading is true, show the loadingIcon until data comes back
    } else if(this.state.loading === true) {
      return (
        <div>
          {loadingIcon}
        </div>
      )
      //initial page load has no state - tell the user to search for their zip
    } else if(Object.keys(this.state.weather).length === 0){
      return <h1>Search your zip code</h1>
    }

    //we will also need to run an if this.state.error === true and display some code saying there was an error and to try again or something
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Zip:
            <input type="text" value={this.state.userZip} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {this.renderWeather()}

      </div>
    )
  }
}



export default WeatherResults;
