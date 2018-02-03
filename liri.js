//console.log("bot is working");
require('dotenv').config();
// Used for OMDB HTTP Request
var request = require('request');
//Take these keys in keys.js add the program to this one
var keys = require('./keys.js');
//Used to import the client library for the Twitter
var Twitter = require('twitter');
//Used to import the client library for the Spotify
var Spotify = require('node-spotify-api');
//Used the Node.js file system module allow you to work with the file system
var fs = require('fs'); //file system
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
            returnSpotify(functionData);
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
// Creates a function for getting a movie name
// ------------------------------------------------------
// If the user doesn't type a movie in, the program will output data for the movie Mr. Nobody.
var getMeMovie = function (movieName) {
  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }
// Create the http request for getting movie info
  var httpRequest =
    'http://www.omdbapi.com/?t=' +
    movieName +
    '&y=&plot=full&tomatoes=true&r=json&apikey=trilogy';

  request(httpRequest, function(error, response, body) {
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
// Creates a function for getting Mike's Tweets
// ------------------------------------------------------
var getTweets = function() {
  var client = new Twitter(keys.twitter);

  var params = {screen_name: 'iggy788', count: 20};

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
      //writeToLog('************');
      //writeToLog(data);
      //writeToLog('************');
    }
  });
};
// ------------------------------------------------------
// Creates a function for finding artist name from spotify
// ------------------------------------------------------
var getArtistNames = function(artist) {
  return artist.name;
};

//Function for finding songs on Spotify
var returnSpotify = function (songName) {
    var spotify = new Spotify(keys.spotify);
  //If it doesn't find a song, find Blink 182's What's my age again
  if (songName === undefined) {
    songName = 'What\'s my age again';
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    //var songs = data.tracks;
    console.log(songs);
    var songData = []; //empty array to hold data

    for (var i = 0; i < songs.length; i++) {
      songData.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log('************');
    console.log(songData);
    console.log('************');
    //writeToLog('************');
    //writeToLog(songData);
    //writeToLog('************');
  });
};
// ------------------------------------------------------
//Creates a function for doing what we tell it to do
// ------------------------------------------------------
var doWhatItSays = function() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    console.log('************');
    console.log(data);
    console.log('************');
    //writeToLog('************');
    //writeToLog(data);
    //writeToLog('************');
    var dataArr = data.split(',');

    if (dataArr.length == 2) {
      userPick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      userPick(dataArr[0]);
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