import axios from 'axios';
import React, { useRef, useState } from 'react';
import './index.css'

const App = () => {
    const [addweather, setaddweather] = useState([]);
    let inputRef = useRef();

    const checkStatus = (event) => {
        event.preventDefault();
        if (inputRef.current.value === '') {
            alert('Please Enter City Name');
            return;
        }

        axios(`https://api.weatherapi.com/v1/current.json?key=45a8fb89afff423d8c2210032240509&q=${inputRef.current.value}&aqi=no`)
            .then(response => {
                setaddweather(prevState => [response.data, ...prevState]);
            })
            .catch(error => {
                console.log(error);
                alert('Invalid City Name!!');
            });

        inputRef.current.value = '';
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 flex flex-col items-center py-10">
                <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">Weather App</h1>

                <form onSubmit={checkStatus} className="flex flex-col items-center w-full max-w-lg space-y-4">
                    <input
                        type="text"
                        placeholder='Enter City Name...'
                        ref={inputRef}
                        className="w-full px-4 py-3 text-lg border-2 border-white rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                    >
                        Check Weather
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {addweather.map((item, index) => (
                        <div key={index} className="w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            <h2 className="text-3xl font-semibold text-gray-800">{item.location.name}, {item.location.country}</h2>
                            <p className="text-lg text-gray-600 mt-2">Temperature: <span className="text-blue-600">{item.current.temp_c}°C</span></p>
                            <p className="text-lg text-gray-600">Condition: {item.current.condition.text}</p>
                            <img src={item.current.condition.icon} alt="Weather condition" className="w-20 h-20 my-4" />
                            <div className="flex justify-between w-full">
                                <p className="text-sm text-gray-500">Humidity: {item.current.humidity}%</p>
                                <p className="text-sm text-gray-500">Wind: {item.current.wind_kph} kph</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default App;