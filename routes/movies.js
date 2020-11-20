var express = require('express');
var router = express.Router();
var request = require('request');

const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

// var Client = require('node-rest-client').Client;
// var client = new Client();
const API_KEY = process.env.MOVIESDB_API_KEY;
const SESSION_ID = process.env.SESSION_ID;

console.log('API_KEY: ' + API_KEY);
console.log('SESSION_ID: ' + SESSION_ID);

const MovieDB = require('moviedb')(API_KEY);

const fetch = require('node-fetch');

const { MovieDb } = require('moviedb-promise');
const { constants } = require('buffer');
const moviedb = new MovieDb(API_KEY);

/* GET a movie-info by its unique ID. */
router.get('/get-by-id/:id', function (req, res, next) {
  var movieResponse;
  var movieID = req.params['id'];
  MovieDB.movieInfo({ id: movieID }, (err, result) => {
    movieResponse = res;
    console.log(res);
    console.log('movie ID:' + movieID);
    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retrieving the results !');
    }
  });
});

/* Search movie using keyword search for title*/
router.get('/get-by-query', function (req, res, next) {
  var searchQuery = req.query.query;
  console.log('called search API end-point !');
  console.log('search query for movie query operation: ' + searchQuery);

  MovieDB.searchMovie({ query: searchQuery }, (err, result) => {
    console.log(result);
    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retrieving the results !');
    }
  });
});

router.get('/get-by-query2', function (req, res, next) {
  var searchQuery = req.query.query;

  var outerResponse = '';
  const findMovie = async (searchQuery) => {
    const result = await moviedb.searchMovie(searchQuery);
    outerResponse = result;
    res.status(200).send(JSON.stringify(outerResponse));
  };
  try {
    const results = findMovie(searchQuery);
  } catch (e) {
    console.log('error while querying:: ' + e);
    res.status(500).send(e);
  }
});

/* get list of all top-rated movies*/
router.get('/get-toprated', function (req, res, next) {
  var movieResp;
  MovieDB.miscTopRatedMovies((err, result) => {
    movieResp = res;
    console.log(res);

    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retrieving top-rated movies!');
    }
  });
});

/* get images for movies by movie_id */
router.get('/get-movie-images/:id', function (req, res, next) {
  var movieimg;
  var movieID = req.params['id'];
  MovieDB.movieImages({ id: movieID }, (err, result) => {
    movieimg = res;
    console.log(res);
    console.log('movie ID:' + movieID);
    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retrieving image for movie !');
    }
  });
});

/* get movie review by movie_id */
router.get('/get-movie-review/:id', function (req, res, next) {
  var movierate;
  var movieID = req.params['id'];
  MovieDB.movieReviews({ id: movieID }, (err, result) => {
    movierate = res;
    console.log(res);
    console.log('movie ID:' + movieID);
    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retrieving movie rating !');
    }
  });
});

/* get Movie-trailor for movies by movie_id */
router.get('/get-movie-videos/:id', function (req, res, next) {
  var movieVideo;
  var movieID = req.params['id'];
  MovieDB.movieTrailers({ id: movieID }, (err, result) => {
    movieVideo = res;
    console.log(res);
    console.log('movie ID:' + movieID);
    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retrieving trailor for movie !');
    }
  });
});
/* Translations of movie by its movieId */
router.get('/translations/:id', function (req, res, next) {
  var movieTran;
  var movieID = req.params['id'];
  MovieDB.movieTranslations({ id: movieID }, (err, result) => {
    movieTran = res;
    console.log(res);
    console.log('movie ID:' + movieID);
    if (result) res.status(200).send(result);
    else {
      console.log('error received:' + err);
      res.status(500).send('error in retriving translations of movie !');
    }
  });
});

/* marking movie as a favourite
Example Request Body:
{
    "media_id":278,
    "media_type":"movie"
}
*/
router.post('/markfav', function (req, res, next) {
  console.log('mark favourite using requests method !!');

  var movie_id = req.body.media_id;
  var media_type = req.body.media_type; //should be "movie" for movies"

  var options = {
    method: 'POST',
    url:
      'https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=' +
      API_KEY +
      '&session_id=' +
      SESSION_ID,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      media_type: media_type,
      media_id: movie_id,
      favorite: true,
    }),
  };
  request(options, function (error, response) {
    if (error) {
      console.log('error ' + error);
      res.status(500).send(error);
    } else {
      console.log('sucess !' + response.body);
      res.status(200).send(response.body);
    }
  });
});

/*GET all movies marked as favourite */
router.get('/getallfav', function (req, res, next) {
  console.log('getting all favourite movies !!');

  var options = {
    method: 'GET',
    url:
      'https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=' +
      API_KEY +
      '&session_id=' +
      SESSION_ID,
    headers: {},
  };
  request(options, function (error, response) {
    if (error) {
      console.log('error ' + error);
      res.status(500).send(error);
    } else {
      console.log('sucess !' + response.body);
      res.status(200).send(response.body);
    }
  });
});

/* Add Movie to Watchlist
Example Request Body:
{
    "media_id":278,
    "media_type":"movie"
} */
router.post('/add-watchlist', function (req, res, next) {
  console.log('Adding movies to watchlist !!');

  var movie_id = req.body.media_id;
  var media_type = req.body.media_type;

  var request = require('request');
  var options = {
    method: 'POST',
    url:
      'https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=' +
      API_KEY +
      '&session_id=' +
      SESSION_ID,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      media_type: media_type,
      media_id: movie_id,
      watchlist: true,
    }),
  };
  request(options, function (error, response) {
    if (error) {
      console.log('error ' + error);
      res.status(500).send(error);
    } else {
      console.log('sucess !' + response.body);
      res.status(200).send(response.body);
    }
  });
});

/*GET all movies added to watchlist*/
router.get('/getall-watchlist-movies', function (req, res, next) {
  console.log('getting all favourite movies !!');

  var request = require('request');
  var options = {
    method: 'GET',
    url:
      'https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=' +
      API_KEY +
      '&session_id=' +
      SESSION_ID,
    headers: {},
  };
  request(options, function (error, response) {
    if (error) {
      console.log('error ' + error);
      res.status(500).send(error);
    } else {
      console.log('sucess !' + response.body);
      res.status(200).send(response.body);
    }
  });
});
module.exports = router;
