import api from "./api"

const dom = (()=>{
    //start

    const mainContainer = document.querySelector('.main-container')

    function loading(state){
      const loadSpinner = document.querySelector('.loading')

      if(state === 'loading'){
        loadSpinner.className = 'loading show'
        mainContainer.className = 'main-container hide'
      } else{
        loadSpinner.className = 'loading hide'
      }
    }

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

      const mainContainer = document.querySelector('.main-container')
      const headingCity = document.querySelector('.data-city');
      const headingCountry = document.querySelector('.data-country');
      const headingCurrentTemp = document.querySelector('.data-temp');
      const headingWindSpeed = document.querySelector('.data-wind-speed');
      const infoFeelsLike = document.querySelector('.data-feels-like');
      const infoTempDesc = document.querySelector('.data-temp-desc');
      const infoTime = document.querySelector('.data-time')
      const iconWeather = document.querySelector('.icon-weather')
      const infoWindDescription = document.querySelector('.data-wind-desc')
      const addHumidity = document.querySelector('.data-humidity')
      const addVisibility = document.querySelector('.data-visibility')
      const addCloud = document.querySelector('.data-clouds')
      const addPressure = document.querySelector('.data-pressure')
      const addRainChance = document.querySelector('.data-rain-chance')
      const addUvi = document.querySelector('.data-uvi')
      const addSunrise = document.querySelector('.data-sunrise')
      const addSunset = document.querySelector('.data-sunset')
      const addMoonPhase = document.querySelector('.data-moon')
      const error = document.querySelector('.error')
      const dailyList = document.querySelector('.daily-list')

       
      

        error.className = 'error hide'
        mainContainer.className = 'main-container'
        const {city,country, units,current, daily} = query
        console.log(query + "testing")
        headingCity.textContent = city
        headingCountry.textContent = country
        console.log(headingCountry+"testing")
        headingCurrentTemp.textContent = current.temperature
        headingWindSpeed.textContent = getWindDescription(current.windSpeed, units).roundedSpeed

        iconWeather.className.baseVal = ''
        iconWeather.className.baseVal = `big-icon icon-weather far ${convertIcon(current.iconWeatherDegree)}`
        
        infoTime.textContent = formatTime(current.time, units).formattedTime
        infoFeelsLike.textContent = current.feelsLike
        infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase() + current.tempDescription.slice(1)
        infoWindDescription.textContent = getWindDescription(current.windSpeed, units).windDesc

        addHumidity.textContent = current.humidity        
        addVisibility.textContent = current.visibility        
        addCloud.textContent = current.clouds        
        addPressure.textContent = current.pressure        
        addRainChance.textContent = current.chanceOfRain        
        addUvi.textContent = current.uvi      
        
        addUvi.className = ''
        addUvi.className = getUviColor(current.uvi)

        addSunrise.textContent = formatTime(current.sunriseTime, units).formattedSunriseTime
        addSunset.textContent = formatTime(current.sunSetTime, units).formattedSunsetTime
        addMoonPhase.setAttribute('src', getMoon(current.moonPhase).moonIcon)
        addMoonPhase.setAttribute('title', getMoon(current.moonPhase).moonName)

        dailyList.textContent = ''
        for(let i =0; i<daily.length; i+=1){
          const dailyDay = document.createElement('div')
          dailyDay.classList.add('daily-item')
          dailyList.append(dailyDay)

          const dailyDaySpan = document.createElement('span')
          dailyDaySpan.classList.add('data-daily-date', 'daily-item-date')
          dailyDaySpan.textContent = formatTime(daily[i].date, units).formattedWeekDay
          dailyDay.appendChild(dailyDaySpan)

          const dailyWeatherDay = document.createElement('span')
          dailyWeatherDay.className = 'daily-item-day-temp'
          dailyWeatherDay.setAttribute('title', daily[i].tempDescription.charAt(0).toUpperCase()+daily[i].tempDescription.slice(1),)
          dailyDay.appendChild(dailyWeatherDay)

          const dailyWeatherDayTemp = document.createElement('span')
          dailyWeatherDayTemp.className = 'data-daily-temp'
          dailyWeatherDayTemp.textContent = daily[i].dayTemperature
          dailyWeatherDay.appendChild(dailyWeatherDayTemp)

          const dailyWeatherDayTempUnit = document.createElement('span')
          dailyWeatherDayTempUnit.className='unit-temp'
          dailyWeatherDay.appendChild(dailyWeatherDayTempUnit)

          const dailyWeatherNight = document.createElement('span')
          dailyWeatherNight.className = 'daily-item-night-temp' 
          dailyDay.appendChild(dailyWeatherNight)

          const dailyWeatherNightTemp = document.createElement('span')
          dailyWeatherNightTemp.className = 'data-night-temp'
          dailyWeatherNightTemp.textContent = daily[i].nightTemperature
          dailyWeatherNight.appendChild(dailyWeatherNightTemp)

          const dailyWeatherNightTempUnit = document.createElement('span')
          dailyWeatherNightTempUnit.className = 'unit-temp'
          dailyWeatherNight.appendChild(dailyWeatherNightTempUnit)

          const dailyWindSpan = document.createElement('span')
          dailyWindSpan.classList.add('daily-item-wind')
          dailyWindSpan.setAttribute('title', getWindDescription(daily[i].windSpeed, units).windDesc,)
          dailyDay.appendChild(dailyWindSpan)

          const dailyWindSpeed = document.createElement('span')
          dailyWindSpeed.className = 'data-daily-wind-speed'
          dailyWindSpeed.textContent = getWindDescription(daily[i].windSpeed, units).roundedSpeed
          dailyWindSpan.appendChild(dailyWindSpeed)

          const dailyWindSpeedUnit = document.createElement('span')
          dailyWindSpeedUnit.className = 'unit-speed'
          dailyWindSpan.appendChild(dailyWindSpeedUnit)
        }
        changeUnit(units)      
        console.log(query)
      
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

    function getWindDescription(windSpeed, units){
        let windDesc = '';
        const roundedSpeed= Math.round(windSpeed)
        let speed = windSpeed
        if(units === 'imperial'){
          speed *= 0.44704
        }
        if (speed < 0.5) {
        windDesc = 'Calm';
        } else if (speed < 1.6) {
        windDesc = 'Light air';
        } else if (speed < 3.4) {
        windDesc = 'Light breeze';
        } else if (speed < 5.6) {
        windDesc = 'Gentle breeze';
        } else if (speed < 8) {
        windDesc = 'Moderate breeze';
        } else if (speed < 10.8) {
        windDesc = 'Fresh breeze';
        } else if (speed < 13.9) {
        windDesc = 'Strong breeze';
        } else if (speed < 17.2) {
        windDesc = 'High wind';
        } else if (speed < 20.8) {
        windDesc = 'Gale';
        } else if (speed < 24.5) {
        windDesc = 'Strong gale';
        } else if (speed < 28.5) {
        windDesc = 'Storm';
        } else if (speed < 32.7) {
        windDesc = 'Violent storm, seek shelter';
        } else if (speed >= 32.7) {
        windDesc = 'Hurricane, stay safe';
        }
        return {windDesc, roundedSpeed}
    }

    function getMoon(moonPhase){
      let moonIcon = ''
      let moonDesc = ''
      if (moonPhase === 0 || moonPhase === 1) {
        moonName = 'New Moon';
        moonIcon = './svg/moon-new.svg';
      }
      if (moonPhase === 0.25) {
        moonName = 'First Quarter Moon';
        moonIcon = './svg/moon-first-quarter.svg';
      }
      if (moonPhase === 0.5) {
        moonName = 'Full Moon';
        moonIcon = './svg/moon-full.svg';
      }
      if (moonPhase === 0.75) {
        moonName = 'Last Quarter';
        moonIcon = './svg/moon-last-quarter.svg';
      }
      if (moonPhase > 0 && moonPhase < 0.25) {
        moonName = 'Waxing Crescent';
        moonIcon = './svg/moon-waxing-crescent.svg';
      }
      if (moonPhase > 0.25 && moonPhase < 0.5) {
        moonName = 'Waxing Gibbous';
        moonIcon = './svg/moon-waxing-gibbous.svg';
      }
      if (moonPhase > 0.5 && moonPhase < 0.75) {
        moonName = 'Waning Gibbous';
        moonIcon = './svg/moon-waning-gibbous.svg';
      }
      if (moonPhase > 0.75 && moonPhase < 1) {
        moonName = 'Waning Crescent';
        moonIcon = './svg/moon-waning-crescent.svg';
      }
      return {moonName, moonDesc};
    }

    function changeUnit(units){
      const metricButton = document.querySelector('.units-metric')
      const imperialButton = document.querySelector('units-imperial')
      const tempUnits = document.querySelectorAll('.unit-temp')
      const speedUnits = document.querySelectorAll('.unit-speed')

      let tempUnit;
      let windUnit;

      if(units === 'metric'){
        metricButton.className = 'units-metric active'
        imperialButton.className = 'units-imperial'
        tempUnit = '°C';
        windUnit = 'm/s';
      }
      else{
        metricButton.className = 'units-metric'
        imperialButton.className = 'units-imperial active'
        tempUnit = '°F';
        windUnit = 'mph';
      }

      tempUnits.forEach((unit)=>{
        unit.textContent = tempUnit
      })
      speedUnits.foreach((unit)=>{
        unit.textContent = windUnit
      })
    }

    function formatTime( data,units){
      const{time, sunriseTime, sunSetTime} = data
      let formattedTime
      let formattedSunrise
      let formattedSunset
      let formattedWeekDay
      if(units==='imperial'){
        formattedTime = format(data, 'EEEE d MMMM yyyy | h:mm aa')
        formattedSunrise = format(data, 'h:mm aa')
        formattedSunset = format(data, 'h:mm aa')
        formattedWeekDay = format(data, 'EEEE')
        return {formattedTime, formattedSunrise, formattedSunset, formattedWeekDay}
      }
      formattedTime = format(data, 'EEEE d MMMM yyyy | H:mm');
      formattedSunriseTime = format(data, 'H:mm');
      formattedSunsetTime = format(data, 'H:mm');
      formattedWeekDay = format(data, 'EEEE')
      return { formattedTime, formattedSunriseTime, formattedSunsetTime,formattedWeekDay };
    }

    return{
        showForecast,
        loading,
    }
  
})()

export default dom