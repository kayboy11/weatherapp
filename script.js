const apiKey = "6b10e128870d434eb47111441262303";
function getWeather(){
const city = document.getElementById("city").value.trim();
const weatherDiv = document.getElementById("weatherResult");
const errorDiv = document.getElementById("errorMsg");

weatherDiv.style.display = "none";
errorDiv.style.display = "none";

if(!city) {
    errorDiv.innerText = "Please enter a city name";
    errorDiv.style.display = "block";
    return;
}

fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
.then(res => res.json())
.then(data => {
    if(data.error){
        errorDiv.innerText = data.error.message;
        errorDiv.style.display = "block";
        return;
    }
    const w = data.current;
    const weatherHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p class="field">Last Updated: ${w.last_updated}</p>
    <p class="field"><img src="https:${w.condition.icon}" alt="icon">${w.condition.text}</p>
    <p class="field">Temperature: ${w.temp_c}°C</p>
    <p class="field">Feels like: ${w.feelslike_c}°C</p>
    <p class="field">Gust speed: ${w.gust_kph} kph</p>
    <p class="field">Heat index: ${w.heatindex_c}°C</p>
    <p class="field">Humidity: ${w.humidity}%</p>
    <p class="field">Precipitation: ${w.precip_in}in</p>
    <p class="field">Pressure: ${w.pressure_in} in</p>
    <p class="field">Wind degree: ${w.wind_degree}°</p>
    <p class="field">Wind direction: ${w.wind_dir}</p>
    <p class="field">Wind speed: ${w.wind_kph} kph</p>
    <p class="field">Wind chill: ${w.windchill_c}°C</p>
    `;

    weatherDiv.innerHTML = weatherHTML;
    weatherDiv.style.display = "block";
})
.catch(err => {
    errorDiv.innerText = "Error fetching weather. Try again";
    errorDiv.style.display = "block";
    console.log(err);
});
}
    