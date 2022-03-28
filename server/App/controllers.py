from app import app, db
from flask import request, jsonify
from App.services import getcountydata
from App.models import CountyPopulation
from App.services import pigLatinConversion
from App.getzipcodeservice import getzipcode

@app.route('/create_phrase', methods=['POST']) # The route is used to return the Name after it is converted into Pig Latin along with county name and population
def index():
    try:
        if request.method == 'POST':
            inputVal = request.json
            if "name" not in inputVal:
                return {"message": "The key name does not exist in the Json"}
            elif("zipcode" not in inputVal):
                return {"message": "The key Zip Code does not exist in the Json"}

            nameVal = pigLatinConversion(inputVal['name']) 
            countyDetail = getcountydata(inputVal['zipcode'], db)
            if(countyDetail != None):
                nameVal.update(countyDetail)
            else:
                return {'message': 'Please enter a valid zip code'}
            return nameVal
        else:
            return {'message': 'Please send JSON in request body'}
    except Exception as e:
        print(e)
        app.logger.error(e)

@app.route('/getzipcodes', methods=['POST'])
def getzipcodes():
    try:
        if request.method == 'POST':
            zipcodes = getzipcode(db)
            return zipcodes
    except Exception as e:
        print(e)
        app.logger.error(e)        
