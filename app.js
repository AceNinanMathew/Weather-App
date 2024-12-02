function getWeatherData(){
    const cityName = document.getElementById("myInput").value;
    if(cityName){
        fetchWeatherData(cityName);
    }
    else{
        alert("Enter a valid city!")
    }
}

async function fetchWeatherData(city){
    const api_key = '0a930ee91db49bfd351e686df05556d6'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        if(response.ok) {
            // Get the data from the API response
            const weatherDescription = data.weather[0].description;
            const temp = data.main.temp - 273.15; // Convert Kelvin to Celsius
            const feelsLike = data.main.feels_like - 273.15;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const rainVolume = data.rain ? data.rain["1h"] : 0;
            const cloudiness = data.clouds.all;
            const country = data.sys.country;
            const cityName = data.name;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // Set the innerHTML to display the data
            display.innerHTML = `
            <div class="row mt-2">
                <div class="col-12 text-center mb-4">
                    <h2>${cityName}, ${country}, ${new Date().toLocaleString()}</h2>
                </div>
                <div class="col-12 col-md-10 offset-md-1 pt-2 px-3 pb-4 all-content">
                    <div class="row mt-3">
                    
                        <!-- Wind and Rain Section -->
                        <div class="col-12 col-md-3 mt-4 text-center card py-4 content d-flex align-items-center justify-content-center ms-5">
                            <h4>Wind and Rain</h4>
                            <h6>Wind Speed: ${windSpeed} m/s</h6>
                            <h6>Rain Volume: ${rainVolume} mm</h6>
                        </div>
                        <div class="col-md-1"></div>
                        <!-- Weather Section -->
                        <div class="col-12 col-md-3 mt-4 text-center card py-4 d-flex align-items-center justify-content-center content">
                            <h4>Weather Card</h4>
                            <div class="text-center my-2">
                                <img class="img-fluid img-thumbnail w-50" src="${iconUrl}" alt="Weather Icon">
                            </div>
                            <p>Main Weather: ${weatherDescription}</p>
                            <h6>Current Temperature: ${temp.toFixed(1)}°C</h6>
                            <h6>Feels Like: ${feelsLike.toFixed(1)}°C</h6>
                            <h6>Humidity: ${humidity}%, 
                             Pressure: ${data.main.pressure}, 
                             hPa  Visibility: ${data.visibility / 1000} km</h6>
                        </div>
                        <div class="col-md-1"></div>
                        <!-- Additional Details Section -->
                        <div class="col-12 col-md-3 mt-4 text-center card py-4 d-flex align-items-center justify-content-center content">
                            <h4>Additional Details</h4>
                            <h6>Sunrise: ${sunrise}</h6>
                            <h6>Sunset: ${sunset}</h6>
                            <h6>Min/Max Temperature: ${(data.main.temp_min - 273.15).toFixed(2)}°C / ${(data.main.temp_max - 273.15).toFixed(2)}°C</h6>
                            <h6>Cloudiness: ${cloudiness}%</h6>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>
            </div>
        `;
        
        }
    } catch(err) {
        console.log(err);
        alert("Failed to fetch weather data. Please try again later.");
    }
}

