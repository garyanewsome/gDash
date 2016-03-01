var getLocation = function(resolve, reject) {
  var weatherLocation = document.getElementById("weather");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve);
    } else {
        weatherLocation.innerHTML = "Geolocation is not supported by this browser.";
        reject();
    }
}

var buildYQLlocationQuery = function(position){
	var requestZip = new Promise(function(resolve, reject){
	  var query = "SELECT * FROM geo.places WHERE text='("+position.coords.latitude + ", " + position.coords.longitude+")'";
  	var encodedQuery = encodeURIComponent(query);
  	var uri = "https://query.yahooapis.com/v1/public/yql?q="+encodedQuery+"&format=json"//&callback=userLocation";

		console.log(uri);
		console.log(encodedQuery);
		console.log(">-<o");

  	jQuery.ajax({
    	url:uri,
    	//jsonp:"callback",
    	success:resolve
  	});	
	})
	return requestZip;
};

var requestWeatherByZip = function(result){
	var weatherData = new Promise(function(resolve, reject){
		console.log(result);
	  var data = result.query.results.place
	  var postal = data.postal.content;
	  var woeid = data.admin1.woeid;

	  var query = "select * from wunderground.geolookup where location='"+postal+"'";
	  var encodedQuery = encodeURIComponent(query);
	  var uri = "https://query.yahooapis.com/v1/public/yql?q="+encodedQuery+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"//&callback=userLocation";

		console.log(uri);
		console.log(encodedQuery);
		console.log("\\o/");
		console.log(postal);

	  jQuery.ajax({
	    url:uri,
	    success:resolve
  	});
	})
	return weatherData;
};

var showPosition = function(result) {
  console.log("hi ", result);
  var radarImg = result.query.results.location.radar.image_url;
  var zipCode = result.query.results.location.zip;
  document.getElementById("radar").src=radarImg;
 	document.getElementById("zip").innerHTML = zipCode; 
};


var browserLocation = new Promise(getLocation);

browserLocation
	.then(buildYQLlocationQuery)
	.then(requestWeatherByZip)
	.then(showPosition);

