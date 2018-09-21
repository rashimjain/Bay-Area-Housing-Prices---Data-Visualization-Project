$('.carousel').carousel({
    interval: 2000
  })

function buildCharts(city) {
  //*********************************************************************************/
  

  
  //Use `d3.json` to fetch the city data for the plots
  d3.json(`/cities/${city}`).then(function(data) {
    var forecast=0;
    var unocc=[];
    var rent=[];
    var hincr=[];
    var r="date,price\n";
    var u="date,housing increase\n"
    for (var i=0; i< data.length; i++) {
      r+=data[i].date;
      r+=","+data[i].price;
      r+="\n";
      
      u+=data[i].date;
      u+=","+data[i].units;
      u+="\n";

      if (data[i].forecast!=0) {
         forecast=data[i].forecast
      }

      total=data[i].totalhomes;
      un=data[i].unoccupied;
      perc=(un/total)*100
      perc1=Math.round(perc * 1000) / 1000;

      unocc.push(perc1)
      rent.push(data[i].rental)
      
    }
    
    //building a dygraph to show "Median Price Per Sq Ft, $"
    console.log(rent)
    g = new Dygraph("graphdiv", r,
       {
         legend: 'always',
         title: city,
         ylabel: "Median List Price Per Sq Ft, $",
         xRangePad: 1,
         
        }    
      );  
    //*********************************************************************************/

    z = new Dygraph("chartDiv12", u,
    {
      legend: 'always',
      title: city,
      ylabel: "Housing Units Increase YoY",
      xRangePad: 1
     }    
   );  

   //*********************************************************************************/

    //adding forecast data
    var forc=Math.round(forecast * 100) / 100;
    if (forc>0) {
      newF=`+${forc}`
    }
    else {
      newF=`-${forc}`
    }
    d3.select("#city_forecast").remove()
    d3.select("#div_forecast")
        .append("p")
        .attr("id", "city_forecast")
        .append("text")
        .text(`${city}: ${newF}%`)
        .style("color", "#58a1a5")
        .style("font-size","20px")
    //*********************************************************************************/
    //adding bar chart
    
    ttt(unocc,rent);
    
      //*********************************************************************************/
    //adding  line chart for rental prices
    
  
  });
}
  
  
  
  //*********************************************************************************/
  




function init() {
    // Grab a reference to the dropdown select element
  var selector = d3.select("#city1");
  
    // Use the list of sample names to populate the select options
  d3.json("/names").then((cityNames) => {
    cityNames.forEach((city) => {
      selector
        .append("option")
        .text(city)
        .property("value", city);
      });
    

  const firstName = cityNames[0];
  //console.log(cityNames)
  // Use the first sample from the list to build the initial plots
  buildCharts(firstName)
});

}


function optionChanged(newCity) {
  // Fetch new data each time a new sample is selected
  buildCharts(newCity);
  
}



// Initialize the dashboard
init()
