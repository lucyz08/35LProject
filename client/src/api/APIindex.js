import axios from 'axios';

//connecting our server side to our client 
const API = axios.create({ baseURL: 'http://localhost:5000'});

//sogns connections
export const fetchSongs = () => API.get("/songs");
export const createSong = (newPost) => API.post("/songs", newPost);

//for prompt fetching
export const fetchPrompts = () => API.get("/prompts");
export const createPrompt = (newPost) => API.post("/prompts", newPost);

//for user fetching
export const fetchAuth = (newPost) => API.post("/auths", newPost);
export const createUser = (newPost) => API.post("/users", newPost);