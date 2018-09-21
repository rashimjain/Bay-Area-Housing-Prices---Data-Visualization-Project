function createMap(markers){

  var base = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var baseMap = {
    Cities : base
  };

  var layers = L.layerGroup(markers);

  var overlayMap = {
    Info : layers
  };

  var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 9,
    layers: [base, layers]
  });

  L.control.layers(baseMap, overlayMap).addTo(myMap);

}

function createMarkers(data){
  
  // console.log(data);
  
  var cityMarkers = [];

  data.forEach(function (city){

    cityMarkers.push(
      L.marker([city.latitude, city.longitude]).bindPopup('<h4>' + city.city + ' 2018</h4> <hr> <h6>Population: ' + city.population + '</h6><h6> Population (sq mile): ' + city.population_density + '</h6> <hr> <h6>Violent Crime Rate: ' + city.violent_crime_rate + 
      '</h6> <h6> Total Homes: ' + city.total_homes + '</h6> <h6> Occupied: ' + city.occupied_homes + '</h6> <h6> Vacancy Rate: ' + Math.floor(city.vacancy_rate_pct * 100)/100 + '</h6> <h6> Persons Per Household: ' + Math.floor(city.persons_per_household *100)/100 +
      '</h6> <h6> Property Crime Rate: ' + city.property_crime_rate + '</h6>')
     );

  });

  createMap(cityMarkers);


}

url = '/mapdata';

d3.json(url, createMarkers);


