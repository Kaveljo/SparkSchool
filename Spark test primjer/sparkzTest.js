linkovi koristeni:
https://www.w3schools.com/xml/ajax_intro.asp  // function loadDoc()
 
_________________________________________________________________________
zadaci:
 
// 1. Napisati funkciju za asinkroni dohvat podataka sa servera. Dohvatiti JSON s
// https://api.myjson.com/bins/o4lmf i preko callbacka pozvati obradu podataka.
 
function getData(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (callback) {
        callback(JSON.parse(xhttp.response));
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
};
 
function parseData(data) {
  logSortedByYear(data.movies);
  logAvgYear(data.movies);
  logActors(data.movies);
};
 
getData("https://api.myjson.com/bins/o4lmf", parseData);
 
// 2. Ispisati nazive filmova sortirane po starini (ispisati naziv_filma - godina).
 
function logSortedByYear(movies) {
  var sorted = Object.keys(movies).map(function(key) {
    return movies[key];
  }).sort(function(a, b) {
    return a.Year - b.Year;
  })
  sorted.forEach(function(movie) {
    console.log(movie.Title + " - " + movie.Year);
  });
};
 
// 3. Ispisati prosječnu starost filmova.
 
function logAvgYear(movies) {
  var avgAge = 0;
  var currentYear = new Date().getFullYear();
  var keys = Object.keys(movies);
 
  keys.forEach(function(key) {
    var movie = movies[key];
    avgAge += currentYear - parseInt(movie.Year, 10);
  });
  avgAge /= keys.length;
  console.log(avgAge)
};
 
// 4. Ispisati imena glumaca koji se pojavljuju u više filmova.
 
function logActors(movies) {
  var actors = {};
 
  Object.keys(movies).forEach(function(key) {
    var movie = movies[key];
 
    movie.Actors.forEach(function(actor) {
      if (!actors[actor]) {
        actors[actor] = 0;
      }
      actors[actor]++;
    });
  });
  Object.keys(actors).forEach(function(actor) {
    var count = actors[actor];
    if (count > 1) {
      console.log(actor);
    }
  });
};
 
// 5. Definirati konstruktor (klasu) "Movie" koja će sadržavati:
//     name (naziv)
//     rating (prosječnu ocjenu)
//     votes (broj glasova)
// Dodati metodu "vote"  koja će primati ocjene 1 - 10 i koja će preračunati prosječnu ocjenu filma.
// Dodati metodu za postavljanje trajanja filma u minutama.
// Dodati metodu za ispis trajanja filma u satima i minutama.
 
 
var Movie = function(name, rating, votes) {
  this.name = name;
  this.rating = rating;
  this.votes = votes;
};
 
Movie.prototype.vote = function(rating) {
  if (rating < 1 || rating > 10) {
    return;
  }
  this.rating = ((this.rating * this.votes) + rating) / (this.votes + 1);
  this.votes++;
}
 
Movie.prototype.setLength = function(movieLength){
    this.length=movieLength;
}
 
Movie.prototype.writeLength = function(){
    var hrs=parseInt(this.length/60);
  var mins=parseInt(this.length%60);
 
  console.log(hrs+":"+mins);
}
 
var a = new Movie('abc', 9, 5);
var b = new Movie('def', 8, 3);
 
console.log(a);
console.log(b);
 
a.vote(10);
b.vote(3);
 
a.setLength(150);
a.writeLength();
 
console.log(a);
console.log(b);