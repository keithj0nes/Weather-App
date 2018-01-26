import React from 'react';
import axios from 'axios';
import '../weather-icons-master/css/weather-icons.css';
import config from '../config.js';
import moment from 'moment'
import '../styles/weather-results.css'


class WeatherResults extends React.Component {
  constructor(){
    super();
    this.state = {
      weather: {},
      error: false,
      loading: false,
      userZip: '',
      userCity: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleFormSubmit(event) {
    console.log('getin her')
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
    }, 1000);


  setTimeout(function () {
    axios.get('api.openweathermap.org/data/2.5/weather?q='+that.state.userName)
      .then(function(response) {
        that.setState({weather: response.data, loading: false});
        // const d = response.data
        console.log(response.data, 'here is the response');
      })
      .catch(function(error) {
        that.setState({error: true})
        console.log(error, 'here is the error');
      });
  }, 1000);
}

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.name, event.target.value);

  }




  renderWeather(){
    //if our app is loading, show the loading icon
    var loadingIcon = this.state.loading === true ? <i className="App-logo wi wi-refresh" alt="logo" style={{fontSize: '120px', alignItems: 'center'}}> </i> :  " "

    //only show this when loading is false and we have data stored in this.state.weather
    if(this.state.loading === false && Object.keys(this.state.weather).length > 0){
      return (
        <div className='main-content'>

          <h1>Today in {this.state.weather.name} </h1>
          <p className = 'temp'>{this.state.weather.main.temp.toFixed(0)} <i className="wi wi-fahrenheit" alt="logo"></i></p>
          <p className ='icon'><i className=" wi wi-yahoo-32" alt="logo" style={{fontSize: '80px', display:'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '10px'  }}> </i> </p>
          <p className = 'description'>{this.state.weather.weather[0].description}</p>
          <div className ='footer'>
            <p className = 'sunrise'>{moment.unix(this.state.weather.sys.sunrise).format('h:mm a')}<br/> <i className="wi wi-sunrise" alt="logo"></i></p>
            <p className = 'wind'>{this.state.weather.wind.speed.toFixed(0) + ' mph'}<br/> <i className="wi wi-cloudy-gusts" alt="logo"></i></p>
            <p className = 'sunset'>{ moment.unix(this.state.weather.sys.sunset).format('h:mm a')}<br/> <i className="wi wi-sunset" alt="logo"></i></p>
          </div>
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
      return <h1 className = 'homeText'>Weather App <i className="wi wi-lightning" alt="logo"></i> </h1>


    }

    //we will also need to run an if this.state.error === true and display some code saying there was an error and to try again or something
  }


  render() {
    console.log(Object.keys(this.state.weather).length, 'weather');
    return (
      <div className = 'searchzip'>
      {this.renderWeather()}
        {Object.keys(this.state.weather).length === 0?
          <div className = 'forms'>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            <input name = 'userZip' type="text" value={this.state.userZip} onChange={this.handleInputChange} placeholder = 'Enter Zip Code'/>
            <br/>
          </label>

        </form>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            <input name = 'userCity' className = "city" type="text" value={this.state.userCity} onChange={this.handleInputChange} placeholder = 'Enter City Name'/>
          </label>

        </form>
        </div>
        :<button onClick = {()=>this.setState({weather:{}})}> Search New Zip </button>

      }

      </div>

    )
  }
}


// <p className = 'date'>{moment.unix(this.state.weather.dt).format('MMMM Do YYYY, h:mm a')}</p>

export default WeatherResults;
