import api from "./api"

const dom = (()=>{
    //start
    function showForecast(query){
        api.getData(query).then((response)=>{
            console.log(response)
        })
    }

    return{
        showForecast,
    }
})()

export default dom