var express = require('express');
var router = express.Router();
const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

// var Client = require('node-rest-client').Client;
// var client = new Client();
const API_KEY = process.env.MOVIESDB_API_KEY;
console.log('API_KEY: ' + API_KEY);
const MovieDB = require('moviedb')(API_KEY);
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var movieResponse;
  MovieDB.movieInfo({ id: 666 }, (err, res) => {
    movieResponse = res;
    console.log(res);
  });
  res.send('movies data');
});

module.exports = router;
