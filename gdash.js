function getLocation() {
  var weatherLocation = document.getElementById("weather");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(buildYQLlocationQuery);
    } else {
        weatherLocation.innerHTML = "Geolocation is not supported by this browser.";
    }
}

var showPosition = function(result) {
  console.log("hi ", result);
  var radarImg = result.query.results.location.radar.image_url;
  document.getElementById("radar").src=radarImg;
};

var buildYQLlocationQuery = function(position){
  var query = "SELECT * FROM geo.places WHERE text='("+position.coords.latitude + ", " + position.coords.longitude+")'";
  var encodedQuery = encodeURIComponent(query);
  var uri = "https://query.yahooapis.com/v1/public/yql?q="+encodedQuery+"&format=json"//&callback=userLocation";
console.log(uri);
console.log(encodedQuery);
console.log(">-<o");

  jQuery.ajax({
    url:uri,
    //jsonp:"callback",
    success:requestWeatherByCity
  });
};

var requestWeatherByCity = function(result){
  console.log(result);
  var data = result.query.results.place
  var city = data.name;
  var state = data.admin1.content;
  var woeid = data.admin1.woeid;

  var query = "select * from wunderground.geolookup where location='"+city+", "+state+"'";
  var encodedQuery = encodeURIComponent(query);
  var uri = "https://query.yahooapis.com/v1/public/yql?q="+encodedQuery+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"//&callback=userLocation";
console.log(uri);
console.log(encodedQuery);
console.log("\\o/");

  jQuery.ajax({
    url:uri,
    success:showPosition
  });
};

getLocation();
