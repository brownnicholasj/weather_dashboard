// global variable storage
var searchBtn = document.querySelector('#searchBtn');
var currDay = document.querySelector('#currentDay');
var forecastDays = document.querySelector('#fcContainer');
var savedCities = document.querySelector('#savedCities');
var weatherAPI = '8b5e2ad6d72ea564603e9e5c823217fd';
var today = dayjs().format('MM_DD_YYYY');
var todayFormatted = dayjs().format('MM/DD/YYYY');

var currentCityLookup = [];

//call openWeather API and store data to local
searchBtn.addEventListener('click', function (event) {
	event.preventDefault;
	event.stopPropagation;

	var cityName = document.getElementById('cityInput').value;
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
				day1_temp: data2.daily[1].temp.day,
				day1_wind: data2.daily[1].wind_speed,
				day1_humid: data2.daily[1].humidity,
				day1_uvi: data2.daily[1].uvi,
				day1_icon: data2.daily[1].weather[0].icon,
				day1_weather: data2.daily[1].weather[0].main,
				day2_date: data2.daily[2].dt,
				day2_temp: data2.daily[2].temp.day,
				day2_wind: data2.daily[2].wind_speed,
				day2_humid: data2.daily[2].humidity,
				day2_uvi: data2.daily[2].uvi,
				day2_icon: data2.daily[2].weather[0].icon,
				day2_weather: data2.daily[2].weather[0].main,
				day3_date: data2.daily[3].dt,
				day3_temp: data2.daily[3].temp.day,
				day3_wind: data2.daily[3].wind_speed,
				day3_humid: data2.daily[3].humidity,
				day3_uvi: data2.daily[3].uvi,
				day3_icon: data2.daily[3].weather[0].icon,
				day3_weather: data2.daily[3].weather[0].main,
				day4_date: data2.daily[4].dt,
				day4_temp: data2.daily[4].temp.day,
				day4_wind: data2.daily[4].wind_speed,
				day4_humid: data2.daily[4].humidity,
				day4_uvi: data2.daily[4].uvi,
				day4_icon: data2.daily[4].weather[0].icon,
				day4_weather: data2.daily[4].weather[0].main,
				day5_date: data2.daily[5].dt,
				day5_temp: data2.daily[5].temp.day,
				day5_wind: data2.daily[5].wind_speed,
				day5_humid: data2.daily[5].humidity,
				day5_uvi: data2.daily[5].uvi,
				day5_icon: data2.daily[5].weather[0].icon,
				day5_weather: data2.daily[5].weather[0].main,
			};

			var storedCities = JSON.parse(localStorage.getItem('weather'));
			if (storedCities == null || storedCities == '') {
				storedCities = [];
			}

			storedCities.unshift(detailWeather);

			localStorage.setItem('weather', JSON.stringify(storedCities));

			searchHistory();
			currentCityLookup = detailWeather;
			clearCurrent('currentDay');
			clearCurrent('fcContainer');

			viewForecast();
			view5day(
				currentCityLookup.day1_date,
				currentCityLookup.day1_icon,
				currentCityLookup.day1_temp,
				currentCityLookup.day1_wind,
				currentCityLookup.day1_humid
			);
			view5day(
				currentCityLookup.day2_date,
				currentCityLookup.day2_icon,
				currentCityLookup.day2_temp,
				currentCityLookup.day2_wind,
				currentCityLookup.day2_humid
			);
			view5day(
				currentCityLookup.day3_date,
				currentCityLookup.day3_icon,
				currentCityLookup.day3_temp,
				currentCityLookup.day3_wind,
				currentCityLookup.day3_humid
			);
			view5day(
				currentCityLookup.day4_date,
				currentCityLookup.day4_icon,
				currentCityLookup.day4_temp,
				currentCityLookup.day4_wind,
				currentCityLookup.day4_humid
			);
			view5day(
				currentCityLookup.day5_date,
				currentCityLookup.day5_icon,
				currentCityLookup.day5_temp,
				currentCityLookup.day5_wind,
				currentCityLookup.day5_humid
			);
		});
});

// eventListener for saved cities button click
savedCities.addEventListener('click', handleHistClick);

// Populate the searched cities section
function searchHistory() {
	var pastCities = JSON.parse(localStorage.getItem('weather'));

	//clear section for reset
	savedCities.innerHTML = '';

	for (var i = 0; i < pastCities.length && i < 7; i++) {
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
	var date = dayjs.unix(currentCityLookup.current_date).format('MM/DD/YYYY');
	var currWeatherIcon = `<img src="http://openweathermap.org/img/wn/${currentCityLookup.current_icon}.png" alt="weather icon">`;
	var cityTitle = document.createElement('h2');
	cityTitle.setAttribute('id', 'cityTitle');
	cityTitle.innerHTML = `${cityName} (${date}) ${currWeatherIcon}`;
	currDay.append(cityTitle);

	var ulEl = document.createElement('ul');
	ulEl.setAttribute('id', 'uList');

	currDay.append(ulEl);
	// Append temp
	currentTempAttr(`current_temp`, 'Temp', currentCityLookup.current_temp, 'F');
	currentTempAttr(
		`current_wind`,
		'Wind',
		currentCityLookup.current_wind,
		'MPH'
	);
	currentTempAttr(
		`current_humid`,
		'Humidity',
		currentCityLookup.current_humid,
		'%'
	);
	currentTempAttr(
		`current_uvi`,
		'UV Index',
		currentCityLookup.current_uvi,
		'_'
	);

	function currentTempAttr(param, label, output, uom) {
		var pEl = document.createElement('p');
		var spanEl = document.createElement('span');
		var iEl = document.createElement('i');
		spanEl.innerHTML = uom;
		pEl.setAttribute('id', param);
		if (param === 'current_uvi') {
			if (output <= 2) {
				iEl.setAttribute(
					'class',
					'fas fa-exclamation-triangle uvIndexGreen p-2'
				);
				spanEl.innerHTML = '';
			} else if (output <= 5) {
				iEl.setAttribute(
					'class',
					'fas fa-exclamation-triangle uvIndexYellow p-2'
				);
				spanEl.innerHTML = '';
			} else {
				iEl.setAttribute('class', 'fas fa-exclamation-triangle uvIndexRed p-2');
				spanEl.innerHTML = '';
			}
		}
		pEl.innerHTML = `${label}: ${output} `;
		if (param === 'current_uvi') {
			pEl.append(iEl);
		} else {
			pEl.append(spanEl);
		}
		ulEl.append(pEl);
	}
}

//clear currentView
function clearCurrent(elementid) {
	var removeEl = document.getElementById(elementid);
	if (removeEl !== null) {
		var count = removeEl.childElementCount;
		while (removeEl.hasChildNodes()) {
			removeEl.removeChild(removeEl.lastChild);
		}
	}
}

// populate 5-day forecast
function view5day(date, icon, temp, wind, humid) {
	var h4El = document.createElement('h4');
	var pEl = document.createElement('p');
	var tempEl = document.createElement('p');
	var windEl = document.createElement('p');
	var humidEl = document.createElement('p');
	var divEl = document.createElement('div');
	var ulEl = document.createElement('ul');
	ulEl.setAttribute('id', 'uList');
	var calendar = dayjs.unix(date).format('MM/DD/YYYY');
	var weatherIcon = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;

	ulEl.innerHTML = weatherIcon;
	pEl.textContent = calendar;
	ulEl.prepend(pEl);
	tempEl.textContent = `Temp: ${temp} F`;
	ulEl.append(tempEl);
	windEl.textContent = `Wind: ${wind} MPH`;
	ulEl.append(windEl);
	humidEl.textContent = `Humidity: ${humid} %`;
	ulEl.append(humidEl);
	divEl.setAttribute('id', 'forecastBox');
	divEl.append(ulEl);
	forecastDays.append(divEl);
}

// handles historic/saved cities button click
function handleHistClick(event) {
	var cityValue = event.target.innerHTML;
	pullSavedCityData(cityValue);
}

// executes actions from saved cities button click
function pullSavedCityData(city) {
	var pastCities = JSON.parse(localStorage.getItem('weather'));
	for (var i = 0; i < pastCities.length; i++) {
		if (pastCities[i].city === city) {
			currentCityLookup = pastCities[i];
			clearCurrent('currentDay');
			clearCurrent('fcContainer');
			viewForecast();
			view5day(
				currentCityLookup.day1_date,
				currentCityLookup.day1_icon,
				currentCityLookup.day1_temp,
				currentCityLookup.day1_wind,
				currentCityLookup.day1_humid
			);
			view5day(
				currentCityLookup.day2_date,
				currentCityLookup.day2_icon,
				currentCityLookup.day2_temp,
				currentCityLookup.day2_wind,
				currentCityLookup.day2_humid
			);
			view5day(
				currentCityLookup.day3_date,
				currentCityLookup.day3_icon,
				currentCityLookup.day3_temp,
				currentCityLookup.day3_wind,
				currentCityLookup.day3_humid
			);
			view5day(
				currentCityLookup.day4_date,
				currentCityLookup.day4_icon,
				currentCityLookup.day4_temp,
				currentCityLookup.day4_wind,
				currentCityLookup.day4_humid
			);
			view5day(
				currentCityLookup.day5_date,
				currentCityLookup.day5_icon,
				currentCityLookup.day5_temp,
				currentCityLookup.day5_wind,
				currentCityLookup.day5_humid
			);
			return;
		}
	}
}

// maintenance function on local storage to clear out data older than current date
function localStorageMaintenance(date) {
	var storedCities = JSON.parse(localStorage.getItem('weather'));
	for (var i = 0; i < storedCities.length; i++) {
		if (
			dayjs.unix(storedCities[i].current_date).format('MM/DD/YYYY') !==
			todayFormatted
		) {
			storedCities.splice(i, 1);
		}
	}
	localStorage.setItem('weather', JSON.stringify(storedCities));
}

// Populate the search history at load of page
searchHistory();
// maintain local storage to clear old data upon page load
localStorageMaintenance(todayFormatted);
