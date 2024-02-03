import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import air from './utils/air.png'
import humidity from './utils/humidity.png'

const WeatherDetails = () => {

    const [city, setCity] = useState('Chennai')
    const [weather, setWeather] = useState('')

    const [cityNotFound, setCityNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const API_KEY = `fc3cbd73abc12d7e489f3bac43a389e9`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=Metric`

    const search = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const resData = await response.json()
            if (resData.cod === '404') {
                setCityNotFound(true)
            } else {
                setWeather(resData)
                setCityNotFound(false)
            }
        } catch (error) {
            console.log('Error Occurred' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        if (city !== '')
            search()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && city !== '') {
            search()
        }
    }


    useEffect(() => {
        search()
    }, [])

    //    <b >{weather && weather.weather && weather.weather[0] && weather.weather[0].description}</b> <br />

    const imageUrl = weather && weather.weather && weather.weather[0] && `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

    return (
        <div className="row d-block mx-auto w-100 weather_body shadow-lg">
            <div class="input-group flex-nowrap mx-auto inputValue">
                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Enter City"
                    aria-describedby="addon-wrapping"
                    required
                />
                <span
                    className="input-group-text searchicon"
                    id="addon-wrapping"
                    onClick={handleSearch}><FaSearch /></span>
            </div>
            <div className='inner_weather_body'>
                {loading ? <div className='loading'></div> : (
                    !cityNotFound ? (
                        <>
                            <div className="weather_condition">
                                <span>
                                    {weather && weather.weather && weather.weather[0] && weather.weather[0].main}<br />
                                </span>
                                <span>
                                    {weather && weather.weather && weather.weather[0] && weather.weather[0].description}<br />
                                </span>
                            </div>
                            <div>
                                {imageUrl && <img src={imageUrl} className='d-block mx-auto' alt="Weather Icon" />}
                            </div>
                            <div className='mx-auto text-center weather_detail'>
                                <div className="temp_value">{weather && weather.main && weather.main.temp}</div>
                                <div className="temp_city mt-2">
                                    {weather.name}
                                </div>
                                <div className="temp_country mt-2">
                                    {weather && weather.sys && weather.sys.country}
                                </div>

                                <div className='latlon'>
                                    <ul className='d-flex justify-content-around p-0 mt-3'>
                                        <li>
                                            <span>Latitude</span><br />
                                            <span>{weather && weather.coord && Math.floor(weather.coord.lat)}</span>
                                        </li>
                                        <li>
                                            <span>Longitude</span><br />
                                            <span>{weather && weather.coord && Math.floor(weather.coord.lon)}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="humandair">
                                    <ul className='d-flex justify-content-between p-0 mt-3'>
                                        <li>
                                            <span><img src={humidity} alt="" /></span><br />
                                            <span>
                                                <b>{weather && weather.main && weather.main.humidity} %</b> <br />
                                                <div>Humidity</div>
                                            </span>
                                        </li>
                                        <li>
                                            <span><img src={air} alt="" /></span><br />
                                            <span>
                                                <b>{weather && weather.wind && weather.wind.speed} Kmph</b> <br />
                                                <div> Wind Speed</div>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="designedby">
                                    Designed By Vasanth S
                                </div>
                            </div>
                        </>
                    ) : <div className='citnotfound align-middle'>The city you provided was not found</div>
                )}
            </div>
        </div>
    )
}

export default WeatherDetails