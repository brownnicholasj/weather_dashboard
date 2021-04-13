//Button listener for search
var searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', function (event) {
	event.preventDefault;
	event.stopPropagation;
	console.log('search button pressed');
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
