
require("dotenv").config();
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
    console.log(response);
  })
}



// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then(answers => {
//     // Use user feedback for... whatever!!
//   });