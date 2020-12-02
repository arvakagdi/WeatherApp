const express = require("express");
const https = require("https");  // https is a native node js module to request data from other/somebody else's server
const bodyParser = require("body-parser");

//using https protocol
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){ // when user tries to go to homepage -->'get'
    res.sendFile(__dirname + "/index.html");  // use 'sendFile' and not 'send' to send the entire html file instead of text
})

app.post("/", function(req,res){
    const location = req.body.cityName;
    const apiKey = "1e4714ea0ef44c28fdc929b354e28d74"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location +"&appid="+ apiKey+"&units=" + unit;   // remember to include https://
    https.get(url, function(response){ // get is used to request data using url using https from other server
        console.log(response.statusCode);
        response.on("data", function(data){   //response is used to get response from other website
            const weatherData = JSON.parse(data)   // JSON.parse parses hex data is readable format(json)
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            // console.log(weatherDesc);  // we can fetch required data and print it/store it/ manipulate it
            const icon = weatherData.weather[0].icon;   
            const weatherImg = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    
            res.write("<p>The weather is currently " + weatherDesc +" </p>")    //write multiple lines to send using res.write
            res.write("<h1>The current tempreture in "+ location +" is: " + temp + " degrees Celcius</h1>");
            res.write("<img src=" + weatherImg +">");
            res.send();   
        })
    
    })

})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});





