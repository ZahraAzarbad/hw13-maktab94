// http://openweathermap.org/img/w/02d.png

const searchBox = document.querySelector(".search-city-wrapper");
const weatherBox = document.querySelector(".state-city-wrapper");
const searchInput = document.getElementById("searchInput");
const getLocation = document.getElementById("getLocation");
const weatherIcon = document.getElementById("weather-icon");
const backBtn = document.getElementById("backToSearch");
const description = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const cityLocation = document.getElementById("city-location");
const totalTemp = document.getElementById("total-temp");

const request = new HttpClient("https://api.openweathermap.org/data/2.5/weather", "c1ba56bf40bd4736029abb60f0b571f1");

searchInput.addEventListener("keyup", (e) => {
  
  if (e.code == "Enter") {
    
    request.fetchDataByCityName(searchInput.value).then(weather => {
      console.log(weather);
      weatherBox.classList.remove("hidden");
      searchBox.classList.add("hidden");
      insetDataToBox(weather)

    }).catch(error => {
      console.log(error);
    });

    

  }
});



backBtn.addEventListener("click", () => {
  weatherBox.classList.add("hidden");
  searchBox.classList.remove("hidden");
  searchInput.value= ""
})



getLocation.addEventListener("click", () => {
  const loc = getLatLan();
  console.log(loc);
  request.fetchDataByLatLon(loc.lat,loc.lan).then(weather => {
    console.log(weather);
    weatherBox.classList.remove("hidden");
    searchBox.classList.add("hidden");
    insetDataToBox(weather)

  }).catch(error => {
    console.log(error);
  });
 


})



function getLatLan() {
  let lat ;
  let lan ;
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lan = position.coords.longitude;
    console.log(`lat:${lat} , lan :${lan}`);
  },(error) => {
    // Handle errors, e.g. user denied location sharing permissions
    console.error("Error getting user location:", error);
  });

  return {
    lat: lat,
    lan:lan
  }

}

function insetDataToBox(data) {
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  description.textContent = data.weather[0].description;
  feelsLike.textContent = parseInt(data.main.feels_like).toFixed(0);
  humidity.textContent = `${data.main.humidity}%`;
  cityLocation.textContent = data.name;
  totalTemp.textContent = parseInt(data.main.temp).toFixed(0);

}

// request.fetchDataByLatLon("32.6572","51.6776").then(weather => {
//   console.log(weather);
// }).catch(error => {
//   console.log(error);
// });