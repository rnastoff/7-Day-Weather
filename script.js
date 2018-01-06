$(document).ready(function() {
  
	//GET ZIP
  var zipCode;
  function getZip() {
  	$.ajax({
			type: "GET",
			url: "http://ip-api.com/json",
			async: false,
			dataType: "json",
			success: function(data) {
				zipCode = data.zip;
			}
		});
  }
  getZip();
	
	
	
	
	
	//ADJUST THE POSITIONING AND FONT SIZE IF TEMP IS ONE DIGIT OR 3 DIGITS
	//THE DEFAULT CSS IS SET UP FOR 2 DIGIT TEMPERATURES
	function todayTempAdjust(num) {			
		//3 DIGIT STYLE ADJUST
		if (num.toString().length == 3) {

			//BIG
			if ($(window).width() > 630) { 				
				$(".today-right-temp").css({
					"font-size" : "80px",
					"margin-top" : "45px",
					"margin-left" : "32.5px"
				});
				$(".today-right-degree").css({
					"margin-top:" : "60px"
				});				
			}		
			//MEDIA QUERY 1
			else if ($(window).width() > 440) { 
				$(".today-right-temp").css({
					"font-size" : "50px",
					"margin-top" : "45px",
					"margin-left" : "30px"
				});
				$(".today-right-degree").css({
					"margin-top:" : "55px"
				});				
			}			
			//MEDIA QUERY 2
			else { 
				$(".today-right-temp").css({
					"font-size" : "40px",
					"margin-top" : "40px",
					"margin-left" : "27.5px"
				});
				$(".today-right-degree").css({
					"margin-top:" : "47px"
				});				
			}		
		} //3 digit end
		
		
		
		//2 DIGIT STYLE ADJUST
		if (num.toString().length == 2) {

			//BIG
			if ($(window).width() > 630) { 				
				$(".today-right-temp").css({
					"font-size" : "110px",
					"margin-top" : "25px",
					"margin-left" : "30px"
				});
				$(".today-right-degree").css({
					"margin-top:" : "50px"
				});				
			}		
			//MEDIA QUERY 1
			else if ($(window).width() > 440) { 
				$(".today-right-temp").css({
					"font-size" : "70px",
					"margin-top" : "30px",
					"margin-left" : "30px"
				});
				$(".today-right-degree").css({
					"margin-top:" : "45px"
				});				
			}			
			//MEDIA QUERY 2
			else { 
				$(".today-right-temp").css({
					"font-size" : "50px",
					"margin-top" : "35px",
					"margin-left" : "30px"
				});
				$(".today-right-degree").css({
					"margin-top:" : "45px"
				});				
			}		
		} //2 digit end
		
		
		
		//1 DIGIT STYLE ADJUST
		if (num.toString().length == 1) { 
			console.log("yup");
			//BIG
			if ($(window).width() > 630) { 
				$(".today-right-temp").css("margin-left", "65px");		
			}		
			//MEDIA QUERY 1
			else if ($(window).width() > 440) { 
				$(".today-right-temp").css("margin-left", "50px");		
			}		
			//MEDIA QUERY 2
			else { 
				$(".today-right-temp").css("margin-left", "45px");		
			}					
		}
		
	} //1 DIGIT END
	
	
	
	
	//FUNCTION GET ICON FROM EXTERNAL
	function getIcon(iconVec) {
    switch (iconVec) {
      case "cloudy":
      case "mostlycloudy":
      case "partlycloudy":
      case "partlysunny":
      case "nt_cloudy":
      case "nt_mostlycloudy":
      case "nt_partlycloudy":
      case "nt_partlysunny":
      case "hazy":
        return"wi wi-cloudy";
        break;
      case "snow":
      case "chancesnow":
      case "flurries":
      case "chanceflurries":
      case "sleet":
      case "chancesleet":
      case "nt_snow":
      case "nt_chancesnow":
      case "nt_flurries":
      case "nt_chanceflurries":
      case "nt_sleet":
      case "nt_chancesleet":
        return "wi wi-snow";
        break;
      case "rain":
      case "chancerain":
      case "tstorms":
      case "chancetstorms":
      case "nt_rain":
      case "nt_chancerain":
      case "nt_tstorms":
      case "nt_chancetstorms":
        return "wi wi-rain";
        break;
      case "fog":
      case "nt_fog":
        return "wi wi-fog";
        break;
      case "clear":
      case "sunny":
      case "mostlysunny":
        return "wi wi-day-sunny";
        break;
      case "nt_clear":
      case "nt_mostlysunny":
      case "nt_sunny":
        return "wi wi-night-clear";
        break;
    } //switch close
  } //function close
	
	
	
	
	

	
	
	
	
	
	//UPDATE DAY TEMP BASED ON FAHRENHEIT/CELSIUS
  function dayUpdateTemp(measurement) {
		
		if (measurement == "f") {
			tempF = dayData.current_observation.temp_f;
			$(".today-right-temp").html(Math.round(tempF)).hide().fadeIn(1000);    
			$(".today-right-degree").html(degree + "F").hide().fadeIn(1000);
			
			todayTempAdjust(Math.round(tempF));
			//ON LOAD OR BROWSER RESIZE, CALL ABOVE FUNCTION TO SEE IF TEMP IS 1 OR 3 DIGITS, AND ADJUST
			$(window).on("load resize", function(){
				todayTempAdjust(Math.round(tempF));
			});						
		}
		else if (measurement == "c") {
			tempC = dayData.current_observation.temp_c;
			$(".today-right-temp").html(Math.round(tempC)).hide().fadeIn(1000);    
			$(".today-right-degree").html(degree + "C").hide().fadeIn(1000);
			
			todayTempAdjust(Math.round(tempC));
			//ON LOAD OR BROWSER RESIZE, CALL ABOVE FUNCTION TO SEE IF TEMP IS 1 OR 3 DIGITS, AND ADJUST
			$(window).on("load resize change", function(){
					todayTempAdjust(Math.round(tempC));
			});			
			
			
		}
		
	} //dayUpdateTemp end
	
	
	
	
	
	//UPDATE WEEK TEMP BASED ON FAHRENHEIT/CELSIUS
	function weekUpdateTemp(measurement) {
		
		if (measurement == "f") {
			//WEEK STUFF
          var i = 1;			  				
				  var updateWeek = setInterval(function(){
          	var weekDay = weekData.forecast.simpleforecast.forecastday[i].date.weekday;
          	var weekMonth = weekData.forecast.simpleforecast.forecastday[i].date.month;
          	var weekDate = weekData.forecast.simpleforecast.forecastday[i].date.day;         
          	var weekHighF = weekData.forecast.simpleforecast.forecastday[i].high.fahrenheit;
          	var weekLowF = weekData.forecast.simpleforecast.forecastday[i].low.fahrenheit;
						var weekIcon = weekData.forecast.simpleforecast.forecastday[i].icon;
          	var icon = getIcon(weekIcon);

          	$("#week-day-" + i).text(weekDay.toUpperCase().slice(0,3)).hide().fadeIn(fadeInTime);
          	$("#week-date-" + i).text(weekMonth + "/" + weekDate).hide().fadeIn(fadeInTime);
          	$("#week-icon-" + i).addClass(icon).hide().fadeIn(fadeInTime);			
					  $("#week-high-" + i).html(weekHighF + degree).hide().fadeIn(fadeInTime);
						$("#week-low-" + i).html(weekLowF + degree).hide().fadeIn(fadeInTime);
		
						i++;
						if (i > 6) {clearInterval(updateWeek);}						
					}, panelTime);
		}
		
		else if (measurement == "c") {
			//WEEK STUFF
          var i = 1;			  				
				  var updateWeek = setInterval(function(){
          	var weekDay = weekData.forecast.simpleforecast.forecastday[i].date.weekday;
          	var weekMonth = weekData.forecast.simpleforecast.forecastday[i].date.month;
          	var weekDate = weekData.forecast.simpleforecast.forecastday[i].date.day;         
          	var weekHighC = weekData.forecast.simpleforecast.forecastday[i].high.celsius;
          	var weekLowC = weekData.forecast.simpleforecast.forecastday[i].low.celsius;
						var weekIcon = weekData.forecast.simpleforecast.forecastday[i].icon;
          	var icon = getIcon(weekIcon);

          	$("#week-day-" + i).text(weekDay.toUpperCase().slice(0,3)).hide().fadeIn(fadeInTime);
          	$("#week-date-" + i).text(weekMonth + "/" + weekDate).hide().fadeIn(fadeInTime);
          	$("#week-icon-" + i).addClass(icon).hide().fadeIn(fadeInTime);			
					  $("#week-high-" + i).html(weekHighC + degree).hide().fadeIn(fadeInTime);
						$("#week-low-" + i).html(weekLowC + degree).hide().fadeIn(fadeInTime);
		
						i++;
						if (i > 6) {clearInterval(updateWeek);}						
					}, panelTime);
		}
		
	} //weekUpdateTemp end
	
	
	
	
	
	
	
 	//VARIABLES GALORE
	var api = "https://api.wunderground.com/api/";
  var apiKey = "df10e0b6198c7361";
  var todayCond = "/geolookup/conditions/q/";
  var weekCond = "/geolookup/forecast10day/q/";
  var format = ".json";
  var tempF;
	var tempC;
  var icon;
  var degree = "&deg;";
	var weekData;
	var dayData;
	var fadeInTime = 1000;
	var panelTime = 300;
	
	
	//GET TODAY 
	function getToday(zip) {
    var todayurl = api + apiKey + todayCond + zipCode + format;
    $.ajax({
      type: "GET",
      url: todayurl,
      async: false,
      contentType: "application/json",
      dataType: "jsonp",
      success: function(data) {

				dayData = data;				
        var city = dayData.current_observation.display_location.city;
        var icon = getIcon(dayData.current_observation.icon);

				$(".today-current").text("CURRENTLY").hide().fadeIn(1000);
        $(".today-city").text(city.toUpperCase()).hide().fadeIn(1000);
				$("#today-icon").addClass(icon).hide().fadeIn(1000);
				
				dayUpdateTemp("f");
      
      } //success close
    }); //ajax close
  } // getToday close

  getToday(zipCode);
	
	
	
	
	//GET WEEK
	  function getWeek(zip) {
    var weekurl = api + apiKey + weekCond + zipCode + format;
    $.ajax({
      type: "GET",
      url: weekurl,
      async: false,
      contentType: "application/json",
      dataType: "jsonp",
      success: function(data) {       
				weekData = data;
				console.log(weekData);
        weekUpdateTemp("f");  		
      } //success close
    }); //ajax close
  } // getWeek close
  getWeek(zipCode);
	
	
	
	//SWITCH FAHRENHEIT/CELSIUS
	var fahrenheit = true;
	$(".fah-cel").click(function(){
		
		$(".f").toggleClass("highlight");
		$(".c").toggleClass("highlight");
		
		if (fahrenheit == true) {
			dayUpdateTemp("c");
			weekUpdateTemp("c"); 
			fahrenheit = false;
		}
		else {
			dayUpdateTemp("f");
			weekUpdateTemp("f"); 
			fahrenheit = true;
		}
		
		
		
	});
	
	
	
	
	
	

	
});