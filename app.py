import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
#Forecast = Base.classes.forecast
DataSet = Base.classes.dataset

#Create a session
session=Session(db.engine)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/dashboard")
def comparison():
    """Return dashboard.html."""
    return render_template("dashboard.html")

@app.route("/map")
def map():
    """Return map.html."""
    return render_template("map.html")


@app.route("/names")
def names():
    """Return a list of cities names."""

    # Return a list of the unique city names
    results=(session.query(DataSet.city).distinct())    
    return jsonify(list(results))

@app.route("/cities/<city>")
def cities(city):
    
    results=(session.query(DataSet.city,DataSet.year,DataSet.price_per_sqft,DataSet.forecast_YoY_pct_change, DataSet.total_homes, DataSet.unoccupied_homes, DataSet.monthly_rental_price, DataSet.housing_increase_units)
        .filter(DataSet.city==city)
        .all())
    city_list=[]
    
    for r in results:
        #city_metadata = {}
        #ity_metadata["city"]=result[0]
        #city_metadata["date"]=result[1]
        #city_metadata["price"]=result[2]
        #city_list.append(city_metadata)
        city_list.append({"city": r[0], "date": r[1], "price": r[2], "forecast": r[3], "totalhomes": r[4], "unoccupied": r[5], "rental": r[6], "units": r[7]})
    print(city_list)
    return jsonify(city_list)



@app.route("/mapdata")
def map_data():
    
    map_data = (session.query(DataSet.city, DataSet.latitude, DataSet.longitude, DataSet.price_per_sqft, 
                        DataSet.monthly_rental_price,
                        DataSet.population, DataSet.population_density, 
                        DataSet.population_increase_pct, DataSet.violent_crime_rate, 
                        DataSet.property_crime_rate, DataSet.total_homes, DataSet.occupied_homes, 
                        DataSet.unoccupied_homes, DataSet.housing_increase_pct, DataSet.vacancy_rate_pct, 
                        DataSet.persons_per_household).filter(DataSet.year == 2018).all())


    house_data = []

    for row in map_data:
        info_dict = {}
        info_dict["city"] = row.city
        info_dict["latitude"] = row.latitude
        info_dict["longitude"] = row.longitude
        info_dict["price_per_sqft"] = row.price_per_sqft
        info_dict["monthly_rental_price"] = row.monthly_rental_price
        info_dict["population"] = row.population
        info_dict["population_density"] = row.population_density
        info_dict["population_increase_pct"] = row.population_increase_pct
        info_dict["violent_crime_rate"] = row.violent_crime_rate
        info_dict["property_crime_rate"] = row.property_crime_rate
        info_dict["total_homes"] = row.total_homes
        info_dict["occupied_homes"] = row.occupied_homes
        info_dict["unoccupied_homes"] = row.unoccupied_homes
        info_dict["housing_increase_pct"] = row.housing_increase_pct
        info_dict["vacancy_rate_pct"] = row.vacancy_rate_pct
        info_dict["persons_per_household"] = row.persons_per_household
        house_data.append(info_dict)


    return jsonify(house_data)







if __name__ == "__main__":
    app.run(debug=True, port=5005)