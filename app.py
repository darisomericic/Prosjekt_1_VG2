from flask import Flask, render_template
import mariadb

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def index():
    connect = None
    try:
        connect = mariadb.connect(
            host = 'localhost',
            user = 'daris',
            password = 'daris123',
            database = 'WeatherApp'
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


 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)