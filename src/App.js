import {useState} from 'react';

const api = {
  key: process.env.REACT_APP_WEATHER,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result =>{ 
          setWeather(result)
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; // Giving us a number  0 - 6
    let date = d.getDate();     // Giving us a date
    let month = months[d.getMonth()]; // Giving us a number between 0 - 11
    let year = d.getFullYear();       // Giving the full year!

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
       ? 
       ((weather.main.temp > 50) 
       ? 'app warm' : 'app cold') 
      : 'app cold'}
       >
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder='Enter City, Country'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div className="cent">
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
