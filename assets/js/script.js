//Button listener for search
var searchBtn = document.querySelector('#searchBtn');
var currDay = document.querySelector('#currentDay');
var weatherAPI = '8b5e2ad6d72ea564603e9e5c823217fd';
var today = dayjs().format('MM_DD_YYYY H');
var todayFormatted = dayjs().format('MM/DD/YYYY HH:MM');
console.log(today);

var currentCityLookup = [];

searchBtn.addEventListener('click', function (event) {
	event.preventDefault;
	event.stopPropagation;
	// console.log('search button pressed');
	var cityName = document.getElementById('cityInput').value;
	// console.log(cityName);
	var cityLookup = {};
	var weather = [];

	var requestWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}&units=imperial`;

	fetch(requestWeather)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			cityLookup = {
				city: data.name,
				lon: data.coord.lon,
				lat: data.coord.lat,
				stamp: today,
			};

			return fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLookup.lat}&lon=${cityLookup.lon}&appid=${weatherAPI}&units=imperial`
			);
		})
		.then(function (response2) {
			return response2.json();
		})
		.then(function (data2) {
			// console.log(data2);
			var detailWeather = {
				city: cityLookup.city,
				lon: cityLookup.lon,
				lat: cityLookup.lat,
				stamp: cityLookup.stamp,
				current_date: data2.current.dt,
				current_temp: data2.current.temp,
				current_wind: data2.current.wind_speed,
				current_humid: data2.current.humidity,
				current_uvi: data2.current.uvi,
				current_icon: data2.current.weather[0].icon,
				current_weather: data2.current.weather[0].main,
				day1_date: data2.daily[1].dt,
				day1_temp: data2.daily[1].temp,
				day1_wind: data2.daily[1].wind_speed,
				day1_humid: data2.daily[1].humidity,
				day1_uvi: data2.daily[1].uvi,
				day1_icon: data2.daily[1].weather[0].icon,
				day1_weather: data2.daily[1].weather[0].main,
				day2_date: data2.daily[2].dt,
				day2_temp: data2.daily[2].temp,
				day2_wind: data2.daily[2].wind_speed,
				day2_humid: data2.daily[2].humidity,
				day2_uvi: data2.daily[2].uvi,
				day2_icon: data2.daily[2].weather[0].icon,
				day2_weather: data2.daily[2].weather[0].main,
				day3_date: data2.daily[3].dt,
				day3_temp: data2.daily[3].temp,
				day3_wind: data2.daily[3].wind_speed,
				day3_humid: data2.daily[3].humidity,
				day3_uvi: data2.daily[3].uvi,
				day3_icon: data2.daily[3].weather[0].icon,
				day3_weather: data2.daily[3].weather[0].main,
				day4_date: data2.daily[4].dt,
				day4_temp: data2.daily[4].temp,
				day4_wind: data2.daily[4].wind_speed,
				day4_humid: data2.daily[4].humidity,
				day4_uvi: data2.daily[4].uvi,
				day4_icon: data2.daily[4].weather[0].icon,
				day4_weather: data2.daily[4].weather[0].main,
				day5_date: data2.daily[5].dt,
				day5_temp: data2.daily[5].temp,
				day5_wind: data2.daily[5].wind_speed,
				day5_humid: data2.daily[5].humidity,
				day5_uvi: data2.daily[5].uvi,
				day5_icon: data2.daily[5].weather[0].icon,
				day5_weather: data2.daily[5].weather[0].main,
			};
			// console.log(detailWeather);
			var storedCities = JSON.parse(localStorage.getItem('weather'));
			if (storedCities == null || storedCities == '') {
				storedCities = [];
			}
			// console.log(`before -------------`);
			// console.log(storedCities);
			storedCities.unshift(detailWeather);
			// console.log(`after --------------`);
			// console.log(storedCities);

			// 	storedCities.unshift(detailWeather);
			localStorage.setItem('weather', JSON.stringify(storedCities));
			// } else {
			// 	localStorage.setItem('weather', JSON.stringify(detailWeather));
			// }
			searchHistory();
			currentCityLookup = detailWeather;
			// console.log(currentCityLookup);
			viewForecast();
		});
});

// Populate the searched cities section
function searchHistory() {
	var pastCities = JSON.parse(localStorage.getItem('weather'));
	var savedCities = document.querySelector('#savedCities');

	//clear section for reset
	savedCities.innerHTML = '';

	for (var i = 0; i < pastCities.length && i < 5; i++) {
		var btn = document.createElement('BUTTON');
		btn.setAttribute('class', 'btn btn-secondary m-1');
		btn.setAttribute('id', 'searchHistBtn');
		btn.innerHTML = pastCities[i].city;
		savedCities.append(btn);
	}
}

// View currentLookupCity [populates tables]
function viewForecast() {
	var cityName = currentCityLookup.city;
	var date = dayjs
		.unix(currentCityLookup.current_date)
		.format('MM/DD/YYYY HH:MM');
	var currWeatherIcon = `<img src="http://openweathermap.org/img/wn/${currentCityLookup.current_icon}.png" alt="weather icon">`;
	currDay.children[0].innerHTML = `${cityName} (${date}) ${currWeatherIcon}`;

	var ulEl = document.createElement('ul');
	ulEl.setAttribute('id', 'uList');

	currDay.append(ulEl);
	// console.log(Object.keys(currentCityLookup).length);
	for (var i = 0; i < Object.keys(currentCityLookup).length; i++) {
		// console.log(Object.keys(currentCityLookup)[i]);
		if (Object.keys(currentCityLookup)[i] === `current_temp`) {
			var ilEl = document.createElement('il');
			ilEl.setAttribute('id', Object.keys(currentCityLookup)[i]);
			ilEl.textContent = Object.keys(currentCityLookup)[i];
			ulEl.append(ilEl);
		}
	}
}

// Populate the search history at load of page
searchHistory();

// var listCity = data.name;
// currDay.children[0].innerHTML = listCity;

// var ulEl = document.createElement('ul');
// var tempEL = document.createElement('li');

// ulEl.setAttribute('id', 'uList');
// currDay.appendChild(ulEl);
// var currentTemp = {
// 	temp: data.main.temp,
// 	wind: data.wind.speed,
// 	humid: data.main.humidity,
//UV Found from Long/Lat call needs to be put in
// };

//Stored in array on CurrentTemp -- need to for loop to create li's

// var temp = data.main.temp;
// var wind = data.wind.speed;
// var humid = data.main.humidity;
// var uv = data;
// ulEl.append(tempEL);
// ulEl.children[0].textContent = temp;
// ulEl.append(tempEL);
// ulEl.children[1].textContent = wind;
// ulEl.append(tempEL);
// ulEl.children[2].textContent = humid;
// console.log(temp);
