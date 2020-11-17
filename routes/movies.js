var express = require('express');
var router = express.Router();
const http = require('http');
const https = require('https');
const dotenv = require('dotenv');

// var Client = require('node-rest-client').Client;
// var client = new Client();
const API_KEY = process.env.MOVIESDB_API_KEY;
const SESSION_ID = process.env.SESSION_ID;

console.log('API_KEY: ' + API_KEY);
const MovieDB = require('moviedb')(API_KEY);
const fetch = require('node-fetch');

const { MovieDb } = require('moviedb-promise');
const { constants } = require('buffer');
const moviedb = new MovieDb(API_KEY);

/* GET a movie by its unique ID. */
router.get('/get-by-id/:id', function (req, res, next) {
  var movieResponse;
  var movieID = req.params['id'];
  MovieDB.movieInfo({ id: movieID }, (err, result) => {
    movieResponse = res;
    console.log(res);
    console.log('movie ID:' + movieID);
    res.send(result);
  });
});

/* Search movie using keyword search for title*/
router.get('/get-by-query', function (req, res, next) {
  var searchQuery = req.query.query;
  console.log('called search API end-point !');
  console.log('search query for movie query operation: ' + searchQuery);

  MovieDB.searchMovie({ query: searchQuery }, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

router.get('/get-by-query2', function (req, res, next) {
  var searchQuery = req.query.query;

  var outerResponse = '';
  const findMovie = async (searchQuery) => {
    const result = await moviedb.searchMovie(searchQuery);
    outerResponse = result;
    res.send(JSON.stringify(outerResponse));
  };
  try {
    const results = findMovie(searchQuery);
  } catch (e) {
    console.log('error while querying:: ' + e);
  }
});

/* marking movie as a favourite
To-Do: actual function call
*/
router.get('/account/:id/favorite', function (req, res, next) {
  var movieResponse;
  var movieID = req.params['id'];
  console.log('movie ID provided to mark as a favorite: ' + movieID);
  MovieDB.accountFavoriteUpdate({ id: movieID }, (err, result) => {
    movieResponse = res;
    console.log(res);
    res.send(result);
  });
  res.send('movies data Favorite movie');
});

router.get('/mark-fav/', function (req, res, next) {
  MovieDB.sessionId = SESSION_ID;
  MovieDB.accountMovieWatchlist('pranjalik')
    .then((res) => {
      // Your watchlist items
      console.log(res);
    })
    .catch(console.error);
});
module.exports = router;
