import React from 'react';
// import SearchWeather from './SearchWeather';
import config from '../config.js';
import axios from 'axios';
import moment from 'moment'
import '../weather-icons-master/css/weather-icons.css';
import '../styles/weather-results.css'


class WeatherResults extends React.Component {
  constructor(){
    super();
    this.state = {
      baseUrl: 'http://api.openweathermap.org/data/2.5/',
      weather: {},
      error: false,
      loading: false,
      userZip: '',
      userCity: '',
      allCities:[],
      index: 0
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleFormSubmit(event) {
    console.log('getin her')
    const that = this

    var allCities = [...this.state.allCities];

    event.preventDefault()
    //setState loading to true when form is submitted - change to false after data gets back
    this.setState({
      loading: true
    })
    if (event.target.name === 'userZip'){
      // setTimeout for 2 second to show loading icon - not neccessary but looks cool
      setTimeout(function() {
        axios.get(`${that.state.baseUrl}weather?zip=${that.state.userZip},us&APPID=${config.apiKey}&units=imperial`)
          .then(function(response) {
            axios.get(`${that.state.baseUrl}forecast?zip=${that.state.userZip},us&APPID=${config.apiKey}&units=imperial`)
            .then((forcastResponse) => {

              console.log(forcastResponse, 'forcastResponse');

              var forecast = []
              forcastResponse.data.list.map((item) => {
                const hour = moment.unix(item.dt).hour()
                if(hour >= 12 && hour <= 15){
                  console.log(hour, 'hour');
                  return forecast.push(item)
                }
              })

              response.data.forecast = forecast;
              allCities.push(response.data)
              that.setState({
                weather: response.data,
                loading: false,
                allCities: allCities,
                index: allCities.length-1
              });
              // const d = response.data
              console.log(response.data, 'here is the response');


            })
            .catch(function(error) {
              that.setState({
                error: true
              })
              console.log(error, 'here is the error in forcast zip');
            });

          })
          .catch(function(error) {
            that.setState({
              error: true
            })
            console.log(error, 'here is the error weather zip');
          });
      }, 1000);
    }

    else if(event.target.name === 'userCity') {
      setTimeout(function() {

        axios.get(`${that.state.baseUrl}weather?q=${that.state.userCity}&APPID=${config.apiKey}&units=imperial`)
          .then(function(response) {
            axios.get(`${that.state.baseUrl}forecast?q=${that.state.userCity},us&APPID=${config.apiKey}&units=imperial`)
            .then((forcastResponse) => {

              console.log(forcastResponse, 'forcastResponse');

              var forecast = []

              forcastResponse.data.list.map((item) => {
                const hour = moment.unix(item.dt).hour()
                if(hour >= 12 && hour <= 15){
                  console.log(hour, 'hour');
                  return forecast.push(item)
                }
              })

              response.data.forecast = forecast;
              allCities.push(response.data)
              that.setState({
                weather: response.data,
                loading: false,
                allCities: allCities,
                index: allCities.length-1
              });
              // const d = response.data
              console.log(response.data, 'here is the response');


            })
            .catch(function(error) {
              that.setState({
                error: true
              })
              console.log(error, 'here is the error in forcast zip');
            });

          })
          .catch(function(error) {
            that.setState({
              error: true
            })
            console.log(error, 'here is the error');
          });
      }, 1000);

    }
    // this.setState({allCities})
    console.log(allCities, 'all cities');

  }

handleInputChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  });
  console.log(event.target.name, event.target.value);

}


getWeatherData(response, err){
  console.log(response, 'getting resonse here');
}




  renderWeather(){
    //if our app is loading, show the loading icon
    console.log(this.state.allCities, 'ALL CITIES IN renderWeather');
    console.log(this.state.index, 'index');
    var loadingIcon = this.state.loading === true ? <i className="App-logo wi wi-refresh" alt="logo" style={{fontSize: '120px', alignItems: 'center'}}> </i> :  " "
    var weatherIcon = null;
    var des = Object.keys(this.state.allCities).length > 0 ? this.state.allCities[this.state.index].weather[0].description: null;

    var selectedDotStyle = {
      backgroundColor: 'black',
    }

    if(des ==='haze' ){
      weatherIcon = "wi wi-day-haze"
    } else if (des === 'light rain'){
      weatherIcon = "wi wi-rain-mix"
    } else if (des === 'few clouds'){
    weatherIcon = "wi wi-cloud"
    } else if (des === 'clear sky'){
      weatherIcon = "wi wi-day-sunny"
    } else if (des === 'overcast clouds'){
      weatherIcon = "wi wi-cloudy"
    } else if (des === 'light intensity drizzle'){
      weatherIcon = "wi wi-rain-mix"
    } else if (des === 'mist'){
      weatherIcon = "wi wi-windy"
    } else if (des === 'clear sky'){
      weatherIcon = "wi wi-day-sunny"
    } else if (des === 'fog'){
      weatherIcon = "wi wi-fog"
    } else if (des === 'broken clouds'){
      weatherIcon = "wi wi-cloudy"
    } else if (des === 'scattered clouds'){
      weatherIcon = "wi wi-cloudy"
    } else if (des === 'moderate rain'){
      weatherIcon = "wi wi-rain"
    } else if (des === 'light intensity drizzle rain'){
      weatherIcon = "wi wi-rain-mix"
    } else if (des === 'smoke'){
      weatherIcon = "wi wi-smoke"
    } else if (des === 'light snow'){
      weatherIcon = "wi wi-snow"
    }






    //only show this when loading is false and we have data stored in this.state.weather
    if(this.state.loading === false && Object.keys(this.state.weather).length > 0){
      console.log(this.state.index, 'swaggyP');
      var selectedCity = this.state.allCities[this.state.index];
      console.log(selectedCity, "selectedCity")
      console.log(this.state.allCities.length, 'length array aa');


      return (
        <div className="main">
          <div className="weather-container">
            <div className="date-time">
              <p className="white">{moment.unix(selectedCity.dt).format('h:mm a')}</p>
              <p className="add-button" onClick = {()=>this.setState({weather:{}})}><i className='add-icon'></i> </p>
              <p>{moment.unix(selectedCity.dt).format('MMM D')}</p>
            </div>

            <div className="icon-prev-next">
              <div className="icon-dot-container">
                <i className={`white ${weatherIcon}`} alt="logo"> </i>

                {this.state.allCities.length > 1 ?
                  <ul className = "dot" style={{marginTop: '20px'}}>
                    {this.state.allCities.map((city,index) => {
                      if(this.state.index === index) {
                        return <li className="dot" style={selectedDotStyle} key={index}></li>
                      } else {
                        return <li className="dot" key={index}></li>
                      }
                    })}
                  </ul>:
                  ''
                }
              </div>

              <div className="arrow-button prev">
                {this.state.allCities.length === 1 || this.state.index === 0 ? '': <div className="arrow-icon icon-left" onClick = {()=>{this.setState({index: this.state.index-1})}} disabled = {this.state.index === 0}> <div className="arrow arrow-left"></div> </div>}
              </div>

              <div className="arrow-button next">
                {this.state.allCities.length === 1 || this.state.index === this.state.allCities.length-1? '': <div className="arrow-icon icon-right" onClick = {()=>{this.setState({index: this.state.index+1})}} disabled = {this.state.index === this.state.allCities.length-1}> <div className="arrow arrow-right"> </div></div>}
              </div>
            </div>   { /* End icon-prev-next */ }


            <div className="temp-status">
              <p className="temp">{selectedCity.main.temp.toFixed(0)} <i className="wi wi-degrees" alt="logo"></i></p>
              <p className="description">{selectedCity.weather[0].main}</p>
            </div>
            <div className="city">
              <div className="thick-border"></div>
              <h1 className="white">{selectedCity.name} </h1>
            </div>

          </div> { /* End weather container */ }

          <ul className="forecast">
            {selectedCity.forecast.map((item, key) => {
              return (
                <li key={key}>
                  <p>{moment.unix(item.dt).format("dddd")}</p>
                  <p>{Math.round(item.main.temp)}&#176;</p>
                  <p><i className={`white ${weatherIcon}`} alt="logo"> </i></p>
                </li>
              )
            })}
          </ul>


          <div className ='footer'>
            <div className="top">
              <p className='wind'> <i className="wi wi-cloudy-gusts" alt="logo"></i> {selectedCity.wind.speed.toFixed(0) + ' mph'} </p>

              <p className='sunrise align-right'> <i className="wi wi-sunrise" alt="logo"></i> {moment.unix(selectedCity.sys.sunrise).format('h:mm a')} </p>
            </div>

            <div className="thick-border"></div>

            <div className="bottom">
              <p className='humidity'> <i className="wi wi-humidity" alt="logo"></i> {selectedCity.main.humidity} </p>

              <p className='sunset align-right'> <i className="wi wi-sunset" alt="logo"></i> {moment.unix(selectedCity.sys.sunset).format('h:mm a')} </p>
            </div>
          </div>
        { /* End main */ } </div>

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
    // console.log(Object.keys(this.state.weather).length, 'weather');
    return (
      <div className = 'searchzip'>
        {this.renderWeather()}
        {Object.keys(this.state.weather).length === 0 ?
         <div className='search-container'>


            <div className='forms'>
              <form name='userZip' onSubmit={this.handleFormSubmit}>
                <label>
                  <input name='userZip' type="text" value={this.state.userZip} onChange={this.handleInputChange} placeholder='Enter Zip Code'/>
                  <br/>
                </label>
              </form>

              <form name="userCity" onSubmit={this.handleFormSubmit}>
                <label>
                  <input name='userCity' type="text" value={this.state.userCity} onChange={this.handleInputChange} placeholder='Enter City Name'/>
                </label>
              </form>
            </div>


          </div>
          : null

      }

      </div>

    )
  }


}


// <p className = 'date'>{moment.unix(this.state.weather.dt).format('MMMM Do YYYY, h:mm a')}</p>

export default WeatherResults;
