const spotifyrouter = require('express').Router(),
  querystring = require('querystring'),
  request = require('request');


const redirectURI = process.env.NODE_ENV
  ? process.env.SPOTIFY_REDIRECT_URI
  : 'http://localhost:8080/api/spotify/callback';


// ROUTE: /api/spotify/login
spotifyrouter.get('/login', function (req, res) {

  const client_id = process.env.CLIENT_ID;
  const scope = 'streaming user-read-private user-read-email playlist-modify-private playlist-modify-public user-read-currently-playing user-read-playback-state user-modify-playback-state ';

  // res.json({url: 'https://accounts.spotify.com/authorize'});
  
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirectURI,
    }));
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
        Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
    },
    json: true,
  };
  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const url = process.env.NODE_ENV ? process.env.FRONTEND_URL : 'http://localhost:3000/room/create';

    res.redirect(url + '?access_token=' + access_token);
  });
});

module.exports = spotifyrouter;