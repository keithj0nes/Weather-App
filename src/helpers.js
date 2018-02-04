export function iconPicker(dayOrNight, des){
  const wico = {
    day: {
      "clear sky": "wi wi-day-sunny",
    //clouds
      "few clouds": "wi wi-day-cloudy",
      "scattered clouds": "wi wi-day-cloudy",
      "broken clouds": "wi wi-day-cloudy",
    //rain
      "light rain": "wi wi-day-sprinkle",
      "moderate rain": "wi wi-dayshowers",
      "light intensity shower rain": "wi wi-day-showers",
      "heavy intensity rain": "wi wi-day-rain",
      "very heavy rain": "wi wi-day-rain",
      "extreme rain": "wi wi-day-rain",
      "freezing rain": "wi wi-day-rain",
      "shower rain": "wi wi-day-rain",
      "heavy intensity shower rain": "wi wi-day-rain",
      "ragged shower rain": "wi wi-day-rain",
    //snow
      "light snow": "wi wi-day-snow",
      "snow": "wi wi-day-snow",
      "light rain and snow": "wi wi-day-alt-rain-mix",
      "rain and snow": "wi wi-day-alt-rain-mix",
      "light shower snow": "wi wi-day-alt-rain-mix",
      "shower snow": "wi wi-day-alt-rain-mix",
    //atmosphere
      "haze": "wi wi-day-fog",
      "fog": "wi wi-day-fog",
      "squalls": "wi wi-day-windy",
    },
    night: {
      "clear sky": "wi wi-night-clear",
    //clouds
      "few clouds": "wi wi-night-alt-cloudy",
      "scattered clouds": "wi wi-night-alt-cloudy",
      "broken clouds": "wi wi-night-alt-cloudy",
    //rain
      "light rain": "wi wi-night-alt-sprinkle",
      "moderate rain": "wi wi-night-alt-showers",
      "light intensity shower rain": "wi wi-night-alt-showers",
      "heavy intensity rain": "wi wi-night-alt-rain",
      "very heavy rain": "wi wi-night-alt-rain",
      "extreme rain": "wi wi-night-alt-rain",
      "freezing rain": "wi wi-night-alt-rain",
      "shower rain": "wi wi-night-alt-rain",
      "heavy intensity shower rain": "wi wi-night-alt-rain",
      "ragged shower rain": "wi wi-night-alt-rain",
    //snow
      "light snow": "wi wi-night-snow",
      "snow": "wi wi-night-snow",
      "light rain and snow": "wi wi-night-alt-rain-mix",
      "rain and snow": "wi wi-night-alt-rain-mix",
      "light shower snow": "wi wi-night-alt-rain-mix",
      "shower snow": "wi wi-night-alt-rain-mix",
    //atmosphere
      "haze": "wi wi-night-fog",
      "fog": "wi wi-night-fog",
      "squalls": "wi wi-night-alt-cloudy-gusts",
    },
    neutral: {
    //clouds
      "overcast clouds": "wi wi-cloudy",
    //thunderstorm
      "thunderstorm with light rain": "wi wi-storm-showers",
      "thunderstorm with rain": "wi wi-storm-showers",
      "thunderstorm with heavy rain": "wi wi-storm-showers",
      "light thunderstorm": "wi wi-storm-showers",
      "thunderstorm": "wi wi-thunderstorm",
      "heavy thunderstorm": "wi wi-thunderstorm",
      "ragged thunderstorm": "wi wi-thunderstorm",
      "thunderstorm with light drizzle": "wi wi-storm-showers",
      "thunderstorm with drizzle": "wi wi-storm-showers",
      "thunderstorm with heavy drizzle": "wi wi-storm-showers" ,
    //snow
      "sleet": "wi wi-sleet",
      "shower sleet": "wi wi-sleet",
      "heavy snow": "wi wi-snow",
      "heavy shower snow": "wi wi-rain-mix",
    //atmosphere
      "mist": "wi wi-sprinkle",
      "smoke": "wi wi-smoke",
      "sand, dust whirls": "wi wi-dust",
      "sand": "wi wi-dust",
      "dust": "wi wi-dust",
      "volcanic ash": "wi wi-dust",
      "tornado": "wi wi-tornado",
    }
  }

  let icon = null;
  let firstLevel = wico[dayOrNight];
  if (firstLevel !== undefined && firstLevel !== null) {
    let secondLevel = firstLevel[des];
    if (secondLevel !== undefined && secondLevel !== null) {
      return icon = secondLevel;
    }
  }
  if (icon === undefined || icon === null) {
    return icon = wico.neutral[des];
  }
}



//STILL TO ADD TO LIST
    // Group 90x: Extreme
    // ID	Meaning
    // 900	tornado
    // 901	tropical storm
    // 902	hurricane
    // 903	cold
    // 904	hot
    // 905	windy
    // 906	hail
    // Group 9xx: Additional
    // ID	Meaning
    // 951	calm
    // 952	light breeze
    // 953	gentle breeze
    // 954	moderate breeze
    // 955	fresh breeze
    // 956	strong breeze
    // 957	high wind, near gale
    // 958	gale
    // 959	severe gale
    // 960	storm
    // 961	violent storm
    // 962	hurricane
