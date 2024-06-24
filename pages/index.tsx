import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { fetchWeatherData } from "../utils";

const Home = () => {
  const [data, setData] = useState({ weather: null, location: null });
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getWeatherData = async (location) => {
      try {
        const data = await fetchWeatherData(location);
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherData(`${latitude},${longitude}`);
    };

    const handleError = (error) => {
      console.error(error);
      setLocationError(error.message);
      setLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocationError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setLocationError(null);
    fetchWeatherData(searchQuery).then(data => {
      setData(data);
      setLoading(false);
      console.log(data)
    }).catch(err => {
      console.log(err);
      setLocationError(err.message);
      setLoading(false);
    });
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Hero loading={loading} data={data} locationError={locationError} />
    </>
  );
};

export default Home;
