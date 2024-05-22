import { useEffect, useState } from "react";
import { Weather } from "../components/weather";

const API_KEY = "6e2379b39d17fd2e54d1c3aa0e68d1b0";
const CITY = "Tyumen";
const FORECAST_COUNT = 4;

export default function HomePage() {
  const [currentWeather, setCurrentWeather] = useState({
    temp: undefined,
    iconID: undefined,
    weather: undefined,
    feelsLike: undefined,
  });

  const [forecast, setForecast] = useState([]);

  const getCurrentWeather = async () => {
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=ru`
    );
    const data = await api_url.json();

    setCurrentWeather((_weatherState) => {
      return {
        ..._weatherState,
        temp: Math.round(data.main.temp),
        iconID: data.weather[0].icon,
        weather: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
      };
    });
  };

  const getForecast = async () => {
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&cnt=${FORECAST_COUNT}&units=metric&lang=ru`
    );
    const data = await api_url.json();
    setForecast((_forecast) => {
      let forecastTemp = [];
      for (let i = 0; i < data.list.length; i++) {
        const timeString = getTime(data.list[i].dt);
        forecastTemp.push({
          iconID: data.list[i].weather[0].icon,
          temp: Math.round(data.list[i].main.temp),
          dateTime: timeString,
        });
      }
      return forecastTemp;
    });
  };

  useState(() => {
    getCurrentWeather();
    getForecast();
  }, []);

  return (
    <div className="flex align-middle h-screen bg-slate-950">
      <Weather
        dateTime={currentWeather.dateTime}
        temp={currentWeather.temp}
        iconID={currentWeather.iconID}
        weather={currentWeather.weather}
        feelsLike={currentWeather.feelsLike}
        forecast={forecast}
      />
    </div>
  );
}

function getTime(unixDate) {
  var date = new Date(unixDate * 1000);
  let timeString =
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0");
  return timeString;
}
