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
export const signIn = (newPost) => API.post("/user/signin", newPost);
export const signUp = (newPost) => API.post("/user/signup", newPost);

//for user editing
export const addFriend = (newPost) => API.put("/user/newfriend", newPost)
