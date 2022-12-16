import * as api from '../api/APIindex';
import {createSongPost} from './songFetching'
import { createSong } from '../api/APIindex';


export const fetchSearch = async (searchQuery) => {
    try {
        console.log(searchQuery)
        const filter = {"query": searchQuery}
        const {data} = await api.fetchSearch(filter);
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

//export const addResponse = async (songInfo) => {
export const addResponse = (songInfo) => async (dispatch) => {
    console.log(songInfo.song.spotifyID)
    console.log(songInfo)
    const IdObj = {"trackID": songInfo.song.spotifyID}
    try {
        console.log("songinfo:")
        console.log(songInfo)
        let data = await api.addSongToDB(IdObj)
        console.log(data)

        let d = await api.createSong(songInfo);
        //dispatch(createSongPost(songInfo));
        console.log(d)
        localStorage.setItem("songSubmitted", true);
        window.location.reload();
    } catch(error) {
        console.log(error)
    }
}