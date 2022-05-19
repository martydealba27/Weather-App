"using strict;"
//window.alert("connect")

//adding click handler for button via JS
document.getElementById("forecast").addEventListener("click", getData);

function getData(){
    //checking to ensure its connected
    console.log("clicked");
    //get zip code 
    var zipcode = document.getElementById("zipcode").value;
    console.log(zipcode);
    getWeather(zipcode);
}

//zipcode id is getting passed into getWeather as the zip variable
function getWeather(zip){
    console.log("zip is " + zip);
    var endpoint = "https://api.openweathermap.org/data/2.5/weather";

    var apikey = "1307007a7da1aeb5b59930a312a42cd3";

    var queryString = "zip=" + zip + "&units=imperial&appid=" + apikey;

    var url = endpoint + "?" + queryString; 
    console.log("url is " + url);

    //create object
    var xhr = new XMLHttpRequest();

    //set up action response -> this is what we do when the response comes back
    xhr.addEventListener("load", responseReceivedHandler);
    
    //required for JSON
    xhr.responseType = "json";

    //open connection 
    xhr.open("GET", url);

    //send the data
    xhr.send();
}

function responseReceivedHandler(){
    var weatherInfo = 
    document.getElementById("weatherInfo");
    if (this.status === 200) {
        //console.log(this.response);
        ///console.log("city is " + this.response.name)
        //console.log("temp is " + this.response.main.temp)
        //console.log("feels like " + this.response.main.feels_like)
        //console.log("description: " + this.response.weather[0].description) 
        var data = this.response;

        weatherInfo.innerHTML = 
        "<p>City: " + data.name + "</p>" +
        "<p>Current temperature: " + data.main.temp + "&deg;F</p>" + 
        "<p>Feels like: " + data.main.feels_like + "&deg;F</p>" +
        "<p>Description: " + data.weather[0].description + "</p>" +
        "<p>Humidity : " + data.main.humidity + "%</p>"; 
     } 
    else {
        window.alert("Please enter a proper zip code.")
        weatherInfo.innerHTML = "Weather data not available.";
    }
}