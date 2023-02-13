import api from "./api"

const dom = (()=>{
    //start
    function convertIcon(iconId){
        switch(iconId){
            case '01d':
        return 'fa-sun'
      case '01n':
        return 'fa-moon-stars'
      case '02d':
        return 'fa-cloud-sun'
      case '02n':
        return 'fa-cloud-moon'
      case '03d':
        return 'fa-clouds-sun'
      case '03n':
        return 'fa-clouds-moon'
      case '04d':
      case '04n':
        return 'fa-clouds'
      case '09d':
      case '09n':
        return 'fa-cloud-showers-heavy'
      case '10d':
        return 'fa-cloud-sun-rain'
      case '10n':
        return 'fa-cloud-moon-rain'
      case '11d':
      case '11n':
        return 'fa-thunderstorm'
      case '13d':
      case '13n':
        return 'fa-cloud-snow'
      case '50d':
      case '50n':
        return 'fa-fog'
    default:
        }
        return false
    }

    function showForecast(query){
        const headingCity = document.querySelector('.data-city');
        const headingCountry = document.querySelector('.data-country');
        const headingCurrentTemp = document.querySelector('.data-temp');
        const headingWindSpeed = document.querySelector('.data-wind-speed');
        const infoCoordLon = document.querySelector('.data-coord-lon');
        const infoCoordLat = document.querySelector('.data-coord-lat');
        const infoFeelsLike = document.querySelector('.data-feels-like');
        const infoTempDesc = document.querySelector('.data-temp-desc');
        const iconWeather = document.querySelector('.icon-weather')
        const iconWindDegree = document.querySelectorz('.icon-wind-degree')
        const infoWindDescription = document.querySelector('.data-wind-desc')
        const addHumidity = document.querySelector('.data-humidity')
        const addVisibility = document.querySelector('.data-visibility')
        const addCloud = document.querySelector('.data-clouds')
        const addPressure = document.querySelector('.data-pressure')
        const addRainChance = document.querySelector('.data-rain-chance')
        const addUvi = document.querySelector('.data-uvi')

        const {
            city,country,coord,current,
        } = data

        headingCity.textContent = city
        headingCountry.textContent = country
        headingCurrentTemp.textContent = current.temp
        headingWindSpeed.textContent = current.windSpeed

        iconWeather.className.baseVal = ''
        iconWeather.className.baseVal = `big-icon icon-weather far ${convertIcon(current.iconWeatherDegree)}`
        

        infoCoordLon.textContent = coord.lon
        infoCoordLat.textContent = coord.lat
        infoFeelsLike.textContent = current.feelsLike
        infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase() + current.tempDescription.slice(1)
        infoWindDescription.textContent = getWindDescription(current.windSpeed)

        addHumidity.textContent = current.humidity        
        addVisibility.textContent = current.visibility        
        addCloud.textContent = current.clouds        
        addPressure.textContent = current.pressure        
        addRainChance.textContent = current.chanceOfRain        
        addUvi.textContent = current.uvi      
        
        addUvi.className = ''
        addUvi.className = getUviColor(current.uvi)

        
        console.log(data)
    }

    function getUviColor(uvi){
        let uviColor = ''
        if(uvi<=2){
            uviColor = 'data-uvi uvi-green'
        }
        else if(uvi<=5){
            uviColor = 'data-uvi uvi yellow'
        }
        else if(uvi<=7){
            uviColor = 'data-uvi uvi-orange'
        }
        else if(uvi>7){
            uviColor = 'data-uvi uvi-red'
        }
        return uviColor
    }

    function getWindDescription(windSpeed){
        let windDesc = '';
        if (windSpeed < 0.5) {
        windDesc = 'Calm';
        } else if (windSpeed < 1.6) {
        windDesc = 'Light air';
        } else if (windSpeed < 3.4) {
        windDesc = 'Light breeze';
        } else if (windSpeed < 5.6) {
        windDesc = 'Gentle breeze';
        } else if (windSpeed < 8) {
        windDesc = 'Moderate breeze';
        } else if (windSpeed < 10.8) {
        windDesc = 'Fresh breeze';
        } else if (windSpeed < 13.9) {
        windDesc = 'Strong breeze';
        } else if (windSpeed < 17.2) {
        windDesc = 'High wind';
        } else if (windSpeed < 20.8) {
        windDesc = 'Gale';
        } else if (windSpeed < 24.5) {
        windDesc = 'Strong gale';
        } else if (windSpeed < 28.5) {
        windDesc = 'Storm';
        } else if (windSpeed < 32.7) {
        windDesc = 'Violent storm, seek shelter';
        } else if (windSpeed >= 32.7) {
        windDesc = 'Hurricane, stay safe';
        }
        return windDesc
    }

    return{
        showForecast,
    }
})()

export default dom