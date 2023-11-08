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
            latitude = result[0].latitude;
            longitude = result[0].longitude;
        }, error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    })
};

// function getApi(){
//     var APIKey = "74c4e70de0f1a242ff2d367b5af4fbc1";
//     var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat={${latitude}}&lon={${longitude}}&appid={${APIKey}}`;

//     fetch(requestUrl)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
// }

//Function to generate weather cards
function generateCards(){
    for(i = 0; i < 5; i++){
        var date = $(`<p class="date[i]">Date:</p>`);
        var weatherCardEl = $("#weather-cards");
        var icon = $(`<img class="icon[i]"/>`);
        var temperature = $(`<p class="temperature[i]">Temperature:</p>`);
        var windSpeed = $(`<p class="wind-speed[i]">Wind Speed:</p>`);
        var humidity = $(`<p class="humidity[i]">Humidity:</p>`);

        weatherCardEl.append(date, icon, temperature, windSpeed, humidity);
    }
};

//Click event to save value of search bar to local storage an create history button
searchButton.addEventListener("click", function(event){

    var savedCity = searchForCity.value;
    localStorage.setItem("city", savedCity);

    var historyList = $("#search-history");
    var historyButtonEl = $(`<button class ="${savedCity}" class="btn saveBtn" aria-label="save">${savedCity}</button>`);

    historyList.append(historyButtonEl);

    cityToCoordinates();

    // getApi();

    generateCards();
});