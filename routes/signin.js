var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");

require("dotenv").config();
AWS.config.update({
  region: process.env["AWS_REGION"],
  accessKeyId: process.env["ACCESS_KEY_ID"],
  secretAccessKey: process.env["SECRET_ACCESS_KEY"],
});

function signInUser(req, res, next) {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  var input = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env["CLIENT_ID"],
    AuthParameters: {
      USERNAME: req.body.email,
      PASSWORD: req.body.password,
    },
  };

  cognito.initiateAuth(input, function (err, data) {
    if (err) {
      console.log("Unable to login! Error: " + JSON.stringify(err));
      res.render("index", { signInErrMsg: err.message });
    } else {
      console.log(data);
      console.log("Login is successful!");
      res.render("savetoken", {
        accessToken: data.AuthenticationResult.AccessToken,
        refreshToken: data.AuthenticationResult.RefreshToken,
        idToken: data.AuthenticationResult.IdToken,
      });
    }
    return next();
  });
}

router.post("/", signInUser);

router.get("/", redirectGetRequestToPost);

function redirectGetRequestToPost(req, res, next) {
  res.render("gettoken");
  return;
}

module.exports = router;
