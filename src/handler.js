import dom from "./dom"
import api from "./api"

const handler =(()=>{
    const locationSubmit = document.querySelector('.location-submit')
    const locationInput = document.querySelector('.location-input')

    function clickHandler(){
        locationSubmit.addEventListener('click', async(e)=>{
            e.preventDefault()
            const weatherData = await api.getLocData(locationInput.value)
            dom.showForecast(weatherData)
        })
    }

    return{
        clickHandler,
    }
    
})()

export default handler