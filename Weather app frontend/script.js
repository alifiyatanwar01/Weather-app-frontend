console.log("JS connected");

const apiKey = "28752d750bde40b6b0c140802252812";

const button = document.getElementById("getWeather");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

button.addEventListener("click", () => {
  const city = input.value.trim();

  if (city === "") {
    result.innerHTML = "❌ Enter a city name";
    return;
  }

  result.innerHTML = "⏳ Loading...";

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        result.innerHTML = "❌ City not found";
        return;
      }
if (data.error) {
  result.innerHTML = "❌ City not found";
  return;
}

const condition = data.current.condition.text.toLowerCase();

// 🌤️ CHANGE BACKGROUND BASED ON WEATHER
if (condition.includes("sun") || condition.includes("clear")) {
  document.body.style.backgroundImage = "url('./assets/clear.jpg')";
} else if (condition.includes("cloud")) {
  document.body.style.backgroundImage = "url('./assets/clouds.jpg')";
} else if (condition.includes("rain")) {
  document.body.style.backgroundImage = "url('./assets/rain.jpg')";
} else if (condition.includes("snow")) {
  document.body.style.backgroundImage = "url('./assets/snow.jpg')";
} else {
  document.body.style.backgroundImage = "url('./assets/mist.jpg')";
}

result.innerHTML = `
  <h3>${data.location.name}, ${data.location.country}</h3>
  <img src="https:${data.current.condition.icon}">
  <p>${data.current.temp_c} °C</p>
  <p>${data.current.condition.text}</p>
`;

    
    })
    .catch(() => {
      result.innerHTML = "❌ Something went wrong";
    });
});

