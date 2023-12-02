

function getWeather(city){
const  apiKey = `cfd3380ecff9fc0bb78930c8c727104f`;
let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

return new Promise((resolve, reject) => {
    fetch(apiURL)
        .then(response =>{
            if(!response.ok){
                throw new Error('HTTP error! Status: ${response.status}')
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error =>  reject(error));
});
}

document.getElementById("weather-form").addEventListener('submit', function (event){
    event.preventDefault();

    const cityInput = document.getElementById('city-name');
    const weatherResult = document.getElementById('weatherResult');
    const cityName = document.getElementById("city");
    const temp = document.getElementById("temperature");
    const descriptionDetails = document.getElementById("description");
    const country=document.getElementById("country")
    

    function displayWeatherIcon(iconCode) {
        const icon = document.getElementById("weatherIcon");
    
  const defaultIconCode = '<img src="images/Sun cloud angled rain.png" alt="">'; // Example default icon code, change it as needed
  const defaultIconUrl = `http://openweathermap.org/img/wn/${defaultIconCode}.png`;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  icon.innerHTML = `<img src="${iconCode ? iconUrl : defaultIconUrl}" alt="Weather Icon">`;
}



    const city = cityInput.value;

    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2);
      }

    if(city){
        getWeather(city)
            .then(data => {
                cityName.innerHTML = data.name;
                const weatherDescription = data.weather[0].description;
                descriptionDetails.innerHTML = `${weatherDescription}`;
                country.innerHTML = data.sys.country;
                const tempValue = data.main.temp; 
                temp.innerHTML = `${kelvinToCelsius(tempValue)} \u2103`;
                console.log(data)

                const iconCode = data.weather[0].icon;
                displayWeatherIcon(iconCode);

     

            })
            .catch(error => {
                weatherResult.innerHTML = `Error fetching weather: ${error.message}`;
            })
        } else {
            weatherResult.innerHTML = 'Please enter a city.';
        }
    
})

