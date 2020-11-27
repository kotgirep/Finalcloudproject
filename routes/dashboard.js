var express = require('express');
var router = express.Router();
var verifyTokenHandler = require("./verify");

const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.MOVIESDB_API_KEY;
const MovieDB = require('moviedb')(API_KEY);

router.get('/', function (req, res) {
    console.log('-----Inside get dashboard request ------');
    res.render('gettoken');
    return;
});

/* get list of all top-rated movies*/
router.post('/', verifyTokenHandler, function (req, res, next) {
    console.log('-----Inside get all movies server.js------');
    console.log(req.body.userName);
    // miscTopRatedMovies for top rated movies
    MovieDB.miscPopularMovies((err, data) => {
      if (data) {
        console.log(data);
        res.render('movies', { moviearticle: data.results });
        //res.status(200).send(data);
      }
      else {
        console.log(
          '------error received in get movies function server side------:' + err
        );
        res.status(500).send('error in retrieving all the movie details!');
      }
    });
  });

  module.exports = router;