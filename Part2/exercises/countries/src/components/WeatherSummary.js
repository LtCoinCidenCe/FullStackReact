import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css';

const WeatherSummary = ({ capital }) =>
{
  const [weather, setWeather] = useState({});
  const hook = () =>
  {
    const eventHandler = (response) =>
    {
      setWeather(response.data);
    }
    const api_key = process.env.REACT_APP_API_KEY;
    const url = new URL(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`);
    console.log(url);
    const promise = axios.get(url);
    promise.then(eventHandler);
  }

  useEffect(hook, [capital]);
  // don't actually know why but according to the hook document it seems that
  // including capital in the array is required to disable the warming

  console.log(weather);

  // stupid type check
  if (weather.hasOwnProperty('current'))
  {
    if (weather.current.hasOwnProperty('temperature'))
    {
      if (weather.current.hasOwnProperty('weather_icons'))
      {
        if (weather.current.hasOwnProperty('weather_descriptions'))
        {
          if (Array.isArray(weather.current.weather_descriptions))
          {
            if (weather.current.hasOwnProperty('wind_speed'))
            {
              if (weather.current.hasOwnProperty('wind_dir'))
              {
                // extract values
                const celcius = weather.current.temperature;
                const descriptions = weather.current.weather_descriptions.join(' ');
                const icons = weather.current.weather_icons;
                const wind = `${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`;

                return <div><h3>Weather in {capital}</h3>
                  <div><span className='style2'>temperature: </span><span>{celcius} Celcius</span></div>
                  <img src={icons} alt={descriptions} />
                  <div><span className='style2'>wind: </span><span>{wind}</span></div>
                </div>
              }
            }
          }
        }
      }
    }
  }
  else
  {
    return <div><h3>Weather in {capital}</h3><span>loading...</span></div>
  }
  // please do not...
  return <div><h3>Weather in {capital}</h3><span>error...</span></div>
}

export default WeatherSummary;
