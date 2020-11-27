var express = require('express');
var router = express.Router();
var request = require('request');
var verifyTokenHandler = require("./verify");
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
router.post('/getsingleMovie', verifyTokenHandler, function (req, res, next) {
  console.log('-----Inside single movie function server.js------: ' + req.body.id);
  var movieID = req.body.id;
  MovieDB.movieInfo({ id: movieID }, (err, result) => {
    if (result) {
      // res.status(200).send(result);
      res.render('singlemovie', {
        singlemoviearticle: result
      });
    }
    else {
      console.log(
        '------error received in single movie function server side------:' + err
      );
      res.status(500).send('error in retrieving the single movie results !');
    }
  });
});

/* Search movie using keyword search for title*/
router.post('/searchbyKey', verifyTokenHandler, function (req, res, next) {
  var searchQuery = req.body.movieTitle;
  console.log('-----Inside search function server.js------');
  MovieDB.searchMovie({ query: searchQuery }, (err, data) => {
    if (data) {
      console.log(data);
      // res.status(200).send(data);
      //res.render('movieSearch', { ma: data.results });
      res.render('movies', { moviearticle: data.results });
    }
    else {
      console.log(
        '------error received in search function server side------:' + err
      );
      res.status(500).send('error in retrieving the search results !');
    }
  });
});


/* function to buy movie*/
router.post('/buyMovie', verifyTokenHandler, function (req, res, next) {
  console.log('-----Inside buymovie server.js------');
  var email_id = req.body.userName;
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
router.post('/getwatchList', verifyTokenHandler, function (req, res, next) {
  var email = req.body.userName;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `movies`.watch_list where email_id='" + email + "'",
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
        } else console.log('Row inserted');
        console.log(result);
        return res.render('watchList', { wl: result });
        //return res.status(200).json(result);
      }
    );
  });
});
/* function to favorite movie*/
router.post('/favorite', verifyTokenHandler, function (req, res, next) {
  console.log('-----Inside favorite-movie server.js------');
  var email_id = req.body.userName;
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
router.post('/getfav', verifyTokenHandler, function (req, res, next) {
  var email = req.body.userName;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `movies`.fav_list where email_id='" + email + "'",
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
        } else console.log('Row inserted');
        return res.render('./favlist', { fl: result });
        //return res.status(200).json(result);
      }
    );
  });
});
module.exports = router;
