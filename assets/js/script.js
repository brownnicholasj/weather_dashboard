//Button listener for search
var searchBtn = document.querySelector('#searchBtn');
var currDay = document.querySelector('#currentDay');
var weatherAPI = '8b5e2ad6d72ea564603e9e5c823217fd';

searchBtn.addEventListener('click', function (event) {
	event.preventDefault;
	event.stopPropagation;
	console.log('search button pressed');
	var cityName = document.getElementById('cityInput').value;
	console.log(cityName);

	var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}&units=imperial`;

	fetch(requestUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(`Data Whole view below`);
			console.log(data);
			console.log(data.city);
			var listCity = data.name;
			currDay.children[0].innerHTML = listCity;

			var ulEl = document.createElement('ul');
			var tempEL = document.createElement('li');

			ulEl.setAttribute('id', 'uList');
			currDay.appendChild(ulEl);
			var currentTemp = {
				temp: data.main.temp,
				wind: data.wind.speed,
				humid: data.main.humidity,
				//UV Found from Long/Lat call needs to be put in
			};

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
		});
});

var pastCities = [
	{
		city: 'New York',
		state: 'NY',
		zip: '',
		long: '',
		lat: '',
		country: 'USA',
	},
	{
		city: 'Chicago',
		state: 'IL',
		zip: '',
		long: '',
		lat: '',
		country: 'USA',
	},
	{
		city: 'Seattle',
		state: 'WA',
		zip: '',
		long: '',
		lat: '',
		country: 'USA',
	},
];

// Populate the searched cities section
function searchHistory() {
	var savedCities = document.querySelector('#savedCities');

	for (var i = 0; i < pastCities.length && i < 7; i++) {
		var btn = document.createElement('BUTTON');
		btn.setAttribute('class', 'btn btn-secondary m-1');
		btn.setAttribute('id', 'searchHistBtn');
		btn.innerHTML = pastCities[i].city;
		console.log(btn);
		savedCities.append(btn);
	}
}

searchHistory();
