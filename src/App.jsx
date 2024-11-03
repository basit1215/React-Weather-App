import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const App = () => {

  const [addWeatherData, setaddWeatherData] = useState([])
  const inputVal = useRef()

  const formSubmit = (e) => {
    e.preventDefault();
    if (inputVal.current.value === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please, Enter any City Name!",
      });
    }
    else {
      axios(`https://api.weatherapi.com/v1/current.json?key=c3afac881b484bfcb0e82723240809&q=${inputVal.current.value}&aqi=no`)
        .then(res => {
          setaddWeatherData(prevState => [res.data, ...prevState]);
          console.log("Done!");
        })
        .catch(err => {
          console.log(err);
          console.log("Oops!");

          Swal.fire({
            title: "The City name is Incorrect!!!\nTry again and Enter the Correct City name...",
            showClass: {
              popup: ` animate__animated
                       animate__fadeInUp
                       animate__faster  `
            },
            hideClass: {
              popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster  `
            }
          });
        });

      inputVal.current.value = "";
    }
  }

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#57bfe9] to-[#2DFFF5] flex flex-col items-center py-10'>
        <div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#00438B] mb-6 sm:mb-8 drop-shadow-lg text-center'>Weather App 🌦</h1>
          <form onSubmit={formSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center w-full max-w-xs sm:max-w-lg mt-[50px] sm:mt-[80px]">
            <input type="text" placeholder="Enter City Name..." ref={inputVal} className="w-full sm:w-[300px] md:w-[400px] lg:w-[600px] px-4 py-2 sm:py-3 text-base sm:text-lg drop-shadow-2xl rounded-lg bg-white bg-opacity-40 placeholder-[#00438B] text-[#00438B] border-2 border-[#428ddd] focus:outline-none focus:border-2 focus:border-[#00438B] font-bold" />
            <button className="w-full sm:w-[200px] md:w-[300px] py-2 sm:py-3 bg-[#00438B] text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-[#00438B] transition-transform transform hover:scale-105 duration-300 ease-in-out">Check Weather</button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10">
          {addWeatherData.map((item, index) => (
            <div key={index} className="w-full max-w-xs sm:max-w-sm bg-white bg-opacity-50 rounded-xl shadow-2xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src={item.current.condition.icon} className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] my-4 mx-auto flex justify-center" alt='Current Weather Image' />

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 text-center">{item.location.name} <span className='text-lg sm:text-xl font-normal text-gray-800'>{item.location.country}</span></h2>

              <div className="text-sm sm:text-lg text-gray-600 mt-6 sm:mt-8 font-semibold">
                Temperature: <span className="text-[#00438B] font-semibold">{item.current.temp_c}°C</span>
              </div>
              <div className="text-sm sm:text-lg text-gray-600 font-semibold">
                Condition: <span className="text-[#00438B] font-semibold">{item.current.condition.text}</span>
              </div>
              <div className="text-sm sm:text-lg text-gray-600 font-semibold">
                Wind: <span className="text-[#00438B] font-semibold">{item.current.wind_kph} Kph</span>
              </div>
              <div className="text-sm sm:text-lg text-gray-600 font-semibold">
                Humidity: <span className="text-[#00438B] font-semibold">{item.current.humidity}%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default App