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

	var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}`;

	fetch(requestUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(`Data Whole view below`);
			console.log(data);
			console.log(data.length);
			var listCity = document.createElement('span');
			listCity.textContent = data.name;
			currDay.append(listCity);
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
