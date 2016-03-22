var getLocation = function(resolve, reject) {
    var weatherLocation = document.getElementById("weather");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve);
    } else {
        weatherLocation.innerHTML = "Geolocation is not supported by this browser.";
        reject();
    }
    console.log("getLocation");
}
var buildYQLlocationQuery = function(position) {
    var requestZip = new Promise(function(resolve, reject) {
        var query = "SELECT * FROM geo.places WHERE text='(" + position.coords.latitude + ", " + position.coords.longitude + ")'";
        var encodedQuery = encodeURIComponent(query);
        var uri = "https://query.yahooapis.com/v1/public/yql?q=" + encodedQuery + "&format=json" 
        console.log("buildYQLlocationQuery");
        console.log(uri);
        console.log(encodedQuery);
        jQuery.ajax({
            url: uri,
            success: resolve
        });
    })
    return requestZip;
};
var requestWeatherByZip = function(result) {
    var weatherData = new Promise(function(resolve, reject) {
        console.log(result);
        var data = result.query.results.place
        var postal = data.postal.content;
        var woeid = data.admin1.woeid;
        var query = "select * from wunderground.currentobservation where location='" + postal + "'";
        var encodedQuery = encodeURIComponent(query);
        var uri = "https://query.yahooapis.com/v1/public/yql?q=" + encodedQuery + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys" //&callback=userLocation";
        console.log("requestWeatherByZip");
        console.log(query);
        console.log(uri);
        console.log(encodedQuery);
        console.log(postal);
        jQuery.ajax({
            url: uri,
            success: resolve
        });
    })
    return weatherData;
};
var showPosition = function(result) {
    console.log("showPosition");
    console.log(result);
    var current = result.query.results.current_observation.temperature_string;
    document.getElementById("zip").innerHTML = current;
};

function getWeather() {
    console.log("getWeather");
    browserLocation.then(buildYQLlocationQuery).then(requestWeatherByZip).then(showPosition);
    store.lastRequestTime = new Date().getTime();
}
console.log("The Promise Land");
var browserLocation = new Promise(getLocation);
// if time 15 min (15*60*1000)
var store = localStorage;
if (store.lastRequestTime) {
    console.log("if");
    var lastRequestTime = store.lastRequestTime;
    var currentTime = new Date().getTime();
    var lastRequestExpired = lastRequestTime + 1000; //(15 * 60 * 1000);
    console.log("lastRequestTime    " + lastRequestTime);
    console.log("lastRequestExpired " + lastRequestExpired);
    console.log("currentTime        " + currentTime);
    if (lastRequestExpired < currentTime) {
        console.log("if if");
        getWeather();
    } else {
        console.log("if else");
        var result = {};
        result.query = {};
        result.query.results = {};
        result.query.results.current_observation = {};
        result.query.results.current_observation.temperature_string = store.temperature_string;
        showPosition(result);

    }
// new request
} else {
    console.log("else");
    getWeather();
}