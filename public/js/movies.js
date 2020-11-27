const { JsonWebTokenError } = require("jsonwebtoken");

function logOut() {
  console.log(window.localStorage.getItem("access-token"));
  $.ajax({
    url: "/signout/",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    success: function (data) {
      window.location.href = "/";
    },
    error: function (response, msg, error) {
      // TODO: show this on screen.
      console.log("unable to sign-out! please try again!");
      //window.location.href = '/';
    },
  });
}

function getWatchList() {
  $.ajax({
    url: "/movies/getwatchList",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    success: function (data) {
      // just replace content.
      var el = document.getElementById("content");
      el.innerHTML = data;
    },
    error: function (response, msg, error) {
      console.log("unable to load watchlist: " + error);
      alert("unable to load watchlist! please try again!");
    },
  });
}

function getFavorites() {
  $.ajax({
    url: "/movies/getfav",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    success: function (data) {
      // just replace content.
      var el = document.getElementById("content");
      el.innerHTML = data;
    },
    error: function (response, msg, error) {
      console.log("unable to load favorites: " + error);
      alert("unable to load favorites! please try again!");
    },
  });
}

function home() {
  $.ajax({
    url: "/dashboard",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    success: function (data) {
      document.open();
      document.write(data);
      document.close();
    },
    error: function (response, msg, error) {
      console.log("unable to go to home page: " + error);
      alert("unable to go to home page! please try again!");
    },
  });
}

function getSingleMovie(movieId) {
  console.log("inside getsingleMovie: " + movieId);
  var data = {id: movieId}
  $.ajax({
    url: "/movies/getsingleMovie",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    data: JSON.stringify(data),
    success: function (result) {
      console.log(JSON.stringify(result));
      // just replace content.
      var el = document.getElementById("content");
      el.innerHTML = result;
    },
    error: function (response, msg, error) {
      console.log("unable to load movie info: " + JSON.stringify(error));
      alert("unable to load movie info! please try again!");
    },
  });
}

// this method will be used by singlemovie.ejs
function buy(movieId, movieTitle) {
  console.log("inside buy movie: " + movieId + " : " + movieTitle);
  var data = {id: movieId, title: movieTitle}
  $.ajax({
    url: "/movies/buyMovie",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    data: JSON.stringify(data),
    success: function (result) {
      $('#actionAlert').text("Movie purchase is successful! Added movie to your watch list!");
      $("#actionAlert").show();
    },
    error: function (response, msg, error) {
      console.log("unable to buy movie: " + JSON.stringify(error));
      alert("unable to buy movie! please try again!");
    },
  });
}

function favorite(movieId, movieTitle) {
  console.log("inside favorite movie: " + movieId + " : " + movieTitle);
  var data = {id: movieId, title: movieTitle}
  $.ajax({
    url: "/movies/favorite",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    data: JSON.stringify(data),
    success: function (result) {
      $('#actionAlert').text("Added movie to your favorite list!");
      $("#actionAlert").show();
    },
    error: function (response, msg, error) {
      console.log("unable to add movie to favorite list: " + JSON.stringify(error));
      alert("unable to add movie to favorite list! please try again!");
    },
  });
}

function searchMovie() {
  var data = {movieTitle: $("#search").val()}
  $.ajax({
    url: "/movies/searchbyKey",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": window.localStorage.getItem("access-token"),
      "refresh-token": window.localStorage.getItem("refresh-token"),
      "id-token": window.localStorage.getItem("id-token"),
    },
    data: JSON.stringify(data),
    success: function (result) {
      document.open();
      document.write(result);
      document.close();

      // just replace content.
      //var el = document.getElementById("content");
      //el.innerHTML = result;
    },
    error: function (response, msg, error) {
      console.log("unable to search movie: " + error);
      alert("unable to search movie! please try again!");
    },
  });
}