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
console.log(cityStorage);
for (var i = 0; i < cityStorage.length; i++) {
    console.log("this city is " + cityStorage[i]);
}
// Weather API placeholder
var searchValue = document.querySelector('#searchbox');
searchValue.addEventListener('keypress', setFunc);
    function setFunc(e) {

        if(e.keyCode === 13) {
            // getting the text that was entered into the input form on the site.
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
        }
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

            // document.querySelector('#city').innerHTML = weather.name;
            document.querySelector('#city').innerHTML = city;
            // document.querySelector('#temp').innerHTML = weather.main.temp;
            document.querySelector('#temp').innerHTML = weather.current.temp;
            // document.querySelector('#min_max_temp').innerHTML = 
            document.querySelector('#min_max_temp').innerHTML = weather.current.feels_like;
            // "Min. "+weather.main.temp_min+" / Max. "+weather.main.temp_max;
            // document.querySelector('#weather').innerHTML = weather.weather[0].main;
            document.querySelector('#weather').innerHTML = weather.current.weather[0].main;
            // document.querySelector('#weather_desc').innerHTML = weather.weather[0].description;
            document.querySelector('#weather_desc').innerHTML = weather.current.weather[0].description;
            // document.querySelector('#wind_dir_speed').innerHTML = "Wind direction: "+ weather.wind.deg
            // + " Degrees / Wind speed: "+weather.wind.speed + " MPH";
            document.querySelector('#wind_dir_speed').innerHTML = "Wind direction: "+ weather.current.wind_deg
            + " Degrees / Wind speed: "+weather.current.wind_speed + " MPH";
        })
        .catch(function (err) {
            console.log(err);
        })
    }

  