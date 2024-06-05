import "./App.css";
import React, { useEffect, useState } from "react";
// import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
const[shouldfetch,setshouldfetch] =useState(false);
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=866e377621665d57a5fc2958f9b9fa7e`;

  // const searchLocation=(event)=>{
  //   if(event.key ==='Enter'){
  //     axios(url).then((response)=>{
  //       setData(response.data)
  //       console.log(response.data)
  //     })
  //   }

  const fetchAPI = async (url) => {

    try {
  
      const res = await fetch(url)
        // body: JSON.stringify(url)
      
    
     const data = await res.json();
    setData(data)
  
    } catch (e) {

      console.error(e);
    }
  };

  useEffect(() => {
    if(shouldfetch && location){
      fetchAPI(API);
      setshouldfetch(false);
    }
  
  }, [API,shouldfetch,location]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setshouldfetch(true);


  }




  return (
    <>
      <div className="app">
        <div className="search">
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={location}
           
            placeholder="Enter Location"
          onChange={(e)=>setLocation(e.target.value)}
          />
          <button type="submit">Submit</button>

          </form>
        
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              <p style={{ fontSize: "50px" }}>
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </p>
            </div>
          </div>
          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                <p className="bold">
                  {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
                </p>
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">
                  {data.main ? <p>{data.main.humidity}%</p> : null}
                </p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className="bold">
                  {data.main ? <p>{data.wind.speed.toFixed()}MPH</p> : null}
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
