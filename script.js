let latitude, longitude
const locationName = document.getElementById("locationName")
const icon = document.getElementById("icon")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")
const minTemperature = document.getElementById("minTemperature")
const maxTemperature = document.getElementById("maxTemperatuer")
const windSpeed = document.getElementById("wind-speed")



async function main() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {

            latitude = position.coords.latitude
            longitude = position.coords.longitude;
            let data = await getWeatherData(latitude, longitude)
            var map = L.map('map').setView([latitude, longitude], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var marker = L.marker([latitude, longitude]).addTo(map);

            marker.bindPopup(data.name).openPopup();
            map.on('click', async (e) => {
                const data = await getWeatherData(e.latlng.lat, e.latlng.lng)
                handleData(data)
                marker.setLatLng([e.latlng.lat, e.latlng.lng])
                marker.blindPopup(data.name).openPopup()
            })

            handleData(data)
        })
    }
    
}

const getWeatherData = async (latitude, longitude) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=51bc56e4ad1ad5e80b2d8667e281aaae`
    let response = await fetch(api)
    let data = await response.json()
    console.log(data)
    return data
}

const handleData = async (data) => {


    locationName.innerHTML = data.name
    description.innerHTML = data.weather[0].description
    temperature.innerHTML = data.main.temp
    minTemperature.innerHTML = `Min Temperature: ${data.main.temp_min}`
    maxTemperature.innerHTML = `Max Temperature: ${data.main.temp_max}`
    console.log(data.main.temp_max)
    windSpeed.innerHTML = `Wind Speed: ${data.wind.speed}`

}

function setIconFunction(icon) {
 
    const icons = {
        "01d": "./animated/day.svg",
        "02d": "./animated/cloudy-day-1.svg",
        "03d": "./animated/cloudy-day-2.svg",
        "04d": "./animated/cloudy-day-3.svg",
        "09d": "./animated/rainy-1.svg",
        "10d": "./animated/rainy-2.svg",
        "11d": "./animated/rainy-3.svg",
        "13d": "./animated/snowy-6.svg",
        "50d": "./animated/mist.svg",
        "01n": "./animated/night.svg",
        "02n": "./animated/cloudy-night-1.svg",
        "03n": "./animated/cloudy-night-2.svg",
        "04n": "./animated/cloudy-night-3.svg",
        "09n": "./animated/rainy-1.svg",
        "10n": "./animated/rainy-2.svg",
        "11n": "./animated/rainy-3.svg",
        "13n": "./animated/snowy-6.svg",
        "50n": "./animated/mist.svg"
    };
 
    return icons[icon];
}

main()
    .then(() => console.log("success"))
    .catch((error) => {
        console.log(error)
    })
