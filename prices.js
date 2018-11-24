var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () {
  // Begin accessing JSON data here
  }
}

// Send request
request.send();
var data = JSON.parse(this.response);

data.forEach(movie => {
  // Log each movie's title
  console.log(movie.title);
});
