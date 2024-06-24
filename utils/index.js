import axios from 'axios';




export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: '0fd53c3af8e74f7b9d9191551242206',  // Replace with your actual WeatherAPI key
        q: `${latitude},${longitude}`,  // Use the latitude and longitude
        days: 7,
        
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getFormattedDateTime = (dateString) => {
  const date = new Date(dateString);

  // Get the day name
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  // Get the time in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  const time = `${hours}:${minutesStr} ${ampm}`;

  return {
    dayName,
    time
  };
};