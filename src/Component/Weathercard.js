import React, { useState , useEffect} from 'react'

function Weathercard({tempInfo}) {

    const[weatherState , setWeatherState] = useState("")
    const {temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
        temp_min,
        temp_max,} = tempInfo;

        useEffect(() => {
            if(weathermood){
                switch (weathermood) {
                    case "Clouds":
                        setWeatherState("wi-cloudy-windy")
                        break;
                        
                        case "Haze":
                        setWeatherState("wi-fog")
                        break;

                        case "Clear":
                        setWeatherState("wi-day-sunny")
                        break;

                        case "Mist":
                        setWeatherState("wi-dust")
                        break;

                        case "Rain":
                        setWeatherState("wi-night-showers")
                        break;
                    default:
                        setWeatherState("wi-day-sunny")
                        break;
                }
            }
           
        }, [weathermood])

        // converting sunset time 
        let sec = sunset;
        let date = new Date(sec * 1000);
        let timeSt = `${date.getHours()}:${date.getMinutes()}`
    return (
        <>
            {/* Our temp card */}
            <article className="widget">
                 <div className="weatherIcon">
                     <i className={`wi ${weatherState}`}></i>
                </div>
                     <div className="weatherInfo">
                         <div className="temperature">
                             <span>{temp}°C</span>
                         </div>

                         <div className="description">
                             <div className="weatherCondition">{weathermood}</div>
                             <div className="place">{name} , {country}</div>
                         </div>
                     </div>
                <div className="date">MAX:{temp_max}<br/>MIN:{temp_min}</div>

                {/* our four weather section */}
                
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p><i className="wi wi-sunset"></i></p>
                            <p className="extra-info-leftside">
                                {timeSt} PM <br/>
                                Sunset
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p><i className="wi wi-humidity"></i></p>
                            <p className="extra-info-leftside">
                                {humidity} <br/>
                                Humidity
                            </p>
                        </div>
                    </div>

                    <div className="weather-extra-info">
                    <div className="two-sided-section">
                            <p><i className="wi wi-barometer"></i></p>
                            <p className="extra-info-leftside">
                                {pressure}mbar <br/>
                                pressure
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p><i className="wi wi-strong-wind"></i></p>
                            <p className="extra-info-leftside">
                                {speed}km/h <br/>
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
             </article>
        </>
    )
}

export default Weathercard;
