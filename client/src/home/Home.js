import "./home.css"

//stuff to get songs and prompts, not too sure what is necessary 
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';
import Users from '../components/Users/printUsers'
import SongForm from '../components/Forms/songForm.js';
import PromptForm from "../components/Forms/promptForm";
import FriendForm from "../components/Forms/friendForm.js";
import FriendSongs from '../components/Songs/printFriendSongs.js'

const Home = () => {

    const dispatch = useDispatch();
  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
  }, [dispatch]);


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
            <FriendSongs/>
        </div>
        <div className="proForm">
            <div className="form">
                <PromptForm/> 
            </div>
        </div>
        </div>
    ) : (
        <div>
            <h1>Log In or Sign Up For Access</h1>
        </div>
    )}
    </div>
    </>
    )
}

export default Home
