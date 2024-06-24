import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import { Pagination } from 'swiper/modules'; // 


const Forecast = ({ data }) => {
  const formatDateToDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileWidth = 768; 
      setIsMobileWidth(window.innerWidth <= mobileWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileWidth) {
      console.log('Screen width is mobile width');
      // Additional actions when screen width reaches mobile width
    }
  }, [isMobileWidth]);

  return (
    <div className="mt-12 p-10 max-sm:p-5">
      {isMobileWidth ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.forecastday.map((item) => (
            <SwiperSlide key={item.date}>
              <div className="flex items-center flex-col justify-center h-[8rem] w-[8rem] bg-gray-50 border border-gray-200 rounded-lg">
                <p className="font-semibold">{formatDateToDayOfWeek(item.date)}</p>
                <img src={item.day.condition.icon} alt={item.day.condition.text} />
                <p className="font-semibold text-center text-md">{item.day.avgtemp_c} <sup>˚C</sup></p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center gap-1 w-full h-max">
          {data.forecastday.map((item) => (
            <div key={item.date} className="flex items-center flex-col justify-center h-[8rem] w-[8rem] bg-gray-50 border border-gray-200 rounded-lg">
              <p className="font-semibold">{formatDateToDayOfWeek(item.date)}</p>
              <img src={item.day.condition.icon} alt={item.day.condition.text} />
              <p className="font-semibold text-center text-md">{item.day.avgtemp_c} <sup>˚C</sup></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
