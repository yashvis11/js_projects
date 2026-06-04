document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById("city-input");
    const weatherButton = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");

    const error = document.getElementById("error-message");
    const API_KEY = process.env.MY_SECRET_API_KEY;
    weatherButton.addEventListener('click', async function(){
        let city = cityInput.value.trim();
        if(city ==="") return;
        /*Notes on servers: 1. It may throw some error not necessarily respond immediately
        2. Server/database will be in another continent so it will take some time */
        try{
            //server will take some time so function should have async await
            const weatherData = await fetchWeatherData(city);
            // console.log("Weather data",weatherData); 
            displayWeatherData(weatherData);
        }
        catch(error){
            showError();
        }
    })
    
    async function fetchWeatherData(city){
      //fetchWeatherData
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City not found`);
      }
      /*fetch gives you the metadata about the data but the actual body of the weather data is still
      arriving in packets. Using response.json the code tells the browser to keep downloading the weather
      packets and glue them together as json but as this takes time response.json() has await*/
      
    const data = await response.json();
    return data;

    }

    function displayWeatherData(data){
      //displayWeatherData

      //before diaplaying the content we need to remove the hidden class from weatherInfo
      weatherInfo.classList.remove("hidden");

      /*we need the name, temp and description
        we can get that by studying the data using the Inspect tool*/
      cityName.textContent = `Name: ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp}`;
      description.textContent = `Description: ${data.weather[0].description}`;
    }

    function showError(){
        //to show only the error we toggle the hidden class of the weather info on and toggle the hidden
        //class of the error off
        weatherInfo.classList.add('hidden');
        error.classList.remove('hidden'); 
    }

})