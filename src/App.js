import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import cloudeSky from "./utils/cloudyafternoon.jpg";
import clearSky from "./utils/clearsky.jpg";
import rainSky from "./utils/rainsky.jpg";
import {
  BsSun,
  BsFillCloudSunFill,
  BsFillCloudSleetFill,
} from "react-icons/bs";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();

  const url = `446b1001cea52469f7ca74f028b594b6`;

  const getLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${url}`
        )
        .then((response) => {
          setData(response);
          console.log(data);
        });
      setWeather(data.data.weather[0].main);
      console.log(weather);
    }
  };

  const dataCheck = data.data === undefined;
  return (
    <div
      className="flex flex-col items-center  "
      style={{
        backgroundImage: `url(${
          weather === "Clear"
            ? clearSky
            : weather === "Rain"
            ? rainSky
            : weather === "Clouds"
            ? cloudeSky
            : rainSky
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className=" flex items-center justify-center mt-5 w-[30%] h-[2rem] rounded-[15px] bg-sky-500/[.6] focus:outline-none">
        <input
          className="     w-[90%] h-[2rem] rounded-[15px] bg-sky-500/[.01] focus:outline-none"
          placeholder="           Search your location"
          onKeyPress={getLocation}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          type="text"
        />
      </div>
      <h1>{dataCheck ? "No Location Found" : data.data.name} </h1>

      <div className="flex flex-col items-center justify-center h-[100vh] ">
        <h1 className="text-[5rem]">
          {dataCheck ? "00 " : data.data.main.temp}℃
        </h1>
        <div className="flex flex-row gap-3">
          <h1 className="text-[1.2rem]">{dataCheck ? "No Data " : weather}</h1>
          <p className="items-center flex justify-center">
            {dataCheck ? null : weather === "Clear" ? (
              <BsSun />
            ) : weather === "Clouds" ? (
              <BsFillCloudSunFill />
            ) : weather === "Rain" ? (
              <BsFillCloudSleetFill />
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
