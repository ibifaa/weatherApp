const  apiKey = "cfd3380ecff9fc0bb78930c8c727104f";
let apiURL = "https://api.openweathermap.org/data/2.5/weather"


    function getWeatherApi(){
        let city = document.getElementId("city-name").value;
        
        if(city){
            const url =  `${apiURL}?q=${city}&appid=${apiKey}&units=metric`;
            fetch(url, {cache:'no-store'})
            .then(response => response.json())
            .then(data =>{
                displayWeather(data);
            })
    
            .catch(error =>{
                console.error('Error fetching weather data:', error);
            })
        } else{
            alert('Please enter a city')
        }

    }


function displayWeather(data){
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
        <p> ${data.main.temp}°C</p>
        <p> ${data.weather[0].description}</p>`;

    console.log(data)
    
}

