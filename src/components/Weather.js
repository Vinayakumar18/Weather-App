import React, { useState } from 'react'
import axios from 'axios'
import { CiTempHigh } from 'react-icons/ci'
import { BiWind } from 'react-icons/bi'
import { BsFillCloudSunFill } from 'react-icons/bs'
import image from '../assets/background.jpg'
export const Weather = (props) => {
    const img = image
    const [City, setCity] = useState('')
    const [Data, setData] = useState({ name: "", description: 'cloudy', temp: 0, humidity: 0, wind: 0, feels: 0, })
    const [Error, setError] = useState('')
    let key = props.api;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=imperial&appid=${key}`
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(url).then((res) => {
            setData({ ...Data, name: res.data.name, description: res.data.weather[0].main, temp: res.data.main.temp, humidity: res.data.main.humidity, wind: res.data.wind.speed, feels: res.data.main.feels_like })
            setError('')
        }).catch(function error(error) {
            if (error.response.status === 404) {
                setError('City not found')
            }
            else if (error.response.status === 400) {
                setError('Enter the City Name')
            }
            console.log(error)
        })
    }
    return (
        <div className='w-full h-full absolute text-white  bg-black/60'>
            <img src={img} alt="" className='w-full h-full absolute top-0 left-0 -z-10' />
            <div className="text-center p-4">
                <form onSubmit={handleSubmit}>
                    <input type="text" className=' py-3 px-6 text-xl rounded-3xl placeholder-white border border-solid border-white/80 bg-white/10 text-neutral-50 ' placeholder='Enter Location' value={City} onChange={(e) => { setCity(e.target.value) }} />
                    <button className='py-3 px-6 cursor-pointer border border-solid border-white/80 rounded-3xl bg-white/10 text-xl ' type='submit'>Search</button>
                </form>
            </div>
            <div className="max-w-3xl m-auto py-0 px-4 relative top-24 fle flex-col justify-between">
                {Error !== '' ?
                    <div className="font-bold text-xl ml-1 text-center text-red-300">
                        <p>{Error}</p>
                    </div>
                    :
                    <div>
                        {Data.name !== '' ?
                            <div>
                                <div className="flex flex-col items-center w-full h-auto my-4 mx-auto">
                                    <div className="location">
                                        <p className='text-2xl'>{Data.name}</p>
                                    </div>
                                    <div className="temp">
                                        <h1 className=' text-8xl '>{Data.temp}°F</h1>
                                    </div>
                                    <div className="relative">
                                        <p className='text-2xl'>{Data.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-evenly text-center w-full my-4 mx-auto p-4 rounded-xl bg-white/30">
                                    <div className='flex'>
                                        <CiTempHigh className='h-full text-5xl mt-1' />
                                        <div className="feels">
                                            <p className="font-bold">{Data.feels}°F</p>
                                            <p className='text-2xl'>Feels Like</p>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <BsFillCloudSunFill className='h-full text-5xl' />
                                        <div className="humidity">
                                            <p className="font-bold">{Data.humidity}%</p>
                                            <p className='text-2xl'>Humidity</p>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <BiWind className='h-full text-5xl mt-1' />
                                        <div className="wind">
                                            <p className="font-bold">{Data.wind}MPH</p>
                                            <p className='text-2xl'>wind Speed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""}
                    </div>
                }
            </div>
        </div>
    )
}
