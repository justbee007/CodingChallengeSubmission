from flask import session
from sqlalchemy import select
from App.models import CountyPopulation


def getzipcode(db):  # queries the Database to return all the zipcodes
    res_json = {}
    stmt = db.session.execute(select(CountyPopulation.zipCode))
    val = []
    for row in stmt:
        val.append(str(row.zipCode))
    import json
    val = json.dumps(val)
    return val
