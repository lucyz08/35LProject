const mongoose = require("mongoose");
// // import {CONNECTION_URL, CLIENT_ID, CLIENT_SECRET} from './passwords.js';
var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
let token = "";
const CONNECTION_URL = "mongodb+srv://admin:admin@35lproject.tnn1kyn.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL);

const songsSchema = new mongoose.Schema({
    name: String,
    artists: [String],
    album: String,
    spotifyID: {
      type: String,
      unique: true // `spotifyID` must be unique
    },
    albumCoverURL: String
});

const rohanTestSong = mongoose.model('rohanTestSong', songsSchema);

async function addSongToDB(songInfo) {
  const newSong = new rohanTestSong({
    name: songInfo.name,
    artists: songInfo.artists,
    album: songInfo.album,
    spotifyID: songInfo.spotifyID,
    albumCoverURL: songInfo.albumCoverURL
    })
  try {
      await newSong.save();
      console.log("Success!")
  } catch (error) {
      console.log(error.message);
  }
}

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  
var spotifyApi = new SpotifyWebApi({
    clientId: '4a484f64e7f04e2ea48e43b0aa731916',
    clientSecret: 'd34501a462014810aeddb210cbc170a8',
    redirectUri: 'http://localhost:8888/callback'
  });
  
  const app = express();
  
  app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

  app.get('/', (req, res) => {
    res.redirect('/login');
  });
  
  app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi.authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
        token = access_token;

        spotifyApi.setAccessToken(token);
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
        console.log(`Sucessfully retreived access token. Expires in ${expires_in} s.`);
        res.send('Success! You can now close the window.');
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
  });
  
  app.listen(8888, () =>
    console.log(
      'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
    )
  );


//GET MY PROFILE DATA
async function getMyData() {
   if (token == null){
    console.log("Error no token")
   }
  (async () => {
    const me = await spotifyApi.getMe();
    //console.log(me.body);
    getUserPlaylistIDs(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylistIDs(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)
  let playlistIDs = []
  for (let currentObj of data.body.items) {
    console.log(currentObj.id)
    playlistIDs.push(currentObj.id)
  }
  return playlistIDs
}

//GET SONGS FROM PLAYLIST
//Will return the tracks from a specific playlist specified by the ID of the playlist
//It will return an array of objects containing name, artist/s (array), album, spotifyID, ablum cover uri
async function getPlaylistTracks(playlistId) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })
  let tracks = [];
  for (let track_obj of data.body.items) {
    artistsL = []
    for (let item of track_obj.track.artists){
      artistsL.push(item.name)
    }
    const track = {
      name: track_obj.track.album.name,
      artists: artistsL,
      album: track_obj.track.album.name,
      spotifyID: track_obj.track.id,
      albumCoverURL: track_obj.track.album.images[0].url
    }
    tracks.push(track);
  }
  console.log(tracks);
  return tracks;
}


async function createPlaylistWithTracks(name, description, songs, imageuri = null){
    let newPlaylistID = null;
    spotifyApi.setAccessToken(token);

  await spotifyApi.createPlaylist(name, { 'description': description, 'public': true })
  .then(function(data) {
    console.log('Created playlist!');
    newPlaylistID = data.body.id;
    console.log(newPlaylistID);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  for (index in songs){
    songs[index] = createSpotifyPrepend(songs[index]);
  }

  await spotifyApi.addTracksToPlaylist(newPlaylistID, songs)
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  //Add this later when we figure out what songs to do
  //spotifyApi.uploadCustomPlaylistCoverImage(newPlaylistID, )
}

//this will take the id and prepend the correct test so that that it will correctly access the other functions
function createSpotifyPrepend(id){
  return "spotify:track:" + id
}

async function addAnArrayOfSongsToDB(songIDs){
  for (index in songIDs){
    await spotifyApi.getTrack(songIDs[index])
    .then(
      function(data){
        addSongToDB(createSongObject(data))
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    )
  }
}

function createSongObject(rawObject){
  artistsT = []
  for (index in rawObject.body.artists){
    artistsT.push(rawObject.body.artists[index].name)
  }
  songInfo = {
    name: rawObject.body.name,
    artists: artistsT,
    album: rawObject.body.album.name,
    spotifyID: rawObject.body.id,
    albumCoverURL: rawObject.body.album.images[0].url
  }
  return songInfo
}

async function returnAllSongsInDB(){
  songs = await rohanTestSong.find().then(
    function(songs) {
      return songs
    }
  )
}


app.get('/data', (req, res) => {
    getMyData();
    res.send('Success! You can now close the window.');
  });

app.get('/createplaylist', (req,res) => {
    //createPlaylist('bob', 'jones', )//FIXME);
    songsInput = [];
    let output =  getPlaylistTracks('1ZlGR6X06p0WFIBSSs8RgZ')
    .then(function(data){
      console.log(data);
      for (index in data){
        songsInput.push(data[index].spotifyID)
      }
      addAnArrayOfSongsToDB(songsInput);
      res.send("Yo what\'s up little man your playlist is coming right up");
    })
})

app.get('/allsongs', (req,res) => {
  returnAllSongsInDB()
  .then(function(data){
    console.log(data)
    res.send(data);
  })
})