import axios from 'axios';

//connecting our server side to our client 
const url = 'http://localhost:5000/data';


export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);