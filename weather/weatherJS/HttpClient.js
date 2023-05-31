
// https://api.openweathermap.org/data/2.5/weather

// https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=c1ba56bf40bd4736029abb60f0b571f1&units=metric


// https://api.openweathermap.org/data/2.5/weather?lat=32.6572&lon=51.6776&appid=c1ba56bf40bd4736029abb60f0b571f1

class HttpClient{

  baseUrl = "";
  apiKey = "";
  constructor(baseUrl,apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  };

  async fetchDataByCityName(city) {

    try {
      const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
      if (!response.ok) throw new Error(`can not find ${city} 😵‍💫😵‍💫`);
      const data = await response.json();
      return data;
    }catch(error){
      console.log(error);
    }

    
  }

  async fetchDataByLatLon(lat, lan) {
    try {
      const response = await fetch(`${this.baseUrl}?lat=${lat}&lon=${lan}&appid=${this.apiKey}&units=metric`);
      if (!response.ok) throw new Error(`can not find lat:${lat} and lan:${lan}😑😑`);
      const data = await response.json();
      return data;
    }catch(error){
      console.log(error);
    }
  }


}
