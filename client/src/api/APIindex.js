import axios from 'axios';

//connecting our server side to our client 
const url = 'http://localhost:5000/data';


export const fetchSongs = () => axios.get(url);
export const createSong = (newPost) => axios.post(url, newPost);

//for prompt fetching
export const fetchPrompts = () => axios.get(url);