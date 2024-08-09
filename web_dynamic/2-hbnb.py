#!/usr/bin/python3
"""Intergrating flask app with BnB Static template"""
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """Closing or removing current SQLAlchemy session"""
    storage.close()


@app.route('/2-hbnb', strict_slashes=False)
def hbnb():
    """
    displayin a webpage with information about HBNB ()
    Handling requests to custom templates
    """
    states = storage.all(State).values()
    states = sorted(states, key=lambda e: e.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda e: e.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda e: e.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda e: e.name)

    return render_template('2-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=str(uuid.uuid4()))


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
