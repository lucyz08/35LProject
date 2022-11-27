import SpotifyWebApi from 'spotify-web-api-node'
import mongoose from 'mongoose';
import SongPostMessage from './models/songModel.js';
import {spotifyApi} from './server.js';


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

//ADD THE spotify:track to the prepend
function createSpotifyPrepend(id){
    return "spotify:track:" + id
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
        console.log("Success!")
    } catch (error) {
        console.log(error.message);
    }
  }

  export async function addSongIDToDB(songID) {
    try {
        data = await spotifyApi.getTrack(songID)
        addSongObjectToDB(createSongObject(data))    
    } catch (error) {
        console.log(error)   
    }
  }