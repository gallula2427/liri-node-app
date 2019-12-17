
require("dotenv").config();
var keys = require("./keys.js");
const moment = require("moment");
var Spotify = require('node-spotify-api');
const axios = require('axios');
const fs = require("fs");
var params = process.argv.splice(3).join(" ");
 var spotify = new Spotify(keys.spotify)

// =======================APP=RUNNING==================================

App(process.argv[2], params);

// =======================FUNCTION=DEFINITION==========================

function App(command, parameters) {
    switch (command) {
        case "concert-this":    
        getBand(parameters);
        break;
    
        case "movie-this":    
        getMovie(parameters);
        break;
    
        case "do-what-it-says":    
        doIt();
        break;
    
        case "spotify-this-song":    
        getSong(parameters);
        break;
    
        default:
            break;
        }
    }
    
// =====================2nd==FUNCTION=DEFINITION==========================

function getBand(artist) {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url)
  .then(function (response) {
    // handle success
    if (!response.data.length) {
      console.log("no result found for " + artist);
    };
    for (let i = 0; i < response.data.length; i++) {
      const show = response.data[i];
     console.log (`${show.venue.city}, ${show.venue.region || show.venue.country} at ${show.venue.name} ${moment(show.datetime).format("LLLL")}`)
     console.log("=================================================================================");
    }
  })
}

function getMovie(movie) {
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(url)
  .then(function (response) {
    // handle success
  const data = response.data;
  console.log("title: " + data.Title);
  console.log("year: " + data.Year);
  console.log("rated: " + data.Rated);
  console.log("imdbrating: " + data.imdbRating);
  console.log("country: " + data.Country);
  console.log("language: " + data.Language);
  console.log("plot: " + data.Plot);
  console.log("actors: " + data.Actors);
  data.Ratings.map(getTomatoes);
  console.log("=========================================================");
  });

  function getTomatoes(tomatoes) {
    if ( tomatoes.Source === "Rotten Tomatoes") {
      console.log("Rotten Tomates Rating: ", tomatoes.Value);
    }
  }
}

function doIt() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) throw error; 

    const dataArr = data.split(",");
    App(dataArr[0], dataArr[1]);
  })
}

function getSong(song) {
  spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
    
    for (let i = 0; i < response.tracks.items.length; i++) {
      const song = response.tracks.items[i];
      
      console.log("Number: ", i+1, "/", response.tracks.items.length);
      console.log('Artist: ', song.artists.map(getArtistName));
      console.log("Song Name: ", song.name);
      console.log("Preview Song: ", song.preview_url);
      console.log('Album: ', song.album.name);
      console.log("=================================================");
    }
  })
  .catch(function(err) {
    console.log(err);
  });

  function getArtistName(artist ) {
    console.log(artist.name);
    
  }
}