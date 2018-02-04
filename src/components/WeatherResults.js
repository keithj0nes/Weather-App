import React from 'react';
// import SearchWeather from './SearchWeather';
import config from '../config.js';
import axios from 'axios';
import moment from 'moment';
import loading from '../img/loading.png';
import '../weather-icons-master/css/weather-icons.css';
import '../styles/weather-results.css'

import { iconPicker } from '../helpers';


class WeatherResults extends React.Component {
  constructor(){
    super();
    this.state = {
      baseUrl: 'http://api.openweathermap.org/data/2.5/',
      search: true,
      error: false,
      loading: false,
      userZip: '',
      userCity: '',
      allCities:[],
      index: 0,
      selectedCity: {}
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderWeather = this.renderWeather.bind(this);
  }


  handleFormSubmit(event) {
    console.log('getin her')
    const that = this

    console.log(this.userZipForm);
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

              // console.log(forcastResponse, 'forcastResponse');

              let forecast = []
              forcastResponse.data.list.forEach((item) => {
                const hour = moment.unix(item.dt).hour();
                if(hour >= 12 && hour <= 15){
                  // console.log(hour, 'hour');
                  return forecast.push(item);
                }
              })
              response.data.forecast = forecast;
              allCities.push(response.data)
              that.setState({
                search: false,
                loading: false,
                allCities: allCities,
                selectedCity: response.data,
                index: allCities.length-1
              });
              console.log(response.data, 'here is the response');
              that.setState({userZip: '', userCity: ''})


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
              let forecast = [];
              forcastResponse.data.list.forEach((item) => {
                const hour = moment.unix(item.dt).hour()
                if(hour >= 12 && hour <= 15){
                  // console.log(hour, 'hour');
                  return forecast.push(item);
                }
              })

              response.data.forecast = forecast;
              allCities.push(response.data)
              that.setState({
                search: false,
                loading: false,
                allCities: allCities,
                selectedCity: response.data,
                index: allCities.length-1
              });
              console.log(response.data, 'here is the response');
              that.setState({userZip: '', userCity: ''})
            })
            .catch(function(error) {
              that.setState({
                error: true
              })
              console.log(error, 'here is the error in forcast name');
            });
          })
          .catch(function(error) {
            that.setState({
              error: true
            })
            console.log(error, 'here is the error weather name');
          });
      }, 1000);
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    // console.log(event.target.name, event.target.value);
  }

  getWeatherData(response, err){
    console.log(response, 'getting resonse here');
  }

  renderWeather(){
    let dayOrNight = null;
    if(moment.unix(this.state.selectedCity.dt).hour() >=6 && moment.unix(this.state.selectedCity.dt).hour() <=18){
      dayOrNight = 'day';
    } else {
      dayOrNight = 'night';
    }

    const des = Object.keys(this.state.allCities).length > 0 ? this.state.allCities[this.state.index].weather[0].description: null;
    const weatherIcon = iconPicker(dayOrNight, des);
    const selectedDotStyle = {
      backgroundColor: 'black',
    }

    if(this.state.search === false){
      var selectedCity = this.state.selectedCity;
      console.log(selectedCity, "selectedCity")
      return (
        <div>
          <div className="weather-container">
            <div className="date-time">
              <p className="white">{moment.unix(selectedCity.dt).format('h:mm a')}</p>
              <p className="add-button" onClick = {()=>this.setState({search: true})}><i className='add-icon'></i> </p>
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
                {this.state.allCities.length === 1 || this.state.index === 0 ? '': <div className="arrow-icon icon-left" onClick = {()=>{this.setState({index: this.state.index-1, selectedCity: this.state.allCities[this.state.index-1]})}} disabled={this.state.index === 0}> <div className="arrow arrow-left"></div> </div>}
              </div>

              <div className="arrow-button next">
                {this.state.allCities.length === 1 || this.state.index === this.state.allCities.length-1? '': <div className="arrow-icon icon-right" onClick = {()=>{this.setState({index: this.state.index+1, selectedCity: this.state.allCities[this.state.index+1]})}} disabled={this.state.index === this.state.allCities.length-1}> <div className="arrow arrow-right"> </div></div>}
              </div>
            </div>   { /* End icon-prev-next */ }


            <div className="temp-status">
              <p className="temp">{selectedCity.main.temp.toFixed(0)}&#176;</p>
              <p className="description">{selectedCity.weather[0].main}</p>
            </div>
            <div className="city">
              <div className="thick-border"></div>
              <h1 className="white">{selectedCity.name} </h1>
            </div>

          </div> { /* End weather container */ }

          <ul className="forecast">
            {selectedCity.forecast.map((item, key) => {
              const foreDes = item.weather[0].description
              const forecastIcon = iconPicker(dayOrNight, foreDes)
              return (
                <li key={key}>
                  <p>{moment.unix(item.dt).format("dddd")}</p>
                  <p>{Math.round(item.main.temp)}&#176;</p>
                  <p><i className={`white ${forecastIcon}`} alt="logo"> </i></p>
                </li>
              )
            })}
          </ul>


          <div className ='footer'>
            <div className="top">
              <p className='wind'> <i className="wi wi-cloudy-gusts white" alt="logo"></i> {Math.round(selectedCity.wind.speed) + ' mph'} </p>

              <p className='sunrise align-right'> <i className="wi wi-sunrise white" alt="logo"></i> {moment.unix(selectedCity.sys.sunrise).format('h:mm a')} </p>
            </div>

            <div className="thick-border"></div>

            <div className="bottom">
              <p className='humidity'> <i className="wi wi-humidity white" alt="logo"></i> {selectedCity.main.humidity} </p>

              <p className='sunset align-right'> <i className="wi wi-sunset white" alt="logo"></i> {moment.unix(selectedCity.sys.sunset).format('h:mm a')} </p>
            </div>
          </div>
        { /* End main */ } </div>
      )
    }
  }

  renderSearch(){
    //when loading is true, show the loadingIcon until data comes back
    if(this.state.loading){
      return (
        <div className='loading-container'>
          <img className="loading-icon" src={loading} alt="loading-icon"/>
        </div>
      )
    }
    return (
      <div>
      <div className='home'>
        <h1>Open Weather</h1>
        <div className="thick-border"></div>
        <div className='forms'>
          <form name='userZip' onSubmit={this.handleFormSubmit}>
            <input name='userZip' type="text" value={this.state.userZip} onChange={this.handleInputChange} placeholder='Enter Zip Code'/>
          </form>
          <form name="userCity" onSubmit={this.handleFormSubmit}>
            <input name='userCity' type="text" value={this.state.userCity} onChange={this.handleInputChange} placeholder='Enter City Name'/>
          </form>
        </div>
      </div> { /* End home */ }
      <h2 className="center">My Cities</h2>

      <div className="my-cities">
        {this.state.allCities.length <= 0 ?
          <p className="center">Search for a city to add to your cities!</p> :

          <ul>
            {this.state.allCities.map((city, key) => {
              return (
                <li key={key}onClick={(e)=>{
                    if(!e.target.id){
                      this.setState({
                                  selectedCity: city,
                                  search: false,
                                  index: key})}}}>
                  <p>
                    {city.name}
                  </p>

                  <div>
                    <p>{Math.round(city.main.temp)}&#176;</p>

                    <p id="delete" onClick={()=>{
                      let newState = [...this.state.allCities];
                      newState.splice(key, 1)
                      this.setState({allCities: newState})
                    }}>
                    x
                    </p>
                  </div>


                </li>
              )
            })}
          </ul>
        }


      </div>
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        {
          this.state.search
          ? this.renderSearch()
          : this.renderWeather()
        }
      </div>
    )
  }
}

export default WeatherResults;
