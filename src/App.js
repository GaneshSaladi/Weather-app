import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("visakhapatnam");


  useEffect(() => {
    defaultLocation()
  }, [])
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c430b1b1cfd0659d5b3c3a563202745e`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        // console.log(data);
      });
      setLocation("");
    }
  };

  const defaultLocation =()=>{
    axios.get(url).then((response) => {
      setData(response.data);
      // console.log(data);
    });
    setLocation("");
  }

  return (
    <>
      <div className="container-fluid">
      <div className="row">
      <div className="app">
        <div className="search justify-content-center">
          <input
            placeholder="Enter Location"
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            value={location}
            type="text"
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
            </div>
            {/* <div>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div> */}
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                <p>feels like</p>
                {data.main ? (
                  <p className="bold">{data.main.feels_like}°C</p>
                ) : null}
              </div>
              <div className="humidity">
                <p>humidity</p>
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
              </div>
              <div className="wind">
                <p>Wind Speed</p>
                {data.wind ? (
                  <p className="bold">{data.wind.speed}MPH</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default App;