
require("dotenv").config();
// var keys = require("./key.js");
const moment = require("moment");
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
const axios = require('axios');
var params = process.argv.splice(3).join(" ");
// var spotify = new Spotify({
//     id: <your spotify client id>,
//     secret: <your spotify client secret>
//   });

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

  }
}



// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then(answers => {
//     // Use user feedback for... whatever!!
//   });