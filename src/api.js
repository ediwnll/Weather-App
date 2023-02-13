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

const api =(()=>{
    async function getData(query){
        const {locationData, forecastData} = query

        
        const processedData = {
            city: locationData.name,
            country: locationData.sys.country,
            coord: locationData.coord,
            current: {
              temperature: Math.round(forecastData.current.temp),
              feelsLike: Math.round(forecastData.current.feels_like),
              icon: forecastData.current.weather[0].icon,
              tempDescription: forecastData.current.weather[0].description,
              windSpeed: Math.round(forecastData.current.wind_speed),
              windDegree: forecastData.current.wind_deg,
              chanceOfRain: forecastData.daily[0].pop * 100,
              humidity: forecastData.current.humidity,
              dateAndTime: new Date(),
              sunriseTime: forecastData.current.sunrise,
              sunsetTime: forecastData.current.sunset,
              clouds: forecastData.current.clouds,
              uvi: Math.round(forecastData.current.uvi),
              visibility: forecastData.current.visibility/1000,
              moonPhase: forecastData.daily[0].moon_phase,

            },
            daily: [],
            hourly: [],
        }
        for(let i =0; i<7; i += 1){
            processedData.daily[i] = {
                dayTemperature: forecastData.daily[i].temp.day,
                nightTemperature: forecastData.daily[i].temp.night,
                weatherId: forecastData.daily[i].weather[0].id,
                tempDescription: forecastData.daily[i].weather[0].description,
                windSpeed: forecastData.daily[i].wind_speed,
                windGust: forecastData.daily[i].wind_gust,
                windDegree: forecastData.daily[i].wind_deg,
            };
        }

        for(let j =0; j< 24; j+=1){
            processedData.hourly[j] ={
                temperature: forecastData.hourly[j].temp,
                weatherId: forecastData.hourly[j].weather[0].id,
                tempDescription: forecastData.hourly[j].weather[0].description,
                windSpeed: forecastData.hourly[j].wind_speed,
                windGust: forecastData.hourly[j].wind_gust,
                windDegree: forecastData.hourly[j].wind_deg,
            }
        }
        console.log(processedData)
        return processedData
    }

    async function getForecastData(locationData, units ='metric'){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=38982387bce58058b2661be97bbebcb5`, {mode: 'cors'},)
            const forecastData = await response.json()
            return getData({locationData,forecastData})
        }catch(error){
            return console.error(error)
        }
        
    }

    async function getLocData(query){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=38982387bce58058b2661be97bbebcb5`, {mode: 'cors'},)
            const locData = await response.json()
            
            if(response.status>400){
                console.log('Error', locData)
                return locData
            }
            return getForecastData(locData)
        }catch(error){
            return console.error(error)
        }
        
    }

    return {
        getLocData,
    }
})()

export default api