// Hero.jsx
import React from 'react';
import { getFormattedDateTime } from '../utils';
import Chart from "./Chart"
import Forecast from "./Forecast"
import {Cloud} from "lucide-react"

const Hero = ({ loading, data, locationError }) => {
  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center"><Cloud className='h-[2rem] w-[2rem] animate-pulse'/></div>;
  }

  if (locationError) {
    return <div className='w-full h-screen flex items-center justify-center flex-col'> <h1 className='font-bold text-3xl  text-red-500'>Error</h1> <p className='text-sm text-gray-700 mt-'>{locationError} </p></div>;
  }

  if (!data || !data.location) {
    return null;
  }
  
  const { location, current,forecast } = data;
  const formattedDateTime = getFormattedDateTime(location.localtime);
  const hourlyData = forecast.forecastday[0].hour;

  return (
    <>
      <h1 className='mt-12 font-semibold  text-3xl text-gray-600 text-center'><span className='text-black'>{location.name}</span>.</h1>
    <div className="w-full max-sm:h-max flex items-center justify-center max-sm:flex-col mt-12 ">
      <div className='flex items-center justify-around w-full max-sm:flex-col'>
      
      
      <div className='flex items-center  max-sm:flex-col max-sm:justify-center '>
      
      <div className='flex max-sm:flex-col justify-center items-center gap-4 '>
      <img src={current.condition.icon} alt={current.condition.text}  />
      <p className='font-bold text-3xl text-gray-700'>{current.temp_c}<sup className='text-black'>°C</sup></p>
      </div>

      <div className='flex items-start justify-start max-sm:justify-center max-sm:items-center flex-col max-sm:mt-4 max-sm:ml-0 ml-4'>
      <p className='text-sm text-gray-700'>Condition: {current.condition.text}</p>
        <p className='text-sm text-gray-700'>Wind: {current.wind_kph}Km/h</p>
        <p className='text-sm text-gray-700'>Precipitation: {current.precip_mm} mm</p>
      </div>
        </div>
        <div className='flex items-center justify-center flex-col mt-12'>
          <h2 className='font-semibold text-2xl max-sm:text-lg'>Weather</h2>
          <h3 className='font-normal'> {formattedDateTime.dayName} {" "}{formattedDateTime.time} </h3>
          <h4>{current.condition.text}</h4>
         </div>
    </div>
        
        
        
      </div>
      
      <Chart hourlyData={hourlyData}/>
      <Forecast data={forecast}/>
      
      
      
      
      
    </>
  );
};

export default Hero;
