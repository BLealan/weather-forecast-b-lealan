var searchForCity = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchBtn");

var createWeatherCard = document.getElementById("weather-cards");

//Function to convert city in local storage to co-ordinates

function cityToCoordinates(){

    var city = localStorage.getItem("city");

    var fetchCityCoord = `http://api.openweathermap.org/geo/1.0/direct?q={${city}}&appid={5a2bf608390639e1f4cb6c9ed307b7e6}`;

    fetch(fetchCityCoord)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
    })
};

//Click event to save value of search bar to local storage
searchButton.addEventListener("click", function(event){
    event.preventDefault();

    var savedCity = searchForCity.value;

    localStorage.setItem("city", savedCity);

    cityToCoordinates();

});

// function getApi(){
//     var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

//     fetch(requestUrl)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
// }

// getApi();