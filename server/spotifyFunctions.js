import SpotifyWebApi from 'spotify-web-api-node'
import {spotifyApi} from './server.js';
import mongoose from 'mongoose';
import {SongPostMessage} from './models/songModel.js';
import fetch from "node-fetch";


//==============================================

//FUNCTIONS WITH SPOTIFY GET AND POST


  var AuthParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:'grant_type=client_credentials&client_id=' + "4a484f64e7f04e2ea48e43b0aa731916" + '&client_secret=' + "a25959caa7614a2b91ecb5753de9403b"
  }
  
export let accessToken = null

 export async function initSpotifyToken(){ 
  console.log("bitch1")
    try {
      console.log("bitch")
        accessToken = await fetch('https://accounts.spotify.com/api/token', AuthParameters)
        .then(results => results.json())
        .then(data => {
            spotifyApi.setAccessToken(data.access_token)
            return data.access_token
        })
        return accessToken
    } catch (error) {
        console.log(error)   
    }
 }

  export async function searchforTrack(searchQuery) {
    try{
        var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
        }
        let searchResults = await fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track', searchParameters)
        .then(response => response.json())
        .then(data => {
            let searchResults1 = []
            for (let track of data.tracks.items){
                searchResults1.push(createSongObject(track))
            }
            return searchResults1
        })
        return searchResults
    } catch (error) {
        console.log("Oh no mario! " + error)
    }
}


//===============================================================

//Functions that use spotify-web-api-node


//SCOPE OF PERMISSIONS FOR SPOTIFY
export const scopes = [
    'ugc-image-upload',
    // 'user-read-playback-state',
    // 'user-modify-playback-state',
    // 'user-read-currently-playing',
    // 'streaming',
    // 'app-remote-control',
    // 'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    // 'user-read-playback-position',
    // 'user-read-recently-played',
    // 'user-follow-read',
    // 'user-follow-modify'
  ];


export async function authorizeUser(code){
    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
        console.log(`Sucessfully retreived access token. Expires in ${expires_in} s.`);
        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const access_token = data.body['access_token'];
            console.log('The access token has been refreshed!');
            console.log('access_token:', access_token);
            spotifyApi.setAccessToken(access_token);
          }, expires_in / 2 * 1000);
    } catch (error) {
        console.error('Error getting Tokens:', error);
    }
  }

  export async function authorizeUserIS(code, spotifyAPI){
    try {
        const data = await spotifyAPI.authorizationCodeGrant(code)
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
        spotifyAPI.setAccessToken(access_token);
        spotifyAPI.setRefreshToken(refresh_token);
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
        console.log(`Sucessfully retreived access token. Expires in ${expires_in} s.`);
        setInterval(async () => {
            const data = await spotifyAPI.refreshAccessToken();
            const access_token = data.body['access_token'];
            console.log('The access token has been refreshed!');
            console.log('access_token:', access_token);
            spotifyAPI.setAccessToken(access_token);
          }, expires_in / 2 * 1000);
    } catch (error) {
        console.error('Error getting Tokens:', error);
    }
  }

//GET MY PROFILE DATA
export async function getMyData() {
    try {
        const me = await spotifyApi.getMe();
        console.log(me.body);
        getUserPlaylistIDs(me.body.id);
    } catch (error) {
        console.log(error.body.error.message);
    }
 }

//GET USER PLAYLIST INFORMATION
 export async function getUserPlaylistIDs(userName) {
    const data = await spotifyApi.getUserPlaylists(userName)
    let playlistIDs = []
    for (let currentObj of data.body.items) {
      console.log(currentObj.name + ": " + currentObj.id)
      playlistIDs.push(currentObj.id)
    }
    return playlistIDs
  }


//SEARCH FOR A TRACK
export async function trackSearch(searchQuery){
    try {
       const data = await spotifyApi.searchTracks(searchQuery)
       let searchResults = []
       for (let track of data.body.tracks.items){
           searchResults.push(createSongObject(track))
       }
       console.log(searchResults)
       return searchResults
    } catch (error) {
        console.log('Something went wrong!', error);
    }
}

//CREATES A PLAYLIST WITH TRACK NAME
export async function createPlaylistWithTracks(name, description, tracks, imageuri = null){
    try {
        const data = await spotifyApi.createPlaylist(name, { 'description': description, 'public': true })
        let newPlaylistID = data.body.id;
        console.log('Created playlist!');
        
        let inputTracks = []
        for (let track of tracks){
            inputTracks.push(createSpotifyPrepend(track))
        }

        console.log(inputTracks)

        await spotifyApi.addTracksToPlaylist(newPlaylistID, inputTracks)
        console.log('Added tracks to playlist!');

        //ADDING A PLAYLIST IMAGE
        // if (imageuri =! null){
        // await spotifyApi.uploadCustomPlaylistCoverImage(newPlaylistID, imageuri)
        //     console.log("Added Image Uri")
        //     }
    } catch (error) {
        console.log('Something went wrong!', error);
    }
}

export async function createPlaylistWithTracksIS(spotifyAPI, name, description, tracks, imageuri = null){
  try {
      const data = await spotifyAPI.createPlaylist(name, { 'description': description, 'public': true })
      let newPlaylistID = data.body.id;
      console.log('Created playlist!');
      
      let inputTracks = []
      for (let track of tracks){
          inputTracks.push(createSpotifyPrepend(track))
      }

      console.log(inputTracks)

      await spotifyAPI.addTracksToPlaylist(newPlaylistID, inputTracks)
      console.log('Added tracks to playlist!');

      //ADDING A PLAYLIST IMAGE
      // if (imageuri =! null){
      // await spotifyApi.uploadCustomPlaylistCoverImage(newPlaylistID, imageuri)
      //     console.log("Added Image Uri")
      //     }
  } catch (error) {
      console.log('Something went wrong!', error);
  }
}

export async function addSongObjectToDB(songInfo) {
    const newSong = new SongPostMessage({
      name: songInfo.name,
      artists: songInfo.artists,
      album: songInfo.album,
      spotifyID: songInfo.spotifyID,
      albumCoverURL: songInfo.albumCoverURL
      })
    try {
        await newSong.save();
        console.log("Added song to song database!")
    } catch (error) {
      if (error.code == 11000){
        console.log("Song already in song database.")
      }
      else {
        console.log(error.message)
      }
    }
  }

  export async function addSongIDToDB(songID) {
    try {
        let data = await spotifyApi.getTrack(songID)
        addSongObjectToDB(createSongObject(data.body))
    } catch (error) {
        console.log(error)
    }
  }

//========================================================

//HELPER FUNCTIONS

//ADD THE spotify:track to the prepend
function createSpotifyPrepend(id){
    return "spotify:track:" + id
}

//PARSES THROUGH SONG RAW OBJECT AND RETURNS USEFUL INFROMATION
function createSongObject(rawObject){
    let artistsList = []
    for (let artist of rawObject.artists){
      artistsList.push(artist.name)
    }
    let songInfo = {
      name: rawObject.name,
      artists: artistsList,
      album: rawObject.album.name,
      spotifyID: rawObject.id,
      albumCoverURL: rawObject.album.images[0].url
    }
    return songInfo
  }