# LIRI Bot

### Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Before You Begin

### Install These Packages
1. npm init -y
    * npm init -y sets up a project with defaults, that is pretty useful for test projects or prototyping and initialize a `package.json` file for your project.
2. npm install
    * npm install will install all modules listed as dependencies in package.json
3. npm install twitter --save
   * [Twitter](https://www.npmjs.com/package/twitter)
   * Set var Twitter = require('twitter');
4. npm install node-spotify-api --save
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   * Set var Spotify = require('node-spotify-api');
5. npm install request --save
   * [Request](https://www.npmjs.com/package/request)
   * Set var request = require('request');
   * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).
6. npm install dotenv --save
   * [DotEnv](https://www.npmjs.com/package/dotenv)
   * Set require('dotenv').config();
7. You don't need to install anything, but using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    * Set var fs = require('fs');

8. LIRI will display your latest tweets. As we do not want to display your personal account, or its keys, please make an alias account and add a few tweets to it!

Follow the format presented in these queries

* node liri.js my-tweets
* node liri.js spotify-this-song '<song name here>'
* node liri.js movie-this '<movie name here>'
* node liri.js do-what-it-says

### Instructions

### What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.