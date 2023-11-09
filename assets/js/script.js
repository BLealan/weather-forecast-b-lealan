var searchForCity = document.querySelector("#city-search");
var searchForCountry = document.querySelector("#country-search");
var searchButton = document.querySelector("#searchBtn");
var latitude = 0;
var longitude = 0;
var savedCity = searchForCity.value;
var searchCountry = searchForCountry.value;
var createWeatherCard = document.getElementById("weather-cards");

function getApi(latitude, longitude){
    var APIKey = "5a2bf608390639e1f4cb6c9ed307b7e6";
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&cnt=5`;

    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        var saveWeather = data;
        var savedCity = searchForCity.value;
        localStorage.setItem(savedCity,JSON.stringify(saveWeather));
        console.log(saveWeather);
    })
}

//Function to convert city in local storage to co-ordinates
function cityToCoordinates(){
    var city = localStorage.getItem("city");
    var country = searchCountry

    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
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

    var weatherCardEl = $("#weather-cards");
    var savedCity = searchForCity.value;
    var today = dayjs();
    var cardTitle = $(`<h3 class="weather-title">The weather in ${savedCity} from ${today.format("DD/MM/YYYY")} to ${today.add(5, 'day').format("DD/MM/YYYY")}</p>`); 
    weatherCardEl.append(cardTitle);

    for(var i = 0; i < 5; i++){
        var today = dayjs();
        var cardDate = today.add(i, 'day').format("DD/MM/YYYY");
        var date = $(`<p class="date[i]">Date: ${cardDate}</p>`);
        var weatherCardEl = $("#weather-cards");
        var singleCardEl = $(`<div class="single-card[i] card-style"></div>`)
        var iconEl = $(`<img class="weather-icon" src="" alt="Weather Icon"/>`);
        var temperature = $(`<p class="temperature"></p>`);
        var windSpeed = $(`<p class="wind-speed"></p>`);
        var humidity = $(`<p class="humidity"></p>`);
        weatherCardEl.append(singleCardEl);
        singleCardEl.append(date, iconEl, temperature, windSpeed, humidity);
    }
};

//Click event to save value of search bar to local storage an create history button
searchButton.addEventListener("click", function(event){
    
    var savedCity = searchForCity.value;
    var historyList = $("#search-history");
    var historyButtonEl = $(`<button class="${savedCity} saveBtn" aria-label="save">${savedCity}</button>`);

    historyList.append(historyButtonEl);

    cityToCoordinates();

    if (searchForCity.value){
    generateCards()};

    var testResult = JSON.parse(localStorage.getItem(savedCity));
    var iconEl = $(".weather-icon");
    var weatherIcon = testResult.weather[0].icon;
    var iconEl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    $(".weather-icon").attr("src", iconEl);
    var temperatureResult = testResult.main.temp;
    //Default temp from API is in Kelvin so needs to be converted
    temperatureResult -= 273.15;
    var roundedTemperature = Math.round(temperatureResult *10)/10;
    $(".temperature").text(`Temperature: ${roundedTemperature}°C`);
    var windSpeedResult = testResult.wind.speed;
    $(".wind-speed").text(`Wind Speed: ${windSpeedResult} m/s`);
    var humidityResult = testResult.main.humidity;
    $(".humidity").text(`Humidity: ${humidityResult}%`);
});

// var saveButton = $(".saveBtn");
// saveButton.addEventListener("click", function(){
//     var $thisButton = $(this);
//     var buttonText = $thisButton(".saveBtn").val();
//     console.log(buttonText);
// });