require("dotenv").config();

var exports = module.exports = {};

var conkey = process.env.TWITTER_CONSUMER_KEY;
var consec = process.env.TWITTER_CONSUMER_SECRET;
var acckey = process.env.TWITTER_ACCESS_TOKEN_KEY;
var toksec = process.env.TWITTER_ACCESS_TOKEN_SECRET;

exports.twitter = {
  consumer_key: conkey,
  consumer_secret: consec,
  access_token_key: acckey,
  access_token_secret: toksec
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};