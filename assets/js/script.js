// Initializing variables
// Also retrieving the cityStorage from localStorage and putting it into an array.
var APIKey = "140868a0bfdca5e4838b5700f0881180";
var city;
var queryURL;
var geoQuery;
var lat;
var long;
var prevCities = document.getElementById('previous_cities');
var prevCitiesButton = document.getElementById('prevcities');
var cityStorage = window.localStorage.getItem("City")
? JSON.parse(window.localStorage.getItem("City"))
: [];


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var day0 = d.getDate();
var month0 = d.getMonth();
var year0 = d.getFullYear();
if(month0 < 12){
    month0 = month0 + 1;
}
else{
    month0 = 12;
};
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
    
// Updates the Para2 heading with current Weather and date.
document.querySelector('#Para2').innerHTML = "Current Weather" + ' ('+ month0 +'/'+ day0 +'/' +year0 +')';

// Function to print previous cities as anchor tags.
console.log(cityStorage);
let uniqueCities = [...new Set(cityStorage)];
console.log(uniqueCities);
    for (var i = 0; i < uniqueCities.length; i++) {
        if (uniqueCities[i] === '') {
            console.log('null');
        }
        else {
    var entry = document.createElement('li');
    var newBtn = document.createElement('button');
    newBtn.innerHTML = uniqueCities[i];
    newBtn.dataset.city = uniqueCities[i];
    newBtn.onclick = function() {
        getCurrentWeather(this.getAttribute("data-city"));
    };
    prevCitiesButton.appendChild(newBtn);
    }
}


// Event listenter for user pressing Enter.
var searchValue = document.querySelector('#cityInput');
searchValue.addEventListener('keypress', setFunc);
    function setFunc(e) {

        if(e.keyCode === 13) {
            getCurrentWeather(searchValue.value);
        }
    }

 // Event listenter for user clicking search button.

     function getInfo() {
         getCurrentWeather(searchValue.value);
     };

     function findMe() {

            const succesfulLookup = (position) => {
            var latitude2 = position.coords.latitude;
            var longitude2 = position.coords.longitude;
            var city2;
            console.log(latitude2);
            console.log (longitude2);
            console.log(position);

            fetch("https://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude2 + "&lon=" + longitude2 +"&limit=1&appid="+ APIKey)
            .then (function (response) {
                return response.json();
            })
            .then(function (latlong) {
                // Sets latitude and longitude of city.
                console.log(latlong);
                city2 = latlong[0].name;
                getCurrentWeather(city2);
                document.querySelector('#cityInput').value = city2;
              
            })
            .catch(function (err) {
                console.log(err);
            })
    };
        navigator.geolocation.getCurrentPosition(succesfulLookup, console.log);

     };

// getcurrentWeatherfunction
function getCurrentWeather(city) {
    var day0 = d.getDate();
    var month0 = d.getMonth();
    var year0 = d.getFullYear();

    if(month0 < 12){
        month0 = month0 + 1;
    }
    else{
        month0 = 12;
    };
// Puts city into current weather container.
    document.querySelector('#city').innerHTML = city;

    if (!cityStorage.includes(city)) {
        cityStorage.push(city);
        localStorage.setItem("City", city);
        console.log(localStorage.getItem("City"));
         localStorage.setItem("City", JSON.stringify(cityStorage));
         var entry = document.createElement('li');
         var newBtn = document.createElement('button');
         newBtn.innerHTML = city;
         newBtn.dataset.city = city;
         newBtn.onclick = function() {
            getCurrentWeather(this.getAttribute("data-city"));
        };
        prevCitiesButton.appendChild(newBtn);

    
    }
// create fetch url to retrieve the latitude and longitude  of city.
    geoQuery = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city+ '&limit=5&appid=' + APIKey;
   // calls getLatLong function and passes city input by user.
    getLatLong(city)
    // calls getForecast and passes city input by user.
    getForecast(city)
}

    function getLatLong(city) {
        fetch(geoQuery)
        .then (function (response) {
            return response.json();
        })
        .then(function (latlong) {
            // Sets latitude and longitude of city.
            lat = latlong[0].lat;
            
            long = latlong[0].lon;
            // checks weather based on latitude and longitude of city.
            getData(lat, long);
        })
        .catch(function (err) {
            console.log(err);
        })
        
    }
    function getData(lat, long) {
        var lat1 = lat;
        var long2 = long;
        // calls queryURL to retrieve current weaather based on latitude and longitude.
        queryURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat1 + '&lon=' + long2 +'&units=imperial&exclude=hourly,minutely,daily&appid=' + APIKey;
        fetch(queryURL)
        .then (function (response) {
            return response.json();
        })
        .then(function (weather) {
            
            document.getElementById("img0").src = "https://openweathermap.org/img/wn/"+ weather.current.weather[0].icon +".png";
            document.querySelector('#temp').innerHTML = "Temp: " + weather.current.temp;            
            document.querySelector('#humidity').innerHTML = "Humidity: "+ weather.current.humidity;
            document.querySelector('#wind_dir_speed').innerHTML = "Wind Speed: "+weather.current.wind_speed + " MPH";
        })
        .catch(function (err) {
            console.log(err);
        })
    }

    // Gets 5 day weather using queryURL of City.
   function getForecast(city) {
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+APIKey;
    fetch(queryURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (forecast) {
        
        // Getting weather icons, temp, wind, and humidity for every day. j + 8 due to each day being +8.
        var j = 1;
        for (var i = 1; i<6; i++) {
            document.getElementById("img"+i).src = "https://openweathermap.org/img/wn/"+ forecast.list[j].weather[0].icon +".png";
            document.getElementById("day" + (i) + "Min").innerHTML = "Temp: " + Number(forecast.list[j].main.temp).toFixed(1)+ "°";
            document.getElementById("day" + (i) + "Max").innerHTML = "Wind Speed: " + Number(forecast.list[j].wind.speed)+ "MPH";
            document.getElementById("day" + (i) + "humidity").innerHTML = "Humidity: " + Number(forecast.list[j].main.humidity);
            j = j +8;
        }
   })
}



