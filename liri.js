//console.log("bot is working");
require('dotenv').config();
// Used for OMDB HTTP Request
var request = require('request');
//Take these keys in keys.js add the program to this one
var keys = require('./keys.js');
//Used to import the client library for the Twitter
var twitter = require('twitter');
//Used to import the client library for the Spotify
var spotify = require('node-spotify-api');
//Used the Node.js file system module allow you to work with the file system
//var fs = require('fs'); //file system
// ------------------------------------------------------
//Make it so liri.js can take in one of the following commands:
// ------------------------------------------------------
// try to answer the users request
var userPick = function (userRequest, functionData) {
    // we'll use a switch or if statement
    switch (userRequest) {
        //`my-tweets`
        case 'my-tweets':
            getTweets();
            break;
        //`spotify-this-song`
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        //`movie-this`
        case 'movie-this':
            getMeMovie(functionData);
            break;
        //`do-what-it-says`
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("I'm sorry, I only know responses about Iggy's Tweets,Song Requests, Movie Requests & Anything Else You Tell Me to Say");
    }
};
// ------------------------------------------------------
// Creates a function for getting a movie name
// ------------------------------------------------------
/*
var userMovie = encodeURI(process.argv.slice(2));

// request('Where do we want to go', 'What to do when it comes back');
request('http://www.omdbapi.com/?t='+ userMovie + '&y=&plot=short&apikey=trilogy', function (err, response, body) {
    console.log('-----------');
    console.log('Title: ' + JSON.parse(body).Title);
    console.log('Rating: ' + JSON.parse(body).Rated);
    console.log('Year: ' + JSON.parse(body).Year);
    console.log('Released: ' + JSON.parse(body).Released);
    console.log('Director: ' + JSON.parse(body).Director);
    console.log('-----------');
});
// ------------------------------------------------------
// Creates a function for getting Mike's Tweets
// ------------------------------------------------------
var getTweets = function() {
  var client = new twitter(keys.twitter);

  var params = {screen_name: 'iggy788', count: 1};

  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
          'created at: ': tweets[i].created_at,
          'Tweets: ': tweets[i].text,
        });
      }
      console.log('************');
      console.log(data);
      console.log('************');
      writeToLog('************');
      writeToLog(data);
      writeToLog('************');
    }
  });
};
*/
// ------------------------------------------------------
// Creates a function for getting a movie name
// ------------------------------------------------------
// If the user doesn't type a movie in, the program will output data for the movie Mr. Nobody.
var getMeMovie = function (movieName) {
  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }

  var urlHit =
    'http://www.omdbapi.com/?t=' +
    movieName +
    '&y=&plot=full&tomatoes=true&r=json&apikey=trilogy';

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
        'Title of the movie: ': jsonData.Title,
        'Year the movie came out: ': jsonData.Year,
        'IMDB Rating of the movie: ': jsonData.imdbRating,
        'Rotten Tomatoes Rating of the movie: ': jsonData.tomatoRating,
        'Country where the movie was produced: ': jsonData.Country,
        'Language of the movie: ': jsonData.Language,
        'Plot of the movie: ': jsonData.Plot,
        'Actors in the movie: ': jsonData.Actors,

        'Rotton Tomatoes URL: ': jsonData.tomatoURL,
      });
      console.log('************');
      console.log(data);
      console.log('************');
      //writeToLog('************');
      //writeToLog(data);
      //writeToLog('************');
    }
  });
};
// ------------------------------------------------------
//run this on load of js file
// ------------------------------------------------------
var searchThis = function(argOne, argTwo) {
  userPick(argOne, argTwo);
};
searchThis(process.argv[2], process.argv[3]);
// ------------------------------------------------------