import axios from 'axios';

//connecting our server side to our client 
const API = axios.create({ baseURL: 'http://localhost:8888'});

//sogns connections
export const fetchSongs = () => API.get("/songs");
//export const createSong = (newPost) => API.post("/songs", newPost);
export const createSong = (newPost) => API.put("/songs/response", newPost);

//for prompt fetching
export const fetchPrompts = () => API.get("/prompts");
export const createPrompt = (newPost) => API.post("/prompts", newPost);

//for user fetching
export const signIn = (newPost) => API.post("/user/signin", newPost);
export const signUp = (newPost) => API.post("/user/signup", newPost);

//for user editing
export const addFriend = (newPost) => API.put("/user/newfriend", newPost)
export const fetchUser = (post) => API.put("/user/data", post);

export const createPlaylist = (newPost) => API.put("/user/playlist", newPost);


//for search fetching
export const fetchSearch = (searchQuery) => API.put("/search/query", searchQuery);
export const addSongToDB = (songID) => API.put("/search/addsong", songID)

//for playlist creation in spotify
export const createSpotifyPlist = (codeAndPlaylistInfo) => API.put("/playlist/create-playlist", codeAndPlaylistInfo)