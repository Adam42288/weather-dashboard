// API Key
var APIKey = "140868a0bfdca5e4838b5700f0881180";
var city;
var queryURL;
var geoQuery;
var lat;
var long;

// Weather API placeholder
var searchValue = document.querySelector('#searchbox');
searchValue.addEventListener('keypress', setFunc);
    function setFunc(e) {
        if(e.keyCode === 13) {
            // getting the text that was entered into the input form on the site.
            city = searchValue.value;
            queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;
            geoQuery = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city+ '&limit=5&appid=' + APIKey;
            getLatLong(city)
            getData(city);
        }
    }
    function getData(city) {
        fetch(queryURL)
        .then (function (response) {
            return response.json();
        })
        .then(function (weather) {
            console.log(weather);
            document.querySelector('#city').innerHTML = weather.name;
            document.querySelector('#temp').innerHTML = weather.main.temp;
            document.querySelector('#min_max_temp').innerHTML = 
            "Min. "+weather.main.temp_min+" / Max. "+weather.main.temp_max;
            document.querySelector('#weather').innerHTML = weather.weather[0].main;
            document.querySelector('#weather_desc').innerHTML = weather.weather[0].description;
            document.querySelector('#wind_dir_speed').innerHTML = "Wind direction: "+ weather.wind.deg
            + " Degrees / Wind speed: "+weather.wind.speed + " MPH";
        })
        .catch(function (err) {
            console.log(err);
        })
    }
    function getLatLong(city) {
        fetch(geoQuery)
        .then (function (response) {
            return response.json();
        })
        .then(function (latlong) {
            console.log(latlong);
        })
        .catch(function (err) {
            console.log(err);
        })
    }

