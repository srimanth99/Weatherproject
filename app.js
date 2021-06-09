const express = require('express')
const https = require('https');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apikey = "166721533fd5c933ce92b316b2e7e0ef";
  const unit = "metric";


  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apikey;

  https.get(url, function(response) {


    response.on('data', function(data) {

      const weather = JSON.parse(data)
      const city = weather.name
      const temp = weather.main.temp
      const description = weather.weather[0].description
      const icon = weather.weather[0].icon
      const imgURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"



      res.write("<p> The weather is currently " + description + "<p>");
      res.write("<h1>The temperature in " + city + " is " + temp + " degree celcius </h1>");
      res.write("<img src=" + imgURl + ">")
      res.send();
    })
  })
})

app.listen(3000, function(req, res) {
  console.log("server running on port 3000");
})
