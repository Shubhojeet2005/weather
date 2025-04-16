import React, { useState } from 'react';
import { FaSearch, FaSmile } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import axios from 'axios';

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "d16bfd9c56ee1e2a7bcd67175ca788f6";

  const fetchWeather = async () => {
    if (!search) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );
      setWeatherData({
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        weatherIcon: data.weather[0].icon,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
      });
    } catch (err) {
      setError("City not found. Please try another location.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const getWeatherDescription = (desc) => {
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-4'>
      <div className='w-full max-w-md'>
        {/* Friendly greeting */}
        <div className='mb-6 text-white text-center'>
          <h1 className='text-2xl font-medium'>Weather Forecast <FaSmile className='inline ml-1' /></h1>
          <p className='opacity-90'>Check current weather conditions</p>
        </div>

        {/* Search Bar */}
        <div className='relative flex items-center mb-8'>
          <input
            type="text"
            placeholder="Enter city name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full py-3 px-5 pr-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg'
            disabled={loading}
          />
          <FaSearch
            onClick={fetchWeather}
            className={`absolute right-5 text-white text-xl cursor-pointer hover:scale-110 transform transition ${loading ? 'animate-pulse' : ''}`}
          />
        </div>

        {loading && (
          <div className='text-center text-white mb-8'>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className='bg-red-500 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center text-white mb-8'>
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <div className='bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden'>
            {/* Weather Icon */}
            <div className='flex justify-center -mt-20 mb-4'>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
                alt='weather icon'
                className='w-40 h-40 object-contain'
              />
            </div>

            {/* Temperature and Location */}
            <div className='text-center mb-6'>
              <h1 className='text-7xl font-bold mb-2'>{weatherData.temp}°C</h1>
              <h2 className='text-2xl font-semibold'>
                {weatherData.city}, {weatherData.country}
              </h2>
              <p className='text-lg opacity-90 mt-1'>
                {getWeatherDescription(weatherData.description)}
              </p>
              <p className='text-sm opacity-80 mt-2'>
                Feels like {weatherData.feelsLike}°C
              </p>
            </div>

            {/* Weather Details */}
            <div className='flex justify-between mt-6 border-t border-white border-opacity-30 pt-6'>
              <div className='flex flex-col items-center px-2'>
                <WiHumidity className='text-4xl mb-1' />
                <p className='text-sm opacity-80'>Humidity</p>
                <p className='font-semibold'>{weatherData.humidity}%</p>
              </div>
              <div className='flex flex-col items-center px-2'>
                <WiStrongWind className='text-4xl mb-1' />
                <p className='text-sm opacity-80'>Wind</p>
                <p className='font-semibold'>{weatherData.windSpeed} km/h</p>
              </div>
              <div className='flex flex-col items-center px-2'>
                <WiDaySunny className='text-4xl mb-1' />
                <p className='text-sm opacity-80'>Conditions</p>
                <p className='font-semibold text-xs text-center'>
                  {getWeatherDescription(weatherData.description)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className='mt-8 text-center text-white text-opacity-70 text-sm'>
          <p>{new Date().toLocaleString()} • Data from OpenWeather</p>
        </div>
      </div>
    </div>
  );
}