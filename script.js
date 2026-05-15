console.log("JS connected");

const apiKey = "28752d750bde40b6b0c140802252812";

const button = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");
const countryInput = document.getElementById("countryInput");
const result = document.getElementById("weatherResult");

button.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

countryInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = cityInput.value.trim();
  const country = countryInput.value.trim();

  if (city === "") {
    result.innerHTML = `<p class="empty-text">❌ Enter a city name</p>`;
    return;
  }

  const searchQuery = country === "" ? city : `${city},${country}`;

  result.innerHTML = `<p class="empty-text">⏳ Fetching weather...</p>`;

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.error) {
        result.innerHTML = `<p class="empty-text">❌ Location not found. Try city + country.</p>`;
        return;
      }

      const condition = data.current.condition.text.toLowerCase();

      if (condition.includes("sun") || condition.includes("clear")) {
        document.body.style.backgroundImage = "url('assets/clear.jpg')";
      } else if (condition.includes("cloud") || condition.includes("overcast")) {
        document.body.style.backgroundImage = "url('assets/clouds.jpg')";
      } else if (
        condition.includes("rain") ||
        condition.includes("drizzle") ||
        condition.includes("shower")
      ) {
        document.body.style.backgroundImage = "url('assets/rain.jpg')";
      } else if (condition.includes("snow") || condition.includes("sleet")) {
        document.body.style.backgroundImage = "url('assets/snow.jpg')";
      } else if (
        condition.includes("mist") ||
        condition.includes("fog") ||
        condition.includes("haze")
      ) {
        document.body.style.backgroundImage = "url('assets/mist.jpg')";
      } else {
        document.body.style.backgroundImage = "url('assets/bg.jpg')";
      }

      result.innerHTML = `
        <h3>${data.location.name}, ${data.location.country}</h3>
        <img src="https:${data.current.condition.icon}" alt="Weather icon">
        <p class="temperature">${data.current.temp_c} °C</p>
        <p>${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} km/h</p>
      `;
    })
    .catch(() => {
      result.innerHTML = `<p class="empty-text">❌ Something went wrong. Please try again.</p>`;
    });
}
