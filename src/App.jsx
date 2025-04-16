import React from 'react'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
export default function App() {
  return (
   <div>
    <div>
      <input type="text" placeholder="Enter your location" />
      <FaSearch />
    </div>
    <div>
      <img src='https://www.weatherbit.io/static/img/icons/c01d.png' alt='weather icon' />
      <h1>40°C</h1>
      <h2>kolkata</h2>
    </div>
   </div>
  )
}

