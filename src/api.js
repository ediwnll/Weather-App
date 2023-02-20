// what to pull from weather data
//Country/City name
//Temperature
//Feel Temperature
//Temp Description
//Wind speed/degree?
//Rain chances
//humidity
//date time
//sunrise/sunset

//Daily day/night temp
//description
//wind

//Hour
//rain chances
//temp/ temp desc
//wind
//apikey
//38982387bce58058b2661be97bbebcb5
import { format, addSeconds, fromUnixTime } from "date-fns";

const api =(()=>{
    async function getData(query){
        const regionNameEnglish = new Intl.DisplayNames(['en'], {type: 'region'})
        const {locationData, forecastData, units} = query

        const processedData = {
            city: locationData.name,
            country: regionNameEnglish.of(locationData.sys.country),
            units,
            current: {
              temperature: Math.round(forecastData.current.temp),
              feelsLike: Math.round(forecastData.current.feels_like),
              icon: forecastData.current.weather[0].icon,
              tempDescription: forecastData.current.weather[0].description,
              windSpeed: Math.round(forecastData.current.wind_speed),
              windDegree: forecastData.current.wind_deg,
              chanceOfRain: Math.round(forecastData.daily[0].pop * 100),
              humidity: forecastData.current.humidity,
              dateAndTime: new Date(),
              sunriseTime: addSeconds(fromUnixTime(forecastData.current.sunrise),forecastData.timezone_offset,),
              sunsetTime: addSeconds(fromUnixTime(forecastData.current.sunset),forecastData.timezone_offset,),
              clouds: forecastData.current.clouds,
              uvi: Math.round(forecastData.current.uvi),
              visibility: forecastData.current.visibility/1000,
              moonPhase: forecastData.daily[0].moon_phase,
              time: addSeconds(new Date(), forecastData.timezone_offset),

            },
            daily: [],
            hourly: [],
        }
        for(let i =1; i<7; i += 1){
            processedData.daily[i-1] = {
                date:addSeconds(fromUnixTime(forecastData.daily[i].dt),forecastData.timezone_offset),
                icon:forecastData.daily[i].weather[0].icon,
                dayTemperature: Math.round(forecastData.daily[i].temp.day),
                nightTemperature: Math.round(forecastData.daily[i].temp.night),
                tempDescription: forecastData.daily[i].weather[0].description,
                windSpeed: forecastData.daily[i].wind_speed,
                windDegree: forecastData.daily[i].wind_deg,
            };
        }

        for(let j =0; j< 24; j+=1){
            processedData.hourly[j] ={
                date:addSeconds(fromUnixTime(forecastData.daily[j].dt),forecastData.timezone_offset),
                icon:forecastData.daily[j].weather[0].icon,
                temperature: forecastData.hourly[j].temp,
                tempDescription: forecastData.hourly[j].weather[0].description,
                windSpeed: forecastData.hourly[j].wind_speed,
                windDegree: forecastData.hourly[j].wind_deg,
                windGust: forecastData.hourly[j].wind_gust,
            }
        }
        console.log(processedData)
        return processedData
    }

    async function getForecastData(locationData, units){
        const {coord} = locationData
        try{
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=38982387bce58058b2661be97bbebcb5`, {mode: 'cors'},)
            const forecastData = await response.json()
            return getData({locationData,forecastData, units})
        }catch(error){
            return {cod: error.name, message: error.message}
        }
    }

    async function getLocData(data, units= 'metric'){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=38982387bce58058b2661be97bbebcb5`, {mode: 'cors'},)
            const locData = await response.json()
            
            if(response.status>=400){
                console.log('Error', locData)
                return locData
            }
            return getForecastData(locData,units)
        }catch(error){
            return {cod: error.name, message: error.message}
        }
        
    }

    return {
        getLocData,
    }
})()

export default api