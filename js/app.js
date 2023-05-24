let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturaday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let today = document.querySelector("#default-time");
today.innerHTML = `${day} ${hour}:${minutes}`;

function getCity(event) {
  event.preventDefault();

  let city = document.querySelector("#searched-city");
  let displayCity = city.value;

  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${displayCity}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showTemp);
}
function showTemp(response) {
  let currentCity = document.querySelector("#default-city");
  currentCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector(".city-temp");
  cityTemp.innerHTML = `${temperature}°`;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
  let city = document.querySelector("#searched-city");
  city.value = "";
}

let currentBtn = document.querySelector(".current-location");
currentBtn.addEventListener("click", showPosition);

let form = document.querySelector("form");
form.addEventListener("submit", getCity);

function convertTemp() {
  let unit = document.querySelectorAll("#unit");
  let curTemp = document.querySelectorAll("#temp");

  for (let x = 0; x < curTemp.length; x++) {
    let tempUnit = unit[x].innerHTML;
    let temp = parseInt(curTemp[x].innerHTML);

    if (tempUnit === "C") {
      let fahTemp = Math.round((temp * 9) / 5 + 32);
      unit[x].innerHTML = "F";
      curTemp[x].innerHTML = `${fahTemp}°`;
      fahLink.innerHTML = "Convert to Celsius";
    } else if (tempUnit === "F") {
      let cenTemp = Math.round(((temp - 32) * 5) / 9);
      curTemp[x].innerHTML = `${cenTemp}°`;
      unit[x].innerHTML = "C";
      fahLink.innerHTML = "Convert to Fahrenheit";
    }
  }
}

let fahLink = document.querySelector("#fahrenheit-link");
fahLink.addEventListener("click", convertTemp);
