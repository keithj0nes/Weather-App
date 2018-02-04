import React from 'react';
import config from '../config.js';
import axios from 'axios';

class SearchWeather extends React.Component {

  constructor(){
    super();

    this.state = {
      loading: false,
      userZip: '',
      userCity: '',
      allCities: []
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault()

    console.log('getin her')
    const that = this

    var allCities = [...this.state.allCities];

    //setState loading to true when form is submitted - change to false after data gets back
    // this.setState({
    //   loading: true
    // })
    if (e.target.name === 'userZip'){
      // setTimeout for 2 second to show loading icon - not neccessary but looks cool
      setTimeout(function() {
        axios.get('http://api.openweathermap.org/data/2.5/weather?zip=' + that.state.userZip + ',us&APPID=' + config.apiKey + '&units=imperial')
          .then(function(response) {
            allCities.push(response.data)
            that.setState({
              weather: response.data,
              loading: false,
              allCities: allCities
            });
            console.log(response.data, 'here is the response');
          })
          .catch(function(error) {
            that.setState({
              error: true
            })
            console.log(error, 'here is the error');
          });
      }, 1000);
    }

    else if(e.target.name === 'userCity') {
      setTimeout(function() {

        axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + that.state.userCity + '&APPID=' + config.apiKey + '&units=imperial')

          .then(function(response) {
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
            console.log(error, 'here is the error');
          });
      }, 1000);

    }
    // this.setState({allCities})
    console.log(allCities, 'all cities');

  }

handleInputChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
  console.log(e.target.name, e.target.value);

}


  render(){
    return(
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
    )
  }

// render(){
//   return 'HELLO SearchWeather'
// }

}



export default SearchWeather;
