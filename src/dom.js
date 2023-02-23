import api from "./api"
import { format } from "date-fns"

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

    function showDailyForecast(daily,units){
      const dailyList = document.querySelector('.daily-list');
      dailyList.textContent = ''

      for (let i = 0; i < daily.length; i += 1) {
        const dailyItem = document.createElement('div')
        dailyItem.className = 'daily-item'
        const dailyDate = document.createElement('span')
        dailyDate.className = 'data-daily-date daily-item-date'
        dailyDate.textContent = formatTime(daily[i].date,units,).formattedWeekDay
        const dailyWeatherDay = document.createElement('span')
        dailyWeatherDay.className = 'daily-item-day-temp'
        dailyWeatherDay.setAttribute('title',daily[i].tempDescription.charAt(0).toUpperCase()+ daily[i].tempDescription.slice(1),)
      
        const dailyWeatherDayTemp = document.createElement('span')
        dailyWeatherDayTemp.className = 'data-daily-temp'
        dailyWeatherDayTemp.textContent = daily[i].dayTemperature
        const dailyWeatherDayTempUnit = document.createElement('span')
        dailyWeatherDayTempUnit.className = 'unit-temp'
        const dailyWeatherNight = document.createElement('span')
        dailyWeatherNight.className = 'daily-item-night-temp'
        const dailyWeatherNightTemp = document.createElement('span')
        dailyWeatherNightTemp.className = 'data-daily-night-temp'
        dailyWeatherNightTemp.textContent = daily[i].nightTemperature
        const dailyWeatherNightTempUnit = document.createElement('span')
        dailyWeatherNightTempUnit.className = 'unit-temp'
        const dailyWind = document.createElement('span')
        dailyWind.className = 'daily-item-wind'
        dailyWind.setAttribute('title',getWindDescription(daily[i].windSpeed, units).windDesc,);
        const dailyWindSpeed = document.createElement('span')
        dailyWindSpeed.className = 'data-daily-wind-speed'
        dailyWindSpeed.textContent = getWindDescription(daily[i].windSpeed,units,).roundedSpeed;
        const dailyWindSpeedUnit = document.createElement('span')
        dailyWindSpeedUnit.className = 'unit-speed'

        dailyList.appendChild(dailyItem)
        dailyItem.appendChild(dailyDate)
        dailyItem.appendChild(dailyWeatherDay)
        dailyWeatherDay.appendChild(dailyWeatherDayTemp)
        dailyWeatherDay.appendChild(dailyWeatherDayTempUnit)
        dailyItem.appendChild(dailyWeatherNight)
        dailyWeatherNight.appendChild(dailyWeatherNightTemp)
        dailyWeatherNight.appendChild(dailyWeatherNightTempUnit)
        dailyItem.appendChild(dailyWind)
        dailyWind.appendChild(dailyWindSpeed)
        dailyWind.appendChild(dailyWindSpeedUnit)
        
      }
      changeUnit(units)      
      
    }

    function showForecast(city,country,current,units){
      const iconWeather = document.querySelector('.icon-weather')
      const dataCity = document.querySelector('.data-city')
      const dataCountry = document.querySelector('.data-country')
      const dataCurrentTemp = document.querySelector('.data-temp')
      const infoTime = document.querySelector('.data-time')
      const infoFeelsLike = document.querySelector('.data-feels-like')
      const infoTempDesc = document.querySelector('.data-temp-desc')
      const infoWindSpeed = document.querySelector('.data-wind-speed')
      const infoWindDescription = document.querySelector('.data-wind-desc')
      const addHumidity = document.querySelector('.data-humidity')
      const addVisibility = document.querySelector('.data-visibility')
      const addCloud = document.querySelector('.data-clouds')
      const addRainChance = document.querySelector('.data-rain-chance')
      const addUvi = document.querySelector('.data-uvi')
      const addSunrise = document.querySelector('.data-sunrise')
      const addSunset = document.querySelector('.data-sunset')
      const addMoonPhase = document.querySelector('.data-moon')
      const dataMoonIcon = document.querySelector('.data-moon-icon')

      const currentIcon = document.createElement('i')
      //currentIcon.className = `big-icon far ${convertIcon(current.icon,)}`
      iconWeather.textContent = ''
      iconWeather.appendChild(currentIcon)

      dataCity.textContent = city
      dataCountry.textContent = country
      dataCurrentTemp.textContent = current.temperature
      infoTime.textContent = formatTime(current.time, units).formattedTime
      infoFeelsLike.textContent = current.feelsLike
      infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase()+ current.tempDescription.slice(1)
      infoWindSpeed.textContent = getWindDescription(current.windSpeed, units,).roundedSpeed
      infoWindDescription.textContent = getWindDescription(current.windSpeed,units,).windDesc
      addHumidity.textContent = current.humidity
      addVisibility.textContent = current.visibility
      addCloud.textContent = current.clouds
      addRainChance.textContent = current.chanceOfRain
      addUvi.textContent = current.uvi
      addUvi.className = getUviColor(current.uvi)
      addSunrise.textContent = formatTime(current.sunriseTime, units,).formattedSunriseTime
      addSunset.textContent = formatTime(current.sunsetTime, units,).formattedSunsetTime
      addMoonPhase.textContent = getMoon(current.moonPhase).moonName;
      dataMoonIcon.setAttribute('src', getMoon(current.moonPhase).moonIcon)
      dataMoonIcon.setAttribute('title', getMoon(current.moonPhase).moonName)
    }

    function renderApp(data){
      const error = document.querySelector('.error')

      if(data.cod){
        error.className = 'error show'
        mainContainer.className = 'main-container hide'
        error.textContent = data.message.charAt(0).toUpperCase()+data.message.slice(1)
      }
      else{
        error.className = 'error hide'
        mainContainer.className = 'main-container'

        const {city,country,current,daily,units} = data
        changeUnit(units)
        showForecast(city,country,current,units)
        showDailyForecast(daily,units)
      }
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
        let windDesc
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
        moonDesc = 'New Moon';
        moonIcon = './svg/moon-new.svg';
      }
      if (moonPhase === 0.25) {
        moonDesc = 'First Quarter Moon';
        moonIcon = './svg/moon-first-quarter.svg';
      }
      if (moonPhase === 0.5) {
        moonDesc = 'Full Moon';
        moonIcon = './svg/moon-full.svg';
      }
      if (moonPhase === 0.75) {
        moonDesc = 'Last Quarter';
        moonIcon = './svg/moon-last-quarter.svg';
      }
      if (moonPhase > 0 && moonPhase < 0.25) {
        moonDesc = 'Waxing Crescent';
        moonIcon = './svg/moon-waxing-crescent.svg';
      }
      if (moonPhase > 0.25 && moonPhase < 0.5) {
        moonDesc = 'Waxing Gibbous';
        moonIcon = './svg/moon-waxing-gibbous.svg';
      }
      if (moonPhase > 0.5 && moonPhase < 0.75) {
        moonDesc = 'Waning Gibbous';
        moonIcon = './svg/moon-waning-gibbous.svg';
      }
      if (moonPhase > 0.75 && moonPhase < 1) {
        moonDesc = 'Waning Crescent';
        moonIcon = './svg/moon-waning-crescent.svg';
      }
      return {moonDesc, moonDesc};
    }

    function changeUnit(units){
      const metricButton = document.querySelector('.units-metric')
      const imperialButton = document.querySelector('.units-imperial')
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
      speedUnits.forEach((unit)=>{
        unit.textContent = windUnit
      })
    }

    function formatTime(data,units){
      let formattedTime
      let formattedSunriseTime
      let formattedSunsetTime
      let formattedWeekDay
      if(units==='imperial'){
        formattedTime = format(data, 'EEEE d MMMM yyyy | h:mm aa')
        formattedSunriseTime = format(data, 'hh:mm aa')
        formattedSunsetTime = format(data, 'hh:mm aa')
        formattedWeekDay = format(data, 'EEEE')
        return {formattedTime, formattedSunrise, formattedSunset, formattedWeekDay}
      }
      formattedTime = format(data, 'EEEE d MMMM yyyy | H:mm');
      formattedSunriseTime = format(data, 'HH:mm');
      formattedSunsetTime = format(data, 'HH:mm');
      formattedWeekDay = format(data, 'EEEE')
      return { formattedTime, formattedSunriseTime, formattedSunsetTime,formattedWeekDay };
    }

    return{
      loading,
      renderApp,
        
    }
  
})()

export default dom