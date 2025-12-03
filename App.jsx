import styles from './vær.module.css'
import { useState } from 'react'



function VærApp() {
  const [Land, setLand ] = useState("")
  const [By, setBy ] = useState("")
  const [Vær, setVæret ] = useState(null)
   
    const handleSubmit = async (e) => {
    e.preventDefault();
    await getVæret();
    }

const getVæret = async () => {
 if (!By || !Land) {
  alert('Fyll ut begge felt!')
  return;
} 

  
  try {
    const response = await fetch(
      `http://10.2.223.200:5000/weather?by=${By}&land=${Land}`);
    const json = await response.json();

    if (json.location.country.trim().toLowerCase() !== Land.trim().toLowerCase()) { 
      alert("Skriv inn riktig land eller by!"); 
      return; 
    } 

  
    setVæret(json);
  } catch (error) {
    console.error("Feil i fetch:", error);
    alert("Noe gikk galt med å hente værdata.");
  }
};


  

  
    return (
      <form action="" onSubmit={handleSubmit} className={styles.container}>
          <div className={styles.innhold}>
            <input type="text" style={{ fontStyle: 'italic' }} placeholder='Enter a country...' value={Land} className={styles.innhold} onChange={(e) => setLand(e.target.value)}></input>
            <input type="text" style={{ fontStyle: 'italic' }} placeholder='Enter a place...' value={By} className={styles.innhold} onChange={(e) => setBy(e.target.value)}></input>
            <button className={styles.btn} type='submit'>Søk</button>
             
              {Vær?.location && Vær?.current && (
              <div className={styles.weatherbox}>
              <h3>{Vær.location.name}, {Vær.location.country}</h3>
              <p><b>Temperature:</b> {Vær.current.temp_c}°C</p>
              <p><b>Condition:</b> {Vær.current.condition.text}</p>
              <p><b>Humidity:</b> {Vær.current.humidity}</p>
              <p><b>Wind:</b> {Vær.current.wind_kph} km/h</p>
              <p><b>Time:</b> {Vær.location.localtime}</p>
              <div className={styles.bilde}>
              <img id='current-icon'src={`https:${Vær.current.condition.icon}`} alt="Værikon"  />      
              <div className={styles.searchHistory}> 
                <b>{Vær.antall_søk} other have searched this</b>
              </div>     
              </div>
              
        </div>
              )}
          </div>
      </form>
    )
};
export default VærApp
