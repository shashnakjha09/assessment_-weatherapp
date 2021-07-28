import React , {useEffect, useState} from 'react';
import Weathercard from './Weathercard';
import { Chart } from "react-google-charts";
import "./style.css"
function Temp() {

    const[searchValue , setSearchValue] = useState("Bangalore");
    const[tempInfo , setTempInfo] = useState("");
    const[weeklyData , setWeaklyData] = useState(null);
    
    // Daily forcast 

    const getWeatherInfo = async () => {
       
        try{
          
            let Url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8f5621954820efc565488ece04813ee4`;
            const res = await fetch(Url);
            const data = await res.json();

            //destructing all the intems we need

            const {temp , humidity , pressure , temp_min , temp_max} = data.main;
            const {main:weathermood} = data.weather[0];
            const{name} = data;
            const {speed} = data.wind;
            const {country , sunset} = data.sys;

            const myWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
                temp_min,
                temp_max,
            }
            
            setTempInfo(myWeatherInfo);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect( () => {
        getWeatherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

 
    // For 7 days forcast
   
    useEffect( () => {
      const urlData = async () => {
        try{
            let URl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=8f5621954820efc565488ece04813ee4`;
            const res = await fetch(URl);
            const data = await res.json();
  
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"));
            const rateCurrencyNames = Object.keys(dailyData)
            const rateCurrencyValues = Object.values(dailyData)
            const rateCurrencyValue2 = Object.values(dailyData)
  
            const chartData = [['Currency Date', 'Temp_max' , 'Temp_min']]
            for (let i = 0; i < rateCurrencyNames.length; i += 1) {
              chartData.push([rateCurrencyNames[i], rateCurrencyValues[i].main.temp_max , rateCurrencyValue2[i].main.temp_min])
            }
            setWeaklyData(chartData);
  
        }catch(err){
            console.log(err);
        }
    }
    urlData();
  } , [searchValue]);

    return (
        <>
            {/* search Box and search button  */}

             <div className="wrap">
                 <div className="search">
                     <input type="search" 
                         placeholder="Search..."
                         autoFocus
                         id="search"
                         className="searchTerm"
                         value={searchValue}
                         onChange={(e) =>setSearchValue( e.target.value)}
                     />
                     <button  type="button"
                      className="searchButton" 
                      onClick={getWeatherInfo}
                      >Search</button>
                 </div>
             </div>

             <Weathercard tempInfo={tempInfo} />

             <br/><br/><br/><br/><br/>
              
             <Chart
             width={'550px'}
             height={'300px'}
             chartType="AreaChart"
             loader={<div>Loading Chart</div>}
             data={weeklyData}

    
             options={{
             title: '7 Days Forcast',
             hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
             vAxis: {title: "Temp" , minValue: 0 },
             // For the legend to fit, we make the chart area smaller
             chartArea: { width: '75%', height: '70%' },
             // lineWidth: 25
          }}
             />
             
          </>
      )
}

export default Temp;
