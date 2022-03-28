import pytest
from app import app as p
# This file is used to unit test the application.


@pytest.fixture
def client():
    return p.test_client()


def test_home(client):
    resp = client.post('/getzipcodes')
    assert resp.status_code == 200


def test_json_data(client):
    response = client.post("/create_phrase", json={
        "name": "Rahul Dravid", "zipcode": "99001"

    })
    assert response.status_code == 200
    assert response.json['county'] == "Spokane"
    assert response.json['name'] == "Ahulray Aviddray"
    assert response.json["population"] == 7062
