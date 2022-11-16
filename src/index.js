import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css'

function getWeather(city, state) {
  let request = new XMLHttpRequest();
  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${process.env.API_KEY}`;

  //add ${OR}, ${US} to URL above

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if(this.status === 200){
      printElements(response, city);
    }else{
      printError(this, response, city);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, city){
  document.getElementById('showResponse').innerHTML = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}


function printElements(apiResponse, city) {
  const fahrenheit = parseFloat((apiResponse.main.temp - 273.15) * (9/5) + 32).toFixed(1);
  const description = apiResponse.weather[0].description;
  document.getElementById('showResponse').innerHTML = `${city} weather: <br>  
          - Description: ${description} <br>
          - Temperature: ${fahrenheit}\u00B0F <br>
          - Humidity: ${apiResponse.main.humidity}% <br>
          - Wind Speed: ${apiResponse.wind.speed}mph <br> `;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  document.getElementById('city').value = null;
  document.getElementById('state').value = null;

  getWeather(city, state);
}

window.addEventListener("load", function() {
  document.getElementById('form').addEventListener("submit", handleFormSubmission);
})
