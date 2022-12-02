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
        
        var cityStorage = window.localStorage.getItem("City")
        ? JSON.parse(window.localStorage.getItem("City"))
        : [];
        // var newCity = {
        //     "City": searchValue.value
        //    "Initials": initialinput.value,
        //     "Score": score,
        //   };
        
       // cityStorage.push(newCity);

    
        // for (var i = 0; i < cityStorage.length; i++) {
        //     var name = cityStorage[i].Initials;
        //     var score1 = cityStorage[i].Score;
        //     var entry = document.createElement('li');
        //     entry.appendChild(document.createTextNode(name + ': ' + score1));
        //     listscores.appendChild(entry);
        // }

        if(e.keyCode === 13) {
            // getting the text that was entered into the input form on the site.
            city = searchValue.value;
            cityStorage.push(city);
            localStorage.setItem("City", city);
            console.log(localStorage.getItem("City"));
             localStorage.setItem("City", JSON.stringify(cityStorage));
             console.log(cityStorage[3]);
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
            console.log(latlong);
            lat = latlong[0].lat;
            console.log(lat);
            long = latlong[0].lon;
            console.log(long);
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
