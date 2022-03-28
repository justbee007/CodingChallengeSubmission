from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import logging
logging.basicConfig(filename='app.log', level=logging.DEBUG)
format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s'

app = Flask(__name__) #Initialize the App
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///countydata.db' #The database used in the application
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run()   
from App.controllers import *    



