from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests 
import mariadb

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET', 'POST'])
def index():
    connect = None
    try:
        connect = mariadb.connect(
           host=os.getenv('DB_HOST'),
           user=os.getenv('DB_USER'),
           password=os.getenv('DB_PASS'),
           database=os.getenv('DB_NAME')
        )
        cursor = connect.cursor() 
        cursor.execute()
    except Exception as e:
        print('Error:', e)
    finally:
        if connect is not None:
            connect.commit()
            connect.close()
            
    return render_template('index.html')

API_KEY = os.getenv('API_KEY')

@app.get('/weather')
def weather():
    By = request.args.get('by')
    Land = request.args.get('land')
    
    if not By or not Land:
        return jsonify({ "error": 'Vennligst oppgi både by og land'}), 400
    
    url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={By},{Land}"
    response = requests.get(url).json()
    
    return jsonify(response)

 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)