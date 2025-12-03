from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests 
import mariadb

load_dotenv()

app = Flask(__name__)
CORS(app)


def db_connection(): 
        return mariadb.connect(
           host=os.getenv('DB_HOST'),
           user=os.getenv('DB_USER'),
           password=os.getenv('DB_PASS'),
           database=os.getenv('DB_NAME')
        )

API_KEY = os.getenv('API_KEY')

@app.get('/weather')
def weather():
    By = request.args.get('by')
    Land = request.args.get('land')
    
    if not By or not Land:
        return jsonify({ "error": 'Vennligst oppgi både by og land'}), 400
 
     
    return søk_statistikk(By, Land)
    
    
def søk_statistikk(By, Land):
    
    url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={By},{Land}"
    response = requests.get(url).json()


# Sjekk om API-et gir error
    if response.get('error'):
        return jsonify({"error": 'Ugyldig by eller land'}), 400

# Hent landet som API-et sier byen ligger i
    api_land = response.get('location', {}).get('country')

# Sjekk om det matcher brukerens input (case-insensitive)
    if api_land.lower() != Land.lower():
        return jsonify({"error": f"Byen {By} finnes ikke i {Land}"}), 400
    
    Forbokstav_Land = Land.strip().capitalize()
    Forbokstav_By = By.strip().capitalize()




    connection = db_connection()
    cursor = connection.cursor()
    
    
    cursor.execute("""
                   INSERT INTO søk_statistikk (By_navn, Land_navn, Antall_ganger_søkt)
                   VALUES (%s, %s, 1)
                   ON DUPLICATE KEY UPDATE Antall_ganger_søkt = Antall_ganger_søkt + 1
                """, (Forbokstav_By, Forbokstav_Land))
    connection.commit() 
    
    cursor.execute("SELECT Antall_ganger_søkt FROM søk_statistikk WHERE By_navn = %s AND Land_navn = %s", (Forbokstav_By, Forbokstav_Land))
    row = cursor.fetchone()
    antall_søk = row[0] - 1 if row else 0
    
    cursor.close()
    connection.close()

    
    response['antall_søk'] = antall_søk
    return jsonify(response)

 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)