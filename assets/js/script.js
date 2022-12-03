// API Key
var APIKey = "140868a0bfdca5e4838b5700f0881180";
var city;
var queryURL;
var geoQuery;
var lat;
var long;
var prevCities = document.getElementById('previous_cities');

var cityStorage = window.localStorage.getItem("City")
? JSON.parse(window.localStorage.getItem("City"))
: [];


// Function to print cities from history at bottom of page.    
    for (var i = 0; i < cityStorage.length; i++) {
    var entry = document.createElement('li');
                                     // Create anchor element.
                                     var a = document.createElement('a'); 
          
                                     // Create the text node for anchor element.
                                     var link = document.createTextNode(cityStorage[i]);
                                       
                                     // Append the text node to anchor element.
                                     a.appendChild(link); 
                                       
                                     // Set the title.
                                     a.title = cityStorage[i]; 
                                       
                                     // Set the href property.
                                     a.href = "javascript:getLatLong(cityStorage[i]);"; 
                                       
                                     // Append the anchor element to the body.
                                     entry.appendChild(a); 

        prevCities.appendChild(entry);
}


// Weather API placeholder
var searchValue = document.querySelector('#cityInput');
searchValue.addEventListener('keypress', setFunc);
    function setFunc(e) {

        if(e.keyCode === 13) {
            getCurrentWeather(searchValue.value);
        }
    }

// getcurrentWeatherfunction

function getCurrentWeather(city) {
    city = searchValue.value;
    document.querySelector('#city').innerHTML = city;

    cityStorage.push(city);
    localStorage.setItem("City", city);
    console.log(localStorage.getItem("City"));
     localStorage.setItem("City", JSON.stringify(cityStorage));
        var entry = document.createElement('li');
                                     // Create anchor element.
                                     var a = document.createElement('a'); 
          
                                     // Create the text node for anchor element.
                                     var link = document.createTextNode(city);
                                       
                                     // Append the text node to anchor element.
                                     a.appendChild(link); 
                                       
                                     // Set the title.
                                     a.title = city; 
                                       
                                     // Set the href property.
                                     a.href = "javascript:getLatLong(city);"; 
                                       
                                     // Append the anchor element to the body.
                                     entry.appendChild(a); 

        prevCities.appendChild(entry);

    geoQuery = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city+ '&limit=5&appid=' + APIKey;
    getLatLong(city)
    getForecast(city)
}


    // button function

    function getInfo() {
        city = searchValue.value;
        cityStorage.push(city);
        localStorage.setItem("City", city);
        console.log(localStorage.getItem("City"));
         localStorage.setItem("City", JSON.stringify(cityStorage));
            var entry = document.createElement('li');
                                         // Create anchor element.
                                         var a = document.createElement('a'); 
              
                                         // Create the text node for anchor element.
                                         var link = document.createTextNode(city);
                                           
                                         // Append the text node to anchor element.
                                         a.appendChild(link); 
                                           
                                         // Set the title.
                                         a.title = city; 
                                           
                                         // Set the href property.
                                         a.href = "javascript:getLatLong(city);"; 
                                           
                                         // Append the anchor element to the body.
                                         entry.appendChild(a); 

            prevCities.appendChild(entry);

        geoQuery = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city+ '&limit=5&appid=' + APIKey;
        getLatLong(city)
        getForecast(city)
    }

    function getLatLong(city) {
        fetch(geoQuery)
        .then (function (response) {
            return response.json();
        })
        .then(function (latlong) {
            
            lat = latlong[0].lat;
            
            long = latlong[0].lon;
            
            getData(lat, long);
        })
        .catch(function (err) {
            console.log(err);
        })
        
    }
    function getData(lat, long) {
        var lat1 = lat;
        console.log(lat1);
        var long2 = long;
        console.log(long2);
        queryURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat1 + '&lon=' + long2 +'&units=imperial&exclude=hourly,minutely,daily&appid=' + APIKey;
        fetch(queryURL)
        .then (function (response) {
            return response.json();
        })
        .then(function (weather) {
            console.log(weather);
            document.getElementById("img0").src = "http://openweathermap.org/img/wn/"+ weather.current.weather[0].icon +".png";
            document.querySelector('#temp').innerHTML = "Temp: " + weather.current.temp;            
            document.querySelector('#humidity').innerHTML = "Humidity: "+ weather.current.humidity;
            document.querySelector('#wind_dir_speed').innerHTML = "Wind Speed: "+weather.current.wind_speed + " MPH";
        })
        .catch(function (err) {
            console.log(err);
        })
    }

   function getForecast(city) {
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+APIKey;
    fetch(queryURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (forecast) {
        console.log(forecast);
        // Getting weather icons, temp, wind, and humidity for every day. j + 8 due to each day being +8.
        var j = 1;
        for (var i = 1; i<6; i++) {
            document.getElementById("img"+i).src = "http://openweathermap.org/img/wn/"+ forecast.list[j].weather[0].icon +".png";
            document.getElementById("day" + (i) + "Min").innerHTML = "Temp: " + Number(forecast.list[j].main.temp).toFixed(1)+ "°";
            document.getElementById("day" + (i) + "Max").innerHTML = "Wind Speed: " + Number(forecast.list[j].wind.speed)+ "MPH";
            document.getElementById("day" + (i) + "humidity").innerHTML = "Humidity: " + Number(forecast.list[j].main.humidity);
            j = j +8;
        }
   })
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i+1)];
    }