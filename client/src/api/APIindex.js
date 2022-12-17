import axios from 'axios';

//connecting our server side to our client 
const API = axios.create({ baseURL: 'http://localhost:8888'});

//songs connections
export const fetchSongs = () => API.get("/songs");
//export const createSong = (newPost) => API.post("/songs", newPost);
export const createSong = (newPost) => API.put("/songs/response", newPost);

//for prompt fetching
export const fetchPrompts = (post) => API.put("/prompts/newprompt", post);
export const createPrompt = (newPost) => API.post("/prompts", newPost);
export const promptResponses = (post) => API.put("/prompts/responses", post);
export const customresponses = (post) => API.put("prompts/customresponses", post)

//for user fetching
export const signIn = (newPost) => API.post("/user/signin", newPost);
export const signUp = (newPost) => API.post("/user/signup", newPost);

//for user editing
export const addFriend = (newPost) => API.put("/user/newfriend", newPost)
export const fetchUser = (post) => API.put("/user/data", post);

//for search fetching
export const fetchSearch = (searchQuery) => API.put("/search/query", searchQuery);
export const addSongToDB = (songID) => API.put("/search/addsong", songID)

//for playlist creation in spotify
export const createSpotifyPlist = (codeAndPlaylistInfo) => API.put("/playlist/create-playlist", codeAndPlaylistInfo)

//for playlist creation
export const createPlaylist = (newPost) => API.put("/user/playlist", newPost);
export const fetchResponses = () => API.get("/user/responses");
