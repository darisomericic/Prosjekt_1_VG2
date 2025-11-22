import styles from './vær.module.css'
import sky from '../vaermeldingsapp/img/blurredsky.png'
import { useEffect, useState } from 'react'



function VærApp() {
  const [Land, setLand ] = useState("")
  const [By, setBy ] = useState("")
  const [Vær, setVæret ] = useState(null)
  const [Forecast, setForecast ] = useState([]) 
   
    const handleSubmit = async (e) => {
    e.preventDefault();
    }

const getVæret = async () => {
 if (!By || !Land) {
  alert('Skriv inn både by og land!')
  return;
} 
  
     
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=c38fbade3d1f4f1e94d102035252011&q=${By},${Land}`
  );
  const json = await response.json();

   if (json.location.country.toLowerCase() !== Land.toLowerCase()) {
    alert("Skriv inn riktig by!");
    return;
  }

  const getForecast = async () => {
      const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=c38fbade3d1f4f1e94d102035252011&q=${By},${Land}`
  );
  const json = await response.json()
  setForecast(json.forecast.forecastday)
  }

  setVæret(json);
};


  

  
    return (
      <form action="" onSubmit={handleSubmit} className={styles.container}>
          <div className={styles.innhold}>
            <input type="text" style={{ fontStyle: 'italic' }} placeholder='Skriv inn et land...' className={styles.innhold} onChange={(e) => setLand(e.target.value)}></input>
            <input type="text" style={{ fontStyle: 'italic' }} placeholder='Skriv inn et sted...' className={styles.innhold} onChange={(e) => setBy(e.target.value)}></input>
            <button className={styles.btn} type='button' onClick={getVæret}>Søk</button>
             
              {Vær?.location && Vær?.current && (
              <div className={styles.weatherbox}>
              <h3>{Vær.location.name}, {Vær.location.country}</h3>
              <p><b>Temperatur:</b> {Vær.current.temp_c}°C</p>
              <p><b>Vær:</b> {Vær.current.condition.text}</p>
              <p><b>Fuktighet:</b> {Vær.current.humidity}</p>
              <p><b>Vindstyrke:</b> {Vær.current.wind_kph} km/h</p>
              <p><b>Tid:</b> {Vær.location.localtime}</p>
              <div className={styles.bilde}>
              <img id='current-icon'src={`https:${Vær.current.condition.icon}`} alt="Værikon"  />
              </div>
        </div>
              )}
          </div>
      </form>
    )
};
export default VærApp
