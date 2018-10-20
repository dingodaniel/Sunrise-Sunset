var express = require('express');
var app = express();
var key= 'glyIhjhlYOHtsrdwJFTm7I2Kwc6hKFDR';
app.get('/json', function (req, res) {

  var city=req.query.city;
  var state=req.query.state;
  var url='http://www.mapquestapi.com/geocoding/v1/address?key='+key+'&location='+city+','+state;

  const axios = require('axios');

  axios.get(url)
    .then(response => {
      console.log(response.data);
      var note=response.data.results[0];
      var latitude=note.locations[0].latLng.lat;
      var longitude=note.locations[0].latLng.lng;
      console.log(latitude);
      console.log(longitude);
      var url2='https://api.sunrise-sunset.org/json?lat='+latitude+'&lng='+longitude+'&date=today';
      axios.get(url2)
        .then(response => {
          console.log(response.data);
          var sunrise=response.data.results.sunrise;
          var sunset=response.data.results.sunset;
          json={
            City:city,
            State:state,
            Sunrise:sunrise,
            Sunset:sunset
          }
          res.end(JSON.stringify(json));
        })
        .catch(error => {
          console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
  });

})


var server = app.listen(8003, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
