import SpotifyWebApi from 'spotify-web-api-node'
import mongoose from 'mongoose';
import SongPostMessage from './models/songModel.js';

async function initSpotifyAPI(){
    var spotifyApi = new SpotifyWebApi({
        clientId: '4a484f64e7f04e2ea48e43b0aa731916',
        clientSecret: 'a25959caa7614a2b91ecb5753de9403b',
        redirectUri: 'http://localhost:8888/callback'
    })
    return spotifyApi
}



export function createSongObject(rawObject){
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

export async function trackSearch(searchQuery){
    await spotifyApi.searchTracks(searchQuery)
    .then(
        function(data){
            searchResults = []
            for (let track of data.body.tracks){
                searchResults.push(createSongObject(track))
            }
            return searchResults
        }, function(err) {
            console.log('Something went wrong!', err);
        }
    )
}



export async function addToSongsDB(trackID) {
    songDataRaw = await spotifyApi.getTrack(trackID)
    .then(
        function(data){
            createSongObject(track.body)
        }, function(err) {
            console.log('Something went wrong!', err);
        }
    )

    const newSong = new SongPostMessage({
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



//Returns a list of playlist IDs from userName's profile
 async function getUserPlaylistIDs(userName) {
    try{
        const data = await spotifyApi.getUserPlaylists(userName)
        let playlistIDs = []
        for (let currentObj of data.body.items) {
            console.log(currentObj.id)
            playlistIDs.push(currentObj.id)
        }
        return playlistIDs
    }
    catch{

    }
  }

//Gets all the tracks on a specific playlist
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
  if (imageuri != null){
    try{
        spotifyApi.uploadCustomPlaylistCoverImage(newPlaylistID, imageuri)
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
  }
    
}

function createSpotifyPrepend(id){
    return "spotify:track:" + id
  }