import dom from "./dom"
import api from "./api"

const handler =(()=>{
    const locationInput = document.querySelector('.location-input')
    const topNav = document.querySelector('.navi')
    
    async function load(input = 'Amsterdam', units='metric'){
        dom.loading('loading')
        const weatherData = await api.getLocData(input, units)
        dom.renderApp(weatherData)
        dom.loading('finished')
    }

    function clickHandler(){
        let input
        let units
        topNav.addEventListener('click', async(e)=>{
            if(e.target.parentElement.classList.contains('submit') || e.target.classList.contains('submit')){
                e.preventDefault()
                input = locationInput.value
                load(input, units);
            }
            else if(e.target.classList.contains('units-metric')){
                units = 'metric'
                load(input, units)
            }
            else if(e.target.classList.contains('units-imperial')){
                units = 'imperial'
                load(input, units)
            }
        })
    }

    return{
        clickHandler,
        load,
    }
    
})()

export default handler