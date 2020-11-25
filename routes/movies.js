var express = require('express');
var router = express.Router();
var request = require('request');
var mySQL = require('mysql');
var pool = mySQL.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: 'cloud-project.cog0es3hfp6n.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Awsproject',
});
const AWS = require('aws-sdk');
const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.MOVIESDB_API_KEY;
const SESSION_ID = process.env.SESSION_ID;
const MovieDB = require('moviedb')(API_KEY);
const fetch = require('node-fetch');

const { MovieDb } = require('moviedb-promise');
const { constants } = require('buffer');
const moviedb = new MovieDb(API_KEY);

/* GET a movie-info by its unique ID. */
router.get('/getsingleMovie/:id', function (req, res, next) {
  console.log('-----Inside single movie function server.js------');
  var movieResponse;
  var movieID = req.params['id'];
  MovieDB.movieInfo({ id: movieID }, (err, result) => {
    movieResponse = res;
    if (result) res.status(200).send(result);
    else {
      console.log(
        '------error received in single movie function server side------:' + err
      );
      res.status(500).send('error in retrieving the single movie results !');
    }
  });
});

/* Search movie using keyword search for title*/
router.get('/searchbyKey', function (req, res, next) {
  var searchQuery = req.query.key;
  console.log('-----Inside search function server.js------');
  MovieDB.searchMovie({ query: searchQuery }, (err, result) => {
    if (result) res.status(200).send(result);
    else {
      console.log(
        '------error received in search function server side------:' + err
      );
      res.status(500).send('error in retrieving the search results !');
    }
  });
});

/* get list of all top-rated movies*/
router.get('/get-toprated', function (req, res, next) {
  console.log('-----Inside get all movies server.js------');
  var movieResp;
  MovieDB.miscTopRatedMovies((err, result) => {
    movieResp = res;
    if (result) res.status(200).send(result);
    else {
      console.log(
        '------error received in get movies function server side------:' + err
      );
      res.status(500).send('error in retrieving all the movie details!');
    }
  });
});

/* function to buy movie*/
router.post('/buyMovie', function (req, res, next) {
  console.log('-----Inside buymovie server.js------');
  var email_id = 'supriyameduri@gmail.com';
  var id = req.body.id;
  var title = req.body.title;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      'INSERT INTO `movies`.watch_list(email_id,movie_id,movie_title) values (?,?,?)',
      [email_id, id, title],
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
        } else console.log('Row inserted');
        return res.status(200).send('Added movie successfully');
      }
    );
  });
});

/* function to get watchlist */

router.get('/getwatchList', function (req, res, next) {
  var email = req.query.emailId;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `movies`.watch_list where email_id='" + email + "'",
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
        } else console.log('Row inserted');
        return res.status(200).json(result);
      }
    );
  });
});
/* function to favorite movie*/
router.post('/favorite', function (req, res, next) {
  console.log('-----Inside favorite-movie server.js------');
  var email_id = 'supriyameduri@gmail.com';
  var id = req.body.id;
  var title = req.body.title;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      'INSERT INTO `movies`.fav_list(email_id,movie_id,movie_title) values (?,?,?)',
      [email_id, id, title],
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
        } else console.log('Row inserted');
        return res.status(200).send('Added movie as favorite successfully');
      }
    );
  });
});

/* function to get all favorite movies */

router.get('/getfav', function (req, res, next) {
  var email = req.query.emailId;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `movies`.fav_list where email_id='" + email + "'",
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
        } else console.log('Row inserted');
        return res.status(200).json(result);
      }
    );
  });
});
module.exports = router;
