var searchForCity = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchBtn");

var createWeatherCard = document.getElementById("weather-cards");

searchButton.addEventListener("click", function(event){
    event.preventDefault();

    var savedCity = searchForCity.value;

    localStorage.setItem("city", savedCity);

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