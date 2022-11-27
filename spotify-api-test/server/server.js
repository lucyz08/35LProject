import mongoose from 'mongoose';
// // import {CONNECTION_URL, CLIENT_ID, CLIENT_SECRET} from './passwords.js';
import SpotifyWebApi from 'spotify-web-api-node'
import express from 'express'
let token = "";
const CONNECTION_URL = "mongodb+srv://rohanj:IAmJake1@35lproject.tnn1kyn.mongodb.net/?retryWrites=true&w=majority"
import SongPostMessage from './models/songModel.js';
import {scopes, getMyData, trackSearch, createPlaylistWithTracks, addSongObjectToDB} from './spotifyfunctions.js'
mongoose.connect(CONNECTION_URL);
  
export var spotifyApi = new SpotifyWebApi({
     clientId: '4a484f64e7f04e2ea48e43b0aa731916',
     clientSecret: 'a25959caa7614a2b91ecb5753de9403b',
     redirectUri: 'http://localhost:8888/callback'
});
  
const app = express();
  
app.get('/spotify-login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/', (req, res) => {
  res.redirect('/spotify-login');
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
      res.redirect('/data');
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
      'HTTP Server up. Now go to http://localhost:8888/spotify-login in your browser.'
    )
  );



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
  let tracksID = []
  for (let track_obj of data.body.items) {
    let artistsL = []
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
    tracksID.push(track_obj.track.id)
  }
  console.log(tracks);
  console.log(tracksID);
  return tracks;
}

async function getMultiplePlaylistTracks(playlistIds) {
  let tracks = [];
  for (let item of playlistIds){
  const data = await spotifyApi.getPlaylistTracks(item, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })
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
} 
  console.log(tracks);
  return tracks;
}



async function addAnArrayOfSongsToDB(songIDs){
  for (index in songIDs){
    await spotifyApi.getTrack(songIDs[index])
    .then(
      function(data){
        addSongObjectToDB(createSongObject(data))
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    )
  }
}

async function returnAllSongsInDB(){
  songs = await rohanTestSong.find().then(
    function(songs) {
      return songs
    }
  )
}



async function searchPlaylists(searchTerm){
  let playlists = await spotifyApi.searchPlaylists(searchTerm)
  .then(function(data) {
    output_playlists = []
    for (let item of data.body.playlists.items){
      output_playlists.push(item.id);
    }
    console.log(output_playlists);
    return output_playlists;
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

app.get('/data', (req, res) => {
    getMyData();
    res.send('Success! You can now close the window.');
  });

app.get('/add-songs', (req,res) => {
    //createPlaylist('bob', 'jones', )//FIXME);
    songsInput = [];
    playlistInput = [
      '3WPuV7Q2Uy8nUthfZywVFa']
    let output =  getMultiplePlaylistTracks(playlistInput)
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

app.get('/searchplaylists', (req,res) => {
  searchPlaylists('Nirvana')
  res.send("Hello son!")
})

app.get('/getplayliststrack', (req,res) => {
  getPlaylistTracks("3WPuV7Q2Uy8nUthfZywVFa")
})


app.get('/searchsongs', (req,res) => {
  try {
    songs = trackSearch('Eugene Sufjan Stevens')
    res.send(songs)
  } catch (error) {
    res.send(error)
  }
})



app.get('/createplaylists', (req,res) => {
  try {
    let tracks = [
      '6BGu9IJlUza0h7YrTWElnD', '0DXm5n7SBxCED9ssTvrx2J', '5G4JTc4HlIsg7CyiDwoPV2',
      '2dR5WkrpwylTuT3jRWNufa', '6lTTzSk1hRrxp4VMwXBp2l', '3avsnAfBY679fsWiQisazB',
      '1nd9moIZkGvWoHtReFqkRY', '5OkKOkdVTKFrYi6GWXkMzR', '4tmy6FB76bR5eLmx0zO1mn',
      '2lDiN2SOr0bZ9D9kjjjYFS', '4qQ8sToR3GNossXlwSlyKz', '7ha6LU5Dle7FGBh0I9LZIa',
      '78VG6M1i7JQXBdygmWFwye', '2WaYW84yWij5NSCpgSeU2R', '4hHbeIIKO5Y5uLyIEbY9Gn',
      '7keRsHHqmuFRv8agWvaYxE', '2xar08Fq5xra2KKZs5Bw9j', '6PbclyMA0GpMTym4eDYQ1I',
      '03sUk4wYNWGMMBw2wDV3Uv', '6pY1AWqj42B5pngwtgyTJ4', '3krgfOQI9Szq8cF0Umm1O1',
      '1bYItjcPRtxZs6Ir71O5RB', '7E3rc13GL2I5wA6CIFXaxs', '1gcuhZPKmTYvn5VT5EZLR6',
      '5CMw1IWB7JOpUY9nk54n1K', '094P9Go47bQKJ5Do15lt69', '7ytqdjooPEAa97QSu6NUHS',
      '1P5y5njqYWr5qXnvSTKTij', '6dZKWYSx5YBIme4SfpIHJ0', '3XiFWZoHQtGUYIdtShPwPD',
      '4JGEHPR3D0Tb1BIawAam2g', '6OCu02giYyUohTNb5iLdf3', '33K1u1kovHtnBt9sZoz2Eb',
      '50uGbeaQIxKiSc7jvRTjWx', '4jlIa1q4BJa0OCyaGequm5', '2EIaO5knwUA3F2qnf9LV3S',
      '7DJsL4jyXA39GDiHFQYQ0t', '40lJvH4LTl7BtcEoAU4gKl', '3eMrYc092k7SIJfWJ7oasR',
      '7jp5ZOm6EI9cayxynj5hCT', '0a545c4gOsyYupVvliDOy0', '0xOk7aRJlO3dUry6E0ffQp',
      '77Aqjy8Kcd5GK1ZORCTNnF', '3nIpFMbuhstntUZT4FpuPG', '6ePfZSL65nQl1mhTd0YEt3',
      '7xBED0BuB3WlInVj1O27OE', '1DaFA54AzvrXdf8FMeaBM7', '7LHdSTKBYwB4GuiDwgsHri',
      '54EEuKcvf9lvytQ7r8n8hG', '21Jk3g2h6H7b4KC30IxnFg', '74jklVKHYTmNMp0baGm6FB',
      '29U7stRjqHU6rMiS8BfaI9', '5P11rW6aJErF37MTfRZS31', '3E5ndyOfO6vFDEIE42HA8o',
      '3pdZuM41fZDTmIRBWc1mPK', '7yED4n2U8RR5LKZVmisiev', '5PLUw46m8RDInYpxf3ddID',
      '4WUcNkpoNSKoe5MUuyzrfC', '4GqMYg91LJXiLjvQBFc3s0', '1LGqJ3nvxpVXDWpEzq4DJD',
      '74VR3AkGPhbYXnxcOYa16x', '16pUlUFjyp6BtDtxC0i9ch', '4Abmdat3bSrn2mZnqsCTQH',
      '5D4yBkYPvTRQXNhOPtS6QR', '1BfbdFWT4wirsQ5BNgmN52', '0xeqhLx9L3QzXIAaxMRUiX',
      '7nkntgdN6jqwJXlyjHW5lv', '61XbTTT5vkPP6RWXJSApkV', '3WKnfkgwrARwElktHSU5Ik',
      '1avf1M4btPbNGiIUXeNSvt', '2BBH59nyfRuXTC8rpYEPT0', '3OhpnxZyvIIxl62haM4Eth',
      '1qDTsxSnBxNwh6CdPWvkaz', '5RLzsVW6UNiV2YrOlKwzNN', '7nL48xOPl0CraSaxKonp8j',
      '1LlQI0PyVcf9iiDPbSLxFp', '52XDumqYDUXX16R7FM5fpV', '2IQWvFhGxuvB3hr41KWyfO',
      '0OFzGWNvMR7qvRsD14dxIT', '0VX8ptOQhUt1SIOHYLZGNN', '78MI7mu1LV1k4IA2HzKmHe',
     '5tNQFDpeAggd6Brw3pIpjP', '1m8WU15D9BGbtsgNE4XWuJ', '77zlKibPvqudmNxMNpAtv6',
     '2xm9ihELo6xwrRKrBbPql9'
]
    createPlaylistWithTracks("Arpeggio", "rawrxd", tracks, 'https://i.scdn.co/image/ab67616d0000b273820e2ac14772ae3162c6d479') 
  }
  catch (error) {
    console.log(error)
  }
})