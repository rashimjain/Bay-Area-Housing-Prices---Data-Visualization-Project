window.onload=ttt();



function ttt(l=3,j=5) {  
  console.log(l)
  var myConfig1 = {
    type: "bar",
    plotarea: {
    adjustLayout:true,
    
    },
    scaleX: {
      label:{
        text:"Year"
        },
      labels:["2010","2011","2012","2013","2014","2015","2016","2017", "2018"] 
      },
    scaleY: {
      label: {
        text:"% Of Unoccupied Homes"
      },
    },
      series:[        
        {
            values: l,
            backgroundColor:"#58a1a5",
            alpha:1
        }            
        ]
      };
  
      var myChart1 = {"type":"line",
                       
                       
                       "plotarea": {
                      "margin": "dynamic 45 60 dynamic",
                     },
                       "scale-x": {
                        "label":{
                        "text":"Year"
                        },
                      "labels":["2010","2011","2012","2013","2014","2015","2016","2017", "2018"] 
                      },
                      "scale-y": {
                      "values": "1000:6000:500",
                      "label": {
                        "text": "$ Median Monthly Rental Price (all homes)"
                      
                    }
                    
                  },
                       "series": [{
                         "values":j,
                         "line-color": "#58a1a5",
                         "alpha":1
                        }
                        ] };
   
    zingchart.render({ 
        id : 'myChart', 
        data : myConfig1, 
        height: 300, 
        width: 500 
      });
      zingchart.render({
        id:'chartDiv11',
        data:myChart1,
        height: 340, 
	      width: 1100 
      });
    
  };

