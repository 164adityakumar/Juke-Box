const spotifyrouter = require('express').Router();
const querystring = require('querystring');
const request = require('request');

require('dotenv').config("../../.env");


const redirectURI = process.env.NODE_ENV
  ? process.env.SPOTIFY_REDIRECT_URI
  : 'http://localhost:8080/api/spotify/callback';

// ROUTE: /api/spotify/login
spotifyrouter.get('/login', function (req, res) {
  console.log(process.env.SPOTIFY_CLIENT_ID)
  const url =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope:
        'user-read-private user-read-email playlist-modify-private playlist-modify-public user-read-currently-playing user-read-playback-state user-modify-playback-state',
      redirect_uri: redirectURI,
    });

  res.redirect(url);
});

// ROUTE: /api/spotify/callback
spotifyrouter.get('/callback', function (req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectURI,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
    },
    json: true,
  };
  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const url = process.env.NODE_ENV ? process.env.FRONTEND_URL : 'http://localhost:3000/home';

    res.redirect(url + '?access_token=' + access_token);
  });
});

module.exports = spotifyrouter;