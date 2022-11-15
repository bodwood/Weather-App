import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css'

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  //add ${OR}, ${US} to URL above

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if(this.status === 200){
      printElements(response, city);
    }else{
      printError(this, city);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, city){
  document.getElementById('showResponse').innerHTML = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`;
}

function printElements(apiResponse, city) {
  document.getElementById('showResponse').innerHTML = `The humidity in ${city} is ${apiResponse.main.humidity}%. The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.getElementById('location').value;
  document.getElementById('location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.getElementById('form').addEventListener("submit", handleFormSubmission);
})
