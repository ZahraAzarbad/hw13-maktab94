//;ocal storage information of user
const localInformation = localStorage.getItem("user") || "[]";
const member = JSON.parse(localInformation);
if (member.length == 0) {
  window.location = "http://127.0.0.1:5500/EnterPage/index.html";
}

//inputs from dom
const searchBox = document.querySelector(".search-city-wrapper");
const weatherBox = document.querySelector(".state-city-wrapper");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search");
const getLocation = document.getElementById("getLocation");
const weatherIcon = document.getElementById("weather-icon");
const backBtn = document.getElementById("backToSearch");
const description = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");
const logoutBtn = document.getElementById("log-out");

const humidity = document.getElementById("humidity");
const cityLocation = document.getElementById("city-location");
const totalTemp = document.getElementById("total-temp");
const history = document.querySelector(".history");

const request = new HttpClient(
  "https://api.openweathermap.org/data/2.5/weather",
  "f7d079650ea470d4ad1e6b44cac6a20e"
);

//tap to search the city weather
searchInput.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    request
      .fetchDataByCityName(searchInput.value)
      .then((weather) => {
        console.log(weather);
        weatherBox.classList.remove("hidden");
        searchBox.classList.add("hidden");
        insetDataToBox(weather);
        const citiesList = localStorage.getItem("cities") || "[]";
        let listOfCities = JSON.parse(citiesList);
        listOfCities.push(searchInput.value);
        const filterCities = new Set(listOfCities);
        listOfCities = [...filterCities];
        localStorage.setItem("cities", JSON.stringify(listOfCities));
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

searchBtn.addEventListener("click", (e) => {
  request
    .fetchDataByCityName(searchInput.value)
    .then((weather) => {
      console.log(weather);
      weatherBox.classList.remove("hidden");
      searchBox.classList.add("hidden");
      insetDataToBox(weather);
      const citiesList = localStorage.getItem("cities") || "[]";
      let listOfCities = JSON.parse(citiesList);
      listOfCities.push(searchInput.value);
      const filterCities = new Set(listOfCities);
      listOfCities = [...filterCities];
      localStorage.setItem("cities", JSON.stringify(listOfCities));
    })
    .catch((error) => {
      console.log(error);
    });
});

//back to choose city page
backBtn.addEventListener("click", () => {
  weatherBox.classList.add("hidden");
  searchBox.classList.remove("hidden");
  searchInput.value = "";
});

//get the city's weather information from API
function insetDataToBox(data) {
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  description.textContent = data.weather[0].description;
  feelsLike.textContent = parseInt(data.main.feels_like).toFixed(0);
  humidity.textContent = `${data.main.humidity}%`;
  cityLocation.textContent = data.name;
  totalTemp.textContent = parseInt(data.main.temp).toFixed(0);
}

//search history from input of city name
function searchHistory() {
  const citiesList = localStorage.getItem("cities") || "[]";
  const listOfCities = JSON.parse(citiesList);
  const clearHistoryHtml = `<button onclick="clearhistoryBtn(this)" class="w-full bg-red-500 text-white">clear history</button>`;
  let html = "";
  listOfCities.reverse().forEach((city, index) => {
    if (index > 5) return;
    html += `<div class="history-card flex gap-5 justify-between">
    <p>${city}</p>
    <button onclick="clearHistoryBtn(this)" class="text-red-500 text-xl px-1">x</button>
    </div> `;
  });

  history.innerHTML = html;
}
searchInput.addEventListener("mousedown", () => {
  history.classList.remove("hidden");
  searchHistory();
});

//the btn for clear history in input of city name
window.clearHistoryBtn = (e) => {
  const clearBtn = e.closest(".history-card");
  clearBtn.addEventListener("click", () => {
    localStorage.setItem("cities", JSON.stringify([]));
  });
};

//click on page for close search history
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("searchInput")) {
    history.classList.add("hidden");
  }
});

//log out btn action
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location = "http://127.0.0.1:5500/EnterPage/index.html";
});
