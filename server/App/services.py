from flask import session
from sqlalchemy import select
from App.models import CountyPopulation


def getcountydata(zipcode, db):  # Get county data based on Zip Code
    res_json = {}
    zipcode = str(zipcode).lstrip('0')
    task = db.session.query(CountyPopulation).filter(
        CountyPopulation.zipCode == int(zipcode)).distinct()
    for row in task:
        print(row)
        res_json['county'] = row.county
        res_json['population'] = row.population

        return res_json


def pigLatinConversion(inputString):  # create the Pig latin converted Name
    pigLatindic = {}
    inputString = inputString.split(" ")
    outputString = ""
    for x in range(0, len(inputString)):
        if(len(outputString) > 0):

            outputString = outputString + " " + \
                pigLatinwordConverter(inputString[x])
        else:
            outputString = outputString+pigLatinwordConverter(inputString[x])

    pigLatindic['name'] = outputString
    return pigLatindic


def vowelExists(letterVal):  # Used in the PigLatinwordConverter to check for a vowel
    vowelList = ['a', 'e', 'i', 'o', 'u']
    if letterVal.lower() in vowelList:
        return True
    else:
        return False


# This function returns a word converted into PigLatin
def pigLatinwordConverter(inputString):
    stringPosition = 0
    for x in range(0, len(inputString)):
        if(vowelExists(inputString[x]) == True):
            stringPosition = x
            break
    if(stringPosition != 0):
        appendString = inputString[:x]
        inputString = inputString.replace(inputString[:x], '', x)
        inputString = (inputString + appendString + "ay").capitalize()
    else:
        inputString = (inputString + "ay").capitalize()
    return inputString
