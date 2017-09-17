var peopleForm = document.getElementById('peopleForm');
var changeWeather = document.getElementById("changeWeather");
changeWeather.addEventListener("click", toggleCF);
peopleForm.addEventListener('submit', addPeople);

var state = {
		users: [
				{
					id: 1,
					name: "Jim",
					lastName: "Halpert"
				},
				{
					id: 2,
					name: "Pam",
					lastName: "Beasly"
				}
			],
		weather:{change:true}
	};

	function toggleCF() {
		if(state.weather.change === true){
			var celcius = (state.weather.temp - 32) * (5/9);
			document.getElementById("currentWea").innerHTML = celcius.toFixed(1) + "<sup>o</sup>C";
			state.weather.change = !state.weather.change;
			console.log(state.weather.change);

		} else {
			state.weather.change = !state.weather.change;
			document.getElementById("currentWea").innerHTML = state.weather.temp.toFixed(1) +"<sup>o</sup>F";
		}
	}


function fetchPeople(){
	var peopleSide = document.getElementById("peopleSide");
	var output = "<h2 style='border-bottom:2px solid black; text-align:center'>The List</h2>";
	var people = state.users.map( a => {
		output += `
			<h1>${a.name} ${a.lastName}` +
			'<span style="margin-left:20px; color:red" onclick="removeUser(\''+a.id+'\')">X</span>' +
			`</h1>`
	});
	peopleSide.innerHTML = output;
}

function addPeople(e){
	e.preventDefault();
	var users = state.users;
	var id = users.length + 1;
	var name = document.getElementById('name').value;
	var lastname = document.getElementById('lastname').value;
	var fullName = {id: id, name:name, lastName:lastname};
	users.push(fullName);
	console.log(state);
	fetchPeople();
}

function removeUser(id) {
	var users = state.users;
	let index = users.findIndex( a => a.id === Number(id));
	console.log(index);
	users.splice(index, 1);
	fetchPeople();
}


function weatherPromise(lat, lon) {
	var promise = fetch("http://api.openweathermap.org/data/2.5/weather?&units=imperial&lat="+lat+"&lon="+lon+ "apiKey");
	return promise;
}

var getWeather = function() {
	var locationPromise = fetch("http://ip-api.com/json");
	return locationPromise.then(function(res){
		return res.json()
	}).then(function(data){
		return weatherPromise(data.lat, data.lon)
	}).then(function(res){
		return res.json();
	}).then(function(data){
		var weather = document.getElementById('currentWea');
		var desc = document.getElementById('currentDes');
		state.weather.temp = data.main.temp;
		state.weather.description = data.weather[0].description;
		weather.innerHTML = state.weather.temp +"<sup>o</sup>F";
		desc.innerHTML = state.weather.description;
	});
};
getWeather();






(function somePeople(){
	var promise = fetch('https://jsonplaceholder.typicode.com/posts');
	return promise.then(function(res){
		return res.json()
	})
	.then(function(data){
		var output = "";
		data.map(function(a){
			output += `<h1>Title: ${a.title}</h1>
								<p>The Body: ${a.body}</p>`;
		});
		var books = document.getElementById('books');
		books.innerHTML = output;
	});
})();
