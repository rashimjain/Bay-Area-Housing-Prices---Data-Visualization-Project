The fact that California is facing one of the worst housing affordability crises in the history of the United States is, by now, well documented. The San Francisco Bay Area – the birthplace of some of America’s greatest technological and social achievements – is widely regarded as the epicenter of the crisis, regularly breaking historical precedents in terms of home values, supply and rental growth. The Bay Area housing market continues to improve, driven largely by economic expansion. Rising incomes and broad-based hiring supports elevated housing demand, and drives home price appreciation. 

The purpose of this project is to build an interactive dashboard to display trends related to housing prices in some of the major cities in the Bay Area.

This project uses data visualization to understand current and previous state of the real estate market in the Greater- San Francisco Bay Area in United States. The dataset for our dashboard is basically from two sources, 1) the well-known ‘Zillow’, an online marketplace for real estate properties, and, 2) Department of Finance website of the State of California.  The dataset includes annual time series data from 2010 to 2018 on few selective attributes for the markets. Observations occur every month on city and county level. We have used annualized monthly data for few major selected cities in Bay Area.

Project Flow:
1.	Data collection
        a.	Median house pricing per SQFT (source: Zillow)
        b.	Current forecast for increase in pricing per SQFT (source: Zillow)
        c.	Median rental pricing for all homes (source: Zillow)
        d.	Total housing units (source: Department of Finance, State of California)
        e.	Selected demographics data including:
            i.	Population (source: Department of Finance, State of California)
            ii.	Crime rate (source: Wikipedia)

2.	Data filter and cleaning
        a.	Selecting major cities for the project
        b.	Cleaning the data as some data for the selected cities was not available for certain time periods
        c.	Arranging the data in a format for creating a database

3.	Creating Database
        a.	Combined all data in a single CSV
        b.	Created the SQLITE database

4.	Java Script Library
        a.	Dygraphs - http://dygraphs.com
        b.	Zingchart - https://www.zingchart.com

5.	Creating Charts
        a.	Time-series line chart for Median house pricing using Dygraphs Java Script library
        b.	Time series bar chart of un-occupied homes using Zingchart Java Script library
        c.	Time-series line chart for Median rental pricing using Zingchart Java Script library
        d.	Time-series line chart for increase in housing units using Zingchart Java Script library

6.	Created the map for selected cities

7.	Created the Flask app

8.	Created the HTML Interactive Dashboard

