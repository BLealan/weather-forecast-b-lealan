var searchForCity = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchBtn");
var latitude = 0;
var longitude = 0;

var createWeatherCard = document.getElementById("weather-cards");

//Function to convert city in local storage to co-ordinates
function cityToCoordinates(){
    var city = localStorage.getItem("city");

    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
        headers: { 'X-Api-Key': 'SSqciNfqi1I7PloStRDhwA==FxTHxv4F9h2qlThu'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result)
            latitude = result[0].latitude;
            longitude = result[0].longitude;
            console.log(latitude, longitude);
        }, error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    })
};

//Click event to save value of search bar to local storage
searchButton.addEventListener("click", function(event){

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