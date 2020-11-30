"use strict";
const axios = require("axios");
require("dotenv").config();
var key = process.env["MOVIESDB_API_KEY"];
// get movie info when the title is given
module.exports.movieInfo = async (event) => {
  const movieTitle = event.currentIntent.slots["Movie"];
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    key +
    "&language=en-US&query=" +
    movieTitle +
    "&page=1&include_adult=false";
  var answer;
  var first;
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (typeof response.data == "undefined" || data.total_results == 0) {
      answer = "Cannot find it. Sorry about that! Please try again.";

      return {
        sessionAttributes: {},
        dialogAction: {
          type: "Close",
          fulfillmentState: "Fulfilled",
          message: {
            contentType: "PlainText",
            content: answer,
          },
        },
      };

    } else {
      first = data.results[0];
      answer = "Plot: " + first.overview;
    }
    return {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },

        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: first.original_title + " (" + first.vote_average + "/10)",
              //"subTitle":"Plot:"+first.overview,
              subTitle: "Released on " + first.release_date,
              imageUrl: "https://image.tmdb.org/t/p/w500" + first.poster_path,
              buttons: [
                {
                  text: "Check other film",
                  value: "Suggest me a movie",
                },
                {
                  text: "I'm done",
                  value: "Adios!",
                },
              ],
            },
          ],
        },

      },
    };
  } catch (error) {
    console.log(error);
  }
};

// list the movie titles when a genre is provided
module.exports.moviesByGenre = async (event) => {
  var genreList = {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37 
  };
  const genre = event.currentIntent.slots["Genre"];
  const genreId = genreList[genre];
  var title;
  var data;
  try {
    if (typeof genreId == "undefined") {
      title = "Sorry, I could not find this genre. Please try again!";

      return {
        sessionAttributes: {},
        dialogAction: {
          type: "Close",
          fulfillmentState: "Fulfilled",
          message: {
            contentType: "PlainText",
            content: title,
          },
        },
      };

    } else {
      const url =
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
        key +
        "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
        genreId;
      const response = await axios.get(url);
      data = response.data;
      console.log("building response card");
    }
    return {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: "These are the top 5 movies in this genre.",
        },

        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              //"title":"Click to get more details.",
              subTitle: "Click to get more details",
              //"imageUrl":"",
              //"attachmentLinkUrl":"URL of the attachment to be associated with the card",
              buttons: [
                {
                  text: data.results[0].original_title,
                  value: "Tell me about " + data.results[0].original_title,
                },
                {
                  text: data.results[1].original_title,
                  value: "Tell me about " + data.results[1].original_title,
                },
                {
                  text: data.results[2].original_title,
                  value: "Tell me about " + data.results[2].original_title,
                },
                {
                  text: data.results[3].original_title,
                  value: "Tell me about " + data.results[3].original_title,
                },
                {
                  text: data.results[4].original_title,
                  value: "Tell me about " + data.results[4].original_title,
                },
              ],
            },
          ],
        },

      },
    };
  } catch (error) {
    console.log(error);
  }
};
