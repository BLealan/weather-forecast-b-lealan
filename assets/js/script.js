var searchForCity = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchBtn");
var latitude = 0;
var longitude = 0;

var createWeatherCard = document.getElementById("weather-cards");

function getApi(latitude, longitude){
    var APIKey = "5a2bf608390639e1f4cb6c9ed307b7e6";
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

//Function to convert city in local storage to co-ordinates
function cityToCoordinates(){
    var city = localStorage.getItem("city");

    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
        headers: { 'X-Api-Key': 'SSqciNfqi1I7PloStRDhwA==FxTHxv4F9h2qlThu'},
        contentType: 'application/json',
        success: function(result) {
            getApi(result[0].latitude, result[0].longitude)
        }, error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    })
};

//Function to generate weather cards
function generateCards(){
    for(var i = 0; i < 5; i++){
        var today = dayjs();
        var cardDate = today.add(i, 'day').format("DD/MM/YYYY");
        var date = $(`<p class="date[i]">Date:${cardDate}</p>`);
        var weatherCardEl = $("#weather-cards");
        var singleCardEl = $(`<div class="single-card[i] card-style"></div>`)
        var icon = $(`<img class="icon[i]"/>`);
        var temperature = $(`<p class="temperature[i]">Temperature:</p>`);
        var windSpeed = $(`<p class="wind-speed[i]">Wind Speed:</p>`);
        var humidity = $(`<p class="humidity[i]">Humidity:</p>`);

        weatherCardEl.append(singleCardEl);
        singleCardEl.append(date, icon, temperature, windSpeed, humidity);
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

    generateCards();
});