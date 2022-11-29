import "./home.css"

//stuff to get songs and prompts, not too sure what is necessary 
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import { getPlaylists } from "../actions/userFetching";
import { setUserData } from "../actions/userFetching";

import { newPlaylist } from "../actions/userFetching";

import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';
import Users from '../components/Users/printUsers'
import SongForm from '../components/Forms/songForm.js';
import PromptForm from "../components/Forms/promptForm";
import FriendForm from "../components/Forms/friendForm.js";
import Friends from "../friends/Friends";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
  }, [dispatch]);
useEffect(() => {
    dispatch(getPlaylists());
}, [dispatch]);
useEffect(() => {
    dispatch(newPlaylist());
}, [dispatch]);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        const token = user?.token

        setUserData(JSON.parse(localStorage.getItem('userdata')))
    }, [])

    
    const [friendResponses, setFriendResponses] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        setFriendResponses(JSON.parse(localStorage.getItem('userdata')))
    }, [])
    console.log(friendResponses)
    const results = [];
    if (user)
    {
        if (friendResponses.playlist1)
        {
            for (const song of friendResponses.playlist1) {
                results.push(
                <div key={song.id}>
                    <h2>name: {song}</h2>
                    <hr />
                </div>,
                );
            }
        }
    }

    return (
    <>
    <div className="outside">
    <h1 className="homeTitle" style={{backgroundImage: `url("../images/musicHall.jpg")`}}>
        <h1 className="homeHeader">Arpeggio</h1>
        <h3 className="subtitle">a new way to share music</h3>
    </h1>
    <div className="promptHead">
        <h1 className="declareP">
            Daily Prompt: 
        </h1>
        <h1 className="prompt">
            <Prompts/>
        </h1>
    </div>
    {user ? (
        <div className="formAnswers">
            <div className="form">
                <SongForm/> 
            </div>
            <div className="responses">
            <div className="friendResponses">
                Friend Responses
            </div>
            <div>
                {results}
            </div>
        </div>
        <div className="proForm">
            <div className="form">
                <PromptForm/> 
            </div>
        </div>
        </div>
    ) : (
        <div>
            <h1 className="loggedOutWarn"><a className="homeLink" href="http://localhost:3000/signin">Log In</a> or <a className="homeLink" href="http://localhost:3000/signup">Sign Up</a> for Access</h1>
        </div>
    )}
    </div>
    </>
    )
}

export default Home
