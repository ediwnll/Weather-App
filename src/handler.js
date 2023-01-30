import dom from "./dom"

const handler =(()=>{
    const locationSubmit = document.querySelector('.location-submit')
    const locationInput = document.querySelector('.location-input')

    function clickHandler(){
        locationSubmit.addEventListener('click',()=>{
            console.log(locationInput.value)
            dom.showForecast(locationInput.value)
        })
    }

    return{
        clickHandler,
    }
    
})()

export default handler