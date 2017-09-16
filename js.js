
var peopleForm = document.getElementById('peopleForm');
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
			]
	};


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
	var promise = fetch("http://api.openweathermap.org/data/2.5/weather?&units=imperial&lat="+lat+"&lon="+lon+ "&appid=YOUR API KEY");
	return promise;
}

(function getWeather() {
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
		weather.innerHTML = `Temperature <br> ${data.main.temp} <sup>o</sup>F`;
		desc.innerHTML = `${data.weather[0].description}`
	});
})();

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
