var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;
// console.log(process.argv);
var searchString = ""; // Create an empty string for holding the terms
if (nodeArgs.length > 2) { //only build a string if a search term is passed
    for (var i = 3; i < nodeArgs.length; i++) {
        // Build a string with the search terms.
        searchString = searchString + " " + nodeArgs[i];
    }
}

switch (process.argv[2]) { // decide between tweets, spotify, movie, or do what it says
    case `my-tweets`:
        myTweets();
        break;

    case `spotify-this-song`:
        spotifyThis();
        break;

    case `movie-this`:
        movieThis();
        break;

    case `do-what-it-says`:
        var dwis = fs.readFile("./random.txt");
        var command = dwis.split(",");
        searchString = command.slice(1);
        if (command[0] == 'myTweets') {
            myTweets();
        } else if (command[0] == 'spotify-this-song') {
            spotifyThis();
        } else if (command[0] == 'movie-this') {
            movieThis();
        } else
            break;
    default:
        console.log("Type either my-tweets, spotify-this-song(with a song), or movie-this(with a movie,) or do-what-it-says")
}

function myTweets() {
    //show your last 20 tweets and when they were created at in your terminal/bash window.
    var twitNameParam = { screen_name: 'vertabrett' };
    // console.log(client);
    client.get('statuses/user_timeline', twitNameParam, function (error, tweets, response) {
        for (i = 0; i < tweets.length; i++) {
            console.log("tweet " + i + ": " + JSON.stringify(tweets[i].text));
        }
        // console.log("response is: " + JSON.stringify(response));
    }) //end client.get
} //end myTweets

function spotifyThis() {
    console.log(nodeArgs.length);
    if (searchString == "" || searchString == " " || searchString == null || searchString == " " || nodeArgs.length == 3) {
        searchString = "The Sign Ace of Base";
    }
    spotify.search({ type: 'track', query: searchString }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Artist " + data.tracks.items[0].album.artists[0].name);
            console.log("Song name " + data.tracks.items[0].name);
            console.log("Album name " + data.tracks.items[0].album.name);
            console.log("Preview link " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        }
    });
}

function movieThis() {
    if (searchString == "") {
        searchString = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + searchString + "&plot=short&apikey=trilogy", function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's year is: " + JSON.parse(body).Year);
            console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's RT rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie's country is: " + JSON.parse(body).Country);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            console.log("The movie's actors are: " + JSON.parse(body).Actors);
        } // end if no error & code200
    }); // end request function
} // end movieThis
